import { useState } from 'react'
import axios from 'axios';
// import './app.css'

function App() {

  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);

  const apiKey = import.meta.env.VITE_WEATHER_API_KEY

  const fetchWeather = async() => {
    try{
      // const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`)
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`)
      setWeather(response.data);
      setError(null); // clear the error if any
    }catch(error){
      setError();
      setWeather(null);
    }
  }

  const handleInputChange = (event) => { 
    setCity(event.target.value)
  }

  const handleSearch = () => {
    fetchWeather()
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-400">
      <div className='bg-slate-100 p-16 flex flex-col items-center'>
        <p className='font-bold text-2xl text-gray-700 uppercase mb-6'>Weather App</p>
        <div className='flex w-full max-w-md'>
          <input
            className='p-2 mr-2 w-full'
            type="text"
            value={city}
            onChange={ handleInputChange }
            placeholder="Enter city"
          />
          <button className="bg-black text-white px-4 py-2 hover:opacity-80" onClick={ handleSearch }>Search</button>
        </div>

        {error && <p>{error}</p>}

      { weather && (
        <div className ="flex flex-row gap-4 mt-8 text-center">
          <h2 className="font-semibold">City Name: <span className='font-normal'>{ weather.name }</span></h2>
          <p className="font-semibold">Temperature: <span className='font-normal'>{ weather.main.temp }°C</span></p>
          <p className="font-semibold">Weather: <span className='font-normal'>{ weather.weather[0].description }</span> </p>
          <p className="font-semibold">Humidity: <span className='font-normal'> { weather.main.humidity }%</span></p>
          <p className="font-semibold">Wind Speed: <span className='font-normal'>{ weather.wind.speed }m/s</span></p>
        </div>
      )}
      </div>
    </div>
  )
}

export default App
