// express를 가져옴.
const express = require("express");

//app과 router를 가져옴. router로 가져온 미니 앱을 합칠 예정.
const app = express();
const router = express.Router();

///get api 생성
router.get("/", (req, res) => {
  res.send("Hi!");
});

//미들 웨어
//express.json()은 body에 들어오는 데이터를 json 형식으로 바꿔서 보여줌.
app.use("/api", express.json(), router);

app.listen(8080, () => {
  console.log("서버가 켜졌어요!");
});