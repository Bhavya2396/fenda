import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { ArrowBack, Power } from '@mui/icons-material';

interface DeviceState {
  deviceId: string;
  roomId: string;
  isActive: boolean;
  settings: Record<string, any>;
}

// Interface for props that all device control components must implement
interface DeviceControlProps {
  isActive: boolean;
  settings: Record<string, any>;
  onSettingsChange: (settings: Record<string, any>) => void;
}

interface DeviceControllerProps {
  children: React.ReactElement<DeviceControlProps>;
  title: string;
  onStateChange?: (state: DeviceState) => void;
}

const Container = styled.div`
  max-width: 480px;
  margin: 0 auto;
  padding: 1.5rem;
  min-height: 100vh;
  background: var(--bg-color);
  position: relative;

  @media (max-width: 480px) {
    padding: 1rem;
  }
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;

  button {
    width: 40px;
    height: 40px;
    border: none;
    border-radius: 50%;
    background: var(--bg-secondary);
    color: var(--text-primary);
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;

    &:hover {
      background: var(--bg-hover);
      transform: translateY(-2px);
    }
  }

  h1 {
    margin: 0;
    font-size: 1.5rem;
    color: var(--text-primary);
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
  background: ${props => props.$isOn ? 'var(--accent-gradient)' : 'var(--bg-secondary)'};
  color: ${props => props.$isOn ? 'white' : 'var(--text-secondary)'};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
  }

  @media (max-width: 480px) {
    top: 1rem;
    right: 1rem;
  }
`;

const DeviceController: React.FC<DeviceControllerProps> = ({ 
  children, 
  title,
  onStateChange 
}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [deviceState, setDeviceState] = useState<DeviceState>(() => {
    const savedState = localStorage.getItem(`device_${location.state?.deviceId}`);
    if (savedState) {
      return JSON.parse(savedState);
    }
    return {
      deviceId: location.state?.deviceId || '',
      roomId: location.state?.roomId || '',
      isActive: location.state?.isActive || false,
      settings: {}
    };
  });

  useEffect(() => {
    if (deviceState.deviceId) {
      localStorage.setItem(
        `device_${deviceState.deviceId}`, 
        JSON.stringify(deviceState)
      );
      onStateChange?.(deviceState);
    }
  }, [deviceState, onStateChange]);

  const handlePowerToggle = () => {
    setDeviceState(prev => ({
      ...prev,
      isActive: !prev.isActive
    }));
  };

  const updateSettings = (settings: Record<string, any>) => {
    setDeviceState(prev => ({
      ...prev,
      settings: {
        ...prev.settings,
        ...settings
      }
    }));
  };

  return (
    <Container>
      <Header>
        <motion.button
          onClick={() => navigate('/')}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <ArrowBack />
        </motion.button>
        <h1>{title}</h1>
      </Header>

      <PowerButton
        $isOn={deviceState.isActive}
        onClick={handlePowerToggle}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <Power />
      </PowerButton>

      {React.Children.map(children, child => {
        if (React.isValidElement<DeviceControlProps>(child)) {
          return React.cloneElement(child, {
            isActive: deviceState.isActive,
            settings: deviceState.settings,
            onSettingsChange: updateSettings
          });
        }
        return child;
      })}
    </Container>
  );
};

export default DeviceController; 