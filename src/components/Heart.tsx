import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

interface HeartProps {
  x: number;
  y: number;
}

const HeartShape = styled(motion.div)`
  position: fixed;
  width: 30px;
  height: 30px;
  background: #ff4081;
  transform: rotate(45deg);
  
  &::before,
  &::after {
    content: '';
    width: 30px;
    height: 30px;
    background: #ff4081;
    border-radius: 50%;
    position: absolute;
  }

  &::before {
    left: -15px;
  }

  &::after {
    top: -15px;
  }
`;

export const Heart: React.FC<HeartProps> = ({ x, y }) => {
  return (
    <HeartShape
      initial={{ x, y, scale: 0 }}
      animate={{
        x: x + (Math.random() - 0.5) * 200,
        y: -100,
        scale: [0, 1, 0.8, 1],
        opacity: [0, 1, 1, 0]
      }}
      transition={{
        duration: 4,
        ease: 'easeOut',
        times: [0, 0.2, 0.8, 1],
        opacity: {
          duration: 4,
          ease: 'easeOut',
          times: [0, 0.2, 0.8, 1]
        }
      }}
      exit={{ opacity: 0 }}
    />
  );
};
