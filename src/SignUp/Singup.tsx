import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import UserModel from "./recoil/model/userModel";
import { userListAtom } from "./recoil/state/todoAtom";
import './singup.css';

const Singup = () => {

  const url = 'http://localhost:8000/login-server/login/users';
  const [userList, setUserlist] = useRecoilState<Array<UserModel>>(userListAtom);
  const [singup, setSingup] = useState({  
    id: "",
    userID: "",
    userPW: "",
    userNm: "",
    email: "",});

  // 화면에 todoList 출력
  useEffect(() => {
    getTodoCtnts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 1 rest api에 todoList 요청.
  const getTodoCtnts = async (): Promise<void> => {
    const res: AxiosResponse<any, any> = await (await axios.get(`${url}`, {})).data;
    setUserlist(res.data);
  };

  //  2 rest api에 todo 추가 혹은 수정 요청.
  const handleTodoForm = async (e: any): Promise<void> => {
    e.preventDefault();
     // rest api에 todo 추가 요청.
     await axios.post(`${url}`, singup)
     await getTodoCtnts();
      // // rest api에 todo 수정 요청.
      // await axios.put(`${url}/${singup.id}`, singup);
      // await getTodoCtnts();
      // setSelectedIdx(-1);
  };

  // 3 조회 rest api에 todo 삭제 요청.
  const todoDelete = async (id: string): Promise<void> => {
    await axios.delete(`${url}/${id}`, {});
    setUserlist(userList.filter((singup => singup.id !== id)));
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
            <button onClick={() => todoDelete(user.id)}></button>
          </div>
        ))}
      </div>
      <div>
      <form onSubmit={handleTodoForm}>
          <input
            type='text'
            placeholder='ID'
            onChange={ (e) => setSingup({...singup, userID: e.target.value})}
          />
          <input
            type='text'
            placeholder='PW'
            onChange={ (e) => setSingup({...singup, userPW: e.target.value})}
          />
          <input
            type='text'
            placeholder='NM'
            onChange={ (e) => setSingup({...singup, userNm: e.target.value})}
          />
          <input
            type='text'
            placeholder='email'
            onChange={ (e) => setSingup({...singup, email: e.target.value})}
          />
          <button type="submit">등록</button>
        </form>
      </div>
    </div>
  )
};

export default Singup;