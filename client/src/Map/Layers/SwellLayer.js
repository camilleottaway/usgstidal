import {GridCellLayer } from 'deck.gl';
import data from './swell.json';
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
    // else if (ft > 3.5 && ft < 4.0){
    //     return colorRange[7]
    // }
    // else if (ft > 4.0 && ft < 4.5){
    //     return colorRange[8]
    // }
    // else if (ft > 4.5 && ft < 5.0){
    //     return colorRange[9]
    // }
    // else if (ft > 5.0 && ft < 5.5){
    //     return colorRange[10]
    // }
    // else if (ft > 5.5 && ft < 6.0){
    //     return colorRange[11]
    // }
    else {
        return [255,255,255,0]
    }
}
export const SwellLayer = (currentTime) => {
    return new GridCellLayer ({
        id: 'swell',
        data: data,
    cellSize: 300,
    extruded: false,
    elevationScale: 750,
    getPosition: x => {
      // return only relevant positions (e.g. coordinates in water)
      if (x.hs == null) {
        return;
      }
      else {
        return [x.lon, x.lat, 0]
      }
    },
    getElevation: x => x.hs,
    getColor: x => {
      var ftVal = 3.2808 * x.hs
      return getColorValue(ftVal, colorRange)
    },
    parameters: {
      depthTest: false,
    },
    updateTriggers: {
      getElevation: currentTime,
      getColor: currentTime
    },
  });
}