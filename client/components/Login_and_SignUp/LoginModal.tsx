/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import styled from 'styled-components';
import WarningLogin from './WarningLogin'


const StyledDialog = styled(Dialog)`
  background-color: none;
`;

interface LoginModalProps {
  setCurrentUser: (code: string) => void;
  setCurrentUserID: (code: any) => void;
  setVisited: (codes: string[]) => void;
  visited: string[];
}

const LoginModal: React.FC<any> = ({
  setCurrentUser,
  setVisited,
  setCurrentUserID,
  visited,
}: LoginModalProps) => {
  const [open, setOpen] = React.useState<boolean>(false);
  const [username, setUsername] = React.useState<string>('');
  const [password, setPassword] = React.useState<string>('');
  const [warnUser, setWarnUser] = React.useState(false)

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    console.log('start submit')
    setOpen(false);
    fetch('/user/get', {
      method: 'POST',
      headers: {
        'Content-Type': 'Application/JSON',
      },
      body: JSON.stringify({
        userName: username,
        passWord: password,
      }),
    })
      .then((res) => {
        console.log(res)
        if (!res.ok) {
          setWarnUser(true)
          throw new Error('Failed to log in');
        }
        return res.json();
      })
      .then((res) => {
        console.log("this is the res", res);

        setCurrentUser(res.username);
        setCurrentUserID(res.id);
        console.log("this is the res", res);
        setVisited(res.countrycodes || []);
      })
      .catch((err) => {
        console.error('There was the following error when trying to login', err);
      });
  };

  return (
    <div className="user-option">
      <Button variant="contained" color="primary" onClick={handleClickOpen}>
        Sign in
      </Button>
      <StyledDialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Sign in</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Username"
            type="text"
            onChange={(event) => setUsername(event.target.value)}
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Password"
            onChange={(event) => setPassword(event.target.value)}
            type="password"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Submit
          </Button>
        </DialogActions>
      </StyledDialog>
      <WarningLogin open={warnUser} closeWarning={() => setWarnUser(false)}/>
    </div>
  );
};

export default LoginModal;
