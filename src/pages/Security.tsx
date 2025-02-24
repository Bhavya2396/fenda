import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { 
  ArrowBack, Videocam, Lock, LockOpen, Notifications,
  NotificationsOff, Shield, Warning, CheckCircle,
  CameraIndoor, DoorFront, Sensors, History,
  NotificationsActive, Settings, MoreVert
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const LogItem = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.75rem;
  background: var(--bg-color);
  border-radius: var(--radius-lg);
  box-shadow: inset 3px 3px 6px rgba(0, 0, 0, 0.2),
              inset -3px -3px 6px rgba(255, 255, 255, 0.05);

  .icon {
    width: 40px;
    height: 40px;
    border-radius: var(--radius-lg);
    background: var(--bg-color-dark);
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--primary-red);
    flex-shrink: 0;
  }

  .info {
    flex: 1;

    .title {
      font-size: 0.875rem;
      font-weight: 500;
      margin-bottom: 0.25rem;
    }

    .timestamp {
      font-size: 0.75rem;
      color: var(--text-secondary);
    }
  }
`;

// Stock images from Unsplash (free to use)
const images = {
  doorCamera: "https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=1000&q=80", // Security camera image
  frontDoor: "https://images.unsplash.com/photo-1506076177893-89d54794ef41?auto=format&fit=crop&w=1000&q=80", // Modern front door
  backyard: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&w=1000&q=80", // Backyard security camera view
  garage: "https://images.unsplash.com/photo-1595853035070-59a39fe84de3?auto=format&fit=crop&w=1000&q=80" // Garage door with security
};

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

const StatusCard = styled(motion.div)`
  background: var(--bg-color-dark);
  border-radius: var(--radius-lg);
  padding: 1.5rem;
  margin-bottom: 1rem;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.2),
              -5px -5px 10px rgba(255, 255, 255, 0.05);

  .status-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 1.5rem;

    .status-info {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      color: var(--success-color);

  svg {
    font-size: 1.5rem;
      }
    }

    .timestamp {
      font-size: 0.875rem;
      color: var(--text-secondary);
    }
  }

  .status-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
  }
`;

const StatusItem = styled.div`
  background: var(--bg-color);
  border-radius: var(--radius-lg);
  padding: 1rem;
  box-shadow: inset 3px 3px 6px rgba(0, 0, 0, 0.2),
              inset -3px -3px 6px rgba(255, 255, 255, 0.05);

  .item-header {
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

  .item-value {
    font-size: 1.25rem;
    font-weight: 500;
    margin-bottom: 0.25rem;
  }

  .item-status {
    font-size: 0.75rem;
    color: var(--text-secondary);
  }
`;

const DeviceGrid = styled.div`
  display: flex;
  overflow-x: auto;
  gap: 1rem;
  margin: 0 -1rem 1rem;
  padding: 0.5rem 1rem;
  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
  
  &::-webkit-scrollbar {
    display: none;
  }

  @media (min-width: 768px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    overflow-x: visible;
    margin: 0 0 1rem;
    padding: 0;
  }
`;

const DeviceCard = styled(motion.div)`
  min-width: 280px;
  flex-shrink: 0;
  scroll-snap-align: start;
  background: var(--bg-color-dark);
  border-radius: var(--radius-lg);
  padding: 1.5rem;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.2),
              -5px -5px 10px rgba(255, 255, 255, 0.05);

  @media (min-width: 768px) {
    min-width: unset;
  }

  .device-header {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 1rem;

    .icon {
      width: 48px;
      height: 48px;
      border-radius: var(--radius-lg);
      background: var(--bg-color);
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--primary-red);
      box-shadow: inset 3px 3px 6px rgba(0, 0, 0, 0.2),
                  inset -3px -3px 6px rgba(255, 255, 255, 0.05);

      svg {
        font-size: 1.75rem;
      }
    }

    .info {
      flex: 1;

      .name {
        font-size: 1.125rem;
        font-weight: 500;
        margin-bottom: 0.25rem;
      }

      .status {
        font-size: 0.875rem;
        color: var(--text-secondary);
      }
    }

    .actions {
  button {
        width: 32px;
        height: 32px;
        border-radius: 50%;
    border: none;
    background: var(--bg-color);
    color: var(--text-color);
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
        transition: all 0.2s ease;

    &:hover {
      background: var(--bg-color-lighter);
          color: var(--primary-red);
          transform: scale(1.1);
        }

        svg {
          font-size: 1.25rem;
        }
      }
    }
  }

  .device-content {
    img {
      width: 100%;
      height: 160px;
      object-fit: cover;
      border-radius: var(--radius-lg);
      margin-bottom: 1rem;
    }

    .controls {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 0.5rem;

      button {
        padding: 0.75rem;
        border: none;
        border-radius: var(--radius-lg);
        background: var(--bg-color);
        color: var(--text-color);
        font-size: 0.875rem;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.5rem;
        transition: all 0.2s ease;
        box-shadow: 3px 3px 6px rgba(0, 0, 0, 0.2),
                    -3px -3px 6px rgba(255, 255, 255, 0.05);

        &:hover {
          background: var(--bg-color-lighter);
          color: var(--primary-red);
        }

        &:active {
          box-shadow: inset 2px 2px 4px rgba(0, 0, 0, 0.2),
                      inset -2px -2px 4px rgba(255, 255, 255, 0.05);
        }

        svg {
          font-size: 1.25rem;
        }
      }
    }
  }
