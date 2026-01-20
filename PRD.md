# Product Requirements Document (PRD)
## CodeNest by Marjuk

**Version:** 1.0  
**Last Updated:** January 20, 2026  
**Document Owner:** Marjuk Amin  
**Status:** Planning Phase

---

## Executive Summary

CodeNest by Marjuk is a comprehensive web platform designed to distribute software applications, browser extensions, and web tools while establishing a professional developer identity. The platform combines a modern app marketplace with integrated content management, multilingual support, and future monetization capabilities—all built on a zero-cost, high-performance technology stack.

### Vision
To create a recognizable brand in the software distribution space while building a sustainable platform that serves users globally and positions Marjuk Amin as a notable developer in search engines and AI systems.

### Success Metrics
- **Launch Goal:** 1,000+ downloads in first month
- **SEO Target:** Google Knowledge Panel within 6 months
- **Engagement:** 30% returning user rate
- **Technical:** <2s page load time globally
- **Monetization Ready:** Payment infrastructure by Month 3

---

## 1. Product Overview

### 1.1 Problem Statement
Developers need a professional, branded platform to distribute their software without relying on third-party marketplaces that limit control, branding, and monetization options. Current solutions either lack customization or require expensive hosting infrastructure.

### 1.2 Solution
A self-hosted web application marketplace that provides:
- Complete control over branding and user experience
- Zero hosting costs through strategic technology choices
- Built-in internationalization for global reach
- Future-ready monetization infrastructure
- Professional developer identity establishment

### 1.3 Target Audience

**Primary Users:**
- End users seeking free/premium desktop applications
- Students and professionals in Bangladesh and globally
- Tech-savvy individuals looking for software alternatives

**Secondary Users:**
- Potential clients seeking development services
- Other developers interested in similar tools
- Content consumers (blog readers, tutorial followers)

---

## 2. Technical Architecture

### 2.1 Technology Stack

| Component | Technology | Justification |
|-----------|-----------|---------------|
| **Frontend Framework** | Next.js 14+ (App Router) | Server-side rendering, optimal performance, built-in routing |
| **Language** | TypeScript | Type safety, better developer experience, reduced bugs |
| **Styling** | Tailwind CSS + Shadcn/UI | Rapid development, consistent design system, glassmorphism aesthetics |
| **Backend & Database** | Firebase (Firestore) | Serverless architecture, real-time sync, zero maintenance |
| **Authentication** | Firebase Authentication | Secure, supports multiple providers, easy integration |
| **Hosting** | Firebase Hosting | Free SSL, global CDN, excellent Next.js SSR support |
| **File Distribution** | GitHub Releases | Unlimited bandwidth for large application files |
| **Asset Storage** | Cloudflare R2 / Firebase Storage | Cost-effective for images and smaller assets |
| **Email Service** | Resend API | 3,000 free emails/month, developer-friendly |
| **Search** | Fuse.js / Algolia (Free Tier) | Client-side search for simplicity, Algolia for scale |
| **Analytics** | Google Analytics 4 | User behavior tracking, conversion monitoring |
| **Ad Network** | Adsterra / Google AdSense | Revenue generation (post-launch) |

### 2.2 Cost Analysis

**Monthly Operating Costs (Projected):**
- Firebase (Spark Plan): $0 (up to limits)
- Cloudflare R2: $0 (10GB free tier)
- Resend API: $0 (up to 3,000 emails)
- GitHub: $0 (public repositories)
- Domain (Piprahost): ~$12/year (~$1/month)
- **Total: ~$1/month**

**Scaling Threshold:** Platform can handle 10,000+ monthly active users before paid tier required.

---

## 3. Data Architecture

### 3.1 Database Schema (Firestore Collections)

#### Collection: `users`
Stores user profiles, authentication data, and engagement history.

```json
{
  "uid": "string (Firebase UID)",
  "email": "string",
  "displayName": "string",
  "photoURL": "string (optional)",
  "role": "string (user|admin)",
  "emailVerified": "boolean",
  "badges": ["string (badge_id)"],
  "downloadHistory": [
    {
      "appId": "string",
      "timestamp": "Firestore Timestamp",
      "version": "string"
    }
  ],
  "preferences": {
    "language": "string (ISO code)",
    "theme": "string (light|dark|system)",
    "notifications": "boolean"
  },
  "joinedAt": "Firestore Timestamp",
  "lastActive": "Firestore Timestamp",
  "status": "string (active|banned|suspended)"
}
```

#### Collection: `products`
Stores all application and tool metadata.

```json
{
  "id": "string (unique slug)",
  "name": "string",
  "tagline": "string (short description)",
  "description": "string (markdown supported)",
  "longDescription": "string (full markdown)",
  "category": "string (software|extension|tool)",
  "platform": ["string (windows|mac|linux|android|web)"],
  "currentVersion": "string (semver)",
  "downloadUrl": "string (GitHub release URL)",
  "releaseDate": "Firestore Timestamp",
  "images": {
    "icon": "string (URL)",
    "screenshots": ["string (URL)"],
    "banner": "string (URL)"
  },
  "tags": ["string"],
  "features": ["string"],
  "systemRequirements": {
    "os": "string",
    "ram": "string",
    "storage": "string",
    "processor": "string"
  },
  "stats": {
    "totalDownloads": "number",
    "weeklyDownloads": "number",
    "averageRating": "number",
    "totalReviews": "number"
  },
  "visibility": {
    "isVisible": "boolean",
    "isFeatured": "boolean",
    "isUnderMaintenance": "boolean",
    "maintenanceMessage": "string"
  },
  "monetization": {
    "isPremium": "boolean",
    "price": "number",
    "currency": "string",
    "discountPrice": "number (optional)",
    "licenseType": "string (free|paid|freemium)"
  },
  "seo": {
    "metaTitle": "string",
    "metaDescription": "string",
    "keywords": ["string"],
    "ogImage": "string (URL)"
  },
  "support": {
    "documentationUrl": "string",
    "changelogUrl": "string",
    "issuesUrl": "string (GitHub issues)",
    "email": "string"
  },
  "createdAt": "Firestore Timestamp",
  "updatedAt": "Firestore Timestamp",
  "createdBy": "string (admin uid)"
}
```

