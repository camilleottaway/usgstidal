import React, { Component } from 'react';
import './Controls.css';
import InputRange from 'react-input-range';
import "react-input-range/lib/css/index.css";
import {Column, Row} from 'simple-flexbox';
import Clock from 'react-live-clock';
import moment from 'moment';
import { Subscribe} from 'unstated';
import { MapService } from '../Services/MapService';
import { ManifestService } from "../Services/ManifestService";
import { ColorBar } from './ColorBar';
import { Toggles } from './Toggles';
// import { requestPointLocationData } from '../Services/PointLocationData';


export class Controls extends Component {

  state = {
    "wind": true,
    "wave": true,
    "pressure": true,
    startDate : '',
  }


  toggleLayer = (layerName) =>{
    //fill out this function.
    this.setState({[layerName]: !this.state[layerName] });

    console.log(layerName);
  }

  getDateLabel = (h)=>{
    var d = new Date()
    var n = d.getTimezoneOffset();
    
    let date = new moment(this.state.startDate); 
    date.add(-n, 'm');
    date.add(h, 'h');
    return date.format('MMMM D, YYYY ha');

    
  }

  //Sets the date state, for use in getDateLabel
  setDate = (manifestDate) => {
  
    if(this.state.startDate !== manifestDate){
      console.log('setting date to: ' + manifestDate);
      this.setState({startDate : manifestDate});
      this.setState({defaultValue : Math.abs(new moment() - new moment(manifestDate))})
    }
  }

  setStartDate = (manifestDate) => {
    var diff = new moment() - new moment(manifestDate);
    diff = diff/3600000;
    console.log("Calculating startValue: " + diff);
    return diff;
  }
  render() {
    return (
      <Subscribe to={[ManifestService, MapService]}>
        {(manifest, mapService) => (
          
          <div>
            <ColorBar
              className="ColorBarPos"
              colors={mapService.state.colors}
            />
            {<Toggles
              className="TogglePos"
              colors={mapService.state.colors}
            /> }

            

            {(mapService.state.navMode && !(mapService.state.layers.pressure || mapService.state.layers.wind)) ? null:             
            (
              <div className="Controls">
                
                <div className="exitbtnholder">
                  <button
                    className="layerbtn exitbtn"
                    onClick={() => {
                      mapService.toggleForecastMode();
                      mapService.toggleNavMode();
                    }}
                  >
                    Close
                  </button>
                </div>
                <div className="ControlArea">

                  <Column horizontal="end">
                    <div className="disClock">
                      
                      <Clock format={"MMMM D, YYYY ha"} ticking={true} />
                    </div>
                  </Column>
                  <Column horizontal="center">
                    <Row horizontal="center" vertical="center">
                      <div className="slider">

                        <InputRange

                          maxValue={47}
                          minValue={0}
                          
                          // value={mapService.state.time}
                          value={mapService.state.time}
                          
                          name={this.setDate(manifest.state.date)}

                          formatLabel={this.getDateLabel}
                          onChange={value => mapService.adjustTime(value)}
                        />
                      </div>
                    </Row>
                  </Column>
                </div>
              </div>
            )}
          </div>
        )}
      </Subscribe>
    );
  }
}

