import React, { useState, useCallback, useMemo, useRef, useEffect, Suspense } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence, useMotionValue, useTransform, useAnimation } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  AcUnit, Air, Lightbulb, Videocam,
  Settings, Menu, 
  Notifications, Person, WbSunny, Opacity,
  Schedule, TrendingUp, BatteryChargingFull, Tv, Add, CheckCircle, Room,
  WbTwilight, DeviceThermostat, Mic,
  Home, Thermostat, Security, ArrowBack,
  WaterDrop, BoltOutlined, SolarPower, Lock, LockOpen,
  Theaters as TheatersIcon, Warning, EmojiObjects, AirOutlined, KeyboardVoice,
  NightsStay as NightsStayIcon, Refresh, FullscreenOutlined, NotificationsActive,
  Favorite, Timer, CloudQueue,
  LightbulbOutlined, Kitchen, SingleBed, WeekendOutlined, 
  Computer, LocalLaundryService, VolumeUp
} from '@mui/icons-material';
import Logo from './Logo';
import DeviceCard from './DeviceCard';
import { default as WeatherWidget } from './widgets/WeatherWidget';
import { default as SceneCreator } from './widgets/SceneCreatorWidget';
import { default as VoiceControl } from './widgets/VoiceControlWidget';
import { default as EnergyGoals } from './widgets/EnergyGoalsWidget';
import HeaderSection from './HeaderSection';

// Interfaces
interface RoomCardProps {
  $active: boolean;
}

interface DeviceCardStyledProps {
  active?: boolean;
}

interface Device {
  id: string;
  name: string;
  count: number;
  image: string;
  icon: React.ReactNode;
  room: string;
  active: boolean;
  status: string;
  roomId: string;
  path: string;
}

interface DeviceCardProps {
  device: Device;
  active: boolean;
  onToggle: (id: string) => void;
}

interface RoomData {
  id: string;
  name: string;
  temperature: string;
  power: string;
  image: string;
  devices: number;
  activeDevices: number;
}

// Add interfaces for notifications and automations
interface Notification {
  id: string;
  title: string;
  message: string;
  timestamp: Date;
  type: 'info' | 'warning' | 'success';
  read: boolean;
}

interface Automation {
  id: string;
  name: string;
  condition: string;
  action: string;
  active: boolean;
}

// Data
const rooms: RoomData[] = [
  { 
    id: 'living', 
    name: 'Living Room', 
    temperature: '24°C', 
    power: '350W',
    image: '/drawingroomdesignbestdrawingroomdesignideaslivingroominteriordesi251671005634.webp',
    devices: 0,
    activeDevices: 0
  },
  { 
    id: 'bedroom', 
    name: 'Bedroom', 
    temperature: '22°C', 
    power: '150W',
    image: '/Home-office-inspiration-by-Annie-L-345x.webp',
    devices: 0,
    activeDevices: 0
  },
  { 
    id: 'kitchen', 
    name: 'Kitchen', 
    temperature: '23°C', 
    power: '200W',
    image: '/larchmont-by-chaunceyboothby-010-kitchen-6552564e738df.avif',
    devices: 0,
    activeDevices: 0
  },
  { 
    id: 'office', 
    name: 'Home Office', 
    temperature: '23°C', 
    power: '180W',
    image: '/Home-office-inspiration-by-Annie-L-345x.webp',
    devices: 0,
    activeDevices: 0
  }
];

