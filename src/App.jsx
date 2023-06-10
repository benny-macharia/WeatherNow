import { useState } from 'react'
import axios from 'axios'
import React from "react"


function App(){
    const [input, setInput] = React.useState('')
    const [city, setCity] = React.useState('')
    const [weatherData, setWeatherData] = React.useState(null)
    
    React.useEffect(() =>{
        if(city) {
    fetchWeather() 
    }
    }, [city])
    
    async function fetchWeather(){
    try {
    const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=3ad87395e8fdc587a59f8f071753ad85&&units=metric`)
    const data = response
    setWeatherData(data)
    }catch (error){
        console.log('Failed to fetch weather data:', error);
    }
    }

    
    function handleChange(event){
        setInput(event.target.value)
    }
    
    function handleSubmit(event){
        event.preventDefault()
        setCity(input)
        
    }
    console.log(weatherData)
    
    return(
        <div className='main'>
         <form className="search-tab" onSubmit={handleSubmit}>
            <input
            type="text"
            onChange={handleChange}
            placeholder="Enter the city"
            >
            </input>
            
         </form>
      <div className='weather'>
        <div className='weather-details'>
            {weatherData && (
                <div className='side-details'>
            <h1>{city}</h1>
            <p>Temperature: {Math.round(weatherData.data.main.temp)}°C</p>
            <p>Feels like: {Math.round(weatherData.data.main.feels_like)}°C</p>
            <p>Humidity: {weatherData.data.main.humidity} RH</p>
            <p>Wind speed: {Math.round(weatherData.data.wind.speed)} km/h</p>
            <div className='condition'>
             <h2>
                Conditions: {weatherData.data.weather[0].description} 
                <img
                src={`https://openweathermap.org/img/w/${weatherData.data.weather[0].icon}.png`}
                alt="Weather Icon"
                />
            </h2>
             </div>
           </div>
            )}
            
        </div>
      </div>
        

       
         
        </div>
    )
}

export default App

