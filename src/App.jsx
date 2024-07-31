import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [country, setCountry] = useState('');
  const [weather, setWeather] = useState({
    main: { temp: 'N/A' },
    name: 'N/A',
    weather: [{ description: 'N/A' }],
    wind: { speed: 'N/A' },
  });
  const [currentDate, setCurrentDate] = useState('');
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    setCountry(e.target.value);
  };

  const handleCheckCountry = () => {
    setCurrentDate(new Date().toLocaleString());

    if (country) {
      const apiKey = 'fa8d1dbce184dcc02554506b06b896cc';
      const url = `http://api.openweathermap.org/data/2.5/weather?q=${country}&appid=${apiKey}&units=metric`;

      fetch(url)
        .then(response => {
          if (!response.ok) {
            throw new Error('Error fetching API');
          }
          return response.json();
        })
        .then(data => {
          setWeather(data);
          setError(''); 
        })
        .catch(error => {
          setWeather({
            main: { temp: 'N/A' },
            name: 'N/A',
            weather: [{ description: 'N/A' }],
            wind: { speed: 'N/A' },
          }); 
          setError(error.message);
        });
    }
  };

  return (
    <div className='weatherapp'>
      <div className='weather-container'>
        <h1>Weather App</h1>
        <input
          name='country'
          onChange={handleInputChange}
          placeholder='Your country'
          type="text"
        />
        <button onClick={handleCheckCountry}>Check weather</button>
        {error && <h2>Error: {error}</h2>} 
        
        <h2>°C: {weather.main.temp}°C</h2>
        <h2>Condition: {weather.weather[0].description}</h2>
        <h2>Wind Speed: {weather.wind.speed} m/s</h2>
        <h2>Country: {weather.name}</h2>
        <h2>Date: {currentDate}</h2>
      </div>
    </div>
  );
};

export default App;