#### Collection: `updates`
Stores version history and changelogs.

```json
{
  "id": "string (auto-generated)",
  "productId": "string (reference to products)",
  "version": "string (semver)",
  "changes": {
    "added": ["string"],
    "fixed": ["string"],
    "changed": ["string"],
    "removed": ["string"]
  },
  "releaseNotes": "string (markdown)",
  "releaseDate": "Firestore Timestamp",
  "downloadUrl": "string",
  "fileSize": "number (bytes)",
  "isStable": "boolean",
  "isCritical": "boolean"
}
```

#### Collection: `reviews`
Stores user reviews and ratings.

```json
{
  "id": "string (auto-generated)",
  "productId": "string",
  "userId": "string",
  "userName": "string",
  "userPhoto": "string (optional)",
  "rating": "number (1-5)",
  "title": "string",
  "comment": "string",
  "isVerifiedDownload": "boolean",
  "helpful": "number (upvotes)",
  "notHelpful": "number (downvotes)",
  "status": "string (pending|approved|rejected)",
  "createdAt": "Firestore Timestamp",
  "updatedAt": "Firestore Timestamp"
}
```

#### Collection: `newsletters`
Stores newsletter subscribers.

```json
{
  "id": "string (auto-generated)",
  "email": "string (unique)",
  "source": "string (homepage|blog|product_page)",
  "status": "string (subscribed|unsubscribed)",
  "preferences": {
    "newProducts": "boolean",
    "updates": "boolean",
    "blog": "boolean"
  },
  "subscribedAt": "Firestore Timestamp",
  "unsubscribedAt": "Firestore Timestamp (optional)"
}
```

#### Collection: `inquiries`
Stores service inquiry form submissions.

```json
{
  "id": "string (auto-generated)",
  "name": "string",
  "email": "string",
  "phone": "string (optional)",
  "projectType": "string (website|app|fix|other)",
  "budget": "string (range)",
  "description": "string",
  "urgency": "string (low|medium|high)",
  "status": "string (new|contacted|in_progress|completed|rejected)",
  "notes": "string (admin notes)",
  "submittedAt": "Firestore Timestamp",
  "respondedAt": "Firestore Timestamp (optional)"
}
```

#### Collection: `blog_posts`
Stores blog content.

```json
{
  "id": "string (slug)",
  "title": "string",
  "excerpt": "string",
  "content": "string (markdown)",
  "author": {
    "name": "string",
    "photo": "string",
    "bio": "string"
  },
  "featuredImage": "string (URL)",
  "category": "string",
  "tags": ["string"],
  "isPublished": "boolean",
  "viewCount": "number",
  "readTime": "number (minutes)",
  "seo": {
    "metaTitle": "string",
    "metaDescription": "string",
    "keywords": ["string"]
  },
  "publishedAt": "Firestore Timestamp",
  "updatedAt": "Firestore Timestamp"
}
```

#### Collection: `site_settings`
Stores global configuration.

```json
{
  "id": "global",
  "ads": {
    "enabled": "boolean",
    "adsterraScript": "string",
    "adSenseId": "string",
    "placements": {
      "homepage": "boolean",
      "productPages": "boolean",
      "blog": "boolean"
    }
  },
  "maintenance": {
    "enabled": "boolean",
    "message": "string",
    "allowedUsers": ["string (admin uids)"]
  },
  "features": {
    "reviews": "boolean",
    "newsletter": "boolean",
    "chat": "boolean",
    "downloads": "boolean"
  },
  "translations": {
    "enabled": "boolean",
    "defaultLanguage": "string",
    "supportedLanguages": ["string (ISO codes)"],
    "autoDetect": "boolean"
  },
  "updatedAt": "Firestore Timestamp"
}
```

#### Collection: `translations`
Stores manual translation overrides.

```json
{
  "id": "string (language_code)",
  "language": {
    "code": "string (ISO)",
    "name": "string",
    "nativeName": "string",
    "flag": "string (emoji)"
  },
  "status": "string (active|draft|disabled)",
  "coverage": "number (0-100 percentage)",
  "translations": {
    "key": "string (translated value)"
  },
  "lastUpdated": "Firestore Timestamp",
  "updatedBy": "string (admin uid)"
}
```

---

## 4. Feature Specifications

### 4.1 Public-Facing Features

#### 4.1.1 Homepage

**Purpose:** First impression, brand establishment, traffic distribution

**Components:**
- **Hero Section**
  - Headline: "Software Built for the Future"
  - Subheadline: Brief value proposition
  - Primary CTA: "Explore Apps" → `/apps`
  - Secondary CTA: "Hire Me" → `/services`
  - Background: Animated gradient or subtle particle effect

- **Featured Apps Slider**
  - Admin-controlled via `products.visibility.isFeatured`
  - Auto-rotates every 5 seconds
  - Shows 3-4 apps simultaneously on desktop
  - Mobile: Swipeable cards
  - Each card displays: Icon, Name, Tagline, Download Count

- **Latest Updates Ticker**
  - Pulls from `updates` collection
  - Shows recent version releases
  - Format: "🎉 Tavelyn v1.2.0 released - Dark mode added!"
  - Click to navigate to product page

- **Newsletter Section**
  - Headline: "Get Notified for New Tools"
  - Single email input + Subscribe button
  - Saves to `newsletters` collection
  - Confirmation email via Resend API

- **Statistics Section**
  - Total Downloads (aggregated)
  - Total Apps
  - Countries Served
  - Happy Users
  - Real-time updates from Firestore

- **Testimonials/Reviews Carousel** (Phase 4)
  - Featured 5-star reviews
  - User photo, name, rating, comment

**Technical Requirements:**
- Server-side rendering for SEO
- Lazy loading for images
- Responsive breakpoints: mobile (375px), tablet (768px), desktop (1024px+)
- Accessibility: ARIA labels, keyboard navigation

