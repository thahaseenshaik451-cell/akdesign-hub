# Firebase Integration

This directory contains the Firebase configuration and client setup for the application.

## Setup

Firebase has been initialized with the following services:
- **Analytics**: Web analytics tracking
- **Authentication**: User authentication
- **Firestore**: NoSQL database
- **Storage**: File storage

## Usage

### Import Firebase services:

```typescript
import { app, analytics, auth, db, storage } from "@/integrations/firebase/client";
```

### Example: Using Authentication

```typescript
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/integrations/firebase/client";

// Sign in
const signIn = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    console.error("Error signing in:", error);
    throw error;
  }
};
```

### Example: Using Firestore

```typescript
import { collection, addDoc, getDocs } from "firebase/firestore";
import { db } from "@/integrations/firebase/client";

// Add a document
const addDocument = async (collectionName: string, data: any) => {
  try {
    const docRef = await addDoc(collection(db, collectionName), data);
    return docRef.id;
  } catch (error) {
    console.error("Error adding document:", error);
    throw error;
  }
};

// Get documents
const getDocuments = async (collectionName: string) => {
  try {
    const querySnapshot = await getDocs(collection(db, collectionName));
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Error getting documents:", error);
    throw error;
  }
};
```

### Example: Using Storage

```typescript
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "@/integrations/firebase/client";

// Upload a file
const uploadFile = async (file: File, path: string) => {
  try {
    const storageRef = ref(storage, path);
    const snapshot = await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(snapshot.ref);
    return downloadURL;
  } catch (error) {
    console.error("Error uploading file:", error);
    throw error;
  }
};
```

## Configuration

The Firebase configuration is stored in `config.ts`. For production, consider moving sensitive values to environment variables.

## Note

This Firebase setup works alongside the existing Supabase integration. You can use both services as needed.

