# Environment Variables Setup

This project uses environment variables to securely manage API keys and configuration values.

## 🏠 Local Development

### Manual Setup

Create a `.env.local` file in the project root with your Firebase configuration:

```bash
# .env.local
VITE_FIREBASE_API_KEY=your_api_key_here
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id
```

### Steps:

1. **Copy the template** from `.env.example` or use the values above
2. **Create `.env.local`** in your project root
3. **Paste the configuration** values
4. **Start development**: `npm run dev`

## 🚀 Production Deployment (GitHub Actions)

For production deployment, add these secrets to your GitHub repository:

### Step 1: Go to GitHub Secrets
Navigate to: https://github.com/MarioLJFerreira/mini-dragme/settings/secrets/actions

### Step 2: Add Repository Secrets

Click "New repository secret" and add each of these:

| Secret Name | Value |
|-------------|-------|
| `VITE_FIREBASE_API_KEY` | `your_api_key_here` |
| `VITE_FIREBASE_AUTH_DOMAIN` | `your_project.firebaseapp.comm` |
| `VITE_FIREBASE_PROJECT_ID` | `your_project_id` |
| `VITE_FIREBASE_STORAGE_BUCKET` | `your_project.firebasestorage.app` |
| `VITE_FIREBASE_MESSAGING_SENDER_ID` | `your_sender_id` |
| `VITE_FIREBASE_APP_ID` | `your_app_id` |
| `VITE_FIREBASE_MEASUREMENT_ID` | `your_measurement_id` |

### Step 3: Verify Setup

1. **Local testing**: Run `npm run dev` - should work with `.env.local`
2. **Production testing**: Push to main branch - GitHub Actions will use the secrets

## ➕ Adding New Environment Variables

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

# Check if environment variables are loaded (in browser console)
console.log(import.meta.env.VITE_FIREBASE_API_KEY);
```

## 💡 Why VITE_ Prefix?

Vite only exposes environment variables that start with `VITE_` to your client-side code for security reasons. This prevents accidentally exposing sensitive server-side variables to the browser.

## ✅ Benefits of This Approach

- **Simple**: No complex setup or external dependencies
- **Secure**: Secrets are encrypted in GitHub repository secrets
- **Standard**: Industry-standard approach for environment variables
- **Scalable**: Easy to add more secrets as needed
- **Team-friendly**: Clear documentation for all developers