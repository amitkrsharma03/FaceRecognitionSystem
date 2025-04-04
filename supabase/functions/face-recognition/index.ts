import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';

const BETAFACE_API_KEY = Deno.env.get('BETAFACE_API_KEY');
const BETAFACE_API_SECRET = Deno.env.get('BETAFACE_API_SECRET');
const BETAFACE_API_URL = 'https://www.betafaceapi.com/api/v2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { image } = await req.json();

    const response = await fetch(`${BETAFACE_API_URL}/face/detect`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${btoa(`${BETAFACE_API_KEY}:${BETAFACE_API_SECRET}`)}`,
      },
      body: JSON.stringify({
        api_key: BETAFACE_API_KEY,
        file_base64: image.split(',')[1],
        detect_qualities: true,
      }),
    });

    const data = await response.json();

    return new Response(JSON.stringify(data), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});