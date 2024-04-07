import Radio from "@mui/material/Radio";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import Checkbox from "@mui/material/Checkbox";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import { layerDescriptions } from "../tooltip"


export default function SelectLayer(props) {
  const toggleLayer = (e) => {
    props.setLayer(e.target.value);
    props.setCanopyLayer(false);
    props.setAerialLayer(false);
    props.setCompare(false);
    props.setCompareCanopy(false);
    props.setCompareAerial(false);
  };

  const toggleCanopy = () => {
    props.setLayer(false);
    props.setCompareCanopy(false);
    props.setCompareAerial(false);
    props.setCanopyLayer((e) => !e);
  };
  const toggleAerial = () => {
    props.setLayer(false);
    props.setCompareCanopy(false);
    props.setCompareAerial(false);
    props.setAerialLayer((e) => !e);
  };

  const labeltext = (text, description) => {
    return (
      <div>
        <Typography sx={{ display: "flex", alignItems: "center" }}>
          {text}
          <Tooltip title={description} enterDelay={0} placement="right">
            <InfoOutlinedIcon fontSize="small" sx={{ ml: 1 }} />
          </Tooltip>
        </Typography>
      </div>
    );
  };

  return (
    <FormControl>
      <FormGroup
        aria-labelledby="demo-radio-buttons-group-label"
        name="radio-buttons-group"
        sx={{ mt: 1, ml: 1 }}
      >
        <FormControlLabel
          value="index"
          control={<Radio />}
          label={labeltext("Tree Equity Index",layerDescriptions.index)}
          checked={props.layer === "index"}
          onChange={toggleLayer}
        />
        <FormControlLabel
          value="cover"
          control={<Radio />}
          label={labeltext("Canopy Cover by Community (%)",layerDescriptions.canopy_cover)}
          checked={props.layer === "cover"}
          onChange={toggleLayer}
        />
        <FormControlLabel
          checked={props.canopyLayer}
          onChange={toggleCanopy}
          control={<Checkbox />}
          label={labeltext("Tree Canopy",layerDescriptions.canopy)}
        />
        <FormControlLabel
          checked={props.aerialLayer}
          onChange={toggleAerial}
          control={<Checkbox />}
          label={labeltext("Orthophoto (Aerial View)",layerDescriptions.aerial)}
        />
      </FormGroup>
    </FormControl>
  );
}