const devices = [
  {
    id: 'ac1',
    name: 'Air Conditioner',
    icon: <AcUnit />,
    image: '/pngimg.com - air_conditioner_PNG73.png',
    status: '24°C • Cooling',
    path: '/device/ac',
    roomId: 'living'
  },
  {
    id: 'tv1',
    name: 'Smart TV',
    icon: <Tv />,
    image: '/pngtree-led-tv-television-screen-vector-png-image_6673700.png',
    status: 'Netflix Playing',
    path: '/device/tv',
    roomId: 'living'
  },
  {
    id: 'music1',
    name: 'Music System',
    icon: <VolumeUp />,
    image: '/pngtree-creative-ways-to-integrate-smart-speakers-into-your-home-png-image_13396551.png',
    status: 'Playing • Blinding Lights',
    path: '/device/music',
    roomId: 'living'
  },
  {
    id: 'ac2',
    name: 'Air Conditioner',
    icon: <AcUnit />,
    image: '/pngimg.com - air_conditioner_PNG73.png',
    status: '22°C • Cooling',
    path: '/device/ac',
    roomId: 'bedroom'
  },
  {
    id: 'purifier1',
    name: 'Air Purifier',
    icon: <Air />,
    image: '/49364-1-air-purifier-download-hd-png.webp',
    status: 'AQI 45 • Good',
    path: '/device/purifier',
    roomId: 'bedroom'
  },
  {
    id: 'tv2',
    name: 'Smart TV',
    icon: <Tv />,
    image: '/pngtree-led-tv-television-screen-vector-png-image_6673700.png',
    status: 'YouTube Playing',
    path: '/device/tv',
    roomId: 'bedroom'
  },
  {
    id: 'ac3',
    name: 'Air Conditioner',
    icon: <AcUnit />,
    image: '/pngimg.com - air_conditioner_PNG73.png',
    status: '23°C • Cooling',
    path: '/device/ac',
    roomId: 'kitchen'
  },
  {
    id: 'purifier2',
    name: 'Air Purifier',
    icon: <Air />,
    image: '/49364-1-air-purifier-download-hd-png.webp',
    status: 'AQI 50 • Moderate',
    path: '/device/purifier',
    roomId: 'kitchen'
  },
  {
    id: 'camera1',
    name: 'Security Camera',
    icon: <Videocam />,
    image: '/smart cctv.avif',
    status: 'Recording • Motion Detected',
    path: '/device/camera',
    roomId: 'kitchen'
  },
  {
    id: 'ac4',
    name: 'Air Conditioner',
    icon: <AcUnit />,
    image: '/pngimg.com - air_conditioner_PNG73.png',
    status: '23°C • Cooling',
    path: '/device/ac',
    roomId: 'office'
  },
  {
    id: 'purifier3',
    name: 'Air Purifier',
    icon: <Air />,
    image: '/49364-1-air-purifier-download-hd-png.webp',
    status: 'AQI 40 • Good',
    path: '/device/purifier',
    roomId: 'office'
  },
  {
    id: 'camera2',
    name: 'Security Camera',
    icon: <Videocam />,
    image: '/smart cctv.avif',
    status: 'Recording • All Clear',
    path: '/device/camera',
    roomId: 'office'
  }
];

// Types and Interfaces
type Section = 'home' | 'comfort' | 'security' | 'energy' | 'scenes' | 'entertainment';

interface NavItem {
  id: Section;
  icon: React.ReactNode;
  label: string;
  path?: string;
}

const navItems: NavItem[] = [
  { id: 'home', icon: <Home />, label: 'Home' },
  { id: 'comfort', icon: <Thermostat />, label: 'Comfort', path: '/comfort' },
  { id: 'security', icon: <Security />, label: 'Security' },
  { id: 'energy', icon: <BatteryChargingFull />, label: 'Energy' },
  { id: 'entertainment', icon: <TheatersIcon />, label: 'Entertainment' }
];

// Update component props interfaces
interface EnergyProps {
  energyTrends: Array<{ time: string; usage: number }>;
}

interface WeatherProps {
  weatherData: {
    temperature: number;
    condition: string;
    humidity: number;
    windSpeed: number;
  } | null;
}

// Styled Components
const AppContainer = styled.div`
  min-height: 100vh;
  background: var(--bg-dark);
  color: var(--text-primary);
  position: relative;
  overflow-x: hidden;
`;

const MainContent = styled(motion.main)`
  padding: 5rem 1rem 5rem;
  min-height: 100vh;
`;

const BottomNav = styled.nav`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: var(--bg-color-dark);
  padding: 0.75rem;
  display: flex;
  justify-content: space-around;
  z-index: var(--z-header);
  box-shadow: 0 -5px 15px rgba(0, 0, 0, 0.3);
  border-top: 1px solid rgba(255, 255, 255, 0.03);

  @media (max-width: 480px) {
    padding: 0.5rem;
  }
`;

