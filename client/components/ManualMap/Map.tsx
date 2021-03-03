import React from 'react';
import styled from 'styled-components';
// import { Paper } from '@material-ui/core';
import countryPaths from './Countries';

// interface Position {
//   x: number;
//   y: number;
// }

// const CursorTooltip = styled(Paper)<{ $pos: Position }>`
//   position: fixed;
//   top: ${({ $pos: { y } }) => y}px;
//   left: ${({ $pos: { x } }) => x}px;
//   padding: 7px;
// `;

interface CountryProps {
  country: string;
  isVisited: boolean;
  clickHandler: () => void;
}

const Country = ({ country, isVisited, clickHandler }: CountryProps) =>
  countryPaths[country](isVisited, clickHandler);

const StyledMap = styled.svg`
  width: 1778.245691804732;
  height: 1352;
  overflow: hidden;
`;

const toggleVisited = (visited: string[], country: string) => {
  if (visited.includes(country)) return visited.filter((code) => code !== country);
  return visited.concat(country);
};

interface MapProps {
  visited: string[];
  setVisited: (newVisited: string[]) => void;
}

const Map = ({ visited, setVisited }: MapProps) => (
  <StyledMap>
    <g>
      {Object.keys(countryPaths).map((country) => (
        <Country
          key={country}
          country={country}
          isVisited={visited.includes(country)}
          clickHandler={() => setVisited(toggleVisited(visited, country))}
        />
      ))}
    </g>
  </StyledMap>
);

export default Map;
// transform-origin: 0px 0px;
