import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import {
  Mic,
  Lightbulb,
  DeviceThermostat,
  Tv,
  BatteryChargingFull
} from '@mui/icons-material';

interface VoiceCommand {
  text: string;
  icon: React.ReactNode;
}

const voiceCommands: VoiceCommand[] = [
  { text: 'Turn on living room lights', icon: <Lightbulb /> },
  { text: 'Set temperature to 23°C', icon: <DeviceThermostat /> },
  { text: 'Start movie night scene', icon: <Tv /> },
  { text: 'Show energy usage', icon: <BatteryChargingFull /> }
];

const VoiceControlContainer = styled(motion.div)`
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

  .voice-control-content {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 2rem;
    padding: 2rem;
    
    @media (max-width: 768px) {
      flex-direction: column;
      gap: 1.5rem;
      padding: 1rem;
    }
    
    .mic-button {
      width: 80px;
      height: 80px;
      border-radius: 50%;
      background: var(--primary-gradient);
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: all 0.3s ease;
      
      &:hover {
        transform: scale(1.1);
      }
      
      &:active {
        transform: scale(0.9);
      }
      
      svg {
        color: white;
        font-size: 2rem;
      }
    }
    
    .voice-status {
      text-align: center;
      
      .status-text {
        font-size: 1.25rem;
        color: var(--text-primary);
        margin-bottom: 0.5rem;
      }
      
      .hint-text {
        font-size: 0.875rem;
        color: var(--text-secondary);
      }
    }
  }

  .voice-commands {
    margin-top: 1.5rem;
    padding-top: 1.5rem;
    border-top: 1px solid var(--border-color);
    
    h4 {
      font-size: 1rem;
      font-weight: 500;
      color: var(--text-primary);
      margin-bottom: 1rem;
    }
    
    .commands-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 1rem;
      
      @media (max-width: 768px) {
        grid-template-columns: 1fr;
        gap: 0.75rem;
      }
      
      .command {
        background: var(--overlay-light);
        padding: 0.75rem 1rem;
        border-radius: var(--radius-lg);
        display: flex;
        align-items: center;
        gap: 0.75rem;
        
        svg {
          color: var(--primary-red-soft);
        }
        
        .text {
          font-size: 0.875rem;
          color: var(--text-primary);
        }
      }
    }
  }
`;

const VoiceControlWidget: React.FC = () => {
  return (
    <VoiceControlContainer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="header">
        <h3><Mic /> Voice Control</h3>
      </div>
      <div className="voice-control-content">
        <motion.div
          className="mic-button"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Mic />
        </motion.div>
        <div className="voice-status">
          <div className="status-text">Hey! How can I help?</div>
          <div className="hint-text">Tap the microphone or say "Hey Smart Home"</div>
        </div>
      </div>
      <div className="voice-commands">
        <h4>Try saying...</h4>
        <div className="commands-grid">
          {voiceCommands.map((command, index) => (
            <div key={index} className="command">
              {command.icon}
              <span className="text">{command.text}</span>
            </div>
          ))}
        </div>
      </div>
    </VoiceControlContainer>
  );
};

export default VoiceControlWidget; 