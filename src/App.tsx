import React from 'react';
import { Routes, Route } from 'react-router-dom';
import styled from 'styled-components';
import Logo from './components/Logo';
import { GlobalStyles } from './styles/GlobalStyles';
import Dashboard from './components/Dashboard';
import Comfort from './pages/Comfort';
import Security from './pages/Security';
import Energy from './pages/Energy';
import Entertainment from './pages/Entertainment';
import AirConditioner from './components/devices/AirConditioner';
import AirPurifier from './components/devices/AirPurifier';
import Television from './components/devices/Television';
import MusicSystem from './components/devices/MusicSystem';
import Camera from './components/devices/Camera';
import BottomNavigation from './components/BottomNavigation';

const AppContainer = styled.div`
  min-height: 100vh;
  background: var(--bg-color-dark);
  padding: 1.5rem 1.5rem 5rem;
  position: relative;
  overflow-x: hidden;

  &::before {
    content: '';
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: radial-gradient(
      circle at 50% 0%,
      var(--bg-color-lighter) 0%,
      var(--bg-color-dark) 100%
    );
    z-index: 0;
    pointer-events: none;
  }

  @media (max-width: 768px) {
    padding: 1rem 1rem 5rem;
  }
`;

const ContentWrapper = styled.div`
  position: relative;
  z-index: 1;
  max-width: 1400px;
  margin: 0 auto;
`;

const LogoContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 2rem;
  padding: 0 1rem;

  @media (max-width: 768px) {
    margin-bottom: 1.5rem;
  }
`;

const App: React.FC = () => {
  return (
    <AppContainer>
      <GlobalStyles />
      <ContentWrapper>
        <LogoContainer>
          <Logo />
        </LogoContainer>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/comfort" element={<Comfort />} />
          <Route path="/security" element={<Security />} />
          <Route path="/energy" element={<Energy />} />
          <Route path="/entertainment" element={<Entertainment />} />
          <Route path="/device/ac" element={<AirConditioner />} />
          <Route path="/device/purifier" element={<AirPurifier />} />
          <Route path="/device/tv" element={<Television />} />
          <Route path="/device/music" element={<MusicSystem />} />
          <Route path="/device/camera" element={<Camera />} />
        </Routes>
      </ContentWrapper>
      <BottomNavigation />
    </AppContainer>
  );
};

export default App; 