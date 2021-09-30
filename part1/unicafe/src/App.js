import React, { useState } from 'react'

const Button = ({ text, handleClick }) => 
  <button onClick={handleClick}>{text}</button>

const StatisticLine = ({ text, value }) => 
  <div>{text} {value}</div>

const Statistics = ({ good, neutral, bad }) => {
  const all = good + neutral + bad

  if (all === 0) {
    return (
      <div>No feedback given</div>
    )
  }
  return (
    <div>
      <StatisticLine text='good' value={good} />
      <StatisticLine text='neutral' value={neutral} />
      <StatisticLine text='bad' value={bad} />
      <StatisticLine text='all' value={all} />
      <StatisticLine text='average' value={(good - bad)/all}/>
      <div>performance {(good / all) * 100} %</div>
    </div>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodClick = () => setGood(good+1)
  const handleNeutralClick = () => setNeutral(neutral+1)
  const handleBadClick = () => setBad(bad+1)

  return (
    <div>
      <h1>give feedback</h1>
      <Button text='good' handleClick={handleGoodClick}/>
      <Button text='neutral' handleClick={handleNeutralClick}/>
      <Button text='bad' handleClick={handleBadClick}/>
      <h2>statistics</h2>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App