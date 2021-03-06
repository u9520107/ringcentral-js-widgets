import { ensureLogin, containsErrorMessage } from '../utils/HelpUtil';
import { waitInSeconds } from '../utils/WaitUtil';
import ClientHistoryRequest from '../utils/ClientHistoryRequest';
import * as mock from '../mock';
import permissionsMessages from '../../modules/RolesAndPermissions/permissionsMessages';

const authzProfileBody = require('../mock/data/authzProfile');

export default (auth, client, accountInfo, account, alert) => {
  describe('AccountInfo:', () => {
    this.timeout(20000);
    mock.mockClient(client);

    let isLoginSuccess;
    const clientHistoryRequest = new ClientHistoryRequest(new Map(), client);

    afterEach(async () => {
      if (auth.loggedIn) {
        await auth.logout();
      }
      await waitInSeconds(1);
    });

    it('Should load info successfully', async () => {
      mock.restore();
      mock.mockForLogin();
      isLoginSuccess = await ensureLogin(auth, account);
      if (!isLoginSuccess) {
        console.error(
          'Skip test case as failed to login with credential ',
          account,
        );
        this.skip();
      }
      this.retries(2);
      await waitInSeconds(1);
      expect(accountInfo.info.id).equal(208594004);
    });

    it('Should show insufficientPrivilege when no ReadCompanyInfo', async () => {
      mock.restore();
      mock.mockForLogin({ mockAuthzProfile: false });
      mock.authzProfile({
        permissions: authzProfileBody.permissions.filter(
          (p) => p.permission.id !== 'ReadCompanyInfo',
        ),
      });
      await auth.login({
        ...account,
      });
      await waitInSeconds(5);
      expect(auth.loggedIn).equal(false);
      expect(
        containsErrorMessage(
          alert.state.messages,
          permissionsMessages.insufficientPrivilege,
        ),
      ).to.not.equal(undefined);
    });
  });
};
