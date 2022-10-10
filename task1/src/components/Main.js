import React, { useContext, useEffect, useState } from "react";
import taskContext from "../context/taskContext";
import Marked from "./Marked";
import UnMarked from "./UnMarked"
import Tasks from "./Tasks";


const Main=()=>{
    const context=useContext(taskContext)
    const {tasks,fetchTask,addTask,markedTask,unmarkedTask,mlist,unList}=context
    const [desc,setDesc]=useState('')
    // const [updated,setUpdated]=useState('')
    mlist()
    unList()
    useEffect(()=>{
        fetchTask()
        // eslint-disable-next-line
    },[])
    const submitTask=()=>{
        addTask(desc) 
    }
    const onInput=(e)=>{
        setDesc(e.target.value) 
    }


    return(
        <div className="container my-5">
        <h1>Todo Task App</h1>
        <form className="d-flex my-5">
        <input type="text" className="form-control me-2" onChange={onInput}/>
        <button type="submit" className="btn btn-outline-light" onClick={submitTask}>Add</button>
        </form>
        <h2>Tasks:-</h2>
        {tasks && tasks.length!==0?tasks.map((task)=>{
        return <Tasks key={task._id} task={task}/>}):<h3 className="my-5">No Tasks To Display</h3>}
        <div className="d-flex justify-content-between">
        <div>
        <h3>Marked List:-</h3>
        {markedTask && markedTask.length!==0 ? markedTask.map((task)=>{
            return <Marked key={task._id} task={task}/>
        }):<h5>No Marked Task Present To Display</h5>}
        </div>
        <div> 
        <h3>Unmarked List:-</h3>
        {unmarkedTask && unmarkedTask.length!==0 ? unmarkedTask.map((task)=>{
            return <UnMarked key={task._id} task={task}/>
        }):<h5>No Unmarked Task Present To Display</h5>}
        </div>
        </div>
       
        </div>
    );
}
export default Main