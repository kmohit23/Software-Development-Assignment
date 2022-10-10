import React from 'react'

const Marked = (props) => {
const {task}= props
  return (
    <div>
      <p>{task.description}</p>
    </div>
  )
}

export default Marked
