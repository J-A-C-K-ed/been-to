import React, { useState, useEffect, memo } from 'react';
import styled from 'styled-components';
import Map from './ManualMap/Map';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';

const FullContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #9cc0f9;
`;

interface MapContainerProps {
  visited: string[];
  setVisited: (codes: string[]) => void;
}

const MapContainer = ({ visited, setVisited }: MapContainerProps) => (
    <FullContainer>
      <TransformWrapper
        wheel={{ step: 100 }}
        options={{ limitToBounds: false }}
        // onPanningStop={() => {
        //   isDragging = false;
        // }}
        // onPanning={() => {
        //   isDragging = true;
        // }}
      >
        <TransformComponent>
              <Map visited={visited} setVisited={setVisited} />
        </TransformComponent>
      </TransformWrapper>
    </FullContainer>
  );

export default MapContainer;
