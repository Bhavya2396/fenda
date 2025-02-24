import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { 
  Videocam, FlipCameraAndroid, Mic,
  MicOff, Brightness6, ZoomIn,
  NotificationsActive, Storage, Warning
} from '@mui/icons-material';
import DeviceControl from '../DeviceControl';

const VideoFeed = styled.div`
  position: relative;
  width: 100%;
  height: 240px;
  background: var(--bg-color-dark);
  border-radius: var(--radius-lg);
  overflow: hidden;
  box-shadow: inset 3px 3px 6px rgba(0, 0, 0, 0.2),
              inset -3px -3px 6px rgba(255, 255, 255, 0.05);

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .overlay {
    position: absolute;
    top: 1rem;
    left: 1rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem;
    background: rgba(0, 0, 0, 0.5);
    border-radius: var(--radius-md);
    color: white;

    .recording {
      width: 8px;
      height: 8px;
      background: var(--primary-red);
      border-radius: 50%;
      animation: blink 1s infinite;
    }

    .time {
      font-size: 0.875rem;
    }
  }

  @keyframes blink {
    0% { opacity: 1; }
    50% { opacity: 0.5; }
    100% { opacity: 1; }
  }
`;

const QuickControls = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  margin: 1.5rem 0;

  @media (max-width: 480px) {
    gap: 0.75rem;
  }
`;

const ControlButton = styled(motion.button)<{ $active?: boolean }>`
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

const Slider = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: var(--bg-color-dark);
  border-radius: var(--radius-lg);
  box-shadow: inset 3px 3px 6px rgba(0, 0, 0, 0.2),
              inset -3px -3px 6px rgba(255, 255, 255, 0.05);

  .icon {
    color: var(--primary-red);
  }

  .slider-track {
    flex: 1;
    height: 4px;
    background: var(--bg-color);
    border-radius: 2px;
    position: relative;
    cursor: pointer;

    .fill {
      position: absolute;
      left: 0;
      top: 0;
      height: 100%;
      background: var(--primary-red);
      border-radius: 2px;
    }

    .thumb {
      position: absolute;
      top: 50%;
      width: 16px;
      height: 16px;
      border-radius: 50%;
      background: var(--primary-red);
      transform: translate(-50%, -50%);
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    }
  }

  .value {
    font-size: 0.875rem;
    color: var(--text-secondary);
    min-width: 40px;
    text-align: right;
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

const SecurityCamera: React.FC = () => {
  const [isActive, setIsActive] = useState(false);
  const [isMicOn, setIsMicOn] = useState(false);
  const [brightness, setBrightness] = useState(70);
  const [zoom, setZoom] = useState(100);

  const controls = (
    <>
      <VideoFeed>
        <img src="/security-camera-feed.jpg" alt="Camera Feed" />
        <div className="overlay">
          <div className="recording" />
          <span className="time">LIVE</span>
        </div>
      </VideoFeed>

      <QuickControls>
        <ControlButton
          $active={isMicOn}
          onClick={() => setIsMicOn(!isMicOn)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {isMicOn ? <Mic /> : <MicOff />}
          <span>Audio</span>
        </ControlButton>
        <ControlButton
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <FlipCameraAndroid />
          <span>Rotate</span>
        </ControlButton>
        <ControlButton
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <NotificationsActive />
          <span>Alert</span>
        </ControlButton>
      </QuickControls>

      <Slider>
        <Brightness6 className="icon" />
        <div className="slider-track">
          <div className="fill" style={{ width: `${brightness}%` }} />
          <div className="thumb" style={{ left: `${brightness}%` }} />
        </div>
        <div className="value">{brightness}%</div>
      </Slider>

      <Slider style={{ marginTop: '1rem' }}>
        <ZoomIn className="icon" />
        <div className="slider-track">
          <div className="fill" style={{ width: `${zoom - 100}%` }} />
          <div className="thumb" style={{ left: `${zoom - 100}%` }} />
        </div>
        <div className="value">{zoom}%</div>
      </Slider>
    </>
  );

  const stats = (
    <Stats>
      <div className="stat-item">
        <div className="value">
          <Storage />
          128 GB
        </div>
        <div className="label">Storage Left</div>
      </div>
      <div className="stat-item">
        <div className="value">
          <Warning />
          2
        </div>
        <div className="label">Recent Alerts</div>
      </div>
    </Stats>
  );

  return (
    <DeviceControl
      title="Security Camera"
      icon={<Videocam />}
      image="/pngimg.com - security_camera_PNG2366.png"
      controls={controls}
      stats={stats}
      isActive={isActive}
      onToggle={() => setIsActive(!isActive)}
    />
  );
};

export default SecurityCamera; 