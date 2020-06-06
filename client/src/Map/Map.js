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
import { Graph } from "../Graph/Graph";
//import { SwellLayer } from './Layers/SwellLayer';
import { MapService } from "../Services/MapService";
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
  toggleDisplayGraph = (site) => {
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
    
    if (map.state.navMode) {
      layers = [
        //SwellLayer(map.state.time),
        SiteIconLayers(site => {
          this.zoomToSite(site);
          map.toggleNavMode();
          manifest.requestSiteData(site.object.id);
        }, 
        manifest.state.spatialDomainsSites),
        ObservationPointLayers(
          manifest.state.pointLocationsSites,
          this.toggleDisplayGraph,
          this.handleMouseObsHover
        )
      ];
    }
    
    else if (!manifest.state.loadingCurrentSite && manifest.state.currentSiteData) {      
      layers = [        
        //SwellLayer(map.state.time),
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
          <Graph
            action={this.closeGraph}
            x={this.state.x}
            y={this.state.y}
            site={this.state.hoveredObject}
          />
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
