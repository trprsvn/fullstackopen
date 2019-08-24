import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Statistics = ({text, value}) => <tr><td>{text}</td><td>{value}</td></tr>

const Button = ({text, onClick}) => <button onClick={onClick}>{text}</button>

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)

  const handleGood = () => {
    return () => {
      setGood(good + 1)
      setAll(all + 1)
    }
  }
  const handleNeutral = () => {
    return () => {
      setNeutral(neutral + 1)
      setAll(all + 1)
    }
  }
  const handleBad = () => {
    return () => {
      setBad(bad + 1)
      setAll(all + 1)
    }
  }
  const average = (good - bad) / all
  const positive = `${(good / all) * 100} %`
  if(all > 0) {
  return (
    <div>
      <h1>give feedback</h1>
      <Button text={"good"} onClick={handleGood()}/>
      <Button text={"neutral"} onClick={handleNeutral()} />
      <Button text={"bad"} onClick={handleBad()} />

      <h2>statistics</h2>
      <table>
        <tbody>
          <Statistics text={"good"} value={good} />
          <Statistics text={"neutral"} value={neutral} />
          <Statistics text={"bad"} value={bad} />
          <Statistics text={"average"} value={average} />
          <Statistics text={"positive"} value={positive} />
        </tbody>
      </table>

    </div>
  )
  }
  return (
    <div>
      <h1>give feedback</h1>
      <Button text={"good"} onClick={handleGood()}/>
      <Button text={"neutral"} onClick={handleNeutral()} />
      <Button text={"bad"} onClick={handleBad()} />

      <h2>statistics</h2>
      <p>No feedback given</p>
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)