---

#### 4.1.2 Apps Listing Page (`/apps`)

**Purpose:** Browsable catalog of all available applications

**Components:**
- **Filter Sidebar**
  - Platform: Windows, Mac, Linux, Android, Web
  - Category: Software, Extension, Tool
  - Price: Free, Paid, Freemium (future)
  - Sort By: Popular, Newest, Name (A-Z)

- **Search Bar**
  - Live search using Fuse.js
  - Searches: name, tagline, tags, description
  - Debounced input (300ms delay)
  - Shows results count

- **App Grid**
  - Card layout: Icon, Name, Tagline, Platform badges, Download count
  - Hover effect: Slight elevation, scale(1.02)
  - Click navigates to `/apps/[id]`
  - Infinite scroll or pagination (12 items per page)

- **Empty State**
  - Shows when no results found
  - Friendly message with illustration
  - CTA to clear filters

**Technical Requirements:**
- Client-side filtering for speed
- URL parameter persistence (`?platform=windows&sort=popular`)
- Meta tags for SEO

---

#### 4.1.3 App Details Page (`/apps/[id]`)

**Purpose:** Complete product information and download initiation

**Components:**
- **Header Section**
  - Large app icon (left)
  - Name, tagline, rating, download count (right)
  - Platform badges
  - Primary CTA: "Download Now" button (large, green)
  - Secondary CTAs: Share buttons (Facebook, WhatsApp, Copy Link)

- **Screenshot Gallery**
  - Lightbox viewer
  - Thumbnail navigation
  - Swipe gestures on mobile
  - Lazy loading

- **Description Tabs**
  - Overview: Long description (markdown rendered)
  - Features: Bulleted list
  - System Requirements: Table format
  - Installation Guide: Step-by-step

- **Version Information**
  - Current version number
  - Release date
  - File size
  - Changelog link → shows `updates` collection data

- **Reviews Section** (Phase 4)
  - Star rating distribution graph
  - Filter: All, 5-star, 4-star, etc.
  - Pagination for reviews
  - "Write a Review" button (authenticated users only)
  - Verified download badge for reviewers who downloaded

- **Related Apps**
  - Based on tags/category
  - Shows 3-4 similar apps
  - Horizontal scroll

- **Social Sharing**
  - Facebook share with Open Graph preview
  - WhatsApp direct share
  - Copy link with success notification

**Technical Requirements:**
- Dynamic meta tags (title, description, OG image)
- JSON-LD schema for SoftwareApplication
- Download tracking (increment counter in Firestore)
- Analytics event on download click
- Canonical URL for SEO

**Download Flow:**
1. User clicks "Download Now"
2. System checks if user is authenticated
3. If yes: Increment download counter, save to user's `downloadHistory`, redirect to GitHub release
4. If no: Show modal "Sign up to track downloads" with option to continue anyway

---

#### 4.1.4 Services / Hire Me Page (`/services`)

**Purpose:** Generate service inquiries and position as available for hire

**Components:**
- **Hero Section**
  - Headline: "Let's Build Something Amazing Together"
  - Subheadline: Skills overview (Web Development, Desktop Apps, PC Repair)
  - Profile photo

- **Service Cards**
  - Custom Website Development
  - Desktop Application Development
  - Browser Extension Development
  - PC Repair & Troubleshooting
  - Each card: Icon, title, brief description, pricing hint

- **Portfolio Showcase**
  - Links to existing apps as case studies
  - Technology stack used
  - Results/metrics

- **Contact Form**
  - Fields: Name, Email, Phone (optional), Project Type (dropdown), Budget Range (dropdown), Description (textarea), Urgency (radio)
  - Validation: Required fields, email format, min character count
  - Submit → Saves to `inquiries` collection
  - Sends email via Resend API to Marjuk's email
  - Success message with estimated response time

**Technical Requirements:**
- Form validation (client + server-side)
- Rate limiting (max 5 submissions per hour per IP)
- Spam protection (honeypot field)
- Mobile-optimized form

---

#### 4.1.5 Blog (`/blog`)

**Purpose:** SEO content, tutorials, establish expertise

**Components:**
- **Blog Listing**
  - Featured post (large card at top)
  - Grid of recent posts
  - Categories sidebar
  - Search bar

- **Blog Post Page** (`/blog/[slug]`)
  - Full markdown rendering
  - Table of contents (auto-generated from headings)
  - Reading time estimate
  - Author info
  - Related posts
  - Social share buttons
  - Comment section (future)

**Technical Requirements:**
- MDX support for interactive examples
- Syntax highlighting for code blocks
- RSS feed generation
- JSON-LD Article schema

---

### 4.2 User Dashboard (`/dashboard`)

**Purpose:** Personalized user experience and engagement

**Access:** Authenticated users only

#### 4.2.1 Authentication

**Login Methods:**
- Google OAuth
- Email/Password
- GitHub OAuth (future)

**Pages:**
- `/login` - Sign in form
- `/signup` - Registration form
- `/forgot-password` - Password reset

**Features:**
- Email verification required for certain actions
- "Remember me" checkbox
- Social login buttons prominent
- Clear error messages

#### 4.2.2 Dashboard Layout

**Sidebar Navigation:**
- Overview
- My Library
- Settings
- Logout

**Overview Tab:**
- Welcome message with user name
- Total downloads
- Status badges display
- Recent activity feed
- Recommended apps based on download history

**My Library Tab:**
- List of downloaded apps
- Download date, version
- "Re-download" button
- Update notifications if new version available

**Settings Tab:**
- Profile section: Change display name, upload photo
- Account section: Change email, password
- Preferences: Language, theme, notifications
- Danger zone: Delete account

**Badges System:**
- Early Supporter (first 100 users)
- Verified Student (email verification with .edu)
- Power User (10+ downloads)
- Contributor (submitted review)
- Admin

**Technical Requirements:**
- Protected routes with middleware
- Real-time data sync with Firestore
- Optimistic UI updates

