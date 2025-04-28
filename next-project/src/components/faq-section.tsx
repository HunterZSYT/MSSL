"use client";

import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "What is AI Landing Hub?",
    answer: "AI Landing Hub is a comprehensive AI service platform that offers text, image, audio, video, and 3D model generation through a single, easy-to-use interface. We provide access to state-of-the-art AI models with customizable pricing plans."
  },
  {
    question: "How does the pricing calculator work?",
    answer: "Our pricing calculator allows you to customize your AI service plan based on your needs. You can adjust the volume for each service type (text, image, audio, video, 3D models) and select from different AI models. The calculator instantly shows you the cost based on your selections."
  },
  {
    question: "Can I change my plan later?",
    answer: "Yes, you can upgrade, downgrade, or customize your plan at any time. Changes will be reflected in your next billing cycle. Our flexible pricing model means you only pay for what you need."
  },
  {
    question: "How do I access the AI models?",
    answer: "After subscribing, you can access the AI models through our user-friendly dashboard or via our API. We provide comprehensive documentation and code examples to help you integrate our services into your applications."
  },
  {
    question: "What is the quality of the AI-generated content?",
    answer: "We offer various quality levels depending on the model you choose. Our premium models produce high-quality outputs comparable to professional content. You can preview the quality of each model type in our Model Preview section."
  },
  {
    question: "Do you offer an API for developers?",
    answer: "Yes, we provide a robust API that allows developers to integrate our AI services directly into their applications. API access is included in all subscription plans, with varying rate limits based on your plan tier."
  },
  {
    question: "Is my data secure?",
    answer: "Yes, data security is our top priority. We use industry-standard encryption for all data transfers and storage. We do not use your input prompts or generated content to train our models unless you explicitly opt in to improve our services."
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept all major credit cards, PayPal, and bank transfers. For enterprise plans, we also offer invoicing options. All payments are processed securely through our payment partners."
  },
  {
    question: "Is there a free trial available?",
    answer: "Yes, new users can sign up for a 7-day free trial with limited access to all our services. This allows you to test the capabilities of our AI models before committing to a subscription."
  },
  {
    question: "How do I get support if I need help?",
    answer: "We offer multiple support channels, including a comprehensive knowledge base, email support, and live chat. Enterprise customers receive priority support with dedicated account managers. Our support team is available 24/7 to help you with any questions or issues."
  }
];

export function FAQSection() {
  return (
    <section className="py-16 md:py-24 bg-background" id="faq">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Frequently Asked Questions</h2>
          <p className="text-lg text-muted-foreground">
            Find answers to common questions about AI Landing Hub
          </p>
        </div>
        
        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`faq-${index}`}>
                <AccordionTrigger className="text-lg font-medium text-left">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
          
          <div className="mt-12 text-center p-6 bg-secondary/30 rounded-lg">
            <h3 className="text-xl font-medium mb-3">Still have questions?</h3>
            <p className="text-muted-foreground mb-4">Our support team is ready to help you with any additional questions.</p>
            <div className="flex justify-center gap-4 flex-wrap">
              <a href="#" className="text-primary hover:underline font-medium">Contact Support</a>
              <a href="#" className="text-primary hover:underline font-medium">Visit Knowledge Base</a>
              <a href="#" className="text-primary hover:underline font-medium">Request a Demo</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}