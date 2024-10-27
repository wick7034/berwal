export interface DomainListing {
  name: string;
  description?: string;
  suggestedPrice?: number;
  category?: string;
  features?: string[];
  highlighted?: boolean;
}

export interface DomainPortfolio {
  domains: DomainListing[];
  defaultFeatures: string[];
  contactEmail: string;
}