import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

interface DeviceCardProps {
  device: {
    id: string;
    name: string;
    type: string;
    icon: React.ReactNode;
    status: string;
    active: boolean;
    path: string;
    image: string;
    room: string;
  };
  onToggle: (id: string) => void;
}

const Card = styled(motion.div)`
  background: var(--card-bg);
  border-radius: var(--border-radius-lg);
  padding: 1.5rem;
  position: relative;
  cursor: pointer;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-lg);
  }

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg,
      rgba(255, 255, 255, 0.1) 0%,
      rgba(255, 255, 255, 0.05) 100%
    );
    z-index: 0;
  }
`;

const DeviceHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 1;
`;

const DeviceIcon = styled.div<{ active: boolean }>`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: ${props => props.active ? 'var(--accent-gradient)' : 'var(--bg-secondary)'};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${props => props.active ? 'white' : 'var(--text-secondary)'};
  transition: all 0.3s ease;
`;

const DeviceInfo = styled.div`
  z-index: 1;
`;

const DeviceName = styled.h3`
  margin: 0;
  font-size: 1rem;
  color: var(--text-primary);
`;

const DeviceStatus = styled.p<{ active: boolean }>`
  margin: 0.25rem 0 0;
  font-size: 0.875rem;
  color: ${props => props.active ? 'var(--accent-color)' : 'var(--text-secondary)'};
`;

const DeviceLocation = styled.p`
  margin: 0.25rem 0 0;
  font-size: 0.75rem;
  color: var(--text-muted);
`;

const DeviceImage = styled.img`
  width: 100%;
  height: 120px;
  object-fit: contain;
  margin-top: auto;
  opacity: 0.8;
  transition: all 0.3s ease;
  z-index: 1;
`;

const DeviceCard: React.FC<DeviceCardProps> = ({ device, onToggle }) => {
  const navigate = useNavigate();

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate(device.path);
  };

  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggle(device.id);
  };

  return (
    <Card
      onClick={handleClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.2 }}
    >
      <DeviceHeader>
        <DeviceIcon 
          active={device.active}
          onClick={handleToggle}
        >
          {device.icon}
        </DeviceIcon>
      </DeviceHeader>
      <DeviceInfo>
        <DeviceName>{device.name}</DeviceName>
        <DeviceStatus active={device.active}>
          {device.active ? 'On' : 'Off'}
        </DeviceStatus>
        <DeviceLocation>{device.room}</DeviceLocation>
      </DeviceInfo>
      <DeviceImage 
        src={device.image} 
        alt={device.name}
        style={{ opacity: device.active ? 1 : 0.6 }}
      />
    </Card>
  );
};

export default React.memo(DeviceCard); 