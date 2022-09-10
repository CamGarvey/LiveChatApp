import moment from 'moment';

type Event = {
  createdBy: {
    id: string;
  };
};

const MAX_EVENTS_IN_GROUP = 10;

export const groupEvents = <T extends Event>(
  events: T[],
  maxInGroup: number = MAX_EVENTS_IN_GROUP
): T[][] =>
  events.reduce((prev, curr) => {
    const startNewGroup = () => prev.push([curr]);
    if (prev.length === 0) {
      startNewGroup();
      return prev;
    }

    const latestGroup = prev[prev.length - 1];
    // Since each group can only contain a single users event,
    // we'll grab the creator of the event group
    const groupCreator = latestGroup[0].createdBy;

    if (groupCreator.id !== curr.createdBy.id) {
      // We only want the same creator in a single group
      startNewGroup();
      return prev;
    }

    if (latestGroup.length >= maxInGroup) {
      startNewGroup();
      return prev;
    }

    latestGroup.push(curr);
    return prev;
  }, [] as T[][]);

export const formatEventTime = (time: moment.Moment) => {
  const now = moment();
  if (Math.abs(now.diff(time, 'minutes')) < 10) {
    return time.fromNow();
  }
  if (time.clone().startOf('week').isSame(now.startOf('week'))) {
    return time.format('ddd h:mm A');
  }
  return time.format('LLL');
};
