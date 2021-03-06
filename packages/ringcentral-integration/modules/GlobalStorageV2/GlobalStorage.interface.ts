import {
  IStorageBaseOptions,
  Deps as StorageBaseDeps,
} from '../../lib/StorageBaseV2';

export interface Deps extends StorageBaseDeps {
  globalStorageOptions?: GlobalStorageOptions;
}

export interface GlobalStorageOptions extends IStorageBaseOptions {}
