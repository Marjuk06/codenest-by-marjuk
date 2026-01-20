import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signInWithPopup,
    GoogleAuthProvider,
    signOut,
    sendPasswordResetEmail,
    sendEmailVerification,
    onAuthStateChanged,
    User,
} from 'firebase/auth';
import { auth } from './config';
import { firestoreHelpers, COLLECTIONS } from './firestore';

const googleProvider = new GoogleAuthProvider();

export const authHelpers = {
    // Sign in with email and password
    async signInWithEmail(email: string, password: string): Promise<User> {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            return userCredential.user;
        } catch (error) {
            console.error('Error signing in:', error);
            throw error;
        }
    },

    // Sign up with email and password
    async signUpWithEmail(email: string, password: string, displayName: string): Promise<User> {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // Create user document in Firestore
            await firestoreHelpers.createDocument(COLLECTIONS.USERS, user.uid, {
                email: user.email,
                displayName,
                photoURL: null,
                role: 'user',
                emailVerified: false,
                badges: [],
                downloadHistory: [],
                preferences: {
                    language: 'en',
                    theme: 'system',
                    notifications: true,
                },
                status: 'active',
            });

            // Send email verification
            if (user) {
                await sendEmailVerification(user);
            }

            return user;
        } catch (error) {
            console.error('Error signing up:', error);
            throw error;
        }
    },

    // Sign in with Google
    async signInWithGoogle(): Promise<User> {
        try {
            const userCredential = await signInWithPopup(auth, googleProvider);
            const user = userCredential.user;

            // Check if user document exists, if not create it
            const existingUser = await firestoreHelpers.getDocument(COLLECTIONS.USERS, user.uid);

            if (!existingUser) {
                await firestoreHelpers.createDocument(COLLECTIONS.USERS, user.uid, {
                    email: user.email,
                    displayName: user.displayName,
                    photoURL: user.photoURL,
                    role: 'user',
                    emailVerified: user.emailVerified,
                    badges: [],
                    downloadHistory: [],
                    preferences: {
                        language: 'en',
                        theme: 'system',
                        notifications: true,
                    },
                    status: 'active',
                });
            }

            return user;
        } catch (error) {
            console.error('Error signing in with Google:', error);
            throw error;
        }
    },

    // Sign out
    async signOut(): Promise<void> {
        try {
            await signOut(auth);
        } catch (error) {
            console.error('Error signing out:', error);
            throw error;
        }
    },

    // Send password reset email
    async resetPassword(email: string): Promise<void> {
        try {
            await sendPasswordResetEmail(auth, email);
        } catch (error) {
            console.error('Error sending password reset email:', error);
            throw error;
        }
    },

    // Listen to auth state changes
    onAuthChange(callback: (user: User | null) => void): () => void {
        return onAuthStateChanged(auth, callback);
    },
};

export { auth };
