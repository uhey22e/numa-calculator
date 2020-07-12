import React from "react";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckSquare } from "@fortawesome/free-solid-svg-icons";
import { makeStyles } from "@material-ui/styles";

type Props = {
  children: React.ReactNode;
  title: string;
};

const useStyles = makeStyles({
  icon: {
    marginRight: "0.3em",
  },
});

export default function OutputSection(props: Props) {
  const classes = useStyles();
  return (
    <Box component="div" mb={2}>
      <Box display="flex" alignItems="center" mb={1}>
        <FontAwesomeIcon
          icon={faCheckSquare}
          color="#1976d2"
          className={classes.icon}
        />
        <Typography variant="inherit" component="h4">
          {props.title}
        </Typography>
      </Box>
      {props.children}
    </Box>
  );
}
