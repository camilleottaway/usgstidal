import { Container } from "unstated";

const colorRange = [
  { color: [255 * 0.0078, 255 * 0.0745, 255 * 0.6706], height: 0.5 },
  {color:[0, 0, 255 * 1.0], height: 1.0},
  {color:[0, 255 * 0.5349, 255 * 1.0], height: 1.5},
  {color:[0, 255 * 1.0, 255 * 0.907], height: 2},
  {color:[0, 255 * 1.0, 255 * 0.1628], height: 2.5},
  {color:[255 * 1.0, 255 * 1.0, 0], height: 3},
  {color:[255 * 1.0, 255 * 0.4419, 0], height: 3.5},
  {color:[255 * 1.0, 0, 255 * 0.1163], height: 4},
  {color:[255 * 0.6706, 0, 0], height: 4.5},
  {color:[255 * 1.0, 0, 255 * 0.8605], height: 5},
  {color:[255 * 0.5581, 0, 255 * 0.5581], height: 5.5},
  {color:[255 * 0.0233, 0, 255 * 0.0233], height: 6}
];

export class MapService extends Container {
         state = {
           time: 0,
           layers: {
             wind: true,
             wave: true,
             waveDir: false,
             pressure: true,
             waveContour: false
           },
           colors: colorRange,
           navMode: true
         };

         toggleLayer(layer) {
           let newState = { ...this.state.layers };
           newState[layer] = !this.state.layers[layer];
           this.setState({ layers: newState });
         }

         adjustTime(time) {

           this.setState({ time });
         }

         toggleNavMode() {
           this.setState({ navMode: !this.state.navMode });
         }
       }
