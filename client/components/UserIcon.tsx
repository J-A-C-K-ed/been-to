/* eslint-disable react/jsx-filename-extension */
import React from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Popover from "@material-ui/core/Popover";
import UserModal from "./Login_and_SignUp/UserModal";
import SignUpModal from "./Login_and_SignUp/SignUpModal";
import LoginModal from "./Login_and_SignUp/LoginModal";
import Logout from "./Login_and_SignUp/Logout";
import styled from "styled-components";

const StyledPopover = styled(Popover)`
  & .MuiPopover-paper {
    background-color: transparent;
    box-shadow: none;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    margin-top: 1%;
  }
`;

const UserIcon: React.FC<any> = ({
  setCurrentUser,
  setVisited,
  currentUser,
}) => {
  const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      typography: {
        padding: theme.spacing(2),
      },
    })
  );

  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );

  const handleClick = (event: any): void => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (): void => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <div>
      <UserModal aria-describedby={id} handleClick={handleClick} />
      <StyledPopover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        {currentUser.length < 1 ? (
          <>
            <SignUpModal setCurrentUser={setCurrentUser} />
            <LoginModal
              setCurrentUser={setCurrentUser}
              setVisited={setVisited}
            />
          </>
        ) : null}
        {currentUser.length > 1 ? <Logout currentUser={currentUser} /> : null}
      </StyledPopover>
    </div>
  );
};

export default UserIcon;
