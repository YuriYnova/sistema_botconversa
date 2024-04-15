import {HuggingFaceTextGenerationResult} from '../../types/huggingFaceResult';
import {HuggingFace} from '../../types/huggingFace';
import {HuggingFaceIO} from './huggingFaceIO';
import {Response} from '../../types/response';
import {botconversaChat} from '../../botconversaChat';

export class HuggingFaceTextGenerationIO extends HuggingFaceIO {
  constructor(botconversaChat: botconversaChat) {
    const config = botconversaChat.directConnection?.huggingFace?.textGeneration as NonNullable<HuggingFace['textGeneration']>;
    const apiKey = botconversaChat.directConnection?.huggingFace;
    super(botconversaChat, 'Once upon a time', 'gpt2', config, apiKey);
  }

  override async extractResultData(result: HuggingFaceTextGenerationResult): Promise<Response> {
    if (result.error) throw result.error;
    return {text: result[0]?.generated_text || ''};
  }
}
