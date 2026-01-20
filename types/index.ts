import { Timestamp } from 'firebase/firestore';

// User Types
export interface User {
    uid: string;
    email: string;
    displayName: string;
    photoURL: string | null;
    role: 'user' | 'admin';
    emailVerified: boolean;
    badges: string[];
    downloadHistory: DownloadHistory[];
    preferences: UserPreferences;
    joinedAt: Timestamp;
    lastActive: Timestamp;
    status: 'active' | 'banned' | 'suspended';
}

export interface UserPreferences {
    language: string;
    theme: 'light' | 'dark' | 'system';
    notifications: boolean;
}

export interface DownloadHistory {
    appId: string;
    timestamp: Timestamp;
    version: string;
}

// Product Types
export interface Product {
    id: string;
    name: string;
    tagline: string;
    description: string;
    longDescription: string;
    category: 'software' | 'extension' | 'tool';
    platform: Platform[];
    currentVersion: string;
    downloadUrl: string;
    releaseDate: Timestamp;
    images: ProductImages;
    tags: string[];
    features: string[];
    systemRequirements?: SystemRequirements;
    stats: ProductStats;
    visibility: ProductVisibility;
    monetization: ProductMonetization;
    seo: ProductSEO;
    support: ProductSupport;
    createdAt: Timestamp;
    updatedAt: Timestamp;
    createdBy: string;
}

export type Platform = 'windows' | 'mac' | 'linux' | 'android' | 'web';

export interface ProductImages {
    icon: string;
    screenshots: string[];
    banner?: string;
}

export interface SystemRequirements {
    os: string;
    ram: string;
    storage: string;
    processor: string;
}

export interface ProductStats {
    totalDownloads: number;
    weeklyDownloads: number;
    averageRating: number;
    totalReviews: number;
}

export interface ProductVisibility {
    isVisible: boolean;
    isFeatured: boolean;
    isUnderMaintenance: boolean;
    maintenanceMessage?: string;
}

export interface ProductMonetization {
    isPremium: boolean;
    price?: number;
    currency?: string;
    discountPrice?: number;
    licenseType: 'free' | 'paid' | 'freemium';
}

export interface ProductSEO {
    metaTitle: string;
    metaDescription: string;
    keywords: string[];
    ogImage?: string;
}

export interface ProductSupport {
    documentationUrl?: string;
    changelogUrl?: string;
    issuesUrl?: string;
    email?: string;
}

// Update Types
export interface Update {
    id: string;
    productId: string;
    version: string;
    changes: UpdateChanges;
    releaseNotes: string;
    releaseDate: Timestamp;
    downloadUrl: string;
    fileSize: number;
    isStable: boolean;
    isCritical: boolean;
}

export interface UpdateChanges {
    added: string[];
    fixed: string[];
    changed: string[];
    removed: string[];
}

// Review Types
export interface Review {
    id: string;
    productId: string;
    userId: string;
    userName: string;
    userPhoto?: string;
    rating: number;
    title: string;
    comment: string;
    isVerifiedDownload: boolean;
    helpful: number;
    notHelpful: number;
    status: 'pending' | 'approved' | 'rejected';
    createdAt: Timestamp;
    updatedAt: Timestamp;
}

// Newsletter Types
export interface Newsletter {
    id: string;
    email: string;
    source: 'homepage' | 'blog' | 'product_page';
    status: 'subscribed' | 'unsubscribed';
    preferences: NewsletterPreferences;
    subscribedAt: Timestamp;
    unsubscribedAt?: Timestamp;
}

export interface NewsletterPreferences {
    newProducts: boolean;
    updates: boolean;
    blog: boolean;
}

// Inquiry Types
export interface Inquiry {
    id: string;
    name: string;
    email: string;
    phone?: string;
    projectType: 'website' | 'app' | 'fix' | 'other';
    budget: string;
    description: string;
    urgency: 'low' | 'medium' | 'high';
    status: 'new' | 'contacted' | 'in_progress' | 'completed' | 'rejected';
    notes?: string;
    submittedAt: Timestamp;
    respondedAt?: Timestamp;
}

// Blog Types
export interface BlogPost {
    id: string;
    title: string;
    excerpt: string;
    content: string;
    author: BlogAuthor;
    featuredImage: string;
    category: string;
    tags: string[];
    isPublished: boolean;
    viewCount: number;
    readTime: number;
    seo: BlogSEO;
    publishedAt: Timestamp;
    updatedAt: Timestamp;
}

export interface BlogAuthor {
    name: string;
    photo: string;
    bio: string;
}

export interface BlogSEO {
    metaTitle: string;
    metaDescription: string;
    keywords: string[];
}

// Site Settings Types
export interface SiteSettings {
    id: 'global';
    ads: AdSettings;
    maintenance: MaintenanceSettings;
    features: FeatureToggles;
    translations: TranslationSettings;
    updatedAt: Timestamp;
}

export interface AdSettings {
    enabled: boolean;
    adsterraScript?: string;
    adSenseId?: string;
    placements: {
        homepage: boolean;
        productPages: boolean;
        blog: boolean;
    };
}

export interface MaintenanceSettings {
    enabled: boolean;
    message?: string;
    allowedUsers: string[];
}

export interface FeatureToggles {
    reviews: boolean;
    newsletter: boolean;
    chat: boolean;
    downloads: boolean;
}

export interface TranslationSettings {
    enabled: boolean;
    defaultLanguage: string;
    supportedLanguages: string[];
    autoDetect: boolean;
}

// Translation Types
export interface Translation {
    id: string;
    language: LanguageInfo;
    status: 'active' | 'draft' | 'disabled';
    coverage: number;
    translations: Record<string, string>;
    lastUpdated: Timestamp;
    updatedBy: string;
}

export interface LanguageInfo {
    code: string;
    name: string;
    nativeName: string;
    flag: string;
}

// API Response Types
export interface ApiResponse<T = any> {
    success: boolean;
    data?: T;
    error?: string;
    message?: string;
}

// Form Types
export interface ContactFormData {
    name: string;
    email: string;
    phone?: string;
    projectType: string;
    budget: string;
    description: string;
    urgency: string;
}

export interface LoginFormData {
    email: string;
    password: string;
    remember?: boolean;
}

export interface SignupFormData {
    displayName: string;
    email: string;
    password: string;
    confirmPassword: string;
}

export interface ReviewFormData {
    rating: number;
    title: string;
    comment: string;
}
