CREATE TABLE public.programs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  name_ar TEXT,
  description TEXT,
  description_ar TEXT,
  subjects TEXT[] NOT NULL DEFAULT '{}',
  subjects_ar TEXT[] NOT NULL DEFAULT '{}',
  display_order INT NOT NULL DEFAULT 0,
  is_visible BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TRIGGER set_programs_updated_at
  BEFORE UPDATE ON public.programs
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

ALTER TABLE public.programs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "programs_select_public"
  ON public.programs FOR SELECT TO anon, authenticated
  USING (is_visible = true);

CREATE POLICY "programs_select_admin"
  ON public.programs FOR SELECT TO authenticated
  USING (public.is_admin());

CREATE POLICY "programs_insert_admin"
  ON public.programs FOR INSERT TO authenticated
  WITH CHECK (public.is_admin());

CREATE POLICY "programs_update_admin"
  ON public.programs FOR UPDATE TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

CREATE POLICY "programs_delete_admin"
  ON public.programs FOR DELETE TO authenticated
  USING (public.is_admin());

GRANT SELECT ON public.programs TO anon;
GRANT ALL ON public.programs TO authenticated;

-- Seed the 4 default programs
INSERT INTO public.programs (name, name_ar, description, description_ar, subjects, display_order) VALUES
(
  'GCSE',
  'GCSE',
  'Our GCSE programme supports Year 10 and 11 students sitting Cambridge IGCSE and Edexcel GCSE examinations. We cover all core and extended subjects with a focus on exam technique and conceptual clarity.',
  NULL,
  ARRAY['Mathematics','Further Mathematics','Physics','Chemistry','Biology','Computer Science','English Language','English Literature','Arabic Language','History','Geography','Economics','Business Studies','Art & Design'],
  0
),
(
  'A-Level',
  'A-Level',
  'For students in Years 12 and 13 preparing for A-Level examinations. Our tutors specialise in the subjects most commonly required for university admissions, with structured revision plans and past paper practice.',
  NULL,
  ARRAY['Mathematics','Further Mathematics','Physics','Chemistry','Biology','Computer Science','Economics','Business Studies','Psychology','English Literature','Arabic Language','History','Sociology'],
  1
),
(
  'IB',
  'IB',
  'We support IB Diploma students across Higher and Standard Level subjects. Sessions cover the full IB syllabus including Internal Assessments, Extended Essays, and exam preparation.',
  NULL,
  ARRAY['Mathematics: Analysis & Approaches','Mathematics: Applications & Interpretation','Physics','Chemistry','Biology','Computer Science','Economics','Business Management','Psychology','English A: Literature','English B','Arabic B','History','Geography','Environmental Systems'],
  2
),
(
  'Tawjihi',
  'التوجيهي',
  'Complete preparation for the Palestinian General Secondary Education Certificate (Tawjihi). We cover all branches — Scientific, Literary, and Commercial — with tutors who understand the Ministry of Education curriculum.',
  NULL,
  ARRAY['Arabic Language','English Language','Mathematics','Physics','Chemistry','Biology','History','Geography','Islamic Education','Physical Education','Computer Science','Economics'],
  3
);
