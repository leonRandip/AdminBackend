# Job Management Backend

A NestJS backend application for managing job postings with PostgreSQL database.

## Features

- **CRUD Operations**: Create, read, update, and delete job postings
- **Advanced Filtering**: Search by title/company, filter by location, job type, and salary range
- **Pagination**: Built-in pagination support
- **Data Validation**: Input validation using class-validator
- **TypeORM Integration**: Database operations with PostgreSQL

## Prerequisites

- Node.js (v16 or higher)
- PostgreSQL database
- npm or yarn

## Installation

1. **Install dependencies:**

   ```bash
   npm install
   ```

2. **Database Setup:**

   - Create a PostgreSQL database named `job_management`
   - Update database credentials in `config.env` file

3. **Environment Configuration:**
   ```bash
   cp config.env .env
   # Edit .env with your database credentials
   ```

## Deployment

### Render.com Hosting

This backend is configured for easy deployment on Render.com. See [RENDER_DEPLOYMENT.md](./RENDER_DEPLOYMENT.md) for detailed deployment instructions.

**Quick Setup:**

1. Push your code to a Git repository
2. Create a new Web Service on Render.com
3. Connect your repository
4. Create a PostgreSQL database service
5. Deploy!

**Key Features for Render:**

- Automatic SSL configuration for production
- Environment-based CORS configuration
- Optimized database connection settings
- Production-ready build scripts

### Other Platforms

The application can also be deployed to other platforms like:

- Heroku
- DigitalOcean App Platform
- Railway
- AWS Elastic Beanstalk

## Database Schema

The application will automatically create the following table:

### Jobs Table

- `id`: Primary key (auto-increment)
- `title`: Job title
- `company`: Company name
- `logo`: Company logo path (optional)
- `logoColor`: Logo fallback color (optional)
- `experience`: Experience requirement
- `workType`: Work type (Onsite, Remote, Hybrid)
- `salary`: Salary display string
- `timePosted`: Time posted string
- `location`: Job location
- `description`: Array of job descriptions
- `jobType`: Job type (Full Time, Part Time, etc.)
- `salaryMin`: Minimum salary in LPA
- `salaryMax`: Maximum salary in LPA
- `jobDescription`: Detailed job description
- `applicationDeadline`: Application deadline date
- `createdAt`: Creation timestamp
- `updatedAt`: Last update timestamp

## Running the Application

### Development Mode

```bash
npm run start:dev
```

### Production Mode

```bash
npm run build
npm run start:prod
```

## API Endpoints

### Jobs

- `GET /jobs` - Get all jobs with filtering and pagination
- `GET /jobs/:id` - Get a specific job by ID
- `POST /jobs` - Create a new job
- `PATCH /jobs/:id` - Update an existing job
- `DELETE /jobs/:id` - Delete a job

### Query Parameters

- `searchQuery`: Search in job title and company name
- `location`: Filter by location
- `jobType`: Filter by job type
- `salaryMin`: Minimum salary filter (in thousands)
- `salaryMax`: Maximum salary filter (in thousands)
- `page`: Page number for pagination
- `limit`: Number of items per page

### Example API Calls

```bash
# Get all jobs
GET /jobs

# Search for "developer" jobs
GET /jobs?searchQuery=developer

# Filter by location and job type
GET /jobs?location=Bangalore&jobType=Onsite

# Filter by salary range (50k to 100k)
GET /jobs?salaryMin=50&salaryMax=100

# Pagination
GET /jobs?page=1&limit=20
```

## Data Seeding

The application automatically seeds initial job data when the database is empty. This includes sample jobs for Amazon, Tesla, and Swiggy.

## CORS Configuration

The backend is configured to accept requests from `http://localhost:3000` (frontend) with credentials enabled.

## Error Handling

- **404 Not Found**: Job with specified ID doesn't exist
- **400 Bad Request**: Invalid input data
- **500 Internal Server Error**: Server-side errors

## Development

### Project Structure

```
src/
├── jobs/
│   ├── dto/
│   │   ├── create-job.dto.ts
│   │   ├── update-job.dto.ts
│   │   └── query-job.dto.ts
│   ├── entities/
│   │   └── job.entity.ts
│   ├── jobs.controller.ts
│   ├── jobs.service.ts
│   └── jobs.module.ts
├── app.module.ts
└── main.ts
```

### Adding New Features

1. Create DTOs for data validation
2. Add entity properties if needed
3. Implement service methods
4. Add controller endpoints
5. Update module configuration

## License

ISC
