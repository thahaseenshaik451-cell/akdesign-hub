// Utility functions for managing admin roles in Firebase
import { doc, setDoc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from './client';

/**
 * Set a user as admin
 * @param userId - Firebase user ID
 * @param isAdmin - Whether the user should be an admin
 */
export const setAdminRole = async (userId: string, isAdmin: boolean = true) => {
  try {
    const userRef = doc(db, 'users', userId);
    const userDoc = await getDoc(userRef);

    if (userDoc.exists()) {
      // Update existing user document
      await updateDoc(userRef, {
        role: isAdmin ? 'admin' : 'user',
        isAdmin: isAdmin,
        updatedAt: new Date().toISOString(),
      });
    } else {
      // Create new user document with admin role
      await setDoc(userRef, {
        role: isAdmin ? 'admin' : 'user',
        isAdmin: isAdmin,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });
    }
    return { success: true };
  } catch (error) {
    console.error('Error setting admin role:', error);
    return { success: false, error };
  }
};

/**
 * Check if a user is admin
 * @param userId - Firebase user ID
 */
export const checkIsAdmin = async (userId: string): Promise<boolean> => {
  try {
    const userDoc = await getDoc(doc(db, 'users', userId));
    if (userDoc.exists()) {
      const userData = userDoc.data();
      return userData.role === 'admin' || userData.isAdmin === true;
    }
    return false;
  } catch (error) {
    console.error('Error checking admin status:', error);
    return false;
  }
};

/**
 * Get user data from Firestore
 * @param userId - Firebase user ID
 */
export const getUserData = async (userId: string) => {
  try {
    const userDoc = await getDoc(doc(db, 'users', userId));
    if (userDoc.exists()) {
      return { id: userDoc.id, ...userDoc.data() };
    }
    return null;
  } catch (error) {
    console.error('Error getting user data:', error);
    return null;
  }
};

