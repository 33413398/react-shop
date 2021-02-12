import React, { Component } from 'react'

export default class DetailsComponent extends Component {
  render() {
    return <div>666{this.props.match.params.id}</div>
  }
}
