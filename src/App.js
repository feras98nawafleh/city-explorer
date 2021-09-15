import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import Header from './Components/Header';
import SearchForm from './Components/SearchForm';
import LocationData from './Components/LocationData';
import ErrorPage from './Components/ErrorPage';
import Weather from './Components/Weather';

export class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      city: '',
      latitude: '',
      longitude: '',
      src: '',
      showData: false,
      error: false,
      errorMessage: '',
      weatherData: '',
      movies: [],
      showMovies: false,
    }
  }
  locationFinder = (e) => {
    let cityName = e.target.value;
    this.setState({
      city: cityName,
    })
  }

  submitHandler = (e) => {
    e.preventDefault();

    let configuration = {
      method: "GET",
      baseURL: `https:api.locationiq.com/v1/autocomplete.php?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&q=${this.state.city}`,
    }

    axios(configuration).then(response => {
      let data = response.data[0];
      this.setState({
        city: data.display_name,
        longitude: data.lon,
        latitude: data.lat,
        showData: true
      })
    }).catch(err => {
      this.setState({ error: true, errorMessage: err.toString() });
    }).then(() => {
      axios.get(`${process.env.REACT_APP_BACKEND_URL}/weather?latitude=${this.state.latitude}&longitude=${this.state.longitude}`)
        .then(res => {
          this.setState({
            weatherData: res.data,
          });
          console.log(this.state.weatherData);
        });
    });

    axios.get(
      `https://feras-city-explorer-api.herokuapp.com/weather?latitude=${this.state.latitude}&longitude=${this.state.longitude}`
    )
    .then((res) => {
      this.setState({
        weatherData: res.data,
      });
    })
    .catch((err) => {
      this.setState({
        error: err.message,
        showError: true,
      });
    });

  axios.get(
      `https://feras-city-explorer-api.herokuapp.com/movies?place=${this.state.city}`
    )
    .then((res) => {
      this.setState({
        movieData: res.data,
        showMovie:true
      });
      console.log(this.state.movieData)
    });
  }

   render() {
     return (
       <>
         <Header />
         {
           !this.state.error &&
           <SearchForm
             locationFinder={this.locationFinder}
             submitHandler={this.submitHandler}
           /> 
         }
         {
           this.state.showData &&
             <LocationData
               city={this.state.city}
               latitude={this.state.latitude}
               longitude={this.state.longitude}
           />
         }
         {
           this.state.weatherData &&
           this.state.weatherData.map(element => {
             return <Weather date={element.date} description={ element.description }/>
           })
         }
         {
           this.state.error &&
           <ErrorPage errorMessage={this.state.errorMessage} />
         } 
       </>
     )
   }
 }
 export default App;

