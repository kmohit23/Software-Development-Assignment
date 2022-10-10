const express= require('express');
const router=express.Router()
const {body,validationResult}=require('express-validator')
const TaskList=require('../models/Task');



// Route1: Add a task using POST method 
router.post('/add',[
    body('description','Enter the Task').isLength({min:6})
],async(req,res)=>{
    try {
     const {description,status}=req.body;
     const errors=validationResult(req);
     if(!errors.isEmpty()){
        return res.status(400).send({error:errors.array()});
     }
     const task= new TaskList({
        description,status
     })
     const savedTask= await task.save()
     res.json(savedTask)
        
    } catch (error) {
        res.status(500).send("Internal Error Occured")
    }
})

// Route2: Update an existing task using PUT Method 

router.put('/update/:id',[
    body('description','Enter the Task').isLength({min:6})
],async(req,res)=>{
    const {description}=req.body;
    const errors=validationResult(req);
    if(!errors.isEmpty()){
       return res.status(400).send({error:errors.array()});
    }
    try {
        const updatedTask={};
        if(description){updatedTask.description=description};

        let task= await TaskList.findById(req.params.id);
        if(!task){
            return res.status(404).send("Not Found")
        }
        task= await TaskList.findByIdAndUpdate(req.params.id,{$set:updatedTask},{new:true}) 
        res.send({task})

    } catch (error) {   
        res.status(500).send("Some Internal Error Occured")
    }
})
// Route 3: Delete an existing Task Using DELETE Method

router.delete('/delete/:id',async(req,res)=>{
    try {
        let deletedTask= await TaskList.findById(req.params.id)
        if(!deletedTask){
            res.status(400).send("Not Found")
        }
         deletedTask= await TaskList.findByIdAndDelete(req.params.id)
        res.send({"Success":"Task Has been Deleted Succesfully",deletedTask})
    } catch (error) {
        res.status(500).send("Some Internal Error Occured")
    }
})

// Route 4: Fetch all Tasks
router.get('/fetch',async(req,res)=>{
    try {
        let task= await TaskList.find()
        res.json(task)
    } catch (error) {
        res.status(500).send("Some Internal Error Occured")
    }
})

module.exports=router