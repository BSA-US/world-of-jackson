const DeckGLLayers: any = require("@deck.gl/layers");
const PolygonLayer: any = DeckGLLayers.PolygonLayer;
const GeoJsonLayer: any = DeckGLLayers.GeoJsonLayer;
import * as MapBox from "mapbox-gl"

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

  const size = Math.pow(2, (19 - params.zoom)) * .004
  const landCover = [
    [[params.cam_long - size, params.cam_lat - size], [params.cam_long - size, params.cam_lat + size], [params.cam_long + size, params.cam_lat + size], [params.cam_long + size, params.cam_lat - size]]
  ];

  const layers = [
      new PolygonLayer({
          id: "ground",
          data: landCover,
          stroked: false,
          // opacity: 0.8,
          getPolygon: (f: any) => f,
          getFillColor: [0, 0, 0.0, 0.0]
      })
      ,new GeoJsonLayer({
          data: 'http://www.graborenko.org/jackson.json',
          opacity: 0.8,
          stroked: false,
          filled: true,
          extruded: true,
          wireframe: true,
          fp64: true,
    
          getElevation: (f: any) => 20,
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
          onClick: (f: any) => {
            const id = `${f.object.properties["@id"]}`
            // console.log(id)
            if (params.buildingIds[id]) {
              //return [0, 255, 255, 255.0]
              params.callback(new MapBox.LngLat(f.lngLat[0], f.lngLat[1]), f.object.properties)
            }

            // params.callback(new MapBox.LngLat(f.lngLat[0], f.lngLat[1]))
          }
        })
  ];
  return layers
}
