import './Graph.css'
import Popup from 'reactjs-popup'
import React from 'react';

/*
import {WaterNTRGraph} from './WaterNTRGraph'
import {WindSpeedGraph} from './WindSpeedGraph'
import {WaterTWLGraph } from './WaterTWLGraph';
import {WindDirGraph} from './WindDirGraph';
*/

import {WaterGraph} from './WaterGraph';
import {WindGraph} from './WindGraph';

const offset = 30;

export const Graph = ({ x, y, action, site}) => 
{ 
  return (
    <div
      style={{ left: x - offset, top: y - offset }}
      className="popup_container"
    >      
      <div className="popup_inner"> 
        <p>Click any button to view a graph</p> 
        <button className="popup_button" onClick={action}>X</button>

        <Popup trigger={<button onClick={()=>{}} className="popup_button">water graph</button>} modal>
            {close => (
              <div className="modal">
                 <a className="close"  onClick={close}>&times;</a> 
                <div className="header">Water Graph: Total Water Level & NTR</div>
                <div className="content">

                
                  <div className="graph_container">
                    <WaterGraph site={site} ></WaterGraph>
                  </div>
                
                </div>
                <div className="actions">
                    <button className="button" onClick={close}> close modal</button> 
                </div>
              </div>
            )}
        </Popup>

        <Popup trigger={<button onClick={()=>{}} className="popup_button">wind graph</button>} modal>
          
            {close => (
              <div className="modal">
                 <a className="close"  onClick={close}>&times;</a> 
                <div className="header">Wind Graph: Speed/Gusts & Direction </div>
                <div className="content">
                  <div className="graph_container">
                    <WindGraph site={site} ></WindGraph>
                  </div>
                </div>
                <div className="actions">
                    <button className="button" onClick={close}> close modal</button> 
                </div>
              </div>
            )}
        </Popup>
      </div>
    </div>
  );
}
