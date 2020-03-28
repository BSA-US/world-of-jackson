import * as React from "react"
import * as MapBox from "mapbox-gl"

// import { MapContext } from "./main"
/*
TODO:
use mapboxgl to highlight buildings & allow selection
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


export function Map ({ callbackRegistration, callback }: MapProps) {    

    const [map, setMap] = React.useState<MapBox.Map | null>(null);

    React.useEffect(() => {
        const localMap: MapBox.Map = new MapBox.Map({
            container: 'map',
            style: 'mapbox://styles/mapbox/streets-v9',
            center: { lng: 153.04370816437722, lat: -27.498025783712994 },
            zoom: 19,
            pitch: 45,
            antialias: true,
            accessToken: 'pk.eyJ1IjoiZ3JhYm9yZW5rbyIsImEiOiJjazdrenBmZmgwMXhjM2xvMDUxczB3bXdrIn0.TuJeI3ekW2M3_ArY0gMeVA'

        })

        localMap.once('style.load', () => {


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
            });
            
            localMap.on('click', '3d-buildings', function(e) {
                new MapBox.Popup()
                .setLngLat(e.lngLat)
                .setHTML(e.features[0].properties.name )
                .addTo(localMap);
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
            localMap.flyTo({ center: { lng: location.lng, lat: location.lat }})
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