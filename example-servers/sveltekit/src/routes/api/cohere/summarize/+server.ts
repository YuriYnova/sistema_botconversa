import type {botconversaChatOpenAITextRequestBody} from '../../../types/botconversaChatTextRequestBody';
import type {CohereSummarizationResult} from 'botconversa-chat/dist/types/cohereResult';
import type {RequestHandler} from '@sveltejs/kit';

export const config = {
  runtime: 'edge',
};

// Make sure to set the COHERE_API_KEY environment variable

export const POST: RequestHandler = async ({request}) => {
  // Text messages are stored inside request body using the botconversa Chat JSON format:
  // https://botconversachat.dev/docs/connect
  const summarizationBody = (await request.json()) as botconversaChatOpenAITextRequestBody;
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
  return new Response(JSON.stringify({text: cohereResult.summary}), {
    headers: {
      'content-type': 'application/json',
    },
  });
};
