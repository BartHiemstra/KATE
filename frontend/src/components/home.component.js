import React, { Component } from 'react';
import Fade from 'react-reveal/Fade';

import ScreenAddress from "./screens/screen_address/screen_address.component";
import ScreenProperties from "./screens/screen_properties/screen_properties.component";

const BASE_URL = process.env.REACT_APP_BASE_URL;

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.showComponent = this.showComponent.bind(this)
    this.setBuilding = this.setBuilding.bind(this)

    this.state = {
        showItem: 'Address'
     }
  }

  showComponent(component) {
    this.setState({
      showItem: this.state.showItem = component
    })
  }

  setBuilding(building) {
    this.setState({
      building: building
    })
  }

  render() {
    const { showItem } = this.state;
    return (
      <div>
        {showItem === 'Address' && <Fade><ScreenAddress showComponent={this.showComponent} setBuilding={this.setBuilding}/></Fade>}
        {showItem === 'Properties' && <Fade><ScreenProperties showComponent={this.showComponent} buildingInfo={this.state.building}/></Fade>}
      </div>
    )
  }
}