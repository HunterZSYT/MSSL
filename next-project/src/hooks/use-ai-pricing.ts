import { useState, useCallback } from "react";
import { AIModel } from "@/lib/ai-models";

type Service = 'text' | 'image' | 'audio' | 'video' | 'model3d';

interface AIPricingOptions {
  isAnnual?: boolean;
  discountPercentage?: number;
}

export function useAIPricing(options: AIPricingOptions = {}) {
  const { isAnnual = false, discountPercentage = 20 } = options;
  
  const [serviceCounts, setServiceCounts] = useState<Record<Service, number>>({
    text: 0,
    image: 0,
    audio: 0,
    video: 0,
    model3d: 0
  });
  
  const [selectedModels, setSelectedModels] = useState<Record<Service, string>>({
    text: "EleutherAI/gpt-j-6B",
    image: "stabilityai/stable-diffusion-v1-5",
    audio: "suno/bark",
    video: "runwayml/stablevideo-diffusion",
    model3d: "CompVis/dreamfusion"
  });
  
  // Calculate rates based on selected models
  const calculateRates = useCallback((models: AIModel[]) => {
    const rates: Record<Service, number> = {
      text: 0,
      image: 0,
      audio: 0,
      video: 0,
      model3d: 0
    };
    
    // Populate rates from selected models
    Object.entries(selectedModels).forEach(([service, modelId]) => {
      const model = models.find(m => m.id === modelId);
      if (model) {
        const serviceKey = service as Service;
        rates[serviceKey] = model.rates[serviceKey] || 0;
      }
    });
    
    return rates;
  }, [selectedModels]);
  
  // Calculate total price
  const calculateTotal = useCallback((models: AIModel[]) => {
    const rates = calculateRates(models);
    let total = 0;
    
    Object.entries(serviceCounts).forEach(([service, count]) => {
      const serviceKey = service as Service;
      let rate = rates[serviceKey] || 0;
      
      // Apply special calculations for audio and video
      if (serviceKey === 'audio') {
        rate = (rate / 5) || 0; // Rate per second for audio
      } else if (serviceKey === 'video') {
        rate = (rate / 3) || 0; // Rate per second for video
      }
      
      total += count * rate;
    });
    
    // Apply annual discount if applicable
    if (isAnnual) {
      total = total * 12 * (1 - (discountPercentage / 100));
    }
    
    return parseFloat(total.toFixed(2));
  }, [serviceCounts, calculateRates, isAnnual, discountPercentage]);
  
  // Handle service count change
  const handleServiceCountChange = (service: Service, count: number) => {
    setServiceCounts(prev => ({
      ...prev,
      [service]: count
    }));
  };
  
  // Handle model change
  const handleModelChange = (service: Service, modelId: string) => {
    setSelectedModels(prev => ({
      ...prev,
      [service]: modelId
    }));
  };
  
  // Reset all sliders to zero
  const resetSliders = () => {
    setServiceCounts({
      text: 0,
      image: 0,
      audio: 0,
      video: 0,
      model3d: 0
    });
  };
  
  // Apply preset configurations
  const applyPreset = (preset: Record<Service, number>) => {
    setServiceCounts(preset);
  };
  
  return {
    serviceCounts,
    selectedModels,
    calculateRates,
    calculateTotal,
    handleServiceCountChange,
    handleModelChange,
    resetSliders,
    applyPreset,
    isAnnual
  };
}
