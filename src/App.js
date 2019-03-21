import React, { Component } from 'react';
import Titles from './titles';
import Form from './form';
import Weather from './weather';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const api_key='d793d8945580cab0c833f7c4693889bd';

class App extends Component {

    state = {
    temperature: undefined,
    city: undefined,
    country: undefined,
    humidity: undefined,
    description: undefined,
    error: undefined
  }
  
  getWeather = async (e) => {

  e.preventDefault();
  const city = e.target.elements.city.value;
  const country = e.target.elements.country.value;
  console.log(api_key);
  const api_call = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${api_key}`);
  
  const response = await api_call.json();
  
  console.log(response);
    if(city && country){
    this.setState({
    temperature: response.main.temp,
    city: response.name,
    country: response.sys.country,
    humidity: response.main.humidity,
    description: response.weather[0].description,
    error: ""
  })}else{
      this.setState({error: "Please enter the values..."})
    }
  
  }

  render() {
    return (
      <div>
       <div className="wrapper">
        <div className="main">
         <div className="container">
          <div className="row">
            <div className="col-m-3 title-container">
              <Titles />
            </div>
            <div className="col-m-6 form-container">
              <Form loadWeather={this.getWeather} />
              <Weather
                temperature={this.state.temperature}
                city={this.state.city}
                country={this.state.country}
                humidity={this.state.humidity}
                description={this.state.description}
                error={this.state.error}
              />
            </div>
           </div>
          </div>
         </div>
        </div>
      </div>
    );
  }
}

export default App;
