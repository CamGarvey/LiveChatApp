import {
  ActionIcon,
  Center,
  Container,
  Loader,
  LoadingOverlay,
  Popover,
  Text,
} from '@mantine/core';
import { motion } from 'framer-motion';
import { useRef } from 'react';
import { ArrowDownCircle } from 'tabler-icons-react';
import { useScroller } from './useScroller';

type Props = {
  children: JSX.Element[];
  isLoading?: boolean;
  isLoadingMore?: boolean;
  topMessage?: string;
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

const MotionContainer = motion(Container);

const Scroller = ({
  children,
  onHitBottom,
  onHitTop,
  onScroll,
  isLoading = false,
  isLoadingMore = false,
  topMessage = null,
}: Props) => {
  const viewport = useRef<HTMLDivElement>();
  const { scrollToBottom, isScrollToBottomOpened } = useScroller({
    viewport,
    onHitBottom,
    onHitTop,
    onScroll,
    minPopupHeight: 1500,
  });

  console.log({ isLoading });

  return (
    <>
      <MotionContainer
        ref={viewport}
        sx={(theme) => ({
          display: 'flex',
          position: 'relative',
          flexDirection: 'column-reverse',
          overflowY: 'scroll',
          overflowX: 'clip',
          padding: '0',
          paddingRight: '5px',
          height: '100%',
          width: '100%',
          maxWidth: 'none',
          color: '#00000000',
          transition: 'color 0.3s',
          '&:hover': {
            color: '#666666FF',
          },
          '&::-webkit-scrollbar': {
            width: '14px',
          },
          '&::-webkit-scrollbar-thumb': {
            borderRadius: theme.radius.md,
            backgroundClip: 'content-box',
            border: '4px solid transparent',
            boxShadow: 'inset 0 0 0 10px',
          },
          '&::-webkit-scrollbar-track': {
            borderRadius: theme.radius.md,
          },
        })}
      >
        <LoadingOverlay
          visible={isLoading}
          loaderProps={{ size: 'lg', variant: 'bars' }}
        />
        <motion.div
          variants={{
            hidden: { opacity: 1 },
            show: {
              opacity: 1,
            },
          }}
          transition={{
            staggerChildren: 0.1,
            staggerDirection: -1,
          }}
          initial="hidden"
          animate="show"
          exit="hidden"
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 4,
          }}
        >
          {!isLoading && (
            <>
              {isLoadingMore && (
                <Center>
                  <Loader variant="bars" />
                </Center>
              )}
              {topMessage && (
                <Center>
                  <Text color={'dimmed'}>{topMessage}</Text>
                </Center>
              )}
              {children.length && children}
            </>
          )}
        </motion.div>
      </MotionContainer>

      <Popover
        opened={isScrollToBottomOpened}
        width={'100%'}
        position="top"
        styles={{
          inner: {
            padding: 3,
            cursor: 'pointer',
          },
          body: {
            boxShadow: 'none',
            background: 'transparent',
            border: 'none',
          },
        }}
        target={<></>}
      >
        <ActionIcon
          size={'xl'}
          onClick={() => {
            scrollToBottom('smooth');
          }}
          styles={{
            hover: {
              backgroundColor: 'transparent !important',
            },
          }}
        >
          <ArrowDownCircle size={60} strokeWidth={1} color={'#405abf'} />
        </ActionIcon>
      </Popover>
    </>
  );
};

export default Scroller;
