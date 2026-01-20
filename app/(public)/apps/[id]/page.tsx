'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Download, Share2, Star, Check, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

export default function AppDetailsPage() {
    const params = useParams();
    const [activeTab, setActiveTab] = useState('overview');

    // Placeholder app data - will be fetched from Firestore based on params.id
    const app = {
        id: params.id,
        name: 'Tavelyn',
        tagline: 'Beautiful music player for Windows',
        description: 'A modern, feature-rich music player designed for Windows with a beautiful interface.',
        longDescription: `Tavelyn is a comprehensive music player that brings your music collection to life. 
    
With support for all major audio formats, powerful organization features, and a stunning user interface, Tavelyn makes listening to music a delightful experience.

## Key Features

- Support for MP3, FLAC, WAV, AAC, and more
- Beautiful, customizable interface
- Smart playlists and organization
- Equalizer and audio effects
- Lyrics display
- Last.fm integration
- Keyboard shortcuts

Perfect for audiophiles and casual listeners alike!`,
        icon: '🎵',
        currentVersion: '1.2.0',
        releaseDate: 'January 15, 2026',
        platform: ['windows'],
        category: 'software',
        downloadUrl: 'https://github.com/Marjuk06/Tavelyn/releases/latest',
        downloadSize: '45.3 MB',
        stats: {
            totalDownloads: 5234,
            averageRating: 4.8,
            totalReviews: 127,
        },
        screenshots: [
            { id: 1, url: '/placeholder-screenshot.jpg', alt: 'Player interface' },
            { id: 2, url: '/placeholder-screenshot.jpg', alt: 'Library view' },
            { id: 3, url: '/placeholder-screenshot.jpg', alt: 'Settings' },
        ],
        features: [
            'Multi-format audio support',
            'Beautiful user interface',
            'Smart playlists',
            'Equalizer controls',
            'Lyrics display',
            'Keyboard shortcuts',
            'Last.fm integration',
            'Regular updates',
        ],
        systemRequirements: {
            os: 'Windows 10 or later',
            ram: '4 GB RAM',
            storage: '100 MB available space',
            processor: 'Intel i3 or equivalent',
        },
    };

    const tabs = [
        { id: 'overview', label: 'Overview' },
        { id: 'features', label: 'Features' },
        { id: 'requirements', label: 'System Requirements' },
        { id: 'reviews', label: `Reviews (${app.stats.totalReviews})` },
    ];

    return (
        <div className="container mx-auto px-4 py-8">
            {/* Header Section */}
            <div className="mb-12">
                <div className="flex flex-col gap-8 md:flex-row">
                    {/* App Icon */}
                    <div className="flex h-32 w-32 flex-shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 text-6xl shadow-lg">
                        {app.icon}
                    </div>

                    {/* App Info */}
                    <div className="flex-1">
                        <h1 className="mb-2 text-4xl font-bold">{app.name}</h1>
                        <p className="mb-4 text-lg text-muted-foreground">{app.tagline}</p>

                        {/* Platform Badges */}
                        <div className="mb-6 flex flex-wrap gap-2">
                            {app.platform.map((platform) => (
                                <span
                                    key={platform}
                                    className="rounded-full bg-secondary px-3 py-1 text-sm capitalize"
                                >
                                    {platform}
                                </span>
                            ))}
                        </div>

                        {/* Stats */}
                        <div className="mb-6 flex flex-wrap gap-6 text-sm">
                            <div className="flex items-center">
                                <Star className="mr-2 h-5 w-5 fill-yellow-400 text-yellow-400" />
                                <span className="font-semibold">{app.stats.averageRating}</span>
                                <span className="ml-1 text-muted-foreground">
                                    ({app.stats.totalReviews} reviews)
                                </span>
                            </div>
                            <div className="flex items-center">
                                <Download className="mr-2 h-5 w-5 text-muted-foreground" />
                                <span>{app.stats.totalDownloads.toLocaleString()} downloads</span>
                            </div>
                            <div className="flex items-center">
                                <Check className="mr-2 h-5 w-5 text-green-500" />
                                <span>Free</span>
                            </div>
                        </div>

                        {/* CTA Buttons */}
                        <div className="flex flex-wrap gap-4">
                            <Link href={app.downloadUrl} target="_blank">
                                <Button size="lg" className="group">
                                    <Download className="mr-2 h-5 w-5" />
                                    Download Now
                                    <span className="ml-2 text-xs opacity-75">({app.downloadSize})</span>
                                </Button>
                            </Link>
                            <Button size="lg" variant="outline">
                                <Share2 className="mr-2 h-4 w-4" />
                                Share
                            </Button>
                        </div>

                        {/* Version Info */}
                        <div className="mt-4 text-sm text-muted-foreground">
                            Version {app.currentVersion} • Released {app.releaseDate}
                        </div>
                    </div>
                </div>
            </div>

            {/* Screenshots */}
            <div className="mb-12">
                <h2 className="mb-6 text-2xl font-bold">Screenshots</h2>
                <div className="grid gap-4 md:grid-cols-3">
                    {app.screenshots.map((screenshot) => (
                        <Card key={screenshot.id} className="overflow-hidden">
                            <div className="aspect-video bg-gradient-to-br from-purple-500/20 to-pink-500/20" />
                        </Card>
                    ))}
                </div>
            </div>

            {/* Tabs */}
            <div className="mb-6 border-b">
                <div className="flex gap-8">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`border-b-2 pb-4 font-medium transition-colors ${activeTab === tab.id
                                    ? 'border-purple-500 text-purple-500'
                                    : 'border-transparent text-muted-foreground hover:text-foreground'
                                }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Tab Content */}
            <div className="mb-12">
                {activeTab === 'overview' && (
                    <div className="prose prose-neutral dark:prose-invert max-w-none">
                        <p className="text-lg">{app.description}</p>
                        <div className="whitespace-pre-line">{app.longDescription}</div>
                    </div>
                )}

                {activeTab === 'features' && (
                    <div className="grid gap-4 md:grid-cols-2">
                        {app.features.map((feature, index) => (
                            <div key={index} className="flex items-start">
                                <Check className="mr-3 mt-1 h-5 w-5 flex-shrink-0 text-green-500" />
                                <span>{feature}</span>
                            </div>
                        ))}
                    </div>
                )}

                {activeTab === 'requirements' && (
                    <Card className="p-6">
                        <h3 className="mb-4 text-xl font-bold">System Requirements</h3>
                        <div className="space-y-3">
                            <div>
                                <span className="font-semibold">Operating System: </span>
                                <span className="text-muted-foreground">{app.systemRequirements.os}</span>
                            </div>
                            <div>
                                <span className="font-semibold">RAM: </span>
                                <span className="text-muted-foreground">{app.systemRequirements.ram}</span>
                            </div>
                            <div>
                                <span className="font-semibold">Storage: </span>
                                <span className="text-muted-foreground">{app.systemRequirements.storage}</span>
                            </div>
                            <div>
                                <span className="font-semibold">Processor: </span>
                                <span className="text-muted-foreground">{app.systemRequirements.processor}</span>
                            </div>
                        </div>
                    </Card>
                )}

                {activeTab === 'reviews' && (
                    <div className="text-center text-muted-foreground">
                        <p>Reviews coming soon in Phase 4!</p>
                    </div>
                )}
            </div>

            {/* Related Apps */}
            <div>
                <h2 className="mb-6 text-2xl font-bold">Related Apps</h2>
                <div className="grid gap-6 md:grid-cols-3">
                    {[1, 2, 3].map((item) => (
                        <Card key={item} className="p-6">
                            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 text-2xl">
                                🎵
                            </div>
                            <h3 className="mb-2 font-bold">Related App {item}</h3>
                            <p className="mb-4 text-sm text-muted-foreground">
                                Another great application for you to try
                            </p>
                            <Button variant="outline" size="sm">
                                View Details
                            </Button>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
}
