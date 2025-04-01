
import { useState, useEffect } from 'react';

interface DronePosition {
  x: number;
  y: number;
  scale: number;
}

export const useHeroDroneEffect = () => {
  // Retourner une position fixe sans effet de mouvement
  return { x: 0, y: 0, scale: 1 };
};
