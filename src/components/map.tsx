import * as React from "react"
import * as ReactDOM from 'react-dom'
import * as MapBox from "mapbox-gl"
const MapboxLayer: any = require("@deck.gl/mapbox");

const DeckGLReact: any = require("@deck.gl/react");
const DeckGLLayers: any = require("@deck.gl/layers");
const DeckGLCore: any = require("@deck.gl/core");

const LightingEffect: any = DeckGLCore.LightingEffect;
const AmbientLight: any = DeckGLCore.AmbientLight;
const SunLight: any = DeckGLCore._SunLight;
const DirectionalLight: any = DeckGLCore.DirectionalLight;
  
const ScatterplotLayer: any = DeckGLLayers.ScatterplotLayer;
const PolygonLayer: any = DeckGLLayers.PolygonLayer;
const GeoJsonLayer: any = DeckGLLayers.GeoJsonLayer;


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

    const INITIAL_VIEW_STATE = {
        latitude: 32.3039644,
        longitude: -90.2094766,
        zoom: 15,
        maxZoom: 16,
        pitch: 45,
        bearing: 0
    };



    React.useEffect(() => {

        if (!gl || !deckGlContainer.current) {
            return;
        }
        const deck: any = deckGlContainer.current.deck;

        const getContext = HTMLCanvasElement.prototype.getContext;
        // Hijack canvas.getContext to return our own WebGLContext
        // This will be called inside the mapboxgl.Map constructor
        HTMLCanvasElement.prototype.getContext = (): any => {
          // Unhijack immediately
          HTMLCanvasElement.prototype.getContext = getContext;
          return gl;
        };        
        
        const localMap: MapBox.Map = new MapBox.Map({
            container: 'map',
            style: 'mapbox://styles/mapbox/streets-v9',
            // center: { lng: 153.04370816437722, lat: -27.498025783712994 },
            center: { lng: -90.2093766, lat: 32.3039644 },
            zoom: 19,
            pitch: 45,
            antialias: true,
            accessToken: 'pk.eyJ1IjoiZ3JhYm9yZW5rbyIsImEiOiJjazdrenBmZmgwMXhjM2xvMDUxczB3bXdrIn0.TuJeI3ekW2M3_ArY0gMeVA'

        })

        let stateObj: { highlights: (string | number)[] } = { highlights: [] }
        localMap.once('style.load', () => {

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

    const landCover = [
        //[[-123.0, 49.196], [-123.0, 49.324], [-123.306, 49.324], [-123.306, 49.196]]
        //[[-180.0, -90.0], [-180.0, 90.0], [180.0, 90.0], [180.0, -90.0]]
        [[-90.21, 32.3], [-90.21, 32.4], [-90.20, 32.4], [-90.20, 32.3]]
      ];

    //         
      
    const layers = [
        new PolygonLayer({
            id: "ground",
            data: landCover,
            stroked: false,
            // opacity: 0.8,
            getPolygon: (f: any) => f,
            getFillColor: [0, 0, 255.0, 255.0]
        })
        // ,new PolygonLayer({
        //     id: "above-ground",
        //     data: [[[-90.21, 32.3, 10], [-90.21, 32.301, 10], [-90.2099, 32.301, 10], [-90.2099, 32.3, 10]]],
        //     stroked: false,
        //     getPolygon: (f: any) => f,
        //     getFillColor: [0, 255, 0, 255.0]
        // })
        ,new GeoJsonLayer({
            data: 'http://www.graborenko.org/jackson.json',
            opacity: 0.8,
            stroked: false,
            filled: true,
            extruded: true,
            wireframe: true,
            fp64: true,
      
            getElevation: (f: any) => 20,
            getFillColor: (f: any) => [0, 255, 0, 255.0],
            getLineColor: [255, 255, 255],
      
            pickable: true,
            onHover: () => {}
          })
      
        // ,new ScatterplotLayer({
        //   id: 'my-scatterplot',
        //   data: [
        //     {position: [-90.2094766, 32.3039644], size: 10}
        //   ],
        //   getPosition: (d: any) => d.position,
        //   getRadius: (d: any) => d.size,
        //   getColor: [255, 0, 0]
        // })
    ];

    const ambientLight = new AmbientLight({
        color: [255, 255, 255],
        intensity: 1.0
    });
      
    // const dirLight = new SunLight({
    //     timestamp: Date.UTC(2019, 7, 1, 22),
    //     color: [255, 255, 255],
    //     intensity: 1.0,
    //     _shadow: true
    // });
    const dirLight = new DirectionalLight({
        direction: [10, -100, -100],
        color: [255, 255, 255],
        intensity: 1.0,
        _shadow: true
    });
    
    const lightingEffect = new LightingEffect({ ambientLight, dirLight });
    lightingEffect.shadowColor = [0, 0, 0, 0.5];

    // console.log(layers);

    return (
        <div>
            <DeckGLReact.DeckGL
                layers={ layers }
                effects={ [lightingEffect] }
                controller={true}
                initialViewState={INITIAL_VIEW_STATE}
                viewState={INITIAL_VIEW_STATE}
                onWebGLInitialized = {(gl: WebGLRenderingContext) => { setGl(gl) }}
                ref={deckGlContainer}
            ></DeckGLReact.DeckGL>
            <div id='map' style={{ position: "absolute", left: 0, top: 0, width: '100%', height: '100%' }} />
            <div style={{ position: "absolute", left: 0, bottom: 0, zIndex: 1 }}>
                <button onClick={onClick}> fly to the sea </button>
            </div>
        </div>
    )
}

//////////////////////////