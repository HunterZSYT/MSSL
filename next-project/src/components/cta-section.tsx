"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";

export function CTASection() {
  const scrollToCalculator = () => {
    const calculatorSection = document.getElementById("pricing-calculator");
    if (calculatorSection) {
      calculatorSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="py-16 md:py-24 bg-primary/10">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center px-3 py-1 text-sm rounded-full bg-primary/20 text-primary">
            <Sparkles size={16} className="mr-2" />
            <span>Ready to Unleash the Power of AI?</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
            Transform Your Creative Process with AI Landing Hub
          </h2>
          
          <p className="text-lg md:text-xl text-muted-foreground">
            Join thousands of creators and businesses already leveraging our AI tools. Start with a custom plan that fits your exact needs.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
            <Button size="lg" onClick={scrollToCalculator}>
              Calculate Your Plan
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button size="lg" variant="outline">
              Start Free Trial
            </Button>
          </div>
          
          <p className="text-sm text-muted-foreground">
            No credit card required for free trial. Cancel anytime.
          </p>
        </div>
      </div>
    </section>
  );
}