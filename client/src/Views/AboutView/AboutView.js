import React, { Component } from "react";
import "./AboutView.css";
import usgs from "./USGS_logo.png";
import western from "./Westernlogo.png";

export class AboutView extends Component {
  render() {
    return (
      <div className="AboutView">
        <h1>About</h1>
        <p className="Text">
          Preliminary real-time wave and water level predictions are generated
          as part of the U. S. Geological Survey's (USGS) Puget Sound Coastal
          Storm Monitoring System (PS-COSMOS). Through a cooperative agreement
          between the USGS Pacific Coastal and Marine Science Center and Western
          Washington University, computer science undergraduates have created a
          dynamic visualization of real-time model predictions. These are served
          online through Western Washington University and are not yet
          peer-reviewed and for testing and demonstration purposes (it is not
          advised to base navigation or life-safety decisions on these
          products).
        </p>

        <h3>Model Details</h3>
        <p className="Text">
          Model predictions of the total water level and wave characteristics
          out 48 in advance are generated every 6 hours as new meteorological
          forecasts are refined. Meteorological inputs (surface winds and
          sea-level pressure) from Environment Canada's HRDPS West coast model
          are used along with predicted tides to drive wave predictions with the
          phase-average model, SWAN (Simulating WAves Nearshore). Long-term
          pressure predictions from Environment Canada's GDPS model are used to
          drive storm surge water level estimates up to 1-week in advance. Model
          predictions are compared to observations at NOAA (National Oceanic and
          Atmospheric Administration) tide and wave gauge locations.
        </p>

        {/*<h2>Visualization Details</h2>
            <p className='Text'>
              The map used to display data is implemented with <a href="https://deck.gl/#/documentation/overview/introduction" className="ref-link">DeckGL.</a>
              The graphs were done with <a href="https://c3js.org/reference.html" className="ref-link"> C3.js.</a>

          </p>*/}

        <h3>Contacts</h3>
        <p className="Text">
          <b>
            Sean C. Crosby:
            <br />
          </b>
          sean.crosby@wwu.edu
          <br />
          <b>
            Eric E. Grossman:
            <br />
          </b>
          egrossman@usgs.gov
          <br />
        </p>
        <h3> 2019 WWU CS Student Development Team</h3>

        <p className="Text">
          Caleb Ouellette
          <br />
          Cristina Feliberti
          <br />
          Gun-Oh Jung
          <br />
          Natasha Ng
          <br />
        </p>

        <div>
          <h3>Brought to you by</h3>
          <img src={usgs} alt="USGSlogo" className="Logo" />
          <img src={western} alt="westernlogo" className="Logo" />
        </div>
      </div>
    );
  }
}
