import React, { useState, memo } from "react";
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
  currentUser: string;
}

// const PhotoInputs = () => {

// }

const FormInput: React.FC<any> = ({
  setShowForm,
  currentSel,
  currentUser,
  currentUserID,
}: FormInputProps) => {
  const [formPhotos, setFormPhotos] = useState<string>("");
  const [formRestaurants, setFormRestaurants] = useState<string>("");
  const [formBuddies, setFormFriends] = useState<string>("");
  const [formNotes, setFormNotes] = useState<string>("");

  const StyledInput = styled.input`
     {
      width: 80%;
      padding: 1rem;
      border: none;
      box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
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

  const handleSubmit = (e: any) => {
    e.preventDefault();

    fetch("/locations/details/add", {
      method: "POST",
      headers: {
        "Content-Type": "Application/JSON",
      },
      body: JSON.stringify({
        userId: currentUserID,
        name: currentUser,
        countrycode: currentSel,
        photos: formPhotos,
        restaurants: formRestaurants,
        buddies: formBuddies,
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

  // const ValidationTextField = withStyles({
  //   root: {
  //     "& input:valid + fieldset": {
  //       borderColor: "green",
  //       borderWidth: 2,
  //     },
  //     "& input:invalid + fieldset": {
  //       borderColor: "red",
  //       borderWidth: 2,
  //     },
  //     "& input:valid:focus + fieldset": {
  //       borderLeftWidth: 6,
  //       padding: "4px !important", // override inline-style
  //     },
  //   },
  // })(TextField);

  const theme = createMuiTheme({
    palette: {
      primary: green,
    },
  });

  const classes = useStyles();

  return (
    <form className={classes.root} noValidate>
      <label>
        Photos
        <StyledInput
          className={classes.margin}
          placeholder='My dropbox link'
          key='photosInput'
          type='text'
          required
          // variant='outlined'
          value={formPhotos}
          id='validation-outlined-input'
          onChange={(event: any) => setFormPhotos(event.target.value)}
        />
      </label>
      <label>
        Restaurants
        <StyledInput
          className={classes.margin}
          placeholder='Restaurants'
          key='restaurantsInput'
          type='text'
          required
          // variant='outlined'
          value={formRestaurants}
          id='validation-outlined-input'
          onChange={(event: any) => setFormRestaurants(event.target.value)}
        />
      </label>
      <label>
        Travel Buddies
        <StyledInput
          className={classes.margin}
          // label='Travel Buddies'
          type='text'
          key='travelInput'
          required
          placeholder='Kanye'
          value={formBuddies}
          id='validation-outlined-input'
          onChange={(event: any) => setFormFriends(event.target.value)}
        />
      </label>
      <label>
        Notes
        <StyledInput
          className={classes.margin}
          type='text'
          key='notesInput'
          required
          placeholder='It was a blast'
          value={formNotes}
          id='validation-outlined-input'
          onChange={(event: any) => setFormNotes(event.target.value)}
        />
      </label>
      <StyledButton variant='contained' color='primary' onClick={handleSubmit}>
        Submit
      </StyledButton>
    </form>
  );
};

export default FormInput;