const NavButton = styled(motion.button)<{ active: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.375rem;
  background: none;
  border: none;
  color: ${props => props.active ? 'var(--primary-red)' : 'var(--text-color-muted)'};
  padding: 0.5rem;
  cursor: pointer;
  position: relative;
  transition: all var(--transition-normal);
  text-decoration: none;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: ${props => props.active ? '25px' : '0'};
    height: 3px;
    background: var(--primary-red);
    border-radius: 1.5px;
    transition: all var(--transition-normal);
  }

  svg {
    font-size: 1.5rem;
    transition: all var(--transition-normal);
    filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2));
  }

  span {
    font-size: 0.75rem;
    font-weight: 500;
    transition: all var(--transition-normal);
  }

  &:hover {
    color: var(--primary-red-soft);
    
    svg {
      transform: translateY(-2px);
    }
  }

  &:active {
    svg {
      transform: translateY(0);
    }
  }
`;

// Section Components
const HomeOverview = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const StatusCard = styled(motion.div)`
  background: var(--glass-bg);
  border: var(--glass-border);
  border-radius: var(--radius-lg);
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;

  .status-header {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: var(--status-success);
    font-weight: 500;

    svg {
      font-size: 1.25rem;
    }
  }

  .environmental-data {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;

    .data-item {
      background: var(--overlay-light);
      padding: 1rem;
      border-radius: var(--radius-lg);
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.5rem;

      .value {
        font-size: 1.25rem;
        font-weight: 500;
        display: flex;
        align-items: center;
        gap: 0.5rem;

        svg {
          color: var(--primary-red-soft);
        }
      }

      .label {
        font-size: 0.875rem;
        color: var(--text-secondary);
      }
    }
  }
`;

const ActivityFeed = styled(motion.div)`
  .activity-item {
    padding: 1rem;
    background: var(--overlay-light);
    border-radius: var(--radius-lg);
    margin-bottom: 0.75rem;
    display: flex;
    align-items: center;
    gap: 1rem;

    .activity-icon {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background: var(--primary-gradient);
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
    }

    .activity-content {
      flex: 1;

      .activity-title {
        font-weight: 500;
        margin-bottom: 0.25rem;
      }

      .activity-time {
        font-size: 0.875rem;
        color: var(--text-secondary);
      }
    }
  }
`;

const ComfortSection = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const TemperatureControl = styled(motion.div)`
  background: var(--glass-bg);
  border: var(--glass-border);
  border-radius: var(--radius-lg);
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg,
      rgba(64, 169, 255, 0.1) 0%,
      rgba(64, 169, 255, 0.05) 100%
    );
    opacity: 0.5;
  }

  .temp-header {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .room-name {
      font-size: 1.25rem;
      font-weight: 500;
    }

    .power-status {
      color: var(--primary-red);
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-size: 0.875rem;

      &::before {
        content: '';
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background: var(--primary-red);
      }
    }
  }

  .temp-display {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 2rem 0;

    .temp-circle {
      width: 160px;
      height: 160px;
      border-radius: 50%;
      background: var(--glass-gradient);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      box-shadow: var(--shadow-lg);

      .current-temp {
        font-size: 2.5rem;
        font-weight: 600;
        background: var(--primary-gradient);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }

      .temp-label {
        font-size: 0.875rem;
        color: var(--text-secondary);
      }
    }
  }

  .temp-controls {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 1rem;

    button {
      width: 48px;
      height: 48px;
      border-radius: 50%;
      border: none;
      background: var(--overlay-light);
      color: var(--text-primary);
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      font-size: 1.5rem;
    }
  }
`;

const AirQualityCard = styled(motion.div)`
  background: var(--glass-bg);
  border: var(--glass-border);
  border-radius: var(--radius-lg);
  padding: 1.5rem;

  .air-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;

    .title {
      font-size: 1.125rem;
      font-weight: 500;
    }

    .status {
      padding: 0.5rem 1rem;
      background: var(--status-success-bg);
      color: var(--status-success);
      border-radius: var(--radius-lg);
      font-size: 0.875rem;
      font-weight: 500;
    }
  }

  .air-stats {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;

    .stat-item {
      background: var(--overlay-light);
      padding: 1rem;
      border-radius: var(--radius-lg);
      text-align: center;

      .value {
        font-size: 1.25rem;
        font-weight: 500;
        margin-bottom: 0.25rem;
      }

      .label {
        font-size: 0.875rem;
        color: var(--text-secondary);
      }
    }
  }
