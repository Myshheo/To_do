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
    const todos = await Todo.find().sort("-order").exec();
    res.send({todos})
});

// 할 일 순서 변경하는 api
router.patch('/todos/:todoId', async(req,res)=>{
    const {todoId} = req.params;
    const {order} = req.body;
    // 1. todoId에 해당하는 할 일 이 있는가?
    // 1-1. 해당하는 할 일이 없다면 에러 출력.
    const currentTodo = await Todo.findById(todoId);
    if (!currentTodo) {
        return res.status(400).json({"errorMessage":"존재하지 않는 할 일 입니다."});
    };
    // 
    if (order){
        const targetTodo = await Todo.findOne({order}).exec();
        if (targetTodo){
            targetTodo.order = currentTodo.order;
            // database 상에 변경된 데이터를 저장.
            await targetTodo.save();
        }
        currentTodo.order = order;
        await currentTodo.save();
    }

    res.status(200).json(req.params)
})


module.exports = router;