import * as React from "react"
import * as ReactDOM from 'react-dom'
import * as MapBox from "mapbox-gl"

// import { MapContext } from "./main"
/*
TODO:

basic tour timeline
    click on tour to flyto location/area

    location: {
        building
        building
        building
    }
    
    click on building to goto tour
    render popup with info on site

extract coordinates from building a transition city landscape

*/

// export 
// export type MapProps {
// test: string
//     callbackRegistration: (callback: (location: MapBox.LngLat) => void)
// }
type MapProps = {
    callbackRegistration: (callback: (location: MapBox.LngLat) => void) => void
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

    React.useEffect(() => {
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

        localMap.once('style.load', () => {

            loadJSON("http://www.graborenko.org/jackson_churches.json", (data: any) => {
                localMap.addSource('floorplan', data);

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
/*
            // commented out until 
            localMap.addLayer(
                {
                    'id': '3d-buildings',
                    'source': 'composite',
                    'source-layer': 'building',
                    'filter': ['==', 'extrude', 'true'],
                    'type': 'fill-extrusion',
                    'minzoom': 15,
                    'paint': {
                        'fill-extrusion-color': '#aaa',

                        // https://docs.mapbox.com/help/tutorials/mapbox-gl-js-expressions/#what-are-expressions
                        // https://docs.mapbox.com/mapbox-gl-js/style-spec/expressions/

                        // use an 'interpolate' expression to add a smooth transition effect to the
                        // buildings as the user zooms in
                        'fill-extrusion-height': [
                            'interpolate',
                            ['linear'],
                            ['zoom'],
                            15,
                            0,
                            15.05,
                            ['get', 'height']
                        ],
                        'fill-extrusion-base': [
                            'interpolate',
                            ['linear'],
                            ['zoom'],
                            15,
                            0,
                            15.05,
                            ['get', 'min_height']
                        ],
                        'fill-extrusion-opacity': 0.6
                    }
                });
                */

            // const popup = new MapBox.Popup()
                
                //.addTo(localMap)

            let prior_selected: string | number | null = null
            localMap.on('click', 'buildings', function (e) {

                const features = localMap.queryRenderedFeatures(e.point, { layers: ['buildings'] });
                // console.log(features)

                if (features[0].id) {
                    if (prior_selected) {
                        localMap.setFeatureState(
                            { source: "floorplan", id: prior_selected },
                            { selected: false }
                        );
                    }
                    prior_selected = features[0].id
                    localMap.setFeatureState(
                        { source: "floorplan", id: features[0].id },
                        { selected: true }
                    );
                }


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

            });
        })

        /*
        var layers: any = localMap.getStyle().layers;
        var labelLayerId;
        for (var i = 0; i < layers.length; i++) {
            if (layers[i].type === 'symbol' && layers[i].layout['text-field']) {
                labelLayerId = layers[i].id;
                break;
            }
        }

        localMap.addLayer(
        {
            'id': '3d-buildings',
            'source': 'composite',
            'source-layer': 'building',
            'filter': ['==', 'extrude', 'true'],
            'type': 'fill-extrusion',
            'minzoom': 15,
            'paint': {
                'fill-extrusion-color': '#aaa',
                
                // use an 'interpolate' expression to add a smooth transition effect to the
                // buildings as the user zooms in
                'fill-extrusion-height': [
                    'interpolate',
                    ['linear'],
                    ['zoom'],
                    15,
                    0,
                    15.05,
                    ['get', 'height']
                ],
                'fill-extrusion-base': [
                    'interpolate',
                    ['linear'],
                    ['zoom'],
                    15,
                    0,
                    15.05,
                    ['get', 'min_height']
                ],
                'fill-extrusion-opacity': 0.6
            }
        },
        labelLayerId
        );
*/

        setMap(localMap)

        // console.log("value", value);
        callbackRegistration((location: MapBox.LngLat) => {
            console.log("location", location, localMap);
            localMap.flyTo({ center: { lng: location.lng, lat: location.lat } })
        })
        /* TODO add a prop/value for the hook to listen to, 
        and only create a new map if the map is falsy */
    }, [])
    // console.log(test);

    // cleaner way to fetch context updates, we should use this to update the map

    function onClick() {
        callback(new MapBox.LngLat(153.0437, -27.497925));
        // if(map !== null) {
        //     map.flyTo({
        //         center: { lng: 153.0437, lat: -27.497925 }
        //     })
        // }
    }

    // console.log(MapContext, MapContext.Consumer)

    return (
        <div>
            <div id='map' style={{ position: "absolute", left: 0, top: 0, width: '100%', height: '100%' }} />
            <div style={{ position: "absolute", left: 0, bottom: 0, zIndex: 1 }}>
                <button onClick={onClick}> fly to the sea </button>
            </div>
        </div>
    )
}


//////////////////////////