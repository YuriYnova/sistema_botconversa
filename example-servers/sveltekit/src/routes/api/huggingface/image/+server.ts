import type {HuggingFaceClassificationResult} from 'botconversa-chat/dist/types/huggingFaceResult';
import type {RequestHandler} from '@sveltejs/kit';

export const config = {
  runtime: 'edge',
};

// Make sure to set the HUGGING_FACE_API_KEY environment variable

// You can use an example image here: https://github.com/botconversa//blob/main/example-servers/ui/assets/example-image.png
export const POST: RequestHandler = async ({request}) => {
  // Files are stored inside a form using botconversa Chat request FormData format:
  // https://botconversachat.dev/docs/connect
  const reqFormData = await request.formData();
  const file = reqFormData.get('files') as Blob;

  const result = await fetch('https://api-inference.huggingface.co/models/google/vit-base-patch16-224', {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.HUGGING_FACE_API_KEY}`,
    },
    method: 'POST',
    body: file,
  });

  const huggingFaceResult = (await result.json()) as HuggingFaceClassificationResult;
  if (huggingFaceResult.error) throw huggingFaceResult.error;
  // Sends response back to botconversa Chat using the Response format:
  // https://botconversachat.dev/docs/connect/#Response
  return new Response(JSON.stringify({text: huggingFaceResult[0].label}), {
    headers: {
      'content-type': 'application/json',
    },
  });
};
