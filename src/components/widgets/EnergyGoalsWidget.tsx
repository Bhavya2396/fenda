import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import {
  BatteryChargingFull,
  Schedule
} from '@mui/icons-material';

interface EnergyGoal {
  type: string;
  icon: React.ReactNode;
  current: number;
  target: number;
  unit: string;
  status: 'on-track' | 'behind';
  savings: string;
  reduction: string;
}

const energyGoals: EnergyGoal[] = [
  {
    type: 'Monthly Usage',
    icon: <BatteryChargingFull />,
    current: 320,
    target: 400,
    unit: 'kWh',
    status: 'on-track',
    savings: '45.20',
    reduction: '15%'
  },
  {
    type: 'Peak Hours',
    icon: <Schedule />,
    current: 4.2,
    target: 5,
    unit: 'hours',
    status: 'on-track',
    savings: '28.50',
    reduction: '12%'
  }
];

const EnergyGoalsContainer = styled(motion.div)`
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

  .goals-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1.5rem;
    
    @media (max-width: 768px) {
      grid-template-columns: 1fr;
      gap: 1rem;
    }
  }

  .goal-card {
    background: var(--overlay-light);
    border-radius: var(--radius-lg);
    padding: 1.5rem;
    
    .goal-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 1rem;
      
      .goal-type {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        
        svg {
          color: var(--primary-red-soft);
        }
        
        .text {
          font-size: 1rem;
          font-weight: 500;
          color: var(--text-primary);
        }
      }
      
      .goal-status {
        padding: 0.25rem 0.75rem;
        border-radius: var(--radius-lg);
        font-size: 0.75rem;
        font-weight: 500;
        
        &.on-track {
          background: rgba(109, 211, 182, 0.1);
          color: var(--status-success);
        }
        
        &.behind {
          background: rgba(255, 92, 92, 0.1);
          color: var(--status-error);
        }
      }
    }
    
    .goal-progress {
      margin-bottom: 1rem;
      
      .progress-bar {
        height: 8px;
        background: var(--overlay-hover);
        border-radius: var(--radius-lg);
        overflow: hidden;
        margin-bottom: 0.5rem;
        
        .progress {
          height: 100%;
          background: var(--primary-gradient);
          border-radius: var(--radius-lg);
          transition: width 0.3s ease;
        }
      }
      
      .progress-text {
        display: flex;
        justify-content: space-between;
        font-size: 0.875rem;
        
        .current {
          color: var(--primary-red-soft);
          font-weight: 500;
        }
        
        .target {
          color: var(--text-secondary);
        }
      }
    }
    
    .goal-stats {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 1rem;
      
      .stat {
        text-align: center;
        
        .value {
          font-size: 1.25rem;
          font-weight: 500;
          color: var(--text-primary);
          margin-bottom: 0.25rem;
        }
        
        .label {
          font-size: 0.75rem;
          color: var(--text-secondary);
        }
      }
    }
  }
`;

const EnergyGoalsWidget: React.FC = () => {
  return (
    <EnergyGoalsContainer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="header">
        <h3><BatteryChargingFull /> Energy Goals</h3>
      </div>
      <div className="goals-grid">
        {energyGoals.map((goal, index) => (
          <div key={index} className="goal-card">
            <div className="goal-header">
              <div className="goal-type">
                {goal.icon}
                <span className="text">{goal.type}</span>
              </div>
              <div className={`goal-status ${goal.status}`}>
                {goal.status === 'on-track' ? 'On Track' : 'Behind'}
              </div>
            </div>
            <div className="goal-progress">
              <div className="progress-bar">
                <div 
                  className="progress"
                  style={{ width: `${(goal.current / goal.target) * 100}%` }}
                />
              </div>
              <div className="progress-text">
                <span className="current">{goal.current} {goal.unit}</span>
                <span className="target">Target: {goal.target} {goal.unit}</span>
              </div>
            </div>
            <div className="goal-stats">
              <div className="stat">
                <div className="value">${goal.savings}</div>
                <div className="label">Saved this month</div>
              </div>
              <div className="stat">
                <div className="value">{goal.reduction}</div>
                <div className="label">Usage reduction</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </EnergyGoalsContainer>
  );
};

export default EnergyGoalsWidget; 