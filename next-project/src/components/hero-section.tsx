"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";

export function HeroSection() {
  const scrollToCalculator = () => {
    const calculatorSection = document.getElementById("pricing-calculator");
    if (calculatorSection) {
      calculatorSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-secondary to-background py-16 md:py-24">
      <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col items-center justify-center">
          <div className="w-full max-w-3xl space-y-6 text-center">
            <div className="inline-flex items-center px-3 py-1 text-sm rounded-full bg-primary/10 text-primary">
              <Sparkles size={16} className="mr-2" />
              <span>AI-Powered Solutions for Everyone</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              Unleash the Power of <span className="text-primary">AI</span> for Your Business
            </h1>
            
            <p className="text-xl text-muted-foreground">
              One platform, five AI services. Generate text, images, audio, videos, and 3D models - all with a customizable pricing plan that fits your needs.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" onClick={scrollToCalculator}>
                Calculate Your Plan
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline">
                Explore Services
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}