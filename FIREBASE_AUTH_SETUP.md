# Firebase Authentication Setup Guide

## Overview

The application now uses Firebase Authentication instead of Supabase Auth. This guide explains how to set up and use Firebase Auth.

## Features

- ✅ Email/Password Authentication
- ✅ User Registration
- ✅ User Sign In/Sign Out
- ✅ Admin Role Management (via Firestore)
- ✅ User Profile Management

## Setup Instructions

### 1. Firebase Console Setup

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project: `ak-projects-backend`
3. Enable Authentication:
   - Go to **Authentication** → **Sign-in method**
   - Enable **Email/Password** provider
   - Save changes

### 2. Firestore Database Setup

1. Go to **Firestore Database** in Firebase Console
2. Create a collection named `users`
3. Set up security rules (see below)

### 3. Firestore Security Rules

Add these rules to your Firestore database:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users collection
    match /users/{userId} {
      // Users can read their own data
      allow read: if request.auth != null && request.auth.uid == userId;
      
      // Users can create/update their own data
      allow create: if request.auth != null && request.auth.uid == userId;
      allow update: if request.auth != null && request.auth.uid == userId;
      
      // Admins can read/update any user
      allow read, update: if request.auth != null && 
        get(/databases/$(database)/documents/users/$(request.auth.uid)).data.isAdmin == true;
    }
    
    // Other collections (portfolio, testimonials, services)
    match /{document=**} {
      allow read: if true; // Public read
      allow write: if request.auth != null && 
        get(/databases/$(database)/documents/users/$(request.auth.uid)).data.isAdmin == true;
    }
  }
}
```

## Making a User Admin

### Option 1: Using Firebase Console

1. Go to **Firestore Database** → `users` collection
2. Find or create a document with the user's UID
3. Set these fields:
   ```json
   {
     "email": "admin@example.com",
     "displayName": "Admin User",
     "role": "admin",
     "isAdmin": true,
     "createdAt": "2024-01-01T00:00:00.000Z",
     "updatedAt": "2024-01-01T00:00:00.000Z"
   }
   ```

### Option 2: Using Code

```typescript
import { setAdminRole } from '@/integrations/firebase/adminUtils';
import { auth } from '@/integrations/firebase/client';

// Get current user ID
const userId = auth.currentUser?.uid;

if (userId) {
  await setAdminRole(userId, true);
}
```

### Option 3: Using Browser Console

Open browser console on your site and run:

```javascript
import { setAdminRole } from '/src/integrations/firebase/adminUtils';
import { auth } from '/src/integrations/firebase/client';

const userId = auth.currentUser?.uid;
if (userId) {
  setAdminRole(userId, true).then(() => {
    console.log('Admin role set!');
    window.location.reload();
  });
}
```

## User Document Structure

Each user document in Firestore should have this structure:

```typescript
{
  email: string;
  displayName?: string;
  role: 'user' | 'admin';
  isAdmin: boolean;
  createdAt: string; // ISO timestamp
  updatedAt: string; // ISO timestamp
}
```

## Usage in Components

The `useAuth` hook works the same way as before:

```typescript
import { useAuth } from '@/hooks/useAuth';

const MyComponent = () => {
  const { user, isAdmin, loading, signIn, signUp, signOut } = useAuth();
  
  // user is Firebase User object
  // user.email - user's email
  // user.displayName - user's display name
  // user.uid - user's unique ID
  
  return (
    <div>
      {user && <p>Welcome, {user.displayName || user.email}!</p>}
      {isAdmin && <p>You are an administrator</p>}
    </div>
  );
};
```

## Migration Notes

- The `useAuth` hook now uses Firebase instead of Supabase
- User objects are Firebase User objects (not Supabase User)
- Admin roles are stored in Firestore `users` collection
- The `session` property is kept for compatibility but returns the user object

## Troubleshooting

### User can't sign in
- Check if Email/Password is enabled in Firebase Console
- Verify email and password are correct
- Check browser console for errors

### Admin role not working
- Verify user document exists in Firestore `users` collection
- Check that `isAdmin: true` or `role: 'admin'` is set
- Ensure Firestore security rules allow reading user documents

### User document not created
- Check browser console for errors
- Verify Firestore is enabled in Firebase Console
- Check Firestore security rules allow document creation

