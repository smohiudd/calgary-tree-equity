import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { layerDescriptions } from "../tooltip"
import Switch from "@mui/material/Switch";

export default function SelectCompareLayer(props) {
  const toggleLayer = (e) => {
    props.setLayer(e.target.value);
    props.setCompare(false);
    props.setCompareCanopy(false);
    props.setCompareAerial(false);
    props.setCanopyLayer(false);
    props.setAerialLayer(false);
    props.setEquityLayer(false);
  };
  const toggleCanopy = () => {
    props.setLayer(false);
    props.setEquityLayer(false);
    props.setCanopyLayer(false);
    props.setAerialLayer(false);
    props.setCompareCanopy((e) => !e);
    if (!props.compareAerial) props.setCompare((e) => !e);
  };
  const toggleAerial = () => {
    props.setLayer(false);
    props.setEquityLayer(false);
    props.setCanopyLayer(false);
    props.setAerialLayer(false);
    props.setCompareAerial((e) => !e);
    if (!props.compareCanopy) props.setCompare((e) => !e);
  };

  const labeltext = (text, isActive) => {
    return (
      <Typography sx={{
        display: "flex", 
        alignItems: "center", 
        fontSize:14, 
        fontWeight: "bold", 
        color: isActive ? '#47793b' : '#98a894'
      }}>
        {text}
      </Typography>
    );
  };

  return (
    <FormControl sx={{ width: "100%" }}>
      <FormGroup
        aria-labelledby="demo-radio-buttons-group-label"
        name="radio-buttons-group"
        sx={{ mt: 3, width: "100%" }}
      >
        <Box
          onClick={() => toggleLayer({ target: { value: "diff" } })}
          sx={{
            minHeight: "100px",
            width: "100%",
            backgroundColor: props.layer === "diff" ? "#edf7ee" : "white",
            border: props.layer === "diff" ? "1px solid darkgreen" : "1px solid lightgray",
            borderRadius: "4px",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            justifyContent: "center",
            cursor: "pointer",
            mb: 1,
            p: 1,
            boxSizing: 'border-box',
            '&:hover': {
              borderColor: 'darkgreen',
            }
          }}
        >
          {labeltext("Canopy Cover Change (%)", props.layer === "diff")}
          <Typography variant="caption" sx={{
            mt: 0.5, 
            textAlign: 'left', 
            color: props.layer === "cover" ? '#47793b' : '#98a894'
          }}>
            {layerDescriptions.canopy_cover}
          </Typography>
        </Box>

        <Box
          onClick={toggleAerial}
          sx={{
            minHeight: "100px",
            height: "auto",
            width: "100%",
            backgroundColor: props.compareAerial ? "#edf7ee" : "white",
            border: props.compareAerial ? "1px solid darkgreen" : "1px solid lightgray",
            borderRadius: "4px",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            justifyContent: "center", 
            mb: 1,
            p: 1,
            boxSizing: 'border-box',
            '&:hover': {
              borderColor: 'darkgreen',
            }
          }}
        >
       
            {labeltext("Aerial View", props.compareAerial)}
            <Typography variant="caption" sx={{
              mt: 0.5, 
              textAlign: 'left', 
              color: props.compareAerial ? '#47793b' : '#98a894'
            }}>
              {layerDescriptions.aerial}
            </Typography>
            
            <FormControlLabel
            control={
              <Switch
                checked={props.compareCanopy}
                onChange={toggleCanopy}
                onClick={(e) => e.stopPropagation()}
                disabled={!props.compareAerial}
              />
            }
            label={<Typography sx={{
              fontSize:14, 
              color: props.compareAerial ? '#47793b' : '#98a894'
            }}>Show individual tree outlines</Typography>}
            sx={{ mt: 0.5, width: '100%' }} 
            onClick={(e) => e.stopPropagation()} 
          />


        </Box>
      </FormGroup>
    </FormControl>
  );
}
