
import Sidebar from "./sidebar.js";
import "./App.css";
import Map from "./map.js";
import React, { useEffect, useState } from "react";

function App() {
  
  const [canopyLayer , setCanopyLayer] = useState(true);
  const [coverPercLayer , setCoverPercLayer] = useState(false);
  const [aerialLayer , setAerialLayer] = useState(false);
  const [compare , setCompare] = useState(false);
  const [year , setYear] = useState(2015);
  const [compareyear , setCompareYear] = useState(2017);


  return (
    <div>
      <Map 
        canopyLayer={canopyLayer}
        coverPercLayer={coverPercLayer}
        aerialLayer={aerialLayer}
        compare={compare}
        year={year}
        compareyear={compareyear}
      />
      <Sidebar
        canopyLayer={canopyLayer}
        setCanopyLayer={setCanopyLayer}
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
