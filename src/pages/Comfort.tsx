import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  AcUnit, Air, WbSunny, Opacity, 
  DeviceThermostat, Add, Remove, 
  Speed, PowerSettingsNew, Timer,
  WaterDrop, AirOutlined,
  ArrowBack, Room, CheckCircle,
  Warning, ThermostatAuto,
  Add as AddIcon, Remove as RemoveIcon,
  NightsStay, WbAuto, FilterAlt,
  SavingsOutlined, WbTwilight, AcUnit as CoolIcon,
  Speed as FanIcon, LocalDrink,
  PowerSettingsNew as PowerIcon
} from '@mui/icons-material';

const Container = styled.div`
  padding: 1rem;
  color: var(--text-color);
  max-width: 800px;
  margin: 0 auto;

  @media (max-width: 480px) {
    padding: 0.75rem;
  }
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
  position: sticky;
  top: 0;
  background: var(--bg-color-dark);
  padding: 1rem;
  z-index: 100;
    border-radius: var(--radius-lg);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

const BackButton = styled.button`
  background: var(--bg-color-dark);
    border: none;
    color: var(--text-color);
    cursor: pointer;
  padding: 0.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
  border-radius: 50%;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.2),
              -5px -5px 10px rgba(255, 255, 255, 0.05);
  transition: all 0.3s ease;

    &:hover {
    box-shadow: inset 5px 5px 10px rgba(0, 0, 0, 0.2),
                inset -5px -5px 10px rgba(255, 255, 255, 0.05);
  }
`;

const Title = styled.h1`
    font-size: 1.5rem;
    font-weight: 600;
    margin: 0;
`;

const OverviewCard = styled(motion.div)`
  background: var(--bg-color-dark);
  border-radius: var(--radius-lg);
    padding: 1rem;
    margin-bottom: 1rem;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.2),
              -5px -5px 10px rgba(255, 255, 255, 0.05);
`;

const WeatherGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.75rem;

  .weather-item {
  background: var(--bg-color-dark);
    padding: 1rem;
    border-radius: var(--radius-lg);
    box-shadow: inset 3px 3px 6px rgba(0, 0, 0, 0.2),
                inset -3px -3px 6px rgba(255, 255, 255, 0.05);
    
    .header {
    display: flex;
    align-items: center;
      gap: 0.5rem;
      margin-bottom: 0.5rem;
      color: var(--text-secondary);
      font-size: 0.875rem;

      svg {
        color: var(--primary-red);
      }
    }

    .value {
      font-size: 1.5rem;
          font-weight: 600;
          margin-bottom: 0.25rem;
      color: var(--primary-red);
        }

    .details {
          display: flex;
      gap: 1rem;
      font-size: 0.75rem;
      color: var(--text-secondary);

      span {
      display: flex;
      align-items: center;
        gap: 0.25rem;
      }
    }
  }
`;

const DeviceToggle = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.75rem;
  margin: 1rem 0;
`;

const ToggleButton = styled(motion.button)<{ $active: boolean }>`
  background: var(--bg-color-dark);
  border: none;
  border-radius: var(--radius-lg);
  padding: 1rem;
  color: ${props => props.$active ? 'var(--primary-red)' : 'var(--text-color)'};
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
  box-shadow: ${props => props.$active ? 
    'inset 5px 5px 10px rgba(0, 0, 0, 0.2), inset -5px -5px 10px rgba(255, 255, 255, 0.05)' :
    '5px 5px 10px rgba(0, 0, 0, 0.2), -5px -5px 10px rgba(255, 255, 255, 0.05)'};

  img {
    width: 48px;
    height: 48px;
    object-fit: contain;
    filter: ${props => props.$active ? 'none' : 'grayscale(100%)'};
  }

  .device-name {
    font-size: 0.875rem;
    font-weight: 500;
  }

  .device-status {
      font-size: 0.75rem;
    color: var(--text-secondary);
      display: flex;
      align-items: center;
      gap: 0.25rem;
      }
`;

const RoomsScroll = styled(motion.div)`
      display: flex;
  gap: 0.75rem;
  margin: 0 -1rem 1rem;
  padding: 0.5rem 1rem;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
  
  &::-webkit-scrollbar {
    display: none;
  }
