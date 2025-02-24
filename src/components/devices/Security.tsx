import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { 
  ArrowBack, Power, Shield, ShieldOutlined, Videocam, 
  Lock, LockOpen, NotificationsActive, PersonOutline,
  Warning, CheckCircle, Timer
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 30px;

  button {
    background: none;
    border: none;
    cursor: pointer;
    padding: 10px;
    color: var(--text-primary);
  }

  h1 {
    font-size: 2rem;
    color: var(--text-primary);
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 20px;
`;

const Card = styled(motion.div)`
  background: var(--card-bg);
  border-radius: var(--border-radius-lg);
  padding: 30px;
  box-shadow: var(--card-shadow);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, rgba(124, 131, 253, 0.05) 0%, rgba(150, 186, 255, 0.05) 100%);
    z-index: 0;
  }
`;

const CameraGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
`;

const CameraFeed = styled(motion.div)`
  aspect-ratio: 16/9;
  background: #1a1a1a;
  border-radius: var(--border-radius-lg);
  position: relative;
  overflow: hidden;

  .camera-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(0deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0) 50%);
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    padding: 20px;
    color: white;
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &:hover .camera-overlay {
    opacity: 1;
  }

  .camera-name {
    font-weight: 500;
    margin-bottom: 5px;
  }

  .camera-status {
    font-size: 0.9rem;
    opacity: 0.8;
    display: flex;
    align-items: center;
    gap: 5px;
  }
`;

const StatusBar = styled(motion.div)<{ status: 'armed' | 'disarmed' | 'alert' }>`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 15px 20px;
  background: ${props => {
    switch (props.status) {
      case 'armed': return 'var(--success-color)';
      case 'disarmed': return 'var(--warning-color)';
      case 'alert': return '#FF4B4B';
      default: return 'var(--text-secondary)';
    }
  }};
  color: white;
  border-radius: var(--border-radius-lg);
  margin-bottom: 20px;
  font-weight: 500;
`;

const SecurityModes = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 15px;
  margin-bottom: 30px;
`;

const ModeButton = styled(motion.button)<{ active: boolean }>`
  padding: 20px;
  border-radius: var(--border-radius-lg);
  border: none;
  background: ${props => props.active ? 'var(--accent-gradient)' : 'var(--card-bg)'};
  color: ${props => props.active ? 'white' : 'var(--text-secondary)'};
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  font-family: var(--font-primary);
  box-shadow: ${props => props.active ? 'var(--button-shadow)' : 'none'};

  svg {
    font-size: 30px;
  }

  .mode-name {
    font-weight: 500;
  }

  .mode-description {
    font-size: 0.8rem;
    opacity: 0.8;
  }
`;

const EventsList = styled.div`
  margin-top: 20px;
`;

const EventItem = styled(motion.div)`
  padding: 15px;
  border-radius: var(--border-radius-lg);
  background: rgba(124, 131, 253, 0.05);
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  gap: 15px;

  .event-icon {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: var(--accent-color);
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
  }

  .event-details {
    flex: 1;

    .event-title {
      font-weight: 500;
      margin-bottom: 5px;
    }

    .event-time {
      font-size: 0.8rem;
      color: var(--text-secondary);
    }
  }
`;

type SecurityMode = 'away' | 'home' | 'night' | 'off';
type Camera = {
  id: string;
  name: string;
  location: string;
  status: 'active' | 'motion' | 'offline';
};
type Event = {
  id: string;
  type: 'motion' | 'door' | 'window' | 'alarm';
  title: string;
  time: string;
  camera?: string;
};

const cameras: Camera[] = [
  { id: 'cam1', name: 'Front Door', location: 'Entrance', status: 'active' },
  { id: 'cam2', name: 'Backyard', location: 'Garden', status: 'motion' },
  { id: 'cam3', name: 'Garage', location: 'Parking', status: 'active' },
  { id: 'cam4', name: 'Side Gate', location: 'Perimeter', status: 'offline' },
];

const Security: React.FC = () => {
  const navigate = useNavigate();
  const [isArmed, setIsArmed] = useState(true);
  const [mode, setMode] = useState<SecurityMode>('home');
  const [events, setEvents] = useState<Event[]>([
    {
      id: 'evt1',
      type: 'motion',
      title: 'Motion detected - Front Door',
      time: '2 mins ago',
      camera: 'cam1'
    },
    {
      id: 'evt2',
      type: 'door',
      title: 'Door opened - Garage',
      time: '15 mins ago',
      camera: 'cam3'
    },
    {
      id: 'evt3',
      type: 'window',
      title: 'Window sensor - Kitchen',
      time: '1 hour ago'
    }
  ]);

  const getEventIcon = (type: Event['type']) => {
    switch (type) {
      case 'motion': return <PersonOutline />;
      case 'door': return <Lock />;
      case 'window': return <Warning />;
      case 'alarm': return <NotificationsActive />;
    }
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
        <h1>Security System</h1>
      </Header>

      <Grid>
        <Card
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <StatusBar 
            status={isArmed ? 'armed' : 'disarmed'}
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.2 }}
          >
            {isArmed ? <Shield /> : <ShieldOutlined />}
            System is {isArmed ? 'Armed' : 'Disarmed'} - {mode.toUpperCase()} Mode
          </StatusBar>

          <CameraGrid>
            {cameras.map(camera => (
              <CameraFeed
                key={camera.id}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <div className="camera-overlay">
                  <div className="camera-name">{camera.name}</div>
                  <div className="camera-status">
                    <Videocam />
                    {camera.status === 'motion' ? 'Motion Detected' : 
                     camera.status === 'offline' ? 'Offline' : 'Active'}
                  </div>
                </div>
              </CameraFeed>
            ))}
          </CameraGrid>
        </Card>

        <Card
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <SecurityModes>
            <ModeButton
              active={mode === 'away'}
              onClick={() => setMode('away')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Lock />
              <span className="mode-name">Away</span>
              <span className="mode-description">Full security</span>
            </ModeButton>
            <ModeButton
              active={mode === 'home'}
              onClick={() => setMode('home')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Shield />
              <span className="mode-name">Home</span>
              <span className="mode-description">Basic monitoring</span>
            </ModeButton>
            <ModeButton
              active={mode === 'night'}
              onClick={() => setMode('night')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Timer />
              <span className="mode-name">Night</span>
              <span className="mode-description">Perimeter only</span>
            </ModeButton>
            <ModeButton
              active={mode === 'off'}
              onClick={() => setMode('off')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <LockOpen />
              <span className="mode-name">Off</span>
              <span className="mode-description">System disabled</span>
            </ModeButton>
          </SecurityModes>

          <EventsList>
            {events.map(event => (
              <EventItem
                key={event.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="event-icon">
                  {getEventIcon(event.type)}
                </div>
                <div className="event-details">
                  <div className="event-title">{event.title}</div>
                  <div className="event-time">{event.time}</div>
                </div>
              </EventItem>
            ))}
          </EventsList>
        </Card>
      </Grid>
    </Container>
  );
};

export default Security; 