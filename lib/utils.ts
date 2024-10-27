import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { portfolio } from '@/config/portfolio';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getDomainByHostname(hostname: string): string | null {
  // Remove 'www.' if present and get the domain
  const cleanHostname = hostname.replace(/^www\./, '');
  
  // If we're on berwal.com, extract the domain from the path
  if (cleanHostname === 'berwal.com') {
    return null; // Will show portfolio page
  }
  
  // Check if this domain exists in our portfolio
  const domainExists = portfolio.domains.some(d => d.name.toLowerCase() === cleanHostname.toLowerCase());
  return domainExists ? cleanHostname : null;
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
}