`;

const RoomCard = styled(motion.div)<{ $active: boolean; $image: string }>`
  min-width: 200px;
  background: ${props => `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${props.$image})`};
  background-size: cover;
  background-position: center;
  border-radius: var(--radius-lg);
  padding: 1rem;
  color: white;
  cursor: pointer;
  scroll-snap-align: start;
  box-shadow: ${props => props.$active ? 
    'inset 3px 3px 6px rgba(0, 0, 0, 0.3), 0 3px 6px rgba(255, 99, 99, 0.2)' : 
    '3px 3px 6px rgba(0, 0, 0, 0.2), -3px -3px 6px rgba(255, 255, 255, 0.05)'};

  .room-info {
      display: flex;
      align-items: center;
    gap: 0.5rem;
    font-size: 0.875rem;
    font-weight: 500;
    margin-bottom: 0.75rem;
  }

  .room-temp {
  display: flex;
  align-items: center;
    gap: 0.5rem;
    font-size: 1rem;
    color: ${props => props.$active ? 'var(--primary-red)' : 'rgba(255, 255, 255, 0.6)'};
  }

  .room-status {
      font-size: 0.75rem;
    color: rgba(255, 255, 255, 0.6);
    margin-top: 0.25rem;
  }
`;

const DeviceDetails = styled.div`
  margin-top: 1rem;
    background: var(--bg-color-dark);
    border-radius: var(--radius-lg);
  padding: 1rem;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.2),
              -5px -5px 10px rgba(255, 255, 255, 0.05);

  .device-status {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 1rem;

    .power-info {
  display: flex;
  align-items: center;
      gap: 0.5rem;
    color: var(--primary-red);
      font-size: 0.875rem;

  svg {
    font-size: 1.25rem;
  }
    }

    .runtime {
      font-size: 0.75rem;
      color: var(--text-secondary);
    }
  }

  .modes {
  display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 0.5rem;
    margin-bottom: 1rem;
  }
`;

const ModeButton = styled.button<{ $active: boolean }>`
  background: var(--bg-color-dark);
  border: none;
  border-radius: var(--radius-lg);
  padding: 0.75rem 0.5rem;
  color: ${props => props.$active ? 'var(--primary-red)' : 'var(--text-color)'};
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  box-shadow: ${props => props.$active ? 
    'inset 3px 3px 6px rgba(0, 0, 0, 0.2), inset -3px -3px 6px rgba(255, 255, 255, 0.05)' :
    '3px 3px 6px rgba(0, 0, 0, 0.2), -3px -3px 6px rgba(255, 255, 255, 0.05)'};

  svg {
    font-size: 1.25rem;
  }

  span {
    font-size: 0.75rem;
  }
`;

const StatusIndicators = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.75rem;
  margin-bottom: 1rem;

  .indicator {
    background: var(--bg-color-dark);
    padding: 0.75rem;
    border-radius: var(--radius-lg);
    box-shadow: inset 3px 3px 6px rgba(0, 0, 0, 0.2),
                inset -3px -3px 6px rgba(255, 255, 255, 0.05);
    
    .label {
  display: flex;
      align-items: center;
      gap: 0.5rem;
      color: var(--text-secondary);
      font-size: 0.75rem;
      margin-bottom: 0.25rem;

      svg {
        color: var(--primary-red);
        font-size: 1rem;
      }
    }

    .value {
      font-size: 1rem;
      font-weight: 500;
      color: var(--text-color);
    }
  }
`;

const ProgressBar = styled.div<{ $value: number }>`
  height: 4px;
      background: var(--bg-color-dark);
  border-radius: 2px;
  margin-top: 0.5rem;
  box-shadow: inset 2px 2px 4px rgba(0, 0, 0, 0.2),
              inset -2px -2px 4px rgba(255, 255, 255, 0.05);
      position: relative;
      overflow: hidden;

  &::after {
    content: '';
        position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: ${props => props.$value}%;
    background: var(--primary-gradient);
    border-radius: 2px;
  }
`;

const ControlPanel = styled.div`
  background: var(--bg-color-dark);
  border-radius: var(--radius-lg);
  padding: 1.5rem 1rem;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.2),
              -5px -5px 10px rgba(255, 255, 255, 0.05);

  .control-header {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 1.5rem;
    color: var(--primary-red);
    font-weight: 500;
  }

  .control-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
  gap: 1rem;

  @media (max-width: 480px) {
      grid-template-columns: 1fr;
      gap: 2rem;
    }
  }
`;

