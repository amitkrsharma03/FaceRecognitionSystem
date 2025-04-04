const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

interface EnrollRequest {
  image: string;
  subject_id: string;
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { image, subject_id }: EnrollRequest = await req.json();

    console.log('Enrolling user:', subject_id);

    const response = await fetch('https://api.kairos.com/enroll', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'app_id': '57b149b3',
        'app_key': 'd74c3000e2825e081fe637f5830020e8'
      },
      body: JSON.stringify({
        image,
        subject_id,
        gallery_name: 'college_students'
      })
    });

    const data = await response.json();
    console.log('Kairos enrollment response:', data);

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
    console.error('Enrollment error:', error);
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