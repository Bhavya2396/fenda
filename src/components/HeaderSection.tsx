import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { 
  WbSunny, 
  DeviceThermostat, 
  Air, 
  Router,
  Videocam,
  LightbulbOutlined,
  Cloud
} from '@mui/icons-material';

const HeaderContainer = styled(motion.div)`
  background: var(--bg-color-dark);
  border-radius: var(--radius-lg);
  padding: 1rem;
  margin-bottom: 1rem;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.2),
              -5px -5px 10px rgba(255, 255, 255, 0.05);
  max-width: 100%;
  overflow: hidden;

  @media (min-width: 768px) {
    padding: 1.25rem;
  }
`;

const TopSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const GreetingSection = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  border-radius: var(--radius-md);

  .weather-icon {
    width: 48px;
    height: 48px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: var(--radius-sm);
    background: var(--bg-color-dark);
    box-shadow: 3px 3px 6px rgba(0, 0, 0, 0.2),
                -3px -3px 6px rgba(255, 255, 255, 0.05);
    color: var(--primary-red);

    svg {
      font-size: 24px;
    }
  }

  .content {
    flex: 1;
    
    h1 {
      font-size: 1.25rem;
      font-weight: 600;
      color: rgba(255, 255, 255, 0.95);
      margin-bottom: 0.25rem;
      display: flex;
      align-items: center;
      gap: 0.5rem;

      .notification-dot {
        width: 4px;
        height: 4px;
        border-radius: 50%;
        background: var(--primary-red);
      }
    }

    .weather-info {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      color: rgba(255, 255, 255, 0.6);
      font-size: 0.875rem;

      .weather-item {
        display: flex;
        align-items: center;
        gap: 0.25rem;
        padding: 0.25rem 0.5rem;
        border-radius: var(--radius-sm);
        background: var(--bg-color-dark);
        box-shadow: inset 2px 2px 5px rgba(0, 0, 0, 0.2),
                    inset -2px -2px 5px rgba(255, 255, 255, 0.05);

        svg {
          font-size: 16px;
          color: var(--primary-red-soft);
        }

        .value {
          color: rgba(255, 255, 255, 0.95);
          font-weight: 500;
          font-size: 0.875rem;
        }

        .unit {
          color: rgba(255, 255, 255, 0.6);
          font-size: 0.75rem;
        }
      }
    }
  }
`;

const StatusGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  margin-top: 1.5rem;

  @media (max-width: 480px) {
    gap: 0.75rem;
  }
`;

const StatusItem = styled(motion.div)<{ $active?: boolean }>`
  background: var(--glass-bg);
  border: var(--glass-border);
  border-radius: var(--radius-lg);
  padding: 1rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  cursor: ${props => props.$active !== undefined ? 'pointer' : 'default'};
  transition: all var(--transition-normal);

  &:hover {
    transform: ${props => props.$active !== undefined ? 'translateY(-2px)' : 'none'};
  }

  &:active {
    transform: ${props => props.$active !== undefined ? 'translateY(0)' : 'none'};
  }

  .icon {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: ${props => props.$active ? 'var(--primary-gradient)' : 'var(--overlay-light)'};
    display: flex;
    align-items: center;
    justify-content: center;
    color: ${props => props.$active ? 'white' : 'var(--text-color-muted)'};
    transition: all var(--transition-normal);
  }

  .text {
    flex: 1;

    .value {
      font-weight: 500;
      color: ${props => props.$active ? 'var(--primary-red)' : 'var(--text-color)'};
      transition: color var(--transition-normal);
    }

    .label {
      font-size: 0.75rem;
      color: var(--text-color-muted);
    }
  }
`;

const HeaderSection: React.FC = () => {
  const [greeting, setGreeting] = useState('');
  const [lightsOn, setLightsOn] = useState(false);

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Good Morning');
    else if (hour < 18) setGreeting('Good Afternoon');
    else setGreeting('Good Evening');
  }, []);

  return (
    <HeaderContainer
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
    >
      <TopSection>
        <GreetingSection>
          <motion.div 
            className="weather-icon"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <WbSunny />
          </motion.div>
          <div className="content">
            <motion.h1
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1, duration: 0.2 }}
            >
              {greeting}! <span className="notification-dot" />
            </motion.h1>
            <motion.div
              className="weather-info"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.2 }}
            >
              <div className="weather-item">
                <DeviceThermostat />
                <span className="value">24</span>
                <span className="unit">°C</span>
              </div>
              <div className="weather-item">
                <Air />
                <span className="value">12</span>
                <span className="unit">km/h</span>
              </div>
              <div className="weather-item">
                <Cloud />
                <span className="value">Clear</span>
              </div>
            </motion.div>
          </div>
        </GreetingSection>

        <StatusGrid>
          <StatusItem
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.2 }}
          >
            <div className="icon"><Air /></div>
            <div className="text">
              <div className="value">45 AQI</div>
              <div className="label">Good</div>
            </div>
          </StatusItem>

          <StatusItem
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.2 }}
          >
            <div className="icon"><Router /></div>
            <div className="text">
              <div className="value">12</div>
              <div className="label">Connected</div>
            </div>
          </StatusItem>

          <StatusItem 
            $active={true}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.2 }}
          >
            <div className="icon"><Videocam /></div>
            <div className="text">
              <div className="value">CCTV</div>
              <div className="label">Recording</div>
            </div>
          </StatusItem>

          <StatusItem 
            $active={lightsOn}
            onClick={() => setLightsOn(!lightsOn)}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.2 }}
          >
            <div className="icon"><LightbulbOutlined /></div>
            <div className="text">
              <div className="value">Lights</div>
              <div className="label">{lightsOn ? 'On' : 'Off'}</div>
            </div>
          </StatusItem>
        </StatusGrid>
      </TopSection>
    </HeaderContainer>
  );
};

export default HeaderSection; 