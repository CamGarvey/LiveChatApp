type Message = {
  createdBy: {
    id: string;
  };
};

export const groupMessages = <T extends Message>(messages: T[]): T[][] =>
  messages.reduce((prev, curr) => {
    if (prev.length === 0) {
      prev.push([curr]);
      return prev;
    }
    if (prev[prev.length - 1][0].createdBy.id === curr.createdBy.id) {
      prev[prev.length - 1].push(curr);
    } else {
      prev.push([curr]);
    }
    return prev;
  }, []);
