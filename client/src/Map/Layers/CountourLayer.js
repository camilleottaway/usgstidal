import { PolygonLayer } from "deck.gl";
import contour from "./contour.json";


export const ContourLayer = (currentTime) => new PolygonLayer({
  id: "polygon-layer",
  data: contour[currentTime],
  stroked: false,
  filled: true,
  //extruded: true,
  wireframe: true,
  lineWidthMinPixels: 1,
  getPolygon: d => d.shapes,  
  getFillColor: d => [15,15 , 100 + (d.height * 2000)],
  
});
