const mongoose = require("mongoose");

const TodoSchema = new mongoose.Schema({
    value: String, //할 일을 확인하는 칼럼
    doneAt: Date, // 할 일이 언제 완료되었는지,
    order: Number, //몇번 째 할 일 인지
});
// 데이터 조회시 생성되는 가상의 칼럼으로 반환.
TodoSchema.virtual("todoId").get(function(){
    return this._id.toHexString();
});
TodoSchema.set("toJSON", {virtuals: true});

module.exports = mongoose.model("Todo", TodoSchema);