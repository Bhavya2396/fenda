import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import {
  Videocam,
  FlipCameraAndroid,
  Mic,
  MicOff,
  Brightness6,
  ZoomIn,
  NotificationsActive,
  Storage,
  Warning,
  PhotoCamera,
  ScreenRotation,
  Timer,
  Visibility
} from '@mui/icons-material';
import DeviceControl from '../DeviceControl';

const VideoFeed = styled.div`
  position: relative;
  width: 100%;
  height: 240px;
  background: linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.9)),
              repeating-linear-gradient(
                0deg,
                rgba(0, 0, 0, 0.2) 0px,
                rgba(0, 0, 0, 0.2) 1px,
                transparent 1px,
                transparent 2px
              );
  border-radius: var(--radius-lg);
  overflow: hidden;
  box-shadow: inset 3px 3px 6px rgba(0, 0, 0, 0.2),
              inset -3px -3px 6px rgba(255, 255, 255, 0.05);

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    opacity: 0.8;
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
    backdrop-filter: blur(4px);

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

  .motion-indicator {
    position: absolute;
    bottom: 1rem;
    right: 1rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem;
    background: rgba(0, 0, 0, 0.5);
    border-radius: var(--radius-md);
    color: white;
    backdrop-filter: blur(4px);

    svg {
      color: var(--primary-red);
      animation: pulse 2s infinite;
    }
  }

  @keyframes blink {
    0% { opacity: 1; }
    50% { opacity: 0.5; }
    100% { opacity: 1; }
  }

  @keyframes pulse {
    0% { transform: scale(1); opacity: 1; }
    50% { transform: scale(1.2); opacity: 0.8; }
    100% { transform: scale(1); opacity: 1; }
  }
`;

const QuickControls = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
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
    font-size: 0.75rem;
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
  margin-bottom: 1rem;

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

const Camera: React.FC = () => {
  const [isActive, setIsActive] = useState(false);
  const [isMicOn, setIsMicOn] = useState(false);
  const [brightness, setBrightness] = useState(70);
  const [zoom, setZoom] = useState(100);
  const [isMotionDetected, setIsMotionDetected] = useState(true);

  const controls = (
    <>
      <VideoFeed>
        <div className="overlay">
          <div className="recording" />
          <span className="time">LIVE</span>
        </div>
        {isMotionDetected && (
          <div className="motion-indicator">
            <Warning />
            <span>Motion Detected</span>
          </div>
        )}
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
          <PhotoCamera />
          <span>Snapshot</span>
        </ControlButton>
        <ControlButton
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <ScreenRotation />
          <span>Rotate</span>
        </ControlButton>
        <ControlButton
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Timer />
          <span>Timer</span>
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

      <Slider>
        <ZoomIn className="icon" />
        <div className="slider-track">
          <div className="fill" style={{ width: `${(zoom - 100) / 2}%` }} />
          <div className="thumb" style={{ left: `${(zoom - 100) / 2}%` }} />
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
          <Visibility />
          1080p
        </div>
        <div className="label">Resolution</div>
      </div>
    </Stats>
  );

  return (
    <DeviceControl
      title="Security Camera"
      icon={<Videocam />}
      image="/smart cctv.avif"
      controls={controls}
      stats={stats}
      isActive={isActive}
      onToggle={() => setIsActive(!isActive)}
    />
  );
};

export default Camera; 