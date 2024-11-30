import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const SkyContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  overflow: hidden;
`;

const Cloud = styled(motion.div)<{ size: number }>`
  position: absolute;
  width: ${props => props.size}px;
  height: ${props => props.size * 0.4}px;
  background: rgba(255, 255, 255, 0.9);
  border-radius: ${props => props.size * 0.4}px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

  &::before,
  &::after {
    content: '';
    position: absolute;
    background: inherit;
    border-radius: 50%;
  }

  &::before {
    width: ${props => props.size * 0.6}px;
    height: ${props => props.size * 0.6}px;
    top: ${props => -props.size * 0.2}px;
    left: ${props => props.size * 0.2}px;
  }

  &::after {
    width: ${props => props.size * 0.4}px;
    height: ${props => props.size * 0.4}px;
    top: ${props => -props.size * 0.1}px;
    right: ${props => props.size * 0.2}px;
  }
`;

const Bird = styled(motion.div)`
  position: absolute;
  width: 30px;
  height: 8px;

  &::before,
  &::after {
    content: '';
    position: absolute;
    width: 15px;
    height: 3px;
    background: #333;
    transform-origin: 0% 50%;
  }

  &::before {
    transform: rotate(-30deg);
  }

  &::after {
    transform: rotate(30deg);
  }
`;

interface CloudProps {
  size: number;
  initialX: number;
  y: string | number;
  duration: number;
}

const CloudComponent: React.FC<CloudProps> = ({ size, initialX, y, duration }) => (
  <Cloud
    size={size}
    initial={{ x: initialX }}
    animate={{
      x: [-100, window.innerWidth + 100],
    }}
    transition={{
      x: {
        duration,
        repeat: Infinity,
        ease: "linear"
      }
    }}
    style={{ top: y }}
  />
);

interface BirdProps {
  initialX: number;
  y: number;
  duration: number;
  delay: number;
}

const BirdComponent: React.FC<BirdProps> = ({ initialX, y, duration, delay }) => {
  const flyPath = {
    y: [y, y - 20, y],
    rotate: [0, 5, 0, -5, 0]
  };

  return (
    <Bird
      initial={{ x: initialX, y }}
      animate={{
        x: [-50, window.innerWidth + 50],
        ...flyPath
      }}
      transition={{
        x: {
          duration,
          repeat: Infinity,
          ease: "linear",
          delay
        },
        y: {
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        },
        rotate: {
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }
      }}
    />
  );
};

export const SkyElements: React.FC = () => {
  const clouds = [
    { size: 120, y: '10%', duration: 80, initialX: -200 },
    { size: 80, y: '15%', duration: 65, initialX: -400 },
    { size: 100, y: '5%', duration: 75, initialX: -600 },
    { size: 90, y: '20%', duration: 70, initialX: -800 }
  ];

  const birds = [
    { y: 100, duration: 15, delay: 0, initialX: -50 },
    { y: 150, duration: 18, delay: 2, initialX: -50 },
    { y: 80, duration: 20, delay: 4, initialX: -50 },
    { y: 120, duration: 17, delay: 6, initialX: -50 }
  ];

  return (
    <SkyContainer>
      {clouds.map((cloud, i) => (
        <CloudComponent key={`cloud-${i}`} {...cloud} />
      ))}
      {birds.map((bird, i) => (
        <BirdComponent key={`bird-${i}`} {...bird} />
      ))}
    </SkyContainer>
  );
};
