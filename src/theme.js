import { green } from "@mui/material/colors";
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: green[500],
    },
  },
  components: {
    MuiTypography: {
      styleOverrides: {
        gutterBottom: {
          marginBottom: 5,
        },
      },
    },
    MuiFormControlLabel: {
      styleOverrides: {
        label: {
          fontSize: 15,
        },
      },
    },
    MuiCheckbox: {
      styleOverrides: {
        root: {
          padding: 3,
        },
      },
    },
    MuiRadio: {
      styleOverrides: {
        root: {
          padding: 3,
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        select: {
          paddingLeft: 5,
        },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          fontSize: 15,
          backgroundColor: "#14884E",
          padding:13
        },
      },
    },
  },
});

export default theme;
