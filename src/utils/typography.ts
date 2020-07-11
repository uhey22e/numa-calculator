import Typography from "typography";

const fontFamily = [
  "Noto Sans JP",
  "ヒラギノ角ゴ ProN W3",
  "Hiragino Kaku Gothic ProN",
  "Roboto",
  '"Helvetica Neue"',
  "Arial",
  "sans-serif",
];

const typography = new Typography({
  baseFontSize: "16px",
  baseLineHeight: 1.6,
  scaleRatio: 1.5,
  headerFontFamily: fontFamily,
  headerWeight: 400,
  bodyFontFamily: fontFamily,
  googleFonts: [
    {
      name: "Noto Sans JP",
      styles: ["400"],
    },
  ],
});

export default typography;
