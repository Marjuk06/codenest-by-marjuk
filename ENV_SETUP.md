# Environment Variables Configuration Guide

## Firebase Configuration
1. Go to Firebase Console: https://console.firebase.google.com/
2. Create a new project or select existing one
3. Go to Project Settings → General → Your apps
4. Copy the configuration values

```
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key_here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

## Firebase Admin SDK
1. Go to Project Settings → Service accounts
2. Click "Generate new private key"
3. Copy values from the downloaded JSON

```
FIREBASE_ADMIN_PROJECT_ID=your_project_id
FIREBASE_ADMIN_CLIENT_EMAIL=your_service_account_email
FIREBASE_ADMIN_PRIVATE_KEY="your_private_key_here"
```

## Resend API (Email Service)
1. Sign up at https://resend.com
2. Go to API Keys
3. Create a new API key

```
RESEND_API_KEY=your_resend_api_key
```

## GitHub Webhook Secret
Generate a random secret for webhook validation:
```bash
openssl rand -base64 32
```

```
GITHUB_WEBHOOK_SECRET=your_github_webhook_secret
```

## Site Configuration
```
ADMIN_EMAIL=your_admin_email@example.com
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

## Instructions
1. Copy this file and rename to `.env.local`
2. Replace all placeholder values with your actual credentials
3. Never commit `.env.local` to version control
