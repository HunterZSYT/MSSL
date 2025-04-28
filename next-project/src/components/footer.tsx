"use client";

import React from "react";
import { ThemeToggle } from "@/components/theme-toggle";
import { Separator } from "@/components/ui/separator";
import { Sparkles } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-background border-t border-border py-12">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center mb-4">
              <Sparkles className="h-6 w-6 text-primary mr-2" />
              <span className="font-bold text-xl">AI Landing Hub</span>
            </div>
            <p className="text-muted-foreground mb-4">
              Your all-in-one AI solution for content generation with customizable pricing plans.
            </p>
            <div className="flex items-center">
              <ThemeToggle />
            </div>
          </div>
          
          <div className="col-span-1 md:col-span-1">
            <h3 className="font-semibold mb-4 text-lg">Services</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">Text Generation</a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">Image Creation</a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">Audio Production</a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">Video Synthesis</a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">3D Model Generation</a>
              </li>
            </ul>
          </div>
          
          <div className="col-span-1 md:col-span-1">
            <h3 className="font-semibold mb-4 text-lg">Company</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">About Us</a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">Pricing</a>
              </li>
              <li>
                <a href="#faq" className="text-muted-foreground hover:text-primary transition-colors">FAQ</a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">Blog</a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">Careers</a>
              </li>
            </ul>
          </div>
          
          <div className="col-span-1 md:col-span-1">
            <h3 className="font-semibold mb-4 text-lg">Resources</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">Documentation</a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">API Reference</a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">Support Center</a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">Contact Sales</a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">Status</a>
              </li>
            </ul>
          </div>
        </div>
        
        <Separator className="my-8" />
        
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} AI Landing Hub. All rights reserved.
          </div>
          <div className="flex flex-wrap gap-6">
            <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Terms of Service</a>
            <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Privacy Policy</a>
            <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Cookie Policy</a>
          </div>
          <div className="flex gap-4">
            {/* Social media icons */}
            {['twitter', 'facebook', 'instagram', 'linkedin', 'github'].map((social) => (
              <a 
                key={social} 
                href="#" 
                className="h-8 w-8 rounded-full bg-muted/30 flex items-center justify-center hover:bg-primary/20 transition-colors"
                aria-label={`Follow us on ${social}`}
              >
                <span className="sr-only">Follow us on {social}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}