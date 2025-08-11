# Render.com Deployment Troubleshooting Guide

This guide helps resolve common deployment issues on Render.com.

## Common Issues and Solutions

### 1. Missing Dependencies Error

**Error**: `Cannot find module '@nestjs/mapped-types'`

**Solution**:

- Ensure all required packages are in `package.json`
- Use `npm ci` instead of `npm install` for more reliable builds
- Check that all imports have corresponding dependencies

**Required Dependencies for this project**:

```json
{
  "@nestjs/core": "^10.0.0",
  "@nestjs/common": "^10.0.0",
  "@nestjs/platform-express": "^10.0.0",
  "@nestjs/typeorm": "^10.0.0",
  "@nestjs/config": "^3.0.0",
  "@nestjs/mapped-types": "^2.0.0",
  "typeorm": "^0.3.0",
  "pg": "^8.11.0",
  "class-validator": "^0.14.0",
  "class-transformer": "^0.5.1",
  "reflect-metadata": "^0.1.13",
  "rxjs": "^7.8.0",
  "express": "^4.18.0"
}
```

### 2. Build Failures

**Common Causes**:

- Missing dependencies
- TypeScript compilation errors
- Build script failures

**Solutions**:

1. **Check package.json**: Ensure all imports have corresponding dependencies
2. **Verify build script**: `npm run build` should work locally
3. **Check TypeScript config**: Ensure `tsconfig.json` is properly configured
4. **Use npm ci**: More reliable than `npm install` for CI/CD

### 3. Database Connection Issues

**Error**: Database connection timeout or SSL errors

**Solutions**:

1. **Verify environment variables**: Check database service linking
2. **SSL configuration**: Ensure SSL is properly configured for production
3. **Connection pooling**: Check connection limits and timeouts
4. **Database service status**: Ensure PostgreSQL service is running

### 4. CORS Issues

**Error**: CORS policy violations

**Solutions**:

1. **Check ALLOWED_ORIGINS**: Ensure frontend domain is included
2. **Environment variables**: Verify CORS configuration is set correctly
3. **Frontend URL**: Confirm the exact URL being used

### 5. Port Binding Issues

**Error**: Port already in use or binding failures

**Solutions**:

1. **Use 0.0.0.0**: Bind to all interfaces for Render
2. **Environment PORT**: Ensure PORT environment variable is set
3. **Port conflicts**: Check if port is already in use

## Build Process Optimization

### Recommended Build Command

```bash
npm ci && npm run build
```

### Why npm ci instead of npm install?

- **Faster**: Skips user interaction and optional dependencies
- **Reliable**: Uses package-lock.json for exact versions
- **CI/CD friendly**: Designed for automated environments
- **Clean installs**: Removes node_modules before installing

## Environment Variable Checklist

**Required for Production**:

- `NODE_ENV`: `production`
- `PORT`: `10000` (or your preferred port)
- `ALLOWED_ORIGINS`: Your frontend domain(s)
- Database variables (auto-linked from PostgreSQL service)

## Pre-deployment Checklist

Before deploying to Render:

1. **Local Testing**:

   - `npm run build` succeeds
   - `npm run start:prod` works locally
   - All dependencies are in package.json

2. **Dependencies**:

   - Check all imports have corresponding packages
   - Verify package versions are compatible
   - Ensure no missing peer dependencies

3. **Configuration**:
   - Environment variables are set
   - Database configuration is correct
   - CORS origins are properly configured

## Debugging Steps

### 1. Check Build Logs

- Look for dependency installation errors
- Check TypeScript compilation issues
- Verify build script execution

### 2. Verify Dependencies

- Compare imports with package.json
- Check for missing peer dependencies
- Ensure all NestJS packages are included

### 3. Test Locally

- Run `npm ci` locally
- Test `npm run build`
- Verify `npm run start:prod`

## Getting Help

If issues persist:

1. **Check Render Logs**: Use Render's built-in logging
2. **Local Reproduction**: Try to reproduce the issue locally
3. **Dependency Audit**: Run `npm audit` to check for issues
4. **Render Support**: Contact Render support for platform-specific issues

## Quick Fix Commands

```bash
# Clean install dependencies
npm ci

# Build the project
npm run build

# Test production start
npm run start:prod

# Check for missing dependencies
npm ls

# Audit dependencies
npm audit
```
