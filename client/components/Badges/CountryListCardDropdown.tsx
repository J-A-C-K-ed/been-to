import React, { useState, useEffect } from "react";
import CountryListCardDropdownList from "./CountryListCardDropdownList";
import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import styled from "styled-components";

const StyledAccordion = styled(Accordion)`
{
 box-shadow: none;
 background-color: beige;

 }
}
`;

const StyledAccordionDetails = styled(AccordionDetails)`
{
 box-shadow: none;

 }
}
`;
const StyledAccordionSummary = styled(AccordionSummary)`
{
 box-shadow: none;
 }
}
`;
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
      fontWeight: theme.typography.fontWeightRegular,
      color: "black",
    },
  })
);

const CountryListCardDropdown: React.FC<any> = ({
  CountryCode,
  currentUserID,
  currentUser,
}) => {
  const classes = useStyles();
  const [restaurants, setRestaurants] = useState("");
  const [photos, setPhotos] = useState("");
  const [buddies, setBuddies] = useState("");
  const [notes, setNotes] = useState("");

  useEffect(() => {
    fetch("/locations/details/get", {
      method: "POST",
      headers: {
        "Content-Type": "Application/JSON",
      },
      body: JSON.stringify({
        name: currentUser,
        userId: currentUserID,
        countrycode: CountryCode,
      }),
    })
      .then((data) => data.json())
      .then((res) => {
        setPhotos(res.photos);
        setRestaurants(res.restaurants);
        setBuddies(res.buddies);
        setNotes(res.notes);
      })
      .catch((err) => {
        console.error(
          "There was the following error when trying to login",
          err
        );
      });
  }, []);

  return (
    <div className={classes.root}>
      <StyledAccordion>
        <StyledAccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls='panel1a-content'
          id='panel1a-header'
        >
          <Typography className={classes.heading}>
            Check out some details!
          </Typography>
        </StyledAccordionSummary>
        <StyledAccordionDetails>
          <CountryListCardDropdownList
            photos={photos}
            restautants={restaurants}
            notes={notes}
            buddies={buddies}
          />
        </StyledAccordionDetails>
      </StyledAccordion>
    </div>
  );
};

export default CountryListCardDropdown;
