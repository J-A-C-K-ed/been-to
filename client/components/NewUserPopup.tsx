import React from "react";
import {
  Theme,
  createStyles,
  makeStyles,
  withStyles,
} from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import styled from "styled-components";
import ExploreIcon from "@material-ui/icons/Explore";
import Badge from "@material-ui/core/Badge";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import PinDropIcon from "@material-ui/icons/PinDrop";
import MapIcon from "@material-ui/icons/Map";
import SpeakerNotesIcon from "@material-ui/icons/SpeakerNotes";

const StyledPaper = styled(Paper)`
  position: fixed;
  z-index: 10;
  bottom: 10px;
  opacity: 80%;
  font-family: "Arial";
  padding: 1rem;
`;

const StyledParagraph = styled.p`
   {
    font-family: "Arial";
    margin-left: 1%;
  }
`;

const StyledHeader = styled.h2`
   {
    font-family: "Arial";
    text-align: center;
  }
`;

const StyledSubHeader = styled.h4`
   {
    font-family: "Arial";
    text-align: center;
  }
`;

const StyledDiv = styled.div`{
  display: flex;
  flex-direction: column;
  justify-content: center:
  align-items: center;
}`;

const StyledBadge = withStyles((theme: Theme) =>
  createStyles({
    badge: {
      right: 3,
      top: 13,
      fontSize: "15px",
      border: `2px solid ${theme.palette.background.paper}`,
      padding: "0 4px",
    },
  })
)(Badge);

const StyledExploreIcon = styled(ExploreIcon)`
  fontsize: 50px;
`;

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

interface NewUserPopUpProps {
  setShowPopUp: (code: boolean) => void;
}

const NewUserPopUp = ({ setShowPopUp }: NewUserPopUpProps) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <StyledPaper elevation={5}>
        <div onClick={() => setShowPopUp(false)}>X</div>
        <StyledDiv>
          <StyledHeader>
            <PinDropIcon style={{ fontSize: "30px", color: "#9cc0f9" }} />
            Welcome to trip-pin
          </StyledHeader>
          <StyledSubHeader>Keep track of your past trips</StyledSubHeader>

          <div>
            <StyledParagraph>
              {" "}
              <AccountCircleIcon
                style={{ fontSize: "30px", color: "#9cc0f9" }}
              />
              Sign up or login here
            </StyledParagraph>
            <StyledParagraph>
              <MapIcon
                style={{ fontSize: "30px", color: "rgb(115, 156, 126)" }}
              />{" "}
              Click a country you've been to on the map
            </StyledParagraph>
            <StyledParagraph>
              {" "}
              <SpeakerNotesIcon
                style={{ fontSize: "30px", color: "#9cc0f9" }}
              />
              Submit some details on that past trip{" "}
            </StyledParagraph>
          </div>
          <StyledParagraph>
            <StyledBadge badgeContent={1} color='secondary'>
              <StyledExploreIcon
                style={{ fontSize: "30px", color: "rgb(115, 156, 126)" }}
              />
            </StyledBadge>{" "}
            Check out your past trips
          </StyledParagraph>
        </StyledDiv>
      </StyledPaper>
    </div>
  );
};

export default NewUserPopUp;
