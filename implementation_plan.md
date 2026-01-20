CodeNest by Marjuk - Implementation Plan
A comprehensive web platform for distributing software applications, browser extensions, and web tools while establishing a professional developer identity.

User Review Required
IMPORTANT

This is a 7-8 week full-stack development project. I'll be building this systematically following the phases outlined in your PRD. I'll start with Phase 1 (Foundation Setup) and progress through each phase sequentially.

IMPORTANT

Technology Stack Confirmation:

Frontend: Next.js 14+ (App Router) with TypeScript
Styling: Tailwind CSS + Shadcn/UI
Backend: Firebase (Firestore, Authentication, Hosting)
Email: Resend API
File Distribution: GitHub Releases
Storage: Cloudflare R2 / Firebase Storage
This stack targets ~$1/month operating costs as specified.

WARNING

Firebase Setup Required: You'll need to create a Firebase project and provide credentials. I'll guide you through this when we reach that step.

WARNING

Environment Secrets: The following will need to be configured:

Firebase configuration (API keys, project ID)
Resend API key for email
GitHub webhook secret (for automated updates)
Admin email for initial account
Proposed Changes
Phase 1: Foundation Setup (Week 1)
[NEW] Project Initialization
Complete Next.js 14+ Application Setup

I will create a new Next.js project in the workspace at k:\CN Store 2.0 with:

TypeScript enabled (strict mode)
Tailwind CSS pre-configured
App Router (not Pages Router)
ESLint and Prettier configuration
Optimized folder structure as per PRD
Folder Structure:

k:\CN Store 2.0\
├── app/
│   ├── (public)/           # Public pages
│   │   ├── page.tsx        # Homepage
│   │   ├── apps/           # App marketplace
│   │   ├── services/       # Hire me page
│   │   ├── blog/           # Blog
│   │   └── tools/          # Web tools
│   ├── (auth)/             # Authentication pages
│   │   ├── login/
│   │   └── signup/
│   ├── (dashboard)/        # User dashboard
│   │   └── dashboard/
│   ├── (admin)/            # Admin dashboard
│   │   └── admin/
│   └── api/                # API routes
│       ├── webhooks/
│       └── check-update/
├── components/
│   ├── ui/                 # Shadcn components
│   ├── layout/             # Layout components
│   └── features/           # Feature-specific components
├── lib/
│   ├── firebase/           # Firebase config & helpers
│   └── utils/              # Utility functions
├── types/                  # TypeScript types
├── public/                 # Static assets
└── styles/                 # Global styles
[NEW] Core Dependencies Installation
Package Installations:

shadcn-ui - UI component library
firebase - Firebase SDK (v10+)
resend - Email service
react-markdown - Markdown rendering
fuse.js - Client-side search
framer-motion - Animations
lucide-react - Icons
date-fns - Date formatting
react-hook-form + zod - Form validation
[NEW] Firebase Configuration
Files to Create:

lib/firebase/config.ts - Firebase initialization
lib/firebase/firestore.ts - Firestore helpers
lib/firebase/auth.ts - Authentication helpers
lib/firebase/storage.ts - Storage helpers
.env.local - Environment variables (template provided)
Firestore Collections (Schema per PRD Section 3.1):

users - User profiles and authentication data
products - Application metadata
updates - Version history and changelogs
reviews - User reviews and ratings
newsletters - Newsletter subscribers
inquiries - Service inquiry submissions
blog_posts - Blog content
site_settings - Global configuration
translations - Internationalization data
[NEW] Configuration Files
TypeScript Configuration (tsconfig.json):

Strict mode enabled
Path aliases (@/components, @/lib, etc.)
Next.js-specific settings
Tailwind Configuration (tailwind.config.ts):

Shadcn/UI integration
Custom color palette (glassmorphism aesthetics)
Dark mode support
Custom animations
ESLint & Prettier:

Next.js recommended rules
TypeScript linting
Auto-formatting on save
Phase 2: Data Layer & Admin Dashboard
[NEW] Authentication System
Components & Pages:

app/(auth)/login/page.tsx - Login page with Google OAuth + Email/Password
app/(auth)/signup/page.tsx - Registration page
app/(auth)/forgot-password/page.tsx - Password reset
components/auth/AuthGuard.tsx - Protected route wrapper
lib/firebase/auth.ts - Authentication utilities
Features:

Firebase Authentication integration
Google OAuth provider
Email/password authentication
Email verification
Password reset flow
Session management with middleware
[NEW] Admin Dashboard Foundation
Admin Layout (app/(admin)/admin/layout.tsx):

Sidebar navigation (Dashboard, Products, Users, Reviews, Blog, Settings)
Role-based access control (admin only)
Responsive design
Stats overview header
Admin Dashboard Pages:

app/(admin)/admin/page.tsx - Overview with stats
app/(admin)/admin/products/page.tsx - Product manager (list view)
app/(admin)/admin/products/new/page.tsx - Add product form
app/(admin)/admin/products/[id]/edit/page.tsx - Edit product form
app/(admin)/admin/users/page.tsx - User manager
app/(admin)/admin/settings/page.tsx - Site settings
Product Manager Features:

