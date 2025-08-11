# Render.com Deployment Guide

This guide will help you deploy the Job Management Backend to Render.com.

## Prerequisites

1. A Render.com account
2. Your backend code pushed to a Git repository (GitHub, GitLab, etc.)

## Deployment Steps

### 1. Connect Your Repository

1. Log in to [Render.com](https://render.com)
2. Click "New +" and select "Web Service"
3. Connect your Git repository
4. Select the repository containing this backend code

### 2. Configure the Web Service

Use the following configuration:

- **Name**: `job-management-backend` (or your preferred name)
- **Environment**: `Node`
- **Region**: Choose the closest to your users
- **Branch**: `main` (or your default branch)
- **Build Command**: `npm install && npm run build`
- **Start Command**: `npm run start:prod`

### 3. Environment Variables

Set the following environment variables in Render:

- `NODE_ENV`: `production`
- `PORT`: `10000`
- `ALLOWED_ORIGINS`: `https://your-frontend-domain.com,http://localhost:3000`
  - Replace `your-frontend-domain.com` with your actual frontend domain

### 4. Create PostgreSQL Database

1. In Render dashboard, click "New +" and select "PostgreSQL"
2. Configure:
   - **Name**: `job-management-db`
   - **Database**: `job_management`
   - **User**: `job_management_user`
   - **Plan**: Choose based on your needs (Free tier available)

### 5. Link Database to Web Service

1. In your web service settings, go to "Environment"
2. Add the following environment variables that link to your database:
   - `DB_HOST`: Link from database service
   - `DB_PORT`: Link from database service
   - `DB_USERNAME`: Link from database service
   - `DB_PASSWORD`: Link from database service
   - `DB_NAME`: Link from database service

### 6. Deploy

1. Click "Create Web Service"
2. Render will automatically build and deploy your application
3. Monitor the build logs for any issues

## Alternative: Use render.yaml

If you prefer, you can use the included `render.yaml` file:

1. Push the `render.yaml` file to your repository
2. In Render, select "Blueprint" instead of "Web Service"
3. Connect your repository
4. Render will automatically configure everything based on the YAML file

## Important Notes

### CORS Configuration

- Update `ALLOWED_ORIGINS` to include your actual frontend domain
- For development, you can include `http://localhost:3000`
- For production, use HTTPS URLs only

### Database

- The free PostgreSQL plan has limitations
- Consider upgrading for production use
- Database data persists between deployments

### Environment Variables

- Never commit sensitive information to your repository
- Use Render's environment variable system for secrets
- Database credentials are automatically managed by Render

## Troubleshooting

### Build Failures

- Check that all dependencies are in `package.json`
- Ensure the build command works locally
- Check build logs for specific error messages

### Database Connection Issues

- Verify database service is running
- Check environment variables are properly linked
- Ensure SSL configuration is correct for production

### CORS Issues

- Verify `ALLOWED_ORIGINS` includes your frontend domain
- Check that your frontend is making requests to the correct backend URL

## Monitoring

- Use Render's built-in logging
- Set up health checks if needed
- Monitor database performance
- Set up alerts for service downtime

## Scaling

- Start with the free tier
- Upgrade to paid plans as needed
- Consider horizontal scaling for high traffic
- Monitor resource usage and optimize accordingly