const ControlButton = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;

  .label {
    font-size: 0.875rem;
    color: var(--text-secondary);
  }

  .control-ring {
    position: relative;
    width: 160px;
    height: 160px;
    border-radius: 50%;
    background: var(--bg-color-dark);
    box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.2),
                -5px -5px 10px rgba(255, 255, 255, 0.05);
    display: flex;
  align-items: center;
  justify-content: center;
    cursor: pointer;
    user-select: none;
    touch-action: none;

    @media (max-width: 480px) {
      width: 140px;
      height: 140px;
    }

    &::before {
      content: '';
      position: absolute;
      inset: 10px;
      border-radius: 50%;
      background: var(--bg-color-dark);
      box-shadow: inset 3px 3px 6px rgba(0, 0, 0, 0.2),
                  inset -3px -3px 6px rgba(255, 255, 255, 0.05);
    }

    .tick-marks {
      position: absolute;
      inset: 0;
      border-radius: 50%;

      .tick {
        position: absolute;
        width: 2px;
        height: 8px;
        background: var(--text-color-muted);
        left: 50%;
        transform-origin: 50% 70px;

        @media (max-width: 480px) {
          transform-origin: 50% 60px;
          height: 6px;
        }

        &.major {
          height: 12px;
          width: 2px;
          background: var(--text-color);

          @media (max-width: 480px) {
            height: 10px;
          }
        }

        &.active {
          background: var(--primary-red);
        }
      }
    }

    .value-display {
      position: absolute;
    display: flex;
      flex-direction: column;
    align-items: center;
      gap: 0.25rem;

      .value {
        font-size: 1.75rem;
        font-weight: 600;
        color: var(--text-color);

    @media (max-width: 480px) {
          font-size: 1.5rem;
        }
      }

      .unit {
      font-size: 0.875rem;
        color: var(--text-secondary);

      @media (max-width: 480px) {
        font-size: 0.75rem;
        }
      }
      }

    .control-button {
      position: absolute;
        width: 32px;
        height: 32px;
        border-radius: 50%;
      background: var(--bg-color-dark);
      box-shadow: 3px 3px 6px rgba(0, 0, 0, 0.2),
                  -3px -3px 6px rgba(255, 255, 255, 0.05);
        display: flex;
        align-items: center;
        justify-content: center;
      color: var(--text-color);
      cursor: pointer;
      transition: all 0.2s ease;

        @media (max-width: 480px) {
          width: 28px;
          height: 28px;
      }

      &:hover {
        color: var(--primary-red);
        transform: scale(1.1);
      }

      &:active {
        box-shadow: inset 2px 2px 4px rgba(0, 0, 0, 0.2),
                    inset -2px -2px 4px rgba(255, 255, 255, 0.05);
        transform: scale(0.95);
      }

      &.minus {
        left: 10px;
        top: 50%;
        transform: translateY(-50%);
      }

      &.plus {
        right: 10px;
        top: 50%;
        transform: translateY(-50%);
      }

      svg {
        font-size: 20px;

        @media (max-width: 480px) {
          font-size: 18px;
        }
      }
    }
  }
