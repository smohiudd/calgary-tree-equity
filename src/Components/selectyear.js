import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function SelectYear(props) {
  const selectYear = (e) => props.setYear(e.target.value);
  return (
    <FormControl variant="standard" sx={{ width: "100%" }}>
      <Select
        labelId="select-standard-label"
        value={props.year}
        onChange={selectYear}
        label="Year"
        sx={{ fontSize: 18, color:'green' }}
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
