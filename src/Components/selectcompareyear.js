import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import Grid from '@mui/material/Grid';
import Typography from "@mui/material/Typography";


export default function SelectCompareYear(props) {
  const selectCompareYear = (e) => {
    props.setCompareYear(e.target.value);

    if(!props.showcompare){
      props.setShowCompare(true)
      props.setLayer("diff");
      props.setCompare(false);
      props.setCompareCanopy(false)
      props.setCompareAerial(false)
      props.setCanopyLayer(false);
      props.setAerialLayer(false);
    }
    
    
  }
  const selectYear = (e) => props.setYear(e.target.value);
  return (
    <Grid container spacing={2} columns={16}>
      <Grid item xs={8}>
        <FormControl variant="standard" sx={{  width: "100%"  }}>
          <InputLabel id="demo-simple-select-standard-label">
            Initial Year
          </InputLabel>
          <Select
            labelId="demo-simple-select-standard-label"
            id="demo-simple-select-standard"
            onChange={selectYear}
            label="Start year"
            value={props.year}
          >
            {props.years.map((item) => (
              <MenuItem value={item} key={item}>
                {item}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={8}>
        <FormControl variant="standard" sx={{  width: "100%"  }}>
          <InputLabel id="demo-simple-select-standard-label">
            Comparison Year
          </InputLabel>
          <Select
            displayEmpty
            labelId="demo-simple-select-standard-label"
            id="demo-simple-select-standard"
            onChange={selectCompareYear}
            value={props.compareyear}
            label="Comparison Year"
            renderValue={props.showcompare ? undefined : () => <Typography variant="caption" color="green">Select Comparison Year</Typography>}
          >
            {props.years.map((item) => (
              <MenuItem value={item} key={item}>
                {item}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
    </Grid>
  );
}
