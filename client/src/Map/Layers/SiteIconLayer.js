import { TextLayer, PolygonLayer } from 'deck.gl';

const NameLayer = (zoomToSite, data) =>
  new TextLayer({
    id: "site-text-layer",
    data,
    pickable: true,
    getPosition: d => [
      (d.NEpoint[1] + d.SWpoint[1]) / 2,
      (d.NEpoint[0] + d.SWpoint[0]) / 2
    ],
    getText: d => d.siteDisplayName,
    getSize: 32,
    getAngle: 0,
    getTextAnchor: "middle",
    fontFamily: "'Nunito', sans-serif",
    getAlignmentBaseline: "center",
    getColor: [0, 0, 0],
    onClick: d => {
      zoomToSite(d);
    }
  });

const boxlayer = (data, zoomToSite) =>
  new PolygonLayer({
    id: "polygon-layer-outlines",
    data,
    pickable: true,
    stroked: true,
    filled: true,
    wireframe: true,
    lineWidthMinPixels: 1,
    getFillColor: d => [0, 0, 0,0],
    getLineColor: [80, 80, 80],
    getLineWidth: 1,
    pickingRadius: 5,
    getPolygon: x => x.bounds,
    onClick: d => {
      zoomToSite(d);
    }
  });

export const SiteIconLayers = (onSiteClick, spatialDomainsSites) => [
  //SiteIconLayer(onSiteClick, spatialDomainsSites),
  boxlayer(spatialDomainsSites, onSiteClick),
  NameLayer(onSiteClick, spatialDomainsSites)
];