`;

const ComfortPage: React.FC = () => {
  const navigate = useNavigate();
  const [selectedDevice, setSelectedDevice] = useState<'ac' | 'purifier'>('ac');
  const [selectedRoom, setSelectedRoom] = useState('living');
  const [temperature, setTemperature] = useState(23);
  const [fanSpeed, setFanSpeed] = useState(3);
  const [acMode, setAcMode] = useState<'cool' | 'auto' | 'eco' | 'sleep'>('cool');
  const [purifierMode, setPurifierMode] = useState<'auto' | 'sleep' | 'turbo' | 'eco'>('auto');
  const [isPowerOn, setIsPowerOn] = useState(true);
  const [humidity, setHumidity] = useState(55);
  const [filterLife, setFilterLife] = useState(80);
  const [waterLevel, setWaterLevel] = useState(75);

  const handleBack = () => {
    navigate('/');
  };

  const rooms = [
    { 
      id: 'living', 
      name: 'Living Room', 
      temp: '24°C',
      image: '/drawingroomdesignbestdrawingroomdesignideaslivingroominteriordesi251671005634.webp',
      status: 'AC & Purifier running'
    },
    { 
      id: 'bedroom', 
      name: 'Bedroom', 
      temp: '22°C',
      image: '/Home-office-inspiration-by-Annie-L-345x.webp',
      status: 'AC running'
    },
    { 
      id: 'kitchen', 
      name: 'Kitchen', 
      temp: '23°C',
      image: '/larchmont-by-chaunceyboothby-010-kitchen-6552564e738df.avif',
      status: 'Purifier running'
    },
    { 
      id: 'office', 
      name: 'Office', 
      temp: '23°C',
      image: '/Home-office-inspiration-by-Annie-L-345x.webp',
      status: 'All devices off'
    }
  ];

  const adjustTemperature = (delta: number) => {
    setTemperature(prev => Math.min(30, Math.max(16, prev + delta)));
  };

  const adjustFanSpeed = (delta: number) => {
    setFanSpeed(prev => Math.min(5, Math.max(1, prev + delta)));
  };

  const getDeviceModes = () => {
    if (selectedDevice === 'ac') {
      return [
        { id: 'cool', icon: <CoolIcon />, label: 'Cool' },
        { id: 'auto', icon: <WbAuto />, label: 'Auto' },
        { id: 'eco', icon: <SavingsOutlined />, label: 'Eco' },
        { id: 'sleep', icon: <NightsStay />, label: 'Sleep' }
      ];
    } else {
      return [
        { id: 'auto', icon: <WbAuto />, label: 'Auto' },
        { id: 'sleep', icon: <NightsStay />, label: 'Sleep' },
        { id: 'turbo', icon: <Speed />, label: 'Turbo' },
        { id: 'eco', icon: <SavingsOutlined />, label: 'Eco' }
      ];
    }
  };

  const handleModeChange = (mode: string) => {
    if (selectedDevice === 'ac') {
      setAcMode(mode as 'cool' | 'auto' | 'eco' | 'sleep');
    } else {
      setPurifierMode(mode as 'auto' | 'sleep' | 'turbo' | 'eco');
    }
  };

  return (
    <Container>
      <Header>
        <BackButton onClick={handleBack}>
          <ArrowBack />
        </BackButton>
        <Title>Comfort Control</Title>
      </Header>

      <OverviewCard
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <WeatherGrid>
          <div className="weather-item">
            <div className="header">
              <ThermostatAuto />
              Outside Temperature
            </div>
            <div className="value">32°C</div>
            <div className="details">
              <span><Opacity />68%</span>
              <span>Feels like 29°C</span>
            </div>
          </div>
          <div className="weather-item">
            <div className="header">
              <Warning />
              Air Quality
            </div>
            <div className="value">156 AQI</div>
            <div className="details">
              <span>PM2.5: 89</span>
              <span>PM10: 42</span>
            </div>
          </div>
        </WeatherGrid>
      </OverviewCard>

      <RoomsScroll
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.2}
      >
        {rooms.map(room => (
          <RoomCard
            key={room.id}
            $active={selectedRoom === room.id}
            $image={room.image}
            onClick={() => setSelectedRoom(room.id)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="room-info">
              <Room />
              {room.name}
            </div>
            <div>
              <div className="room-temp">
                <DeviceThermostat />
                {room.temp}
              </div>
              <div className="room-status">{room.status}</div>
            </div>
          </RoomCard>
        ))}
      </RoomsScroll>

      <DeviceToggle>
        <ToggleButton
          $active={selectedDevice === 'ac'}
          onClick={() => setSelectedDevice('ac')}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <img src="/pngimg.com - air_conditioner_PNG73.png" alt="AC" />
          <span className="device-name">Air Conditioner</span>
          <span className="device-status">
            <PowerSettingsNew />
            {selectedDevice === 'ac' ? 'Active' : 'Standby'}
          </span>
        </ToggleButton>
        <ToggleButton
          $active={selectedDevice === 'purifier'}
          onClick={() => setSelectedDevice('purifier')}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <img src="/49364-1-air-purifier-download-hd-png.webp" alt="Air Purifier" />
          <span className="device-name">Air Purifier</span>
          <span className="device-status">
            <PowerSettingsNew />
            {selectedDevice === 'purifier' ? 'Active' : 'Standby'}
          </span>
        </ToggleButton>
      </DeviceToggle>

      <DeviceDetails>
        <div className="device-status">
          <div className="power-info">
            <PowerIcon />
            {isPowerOn ? 'Device Running' : 'Device Off'}
          </div>
          <div className="runtime">Running for: 4h 23m</div>
        </div>

        <div className="modes">
          {getDeviceModes().map(mode => (
            <ModeButton
              key={mode.id}
              $active={
                selectedDevice === 'ac' 
                  ? acMode === mode.id 
                  : purifierMode === mode.id
              }
              onClick={() => handleModeChange(mode.id)}
            >
              {mode.icon}
              <span>{mode.label}</span>
            </ModeButton>
          ))}
        </div>

        <StatusIndicators>
          {selectedDevice === 'ac' ? (
            <>
              <div className="indicator">
                <div className="label">
                  <Opacity />
                  Humidity Level
                </div>
                <div className="value">{humidity}%</div>
                <ProgressBar $value={humidity} />
              </div>
              <div className="indicator">
                <div className="label">
                  <Timer />
                  Auto-off Timer
                </div>
                <div className="value">4h remaining</div>
                <ProgressBar $value={75} />
              </div>
            </>
          ) : (
            <>
              <div className="indicator">
                <div className="label">
                  <FilterAlt />
                  Filter Life
                </div>
                <div className="value">{filterLife}%</div>
                <ProgressBar $value={filterLife} />
              </div>
              <div className="indicator">
                <div className="label">
                  <LocalDrink />
                  Water Level
                </div>
                <div className="value">{waterLevel}%</div>
                <ProgressBar $value={waterLevel} />
              </div>
            </>
          )}
        </StatusIndicators>

        <ControlPanel>
          <div className="control-header">
            {selectedDevice === 'ac' ? <DeviceThermostat /> : <Speed />}
            {selectedDevice === 'ac' ? 'Temperature Control' : 'Fan Speed Control'}
          </div>
          <div className="control-grid">
            <ControlButton
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="control-ring">
                <div className="tick-marks">
                  {[...Array(selectedDevice === 'ac' ? 30 : 20)].map((_, i) => {
                    const isAC = selectedDevice === 'ac';
                    const isMajor = isAC ? (i % 5 === 0) : (i % 4 === 0);
                    const rotation = isAC ? 
                      (i * 6 - 90) : // For AC: 30 ticks, 6 degrees each, starting from -90
                      (i * 9 - 90);  // For Purifier: 20 ticks, 9 degrees each, starting from -90
                    const currentValue = isAC ? temperature : fanSpeed;
                    const isActive = isAC ? 
                      (i <= (temperature - 16) * 2) : // For AC: map 16-30°C to ticks
                      (i <= fanSpeed * 4);            // For Purifier: map 1-5 to ticks

  return (
                      <div
                        key={i}
                        className={`tick ${isMajor ? 'major' : ''} ${isActive ? 'active' : ''}`}
                        style={{ transform: `rotate(${rotation}deg)` }}
                      />
                    );
                  })}
                </div>
                <div className="value-display">
                  <div className="value">
                    {selectedDevice === 'ac' ? temperature : fanSpeed}
                  </div>
                  <div className="unit">
                    {selectedDevice === 'ac' ? '°C' : 'Speed'}
                  </div>
                </div>
                <div 
                  className="control-button minus"
                  onClick={() => selectedDevice === 'ac' ? adjustTemperature(-1) : adjustFanSpeed(-1)}
                >
                  <Remove />
                </div>
                <div 
                  className="control-button plus"
                  onClick={() => selectedDevice === 'ac' ? adjustTemperature(1) : adjustFanSpeed(1)}
                >
                  <Add />
                </div>
              </div>
              <div className="label">
                {selectedDevice === 'ac' ? 'Temperature' : 'Fan Speed'}
              </div>
            </ControlButton>
            <ControlButton
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="control-ring">
                <div className="tick-marks">
                  {[...Array(24)].map((_, i) => {
                    const isMajor = i % 6 === 0;
                    const rotation = i * 15 - 90; // 24 ticks, 15 degrees each, starting from -90
                    const isActive = i <= 4; // 4 hours timer
                    
                    return (
                      <div
                        key={i}
                        className={`tick ${isMajor ? 'major' : ''} ${isActive ? 'active' : ''}`}
                        style={{ transform: `rotate(${rotation}deg)` }}
                      />
                    );
                  })}
                </div>
                <div className="value-display">
                  <div className="value">4</div>
                  <div className="unit">hours</div>
                </div>
                <div className="control-button minus">
                  <Remove />
                </div>
                <div className="control-button plus">
                  <Add />
                </div>
              </div>
              <div className="label">Auto-off Timer</div>
            </ControlButton>
          </div>
        </ControlPanel>
      </DeviceDetails>
    </Container>
  );
};

export default ComfortPage; 