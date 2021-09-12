import React, { Component } from 'react'

export class ErrorPage extends Component {

  render() {
    return (
      <h1 style={{ textAlign: 'center', color: 'red', marginTop: '100px' }}>{this.props.errorMessage}</h1>
    )
  }
}

export default ErrorPage;
