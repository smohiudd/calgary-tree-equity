import React, { useState } from "react";
import "./sidebar.css";

import SelectYear from "./Components/selectyear";
import SelectCompareYear from "./Components/selectcompareyear";
import SelectLayer from "./Components/defaultlayers";
import SelectCompareLayer from "./Components/comparelayers";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import Link from '@mui/material/Link';

export default function Sidebar(props) {
  let years = [2012, 2013, 2015, 2017, 2020, 2022];
  const [activePanel, setActivePanel] = useState('singleYear');

  const activeTitleStyle = {
    fontWeight: 'bold',
    color: '#47793b',
    cursor: 'pointer',
    pb: 0.5,
    borderBottom: '2px solid #47793b',
  };

  const inactiveTitleStyle = {
    fontWeight: 'normal',
    color: '#98a894',
    cursor: 'pointer',
    pb: 0.5,
    borderBottom: '2px solid transparent',
  };

  return (
    <Box
      position="absolute"
      top={0}
      sx={{
        maxWidth: { xs: "sm", sm: 340 },
        p: { xs: 2, sm: 3 },
        m: { xs: 1, sm: 2 },
        backgroundColor: "white",
        boxShadow: 3,
      }}
    >
      <Grid container spacing={2} columns={16} sx={{ mb: 2 }}>
        <Grid item xs={9}>
          <Box
            sx={{
              fontSize: { xs: 30, sm: 35 },
              fontWeight: "bold",
              color: "green",
              letterSpacing: -1,
            }}
          >
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

      <Box sx={{ display: 'flex', justifyContent: 'space-around', mb: 2 }}>
        <Typography
          sx={activePanel === 'singleYear' ? activeTitleStyle : inactiveTitleStyle}
          onClick={() => setActivePanel('singleYear')}
        >
          Single Year Data
        </Typography>
        <Typography
          sx={activePanel === 'compareYears' ? activeTitleStyle : inactiveTitleStyle}
          onClick={() => setActivePanel('compareYears')}
        >
          Compare Two Years
        </Typography>
      </Box>

      {activePanel === 'singleYear' && (
        <Box>
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
            setEquityLayer={props.setEquityLayer}
            equityLayer={props.equityLayer}
            year={props.year}
          />
        </Box>
      )}

      {activePanel === 'compareYears' && (
        <Box sx={{ mt: 0, p: 2, textAlign: 'center' }}>
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
            setEquityLayer={props.setEquityLayer}
            equityLayer={props.equityLayer}
          />
        )}
        </Box>
      )}
      
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          fontSize: { xs: 12, sm: 12 },
          mt: 2,
          color: "green",
        }}
      >
        <Link
          href="https://github.com/smohiudd/calgary-tree-equity/blob/main/methodology.md"
          target="_blank"
        >
          <HelpOutlineIcon fontSize="small" sx={{ mr: 1 }} />
        </Link>{" "}
        Find out how the Tree Equity Score is calculated and data sources used
        for this tool.
      </Box>
    </Box>
  );
}
