import React, { useState } from 'react';
import axios from 'axios';
import { useRecoilState } from 'recoil';
import { authAtom } from './recoil/authAtom';
import { useNavigate } from 'react-router-dom';
const url = '/login'; 


const Login = () => {
  const [, setAuth] = useRecoilState(authAtom);
  const [input, setInput] = useState({
    userID: "",
    userPW: "",
  })
  
  const navigate = useNavigate();
 
  const handleInput = (e:any) => {
    const { name, value } = e.target;
    setInput({
      ...input, 
      [name]: value 
    });
  }

 /**
 * login 버튼 클릭 이벤트
 */
  const onClickLogin  = async (e: any): Promise<void> => {
    e.preventDefault();
     await axios.get(`${url}`, {
      params: {
      'userID': input.userID,
      'userPW': input.userPW
      }
    })
    .then(res => {
      console.log(res.data)
      console.log('res.data.userID :: ', res.data.userID)
      if(res.data.userID === undefined){
          // id 일치하지 않는 경우
          alert('입력하신 id 혹은 pw가 일치하지 않습니다.')
      } else if(res.data.userID === input.userID) {
          // id, pw 모두 일치 
          console.log('로그인 성공')
          localStorage.setItem('user', JSON.stringify(res.data))
          setAuth(res.data)
          // 작업 완료 되면 페이지 이동(새로고침)
          navigate("/");
      }
  })
  .catch()
  };
    
  return(
    <div>
        <h2>Login</h2>
        <div>
            <label htmlFor='input_id'>ID : </label>
            <input type='text' name='userID' value={input.userID} onChange={handleInput} />
        </div>
        <div>
            <label htmlFor='input_pw'>PW : </label>
            <input type='password' name='userPW' value={input.userPW} onChange={handleInput} />
        </div>
        <div>
            <button type='button' onClick={onClickLogin}>Login</button>
        </div>
    </div>
  )
}
 
export default Login;