Full CRUD operations
Markdown editor for descriptions (with preview)
Image upload to Firebase Storage
Tag management system
Maintenance mode toggle
Product visibility controls
Search and filter functionality
[NEW] Firestore Security Rules
File: firestore.rules

Comprehensive security rules implementing:

Admin-only write access to products, blog_posts, site_settings
Public read access to published content
User-specific read/write for own data
Review moderation workflow
Helper functions for authentication and authorization
Phase 3: Public-Facing Website
[NEW] Homepage (app/(public)/page.tsx)
Sections:

Hero Section

Headline: "Software Built for the Future"
Animated gradient background
CTA buttons (Explore Apps, Hire Me)
Featured Apps Slider

Auto-rotating carousel (Framer Motion)
Fetches products where isFeatured: true
Responsive (3-4 desktop, swipeable mobile)
Latest Updates Ticker

Real-time updates from Firestore
Animated ticker component
Newsletter Section

Email subscription form
Saves to newsletters collection
Confirmation email via Resend
Statistics Section

Total downloads (aggregated)
Total apps
Countries served
Happy users
Footer

Quick links
Social media
Legal pages
Newsletter signup
[NEW] Apps Marketplace
app/(public)/apps/page.tsx - Listing Page:

Filter sidebar (platform, category, price)
Live search with Fuse.js (debounced 300ms)
Sort options (popular, newest, A-Z)
App card grid with glassmorphism
Pagination or infinite scroll (12 items/page)
Empty state for no results
app/(public)/apps/[id]/page.tsx - Details Page:

Dynamic routing for each product
Header with app icon, name, rating, download count
Large "Download Now" CTA button
Screenshot gallery (lightbox with swipe gestures)
Tabbed content (Overview, Features, Requirements, Installation)
Version information and changelog link
Reviews section (Phase 4)
Related apps carousel
Social sharing (Facebook, WhatsApp, Copy Link)
SEO: Dynamic meta tags, JSON-LD SoftwareApplication schema
Download Tracking Flow:

User clicks "Download Now"
Check authentication status
If authenticated: increment download counter, save to user history
If not: show modal with signup option
Track analytics event
Redirect to GitHub release URL
[NEW] Services/Hire Me Page
app/(public)/services/page.tsx:

Hero with profile photo and skills
Service cards (Web Dev, Desktop Apps, Extensions, PC Repair)
Portfolio showcase (links to existing apps)
Contact form with validation
Contact Form Features:

Fields: Name, Email, Phone, Project Type, Budget, Description, Urgency
Client-side validation (React Hook Form + Zod)
Server-side validation
Spam protection (honeypot field)
Rate limiting (5 submissions/hour/IP)
Save to inquiries collection
Email notification via Resend
Success confirmation message
Phase 4: User Dashboard & Community Features
[NEW] User Dashboard
app/(dashboard)/dashboard/layout.tsx:

Sidebar navigation (Overview, Library, Settings)
Protected route (requires authentication)
Dashboard Pages:

overview/page.tsx - Welcome, stats, badges, activity feed
library/page.tsx - Downloaded apps with re-download option
settings/page.tsx - Profile, account, preferences
Badge System Implementation:

Early Supporter (first 100 users)
Verified Student (.edu email)
Power User (10+ downloads)
Contributor (submitted review)
Admin badge
[NEW] Review & Rating System
Components:

components/reviews/ReviewForm.tsx - Star rating and comment input
components/reviews/ReviewList.tsx - Display approved reviews
components/reviews/RatingDistribution.tsx - Star rating graph
Admin Review Manager:

app/(admin)/admin/reviews/page.tsx - Pending reviews queue
Approve/reject actions
Edit/delete functionality
Bulk operations
Features:

Authenticated users only can review
One review per user per product
Reviews saved with status: "pending"
Admin moderation workflow
Verified download badge for reviewers
Helpful/not helpful voting
Phase 5: SEO, Blog & Monetization
[NEW] SEO Optimization
Meta Tags & Schemas:

Dynamic meta tags for all pages
Open Graph tags for social sharing
Twitter Card metadata
Canonical URLs
JSON-LD Schemas:
Person schema (homepage) - for Google Knowledge Panel
SoftwareApplication schema (product pages)
Article schema (blog posts)
Files:

app/sitemap.ts - Dynamic sitemap generation
app/robots.ts - Robots.txt configuration
components/seo/JsonLd.tsx - Schema component
[NEW] Blog System
Blog Pages:

app/(public)/blog/page.tsx - Blog listing with categories
app/(public)/blog/[slug]/page.tsx - Individual post with markdown rendering
Admin Blog Manager:

app/(admin)/admin/blog/page.tsx - Post list
app/(admin)/admin/blog/new/page.tsx - Create post
app/(admin)/admin/blog/[id]/edit/page.tsx - Edit post
Features:

