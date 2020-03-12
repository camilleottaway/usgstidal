import { GridCellLayer } from 'deck.gl';
import ArrowLayer from './ArrowLayer';

/*
TODO #2 Return a new Layer using your data.
For the first pass lets use a hexagon layer. 
See this example https://github.com/uber/deck.gl/tree/6.3-release/examples/website/3d-heatmap

hs - significant wave height, abbreviated as Hsig or H_sig most often. Units are meters. 1
tm - Mean wave period, abbrev is Tm typically. units seconds 1
dp - Mean wave direction [deg], you can use to create arrows 1
lat, lon 1
lat_limits,lon_limits - Extent of domain
lat_boundary, lon_boundary - More detailed boundary 

You can also reference the WindLayer.js to see a working example.
*/
const colorRange = [
  [255 * 0.0078, 255 * 0.0745, 255 * 0.6706, 255],
  [0,            0,            255 * 1.0000, 255],
  [0,            255 * 0.5349, 255 * 1.0000, 255],
  [0,            255 * 1.0000, 255 * 0.9070, 255],
  [0,            255 * 1.0000, 255 * 0.1628, 255],
  [255 * 1.0000, 255 * 1.0000, 0,            255],
  [255 * 1.0000, 255 * 0.4419, 0,            255],
  [255 * 1.0000, 0,            255 * 0.1163, 255],
  [255 * 0.6706, 0,            0,            255],
  [255 * 1.0000, 0,            255 * 0.8605, 255],
  [255 * 0.5581, 0,            255 * 0.5581, 255],
  [255 * 0.0233, 0,            255 * 0.0233, 255],
]

function getColorValue(ft, colorRange) {
  if (ft > 0 && ft < 0.5){
    return colorRange[0]
  }
  else if (ft > 0.5 && ft < 1.0){
    return colorRange[1]
  }
  else if (ft > 1.0 && ft < 1.5){
    return colorRange[2]
  }
  else if (ft > 1.5 && ft < 2.0){
    return colorRange[3]
  }
  else if (ft > 2.0 && ft < 2.5){
    return colorRange[4]
  }
  else if (ft > 2.5 && ft < 3.0){
    return colorRange[5]
  }
  else if (ft > 3.0 && ft < 3.5){
    return colorRange[6]   
  }
  else if (ft > 3.5 && ft < 4.0){
    return colorRange[7]
  }
  else if (ft > 4.0 && ft < 4.5){
    return colorRange[8]
  }
  else if (ft > 4.5 && ft < 5.0){
    return colorRange[9]
  }
  else if (ft > 5.0 && ft < 5.5){
    return colorRange[10]
  }
  else if (ft > 5.5 && ft < 6.0){
    return colorRange[11]
  }
  else {
    return [255,255,255,0]
  }
}

const waveScale = .035;

export const PressureLayer = (data, currentTime) => 
  new GridCellLayer({
    id: "pressure",
    data: data,
    cellSize: 110,
    extruded: false,
    getPosition: x => {
      return [x[0], x[1], 0];      
    },
    getColor: x => {
      if (x[3][currentTime]) {
        var ftVal = 3.2808 * x[3][currentTime];
        return getColorValue(ftVal, colorRange);
      } else { 
        return [0,0,0,0]
      }
    },
    parameters: {
      depthTest: false
    },
    updateTriggers: {
      getColor: currentTime
    }
  })

