"use client";

import {useState, useEffect, useCallback, useRef} from "react";
import {Button} from "@/components/ui/button";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {Slider} from "@/components/ui/slider";
import {Toaster} from "@/components/ui/toaster";
import {Tooltip, TooltipContent, TooltipProvider} from "@/components/ui/tooltip";
import {Info} from "lucide-react";
import {Separator} from "@/components/ui/separator";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";

import {cn} from "@/lib/utils";
import {AI_MODELS, AIModel} from "@/lib/ai-models";
import {useDebounce} from "@/hooks/use-debounce";

const currencySymbol = "৳"; // Local currency symbol

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

type Service = 'text' | 'image' | 'audio' | 'video' | 'model3d';

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

export default function Home() {
  const [serviceCounts, setServiceCounts] = useState({
    text: 0,
    image: 0,
    audio: 0,
    video: 0,
    model3d: 0,
  });

  const [selectedModels, setSelectedModels] = useState<{ [key in Service]: string }>({
    text: "EleutherAI/gpt-j-6B",
    image: "stabilityai/stable-diffusion-v1-5",
    audio: "suno/bark",
    video: "runwayml/stablevideo-diffusion",
    model3d: "CompVis/dreamfusion",
  });

  const getRate = (service: Service, modelId: string): number => {
    const model = AI_MODELS.find(m => m.id === modelId);
    if (!model) return 0;
    return model.rates[service] || 0;
  };

  const rates = {
    text: getRate('text', selectedModels.text),
    image: getRate('image', selectedModels.image),
    audio: getRate('audio', selectedModels.audio),
    video: getRate('video', selectedModels.video),
    model3d: getRate('model3d', selectedModels.model3d),
  };

  const debouncedServiceCounts = useDebounce(serviceCounts, 200);

  const calculateTotal = useCallback(() => {
    let total = 0;
    for (const service in serviceCounts) {
      const typedService = service as Service;
      total += debouncedServiceCounts[typedService] * (rates[typedService] || 0);
    }
    return parseFloat(total.toFixed(2));
  }, [debouncedServiceCounts, rates]);

  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    setTotalPrice(calculateTotal());
  }, [calculateTotal]);

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
    audio: 50,
    video: 20,
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

  const handleResetSliders = () => {
    resetSliders();
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
                        <th className="w-2/5 p-2 text-center text-base md:text-lg">Rate (/Unit) &amp; Adjust</th>
                        <th className="w-1/5 p-2 text-right text-base md:text-lg">Cost (BDT)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {Object.entries(serviceCounts).map(([service, count]) => {
                        const typedService = service as Service;
                        const modelId = selectedModels[typedService];
                        const model = AI_MODELS.find(m => m.id === modelId);
                        const rate = rates[typedService] || 0;
                        const unit = model?.unit || '';
                        const unitDescription = model?.description || '';

                        return (
                          <tr key={service} className="border-b border-border">
                            <td className="p-2 font-medium text-sm md:text-lg">{serviceLabels[typedService]}</td>
                            <td className="p-2 text-center">
                              <Select onValueChange={(value) => handleModelChange(typedService, value)} defaultValue={modelId} className="md:min-w-[200px] text-sm md:text-base">
                                <SelectTrigger className="w-[220px]">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  {AI_MODELS.filter(model => model.rates[typedService] !== undefined).map(model => (
                                    <SelectItem key={model.id} value={model.id}>
                                      {model.name}
                                      <div className="text-xs text-muted-foreground italic">
                                        {aiModelDescriptions[model.id]}
                                      </div>
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </td>
                            <td className="p-2 text-center font-bold text-primary text-sm md:text-lg">
                              {currencySymbol}
                              {rate} / {unit}
                              <div className="flex items-center justify-center space-x-4">
                                <Slider
                                  id={`${service}Slider`}
                                  min={0}
                                  max={sliderMaxValues[typedService]}
                                  step={sliderStepValues[typedService]}
                                  value={[serviceCounts[typedService]]}
                                  onValueChange={(value) => handleServiceCountChange(typedService, value[0])}
                                  className="w-24 md:w-48"
                                />
                                <span className="w-24 text-right font-medium text-sm md:text-base">
                                  {serviceCounts[typedService]} {typedService === 'audio' || typedService === 'video' ? 'seconds' : unit}
                                </span>
                              </div>
                            </td>
                            <td
                              className="p-2 text-right font-bold total-cost-text text-sm md:text-lg"
                              style={{color: "hsl(var(--cost-color))"}}
                            >
                              {currencySymbol}
                              {((serviceCounts[typedService] || 0) * rate).toFixed(2)}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                    <tfoot>
                      <tr>
                        <td colSpan={5} className="py-4 text-xl font-semibold">
                          Total Cost
                        </td>
                        <td className="py-4 text-right font-bold total-cost-text text-xl text-primary">
                          {currencySymbol}
                          {totalPrice}
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
                <div className="flex justify-end mt-4">
                  <Button variant="outline" onClick={handleResetSliders}>
                    Reset Sliders
                  </Button>
                  <Button className="ml-4">Get Started</Button>
                </div>
              </CardContent>
            </Card>
          </section>
        </main>

        <footer className="text-center mt-8 text-muted-foreground">
          <p>&copy; 2024 AI Landing Hub. All rights reserved.</p>
        </footer>
      </div>
    </TooltipProvider>
  );
}
