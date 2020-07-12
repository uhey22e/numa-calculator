import React from "react";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import CreateIcon from "@material-ui/icons/Create";

type Props = {
  children: React.ReactNode;
  title: string;
};

export default function InputSection(props: Props) {
  return (
    <Box component="div" marginBottom={2}>
      <Box display="flex" alignItems="center">
        <CreateIcon
          fontSize="small"
          color="primary"
          style={{ marginRight: "0.3em" }}
        />
        <Typography variant="inherit" component="h4">
          {props.title}
        </Typography>
      </Box>
      {props.children}
    </Box>
  );
}
