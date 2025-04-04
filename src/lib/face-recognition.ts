export async function enrollUser(imageBase64: string, subjectId: string) {
  try {
    const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/enroll-user`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        image: imageBase64,
        subject_id: subjectId,
      }),
    });

    if (!response.ok) {
      throw new Error('Enrollment failed');
    }

    return await response.json();
  } catch (error) {
    console.error('Error enrolling user:', error);
    throw error;
  }
}

export async function recognizeUser(imageBase64: string) {
  try {
    const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/recognize-user`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        image: imageBase64,
      }),
    });

    if (!response.ok) {
      throw new Error('Recognition failed');
    }

    return await response.json();
  } catch (error) {
    console.error('Error recognizing user:', error);
    throw error;
  }
}