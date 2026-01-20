# Authentication Setup Guide

## Overview
This React Native app uses Firebase Authentication with support for:
- Email/Password authentication
- Google Sign-In
- Persistent authentication state

## Files Created

### Configuration
- `config/firebase.ts` - Firebase initialization and configuration
- `contexts/AuthContext.tsx` - Authentication context provider with auth methods

### Screens
- `app/(auth)/login.tsx` - Login screen with email/password and Google Sign-In
- `app/(auth)/signup.tsx` - Sign up screen with name, email, password fields
- `app/(auth)/_layout.tsx` - Auth group layout
- `app/index.tsx` - Root index with auth state routing
- `app/(tabs)/profile.tsx` - Profile screen with logout functionality

### Updated Files
- `app/_layout.tsx` - Wrapped with AuthProvider
- `app/(tabs)/_layout.tsx` - Added profile tab
- `.gitignore` - Added Firebase config files

## Setup Instructions

### 1. Firebase Configuration Files

You need to place your Firebase configuration files in the root directory:

**For Android:**
- File: `google-services.json`
- Location: `/android/app/google-services.json` (when you build native)

**For iOS:**
- File: `GoogleService-Info.plist`
- Location: `/ios/GoogleService-Info.plist` (when you build native)

**Note:** These files are already in `.gitignore` for security.

### 2. Google Sign-In Setup

#### iOS Setup
1. Open your `GoogleService-Info.plist` file
2. Find the `REVERSED_CLIENT_ID` value
3. Add it to your `app.json` under `expo.ios.bundleIdentifier`

#### Android Setup
1. The `google-services.json` file contains your Android configuration
2. Ensure your `app.json` has the correct `android.package` name matching your Firebase project

### 3. Update app.json (if needed)

Add the following to your `app.json`:

```json
{
  "expo": {
    "ios": {
      "bundleIdentifier": "com.kyozo.kyozoFeed",
      "googleServicesFile": "./GoogleService-Info.plist"
    },
    "android": {
      "package": "com.kyozo.kyozoFeed",
      "googleServicesFile": "./google-services.json"
    },
    "plugins": [
      "@react-native-google-signin/google-signin"
    ]
  }
}
```

### 4. Install Dependencies

All dependencies are already installed:
- `firebase` - Firebase SDK (includes web-based Google Sign-In)
- `@react-native-async-storage/async-storage` - Persistent storage
- `expo-auth-session` - OAuth authentication
- `expo-crypto` - Cryptographic functions

**Note:** `@react-native-google-signin/google-signin` was removed as it requires a custom development build and doesn't work with Expo Go.

### 5. Running the App

```bash
# Start the development server
pnpm start

# Run on iOS simulator
pnpm run ios

# Run on Android emulator
pnpm run android
```

## Authentication Flow

1. **App Launch** → `app/index.tsx` checks auth state
2. **Not Authenticated** → Redirects to `app/(auth)/login.tsx`
3. **Authenticated** → Redirects to `app/(tabs)/index.tsx`
4. **Logout** → From profile screen, redirects back to login

## Features Implemented

### Login Screen (`app/(auth)/login.tsx`)
- Email/password login
- Google Sign-In button (works on web only with Expo Go)
- Password visibility toggle
- Link to sign up screen
- Form validation
- Loading states

### Sign Up Screen (`app/(auth)/signup.tsx`)
- Full name input
- Email input
- Password input with confirmation
- Password strength validation (min 6 characters)
- Google Sign-In option (works on web only with Expo Go)
- Link to login screen

### Important: Google Sign-In Limitations
**With Expo Go (current setup):**
- ✅ Google Sign-In works on **web** (browser)
- ❌ Google Sign-In **does NOT work** on iOS/Android simulators with Expo Go
- 📱 On mobile, users will see an alert directing them to use email/password authentication

**To enable Google Sign-In on mobile:**
You need to create a custom development build:
```bash
# Install EAS CLI
npm install -g eas-cli

# Configure and build
eas build --profile development --platform ios
eas build --profile development --platform android
```

For now, **use email/password authentication** or test Google Sign-In on **web** (`pnpm run web`)

### Profile Screen (`app/(tabs)/profile.tsx`)
- User information display
- Logout functionality
- Menu items for future features

## Firebase Configuration

The Firebase config in `config/firebase.ts` uses:
- **Project ID:** kyozoverse
- **App ID:** 1:1061297794599:web:23a0dd107dc36cff44a802
- **Web Client ID:** 1061297794599-igjloohgbelrvpmh72pmk4cdm37pp1hl.apps.googleusercontent.com

## Security Notes

1. Firebase config files are excluded from git via `.gitignore`
2. API keys in `firebase.ts` are safe for client-side use (Firebase handles security via rules)
3. For production, ensure Firebase Security Rules are properly configured
4. Never commit `google-services.json` or `GoogleService-Info.plist` files

## Troubleshooting

### Google Sign-In Issues
- Ensure the Web Client ID in `AuthContext.tsx` matches your Firebase console
- Check that SHA-1 fingerprints are added in Firebase Console (Android)
- Verify bundle identifier matches Firebase project (iOS)

### Authentication Not Persisting
- Check that AsyncStorage is properly installed
- Verify Firebase Auth persistence is configured

### Build Errors
- Run `pnpm install` to ensure all dependencies are installed
- Clear cache: `expo start -c`
- For native builds, ensure Firebase config files are in correct locations

## Next Steps

1. Configure Firebase Security Rules
2. Add password reset functionality
3. Add email verification
4. Implement social auth providers (Facebook, Apple, etc.)
5. Add user profile editing
6. Implement proper error handling and user feedback
