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

const StyledPaper = styled(Paper)`
  position: fixed;
  z-index: 10;
  bottom: 10px;
  opacity: 90%;
  font-family: "Arial";
`;

const StyledParagraph = styled.p`
   {
    font-family: "Arial";
  }
`;

const StyledHeader = styled.h2`
   {
    font-family: "Arial";
  }
`;

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
      <StyledPaper elevation={3}>
        <div onClick={() => setShowPopUp(false)}>X</div>
        <StyledHeader>Welcome to ____</StyledHeader>
        <StyledHeader>
          Get start today with pinning your past trips!
        </StyledHeader>
        <StyledParagraph>Sign up or login here:</StyledParagraph>
        <AccountCircleIcon />
        <ol>
          <li>Sign up or Login to get started</li>
          <li>Click a country you've been to on the Map</li>
          <li>Submit some details on that past trip </li>
        </ol>
        <StyledParagraph>
          Check out your past trips with this icon:
        </StyledParagraph>
        <StyledBadge badgeContent={1} color='secondary'>
          <StyledExploreIcon style={{ fontSize: "50px" }} />
        </StyledBadge>
      </StyledPaper>
    </div>
  );
};

export default NewUserPopUp;
