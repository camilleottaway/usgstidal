/* global window */
import React, { Component } from "react";
import { StaticMap } from "react-map-gl";
import DeckGL, { FlyToInterpolator } from "deck.gl";
import { WindLayer } from "./Layers/WindLayer";
import { WaveDirection, WaveLayer } from "./Layers/WaveLayer";
import { SiteIconLayers } from "./Layers/SiteIconLayer";
import { ObservationPointLayers } from "./Layers/ObservationPointLayer";
import { Subscribe } from "unstated";
import { ManifestService } from "../Services/ManifestService";
//import { Graph } from "../Graph/Graph";
import { SwellLayer } from './Layers/SwellLayer';
import { MapService } from "../Services/MapService";
import Popup from "reactjs-popup";
import { WaterGraph } from "../Graph/WaterGraph";

//import { ContourLayer } from "./Layers/CountourLayer";

// Set your mapbox token here
const MAPBOX_TOKEN = process.env.REACT_APP_MAP_KEY; // you will need to have this defined in your env! we don't want to check the keys into our public git repo.

if (!MAPBOX_TOKEN) {
  throw new Error(
    `Map key is undefined! Go to the google drive and read the doc under Development/Environment/`
  );
}

class MapComponent extends Component {
  state = {
    viewState: {
      longitude: -122.504624,
      latitude: 48.245207,
      zoom: 10,
      minZoom: 2,
      maxZoom: 15,
      pitch: 0,
      bearing: 0
    },
    displayGraph: false,
    x: 0,
    y: 0,
    hoveredObject: null
  };


  handleMouseObsHover = (info) => {
    if (this.state.toggleDisplayGraph) {
      return;
    }
    if (info.x === -1 || info.y === -1) {
      return;
    }
    this.setState({ x: info.x, y: info.y });    
    this.setState({hoveredObject: info.object});
  };

  // displaying a graph in the popup
  toggleDisplayGraph = () => {
    this.setState({ displayGraph: !this.state.displayGraph });
  };

  closeGraph = () => {
    this.setState({displayGraph: !this.toggleDisplayGraph});
  }
  

  zoomToSite = (site) => {
    this.setState({
      viewState: {
        ...this.state.viewState,
        longitude: site.lngLat[0],
        latitude: site.lngLat[1],
        zoom: 10,
        pitch: 0,
        bearing: 0,
        transitionDuration: 800,
        transitionInterpolator: new FlyToInterpolator()
      }
    });
  };

  onViewStateChange = ({ viewState }) => {
    this.setState({ viewState });
  };

  getLayers = (manifest, map) => {
    let layers = [];
    let icon = "";
    if (map.state.navMode) {
      for (let i = 0; i < manifest.state.pointLocationsSites.length; i++){
        if (manifest.state.pointLocationsSites[0] !== undefined) {
          switch (manifest.state.pointLocationsSites[i].data[0].dataType){
            case "TidePred":
              icon = "/icons_water_level.png";
              break;
            case "WindObs":
              icon = "/icons_wind.png";
              break;
            default:
              console.log("unknown observation type ", manifest.state.pointLocationsSites[i].data[0].dataType);
              break;
          }
          console.log(manifest.state.pointLocationsSites[i], "\n", icon)
          layers = [
            SwellLayer(map.state.time),
            SiteIconLayers(site => {
              this.zoomToSite(site);
              map.toggleNavMode();
              manifest.requestSiteData(site.object.id);
            }, 
            manifest.state.spatialDomainsSites),

            ObservationPointLayers(
              manifest.state.pointLocationsSites,
              this.toggleDisplayGraph,
              this.handleMouseObsHover,
              icon
            )
          ];
        }
      }
    } else if (!manifest.state.loadingCurrentSite && manifest.state.currentSiteData) {      
      layers = [        
        SwellLayer(map.state.time),
        //map.state.layers.waveContour && ContourLayer(map.state.time),
        map.state.layers.wind && WindLayer(map.state.time, manifest.state.currentSiteData.wind),
        map.state.layers.wave && WaveLayer(manifest.state.currentSiteData.wave, map.state.time),
        map.state.layers.waveDir && WaveDirection(manifest.state.currentSiteData.wave, map.state.time),
      ];
    }
    return layers;
  }; 

  render() {
    return (
      <div>
        {this.state.displayGraph ? (
          <div>
        <Popup
          trigger={<span></span>}
          open={this.state.displayGraph}
          modal
        >
          <div className="header">Water Graph: Total Water Level & NTR</div>
          <div className="content">
            <div className="graph_container">
              <WaterGraph site={this.state.hoveredObject}></WaterGraph>
            </div>
          </div>
        </Popup>
        </div>
        ) : null}

        <DeckGL
          layers={this.getLayers(this.props.manifest, this.props.map)}
          initialViewState={this.state.viewState}
          controller={true}
          onViewStateChange={this.onViewStateChange}
          pickingRadius={5}
        >
          <StaticMap
            reuseMaps
            mapStyle="mapbox://styles/mapbox/light-v9"
            preventStyleDiffing={true}
            mapboxApiAccessToken={MAPBOX_TOKEN}
          />
        </DeckGL>
      </div>
    );
  }
}

export const Map = () => (
  <Subscribe to={[ManifestService, MapService]}>
    {(manifest, map) => {
      return <MapComponent map={map} manifest={manifest} />;
    }}
  </Subscribe>
);
