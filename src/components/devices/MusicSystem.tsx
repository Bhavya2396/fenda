import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import {
  QueueMusic,
  VolumeUp,
  PlayArrow,
  Pause,
  SkipNext,
  SkipPrevious,
  Shuffle,
  RepeatOne,
  Favorite,
  Cast,
  GraphicEq,
  MusicNote,
  Radio,
  Podcasts,
  Album,
  Settings
} from '@mui/icons-material';
import DeviceControl from '../DeviceControl';

const NowPlaying = styled.div`
  background: var(--bg-color-dark);
  border-radius: var(--radius-lg);
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  box-shadow: inset 3px 3px 6px rgba(0, 0, 0, 0.2),
              inset -3px -3px 6px rgba(255, 255, 255, 0.05);

  .album-art {
    width: 200px;
    height: 200px;
    margin: 0 auto 1.5rem;
    border-radius: var(--radius-lg);
    overflow: hidden;
    box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.2),
                -5px -5px 10px rgba(255, 255, 255, 0.05);

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .track-info {
    text-align: center;

    .title {
      font-size: 1.25rem;
      font-weight: 600;
      margin-bottom: 0.5rem;
      color: var(--text-color);
    }

    .artist {
      font-size: 0.875rem;
      color: var(--text-secondary);
    }
  }
`;

const Progress = styled.div`
  margin: 1.5rem 0;

  .progress-bar {
    height: 4px;
    background: var(--bg-color);
    border-radius: 2px;
    position: relative;
    cursor: pointer;
    margin-bottom: 0.5rem;

    .fill {
      position: absolute;
      left: 0;
      top: 0;
      height: 100%;
      background: var(--primary-red);
      border-radius: 2px;
    }
  }

  .time {
    display: flex;
    justify-content: space-between;
    font-size: 0.75rem;
    color: var(--text-secondary);
  }
`;

const Controls = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const MainControls = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1.5rem;

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
`;

const QuickControls = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;

  @media (max-width: 480px) {
    gap: 0.75rem;
  }
`;

const QuickButton = styled(motion.button)<{ $active?: boolean }>`
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

const MusicSystem: React.FC = () => {
  const [isActive, setIsActive] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(60);
  const [progress, setProgress] = useState(35);
  const [isShuffle, setIsShuffle] = useState(false);
  const [isRepeat, setIsRepeat] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  const controls = (
    <>
      <NowPlaying>
        <div className="album-art">
          <img src="/album-cover.jpg" alt="Album Art" />
        </div>
        <div className="track-info">
          <div className="title">Blinding Lights</div>
          <div className="artist">The Weeknd • After Hours</div>
        </div>

        <Progress>
          <div className="progress-bar">
            <div className="fill" style={{ width: `${progress}%` }} />
          </div>
          <div className="time">
            <span>2:15</span>
            <span>4:30</span>
          </div>
        </Progress>
      </NowPlaying>

      <Controls>
        <MainControls>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsShuffle(!isShuffle)}
            style={{ color: isShuffle ? 'var(--primary-red)' : undefined }}
          >
            <Shuffle />
          </motion.button>
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
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsRepeat(!isRepeat)}
            style={{ color: isRepeat ? 'var(--primary-red)' : undefined }}
          >
            <RepeatOne />
          </motion.button>
        </MainControls>

        <VolumeControl>
          <VolumeUp className="icon" />
          <div className="slider">
            <div className="fill" style={{ width: `${volume}%` }} />
            <div className="thumb" style={{ left: `${volume}%` }} />
          </div>
          <div className="value">{volume}%</div>
        </VolumeControl>

        <QuickControls>
          <QuickButton
            $active={isFavorite}
            onClick={() => setIsFavorite(!isFavorite)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Favorite />
            <span>Favorite</span>
          </QuickButton>
          <QuickButton
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <GraphicEq />
            <span>Equalizer</span>
          </QuickButton>
          <QuickButton
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Cast />
            <span>Cast</span>
          </QuickButton>
          <QuickButton
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Settings />
            <span>Settings</span>
          </QuickButton>
        </QuickControls>
      </Controls>
    </>
  );

  const stats = (
    <Stats>
      <div className="stat-item">
        <div className="value">
          <Cast />
          Living Room
        </div>
        <div className="label">Output Device</div>
      </div>
      <div className="stat-item">
        <div className="value">
          <GraphicEq />
          Rock
        </div>
        <div className="label">EQ Preset</div>
      </div>
    </Stats>
  );

  return (
    <DeviceControl
      title="Music System"
      icon={<QueueMusic />}
      image="/pngtree-creative-ways-to-integrate-smart-speakers-into-your-home-png-image_13396551.png"
      controls={controls}
      stats={stats}
      isActive={isActive}
      onToggle={() => setIsActive(!isActive)}
    />
  );
};

export default MusicSystem; 