---

### 4.3 Admin Dashboard (`/admin`)

**Purpose:** Complete platform management

**Access:** Users with `role: "admin"` only

#### 4.3.1 Dashboard Overview

**Stats Display:**
- Today's downloads
- Total users (chart over time)
- New signups today
- Active sessions
- Revenue (future)

**Quick Actions:**
- Add new product
- View pending reviews
- Check inquiries
- Manage ads

#### 4.3.2 Product Manager

**Product List:**
- Searchable table of all products
- Columns: Name, Category, Downloads, Status, Actions
- Actions: Edit, Delete, Toggle visibility, Maintenance mode

**Add/Edit Product Form:**
- All fields from `products` schema
- Image upload (Firebase Storage or R2)
- Markdown editor for descriptions
- Tag manager (add/remove tags)
- Preview mode
- Save as draft or publish

**Maintenance Mode Toggle:**
- Per-product switch
- When enabled: Shows "Under Maintenance" on product page
- Download button disabled
- Custom maintenance message input

#### 4.3.3 User Manager

**User List:**
- Search by email, name, UID
- Columns: Name, Email, Join Date, Status, Role
- Actions: View details, Ban, Gift badge, Make admin

**User Details Modal:**
- Full profile view
- Download history
- Reviews submitted
- Account actions: Send email, reset password, delete account

#### 4.3.4 Review Manager (Phase 4)

**Review Queue:**
- Pending reviews list
- Approve/Reject actions
- Bulk actions

**Review Moderation:**
- Flag inappropriate content
- Edit/delete reviews
- Ban reviewer

#### 4.3.5 Ad Manager

**Global Ad Control:**
- Enable/disable ads globally
- Paste Adsterra script
- Save → Updates `site_settings.ads.adsterraScript`
- Script auto-injects into all pages

**Ad Placements:**
- Toggle ads per page type (homepage, product, blog)
- Preview mode

#### 4.3.6 Language Manager

**Language Dashboard:**
- World map visualization showing enabled languages
- Language list with status (Active, Draft, Disabled)
- Coverage percentage per language

**Add Language:**
- Click "Add New Language"
- Select from ISO language list
- System creates entry in `translations` collection
- AI auto-translates core strings

**Translation Editor:**
- Side-by-side view: English (source) | Target language
- Search translations by key
- Edit individual translations
- Bulk import/export CSV
- Mark translation as "manually verified"

**Language Toggle:**
- Enable/disable languages
- Set default language
- Auto-detect toggle

#### 4.3.7 Inquiry Manager

**Inquiry List:**
- Table of service inquiries
- Filter by status (New, Contacted, In Progress, Completed)
- Sort by date, urgency

**Inquiry Details:**
- Full submission view
- Add internal notes
- Update status
- Send response email (pre-filled templates)

#### 4.3.8 Blog Manager

**Post List:**
- Draft/Published filter
- Search by title
- Quick actions: Edit, Delete, Duplicate

**Post Editor:**
- Markdown editor with live preview
- SEO fields (meta title, description, keywords)
- Featured image upload
- Category/tag selection
- Schedule publishing (future)

#### 4.3.9 Settings

**Site Configuration:**
- Site name, tagline
- Contact email
- Social media links
- Maintenance mode (whole site)

**Security:**
- API key management
- Webhook secrets
- Allowed admin emails

---

### 4.4 Internationalization (i18n)

**Goal:** Support any language globally with hybrid translation approach

#### 4.4.1 Language Detection

**Auto-Detection Logic:**
1. Check URL parameter (`?lang=bn`)
2. Check user preference in profile (authenticated)
3. Check browser language header
4. Check IP-based geolocation (Cloudflare)
5. Default to English

#### 4.4.2 Translation Architecture

**Core Languages (Manual Translation):**
- English (en) - Primary
- Bengali (bn) - Secondary

**Global Languages (AI-Assisted):**
- Spanish (es)
- Hindi (hi)
- Arabic (ar)
- French (fr)
- German (de)
- Japanese (ja)
- Portuguese (pt)
- Russian (ru)

**Translation Workflow:**
1. Developer writes content in English
2. AI service (DeepL API or similar) auto-translates to all enabled languages
3. Translations saved to `translations` collection
4. Admin can manually override specific translations
5. Frontend fetches translations based on active language

#### 4.4.3 Frontend Implementation

**Language Switcher:**
- Dropdown in navbar
- Shows flag + language name
- Updates URL parameter
- Persists selection to localStorage (guest) or profile (authenticated)

**Translation Loading:**
- Server-side: Load translations during SSR for initial page
- Client-side: Fetch on language change
- Fallback to English if translation missing

**Translatable Content:**
- All UI text (buttons, labels, messages)
- Product names/descriptions (optional, admin can enable per product)
- Blog posts (future, via separate content field)
- Email templates

#### 4.4.4 SEO Optimization

**hreflang Tags:**
- Auto-generate alternate language links
- Example: `<link rel="alternate" hreflang="bn" href="https://codenestbymarjuk.com/bn/apps/tavelyn" />`

**Localized URLs:**
- Structure: `/[lang]/[page]`
- Example: `/bn/apps`, `/es/blog`
- Default English: `/apps` (no lang prefix)

---

### 4.5 Utility Features

#### 4.5.1 Contact Form

**Location:** `/contact` or footer of every page

**Fields:**
- Name
- Email
- Subject (dropdown or text)
- Message

**Behavior:**
- Validation + spam protection
- Submit → Resend API email to admin
- Auto-reply to user
- Success confirmation

#### 4.5.2 Web Tools Section (`/tools`)

**Purpose:** Browser-based utilities that don't require download

**Tool Categories:**
- Image Tools (Resize, Compress, Convert)
- PDF Tools (Merge, Split, Compress)
- Text Tools (Word Counter, Case Converter, Markdown Editor)
- Developer Tools (JSON Formatter, Base64 Encoder, QR Generator)
- Color Tools (Picker, Gradient Generator, Palette Creator)

