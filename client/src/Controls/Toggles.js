import React from 'react';
//import { Component } from 'react';
import "./Toggles.css";
import { MapService } from '../Services/MapService';
import { Subscribe } from 'unstated';
import { ManifestService } from '../Services/ManifestService';
//import { Map } from '../Map/Map';

export const Toggles = (props) => { 

  //TODO: Move the state variables into here

  return (
    <Subscribe to={[ManifestService, MapService]}>
      {(manifest, MapService) => (
      
        <div className="Toggles">
        
            {/* <button
              className={
                MapService.state.layers.wind
                  ? "layerbtn selected"
                  : "layerbtn"
              }
              onClick={() => {
                MapService.toggleLayer("wind");
                // MapService.toggleForecastMode();
              }}
            >
            Wind
            </button>     
            <button
              className={
                MapService.state.layers.pressure
                  ? "layerbtn selected"
                  : "layerbtn"
              }
              onClick={() => {
                // MapService.toggleForecastMode();
                MapService.toggleLayer("pressure");
                console.log("pressure layer = " + MapService.state.layers.pressure);
              }}
            >
            Pressure
            </button>     */}
            {MapService.state.navMode ? null : (
              <div className="ToggleArea">
                <button
                  className ={
                    MapService.state.layers.wave
                      ?  "layerbtn selected"
                      :  "layerbtn"
                  }
                  onClick={() => {
                    MapService.toggleLayer("wave");
                  }}
                >
                Wave
                </button>

                <button
                    className={
                      MapService.state.layers.waveDir
                        ? "layerbtn selected"
                        : "layerbtn"
                    }
                    onClick={() => {
                      MapService.toggleLayer("waveDir");
                    }}
                  >
                  Wave Dir.
                  </button>
            </div>
            )}
        </div>
      )}
    </Subscribe>
  );
}