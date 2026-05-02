/**
 * Firebase Authentication service
 * Enables user login with email/password or anonymous
 */

import {
  getAuth,
  signInAnonymously,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  type User,
  type Auth,
} from 'firebase/auth';
import { app } from './firebase';

let auth: Auth | null = null;

if (app) {
  auth = getAuth(app);
}

/**
 * Sign in anonymously (for quick testing without account)
 */
export async function signInAsGuest(): Promise<User | null> {
  if (!auth) {
    console.warn('Firebase Auth not initialized');
    return null;
  }

  try {
    const result = await signInAnonymously(auth);
    return result.user;
  } catch (error) {
    console.error('Error signing in as guest:', error);
    return null;
  }
}

/**
 * Sign in with email and password
 */
export async function signInWithEmail(
  email: string,
  password: string
): Promise<User | null> {
  if (!auth) {
    console.warn('Firebase Auth not initialized');
    return null;
  }

  try {
    const result = await signInWithEmailAndPassword(auth, email, password);
    return result.user;
  } catch (error) {
    console.error('Error signing in:', error);
    throw error;
  }
}

/**
 * Create user account with email and password
 */
export async function createAccount(
  email: string,
  password: string
): Promise<User | null> {
  if (!auth) {
    console.warn('Firebase Auth not initialized');
    return null;
  }

  try {
    const result = await createUserWithEmailAndPassword(auth, email, password);
    return result.user;
  } catch (error) {
    console.error('Error creating account:', error);
    throw error;
  }
}

/**
 * Sign out current user
 */
export async function signOutUser(): Promise<void> {
  if (!auth) {
    console.warn('Firebase Auth not initialized');
    return;
  }

  try {
    await signOut(auth);
  } catch (error) {
    console.error('Error signing out:', error);
    throw error;
  }
}

/**
 * Subscribe to auth state changes
 */
export function onAuthChanged(callback: (user: User | null) => void): () => void {
  if (!auth) {
    console.warn('Firebase Auth not initialized');
    return () => {};
  }

  return onAuthStateChanged(auth, callback);
}

/**
 * Get current auth instance
 */
export function getAuthInstance(): Auth | null {
  return auth;
}

/**
 * Get current user
 */
export function getCurrentUser(): User | null {
  if (!auth) {
    return null;
  }
  return auth.currentUser;
}

/**
 * Check if user is authenticated
 */
export function isAuthenticated(): boolean {
  return getCurrentUser() !== null;
}
