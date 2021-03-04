import React from 'react';
import styled from 'styled-components';
import countryPaths from './Countries';

interface CountryProps {
  country: string;
  isVisited: boolean;
  clickHandler: () => void;
}

const Country = ({ country, isVisited, clickHandler }: CountryProps) =>
  countryPaths[country](isVisited, clickHandler);

const MercatorAspectRatio = 568 / 360.94;

const StyledMap = styled.svg`
  width: 100vw;
  height: 100vh;
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
  <StyledMap viewBox="0 0 1778.245691804732 1352">
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
