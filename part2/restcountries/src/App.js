import React, { useState, useEffect } from 'react'
import Weather from './components/Weather'
import axios from 'axios'

const App = ()=> {
  const [searchedCountry, setSearchedCountry] = useState("turkey")
  const [foundCountries, setFoundCountries] = useState([])

  useEffect(() => {
    axios.get('https://restcountries.eu/rest/v2/all')
      .then((res) => {setFoundCountries(res.data)})
  }, [])  

  const filterCountries = (countries) =>
    countries.filter(country =>
      country.name.toLowerCase().includes(searchedCountry.toLowerCase())
    )

  const countryLines = (countries) => 
      countries.map((country) => 
        <div key={country.name}>
          {country.name}  <button onClick={() => 
            countryOnClick(country)}>show</button>
        </div>
      )
  
  const countryOnChange = (event) => {
    setSearchedCountry(event.target.value)
  }

  const countryOnClick = ({name}) => setSearchedCountry(name)

  const displayResults = () => {
    const countries = filterCountries(foundCountries)
    if (countries.length === 1) {
      return (
        <div>
          <h2>{countries[0].name}</h2>
          <div>capital {countries[0].capital}</div>
          <div>population {countries[0].population}</div>
          <h3>languages</h3>
          <ul> {countries[0].languages.map((l) => <li key={l.name}>{l.name}</li>)}</ul>
          <img width="150" alt="flag" src={countries[0].flag}/>
          <Weather country={countries[0]} />
        </div>
      )
    } else if (countries.length < 10) {
      return <div>{countryLines(filterCountries(foundCountries))}</div>
    } else {
      return <div>Too many matches, specify another filter</div>
    }
  }


  return (
    <div>
      <p>find countries <input onChange={countryOnChange} /></p>
       {displayResults()}
    </div>
   )
}

export default App;