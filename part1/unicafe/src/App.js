import React, { useState } from 'react'

const Button = ({ text, handleClick }) => 
  <button onClick={handleClick}>{text}</button>

const Display = ({ text, counter }) => 
  <div>{text} {counter}</div>

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
      <Display text='good' counter={good} />
      <Display text='neutral' counter={neutral} />
      <Display text='bad' counter={bad} />
    </div>
  )
}

export default App