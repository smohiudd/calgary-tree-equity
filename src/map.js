import React, { useRef, useEffect, useState } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import "./map.css";
import { Protocol } from 'pmtiles';
import * as d3 from "d3";
import * as MaplibreglCompare from "@maplibre/maplibre-gl-compare";
import "@maplibre/maplibre-gl-compare/dist/maplibre-gl-compare.css";

let color_ramp
const base_imagery = (year) => `https://tiles.arcgis.com/tiles/AVP60cs0Q9PEA8rH/arcgis/rest/services/Calgary_${year}_WMASP/MapServer/WMTS/tile/1.0.0/Calgary_${year}_WMASP/default/default028mm/{z}/{y}/{x}.png`

export default function Map(props) {
    const mapContainer = useRef(null);
    const mapContainerAfter = useRef(null);
    const mapContainerCompare = useRef(null);
    const map = useRef(null);
    const mapAfter = useRef(null);
    const mapCompare = useRef(null);
    const [lng] = useState(-114.0716);
    const [lat] = useState(51.0589);
    const [zoom] = useState(15.5);


    useEffect(() => {
      let protocol = new Protocol();
      maplibregl.addProtocol("pmtiles",protocol.tile);
      return () => {
        maplibregl.removeProtocol("pmtiles");
      }
    }, []);

    useEffect(() => {
      d3.json("https://calgarytrees.s3.us-west-2.amazonaws.com/CT_frac_7.json").then(data => {

        let minmax = d3.extent(data.features.map(e=>e.properties.frac))

        // let linear = d3.scaleLinear()
        //   .domain([minmax[0], minmax[1]])
        //   .range(["white", "green"])

        let scale = d3.scaleQuantile(data.features.map(e=>e.properties.frac),d3.schemeGreens[5])

        let range = d3.range(minmax[0],minmax[1], 0.1)
        color_ramp = Array.from(range, (x) => [x, scale(x)])

      })
    },[])

    useEffect(() => {
      if (map.current) return; // stops map from intializing more than once

      map.current = new maplibregl.Map({
        container: mapContainer.current,
        style: "https://basemaps.cartocdn.com/gl/positron-gl-style/style.json",
        center: [lng, lat],
        zoom: zoom,
      });

      map.current.on("load", function () {

        map.current.addSource("base-calgary", {
          type: "raster",
          tiles: [base_imagery(props.year)],
          tileSize: 256
        });
        map.current.addLayer({
          id: "base-calgary",
          type: "raster",
          source: "base-calgary",
          layout:{
            visibility: props.aerialLayer ? 'visible' : 'none'
          }
        });

        map.current.addSource("ct", {
          type: "geojson",
          data: "https://calgarytrees.s3.us-west-2.amazonaws.com/CT_frac_7.json",
        });
        map.current.addLayer({
          id: "ct",
          type: "fill",
          source: "ct",
          layout:{
            visibility: props.coverPercLayer ? 'visible' : 'none'
          },
          paint: {
            'fill-color': {
              "property":"frac",
              "stops": color_ramp
            },
            'fill-opacity': 0.7
          },
        });

        map.current.addLayer({
          'id': 'outline',
          'type': 'line',
          'source': 'ct',
          'layout': {},
          'paint': {
              'line-color': 'green',
              'line-width': 1.5
          }
        });

        map.current.addSource("trees-cover", {
          type: "vector",
          url: `pmtiles://https://calgarytrees.s3.us-west-2.amazonaws.com/${props.year}.pmtiles`,
        });
        map.current.addLayer({
          id: "trees-cover",
          type: "fill",
          source: "trees-cover",
          'source-layer': "canopy_cover",
          layout:{
            visibility: props.canopyLayer ? 'visible' : 'none'
          },
          paint: {
            'fill-color': '#3acf61',
            'fill-opacity': 0.6
          },
        });


      })

    }, []);


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
          tileSize: 256
        });
        mapAfter.current.addLayer({
          id: "base-calgary",
          type: "raster",
          source: "base-calgary",
          layout:{
            visibility: props.aerialLayer ? 'visible' : 'none'
          }
        });

        mapAfter.current.addSource("trees", {
          type: "vector",
          url: `pmtiles://https://calgarytrees.s3.us-west-2.amazonaws.com/${props.compareyear}.pmtiles`,
        });
        mapAfter.current.addLayer({
          id: "trees",
          type: "fill",
          source: "trees",
          'source-layer': "canopy_cover",
          layout:{
            visibility: props.canopyLayer ? 'visible' : 'none'
          },
          paint: {
            'fill-color': '#3acf61',
            'fill-opacity': 0.6
          },
        });

      })

      
    },[])

    useEffect(() => {
      if (!mapCompare.current && !props.compare) return 
      else if (mapCompare.current && !props.compare){
        mapCompare.current.remove()
      }else{
        mapCompare.current = new MaplibreglCompare(
          map.current, 
          mapAfter.current, 
          mapContainerCompare.current, 
          {
            mousemove: false, 
            orientation: 'vertical'
          });
      }
    },[props.compare])

    // Turn on or off layers
    useEffect(() => {
      if (!map.current.isStyleLoaded()) return;

      //vector tree canopy layer
      map.current.setLayoutProperty('trees-cover', 'visibility', props.canopyLayer ? 'visible' : 'none')
      mapAfter.current.setLayoutProperty('trees', 'visibility', props.canopyLayer ? 'visible' : 'none')

      //base aerial imagery
      map.current.setLayoutProperty('base-calgary', 'visibility', props.aerialLayer ? 'visible' : 'none')
      mapAfter.current.setLayoutProperty('base-calgary', 'visibility', props.aerialLayer ? 'visible' : 'none')

      //coverage by census tract
      map.current.setLayoutProperty('ct', 'visibility', props.coverPercLayer ? 'visible' : 'none')
      
    },[props.canopyLayer,props.coverPercLayer,props.aerialLayer])


    // Update Data Map 1
    useEffect(() => {
      if (!map.current.isStyleLoaded()) return;
      
      map.current.getSource('base-calgary').setTiles([base_imagery(props.year)]);
      map.current.getSource('trees-cover').setUrl(`pmtiles://https://calgarytrees.s3.us-west-2.amazonaws.com/${props.year}.pmtiles`);
      
    },[props.year])


    // Update Data Map 2
    useEffect(() => {
      if (!mapAfter.current.isStyleLoaded()) return;

      mapAfter.current.getSource('base-calgary').setTiles([base_imagery(props.compareyear)]);
      mapAfter.current.getSource('trees').setUrl(`pmtiles://https://calgarytrees.s3.us-west-2.amazonaws.com/${props.compareyear}.pmtiles`);
      
    },[props.compareyear])


    function CompareYear({ compare, year, compareyear }) {
      if (compare) {
        return (
          <div>
            <div className='color-white txt-h2 txt-bold flex-parent flex-parent--center-cross flex-parent--center-main  absolute bottom left ml36 mb36 py6 px6 bg-green'>
              <div className='flex-child'>{year}</div>
            </div>
            <div className='color-white txt-h2 txt-bold flex-parent flex-parent--center-cross flex-parent--center-main absolute bottom right mr36 mb36 py6 px6 bg-green'>
              <div className='flex-child'>{compareyear}</div>
            </div>
          </div>

        )
      }
    }

    return (
      <div>
        <div ref={mapContainerCompare} className="map">
          <div ref={mapContainer} className="map" />
          <div ref={mapContainerAfter} className="map" />
        </div>
        <div ref={mapContainer} className="map" />
        
        <CompareYear 
          compare={props.compare}
          year={props.year}
          compareyear={props.compareyear}
        />
        
      </div>
    );
  }