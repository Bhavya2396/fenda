import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  WbSunny, 
  DeviceThermostat, 
  Air, 
  Router,
  Videocam,
  LightbulbOutlined,
  Cloud,
  Notifications,
  NotificationsActive,
  ArrowForward
} from '@mui/icons-material';

const HeaderContainer = styled(motion.div)`
  background: var(--glass-bg);
  border: var(--glass-border);
  border-radius: var(--radius-lg);
  padding: 1.25rem;
  margin-bottom: 1.5rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(10px);
  max-width: 100%;
  overflow: hidden;
  position: relative;

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

  @media (min-width: 768px) {
    padding: 1.5rem;
  }
`;

const TopSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  position: relative;
  z-index: 1;
`;

const GreetingSection = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  border-radius: var(--radius-md);

  .weather-icon {
    width: 52px;
    height: 52px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: var(--radius-sm);
    background: var(--glass-bg);
    border: var(--glass-border);
    backdrop-filter: blur(8px);
    color: var(--primary-red);
    flex-shrink: 0;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);

    svg {
      font-size: 28px;
      filter: drop-shadow(0 2px 4px rgba(255, 59, 48, 0.2));
    }
  }

  .content {
    flex: 1;
    min-width: 0;
    
    h1 {
      font-size: 1.5rem;
      font-weight: 600;
      color: rgba(255, 255, 255, 0.95);
      margin-bottom: 0.75rem;
      display: flex;
      align-items: center;
      gap: 0.75rem;
      text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);

      .notification-dot {
        width: 6px;
        height: 6px;
        border-radius: 50%;
        background: var(--primary-red);
        box-shadow: 0 0 8px var(--primary-red);
      }
    }

    .weather-info {
      display: flex;
      align-items: center;
      gap: 1rem;
      color: rgba(255, 255, 255, 0.6);
      font-size: 0.875rem;
      overflow-x: auto;
      padding-bottom: 4px;
      scrollbar-width: none;
      -ms-overflow-style: none;
      
      &::-webkit-scrollbar {
        display: none;
      }

      .weather-item {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        padding: 0.625rem 1rem;
        border-radius: var(--radius-sm);
        background: var(--glass-bg);
        border: var(--glass-border);
        backdrop-filter: blur(8px);
        flex-shrink: 0;
        cursor: pointer;
        transition: all 0.3s ease;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);

        svg {
          font-size: 18px;
          color: var(--primary-red-soft);
          filter: drop-shadow(0 2px 4px rgba(255, 59, 48, 0.2));
        }

        .value {
          color: rgba(255, 255, 255, 0.95);
          font-weight: 500;
          font-size: 0.9375rem;
          text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
        }

        .unit {
          color: rgba(255, 255, 255, 0.6);
          font-size: 0.8125rem;
        }

        &:hover {
          transform: translateY(-2px);
          background: var(--glass-bg-hover);
          box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15);
        }
      }
    }
  }

  @media (max-width: 480px) {
    .weather-icon {
      width: 44px;
      height: 44px;

      svg {
        font-size: 24px;
      }
    }

    .content h1 {
      font-size: 1.25rem;
    }
  }
`;

const StatusGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.25rem;
  margin-top: 1.5rem;
  padding: 0.5rem;

  @media (min-width: 768px) {
    grid-template-columns: repeat(4, 1fr);
    gap: 1rem;
    margin-top: 1rem;
  }

  @media (max-width: 480px) {
    gap: 1rem;
    margin-top: 1rem;
    padding: 0;
  }
