/* global window */
import React, { Component } from 'react';
import { AppRouter } from './Router/Router';
import {Provider} from 'unstated';
import { ManifestService } from './Services/ManifestService';
import { MapService } from './Services/MapService';

let manifest = new ManifestService();
let mapService = new MapService();
export class App extends Component {

  render() {
    return (
      <Provider  inject={[manifest, mapService]}>
        <AppRouter />
      </Provider>
    );
  }
}
