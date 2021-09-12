import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import SearchForm from './Components/SearchForm';
import LocationData from './Components/LocationData';
import ErrorPage from './Components/ErrorPage';

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
      errorMessage: ''
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
      baseURL: `https://api.locationiq.com/v1/autocomplete.php?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&q=${this.state.city}`,
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
    });
  }

  render() {
    return (
      <>
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
          this.state.error &&
          <ErrorPage errorMessage={this.state.errorMessage} />
        } 
      </>
    )
  }
}


export default App;
