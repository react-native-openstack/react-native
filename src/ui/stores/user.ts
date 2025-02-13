import User from '@/domain/model/User';
import {persistEffect} from '@/ui/stores/persistEffect';
import {StorageKey} from '@/ui/services/storage';
import {atom} from 'recoil';

export const userState = atom<User | null>({
  key: 'user/userState',
  default: null,
  effects: [persistEffect<User | null>(StorageKey.USER)],
});