`;

const StatusItem = styled(motion.div)<{ $active?: boolean }>`
  background: var(--glass-bg);
  border: var(--glass-border);
  border-radius: var(--radius-lg);
  padding: 1.25rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  cursor: ${props => props.$active !== undefined ? 'pointer' : 'default'};
  transition: all var(--transition-normal);
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  position: relative;
  overflow: hidden;

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

  &:hover {
    transform: ${props => props.$active !== undefined ? 'translateY(-3px)' : 'none'};
    box-shadow: ${props => props.$active !== undefined ? '0 6px 16px rgba(0, 0, 0, 0.15)' : '0 4px 12px rgba(0, 0, 0, 0.1)'};
    background: var(--glass-bg-hover);
  }

  &:active {
    transform: ${props => props.$active !== undefined ? 'translateY(-1px)' : 'none'};
  }

  .icon {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    background: ${props => props.$active ? 'var(--primary-gradient)' : 'var(--overlay-light)'};
    display: flex;
    align-items: center;
    justify-content: center;
    color: ${props => props.$active ? 'white' : 'var(--text-color-muted)'};
    transition: all var(--transition-normal);
    font-size: 1.5rem;
    box-shadow: ${props => props.$active ? '0 4px 12px rgba(255, 59, 48, 0.3)' : '0 4px 12px rgba(0, 0, 0, 0.1)'};
    position: relative;
    z-index: 1;

    svg {
      filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2));
    }

    @media (max-width: 480px) {
      width: 40px;
      height: 40px;
      font-size: 1.25rem;
    }
  }

  .text {
    flex: 1;
    min-width: 0;
    position: relative;
    z-index: 1;

    .value {
      font-size: 1.125rem;
      font-weight: 600;
      color: ${props => props.$active ? 'var(--primary-red)' : 'var(--text-color)'};
      transition: color var(--transition-normal);
      margin-bottom: 0.25rem;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
    }

    .label {
      font-size: 0.8125rem;
      color: var(--text-color-muted);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;

      @media (max-width: 480px) {
        font-size: 0.75rem;
      }
    }
  }

  @media (max-width: 480px) {
    padding: 1rem;
    gap: 0.875rem;
  }

  @media (min-width: 768px) {
    flex-direction: column;
    text-align: center;
    padding: 1.5rem;
    gap: 1rem;

    .icon {
      width: 52px;
      height: 52px;
      font-size: 1.625rem;
    }

    .text {
      .value {
        font-size: 1.25rem;
      }

      .label {
        font-size: 0.875rem;
      }
    }
  }
`;

const NotificationBadge = styled(motion.div)`
  position: relative;
  cursor: pointer;

  .badge {
    position: absolute;
    top: -6px;
    right: -6px;
    background: var(--primary-red);
    color: white;
    font-size: 0.75rem;
    font-weight: 600;
    padding: 2px 6px;
    border-radius: 10px;
    z-index: 1;
  }
`;

const NotificationPopup = styled(motion.div)`
  position: absolute;
  top: calc(100% + 1rem);
  right: 0;
  width: 300px;
  background: var(--bg-color-dark);
  border-radius: var(--radius-lg);
  padding: 1rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  z-index: 10;

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
    padding-bottom: 0.5rem;
    border-bottom: 1px solid var(--border-color);

    h3 {
      font-size: 1rem;
      font-weight: 500;
      margin: 0;
    }
  }

  .notification-list {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }
`;

const NotificationItem = styled(motion.div)`
  display: flex;
  gap: 0.75rem;
  padding: 0.75rem;
  background: var(--bg-color);
  border-radius: var(--radius-md);
  cursor: pointer;

  .icon {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background: var(--primary-gradient);
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
  }

  .content {
    flex: 1;

    .title {
      font-size: 0.875rem;
      font-weight: 500;
      margin-bottom: 0.25rem;
    }

    .time {
      font-size: 0.75rem;
      color: var(--text-secondary);
    }
  }

  &:hover {
    background: var(--bg-color-lighter);
  }
`;

const Tooltip = styled(motion.div)`
  position: absolute;
  bottom: calc(100% + 8px);
  left: 50%;
  transform: translateX(-50%);
  padding: 0.5rem 0.75rem;
  background: var(--bg-color-dark);
  border-radius: var(--radius-md);
  font-size: 0.75rem;
  color: var(--text-color);
  white-space: nowrap;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  pointer-events: none;

  &::after {
    content: '';
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    border: 6px solid transparent;
    border-top-color: var(--bg-color-dark);
  }
