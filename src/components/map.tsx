import * as React from "react"
import * as ReactDOM from 'react-dom'
import * as MapBox from "mapbox-gl"

// import { MapContext } from "./main"
/*
TODO:

use mapboxgl to highlight specific buildings
mapbox click & selection of specific buildings driving events
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
                    'fill-extrusion-color': ['get', 'color'],
                    
                    // Get fill-extrusion-height from the source 'height' property.
                    'fill-extrusion-height': ['get', 'height'],
                    
                    // Get fill-extrusion-base from the source 'base_height' property.
                    'fill-extrusion-base': ['get', 'base_height'],
                    
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

            localMap.on('click', 'buildings', function (e) {
                // popup.setLngLat(e.lngLat)

                const features = localMap.queryRenderedFeatures(e.point, { layers: ['buildings'] });
                console.log(features)
                //localMap.setPaintProperty('buildings', 'color', 'green')
                localMap.setFeatureState(
                    { source: "floorplan", id: 1 },
                    { color: "#0f0" }
                );


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


                // popup.remove()
                // setTimeout(() => {
                //     popup.setLngLat(e.lngLat)
                //     .addTo(localMap)
                //     ReactDOM.render(
                //         React.createElement(Test),
                //         document.getElementById('map-click-popup')
                //     );
        
                // })

                /*
                new MapBox.Popup()
                    .setLngLat(e.lngLat)
                    //.setHTML(`<div style="background-color:red">Hello there</div>` )
                    // .setHTML(`hello there ${localMap} `)
                    .setHTML(`<div id="map-click-popup">hiiiiiiiii</div>`)
                    .addTo(localMap);
                console.log()
*/
                // ReactDOM.render(
                //     React.createElement(Test),
                //     document.getElementById('map-click-popup')
                // );

            });
            // ReactDOM.render(
            //     React.createElement(Test),
            //     document.getElementById('map-click-popup')
            // );    

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
            INSERT MAP
                    <button onClick={onClick}> fly to the sea </button>
            <div id='map' style={{ width: '400px', height: '300px' }} />
        </div>
    )
}


//////////////////////////