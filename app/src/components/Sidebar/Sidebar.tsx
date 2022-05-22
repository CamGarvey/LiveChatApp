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
import RoomItem from './ChannelItem';
import { useGetChannelsForSidebarQuery } from '../../graphql/generated/graphql';

type Props = {
  onCreateChannel: () => void;
};

const Sidebar = ({ onCreateChannel }: Props) => {
  const { loading, data, error } = useGetChannelsForSidebarQuery();

  return (
    <VStack w={300} h={'100%'} maxH={'100%'} bg={'lightblue'}>
      <Accordion defaultIndex={[0]} allowMultiple w={'100%'} maxH={'100%'}>
        {loading ? (
          <></>
        ) : (
          <>
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
                <Box maxH={'100px'} overflowY={'scroll'}>
                  {data.channels
                    .filter((channel) => channel.isDM)
                    .map((channel) => {
                      return <RoomItem key={channel.id} name={''} />;
                    })}
                </Box>

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
                <Box maxH={'300px'} overflowY={'scroll'}>
                  {data.channels
                    .filter((channel) => !channel.isDM)
                    .map((channel) => {
                      return <RoomItem key={channel.id} name={channel.name} />;
                    })}
                </Box>

                <Box p={3}>
                  <Button
                    onClick={onCreateChannel}
                    w={'100%'}
                    rightIcon={<GrGroup />}
                  >
                    Create Channel
                  </Button>
                </Box>
              </AccordionPanel>
            </AccordionItem>
          </>
        )}
      </Accordion>

      <Flex gap={3} alignItems={'center'}>
        Start Chatting
        <ImPacman />
      </Flex>
    </VStack>
  );
};

export default Sidebar;
