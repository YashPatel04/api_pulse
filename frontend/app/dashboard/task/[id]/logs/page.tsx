'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@supabase/supabase-js';

// Create a single client instance for this component
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
);

export default function TaskLogs({ params }: { params: { id: string } }) {
  const [logs, setLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [taskName, setTaskName] = useState('Task Logs');
  const [error, setError] = useState('');
  const [expandedLogId, setExpandedLogId] = useState<string | null>(null);
  const router = useRouter();
  const taskId = params.id;

  useEffect(() => {
    const fetchLogsAndTask = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();

        if (!session) {
          router.push('/auth/login');
          return;
        }

        // Fetch task details to get task name
        try {
          const taskResponse = await fetch(
            `${process.env.NEXT_PUBLIC_SUPABASE_URL}/functions/v1/list-tasks`,
            {
              method: 'GET',
              headers: {
                Authorization: `Bearer ${session.access_token}`,
                'Content-Type': 'application/json',
              },
            }
          );

          console.log('Task response status:', taskResponse.status);

          if (taskResponse.ok) {
            const tasks = await taskResponse.json();
            console.log('Tasks fetched:', tasks);
            const task = tasks.find((t: any) => t.id === taskId);
            if (task) {
              setTaskName(task.task_name);
            }
          } else {
            console.warn('Failed to fetch task details:', taskResponse.status);
          }
        } catch (taskError) {
          console.error('Error fetching task details:', taskError);
        }

        // Fetch logs directly from database (faster than edge function)
        try {
          console.log('Fetching logs for task:', taskId);
          const { data: logs, error } = await supabase
            .from('api_task_logs')
            .select('*')
            .eq('task_id', taskId)
            .order('executed_at', { ascending: false });

          if (error) {
            console.error('Database error:', error);
            setError(`Failed to fetch logs: ${error.message}`);
          } else {
            console.log('Logs fetched from database:', logs);
            setLogs(Array.isArray(logs) ? logs : []);
            // Set the first log as expanded by default
            if (logs && logs.length > 0) {
              setExpandedLogId(logs[0].id);
            }
          }
        } catch (dbError: any) {
          console.error('Database fetch error:', dbError);
          setError(dbError.message || 'Failed to fetch logs');
        }
      } catch (err: any) {
        console.error('Error:', err);
        setError(err.message || 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchLogsAndTask();
  }, [taskId, router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-lg text-gray-600">Loading logs...</p>
          <p className="text-sm text-gray-500 mt-2">This may take a moment on first load</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <Link href="/" className="text-2xl font-bold text-indigo-600">
            API Pulse
          </Link>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-4 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Task Logs</h1>
          <p className="text-gray-600 mt-2">{taskName}</p>
        </div>

        <div className="bg-white rounded-lg shadow">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg mb-4">
              {error}
            </div>
          )}
          {logs.length === 0 ? (
            <div className="p-8 text-center">
              <p className="text-gray-600">No logs yet for this task.</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {logs.map((log) => (
                <div key={log.id}>
                  <div 
                    className="flex items-center px-6 py-4 hover:bg-indigo-50 cursor-pointer transition-colors"
                    onClick={() => setExpandedLogId(expandedLogId === log.id ? null : log.id)}
                  >
                    <span className="text-indigo-600 font-semibold w-6 text-center flex-shrink-0">
                      {expandedLogId === log.id ? '▼' : '▶'}
                    </span>
                    <div className="flex-1 grid grid-cols-4 gap-6 ml-4">
                      <div>
                        <p className="text-xs text-gray-500 uppercase tracking-wider">Executed At</p>
                        <p className="text-sm text-gray-900 mt-1">
                          {new Date(log.executed_at).toLocaleString()}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 uppercase tracking-wider">Status</p>
                        <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium mt-1 ${
                          log.status_code >= 200 && log.status_code < 300
                            ? 'bg-green-100 text-green-800'
                            : log.status_code ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-800'
                        }`}>
                          {log.status_code || 'N/A'}
                        </span>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 uppercase tracking-wider">Response Time</p>
                        <p className="text-sm text-gray-600 mt-1">{log.response_time_ms}ms</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 uppercase tracking-wider">Error</p>
                        <p className="text-sm text-red-600 mt-1">{log.error_message || '-'}</p>
                      </div>
                    </div>
                  </div>
                  {expandedLogId === log.id && (
                    <div className="bg-indigo-50 px-6 py-6 border-t border-gray-200">
                      <div className="space-y-6">
                        {log.response_body && (
                          <div>
                            <h4 className="font-semibold text-gray-900 mb-3 text-sm">Response Body:</h4>
                            <div className="bg-white border border-gray-200 rounded p-4 overflow-auto max-h-64">
                              <pre className="text-xs text-gray-700 whitespace-pre-wrap break-words font-mono">
                                {typeof log.response_body === 'string' 
                                  ? log.response_body 
                                  : JSON.stringify(log.response_body, null, 2)}
                              </pre>
                            </div>
                          </div>
                        )}
                        {log.response_headers && Object.keys(log.response_headers).length > 0 && (
                          <div>
                            <h4 className="font-semibold text-gray-900 mb-3 text-sm">Response Headers:</h4>
                            <div className="bg-white border border-gray-200 rounded p-4 overflow-auto max-h-64">
                              <pre className="text-xs text-gray-700 whitespace-pre-wrap break-words font-mono">
                                {JSON.stringify(log.response_headers, null, 2)}
                              </pre>
                            </div>
                          </div>
                        )}
                        {log.error_message && (
                          <div>
                            <h4 className="font-semibold text-red-900 mb-3 text-sm">Error Details:</h4>
                            <div className="bg-red-50 border border-red-200 rounded p-4">
                              <pre className="text-xs text-red-700 whitespace-pre-wrap break-words font-mono">
                                {log.error_message}
                              </pre>
                            </div>
                          </div>
                        )}
                        {!log.response_body && !log.error_message && (
                          <p className="text-sm text-gray-500">No additional details available</p>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
