-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table (handled by Supabase Auth, but adding profile info)
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email VARCHAR(255) UNIQUE NOT NULL,
  full_name VARCHAR(255),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- API Tasks table
CREATE TABLE IF NOT EXISTS api_tasks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  task_name VARCHAR(255) NOT NULL,
  api_url TEXT NOT NULL,
  method VARCHAR(10) DEFAULT 'GET' CHECK (method IN ('GET', 'POST')),
  request_headers JSONB DEFAULT '{}',
  request_body TEXT,
  schedule_interval VARCHAR(50) NOT NULL, -- e.g., "5m", "1h", "6h", "1d"
  is_active BOOLEAN DEFAULT TRUE,
  last_run_at TIMESTAMP WITH TIME ZONE,
  next_run_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  created_by UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE
);

-- API Task Logs table
CREATE TABLE IF NOT EXISTS api_task_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  task_id UUID NOT NULL REFERENCES api_tasks(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  status_code INTEGER,
  response_headers JSONB,
  response_body TEXT,
  response_time_ms INTEGER,
  error_message TEXT,
  executed_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_api_tasks_user_id ON api_tasks(user_id);
CREATE INDEX IF NOT EXISTS idx_api_tasks_is_active ON api_tasks(is_active);
CREATE INDEX IF NOT EXISTS idx_api_tasks_next_run_at ON api_tasks(next_run_at) WHERE is_active = TRUE;
CREATE INDEX IF NOT EXISTS idx_api_task_logs_task_id ON api_task_logs(task_id);
CREATE INDEX IF NOT EXISTS idx_api_task_logs_user_id ON api_task_logs(user_id);
CREATE INDEX IF NOT EXISTS idx_api_task_logs_executed_at ON api_task_logs(executed_at);

-- Row Level Security (RLS) Policies
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE api_tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE api_task_logs ENABLE ROW LEVEL SECURITY;

-- Profiles: Users can only view their own profile
CREATE POLICY profiles_select_policy ON profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY profiles_update_policy ON profiles
  FOR UPDATE USING (auth.uid() = id);

-- API Tasks: Users can only view/modify their own tasks
CREATE POLICY api_tasks_select_policy ON api_tasks
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY api_tasks_insert_policy ON api_tasks
  FOR INSERT WITH CHECK (auth.uid() = user_id AND auth.uid() = created_by);

CREATE POLICY api_tasks_update_policy ON api_tasks
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY api_tasks_delete_policy ON api_tasks
  FOR DELETE USING (auth.uid() = user_id);

-- API Task Logs: Users can only view their own logs
CREATE POLICY api_task_logs_select_policy ON api_task_logs
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY api_task_logs_insert_policy ON api_task_logs
  FOR INSERT WITH CHECK (auth.uid() = user_id);
