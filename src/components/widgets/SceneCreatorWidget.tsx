import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import {
  Tv,
  WbSunny,
  Work,
  Add
} from '@mui/icons-material';

interface Scene {
  id: number;
  name: string;
  icon: React.ReactNode;
  devices: string;
}

const scenes: Scene[] = [
  {
    id: 1,
    name: 'Movie Night',
    icon: <Tv />,
    devices: '4 devices'
  },
  {
    id: 2,
    name: 'Good Morning',
    icon: <WbSunny />,
    devices: '6 devices'
  },
  {
    id: 3,
    name: 'Work Mode',
    icon: <Work />,
    devices: '3 devices'
  }
];

const SceneCreatorContainer = styled(motion.div)`
  background: var(--glass-bg);
  border: var(--glass-border);
  border-radius: var(--radius-xl);
  padding: 1.5rem;
  margin: 1rem 0;
  box-shadow: var(--shadow-lg);
  backdrop-filter: blur(20px);
  
  @media (max-width: 768px) {
    padding: 1rem;
    margin: 0.75rem 0;
  }

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.5rem;

    h3 {
      font-size: 1.25rem;
      font-weight: 600;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      
      svg {
        color: var(--primary-red-soft);
      }
    }
  }

  .scenes-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1rem;
    
    @media (max-width: 768px) {
      grid-template-columns: repeat(2, 1fr);
      gap: 0.75rem;
    }
  }

  .scene-card {
    background: var(--overlay-light);
    border-radius: var(--radius-lg);
    padding: 1.25rem;
    cursor: pointer;
    transition: all 0.3s ease;
    
    &:hover {
      background: var(--overlay-hover);
      transform: translateY(-2px);
    }
    
    .scene-icon {
      width: 48px;
      height: 48px;
      border-radius: var(--radius-lg);
      background: var(--primary-gradient);
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 1rem;
      
      svg {
        color: white;
        font-size: 1.5rem;
      }
    }
    
    .scene-name {
      font-size: 1rem;
      font-weight: 500;
      color: var(--text-primary);
      margin-bottom: 0.5rem;
    }
    
    .scene-devices {
      font-size: 0.875rem;
      color: var(--text-secondary);
    }
  }

  .create-scene {
    background: var(--overlay-light);
    border-radius: var(--radius-lg);
    padding: 1.25rem;
    cursor: pointer;
    transition: all 0.3s ease;
    border: 2px dashed var(--border-color);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    
    &:hover {
      background: var(--overlay-hover);
      transform: translateY(-2px);
    }
    
    svg {
      color: var(--primary-red-soft);
      font-size: 2rem;
    }
    
    .text {
      font-size: 0.875rem;
      color: var(--text-secondary);
      text-align: center;
    }
  }
`;

const SceneCreatorWidget: React.FC = () => {
  return (
    <SceneCreatorContainer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="header">
        <h3><Tv /> Scenes</h3>
      </div>
      <div className="scenes-grid">
        {scenes.map(scene => (
          <motion.div
            key={scene.id}
            className="scene-card"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="scene-icon">{scene.icon}</div>
            <div className="scene-name">{scene.name}</div>
            <div className="scene-devices">{scene.devices}</div>
          </motion.div>
        ))}
        <motion.div
          className="create-scene"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Add />
          <div className="text">Create New Scene</div>
        </motion.div>
      </div>
    </SceneCreatorContainer>
  );
};

export default SceneCreatorWidget; 