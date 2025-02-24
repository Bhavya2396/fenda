import React, { useState, useMemo, useCallback, memo } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Thermostat, AcUnit, Air, WbSunny,
  Opacity, DeviceThermostat, Add, Remove,
  Speed, PowerSettingsNew, Timer,
  WaterDrop, AirOutlined, Home,
  MeetingRoom, KingBed, Weekend,
  Kitchen, LocalDining, TrendingUp,
  TrendingDown, SettingsRemote
} from '@mui/icons-material';

const Container = styled.div`
  max-width: 480px;
  margin: 0 auto;
  padding: 1rem 1rem 5rem;
  min-height: 100vh;
`;

const Grid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Card = styled(motion.div)`
  background: var(--bg-color);
  border-radius: var(--radius-lg);
  padding: 1.25rem;
  box-shadow: var(--shadow-flat);
  position: relative;
  overflow: hidden;
  backdrop-filter: blur(10px);

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg,
      rgba(124, 131, 253, 0.05) 0%,
      rgba(150, 186, 255, 0.05) 100%
    );
    z-index: 0;
  }

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(
      circle at top right,
      rgba(124, 131, 253, 0.1) 0%,
      transparent 70%
    );
    z-index: 0;
  }

  .content {
    position: relative;
    z-index: 1;
  }
`;

const EnvironmentDashboard = styled.div<{ trend?: 'up' | 'down' }>`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  margin-bottom: 1.5rem;

  .metric {
    background: var(--bg-color-dark);
    padding: 1.25rem;
    border-radius: var(--radius-lg);
    box-shadow: var(--shadow-pressed);
    text-align: center;
    position: relative;
    overflow: hidden;

    &::before {
      content: '';
      position: absolute;
      inset: 0;
      background: linear-gradient(135deg,
        rgba(124, 131, 253, 0.05) 0%,
        rgba(150, 186, 255, 0.05) 100%
      );
      z-index: 0;
    }

    .trend {
      position: absolute;
      top: 0.75rem;
      right: 0.75rem;
      display: flex;
      align-items: center;
      gap: 0.25rem;
      font-size: 0.75rem;
      padding: 0.25rem 0.5rem;
      border-radius: var(--radius-sm);
      background: ${props => props.trend === 'up' ? 'rgba(255, 59, 48, 0.1)' : 'rgba(52, 199, 89, 0.1)'};
      color: ${props => props.trend === 'up' ? 'var(--primary-red)' : 'var(--success-color)'};
    }

    .content {
      position: relative;
      z-index: 1;
    }

    .value {
      font-size: 2rem;
      font-weight: 600;
      color: var(--text-color);
      margin-bottom: 0.5rem;
      font-family: var(--font-mono);
    }

    .label {
      font-size: 0.875rem;
      color: var(--text-color-muted);
      text-transform: uppercase;
      letter-spacing: 1px;
    }

    .optimal {
      margin-top: 0.5rem;
      font-size: 0.75rem;
      color: var(--success-color);
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.25rem;
      
      svg {
        animation: pulse 2s infinite;
      }
    }
  }

  @keyframes pulse {
    0% { transform: scale(1); }
    50% { transform: scale(1.1); }
    100% { transform: scale(1); }
  }
`;

const DeviceToggle = styled.div`
  background: var(--bg-color-dark);
  padding: 0.5rem;
  border-radius: var(--radius-lg);
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
  box-shadow: var(--shadow-pressed);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg,
      rgba(124, 131, 253, 0.05) 0%,
      rgba(150, 186, 255, 0.05) 100%
    );
    z-index: 0;
  }
`;

const ToggleButton = styled(motion.button)<{ active: boolean }>`
  flex: 1;
  padding: 1rem;
  border: none;
  border-radius: var(--radius-lg);
  background: ${props => props.active ? 'var(--bg-color)' : 'transparent'};
  color: ${props => props.active ? 'var(--primary-red)' : 'var(--text-color-muted)'};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  font-weight: 500;
  box-shadow: ${props => props.active ? 'var(--shadow-flat)' : 'none'};
  transition: all var(--transition-normal);
  position: relative;
  overflow: hidden;

  .device-icon {
    width: 24px;
    height: 24px;
    position: relative;

    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
      filter: ${props => props.active ? 'none' : 'grayscale(1)'};
      transition: filter var(--transition-normal);
    }

    svg {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      font-size: 1.5rem;
      opacity: ${props => props.active ? 1 : 0.5};
    }
  }

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: ${props => props.active ? 
      'linear-gradient(135deg, rgba(255, 59, 48, 0.1) 0%, rgba(255, 59, 48, 0) 100%)' : 
      'none'
    };
    z-index: 0;
  }

  .content {
    position: relative;
    z-index: 1;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
`;

