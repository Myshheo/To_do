const express = require("express");
const router = express.Router();
const Todo = require("../model/todo");

router.get("/", (req,res)=>{
    res.send("hi!");
});


// 할 일 생성 api
router.post('/todos', async(req,res) => {
    const {value} = req.body;
    // Todo table에서 데이터를 조회 order의 값을 역순으로 조회한다.
    const maxOrderByUserId = await Todo.findOne().sort("-order").exec();

    const order = maxOrderByUserId ? 
        maxOrderByUserId.order + 1 : // maxOrderByUserID 가 있을 경우, 
        1; //maxOrderByUserId 가 없을 때
    const todo = new Todo({value,order});
    await todo.save();

    res.send({todo})
});

// 할 일 조회 api
router.get('/todos', async (req,res)=>{
    const todoList = await Todo.find({}).sort({order:-1});
    res.status(200).json(todoList)
    
})


module.exports = router;