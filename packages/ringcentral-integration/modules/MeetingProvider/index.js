import { contains } from 'ramda';

import subscriptionFilters from '../../enums/subscriptionFilters';
import subscriptionHints from '../../enums/subscriptionHints';
import DataFetcher from '../../lib/DataFetcher';
import { Module } from '../../lib/di';
import sleep from '../../lib/sleep';
import { meetingProviderTypes } from './interface';
import { getMeetingProvider } from './service';

/**
 * @class
 * @description: just check meeting provider from RC PLA
 */
@Module({
  deps: ['RolesAndPermissions'],
})
export default class MeetingProvider extends DataFetcher {
  constructor({ rolesAndPermissions, ...options }) {
    super({
      ...options,
      subscriptionFilters: [subscriptionFilters.extensionInfo],
      subscriptionHandler: async (message) => {
        await this._subscriptionHandleFn(message);
      },
      readyCheckFn: () => this._rolesAndPermissions.ready,
      async fetchFunction() {
        const data = await getMeetingProvider(this._client);
        return data;
      },
      disableCache: true,
      cleanOnReset: true,
    });
    this._rolesAndPermissions = rolesAndPermissions;
  }

  async _subscriptionHandleFn(message) {
    if (message?.body?.hints?.includes(subscriptionHints.videoConfiguration)) {
      // https://jira.ringcentral.com/browse/ENV-67087
      // the video configuration api may return the old value
      // when we try to query immediately right after got the push notification
      // here we wait for seconds as a workaround to solve the issue
      await sleep(5000);
      await this.fetchData();
    }
  }

  get isRCV() {
    return this.provider === meetingProviderTypes.video;
  }

  get isRCM() {
    return contains(this.provider, [
      meetingProviderTypes.meeting,
      meetingProviderTypes.none,
    ]);
  }

  get provider() {
    return this.data?.provider || null;
  }

  get userLicenseType() {
    return this.data?.userLicenseType || null;
  }

  get _hasPermission() {
    return !!this._rolesAndPermissions.hasMeetingsPermission;
  }

  get _name() {
    return 'meetingProvider';
  }
}