const AnalogControl = styled(motion.div)`
  background: var(--bg-color-dark);
  padding: 2rem;
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-pressed);
  margin-bottom: 1.5rem;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg,
      rgba(124, 131, 253, 0.05) 0%,
      rgba(150, 186, 255, 0.05) 100%
    );
    z-index: 0;
  }

  .dial-container {
    position: relative;
    z-index: 1;
  }

  .dial {
    width: 200px;
    height: 200px;
    margin: 0 auto;
    background: var(--bg-color);
    border-radius: 50%;
    position: relative;
    box-shadow: var(--shadow-flat);
    cursor: pointer;

    &::before {
      content: '';
      position: absolute;
      inset: 10px;
      border-radius: 50%;
      background: var(--bg-color-dark);
      box-shadow: var(--shadow-pressed);
    }

    .markers {
      position: absolute;
      inset: 0;
      border-radius: 50%;

      .mark {
        position: absolute;
        width: 2px;
        height: 8px;
        background: rgba(255, 255, 255, 0.1);
        left: 50%;
        transform-origin: bottom center;
        bottom: 10px;

        &.major {
          height: 12px;
          width: 3px;
          background: rgba(255, 255, 255, 0.2);
        }

        &.active {
          background: var(--primary-red);
          box-shadow: 0 0 5px var(--primary-red);
        }
      }
    }

    .marker {
      position: absolute;
      width: 4px;
      height: 20px;
      background: var(--primary-red);
      left: 50%;
      bottom: 50%;
      transform-origin: bottom center;
      border-radius: 2px;
      box-shadow: 0 0 10px var(--primary-red);
      z-index: 2;
    }

    .value {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      font-size: 2.5rem;
      font-weight: 600;
      color: var(--text-color);
      font-family: var(--font-mono);
      text-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
      z-index: 2;
    }
  }

  .status {
    text-align: center;
    margin-top: 1rem;
    color: var(--text-color-muted);
    font-size: 0.875rem;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;

    svg {
      color: var(--primary-red);
      animation: spin 2s linear infinite;
    }
  }

  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
`;

const RoomSelector = styled.div`
  display: flex;
  gap: 0.75rem;
  overflow-x: auto;
  padding: 0.5rem;
  margin: 0 -0.5rem 1.5rem;
  -webkit-overflow-scrolling: touch;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    right: 0;
    top: 0;
    bottom: 0;
    width: 50px;
    background: linear-gradient(to right,
      transparent 0%,
      var(--bg-color-dark) 100%
    );
    pointer-events: none;
    z-index: 2;
  }

  &::-webkit-scrollbar {
    display: none;
  }
`;

