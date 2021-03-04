import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Fab from "@material-ui/core/Fab";
import React from "react";
import Tooltip from "@material-ui/core/Tooltip";

const UserModal: React.FC<any> = (props) => {
  const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      fab: {
        margin: theme.spacing(2),
        position: 'fixed',
        zIndex: 10,
        top: "15px",
        right:"15px"
      },
    })
  );

  const classes = useStyles();

  return (
    <div className='userIcon'>
      <Tooltip title='User' aria-label='add'>
        <Fab color='primary' className={classes.fab} onClick={(event: any) => props.handleClick(event)}>
          <AccountCircleIcon />
        </Fab>
      </Tooltip>
    </div>
  );
};

export default UserModal;
