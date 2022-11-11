import { atom } from 'recoil';
import UserModel from '../model/userModel';

const userListAtom = atom<Array<UserModel>>({
  key: 'userListAtom',
  default: []
});

const userChange = atom<UserModel>({
  key: 'userChange',
  default: {} as UserModel
});
export { userListAtom, userChange};