const RoomButton = styled(motion.button)<{ active: boolean }>`
  padding: 1rem 1.5rem;
  border: none;
  border-radius: var(--radius-lg);
  background: ${props => props.active ? 'var(--bg-color)' : 'var(--bg-color-dark)'};
  color: ${props => props.active ? 'var(--primary-red)' : 'var(--text-color-muted)'};
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
  font-weight: 500;
  box-shadow: ${props => props.active ? 'var(--shadow-flat)' : 'var(--shadow-pressed)'};
  white-space: nowrap;
  flex-shrink: 0;
  position: relative;
  overflow: hidden;
  min-width: 120px;

  .room-image {
    width: 100%;
    height: 60px;
    border-radius: var(--radius-md);
    overflow: hidden;
    margin-bottom: 0.5rem;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      filter: ${props => props.active ? 'none' : 'grayscale(1)'};
      transition: filter var(--transition-normal);
    }
  }

  .room-info {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.25rem;
  }

  .room-metrics {
    display: flex;
    gap: 0.5rem;
    font-size: 0.75rem;
    color: var(--text-color-muted);

    span {
      display: flex;
      align-items: center;
      gap: 0.25rem;
    }
  }

  svg {
    font-size: 1.25rem;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

interface DeviceAsset {
  id: string;
  name: string;
  icon: React.ReactNode;
  image: string;
}

interface RoomAsset {
  id: string;
  name: string;
  icon: React.ReactNode;
  image: string;
  temperature: number;
  aqi: number;
  hasAC: boolean;
  hasPurifier: boolean;
}

const devices: DeviceAsset[] = [
  {
    id: 'ac',
    name: 'AC',
    icon: <AcUnit />,
    image: '/pngimg.com - air_conditioner_PNG73.png'
  },
  {
    id: 'purifier',
    name: 'Purifier',
    icon: <Air />,
    image: '/49364-1-air-purifier-download-hd-png.webp'
  }
];

const rooms: RoomAsset[] = [
  { 
    id: 'living', 
    name: 'Living Room', 
    icon: <Weekend />, 
    image: '/drawingroomdesignbestdrawingroomdesignideaslivingroominteriordesi251671005634.webp',
    temperature: 24, 
    aqi: 95, 
    hasAC: true, 
    hasPurifier: true 
  },
  { 
    id: 'bedroom', 
    name: 'Bedroom', 
    icon: <KingBed />, 
    image: '/Home-office-inspiration-by-Annie-L-345x.webp',
    temperature: 23, 
    aqi: 92, 
    hasAC: true, 
    hasPurifier: true 
  },
  { 
    id: 'kitchen', 
    name: 'Kitchen', 
    icon: <Kitchen />, 
    image: '/larchmont-by-chaunceyboothby-010-kitchen-6552564e738df.avif',
    temperature: 25, 
    aqi: 88, 
    hasAC: false, 
    hasPurifier: true 
  },
  { 
    id: 'dining', 
    name: 'Dining Room', 
    icon: <LocalDining />, 
    image: '/images (2).jpeg',
    temperature: 24, 
    aqi: 90, 
    hasAC: true, 
    hasPurifier: false 
  }
];

// Memoized Components
const MetricCard = memo(({ label, value, optimal, icon, trend }: {
  label: string;
  value: number | string;
  optimal: string;
  icon: React.ReactNode;
  trend?: 'up' | 'down';
}) => (
  <div className="metric">
    <div className="content">
      {trend && (
        <div className="trend">
          {trend === 'up' ? <TrendingUp fontSize="small" /> : <TrendingDown fontSize="small" />}
          {trend === 'up' ? '+1.2°' : '-0.8°'}
        </div>
      )}
      <div className="value">{value}</div>
      <div className="label">{label}</div>
      <div className="optimal">
        {icon} {optimal}
      </div>
    </div>
  </div>
));

const DeviceButton = memo(({ 
  device, 
  isActive, 
  onClick 
}: {
  device: DeviceAsset;
  isActive: boolean;
  onClick: () => void;
}) => (
  <ToggleButton
    active={isActive}
    onClick={onClick}
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
  >
    <div className="content">
      <div className="device-icon">
        <img src={device.image} alt={device.name} />
        {device.icon}
      </div>
      {device.name}
    </div>
  </ToggleButton>
));

const RoomCard = memo(({ 
  room, 
  isActive, 
  isDisabled,
  onClick 
}: {
  room: RoomAsset;
  isActive: boolean;
  isDisabled: boolean;
  onClick: () => void;
}) => (
  <RoomButton
    active={isActive}
    onClick={onClick}
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    disabled={isDisabled}
  >
    <div className="room-image">
      <img src={room.image} alt={room.name} loading="lazy" />
    </div>
    <div className="room-info">
      <div className="room-name">{room.name}</div>
      <div className="room-metrics">
        <span><DeviceThermostat fontSize="small" />{room.temperature}°</span>
        <span><Air fontSize="small" />{room.aqi}</span>
      </div>
    </div>
  </RoomButton>
));

const AnalogDial = memo(({ 
  value, 
  maxValue, 
  minValue, 
  onChange,
  unit,
  device
}: {
  value: number;
  maxValue: number;
  minValue: number;
  onChange: (value: number) => void;
  unit: string;
  device: 'ac' | 'purifier';
}) => {
  const handleClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    const angle = Math.atan2(y, x) * (180 / Math.PI);
    const newValue = Math.round(((angle + 180) / 360) * (maxValue - minValue) + minValue);
    onChange(Math.min(Math.max(newValue, minValue), maxValue));
  }, [maxValue, minValue, onChange]);

  const renderMarkers = useCallback(() => {
    const markers = [];
    const total = maxValue - minValue;
    const steps = device === 'ac' ? total : 5;

    for (let i = 0; i <= steps; i++) {
      const rotation = (i / steps) * 360;
      const isMajor = device === 'ac' ? i % 2 === 0 : true;
      const isActive = device === 'ac' 
        ? i === value - minValue 
        : i === value;

      markers.push(
        <div
          key={i}
          className={`mark ${isMajor ? 'major' : ''} ${isActive ? 'active' : ''}`}
          style={{ transform: `rotate(${rotation}deg)` }}
        />
      );
    }
    return markers;
  }, [device, maxValue, minValue, value]);

  return (
    <motion.div 
      className="dial-container"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.2 }}
    >
      <div className="dial" onClick={handleClick}>
        <div className="markers">{renderMarkers()}</div>
        <div 
          className="marker" 
          style={{ 
            transform: `rotate(${((value - minValue) / (maxValue - minValue)) * 360}deg)` 
          }} 
        />
        <div className="value">
          {value}
          <span style={{ fontSize: '1rem', marginLeft: '0.25rem' }}>
            {unit}
          </span>
        </div>
      </div>
      <div className="status">
        <SettingsRemote /> {device === 'ac' ? 'Adjusting Temperature' : 'Setting Fan Speed'}
      </div>
    </motion.div>
  );
});

const Comfort: React.FC = () => {
  const [activeDevice, setActiveDevice] = useState<'ac' | 'purifier'>('ac');
  const [temperature, setTemperature] = useState(24);
  const [fanSpeed, setFanSpeed] = useState(3);
  const [selectedRoom, setSelectedRoom] = useState('living');

  const currentRoom = useMemo(() => 
    rooms.find(room => room.id === selectedRoom)!, 
    [selectedRoom]
  );

  const outsideTemp = 28;
  const outsideAQI = 85;

  const handleTemperatureChange = useCallback((newTemp: number) => {
    setTemperature(Math.min(Math.max(newTemp, 16), 30));
  }, []);

  const handleFanSpeedChange = useCallback((newSpeed: number) => {
    setFanSpeed(Math.min(Math.max(newSpeed, 1), 5));
  }, []);

  return (
    <Container>
      <Grid>
        <Card
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <EnvironmentDashboard>
            <MetricCard
              label="Outside Temp"
              value={`${outsideTemp}°C`}
              optimal="Optimal: 22-26°C"
              icon={<WbSunny />}
              trend="up"
            />
            <MetricCard
              label="Air Quality"
              value={outsideAQI}
              optimal="Good Quality"
              icon={<Air />}
              trend="down"
            />
          </EnvironmentDashboard>

          <DeviceToggle>
            {devices.map(device => (
              <DeviceButton
                key={device.id}
                device={device}
                isActive={activeDevice === device.id}
                onClick={() => setActiveDevice(device.id as 'ac' | 'purifier')}
              />
            ))}
          </DeviceToggle>

          <RoomSelector>
            {rooms.map(room => (
              <RoomCard
                key={room.id}
                room={room}
                isActive={selectedRoom === room.id}
                isDisabled={activeDevice === 'ac' ? !room.hasAC : !room.hasPurifier}
                onClick={() => setSelectedRoom(room.id)}
              />
            ))}
          </RoomSelector>

          <AnalogControl>
            <AnimatePresence mode="wait">
              {activeDevice === 'ac' ? (
                <AnalogDial
                  key="temp"
                  value={temperature}
                  minValue={16}
                  maxValue={30}
                  onChange={handleTemperatureChange}
                  unit="°C"
                  device="ac"
                />
              ) : (
                <AnalogDial
                  key="fan"
                  value={fanSpeed}
                  minValue={1}
                  maxValue={5}
                  onChange={handleFanSpeedChange}
                  unit="Speed"
                  device="purifier"
                />
              )}
            </AnimatePresence>
          </AnalogControl>
        </Card>
      </Grid>
    </Container>
  );
};

export default Comfort; 