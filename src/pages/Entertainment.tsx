import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { 
  ArrowBack, Tv, VolumeUp, PlayArrow, Pause,
  SkipNext, SkipPrevious, Shuffle, RepeatOne,
  QueueMusic, Favorite, Add, MoreVert,
  Cast, CastConnected, Apps, Movie,
  LiveTv, SportsEsports, YouTube, Settings,
  Podcasts, MusicNote, Radio
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

// Stock images from public folder
const images = {
  livingRoom: "/drawingroomdesignbestdrawingroomdesignideaslivingroominteriordesi251671005634.webp",
  bedroom: "/Home-office-inspiration-by-Annie-L-345x.webp",
  smartTv: "/pngimg.com - smart_tv_PNG23.png",
  smartSpeaker: "/49364-1-air-purifier-download-hd-png.webp",
  movieThumbnail: "/larchmont-by-chaunceyboothby-010-kitchen-6552564e738df.avif",
  albumCover: "/Home-office-inspiration-by-Annie-L-345x.webp"
};

// Streaming apps data
const streamingApps = [
  { id: 'netflix', name: 'Netflix', icon: <Movie />, color: '#E50914' },
  { id: 'youtube', name: 'YouTube', icon: <YouTube />, color: '#FF0000' },
  { id: 'prime', name: 'Prime Video', icon: <LiveTv />, color: '#00A8E1' },
  { id: 'spotify', name: 'Spotify', icon: <MusicNote />, color: '#1DB954' },
  { id: 'gaming', name: 'Gaming', icon: <SportsEsports />, color: '#9147FF' },
  { id: 'podcasts', name: 'Podcasts', icon: <Podcasts />, color: '#9933FF' }
];

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

const DeviceCard = styled(motion.div)`
  background: var(--bg-color-dark);
  border-radius: var(--radius-lg);
  padding: 1.5rem;
  margin-bottom: 1rem;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.2),
              -5px -5px 10px rgba(255, 255, 255, 0.05);

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

      img {
        width: 32px;
        height: 32px;
        object-fit: contain;
      }

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
  }
`;

const MediaControls = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  .now-playing {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 1rem;
    background: var(--bg-color);
    border-radius: var(--radius-lg);
    box-shadow: inset 3px 3px 6px rgba(0, 0, 0, 0.2),
                inset -3px -3px 6px rgba(255, 255, 255, 0.05);

    img {
      width: 64px;
      height: 64px;
      border-radius: var(--radius-lg);
      object-fit: cover;
    }

    .track-info {
      flex: 1;

      .title {
        font-weight: 500;
        margin-bottom: 0.25rem;
      }

      .artist {
        font-size: 0.875rem;
        color: var(--text-secondary);
      }
    }

    .actions {
      display: flex;
      gap: 0.5rem;

      button {
        width: 32px;
        height: 32px;
        border-radius: 50%;
        border: none;
        background: var(--bg-color-dark);
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

        &:active {
          transform: scale(0.95);
        }

        svg {
          font-size: 1.25rem;
        }
      }
    }
  }

  .playback-controls {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    padding: 1rem;

    button {
      width: 48px;
      height: 48px;
      border-radius: 50%;
      border: none;
      background: var(--bg-color);
      color: var(--text-color);
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.2s ease;
      box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.2),
                  -5px -5px 10px rgba(255, 255, 255, 0.05);

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
        transform: scale(1.1);
      }

      &:active {
        transform: scale(0.95);
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
  background: var(--bg-color);
  border-radius: var(--radius-lg);
  box-shadow: inset 3px 3px 6px rgba(0, 0, 0, 0.2),
              inset -3px -3px 6px rgba(255, 255, 255, 0.05);

  .icon {
    color: var(--primary-red);
  }

  .slider {
    flex: 1;
    height: 4px;
    background: var(--bg-color-dark);
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

const AppGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  gap: 1rem;
  margin: 1rem 0;
`;

const AppButton = styled.button<{ $color: string }>`
  background: var(--bg-color-dark);
  border: none;
  border-radius: var(--radius-lg);
  padding: 1rem;
  color: var(--text-color);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.2),
              -5px -5px 10px rgba(255, 255, 255, 0.05);

  .icon {
    width: 48px;
    height: 48px;
    border-radius: var(--radius-lg);
    background: var(--bg-color);
    display: flex;
    align-items: center;
    justify-content: center;
    color: ${props => props.$color};
    box-shadow: inset 3px 3px 6px rgba(0, 0, 0, 0.2),
                inset -3px -3px 6px rgba(255, 255, 255, 0.05);

    svg {
      font-size: 1.75rem;
    }
  }

  .name {
    font-size: 0.875rem;
    text-align: center;
  }

  &:hover {
    transform: translateY(-2px);
    box-shadow: 6px 6px 12px rgba(0, 0, 0, 0.3),
                -6px -6px 12px rgba(255, 255, 255, 0.06);
  }

  &:active {
    transform: translateY(0);
    box-shadow: inset 3px 3px 6px rgba(0, 0, 0, 0.2),
                inset -3px -3px 6px rgba(255, 255, 255, 0.05);
  }
`;

const CastingSection = styled.div`
  background: var(--bg-color-dark);
  border-radius: var(--radius-lg);
  padding: 1.5rem;
  margin-bottom: 1rem;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.2),
              -5px -5px 10px rgba(255, 255, 255, 0.05);

  .section-header {
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
`;

const DeviceList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const DeviceItem = styled.button<{ $connected?: boolean }>`
  display: flex;
  align-items: center;
  gap: 1rem;
  width: 100%;
  padding: 1rem;
  background: var(--bg-color);
  border: none;
  border-radius: var(--radius-lg);
  color: var(--text-color);
  cursor: pointer;
  box-shadow: ${props => props.$connected ?
    'inset 3px 3px 6px rgba(0, 0, 0, 0.2), inset -3px -3px 6px rgba(255, 255, 255, 0.05)' :
    '3px 3px 6px rgba(0, 0, 0, 0.2), -3px -3px 6px rgba(255, 255, 255, 0.05)'};
  transition: all 0.3s ease;

  .icon {
    color: ${props => props.$connected ? 'var(--primary-red)' : 'var(--text-secondary)'};
  }

  .info {
    flex: 1;
    text-align: left;

    .name {
      font-size: 0.875rem;
      font-weight: 500;
      margin-bottom: 0.25rem;
    }

    .status {
      font-size: 0.75rem;
      color: var(--text-secondary);
    }
  }

  &:hover {
    background: var(--bg-color-light);
  }
`;

const EntertainmentPage: React.FC = () => {
  const navigate = useNavigate();
  const [selectedApp, setSelectedApp] = useState<string | null>(null);
  const [connectedDevices, setConnectedDevices] = useState<string[]>(['Living Room TV']);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(50);

  const handleDeviceToggle = (deviceName: string) => {
    setConnectedDevices(prev => 
      prev.includes(deviceName)
        ? prev.filter(d => d !== deviceName)
        : [...prev, deviceName]
    );
  };

  const handleAppSelect = (appId: string) => {
    setSelectedApp(appId);
  };

  return (
    <Container>
      <Header>
        <BackButton onClick={() => navigate('/')}>
          <ArrowBack />
        </BackButton>
        <Title>Entertainment</Title>
      </Header>

      <CastingSection>
        <div className="section-header">
          <Cast />
          Available Devices
        </div>
        <DeviceList>
          <DeviceItem
            $connected={connectedDevices.includes('Living Room TV')}
            onClick={() => handleDeviceToggle('Living Room TV')}
          >
            <div className="icon">
              {connectedDevices.includes('Living Room TV') ? <CastConnected /> : <Cast />}
            </div>
            <div className="info">
              <div className="name">Living Room TV</div>
              <div className="status">
                {connectedDevices.includes('Living Room TV') ? 'Connected' : 'Available'}
              </div>
            </div>
          </DeviceItem>
          <DeviceItem
            $connected={connectedDevices.includes('Bedroom TV')}
            onClick={() => handleDeviceToggle('Bedroom TV')}
          >
            <div className="icon">
              {connectedDevices.includes('Bedroom TV') ? <CastConnected /> : <Cast />}
            </div>
            <div className="info">
              <div className="name">Bedroom TV</div>
              <div className="status">
                {connectedDevices.includes('Bedroom TV') ? 'Connected' : 'Available'}
              </div>
            </div>
          </DeviceItem>
          <DeviceItem
            $connected={connectedDevices.includes('Smart Speaker')}
            onClick={() => handleDeviceToggle('Smart Speaker')}
          >
            <div className="icon">
              {connectedDevices.includes('Smart Speaker') ? <CastConnected /> : <Cast />}
            </div>
            <div className="info">
              <div className="name">Smart Speaker</div>
              <div className="status">
                {connectedDevices.includes('Smart Speaker') ? 'Connected' : 'Available'}
              </div>
            </div>
          </DeviceItem>
        </DeviceList>
      </CastingSection>

      <DeviceCard
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="device-header">
          <div className="icon">
            <Apps />
          </div>
          <div className="info">
            <div className="name">Streaming Apps</div>
            <div className="status">Select an app to stream</div>
          </div>
        </div>
        <AppGrid>
          {streamingApps.map(app => (
            <AppButton
              key={app.id}
              $color={app.color}
              onClick={() => handleAppSelect(app.id)}
            >
              <div className="icon">
                {app.icon}
              </div>
              <div className="name">{app.name}</div>
            </AppButton>
          ))}
        </AppGrid>
      </DeviceCard>

      <DeviceCard
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="device-header">
          <div className="icon">
            <img src={images.smartTv} alt="Smart TV" />
          </div>
          <div className="info">
            <div className="name">Smart TV</div>
            <div className="status">
              {selectedApp ? `Playing from ${
                streamingApps.find(app => app.id === selectedApp)?.name
              }` : 'Select an app to start'}
            </div>
          </div>
          <div className="actions">
            <button>
              <MoreVert />
            </button>
          </div>
        </div>

        <MediaControls>
          <div className="now-playing">
            <img src={images.movieThumbnail} alt="Movie Thumbnail" />
            <div className="track-info">
              <div className="title">Interstellar</div>
              <div className="artist">Now Playing • 1:42:15</div>
            </div>
            <div className="actions">
              <button>
                <Favorite />
              </button>
              <button>
                <Cast />
              </button>
            </div>
          </div>

          <div className="playback-controls">
            <button>
              <Shuffle />
            </button>
            <button>
              <SkipPrevious />
            </button>
            <button className="play-pause" onClick={() => setIsPlaying(!isPlaying)}>
              {isPlaying ? <Pause /> : <PlayArrow />}
            </button>
            <button>
              <SkipNext />
            </button>
            <button>
              <RepeatOne />
            </button>
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
      </DeviceCard>

      <DeviceCard
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <div className="device-header">
          <div className="icon">
            <img src={images.smartSpeaker} alt="Smart Speaker" />
          </div>
          <div className="info">
            <div className="name">Smart Speaker</div>
            <div className="status">
              {selectedApp ? `Playing from ${
                streamingApps.find(app => app.id === selectedApp)?.name
              }` : 'Select an app to start'}
            </div>
          </div>
          <div className="actions">
            <button>
              <MoreVert />
            </button>
          </div>
        </div>

        <MediaControls>
          <div className="now-playing">
            <img src={images.albumCover} alt="Album Cover" />
            <div className="track-info">
              <div className="title">Blinding Lights</div>
              <div className="artist">The Weeknd • After Hours</div>
            </div>
            <div className="actions">
              <button>
                <Favorite />
              </button>
              <button>
                <Cast />
              </button>
            </div>
          </div>

          <div className="playback-controls">
            <button>
              <Shuffle />
            </button>
            <button>
              <SkipPrevious />
            </button>
            <button className="play-pause">
              <PlayArrow />
            </button>
            <button>
              <SkipNext />
            </button>
            <button>
              <RepeatOne />
            </button>
          </div>

          <VolumeControl>
            <VolumeUp className="icon" />
            <div className="slider">
              <div className="fill" style={{ width: "65%" }} />
              <div className="thumb" style={{ left: "65%" }} />
            </div>
            <div className="value">65%</div>
          </VolumeControl>
        </MediaControls>
      </DeviceCard>
    </Container>
  );
};

export default EntertainmentPage; 