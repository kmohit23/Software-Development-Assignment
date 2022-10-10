import React from 'react'


const UnMarked = (props) => {
  const {task}=props
  return (
    <div>
      <p>{task.description}</p>
    </div>
  )
}

export default UnMarked
