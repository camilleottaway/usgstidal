import {IconLayer, TextLayer } from 'deck.gl';


const ICON_MAPPING = { 
  marker: {
    x: 0,
    y: 0,
    width: 700,
    height: 600,
    anchorY: 155,
    mask: false
  }
};

const ObservationPointLayer = (toggleDisplayGraph, data, handleHover, icon) => (
  new IconLayer({
    id: "icon-layer",
    data,
    pickable: true,
    iconAtlas: icon,
    iconMapping: ICON_MAPPING,
    sizeScale: 15,
    getPosition: d => [d.Location[1], d.Location[0]],
    getIcon: d => "marker",
    getSize: d => 3.5,
    getColor: [153, 204, 255],//[27, 39, 170],
    onClick: toggleDisplayGraph,
    onHover: handleHover,
    clickRadius: 30
  })
);


const NameLayer = (toggleDisplayGraph, data)=> (
  new TextLayer({
    id: 'text-layer',
    visible: true,
    pickable: true,
    fontFamily: "'Nunito', sans-serif",
    data,
    //fontFamily: 'Century Gothic, sans-serif',
    getPosition: d => [d.Location[1], d.Location[0]],
    getText: d => d.siteDisplayName,
    getSize: 20,
    getTextAnchor: 'middle',
    getAlignmentBaseline: 'bottom',
    getColor: [0, 38, 77],
    onClick: toggleDisplayGraph
  })
);

export const ObservationPointLayers = (pointLocationsSites, toggleDisplayGraph, handleHover, icon)=> 
(
  [
    ObservationPointLayer(toggleDisplayGraph, pointLocationsSites, handleHover, icon), 
    NameLayer(toggleDisplayGraph, pointLocationsSites)
  ]
);
