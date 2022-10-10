const mongoose= require('mongoose')


const mongoURI="mongodb://localhost:27017/task"
const connectToDatabase=()=>{
    mongoose.connect(mongoURI,()=>{
        console.log("Connected to Database")
    })
}
module.exports= connectToDatabase;
