import "./Graph.css";
import Popup from "reactjs-popup";
import React from "react";

/*
import {WaterNTRGraph} from './WaterNTRGraph'
import {WindSpeedGraph} from './WindSpeedGraph'
import {WaterTWLGraph } from './WaterTWLGraph';
import {WindDirGraph} from './WindDirGraph';
*/

import { WaterGraph } from "./WaterGraph";
/*import { WindGraph } from "./WindGraph";*/

const offset = 30;

export const Graph = ({ x, y, action, site }) => {
  return (
    <div
      style={{ left: x - offset, top: y - offset }}
      className="popup_container"
    >
    <Popup
      trigger={
        <button onClick={() => {}} className="popup_button">
          water graph
        </button>
      }
      modal
    >
      <div className="header">Water Graph: Total Water Level & NTR</div>
      <div className="content">
        <div className="graph_container">
          <WaterGraph site={site}></WaterGraph>
        </div>
      </div>
    </Popup>
    </div>
  );
};
