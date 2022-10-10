import { useState } from 'react'
import taskContext from './taskContext'

const TaskState =(props)=>{
   const host ="http://localhost:8080/api";
    const task=[]
    const [tasks,setTasks]=useState(task)
   
 
    
    // Using Fetch Api for fecthing all Tasks
    const fetchTask=async()=>{
        const response= await fetch(`${host}/task/fetch`,{
            method:'GET',
            headers:{
                'Content-Type': 'application/json',
            }
        });
        const json = await response.json()
        setTasks(json)
    }

    // Using Fetch Api for Add a Task
    const addTask=async(description)=>{
        const response= await fetch(`${host}/task/add`,{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({description})
        });
        const json = await response.json()
        setTasks(tasks.concat(json))
    }
    // Using Fetch Api for updating a task
    const updateTask=async(id,description)=>{
        const response= await fetch(`${host}/task/update/${id}`,{
            method:'PUT',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({description})
        });
        const json= await response.json()
        console.log(json)
        for(let index in tasks){
            const element = tasks[index]
            if(element._id===id){
                element.description=description;
            }
        }
        setTasks(tasks)
    }
    // Using Fetch API to delete the task
    const deleteTask=async(id)=>{
        const response = await fetch(`${host}/task/delete/${id}`,{
            method:'DELETE',
            headers:{
                'Content-Type':'application/json'
            }
        });
        const json= await response.json()
        console.log(json)
    
        const newTasks= tasks.filter((element)=>{return element._id!==id})
        setTasks(newTasks);
    }
// Using Fetch Api to Post the Marked Task
    
     const mark=async(description,status,id)=>{
        const response= await fetch(`${host}/mark/on/${id}`,{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({description,status})
        });
       const json= await response.json()
       console.log(json)
     }

    //  Using Fetch Api to Update the marked task
  
    const unmark=async(description,status,id)=>{
        const response= await fetch(`${host}/mark/off/${id}`,{ 
            method:'PUT',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({description,status})
        });   
        const json=await response.json()
        console.log(json)
    }

    // Using Fetch Api get the Marked list
    const [markedTask,setMarkedTask]=useState([])
    const mlist=async()=>{
        const response= await fetch(`${host}/mark/mlist`,{
            method:'GET',
            headers:{
                'Content-Type':'application/json'
            }
        });
        const json = await response.json()
        setMarkedTask(json)
    }
    // Using Fetch Api get the Unmarked List
    const[unmarkedTask,setUnmarkedTask]=useState([])
    const unList=async()=>{
        const response= await fetch(`${host}/mark/unlist`,{
            method:'GET',
            headers:{
                'Content-Type':'application/json'
            }
        });
        const json = await response.json();
        setUnmarkedTask(json)
    }

    return(
        <taskContext.Provider value={{tasks,fetchTask,addTask,deleteTask,mark,markedTask,unmark,unmarkedTask,mlist,unList,updateTask}}>
            {props.children}
        </taskContext.Provider>
    )
}

export default TaskState