import _ from 'lodash';
import { useCallback, useEffect, useState } from 'react';

type Props = {
  viewport: React.MutableRefObject<HTMLDivElement | null>;
  minPopupHeight?: number;
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
  minPopupHeight = 1500,
}: Props) => {
  const [isScrollToTopOpened, setIsScrollToTopOpened] = useState(false);
  const [isAutoScrollingUp, setIsAutoScrollingUp] = useState(false);
  const [isScrollToBottomOpened, setIsScrollToBottomOpened] = useState(false);
  const [isAutoScrollingDown, setIsAutoScrollingDown] = useState(false);

  const [scrollDir, setScrollDir] = useState<'up' | 'down'>('up');

  const scrollToTop = useCallback(
    (behavior: 'smooth' | 'auto') => {
      setIsScrollToTopOpened(false);
      setIsAutoScrollingUp(true);
      viewport?.current?.scrollTo({
        top: viewport?.current.scrollHeight,
        behavior,
      });
    },
    [setIsScrollToTopOpened, setIsAutoScrollingUp, viewport]
  );

  const scrollToBottom = useCallback(
    (behavior: 'smooth' | 'auto') => {
      setIsScrollToBottomOpened(false);
      setIsAutoScrollingDown(true);
      viewport?.current?.scrollTo({
        top: viewport?.current.scrollHeight,
        behavior,
      });
    },
    [setIsScrollToBottomOpened, setIsAutoScrollingDown, viewport]
  );

  const hasHitTop = useCallback((scrollY: number) => scrollY <= 0.5, []);
  const hasHitBottom = useCallback(
    (scrollY: number, height: number) => scrollY - height >= -0.5,
    []
  );
  const shouldOpenScrollToBottom = useCallback(
    (percentage: number, height: number) =>
      percentage < 50 && !isAutoScrollingDown && height > minPopupHeight,
    [isAutoScrollingDown, minPopupHeight]
  );
  const shouldOpenScrollToTop = useCallback(
    (percentage: number, height: number) =>
      percentage > 50 && !isAutoScrollingUp && height > minPopupHeight,
    [isAutoScrollingUp, minPopupHeight]
  );

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
      setScrollDir(scrollY > lastScrollY ? 'down' : 'up');
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

      if (shouldOpenScrollToBottom(percentage, height)) {
        setIsScrollToBottomOpened(true);
        setIsScrollToTopOpened(false);
      }
      if (shouldOpenScrollToTop(percentage, height)) {
        setIsScrollToTopOpened(true);
        setIsScrollToBottomOpened(false);
      }
      if (hasHitTop(scrollY)) {
        setIsScrollToTopOpened(false);
        setIsAutoScrollingUp(false);
        onHitTop?.();
      }
      if (hasHitBottom(scrollY, height)) {
        setIsScrollToBottomOpened(false);
        setIsAutoScrollingDown(false);
        onHitBottom?.();
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
    isAutoScrollingUp,
    isAutoScrollingDown,
    minPopupHeight,
    hasHitBottom,
    hasHitTop,
    shouldOpenScrollToBottom,
    shouldOpenScrollToTop,
  ]);

  return {
    scrollToTop,
    scrollToBottom,
    isScrollToTopOpened,
    isScrollToBottomOpened,
  };
};
