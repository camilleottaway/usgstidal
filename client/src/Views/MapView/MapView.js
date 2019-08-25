import React, { Component } from 'react';
import { Map } from '../../Map/Map';
import { Controls } from '../../Controls/Controls';


export class MapView extends Component{

  
  render() {
    return (
      <div>
        <Map />
        <Controls />
      </div>
    );
  }
}

