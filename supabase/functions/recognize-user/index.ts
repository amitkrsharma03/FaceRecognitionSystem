import { createClient } from 'npm:@supabase/supabase-js@2.39.7';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

interface RecognizeRequest {
  image: string;
}

const supabase = createClient(
  Deno.env.get('SUPABASE_URL') ?? '',
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
);

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { image }: RecognizeRequest = await req.json();

    console.log('Attempting to recognize user...');

    const response = await fetch('https://api.kairos.com/recognize', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'app_id': '57b149b3',
        'app_key': 'd74c3000e2825e081fe637f5830020e8'
      },
      body: JSON.stringify({
        image,
        gallery_name: 'college_students'
      })
    });

    const data = await response.json();
    console.log('Kairos recognition response:', data);

    // If face is recognized, store in Supabase
    if (data.images?.[0]?.candidates?.[0]) {
      const candidate = data.images[0].candidates[0];
      const { error } = await supabase
        .from('recognized_faces')
        .insert({
          subject_id: candidate.subject_id,
          confidence: candidate.confidence,
        });

      if (error) {
        console.error('Supabase insert error:', error);
      }
    }

    return new Response(
      JSON.stringify(data),
      { 
        headers: { 
          ...corsHeaders,
          'Content-Type': 'application/json'
        }
      }
    );
  } catch (error) {
    console.error('Recognition error:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500,
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json'
        }
      }
    );
  }
});