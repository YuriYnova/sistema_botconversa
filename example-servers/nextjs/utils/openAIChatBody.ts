import {botconversaChatOpenAITextRequestBody} from '../types/botconversaChatTextRequestBody';

export function createReqChatBody(body: botconversaChatOpenAITextRequestBody, stream?: boolean) {
  // Text messages are stored inside request body using the botconversa Chat JSON format:
  // https://botconversachat.dev/docs/connect
  const chatBody = {
    messages: body.messages.map((message) => {
      return {role: message.role === 'ai' ? 'assistant' : message.role, content: message.text};
    }),
    model: body.model,
  } as {stream?: boolean};
  if (stream) chatBody.stream = true;
  return chatBody;
}
