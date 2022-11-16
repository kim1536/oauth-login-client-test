import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { authAtom } from "../Login/recoil/authAtom";

const Home = () => {

  const auth = useRecoilValue(authAtom);

  // 로그인 상태 관리
  const [isLogin, setIsLogin] = useState<boolean>(false)

  useEffect(() => {
    if(localStorage.getItem('user') === null){
    // localStorage에 user 라는 key 값으로 저장된 값이 없다면
      console.log('isLogin ?? 1:: ', isLogin)
      return;
    } else {
    // localStorage에 user 라는 key 값으로 저장된 값이 있다면
    // 로그인 상태 변경
      console.log('isLogin ?? 2:: ', isLogin) 
      return setIsLogin(true);
    }
  },[isLogin])


  const onLogout = () => {
    // localStorage 에 user 로 저장되어있는 아이템을 삭제한다.
    localStorage.removeItem('user')
    // Home 으로 이동(새로고침)
    window.location.replace("/");
  }


  return (
    <div>
      <h1>Home</h1>
      {isLogin ? <div>Hello~ {auth?.userID} 님</div> : <div>로그인을 해주세요</div> }

      <div>
        <button type='button' onClick={onLogout}>Logout</button>
      </div>
    </div>
  )
};

export default Home;