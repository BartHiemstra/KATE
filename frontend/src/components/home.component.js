import React, { Component } from 'react';
import Fade from 'react-reveal/Fade';

import ScreenAddress from "./screens/screen_address/screen_address.component";
import ScreenProperties from "./screens/screen_properties/screen_properties.component";
import ScreenProperties from "./screens/screen_results/screen_results.component";

export default class Home extends Component {
  constructor(props) {
    super(props);

    // Store environment variables in props for other components to use.
    this.API_BASE_URL = process.env.REACT_APP_BASE_URL;
    this.GOOGLE_API_KEY = process.env.REACT_APP_API_GOOGLE_PLACES;

    // Bind the showComponent() and setBuilting() methods so that they can be called.
    this.showComponent = this.showComponent.bind(this)
    this.setBuilding = this.setBuilding.bind(this)

    // Set the state of showItem, which determines which of the screens gets shown.
    this.state = {
        showItem: 'Address'
     }
  }

  // Method to show another component by changing the value of showItem and updating renderer.
  showComponent(component) {
    this.setState({
      showItem: this.state.showItem = component
    })
  }

  // Method to set the buildinginfo of selected building address.
  setBuilding(building) {
    this.setState({
      building: building
    })
  }

  render() {
    // Get value of showItem..
    const { showItem } = this.state;

    // ..And show the corresponding screen
    return (
      <div>
        {showItem === 'Address' && <Fade><ScreenAddress showComponent={this.showComponent} setBuilding={this.setBuilding}/></Fade>}
        {showItem === 'Properties' && <Fade><ScreenProperties showComponent={this.showComponent} buildingInfo={this.state.building}/></Fade>}
        {showItem === 'Results' && <Fade><ScreenResults showComponent={this.showComponent} buildingInfo={this.state.building}/></Fade>}
      </div>
    )
  }
}