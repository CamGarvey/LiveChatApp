import moment from 'moment';

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

export const getMessageTime = (time: moment.Moment) => {
  const now = moment();
  if (Math.abs(now.diff(time, 'minutes')) < 10) {
    return time.fromNow();
  }
  if (time.clone().startOf('week').isSame(now.startOf('week'))) {
    return time.format('ddd h:mm A');
  }
  return time.format('LLL');
};
