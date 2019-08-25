import React from 'react'
import Part from './Part'
const Content = ({parts}) => {
  const renderParts = () => {
    return parts.map(part => <Part key={part.id} text={part.name} value={part.exercises}/>)
  }
  return (
    <div>
      {renderParts()}
    </div>
  )
}

export default Content