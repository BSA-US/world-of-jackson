const DeckGLLayers: any = require("@deck.gl/layers");
const PolygonLayer: any = DeckGLLayers.PolygonLayer;
const SolidPolygonLayer: any = DeckGLLayers.SolidPolygonLayer;
const GeoJsonLayer: any = DeckGLLayers.GeoJsonLayer;

// import SolidPolygonLayer from '../solid-polygon-layer/solid-polygon-layer';
import * as MapBox from "mapbox-gl"

class CustomSolidPolygonLayer extends SolidPolygonLayer {
  constructor(props: any) {
    super(props);
    console.log(props);
  }
}

class CustomGeoJsonLayer extends GeoJsonLayer {
  constructor(props: any) {
    super(props);
  }
  getSubLayerClass(id: any, defaultConstructor: any) {
    //console.log(id);
    if (id === "polygons-fill") {
      // return SolidPolygonLayer
      // console.log(CustomSolidPolygonLayer);
      // return CustomSolidPolygonLayer;
    }
    const result = super.getSubLayerClass(id, defaultConstructor)
    console.log(result);
    return result;
  }

  renderLayers() {
    const layers = super.renderLayers()
    //console.log(layers)
    //layers[4] = false
    return layers
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

export interface LayerParams {
  cam_lat: number
  cam_long: number
  zoom: number
  hash: number
  buildingIds: { [key: string]: true },
  callback: (location: MapBox.LngLat, buildingProperty: object | null) => void
}

export function GetLayers(params: LayerParams) {

  /// creates a dynamic polygon just big enough to cover all visible land area regardless of zoom level
  const size = Math.pow(2, (19 - params.zoom)) * .004
  const landCover = [
    [[params.cam_long - size, params.cam_lat - size], [params.cam_long - size, params.cam_lat + size], [params.cam_long + size, params.cam_lat + size], [params.cam_long + size, params.cam_lat - size]]
  ];
/// creating layers for a base, and to input geojson(our map data)
  const layers = [
      new PolygonLayer({ /// required for shadows to project onto
          id: "ground",
          data: landCover,
          stroked: false,
          getPolygon: (f: any) => f,
          getFillColor: [0, 0, 0.0, 0.0]
      })
      ,new CustomGeoJsonLayer({
          data: 'http://www.graborenko.org/jackson.json',
          opacity: 0.8,
          stroked: false,
          filled: true,
          extruded: true,
          wireframe: true,
          fp64: true,
          // pointRadiusScale: 10,
    
          getElevation: (f: any) => 20,
          // checking the building ids by listening for a change in hashes to determine which building should be highlighted
          getFillColor: (f: any) => {
            const id = `${f.properties["@id"]}`
            if (params.buildingIds[id]) {
              return [0, 255, 255, 255.0]
            }
            return [0, 255, 0, 255.0]
          },
          getLineColor: [255, 255, 255],
          updateTriggers: {
             getFillColor: [params.hash]
          },
          pickable: true,
          onHover: () => {},
          // click actions are used to activate any supplemental features of a building, such as rendering text
          onClick: (f: any) => {
            const id = `${f.object.properties["@id"]}`
            if (params.buildingIds[id]) {
              params.callback(new MapBox.LngLat(f.lngLat[0], f.lngLat[1]), f.object.properties)
            }
            // params.callback(new MapBox.LngLat(f.lngLat[0], f.lngLat[1]))
          }
        })
  ];
  return layers
}
