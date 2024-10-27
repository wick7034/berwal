"use client";

import { useEffect, useState } from 'react';
import { DomainCard } from '@/components/DomainCard';
import { portfolio } from '@/config/portfolio';
import { DomainListing } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Globe2, Zap, Shield, DollarSign, ChevronRight, Star } from 'lucide-react';
import Image from 'next/image';

function getDomainFromWindow(): string | null {
  if (typeof window === 'undefined') return null;
  const hostname = window.location.hostname.replace(/^www\./, '');
  if (hostname === 'berwal.com') return null;
  const domainExists = portfolio.domains.some(d => 
    d.name.toLowerCase() === hostname.toLowerCase()
  );
  return domainExists ? hostname : null;
}

const testimonials = [
  {
    name: "Alex Thompson",
    role: "CEO, TechStart Inc",
    content: "Working with Berwal.com was seamless. They helped us acquire our perfect domain name at a fair price.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop",
    rating: 5
  },
  {
    name: "Sarah Chen",
    role: "Founder, InnovateX",
    content: "The team's professionalism and expertise in domain acquisitions made the entire process smooth.",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop",
    rating: 5
  },
  {
    name: "Michael Roberts",
    role: "CTO, Digital Ventures",
    content: "Exceptional service and communication throughout our domain purchase journey.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop",
    rating: 5
  }
];

export default function Home() {
  const [currentDomain, setCurrentDomain] = useState<DomainListing | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const domain = getDomainFromWindow();
    if (domain) {
      const domainData = portfolio.domains.find(
        d => d.name.toLowerCase() === domain.toLowerCase()
      );
      setCurrentDomain(domainData || null);
    }
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 p-4 md:p-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="animate-pulse">Loading...</div>
        </div>
      </main>
    );
  }

  if (currentDomain) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 p-4 md:p-8">
        <div className="max-w-2xl mx-auto">
          <DomainCard
            domain={currentDomain}
            contactEmail={portfolio.contactEmail}
            features={portfolio.defaultFeatures}
          />
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-indigo-600 to-purple-600 overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/[0.1] bg-[size:20px_20px]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Premium Domains for
              <span className="block text-yellow-300">Innovative Brands</span>
            </h1>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Secure your digital identity with our curated collection of premium domain names.
              Your perfect domain is just a click away.
            </p>
            <Button
              size="lg"
              className="bg-white text-indigo-600 hover:bg-gray-100"
              onClick={() => document.getElementById('domains')?.scrollIntoView({ behavior: 'smooth' })}
            >
              View Domain Portfolio
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Why Choose Us */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Berwal.com</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Shield className="h-8 w-8 text-indigo-600" />,
                title: "Secure Transactions",
                description: "Every domain transfer is handled with bank-grade security and escrow protection."
              },
              {
                icon: <Zap className="h-8 w-8 text-indigo-600" />,
                title: "Fast Transfer",
                description: "Quick and efficient domain transfers, typically completed within 24-48 hours."
              },
              {
                icon: <DollarSign className="h-8 w-8 text-indigo-600" />,
                title: "Fair Pricing",
                description: "Transparent pricing with no hidden fees. Get the best value for premium domains."
              }
            ].map((feature, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-lg text-center">
                <div className="inline-flex items-center justify-center p-3 bg-indigo-100 rounded-full mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Domain Portfolio */}
      <section id="domains" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Featured Domains</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {portfolio.domains.map((domain) => (
              <a
                key={domain.name}
                href={`http://${domain.name}`}
                className="transform transition-all hover:-translate-y-1 block"
              >
                <div className="bg-white rounded-lg shadow-xl p-6 border border-gray-100">
                  <div className="flex items-center space-x-3 mb-4">
                    <Globe2 className="h-6 w-6 text-indigo-600" />
                    <h3 className="text-xl font-semibold">{domain.name}</h3>
                  </div>
                  {domain.description && (
                    <p className="text-gray-600 mb-4">{domain.description}</p>
                  )}
                  {domain.suggestedPrice && (
                    <p className="text-lg font-medium text-indigo-600">
                      Starting at ${domain.suggestedPrice.toLocaleString()}
                    </p>
                  )}
                  {domain.category && (
                    <span className="inline-block mt-2 px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm">
                      {domain.category}
                    </span>
                  )}
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">What Our Clients Say</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-lg">
                <div className="flex items-center mb-4">
                  <Image
                    src={testimonial.image}
                    alt={testimonial.name}
                    width={48}
                    height={48}
                    className="rounded-full"
                  />
                  <div className="ml-4">
                    <h4 className="font-semibold">{testimonial.name}</h4>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                  </div>
                </div>
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600">{testimonial.content}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Get in Touch</h2>
          <form
            action="https://formspree.io/f/arpanberwal@gmail.com"
            method="POST"
            className="space-y-6 bg-white p-8 rounded-lg shadow-xl"
          >
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                Message
              </label>
              <textarea
                name="message"
                id="message"
                rows={4}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              ></textarea>
            </div>
            <Button type="submit" className="w-full bg-gradient-to-r from-indigo-600 to-purple-600">
              Send Message
            </Button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Berwal.com</h3>
              <p className="text-gray-400">Premium domain names for innovative brands and businesses.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#domains" className="hover:text-white">Domain Portfolio</a></li>
                <li><a href="#" className="hover:text-white">About Us</a></li>
                <li><a href="#" className="hover:text-white">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Services</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Domain Sales</li>
                <li>Domain Acquisitions</li>
                <li>Domain Brokerage</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <p className="text-gray-400">Email: {portfolio.contactEmail}</p>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} Berwal.com. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}