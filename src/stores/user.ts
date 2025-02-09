import User from '@/domain/model/User';
import {persistEffect} from '@/utils/persistEffect';
import {StorageKey} from '@/utils/storage';
import {atom} from 'recoil';

export const userState = atom<User | null>({
  key: 'user/userState',
  default: null,
  effects: [persistEffect<User | null>(StorageKey.USER)],
});
