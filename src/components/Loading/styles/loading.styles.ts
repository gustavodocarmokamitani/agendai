import styled, { keyframes } from "styled-components";

const movementLeft = keyframes`
  0% {
   transform: translateX(0);
   fill: #2c2c2c;
    stroke: transparent;
   
  }
  50% {
  transform: translateX(-15px);
   fill: white;
    stroke: #2c2c2c;
  }
    100% {
   transform: translateX(0);
   fill: #2c2c2c;
    stroke: transparent;
   
  }
`;

const movementRight = keyframes`
  0% {
   transform: translateX(0);
    fill: #2c2c2c;
    stroke: transparent;
    
  }
  50% {
  transform: translateX(15px);
  fill: white;
    stroke: #2c2c2c;
  }
    100% {
   transform: translateX(0);
    fill: #2c2c2c;
    stroke: transparent;
    
  }
`;

export const LoadingContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: rgba(168, 168, 168, 0.77);
  z-index: 999999;
`;

export const Spinner = styled.div`
  svg {
    width: 101px;
    height: 81px;

    path:nth-child(1) {
      animation: ${movementLeft} 3s ease-out infinite;
    }

    path:nth-child(2) {
      animation: ${movementRight} 3s ease-out infinite;
    }
  }
`;
