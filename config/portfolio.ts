import { DomainPortfolio } from '@/lib/types';

export const portfolio: DomainPortfolio = {
  domains: [
    {
      name: 'domain.com',
      highlighted: true,
    },
    {
      name: 'zklabs.xyz',
      highlighted: true,
    },
    {
      name: 'zkbase.com',
      highlighted: true,
    },
    // Add more domains here
  ],
  defaultFeatures: ['Instant Transfer', 'Secure Transaction', 'Escrow Service'],
  contactEmail: 'arpanberwal@gmail.com',
};
