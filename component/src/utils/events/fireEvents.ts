import {FileMessageUtils} from '../../views/chat/messages/fileMessageUtils';
import {MessageContentI} from '../../types/messagesInternal';
import {botconversaChat} from '../../botconversaChat';
import {Legacy} from '../legacy/legacy';

export class FireEvents {
  public static onMessage(botconversaChat: botconversaChat, message: MessageContentI, isHistory: boolean) {
    const updateBody = JSON.parse(JSON.stringify({message, isHistory, isInitial: isHistory}));
    FileMessageUtils.reAddFileRefToObject(message, updateBody);
    botconversaChat.onMessage?.(updateBody);
    botconversaChat.dispatchEvent(new CustomEvent('message', {detail: updateBody}));
    Legacy.fireOnNewMessage(botconversaChat, updateBody);
  }

  public static onClearMessages(botconversaChat: botconversaChat) {
    botconversaChat.onClearMessages?.();
    botconversaChat.dispatchEvent(new CustomEvent('clear-messages'));
  }

  public static onRender(botconversaChat: botconversaChat) {
    botconversaChat.onComponentRender?.(botconversaChat);
    botconversaChat.dispatchEvent(new CustomEvent('render', {detail: botconversaChat}));
  }

  public static onError(botconversaChat: botconversaChat, error: string) {
    botconversaChat.onError?.(error);
    botconversaChat.dispatchEvent(new CustomEvent('error', {detail: error}));
  }
}
