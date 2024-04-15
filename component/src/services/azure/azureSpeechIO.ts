import {DirectServiceIO} from '../utils/directServiceIO';
import {BuildHeadersFunc} from '../../types/headers';
import {ServiceFileTypes} from '../serviceIO';
import {AzureUtils} from './utils/azureUtils';
import {APIKey} from '../../types/APIKey';
import {botconversaChat} from '../../botconversaChat';

export class AzureSpeechIO extends DirectServiceIO {
  override insertKeyPlaceholderText = 'Azure Speech Subscription Key';
  override keyHelpUrl =
    // eslint-disable-next-line max-len
    'https://learn.microsoft.com/en-us/azure/api-management/api-management-subscriptions#create-and-manage-subscriptions-in-azure-portal';

  // prettier-ignore
  constructor(botconversaChat: botconversaChat, buildHeadersFunc: BuildHeadersFunc, region: string, apiKey?: APIKey,
      existingFileTypes?: ServiceFileTypes) {
    super(botconversaChat,
      AzureUtils.buildSpeechKeyVerificationDetails(region), buildHeadersFunc, apiKey, existingFileTypes);
  }
}
