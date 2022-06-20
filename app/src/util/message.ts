export const groupMessages = (messages: { createdBy: { id: string } }[]) =>
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
