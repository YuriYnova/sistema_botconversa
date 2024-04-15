// https://kit.svelte.dev/docs/hooks#shared-hooks
// https://vercel.com/docs/frameworks/sveltekit#edge-middleware
export async function handleError({error}): Promise<Error> {
  console.error('API Error:', error);
  const message = (error as Error)?.message || 'error';
  // Sends response back to botconversa Chat using the Response format:
  // https://botconversachat.dev/docs/connect/#Response
  return {error: message} as unknown as Error;
}
