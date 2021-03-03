import React from "react";
import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import FormInput from "./FormInput";

const TripDetailsForm = () => {
  const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      root: {
        display: "flex",
        alignItems: "center",
        flexWrap: "wrap",
        "& > *": {
          margin: theme.spacing(1),
          width: theme.spacing(40),
          height: theme.spacing(50),
        },
      },
    })
  );

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Paper elevation={3}>
        <FormInput />
      </Paper>
    </div>
  );
};

export default TripDetailsForm;
