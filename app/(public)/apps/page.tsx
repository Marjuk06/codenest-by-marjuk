'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Search, Filter, SlidersHorizontal } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

export default function AppsPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedPlatform, setSelectedPlatform] = useState<string>('all');
    const [selectedCategory, setSelectedCategory] = useState<string>('all');

    // Placeholder app data - will be fetched from Firestore
    const apps = [
        {
            id: 'tavelyn',
            name: 'Tavelyn',
            tagline: 'Beautiful music player for Windows',
            icon: '🎵',
            platform: ['windows'],
            category: 'software',
            downloads: 5234,
            rating: 4.8,
        },
        {
            id: 'quicknote',
            name: 'QuickNote',
            tagline: 'Fast and simple note-taking',
            icon: '📝',
            platform: ['windows', 'mac', 'linux'],
            category: 'software',
            downloads: 3421,
            rating: 4.6,
        },
        {
            id: 'filesync',
            name: 'FileSync',
            tagline: 'Sync files across devices',
            icon: '📁',
            platform: ['windows', 'mac'],
            category: 'software',
            downloads: 2156,
            rating: 4.7,
        },
    ];

    const platforms = [
        { value: 'all', label: 'All Platforms' },
        { value: 'windows', label: 'Windows' },
        { value: 'mac', label: 'Mac' },
        { value: 'linux', label: 'Linux' },
        { value: 'android', label: 'Android' },
        { value: 'web', label: 'Web' },
    ];

    const categories = [
        { value: 'all', label: 'All Categories' },
        { value: 'software', label: 'Software' },
        { value: 'extension', label: 'Extension' },
        { value: 'tool', label: 'Tool' },
    ];

    return (
        <div className="container mx-auto px-4 py-8">
            {/* Header */}
            <div className="mb-12 text-center">
                <h1 className="mb-4 text-4xl font-bold md:text-5xl">Browse Apps</h1>
                <p className="text-lg text-muted-foreground">
                    Discover powerful applications to boost your productivity
                </p>
            </div>

            {/* Search and Filters */}
            <div className="mb-8">
                <div className="mb-4 flex flex-col gap-4 md:flex-row">
                    {/* Search */}
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                            type="search"
                            placeholder="Search apps..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-10"
                        />
                    </div>

                    {/* Platform Filter */}
                    <select
                        value={selectedPlatform}
                        onChange={(e) => setSelectedPlatform(e.target.value)}
                        className="rounded-md border bg-background px-4 py-2 text-sm"
                    >
                        {platforms.map((platform) => (
                            <option key={platform.value} value={platform.value}>
                                {platform.label}
                            </option>
                        ))}
                    </select>

                    {/* Category Filter */}
                    <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="rounded-md border bg-background px-4 py-2 text-sm"
                    >
                        {categories.map((category) => (
                            <option key={category.value} value={category.value}>
                                {category.label}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Results Count */}
                <div className="text-sm text-muted-foreground">
                    Showing {apps.length} apps
                </div>
            </div>

            {/* Apps Grid */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {apps.map((app) => (
                    <Link key={app.id} href={`/apps/${app.id}`}>
                        <Card className="group h-full overflow-hidden transition-all hover:shadow-lg">
                            <div className="p-6">
                                {/* App Icon */}
                                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 text-3xl">
                                    {app.icon}
                                </div>

                                {/* App Name */}
                                <h3 className="mb-2 text-xl font-bold group-hover:text-purple-500">
                                    {app.name}
                                </h3>

                                {/* Tagline */}
                                <p className="mb-4 text-sm text-muted-foreground">
                                    {app.tagline}
                                </p>

                                {/* Platform Badges */}
                                <div className="mb-4 flex flex-wrap gap-2">
                                    {app.platform.map((platform) => (
                                        <span
                                            key={platform}
                                            className="rounded-full bg-secondary px-2 py-1 text-xs capitalize"
                                        >
                                            {platform}
                                        </span>
                                    ))}
                                </div>

                                {/* Stats */}
                                <div className="flex items-center justify-between text-sm text-muted-foreground">
                                    <div className="flex items-center">
                                        <span className="mr-1">⭐</span>
                                        <span>{app.rating}</span>
                                    </div>
                                    <div>{app.downloads.toLocaleString()} downloads</div>
                                </div>
                            </div>
                        </Card>
                    </Link>
                ))}
            </div>

            {/* Load More Button */}
            <div className="mt-12 text-center">
                <Button variant="outline" size="lg">
                    Load More Apps
                </Button>
            </div>
        </div>
    );
}
