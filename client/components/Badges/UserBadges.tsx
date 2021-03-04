import React from "react";
import Badge from "@material-ui/core/Badge";
import { Theme, withStyles, createStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import ExploreIcon from "@material-ui/icons/Explore";
import styled from "styled-components";

const StyledButton = styled(IconButton)`
  position: fixed;
  z-index: 10;
  left: 15px;
  top: 15px;
`;

const StyledExploreIcon = styled(ExploreIcon)`
  fontsize: 50px;
`;

const UserBadges: React.FC<any> = ({ handleClick, visited }) => {
  const StyledBadge = withStyles((theme: Theme) =>
    createStyles({
      badge: {
        right: -3,
        top: 13,
        fontSize: "15px",
        border: `2px solid ${theme.palette.background.paper}`,
        padding: "0 4px",
      },
    })
  )(Badge);
  let count = !visited ? 0 : visited.length;
  return (
    <StyledButton aria-label='past-travel-locations'>
      <StyledBadge badgeContent={count} color='secondary'>
        <StyledExploreIcon
          style={{ fontSize: "50px" }}
          onClick={(event: any) => handleClick(event)}
        />
      </StyledBadge>
    </StyledButton>
  );
};

export default UserBadges;
