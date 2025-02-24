import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowBack, Power } from '@mui/icons-material';

interface DeviceControlProps {
  title: string;
  icon: React.ReactNode;
  image: string;
  controls: React.ReactNode;
  stats: React.ReactNode;
  isActive?: boolean;
  onToggle?: () => void;
}

const Container = styled.div`
  min-height: 100vh;
  background: var(--bg-dark);
  padding: 1rem;
  
  @media (min-width: 768px) {
    padding: 2rem;
  }
`;

const Card = styled(motion.div)`
  max-width: 480px;
  margin: 0 auto;
  background: var(--bg-color-dark);
  border-radius: var(--radius-lg);
  padding: 1.5rem;
  position: relative;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.2),
              -5px -5px 10px rgba(255, 255, 255, 0.05);
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg,
      rgba(255, 59, 48, 0.05) 0%,
      rgba(255, 59, 48, 0) 100%
    );
    z-index: 0;
  }

  @media (max-width: 480px) {
    padding: 1.25rem;
  }
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;
  position: relative;
  z-index: 1;

  .back-button {
    width: 40px;
    height: 40px;
    border: none;
    border-radius: 50%;
    background: var(--bg-color-dark);
    color: var(--text-color);
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 3px 3px 6px rgba(0, 0, 0, 0.2),
                -3px -3px 6px rgba(255, 255, 255, 0.05);
    transition: all 0.3s ease;

    &:hover {
      transform: translateY(-2px);
      box-shadow: 4px 4px 8px rgba(0, 0, 0, 0.25),
                  -4px -4px 8px rgba(255, 255, 255, 0.06);
    }

    &:active {
      transform: translateY(0);
      box-shadow: inset 2px 2px 4px rgba(0, 0, 0, 0.2),
                  inset -2px -2px 4px rgba(255, 255, 255, 0.05);
    }
  }

  h1 {
    margin: 0;
    font-size: 1.5rem;
    color: var(--text-color);
    display: flex;
    align-items: center;
    gap: 0.75rem;

    svg {
      color: var(--primary-red);
    }
  }
`;

const PowerButton = styled(motion.button)<{ $isOn: boolean }>`
  position: absolute;
  top: 1.5rem;
  right: 1.5rem;
  width: 48px;
  height: 48px;
  border: none;
  border-radius: 50%;
  background: ${props => props.$isOn ? 'var(--primary-gradient)' : 'var(--bg-color-dark)'};
  color: ${props => props.$isOn ? 'white' : 'var(--text-color-muted)'};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: ${props => props.$isOn ?
    '0 4px 8px rgba(255, 59, 48, 0.3)' :
    '3px 3px 6px rgba(0, 0, 0, 0.2), -3px -3px 6px rgba(255, 255, 255, 0.05)'};
  z-index: 2;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${props => props.$isOn ?
      '0 6px 12px rgba(255, 59, 48, 0.4)' :
      '4px 4px 8px rgba(0, 0, 0, 0.25), -4px -4px 8px rgba(255, 255, 255, 0.06)'};
  }

  @media (max-width: 480px) {
    top: 1.25rem;
    right: 1.25rem;
  }
`;

const DeviceImage = styled.div`
  width: 100%;
  height: 200px;
  margin: 1.5rem 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--bg-color-dark);
  border-radius: var(--radius-lg);
  box-shadow: inset 3px 3px 6px rgba(0, 0, 0, 0.2),
              inset -3px -3px 6px rgba(255, 255, 255, 0.05);
  position: relative;
  z-index: 1;
  
  img {
    max-width: 80%;
    max-height: 80%;
    object-fit: contain;
    filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.2));
  }

  @media (max-width: 480px) {
    height: 160px;
  }
`;

const ControlsSection = styled.div`
  margin: 2rem 0;
  position: relative;
  z-index: 1;
`;

const StatsSection = styled.div`
  background: var(--bg-color-dark);
  border-radius: var(--radius-lg);
  padding: 1.25rem;
  margin-top: 2rem;
  box-shadow: inset 3px 3px 6px rgba(0, 0, 0, 0.2),
              inset -3px -3px 6px rgba(255, 255, 255, 0.05);
  position: relative;
  z-index: 1;
`;

const DeviceControl: React.FC<DeviceControlProps> = ({
  title,
  icon,
  image,
  controls,
  stats,
  isActive = false,
  onToggle
}) => {
  const navigate = useNavigate();

  return (
    <Container>
      <Card
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Header>
          <motion.button
            className="back-button"
            onClick={() => navigate('/')}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ArrowBack />
          </motion.button>
          <h1>
            {icon}
            {title}
          </h1>
        </Header>

        <PowerButton
          $isOn={isActive}
          onClick={onToggle}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Power />
        </PowerButton>

        <DeviceImage>
          <img src={image} alt={title} />
        </DeviceImage>

        <ControlsSection>
          {controls}
        </ControlsSection>

        <StatsSection>
          {stats}
        </StatsSection>
      </Card>
    </Container>
  );
};

export default DeviceControl; 