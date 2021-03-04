import React from 'react';
import { Snackbar, IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import styled from 'styled-components';

const StyledSnackbar = styled(Snackbar)`
  & .MuiSnackbarContent-root {
    background: white;
    color: red;
  }

/* hacky centering. watchout if changing string length/font size */
  & .MuiSnackbarContent-message {
    text-align: center;
    width:100%;
    position: absolute;
    left:0;
  }
`;

interface UserUnkownProps {
  open: boolean;
  closeWarning: () => void;
}

const LoginWarning = ({ open, closeWarning }: UserUnkownProps) => (
  <StyledSnackbar
    anchorOrigin={{
      vertical: 'top',
      horizontal: 'center',
    }}
    open={open}
    // autoHideDuration={6000}
    onClose={closeWarning}
    message="Login Failed. Try again."
    // don't hide on click away
    ClickAwayListenerProps={{ onClickAway: () => {} }}
    action={
      <>
        <IconButton size="small" aria-label="close" color="inherit" onClick={closeWarning}>
          <CloseIcon fontSize="small" />
        </IconButton>
      </>
    }
  />
);

export default LoginWarning;
