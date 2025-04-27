"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { toast } from "@/hooks/use-toast";
import { Toaster } from "@/components/ui/toaster";
import { Slider } from "@/components/ui/slider";

const packages = [
  {
    name: "Basic",
    price: 9.99,
    features: ["Limited Access", "Standard Support"],
    description: "For individuals and small projects.",
  },
  {
    name: "Pro",
    price: 29.99,
    features: ["Full Access", "Priority Support", "Advanced Analytics"],
    description: "For professionals and growing teams.",
  },
  {
    name: "Enterprise",
    price: 99.99,
    features: ["Unlimited Access", "24/7 Support", "Custom Integrations", "Dedicated Account Manager"],
    description: "For large organizations with complex needs.",
  },
];

const rates = {
  text: 1,
  image: 5,
  audio: 50,
  video: 100,
  model3d: 100,
};

export default function Home() {
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);
  const [textCount, setTextCount] = useState<number>(100);
  const [imageCount, setImageCount] = useState<number>(10);
  const [audioCount, setAudioCount] = useState<number>(5);
  const [videoCount, setVideoCount] = useState<number>(1);
  const [model3dCount, setModel3dCount] = useState<number>(0);
  const [totalPrice, setTotalPrice] = useState<number>(calculateTotal());

  useEffect(() => {
    setTotalPrice(calculateTotal());
  }, [textCount, imageCount, audioCount, videoCount, model3dCount]);

  function calculateTotal() {
    return (
      textCount * rates.text +
      imageCount * rates.image +
      audioCount * rates.audio +
      videoCount * rates.video +
      model3dCount * rates.model3d
    );
  }

  const handlePackageSelect = (packageName: string) => {
    setSelectedPackage(packageName);
    toast({
      title: "Package Selected",
      description: `You have selected the ${packageName} package.`,
    });
  };

  return (
    <div className="min-h-screen bg-secondary py-12">
      <Toaster />
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold text-primary mb-2">AI Landing Hub</h1>
        <p className="text-muted-foreground">Your All-In-One AI Solution</p>
      </header>

      <main className="container mx-auto px-4">
        {/* Feature Showcase Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-primary mb-4">Unlock the Power of AI</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Example Feature Cards - Replace with actual features */}
            <Card>
              <CardHeader>
                <CardTitle>AI-Powered Automation</CardTitle>
                <CardDescription>Automate repetitive tasks and boost productivity.</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Integrate AI to streamline your workflows and achieve more in less time.</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Predictive Analytics</CardTitle>
                <CardDescription>Gain insights and make data-driven decisions.</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Leverage AI to forecast trends and optimize your strategies.</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Personalized Experiences</CardTitle>
                <CardDescription>Tailor content and interactions to engage your audience.</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Use AI to deliver unique experiences that resonate with your users.</p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Pricing Calculator Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-primary mb-4">Pricing Calculator</h2>
          <Card>
            <CardHeader>
              <CardTitle>Customize Your AI Service Plan</CardTitle>
              <CardDescription>Adjust the sliders to match your needs and budget.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6">
              <div className="grid gap-2">
                <label htmlFor="textSlider" className="text-sm font-medium leading-none">
                  Text Prompts ({textCount} × 1 BDT)
                </label>
                <Slider
                  id="textSlider"
                  min={0}
                  max={1000}
                  step={10}
                  defaultValue={[100]}
                  onValueChange={(value) => setTextCount(value[0])}
                />
              </div>

              <div className="grid gap-2">
                <label htmlFor="imageSlider" className="text-sm font-medium leading-none">
                  Image Generations ({imageCount} × 5 BDT)
                </label>
                <Slider
                  id="imageSlider"
                  min={0}
                  max={200}
                  step={5}
                  defaultValue={[10]}
                  onValueChange={(value) => setImageCount(value[0])}
                />
              </div>

              <div className="grid gap-2">
                <label htmlFor="audioSlider" className="text-sm font-medium leading-none">
                  Audio Clips ({audioCount} × 50 BDT)
                </label>
                <Slider
                  id="audioSlider"
                  min={0}
                  max={50}
                  step={1}
                  defaultValue={[5]}
                  onValueChange={(value) => setAudioCount(value[0])}
                />
              </div>

              <div className="grid gap-2">
                <label htmlFor="videoSlider" className="text-sm font-medium leading-none">
                  Video Clips ({videoCount} × 100 BDT)
                </label>
                <Slider
                  id="videoSlider"
                  min={0}
                  max={20}
                  step={1}
                  defaultValue={[1]}
                  onValueChange={(value) => setVideoCount(value[0])}
                />
              </div>

              <div className="grid gap-2">
                <label htmlFor="model3dSlider" className="text-sm font-medium leading-none">
                  3D Models ({model3dCount} × 100 BDT)
                </label>
                <Slider
                  id="model3dSlider"
                  min={0}
                  max={10}
                  step={1}
                  defaultValue={[0]}
                  onValueChange={(value) => setModel3dCount(value[0])}
                />
              </div>
            </CardContent>
            <CardFooter className="justify-end">
              <div className="text-xl font-semibold">Total: {totalPrice} BDT / mo</div>
            </CardFooter>
          </Card>
        </section>

        {/* Pricing Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-primary mb-4">Choose Your Plan</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {packages.map((pack) => (
              <Card key={pack.name} className={selectedPackage === pack.name ? "border-2 border-accent" : ""}>
                <CardHeader>
                  <CardTitle className="text-xl font-semibold">{pack.name}</CardTitle>
                  <CardDescription>{pack.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="mb-4">
                    <span className="text-2xl font-bold text-primary">${pack.price}</span>/month
                  </div>
                  <ul className="list-disc pl-5 mb-4">
                    {pack.features.map((feature, index) => (
                      <li key={index} className="text-sm">{feature}</li>
                    ))}
                  </ul>
                  <Button variant="accent" onClick={() => handlePackageSelect(pack.name)}>
                    Select {pack.name}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
        {/* Testimonials Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-primary mb-4">What Our Clients Say</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardContent>
                <p className="mb-4">"AI Landing Hub has revolutionized our workflow. The AI-powered automation has saved us countless hours."</p>
                <p className="font-semibold">- John Doe, CEO</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent>
                <p className="mb-4">"The predictive analytics feature has given us a significant competitive advantage. We can now anticipate market trends with confidence."</p>
                <p className="font-semibold">- Jane Smith, Marketing Manager</p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* User Dashboard Access Section - Conditionally Rendered */}
        {selectedPackage && (
          <section>
            <h2 className="text-2xl font-semibold text-primary mb-4">User Dashboard</h2>
            <Card>
              <CardHeader>
                <CardTitle>Welcome to Your Dashboard</CardTitle>
                <CardDescription>Manage your AI services and access exclusive features.</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="mb-4">You have access to the following features:</p>
                <Badge variant="secondary">{packages.find((pack) => pack.name === selectedPackage)?.features.join(", ")}</Badge>
                <Button>Go to Dashboard</Button>
              </CardContent>
            </Card>
          </section>
        )}
      </main>

      <footer className="text-center mt-8 text-muted-foreground">
        <p>&copy; 2024 AI Landing Hub. All rights reserved.</p>
      </footer>
    </div>
  );
}