**Tool Structure:**
- Each tool is a separate page: `/tools/[tool-id]`
- Client-side processing only (no server upload)
- Results can be downloaded
- Share tool link

**Technical Implementation:**
- Use Web APIs (Canvas, FileReader, etc.)
- Privacy-focused (no data sent to server)
- Works offline (PWA)

#### 4.5.3 Legal Pages

**Required Pages:**
- `/privacy` - Privacy Policy
- `/terms` - Terms of Service
- `/refund` - Refund Policy (when monetization active)

**Content Requirements:**
- Data collection practices
- Cookie usage
- Third-party services (Firebase, Cloudflare)
- User rights
- Contact information
- Last updated date

**Technical:**
- Simple markdown rendering
- Linked in footer
- Mandatory for AdSense approval

#### 4.5.4 Live Chat Widget

**Service:** Tawk.to (free tier)

**Features:**
- Online/offline detection (admin availability)
- Offline message form
- Chat history (stored in Tawk.to)
- Mobile-responsive
- Customizable widget position

**Integration:**
- Simple script injection
- Admin toggle in settings
- Trigger on specific pages or delays

---

### 4.6 Premium Features

#### 4.6.1 Progressive Web App (PWA)

**Capabilities:**
- Installable on Android, Desktop, iOS
- "Add to Home Screen" prompt
- Offline functionality (cached pages)
- Push notifications (future)

**Implementation:**
- `manifest.json` with app metadata
- Service worker for caching
- Offline fallback page
- Install prompt UI

#### 4.6.2 "Marjuk ID" Branding

**Concept:** Universal login for all Marjuk apps/services

**Features:**
- Single sign-on across future projects
- Centralized profile management
- Badge/achievement system
- "Powered by Marjuk ID" branding

**Technical:**
- OAuth provider setup
- JWT token management
- API for third-party app integration

#### 4.6.3 Dark Mode

**Implementation:**
- Toggle in navbar (sun/moon icon)
- Three modes: Light, Dark, System
- Persists to localStorage
- CSS variables for theming
- Smooth transition animation

**Color Palette:**
- Light: White backgrounds, dark text
- Dark: Dark gray/black backgrounds, light text
- Accent colors remain consistent

#### 4.6.4 Auto-Update System

**Concept:** Desktop apps check website for updates

**API Endpoint:** `/api/check-update`

**Request:**
```
GET /api/check-update?app=tavelyn&version=1.0.0
```

**Response:**
```json
{
  "updateAvailable": true,
  "latestVersion": "1.2.0",
  "downloadUrl": "https://github.com/...",
  "releaseNotes": "...",
  "isCritical": false
}
```

**Desktop App Integration:**
- App pings API on launch
- Shows update notification if available
- User can download directly
- Option to skip version or auto-update

---

## 5. Advanced Features

### 5.1 Identity & SEO Enhancement

#### 5.1.1 JSON-LD Schema Implementation

**Person Schema (Homepage):**
```json
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Marjuk Amin",
  "jobTitle": "Software Developer",
  "url": "https://codenestbymarjuk.com",
  "sameAs": [
    "https://github.com/Marjuk06",
    "https://linkedin.com/in/marjuk-amin",
    "https://twitter.com/marjuk"
  ],
  "address": {
    "@type": "PostalAddress",
    "addressCountry": "BD",
    "addressLocality": "Khulna"
  },
  "alumniOf": "University Name",
  "knowsAbout": ["Web Development", "Desktop Applications", "Next.js"]
}
```

**SoftwareApplication Schema (Product Pages):**
```json
{
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Tavelyn",
  "applicationCategory": "MultimediaApplication",
  "operatingSystem": "Windows 10, Windows 11",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.8",
    "reviewCount": "127"
  },
  "downloadUrl": "https://codenestbymarjuk.com/apps/tavelyn"
}
```

**Benefits:**
- Google Knowledge Panel eligibility
- Rich snippets in search results
- AI model training data inclusion
- Enhanced search visibility

#### 5.1.2 Programmatic SEO

**Strategy:**
- Generate unique URL for every feature/tag combination
- Example: `/apps/music-player`, `/apps/windows-apps`, `/tools/free-online`

**Implementation:**
- Dynamic sitemap generation
- Auto-generated category pages
- Long-tail keyword targeting

#### 5.1.3 International SEO

**Techniques:**
- hreflang tags for all language versions
- Localized content where appropriate
- Country-specific metadata
- Geo-targeted backlinks (future)

---

5.2 GitHub Integration & Automation
5.2.1 Webhook Setup
Goal: Zero-maintenance app updates
Workflow:

Developer publishes GitHub Release on any repository
GitHub sends webhook POST request to /api/webhooks/github
Website receives release data (version, download URL, changelog, file size)
API validates webhook signature for security
Firestore automatically updates the relevant product document
New entry added to updates collection
Users see updated version instantly on product page

Webhook Payload Example:
json{
  "action": "published",
  "release": {
    "tag_name": "v1.2.0",
    "name": "Tavelyn v1.2.0 - Dark Mode Release",
    "body": "## Changes\n- Added dark mode\n- Fixed login bug",
    "html_url": "https://github.com/Marjuk06/Tavelyn/releases/tag/v1.2.0",
    "assets": [
      {
        "name": "Tavelyn-Setup-1.2.0.exe",
        "browser_download_url": "https://github.com/.../Tavelyn-Setup-1.2.0.exe",
        "size": 45678900
      }
    ]
  },
  "repository": {
    "name": "Tavelyn",
    "full_name": "Marjuk06/Tavelyn"
  }
}
API Implementation (/api/webhooks/github):

Verify webhook signature using GitHub secret
Parse release data
Match repository name to product ID in Firestore
Update product's currentVersion, downloadUrl, releaseDate
Create new document in updates collection
Send notification email to newsletter subscribers (optional)
Return 200 OK response

Security Measures:

