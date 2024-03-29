import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import UserModel from "./recoil/model/userModel";
import { userListAtom } from "./recoil/state/todoAtom";
import './css/singup.css';

const Singup = () => {
  const baseUrl = "http://localhost:3001";
  
  /**
   * recoil user목록
   */
  const [userList, setUserlist] = useRecoilState<Array<UserModel>>(userListAtom);
  
  /**
   * user 기본 정보
   */
  const [user, setUser] = useState<UserModel>({  
    id: "",
    userID: "",
    userPW: "",
    userNm: "",
    email: "",
    token:""
  });
  

  useEffect(() => {
    getUsers();
  },[]);

  /**
   * user목록을 가져온다.
   */
  const getUsers = async (): Promise<void> => {
    const res: AxiosResponse<any, any> = await (await axios.get(`${baseUrl}/users`, {}));
    setUserlist(res.data);
  };

  /**
   * user을 생성한다.
   */
  const creatUser = async (e: any): Promise<void> => {
    e.preventDefault();
     await axios.post(`${baseUrl}/users`,user);
     await getUsers();
     setUser({
      id: "",
      userID: "",
      userPW: "",
      userNm: "",
      email: "",
      token:""
    });
  };

  /**
   * user을 삭제한다.
   */
  const userDelete = async (id: string): Promise<void> => {
    await axios.delete(`${baseUrl}/users/${id}`, {});
    setUserlist(userList.filter((singup => singup.id !== id)));
  };

  /**
   * input 상태 관리
   */
  const handleOnChangeForm = (e: any) => {
    const { name, value } = e.target;
    setUser({
      ...user, 
      [name]: value 
    });
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
            <button type="button" onClick={() => userDelete(user.id)}>삭제</button>
          </div>
        ))}
      </div>
      <div>
      <form onSubmit={creatUser}>
          <input
            type='text'
            placeholder='ID'
            name="userID"
            value={user.userID}
            onChange={handleOnChangeForm}
          />
          <input
            type='text'
            name="userNm"
            value={user.userNm}
            placeholder='NM'
            onChange={handleOnChangeForm}
          />
          <input
            type='password'
            name="userPW"
            value={user.userPW}
            placeholder='PW'
            onChange={handleOnChangeForm}
          />
          <input
            type='email'
            name="email"
            value={user.email}
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