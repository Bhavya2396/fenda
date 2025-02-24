import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { 
  Air, Speed, Opacity, 
  TrendingUp, Warning
} from '@mui/icons-material';
import DeviceControl from '../DeviceControl';

interface AQIMeterProps {
  value: number;
  color: string;
}

const AQIMeter = styled(motion.div)<AQIMeterProps>`
  width: 200px;
  height: 200px;
  margin: 0 auto;
  border-radius: 50%;
  position: relative;
  background: var(--bg-color-dark);
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.2),
              -5px -5px 10px rgba(255, 255, 255, 0.05);

  &::before {
    content: '';
    position: absolute;
    inset: 10px;
    border-radius: 50%;
    background: var(--bg-color-dark);
    box-shadow: inset 3px 3px 6px rgba(0, 0, 0, 0.2),
                inset -3px -3px 6px rgba(255, 255, 255, 0.05);
  }

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: 50%;
    background: ${props => `conic-gradient(
      ${props.color} ${props.value * (360 / 200)}deg,
      transparent ${props.value * (360 / 200)}deg
    )`};
    opacity: 0.2;
  }
`;

const AQIDisplay = styled.div`
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  z-index: 1;

  .value {
    font-size: 3rem;
    font-weight: 600;
    color: var(--text-color);
    line-height: 1;
    margin-bottom: 0.5rem;
  }

  .label {
    font-size: 0.875rem;
    color: var(--text-secondary);
    margin-bottom: 0.25rem;
  }

  .status {
    font-size: 1rem;
    font-weight: 500;
  }
`;

const SpeedControl = styled.div`
  margin-top: 2rem;
`;

const SpeedButtons = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;

  @media (max-width: 480px) {
    gap: 0.75rem;
  }
`;

const SpeedButton = styled(motion.button)<{ $active: boolean }>`
  padding: 1rem;
  border: none;
  border-radius: var(--radius-lg);
  background: var(--bg-color-dark);
  color: ${props => props.$active ? 'var(--primary-red)' : 'var(--text-color-muted)'};
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  box-shadow: ${props => props.$active ?
    'inset 3px 3px 6px rgba(0, 0, 0, 0.2), inset -3px -3px 6px rgba(255, 255, 255, 0.05)' :
    '5px 5px 10px rgba(0, 0, 0, 0.2), -5px -5px 10px rgba(255, 255, 255, 0.05)'};
  transition: all 0.3s ease;

  svg {
    font-size: 1.5rem;
  }

  span {
    font-size: 0.875rem;
    font-weight: 500;
  }

  &:hover {
    color: var(--primary-red);
    transform: translateY(-2px);
  }

  @media (max-width: 480px) {
    padding: 0.75rem;
  }
`;

const Stats = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;

  .stat-item {
    text-align: center;

    .value {
      font-size: 1.25rem;
      font-weight: 500;
      color: var(--text-color);
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      margin-bottom: 0.25rem;

      svg {
        color: var(--primary-red);
      }
    }

    .label {
      font-size: 0.875rem;
      color: var(--text-secondary);
    }
  }
`;

const AirPurifier: React.FC = () => {
  const [isActive, setIsActive] = useState(false);
  const [speed, setSpeed] = useState<'low' | 'medium' | 'high'>('medium');
  const [aqi, setAqi] = useState(45);

  const getAQIStatus = (value: number) => {
    if (value <= 50) return { text: 'Good', color: '#4CAF50' };
    if (value <= 100) return { text: 'Moderate', color: '#FFC107' };
    if (value <= 150) return { text: 'Unhealthy', color: '#FF9800' };
    return { text: 'Hazardous', color: '#F44336' };
  };

  const status = getAQIStatus(aqi);

  const controls = (
    <>
      <AQIMeter
        value={aqi}
        color={status.color}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <AQIDisplay>
          <motion.div
            className="value"
            key={aqi}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            {aqi}
          </motion.div>
          <div className="label">Air Quality Index</div>
          <motion.div 
            className="status"
            style={{ color: status.color }}
          >
            {status.text}
          </motion.div>
        </AQIDisplay>
      </AQIMeter>

      <SpeedControl>
        <SpeedButtons>
          <SpeedButton
            $active={speed === 'low'}
            onClick={() => setSpeed('low')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Air />
            <span>Low</span>
          </SpeedButton>
          <SpeedButton
            $active={speed === 'medium'}
            onClick={() => setSpeed('medium')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Speed />
            <span>Medium</span>
          </SpeedButton>
          <SpeedButton
            $active={speed === 'high'}
            onClick={() => setSpeed('high')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Speed />
            <span>High</span>
          </SpeedButton>
        </SpeedButtons>
      </SpeedControl>
    </>
  );

  const stats = (
    <Stats>
      <div className="stat-item">
        <div className="value">
          <Opacity />
          85%
        </div>
        <div className="label">Filter Health</div>
      </div>
      <div className="stat-item">
        <div className="value">
          <TrendingUp />
          0.3 kW/h
        </div>
        <div className="label">Power Usage</div>
      </div>
    </Stats>
  );

  return (
    <DeviceControl
      title="Air Purifier"
      icon={<Air />}
      image="/49364-1-air-purifier-download-hd-png.webp"
      controls={controls}
      stats={stats}
      isActive={isActive}
      onToggle={() => setIsActive(!isActive)}
    />
  );
};

export default AirPurifier; 