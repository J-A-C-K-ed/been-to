/* eslint-disable react/jsx-filename-extension */
import React from "react";
import Button from "@material-ui/core/Button";
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
  const handleClick = () => { window.location.href = '/user/logout' };

  return (
    <div className='user-option'>
      <Button variant='contained' color='primary' onClick={handleClick}>
        Log out
      </Button>
    </div>
  );
};

export default Logout;