`;

const SecuritySection = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const CameraGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const CameraFeed = styled(motion.div)`
  background: var(--glass-bg);
  border: var(--glass-border);
  border-radius: var(--radius-lg);
  overflow: hidden;
  aspect-ratio: 16/9;
  position: relative;

  .camera-preview {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .camera-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(
      to bottom,
      transparent 50%,
      rgba(0, 0, 0, 0.8)
    );
    padding: 1rem;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;

    .camera-name {
      color: white;
      font-weight: 500;
      margin-bottom: 0.25rem;
    }

    .camera-status {
      font-size: 0.875rem;
      color: var(--status-success);
      display: flex;
      align-items: center;
      gap: 0.5rem;

      &::before {
        content: '';
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background: var(--status-success);
      }
    }
  }
`;

const AccessControl = styled(motion.div)`
  background: var(--glass-bg);
  border: var(--glass-border);
  border-radius: var(--radius-lg);
  padding: 1.5rem;

  .access-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;

    .title {
      font-size: 1.125rem;
      font-weight: 500;
    }
  }

  .door-controls {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;

    .door-item {
      background: var(--overlay-light);
      padding: 1rem;
      border-radius: var(--radius-lg);
      display: flex;
      flex-direction: column;
      gap: 0.5rem;

      .door-name {
        font-weight: 500;
      }

      .door-status {
        font-size: 0.875rem;
        color: var(--text-secondary);
        display: flex;
        align-items: center;
        gap: 0.5rem;

        svg {
          font-size: 1.25rem;
        }
      }

      .toggle-button {
        margin-top: 0.5rem;
        padding: 0.5rem;
        border: none;
        border-radius: var(--radius-lg);
        background: var(--primary-gradient);
        color: white;
        font-weight: 500;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.5rem;
      }
    }
  }
`;

const EmergencyPanel = styled(motion.div)`
  background: var(--glass-bg);
  border: var(--glass-border);
  border-radius: var(--radius-lg);
  padding: 1.5rem;

  .emergency-header {
    color: var(--primary-red);
    font-weight: 500;
    margin-bottom: 1rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;

    svg {
      font-size: 1.5rem;
    }
  }

  .emergency-actions {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;

    button {
      padding: 1rem;
      border: none;
      border-radius: var(--radius-lg);
      background: var(--primary-red-soft);
      color: var(--primary-red);
      font-weight: 500;
      cursor: pointer;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.5rem;

      svg {
        font-size: 1.5rem;
      }

      &:hover {
        background: var(--primary-red);
        color: white;
      }
    }
  }
`;

const EnergySection: React.FC<EnergyProps> = ({ energyTrends }) => {
  // Implementation
  return (
    <div>
      {/* Energy section content */}
    </div>
  );
};

const PowerUsageCard = styled(motion.div)`
  background: var(--glass-bg);
  border: var(--glass-border);
  border-radius: var(--radius-lg);
  padding: 1.5rem;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg,
      rgba(255, 184, 0, 0.1) 0%,
      rgba(255, 184, 0, 0.05) 100%
    );
    opacity: 0.5;
  }

  .usage-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.5rem;

    .title {
      font-size: 1.125rem;
      font-weight: 500;
    }

    .cost {
      padding: 0.5rem 1rem;
      background: var(--overlay-light);
      border-radius: var(--radius-lg);
      font-size: 0.875rem;
      color: var(--text-secondary);

      strong {
        color: var(--text-primary);
        font-weight: 500;
      }
    }
  }

  .usage-stats {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
    margin-bottom: 1.5rem;

    .stat-item {
      background: var(--overlay-light);
      padding: 1rem;
      border-radius: var(--radius-lg);
      text-align: center;

      .value {
        font-size: 1.5rem;
        font-weight: 600;
        margin-bottom: 0.25rem;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.5rem;

        svg {
          color: var(--primary-red-soft);
        }
      }

      .label {
        font-size: 0.875rem;
        color: var(--text-secondary);
      }
    }
  }

  .usage-chart {
    height: 200px;
    margin: 0 -1.5rem -1.5rem;
    padding: 1.5rem;
    background: var(--overlay-light);
    display: flex;
    align-items: flex-end;
    gap: 0.5rem;

    .bar {
      flex: 1;
      background: var(--primary-gradient);
      border-radius: var(--radius-sm);
      min-width: 20px;
      transition: height 0.3s ease;

      &:nth-child(even) {
        opacity: 0.7;
      }
    }
  }
