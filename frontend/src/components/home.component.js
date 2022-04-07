import React, { Component } from 'react';
import Fade from 'react-reveal/Fade';

import ScreenAddress from "./screens/screen_address/screen_address.component";
import ScreenProperties from "./screens/screen_properties/screen_properties.component";
import ScreenResults from "./screens/screen_results/screen_results.component";

export default class Home extends Component {
  constructor(props) {
    super(props);

    // Bind the showComponent(), setBuilting() and setResidualValue() methods so that they can be called from the (child component) screens.
    this.showComponent = this.showComponent.bind(this)
    this.setBuilding = this.setBuilding.bind(this)
    this.setResidualValue = this.setResidualValue.bind(this)

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

  // Method to set the residual value of selected building.
  setResidualValue(residualValue) {
    this.setState({
      residualValue: residualValue
    })
  }

  render() {
    // Get value of showItem..
    const { showItem } = this.state;

    // ..And show the corresponding screen
    return (
      <div>
        {showItem === 'Address' && 
          <Fade>
            <ScreenAddress showComponent={this.showComponent} setBuilding={this.setBuilding}/>
          </Fade>}
        {showItem === 'Properties' && 
          <Fade>
            <ScreenProperties showComponent={this.showComponent} buildingInfo={this.state.building} setResidualValue={this.setResidualValue}/>
          </Fade>}
        {showItem === 'Results' &&
          <Fade>
            <ScreenResults showComponent={this.showComponent} buildingInfo={this.state.building} residualValue={this.state.residualValue}/>
          </Fade>}
      </div>
    )
  }
}