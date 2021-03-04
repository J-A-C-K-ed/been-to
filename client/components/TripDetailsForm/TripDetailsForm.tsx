import React, { useState } from "react";
import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import styled from "styled-components";
import countriesKey from "../../countries";
import { Button } from "@material-ui/core";

const StyledPaper = styled(Paper)`
  z-index: 10;
  align-items: center;
  justify-content: center;
  opacity: 80%;
  font-family: "Arial";
  padding: 2rem 1rem 5rem 1rem;
  /* height: 20vh; */
`;

const StyledHeader = styled.h3`
   {
    font-family: "Arial";
    margin-left: 1%;
    font-weight: bold;
    text-align: center;
  }
`;

const StyledButton = styled(Button)`
   {
    margin-top: 3%;
    margin-bottom: 3%;
    margin-left: 29%;
    width: 30%;
    align-items: center;
    justify-content: center;
  }
`;

const StyledForm = styled.form`
   {
    display: flex;
    flex-direction: column;
  }
`;

const StyledLabel = styled.label`
   {
    display: flex;
    flex-direction: column;
  }
`;

const StyledInput = styled.input`
   {
    width: 80%;
    margin-top: 3%;
    margin-bottom: 3%;
    margin-left: 3%;
    padding: 1rem;
    border: none;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  }
`;

interface TripDetailsFormProps {
  setShowForm: (code: boolean) => void;
  currentSel: string;
  currentUserID: any;
  currentUser: string;
}

const TripDetailsForm: React.FC<any> = ({
  setShowForm,
  currentUser,
  currentSel,
  currentUserID,
}: TripDetailsFormProps) => {
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

  const [formPhotos, setFormPhotos] = useState<string>("");
  const [formRestaurants, setFormRestaurants] = useState<string>("");
  const [formBuddies, setFormFriends] = useState<string>("");
  const [formNotes, setFormNotes] = useState<string>("");
  const [open, setOpen] = React.useState(false);

  const classes = useStyles();

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

  return (
    <div className={classes.root}>
      <StyledPaper elevation={3}>
        <StyledHeader>
          Save some details about your trip to {countriesKey[currentSel]}!
        </StyledHeader>
        {/* <FormInput
          setShowForm={setShowForm}
          currentSel={currentSel}
          currentUserID={currentUserID}
          currentUser={currentUser}
        /> */}
        <StyledForm>
          <StyledLabel>
            Photos
            <StyledInput
              // className={classes.margin}
              placeholder='My dropbox link'
              key='photosInput'
              type='text'
              required
              // variant='outlined'
              value={formPhotos}
              id='validation-outlined-input'
              onChange={(event: any) => setFormPhotos(event.target.value)}
            />
          </StyledLabel>
          <StyledLabel>
            Restaurants
            <StyledInput
              // className={classes.margin}
              placeholder='Restaurants'
              key='restaurantsInput'
              type='text'
              required
              // variant='outlined'
              value={formRestaurants}
              id='validation-outlined-input'
              onChange={(event: any) => setFormRestaurants(event.target.value)}
            />
          </StyledLabel>
          <StyledLabel>
            Travel Buddies
            <StyledInput
              // className={classes.margin}
              // label='Travel Buddies'
              type='text'
              key='travelInput'
              required
              placeholder='Kanye'
              value={formBuddies}
              id='validation-outlined-input'
              onChange={(event: any) => setFormFriends(event.target.value)}
            />
          </StyledLabel>
          <StyledLabel>
            Notes
            <StyledInput
              // className={classes.margin}
              type='text'
              key='notesInput'
              required
              placeholder='It was a blast'
              value={formNotes}
              id='validation-outlined-input'
              onChange={(event: any) => setFormNotes(event.target.value)}
            />
          </StyledLabel>
          <StyledButton
            variant='contained'
            color='primary'
            onClick={handleSubmit}
          >
            Submit
          </StyledButton>
        </StyledForm>
      </StyledPaper>
    </div>
  );
};

export default TripDetailsForm;
