import React from "react";
import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import styled from "styled-components";
import FormInput from "./FormInput";
import countriesKey from "../../countries";

const StyledPaper = styled(Paper)`
  z-index: 10;
  align-items: center;
  justify-content: center;
  opacity: 80%;
  font-family: "Arial";
  padding: 2rem 1rem 2rem 1rem;
`;

const StyledHeader = styled.h3`
   {
    font-family: "Arial";
    margin-left: 1%;
    font-weight: bold;
    text-align: center;
  }
`;

interface TripDetailsFormProps {
  setShowForm: (code: boolean) => void;
  currentSel: string;
  currentUserID: any;
}

const TripDetailsForm: React.FC<any> = ({
  setShowForm,
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

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <StyledPaper elevation={3}>
        <StyledHeader>
          Save some details about your trip to {countriesKey[currentSel]}!
        </StyledHeader>
        <FormInput
          setShowForm={setShowForm}
          currentSel={currentSel}
          currentUserID={currentUserID}
        />
      </StyledPaper>
    </div>
  );
};

export default TripDetailsForm;