`;

const SmartInsightsCard = styled(motion.div)`
  background: var(--glass-bg);
  border: var(--glass-border);
  border-radius: var(--radius-lg);
  padding: 1.5rem;

  .insights-header {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    margin-bottom: 1rem;
    color: var(--primary-red);
    font-weight: 500;

    svg {
      font-size: 1.5rem;
    }
  }

  .insights-list {
    display: flex;
    flex-direction: column;
    gap: 1rem;

    .insight-item {
      background: var(--overlay-light);
      padding: 1rem;
      border-radius: var(--radius-lg);
      display: flex;
      gap: 1rem;
      cursor: pointer;
      transition: all 0.3s ease;

      &:hover {
        transform: translateX(8px);
        background: var(--primary-red-soft);
      }

      .insight-icon {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background: var(--primary-gradient);
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
      }

      .insight-content {
        flex: 1;

        .insight-title {
          font-weight: 500;
          margin-bottom: 0.25rem;
        }

        .insight-description {
          font-size: 0.875rem;
          color: var(--text-secondary);
        }

        .insight-saving {
          margin-top: 0.5rem;
          color: var(--status-success);
          font-size: 0.875rem;
          font-weight: 500;
        }
      }
    }
  }
`;

const ScenesSection = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const SceneGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const SceneCard = styled(motion.div)<{ $active?: boolean }>`
  background: var(--glass-bg);
  border: var(--glass-border);
  border-radius: var(--radius-lg);
  padding: 1.5rem;
  position: relative;
  overflow: hidden;
  cursor: pointer;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: ${props => props.$active ? 'var(--primary-gradient)' : 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)'};
    opacity: 0.1;
  }

  .scene-icon {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    background: var(--primary-gradient);
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    margin-bottom: 1rem;
  }

  .scene-name {
    font-size: 1.125rem;
    font-weight: 500;
    margin-bottom: 0.5rem;
    color: ${props => props.$active ? 'var(--primary-red)' : 'var(--text-primary)'};
  }

  .scene-description {
    font-size: 0.875rem;
    color: var(--text-secondary);
    margin-bottom: 1rem;
  }

  .scene-devices {
    display: flex;
    gap: 0.5rem;
    flex-wrap: wrap;

    .device-tag {
      padding: 0.25rem 0.75rem;
      background: var(--overlay-light);
      border-radius: var(--radius-lg);
      font-size: 0.75rem;
      color: var(--text-secondary);
      display: flex;
      align-items: center;
      gap: 0.25rem;

      svg {
        font-size: 1rem;
      }
    }
  }
`;

const CreateSceneCard = styled(motion.button)`
  background: var(--glass-bg);
  border: var(--glass-border);
  border-radius: var(--radius-lg);
  padding: 1.5rem;
  width: 100%;
  text-align: left;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  min-height: 200px;

  .add-icon {
    width: 64px;
    height: 64px;
    border-radius: 50%;
    background: var(--overlay-light);
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--text-secondary);
    
    svg {
      font-size: 2rem;
    }
  }

  .add-text {
    color: var(--text-secondary);
    font-size: 0.875rem;
  }
`;

const SuggestedScenes = styled(motion.div)`
  background: var(--glass-bg);
  border: var(--glass-border);
  border-radius: var(--radius-lg);
  padding: 1.5rem;

  .suggestions-header {
    font-size: 1.125rem;
    font-weight: 500;
    margin-bottom: 1rem;
    display: flex;
    align-items: center;
    gap: 0.75rem;
    color: var(--primary-red);

    svg {
      font-size: 1.5rem;
    }
  }

  .suggestions-list {
    display: flex;
    flex-direction: column;
    gap: 1rem;

    .suggestion-item {
      background: var(--overlay-light);
      padding: 1rem;
      border-radius: var(--radius-lg);
      display: flex;
      align-items: center;
      gap: 1rem;
      cursor: pointer;
      transition: all 0.3s ease;

      &:hover {
        transform: translateX(8px);
        background: var(--primary-red-soft);
      }

      .suggestion-icon {
        width: 48px;
        height: 48px;
        border-radius: 50%;
        background: var(--primary-gradient);
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
      }

      .suggestion-content {
        flex: 1;

        .suggestion-title {
          font-weight: 500;
          margin-bottom: 0.25rem;
        }

        .suggestion-description {
          font-size: 0.875rem;
          color: var(--text-secondary);
        }
      }
    }
  }
`;

const DashboardContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem;
  
  @media (max-width: 768px) {
    padding: 0.5rem;
  }
`;

