const mongoose= require('mongoose')

const {Schema}= mongoose;

const TaskSchema= new Schema({
    description:{
        type:String,
        required:true
    },
    status:{
        type:String,
        default:"unmarked"
    },
    date:{
        type:Date,
        default:Date.now
    }
})

const TaskList=mongoose.model('tasklists',TaskSchema)

module.exports=TaskList;