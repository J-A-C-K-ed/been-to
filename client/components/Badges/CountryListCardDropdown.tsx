import React from "react";
import CountryListCardDropdownList from "./CountryListCardDropdownList";
import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import styled from "styled-components";

const StyledAccordion = styled(Accordion)`
{
 box-shadow: none;
 background-color: beige;

 }
}
`;

const StyledAccordionDetails = styled(AccordionDetails)`
{
 box-shadow: none;

 }
}
`;
const StyledAccordionSummary = styled(AccordionSummary)`
{
 box-shadow: none;
 }
}
`;
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
      fontWeight: theme.typography.fontWeightRegular,
      color: "black",
    },
  })
);

const CountryListCardDropdown: React.FC<any> = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <StyledAccordion>
        <StyledAccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls='panel1a-content'
          id='panel1a-header'
        >
          <Typography className={classes.heading}>
            Check out some details!
          </Typography>
        </StyledAccordionSummary>
        <StyledAccordionDetails>
          <CountryListCardDropdownList />
        </StyledAccordionDetails>
      </StyledAccordion>
    </div>
  );
};

export default CountryListCardDropdown;
