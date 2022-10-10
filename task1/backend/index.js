const express= require('express')
const connectToDatabase= require('./db')
const cors= require('cors')

connectToDatabase()

const app= express();

const port =8080;
app.use(express.json())
app.use(cors())
app.use('/api/task',require('./routes/task'))
app.use('/api/mark',require('./routes/marked'))
app.listen(port,()=>{
    console.log(`The Server Running at ${port}`)
})