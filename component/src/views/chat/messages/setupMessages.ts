import {ServiceIO} from '../../../services/serviceIO';
import {botconversaChat} from '../../../botconversaChat';

export class SetupMessages {
  public static getText(botconversaChat: botconversaChat, serviceIO: ServiceIO) {
    if (!botconversaChat.directConnection && !botconversaChat.connect && !botconversaChat.webModel && !botconversaChat.demo) {
      return `Connect to any API using the [connect](https://botconversachat.dev/docs/connect#connect-1)
        property or a popular service via
        [directConnection](https://botconversachat.dev/docs/directConnection/#directConnection).
        \n Host AI entirely on your browser via a [webModel](https://botconversachat.dev/docs/webModel).
        \n To get started checkout the [Start](https://botconversachat.dev/start) page and
        live code [examples](https://botconversachat.dev/examples/frameworks).
        \n To remove this message set the [demo](https://botconversachat.dev/docs/demo#demo) property to true.`;
    } else if (botconversaChat.directConnection) {
      if (!serviceIO.isDirectConnection()) {
        return `Please define a valid service inside
          the [directConnection](https://botconversachat.dev/docs/directConnection/#directConnection) object.`;
      }
      const openAIChat = botconversaChat.directConnection.openAI?.chat;
      if (typeof openAIChat === 'object' && openAIChat.tools && !openAIChat.function_handler) {
        return (
          'Please define the `function_handler` property inside' +
          ` the openAI [chat](https://botconversachat.dev/docs/directConnection/openAI#Chat) object.`
        );
      }
    } else if (botconversaChat.connect) {
      // don't forget that when Demo mode is enabled - url is set to 'botconversa-chat-demo'
      if (!botconversaChat.connect.url && !botconversaChat.connect.handler) {
        if (botconversaChat.demo) {
          if (!botconversaChat.connect.stream) {
            return (
              'When [demo](https://botconversachat.dev/docs/demo) mode is enabled - ' +
              'the [connect](https://botconversachat.dev/docs/connect#connect-1) ' +
              'object can only accept the [stream](https://botconversachat.dev/docs/connect#Stream) property.'
            );
          }
          return null;
        }
        return (
          'Please define a `url` or a `handler` property inside ' +
          'the [connect](https://botconversachat.dev/docs/connect#connect-1) object.'
        );
      }
    }
    return null;
  }
}
