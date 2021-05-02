import React from "react";
import { Box, Container, MuiThemeProvider } from "@material-ui/core";
import { Helmet } from "react-helmet";
import Footer from "../components/Footer";
import theme from "../utils/muiTheme";

type LayoutProps = {
  title?: string;
};

export const Layout: React.FunctionComponent<LayoutProps> = ({
  title = "かんたん沼計算機",
  children,
}) => {
  return (
    <MuiThemeProvider theme={theme}>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <main>
        <Container maxWidth="sm">
          <Box mt={3} mb={3}>
            {children}
          </Box>
        </Container>
      </main>
      <Footer />
    </MuiThemeProvider>
  );
};
