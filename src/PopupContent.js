import { forwardRef, useRef, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Barchart from "./barchart";

const PopupContent = forwardRef(function PopupContent(props, ref) {
  return (
    <div ref={ref}>
      <Box
        sx={{
          fontSize: 13,
          fontWeight: "bold",
        }}
      >
        {props.content.name}
      </Box>
      <Box sx={{ fontWeight: "bold", fontSize: 45, color: "green", my: 2 }}>
        {props.content.frac}%
      </Box>
      <Box
        sx={{
          fontSize: 18,
          fontWeight: "bold",
          color: "green",
          letterSpacing: -0.5,
        }}
      >
        Canopy Cover in {props.content.year}
      </Box>
    </div>
  );
});

const PopupContentDiff = forwardRef(function PopupContent(props, ref) {
  let color = props.content.diff < 0 ? "red" : "green";
  return (
    <div ref={ref}>
      <Box
        sx={{
          fontSize: 13,
          fontWeight: "bold",
        }}
      >
        {props.content.name}
      </Box>
      <Box sx={{ fontWeight: "bold", fontSize: 45, color: color, my: 2 }}>
        {props.content.diff}%
      </Box>
      <Box
        sx={{
          fontSize: 14,
          fontWeight: "bold",
          color: color,
          letterSpacing: -0.5,
        }}
      >
        Change between {props.content.current_year} and{" "}
        {props.content.next_year}
      </Box>
    </div>
  );
});

const PopupContentEquity = forwardRef(function PopupContent(props, ref) {
  const barchartContainer = useRef();
  return (
    <div ref={ref}>
      <Box
        sx={{
          fontSize: 13,
          fontWeight: "bold",
        }}
      >
        DGUID: {props.content.name}
      </Box>
      <Typography sx={{ fontSize: 18, fontWeight: "bold" }} color="green">
        Tree Equity Score
      </Typography>

      <Box sx={{ fontWeight: "bold", fontSize: 35, my: 1 }}>
        {props.content.index}
      </Box>
      <Typography sx={{ fontSize: 13}} color="green">
      Canopy Cover: {(props.content.cover*100).toFixed(2)}%
      </Typography>
      {props.content.priority && (
        <Box sx={{ display: { xs: "none", sm: "block" } }}>
          <Barchart
            ref={barchartContainer}
            barchartContent={props.content.priority}
          />
        </Box>
      )}
    </div>
  );
});

export { PopupContent, PopupContentDiff, PopupContentEquity };
