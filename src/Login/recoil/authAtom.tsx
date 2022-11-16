import { atom } from 'recoil';
import UserModel from '../../SignUp/recoil/model/userModel';


const authAtom = atom<UserModel>({
    key: 'authAtom',
    default: JSON.parse(localStorage.getItem('user') || '{}')
});

export { authAtom };
