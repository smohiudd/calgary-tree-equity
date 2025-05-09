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
  const [activePanel, setActivePanel] = useState('treeEquity');

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
      <Grid container spacing={2} columns={16} sx={{ mb: 3 }}>
        <Grid item xs={9}>
          <Box
            sx={{
              fontSize: { xs: 32, sm: 38 },
              fontWeight: "bold",
              letterSpacing: -1,
              fontFamily: "'Roboto', 'Helvetica Neue', Arial, sans-serif",
              background: "linear-gradient(45deg, #2e7d32 30%, #4caf50 90%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              lineHeight: 1.1,
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

      <Box sx={{ display: 'flex', justifyContent: 'space-around', mb: 2, borderBottom: '1px solid #e0e0e0', pb: 2 }}>
        <Typography
          sx={activePanel === 'treeEquity' ? activeTitleStyle : inactiveTitleStyle}
          onClick={() => {
            setActivePanel('treeEquity');
            props.setEquityLayer(true);
            props.setLayer(false);
            props.setCanopyLayer(false);
            props.setAerialLayer(false);
            props.setCompare(false);
            props.setCompareCanopy(false);
            props.setCompareAerial(false);
          }}
        >
          Tree Equity
        </Typography>
        <Typography
          sx={activePanel === 'singleYear' ? activeTitleStyle : inactiveTitleStyle}
          onClick={() => {
            setActivePanel('singleYear');
            props.setLayer('cover');
            props.setEquityLayer(false);
            props.setCanopyLayer(false);
            props.setAerialLayer(false);
            props.setCompare(false);
            props.setCompareCanopy(false);
            props.setCompareAerial(false);
          }}
        >
          Canopy Cover
        </Typography>
        <Typography
          sx={activePanel === 'compareYears' ? activeTitleStyle : inactiveTitleStyle}
          onClick={() => {
            setActivePanel('compareYears')
            props.setLayer('diff');
            props.setEquityLayer(false);
            props.setCanopyLayer(false);
            props.setAerialLayer(false);
            props.setCompare(false);
            props.setCompareCanopy(false);
            props.setCompareAerial(false);
          }}
        >
          Compare Years
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
        <Box>
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

      {activePanel === 'treeEquity' && (
        <Box sx={{ mt: 2, p: 2 }}>
          {props.priorityData && Object.keys(props.priorityData).length > 0 ? (
            <>
              <Typography 
                variant="caption" 
                display="block" 
                gutterBottom 
                sx={{ textAlign: 'center', color: 'grey', width: '100%', mb: 2 }}>
                DGUID: {props.priorityData.DGUID}
              </Typography>
              <Grid container spacing={2} sx={{ mb: 3, textAlign: 'center' }}>
                <Grid item xs={6}>
                  <Typography 
                    variant="h3" 
                    component="div" 
                    sx={{
                      fontWeight: 'bold',
                      color: (() => {
                        const score = props.priorityData.index;
                        if (score === undefined) return 'inherit'; // Default color if no score
                        if (score <= 70) return '#d32f2f'; // Red
                        if (score <= 80) return '#f57c00'; // Orange
                        return '#388e3c'; // Green
                      })()
                    }}
                  >
                    {props.priorityData.index !== undefined ? props.priorityData.index.toFixed(0) : 'N/A'}
                  </Typography>
                  <Typography variant="caption" display="block" gutterBottom>
                    Tree Equity Score
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="h3" component="div" sx={{ fontWeight: 'bold' }}>
                    {props.priorityData['2020'] !== undefined ? `${(props.priorityData['2020'] * 100).toFixed(1)}%` : 'N/A'}
                  </Typography>
                  <Typography variant="caption" display="block" gutterBottom>
                    Canopy Cover (2020)
                  </Typography>
                </Grid>
              </Grid>

              <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', color: '#38761d', textAlign: 'center', mb: 2 }}>
                Priority Indicators
              </Typography>

              <Grid container spacing={1} sx={{ textAlign: 'center', backgroundColor: '#edf7ee', borderRadius: 1, p: 2 }}>
                {[
                  { key: 'age', label: 'Seniors (% 65+)' },
                  { key: 'visible_minority', label: 'Visible Minority (%)' },
                  { key: 'language', label: 'Language Barrier (%)' },
                  { key: 'low_income', label: 'Low Income (%)' },
                  { key: 'unemployed', label: 'Unemployment (%)' }
                ].map(metric => (
                  props.priorityData[metric.key] !== undefined && (
                    <Grid item xs={4} key={metric.key} sx={{ mb: 1 }}>
                      <Typography variant="h6" component="div" sx={{ fontWeight: 'medium' }}>
                        {`${(props.priorityData[metric.key] * 100).toFixed(1)}%`}
                      </Typography>
                      <Typography variant="caption" display="block" gutterBottom sx={{ fontSize: '0.65rem' }}>
                        {metric.label}
                      </Typography>
                    </Grid>
                  )
                ))}
              </Grid>
            </>
          ) : (
            <Box>
              <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'left', mb: 1.5 }}>
                The Tree Equity Score is a measure that combines tree canopy data with demographic indicators to show which areas are under-treed and why it matters.
              </Typography>
              <Typography variant="body2" sx={{ textAlign: 'left', fontWeight: 'bold', color: 'black' }}>
                Hover over a dissemination area on the map to see the Tree Equity Score and priority indicators for that area.
              </Typography>
            </Box>
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
