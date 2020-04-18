import * as React from "react";
import * as MapBox from "mapbox-gl";
import { Map } from "./map";

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
    buildingIds: ["way/651495815"]
  },
  {
    label: "middle",
    location: new MapBox.LngLat(-90.2091766, 32.3039644),
    buildingIds: ["way/651495823"]

  },
  {
    label: "end",
    location: new MapBox.LngLat(-90.2088766, 32.3039644),
    buildingIds: ["way/651495821", "way/651495819", "way/651495826"]

  }
];

interface MainProps {
}

interface MainState {
  selectedTourNode: string | null,
  infoText: string | null
}

export class Main extends React.Component<MainProps, MainState> {

  private Callbacks: { (location: MapBox.LngLat, buildingIds: (string | number)[]): void }[] = []

  constructor(props: MainProps) {
    super(props);
    this.state = { selectedTourNode: null, infoText: null }
  }
  handleFlyTo(location: MapBox.LngLat, buildingProperty: any | null, buildingIds: (string | number)[] = []) {
    if (buildingProperty !== null) {
      console.log("building clicked", buildingProperty)
      this.setState({ infoText: (buildingProperty.info ? buildingProperty.info : null) })
      return;
    }
    this.setState({ infoText: null })
    this.Callbacks.forEach(callback => {
      callback(location, buildingIds)
    });
  }
    /* interface ideas:
      have a list of locations with coordinates and allow users to input its latitude and longitude in context
    */


  handleTourClick(tourNode: TourNode) {
    this.setState({ selectedTourNode: tourNode.label });
    this.handleFlyTo(tourNode.location, null, tourNode.buildingIds)
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
  renderInfoText() {
    if (this.state.infoText === null) {
      return null
    }
    return (
      <div style={{ position: "absolute", right: "100px", bottom: "100px", backgroundColor: "white" }}>
        { this.state.infoText }
      </div>      
    )
  }
  render() {

    return (
      <div>
        <div style={{ position: "absolute", left: 0, top: 0, width: "100%", height: "100%" }}>
          <Map callbackRegistration={ (callback: (location: MapBox.LngLat, buildingIds: (string | number)[]) => void) => { this.Callbacks.push(callback) } } callback={ this.handleFlyTo.bind(this) }/>
        </div>
        <div style={{ position: "absolute", left: 0, top: 0 }}>
          { tour.map(this.renderTourNode.bind(this) ) }
        </div>
        { this.renderInfoText() }
      </div>
    );
  }
}

