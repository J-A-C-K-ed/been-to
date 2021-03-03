import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import styled from "styled-components";

const TopNav = () => {
  const StyledAppBar = styled(AppBar)`
     {
      height: 30px;
      background-color: #90ee90;
    }
  `;
  const StyledTypography = styled(Typography)`
     {
      font-size: 20px;
      font-weight: bold;
    }
  `;

  const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      title: {
        flexGrow: 1,
        textAlign: "center",
      },
    })
  );

  const classes = useStyles();

  return (
    <div>
      <StyledAppBar position='static'>
        <StyledTypography className={classes.title}>
          Login or Sign up to Start Logging Your Trips!
        </StyledTypography>
      </StyledAppBar>
    </div>
  );
};

export default TopNav;
