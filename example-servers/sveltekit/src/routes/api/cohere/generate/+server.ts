import type {botconversaChatOpenAITextRequestBody} from '../../../types/botconversaChatTextRequestBody';
import type {CohereCompletionsResult} from 'botconversa-chat/dist/types/cohereResult';
import type {RequestHandler} from '@sveltejs/kit';

export const config = {
  runtime: 'edge',
};

// Make sure to set the COHERE_API_KEY environment variable

export const POST: RequestHandler = async ({request}) => {
  // Text messages are stored inside request body using the botconversa Chat JSON format:
  // https://botconversachat.dev/docs/connect
  const textRequestBody = (await request.json()) as botconversaChatOpenAITextRequestBody;
  console.log(textRequestBody);

  const generationBody = {prompt: textRequestBody.messages[0].text};

  const result = await fetch('https://api.cohere.ai/v1/generate', {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.COHERE_API_KEY}`,
    },
    method: 'POST',
    body: JSON.stringify(generationBody),
  });

  const cohereResult = (await result.json()) as CohereCompletionsResult;
  if (cohereResult.message) throw cohereResult.message;
  // Sends response back to botconversa Chat using the Response format:
  // https://botconversachat.dev/docs/connect/#Response
  return new Response(JSON.stringify({text: cohereResult.generations?.[0].text || ''}), {
    headers: {
      'content-type': 'application/json',
    },
  });
};
