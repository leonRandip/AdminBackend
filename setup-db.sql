BEGIN;

-- 1) Table
CREATE TABLE IF NOT EXISTS jobs (
  id                    INTEGER PRIMARY KEY,
  title                 TEXT NOT NULL,
  company               TEXT NOT NULL,
  logo                  TEXT,
  logo_color            TEXT,
  experience            TEXT,
  work_type             TEXT,
  salary_label          TEXT,
  time_posted           TEXT,
  location              TEXT,
  description           JSONB,
  job_type              TEXT,
  salary_min            INTEGER,
  salary_max            INTEGER,
  job_description       TEXT,
  application_deadline  DATE,
  created_at            TIMESTAMPTZ,
  updated_at            TIMESTAMPTZ
);

-- 2) Seed data (upserts)

INSERT INTO jobs (
  id, title, company, logo, logo_color, experience, work_type,
  salary_label, time_posted, location, description, job_type,
  salary_min, salary_max, job_description, application_deadline,
  created_at, updated_at
) VALUES
  (1,'Full Stack Developer','Amazon','/amazon.png','#FF9900','1-3 yr Exp','Onsite',
   '12LPA','24h Ago','Bangalore',
   '["A user-friendly interface lets you browse stunning photos and videos","Filter destinations based on interests and travel style, and create personalized"]'::jsonb,
   'Full Time',12,12,
   'We are looking for a Full Stack Developer to join our team and help build scalable web applications.',
   '2024-12-31','2024-08-11T10:00:00Z','2024-08-11T10:00:00Z'),

  (2,'Node Js Developer','Tesla','/tesla.png','#E31937','1-3 yr Exp','Onsite',
   '12LPA','24h Ago','Mumbai',
   '["A user-friendly interface lets you browse stunning photos and videos","Filter destinations based on interests and travel style, and create personalized"]'::jsonb,
   'Full Time',12,12,
   'Join Tesla''s backend team to build amazing server-side applications.',
   '2024-12-25','2024-08-11T08:00:00Z','2024-08-11T08:00:00Z'),

  (3,'UX/UI Designer','Swiggy','/swiggy.png','#FC8019','1-3 yr Exp','Onsite',
   '12LPA','24h Ago','Delhi',
   '["A user-friendly interface lets you browse stunning photos and videos","Filter destinations based on interests and travel style, and create personalized"]'::jsonb,
   'Full Time',12,12,
   'Design intuitive interfaces for India''s leading food delivery platform.',
   '2024-12-20','2024-08-10T10:00:00Z','2024-08-10T10:00:00Z'),

  (4,'Full Stack Developer','Amazon','/amazon.png','#FF9900','1-3 yr Exp','Onsite',
   '12LPA','24h Ago','Chennai',
   '["A user-friendly interface lets you browse stunning photos and videos","Filter destinations based on interests and travel style, and create personalized"]'::jsonb,
   'Full Time',12,12,
   'Build robust full-stack applications for Amazon''s services.',
   '2024-12-28','2024-08-11T09:00:00Z','2024-08-11T09:00:00Z'),

  (5,'Node Js Developer','Tesla','/tesla.png','#E31937','1-3 yr Exp','Onsite',
   '12LPA','24h Ago','Hyderabad',
   '["A user-friendly interface lets you browse stunning photos and videos","Filter destinations based on interests and travel style, and create personalized"]'::jsonb,
   'Full Time',12,12,
   'Develop server-side applications for Tesla''s innovative solutions.',
   '2024-12-22','2024-08-11T07:00:00Z','2024-08-11T07:00:00Z'),

  (6,'UX/UI Designer','Swiggy','/swiggy.png','#FC8019','1-3 yr Exp','Onsite',
   '12LPA','24h Ago','Pune',
   '["A user-friendly interface lets you browse stunning photos and videos","Filter destinations based on interests and travel style, and create personalized"]'::jsonb,
   'Full Time',12,12,
   'Create amazing user experiences for food delivery platform.',
   '2024-12-26','2024-08-11T06:00:00Z','2024-08-11T06:00:00Z'),

  (7,'Full Stack Developer','Amazon','/amazon.png','#FF9900','1-3 yr Exp','Onsite',
   '12LPA','24h Ago','Kolkata',
   '["A user-friendly interface lets you browse stunning photos and videos","Filter destinations based on interests and travel style, and create personalized"]'::jsonb,
   'Full Time',12,12,
   'Build scalable web applications for Amazon''s global services.',
   '2024-12-24','2024-08-11T04:00:00Z','2024-08-11T04:00:00Z'),

  (8,'Node Js Developer','Tesla','/tesla.png','#E31937','1-3 yr Exp','Onsite',
   '12LPA','24h Ago','Ahmedabad',
   '["A user-friendly interface lets you browse stunning photos and videos","Filter destinations based on interests and travel style, and create personalized"]'::jsonb,
   'Full Time',12,12,
   'Develop backend services for Tesla''s automotive solutions.',
   '2024-12-30','2024-08-10T12:00:00Z','2024-08-10T12:00:00Z')
ON CONFLICT (id) DO UPDATE SET
  title=EXCLUDED.title,
  company=EXCLUDED.company,
  logo=EXCLUDED.logo,
  logo_color=EXCLUDED.logo_color,
  experience=EXCLUDED.experience,
  work_type=EXCLUDED.work_type,
  salary_label=EXCLUDED.salary_label,
  time_posted=EXCLUDED.time_posted,
  location=EXCLUDED.location,
  description=EXCLUDED.description,
  job_type=EXCLUDED.job_type,
  salary_min=EXCLUDED.salary_min,
  salary_max=EXCLUDED.salary_max,
  job_description=EXCLUDED.job_description,
  application_deadline=EXCLUDED.application_deadline,
  created_at=EXCLUDED.created_at,
  updated_at=EXCLUDED.updated_at;

COMMIT;