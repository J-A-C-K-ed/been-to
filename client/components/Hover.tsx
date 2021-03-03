import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Paper } from '@material-ui/core';

import countryTable from '../countries';

interface Position {
  x: number;
  y: number;
}

const CursorTooltip = styled(Paper)<{ $pos: Position }>`
  position: fixed;
  top: ${({ $pos: { y } }) => y}px;
  left: ${({ $pos: { x } }) => x}px;
  padding: 7px;
`;

interface HoverProps {
  country: string;
}

const Hover = ({ country }: HoverProps) => {
  // Initialize to negative space to prevent it from being visible before following the mouse
  const [pos, setPos] = useState({ x: -1000, y: -1000 });

  const name = countryTable[country];

  useEffect(() => {
    const updatePos = (evt: MouseEvent) => {
      const offset = 20;
      setPos({
        x: evt.clientX + offset,
        y: evt.clientY + offset,
      });
    };
    if (name) {
      window.addEventListener('mousemove', updatePos);
    }
    return () => window.removeEventListener('mousemove', updatePos);
  });

  // if name not found
  if (!name) return null;
  return (
    <CursorTooltip $pos={pos} elevation={6}>
      {name}
    </CursorTooltip>
  );
};

export default Hover;
