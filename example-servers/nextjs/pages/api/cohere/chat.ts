import {botconversaChatOpenAITextRequestBody} from '../../../types/botconversaChatTextRequestBody';
import {CohereChatResult} from 'botconversa-chat/dist/types/cohereResult';
import {MessageContent} from 'botconversa-chat/dist/types/messages';
import errorHandler from '../../../utils/errorHandler';
import {NextRequest, NextResponse} from 'next/server';

export const config = {
  runtime: 'edge',
};

// Make sure to set the COHERE_API_KEY environment variable

async function handler(req: NextRequest) {
  const textRequestBody = (await req.json()) as botconversaChatOpenAITextRequestBody;
  console.log(textRequestBody);

  const chatBody = createChatBody(textRequestBody.messages);

  const result = await fetch('https://api.cohere.ai/v1/chat', {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.COHERE_API_KEY}`,
    },
    method: 'POST',
    body: JSON.stringify(chatBody),
  });

  const cohereResult = (await result.json()) as CohereChatResult;
  if (cohereResult.message) throw cohereResult.message;
  // Sends response back to botconversa Chat using the Response format:
  // https://botconversachat.dev/docs/connect/#Response
  return NextResponse.json({text: cohereResult.text});
}

function createChatBody(messages: MessageContent[]) {
  // Text messages are stored inside request body using the botconversa Chat JSON format:
  // https://botconversachat.dev/docs/connect
  return {
    query: messages[messages.length - 1].text,
    chat_history: messages.slice(0, messages.length - 1).map((message) => {
      return {user_name: message.role === 'ai' ? 'CHATBOT' : 'USER', text: message.text};
    }),
  };
}

export default errorHandler(handler);
