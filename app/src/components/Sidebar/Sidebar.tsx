import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Flex,
  VStack,
} from '@chakra-ui/react';
import { GrGroup } from 'react-icons/gr';
import { AiOutlinePlus } from 'react-icons/ai';
import { ImPacman } from 'react-icons/im';
import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import RoomItem from './RoomItem';

type Props = {};

const Sidebar = () => {
  const { isLoading, user } = useAuth0();

  return (
    <VStack w={300} h={'100%'} bg={'lightblue'}>
      <Accordion defaultIndex={[0]} allowMultiple w={'100%'}>
        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box flex="1" textAlign="left">
                Direct Messages
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4} paddingX={0}>
            <RoomItem name={'Casey Le Breton'} />
            <RoomItem name={'Kate Weaver'} />
            <Box p={3}>
              <Button w={'100%'} rightIcon={<AiOutlinePlus />}>
                New Chat
              </Button>
            </Box>
          </AccordionPanel>
        </AccordionItem>

        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box flex="1" textAlign="left">
                Rooms
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4} paddingX={0}>
            <RoomItem name={'Fun Room'} />
            <RoomItem name={'Boring Room'} />
            <Box p={3}>
              <Button w={'100%'} rightIcon={<GrGroup />}>
                Create Room
              </Button>
            </Box>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>

      <Flex gap={3} alignItems={'center'}>
        Start Chatting
        <ImPacman />
      </Flex>
    </VStack>
  );
};

export default Sidebar;
