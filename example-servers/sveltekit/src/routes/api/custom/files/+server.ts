import type {RequestHandler} from '@sveltejs/kit';

export const config = {
  runtime: 'edge',
};

export const POST: RequestHandler = async ({request}) => {
  // Files are stored inside a form using botconversa Chat request FormData format:
  // https://botconversachat.dev/docs/connect
  const formData = await request.formData();
  formData.forEach((data) => {
    if (data instanceof File) {
      console.log('File:');
      console.log(data);
    } else {
      // When sending text along with files, it is stored inside the request body using the botconversa Chat JSON format:
      // https://botconversachat.dev/docs/connect
      console.log('Message:');
      console.log(data);
    }
  });
  // Sends response back to botconversa Chat using the Response format:
  // https://botconversachat.dev/docs/connect/#Response
  return new Response(
    JSON.stringify({text: 'This is a respone from a SvelteKit edge server. Thankyou for your message!'}),
    {
      headers: {
        'content-type': 'application/json',
      },
    }
  );
};
