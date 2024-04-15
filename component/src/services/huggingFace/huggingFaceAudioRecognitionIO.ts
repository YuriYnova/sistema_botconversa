import {HuggingFaceAudioRecognitionResult} from '../../types/huggingFaceResult';
import {HuggingFaceFileIO} from './huggingFaceFileIO';
import {HuggingFace} from '../../types/huggingFace';
import {PollResult} from '../serviceIO';
import {botconversaChat} from '../../botconversaChat';

export class HuggingFaceAudioRecognitionIO extends HuggingFaceFileIO {
  constructor(botconversaChat: botconversaChat) {
    const config = botconversaChat.directConnection?.huggingFace?.audioSpeechRecognition as NonNullable<
      HuggingFace['audioSpeechRecognition']
    >;
    const apiKey = botconversaChat.directConnection?.huggingFace;
    super(botconversaChat, 'Attach an audio file', 'facebook/wav2vec2-large-960h-lv60-self', config, apiKey, {audio: {}});
  }

  async extractPollResultData(result: HuggingFaceAudioRecognitionResult): PollResult {
    if (result.estimated_time) return {timeoutMS: (result.estimated_time + 1) * 1000};
    if (result.error) throw result.error;
    return {text: result.text || ''};
  }
}
