/*
  # Create recognized faces table

  1. New Tables
    - `recognized_faces`
      - `id` (uuid, primary key)
      - `subject_id` (text)
      - `timestamp` (timestamp)
      - `confidence` (float)

  2. Security
    - Enable RLS on `recognized_faces` table
    - Add policies for authenticated users to manage face recognition data
*/

CREATE TABLE IF NOT EXISTS recognized_faces (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  subject_id text NOT NULL,
  timestamp timestamptz DEFAULT now(),
  confidence float NOT NULL
);

ALTER TABLE recognized_faces ENABLE ROW LEVEL SECURITY;

-- Allow authenticated users to read all recognized faces
CREATE POLICY "Users can read all recognized faces"
  ON recognized_faces
  FOR SELECT
  TO authenticated
  USING (true);

-- Allow authenticated users to insert recognized faces
CREATE POLICY "Users can insert recognized faces"
  ON recognized_faces
  FOR INSERT
  TO authenticated
  WITH CHECK (true);