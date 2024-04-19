import Radio from "@mui/material/Radio";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import { layerDescriptions } from "../tooltip"


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

export default function EquityLayer(props) {
    const toggleIndex = () =>{
        props.setLayer(false);
        props.setCompareCanopy(false);
        props.setCompareAerial(false);
        props.setCanopyLayer(false);
        props.setAerialLayer(false);
        props.setCompare(false);
        props.setEquityLayer((e) => !e);
      }
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
              label={labeltext("Tree Equity Score",layerDescriptions.index)}
              checked={props.equityLayer}
              onChange={toggleIndex}
            />
          </FormGroup>
        </FormControl>
      );

}