`;

const HeaderSection: React.FC = () => {
  const [greeting, setGreeting] = useState('');
  const [lightsOn, setLightsOn] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [notificationCount, setNotificationCount] = useState(3);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [weatherDetails, setWeatherDetails] = useState({
    temperature: 24,
    windSpeed: 12,
    condition: 'Clear',
    humidity: 65
  });

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Good Morning');
    else if (hour < 18) setGreeting('Good Afternoon');
    else setGreeting('Good Evening');
  }, []);

  const notifications = [
    { id: 1, title: 'Motion detected in Living Room', time: '2 min ago', icon: <Videocam /> },
    { id: 2, title: 'Air quality improved to Good', time: '15 min ago', icon: <Air /> },
    { id: 3, title: 'New device connected', time: '1 hour ago', icon: <Router /> }
  ];

  const handleNotificationClick = (id: number) => {
    setNotificationCount(prev => Math.max(0, prev - 1));
  };

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
              {greeting}!
              <NotificationBadge onClick={() => setShowNotifications(!showNotifications)}>
                {notificationCount > 0 && (
                  <motion.div 
                    className="badge"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                  >
                    {notificationCount}
                  </motion.div>
                )}
                {showNotifications ? <NotificationsActive /> : <Notifications />}
                <AnimatePresence>
                  {showNotifications && (
                    <NotificationPopup
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                    >
                      <div className="header">
                        <h3>Notifications</h3>
                        <ArrowForward />
                      </div>
                      <div className="notification-list">
                        {notifications.map(notification => (
                          <NotificationItem
                            key={notification.id}
                            onClick={() => handleNotificationClick(notification.id)}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <div className="icon">{notification.icon}</div>
                            <div className="content">
                              <div className="title">{notification.title}</div>
                              <div className="time">{notification.time}</div>
                            </div>
                          </NotificationItem>
                        ))}
                      </div>
                    </NotificationPopup>
                  )}
                </AnimatePresence>
              </NotificationBadge>
            </motion.h1>
            <motion.div
              className="weather-info"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.2 }}
            >
              <motion.div
                className="weather-item"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onHoverStart={() => setHoveredItem('temp')}
                onHoverEnd={() => setHoveredItem(null)}
              >
                <DeviceThermostat />
                <span className="value">{weatherDetails.temperature}</span>
                <span className="unit">°C</span>
                {hoveredItem === 'temp' && (
                  <Tooltip
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 5 }}
                  >
                    Current Temperature
                  </Tooltip>
                )}
              </motion.div>
              <motion.div
                className="weather-item"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onHoverStart={() => setHoveredItem('wind')}
                onHoverEnd={() => setHoveredItem(null)}
              >
                <Air />
                <span className="value">{weatherDetails.windSpeed}</span>
                <span className="unit">km/h</span>
                {hoveredItem === 'wind' && (
                  <Tooltip
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 5 }}
                  >
                    Wind Speed
                  </Tooltip>
                )}
              </motion.div>
              <motion.div
                className="weather-item"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onHoverStart={() => setHoveredItem('condition')}
                onHoverEnd={() => setHoveredItem(null)}
              >
                <Cloud />
                <span className="value">{weatherDetails.condition}</span>
                {hoveredItem === 'condition' && (
                  <Tooltip
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 5 }}
                  >
                    Weather Condition
                  </Tooltip>
                )}
              </motion.div>
            </motion.div>
          </div>
        </GreetingSection>

        <StatusGrid>
          <StatusItem
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.2 }}
            whileHover={{ scale: 1.02 }}
            onHoverStart={() => setHoveredItem('aqi')}
            onHoverEnd={() => setHoveredItem(null)}
          >
            <div className="icon"><Air /></div>
            <div className="text">
              <div className="value">45 AQI</div>
              <div className="label">Good</div>
            </div>
            {hoveredItem === 'aqi' && (
              <Tooltip
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 5 }}
              >
                Air Quality Index - Good Range
              </Tooltip>
            )}
          </StatusItem>

          <StatusItem
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.2 }}
            whileHover={{ scale: 1.02 }}
            onHoverStart={() => setHoveredItem('devices')}
            onHoverEnd={() => setHoveredItem(null)}
          >
            <div className="icon"><Router /></div>
            <div className="text">
              <div className="value">12</div>
              <div className="label">Connected</div>
            </div>
            {hoveredItem === 'devices' && (
              <Tooltip
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 5 }}
              >
                Connected Smart Devices
              </Tooltip>
            )}
          </StatusItem>

          <StatusItem 
            $active={true}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.2 }}
            whileHover={{ scale: 1.02 }}
            onHoverStart={() => setHoveredItem('cctv')}
            onHoverEnd={() => setHoveredItem(null)}
          >
            <div className="icon"><Videocam /></div>
            <div className="text">
              <div className="value">CCTV</div>
              <div className="label">Recording</div>
            </div>
            {hoveredItem === 'cctv' && (
              <Tooltip
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 5 }}
              >
                Security Camera Status
              </Tooltip>
            )}
          </StatusItem>

          <StatusItem 
            $active={lightsOn}
            onClick={() => setLightsOn(!lightsOn)}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.2 }}
            whileHover={{ scale: 1.02 }}
            onHoverStart={() => setHoveredItem('lights')}
            onHoverEnd={() => setHoveredItem(null)}
          >
            <div className="icon"><LightbulbOutlined /></div>
            <div className="text">
              <div className="value">Lights</div>
              <div className="label">{lightsOn ? 'On' : 'Off'}</div>
            </div>
            {hoveredItem === 'lights' && (
              <Tooltip
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 5 }}
              >
                Click to Toggle Lights
              </Tooltip>
            )}
          </StatusItem>
        </StatusGrid>
      </TopSection>
    </HeaderContainer>
  );
};

export default HeaderSection; 