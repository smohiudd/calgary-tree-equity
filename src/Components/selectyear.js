import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";

export default function SelectYear(props) {
  const selectYear = (e) => props.setYear(e.target.value);
  return (
    <FormControl variant="standard" sx={{ width: "100%" }}>
      <InputLabel id="select-year-label">Year</InputLabel>
      <Select
        labelId="select-year-label"
        value={props.year}
        onChange={selectYear}
        sx={{ fontSize: 18, color:'#0a451a', fontWeight: "bold" }}
      >
        {props.years.map((item) => (
          <MenuItem value={item} key={item}>
            {item}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
