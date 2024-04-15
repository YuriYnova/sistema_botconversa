import {CohereCompletionsResult} from '../../types/cohereResult';
import {Cohere, CohereGenerateConfig} from '../../types/cohere';
import {MessageContentI} from '../../types/messagesInternal';
import {Messages} from '../../views/chat/messages/messages';
import {HTTPRequest} from '../../utils/HTTP/HTTPRequest';
import {Response} from '../../types/response';
import {botconversaChat} from '../../botconversaChat';
import {CohereIO} from './cohereIO';

export class CohereTextGenerationIO extends CohereIO {
  constructor(botconversaChat: botconversaChat) {
    // config can be undefined as this is the default service
    const config = botconversaChat.directConnection?.cohere?.textGeneration as Cohere['textGeneration'];
    const apiKey = botconversaChat.directConnection?.cohere;
    super(botconversaChat, 'https://api.cohere.ai/v1/generate', 'Once upon a time', config, apiKey);
  }

  preprocessBody(body: CohereGenerateConfig, messages: MessageContentI[]) {
    const bodyCopy = JSON.parse(JSON.stringify(body));
    const mostRecentMessageText = messages[messages.length - 1].text;
    if (!mostRecentMessageText) return;
    return {prompt: mostRecentMessageText, ...bodyCopy};
  }

  override async callServiceAPI(messages: Messages, pMessages: MessageContentI[]) {
    if (!this.connectSettings) throw new Error('Request settings have not been set up');
    const body = this.preprocessBody(this.rawBody, pMessages);
    HTTPRequest.request(this, body, messages);
  }

  override async extractResultData(result: CohereCompletionsResult): Promise<Response> {
    if (result.message) throw result.message;
    return {text: result.generations?.[0].text || ''};
  }
}
