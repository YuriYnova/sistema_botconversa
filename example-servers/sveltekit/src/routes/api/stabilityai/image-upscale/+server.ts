import type {StabilityAITextToImageResult} from 'botconversa-chat/dist/types/stabilityAIResult';
import type {RequestHandler} from '@sveltejs/kit';

export const config = {
  runtime: 'edge',
};

// Make sure to set the STABILITY_API_KEY environment variable

// You can use an example image here: https://github.com/botconversa//blob/main/example-servers/ui/assets/example-image.png
export const POST: RequestHandler = async ({request}) => {
  // Files are stored inside a form using botconversa Chat request FormData format:
  // https://botconversachat.dev/docs/connect
  const reqFormData = await request.formData();
  const file = reqFormData.get('files') as Blob;
  const imageToImageFormData = new FormData();
  imageToImageFormData.append('image', file);

  const result = await fetch('https://api.stability.ai/v1/generation/esrgan-v1-x2plus/image-to-image/upscale', {
    // Be careful not to overwrite Content-Type headers as the Boundary header will not be automatically set
    headers: {Authorization: `Bearer ${process.env.STABILITY_API_KEY}`},
    method: 'POST',
    body: imageToImageFormData as unknown as string, // This gets rid of the type error for fetch
  });

  const stabilityAIResult = (await result.json()) as StabilityAITextToImageResult;
  if (stabilityAIResult.message) throw stabilityAIResult.message;
  // Sends response back to botconversa Chat using the Response format:
  // https://botconversachat.dev/docs/connect/#Response
  return new Response(
    JSON.stringify({type: 'image', src: `data:image/png;base64,${stabilityAIResult.artifacts[0].base64}`}),
    {
      headers: {
        'content-type': 'application/json',
      },
    }
  );
};
