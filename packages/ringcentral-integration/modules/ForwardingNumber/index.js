import { Module } from '../../lib/di';
import DataFetcher from '../../lib/DataFetcher';
import fetchList from '../../lib/fetchList';
import ensureExist from '../../lib/ensureExist';
import { selector } from '../../lib/selector';
import removeUri from '../../lib/removeUri';

/**
 * @class
 * @description Extension forwarding number list module
 */
@Module({
  deps: [
    'Client',
    'RolesAndPermissions',
    { dep: 'ForwardingNumberOptions', optional: true },
  ],
})
export default class ForwardingNumber extends DataFetcher {
  /**
   * @constructor
   * @param {Object} params - params object
   * @param {Client} params.client - client module instance
   */
  constructor({ client, rolesAndPermissions, ...options }) {
    super({
      client,
      fetchFunction: async () => {
        const lists = await fetchList((params) =>
          this._client
            .account()
            .extension()
            .forwardingNumber()
            .list(params),
        );
        return lists.map((number) => removeUri(number));
      },
      forbiddenHandler: () => [],
      readyCheckFn: () => this._rolesAndPermissions.ready,
      cleanOnReset: true,
      ...options,
    });
    this._rolesAndPermissions = ensureExist.call(
      this,
      rolesAndPermissions,
      'rolesAndPermissions',
    );
  }

  get _name() {
    return 'forwardingNumber';
  }

  @selector
  numbers = [() => this.data, (data) => data || []];

  @selector
  flipNumbers = [
    () => this.numbers,
    (phoneNumbers) =>
      phoneNumbers.filter(
        (p) => p.features.indexOf('CallFlip') !== -1 && p.phoneNumber,
      ),
  ];

  @selector
  forwardingNumbers = [
    () => this.numbers,
    (phoneNumbers) =>
      phoneNumbers.filter(
        (p) => p.features.indexOf('CallForwarding') !== -1 && p.phoneNumber,
      ),
  ];

  get _hasPermission() {
    return !!this._rolesAndPermissions.permissions
      .ReadUserForwardingFlipNumbers;
  }
}
