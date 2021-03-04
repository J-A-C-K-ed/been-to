import React, { useState } from 'react';
import { Snackbar, IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

interface UserUnkownProps {
  open: boolean;
}

const UserUnknown = ({ open  }: UserUnkownProps) => {
  const [hide, setHide] = useState(false);

  const hideHandler = () => {
    setHide(true)
  }
  return (
    <Snackbar
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
      open={open && !hide}
      autoHideDuration={6000}
      onClose={hideHandler}
      message="You don't seem to be logged in. Click on the top right button to get started"
      // don't hide on click away
      ClickAwayListenerProps={{ onClickAway: () => {} }}
      action={
        <>
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={hideHandler}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </>
      }
    />
  );
};

export default UserUnknown;
