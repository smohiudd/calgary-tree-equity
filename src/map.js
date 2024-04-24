import React, { useRef, useEffect, useState } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import "./map.css";
import { Protocol } from "pmtiles";
import * as MaplibreglCompare from "@maplibre/maplibre-gl-compare";
import "@maplibre/maplibre-gl-compare/dist/maplibre-gl-compare.css";
import { colorMapDiffFlat } from "./color_map.js";
import {
  PopupContent,
  PopupContentDiff,
  PopupContentEquity,
} from "./PopupContent";

const base_imagery = (year) =>
  `https://tiles.arcgis.com/tiles/AVP60cs0Q9PEA8rH/arcgis/rest/services/Calgary_${year}_WMASP/MapServer/WMTS/tile/1.0.0/Calgary_${year}_WMASP/default/default028mm/{z}/{y}/{x}.png`;

const color_map = (year, compareyear) => {
  return [
    "step",
    [
      "*",
      [
        "%",
        ["-", ["get", String(compareyear)], ["get", String(year)]],
        ["get", String(year)],
      ],
      100,
    ], //get percent change
    ...colorMapDiffFlat(),
  ];
};

export default function Map(props) {
  const mapContainer = useRef(null);
  const mapContainerAfter = useRef(null);
  const mapContainerCompare = useRef(null);
  const popUpRef = useRef(
    new maplibregl.Popup({ closeButton: false, closeOnClick: false })
  );
  const popUpContainer = useRef();
  const popUpContainerDiff = useRef();
  const popUpContainerEquity = useRef();
  const [popUpContent, setPopupContent] = useState([]);
  const map = useRef(null);
  const mapAfter = useRef(null);
  const mapCompare = useRef(null);

  const [lng] = useState(-114.0716);
  const [lat] = useState(51.0589);
  const [zoom] = useState(10.5);

  useEffect(() => {
    let protocol = new Protocol();
    maplibregl.addProtocol("pmtiles", protocol.tile);
    return () => {
      maplibregl.removeProtocol("pmtiles");
    };
  }, []);

  useEffect(() => {
    if (map.current) return; // stops map from intializing more than once
    map.current = new maplibregl.Map({
      container: mapContainer.current,
      style: "https://basemaps.cartocdn.com/gl/positron-gl-style/style.json",
      center: [lng, lat],
      zoom: zoom,
    });

    map.current.addControl(new maplibregl.NavigationControl(), "bottom-right");

    map.current.on("load", function () {
      map.current.addSource("base-calgary", {
        type: "raster",
        tiles: [base_imagery(props.year)],
        tileSize: 256,
      });
      map.current.addLayer({
        id: "base-calgary",
        type: "raster",
        source: "base-calgary",
        layout: {
          visibility:
            props.aerialLayer || props.compareAerial ? "visible" : "none",
        },
      });

      map.current.addSource("equity-index", {
        type: "geojson",
        data: process.env.REACT_APP_TREE_EQUITY,
      });

      map.current.addLayer({
        id: "equity-index",
        type: "fill",
        source: "equity-index",
        layout: {
          visibility: props.equityLayer ? "visible" : "none",
        },
        paint: {
          "fill-color": {
            property: "index",
            stops: props.colormapequity,
          },
          "fill-opacity": 0.6,
        },
      });

      map.current.addSource("ct", {
        type: "geojson",
        data: process.env.REACT_APP_TREE_CANOPY,
      });

      map.current.addLayer({
        id: "ct",
        type: "fill",
        source: "ct",
        layout: {
          visibility: props.layer === "cover" ? "visible" : "none",
        },
        paint: {
          "fill-color": {
            property: String(props.year),
            stops: props.colormap,
          },
          "fill-opacity": 0.7,
        },
      });
      map.current.addLayer({
        id: "ct-change",
        type: "fill",
        source: "ct",
        layout: {
          visibility: props.layer === "diff" ? "visible" : "none",
        },
        paint: {
          "fill-color": color_map(props.year, props.compareyear),
          "fill-opacity": 0.7,
        },
      });

      map.current.addSource("trees-cover", {
        type: "vector",
        url: `pmtiles://https://calgarytrees.s3.us-west-2.amazonaws.com/${props.year}.pmtiles`,
      });
      map.current.addLayer({
        id: "trees-cover",
        type: "fill",
        source: "trees-cover",
        "source-layer": "canopy_cover",
        layout: {
          visibility:
            props.canopyLayer || props.compareCanopy ? "visible" : "none",
        },
        paint: {
          "fill-color": "#3acf61",
          "fill-opacity": 0.6,
        },
      });

      map.current.addLayer({
        id: "outline",
        type: "line",
        source: "ct",
        layout: {},
        paint: {
          "line-color": "black",
          "line-width": 1,
        },
      });
    });
  });

  useEffect(() => {
    let priority_columns = [
      "age",
      "visible_minority",
      "language",
      "low_income",
      "unemployed",
    ];

    map.current.on("mousemove", "equity-index", (e) => {
      map.current.getCanvas().style.cursor = "pointer";
      popUpRef.current
        .setLngLat(e.lngLat)
        .setDOMContent(popUpContainerEquity.current)
        .addTo(map.current);

      setPopupContent({
        name: e.features[0].properties.DGUID,
        cover: e.features[0].properties["2020"],
        index: e.features[0].properties.index.toFixed(0),
        year: props.year,
        priority: Object.keys(e.features[0].properties)
          .filter((key) => priority_columns.includes(key))
          .map((key) => ({
            property: key,
            value: e.features[0].properties[key],
          })),
      });
    });

    map.current.on("mouseleave", "equity-index", () => {
      map.current.getCanvas().style.cursor = "";
      popUpRef.current.remove();
    });
  }, []);

  useEffect(() => {
    map.current.on("mousemove", "ct", (e) => {
      map.current.getCanvas().style.cursor = "pointer";
      popUpRef.current
        .setLngLat(e.lngLat)
        .setDOMContent(popUpContainer.current)
        .addTo(map.current);

      setPopupContent({
        name: e.features[0].properties.name,
        frac: e.features[0].properties[props.year],
        year: props.year,
      });
    });

    map.current.on("mouseleave", "ct", () => {
      map.current.getCanvas().style.cursor = "";
      popUpRef.current.remove();
    });
  }, [props.year]);

  useEffect(() => {
    map.current.on("mousemove", "ct-change", (e) => {
      map.current.getCanvas().style.cursor = "pointer";

      let current_year = e.features[0].properties[props.year];
      let next_year = e.features[0].properties[props.compareyear];

      popUpRef.current
        .setLngLat(e.lngLat)
        .setDOMContent(popUpContainerDiff.current)
        .addTo(map.current);

      setPopupContent({
        name: e.features[0].properties.name,
        diff: (((next_year - current_year) / current_year) * 100).toFixed(2),
        current_year: props.year,
        next_year: props.compareyear,
      });
    });

    map.current.on("mouseleave", "ct-change", () => {
      map.current.getCanvas().style.cursor = "";
      popUpRef.current.remove();
    });
  }, [props.year, props.compareyear]);

  useEffect(() => {
    if (mapAfter.current) return;

    mapAfter.current = new maplibregl.Map({
      container: mapContainerAfter.current,
      style: "https://basemaps.cartocdn.com/gl/positron-gl-style/style.json",
      center: [lng, lat],
      zoom: zoom,
    });

    mapAfter.current.on("load", function () {
      mapAfter.current.addSource("base-calgary", {
        type: "raster",
        tiles: [base_imagery(props.compareyear)],
        tileSize: 256,
      });
      mapAfter.current.addLayer({
        id: "base-calgary",
        type: "raster",
        source: "base-calgary",
        layout: {
          visibility:
            props.aerialLayer || props.compareAerial ? "visible" : "none",
        },
      });

      mapAfter.current.addSource("trees", {
        type: "vector",
        url: `pmtiles://https://calgarytrees.s3.us-west-2.amazonaws.com/${props.compareyear}.pmtiles`,
      });
      mapAfter.current.addLayer({
        id: "trees",
        type: "fill",
        source: "trees",
        "source-layer": "canopy_cover",
        layout: {
          visibility:
            props.canopyLayer || props.compareCanopy ? "visible" : "none",
        },
        paint: {
          "fill-color": "#3acf61",
          "fill-opacity": 0.6,
        },
      });

      mapAfter.current.addSource("ct", {
        type: "geojson",
        data: process.env.REACT_APP_TREE_CANOPY,
      });

      mapAfter.current.addLayer({
        id: "outline",
        type: "line",
        source: "ct",
        layout: {},
        paint: {
          "line-color": "#A9A9A9",
          "line-width": 1,
        },
      });
    });
    mapCompare.current = new MaplibreglCompare(
      map.current,
      mapAfter.current,
      mapContainerCompare.current,
      {
        mousemove: false,
        orientation: "vertical",
      }
    );
  });

  useEffect(() => {
    if (!mapCompare.current && !props.compare);
    else if (mapCompare.current && !props.compare) {
      mapCompare.current.remove();
    } else {
      let center = map.current.getCenter();
      let zoom = map.current.getZoom();
      let bearing = map.current.getBearing();
      let pitch = map.current.getPitch();

      mapAfter.current.jumpTo({
        center: center,
        zoom: zoom,
        bearing: bearing,
        pitch: pitch,
      });

      mapCompare.current = new MaplibreglCompare(
        map.current,
        mapAfter.current,
        mapContainerCompare.current,
        {
          mousemove: false,
          orientation: "vertical",
        }
      );
    }
  }, [props.compare]);

  // Turn on or off layers
  useEffect(() => {
    if (!map.current.isStyleLoaded()) return;

    //vector tree canopy layer
    map.current.setLayoutProperty(
      "trees-cover",
      "visibility",
      props.canopyLayer || props.compareCanopy ? "visible" : "none"
    );
    mapAfter.current.setLayoutProperty(
      "trees",
      "visibility",
      props.canopyLayer || props.compareCanopy ? "visible" : "none"
    );

    //base aerial imagery
    map.current.setLayoutProperty(
      "base-calgary",
      "visibility",
      props.aerialLayer || props.compareAerial ? "visible" : "none"
    );
    mapAfter.current.setLayoutProperty(
      "base-calgary",
      "visibility",
      props.aerialLayer || props.compareAerial ? "visible" : "none"
    );

    //coverage by census tract
    map.current.setLayoutProperty(
      "ct",
      "visibility",
      props.layer === "cover" ? "visible" : "none"
    );

    //canopy change
    map.current.setLayoutProperty(
      "ct-change",
      "visibility",
      props.layer === "diff" ? "visible" : "none"
    );

    //index
    map.current.setLayoutProperty(
      "equity-index",
      "visibility",
      props.equityLayer ? "visible" : "none"
    );
  }, [
    props.canopyLayer,
    props.compareCanopy,
    props.aerialLayer,
    props.compareAerial,
    props.layer,
    props.equityLayer,
  ]);

  // Update Data Map 1
  useEffect(() => {
    if (!map.current.isStyleLoaded()) return;

    map.current.getSource("base-calgary").setTiles([base_imagery(props.year)]);
    map.current
      .getSource("trees-cover")
      .setUrl(
        `pmtiles://https://calgarytrees.s3.us-west-2.amazonaws.com/${props.year}.pmtiles`
      );
    map.current.setPaintProperty("ct", "fill-color", {
      property: String(props.year),
      stops: props.colormap,
    });
    map.current.setPaintProperty(
      "ct-change",
      "fill-color",
      color_map(props.year, props.compareyear)
    );
  }, [props.year, props.compareyear, props.colormap]);

  // Update Data Map 2
  useEffect(() => {
    if (!mapAfter.current.isStyleLoaded()) return;

    mapAfter.current
      .getSource("base-calgary")
      .setTiles([base_imagery(props.compareyear)]);
    mapAfter.current
      .getSource("trees")
      .setUrl(
        `pmtiles://https://calgarytrees.s3.us-west-2.amazonaws.com/${props.compareyear}.pmtiles`
      );
  }, [props.compareyear]);

  function CompareYear({ year, compareyear }) {
    return (
      <div>
        <div className="color-white txt-h2 txt-bold flex-parent flex-parent--center-cross flex-parent--center-main  absolute bottom left ml36 mb36 py6 px6 bg-green">
          <div className="flex-child">{year}</div>
        </div>
        <div className="color-white txt-h2 txt-bold flex-parent flex-parent--center-cross flex-parent--center-main absolute bottom right mr36 mb36 py6 px6 bg-green">
          <div className="flex-child">{compareyear}</div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div ref={mapContainerCompare} className="map ">
        <div ref={mapContainer} className="map" />
        <div ref={mapContainerAfter} className="map" />
      </div>
      <div ref={mapContainer} className="map" />

      <PopupContent ref={popUpContainer} content={popUpContent} />

      <PopupContentDiff ref={popUpContainerDiff} content={popUpContent} />

      <PopupContentEquity ref={popUpContainerEquity} content={popUpContent} />

      {props.compare && (
        <CompareYear year={props.year} compareyear={props.compareyear} />
      )}
    </div>
  );
}
