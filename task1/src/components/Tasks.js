import React, { useContext, useRef, useState } from 'react'

import taskContext from '../context/taskContext'

const Tasks = (props) => {
 const context=useContext(taskContext)
 const {deleteTask,mark,unmark,updateTask}=context
 const {task}=props
 const [differ,setDiffer]=useState('regular')
const [updated,setUpdated]=useState('')

 const checkTask=()=>{
   if(differ==='regular'){
     setDiffer('solid')
     const status="marked"
     mark(task.description,status,task._id)
      }
   else{
        setDiffer('regular')
        const status="unmarked"
        unmark(task.description,status,task._id)
        
      }
    }
    const ref=useRef(null)
    const update=(task)=>{
      ref.current.click();
    }
    const oninput=(e)=>{
      setUpdated(e.target.value)
    }
    const handleClick=()=>{
      updateTask(task._id,updated)
    }
  

  return (
    <div className='container'>

      {/* <!-- Button trigger modal --> */}
        <button ref={ref}  type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
          Launch demo modal
        </button>

      {/* <!-- Modal --> */}
      <div className="modal fade" id="exampleModal" tabindex="-1" style={{color:"black"}} >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Update Task</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
            <form className="d-flex my-5">
              <div>
              Enter The Updated Task:
              <input type="text" className="form-control me-2" onChange={oninput}/>
              </div>
            </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" className="btn btn-primary" onClick={handleClick}>Update</button>
            </div>
          </div>
        </div>
      </div>
      <span className='my-3 taskList'>{task.description}
      <div>
      <i className={`fa-${differ} fa-circle-check mx-3`} onClick={checkTask}/>
      <i className="fa-solid fa-pen-to-square mx-3 update" onClick={update} />
      <i className="fa-solid fa-trash mx-3 delete" onClick={()=>{deleteTask(task._id)}}/>
      </div>
      </span>
    </div>
  )
}

export default Tasks
