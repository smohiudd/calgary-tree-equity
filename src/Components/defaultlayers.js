import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import Typography from "@mui/material/Typography";
import { layerDescriptions } from "../tooltip"
import Box from "@mui/material/Box";
import Switch from "@mui/material/Switch";


export default function SelectLayer(props) {
  const toggleLayer = (e) => {
    props.setLayer(e.target.value);
    props.setCanopyLayer(false);
    props.setAerialLayer(false);
    props.setCompare(false);
    props.setCompareCanopy(false);
    props.setCompareAerial(false);
    props.setEquityLayer(false)
  };

  const toggleCanopy = () => {
    props.setLayer(false);
    props.setCompareCanopy(false);
    props.setCompareAerial(false);
    props.setCompare(false);
    props.setCanopyLayer((e) => !e);
    props.setEquityLayer(false)
  };
  const toggleAerial = () => {
    props.setLayer(false);
    props.setCompareCanopy(false);
    props.setCompareAerial(false);
    props.setCompare(false);
    props.setAerialLayer((e) => !e);
    props.setEquityLayer(false)
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
          onClick={() => toggleLayer({ target: { value: "cover" } })}
          sx={{
            minHeight: "100px",
            width: "100%",
            backgroundColor: props.layer === "cover" ? "#edf7ee" : "white",
            border: props.layer === "cover" ? "1px solid darkgreen" : "1px solid lightgray",
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
          {labeltext("Canopy Cover (%)", props.layer === "cover")}
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
            backgroundColor: props.aerialLayer ? "#edf7ee" : "white",
            border: props.aerialLayer ? "1px solid darkgreen" : "1px solid lightgray",
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
       
            {labeltext("Aerial View", props.aerialLayer)}
            <Typography variant="caption" sx={{
              mt: 0.5, 
              textAlign: 'left', 
              color: props.aerialLayer ? '#47793b' : '#98a894'
            }}>
              {layerDescriptions.aerial}
            </Typography>
    

          <FormControlLabel
            control={
              <Switch
                checked={props.canopyLayer}
                onChange={toggleCanopy}
                onClick={(e) => e.stopPropagation()}
                disabled={!props.aerialLayer}
              />
            }
            label={<Typography sx={{
              fontSize:14, 
              color: props.aerialLayer ? '#47793b' : '#98a894'
            }}>Show individual tree outlines</Typography>}
            sx={{ mt: 0.5, width: '100%' }} 
            onClick={(e) => e.stopPropagation()} 
          />
        </Box>
      </FormGroup>
    </FormControl>
  );
}
