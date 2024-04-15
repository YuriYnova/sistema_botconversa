import {MessageContent} from 'botconversa-chat/dist/types/messages';

export interface botconversaChatTextRequestBody {
  messages: MessageContent[];
}

// model is added for OpenAI requests - check this file in the example ui project:
// https://github.com/botconversa//blob/main/example-servers/ui/src/App.tsx
export type botconversaChatOpenAITextRequestBody = botconversaChatTextRequestBody & {model?: string};
