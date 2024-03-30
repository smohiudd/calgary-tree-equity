
import Sidebar from "./sidebar.js";
import "./App.css";
import Map from "./map.js";
import React, { useEffect, useState } from "react";
import {getColorMap} from "./color_map.js"

function App() {
  
  const [canopyLayer , setCanopyLayer] = useState(false);
  const [canopyDiffLayer , setCanopyDiffLayer] = useState(false);
  const [coverPercLayer , setCoverPercLayer] = useState(true);
  const [aerialLayer , setAerialLayer] = useState(false);
  const [compare , setCompare] = useState(false);
  const [year , setYear] = useState(2012);
  const [compareyear , setCompareYear] = useState(2022);
  const [colormap, setColorMap]=useState(null)

  useEffect(() => {
    getColorMap(process.env.REACT_APP_TREE_CANOPY,year)
      .then(data=>setColorMap(data))
  },[year])


  return (
    <div>
      {colormap && 
            <Map 
            canopyLayer={canopyLayer}
            canopyDiffLayer={canopyDiffLayer}
            coverPercLayer={coverPercLayer}
            aerialLayer={aerialLayer}
            compare={compare}
            year={year}
            compareyear={compareyear}
            colormap={colormap}
          /> 
      }

      <Sidebar
        canopyLayer={canopyLayer}
        setCanopyLayer={setCanopyLayer}
        canopyDiffLayer={canopyDiffLayer}
        setCanopyDiffLayer={setCanopyDiffLayer}
        coverPercLayer={coverPercLayer}
        setCoverPercLayer={setCoverPercLayer}
        aerialLayer={aerialLayer}
        setAerialLayer={setAerialLayer}
        setCompare={setCompare}
        compare={compare}
        year={year}
        setYear={setYear}
        compareyear={compareyear}
        setCompareYear={setCompareYear}
      />
    </div>
  );
}

export default App;
