"use client";

import React from "react";
import { 
  Bot, 
  Image as ImageIcon, 
  Music, 
  Video, 
  Package, 
  ShieldCheck, 
  Zap, 
  Sliders, 
  Globe
} from "lucide-react";

const features = [
  {
    icon: <Bot className="w-6 h-6" />,
    title: "Text Generation",
    description: "Generate high-quality text content for articles, product descriptions, social media, and more."
  },
  {
    icon: <ImageIcon className="w-6 h-6" />,
    title: "Image Creation",
    description: "Create custom images, artwork, and visual content from simple text prompts."
  },
  {
    icon: <Music className="w-6 h-6" />,
    title: "Audio Production",
    description: "Convert text to speech, create custom sound effects, and generate voice clips."
  },
  {
    icon: <Video className="w-6 h-6" />,
    title: "Video Synthesis",
    description: "Transform concepts into short video clips with cutting-edge AI models."
  },
  {
    icon: <Package className="w-6 h-6" />,
    title: "3D Model Generation",
    description: "Create detailed 3D assets for gaming, VR applications, and product visualization."
  },
  {
    icon: <ShieldCheck className="w-6 h-6" />,
    title: "Enterprise Security",
    description: "Bank-grade security with data encryption and secure API access for enterprise clients."
  },
  {
    icon: <Zap className="w-6 h-6" />,
    title: "Lightning Fast",
    description: "Optimized infrastructure ensures rapid generation times even for complex requests."
  },
  {
    icon: <Sliders className="w-6 h-6" />,
    title: "Customizable Plans",
    description: "Pay only for what you need with our flexible usage-based pricing model."
  },
  {
    icon: <Globe className="w-6 h-6" />,
    title: "Global API Access",
    description: "Integrate our AI services directly into your applications with simple API calls."
  },
];

export function FeaturesSection() {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">All-In-One AI Solution</h2>
          <p className="text-lg text-muted-foreground">
            Unlock the full potential of artificial intelligence with our comprehensive suite of tools designed for creators, businesses, and developers.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="p-6 rounded-xl bg-card border border-border hover:border-primary/50 transition-colors duration-300"
            >
              <div className="p-3 bg-primary/10 rounded-lg w-fit mb-4">
                <div className="text-primary">
                  {feature.icon}
                </div>
              </div>
              <h3 className="font-bold text-xl mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}