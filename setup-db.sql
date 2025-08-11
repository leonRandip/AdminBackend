-- Create the database
CREATE DATABASE job_management;

-- Connect to the database
\c job_management;

-- The tables will be created automatically by TypeORM when the application starts
-- This script just ensures the database exists

-- You can also manually create the table if needed:
/*
CREATE TABLE jobs (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    company VARCHAR(255) NOT NULL,
    logo VARCHAR(255),
    logo_color VARCHAR(50),
    experience VARCHAR(100) NOT NULL,
    work_type VARCHAR(50) NOT NULL,
    salary VARCHAR(100) NOT NULL,
    time_posted VARCHAR(100) NOT NULL,
    location VARCHAR(255) NOT NULL,
    description TEXT[] DEFAULT '{}',
    job_type VARCHAR(100) NOT NULL,
    salary_min DECIMAL(10,2),
    salary_max DECIMAL(10,2),
    job_description TEXT,
    application_deadline DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
*/
