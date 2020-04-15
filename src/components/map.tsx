import * as React from "react"
import * as ReactDOM from 'react-dom'
import * as MapBox from "mapbox-gl"
import { StaticMap } from "react-map-gl";

// const DeckGLCore: any = require("@deck.gl/core");
// const MapController = DeckGLCore.MapController;

const MapboxLayer: any = require("@deck.gl/mapbox");

const DeckGLReact: any = require("@deck.gl/react");

//import layers from './layers';
import { GetLayers } from './layers';
import effects from './effects';

//const ScatterplotLayer: any = require("@deck.gl/layers/scatterplot-layer");
// const DeckGLCore: any = require("@deck.gl/core");
// import DeckGL, {ScatterplotLayer} from 'deck.gl';
// const DeckGL: any = DeckGLReact.DeckGL;

// import { MapContext } from "./main"

// export 
// export type MapProps {
// test: string
//     callbackRegistration: (callback: (location: MapBox.LngLat) => void)
// }
type MapProps = {
    callbackRegistration: (callback: (location: MapBox.LngLat, buildingIds: (string | number)[]) => void) => void
    callback: (location: MapBox.LngLat) => void
}

export class MapPopup extends React.Component<{ }, {}> {
    render() {
        return <div style={{ backgroundColor: "red" }}>map test</div>
    }
}

function loadJSON(url: string, callback: any) {

    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open('GET', url, true);
    xobj.onreadystatechange = function () {
        if (xobj.readyState == 4 && xobj.status == 200) {
            callback(JSON.parse(xobj.responseText));
        }
    };
    xobj.send(null);  
}

