import {DirectServiceIO} from '../utils/directServiceIO';
import {CohereUtils} from './utils/cohereUtils';
import {APIKey} from '../../types/APIKey';
import {botconversaChat} from '../../botconversaChat';

export class CohereIO extends DirectServiceIO {
  override insertKeyPlaceholderText = 'Cohere API Key';
  override keyHelpUrl = 'https://dashboard.cohere.ai/api-keys';
  textInputPlaceholderText: string;
  permittedErrorPrefixes = ['invalid'];
  url: string;

  constructor(botconversaChat: botconversaChat, url: string, inputPlaceholder: string, config?: true | Object, apiKey?: APIKey) {
    super(botconversaChat, CohereUtils.buildKeyVerificationDetails(), CohereUtils.buildHeaders, apiKey);
    this.url = url;
    this.textInputPlaceholderText = inputPlaceholder;
    if (config && typeof config === 'object') Object.assign(this.rawBody, config);
  }
}
