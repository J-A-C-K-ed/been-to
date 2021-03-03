import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import styled from "styled-components";
import CountryListCardDropdown from "./CountryListCardDropdown";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

const StyledCard = styled(Card)`
     {
      margin-top: 10%;
      }
    }
  `;

const CountryListCard = ({ Country }: any) => {
  const classes = useStyles();

  return (
    <StyledCard className={classes.root}>
      <CardContent>
        <Typography
          className={classes.title}
          color='textSecondary'
          gutterBottom
        >
          {Country}
        </Typography>
      </CardContent>
      <CardActions>
        <CountryListCardDropdown />
      </CardActions>
    </StyledCard>
  );
};

export default CountryListCard;
