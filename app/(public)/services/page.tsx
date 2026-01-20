'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Mail, Phone, Code2, Wrench, Chrome, Laptop } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';

const contactFormSchema = z.object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    email: z.string().email('Invalid email address'),
    phone: z.string().optional(),
    projectType: z.string().min(1, 'Please select a project type'),
    budget: z.string().min(1, 'Please select a budget range'),
    description: z.string().min(20, 'Description must be at least 20 characters'),
    urgency: z.enum(['low', 'medium', 'high']),
    honeypot: z.string().max(0, 'Bot detected'), // Spam protection
});

type ContactFormData = z.infer<typeof contactFormSchema>;

export default function ServicesPage() {
    const [submitted, setSubmitted] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
    } = useForm<ContactFormData>({
        resolver: zodResolver(contactFormSchema),
        defaultValues: {
            urgency: 'medium',
            honeypot: '',
        },
    });

    const onSubmit = async (data: ContactFormData) => {
        try {
            // TODO: Implement actual API call to save inquiry and send email
            console.log('Form submitted:', data);

            // Simulate API call
            await new Promise((resolve) => setTimeout(resolve, 1000));

            setSubmitted(true);
            reset();

            setTimeout(() => setSubmitted(false), 5000);
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    const services = [
        {
            icon: Code2,
            title: 'Custom Website Development',
            description: 'Modern, responsive websites built with the latest technologies.',
            technologies: ['Next.js', 'React', 'Tailwind CSS', 'Firebase'],
        },
        {
            icon: Laptop,
            title: 'Desktop Application Development',
            description: 'Cross-platform desktop apps for Windows, Mac, and Linux.',
            technologies: ['Electron', 'C#', '.NET', 'Python'],
        },
        {
            icon: Chrome,
            title: 'Browser Extension Development',
            description: 'Extensions for Chrome, Firefox, and Edge browsers.',
            technologies: ['JavaScript', 'WebExtensions API', 'React'],
        },
        {
            icon: Wrench,
            title: 'PC Repair & Troubleshooting',
            description: 'Expert computer repair and technical support services.',
            technologies: ['Hardware', 'Software', 'Networking', 'Diagnostics'],
        },
    ];

    return (
        <div className="container mx-auto px-4 py-8">
            {/* Hero Section */}
            <div className="mb-16 text-center">
                <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-pink-500">
                    <Code2 className="h-12 w-12 text-white" />
                </div>
                <h1 className="mb-4 text-4xl font-bold md:text-5xl">
                    Let's Build Something Amazing Together
                </h1>
                <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
                    Web Developer, Desktop App Developer, and PC Repair Specialist based in Bangladesh.
                    <br className="hidden md:block" />
                    Available for freelance projects and consultations.
                </p>
            </div>

            {/* Services Grid */}
            <div className="mb-16">
                <h2 className="mb-8 text-center text-3xl font-bold">Services Offered</h2>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                    {services.map((service, index) => {
                        const Icon = service.icon;
                        return (
                            <Card key={index} className="p-6">
                                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-purple-500/10">
                                    <Icon className="h-6 w-6 text-purple-500" />
                                </div>
                                <h3 className="mb-2 font-bold">{service.title}</h3>
                                <p className="mb-4 text-sm text-muted-foreground">{service.description}</p>
                                <div className="flex flex-wrap gap-2">
                                    {service.technologies.map((tech) => (
                                        <span
                                            key={tech}
                                            className="rounded-full bg-secondary px-2 py-1 text-xs"
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </Card>
                        );
                    })}
                </div>
            </div>

            {/* Portfolio Showcase */}
            <div className="mb-16">
                <h2 className="mb-8 text-center text-3xl font-bold">Portfolio</h2>
                <div className="grid gap-6 md:grid-cols-3">
                    {[
                        { name: 'Tavelyn', category: 'Desktop App', tech: 'Electron + React' },
                        { name: 'QuickNote', category: 'Desktop App', tech: 'C# .NET' },
                        { name: 'CodeNest', category: 'Website', tech: 'Next.js + Firebase' },
                    ].map((project, index) => (
                        <Card key={index} className="overflow-hidden">
                            <div className="aspect-video bg-gradient-to-br from-purple-500/20 to-pink-500/20" />
                            <div className="p-4">
                                <h3 className="mb-1 font-bold">{project.name}</h3>
                                <p className="mb-2 text-sm text-muted-foreground">{project.category}</p>
                                <p className="text-xs text-muted-foreground">{project.tech}</p>
                            </div>
                        </Card>
                    ))}
                </div>
            </div>

            {/* Contact Form */}
            <div className="mx-auto max-w-2xl">
                <h2 className="mb-8 text-center text-3xl font-bold">Get in Touch</h2>

                {submitted && (
                    <div className="mb-6 rounded-lg border border-green-500 bg-green-500/10 p-4 text-center text-green-700 dark:text-green-400">
                        ✓ Thank you! Your inquiry has been submitted. I'll get back to you within 24 hours.
                    </div>
                )}

                <Card className="p-6">
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        {/* Honeypot for spam protection */}
                        <input
                            type="text"
                            {...register('honeypot')}
                            className="hidden"
                            tabIndex={-1}
                            autoComplete="off"
                        />

                        {/* Name */}
                        <div>
                            <label className="mb-2 block text-sm font-medium">Name *</label>
                            <Input
                                {...register('name')}
                                placeholder="John Doe"
                                className={errors.name ? 'border-red-500' : ''}
                            />
                            {errors.name && (
                                <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
                            )}
                        </div>

                        {/* Email */}
                        <div>
                            <label className="mb-2 block text-sm font-medium">Email *</label>
                            <Input
                                {...register('email')}
                                type="email"
                                placeholder="john@example.com"
                                className={errors.email ? 'border-red-500' : ''}
                            />
                            {errors.email && (
                                <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
                            )}
                        </div>

                        {/* Phone */}
                        <div>
                            <label className="mb-2 block text-sm font-medium">Phone (Optional)</label>
                            <Input
                                {...register('phone')}
                                type="tel"
                                placeholder="+880 1234-567890"
                            />
                        </div>

                        {/* Project Type */}
                        <div>
                            <label className="mb-2 block text-sm font-medium">Project Type *</label>
                            <select
                                {...register('projectType')}
                                className={`w-full rounded-md border bg-background px-3 py-2 text-sm ${errors.projectType ? 'border-red-500' : ''
                                    }`}
                            >
                                <option value="">Select a project type</option>
                                <option value="website">Website Development</option>
                                <option value="app">Desktop Application</option>
                                <option value="extension">Browser Extension</option>
                                <option value="fix">PC Repair/Fix</option>
                                <option value="other">Other</option>
                            </select>
                            {errors.projectType && (
                                <p className="mt-1 text-sm text-red-500">{errors.projectType.message}</p>
                            )}
                        </div>

                        {/* Budget */}
                        <div>
                            <label className="mb-2 block text-sm font-medium">Budget Range *</label>
                            <select
                                {...register('budget')}
                                className={`w-full rounded-md border bg-background px-3 py-2 text-sm ${errors.budget ? 'border-red-500' : ''
                                    }`}
                            >
                                <option value="">Select a budget range</option>
                                <option value="under-500">Under $500</option>
                                <option value="500-1000">$500 - $1,000</option>
                                <option value="1000-2500">$1,000 - $2,500</option>
                                <option value="2500-5000">$2,500 - $5,000</option>
                                <option value="5000-plus">$5,000+</option>
                                <option value="negotiable">Negotiable</option>
                            </select>
                            {errors.budget && (
                                <p className="mt-1 text-sm text-red-500">{errors.budget.message}</p>
                            )}
                        </div>

                        {/* Description */}
                        <div>
                            <label className="mb-2 block text-sm font-medium">Project Description *</label>
                            <textarea
                                {...register('description')}
                                rows={5}
                                placeholder="Tell me about your project..."
                                className={`w-full rounded-md border bg-background px-3 py-2 text-sm ${errors.description ? 'border-red-500' : ''
                                    }`}
                            />
                            {errors.description && (
                                <p className="mt-1 text-sm text-red-500">{errors.description.message}</p>
                            )}
                        </div>

                        {/* Urgency */}
                        <div>
                            <label className="mb-2 block text-sm font-medium">Urgency *</label>
                            <div className="flex gap-4">
                                {(['low', 'medium', 'high'] as const).map((level) => (
                                    <label key={level} className="flex items-center">
                                        <input
                                            type="radio"
                                            {...register('urgency')}
                                            value={level}
                                            className="mr-2"
                                        />
                                        <span className="capitalize">{level}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Submit Button */}
                        <Button
                            type="submit"
                            size="lg"
                            className="w-full"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? 'Submitting...' : 'Submit Inquiry'}
                        </Button>
                    </form>
                </Card>

                {/* Contact Info */}
                <div className="mt-8 text-center">
                    <p className="mb-4 text-sm text-muted-foreground">
                        Or reach out directly via:
                    </p>
                    <div className="flex flex-wrap justify-center gap-4 text-sm">
                        <a
                            href="mailto:contact@codenest.com"
                            className="flex items-center text-purple-500 hover:underline"
                        >
                            <Mail className="mr-2 h-4 w-4" />
                            contact@codenest.com
                        </a>
                        <a
                            href="tel:+8801234567890"
                            className="flex items-center text-purple-500 hover:underline"
                        >
                            <Phone className="mr-2 h-4 w-4" />
                            +880 1234-567890
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
