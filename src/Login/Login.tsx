import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRecoilState } from 'recoil';
import { authAtom } from './recoil/authAtom';
import { useNavigate } from 'react-router-dom';

// declare global {
//   interface Window {
//     Kakao: any;
//   }
// }

const Kakao = (window as any).Kakao;

const Login = () => {

  const url = '/login';

  const navigate = useNavigate();

  const [, setAuth] = useRecoilState(authAtom);

  const [input, setInput] = useState({
    userID: "",
    userPW: "",
  })

  const handleInput = (e: any) => {
    const { name, value } = e.target;
    setInput({
      ...input,
      [name]: value
    });
  }


  /**
  * login 버튼 클릭 이벤트
  */
  const onClickLogin = async (e: any): Promise<void> => {
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
        if (res.data.userID === undefined) {
          // id 일치하지 않는 경우
          alert('입력하신 id 혹은 pw가 일치하지 않습니다.')
        } else if (res.data.userID === input.userID) {
          // id, pw 모두 일치 
          console.log('로그인 성공')
          localStorage.setItem('user', JSON.stringify(res.data))
          setAuth(res.data)
          // 작업 완료 되면 페이지 이동(새로고침)
          // navigate("/");
        }
      })
      .catch()
  };


  /**
   * kakao javascript Key
   */
  const jsKey = "56877024f579df1b8545a45be6ced048";

  // SDK는 한 번만 초기화해야 한다.
  // 중복되는 초기화를 막기 위해 isInitialized()로 SDK 초기화 여부를 판단한다.
  if (!Kakao.isInitialized()) {
    console.log(Kakao.isInitialized());
    // JavaScript key를 인자로 주고 SDK 초기화
    Kakao.init(jsKey);
    // SDK 초기화 여부를 확인.
    console.log(Kakao.isInitialized());
  }

  /**
   * 구글 로그인
   * @param e 이벤트 핸들러
   */
  const onClickGoogleLogin = async (e: any) => {
    try {
      const response = await (await axios.get("http://localhost:3001/createAuthLink")).data;
      window.location.href = response.url;
    } catch (error) {
      console.log("App.js 12 | error", error);
      throw new Error("Issue with Login");
    }
  };


  /**
 * 카카오 로그인
 * @param e 이벤트 핸들러
 */
  const onClickKakaoLogin = async (e: any) => {
    await Kakao.Auth.authorize({
      redirectUri: 'http://localhost:3001/redirecturlkakao',
    });
  };


  return (
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
      <div>
        <button type='button' onClick={onClickGoogleLogin}>Google Login</button>
      </div>
      <div>
        <button type='button' id="kakao-login-btn" onClick={onClickKakaoLogin}>Kakao Login</button>
      </div>
      <div>
        <a href="http://localhost:3001/authkakao">카카오 간편 로그인</a>
      </div>
    </div>
  )
}

export default Login;
