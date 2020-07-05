import React from "react";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";

type Props = {
  children: React.ReactNode;
  title: string;
};

export default function OutputSection(props: Props) {
  return (
    <Box component="div" marginBottom={2}>
      <Box display="flex" alignItems="center">
        <CheckCircleIcon
          fontSize="small"
          color="primary"
          style={{ marginRight: "0.3rem" }}
        />
        <Typography variant="subtitle1" component="h3">
          {props.title}
        </Typography>
      </Box>
      {props.children}
    </Box>
  );
}
