# Environment Variables Setup

This project uses environment variables to securely manage API keys and configuration values.

## 🏠 Local Development

For local development, your Firebase configuration is already set up in `.env.local`:

```bash
# .env.local (already configured)
VITE_FIREBASE_API_KEY=AIzaSyCalE6UBEP6X3ZX7R19tC5VoKO03wgAoTo
VITE_FIREBASE_AUTH_DOMAIN=dragme-mini.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=dragme-mini
VITE_FIREBASE_STORAGE_BUCKET=dragme-mini.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=188367279980
VITE_FIREBASE_APP_ID=1:188367279980:web:a554ae85ce559846fac549
VITE_FIREBASE_MEASUREMENT_ID=G-2XEQ97DMV8
```

## 🚀 Production Deployment (GitHub Actions)

To deploy to production, you need to add these secrets to your GitHub repository:

### Step 1: Go to GitHub Secrets
1. Navigate to: https://github.com/MarioLJFerreira/mini-dragme/settings/secrets/actions
2. Click "New repository secret"

### Step 2: Add Each Secret

Add these **7 secrets** one by one:

| Secret Name | Value |
|-------------|-------|
| `VITE_FIREBASE_API_KEY` | `AIzaSyCalE6UBEP6X3ZX7R19tC5VoKO03wgAoTo` |
| `VITE_FIREBASE_AUTH_DOMAIN` | `dragme-mini.firebaseapp.com` |
| `VITE_FIREBASE_PROJECT_ID` | `dragme-mini` |
| `VITE_FIREBASE_STORAGE_BUCKET` | `dragme-mini.firebasestorage.app` |
| `VITE_FIREBASE_MESSAGING_SENDER_ID` | `188367279980` |
| `VITE_FIREBASE_APP_ID` | `1:188367279980:web:a554ae85ce559846fac549` |
| `VITE_FIREBASE_MEASUREMENT_ID` | `G-2XEQ97DMV8` |

### Step 3: Test the Setup

1. **Local testing**: Run `npm run dev` - should work with `.env.local`
2. **Production testing**: Push to main branch - GitHub Actions will use the secrets

## ➕ Adding New API Keys

### For Local Development:
Add to `.env.local`:
```bash
VITE_YOUR_NEW_API_KEY=your_development_key_here
```

### For Production:
1. Add the secret to GitHub repository secrets
2. Update both GitHub Actions workflows to include the new environment variable:
```yaml
env:
  VITE_YOUR_NEW_API_KEY: ${{ secrets.VITE_YOUR_NEW_API_KEY }}
```

### In Your Code:
```javascript
// Use the environment variable in your React components
const apiKey = import.meta.env.VITE_YOUR_NEW_API_KEY;
```

## 🔒 Security Notes

- ✅ **Local development**: Uses `.env.local` (not committed to git)
- ✅ **Production**: Uses GitHub repository secrets (encrypted)
- ✅ **No hardcoded secrets** in your codebase
- ✅ **Vite automatically** includes `VITE_` prefixed variables in the build

## 🧪 Testing

```bash
# Test locally
npm run dev

# Test build process
npm run build

# Check if environment variables are loaded
console.log(import.meta.env.VITE_FIREBASE_API_KEY); // Should show your API key
```

## ✅ Benefits of This Approach

- **Simple**: No external services required
- **Secure**: Secrets are encrypted in GitHub
- **Free**: No billing requirements
- **Standard**: Industry-standard approach
- **Scalable**: Easy to add more secrets as needed