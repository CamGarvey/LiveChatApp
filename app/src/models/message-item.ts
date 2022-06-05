type MessageItem = {
  id: string;
  content: string;
  createdAt: number;
  createdBy: {
    id: string;
    username: string;
    name?: string;
  };
};

export default MessageItem;
