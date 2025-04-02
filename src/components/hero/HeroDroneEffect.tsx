
import { useState, useEffect } from 'react';

interface DronePosition {
  x: number;
  y: number;
  scale: number;
}

export const useHeroDroneEffect = () => {
  const [dronePosition, setDronePosition] = useState<DronePosition>({ x: 0, y: 0, scale: 1.05 });

  // Effet de drone caméra - mouvement plus rapide
  useEffect(() => {
    const droneMoveInterval = setInterval(() => {
      setDronePosition({
        x: Math.sin(Date.now() / 7000) * 2.2, // Mouvement horizontal plus rapide
        y: Math.cos(Date.now() / 8000) * 2.2, // Mouvement vertical plus rapide
        scale: 1.05 + (Math.sin(Date.now() / 6000) * 0.015), // Zoom légèrement plus prononcé
      });
    }, 40); // Mise à jour plus fréquente pour un mouvement plus fluide

    return () => clearInterval(droneMoveInterval);
  }, []);

  return dronePosition;
};
