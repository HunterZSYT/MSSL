"use client";

import {useState, useEffect, useCallback} from "react";
import {Button} from "@/components/ui/button";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {Slider} from "@/components/ui/slider";
import {Toaster} from "@/components/ui/toaster";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip";
import {useDebounce} from "@/hooks/use-debounce";
import {Info} from "lucide-react";

import {cn} from "@/lib/utils";
import {AIModelSelector} from "@/components/ai-model-selector";
import {AI_MODELS, AIModel} from "@/lib/ai-models";
import {useAIPricing} from "@/hooks/use-ai-pricing";

const defaultRates = {
  text: 1,
  image: 5,
  audio: 50,
  video: 100,
  model3d: 100,
};

type Service = keyof typeof defaultRates;

const serviceLabels: Record<Service, string> = {
  text: "Text Prompts",
  image: "Image Generations",
  audio: "Audio Clips",
  video: "Video Clips",
  model3d: "3D Models",
};

const serviceUnits: Record<Service, string> = {
  text: "prompts",
  image: "images",
  audio: "seconds",
  video: "seconds",
  model3d: "models",
};

const currencySymbol = "৳"; // Local currency symbol

const aiModelDescriptions: Record<string, string> = {
  'gemini-pro': 'Balanced performance and cost.',
  'gpt-4': 'Highest quality, higher price.',
  'llama-2': 'Good performance, lower price.',
};

export default function Home() {
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);
  const [serviceCounts, setServiceCounts] = useState({
    text: 0,
    image: 0,
    audio: 0,
    video: 0,
    model3d: 0,
  });

  const {getModelRates} = useAIPricing();
  const [rates, setRates] = useState(getModelRates());

  const [selectedModels, setSelectedModels] = useState<{ [key in Service]: string }>({
    text: "gemini-pro",
    image: "gemini-pro",
    audio: "gemini-pro",
    video: "gemini-pro",
    model3d: "gemini-pro",
  });

  const debouncedServiceCounts = useDebounce(serviceCounts, 200);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const newRates = {
      text: getModelRates(selectedModels.text).text,
      image: getModelRates(selectedModels.image).image,
      audio: getModelRates(selectedModels.audio).audio,
      video: getModelRates(selectedModels.video).video,
      model3d: getModelRates(selectedModels.model3d).model3d,
    };
    setRates(newRates);
  }, [selectedModels, getModelRates]);

  const calculateTotal = useCallback(() => {
    let total = 0;
    for (const service in rates) {
      total += debouncedServiceCounts[service as Service] * rates[service as Service];
    }
    return total;
  }, [debouncedServiceCounts, rates]);

  useEffect(() => {
    setTotalPrice(calculateTotal());
  }, [calculateTotal]);

  const handlePackageSelect = (packageName: string) => {
    setSelectedPackage(packageName);
  };

  const handleServiceCountChange = (service: Service, count: number) => {
    setServiceCounts((prevCounts) => ({
      ...prevCounts,
      [service]: count,
    }));
  };

  const handleModelChange = (service: Service, model: string) => {
    setSelectedModels((prevModels) => ({
      ...prevModels,
      [service]: model,
    }));
  };

  const sliderMaxValues: Record<Service, number> = {
    text: 1000,
    image: 200,
    audio: 60,
    video: 30,
    model3d: 10,
  };

  const sliderStepValues: Record<Service, number> = {
    text: 10,
    image: 1,
    audio: 1,
    video: 1,
    model3d: 1,
  };

  const resetSliders = () => {
    setServiceCounts({
      text: 0,
      image: 0,
      audio: 0,
      video: 0,
      model3d: 0,
    });
  };

  return (
    <TooltipProvider delayDuration={50}>
      <div className="min-h-screen py-12 bg-secondary">
        <Toaster />
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-primary mb-2">AI Landing Hub</h1>
          <p className="text-muted-foreground text-lg">Your All-In-One AI Solution</p>
        </header>

        <main className="container mx-auto px-4">
          {/* Pricing Calculator Section */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-primary mb-4">Pricing Calculator</h2>
            <Card className="border-2 border-primary/20">
              <CardHeader>
                <CardTitle className="text-3xl font-bold">Customize Your AI Service Plan</CardTitle>
                <CardDescription className="text-muted-foreground text-lg mb-4">
                  Adjust the sliders to match your needs and budget.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="table-responsive">
                  <table className="w-full">
                    <thead>
                      <tr className="text-left">
                        <th className="w-1/5 p-2 text-base md:text-lg">Service</th>
                        <th className="w-1/5 p-2 text-center text-base md:text-lg">AI Model</th>
                        <th className="w-1/5 p-2 text-center text-base md:text-lg">Rate (/Unit)</th>
                        <th className="w-2/5 p-2 text-center text-base md:text-lg">Count &amp; Adjust</th>
                        <th className="w-1/5 p-2 text-right text-base md:text-lg">Cost (BDT)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {Object.entries(rates).map(([service, rate]) => (
                        <tr key={service} className="border-b border-border">
                          <td className="p-2 font-medium text-sm md:text-lg">{serviceLabels[service as Service]}</td>
                          <td className="p-2 text-center">
                            <AIModelSelector
                              service={service}
                              onModelChange={handleModelChange}
                              selectedModel={selectedModels[service as Service]}
                            />
                            <div className="text-xs text-muted-foreground italic">
                              {aiModelDescriptions[selectedModels[service as Service]]}
                            </div>
                          </td>
                          <td className="p-2 text-center font-bold text-primary text-sm md:text-lg">
                            {currencySymbol}
                            {rate} / {serviceUnits[service as Service]}
                          </td>
                          <td className="p-2">
                            <div className="flex items-center justify-center space-x-4">
                              <Slider
                                id={`${service}Slider`}
                                min={0}
                                max={sliderMaxValues[service as Service]}
                                step={sliderStepValues[service as Service]}
                                defaultValue={[serviceCounts[service as Service]]}
                                onValueChange={(value) => handleServiceCountChange(service as Service, value[0])}
                                className="w-24 md:w-48"
                              />
                              <span className="w-24 text-right font-medium text-sm md:text-base">
                                {serviceCounts[service as Service]} {serviceUnits[service as Service]}
                              </span>
                            </div>
                          </td>
                          <td
                            className="p-2 text-right font-bold total-cost-text text-sm md:text-lg"
                            style={{color: "hsl(var(--cost-color))"}}
                          >
                            {currencySymbol}
                            {serviceCounts[service as Service] * rate}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot>
                      <tr>
                        <td colSpan={4} className="py-4 text-xl font-semibold">
                          Total Cost
                        </td>
                        <td className="py-4 text-right font-bold total-cost-text text-xl text-primary">
                          {currencySymbol}
                          {totalPrice} / mo
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
                <div className="flex justify-end mt-4">
                  <Button variant="outline" onClick={resetSliders}>
                    Reset Sliders
                  </Button>
                  <Button className="ml-4">Get Started</Button>
                </div>
              </CardContent>
            </Card>
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
    </TooltipProvider>
  );
}
