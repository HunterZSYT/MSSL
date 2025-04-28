"use client";

import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import { AI_MODELS } from "@/lib/ai-models";
import { useDebounce } from "@/hooks/use-debounce";
import { cn } from "@/lib/utils";

const currencySymbol = "৳"; // Local currency symbol

type Service = 'text' | 'image' | 'audio' | 'video' | 'model3d';

const serviceLabels: Record<Service, string> = {
  text: "Text Prompts",
  image: "Image Generations",
  audio: "Audio Clips",
  video: "Video Clips",
  model3d: "3D Models",
};

export function PricingCalculator() {
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
      let rate = rates[typedService] || 0;
      if (typedService === 'audio') {
        rate = (rates[typedService] / 5) || 0; // Rate per second for audio
      } else if (typedService === 'video') {
        rate = (rates[typedService] / 3) || 0; // Rate per second for video
      }
      total += debouncedServiceCounts[typedService] * rate;
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
    text: 100000,  // Text prompts can go up to 100k
    image: 5000,   // Image generations up to 5k
    audio: 3600,   // Audio clips up to 1 hour (3600 seconds)
    video: 1800,   // Video clips up to 30 minutes (1800 seconds)
    model3d: 100,  // 3D models up to 100
  };

  const sliderStepValues: Record<Service, number> = {
    text: 100,   // Text in steps of 100 prompts
    image: 10,   // Images in steps of 10
    audio: 10,   // Audio in steps of 10 seconds
    video: 10,   // Video in steps of 10 seconds
    model3d: 1,  // 3D models in steps of 1
  };

  const handleResetSliders = () => {
    setServiceCounts({
      text: 0,
      image: 0,
      audio: 0,
      video: 0,
      model3d: 0,
    });
  };

  return (
    <section className="py-16 md:py-24 bg-white dark:bg-[#0a0c12]" id="pricing-calculator">
      <div className="container mx-auto px-4 md:px-6 max-w-6xl">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Pay-As-You-Go Pricing</h2>
        <Card className="border dark:border-0 bg-white dark:bg-[#0d1017] rounded-lg shadow-md dark:shadow-lg">
          <div className="p-6 md:p-8">
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Usage-Based AI Services</h3>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                Our flexible pricing model allows you to pay only for what you use. No subscriptions or fixed plans - just unlimited access with usage-based billing.
              </p>
            </div>
            
            <div className="space-y-6">
              {/* Header row - Only visible on larger screens */}
              <div className="hidden sm:grid grid-cols-12 gap-4 border-b border-gray-200 dark:border-gray-800 pb-2">
                <div className="col-span-2 font-medium text-gray-700 dark:text-gray-300">Service</div>
                <div className="col-span-3 font-medium text-gray-700 dark:text-gray-300">AI Model</div>
                <div className="col-span-5 font-medium text-gray-700 dark:text-gray-300">Rate (/Unit) & Adjust</div>
                <div className="col-span-2 text-right font-medium text-gray-700 dark:text-gray-300">Cost (BDT)</div>
              </div>
              
              {/* Service rows */}
              {Object.entries(serviceCounts).map(([service, count]) => {
                const typedService = service as Service;
                const modelId = selectedModels[typedService];
                let rate = rates[typedService] || 0;
                
                // Determine the display unit
                const unit = typedService === 'text' ? 'prompt' : 
                          typedService === 'image' ? 'image' : 
                          typedService === 'model3d' ? 'model' : 'clip';
                
                // Adjust rates for audio and video
                if (typedService === 'audio') {
                  rate = (rates[typedService] / 5) || 0; // Rate per second for audio
                } else if (typedService === 'video') {
                  rate = (rates[typedService] / 3) || 0; // Rate per second for video
                }
                
                const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
                  const newValue = parseInt(e.target.value) || 0;
                  if (newValue <= sliderMaxValues[typedService]) {
                    handleServiceCountChange(typedService, newValue);
                  }
                };
                
                return (
                  <div key={service} className="flex flex-col sm:grid sm:grid-cols-12 gap-4 py-4 border-b border-gray-200 dark:border-gray-800 items-center">
                    {/* Service Name - Full width on mobile */}
                    <div className="w-full sm:w-auto sm:col-span-2 text-gray-900 dark:text-white font-medium">{serviceLabels[typedService]}</div>
                    
                    {/* Model Selector - Full width on mobile */}
                    <div className="w-full sm:w-auto sm:col-span-3 mb-2 sm:mb-0">
                      <Select 
                        onValueChange={(value) => handleModelChange(typedService, value)} 
                        value={modelId}>
                        <SelectTrigger className="w-full bg-white dark:bg-[#141824] border-gray-300 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-[#1e2230] text-gray-900 dark:text-gray-200">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-white dark:bg-[#141824] border border-gray-200 dark:border-gray-800 text-gray-900 dark:text-white">
                          {AI_MODELS.filter(model => model.rates[typedService] !== undefined).map(model => (
                            <SelectItem 
                              key={model.id} 
                              value={model.id}
                              className="text-gray-900 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-[#1e2230] focus:bg-gray-50 dark:focus:bg-[#1e2230]"
                            >
                              {model.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    {/* Rate and Slider - Full width on mobile, vertically stacked */}
                    <div className="w-full sm:col-span-5">
                      <div className="flex flex-col space-y-2">
                        <div className="text-primary font-medium text-sm">
                          {currencySymbol}{rate.toFixed(2)} / {unit}
                        </div>
                        
                        <div className="flex flex-col sm:flex-row items-center gap-2">
                          <Slider
                            min={0}
                            max={sliderMaxValues[typedService]}
                            step={sliderStepValues[typedService]}
                            value={[serviceCounts[typedService]]}
                            onValueChange={(value) => handleServiceCountChange(typedService, value[0])}
                            className="w-full flex-1 mb-2 sm:mb-0"
                          />
                          <div className="flex items-center gap-2">
                            <input
                              type="number"
                              className="w-20 h-8 rounded-md border border-gray-300 dark:border-gray-800 bg-white dark:bg-[#141824] px-3 py-1 text-sm text-gray-900 dark:text-gray-200"
                              value={serviceCounts[typedService]}
                              onChange={handleInputChange}
                              min={0}
                              max={sliderMaxValues[typedService]}
                              step={sliderStepValues[typedService]}
                            />
                            <span className="text-sm text-gray-600 dark:text-gray-400 w-16">
                              {typedService === 'audio' || typedService === 'video' ? 'seconds' : 
                              count === 1 ? unit : unit + 's'}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Cost - Full width on mobile, right aligned */}
                    <div className="w-full sm:col-span-2 text-right font-bold text-primary mt-2 sm:mt-0">
                      {serviceCounts[typedService] > 0 ? `${currencySymbol}${((serviceCounts[typedService] || 0) * rate).toFixed(2)}` : `${currencySymbol}0.00`}
                    </div>
                  </div>
                );
              })}
              
              {/* Total Row */}
              <div className="flex flex-col sm:grid sm:grid-cols-12 gap-4 pt-4 items-center">
                <div className="w-full sm:col-span-10 text-lg font-bold text-gray-900 dark:text-white mb-2 sm:mb-0">
                  Total Cost
                </div>
                <div className="w-full sm:col-span-2 text-right text-xl font-bold text-primary">
                  {currencySymbol}{totalPrice.toFixed(2)}
                </div>
              </div>
              
              {/* Buttons */}
              <div className="flex flex-col sm:flex-row sm:justify-end gap-4 pt-4">
                <Button 
                  variant="outline" 
                  onClick={handleResetSliders}
                  className="bg-transparent border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-[#1e2230]"
                >
                  Reset Sliders
                </Button>
                <Button className="bg-primary text-white hover:bg-primary/90 dark:bg-blue-600 dark:hover:bg-blue-700">
                  Buy Now
                </Button>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}