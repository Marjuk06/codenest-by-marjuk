'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X, Search, User, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <nav className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-lg">
            <div className="container mx-auto px-4">
                <div className="flex h-16 items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="flex items-center space-x-2">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-purple-500 to-pink-500">
                            <span className="text-xl font-bold text-white">CN</span>
                        </div>
                        <span className="text-xl font-bold">CodeNest</span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden items-center space-x-8 md:flex">
                        <Link href="/apps" className="text-sm font-medium transition-colors hover:text-primary">
                            Apps
                        </Link>
                        <Link href="/tools" className="text-sm font-medium transition-colors hover:text-primary">
                            Tools
                        </Link>
                        <Link href="/blog" className="text-sm font-medium transition-colors hover:text-primary">
                            Blog
                        </Link>
                        <Link href="/services" className="text-sm font-medium transition-colors hover:text-primary">
                            Hire Me
                        </Link>
                    </div>

                    {/* Right Side Actions */}
                    <div className="hidden items-center space-x-4 md:flex">
                        <Button variant="ghost" size="icon">
                            <Search className="h-5 w-5" />
                        </Button>
                        <Link href="/login">
                            <Button variant="ghost">
                                <User className="mr-2 h-4 w-4" />
                                Login
                            </Button>
                        </Link>
                        <Link href="/signup">
                            <Button>Get Started</Button>
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                    </button>
                </div>

                {/* Mobile Menu */}
                {isMenuOpen && (
                    <div className="border-t py-4 md:hidden">
                        <div className="flex flex-col space-y-4">
                            <Link href="/apps" className="text-sm font-medium">
                                Apps
                            </Link>
                            <Link href="/tools" className="text-sm font-medium">
                                Tools
                            </Link>
                            <Link href="/blog" className="text-sm font-medium">
                                Blog
                            </Link>
                            <Link href="/services" className="text-sm font-medium">
                                Hire Me
                            </Link>
                            <div className="flex flex-col space-y-2 pt-4">
                                <Button variant="outline" className="w-full">
                                    <User className="mr-2 h-4 w-4" />
                                    Login
                                </Button>
                                <Button className="w-full">Get Started</Button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
}
