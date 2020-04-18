import * as React from "react"
import * as MapBox from "mapbox-gl"
import { StaticMap } from "react-map-gl";

const DeckGLCore: any = require("@deck.gl/core");
const MapboxLayer: any = require("@deck.gl/mapbox");
const DeckGLReact: any = require("@deck.gl/react");

const FlyToInterpolator: any = DeckGLCore.FlyToInterpolator;

import { GetLayers, LayerParams } from './layers';
import effects from './effects';

type MapProps = {
    callbackRegistration: (callback: (location: MapBox.LngLat, buildingIds: (string | number)[]) => void) => void
    callback: (location: MapBox.LngLat, buildingProperty: object | null ) => void
}

export class MapPopup extends React.Component<{ }, {}> {
    render() {
        return <div style={{ backgroundColor: "red" }}>map test</div>
    }
}

export function Map({ callbackRegistration, callback }: MapProps) {

    const [hash, setHash] = React.useState<number>(0);
    const [buildingIds, setBuildingIds] = React.useState<{ [key: string]: true}>({});

    // center: { lng: -90.2093766, lat: 32.3039644 },

    const [viewState, setViewState] = React.useState<any>({
        latitude: 32.3039644,
        longitude: -90.2094766,
        zoom: 15,
        pitch: 45,
        bearing: 45
    });

    function onClick() {
        callback(new MapBox.LngLat(153.0437, -27.497925), null)
    }

    callbackRegistration((location: MapBox.LngLat, buildingIds: (string | number)[]) => {

        const buildingObj: { [key: string]: true } = {}
        buildingIds.forEach((id: string | number) => {
            buildingObj[`${id}`] = true
        })

        setHash(hash + 1);
        setBuildingIds(buildingObj);
        setViewState({
            ...viewState,
            longitude: location.lng,
            latitude: location.lat,
            zoom: 17,
            transitionDuration: 1000,
            transitionInterpolator: new FlyToInterpolator()
        })
    })

    // latitude: 32.3039644,
    // longitude: -90.2094766,

    const layer_params: LayerParams = {
        cam_lat: viewState.latitude,
        cam_long: viewState.longitude,
        zoom: viewState.zoom,
        hash,
        buildingIds: buildingIds,
        callback
    }

    return (
        <div>
            <DeckGLReact.DeckGL
                layers={ GetLayers(layer_params) }
                effects={ effects }

                controller={ true }
                initialViewState={viewState}
                viewState={viewState}
                onViewStateChange={(state: any) => setViewState(state.viewState)}
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