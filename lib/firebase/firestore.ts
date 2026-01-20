import {
    collection,
    doc,
    getDoc,
    getDocs,
    setDoc,
    updateDoc,
    deleteDoc,
    query,
    where,
    orderBy,
    limit,
    Timestamp,
    DocumentData,
    QueryConstraint,
    increment,
} from 'firebase/firestore';
import { db } from './config';

// Collection names as constants
export const COLLECTIONS = {
    USERS: 'users',
    PRODUCTS: 'products',
    UPDATES: 'updates',
    REVIEWS: 'reviews',
    NEWSLETTERS: 'newsletters',
    INQUIRIES: 'inquiries',
    BLOG_POSTS: 'blog_posts',
    SITE_SETTINGS: 'site_settings',
    TRANSLATIONS: 'translations',
} as const;

// Generic Firestore helpers
export const firestoreHelpers = {
    // Get a single document
    async getDocument<T>(collectionName: string, documentId: string): Promise<T | null> {
        try {
            const docRef = doc(db, collectionName, documentId);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                return { id: docSnap.id, ...docSnap.data() } as T;
            }
            return null;
        } catch (error) {
            console.error('Error getting document:', error);
            throw error;
        }
    },

    // Get multiple documents with query
    async getDocuments<T>(
        collectionName: string,
        constraints: QueryConstraint[] = []
    ): Promise<T[]> {
        try {
            const q = query(collection(db, collectionName), ...constraints);
            const querySnapshot = await getDocs(q);

            return querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
            })) as T[];
        } catch (error) {
            console.error('Error getting documents:', error);
            throw error;
        }
    },

    // Create a new document
    async createDocument(
        collectionName: string,
        documentId: string,
        data: DocumentData
    ): Promise<void> {
        try {
            const docRef = doc(db, collectionName, documentId);
            await setDoc(docRef, {
                ...data,
                createdAt: Timestamp.now(),
                updatedAt: Timestamp.now(),
            });
        } catch (error) {
            console.error('Error creating document:', error);
            throw error;
        }
    },

    // Update an existing document
    async updateDocument(
        collectionName: string,
        documentId: string,
        data: Partial<DocumentData>
    ): Promise<void> {
        try {
            const docRef = doc(db, collectionName, documentId);
            await updateDoc(docRef, {
                ...data,
                updatedAt: Timestamp.now(),
            });
        } catch (error) {
            console.error('Error updating document:', error);
            throw error;
        }
    },

    // Delete a document
    async deleteDocument(collectionName: string, documentId: string): Promise<void> {
        try {
            const docRef = doc(db, collectionName, documentId);
            await deleteDoc(docRef);
        } catch (error) {
            console.error('Error deleting document:', error);
            throw error;
        }
    },

    // Increment a field value
    async incrementField(
        collectionName: string,
        documentId: string,
        fieldName: string,
        value: number = 1
    ): Promise<void> {
        try {
            const docRef = doc(db, collectionName, documentId);
            await updateDoc(docRef, {
                [fieldName]: increment(value),
                updatedAt: Timestamp.now(),
            });
        } catch (error) {
            console.error('Error incrementing field:', error);
            throw error;
        }
    },
};

// Export Firestore utilities
export { collection, doc, query, where, orderBy, limit, Timestamp };
