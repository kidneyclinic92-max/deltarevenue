# Gmail SMTP Email Setup (Nodemailer)

When an admin approves an appointment, the user receives a confirmation email via your Gmail account.

## Setup Steps

### 1. Enable 2-Step Verification on Gmail
- Go to [Google Account Security](https://myaccount.google.com/security)
- Turn on **2-Step Verification**

### 2. Create an App Password
- Go to [App Passwords](https://myaccount.google.com/apppasswords)
- Select app: **Mail**
- Select device: **Other** → name it "Delta Revenue" (or similar)
- Copy the 16-character password (format: `xxxx xxxx xxxx xxxx`)

### 3. Configure Environment
- Copy `.env.example` to `.env` in the project root
- Fill in:

```
GMAIL_USER=your@gmail.com
GMAIL_APP_PASSWORD=xxxx xxxx xxxx xxxx
```

### 4. Run the App
- `npm run dev` starts both the Vite frontend and the Express email server
- The server runs at `http://localhost:3001`
- Vite proxies `/api` requests to the server

---

## Production Deployment

You need to host the Express server alongside (or separately from) your frontend:

1. **Deploy server** to Railway, Render, Fly.io, or similar
2. **Set env vars** there: `GMAIL_USER`, `GMAIL_APP_PASSWORD`
3. **Set `VITE_API_BASE`** in your frontend build to your server URL (e.g. `https://your-api.onrender.com`)

---

**Note:** If `.env` is not set, the app still works. Approvals update the status, but no email will be sent.