const WelcomeSection = styled.div`
  background: var(--bg-color-dark);
  border-radius: var(--radius-lg);
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.2),
              -5px -5px 10px rgba(255, 255, 255, 0.05);

  h1 {
    font-size: 1.75rem;
    margin: 0 0 0.5rem;
    color: var(--text-primary);
  }

  p {
    color: var(--text-secondary);
    margin: 0;
  }
`;

const RoomsSection = styled.div`
  margin-bottom: 2rem;
  overflow: hidden;

  h2 {
    font-size: 1.25rem;
    margin: 0 0 1rem;
    color: var(--text-primary);
  }
`;

const RoomsScroll = styled(motion.div)`
  display: flex;
  gap: 1rem;
  margin: 0 -1rem;
  padding: 0.5rem 1rem;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
  position: relative;

  &::-webkit-scrollbar {
    display: none;
  }

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
`;

const RoomCard = styled(motion.div)<{ $image: string; $active: boolean }>`
  min-width: 280px;
  aspect-ratio: 16/9;
  border-radius: var(--radius-lg);
  padding: 1.5rem;
  position: relative;
  cursor: pointer;
  overflow: hidden;
  scroll-snap-align: start;
  background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.7)),
              url(${props => props.$image});
  background-size: cover;
  background-position: center;
  box-shadow: ${props => props.$active ?
    'inset 3px 3px 6px rgba(0, 0, 0, 0.3), 0 3px 6px rgba(255, 99, 99, 0.2)' :
    '5px 5px 10px rgba(0, 0, 0, 0.2), -5px -5px 10px rgba(255, 255, 255, 0.05)'};

  .room-info {
        display: flex;
        align-items: center;
    gap: 0.75rem;
    color: white;
    font-size: 1.125rem;
        font-weight: 500;
    margin-bottom: 1rem;
        
        svg {
      font-size: 1.5rem;
          color: var(--primary-red);
    }
  }

  .room-temp {
      display: flex;
      align-items: center;
    gap: 0.5rem;
    color: ${props => props.$active ? 'var(--primary-red)' : 'rgba(255, 255, 255, 0.8)'};
    font-size: 1.25rem;
    margin-bottom: 0.5rem;

    svg {
      font-size: 1.5rem;
    }
  }

  .room-status {
    font-size: 0.875rem;
    color: rgba(255, 255, 255, 0.6);
  }
`;

const DevicesSection = styled.div`
  h2 {
        font-size: 1.25rem;
    margin: 0 0 1rem;
    color: var(--text-primary);
  }
`;

const DevicesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  margin-top: 1rem;
  
  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    gap: 0.75rem;
  }
`;

const StyledDeviceCard = styled(motion.div)<{ $active: boolean }>`
  background: var(--bg-color-dark);
  border-radius: var(--radius-lg);
  padding: 1.25rem;
  position: relative;
  overflow: hidden;
  cursor: pointer;
  box-shadow: ${props => props.$active ? 
    'inset 3px 3px 6px rgba(0, 0, 0, 0.2), inset -3px -3px 6px rgba(255, 255, 255, 0.05)' : 
    '5px 5px 10px rgba(0, 0, 0, 0.2), -5px -5px 10px rgba(255, 255, 255, 0.05)'};
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${props => props.$active ?
      'inset 4px 4px 8px rgba(0, 0, 0, 0.25), inset -4px -4px 8px rgba(255, 255, 255, 0.06)' :
      '8px 8px 16px rgba(0, 0, 0, 0.25), -8px -8px 16px rgba(255, 255, 255, 0.06)'};
  }

  .device-header {
    display: flex;
    align-items: flex-start;
    gap: 0.75rem;
    margin-bottom: 1rem;

    .icon {
      min-width: 40px;
  width: 40px;
  height: 40px;
  border-radius: var(--radius-lg);
      background: ${props => props.$active ? 
        'var(--primary-gradient)' : 
        'var(--bg-color-dark)'};
  display: flex;
  align-items: center;
  justify-content: center;
      color: ${props => props.$active ? 'white' : 'var(--text-secondary)'};
      box-shadow: ${props => props.$active ?
        'none' :
        'inset 2px 2px 4px rgba(0, 0, 0, 0.2), inset -2px -2px 4px rgba(255, 255, 255, 0.05)'};
      transition: all 0.3s ease;
    }

    .info {
      flex: 1;

      .name {
        font-size: 0.875rem;
        font-weight: 500;
        margin-bottom: 0.25rem;
        color: ${props => props.$active ? 'var(--primary-red)' : 'var(--text-color)'};
      }

      .status {
        font-size: 0.75rem;
  color: var(--text-secondary);
      }
    }
  }

  .device-image {
    width: 100%;
    height: 120px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 0.5rem;
    padding: 0.75rem;
    background: ${props => props.$active ? 
      'var(--bg-color-dark)' : 
      'var(--bg-color)'};
    border-radius: var(--radius-lg);
    box-shadow: ${props => props.$active ?
      'inset 2px 2px 4px rgba(0, 0, 0, 0.2), inset -2px -2px 4px rgba(255, 255, 255, 0.05)' :
      'none'};
    
    img {
      max-width: 100%;
      max-height: 100%;
      object-fit: contain;
      opacity: ${props => props.$active ? 1 : 0.7};
      transition: all 0.3s ease;
      filter: ${props => props.$active ? 'drop-shadow(0 4px 8px rgba(255, 59, 48, 0.2))' : 'none'};
    }
  }

  @media (max-width: 768px) {
    padding: 1rem;

    .device-header {
      gap: 0.625rem;
      margin-bottom: 0.75rem;

      .icon {
        width: 36px;
        height: 36px;
      }

      .info .name {
        font-size: 0.875rem;
      }

      .info .status {
        font-size: 0.75rem;
      }
    }

    .device-image {
      height: 100px;
      padding: 0.5rem;
    }
  }
