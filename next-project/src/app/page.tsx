"use client";

import {Toaster} from "@/components/ui/toaster";
import {TooltipProvider} from "@/components/ui/tooltip";

import {cn} from "@/lib/utils";
import {AI_MODELS} from "@/lib/ai-models";
import {useDebounce} from "@/hooks/use-debounce";

// Import our components
import {HeroSection} from "@/components/hero-section";
import {FeaturesSection} from "@/components/features-section";
import {HowItWorks} from "@/components/how-it-works";
import {ModelPreview} from "@/components/model-preview";
import {FAQSection} from "@/components/faq-section";
import {CTASection} from "@/components/cta-section";
import {Footer} from "@/components/footer";
import {PricingCalculator} from "@/components/pricing-calculator"; // Import the new component

const aiModelDescriptions: Record<string, string> = {
  'EleutherAI/gpt-j-6B': 'Fast, efficient text generation.',
  'bigscience/bloom-7b1': 'Large language model for various tasks.',
  'meta-llama/Llama-2-7b-chat': 'Optimized for conversational AI.',
  'google/flan-t5-xl': 'Versatile text-to-text model.',
  'text-davinci-003': 'Powerful, but via inference providers.',
  'stabilityai/stable-diffusion-v1-5': 'Quick image creation.',
  'runwayml/stable-diffusion-xl': 'High-res images from RunwayML.',
  'deepfloyd/IF-I-XL-v1.0': 'Detailed, coherent image generation.',
  'stabilityai/stable-diffusion-2-1': 'Improved image quality.',
  'suno/bark': 'Expressive, versatile audio clips.',
  'tts_models/en/ljspeech/vits': 'High-fidelity voice synthesis.',
  'facebook/tts_transformer-es-en': 'Multilingual text-to-speech.',
  'runwayml/stablevideo-diffusion': 'Dynamic video clips.',
  'damo/cogvideo': 'Creative video content generation.',
  'CompVis/dreamfusion': 'Cutting-edge 3D models.',
  'dreamfusion-3d': 'Detailed 3D asset creation.',
};

export default function Home() {
  return (
    <TooltipProvider delayDuration={50}>
      <div className="min-h-screen bg-background">
        <Toaster />
        
        {/* Hero Section */}
        <HeroSection />
        
        {/* Features Section */}
        <FeaturesSection />
        
        {/* Pricing Calculator Section - Now using the separate component */}
        <PricingCalculator />
        
        {/* How It Works */}
        <HowItWorks />
        
        {/* Model Preview Section */}
        <ModelPreview />
        
        {/* FAQ Section */}
        <FAQSection />
        
        {/* CTA Section */}
        <CTASection />
        
        {/* Footer */}
        <Footer />
      </div>
    </TooltipProvider>
  );
}
