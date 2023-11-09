import axios from "axios";
import { useEffect, useState } from "react";
import React from "react";

const Details = ({ name, SetDetailsOpen }) => {
  let [info, Setinfo] = useState();
  let [Weather, SetWeather] = useState();
  useEffect(() => {
    axios
      .get(`https://studies.cs.helsinki.fi/restcountries/api/name/${name}`)
      .then((res) => {
        console.log(res.data);
        Setinfo(res.data);
        get_weather_data(res.data);
      });
  }, []);

  let get_weather_data = (data) => {
    let name = data.capital;
    let Key = import.meta.env.VITE_MY_API_KEY;
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=${Key}&units=metric`
      )
      .then((res) => {
        console.log(res.data);
        SetWeather(res.data);
      });
  };
  if (!info || !Weather) {
    return <h2>Loading Details</h2>;
  }

  return (
    <div>
      <button onClick={() => SetDetailsOpen(false)}>Back</button>
      <h3>
        Capital : {info.capital[0]}
        {info.flag}
      </h3>
      <h3>Area : {info.area}</h3>
      <h3>Languages: </h3>
      <ul>
        {Object.values(info.languages).map((l) => (
          <li>{l}</li>
        ))}
        <hr />
        <h2>Flag</h2>
        <img
          src={info.flags.svg}
          width="350px"
          height=" 200px"
          alt={info.flags.alt}
        />
      </ul>
      <hr />
      <h2>Weather in {info.capital}</h2>
      <h3>Temprature - {Weather.main.temp} Celcius</h3>
      <h3>Wind Speed - {Weather.wind.speed}</h3>
      <img></img>
      <img
        src={`http://openweathermap.org/img/w/${Weather.weather[0].icon}.png`}
        width="200px"
        height=" 150px"
        alt=""
      />
    </div>
  );
};

export default Details;
