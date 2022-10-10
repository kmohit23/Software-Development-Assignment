const express= require('express')
const TaskList = require('../models/Task')
const router= express.Router()



// Route:1 Adding Markedtask using Post Request
router.post('/on/:id',async(req,res)=>{
try {
    const{description,status}=req.body;
    const verify= await TaskList.findById(req.params.id)
  
    if(!verify){
        const marked= new TaskList({
            description,status
        })
        const savedMarked= await marked.save()
        res.json(savedMarked)
    }
    else{
        const updatedMark={}
        if(description){
            updatedMark.description=description
            updatedMark.status=status
        }
        const update= await TaskList.findByIdAndUpdate(req.params.id,{$set:updatedMark},{new:true})
        res.send({update})
    }
} catch (error) {
    res.status(500).send("Some Internal Error Occured")
}
})
// Route2: Updating Marked Task to Unamrked task using PUT request
router.put('/off/:id',async(req,res)=>{
try {
    const{description,status}=req.body;
    const verify= await TaskList.findById(req.params.id)
    if(verify){
        const updatedMark={}
            updatedMark.description=description;
            updatedMark.status=status
        let update= await TaskList.findByIdAndUpdate(req.params.id,{$set:updatedMark},{new:true})
        res.send({update})
    }
} catch (error) {
    res.status(500).send("Internal Error Ocuured")
}
})

// Route 3 : Fetching the Marked task list using GET request
router.get('/mlist',async(req,res)=>{
    try {
        const markedList= await TaskList.find({"status":"marked"})
        res.json(markedList)
    } catch (error) {
        res.status(500).send("Some Internal Error Occured")
    }
})

// Route 4:Fetching The Unmarked List using Get Request
router.get('/unlist',async(req,res)=>{
    try {
        const unmarkedList= await TaskList.find({"status":"unmarked"})
        res.json(unmarkedList)
    } catch (error) {
        res.status(500).send("Some Internal Error Occured")
    }
})

module.exports= router