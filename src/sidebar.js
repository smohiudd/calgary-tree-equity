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
        p: { xs: 1.5, sm: 3 },
        m: { xs: 0.5, sm: 2 },
        backgroundColor: "white",
        boxShadow: 3,
      }}
    >
      <Grid container spacing={1} columns={16} sx={{ mb: 1.5 }}>
        <Grid item xs={9}>
          <Box
            sx={{
              fontSize: { xs: 28, sm: 38 },
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

      <Box sx={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #e0e0e0', mb: 1.5, display: { xs: 'none', sm: 'flex' }}}>
        <Typography
          sx={activePanel === 'treeEquity' ? activeTitleStyle : inactiveTitleStyle}
          onClick={() => {
            setActivePanel('treeEquity');
            props.setLayer(false);
            props.setEquityLayer(true);
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
          sx={{
            ...(activePanel === 'singleYear' ? activeTitleStyle : inactiveTitleStyle),
            display: { xs: 'none', sm: 'block' }
          }}
          onClick={() => {
            setActivePanel('singleYear');
            if(props.layer) props.setLayer('cover');
            if(props.equityLayer) props.setLayer('cover')
            if(props.compareAerial) {
              props.setCompareAerial(false);
              props.setAerialLayer(true);
              props.setLayer(null);
            }
            props.setEquityLayer(false);
            props.setCompare(false);
            props.setCompareCanopy(false);
          }}
        >
          Canopy Cover
        </Typography>
        <Typography
          sx={{
            ...(activePanel === 'compareYears' ? activeTitleStyle : inactiveTitleStyle),
            display: { xs: 'none', sm: 'block' }
          }}
          onClick={() => {
            setActivePanel('compareYears')
            if(props.layer) props.setLayer('diff');
            if(props.equityLayer) props.setLayer('diff')
            props.setEquityLayer(false);
            props.setCanopyLayer(false);
            props.setAerialLayer(false);
            props.setCompare(false);
            if(props.aerialLayer) {
              props.setCompare(true);
              props.setCompareAerial(true);
              if(props.canopyLayer) props.setCompareCanopy(true);
            }
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
        <Box sx={{ mt: 1, p: 0.5 }}>
          {props.priorityData && Object.keys(props.priorityData).length > 0 ? (
            <>
              <Typography 
                variant="caption" 
                display="block" 
                gutterBottom 
                sx={{ textAlign: 'center', color: 'grey', width: '100%', mb: 1, display: { xs: 'none', sm: 'block' } }}>
                DGUID: {props.priorityData.DGUID}
              </Typography>
              <Grid container spacing={1} sx={{ mb: 2, textAlign: 'center', display: { xs: 'none', sm: 'flex' } }}>
                <Grid item xs={6}>
                  <Typography 
                    variant="h3" 
                    component="div" 
                    sx={{
                      fontWeight: 'bold',
                      color: (() => {
                        const score = props.priorityData.index;
                        if (score === undefined) return 'inherit';
                        if (score <= 70) return '#d32f2f';
                        if (score <= 80) return '#f57c00';
                        return '#388e3c';
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

              <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', color: '#38761d', textAlign: 'center', mb: 1, display: { xs: 'none', sm: 'block' } }}>
                Priority Indicators
              </Typography>

              <Grid container spacing={0.5} sx={{ textAlign: 'center', backgroundColor: '#edf7ee', borderRadius: 1, p: 1, display: { xs: 'none', sm: 'flex' } }}>
                {[
                  { key: 'age', label: 'Seniors (% 65+)' },
                  { key: 'visible_minority', label: 'Visible Minority (%)' },
                  { key: 'language', label: 'Language Barrier (%)' },
                  { key: 'low_income', label: 'Low Income (%)' },
                  { key: 'unemployed', label: 'Unemployment (%)' }
                ].map(metric => (
                  props.priorityData[metric.key] !== undefined && (
                    <Grid item xs={4} key={metric.key} sx={{ mb: 0.5 }}>
                      <Typography variant="h6" component="div" sx={{ fontWeight: 'medium' }}>
                        {`${(props.priorityData[metric.key] * 100).toFixed(1)}%`}
                      </Typography>
                      <Typography variant="caption" display="block" gutterBottom sx={{ fontSize: '0.65rem' }}>
                        {metric.label}
                      </Typography>
                    </Grid>
                  )
                ))}
                {props.priorityData.temp_diff !== undefined && (
                  <Grid item xs={4} key="temp_diff" sx={{ mb: 0.5 }}>
                    <Typography variant="h6" component="div" sx={{ fontWeight: 'medium' }}>
                      {`${props.priorityData.temp_diff.toFixed(1)}°C`}
                    </Typography>
                    <Typography variant="caption" display="block" gutterBottom sx={{ fontSize: '0.65rem' }}>
                      Heat Disparity
                    </Typography>
                  </Grid>
                )}
              </Grid>
            </>
          ) : (
            <Box>
              <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'left', mb: 1 }} className="tree-equity-description">
              The Tree Equity Score combines tree canopy data with key demographic indicators to assess how fairly communities benefit from urban trees.
              </Typography>
              <Typography variant="body2" sx={{ textAlign: 'left', fontWeight: 'bold', color: 'black', display: { xs: 'none', sm: 'block' } }}>
                Hover over a dissemination area on the map to see the Tree Equity Score and priority indicators for that area.
              </Typography>
            </Box>
          )}
        </Box>
      )}
      <Typography sx={{ 
        textAlign: 'left', 
        color: 'black', 
        display: { xs: 'block', sm: 'none' }, 
        mt: 1,
        fontSize: '0.875rem',
        lineHeight: 1.2,
        px: 0.5, 
        color: "green"
      }}>
        Tap on a dissemination area on the map to see the Tree Equity Score for that area.
      </Typography>
      
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          fontSize: { xs: 12, sm: 12 },
          mt: 1,
          color: "green",
        }}
      >
        <Link
          href="https://github.com/smohiudd/calgary-tree-equity/blob/main/methodology.md"
          target="_blank"
        >
          <HelpOutlineIcon fontSize="small" sx={{ mr: 0.5 }} />
        </Link>{" "}
        Find out how the Tree Equity Score is calculated and data sources used
        for this tool.
      </Box>
    </Box>
  );
}
