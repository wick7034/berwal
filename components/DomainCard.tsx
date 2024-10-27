"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Globe2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Separator } from "@/components/ui/separator";
import { DomainListing } from "@/lib/types";
import { formatPrice } from "@/lib/utils";

interface DomainCardProps {
  domain: DomainListing;
  contactEmail: string;
  features: string[];
}

export function DomainCard({ domain, contactEmail, features }: DomainCardProps) {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const formData = new FormData(e.target as HTMLFormElement);
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      mobile: formData.get('mobile'),
      offer: formData.get('offer'),
      message: formData.get('message'),
      domain: domain.name
    };

    try {
      const response = await fetch('https://formspree.io/f/arpanberwal@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        toast({
          title: "Offer Submitted",
          description: "We'll get back to you soon!",
        });
        (e.target as HTMLFormElement).reset();
      } else {
        throw new Error('Failed to submit form');
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit offer. Please try again.",
        variant: "destructive",
      });
    }
    
    setIsSubmitting(false);
  };

  return (
    <Card className="overflow-hidden backdrop-blur-xl border-0 shadow-xl">
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-8">
        <div className="flex items-center justify-center space-x-3 mb-4">
          <Globe2 className="h-8 w-8 text-white" />
          <h1 className="text-4xl font-bold text-white">
            {domain.name}
          </h1>
        </div>
        <p className="text-white/90 text-center mb-6">
          {domain.description || "This premium domain is available for purchase. Make an offer below to start the conversation."}
          {domain.suggestedPrice && (
            <span className="block mt-2 text-white font-semibold">
              Suggested Price: {formatPrice(domain.suggestedPrice)}
            </span>
          )}
        </p>
        <div className="flex items-center justify-center space-x-4 text-sm text-white/80">
          {features.map((feature, index) => (
            <span key={index} className="flex items-center">
              <span className="mr-1.5">✓</span>
              {feature}
            </span>
          ))}
        </div>
      </div>

      <Separator className="bg-gradient-to-r from-indigo-600 to-purple-600" />

      <div className="p-8 bg-white">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="John Doe"
                  required
                  className="border-gray-200"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="john@example.com"
                  required
                  className="border-gray-200"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="mobile">Mobile Number</Label>
              <Input
                id="mobile"
                name="mobile"
                type="tel"
                placeholder="+1 (555) 000-0000"
                required
                className="border-gray-200"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="offer">Your Offer (USD)</Label>
              <Input
                id="offer"
                name="offer"
                type="number"
                placeholder={domain.suggestedPrice?.toString() || "5000"}
                required
                min="1"
                className="border-gray-200"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                name="message"
                placeholder="Tell us about your plans for this domain..."
                className="border-gray-200"
                rows={4}
              />
            </div>
          </div>
          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Submit Offer"}
          </Button>
        </form>
      </div>
    </Card>
  );
}