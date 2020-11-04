import {
  DataFetcherV2ConsumerBaseDeps,
  DataSourceBaseProps,
} from '../DataFetcherV2';
import { RolesAndPermissions } from '../RolesAndPermissionsV2';

export interface AddressBookOptions extends DataSourceBaseProps {
  fetchInterval?: number;
  perPage?: number;
}

export interface Deps extends DataFetcherV2ConsumerBaseDeps {
  client: any;
  rolesAndPermissions: RolesAndPermissions;
  AddressBookOptions?: AddressBookOptions;
}

export interface SyncParameters {
  perPage: number;
  syncType?: 'ISync' | 'FSync';
  syncToken?: string;
  pageId?: number;
}
