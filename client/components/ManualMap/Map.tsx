import React, {memo} from 'react';
import styled from 'styled-components';
import countryPaths from './Countries';

interface CountryProps {
  country: string;
  isVisited: boolean;
  clickHandler: (evt: React.MouseEvent<SVGPathElement>) => void;
}

const Country = ({ country, isVisited, clickHandler }: CountryProps) =>
  countryPaths[country](isVisited, clickHandler);

const StyledMap = styled.svg`
  width: 100vw;
  height: 100vh;
  overflow: hidden;
`;

interface MapProps {
  visited: string[];
  setVisited: (newVisited: string[]) => void;
  setCurrentSel: (country: string) => void;
}

const Map = ({ visited, setVisited, setCurrentSel }: MapProps) => {
  const createClickHandler = (country: string) => (evt: React.MouseEvent<SVGPathElement>) => {
    evt.preventDefault();
    // evt.stopPropagation();

    // if country is already marked
    if (visited.includes(country)) {
      setCurrentSel('');
      setVisited(visited.filter((code) => code !== country));
    } else {
      setVisited(visited.concat(country));
      setCurrentSel(country);
    }
  };

  return (
    <StyledMap viewBox="0 0 1778.245691804732 1352">
      <g>
        {Object.keys(countryPaths).map((country) => (
          <Country
            key={country}
            country={country}
            isVisited={visited.includes(country)}
            clickHandler={createClickHandler(country)}
          />
        ))}
      </g>
    </StyledMap>
  );
};

export default memo(Map);
