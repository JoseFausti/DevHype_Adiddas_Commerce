import { useState } from 'react';

interface ICarrousel {
  activeIndex: number;
  next: () => void;
  prev: () => void;
}

export const useCarrousel = <T>(
  items: T[],
  quantity: number = 3
): ICarrousel => {
  const [activeIndex, setActiveIndex] = useState(0);

  const next = () => {
    if (items.length <= quantity) return;
    setActiveIndex((prev) => {
      const nextIndex = prev + quantity;
      return nextIndex >= items.length ? 0 : nextIndex;
    });
  };

  const prev = () => {
    if (items.length <= quantity) return;
    setActiveIndex((prev) => {
      const newIndex = prev - quantity;
      return newIndex < 0 ? Math.max(0, items.length - quantity) : newIndex;
    });
  };

  return { activeIndex, next, prev };
};
