/* eslint-disable react/jsx-filename-extension */
import UserBadges from "./Badges/UserBadges";
import CountryList from "./Badges/CountryList";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Popover from "@material-ui/core/Popover";
import styled from "styled-components";
import React from "react";

const StyledPopover = styled(Popover)`
  & .MuiPopover-paper {
    background-color: transparent;
    box-shadow: none;
    margin-top: 10%;
  }
`;

const UserBadgeDropdown: React.FC<any> = ({ visited }) => {
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
      <UserBadges
        aria-describedby={id}
        handleClick={handleClick}
        visited={visited}
      />
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
        <CountryList visited={visited} />
      </StyledPopover>
    </div>
  );
};

export default UserBadgeDropdown;
