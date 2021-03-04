import React from 'react';
import { List, ListItem, ListItemText } from '@material-ui/core';

interface SearchSuggestionsProps {
  suggestions: string[];
}

const SearchSuggestions = ({ suggestions }: SearchSuggestionsProps) => (
    <List>
      {suggestions.map((country) => (
        <ListItem key={country}>
          <ListItemText primary={country} />
        </ListItem>
      ))}
    </List>
  );

export default SearchSuggestions;
