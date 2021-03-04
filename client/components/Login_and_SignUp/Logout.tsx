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
  }
`;

interface LogoutProps {
  setCurrentUser: (code: string) => void;
  setVisited: (code: string[]) => void;
  currentUser: string;
}

const Logout: React.FC<any> = ({
  setCurrentUser,
  setVisited,
  currentUser,
}: LogoutProps) => {
  const handleClick = () => {
    fetch(`/user/logout/${currentUser}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "Application/JSON",
      },
    })
      .then((data) => data.json())
      .then((res) => {
        console.log("this is the res", res);
        setCurrentUser("");
        setVisited([]);
      })
      .catch((err) => {
        console.log("this is the error from trying to login", err);
      });
  };

  return (
    <div className='user-option'>
      <Button variant='contained' color='primary' onClick={handleClick}>
        Log out
      </Button>
    </div>
  );
};

export default Logout;
