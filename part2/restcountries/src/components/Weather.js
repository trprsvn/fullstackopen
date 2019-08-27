import React, {useState, useEffect} from 'react'
import axios from 'axios'

const Weather = ({country}) => {
  const [weather, setWeather] = useState({})
  const key = "d52ea3759cc84685a5191803192708"
  const capital = country.capital
  const weatherURL = `http://api.apixu.com/v1/current.json?key=${key}&q=${capital}`

  useEffect(() => {
    axios
      .get(weatherURL)
      .then(res => {
          setWeather({
            city: res.data.location.name,
            temperature: res.data.current.temp_c,
            image: res.data.current.condition.icon,
            windKph: res.data.current.wind_kph,
            windDirection: res.data.current.wind_dir
          })
      }
      )
  },[weatherURL])

  return (
    <div>
          <h3>Weather in {weather.city}</h3>
          <p><strong>temperature:</strong> {weather.temperature} Celsius</p>
          <div>
            <img src={weather.image} alt=""/>
          </div>
          <p><strong>wind:</strong> {weather.windKph} kph direction {weather.windDirection}</p>
    </div>
  )
}

export default Weather
