import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { Outlet, Link } from "react-router-dom";
import { useRecoilState } from "recoil";
import UserModel from "./recoil/model/userModel";
import { userListAtom } from "./recoil/state/todoAtom";

const Singup = () => {

  const url = 'http://localhost:4000/todo';
  const [todoContents, setTodoContents] = useRecoilState<Array<UserModel>>(userListAtom);
  const [todoContent, setTodoContent] = useState<UserModel>({  
    id: "string",
    userID: "string",
    userPW: "string",
    userNm: "string",
    email: "string",});
  const [selectedIdx, setSelectedIdx] = useState<number>(-1);

  // 화면에 todoList 출력
  useEffect(() => {
    getTodoCtnts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 1 rest api에 todoList 요청.
  const getTodoCtnts = async (): Promise<void> => {
    const res: AxiosResponse<any, any> = await axios.get(`${url}`, {});
    setTodoContents(res.data);
  };

  //  2 rest api에 todo 추가 혹은 수정 요청.
  const handleTodoForm = async (e: any): Promise<void> => {
    e.preventDefault();
    if (selectedIdx === -1) {
      // rest api에 todo 추가 요청.
      await axios.post(`${url}`, todoContent);
      await getTodoCtnts();
    } else {
      // rest api에 todo 수정 요청.
      await axios.put(`${url}/${todoContent.id}`, todoContent);
      await getTodoCtnts();
      setSelectedIdx(-1);
    };
  };

  // 3 조회 rest api에 todo 삭제 요청.
  const todoDelete = async (id: string): Promise<void> => {
    await axios.delete(`${url}/${id}`, {});
    setTodoContents(todoContents.filter((todo => todo.id !== id)));
    setSelectedIdx(-1);
  };

  

  return (
    <div>
      <h1>
          Singup
      </h1>     
    </div>
  )
};

export default Singup;