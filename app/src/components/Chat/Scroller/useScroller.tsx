import _ from 'lodash';
import { useEffect, useState } from 'react';

type Props = {
  viewport: React.MutableRefObject<HTMLDivElement>;
  minPopupHeight: number;
  onHitTop?: () => void;
  onHitBottom?: () => void;
  onScroll?: ({
    scrollY,
    height,
    percentage,
  }: {
    scrollY: number;
    height: number;
    percentage: number;
  }) => void;
};

export const useScroller = ({
  viewport,
  onScroll,
  onHitBottom,
  onHitTop,
  minPopupHeight,
}: Props) => {
  const [isScrollToBottomOpened, setIsScrollToBottomOpened] = useState(false);
  const [isAutoScrollingDown, setIsAutoScrollingDown] = useState(false);

  const [scrollDir, setScrollDir] = useState<'up' | 'down'>('up');

  const scrollToBottom = (behavior: 'smooth' | 'auto') => {
    setIsScrollToBottomOpened(false);
    setIsAutoScrollingDown(true);
    viewport?.current.scrollTo({
      top: viewport?.current.scrollHeight,
      behavior,
    });
  };

  useEffect(() => {
    const threshold = 0;

    const current = viewport?.current;

    if (!current) return;

    let lastScrollY = Math.abs(current.scrollTop);
    let ticking = false;

    const updateScrollDir = () => {
      const scrollY = Math.abs(current.scrollTop);

      if (Math.abs(scrollY - lastScrollY) < threshold) {
        ticking = false;
        return;
      }
      setScrollDir(scrollY < lastScrollY ? 'down' : 'up');
      lastScrollY = scrollY > 0 ? scrollY : 0;
      ticking = false;
    };

    const checkScrollPosition = _.throttle(() => {
      const scrollY = Math.abs(current.scrollTop);
      const height = current.scrollHeight - current.clientHeight;
      const percentage = Math.floor((scrollY / height) * 100);

      onScroll?.({
        scrollY,
        height,
        percentage,
      });

      if (percentage > 50 && !isAutoScrollingDown && height > minPopupHeight) {
        setIsScrollToBottomOpened(true);
      }
      if (scrollY <= 0.5) {
        setIsScrollToBottomOpened(false);
        setIsAutoScrollingDown(false);
        onHitBottom?.();
      }
      if (scrollY - height >= -0.5) {
        onHitTop?.();
      }
    }, 300);

    const onScrollY = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScrollDir);
        window.requestAnimationFrame(checkScrollPosition);
        ticking = true;
      }
    };

    current.addEventListener('scroll', onScrollY);

    return () => current.removeEventListener('scroll', onScrollY);
  }, [
    scrollDir,
    viewport,
    onScroll,
    onHitBottom,
    onHitTop,
    isAutoScrollingDown,
    minPopupHeight,
  ]);

  return {
    scrollToBottom,
    isScrollToBottomOpened,
  };
};
