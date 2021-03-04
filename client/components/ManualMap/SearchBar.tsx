import React, { useState, memo } from 'react';
import { Input, Paper, IconButton } from '@material-ui/core';
import LocationSearchingIcon from '@material-ui/icons/LocationSearching';
import styled from 'styled-components';

import countryTable from '../../countries';

const searchIndex = Object.fromEntries(
  Object.entries(countryTable).map(([code, name]) => [name, code])
);

const BarPaper = styled(Paper)`
  position: fixed;
  z-index: 10;
  top: 45px;
  opacity: 0.5;
  transition: opacity 0.3s ease;

  &:focus-within {
    opacity: 1;
  }
`;

const StyledInput = styled(Input)`
  padding: 5px 10px;
  width: clamp(150px, 50vw, 500px);
`;

export interface ZPPState {
  positionX: number;
  positionY: number;
  scale: number;
}

export interface SearchBarProps {
  setTransform: (posX: number, posY: number, scale: number) => number | null;
  coords: ZPPState;
}

const SearchBar = ({ setTransform, coords }: SearchBarProps) => {
  const [userInput, setUserInput] = useState('');

  const search = () => {
    if (!searchIndex[userInput]) return;
    const countryEl = document.querySelector(`.${searchIndex[userInput]}`);
    if (!countryEl) return;
    const { left, top, bottom, right } = countryEl?.getBoundingClientRect();

    const { positionX, positionY, scale } = coords;

    const padding = 100;

    const widthAdjust = (window.innerWidth - padding * 2) / (right - left);
    const heightAdjust = (window.innerHeight - padding * 2) / (bottom - top);

    const newScale = Math.min(widthAdjust, heightAdjust);
    setTransform(
      (-left + positionX) * newScale + padding,
      (-top + positionY) * newScale + padding,
      newScale * scale
    );
  };

  const handleKeyDown = (evt: React.KeyboardEvent<HTMLInputElement>) => {
    if (evt.key !== 'Enter') return;
    if (evt.target instanceof HTMLElement) {
      evt.target.blur();
      search();
    }
  };

  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput(evt.target.value);
  };

  return (
    <BarPaper elevation={6}>
      <StyledInput
        id="search-input"
        placeholder="Search"
        value={userInput}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        disableUnderline
      />
      <IconButton onClick={search}>
        <LocationSearchingIcon />
      </IconButton>
    </BarPaper>
  );
};

export default memo(SearchBar);
