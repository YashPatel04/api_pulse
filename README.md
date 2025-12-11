# API Pulse

A web application for scheduling automated HTTP requests to API endpoints.

## Features

- Schedule API calls (GET/POST) to run on intervals
- Monitor execution logs and response status
- User authentication with Supabase
- Serverless backend using Supabase Edge Functions

## Quick Start

1. **Clone and Install**
   ```bash
   cd frontend
   npm install
   cd ../scheduler
   npm install
   ```

2. **Setup Environment Variables**
   ```bash
   # frontend/.env.local
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
   ```

3. **Run Frontend**
   ```bash
   cd frontend
   npm run dev
   ```
   Open http://localhost:3000

4. **Deploy Backend**
   - Deploy functions in `backend/functions/` to Supabase Edge Functions
   - Deploy database schema from `database/schema.sql`

5. **Setup Scheduler**
   - Configure GitHub Actions using `.github/workflows/schedule-tasks.yml`
   - Or run locally: `node scheduler/scheduler.js`

## Project Structure

```
API_Pulse/
├── frontend/          # Next.js frontend
├── backend/functions/ # Supabase Edge Functions
├── database/         # PostgreSQL schema
├── scheduler/        # Task execution scheduler
└── .github/workflows/ # GitHub Actions
```

## API Endpoints

- `POST /functions/v1/create-task` - Create a new task
- `GET /functions/v1/list-tasks` - List user's tasks
- `GET /functions/v1/get-task-logs/:id` - Get task execution logs
- `DELETE /functions/v1/delete-task/:id` - Delete a task




-- edge functions are added
-- db is created
-- auth is working but still need to work on it
-- need to connect it to github actions
-- API scheduling functionality is still not working