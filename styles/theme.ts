import { createTheme } from "@mui/material";
import { deepPurple, indigo } from "@mui/material/colors";

export const theme = createTheme({
  typography: {
    fontFamily: ["Roboto", "sans-serif"].join(","),
  },
  palette: {
    primary: {
      main: deepPurple["A100"],
      dark: deepPurple[50],
      light: "#E2D6FF",
    },
    secondary: {
      main: indigo["A200"],
      light: "#fbf7ff",
    },
  },
});
