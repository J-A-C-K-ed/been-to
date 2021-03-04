import React from 'react';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import styled from 'styled-components';
import FormInput from './FormInput';

const StyledPaper = styled(Paper)`
  position: fixed;
  z-index: 10;
  bottom: 10px;
`;

const TripDetailsForm: React.FC<any> = ({ currentUser, setShowForm, clickedCountry }) => {
  const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      root: {
        display: 'flex',
        alignItems: 'center',
        flexWrap: 'wrap',
        '& > *': {
          margin: theme.spacing(1),
          width: theme.spacing(40),
          height: theme.spacing(50),
        },
      },
    })
  );

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <StyledPaper elevation={3}>
        <FormInput
          currentUser={currentUser}
          setShowForm={setShowForm}
          clickedCountry={clickedCountry}
        />
      </StyledPaper>
    </div>
  );
};

export default TripDetailsForm;