export function Map({ callbackRegistration, callback }: MapProps) {

    const [map, setMap] = React.useState<MapBox.Map | null>(null);
    const [gl, setGl] = React.useState<WebGLRenderingContext | null>(null);
    const deckGlContainer = React.useRef<any>(null);

    // center: { lng: -90.2093766, lat: 32.3039644 },

    const [viewState, setViewState] = React.useState<any>({
        latitude: 32.3039644,
        longitude: -90.2094766,
        zoom: 15,
        // maxZoom: 16,
        pitch: 45,
        bearing: 45
    });

    function setViewStateCallback(a: any) {
        setViewState(a.viewState);
    }

    React.useEffect(() => {

        if (!gl || !deckGlContainer.current) {
            return;
        }

        return;

        const deck: any = deckGlContainer.current.deck;

        const getContext = HTMLCanvasElement.prototype.getContext;
        // Hijack canvas.getContext to return our own WebGLContext
        // This will be called inside the mapboxgl.Map constructor
        HTMLCanvasElement.prototype.getContext = (): any => {
          // Unhijack immediately
          HTMLCanvasElement.prototype.getContext = getContext;
          return gl;
        };        
        
        // const { mapStyle = "mapbox://styles/mapbox/dark-v9" } = this.props;

        const localMap: MapBox.Map = new MapBox.Map({
            container: 'map',
            style: 'mapbox://styles/mapbox/streets-v9',
            // center: { lng: 153.04370816437722, lat: -27.498025783712994 },
            center: { lng: -90.2093766, lat: 32.3039644 },
            zoom: 19,
            pitch: 45,
            antialias: true,
            accessToken: 'pk.eyJ1IjoiZ3JhYm9yZW5rbyIsImEiOiJjazdrenBmZmgwMXhjM2xvMDUxczB3bXdrIn0.TuJeI3ekW2M3_ArY0gMeVA'
            //,mapStyle: "mapbox://styles/mapbox/dark-v9"
        })
        localMap.setStyle("mapbox://styles/mapbox/dark-v9");

        let stateObj: { highlights: (string | number)[] } = { highlights: [] }
        localMap.once('style.load', () => {

            var layers = localMap.getStyle().layers;
            console.log(layers);

            localMap.addLayer(new MapboxLayer.MapboxLayer({id: 'my-scatterplot', deck}), 'waterway-label')
            /*
            loadJSON("http://www.graborenko.org/jackson_churches.json", (data: any) => {
                localMap.addSource('floorplan', data);
                localMap.addLayer(new MapboxLayer.MapboxLayer({id: 'my-scatterplot', deck}), 'waterway-label')
                // console.log("DSfds")
                
                localMap.addLayer({
                    'id': 'buildings',
                    'type': 'fill-extrusion',
                    'source': 'floorplan',
                    'paint': {
                    // See the Mapbox Style Specification for details on data expressions.
                    // https://docs.mapbox.com/mapbox-gl-js/style-spec/#expressions
                    
                    // Get the fill-extrusion-color from the source 'color' property.
                    //'fill-extrusion-color': '#088',
                    //'fill-extrusion-color': ['get', 'color'],
                    'fill-extrusion-color': [
                        'case',
                        ['boolean', ['feature-state', 'selected'], false],
                        '#00f',
                        ['get', 'color']
                    ],
                    
                    // Get fill-extrusion-height from the source 'height' property.
                    'fill-extrusion-height': ['get', 'height'],
                    
                    // Get fill-extrusion-base from the source 'base_height' property.
                    'fill-extrusion-base': ['get', 'base_height'],

                    // 'fill-extrusion-opacity': [
                    //     'case',
                    //     ['boolean', ['feature-state', 'hover'], false],
                    //     1,
                    //     0.5
                    // ]                    
                    
                    // Make extrusions slightly opaque for see through indoor walls.
                    // 'fill-extrusion-opacity': 0.5
                    }
                });

            })
            */

            //let prior_selected: string | number | null = null
            localMap.on('click', 'buildings', function (e) {

                const features = localMap.queryRenderedFeatures(e.point, { layers: ['buildings'] });

                console.log(features);
                if (features[0].id) {
                    stateObj.highlights.forEach((id: string | number) => {
                        localMap.setFeatureState(
                            { source: "floorplan", id: id },
                            { selected: false }
                        )
                    })
                    stateObj.highlights = [features[0].id]
                    localMap.setFeatureState(
                        { source: "floorplan", id: features[0].id },
                        { selected: true }
                    );
                }

                /* popup commented out
                const prev = document.getElementById('map-click-popup')
                if (prev) {
                    prev.remove();
                }
                new MapBox.Popup()
                    .setLngLat(e.lngLat)
                    .setHTML(`<div id="map-click-popup">hiiiiiiiii</div>`)
                    .addTo(localMap);
                ReactDOM.render(
                    React.createElement(MapPopup),
                    document.getElementById('map-click-popup')
                );
                */

            });
        })

        callbackRegistration((location: MapBox.LngLat, buildingIds: (string | number)[]) => {
            localMap.flyTo({ center: { lng: location.lng, lat: location.lat } })

            stateObj.highlights.forEach((id: string | number) => {
                localMap.setFeatureState(
                    { source: "floorplan", id: id },
                    { selected: false }
                )
            })

            const newHighlights: (string | number)[] = [];
            buildingIds.forEach((id: string | number) => {
                newHighlights.push(id);
                localMap.setFeatureState(
                    { source: "floorplan", id: id },
                    { selected: true }
                )
            })
            stateObj.highlights = newHighlights
        })

        setMap(localMap)

        /* TODO add a prop/value for the hook to listen to, 
        and only create a new map if the map is falsy */
    }, [gl, deckGlContainer])

    function onClick() {
        callback(new MapBox.LngLat(153.0437, -27.497925));
    }

    // latitude: 32.3039644,
    // longitude: -90.2094766,

    return (
        <div>
            <DeckGLReact.DeckGL
                layers={ GetLayers(viewState.latitude, viewState.longitude, viewState.zoom) }
                effects={ effects }

                // controller={ true }
                // initialViewState={viewState}
                
                controller={ true }
                initialViewState={viewState}
                viewState={viewState}
                onViewStateChange={(state: any) => setViewState(state.viewState)}
        
                onWebGLInitialized = {(gl: WebGLRenderingContext) => { setGl(gl) }}
                ref={deckGlContainer}
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
            <div style={{ position: "absolute", left: 0, bottom: 0, zIndex: 1 }}>
                <button onClick={onClick}> fly to the sea </button>
            </div>
        </div>
    )
}

//////////////////////////