# Notification Integration Setup Guide

This guide will help you set up notifications for API Pulse task executions.

## Supported Integrations

- ? **Slack** - Free (Webhooks)
- ?? **Email** - Coming soon (Resend)
- ?? **SMS** - Coming soon (Twilio)
- ? **Webhook** - Free (Custom endpoints)

---

## ?? Setting Up Slack Notifications

### Step 1: Create a Slack Webhook

1. Go to [Slack API: Incoming Webhooks](https://api.slack.com/messaging/webhooks)
2. Click **"Create your Slack app"**
3. Choose **"From scratch"**
4. Give your app a name (e.g., "API Pulse Notifier")
5. Select your workspace
6. Click **"Incoming Webhooks"** in the left sidebar
7. Toggle **"Activate Incoming Webhooks"** to ON
8. Click **"Add New Webhook to Workspace"**
9. Select the channel where you want notifications
10. Copy the **Webhook URL** (it looks like: `https://hooks.slack.com/services/T00000000/B00000000/XXXXXXXXXXXXXXXXXXXX`)

### Step 2: Add Integration via API Pulse

#### Option A: Using the API

```bash
curl -X POST https://your-supabase-url.supabase.co/functions/v1/manage-integrations \
  -H "Authorization: Bearer YOUR_USER_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
 "integration_type": "slack",
    "name": "My Slack Channel",
    "credentials": {
      "webhook_url": "https://hooks.slack.com/services/YOUR/WEBHOOK/URL"
    }
  }'
```

#### Option B: Using the Frontend (Coming Soon)
Navigate to **Dashboard > Integrations** and add your Slack webhook.

### Step 3: Link Integration to a Task

```bash
curl -X POST https://your-supabase-url.supabase.co/functions/v1/link-task-notification \
  -H "Authorization: Bearer YOUR_USER_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "task_id": "your-task-uuid",
    "integration_id": "your-integration-uuid",
    "notify_on": "always"
  }'
```

**Notification Rules (`notify_on`):**
- `always` - Send notification for every execution (default)
- `failure_only` - Only when status code >= 400 or error occurs
- `timeout` - Only when task execution fails with an error

---

## ?? Deploy Edge Functions

Deploy the new notification functions to Supabase:

```bash
# Navigate to your project root
cd supabase

# Deploy manage-integrations function
supabase functions deploy manage-integrations

# Deploy link-task-notification function
supabase functions deploy link-task-notification
```

---

## ?? Testing Your Integration

After setting up Slack:

1. Create or update a task
2. Link the task to your Slack integration
3. Wait for the scheduler to run (every 5 minutes) or trigger manually
4. Check your Slack channel for notifications!

### Test Message Format

Notifications include:
- ?/? Status indicator
- Task name
- HTTP status code
- Response time
- HTTP method
- API endpoint
- Error message (if failed)
- Execution timestamp

---

## ??? Environment Variables

Make sure these are set in your `.env` file for the scheduler:

```env
SUPABASE_URL=your_supabase_url
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

---

## ?? API Endpoints

### Manage Integrations
- `GET /functions/v1/manage-integrations` - List all integrations
- `POST /functions/v1/manage-integrations` - Create new integration
- `DELETE /functions/v1/manage-integrations/:id` - Delete integration

### Link Tasks to Notifications
- `GET /functions/v1/link-task-notification?task_id=:id` - List notifications for a task
- `POST /functions/v1/link-task-notification` - Link task to integration
- `DELETE /functions/v1/link-task-notification/:id` - Unlink notification

---

## ?? Troubleshooting

### Notifications not being sent?

1. **Check integration is active:**
   ```sql
   SELECT * FROM user_integrations WHERE user_id = 'your-user-id';
   ```

2. **Check task notification links:**
   ```sql
   SELECT * FROM task_notifications WHERE task_id = 'your-task-id';
   ```

3. **Verify scheduler logs:**
   Look for "Sending X notification(s) for task:" in scheduler output

4. **Test Slack webhook manually:**
 ```bash
   curl -X POST YOUR_WEBHOOK_URL \
     -H "Content-Type: application/json" \
     -d '{"text": "Test message"}'
   ```

### Slack webhook not working?

- Ensure the webhook URL starts with `https://hooks.slack.com/services/`
- Check that the Slack app has permission to post in the channel
- Verify the webhook hasn't been revoked in Slack settings

---

## ?? Coming Soon

### Email Notifications (Resend)
- Free tier: 100 emails/day
- Beautiful HTML templates
- Delivery tracking

### SMS Notifications (Twilio)
- Trial credits available
- Critical alerts only
- Rate limiting

### Custom Webhooks
- Send task data to any endpoint
- Custom payload formatting
- Retry logic

---

## ?? Tips

1. **Use different channels for different priorities:**
   - `#api-alerts` for failures only
   - `#api-all` for all executions

2. **Set appropriate `notify_on` rules:**
   - Production tasks: `failure_only`
   - Testing tasks: `always`

3. **Monitor notification quotas:**
   - Slack is unlimited
   - Email/SMS have daily limits

---

## ?? Need Help?

- Check the [main README](../README.md)
- Review [Slack Webhook Documentation](https://api.slack.com/messaging/webhooks)
- Open an issue on GitHub
