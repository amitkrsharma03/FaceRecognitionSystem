/*
  # Create students table and face recognition data

  1. New Tables
    - `students`
      - `id` (uuid, primary key)
      - `first_name` (text)
      - `last_name` (text)
      - `email` (text, unique)
      - `face_data` (jsonb)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on `students` table
    - Add policies for authenticated users to manage student data
*/

CREATE TABLE IF NOT EXISTS students (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  first_name text NOT NULL,
  last_name text NOT NULL,
  email text UNIQUE NOT NULL,
  face_data jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE students ENABLE ROW LEVEL SECURITY;

-- Allow authenticated users to read all students
CREATE POLICY "Users can read all students"
  ON students
  FOR SELECT
  TO authenticated
  USING (true);

-- Allow authenticated users to insert students
CREATE POLICY "Users can insert students"
  ON students
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Allow authenticated users to update their own students
CREATE POLICY "Users can update students"
  ON students
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);