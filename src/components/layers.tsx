const DeckGLLayers: any = require("@deck.gl/layers");
const PolygonLayer: any = DeckGLLayers.PolygonLayer;
const GeoJsonLayer: any = DeckGLLayers.GeoJsonLayer;

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

export function GetLayers(cam_lat: number, cam_long: number, zoom: number) {

  const size = Math.pow(2, (19 - zoom)) * .004
  const landCover = [
    [[cam_long - size, cam_lat - size], [cam_long - size, cam_lat + size], [cam_long + size, cam_lat + size], [cam_long + size, cam_lat - size]]
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
            // if (zoom < 15) {
            //   return [0, 255, 255, 255.0]
            // }
            return [0, 255, 0, 255.0]
          },
          getLineColor: [255, 255, 255],
          // updateTriggers: {
          //   getFillColor: [0, 255, 255, 255.0]
          // },
          pickable: true,
          onHover: () => {}
        })
  ];

  return layers;
}
