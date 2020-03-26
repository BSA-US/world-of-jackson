import * as React from "react";
import * as MapBox from "mapbox-gl"

import { Map } from "./map";

export interface MainProps {
}

export class Main extends React.Component<MainProps, {}> {

    private Callbacks: { (location: MapBox.LngLat): void }[] = []

    constructor(props: MainProps) {
      super(props);
    }
    handleFlyTo(location: MapBox.LngLat) {
      this.Callbacks.forEach(callback => {
        callback(location)
      });
    }
    /* interface ideas:
      have a list of locations with coorinates and allow users to input its latitude and longitude in context
    */

  //  <MapContext.Provider value={{ lat: -27.498025783712994, lng: 53.04370816437722 }}>
  // <Map callbackRegistration={ (callback: (location: MapBox.LngLat) => void) => { this.Callbacks.push(callback) } } />

    render() {

      return (
        <div>
          <Map callbackRegistration={ (callback: (location: MapBox.LngLat) => void) => { this.Callbacks.push(callback) } } callback={ this.handleFlyTo.bind(this) }/>
          <button onClick={ this.handleFlyTo.bind(this, new MapBox.LngLat(153.0437, -27.497925)) }>Fly To Library</button>
          <button onClick={ this.handleFlyTo.bind(this, new MapBox.LngLat(153.048425, -27.495646)) }>Fly To Park</button>
        </div>
      );
    }
  }

