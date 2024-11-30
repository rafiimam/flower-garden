import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

interface FlowerProps {
  type: string;
  delay: number;
  position: number;
}

interface FlowerContainerProps {
  position: number;
}

const FlowerContainer = styled(motion.div)<FlowerContainerProps>`
  position: absolute;
  bottom: -100px;
  left: ${props => props.position}%;
  transform-origin: bottom center;
  z-index: ${props => Math.floor(props.position)};
  transform: scale(0.8); // Slightly smaller for mobile

  @media (max-width: 768px) {
    transform: scale(0.6); // Even smaller on mobile
  }
`;

const Stem = styled(motion.div)`
  width: 4px;
  height: 160px;
  background: linear-gradient(to bottom, #4CAF50, #2E7D32);
  margin: 0 auto;
  position: relative;
  border-radius: 2px;

  &::before, &::after {
    content: '';
    position: absolute;
    background: linear-gradient(to right, #4CAF50, #2E7D32);
    width: 40px;
    height: 3px;
    border-radius: 2px;
  }

  &::before {
    left: -5px;
    top: 40%;
    transform: rotate(-45deg);
  }

  &::after {
    right: -5px;
    top: 60%;
    transform: rotate(45deg);
  }
`;

const RoseContainer = styled(motion.div)`
  position: relative;
  width: 120px;
  height: 120px;
  margin: -60px auto 0;
`;

const RosePetal = styled(motion.path)`
  fill: none;
  stroke-width: 2;
`;

const LilyContainer = styled(motion.div)`
  position: relative;
  width: 140px;
  height: 140px;
  margin: -70px auto 0;
`;

const LilyPetal = styled(motion.path)`
  fill: none;
  stroke-width: 2;
`;

const getFlowerColors = (type: string) => {
  switch (type) {
    case 'rose-red':
      return {
        primary: '#e31837',
        secondary: '#d81636',
        stroke: '#a01128',
        variations: ['#e31837', '#d81636', '#c41432', '#b31230']
      };
    case 'rose-pink':
      return {
        primary: '#ff69b4',
        secondary: '#ff1493',
        stroke: '#c71585',
        variations: ['#ff69b4', '#ff1493', '#db7093', '#c71585']
      };
    case 'rose-white':
      return {
        primary: '#ffffff',
        secondary: '#fff0f5',
        stroke: '#ffd9e6',
        variations: ['#ffffff', '#fff0f5', '#ffe4e1', '#ffd9e6']
      };
    case 'lily-white':
      return {
        primary: '#ffffff',
        secondary: '#fff5ee',
        stroke: '#ffefd5',
        variations: ['#ffffff', '#fff5ee', '#ffefd5', '#faf0e6']
      };
    case 'lily-pink':
      return {
        primary: '#ffb7c5',
        secondary: '#ffc0cb',
        stroke: '#ff69b4',
        variations: ['#ffb7c5', '#ffc0cb', '#ffb6c1', '#ff82ab']
      };
    case 'lily-orange':
      return {
        primary: '#ffa07a',
        secondary: '#ff8c69',
        stroke: '#ff7f50',
        variations: ['#ffa07a', '#ff8c69', '#ff7f50', '#ff6347']
      };
    default:
      return {
        primary: '#e31837',
        secondary: '#d81636',
        stroke: '#a01128',
        variations: ['#e31837', '#d81636', '#c41432', '#b31230']
      };
  }
};

