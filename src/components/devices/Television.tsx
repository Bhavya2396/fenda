import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import {
  Tv as TvIcon,
  Movie as MovieIcon,
  SportsEsports as GamesIcon,
  YouTube as YouTubeIcon,
  LiveTv as LiveTvIcon,
  Apps as AppsIcon,
  Cast,
  Settings,
  VolumeUp,
  PlayArrow,
  Pause,
  SkipNext,
  SkipPrevious
} from '@mui/icons-material';
import DeviceControl from '../DeviceControl';

const AppsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  margin-bottom: 2rem;

  @media (max-width: 480px) {
    gap: 0.75rem;
  }
`;

const AppButton = styled(motion.button)<{ $active: boolean }>`
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

const MediaControls = styled.div`
  .now-playing {
    background: var(--bg-color-dark);
    border-radius: var(--radius-lg);
    padding: 1rem;
    margin-bottom: 1rem;
    box-shadow: inset 3px 3px 6px rgba(0, 0, 0, 0.2),
                inset -3px -3px 6px rgba(255, 255, 255, 0.05);

    img {
      width: 100%;
      height: 160px;
      object-fit: cover;
      border-radius: var(--radius-md);
      margin-bottom: 1rem;
    }

    .info {
      text-align: center;

      .title {
        font-size: 1.125rem;
        font-weight: 500;
        margin-bottom: 0.25rem;
        color: var(--text-color);
      }

      .subtitle {
        font-size: 0.875rem;
        color: var(--text-secondary);
      }
    }
  }

  .controls {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    margin: 1.5rem 0;

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

      &.play-pause {
        width: 64px;
        height: 64px;
        background: var(--primary-red);
        color: white;

        svg {
          font-size: 2rem;
        }
      }

      &:hover {
        transform: translateY(-2px);
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

const VolumeControl = styled.div`
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

  .slider {
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

const Television: React.FC = () => {
  const [isActive, setIsActive] = useState(false);
  const [volume, setVolume] = useState(50);
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedApp, setSelectedApp] = useState<string>('netflix');

  const apps = [
    { id: 'netflix', icon: <MovieIcon />, name: 'Netflix' },
    { id: 'youtube', icon: <YouTubeIcon />, name: 'YouTube' },
    { id: 'prime', icon: <LiveTvIcon />, name: 'Prime' },
    { id: 'gaming', icon: <GamesIcon />, name: 'Gaming' },
    { id: 'apps', icon: <AppsIcon />, name: 'Apps' },
    { id: 'settings', icon: <Settings />, name: 'Settings' }
  ];

  const controls = (
    <>
      <AppsGrid>
        {apps.map(app => (
          <AppButton
            key={app.id}
            $active={selectedApp === app.id}
            onClick={() => setSelectedApp(app.id)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {app.icon}
            <span>{app.name}</span>
          </AppButton>
        ))}
      </AppsGrid>

      <MediaControls>
        <div className="now-playing">
          <img src="/larchmont-by-chaunceyboothby-010-kitchen-6552564e738df.avif" alt="Now Playing" />
          <div className="info">
            <div className="title">Stranger Things</div>
            <div className="subtitle">Season 4 Episode 1</div>
          </div>
        </div>

        <div className="controls">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <SkipPrevious />
          </motion.button>
          <motion.button
            className="play-pause"
            onClick={() => setIsPlaying(!isPlaying)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {isPlaying ? <Pause /> : <PlayArrow />}
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <SkipNext />
          </motion.button>
        </div>

        <VolumeControl>
          <VolumeUp className="icon" />
          <div className="slider">
            <div className="fill" style={{ width: `${volume}%` }} />
            <div className="thumb" style={{ left: `${volume}%` }} />
          </div>
          <div className="value">{volume}%</div>
        </VolumeControl>
      </MediaControls>
    </>
  );

  const stats = (
    <Stats>
      <div className="stat-item">
        <div className="value">
          <Cast />
          Living Room
        </div>
        <div className="label">Connected Device</div>
      </div>
      <div className="stat-item">
        <div className="value">
          <TvIcon />
          4K HDR
        </div>
        <div className="label">Quality</div>
      </div>
    </Stats>
  );

  return (
    <DeviceControl
      title="Smart TV"
      icon={<TvIcon />}
      image="/pngtree-led-tv-television-screen-vector-png-image_6673700.png"
      controls={controls}
      stats={stats}
      isActive={isActive}
      onToggle={() => setIsActive(!isActive)}
    />
  );
};

export default Television; 