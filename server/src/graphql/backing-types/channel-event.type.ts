import { Message } from '@prisma/client';
import { MembersModified } from './channel-events/members-modified.interface';

export type ChannelEvent = Message | MembersModified;
