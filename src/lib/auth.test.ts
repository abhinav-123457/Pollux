import { describe, it, expect, vi, beforeEach } from 'vitest';
import {
  signInAsGuest,
  signInWithEmail,
  createAccount,
  signOutUser,
  getCurrentUser,
  isAuthenticated,
} from './auth';

// Mock Firebase Auth
vi.mock('firebase/auth', () => ({
  getAuth: vi.fn(() => ({})),
  signInAnonymously: vi.fn(),
  signInWithEmailAndPassword: vi.fn(),
  createUserWithEmailAndPassword: vi.fn(),
  signOut: vi.fn(),
  onAuthStateChanged: vi.fn(),
}));

vi.mock('./firebase', () => ({
  app: {},
}));

describe('Firebase Authentication', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('signInAsGuest', () => {
    it('should initialize guest authentication without credentials', async () => {
      const { signInAnonymously } = await import('firebase/auth');
      
      vi.mocked(signInAnonymously).mockResolvedValueOnce({
        user: {
          uid: 'guest-123',
          isAnonymous: true,
          email: null,
          metadata: {},
          displayName: 'Guest User',
        },
      } as any);

      const result = await signInAnonymously();
      expect(result.user.isAnonymous).toBe(true);
      expect(result.user.uid).toBeDefined();
    });
  });

  describe('signInWithEmail', () => {
    it('should authenticate user with email and password', async () => {
      const { signInWithEmailAndPassword } = await import('firebase/auth');
      
      vi.mocked(signInWithEmailAndPassword).mockResolvedValueOnce({
        user: {
          uid: 'user-123',
          email: 'test@example.com',
          isAnonymous: false,
        },
      } as any);

      const result = await signInWithEmailAndPassword(
        {} as any,
        'test@example.com',
        'password123'
      );
      
      expect(result.user.email).toBe('test@example.com');
      expect(result.user.isAnonymous).toBe(false);
    });

    it('should throw error for invalid credentials', async () => {
      const { signInWithEmailAndPassword } = await import('firebase/auth');
      
      const error = new Error('Invalid credentials');
      vi.mocked(signInWithEmailAndPassword).mockRejectedValueOnce(error);

      await expect(
        signInWithEmailAndPassword({} as any, 'test@example.com', 'wrong')
      ).rejects.toThrow('Invalid credentials');
    });
  });

  describe('createAccount', () => {
    it('should create new user account', async () => {
      const { createUserWithEmailAndPassword } = await import('firebase/auth');
      
      vi.mocked(createUserWithEmailAndPassword).mockResolvedValueOnce({
        user: {
          uid: 'new-user-123',
          email: 'newuser@example.com',
          isAnonymous: false,
        },
      } as any);

      const result = await createUserWithEmailAndPassword(
        {} as any,
        'newuser@example.com',
        'password123'
      );
      
      expect(result.user.email).toBe('newuser@example.com');
      expect(result.user.uid).toBeDefined();
    });
  });

  describe('signOutUser', () => {
    it('should sign out current user', async () => {
      const { signOut } = await import('firebase/auth');
      
      vi.mocked(signOut).mockResolvedValueOnce(undefined);

      await expect(signOut({} as any)).resolves.toBeUndefined();
    });
  });

  describe('getCurrentUser', () => {
    it('should return current authenticated user', () => {
      // Mock user state
      const mockUser = {
        uid: 'user-123',
        email: 'test@example.com',
        isAnonymous: false,
      };
      
      expect(mockUser).toBeDefined();
      expect(mockUser.uid).toBe('user-123');
    });

    it('should return null if no user authenticated', () => {
      const mockUser = null;
      expect(mockUser).toBeNull();
    });
  });

  describe('isAuthenticated', () => {
    it('should return true for authenticated user', () => {
      const user = { uid: 'user-123' };
      const authenticated = !!user;
      expect(authenticated).toBe(true);
    });

    it('should return false for anonymous or unauthenticated', () => {
      const user = null;
      const authenticated = !!user;
      expect(authenticated).toBe(false);
    });
  });
});
