import Course from './Course'
import Header from './Header'
import React from 'react'

const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]
  const totalCourse = (course) => course.parts.reduce((acc, el) => acc + el.exercises, 0)
  const coursesMap = (courses) => {
    return (courses.map((course) => {
      return (
        <div key={course.id} >
        <Course course={course} />
        <b>total of {totalCourse(course)} exercises</b>
      </div>
      )
    }))
  }
  return (
    <div>
      <Header text={"Web development curriculum"}/>
      {coursesMap(courses)}
    </div>
  )
}

export default App;