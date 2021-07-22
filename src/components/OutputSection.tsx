import React from "react";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckSquare } from "@fortawesome/free-solid-svg-icons";
import { makeStyles } from "@material-ui/styles";

type OutputSectionProps = {
  title: string;
};

const useStyles = makeStyles({
  icon: {
    marginRight: "0.3em",
    // Widthを指定しておかないとロード中に無尽蔵に大きくなる
    width: 18,
  },
});

export const OutputSection: React.FC<OutputSectionProps> = ({
  title,
  children,
}) => {
  const classes = useStyles();
  return (
    <Box component="div" marginBottom={2}>
      <Box display="flex" alignItems="center" marginBottom={1}>
        <FontAwesomeIcon
          icon={faCheckSquare}
          color="#1976d2"
          className={classes.icon}
          size="1x"
        />
        <Typography variant="inherit" component="h4">
          {title}
        </Typography>
      </Box>
      {children}
    </Box>
  );
};