const Rose: React.FC<{ colors: ReturnType<typeof getFlowerColors>, delay: number }> = ({ colors, delay }) => {
  // SVG paths for realistic rose petals
  const petalPaths = [
    "M0,0 C5,-5 10,-5 15,0 C20,5 20,10 15,15 C10,20 5,20 0,15 C-5,10 -5,5 0,0",
    "M-5,-5 C0,-10 5,-10 10,-5 C15,0 15,5 10,10 C5,15 0,15 -5,10 C-10,5 -10,0 -5,-5",
    "M5,-10 C10,-15 15,-15 20,-10 C25,-5 25,0 20,5 C15,10 10,10 5,5 C0,0 0,-5 5,-10"
  ];

  return (
    <RoseContainer>
      <svg viewBox="-60 -60 120 120" width="120" height="120">
        {/* Center spiral */}
        <motion.path
          d="M0,0 C5,-5 10,-5 15,0 C20,5 20,10 15,15 C10,20 5,20 0,15 C-5,10 -5,5 0,0"
          fill={colors.primary}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, delay: delay + 0.5 }}
        />
        
        {/* Multiple layers of petals */}
        {[0, 1, 2, 3, 4].map((layer) => (
          <g key={layer} transform={`rotate(${layer * 72})`}>
            {petalPaths.map((path, i) => (
              <RosePetal
                key={i}
                d={path}
                stroke={colors.stroke}
                fill={colors.variations[layer % colors.variations.length]}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{
                  duration: 1,
                  delay: delay + 0.7 + layer * 0.2 + i * 0.1,
                  type: 'spring',
                  stiffness: 100,
                  damping: 10
                }}
                transform={`rotate(${i * 120}) scale(${1 + layer * 0.3})`}
              />
            ))}
          </g>
        ))}
      </svg>
    </RoseContainer>
  );
};

const Lily: React.FC<{ colors: ReturnType<typeof getFlowerColors>, delay: number }> = ({ colors, delay }) => {
  // SVG paths for realistic lily petals
  const petalPath = "M0,-40 C10,-30 20,-20 20,0 C20,20 10,30 0,40 C-10,30 -20,20 -20,0 C-20,-20 -10,-30 0,-40";

  return (
    <LilyContainer>
      <svg viewBox="-70 -70 140 140" width="140" height="140">
        {/* Center */}
        <motion.circle
          cx="0"
          cy="0"
          r="10"
          fill={colors.secondary}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: delay + 0.5 }}
        />
        
        {/* Petals */}
        {[0, 60, 120, 180, 240, 300].map((angle, i) => (
          <LilyPetal
            key={i}
            d={petalPath}
            stroke={colors.stroke}
            fill={colors.variations[i % colors.variations.length]}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              duration: 1.2,
              delay: delay + 0.7 + i * 0.1,
              type: 'spring',
              stiffness: 80,
              damping: 12
            }}
            transform={`rotate(${angle})`}
          />
        ))}

        {/* Stamen */}
        {[0, 60, 120, 180, 240, 300].map((angle, i) => (
          <motion.line
            key={i}
            x1="0"
            y1="0"
            x2={15 * Math.cos(angle * Math.PI / 180)}
            y2={15 * Math.sin(angle * Math.PI / 180)}
            stroke={colors.stroke}
            strokeWidth="2"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: delay + 1 + i * 0.1 }}
          />
        ))}
      </svg>
    </LilyContainer>
  );
};

export const Flower: React.FC<FlowerProps> = ({ type, delay, position }) => {
  const colors = getFlowerColors(type);

  return (
    <FlowerContainer
      position={position}
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{
        duration: 1.5,
        delay,
        type: 'spring',
        stiffness: 100,
        damping: 10
      }}
    >
      {type === 'rose-red' && <Rose colors={colors} delay={delay} />}
      {type === 'rose-pink' && <Rose colors={colors} delay={delay} />}
      {type === 'rose-white' && <Rose colors={colors} delay={delay} />}
      {type === 'lily-white' && <Lily colors={colors} delay={delay} />}
      {type === 'lily-pink' && <Lily colors={colors} delay={delay} />}
      {type === 'lily-orange' && <Lily colors={colors} delay={delay} />}
      <Stem
        initial={{ height: 0 }}
        animate={{ height: 160 }}
        transition={{
          duration: 1,
          delay,
          type: 'spring',
          stiffness: 100,
          damping: 10
        }}
      />
    </FlowerContainer>
  );
};
