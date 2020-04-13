const DeckGLLayers: any = require("@deck.gl/layers");
const ScatterplotLayer: any = DeckGLLayers.ScatterplotLayer;
const PolygonLayer: any = DeckGLLayers.PolygonLayer;
const GeoJsonLayer: any = DeckGLLayers.GeoJsonLayer;

const landCover = [
    //[[-123.0, 49.196], [-123.0, 49.324], [-123.306, 49.324], [-123.306, 49.196]]
    //[[-180.0, -90.0], [-180.0, 90.0], [180.0, 90.0], [180.0, -90.0]]
    [[-90.21, 32.3], [-90.21, 32.4], [-90.20, 32.4], [-90.20, 32.3]]
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
    // ,new PolygonLayer({
    //     id: "above-ground",
    //     data: [[[-90.21, 32.3, 10], [-90.21, 32.301, 10], [-90.2099, 32.301, 10], [-90.2099, 32.3, 10]]],
    //     strok[ed: false,
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

export default layers