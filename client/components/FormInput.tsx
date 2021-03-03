import React from "react";
import {
  createStyles,
  fade,
  Theme,
  ThemeProvider,
  withStyles,
  makeStyles,
  createMuiTheme,
} from "@material-ui/core/styles";
import InputBase from "@material-ui/core/InputBase";
import InputLabel from "@material-ui/core/InputLabel";
import TextField, { TextFieldProps } from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import { green } from "@material-ui/core/colors";
import { OutlinedInputProps } from "@material-ui/core/OutlinedInput";
import styled from "styled-components";
import { Button } from "@material-ui/core";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";

const FormInput = () => {
  const StyledInput = styled(TextField)`
     {
      margin-top: "10%";
    }
  `;

  const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      root: {
        display: "flex",
        flexDirection: "column",
        flexWrap: "wrap",
        marginTop: "10%",
        alignItems: "center",
        justifyContent: "center",
      },
      margin: {
        margin: theme.spacing(1),
      },
    })
  );

  const ValidationTextField = withStyles({
    root: {
      "& input:valid + fieldset": {
        borderColor: "green",
        borderWidth: 2,
      },
      "& input:invalid + fieldset": {
        borderColor: "red",
        borderWidth: 2,
      },
      "& input:valid:focus + fieldset": {
        borderLeftWidth: 6,
        padding: "4px !important", // override inline-style
      },
    },
  })(TextField);

  const theme = createMuiTheme({
    palette: {
      primary: green,
    },
  });

  const classes = useStyles();

  return (
    <form className={classes.root} noValidate>
      <StyledInput
        className={classes.margin}
        label='Photos'
        required
        variant='outlined'
        defaultValue='My photos link'
        id='validation-outlined-input'
      />
      <StyledInput
        className={classes.margin}
        label='Restaurants'
        required
        variant='outlined'
        defaultValue='Chipotle'
        id='validation-outlined-input'
      />
      <StyledInput
        className={classes.margin}
        label='Travel Buddies'
        required
        variant='outlined'
        defaultValue='Kanye'
        id='validation-outlined-input'
      />
      <StyledInput
        className={classes.margin}
        label='Notes'
        required
        variant='outlined'
        defaultValue='My life is dope and I do dope shit '
        id='validation-outlined-input'
      />

      <Button variant='contained' color='primary'>
        Submit
      </Button>
    </form>
  );
};

export default FormInput;
