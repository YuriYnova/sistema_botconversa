import {MessageContent, OnMessage} from '../../types/messages';
import {ValidateInput} from '../../types/validateInput';
import {MessageFile} from '../../types/messageFile';
import {CustomStyle} from '../../types/styles';
import {Connect} from '../../types/connect';
import {Stream} from '../../types/stream';
import {botconversaChat} from '../../botconversaChat';

interface LegacybotconversaChat {
  request?: Connect;
  stream?: Stream;
  initialMessages?: MessageContent[];
  containerStyle?: CustomStyle;
  onNewMessage?: OnMessage;
}

export class Legacy {
  public static checkForContainerStyles(botconversaChat: botconversaChat, containerRef: HTMLElement) {
    const containerStyle = (botconversaChat as unknown as LegacybotconversaChat).containerStyle;
    if (containerStyle) {
      Object.assign(containerRef.style, containerStyle);
      console.error('The containerStyle property is deprecated since version 1.3.14.');
      console.error('Please change to using the style property instead: https://botconversachat.dev/docs/styles#style');
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public static handleResponseProperty(result: any | Response) {
    console.error('The {result: ....} response object type is deprecated since version 1.3.0.');
    console.error('Please change to using the new response object: https://botconversachat.dev/docs/connect#Response');
    return result.result;
  }

  public static processHistory(botconversaChat: botconversaChat) {
    const initialMessages = (botconversaChat as unknown as LegacybotconversaChat).initialMessages;
    if (initialMessages) {
      console.error('The initialMessages property is deprecated since version 1.5.0.');
      console.error('Please change to using the history property instead: https://botconversachat.dev/docs/messages/#history');
      return initialMessages;
    }
    return undefined;
  }

  public static processHistoryFile(message: MessageContent) {
    const file = (message as MessageContent & {file?: MessageFile}).file;
    if (file) {
      console.error('The file property in MessageContent is deprecated since version 1.3.17.');
      console.error('Please change to using the files array property: https://botconversachat.dev/docs/messages/#MessageContent');
      message.files = [file];
    }
  }

  public static processValidateInput(botconversaChat: botconversaChat) {
    const validate = (botconversaChat as botconversaChat & {validateMessageBeforeSending?: ValidateInput}).validateMessageBeforeSending;
    if (validate) {
      console.error('The validateMessageBeforeSending property is deprecated since version 1.3.24.');
      console.error('Please change to using validateInput: https://botconversachat.dev/docs/interceptors#validateInput');
      return validate;
    }
    return undefined;
  }

  public static processSubmitUserMessage(content: string) {
    console.error('The submitUserMessage(text: string) argument string type is deprecated since version 1.4.4.');
    console.error('Please change to using the new argument type: https://botconversachat.dev/docs/methods#submitUserMessage');
    return {text: content};
  }

  public static flagHTMLUpdateClass(bubbleElement: HTMLElement) {
    if (bubbleElement.children[0]?.classList.contains('botconversa-chat-update-message')) {
      console.error('The "botconversa-chat-update-message" html class is deprecated since version 1.4.4.');
      console.error('Please change to using {..., overwrite: true} object: https://botconversachat.dev/docs/connect#Response');
    }
  }

  public static processConnect(botconversaChat: botconversaChat) {
    const legacybotconversachat = botconversaChat as unknown as botconversaChat & LegacybotconversaChat;
    if (legacybotconversachat.request) {
      if (legacybotconversachat.connect) {
        Object.assign(legacybotconversachat.connect, legacybotconversachat.request);
      } else {
        // this will cause the component to render twice but it is needed
        legacybotconversachat.connect = legacybotconversachat.request;
      }
      console.error('The request property is deprecated since version 1.5.0.');
      console.error('Please see the connect object: https://botconversachat.dev/docs/connect#connect-1');
    }
  }

  public static checkForStream(botconversaChat: botconversaChat) {
    const stream = (botconversaChat as unknown as LegacybotconversaChat).stream;
    if (stream) {
      console.error('The stream property has been moved to the connect object in version 1.5.0.');
      console.error('Please see the connect object: https://botconversachat.dev/docs/connect#connect-1');
      return stream;
    }
    return undefined;
  }

  public static fireOnNewMessage(botconversaChat: botconversaChat, updateBody: {message: MessageContent; isHistory: boolean}) {
    const legacybotconversachat = botconversaChat as unknown as botconversaChat & LegacybotconversaChat;
    if (legacybotconversachat.onNewMessage) {
      console.error('The onNewMessage event has deprecated since version 1.5.0.');
      console.error('Please see the onMessage event: https://botconversachat.dev/docs/events#onMessage');
      legacybotconversachat.onNewMessage?.(updateBody);
    }
    botconversaChat.dispatchEvent(new CustomEvent('new-message', {detail: updateBody}));
  }
}