Markdown editor with live preview
Syntax highlighting for code blocks
Reading time calculation
Table of contents auto-generation
SEO fields (meta title, description, keywords)
Featured image upload
Category and tag management
RSS feed generation (app/feed.xml/route.ts)
[NEW] Ad Integration System
app/(admin)/admin/ads/page.tsx:

Global ad enable/disable toggle
Paste Adsterra/AdSense script
Ad placement controls (homepage, product pages, blog)
Preview mode
Implementation:

Save ad configuration to site_settings collection
Dynamic script injection component
Ad placement components for each page type
[NEW] Legal Pages
Pages to Create:

app/(public)/privacy/page.tsx - Privacy Policy
app/(public)/terms/page.tsx - Terms of Service
app/(public)/refund/page.tsx - Refund Policy
Content includes:

Data collection practices
Firebase and Cloudflare disclosures
User rights (GDPR compliance)
Contact information
Phase 6: Launch Preparation Features
[NEW] Internationalization (i18n)
Implementation:

Language detection middleware
Language switcher component (navbar dropdown)
Translation context provider
hreflang tags for SEO
Localized URLs (/[lang]/[page])
Initial Languages:

English (en) - Primary
Bengali (bn) - Secondary
Additional languages via AI translation (DeepL API)
Admin Language Manager:

app/(admin)/admin/languages/page.tsx
Add/edit/disable languages
Translation editor (side-by-side view)
Coverage percentage tracking
[NEW] Progressive Web App (PWA)
Files:

public/manifest.json - App manifest
app/sw.ts - Service worker for caching
app/offline/page.tsx - Offline fallback page
Features:

"Add to Home Screen" prompt
Offline functionality for cached pages
App icons for all platforms
Install prompt UI
[NEW] Dark Mode
Implementation:

Theme context provider
Toggle component (navbar)
Three modes: Light, Dark, System
CSS variables for theming
Smooth transition animations
LocalStorage persistence
[NEW] Web Tools Section
app/(public)/tools/page.tsx - Tools listing

Initial Tools (5 tools):

tools/image-resizer/page.tsx - Image resize/compress
tools/json-formatter/page.tsx - JSON formatter/validator
tools/qr-generator/page.tsx - QR code generator
tools/base64-encoder/page.tsx - Base64 encode/decode
tools/color-picker/page.tsx - Color picker/palette generator
Features:

Client-side processing only (privacy-focused)
No server uploads
Download results
Works offline (PWA)
Share tool links
Phase 7: Advanced Features
[NEW] GitHub Webhook Integration
app/api/webhooks/github/route.ts:

Receives release published events
Validates webhook signature (HMAC SHA-256)
Updates product in Firestore
Creates entry in updates collection
Returns 200 OK response
Security:

Webhook secret validation
IP whitelist (GitHub IPs)
Rate limiting
[NEW] Auto-Update API
app/api/check-update/route.ts:

Endpoint for desktop apps to check updates
Request: ?app=tavelyn&version=1.0.0
Response: Latest version info and download URL
[NEW] Live Chat Widget
Integration:

Tawk.to script injection
Admin toggle in settings
Customizable position
Online/offline detection
Verification Plan
Automated Tests
Unit Tests (Jest + React Testing Library):

Component rendering tests
Form validation logic
Utility function tests
API route handlers
Integration Tests (Playwright):

User signup → dashboard flow
Browse → download flow
Admin product CRUD operations
Review submission → approval flow
Commands:

npm run test              # Unit tests
npm run test:e2e          # Integration tests
npm run build             # Production build
npm run lint              # Linting
Manual Verification
Cross-Browser Testing:

Chrome, Firefox, Safari, Edge
Mobile browsers (iOS Safari, Chrome Android)
Performance Testing:

Lighthouse CI (target score >90)
WebPageTest for global metrics
Load testing with Artillery (1000 concurrent users)
Security Testing:

Firebase security rules validation
XSS/CSRF protection verification
API rate limiting tests
Webhook signature validation
SEO Validation:

Rich snippets testing (Google Rich Results Test)
Sitemap verification
JSON-LD schema validation
hreflang tag verification
Pre-Launch Checklist
 All Lighthouse scores >90
 Zero console errors
 All forms validated (client + server)
 Email delivery tested (Resend)
 Download tracking working
 Admin dashboard fully functional
 Mobile responsive on all pages
 Dark mode functional
 SEO tags present on all pages
 Legal pages complete
 Firebase security rules deployed
 Domain configured and SSL active
 Analytics tracking verified
Next Steps
Approve this implementation plan
Provide Firebase project credentials (I'll guide you through setup)
Begin Phase 1 development - Project initialization and structure
Weekly progress reviews - I'll update you at each phase completion
Iterative testing - Test critical features as they're built
Estimated Timeline: 7-8 weeks (assuming full-time development equivalent)

Current Status: Ready to begin Phase 1 - Foundation Setup