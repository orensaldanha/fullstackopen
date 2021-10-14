import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Country = ({ country }) => {
  const [weather,setWeather] = useState({})
  const capital = country.capital[0]

  useEffect(() => {
    axios
      .get(`https://api.openweathermap.org/data/2.5/weather?q=${capital}&units=metric&appid=${process.env.REACT_APP_API_KEY}`)
      .then(response => setWeather(response.data))
  }, [capital])

  return (
    <div>
      <h1>{country.name.common}</h1>
      <div>capital {country.capital[0]}</div>
      <div>area {country.area} km<sup>2</sup></div>
      <h2>languages</h2>
      <ul>
        {Object.values(country.languages).map((language, index) => <li key={index}>{language}</li>)}
      </ul>
      <img src={country.flags.png} alt={`${country.name.common}'s flag'`} width="100" height="100"/>

      {Object.keys(weather).length !== 0 &&
        <div>
          <h2>Weather in {country.capital[0]}</h2>
          <div>temperature: {weather.main.temp} Celcius</div>
          <div>{weather.weather[0].description}</div>
          <div>wind: {weather.wind.speed} m/s {weather.wind.deg} deg</div>
        </div>
      }
    </div>
  )
}

const Display = ({ countries, findText, handleShow }) => {
  const filtered_countries = countries.filter(country => country.name.common.toLowerCase().includes(findText.toLowerCase()))

  if (filtered_countries.length > 10) {
    return (
      <div>Too many matches, specify another filter</div>
    )
  } else if (filtered_countries.length > 1) {
    return (
      <div>
        {filtered_countries.map((country,index) => <div key={index}>{country.name.common} <button onClick={() => handleShow(country.name.common)}>show</button></div>)}
      </div>
    )
  } else if (filtered_countries.length === 1) {
    return (
      <div>
        <Country country={filtered_countries[0]} />
      </div>
    )
  } else {
    return null
  }
   
}

const App = () => { 
  const [countries, setCountries] = useState([])
  const [findText, setFindText] = useState('')

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => setCountries(response.data))
  }, [])

  const handleFindText = event => setFindText(event.target.value) 
  const handleShow = name => setFindText(name)

  return (
    <div>
      <div>
        find countries
        <input value={findText} onChange={handleFindText}/>
      </div>
      <Display countries={countries} findText={findText} handleShow={handleShow}/>
    </div>
  )
}

export default App