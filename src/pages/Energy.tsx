import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { 
  ArrowBack, BatteryChargingFull, Power, Bolt,
  TrendingUp, TrendingDown, DeviceThermostat, Lightbulb,
  Timer, WbSunny, Opacity, ToggleOn,
  Thermostat, BatteryStd,
  Theaters as TheatersIcon, MoreVert,
  CalendarToday, TipsAndUpdates, Warning, CheckCircle
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

// Types
interface Device {
  id: string;
  name: string;
  type: 'climate' | 'lighting' | 'appliance' | 'entertainment';
  consumption: number;
  status: 'high' | 'normal' | 'eco';
  icon: React.ReactNode;
}

interface UsageData {
  hour: number;
  usage: number;
}

// Styled Components
const Container = styled.div`
  padding: 0.75rem;
  color: var(--text-color);
  max-width: 800px;
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  gap: 1rem;

  @media (min-width: 768px) {
    padding: 1.5rem;
    gap: 1.5rem;
  }
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  position: sticky;
  top: 0;
  z-index: 10;
  background: var(--bg-color-dark);
  padding: 0.75rem;
  border-radius: var(--radius-lg);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  margin: -0.75rem -0.75rem 0;

  @media (min-width: 768px) {
    margin: -1.5rem -1.5rem 0;
    padding: 1rem;
  }

  button {
    width: 36px;
    height: 36px;
    border-radius: var(--radius-lg);
    border: none;
    background: var(--bg-color);
    color: var(--text-color);
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all var(--transition-normal);
    flex-shrink: 0;
    box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.2),
                -5px -5px 10px rgba(255, 255, 255, 0.05);

    @media (min-width: 768px) {
      width: 40px;
      height: 40px;
    }

    &:hover {
      box-shadow: inset 5px 5px 10px rgba(0, 0, 0, 0.2),
                  inset -5px -5px 10px rgba(255, 255, 255, 0.05);
    }

    svg {
      font-size: 1.25rem;
    }
  }

  h1 {
    font-size: 1.25rem;
    color: var(--text-color);
    font-weight: 600;
    margin: 0;

    @media (min-width: 768px) {
      font-size: 1.5rem;
    }
  }
`;

const Grid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Card = styled(motion.div)`
  background: var(--bg-color-dark);
  border-radius: var(--radius-lg);
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.2),
              -5px -5px 10px rgba(255, 255, 255, 0.05);
  overflow: hidden;

  .content {
    padding: 1rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;

    @media (min-width: 768px) {
      padding: 1.5rem;
      gap: 1.5rem;
    }
  }
`;

const PowerMeter = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem;

  @media (min-width: 768px) {
    gap: 1rem;
    padding: 1rem;
  }

  .power-ring {
    position: relative;
    width: 140px;
    height: 140px;

    @media (min-width: 768px) {
      width: 180px;
      height: 180px;
    }

    svg {
      transform: rotate(-90deg);
      
      circle {
        fill: none;
        stroke-width: 8;
        
        &.bg {
          stroke: var(--bg-color);
        }
        
        &.progress {
          stroke: url(#gradient);
          stroke-linecap: round;
          stroke-dasharray: 565.48;
          transition: stroke-dashoffset 0.5s ease;
        }
      }
    }

    .power-info {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      text-align: center;

      .value {
        font-size: 2rem;

        @media (min-width: 768px) {
          font-size: 2.5rem;
        }
      }

      .label {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.25rem;
        color: var(--text-color-muted);
        font-size: 0.875rem;
        margin-top: 0.5rem;

        svg {
          transform: none;
          font-size: 1rem;
        }
      }
    }
  }

  .trend {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.875rem;
    color: var(--text-color-muted);

    &.up {
      color: var(--warning-color);
    }

    &.down {
      color: var(--success-color);
    }

    svg {
      font-size: 1.25rem;
    }
  }
`;

const UsageChartContainer = styled.div`
  padding: 0.75rem;
  
  @media (min-width: 768px) {
    padding: 1rem;
  }

  .chart-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 1rem;
    flex-wrap: wrap;
    gap: 0.5rem;

    h3 {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-size: 1rem;
      font-weight: 500;
      margin: 0;
      color: var(--text-color);

      svg {
        color: var(--primary-red);
      }
    }

    .stats {
      display: flex;
      gap: 1rem;
      flex-wrap: wrap;

      .stat {
        display: flex;
        align-items: center;
        gap: 0.25rem;
        font-size: 0.875rem;
        color: var(--text-color-muted);

        svg {
          font-size: 1rem;
        }

        &.peak {
          color: var(--warning-color);
        }

        &.average {
          color: var(--primary-red);
        }
      }
    }
  }

  .chart-content {
    position: relative;
    height: 140px;
    display: flex;
    align-items: flex-end;
    gap: 1px;
    padding-bottom: 2rem;

    @media (min-width: 768px) {
      height: 180px;
      gap: 2px;
    }

    .bar-group {
      flex: 1;
      position: relative;
      display: flex;
      justify-content: center;

      .bar {
        width: 3px;
        background: var(--text-color-muted);
        border-radius: 3px;
        transition: all 0.3s ease;

        @media (min-width: 768px) {
          width: 6px;
        }

        &.peak {
          background: var(--warning-color);
        }

        &.above-average {
          background: var(--primary-red);
        }
      }

      &:hover {
        .bar {
          transform: scaleX(1.5);
        }

        .tooltip {
          opacity: 1;
          transform: translateX(-50%) translateY(-8px);
        }
      }
    }

    .time-markers {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      display: flex;
      justify-content: space-between;
      padding: 0 4px;

      .marker {
        font-size: 0.7rem;
        color: var(--text-color-muted);
        transform: rotate(-60deg);

        @media (min-width: 768px) {
          font-size: 0.75rem;
          transform: rotate(-45deg);
        }

        &.current {
          color: var(--primary-red);
        }
      }
    }
  }
`;

const DeviceList = styled.div`
  display: flex;
  overflow-x: auto;
  gap: 0.75rem;
  margin: 0 -1rem;
  padding: 0.5rem 1rem;
  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
  
  &::-webkit-scrollbar {
    display: none;
  }

  @media (min-width: 768px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    overflow-x: visible;
    margin: 0;
    padding: 0;
    gap: 1rem;
  }
`;

const DeviceItem = styled(motion.div)<{ status: 'high' | 'normal' | 'eco' }>`
  min-width: 280px;
  flex-shrink: 0;
  scroll-snap-align: start;
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.75rem;
  background: var(--bg-color);
  border-radius: var(--radius-lg);
  box-shadow: 3px 3px 6px rgba(0, 0, 0, 0.2),
              -3px -3px 6px rgba(255, 255, 255, 0.05);
  touch-action: pan-x;

  @media (min-width: 768px) {
    min-width: unset;
    padding: 1rem;
  }

  .device-icon {
    width: 40px;
    height: 40px;

    @media (min-width: 768px) {
      width: 48px;
      height: 48px;
    }
  }

  .device-info {
    flex: 1;
    min-width: 0;

    .device-name {
      font-size: 0.875rem;
      font-weight: 500;
      color: var(--text-color);
      margin-bottom: 0.25rem;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .device-consumption {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-size: 0.75rem;
      color: var(--text-color-muted);

      svg {
        font-size: 1rem;
        color: ${props => 
          props.status === 'high' ? 'var(--warning-color)' :
          props.status === 'eco' ? 'var(--success-color)' :
          'var(--primary-red)'
        };
        flex-shrink: 0;
      }

      .consumption-bar {
        flex: 1;
        height: 4px;
        background: var(--bg-color-dark);
        border-radius: 2px;
        overflow: hidden;
        margin-left: 0.5rem;

        .fill {
          height: 100%;
          width: ${props => 
            props.status === 'high' ? '80%' :
            props.status === 'eco' ? '30%' :
            '50%'
          };
          background: ${props => 
            props.status === 'high' ? 'var(--warning-color)' :
            props.status === 'eco' ? 'var(--success-color)' :
            'var(--primary-red)'
          };
          border-radius: 2px;
          transition: width 0.3s ease;
        }
      }
    }
  }

  .device-action {
    button {
      width: 28px;
      height: 28px;

      @media (min-width: 768px) {
        width: 32px;
        height: 32px;
      }
    }
  }
`;

const InsightCard = styled(motion.div)`
  padding: 1rem;

  @media (min-width: 768px) {
    padding: 1.5rem;
  }

  .insight-header {
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

  .insight-content {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;

    @media (min-width: 768px) {
      gap: 1rem;
    }
  }

  .insight-item {
    padding: 0.75rem;

    @media (min-width: 768px) {
      padding: 1rem;
    }

    .icon {
      width: 28px;
      height: 28px;

      @media (min-width: 768px) {
        width: 32px;
        height: 32px;
      }
    }

    .info {
      flex: 1;

      .title {
        font-size: 0.875rem;
        font-weight: 500;
        margin-bottom: 0.25rem;
        color: var(--text-color);
      }

      .description {
        font-size: 0.75rem;
        color: var(--text-secondary);
        line-height: 1.4;
      }

      .metric {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        margin-top: 0.5rem;
        font-size: 0.875rem;
        color: var(--success-color);

        &.warning {
          color: var(--warning-color);
        }

        svg {
          font-size: 1rem;
        }
      }
    }
  }
`;

const CostAnalysis = styled(motion.div)`
  display: grid;
  grid-template-columns: 1fr;
  gap: 0.75rem;
  margin-bottom: 0.75rem;

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
    margin-bottom: 1rem;
  }

  .cost-item {
    padding: 0.75rem;

    @media (min-width: 768px) {
      padding: 1rem;
    }

    .label {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-size: 0.875rem;
      color: var(--text-secondary);
      margin-bottom: 0.5rem;

      svg {
        color: var(--primary-red);
      }
    }

    .value {
      font-size: 1.25rem;

      @media (min-width: 768px) {
        font-size: 1.5rem;
      }
    }

    .comparison {
      font-size: 0.75rem;
      color: var(--text-secondary);

      span {
        color: var(--success-color);

        &.increase {
          color: var(--warning-color);
        }
      }
    }
  }
`;

const EnergyPage: React.FC = () => {
  const navigate = useNavigate();
  const [currentPower, setCurrentPower] = useState(2.4);
  const [powerTrend, setPowerTrend] = useState<'up' | 'down'>('down');

  const devices: Device[] = [
    { id: 'ac', name: 'Air Conditioner', type: 'climate', consumption: 1.2, status: 'high', icon: <DeviceThermostat /> },
    { id: 'lights', name: 'Smart Lights', type: 'lighting', consumption: 0.4, status: 'normal', icon: <Lightbulb /> },
    { id: 'purifier', name: 'Air Purifier', type: 'appliance', consumption: 0.3, status: 'eco', icon: <Opacity /> },
    { id: 'tv', name: 'Smart TV', type: 'entertainment', consumption: 0.5, status: 'normal', icon: <Power /> }
  ];

  const usageData: UsageData[] = Array.from({ length: 24 }, (_, i) => ({
    hour: i,
    usage: Math.random() * 3 + 1
  }));

  const costData = {
    daily: 645.50,
    weekly: 4230.75,
    monthlyTrend: -12,
    peakHours: '2PM - 6PM',
    estimatedBill: 15450.80
  };

  const insights = [
    {
      icon: <DeviceThermostat />,
      title: 'AC Optimization',
      description: 'Your AC is running at peak hours. Adjusting temperature by 2°C could save 15% energy.',
      metric: '15% potential savings',
      type: 'warning'
    },
    {
      icon: <WbSunny />,
      title: 'Peak Usage Alert',
      description: 'Energy consumption peaks between 2PM-6PM. Consider scheduling high-power tasks outside these hours.',
      metric: '30% higher costs during peak',
      type: 'warning'
    },
    {
      icon: <CheckCircle />,
      title: 'Energy Saving Achievement',
      description: 'Your recent schedule adjustments have reduced evening consumption.',
      metric: '8% reduction this week',
      type: 'success'
    }
  ];

  const UsageChart: React.FC = () => {
    const maxUsage = Math.max(...usageData.map(d => d.usage));
    const avgUsage = usageData.reduce((acc, curr) => acc + curr.usage, 0) / usageData.length;
    const peakHour = usageData.reduce((max, curr) => curr.usage > max.usage ? curr : max, usageData[0]);
    const currentHour = new Date().getHours();

    return (
      <UsageChartContainer>
        <div className="chart-header">
          <h3>
            <Timer /> 24-Hour Usage
          </h3>
          <div className="stats">
            <div className="stat peak">
              <Bolt />
              <span className="value">{peakHour.usage.toFixed(1)}kW</span>
            </div>
            <div className="stat average">
              <TrendingUp />
              <span className="value">{avgUsage.toFixed(1)}kW</span>
            </div>
          </div>
        </div>
        <div className="chart-content">
          {usageData.map((data, index) => (
            <motion.div
              key={index}
              className="bar-group"
              initial={{ opacity: 0, height: 0 }}
              animate={{ 
                opacity: 1,
                height: `${(data.usage / maxUsage) * 100}%`
              }}
              transition={{ 
                duration: 0.5,
                delay: index * 0.02,
                ease: "easeOut"
              }}
            >
              <div 
                className={`bar ${
                  data.usage === maxUsage ? 'peak' :
                  data.usage > avgUsage ? 'above-average' : ''
                }`}
                style={{ height: '100%' }}
              />
            </motion.div>
          ))}
          <div className="time-markers">
            {[0, 6, 12, 18, 23].map(hour => (
              <span 
                key={hour} 
                className={`marker ${hour === currentHour ? 'current' : ''}`}
              >
                {String(hour).padStart(2, '0')}:00
              </span>
            ))}
          </div>
        </div>
      </UsageChartContainer>
    );
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
        <h1>Energy Monitor</h1>
      </Header>

      <Card
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="content">
          <PowerMeter>
            <div className="power-ring">
              <svg viewBox="0 0 200 200">
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="var(--primary-red)" />
                    <stop offset="100%" stopColor="var(--warning-color)" />
                  </linearGradient>
                </defs>
                <circle className="bg" cx="100" cy="100" r="90" />
                <circle 
                  className="progress" 
                  cx="100" 
                  cy="100" 
                  r="90" 
                  style={{
                    strokeDashoffset: 565.48 * (1 - (currentPower / 5))
                  }}
                />
              </svg>
              <div className="power-info">
                <div className="value">{currentPower.toFixed(1)}</div>
                <div className="label">
                  <Bolt /> kW Now
                </div>
              </div>
            </div>
            <div className={`trend ${powerTrend}`}>
              {powerTrend === 'up' ? <TrendingUp /> : <TrendingDown />}
              {powerTrend === 'up' ? '12% higher than usual' : '8% lower than usual'}
            </div>
          </PowerMeter>

          <CostAnalysis
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="cost-item">
              <div className="label">
                <Timer />Today's Cost
              </div>
              <div className="value">₹{costData.daily.toFixed(2)}</div>
              <div className="comparison">
                vs. Yesterday: <span className={costData.monthlyTrend > 0 ? 'increase' : ''}>
                  {costData.monthlyTrend > 0 ? '+' : ''}{costData.monthlyTrend}%
                </span>
              </div>
            </div>
            <div className="cost-item">
              <div className="label">
                <CalendarToday />Weekly Average
              </div>
              <div className="value">₹{costData.weekly.toFixed(2)}</div>
              <div className="comparison">
                Peak hours: <span>{costData.peakHours}</span>
              </div>
            </div>
          </CostAnalysis>

          <UsageChart />

          <InsightCard
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="insight-header">
              <TipsAndUpdates />
              Energy Insights
            </div>
            <div className="insight-content">
              {insights.map((insight, index) => (
                <motion.div
                  key={index}
                  className="insight-item"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="icon">
                    {insight.icon}
                  </div>
                  <div className="info">
                    <div className="title">{insight.title}</div>
                    <div className="description">{insight.description}</div>
                    <div className={`metric ${insight.type}`}>
                      {insight.type === 'warning' ? <Warning /> : <CheckCircle />}
                      {insight.metric}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </InsightCard>

          <DeviceList>
            {devices.map((device, index) => (
              <DeviceItem
                key={device.id}
                status={device.status}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="device-icon">
                  {device.icon}
                </div>
                <div className="device-info">
                  <div className="device-name">{device.name}</div>
                  <div className="device-consumption">
                    <Bolt />
                    {device.consumption.toFixed(1)} kW/h
                    <div className="consumption-bar">
                      <div className="fill" />
                    </div>
                  </div>
                </div>
                <div className="device-action">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <MoreVert />
                  </motion.button>
                </div>
              </DeviceItem>
            ))}
          </DeviceList>
        </div>
      </Card>
    </Container>
  );
};

export default EnergyPage; 