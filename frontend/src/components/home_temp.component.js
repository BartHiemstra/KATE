import React, { Component } from 'react';
import axios from 'axios';
import Fade from 'react-reveal/Fade';

import ScreenAddress from "./screens/screen_address/screen_address.component";
import ScreenProperties from "./screens/screen_properties/screen_properties.component";

const BASE_URL = process.env.REACT_APP_BASE_URL;

export default class HomeTemp extends Component {
  constructor(props) {
    super(props);

    this.showComponent = this.showComponent.bind(this)

    this.state = {
        showItem: 'Address'
     }
  }

  showComponent(component) {
    this.setState({ showItem: this.state.showItem = component})
  }

  render() {
    const { showItem } = this.state;
    return (
        <div>
            {showItem === 'Address' && <Fade><ScreenAddress showComponent={this.showComponent}/></Fade>}
            {showItem === 'Properties' && <Fade><ScreenProperties showComponent={this.showComponent}/></Fade>}
        </div>
    )
  }
}