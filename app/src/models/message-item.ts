type MessageItem = {
  id: number;
  content: string;
  createdAt: number;
  createdBy: {
    id: number;
    username: string;
    name?: string;
  };
};

export default MessageItem;
