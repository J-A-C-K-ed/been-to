import React, { useState } from "react";
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
import countriesKey from "../../countries";

interface FormInputProps {
  setShowForm: (code: boolean) => void;
  currentSel: string;
  currentUserID: any;
}

const FormInput: React.FC<any> = ({
  setShowForm,
  currentSel,
  currentUserID,
}: FormInputProps) => {
  const [formPhotos, setFormPhotos] = useState<string>("");
  const [formRestaurants, setFormRestaurants] = useState<string>("");
  const [formFriends, setFormFriends] = useState<string>("");
  const [formNotes, setFormNotes] = useState<string>("");

  const StyledInput = styled(TextField)`
     {
      width: 80%;
    }
  `;

  const StyledButton = styled(Button)`
     {
      margin-top: 2%;
      width: 30%;
    }
  `;

  const [open, setOpen] = React.useState(false);

  let countryName = countriesKey[currentSel];

  const handleSubmit = () => {
    fetch("", {
      method: "POST",
      headers: {
        "Content-Type": "Application/JSON",
      },
      body: JSON.stringify({
        userID: currentUserID,
        country: countryName,
        photos: formPhotos,
        restaurants: formRestaurants,
        friends: formFriends,
        notes: formNotes,
      }),
    })
      .then((data) => data.json())
      .then((res) => {
        console.log("this is the res", res);
        setOpen(true);
        setShowForm(false);
      })
      .catch((err) => {
        window.alert("Houston we have a problem");
        setShowForm(false);
        console.log(
          "this is the error from trying to submit trip details",
          err
        );
      });
  };

  // const handleSubmit = () => {
  //   fetch();
  // };

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
        onChange={(event) => setFormPhotos(event.target.value)}
      />
      <StyledInput
        className={classes.margin}
        label='Restaurants'
        required
        variant='outlined'
        defaultValue='Chipotle'
        id='validation-outlined-input'
        onChange={(event) => setFormRestaurants(event.target.value)}
      />
      <StyledInput
        className={classes.margin}
        label='Travel Buddies'
        required
        variant='outlined'
        defaultValue='Kanye'
        id='validation-outlined-input'
        onChange={(event) => setFormFriends(event.target.value)}
      />
      <StyledInput
        className={classes.margin}
        label='Notes'
        required
        variant='outlined'
        defaultValue='My life is dope and I do dope shit '
        id='validation-outlined-input'
        onChange={(event) => setFormNotes(event.target.value)}
      />
      <StyledButton variant='contained' color='primary' onClick={handleSubmit}>
        Submit
      </StyledButton>
    </form>
  );
};

export default FormInput;
