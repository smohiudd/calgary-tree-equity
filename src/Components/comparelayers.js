import Radio from "@mui/material/Radio";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import Checkbox from "@mui/material/Checkbox";

export default function SelectCompareLayer(props) {
  const toggleLayer = (e) => {
    props.setLayer(e.target.value);
    props.setCompare(false);
    props.setCompareCanopy(false)
    props.setCompareAerial(false)
    props.setCanopyLayer(false);
    props.setAerialLayer(false);
    props.setEquityLayer(false)
  };
  const toggleCanopy = () => {
    props.setLayer(false);
    props.setEquityLayer(false)
    props.setCompareCanopy((e) => !e);
    if (!props.compareAerial) props.setCompare((e) => !e);
  };
  const toggleAerial = () => {
    props.setLayer(false);
    props.setEquityLayer(false)
    props.setCompareAerial((e) => !e);
    if (!props.compareCanopy) props.setCompare((e) => !e);
  };

  return (
    <FormControl>
      <FormGroup
        aria-labelledby="demo-radio-buttons-group-label"
        name="radio-buttons-group"
        sx={{ mt: 1, ml:1 }}
      >
        <FormControlLabel
          value="diff"
          control={<Radio />}
          label="Canopy Cover Change (%)"
          checked={props.layer === "diff"}
          onChange={toggleLayer}
        />
        <FormControlLabel
          checked={props.compareCanopy}
          onChange={toggleCanopy}
          control={<Checkbox />}
          label="Tree Canopy Outline"
        />
        <FormControlLabel
          checked={props.compareAerial}
          onChange={toggleAerial}
          control={<Checkbox />}
          label="Aerial View"
        />
      </FormGroup>
    </FormControl>
  );
}