Webhook secret stored in environment variables
Signature validation (HMAC SHA-256)
IP whitelist (GitHub's webhook IPs only)
Rate limiting on endpoint

Configuration:

GitHub Repository Settings → Webhooks → Add webhook
Payload URL: https://codenestbymarjuk.com/api/webhooks/github
Content type: application/json
Secret: Generated secure token
Events: Release published/edited

Benefits:

Zero manual intervention when updating apps
Instant version synchronization
Automatic changelog generation
Always accurate download links


6. Development Roadmap
Phase 1: The Skeleton (Week 1)
Goal: Foundation setup and initial infrastructure
Tasks:

Initialize Next.js 14+ project with TypeScript

npx create-next-app@latest codenest-marjuk --typescript --tailwind --app
Configure tsconfig.json for strict mode
Set up ESLint and Prettier


Install core dependencies

Tailwind CSS (pre-installed)
Shadcn/UI: npx shadcn-ui@latest init
Firebase SDK: npm install firebase
Resend: npm install resend


Set up Firebase project

Create Firebase project in console
Enable Firestore Database
Enable Authentication (Google, Email/Password)
Configure Firebase Admin SDK for server-side
Add Firebase config to .env.local


Create basic folder structure

   /app
     /api
     /(public)
       /page.tsx (homepage)
     /(auth)
       /login
       /signup
     /(dashboard)
       /dashboard
     /(admin)
       /admin
   /components
     /ui (shadcn components)
     /layout
     /features
   /lib
     /firebase
     /utils
   /types

Build "Coming Soon" landing page

Hero section with countdown (launch date)
Email collection form
Social media links
Simple animation/gradient background



Deliverables:

Working Next.js app on localhost
Firebase connection established
Coming Soon page deployed to Firebase Hosting


Phase 2: The Data Layer (Week 2)
Goal: Admin dashboard for content management
Tasks:

Create Firestore security rules

Admin-only access to admin dashboard
Authenticated users can read/write their own data
Public read access to products, updates, blog posts


Build authentication system

Firebase Auth integration
Login/signup pages with Google OAuth
Protected route middleware
Session management


Admin Dashboard - Core

Admin layout with sidebar navigation
Stats overview (total users, downloads, revenue)
Role-based access control


Product Manager

"Add Product" form with all fields
Image upload to Firebase Storage/Cloudflare R2
Markdown editor for descriptions (react-markdown)
Tag input component
Product list table with search/filter
Edit/delete functionality
Maintenance mode toggle


Create initial Firestore collections

Initialize empty collections: users, products, updates, reviews, newsletters, inquiries, blog_posts, site_settings, translations



Deliverables:

Functional admin dashboard
Ability to add/edit/delete products
First product (Tavelyn) added to database


Phase 3: The Public Store (Week 3-4)
Goal: User-facing application marketplace
Tasks:

Homepage

Hero section with dynamic headline
Featured apps slider (fetch from Firestore where isFeatured: true)
Latest updates ticker
Newsletter signup form (saves to Firestore, sends welcome email via Resend)
Statistics section (aggregated from Firestore)
Footer with links


Apps Listing Page (/apps)

Fetch all visible products from Firestore
Implement Fuse.js for client-side search
Filter sidebar (platform, category, price)
Sort functionality (popular, newest, A-Z)
App card grid with hover effects
Pagination or infinite scroll


App Details Page (/apps/[id])

Dynamic route with product ID
Fetch product data + related updates
Screenshot gallery with lightbox
Tabbed description (Overview, Features, Requirements, Installation)
Download button with tracking logic
Social share buttons (Facebook, WhatsApp, Copy Link)
Related apps section
SEO: Dynamic meta tags, JSON-LD schema


Download tracking system

Increment stats.totalDownloads in Firestore
Save to user's downloadHistory if authenticated
Analytics event tracking
Redirect to GitHub release URL


Services/Hire Me page

Hero with profile photo and skills
Service cards
Portfolio showcase (link to existing apps)
Contact form (saves to inquiries, sends email via Resend)
Form validation and spam protection



Deliverables:

Complete browsable app marketplace
Working download system with tracking
Service inquiry system


Phase 4: Authentication & Community (Week 5)
Goal: User engagement and social features
Tasks:

User Dashboard

Overview tab (welcome, stats, badges, activity feed)
My Library tab (downloaded apps with version info)
Settings tab (profile, account, preferences, delete account)
Badge system implementation


Review & Rating System

Review form on product pages (authenticated users only)
Star rating component
Save reviews to reviews collection with status: "pending"
Review moderation in admin dashboard
Display approved reviews on product pages
Rating aggregation and display


Admin - User Manager

User list with search
User details modal
Ban/unban functionality
Gift badge feature
Download history view


Admin - Review Manager

Pending reviews queue
Approve/reject actions
Edit/delete reviews
Bulk actions



Deliverables:

User dashboard with personalization
Working review system
Complete admin user management


Phase 5: SEO & Monetization (Week 6)
Goal: Search visibility and revenue infrastructure
Tasks:

SEO Optimization

Generate sitemap.xml dynamically (all products, blog posts, pages)
Create robots.txt
Add JSON-LD Person schema to homepage
Add JSON-LD SoftwareApplication schema to product pages
Add JSON-LD Article schema to blog posts
Implement Open Graph tags globally
Add Twitter Card metadata


Blog System

Blog listing page with categories/tags
Blog post page with markdown rendering
Admin blog manager (create, edit, delete, publish)
Syntax highlighting for code blocks
Reading time calculation
RSS feed generation


Ad Integration

Admin ad manager (paste script, toggle placements)
Save ad script to site_settings in Firestore
Dynamic script injection on enabled pages
Ad preview mode for testing


Analytics Setup

Google Analytics 4 integration
Custom events (download, signup, contact form)
Conversion tracking
Admin analytics dashboard


Legal Pages

Privacy Policy (with Firebase/Cloudflare disclosures)
Terms of Service
Refund Policy (for future monetization)



Deliverables:

SEO-optimized site with rich snippets
Blog system
Ad infrastructure ready
Legal compliance


Phase 6: Launch Preparation (Week 7)
Goal: Production deployment and final testing
Tasks:

Domain & Hosting

Purchase domain from Piprahost: codenestbymarjuk.com
Configure Firebase Hosting with custom domain
Set up SSL (automatic via Firebase)
Configure DNS records


Internationalization

Implement language detection logic
Create language switcher component
Set up translation loading system
Add hreflang tags
Configure localized URLs
Add Bengali translations for core UI


Premium Features

PWA setup (manifest.json, service worker)
Dark mode implementation
Offline page
Install prompt


Web Tools Section

Create /tools page structure
Implement 3-5 initial tools (Image Resizer, JSON Formatter, QR Generator)
Client-side processing only
Tool sharing functionality


Testing & Optimization

Cross-browser testing (Chrome, Firefox, Safari, Edge)
Mobile responsiveness testing
Performance optimization (Lighthouse score >90)
Load testing (simulate 1000+ concurrent users)
Security audit (XSS, CSRF, SQL injection prevention)
Accessibility audit (WCAG 2.1 AA compliance)


Final Touches

Contact form testing (Resend API)
Live chat widget integration (Tawk.to)
Newsletter system testing
Error pages (404, 500)
Loading states and skeleton screens



Deliverables:

Production-ready website on custom domain
All systems tested and verified
Performance optimized


Phase 7: Launch & Growth (Week 8+)
Goal: Public launch and user acquisition
Launch Day Checklist:

 Final security review
 Backup Firestore data
 Test all critical user flows
 Prepare social media posts
 Write Product Hunt launch post
 Email list ready (early access subscribers)
 Monitor server for first 24 hours
 Have emergency rollback plan

Launch Activities:

Soft launch (Week 8 Day 1-3)

Share with close friends/testers
Monitor for critical bugs
Gather initial feedback
Fix high-priority issues


Public launch (Week 8 Day 4)

Post on Product Hunt (aim for #1 Product of the Day)
Share on Twitter/X with demo video
Post in developer communities (Reddit: r/webdev, r/SideProject, r/reactjs)
Share in Facebook groups (Bangladesh developer communities)
LinkedIn announcement
Send email to newsletter subscribers


Post-launch monitoring (Week 8-12)

Daily analytics review
User feedback collection
Bug fixes and quick wins
Performance monitoring
SEO ranking tracking



Growth Strategy:

Create tutorial blog posts (Next.js, Firebase, etc.)
Guest post on dev.to and Medium
YouTube video showcasing the platform
Engage with users on social media
Encourage user reviews and testimonials
Build backlinks through developer communities
Local media outreach (Bangladesh tech blogs)

Future Enhancements (Post-Launch):

Payment Gateway Integration (Month 3)

SSLCommerz or Stripe integration
Premium app listing
Coupon/discount system
Revenue dashboard


Advanced Features (Month 4-6)

GitHub webhook automation
Desktop app auto-update API
"Marjuk ID" OAuth provider
Push notifications
Advanced analytics dashboard
A/B testing system


Scale & Optimize (Month 6+)

CDN optimization
Database indexing
Caching layer (Redis)
API rate limiting
Advanced security features




7. Security & Compliance
7.1 Security Measures
Authentication Security:

Firebase Authentication with MFA support
JWT token validation on protected routes
Session timeout after 24 hours of inactivity
Brute force protection (rate limiting on login)
Password requirements: min 8 chars, uppercase, lowercase, number

API Security:

CORS configuration (allow only codenestbymarjuk.com)
API rate limiting (100 requests per minute per IP)
Input validation and sanitization
SQL injection prevention (Firestore is NoSQL, but still validate)
XSS prevention (sanitize user-generated content)
CSRF tokens for form submissions

Data Security:

Firestore Security Rules (read/write permissions)
Sensitive data encryption at rest
HTTPS only (enforced by Firebase Hosting)
Environment variables for API keys
Secure webhook signature validation

File Upload Security:

File type validation (images only for product uploads)
File size limits (5MB for images)
Malware scanning (ClamAV or VirusTotal API)
Filename sanitization

7.2 Firestore Security Rules
javascriptrules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    // Helper functions
    function isAuthenticated() {
      return request.auth != null;
    }
    
    function isAdmin() {
      return isAuthenticated() && 
             get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
    }
    
    function isOwner(userId) {
      return isAuthenticated() && request.auth.uid == userId;
    }
    
    // Users collection
    match /users/{userId} {
      allow read: if isAuthenticated();
      allow create: if isAuthenticated() && request.auth.uid == userId;
      allow update: if isOwner(userId) || isAdmin();
      allow delete: if isAdmin();
    }
    
    // Products collection
    match /products/{productId} {
      allow read: if resource.data.visibility.isVisible == true || isAdmin();
      allow write: if isAdmin();
    }
    
    // Updates collection
    match /updates/{updateId} {
      allow read: if true;
      allow write: if isAdmin();
    }
    
    // Reviews collection
    match /reviews/{reviewId} {
      allow read: if resource.data.status == 'approved' || isAdmin();
      allow create: if isAuthenticated();
      allow update, delete: if isAdmin();
    }
    
    // Newsletter collection
    match /newsletters/{newsletterId} {
      allow read: if isAdmin();
      allow create: if true;
      allow update, delete: if isAdmin();
    }
    
    // Inquiries collection
    match /inquiries/{inquiryId} {
      allow read: if isAdmin();
      allow create: if true;
      allow update, delete: if isAdmin();
    }
    
    // Blog posts collection
    match /blog_posts/{postId} {
      allow read: if resource.data.isPublished == true || isAdmin();
      allow write: if isAdmin();
    }
    
    // Site settings collection
    match /site_settings/{settingId} {
      allow read: if true;
      allow write: if isAdmin();
    }
    
    // Translations collection
    match /translations/{langCode} {
      allow read: if resource.data.status == 'active' || isAdmin();
      allow write: if isAdmin();
    }
  }
}
7.3 Privacy Compliance
GDPR Compliance (for EU users):

