import React from 'react';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import styled from 'styled-components';
import Map from './ManualMap/Map';
import MapTools, { MapToolsProps } from './ManualMap/MapTools';
import SearchBar, { SearchBarProps, ZPPState } from './ManualMap/SearchBar';

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
  setCurrentSel: (code: string) => void;
  setVisited: (codes: string[]) => void;
  currentUser: string;
}

const MapContainer = ({ visited, setVisited, setCurrentSel }: MapContainerProps) => {
  const handleClick = (evt: React.MouseEvent) => {
    if (!(evt.target as HTMLElement)?.classList.contains('datamaps-subunit')) setCurrentSel('');
  };
  return (
    <FullContainer onClick={handleClick}>
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
        {({
          zoomIn,
          zoomOut,
          resetTransform,
          setTransform,
          ...rest
        }: MapToolsProps & Pick<SearchBarProps, 'setTransform'> & ZPPState) => (
          <>
            <TransformComponent>
              <Map visited={visited} setVisited={setVisited} setCurrentSel={setCurrentSel} />
            </TransformComponent>
            <MapTools zoomIn={zoomIn} zoomOut={zoomOut} resetTransform={resetTransform} />
            <SearchBar setTransform={setTransform} coords={rest} />
          </>
        )}
      </TransformWrapper>
    </FullContainer>
  );
};

export default MapContainer;