`;

const ActivityLog = styled(motion.div)`
  background: var(--bg-color-dark);
  border-radius: var(--radius-lg);
  padding: 1.5rem;
  margin-top: 1rem;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.2),
              -5px -5px 10px rgba(255, 255, 255, 0.05);

  .log-header {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 1rem;
    color: var(--primary-red);
    font-weight: 500;

    svg {
      font-size: 1.25rem;
    }
  }

  .log-list {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    max-height: 300px;
    overflow-y: auto;
    padding-right: 0.5rem;
    margin-right: -0.5rem;

    &::-webkit-scrollbar {
      width: 4px;
    }

    &::-webkit-scrollbar-track {
      background: var(--bg-color);
      border-radius: 2px;
    }

    &::-webkit-scrollbar-thumb {
      background: var(--primary-red);
      border-radius: 2px;
    }
  }
`;

const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  height: 160px;
  border-radius: var(--radius-lg);
  overflow: hidden;
  margin-bottom: 1rem;
  background: var(--bg-color);
  box-shadow: inset 3px 3px 6px rgba(0, 0, 0, 0.2),
              inset -3px -3px 6px rgba(255, 255, 255, 0.05);

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
  }

  &:hover img {
    transform: scale(1.05);
  }

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      180deg,
      rgba(0, 0, 0, 0) 0%,
      rgba(0, 0, 0, 0.4) 100%
    );
    pointer-events: none;
  }

  .live-indicator {
    position: absolute;
    top: 1rem;
    right: 1rem;
    background: var(--primary-red);
    color: white;
    padding: 0.25rem 0.5rem;
    border-radius: var(--radius-sm);
    font-size: 0.75rem;
    font-weight: 500;
    display: flex;
    align-items: center;
    gap: 0.25rem;
    z-index: 1;

    &::before {
      content: '';
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: white;
      animation: pulse 1.5s infinite;
    }
  }

  @keyframes pulse {
    0% {
      transform: scale(0.95);
      opacity: 0.8;
    }
    50% {
      transform: scale(1);
      opacity: 1;
    }
    100% {
      transform: scale(0.95);
      opacity: 0.8;
    }
  }
`;