Cookie consent banner
Clear privacy policy
Right to access data (user can download their data)
Right to deletion (account deletion feature)
Data processing agreements with third parties (Firebase, Cloudflare)

Data Collection Transparency:

What data is collected: email, name, download history, IP address (analytics)
Why it's collected: authentication, service improvement, analytics
How it's used: never sold to third parties
Retention period: user data kept until account deletion

User Rights:

Access: Users can view all their data in dashboard
Rectification: Users can edit profile information
Erasure: Users can delete account (removes all personal data)
Portability: Users can export download history as JSON

7.4 Backup & Disaster Recovery
Automated Backups:

Firestore: Daily automated backups (Firebase built-in)
User-uploaded images: Replicated across Cloudflare R2 regions
Configuration: Git version control for code

Recovery Plan:

RTO (Recovery Time Objective): 4 hours
RPO (Recovery Point Objective): 24 hours
Backup restoration testing: Monthly
Incident response plan documented


8. Performance Optimization
8.1 Performance Targets
Core Web Vitals:

LCP (Largest Contentful Paint): <2.5s
FID (First Input Delay): <100ms
CLS (Cumulative Layout Shift): <0.1
Overall Lighthouse Score: >90

8.2 Optimization Techniques
Image Optimization:

Next.js Image component for automatic optimization
WebP format with fallback
Lazy loading for below-the-fold images
Responsive images (srcset)
Placeholder blur (base64 encoded thumbnails)

