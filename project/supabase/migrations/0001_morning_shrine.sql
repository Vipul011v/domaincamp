/*
  # Create certificates table

  1. New Tables
    - `certificates`
      - `id` (uuid, primary key)
      - `student_name` (text)
      - `course` (text)
      - `issue_date` (date)
      - `hash` (text, unique)
      - `created_at` (timestamp)
  
  2. Security
    - Enable RLS on `certificates` table
    - Add policies for reading and creating certificates
*/

CREATE TABLE IF NOT EXISTS certificates (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  student_name text NOT NULL,
  course text NOT NULL,
  issue_date date NOT NULL,
  hash text UNIQUE NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE certificates ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read certificates"
  ON certificates
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can create certificates"
  ON certificates
  FOR INSERT
  TO authenticated
  WITH CHECK (true);