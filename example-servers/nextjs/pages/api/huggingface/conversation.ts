import {botconversaChatOpenAITextRequestBody, botconversaChatTextRequestBody} from '../../../types/botconversaChatTextRequestBody';
import {HuggingFaceConversationResult} from 'botconversa-chat/dist/types/huggingFaceResult';
import errorHandler from '../../../utils/errorHandler';
import {NextRequest, NextResponse} from 'next/server';

export const config = {
  runtime: 'edge',
};

// Make sure to set the HUGGING_FACE_API_KEY environment variable

async function handler(req: NextRequest) {
  // Text messages are stored inside request body using the botconversa Chat JSON format:
  // https://botconversachat.dev/docs/connect
  const textRequestBody = (await req.json()) as botconversaChatOpenAITextRequestBody;
  console.log(textRequestBody);

  const conversationBody = createReqConversationBody(textRequestBody.messages);

  const result = await fetch('https://api-inference.huggingface.co/models/facebook/blenderbot-400M-distill', {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.HUGGING_FACE_API_KEY}`,
    },
    method: 'POST',
    body: JSON.stringify(conversationBody),
  });

  const huggingFaceResult = (await result.json()) as HuggingFaceConversationResult;
  if (huggingFaceResult.error) throw huggingFaceResult.error;
  // Sends response back to botconversa Chat using the Response format:
  // https://botconversachat.dev/docs/connect/#Response
  return NextResponse.json({text: huggingFaceResult.generated_text});
}

function createReqConversationBody(messages: botconversaChatTextRequestBody['messages']) {
  const {text} = messages[messages.length - 1];
  const previousMessages = messages.slice(0, messages.length - 1);
  if (!text) return;
  const past_user_inputs = previousMessages.filter((message) => message.role === 'user').map((message) => message.text);
  const generated_responses = previousMessages.filter((message) => message.role === 'ai').map((message) => message.text);
  return {inputs: {past_user_inputs, generated_responses, text}, wait_for_model: true};
}

export default errorHandler(handler);
