import { Container, Popover, Text } from '@mantine/core';
import _ from 'lodash';
import { useEffect, useRef, useState } from 'react';

type Props = {
  children: React.ReactElement;
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

const Scroller = ({ children, onHitBottom, onHitTop, onScroll }: Props) => {
  const viewport = useRef<HTMLDivElement>();
  const [isScrollToBottomOpened, setIsScrollToBottomOpened] = useState(false);
  const [isAutoScrollingDown, setIsAutoScrollingDown] = useState(false);
  const [scrollDir, setScrollDir] = useState<'up' | 'down'>('up');

  const scrollToBottom = (behavior: 'smooth' | 'auto') => {
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

      if (percentage > 50 && !isAutoScrollingDown) {
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
  ]);

  return (
    <>
      <Container
        ref={viewport}
        style={{
          display: 'flex',
          flexDirection: 'column-reverse',
          overflowY: 'scroll',
          // paddingRight: '15px',
          padding: '0',
          width: '100%',
          maxWidth: 'none',
        }}
        sx={(theme) => ({
          backgroundColor: 'transparent',
          WebkitBackgroundClip: 'text',
          transition: 'background-color .8s',
          '&:hover': {
            backgroundColor: 'rgba(0,0,0,0.30)',
          },

          '&::-webkit-scrollbar': {
            width: '10px',
          },
          '&::-webkit-scrollbar-thumb': {
            borderRadius: theme.radius.md,
            backgroundColor: 'inherit',
          },
          '&::-webkit-scrollbar-track': {
            borderRadius: theme.radius.md,
          },
        })}
      >
        <div
          style={{
            zIndex: 1,
          }}
        >
          {children}
        </div>
      </Container>
      <Popover
        opened={isScrollToBottomOpened}
        width={'100%'}
        position="top"
        styles={{
          inner: {
            padding: 3,
            cursor: 'pointer',
          },
        }}
        target={<></>}
        withArrow
      >
        <Text
          align="center"
          onClick={() => {
            scrollToBottom('smooth');
            setIsScrollToBottomOpened(false);
          }}
        >
          Scroll To Bottom
        </Text>
      </Popover>
    </>
  );
};

export default Scroller;
