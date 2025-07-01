import { useState, useEffect } from 'react';

interface ICarrousel {
  activeIndex: number;
  next: () => void;
  prev: () => void;
  canScrollLeft: boolean;
  canScrollRight: boolean;
  visibleQuantity: number;
}

export const useCarrousel = <T>(
  items: T[],
  cardWidth: number,
  gap: number,
  containerWidth: number,
  extraItems: number = 0
): ICarrousel => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [visibleQuantity, setVisibleQuantity] = useState(1);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const totalItems = items.length + extraItems;

  useEffect(() => {
    const totalCardWidth = cardWidth + gap;
    const visible = Math.floor(containerWidth / totalCardWidth) || 1;
    setVisibleQuantity(visible);
  }, [containerWidth, cardWidth, gap]);

  useEffect(() => {
    const maxIndex = Math.max(0, totalItems - visibleQuantity);
    setCanScrollLeft(activeIndex > 0);
    setCanScrollRight(activeIndex < maxIndex);
  }, [activeIndex, visibleQuantity, totalItems]);

  const next = () => {
    if (totalItems <= visibleQuantity) return;

    setActiveIndex((prev) => {
      const nextIndex = prev + visibleQuantity;
      const maxStartIndex = Math.max(0, totalItems - visibleQuantity);
      return nextIndex >= totalItems ? maxStartIndex : nextIndex;
    });
  };

  const prev = () => {
    if (totalItems <= visibleQuantity) return;

    setActiveIndex((prev) => {
      const newIndex = prev - visibleQuantity;
      return newIndex < 0 ? 0 : newIndex;
    });
  };

  return { activeIndex, next, prev, canScrollLeft, canScrollRight, visibleQuantity };
};
