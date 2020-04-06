import * as React from "react"
import * as ReactDOM from 'react-dom'
import * as MapBox from "mapbox-gl"

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

    // const [highlights, setHighlights] = React.useState<(string | number)[]>([]);

    // const getHighlight = () => {
        // return highlights
    // }

    // console.log("RENDER", highlights);

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

        let stateObj: { highlights: (string | number)[] } = { highlights: [] }
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

            //let prior_selected: string | number | null = null
            localMap.on('click', 'buildings', function (e) {

                const features = localMap.queryRenderedFeatures(e.point, { layers: ['buildings'] });

                if (features[0].id) {
                    stateObj.highlights.forEach((id: string | number) => {
                        localMap.setFeatureState(
                            { source: "floorplan", id: id },
                            { selected: false }
                        )
                    })
                    stateObj.highlights = [features[0].id]
                    // if (prior_selected) {
                    //     localMap.setFeatureState(
                    //         { source: "floorplan", id: prior_selected },
                    //         { selected: false }
                    //     );
                    // }
                    // prior_selected = features[0].id
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

        // console.log("value", value);
        callbackRegistration((location: MapBox.LngLat, buildingIds: (string | number)[]) => {
            // console.log("location", location, buildingIds);
            localMap.flyTo({ center: { lng: location.lng, lat: location.lat } })

            // console.log("highlights", getHighlight())
            // console.log("highlights", stateObj.highlights)
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
            // console.log("newHighlights", newHighlights)
            stateObj.highlights = newHighlights
            //setHighlights(newHighlights)
        })

        setMap(localMap)

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