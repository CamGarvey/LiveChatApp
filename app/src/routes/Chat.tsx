import { AppShell, Center } from '@mantine/core';
import React, { useState } from 'react';
import { Route, Routes, useParams } from 'react-router-dom';
import ChatPanel from '../components/Chat/ChatPanel';
import ChannelInfoSidebar from '../components/Layout/ChannelInfoSidebar';
import ChannelNav from '../components/Layout/ChannelNav';
import Header from '../components/Layout/Header';

type Props = {};

const c = () => <>Hello</>;

const Chat = (props: Props) => {
  const { chatId } = useParams();

  return (
    <AppShell
      navbarOffsetBreakpoint="sm"
      asideOffsetBreakpoint="sm"
      fixed
      header={<Header />}
      navbar={<ChannelNav />}
      aside={chatId && <ChannelInfoSidebar channelId={chatId} />}
    >
      {chatId && <ChatPanel channelId={chatId} />}
    </AppShell>
  );
};

export default Chat;
