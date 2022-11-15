import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import UserModel from "./recoil/model/userModel";
import { userListAtom } from "./recoil/state/todoAtom";
import './singup.css';

const Singup = () => {

  const url = '/users';
  const [userList, setUserlist] = useRecoilState<Array<UserModel>>(userListAtom);
  const [singup, setSingup] = useState({  
    id: "",
    userID: "",
    userPW: "",
    userNm: "",
    email: "",});

  const { userID, userPW, userNm,  email} = singup;

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async (): Promise<void> => {
    const res: AxiosResponse<any, any> = await (await axios.get(`${url}`, {}));
    setUserlist(res.data);
  };

  const handleTodoForm = async (e: any): Promise<void> => {
    e.preventDefault();
     await axios.post(`${url}`,singup);
     await getUsers();
  };

  // 3 조회 rest api에 todo 삭제 요청.
  const todoDelete = async (id: string): Promise<void> => {
    await axios.delete(`${url}/${id}`, {});
    setUserlist(userList.filter((singup => singup.id !== id)));
  };

  const handleOnChangeForm = (e: any) => {
    const { name, value } = e.target;
    setSingup({
      ...singup, 
      [name]: value 
    }
    );
  };
  

  return (
    <div>
      <h1>
        user
      </h1> 
      <div>
        {userList?.map((user, idx) => (
          <div key={idx} className="user"> 
            <p>{user.id}</p>
            <p>{user.userID}</p>
            <p>{user.userNm}</p>
            <p>{user.userPW}</p>
            <p>{user.email}</p>
            <button type="button" onClick={() => todoDelete(user.id)}>삭제</button>
          </div>
        ))}
      </div>
      <div>
      <form onSubmit={handleTodoForm}>
          <input
            type='text'
            placeholder='ID'
            name="userID"
            value={userID}
            onChange={handleOnChangeForm}
          />
          <input
            type='text'
            name="userNm"
            value={userNm}
            placeholder='NM'
            onChange={handleOnChangeForm}
          />
          <input
            type='text'
            name="userPW"
            value={userPW}
            placeholder='PW'
            onChange={handleOnChangeForm}
          />
          <input
            type='text'
            name="email"
            value={email}
            placeholder='email'
            onChange={handleOnChangeForm}
          />
          <button type="submit">등록</button>
        </form>
      </div>
    </div>
  )
};

export default Singup;