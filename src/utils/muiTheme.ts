import { createMuiTheme, responsiveFontSizes } from "@material-ui/core/styles";
import { fontFamily } from "./typography";

// A custom theme for this app
const theme = createMuiTheme({
  typography: {
    fontFamily: fontFamily.join(","),
  },
});

export default theme;
