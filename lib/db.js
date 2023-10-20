const oracledb = require("oracledb");

// Oracle 데이터베이스 연결 정보
const dbConfig = {
  user: "lime",
  password: "lime",
  connectString: "50.10.11.215/XE",
};
// 데이터베이스 연결 함수
async function connectToDatabase() {
  try {
    // 데이터베이스 연결
    const connection = await oracledb.getConnection(dbConfig);
    console.log("Connected to Oracle Database");

    // 연결된 데이터베이스 커넥션 반환
    return connection;
  } catch (error) {
    console.error("Error connecting to Oracle Database:", error.message);
    throw error;
  }
}

// 모듈 내보내기
module.exports = {
  connectToDatabase,
};
