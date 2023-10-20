import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

//로그인페이지
//1. select 기능 만들어보자.
const Login = () => {
  const [userid, setId] = useState("");
  const [pwd, setPassword] = useState("");
  const navigate = useNavigate();

  const onIdHandler = (e) => {
    setId(e.currentTarget.value);
  };

  const onPasswordHandler = (e) => {
    setPassword(e.currentTarget.value);
  };

  const handleLogin = async () => {
    // 사용자 입력을 서버로 전송하여 로그인을 시도합니다.
    console.log("로그인 시도");

    try {
      const response = await axios.post("http://localhost:3001/test", {
        userid,
        pwd,
      });

      if (response.data.message === "로그인 성공") {
        // 로그인 성공 시 리다이렉션 또는 다음 작업을 수행
      } else {
        alert("로그인 실패");
      }
    } catch (error) {
      console.error(error);
      alert("서버 오류");
    }
  };

  console.log("id: ", userid, pwd);

  return (
    <div>
      <div className="LoginArea">
        <div className="Title">
          <h2>Board Nexacro</h2>
        </div>
        <div className="Child">
          <h1>로그인</h1>
          <p>
            <input id="id" onChange={onIdHandler} />
          </p>
          <p>
            <input id="password" onChange={onPasswordHandler} />
          </p>

          <div className="ButtonArea">
            <button onClick={handleLogin}> 로그인</button>
            <button onClick={() => navigate("/singup")}> 회원가입</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
