import { MessageAttachmentInfo } from '@rc-ex/core/definitions';

import {
  Correspondent,
  VoicemailAttachment,
  FaxAttachment,
} from '../../lib/messageHelper';

import Alert from '../Alert';
import { Auth } from '../AuthV2';
import { RingCentralClient } from '../../lib/RingCentralClient';
import { ExtensionInfo } from '../ExtensionInfoV2';
import { MessageSender, Attachment } from '../MessageSenderV2';
import { MessageStore } from '../MessageStoreV2';
import { RolesAndPermissions } from '../RolesAndPermissionsV2';
import RegionSettings from '../RegionSettings';
import ContactMatcher from '../ContactMatcher';
import ConversationLogger from '../ConversationLogger';
import { Message } from '../../interfaces/MessageStore.model';

export interface Deps {
  alert: Alert;
  auth: Auth;
  client: RingCentralClient;
  messageSender: MessageSender;
  extensionInfo: ExtensionInfo;
  messageStore: MessageStore;
  rolesAndPermissions: RolesAndPermissions;
  regionSettings: RegionSettings;
  contactMatcher?: ContactMatcher;
  conversationLogger?: ConversationLogger;
  conversationsOptions?: ConversationsOptions;
}

export interface ConversationsOptions {
  perPage?: number;
  daySpan?: number;
  enableLoadOldMessages?: boolean;
  showMMSAttachment?: boolean;
}

export interface InputContent {
  conversationId: string;
  text?: string;
  attachments?: Attachment[];
}

export interface FormattedConversation extends Message {
  unreadCounts: number;
  self: Correspondent;
  voicemailAttachment?: VoicemailAttachment;
  faxAttachment?: FaxAttachment;
  mmsAttachments: MessageAttachmentInfo[];
  correspondents: Correspondent[];
  conversationLogId: string;
  isLogging: boolean;
  correspondentMatches: CorrespondentMatch[];
  conversationMatches: ConversationMatch[];
}

export interface FilteredConversation extends FormattedConversation {
  matchOrder?: number;
  matchedMessage?: Message;
}

export interface CorrespondentMatch {
  name?: string;
  phoneNumber?: string;
  rawId?: string;
  id?: string;
}

export interface ConversationMatch {
  id: string;
}

export interface CorrespondentResponse {
  [key: string]: string;
}

export interface CurrentConversation extends FormattedConversation {
  messages: Message[];
  senderNumber: Correspondent;
  recipients: Correspondent[];
}
