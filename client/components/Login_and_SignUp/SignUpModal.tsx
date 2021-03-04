/* eslint-disable react/jsx-filename-extension */
import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import styled from "styled-components";

const StyledButton = styled(Button)`
   {
    & .MuiButton-containedPrimary {
      margin-top: 90%;
    }
  }
`;
interface signUpModalProps {
  setCurrentUser: (code: string) => void;
  setVisited: (codes: string[]) => void;
}
const SignUpModal: React.FC<any> = ({
  setCurrentUser,
  setVisited,
}: signUpModalProps) => {
  const [open, setOpen] = React.useState<boolean>(false);
  const [username, setUsername] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const [email, setEmail] = React.useState<string>("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    if (username.length > 0 && email.length && password.length > 0) {
      fetch("/user/create", {
        method: "POST",
        headers: {
          "Content-Type": "Application/JSON",
        },
        body: JSON.stringify({
          username: username,
          email: email,
          password: password,
        }),
      })
        .then((data) => data.json())
        .then((res) => {
          setCurrentUser(username);
          setVisited([]);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <div className='user-option'>
      <StyledButton
        variant='contained'
        color='primary'
        onClick={handleClickOpen}
      >
        Sign Up
      </StyledButton>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby='form-dialog-title'
      >
        <DialogTitle id='form-dialog-title'>Sign up</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin='dense'
            id='name'
            label='Username'
            type='text'
            onChange={(event) => setUsername(event.target.value)}
            fullWidth
          />
          <TextField
            autoFocus
            margin='dense'
            id='name'
            label='Email'
            onChange={(event) => setEmail(event.target.value)}
            type='email'
            fullWidth
          />
          <TextField
            autoFocus
            margin='dense'
            id='name'
            label='Password'
            onChange={(event) => setPassword(event.target.value)}
            type='password'
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color='primary'>
            Cancel
          </Button>
          <Button onClick={handleClose} color='primary'>
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default SignUpModal;
