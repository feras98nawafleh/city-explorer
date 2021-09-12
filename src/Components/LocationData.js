import React, { Component } from 'react';
import { Card } from 'react-bootstrap';

export class LocationData extends Component {
  render() {
    return (
      <Card style={{ width: '30%'}}>
        <Card.Img
          src={`https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&center=${this.props.latitude},${this.props.longitude}&zoom=1-18`}
          alt={this.props.city}
        />
        <Card.Body>
          <Card.Title>{this.props.city}</Card.Title>
          <Card.Text>
            Latitude: {this.props.latitude}
          </Card.Text>
          <Card.Text>
            Longitude: {this.props.longitude}
          </Card.Text>
        </Card.Body>
      </Card>
    )
  }
}

export default LocationData;
