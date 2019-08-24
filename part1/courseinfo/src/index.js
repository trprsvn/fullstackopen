import React from 'react'
import ReactDOM from 'react-dom'

const Header = (props) => {
  return (
    <h1>{props.course}</h1>
  );
}
const Total = (props) => {
  const sum = props.total[0].exercises + 
              props.total[1].exercises +
              props.total[2].exercises
  return (
    <p>Number of exercises {sum}</p>
  );
}
const Part = (props) => {

  return (
  <p>
    {props.content.name} {props.content.exercises}
  </p>
  );
}

const Content = (props) => {
  return (
    <div>
      <Part content={props.contents[0]} />
      <Part content={props.contents[1]} />
      <Part content={props.contents[2]} />
    </div>
  );
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header course={course.name} />
      <Content contents={course.parts} />
      <Total total={course.parts} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))