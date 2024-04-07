import Sidebar from "./sidebar.js";
import "./App.css";
import Map from "./map.js";
import React, { useEffect, useState } from "react";
import { getColorMap } from "./color_map.js";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme";

function App() {
  const [canopyLayer, setCanopyLayer] = useState(false);
  const [layer, setLayer] = useState("cover"); //cover, diff, index
  const [aerialLayer, setAerialLayer] = useState(false);
  const [compare, setCompare] = useState(false);
  const [year, setYear] = useState(2013);
  const [compareyear, setCompareYear] = useState(2022);
  const [colormap, setColorMap] = useState(null);
  const [compareCanopy, setCompareCanopy] = useState(false);
  const [compareAerial, setCompareAerial] = useState(false);
  const [showcompare, setShowCompare] = useState(true)

  useEffect(() => {
    getColorMap(process.env.REACT_APP_TREE_CANOPY, year).then((data) =>
      setColorMap(data)
    );
  }, [year]);

  return (
    <ThemeProvider theme={theme}>
      {colormap && (
        <Map
          layer={layer}
          canopyLayer={canopyLayer}
          aerialLayer={aerialLayer}
          compare={compare}
          year={year}
          compareyear={compareyear}
          colormap={colormap}
          setCompare={setCompare}
          compareCanopy={compareCanopy}
          compareAerial={compareAerial}
        />
      )}

      <Sidebar
        layer={layer}
        setLayer={setLayer}
        canopyLayer={canopyLayer}
        setCanopyLayer={setCanopyLayer}
        aerialLayer={aerialLayer}
        setAerialLayer={setAerialLayer}
        setCompare={setCompare}
        compare={compare}
        year={year}
        setYear={setYear}
        compareyear={compareyear}
        setCompareYear={setCompareYear}
        compareCanopy={compareCanopy}
        setCompareCanopy={setCompareCanopy}
        compareAerial={compareAerial}
        setCompareAerial={setCompareAerial}
        showcompare={showcompare}
        setShowCompare={setShowCompare}
      />
    </ThemeProvider>
  );
}

export default App;
