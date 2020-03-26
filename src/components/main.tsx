import * as React from "react";
import * as MapBox from "mapbox-gl"

import { Map } from "./map";

export const FlyToEvent = new Event('FlyToEvent');
// export const MapContext = React.createContext<MapBox.LngLat>(
//   new MapBox.LngLat(53.04370816437722, -27.498025783712994)
// );
export const MapContext = React.createContext<any>(
  null
);
  
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

    render() {

      return (
        <MapContext.Provider value={ (callback: (location: MapBox.LngLat) => void) => { this.Callbacks.push(callback) } }>
          <Map />
          <button onClick={ this.handleFlyTo.bind(this, new MapBox.LngLat(153.0437, -27.497925)) }>Fly To Library</button>
          <button onClick={ this.handleFlyTo.bind(this, new MapBox.LngLat(153.048425, -27.495646)) }>Fly To Park</button>
        </MapContext.Provider>
      );
    }
  }

