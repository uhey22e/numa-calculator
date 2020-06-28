import { red } from "@material-ui/core/colors";
import { createMuiTheme, responsiveFontSizes } from "@material-ui/core/styles";

// A custom theme for this app
const theme = responsiveFontSizes(
  createMuiTheme({
    typography: {
      // In Chinese and Japanese the characters are usually larger,
      // so a smaller fontsize may be appropriate.
      fontSize: 14,
      fontFamily: [
        "Noto Sans JP",
        "ヒラギノ角ゴ ProN W3",
        "Hiragino Kaku Gothic ProN",
        "Roboto",
        '"Helvetica Neue"',
        "Arial",
        "sans-serif",
      ].join(","),
    },
    palette: {
      background: {
        default: "#fff",
      },
    },
  })
);
export default theme;