Code Splitting:

Route-based code splitting (Next.js default)
Dynamic imports for heavy components
Tree shaking to remove unused code
Minimize bundle size (<200KB initial load)

Caching Strategy:

Static assets: 1 year cache (immutable)
API responses: 5-minute cache with stale-while-revalidate
Service worker caching for offline support
Firestore local cache enabled

Database Optimization:

Firestore indexes for common queries
Pagination for large lists
Composite indexes for complex queries
Avoid N+1 queries (batch reads)

CDN & Hosting:

Firebase Hosting global CDN
Edge caching for static content
Brotli compression enabled
HTTP/2 server push for critical resources


9. Testing Strategy
9.1 Unit Testing
Framework: Jest + React Testing Library
Coverage Target: 80%+ for critical paths
Test Cases:

Component rendering
User interactions (clicks, form submissions)
API calls (mocked)
Utility functions
Data transformations

9.2 Integration Testing
Framework: Playwright or Cypress
Critical User Flows:

User signup → email verification → dashboard
Browse apps → view details → download
Submit service inquiry → receive confirmation email
Admin adds product → appears on homepage
User submits review → admin approves → displays on product page

9.3 End-to-End Testing
Pre-Launch Checklist:

 All pages load without errors
 Forms validate correctly
 Authentication flow works (Google + Email)
 Download tracking increments correctly
 Newsletter signup sends confirmation email
 Contact form sends email to admin
 Admin dashboard CRUD operations work
 Dark mode toggle functions
 Language switcher changes content
 Mobile responsive on all devices
 Cross-browser compatibility verified

9.4 Performance Testing
Tools:

Lighthouse CI for automated performance checks
WebPageTest for detailed metrics
GTmetrix for global performance

Load Testing:

Simulate 1,000 concurrent users (Artillery or K6)
Test database read/write limits
Monitor Firebase quota usage
Identify bottlenecks


10. Success Metrics & KPIs
10.1 Launch Metrics (First Month)
User Acquisition:

Total signups: 500+
Total downloads: 1,000+
Newsletter subscribers: 200+
Service inquiries: 10+

Engagement:

Average session duration: >3 minutes
Bounce rate: <50%
Pages per session: >3
Returning users: 30%+

Technical:

Uptime: 99.9%+
Page load time: <2s
Lighthouse score: >90
Zero critical bugs

10.2 Long-Term Growth (6 Months)
SEO:

Google Knowledge Panel achieved
Ranking #1 for "Marjuk Amin developer"
Ranking top 10 for "[app name] download"
10,000+ organic visits/month

Revenue (if monetization active):

Premium app sales: 50+ licenses
Service contracts: 5+ clients
Ad revenue: $100+/month

Community:

5-star reviews: 100+
Social media followers: 1,000+
Blog post views: 5,000+/month


11. Risk Management
11.1 Identified Risks
Technical Risks:

Firebase free tier limits exceeded → Migrate to paid tier or optimize queries
GitHub API rate limiting → Implement caching and webhook fallback
DDoS attack → Cloudflare protection, rate limiting

Business Risks:

Low user adoption → Aggressive marketing, improve SEO, incentives (badges)
Negative reviews → Quick bug fixes, excellent customer support
Competition from established platforms → Differentiate with unique features (i18n, Marjuk ID)

Legal Risks:

Copyright infringement (user-uploaded content) → DMCA policy, content moderation
Data breach → Security audit, encryption, compliance measures
GDPR violations → Privacy policy review, user consent mechanisms

11.2 Mitigation Strategies
For each risk:

Probability: Low/Medium/High
Impact: Low/Medium/High
Mitigation plan
Contingency plan


12. Conclusion
CodeNest by Marjuk represents a comprehensive, well-architected platform that balances cost-efficiency with professional features. The phased development approach ensures steady progress while maintaining quality.
Key Differentiators:

Zero hosting costs through strategic technology choices
Global reach via intelligent internationalization
Future-proof monetization infrastructure
Professional identity establishment (SEO + JSON-LD)
Automated maintenance through GitHub webhooks

Next Steps:

Review and approve this PRD
Set up development environment (Phase 1, Week 1)
Begin implementation following the roadmap
Schedule weekly progress reviews
Adjust timeline based on actual development pace

Estimated Timeline: 7-8 weeks to launch, assuming full-time development.
Contact for Questions:
Marjuk Amin
Email: [your-email]
GitHub: github.com/Marjuk06

Document Version History:

v1.0 (2026-01-20): Initial PRD creation

Approval:

 Product Owner: Marjuk Amin
 Technical Lead: Marjuk Amin
 Date: ___________
