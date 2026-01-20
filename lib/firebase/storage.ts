import {
    ref,
    uploadBytes,
    getDownloadURL,
    deleteObject,
    UploadMetadata,
} from 'firebase/storage';
import { storage } from './config';

export const storageHelpers = {
    // Upload a file
    async uploadFile(
        path: string,
        file: File | Blob,
        metadata?: UploadMetadata
    ): Promise<string> {
        try {
            const storageRef = ref(storage, path);
            const snapshot = await uploadBytes(storageRef, file, metadata);
            const downloadURL = await getDownloadURL(snapshot.ref);
            return downloadURL;
        } catch (error) {
            console.error('Error uploading file:', error);
            throw error;
        }
    },

    // Upload image with automatic path structure
    async uploadImage(
        folder: 'products' | 'blog' | 'users' | 'assets',
        file: File
    ): Promise<string> {
        try {
            const timestamp = Date.now();
            const fileName = `${timestamp}-${file.name.replace(/\s+/g, '-')}`;
            const path = `${folder}/${fileName}`;

            return await this.uploadFile(path, file, {
                contentType: file.type,
            });
        } catch (error) {
            console.error('Error uploading image:', error);
            throw error;
        }
    },

    // Delete a file
    async deleteFile(path: string): Promise<void> {
        try {
            const storageRef = ref(storage, path);
            await deleteObject(storageRef);
        } catch (error) {
            console.error('Error deleting file:', error);
            throw error;
        }
    },

    // Get download URL
    async getDownloadURL(path: string): Promise<string> {
        try {
            const storageRef = ref(storage, path);
            return await getDownloadURL(storageRef);
        } catch (error) {
            console.error('Error getting download URL:', error);
            throw error;
        }
    },
};
