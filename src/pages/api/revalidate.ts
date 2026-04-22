import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ request }) => {
  try {
    // Get the signature from headers
    const secret = request.headers.get('x-sanity-signature');
    
    // Validate against environment variable
    const REVALIDATE_SECRET = import.meta.env.REVALIDATE_SECRET;
    
    if (!REVALIDATE_SECRET) {
      console.error('REVALIDATE_SECRET not configured');
      return new Response(JSON.stringify({ 
        error: 'Server configuration error',
        message: 'REVALIDATE_SECRET not set' 
      }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    if (secret !== REVALIDATE_SECRET) {
      console.error('Invalid signature received');
      return new Response(JSON.stringify({ 
        error: 'Invalid signature',
        message: 'The provided signature does not match' 
      }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Optional: Try to parse body but don't fail if it's not JSON
    let body;
    try {
      const text = await request.text();
      if (text) {
        body = JSON.parse(text);
      }
    } catch (e) {
      console.log('No JSON body or failed to parse, continuing anyway');
    }

    console.log('Revalidation triggered successfully', { body });

    // Trigger Vercel revalidation
    return new Response(
      JSON.stringify({ 
        revalidated: true, 
        now: Date.now(),
        message: 'Cache purged successfully'
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'x-vercel-purge': '1',
        }
      }
    );
  } catch (err) {
    console.error('Revalidation error:', err);
    return new Response(
      JSON.stringify({ 
        error: 'Error revalidating',
        message: err instanceof Error ? err.message : 'Unknown error'
      }), 
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
};