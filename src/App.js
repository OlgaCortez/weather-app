import React from 'react';
import Weather from "./app_component/weather.component";
import Form from "./app_component/form.component";
import "bootstrap/dist/css/bootstrap.min.css";
import "weather-icons/css/weather-icons.css";
import Rain from "./assets/Rain.jpg";
import Cloudy from "./assets/Cloudy.jpg";
import Drizzle from "./assets/Drizzle.jpg";
import Fog from "./assets/Fog.jpg";
import Snow from "./assets/Snow.jpg";
import Sunny from "./assets/Sunny.jpg";
import Thunder from "./assets/Thunder.jpg";
import './App.css';

// API call to api.openweathermap.org/data/2.5/weather?q=London,uk&appid={API key}

class App extends React.Component {
  constructor(){
    super();
    
    this.state = {
      city: undefined,
      country: undefined,
      icon: undefined,
      background: undefined,
      main: undefined,
      imperial: undefined,
      temp_max: undefined,
      temp_min: undefined,
      description: "",
      error: false
    };
    
    this.weatherIcon = {
      Cloudy: "wi-cloudy",
      Thundersorm: "wi-thunderstorm",
      Rain: "wi-storm-showers",
      Snow: "wi-snow",
      Fog: "wi-fog",
      Clear: "wi-day-sunny",
      Drizzle: "wi-sleet"
    };
    
    
    this.weatherBackground = {
      Rain: Rain,
      Clouds: Cloudy,
      Storm: Thunder,
      Snowing: Snow,
      Fog: Fog,
      Sunny: Sunny,
      Drizzle: Drizzle
    }
    console.log("background images", this.weatherBackground);
  }
  
  
  
  get_WeatherIcon(icons, images, rangeId){
    switch(true){
      case rangeId >= 200 && rangeId <= 232:
        this.setState({ 
          icon: this.weatherIcon.Thundersorm,
          background: this.weatherBackground.Storm
        });
        break;
        case rangeId >= 300 && rangeId <= 321:
          this.setState({ 
            icon: this.weatherIcon.Drizzle,
            background: this.weatherBackground.Drizzle
            
          });
          break;
          case rangeId >= 500 && rangeId <= 531:
            this.setState({ 
              icon: this.weatherIcon.Rain,
              background: this.weatherBackground.Rain
            });
            break;
            case rangeId >= 600 && rangeId <= 622:
              this.setState({ 
                icon: this.weatherIcon.Snow,
                background: this.weatherBackground.Snowing
              });
              break;
              case rangeId >= 700 && rangeId <= 781:
                this.setState({ 
                  icon: this.weatherIcon.Fog,
                  background: this.weatherBackground.Fog
                });
                break;
                case rangeId === 800:
                  this.setState({ 
                    icon: this.weatherIcon.Clear,
                    background: this.weatherBackground.Sunny
                  });
                  break;
                  case rangeId >=801  && rangeId <= 804:
                    this.setState({ 
                      icon: this.weatherIcon.Cloudy,
                      background: this.weatherBackground.Clouds
                    });
                    break;
                    default:
                      this.setState({
                        icon: this.weatherIcon.Cloudy,
                        background: this.weatherBackground.Clouds
                      });
                    }
                  }
                  
                  
                  getWeather = async (e) => {
                    e.preventDefault();
                    
                    const city = e.target.elements.city.value;
                    const country = e.target.elements.country.value;
                    
                    if(city && country){
      const api_call = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${process.env.REACT_APP_API_KEY}&units=imperial`);

    const response = await api_call.json();

    console.log(response);

    this.setState({
      city: `${response.name}, ${response.sys.country}`,
      imperial: response.main.temp,
      temp_max: response.main.temp_max,
      temp_min: response.main.temp_min,
      description: response.weather[0].description,
      error: false,
    });

    this.get_WeatherIcon(this.weatherIcon, this.weatherBackground,  response.weather[0].id);
    } else {
      this.setState({
        error: true
      });
    }

  };
  
  render(){
       const style = {
        backgroundImage: `url(${this.state.background})`,
        height: '100vh',
        backgorundSize: 'cover',
        backgroundPosition: 'center',
    };
  
    return (
      <div className="App" style={style}>
        <Weather 
          city={this.state.city} 
          country={this.state.country} 
          temp={this.state.imperial}
          temp_max={this.state.temp_max}
          temp_min={this.state.temp_min}
          description={this.state.description} 
          weatherIcon={this.state.icon}
          weatherImage={this.state.background}
          />
        <Form loadweather={this.getWeather} error={this.state.error} />
        {console.log("background in return", this.state.background)}
      </div>
    );
  }
};

export default App;