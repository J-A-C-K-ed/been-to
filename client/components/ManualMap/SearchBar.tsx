import React, { useState, memo } from 'react';
import { Input, Paper, IconButton, ClickAwayListener } from '@material-ui/core';
import LocationSearchingIcon from '@material-ui/icons/LocationSearching';
import styled from 'styled-components';
import Fuse from 'fuse.js';

import SearchSuggestions from './SearchSuggestions';

import countryTable from '../../countries';

interface CountrySuggestion {
  code: string;
  name: string;
}

const countryObjects = Object.entries(countryTable).map(([code, name]) => ({
  code,
  name,
})) as CountrySuggestion[];

const fuseOptions = {
  keys: ['code', 'name'],
};

const fuse = new Fuse(countryObjects, fuseOptions);

const BarPaper = styled(Paper)`
  position: fixed;
  z-index: 10;
  top: 35px;
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
  const [suggestions, setSuggestions] = useState<CountrySuggestion[]>([]);
  const [isFocused, setFocused] = useState(false);

  const focusCountry = (countryEl: Element) => {
    const { left, top, bottom, right } = countryEl?.getBoundingClientRect();
    const { positionX, positionY, scale } = coords;

    const padding = 100;

    const widthAdjust = (window.innerWidth - padding * 2) / (right - left);
    const heightAdjust = (window.innerHeight - padding * 2) / (bottom - top);

    const scaleAdjustment = Math.min(widthAdjust, heightAdjust);

    setTransform(
      (-left + positionX) * scaleAdjustment + padding,
      (-top + positionY) * scaleAdjustment + padding,
      scaleAdjustment * scale
    );
  };

  const search = (identifier?: string, isCode: boolean = false) => {
    let searchCode: string | undefined;

    if (identifier) {
      if (isCode) searchCode = identifier;
      if (!isCode) searchCode = countryObjects.find(({ name }) => name === identifier)?.code;
    } else {
      searchCode = suggestions[0]?.code;
    }

    if (!searchCode) return;

    const countryEl = document.querySelector(`.${searchCode}`);
    if (!countryEl) return;
    focusCountry(countryEl);
    setFocused(false);
  };

  const handleKeyDown = (evt: React.KeyboardEvent<HTMLInputElement>) => {
    if (evt.key !== 'Enter') return;
    if (evt.target instanceof HTMLElement) {
      evt.target.blur();
      search();
    }
  };

  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const newInput = evt.target.value;
    setUserInput(newInput);
    setSuggestions(fuse.search(newInput, { limit: 5 }).map((match) => match.item));
  };

  const goToSuggestion = (countryName: string) => {
    setUserInput(countryName);
    search(countryName);
  };

  return (
    <ClickAwayListener onClickAway={() => setFocused(false)}>
      <BarPaper elevation={6}>
        <StyledInput
          id="search-input"
          placeholder="Search"
          value={userInput}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          onFocus={() => setFocused(true)}
          disableUnderline
        />
        <IconButton onClick={() => search()}>
          <LocationSearchingIcon />
        </IconButton>
        {suggestions.length && isFocused ? (
          <SearchSuggestions
            suggestions={suggestions.map((sug) => sug.name)}
            useSuggestion={goToSuggestion}
          />
        ) : null}
      </BarPaper>
    </ClickAwayListener>
  );
};

export default memo(SearchBar);
