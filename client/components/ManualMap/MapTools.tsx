import React from 'react';
import { ButtonGroup, Button } from '@material-ui/core';
import ZoomInIcon from '@material-ui/icons/ZoomIn';
import ZoomOutIcon from '@material-ui/icons/ZoomOut';
import FullscreenIcon from '@material-ui/icons/Fullscreen';
import styled from 'styled-components';

const Toolbar = styled(ButtonGroup)`
  position: fixed;
  bottom: 15px;
  right: 15px;
  z-index: 10;
`;

const SquareBtn = styled(Button)`
  padding: 5px;
`;

export interface MapToolsProps {
  zoomIn: () => void;
  zoomOut: () => void;
  resetTransform: () => number;
}

const MapTools = ({ zoomIn, zoomOut, resetTransform }: MapToolsProps) => (
  <Toolbar variant="contained" orientation="vertical">
    <SquareBtn onClick={zoomIn}>
      <ZoomInIcon />
    </SquareBtn>
    <SquareBtn onClick={zoomOut}>
      <ZoomOutIcon />
    </SquareBtn>
    <SquareBtn onClick={resetTransform}>
      <FullscreenIcon />
    </SquareBtn>
  </Toolbar>
);

export default MapTools;
