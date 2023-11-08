// express를 가져옴.
const express = require("express");

//db와 todos.router.js를 연결 / db는 자동으로 실행되게 코드가 짜여있음.
const db = require("./model/index.js");
const todosRouter = require('./routes/todos.router.js')
//app과 router를 가져옴. router로 가져온 미니 앱을 합칠 예정.
const app = express();

//미들 웨어
//express.json(path)은 body에 들어오는 데이터를 json 형식으로 바꿔서 보여줌.
app.use("/api", express.json(), todosRouter);

// express.static() : 정적인 파일들을 연결해주는 middle ware
// 특정 주소로 이동 시 지정된 경로에 있을 시 파일을 전송
// EX) html 파일, png 파일 등
app.use(express.static("./assets"));

//app.listen(포트 번호를 인자로 받음, 연결 성공 시 콜백함수 실행.)
app.listen(8080, () => {
  console.log("서버가 켜졌어요!");
});