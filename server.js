const express = require("express");
const db = require("./lib/db"); // db.js 모듈을 가져옴

const app = express();
// 상수값을 알아서 가져가서 씀
const PORT = 3001;

//CORS 정책에 위반 되어서 프론트엔드 앱과 백엔드 서버가 서로 다른 도메인 또는 포트에서
//실행될 때 에러가 발생한다.  그래서 해당 도메인은 괜찮다고 허용하는 코드임
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000"); // 허용할 프론트엔드 도메인
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE"); // 허용할 HTTP 메서드
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization"); // 허용할 요청 헤더
  res.setHeader("Access-Control-Allow-Credentials", "true"); // 인증 정보 포함 허용 (옵션)
  next();
});

app.listen(PORT, () => {
  console.log(`서버가 포트 ${PORT}에서 실행 중입니다`);
});

app.get("/api/data", async (req, res) => {
  try {
    // db.js 모듈을 통해 데이터베이스에 연결
    const connection = await db.connectToDatabase();

    // 데이터베이스 쿼리 실행
    const result = await connection.execute(
      "SELECT user_id, pwd,user_name FROM USER_TB"
    );

    // 연결 닫기
    await connection.close();

    // 오라클에서 DB 가져온 데이터 컬럼명으로 key value 로 정렬 시켜버리기
    const user_data = result.rows.map((row) => {
      return {
        user_id: row[0],
        pwd: row[1],
        user_name: row[2],
      };
    });

    // JSON 응답 보내기
    res.json(user_data);
  } catch (error) {
    console.error(error);

    // 정보가 포함된 오류 응답 보내기
    res.status(500).json({ error: "오류가 발생했습니다" });
  }
});

// 사용자 로그인 처리
app.post("/login", async (req, res) => {
  const { user_id, pwd } = req.body;

  if (!user_id || !pwd) {
    return res
      .status(400)
      .json({ message: "사용자 이름과 비밀번호를 입력하세요." });
  }

  const connection = await db.getConnection();
  try {
    const query = `SELECT * FROM USER_TB WHERE user_id = :user_id AND pwd = :pwd`;
    const result = await connection.execute(query, { user_id, pwd: pwd });

    if (result.rows.length === 0) {
      return res.status(401).json({ message: "인증 실패" });
    }

    req.session.user = user_id;
    res.json({ message: "로그인 성공" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "서버 오류" });
  } finally {
    connection.close();
  }
});

// 더미데이터 보냄
const exampleData = [
  { user_id: "test", pwd: "1111", user_name: "테스트맨" },
  { user_id: "user", pwd: "2222", user_name: "홀길통" },
];

// 데이터를 제공하는 엔드포인트
app.get("/listData", (req, res) => {
  res.json(exampleData);
});

// 데이터 보내는 것 확인
app.post("/test", (req, res) => {
  const { userid, pwd } = req.body;
  console.log("user_id:", userid);
  console.log("pwd:", pwd);
  res.send("POST 요청이 성공적으로 처리되었습니다.");
});
