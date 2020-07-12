import React from "react";
import { Box, Container } from "@material-ui/core";
import Footer from "../components/Footer";

type Props = {
  children: React.ReactNode;
};

export default function Layout(props: Props) {
  return (
    <>
      <Container maxWidth="sm">
        <Box mt={3} mb={3}>
          {props.children}
        </Box>
      </Container>
      <Footer />
    </>
  );
}
