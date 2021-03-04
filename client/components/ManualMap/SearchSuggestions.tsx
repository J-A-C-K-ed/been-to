import React from 'react';
import { List, ListItem, ListItemText } from '@material-ui/core';

interface SearchSuggestionsProps {
  suggestions: string[];
  useSuggestion: (countryName: string) => void;
}

const SearchSuggestions = ({ suggestions, useSuggestion }: SearchSuggestionsProps) => (
  <List>
    {suggestions.map((country) => (
      <ListItem key={country} button onClick={() => useSuggestion(country)}>
        <ListItemText primary={country} />
      </ListItem>
    ))}
  </List>
);

export default SearchSuggestions;
