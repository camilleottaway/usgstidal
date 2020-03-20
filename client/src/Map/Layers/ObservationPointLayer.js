import {IconLayer, TextLayer } from 'deck.gl';


const ICON_MAPPING = { 
  marker: {
    x: 0,
    y: 0,
    width: 800,
    height: 600,
    anchorY: 155,
    mask: false
  }
};

function retrieveIcon (data){
  // console.log("hello");
  
  if (data[0].dataType === "TideObs" || data[0].dataType === "TidePred"){
    console.log(data[0].dataType);
    return "/icons_water_level.png"
   }
   if (data[0].dataType === "WindObs" || data[0].dataType === "WindPred"){
    console.log(data[0].dataType);
    return "/icons_wind.png"
   }
   if (data[0].dataType === "Swell" || data[0].dataType === "Swell"){
    console.log(data[0].dataType);
    return "/icons_swell.png";
   }
   else{
    return "/icons_wind.png"
   }

}

const ObservationPointLayer = (toggleDisplayGraph, data, handleHover) => (
  new IconLayer({
    id: "icon-layer",
    data,
    pickable: true,
    //iconAtlas: "/icons_water_level.png" ,
    //iconMapping: ICON_MAPPING,
    sizeScale: 15,
    getPosition: d => [d.Location[1], d.Location[0]],
    //getIcon: d => "marker",
    getIcon: d => ({
      url: retrieveIcon(d.data),
      width: 800,
      height: 600,
      anchorY: 155
    }),
    getSize: d => 4,
    //getColor: [27, 39, 170],//[153, 204, 255],//
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

export const ObservationPointLayers = (pointLocationsSites, toggleDisplayGraph, handleHover)=> 
(
  [
    ObservationPointLayer(toggleDisplayGraph, pointLocationsSites, handleHover), 
    NameLayer(toggleDisplayGraph, pointLocationsSites)
  ]
);
