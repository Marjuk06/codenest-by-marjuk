'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Download, Code, Zap, Shield, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function HomePage() {
    const [email, setEmail] = useState('');

    const handleNewsletterSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // TODO: Implement newsletter subscription
        console.log('Newsletter signup:', email);
    };

    return (
        <div className="flex flex-col">
            {/* Hero Section */}
            <section className="relative overflow-hidden">
                {/* Animated Background */}
                <div className="absolute inset-0 -z-10">
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 via-background to-pink-500/20" />
                    <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
                </div>

                <div className="container mx-auto px-4 py-24 md:py-32">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="mx-auto max-w-4xl text-center"
                    >
                        {/* Badge */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.1 }}
                            className="mb-8 inline-flex items-center rounded-full border bg-background/50 px-4 py-2 text-sm backdrop-blur-sm"
                        >
                            <Zap className="mr-2 h-4 w-4 text-yellow-500" />
                            <span>Free & Premium Software</span>
                        </motion.div>

                        {/* Main Headline */}
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="mb-6 bg-gradient-to-r from-purple-600 via-pink-500 to-purple-600 bg-clip-text text-5xl font-bold text-transparent md:text-7xl"
                        >
                            Software Built for
                            <br />
                            the Future
                        </motion.h1>

                        {/* Subheadline */}
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="mb-12 text-lg text-muted-foreground md:text-xl"
                        >
                            Download innovative desktop applications, browser extensions, and web tools.
                            <br className="hidden md:block" />
                            Built by <span className="font-semibold text-foreground">Marjuk Amin</span> for creators worldwide.
                        </motion.p>

                        {/* CTA Buttons */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="flex flex-col items-center justify-center gap-4 sm:flex-row"
                        >
                            <Link href="/apps">
                                <Button size="lg" className="group w-full sm:w-auto">
                                    Explore Apps
                                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                                </Button>
                            </Link>
                            <Link href="/services">
                                <Button size="lg" variant="outline" className="w-full sm:w-auto">
                                    Hire Me
                                </Button>
                            </Link>
                        </motion.div>

                        {/* Stats */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                            className="mt-16 grid grid-cols-2 gap-8 md:grid-cols-4"
                        >
                            {[
                                { label: 'Total Downloads', value: '10,000+', icon: Download },
                                { label: 'Apps Available', value: '15+', icon: Code },
                                { label: 'Happy Users', value: '5,000+', icon: Star },
                                { label: 'Always Free', value: '100%', icon: Shield },
                            ].map((stat, index) => (
                                <div key={index} className="flex flex-col items-center">
                                    <stat.icon className="mb-2 h-6 w-6 text-purple-500" />
                                    <div className="text-2xl font-bold md:text-3xl">{stat.value}</div>
                                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                                </div>
                            ))}
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* Featured Apps Section */}
            <section className="container mx-auto px-4 py-16">
                <div className="mb-12 text-center">
                    <h2 className="mb-4 text-3xl font-bold md:text-4xl">Featured Applications</h2>
                    <p className="text-lg text-muted-foreground">
                        Handpicked tools designed to boost your productivity
                    </p>
                </div>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {/* Placeholder for featured apps - will be populated from Firestore */}
                    {[1, 2, 3].map((item) => (
                        <motion.div
                            key={item}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: item * 0.1 }}
                            className="group relative overflow-hidden rounded-lg border bg-card p-6 transition-all hover:shadow-lg"
                        >
                            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-lg bg-gradient-to-br from-purple-500 to-pink-500">
                                <Code className="h-8 w-8 text-white" />
                            </div>
                            <h3 className="mb-2 text-xl font-bold">App Name {item}</h3>
                            <p className="mb-4 text-sm text-muted-foreground">
                                A powerful application that helps you accomplish amazing things.
                            </p>
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-muted-foreground">1,234 downloads</span>
                                <Button size="sm" variant="ghost">
                                    Learn More
                                    <ArrowRight className="ml-2 h-3 w-3" />
                                </Button>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div className="mt-12 text-center">
                    <Link href="/apps">
                        <Button size="lg" variant="outline">
                            View All Apps
                            <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                    </Link>
                </div>
            </section>

            {/* Newsletter Section */}
            <section className="border-y bg-secondary/30 py-16">
                <div className="container mx-auto px-4">
                    <div className="mx-auto max-w-2xl text-center">
                        <h2 className="mb-4 text-3xl font-bold md:text-4xl">Stay Updated</h2>
                        <p className="mb-8 text-lg text-muted-foreground">
                            Get notified when we release new apps, tools, and features.
                        </p>
                        <form onSubmit={handleNewsletterSubmit} className="flex flex-col gap-4 sm:flex-row">
                            <Input
                                type="email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="flex-1"
                                required
                            />
                            <Button type="submit" size="lg">
                                Subscribe
                            </Button>
                        </form>
                        <p className="mt-4 text-xs text-muted-foreground">
                            No spam. Unsubscribe anytime. Read our{' '}
                            <Link href="/privacy" className="underline">
                                privacy policy
                            </Link>
                            .
                        </p>
                    </div>
                </div>
            </section>

            {/* Latest Updates Ticker */}
            <section className="container mx-auto px-4 py-16">
                <div className="mb-12 text-center">
                    <h2 className="mb-4 text-3xl font-bold md:text-4xl">Latest Updates</h2>
                    <p className="text-lg text-muted-foreground">
                        See what's new across our platform
                    </p>
                </div>

                <div className="space-y-4">
                    {/* Placeholder for updates - will be populated from Firestore */}
                    {[
                        { app: 'Tavelyn', version: 'v1.2.0', note: 'Dark mode added!' },
                        { app: 'QuickNote', version: 'v2.0.0', note: 'Complete UI overhaul' },
                        { app: 'FileSync', version: 'v1.5.0', note: 'Cloud backup feature' },
                    ].map((update, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="flex items-center gap-4 rounded-lg border bg-card p-4"
                        >
                            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-purple-500 to-pink-500">
                                <Zap className="h-6 w-6 text-white" />
                            </div>
                            <div className="flex-1">
                                <p className="font-semibold">
                                    {update.app} {update.version} released
                                </p>
                                <p className="text-sm text-muted-foreground">{update.note}</p>
                            </div>
                            <Button variant="ghost" size="sm">
                                View
                            </Button>
                        </motion.div>
                    ))}
                </div>
            </section>
        </div>
    );
}
