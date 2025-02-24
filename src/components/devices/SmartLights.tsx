import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { ArrowBack, Power, WbSunny, Opacity, ColorLens, Lightbulb, NightsStay, Weekend, LocalBar, Movie } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
  max-width: 800px;
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

const PowerButton = styled(motion.button)<{ isOn: boolean }>`
  position: absolute;
  top: 30px;
  right: 30px;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  border: none;
  background: ${props => props.isOn ? 'var(--accent-gradient)' : '#ccc'};
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: var(--button-shadow);
  z-index: 1;
`;

interface ColorWheelProps {
  selectedColor: string;
}

const ColorWheel = styled(motion.div)<ColorWheelProps>`
  width: 300px;
  height: 300px;
  border-radius: 50%;
  margin: 40px auto;
  position: relative;
  background: conic-gradient(
    red, orange, yellow, lime, aqua, blue, purple, magenta, red
  );
  box-shadow: 
    inset 0 0 50px rgba(0, 0, 0, 0.2),
    0 0 30px ${props => props.selectedColor}40;

  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 80%;
    height: 80%;
    border-radius: 50%;
    background: var(--card-bg);
  }

  &::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 30%;
    height: 30%;
    border-radius: 50%;
    background: ${props => props.selectedColor};
    box-shadow: 0 0 20px ${props => props.selectedColor}80;
    transition: all 0.3s ease;
  }
`;

const BrightnessSlider = styled(motion.div)`
  width: 100%;
  height: 60px;
  background: linear-gradient(to right, rgba(0, 0, 0, 0.1), rgba(255, 255, 255, 0.1));
  border-radius: var(--border-radius-lg);
  margin: 20px 0;
  position: relative;
  cursor: pointer;
  display: flex;
  align-items: center;
  padding: 0 20px;

  .slider-thumb {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background: var(--accent-color);
    position: absolute;
    box-shadow: var(--button-shadow);
  }

  .brightness-value {
    margin-left: auto;
    color: var(--text-secondary);
    font-weight: 500;
  }
`;

const ScenesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 20px;
  margin-top: 40px;
`;

const SceneButton = styled(motion.button)<{ active: boolean }>`
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

  .scene-name {
    font-weight: 500;
  }
`;

type Scene = 'bright' | 'dim' | 'relax' | 'party' | 'movie' | 'night';

const scenes = [
  { id: 'bright', name: 'Bright', icon: WbSunny, color: '#FFD700' },
  { id: 'dim', name: 'Dim', icon: Opacity, color: '#87CEEB' },
  { id: 'relax', name: 'Relax', icon: Weekend, color: '#DDA0DD' },
  { id: 'party', name: 'Party', icon: LocalBar, color: '#FF69B4' },
  { id: 'movie', name: 'Movie', icon: Movie, color: '#4169E1' },
  { id: 'night', name: 'Night', icon: NightsStay, color: '#483D8B' },
] as const;

const SmartLights: React.FC = () => {
  const navigate = useNavigate();
  const [isOn, setIsOn] = useState(true);
  const [selectedColor, setSelectedColor] = useState('#7C83FD');
  const [brightness, setBrightness] = useState(80);
  const [activeScene, setActiveScene] = useState<Scene>('bright');

  const handleColorSelect = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isOn) return;
    const wheel = e.currentTarget;
    const rect = wheel.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    const angle = Math.atan2(y, x);
    const hue = ((angle * 180) / Math.PI + 360) % 360;
    setSelectedColor(`hsl(${hue}, 100%, 50%)`);
  };

  const handleBrightnessChange = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isOn) return;
    const slider = e.currentTarget;
    const rect = slider.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const newBrightness = Math.round((x / rect.width) * 100);
    setBrightness(Math.max(0, Math.min(100, newBrightness)));
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
        <h1>Smart Lights</h1>
      </Header>

      <Card
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <PowerButton
          isOn={isOn}
          onClick={() => setIsOn(!isOn)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Power />
        </PowerButton>

        <ColorWheel
          selectedColor={selectedColor}
          onClick={handleColorSelect}
          whileHover={{ scale: 1.02 }}
          style={{
            opacity: isOn ? 1 : 0.5,
            filter: isOn ? 'none' : 'grayscale(100%)'
          }}
        />

        <BrightnessSlider onClick={handleBrightnessChange}>
          <motion.div
            className="slider-thumb"
            style={{ left: `calc(${brightness}% - 15px)` }}
            animate={{ 
              backgroundColor: isOn ? 'var(--accent-color)' : '#ccc',
              boxShadow: isOn ? 'var(--button-shadow)' : 'none'
            }}
          />
          <div className="brightness-value">{brightness}%</div>
        </BrightnessSlider>

        <ScenesGrid>
          {scenes.map(scene => (
            <SceneButton
              key={scene.id}
              active={activeScene === scene.id}
              onClick={() => isOn && setActiveScene(scene.id)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{
                opacity: isOn ? 1 : 0.5,
                color: activeScene === scene.id ? 'white' : scene.color
              }}
            >
              <scene.icon />
              <span className="scene-name">{scene.name}</span>
            </SceneButton>
          ))}
        </ScenesGrid>
      </Card>
    </Container>
  );
};

export default SmartLights; 