import React from "react";
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import ImageIcon from "@material-ui/icons/Image";
import CommentIcon from "@material-ui/icons/Comment";
import EmojiPeopleIcon from "@material-ui/icons/EmojiPeople";
import FastfoodIcon from "@material-ui/icons/Fastfood";

const CountryListCardDropdownList: React.FC<any> = ({
  photos,
  restaurants,
  notes,
  buddies,
}) => {
  const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      root: {
        width: "100%",
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
      },
    })
  );

  const classes = useStyles();

  return (
    <List className={classes.root}>
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <ImageIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary='Photos' secondary={photos} />
      </ListItem>
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <EmojiPeopleIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary='Travel buddies' secondary={buddies} />
      </ListItem>
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <FastfoodIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary='Restaurants' secondary={restaurants} />
      </ListItem>
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <CommentIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary='Notes' secondary={notes} />
      </ListItem>
    </List>
  );
};

export default CountryListCardDropdownList;
