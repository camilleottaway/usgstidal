import React, { Component } from 'react';
import './Controls.css';
import InputRange from 'react-input-range';
import "react-input-range/lib/css/index.css";
import {Column, Row} from 'simple-flexbox';
import Clock from 'react-live-clock';
import moment from 'moment';
import { Subscribe} from 'unstated';
import { MapService } from '../Services/MapService';
import { ColorBar } from './ColorBar';
<<<<<<< Updated upstream
=======
import { GlobalToggles } from './GlobalToggles';
// import { requestPointLocationData } from '../Services/PointLocationData';

>>>>>>> Stashed changes

export class Controls extends Component {

  state = {
    "wind": true,
    "wave": true,
    "pressure": true,
<<<<<<< Updated upstream
=======
    startDate : '',
    defaultValue: 0,
>>>>>>> Stashed changes
  }

  toggleLayer = (layerName) =>{
    //fill out this function.
    this.setState({[layerName]: !this.state[layerName] });

    console.log(layerName);
  }

  getDateLabel = (h)=>{
<<<<<<< Updated upstream
    let date = new moment();
    date.add(h, 'h');
    return date.format('MMMM D, YYYY ha');
  }

=======
    var d = new Date();
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

>>>>>>> Stashed changes
  render() {
    return (
      <Subscribe to={[MapService]}>
        {mapService => (
          <div>
            <ColorBar
              className="ColorBarPos"
              colors={mapService.state.colors}
            />
            {/* <GlobalToggles
              className="GlobalTogglePos"
              colors={mapService.state.colors}
            /> */}
            {mapService.state.navMode ? null : (
              <div className="Controls">
                <div className="exitbtnholder">
                  <button
                    className="layerbtn exitbtn"
                    onClick={() => {
                      mapService.toggleNavMode();
                    }}
                  >
                    Close
                  </button>
                </div>
                <div className="ControlArea">
                  <button
                    className={
                      mapService.state.layers.wind
                        ? "layerbtn selected"
                        : "layerbtn"
                    }
                    onClick={() => {
                      mapService.toggleLayer("wind");
                    }}
                  >
                    Wind
                  </button>
                  <button
                    className={
                      mapService.state.layers.wave
                        ? "layerbtn selected"
                        : "layerbtn"
                    }
                    onClick={() => {
                      mapService.toggleLayer("wave");
                    }}
                  >
                    Wave
                  </button>
                  <button
                    className={
                      mapService.state.layers.waveDir
                        ? "layerbtn selected"
                        : "layerbtn"
                    }
                    onClick={() => {
                      mapService.toggleLayer("waveDir");
                    }}
                  >
                    Wave Dir.
                  </button>
                  <button
                    className={
                      mapService.state.layers.pressure
                        ? "layerbtn selected"
                        : "layerbtn"
                    }
                    onClick={() => {
                      mapService.toggleLayer("Pressure");
                    }}
                  >
                    Pressure
                  </button>
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
<<<<<<< Updated upstream
=======
                          
                          // value={mapService.state.time}
>>>>>>> Stashed changes
                          value={mapService.state.time}
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
