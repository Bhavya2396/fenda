import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { 
  AcUnit, WbSunny, Air, 
  TrendingUp, DeviceThermostat,
  Add, Remove
} from '@mui/icons-material';
import DeviceControl from '../DeviceControl';

const TemperatureControl = styled.div`
  text-align: center;
  margin: 2rem 0;

  .temp-display {
    width: 200px;
    height: 200px;
    margin: 0 auto;
    background: var(--bg-color-dark);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.2),
                -5px -5px 10px rgba(255, 255, 255, 0.05);
    position: relative;

    &::before {
      content: '';
      position: absolute;
      inset: 10px;
      border-radius: 50%;
      background: var(--bg-color-dark);
      box-shadow: inset 3px 3px 6px rgba(0, 0, 0, 0.2),
                  inset -3px -3px 6px rgba(255, 255, 255, 0.05);
    }

    .value {
      position: relative;
      font-size: 4rem;
      font-weight: 600;
      color: var(--primary-red);
      display: flex;
      align-items: center;

      .unit {
        font-size: 1.5rem;
        color: var(--text-secondary);
        margin-left: 0.5rem;
      }
    }
  }

  .temp-controls {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 2rem;
    margin-top: 2rem;

    button {
      width: 48px;
      height: 48px;
      border: none;
      border-radius: 50%;
      background: var(--bg-color-dark);
      color: var(--text-color);
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.2),
                  -5px -5px 10px rgba(255, 255, 255, 0.05);
      transition: all 0.3s ease;

      &:hover {
        color: var(--primary-red);
        transform: translateY(-2px);
        box-shadow: 6px 6px 12px rgba(0, 0, 0, 0.25),
                    -6px -6px 12px rgba(255, 255, 255, 0.06);
      }

      &:active {
        transform: translateY(0);
        box-shadow: inset 3px 3px 6px rgba(0, 0, 0, 0.2),
                    inset -3px -3px 6px rgba(255, 255, 255, 0.05);
      }

      svg {
        font-size: 1.5rem;
      }
    }
  }
`;

const ModeSelector = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  margin-top: 2rem;

  @media (max-width: 480px) {
    gap: 0.75rem;
  }
`;

const ModeButton = styled(motion.button)<{ $active: boolean }>`
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

const AirConditioner: React.FC = () => {
  const [isActive, setIsActive] = useState(false);
  const [temperature, setTemperature] = useState(24);
  const [mode, setMode] = useState<'cool' | 'heat' | 'auto'>('cool');

  const handleTemperature = (increase: boolean) => {
    setTemperature(prev => {
      const newTemp = increase ? prev + 1 : prev - 1;
      return Math.min(Math.max(newTemp, 16), 30);
    });
  };

  const controls = (
    <>
      <TemperatureControl>
        <div className="temp-display">
          <div className="value">
            {temperature}<span className="unit">°C</span>
          </div>
        </div>
        <div className="temp-controls">
          <motion.button
            onClick={() => handleTemperature(false)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Remove />
          </motion.button>
          <motion.button
            onClick={() => handleTemperature(true)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Add />
          </motion.button>
        </div>
      </TemperatureControl>

      <ModeSelector>
        <ModeButton
          $active={mode === 'cool'}
          onClick={() => setMode('cool')}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <AcUnit />
          <span>Cool</span>
        </ModeButton>
        <ModeButton
          $active={mode === 'heat'}
          onClick={() => setMode('heat')}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <WbSunny />
          <span>Heat</span>
        </ModeButton>
        <ModeButton
          $active={mode === 'auto'}
          onClick={() => setMode('auto')}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Air />
          <span>Auto</span>
        </ModeButton>
      </ModeSelector>
    </>
  );

  const stats = (
    <Stats>
      <div className="stat-item">
        <div className="value">
          <DeviceThermostat />
          22°C
        </div>
        <div className="label">Room Temperature</div>
      </div>
      <div className="stat-item">
        <div className="value">
          <TrendingUp />
          0.8 kW/h
        </div>
        <div className="label">Power Usage</div>
      </div>
    </Stats>
  );

  return (
    <DeviceControl
      title="Air Conditioner"
      icon={<AcUnit />}
      image="/pngimg.com - air_conditioner_PNG73.png"
      controls={controls}
      stats={stats}
      isActive={isActive}
      onToggle={() => setIsActive(!isActive)}
    />
  );
};

export default AirConditioner; 