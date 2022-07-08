import { Message } from '@prisma/client';
import { MembersModified } from './chat-events/members-modified.interface';

export type ChatEvent = Message | MembersModified;
