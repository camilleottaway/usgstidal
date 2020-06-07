import ArrowLayer from './ArrowLayer';
const windScale = .015;

const colorRange = [
  [0x09, 0x40, 0x74],
  [0x3C, 0x69, 0x97],
  [0x5A, 0xDB, 0xFF],
  [0xFF, 0xDD, 0x4A],
  [0xFE, 0x90, 0x00]
];


function getColor(min, max, value) {
    const step = (max - min) / colorRange.length;
    const colorNum = Math.round(value / step);
    return colorRange[colorNum];
}


export const WindLayer = (currentTime, data)=>{
  console.log(data);
  return ArrowLayer({
            id: 'wind',
            data: data,
            getWidth: 3,
            getSourcePosition: x => [x.lon, x.lat],
            getTargetPosition: x => [x.lon + (x.u[currentTime] * windScale), x.lat + (x.v[currentTime] * windScale)],
            getColor: x => getColor(0, 25, Math.abs(x.v[currentTime]) + Math.abs(x.u[currentTime])),
            updateTriggers: {              
              getTargetPosition: currentTime,
              getSourcePosition: currentTime,
              getColor: currentTime,
            },
        });
}
