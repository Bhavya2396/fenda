import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import {
  WbSunny,
  WbTwilight,
  Opacity,
  Air,
  DeviceThermostat
} from '@mui/icons-material';

interface WeatherForecastItem {
  time: string;
  temp: number;
  icon: React.ReactNode;
}

const weatherForecast: WeatherForecastItem[] = [
  { time: 'Now', temp: 24, icon: <WbSunny /> },
  { time: '3 PM', temp: 26, icon: <WbSunny /> },
  { time: '6 PM', temp: 23, icon: <WbTwilight /> },
  { time: '9 PM', temp: 21, icon: <WbTwilight /> },
  { time: '12 AM', temp: 19, icon: <WbTwilight /> }
];

const WeatherWidgetContainer = styled(motion.div)`
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
    margin-bottom: 1rem;

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

  .weather-content {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1.5rem;
    
    @media (max-width: 768px) {
      grid-template-columns: 1fr;
      gap: 1rem;
    }
    
    .current-weather {
      display: flex;
      align-items: center;
      gap: 2rem;
      
      @media (max-width: 768px) {
        gap: 1rem;
      }
      
      .temperature {
        font-size: 3rem;
        font-weight: 600;
        color: var(--text-primary);
        display: flex;
        align-items: center;
        gap: 0.5rem;
        
        @media (max-width: 768px) {
          font-size: 2.5rem;
        }
        
        svg {
          color: var(--primary-red-soft);
        }
        
        .feels-like {
          font-size: 1rem;
          color: var(--text-secondary);
          margin-top: 0.5rem;
        }
      }
      
      .conditions {
        .main {
          font-size: 1.25rem;
          color: var(--text-primary);
          margin-bottom: 0.5rem;
          
          @media (max-width: 768px) {
            font-size: 1.125rem;
          }
        }
        
        .details {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          color: var(--text-secondary);
          font-size: 0.875rem;
          
          .detail-item {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            
            svg {
              color: var(--primary-red-soft);
            }
          }
        }
      }
    }
    
    .weather-metrics {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 1rem;
      
      .metric {
        background: var(--overlay-light);
        padding: 1rem;
        border-radius: var(--radius-lg);
        text-align: center;
        
        .value {
          font-size: 1.5rem;
          font-weight: 500;
          color: var(--text-primary);
          margin-bottom: 0.25rem;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          
          svg {
            color: var(--primary-red-soft);
          }
        }
        
        .label {
          font-size: 0.875rem;
          color: var(--text-secondary);
        }
      }
    }
  }
  
  .forecast {
    margin-top: 1.5rem;
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 1rem;
    
    @media (max-width: 768px) {
      gap: 0.5rem;
    }
    
    .forecast-item {
      background: var(--overlay-light);
      padding: 1rem;
      border-radius: var(--radius-lg);
      text-align: center;
      transition: all 0.3s ease;
      
      &:hover {
        transform: translateY(-2px);
        background: var(--overlay-hover);
      }
      
      .time {
        font-size: 0.875rem;
        color: var(--text-secondary);
        margin-bottom: 0.5rem;
      }
      
      .icon {
        margin: 0.5rem 0;
        color: var(--primary-red-soft);
      }
      
      .temp {
        font-size: 1.125rem;
        font-weight: 500;
        color: var(--text-primary);
      }
    }
  }
  
  .weather-suggestions {
    margin-top: 1.5rem;
    padding-top: 1.5rem;
    border-top: 1px solid var(--border-color);
    
    h4 {
      font-size: 1rem;
      font-weight: 500;
      color: var(--text-primary);
      margin-bottom: 1rem;
    }
    
    .suggestions-list {
      display: flex;
      gap: 1rem;
      overflow-x: auto;
      padding-bottom: 0.5rem;
      
      .suggestion {
        background: var(--overlay-light);
        padding: 0.75rem 1rem;
        border-radius: var(--radius-lg);
        display: flex;
        align-items: center;
        gap: 0.75rem;
        white-space: nowrap;
        cursor: pointer;
        transition: all 0.3s ease;
        
        &:hover {
          background: var(--overlay-hover);
          transform: translateY(-2px);
        }
        
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

const WeatherWidget: React.FC = () => {
  return (
    <WeatherWidgetContainer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="header">
        <h3><WbSunny /> Weather</h3>
      </div>
      <div className="weather-content">
        <div className="current-weather">
          <div className="temperature">
            24°C
            <WbSunny />
            <div className="feels-like">Feels like 26°C</div>
          </div>
          <div className="conditions">
            <div className="main">Sunny</div>
            <div className="details">
              <div className="detail-item">
                <Opacity /> Humidity: 65%
              </div>
              <div className="detail-item">
                <Air /> Wind: 12 km/h
              </div>
            </div>
          </div>
        </div>
        <div className="weather-metrics">
          <div className="metric">
            <div className="value">
              <Opacity /> 65%
            </div>
            <div className="label">Humidity</div>
          </div>
          <div className="metric">
            <div className="value">
              <Air /> 12km/h
            </div>
            <div className="label">Wind Speed</div>
          </div>
          <div className="metric">
            <div className="value">
              <WbSunny /> 0%
            </div>
            <div className="label">Rain Chance</div>
          </div>
          <div className="metric">
            <div className="value">
              <DeviceThermostat /> 26°C
            </div>
            <div className="label">Feels Like</div>
          </div>
        </div>
      </div>
      <div className="forecast">
        {weatherForecast.map((item, index) => (
          <div key={index} className="forecast-item">
            <div className="time">{item.time}</div>
            <div className="icon">{item.icon}</div>
            <div className="temp">{item.temp}°C</div>
          </div>
        ))}
      </div>
      <div className="weather-suggestions">
        <h4>Suggestions</h4>
        <div className="suggestions-list">
          <motion.div 
            className="suggestion"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <DeviceThermostat />
            <span className="text">Adjust AC for optimal comfort</span>
          </motion.div>
          <motion.div 
            className="suggestion"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <WbSunny />
            <span className="text">Open curtains to save energy</span>
          </motion.div>
        </div>
      </div>
    </WeatherWidgetContainer>
  );
};

export default WeatherWidget; 