import React, { Component } from 'react'
import { Accordion } from 'react-bootstrap';

export class Weather extends Component {
  render() {
    return (
    <Accordion defaultActiveKey="0">
      <Accordion.Item eventKey="0">
          <Accordion.Header>
            Press for Details about weather on {this.props.date}
          </Accordion.Header>
          <Accordion.Body>{ this.props.description }</Accordion.Body>
      </Accordion.Item>
    </Accordion>
    )
  }
}

export default Weather;
