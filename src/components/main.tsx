import * as React from "react";
import * as MapBox from "mapbox-gl";
import { Map } from "./map";

import { StaticMap } from "react-map-gl";
const DeckGLReact: any = require("@deck.gl/react");
const DeckGLLayers: any = require("@deck.gl/layers");
const DeckGLCore: any = require("@deck.gl/core");

// import {
//   LightingEffect,
//   AmbientLight,
//   _SunLight as SunLight,
//   FlyToInterpolator
// } from "@deck.gl/core";

/*
TODO:
Skeleton:
basic tour timeline
    click on tour to flyto location/area

    location: {
        building
        building
        building
    }
    
    click on building to goto tour
    render popup with info on site
      header at top of map
    tour node has modal/text area fixed on screen
      highlight series of builings in tour node

For later:
extract coordinates from building a transition city landscape

*/

interface TourNode {
  label: string,
  location: MapBox.LngLat
  buildingIds: (string | number)[]
}

const tour: TourNode[] = [
  {
    label: "start", // -90.2093766, lat: 32.3039644
    location: new MapBox.LngLat(-90.2094766, 32.3039644),
    buildingIds: [0, 1]
  },
  {
    label: "middle",
    location: new MapBox.LngLat(-90.2091766, 32.3039644),
    buildingIds: [2]

  },
  {
    label: "end",
    location: new MapBox.LngLat(-90.2088766, 32.3039644),
    buildingIds: []

  }
];

interface MainProps {
}

interface MainState {
  selectedTourNode: string | null
  
}

export class Main extends React.Component<MainProps, MainState> {

  private Callbacks: { (location: MapBox.LngLat, buildingIds: (string | number)[]): void }[] = []

  constructor(props: MainProps) {
    super(props);
    this.state = { selectedTourNode: null }
  }
  handleFlyTo(location: MapBox.LngLat, buildingIds: (string | number)[] = []) {
    this.Callbacks.forEach(callback => {
      callback(location, buildingIds)
    });
  }
    /* interface ideas:
      have a list of locations with coordinates and allow users to input its latitude and longitude in context
    */

  //  <MapContext.Provider value={{ lat: -27.498025783712994, lng: 53.04370816437722 }}>
  // <Map callbackRegistration={ (callback: (location: MapBox.LngLat) => void) => { this.Callbacks.push(callback) } } />
  handleTourClick(tourNode: TourNode) {
    this.setState({ selectedTourNode: tourNode.label });
    this.handleFlyTo(tourNode.location, tourNode.buildingIds)
  }
  renderTourNode(tourNode: TourNode) {
    const buttonStyle: React.CSSProperties = {}
    if (this.state.selectedTourNode === tourNode.label) {
      buttonStyle.color = "red"
    }
    return (
      <div key={ tourNode.label }>
        <button onClick={ this.handleTourClick.bind(this, tourNode) } style={buttonStyle}>
          fly to { tourNode.label }
        </button>
      </div>
    )
  }
  render() {

    /*
    const INITIAL_VIEW_STATE = {
      latitude: 49.2708766,
      longitude: -123.1008337,
      zoom: 15,
      maxZoom: 16,
      pitch: 45,
      bearing: 0
    };

    <div style={{ position: "absolute", left: 0, bottom: 0, width: "100%", height: "40%" }}>

    <DeckGLReact.DeckGL
      layers={ [] }
      effects={ [] }
      initialViewState={INITIAL_VIEW_STATE}
      viewState={INITIAL_VIEW_STATE}
    >
      <StaticMap
        reuseMaps
        mapStyle={ "mapbox://styles/mapbox/dark-v9" }
        preventStyleDiffing={true}
        width={ "100%" }
        height={ "100%" }
        mapboxApiAccessToken={'pk.eyJ1IjoiZ3JhYm9yZW5rbyIsImEiOiJjazdrenBmZmgwMXhjM2xvMDUxczB3bXdrIn0.TuJeI3ekW2M3_ArY0gMeVA'}
      />
    </DeckGLReact.DeckGL>
  </div>
  */


    return (
      <div>
        <div style={{ position: "absolute", left: 0, top: 0, width: "100%", height: "100%" }}>
          <Map callbackRegistration={ (callback: (location: MapBox.LngLat, buildingIds: (string | number)[]) => void) => { this.Callbacks.push(callback) } } callback={ this.handleFlyTo.bind(this) }/>
        </div>
        <div style={{ position: "absolute", left: 0, top: 0 }}>
          { tour.map(this.renderTourNode.bind(this) ) }
        </div>
      </div>
    );
  }
}

