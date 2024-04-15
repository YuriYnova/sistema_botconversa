import {botconversaChatOpenAITextRequestBody} from '../../../types/botconversaChatTextRequestBody';
import {CohereSummarizationResult} from 'botconversa-chat/dist/types/cohereResult';
import errorHandler from '../../../utils/errorHandler';
import {NextRequest, NextResponse} from 'next/server';

export const config = {
  runtime: 'edge',
};

// Make sure to set the COHERE_API_KEY environment variable

async function handler(req: NextRequest) {
  // Text messages are stored inside request body using the botconversa Chat JSON format:
  // https://botconversachat.dev/docs/connect
  const summarizationBody = (await req.json()) as botconversaChatOpenAITextRequestBody;
  console.log(summarizationBody);

  const generationBody = {text: summarizationBody.messages[0].text};

  const result = await fetch('https://api.cohere.ai/v1/summarize', {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.COHERE_API_KEY}`,
    },
    method: 'POST',
    body: JSON.stringify(generationBody),
  });

  const cohereResult = (await result.json()) as CohereSummarizationResult;
  if (cohereResult.message) throw cohereResult.message;
  // Sends response back to botconversa Chat using the Response format:
  // https://botconversachat.dev/docs/connect/#Response
  return NextResponse.json({text: cohereResult.summary});
}

export default errorHandler(handler);
