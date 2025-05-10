import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

export default function SelectCompareYear(props) {
  const selectCompareYear = (e) => {
    props.setCompareYear(e.target.value);

    if (!props.showcompare) {
      props.setShowCompare(true);
      props.setLayer("diff");
      props.setCompare(false);
      props.setCompareCanopy(false);
      props.setCompareAerial(false);
      props.setCanopyLayer(false);
      props.setAerialLayer(false);
    }
  };
  const selectYear = (e) => props.setYear(e.target.value);
  return (
    <Grid container spacing={2} columns={16}>
      <Grid item xs={8}>
        <FormControl variant="standard" sx={{ width: "100%" }}>
          <InputLabel id="initial-year-label">
            Initial Year (Left)
          </InputLabel>
          <Select
            labelId="initial-year-label"
            id="initial-year-select"
            onChange={selectYear}
            value={props.year}
            sx={{ fontSize: 18, color:'#0a451a', fontWeight: "bold" }}
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
        <FormControl variant="standard" sx={{ width: "100%" }}>
          <InputLabel id="comparison-year-label">
            Comparison Year (Right)
          </InputLabel>
          <Select
            displayEmpty
            labelId="comparison-year-label"
            id="comparison-year-select"
            onChange={selectCompareYear}
            value={props.compareyear}
            sx={{ fontSize: 18, color:'#0a451a', fontWeight: "bold" }}
            renderValue={
              props.showcompare
                ? undefined
                : () => (
                    <Typography variant="caption" color="green">
                      Select Comparison Year
                    </Typography>
                  )
            }
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
