import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { Flower } from './components/Flower';
import { Heart } from './components/Heart';
import { SkyElements } from './components/SkyElements';
import { GlobalStyle } from './styles/GlobalStyle';

const AppContainer = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
    to bottom,
    #87ceeb 0%,
    #b0e2ff 30%,
    #e0f7fa 60%,
    #b2ebf2 100%
  );
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  position: relative;
  touch-action: manipulation;
`;

const Button = styled(motion.button)`
  padding: 20px 40px;
  font-size: 24px;
  background: linear-gradient(45deg, #ff6b6b, #ff8e8e);
  color: white;
  border: none;
  border-radius: 50px;
  cursor: pointer;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  position: relative;
  z-index: 100;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  -webkit-tap-highlight-color: transparent;

  @media (max-width: 768px) {
    padding: 15px 30px;
    font-size: 20px;
  }
`;

const Message = styled(motion.h1)`
  font-size: 48px;
  color: #ff4081;
  text-align: center;
  margin: 20px;
  padding: 0 20px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
  position: relative;
  z-index: 100;

  @media (max-width: 768px) {
    font-size: 32px;
    margin: 15px;
  }
`;

const Garden = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 30%;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: flex-end;
  z-index: 2;

  @media (max-width: 768px) {
    height: 25%;
  }
`;

const GrassBackground = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 30%;
  background: linear-gradient(
    to bottom,
    #90EE90 0%,
    #32CD32 100%
  );
  z-index: 1;
`;

const windAnimation = {
  animate: {
    rotateZ: [0, 2, 0, -2, 0],
    transition: {
      duration: 4,
      ease: "easeInOut",
      repeat: Infinity,
      repeatType: "reverse" as const
    }
  }
};

const FlowerWrapper = styled(motion.div)<{ position: number }>`
  position: absolute;
  bottom: 0;
  left: ${props => props.position}%;
  transform-origin: center bottom;
  z-index: 3;
  will-change: transform;
`;

const App: React.FC = () => {
  const [showFlowers, setShowFlowers] = useState(false);
  const [hearts, setHearts] = useState<{ id: number; x: number; y: number }[]>([]);

  const handleClick = () => {
    setShowFlowers(true);
    for (let i = 0; i < 15; i++) {
      setTimeout(() => {
        setHearts(prev => [
          ...prev,
          {
            id: Date.now() + i,
            x: Math.random() * window.innerWidth,
            y: window.innerHeight + Math.random() * 100
          }
        ]);
      }, i * 200);
    }
  };

  const flowerTypes = [
    'rose-red', 'lily-white', 'rose-pink', 
    'lily-orange', 'rose-white', 'lily-pink', 
    'rose-red', 'lily-white', 'rose-pink', 
    'lily-orange', 'rose-red'
  ];

  const calculatePosition = (index: number) => {
    return index * 8; 
  };

  return (
    <>
      <GlobalStyle />
      <AppContainer>
        <SkyElements />
        <AnimatePresence>
          {!showFlowers && (
            <Button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleClick}
              initial={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3 }}
            >
              Click Me ❤️
            </Button>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {showFlowers && (
            <Message
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              Flowers for my Flower 🌸
            </Message>
          )}
        </AnimatePresence>

        <GrassBackground />
        <Garden>
          {showFlowers &&
            flowerTypes.map((type, index) => (
              <FlowerWrapper
                key={`${type}-${index}`}
                position={calculatePosition(index)}
                initial={{ scale: 0, y: 100 }}
                animate={{ 
                  scale: 1,
                  rotateZ: windAnimation.animate.rotateZ,
                  y: [100, 0, -3, 0, -2, 0],
                  transition: {
                    scale: { duration: 0.8, delay: index * 0.2 },
                    y: { 
                      times: [0, 0.2, 0.4, 0.6, 0.8, 1],
                      duration: 4,
                      ease: "easeInOut",
                      repeat: Infinity,
                      repeatType: "reverse",
                      delay: index * 0.2
                    },
                    rotateZ: {
                      duration: 4,
                      ease: "easeInOut",
                      repeat: Infinity,
                      repeatType: "reverse",
                      delay: index * 0.2 + 0.8
                    }
                  }
                }}
              >
                <Flower
                  type={type}
                  delay={index * 0.2}
                  position={calculatePosition(index)}
                />
              </FlowerWrapper>
            ))}
        </Garden>

        <AnimatePresence>
          {hearts.map(heart => (
            <Heart key={heart.id} x={heart.x} y={heart.y} />
          ))}
        </AnimatePresence>
      </AppContainer>
    </>
  );
};

export default App;
