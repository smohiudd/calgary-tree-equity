import React from "react";
import "./sidebar.css";

import SelectYear from "./Components/selectyear";
import SelectCompareYear from "./Components/selectcompareyear";
import SelectLayer from "./Components/defaultlayers";
import SelectCompareLayer from "./Components/comparelayers";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

export default function Sidebar(props) {
  let years = [2012, 2013, 2015, 2017, 2020, 2022];

  return (
    <div className="sidebar-container">
      <Grid container spacing={2} columns={16} sx={{mb:2}}>
        <Grid item xs={9}>
          <Box sx={{fontSize:35, fontWeight: "bold", color:'green', letterSpacing: -1}}>
            Calgary Tree Equity
          </Box>
        </Grid>
        <Grid item xs={7}>
          <a href="https://www.calgaryclimatehub.ca/" target="_blank">
            <img
              src={
                process.env.PUBLIC_URL +
                "/assets/Logo-Transparent-climate-hub.png"
              }
              alt="image"
              className="logo-style mt6"
            />
          </a>
        </Grid>
      </Grid>

      <Box sx={{ fontSize: 15, mb: 2 }}>
        This tools uses various data sources to help users analyze{" "}
        <a href="https://www.calgaryclimatehub.ca/calgary_tree_equity">
          tree equity
        </a>{" "}
        and change in Calgary's tree cover over time.
      </Box>
      {/* <Typography variant="body1" sx={{ mb: 2 }} gutterBottom></Typography> */}
      <Typography variant="h6" gutterBottom>
        Select a Year
      </Typography>

      <SelectYear years={years} year={props.year} setYear={props.setYear} />
      <SelectLayer
        layer={props.layer}
        canopyLayer={props.canopyLayer}
        aerialLayer={props.aerialLayer}
        setLayer={props.setLayer}
        setAerialLayer={props.setAerialLayer}
        setCanopyLayer={props.setCanopyLayer}
        setCompare={props.setCompare}
        setCompareCanopy={props.setCompareCanopy}
        setCompareAerial={props.setCompareAerial}
      />

      <Typography variant="h6" sx={{ mt: 2 }} gutterBottom>
        Comparison
      </Typography>
      {/* <Typography variant="body2" gutterBottom>
        Select a comparison year to see the change in canopy cover over time.
      </Typography> */}

      <SelectCompareYear
        years={years}
        compareyear={props.compareyear}
        setCompareYear={props.setCompareYear}
        setYear={props.setYear}
        year={props.year}
        setShowCompare={props.setShowCompare}
        showcompare={props.showcompare}
        setLayer={props.setLayer}
        setAerialLayer={props.setAerialLayer}
        setCanopyLayer={props.setCanopyLayer}
        setCompare={props.setCompare}
        setCompareCanopy={props.setCompareCanopy}
        setCompareAerial={props.setCompareAerial}
      />

      {props.showcompare && (
        <SelectCompareLayer
          layer={props.layer}
          setLayer={props.setLayer}
          setAerialLayer={props.setAerialLayer}
          setCanopyLayer={props.setCanopyLayer}
          setCompare={props.setCompare}
          compareyear={props.compareyear}
          compareCanopy={props.compareCanopy}
          setCompareCanopy={props.setCompareCanopy}
          compareAerial={props.compareAerial}
          setCompareAerial={props.setCompareAerial}
        />
      )}

      <Typography variant="body2" sx={{ mt: 4 }} gutterBottom>
        This tool was made by volunteers at the{" "}
        <a target="_blank" href="https://www.calgaryclimatehub.ca">
          Calgary Climate Hub
        </a>{" "}
        using{" "}
        <a target="_blank" href="https://data.calgary.ca/">
          open data
        </a>{" "}
        and open-source tools.
      </Typography>
    </div>
  );
}
