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
// import { requestPointLocationData } from '../Services/PointLocationData';


export class Controls extends Component {

  state = {
    "wind": true,
    "wave": true,
    "pressure": true,
    startDate : '',
    dateSet : false,
    dateObject : null,
  }


  toggleLayer = (layerName) =>{
    //fill out this function.
    this.setState({[layerName]: !this.state[layerName] });

    console.log(layerName);
  }

  getDateLabel = (h)=>{

    // console.log("h is ->" + h + "Type is -> " + typeof(h));
    // if (typeof(h) === "number"){
      let date = new moment(h); // eslint-disable-line
      date.add(h, 'h');
      return date.format('MMMM D, YYYY ha');
    // }
  }

  // //This may only run once, could be a problem if manifest.json is updated
  // setDate = (manifestDate) => {
  
  //   if(this.state.startDate !== manifestDate){
  //     console.log('setting date to: ' + manifestDate);
  //     this.setState({startDate : manifestDate});
  //   }
  // }


  render() {
    // const manifestDate = window.manifestDate;
    return (
      <Subscribe to={[ManifestService, MapService]}>
        {(manifest, mapService) => (
          
          <div>
            <ColorBar
              className="ColorBarPos"
              colors={mapService.state.colors}
            />
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
                  {/* <button
                    className={
                      mapService.state.layers.waveContour
                        ? "layerbtn selected"
                        : "layerbtn"
                    }
                    onClick={() => {
                      mapService.toggleLayer("waveContour");
                    }}
                  >
                    Wave Con.
                  </button> */}
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

                          value={mapService.state.time}
                          
                          // temp={this.setDate(manifest.state.data.startDateTime)}
                          // manifestDate = {manifest.state.data.startDateTime} //This doesn't work asynchronously
                                                  

                          // onChange={newState => this.setDate(manifest.state.data.startDateTime)}
                          manifestDate={manifest.state.date}
                          temp={console.log("date -> " + manifest.state.date)}
                                                    
                          formatLabel={manifestDate => this.getDateLabel(manifest.state.date)} //Pass the string here somehow?

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