`;

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [selectedRoom, setSelectedRoom] = useState('living');
  const [activeDevices, setActiveDevices] = useState<string[]>(['ac', 'tv']);

  // Filter devices by room and calculate active devices per room
  const roomDevices = useMemo(() => {
    const devicesByRoom = devices.reduce((acc, device) => {
      if (!acc[device.roomId]) {
        acc[device.roomId] = [];
      }
      acc[device.roomId].push(device);
      return acc;
    }, {} as Record<string, typeof devices>);

    return rooms.map(room => ({
      ...room,
      devices: devicesByRoom[room.id]?.length || 0,
      activeDevices: devicesByRoom[room.id]?.filter(d => activeDevices.includes(d.id)).length || 0
    }));
  }, [activeDevices]);

  // Filter devices for the selected room
  const filteredDevices = useMemo(() => 
    devices.filter(device => device.roomId === selectedRoom),
    [selectedRoom]
  );

  const handleDeviceClick = (deviceId: string, path: string) => {
    navigate(path, { 
      state: { 
        deviceId,
        roomId: selectedRoom,
        isActive: activeDevices.includes(deviceId)
      }
    });
  };

  const toggleDevice = (deviceId: string) => {
    setActiveDevices(prev =>
      prev.includes(deviceId)
        ? prev.filter(id => id !== deviceId)
        : [...prev, deviceId]
    );
  };

  return (
    <DashboardContainer>
      <HeaderSection />

      <RoomsSection>
        <h2>Rooms</h2>
        <RoomsScroll
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.2}
        >
          {roomDevices.map(room => (
          <RoomCard 
            key={room.id}
              $image={room.image}
            $active={selectedRoom === room.id}
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
                  {room.temperature}
              </div>
                <div className="room-status">{room.activeDevices} of {room.devices} devices active</div>
            </div>
          </RoomCard>
        ))}
      </RoomsScroll>
      </RoomsSection>

      <DevicesSection>
        <h2>Devices</h2>
        <DevicesGrid>
          {filteredDevices.map(device => (
            <StyledDeviceCard
              key={device.id}
              $active={activeDevices.includes(device.id)}
              onClick={() => handleDeviceClick(device.id, device.path)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="device-header">
                <div 
                  className="icon"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleDevice(device.id);
                  }}
                >
                  {device.icon}
              </div>
                <div className="info">
                  <h3>{device.name}</h3>
                  <p>{activeDevices.includes(device.id) ? device.status : 'Off'}</p>
              </div>
              </div>
              <div className="device-image">
                <img src={device.image} alt={device.name} />
              </div>
            </StyledDeviceCard>
          ))}
        </DevicesGrid>
      </DevicesSection>
    </DashboardContainer>
  );
};

export default Dashboard; 