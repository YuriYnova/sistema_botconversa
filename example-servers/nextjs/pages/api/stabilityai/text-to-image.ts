import {botconversaChatOpenAITextRequestBody} from '../../../types/botconversaChatTextRequestBody';
import {StabilityAITextToImageResult} from 'botconversa-chat/dist/types/stabilityAIResult';
import errorHandler from '../../../utils/errorHandler';
import {NextRequest, NextResponse} from 'next/server';

export const config = {
  runtime: 'edge',
};

// Make sure to set the STABILITY_API_KEY environment variable

async function handler(req: NextRequest) {
  // Text messages are stored inside request body using the botconversa Chat JSON format:
  // https://botconversachat.dev/docs/connect
  const textRequestBody = (await req.json()) as botconversaChatOpenAITextRequestBody;
  console.log(textRequestBody);

  const descriptionBody = {text_prompts: [{text: textRequestBody.messages[0].text}]};

  const result = await fetch('https://api.stability.ai/v1/generation/stable-diffusion-v1-6/text-to-image', {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.STABILITY_API_KEY}`,
    },
    method: 'POST',
    body: JSON.stringify(descriptionBody),
  });

  const stabilityAIResult = (await result.json()) as StabilityAITextToImageResult;
  if (stabilityAIResult.message) throw stabilityAIResult.message;
  // Sends response back to botconversa Chat using the Response format:
  // https://botconversachat.dev/docs/connect/#Response
  return NextResponse.json({
    files: [{type: 'image', src: `data:image/png;base64,${stabilityAIResult.artifacts[0].base64}`}],
  });
}

export default errorHandler(handler);
