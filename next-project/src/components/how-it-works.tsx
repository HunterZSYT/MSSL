"use client";

import React from "react";
import { ArrowRight, Calculator, CreditCard, Laptop, Check } from "lucide-react";

const steps = [
  {
    icon: <Calculator className="w-6 h-6" />,
    title: "Customize Your Plan",
    description: "Use our interactive pricing calculator to select the AI models and adjust the volume for each service type."
  },
  {
    icon: <CreditCard className="w-6 h-6" />,
    title: "Subscribe & Access",
    description: "Choose your payment method and instantly get access to our AI models through our intuitive dashboard."
  },
  {
    icon: <Laptop className="w-6 h-6" />,
    title: "Generate Content",
    description: "Start creating text, images, audio, video, and 3D models directly from your account or via API integration."
  },
  {
    icon: <Check className="w-6 h-6" />,
    title: "Scale As You Grow",
    description: "Easily adjust your plan as your needs change, with no long-term commitments or hidden fees."
  }
];

export function HowItWorks() {
  return (
    <section className="py-16 md:py-24 bg-secondary/50">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
          <p className="text-lg text-muted-foreground">
            Getting started with AI Landing Hub is simple. Follow these four easy steps to begin creating with AI.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              <div className="p-6 rounded-xl bg-background border border-border h-full flex flex-col">
                <div className="p-3 bg-primary/10 rounded-lg w-fit mb-4">
                  <div className="text-primary">
                    {step.icon}
                  </div>
                </div>
                <h3 className="font-bold text-xl mb-2">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
                
                <div className="text-2xl font-bold text-primary/20 absolute top-6 right-6">
                  {index + 1}
                </div>
              </div>
              
              {index < steps.length - 1 && (
                <div className="hidden lg:flex absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                  <ArrowRight className="w-6 h-6 text-primary" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}