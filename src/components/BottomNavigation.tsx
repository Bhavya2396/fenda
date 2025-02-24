import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Home,
  Thermostat,
  Security as SecurityIcon,
  BatteryChargingFull,
  Theaters as TheatersIcon
} from '@mui/icons-material';

const BottomNav = styled.nav`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: var(--bg-color-dark);
  padding: 0.75rem;
  display: flex;
  justify-content: space-around;
  z-index: var(--z-header);
  box-shadow: 0 -5px 15px rgba(0, 0, 0, 0.3);
  border-top: 1px solid rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(10px);

  @media (max-width: 480px) {
    padding: 0.5rem;
  }
`;

const NavButton = styled(motion.button)<{ $active: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.375rem;
  background: none;
  border: none;
  color: ${props => props.$active ? 'var(--primary-red)' : 'var(--text-color-muted)'};
  padding: 0.5rem;
  cursor: pointer;
  position: relative;
  transition: all var(--transition-normal);
  text-decoration: none;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: ${props => props.$active ? '25px' : '0'};
    height: 3px;
    background: var(--primary-red);
    border-radius: 1.5px;
    transition: all var(--transition-normal);
  }

  svg {
    font-size: 1.5rem;
    transition: all var(--transition-normal);
    filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2));
  }

  span {
    font-size: 0.75rem;
    font-weight: 500;
    transition: all var(--transition-normal);
  }

  &:hover {
    color: var(--primary-red-soft);
    
    svg {
      transform: translateY(-2px);
    }
  }

  &:active {
    svg {
      transform: translateY(0);
    }
  }
`;

const navItems = [
  { id: 'home', icon: <Home />, label: 'Home', path: '/' },
  { id: 'comfort', icon: <Thermostat />, label: 'Comfort', path: '/comfort' },
  { id: 'security', icon: <SecurityIcon />, label: 'Security', path: '/security' },
  { id: 'energy', icon: <BatteryChargingFull />, label: 'Energy', path: '/energy' },
  { id: 'entertainment', icon: <TheatersIcon />, label: 'Entertainment', path: '/entertainment' }
];

const BottomNavigation: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  return (
    <BottomNav>
      {navItems.map(item => (
        <NavButton
          key={item.id}
          $active={location.pathname === item.path}
          onClick={() => handleNavigation(item.path)}
          whileTap={{ scale: 0.9 }}
        >
          {item.icon}
          <span>{item.label}</span>
        </NavButton>
      ))}
    </BottomNav>
  );
};

export default BottomNavigation; 