const SecurityPage: React.FC = () => {
  const navigate = useNavigate();
  const [systemArmed, setSystemArmed] = useState(true);

  return (
    <Container>
        <Header>
        <BackButton onClick={() => navigate('/')}>
            <ArrowBack />
        </BackButton>
        <Title>Security Monitor</Title>
        </Header>

      <StatusCard
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="status-header">
          <div className="status-info">
            <Shield />
            <span>{systemArmed ? 'System Armed' : 'System Disarmed'}</span>
          </div>
          <div className="timestamp">Last checked: 2 min ago</div>
        </div>

        <div className="status-grid">
          <StatusItem>
            <div className="item-header">
              <DoorFront />
              Doors
            </div>
            <div className="item-value">All Secured</div>
            <div className="item-status">4/4 doors locked</div>
          </StatusItem>
          <StatusItem>
            <div className="item-header">
              <Sensors />
              Motion Sensors
            </div>
            <div className="item-value">Active</div>
            <div className="item-status">No movement detected</div>
          </StatusItem>
          <StatusItem>
            <div className="item-header">
              <CameraIndoor />
              Cameras
            </div>
            <div className="item-value">All Online</div>
            <div className="item-status">4 cameras recording</div>
          </StatusItem>
          <StatusItem>
            <div className="item-header">
              <NotificationsActive />
              Alerts
            </div>
            <div className="item-value">Enabled</div>
            <div className="item-status">Push & SMS notifications</div>
          </StatusItem>
        </div>
      </StatusCard>

      <DeviceGrid>
        <DeviceCard
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="device-header">
            <div className="icon">
              <CameraIndoor />
            </div>
            <div className="info">
              <div className="name">Front Door Camera</div>
              <div className="status">Recording • Motion detected</div>
            </div>
            <div className="actions">
              <button>
                <MoreVert />
              </button>
            </div>
          </div>
          <div className="device-content">
            <ImageContainer>
              <div className="live-indicator">LIVE</div>
              <img src={images.doorCamera} alt="Front Door Camera Feed" />
            </ImageContainer>
            <div className="controls">
              <button>
                <Videocam />
                Live View
              </button>
              <button>
                <History />
                History
              </button>
            </div>
          </div>
        </DeviceCard>

        <DeviceCard
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="device-header">
            <div className="icon">
              <DoorFront />
            </div>
            <div className="info">
              <div className="name">Main Entrance</div>
              <div className="status">Locked • Last accessed 2h ago</div>
            </div>
            <div className="actions">
              <button>
                <MoreVert />
              </button>
            </div>
          </div>
          <div className="device-content">
            <ImageContainer>
              <img src={images.frontDoor} alt="Door Status" />
            </ImageContainer>
            <div className="controls">
              <button>
                <Lock />
                Lock
              </button>
              <button>
                <LockOpen />
                Unlock
              </button>
            </div>
          </div>
        </DeviceCard>

        <DeviceCard
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="device-header">
            <div className="icon">
              <CameraIndoor />
            </div>
            <div className="info">
              <div className="name">Backyard Camera</div>
              <div className="status">Recording • All clear</div>
            </div>
            <div className="actions">
              <button>
                <MoreVert />
              </button>
            </div>
          </div>
          <div className="device-content">
            <ImageContainer>
              <div className="live-indicator">LIVE</div>
              <img src={images.backyard} alt="Backyard Camera Feed" />
            </ImageContainer>
            <div className="controls">
              <button>
                <Videocam />
                Live View
              </button>
              <button>
                <History />
                History
              </button>
            </div>
          </div>
        </DeviceCard>

        <DeviceCard
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="device-header">
            <div className="icon">
              <DoorFront />
            </div>
            <div className="info">
              <div className="name">Garage Door</div>
              <div className="status">Closed • Last accessed 5h ago</div>
            </div>
            <div className="actions">
              <button>
                <MoreVert />
              </button>
            </div>
          </div>
          <div className="device-content">
            <ImageContainer>
              <img src={images.garage} alt="Garage Door Status" />
            </ImageContainer>
            <div className="controls">
              <button>
                <Lock />
                Close
              </button>
              <button>
                <LockOpen />
                Open
              </button>
            </div>
          </div>
        </DeviceCard>
      </DeviceGrid>

      <ActivityLog
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <div className="log-header">
          <History />
          Recent Activity
        </div>
        <div className="log-list">
          <LogItem>
            <div className="icon">
              <CameraIndoor />
            </div>
            <div className="info">
              <div className="title">Motion detected - Front Door Camera</div>
              <div className="timestamp">2 minutes ago</div>
            </div>
          </LogItem>
          <LogItem>
            <div className="icon">
              <DoorFront />
            </div>
            <div className="info">
              <div className="title">Door unlocked - Main Entrance</div>
              <div className="timestamp">2 hours ago</div>
            </div>
          </LogItem>
          <LogItem>
            <div className="icon">
              <Shield />
            </div>
            <div className="info">
              <div className="title">System armed</div>
              <div className="timestamp">5 hours ago</div>
            </div>
          </LogItem>
        </div>
      </ActivityLog>
    </Container>
  );
};

export default SecurityPage; 