import Link from 'next/link';
import { Github, Twitter, Linkedin, Mail } from 'lucide-react';

export function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="w-full border-t bg-background">
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
                    {/* Brand Column */}
                    <div className="space-y-4">
                        <div className="flex items-center space-x-2">
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-purple-500 to-pink-500">
                                <span className="text-xl font-bold text-white">CN</span>
                            </div>
                            <span className="text-xl font-bold">CodeNest</span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                            Software Built for the Future. Free and premium tools by Marjuk Amin.
                        </p>
                        <div className="flex space-x-4">
                            <a href="https://github.com/Marjuk06" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground">
                                <Github className="h-5 w-5" />
                            </a>
                            <a href="https://twitter.com/marjuk" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground">
                                <Twitter className="h-5 w-5" />
                            </a>
                            <a href="https://linkedin.com/in/marjuk-amin" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground">
                                <Linkedin className="h-5 w-5" />
                            </a>
                            <a href="mailto:contact@codenest.com" className="text-muted-foreground hover:text-foreground">
                                <Mail className="h-5 w-5" />
                            </a>
                        </div>
                    </div>

                    {/* Products Column */}
                    <div className="space-y-4">
                        <h3 className="text-sm font-semibold">Products</h3>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <Link href="/apps" className="text-muted-foreground hover:text-foreground">
                                    Browse Apps
                                </Link>
                            </li>
                            <li>
                                <Link href="/tools" className="text-muted-foreground hover:text-foreground">
                                    Web Tools
                                </Link>
                            </li>
                            <li>
                                <Link href="/apps?category=extension" className="text-muted-foreground hover:text-foreground">
                                    Extensions
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Resources Column */}
                    <div className="space-y-4">
                        <h3 className="text-sm font-semibold">Resources</h3>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <Link href="/blog" className="text-muted-foreground hover:text-foreground">
                                    Blog
                                </Link>
                            </li>
                            <li>
                                <Link href="/services" className="text-muted-foreground hover:text-foreground">
                                    Services
                                </Link>
                            </li>
                            <li>
                                <Link href="/contact" className="text-muted-foreground hover:text-foreground">
                                    Contact
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Legal Column */}
                    <div className="space-y-4">
                        <h3 className="text-sm font-semibold">Legal</h3>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <Link href="/privacy" className="text-muted-foreground hover:text-foreground">
                                    Privacy Policy
                                </Link>
                            </li>
                            <li>
                                <Link href="/terms" className="text-muted-foreground hover:text-foreground">
                                    Terms of Service
                                </Link>
                            </li>
                            <li>
                                <Link href="/refund" className="text-muted-foreground hover:text-foreground">
                                    Refund Policy
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="mt-12 border-t pt-8">
                    <div className="flex flex-col items-center justify-between space-y-4 md:flex-row md:space-y-0">
                        <p className="text-sm text-muted-foreground">
                            © {currentYear} CodeNest by Marjuk Amin. All rights reserved.
                        </p>
                        <p className="text-sm text-muted-foreground">
                            Made with ❤️ in Bangladesh
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}
