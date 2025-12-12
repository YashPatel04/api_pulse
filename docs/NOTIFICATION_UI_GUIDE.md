# ?? Task Notification Management - User Guide

## Overview

You can now easily configure notifications for each API task directly from the dashboard! No more console commands needed.

---

## ? New Features

### 1. **Notifications Button**
Every task in your dashboard now has a **?? Notifications** button in the Actions column.

### 2. **Notification Management Modal**
Click the button to open a modal where you can:
- ? View currently active notifications for the task
- ? Add new notification channels
- ? Choose when to be notified (always/failure/timeout)
- ? Remove notifications you no longer need

---

## ?? Step-by-Step Guide

### Step 1: Set Up an Integration

Before you can add notifications to tasks, you need at least one integration:

1. Go to **Settings** (top right menu)
2. Click **+ Add Integration**
3. Choose **Slack** (or Email/SMS when available)
4. Enter your webhook URL
5. Click **Add Integration**
6. Check Slack for test message ?

### Step 2: Link Integration to Task

1. Go to **Dashboard**
2. Find the task you want to monitor
3. Click **?? Notifications** in the Actions column

### Step 3: Configure Notifications

In the modal that appears:

**If you have no notifications yet:**
- You'll see "No notifications configured for this task yet"

**To add a notification:**
1. Select an integration from the dropdown
2. Choose notification rule:
   - **Always** - Get notified on every execution
   - **Failure Only** - Only when HTTP status ? 400
 - **Timeout/Error Only** - Only on errors
3. Click **Add Notification**

### Step 4: Manage Existing Notifications

**View Active Notifications:**
- See which integrations are linked
- See notification rules (badges show: All Executions, Failures Only, Timeouts Only)

**Remove a Notification:**
- Click **Remove** next to any notification
- Confirm the removal

---

## ?? Notification Rules Explained

### **Always** (Recommended for Testing)
```
? Task Success ? Notification sent
? Task Failure ? Notification sent
?? Task Timeout ? Notification sent
```
**Use case:** Monitoring new tasks, debugging, keeping close track

### **Failure Only** (Recommended for Production)
```
? Task Success ? No notification
? Task Failure ? Notification sent ??
?? Task Timeout ? No notification
```
**Use case:** Production monitoring, only alert when something breaks

### **Timeout/Error Only**
```
? Task Success ? No notification
? Task Failure ? No notification
?? Task Timeout/Error ? Notification sent ??
```
**Use case:** Network issues, API unreachability

---

## ?? Best Practices

### 1. **Start with "Always" for New Tasks**
- Test your setup thoroughly
- Make sure notifications are working
- Switch to "Failure Only" once stable

### 2. **Use Different Rules for Different Tasks**
- Critical APIs: **Failure Only**
- Health checks: **Always**
- External dependencies: **Timeout Only**

### 3. **Create Multiple Slack Channels**
```
#api-critical   ? Failure Only notifications
#api-monitoring ? Always notifications (all tasks)
#api-alerts     ? Timeout Only notifications
```

### 4. **Avoid Notification Overload**
- Don't use "Always" for high-frequency tasks in production
- Consider consolidating similar tasks
- Use appropriate notification rules

---

## ?? What Notifications Look Like

### Slack Success Message
```
? API Task Success: Get User Data

Task Name: Get User Data
Status Code: 200
Response Time: 145ms
Method: GET

Endpoint: https://api.example.com/users

Executed at: Jan 15, 2025 at 10:30 AM
```

### Slack Failure Message
```
? API Task Failed: Get User Data

Task Name: Get User Data
Status Code: 500
Response Time: 2,345ms
Method: GET

Endpoint: https://api.example.com/users

Error: Internal Server Error

Executed at: Jan 15, 2025 at 10:30 AM
```

---

## ?? Common Scenarios

### Scenario 1: Monitor a Critical API
```
Task: Payment Gateway Health Check
Integration: #critical-alerts (Slack)
Rule: Failure Only
Result: Only get notified when payments are down
```

### Scenario 2: Debug a New Integration
```
Task: New Third-Party API
Integration: #dev-notifications (Slack)
Rule: Always
Result: See every execution until stable
```

### Scenario 3: Track Network Issues
```
Task: External Service Monitor
Integration: #network-alerts (Slack)
Rule: Timeout Only
Result: Only notified on connection problems
```

---

## ?? Quick Reference

| Notification Rule | Success | Failure | Timeout | Best For |
|------------------|---------|---------|---------|----------|
| **Always** | ? | ? | ? | Testing, debugging |
| **Failure Only** | ? | ? | ? | Production monitoring |
| **Timeout Only** | ? | ? | ? | Network issues |

---

## ? FAQ

### Can I add multiple notifications to one task?
**Yes!** You can link multiple integrations to the same task with different rules.

Example:
- Link to `#team-slack` with "Always"
- Link to `#alerts-email` with "Failure Only"

### Can I use the same integration for multiple tasks?
**Absolutely!** One Slack channel can receive notifications from all your tasks.

### What happens if I delete an integration?
All notification links using that integration are automatically removed.

### Can I pause notifications without removing them?
Not yet! For now, you need to remove and re-add. Coming in a future update.

### How do I test if notifications are working?
1. Set notification rule to "Always"
2. Wait 5 minutes for GitHub Actions
3. Or run scheduler manually: `node scheduler/scheduler.js`
4. Check your Slack channel

---

## ?? Next Steps

1. **Set up your first integration** in Settings
2. **Link it to a task** using the dashboard
3. **Test it** by waiting for next execution
4. **Adjust notification rules** as needed
5. **Scale** to all your important tasks!

---

## ?? Troubleshooting

### "No integrations available" message?
? Go to Settings and create an integration first

### Notification not showing up in modal?
? Refresh the page and try again

### Can't add notification?
? Make sure you selected an integration and notification rule

### Not receiving notifications?
? Check:
1. Integration is active (Settings page)
2. Notification is linked (Dashboard ? ?? Notifications)
3. Task is active (green "? Running" status)
4. GitHub Actions is running (check every 5 minutes)

---

## ?? You're All Set!

Managing notifications is now as easy as clicking a button. No console commands, no API calls – just simple, intuitive UI!

**Happy monitoring!** ????
