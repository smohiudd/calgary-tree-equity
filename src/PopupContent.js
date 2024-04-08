import { forwardRef } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

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
      <Typography variant="body1" color="green">Tree Equity Score</Typography>
      <Box sx={{ fontWeight: "bold", fontSize: 45, my: 1}}>
        {props.content.index}
      </Box>
      {/* <Typography variant="body1" color="grey">Priority Score: {props.content.priority}</Typography> */}
    </div>
  );
});

export { PopupContent, PopupContentDiff, PopupContentEquity };
