import {HuggingFaceAudioClassificationIO} from './huggingFace/huggingFaceAudioClassificationIO';
import {HuggingFaceImageClassificationIO} from './huggingFace/huggingFaceImageClassificationIO';
import {StabilityAIImageToImageUpscaleIO} from './stabilityAI/stabilityAIImageToImageUpscaleIO';
import {StabilityAIImageToImageMaskingIO} from './stabilityAI/stabilityAIImageToImageMaskingIO';
import {HuggingFaceAudioRecognitionIO} from './huggingFace/huggingFaceAudioRecognitionIO';
import {HuggingFaceTextGenerationIO} from './huggingFace/huggingFaceTextGenerationIO';
import {HuggingFaceQuestionAnswerIO} from './huggingFace/huggingFaceQuestionAnswerIO';
import {HuggingFaceSummarizationIO} from './huggingFace/huggingFaceSummarizationIO';
import {HuggingFaceConversationIO} from './huggingFace/huggingFaceConversationIO';
import {StabilityAIImageToImageIO} from './stabilityAI/stabilityAIImageToImageIO';
import {HuggingFaceTranslationIO} from './huggingFace/huggingFaceTranslationIO';
import {StabilityAITextToImageIO} from './stabilityAI/stabilityAITextToImageIO';
import {HuggingFaceFillMaskIO} from './huggingFace/huggingFaceFillMaskIO';
import {CohereTextGenerationIO} from './cohere/cohereTextGenerationIO';
import {CohereSummarizationIO} from './cohere/cohereSummarizationIO';
import {OpenAITextToSpeechIO} from './openAI/openAITextToSpeechIO';
import {OpenAISpeechToTextIO} from './openAI/openAISpeechToTextIO';
import {AzureSummarizationIO} from './azure/azureSummarizationIO';
import {AssemblyAIAudioIO} from './assemblyAI/assemblyAIAudioIO';
import {AzureTextToSpeechIO} from './azure/azureTextToSpeechIO';
import {AzureSpeechToTextIO} from './azure/azureSpeechToTextIO';
import {AzureTranslationIO} from './azure/azureTranslationIO';
import {OpenAIAssistantIO} from './openAI/openAIAssistantIO';
import {OpenAIImagesIO} from './openAI/openAIImagesIO';
import {BaseServiceIO} from './utils/baseServiceIO';
import {OpenAIChatIO} from './openAI/openAIChatIO';
import {CohereChatIO} from './cohere/cohereChatIO';
import {WebModel} from '../webModel/webModel';
import {MistralIO} from './mistral/mistralO';
import {ServiceIO} from './serviceIO';
import {botconversaChat} from '../botconversaChat';

// exercise caution when defining default returns for directConnection as their configs can be undefined
export class ServiceIOFactory {
  // this should only be called when no _activeService is set or is demo as otherwise we don't want to reconnect
  public static create(botconversaChat: botconversaChat): ServiceIO {
    const {directConnection, connect, demo, webModel} = botconversaChat;
    if (webModel) {
      return new WebModel(botconversaChat);
    }
    if (directConnection) {
      if (directConnection.openAI) {
        if (directConnection.openAI.images) {
          return new OpenAIImagesIO(botconversaChat);
        }
        if (directConnection.openAI.speechToText) {
          return new OpenAISpeechToTextIO(botconversaChat);
        }
        if (directConnection.openAI.textToSpeech) {
          return new OpenAITextToSpeechIO(botconversaChat);
        }
        if (directConnection.openAI.assistant) {
          return new OpenAIAssistantIO(botconversaChat);
        }
        return new OpenAIChatIO(botconversaChat);
      }
      if (directConnection.assemblyAI) {
        return new AssemblyAIAudioIO(botconversaChat);
      }
      if (directConnection.cohere) {
        if (directConnection.cohere.textGeneration) {
          return new CohereTextGenerationIO(botconversaChat);
        }
        if (directConnection.cohere.summarization) {
          return new CohereSummarizationIO(botconversaChat);
        }
        return new CohereChatIO(botconversaChat);
      }
      if (directConnection.huggingFace) {
        if (directConnection.huggingFace.textGeneration) {
          return new HuggingFaceTextGenerationIO(botconversaChat);
        }
        if (directConnection.huggingFace.summarization) {
          return new HuggingFaceSummarizationIO(botconversaChat);
        }
        if (directConnection.huggingFace.translation) {
          return new HuggingFaceTranslationIO(botconversaChat);
        }
        if (directConnection.huggingFace.fillMask) {
          return new HuggingFaceFillMaskIO(botconversaChat);
        }
        if (directConnection.huggingFace.questionAnswer) {
          return new HuggingFaceQuestionAnswerIO(botconversaChat);
        }
        if (directConnection.huggingFace.audioSpeechRecognition) {
          return new HuggingFaceAudioRecognitionIO(botconversaChat);
        }
        if (directConnection.huggingFace.audioClassification) {
          return new HuggingFaceAudioClassificationIO(botconversaChat);
        }
        if (directConnection.huggingFace.imageClassification) {
          return new HuggingFaceImageClassificationIO(botconversaChat);
        }
        return new HuggingFaceConversationIO(botconversaChat);
      }
      if (directConnection.azure) {
        if (directConnection.azure.speechToText) {
          return new AzureSpeechToTextIO(botconversaChat);
        }
        if (directConnection.azure.textToSpeech) {
          return new AzureTextToSpeechIO(botconversaChat);
        }
        if (directConnection.azure.summarization) {
          return new AzureSummarizationIO(botconversaChat);
        }
        if (directConnection.azure.translation) {
          return new AzureTranslationIO(botconversaChat);
        }
      }
      if (directConnection.stabilityAI) {
        if (directConnection.stabilityAI.imageToImage) {
          return new StabilityAIImageToImageIO(botconversaChat);
        }
        if (directConnection.stabilityAI.imageToImageUpscale) {
          return new StabilityAIImageToImageUpscaleIO(botconversaChat);
        }
        if (directConnection.stabilityAI.imageToImageMasking) {
          return new StabilityAIImageToImageMaskingIO(botconversaChat);
        }
        return new StabilityAITextToImageIO(botconversaChat);
      }
      if (directConnection.mistral) {
        return new MistralIO(botconversaChat);
      }
    }
    // if connect, make sure it is not a demo stream
    if (connect && (!demo || !connect.stream)) {
      return new BaseServiceIO(botconversaChat);
    }
    // when not directConnection and connect connection, we default to demo
    return new BaseServiceIO(botconversaChat, undefined, demo || true);
  }
}
