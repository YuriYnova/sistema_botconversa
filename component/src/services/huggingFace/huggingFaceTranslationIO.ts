import {HuggingFaceTranslationResult} from '../../types/huggingFaceResult';
import {HuggingFace} from '../../types/huggingFace';
import {HuggingFaceIO} from './huggingFaceIO';
import {Response} from '../../types/response';
import {botconversaChat} from '../../botconversaChat';

export class HuggingFaceTranslationIO extends HuggingFaceIO {
  constructor(botconversaChat: botconversaChat) {
    const config = botconversaChat.directConnection?.huggingFace?.translation as NonNullable<HuggingFace['translation']>;
    const apiKey = botconversaChat.directConnection?.huggingFace;
    super(botconversaChat, 'Insert text to translate', 'Helsinki-NLP/opus-tatoeba-en-ja', config, apiKey);
  }

  override async extractResultData(result: HuggingFaceTranslationResult): Promise<Response> {
    if (result.error) throw result.error;
    return {text: result[0]?.translation_text || ''};
  }
}
