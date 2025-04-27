import {useState, useCallback} from 'react';
import {AI_MODELS, AIModel} from '@/lib/ai-models';

interface AIPricingHook {
  getModelRates: (modelId: string) => Record<string, number>;
}

export function useAIPricing(): AIPricingHook {
  const getModelRates = useCallback((modelId: string) => {
    const model = AI_MODELS.find(m => m.id === modelId);
    if (!model) {
      // Provide default rates or handle error
      return {
        text: 1,
        image: 5,
        audio: 50,
        video: 100,
        model3d: 100,
      };
    }
    return model.rates;
  }, []);

  return {
    getModelRates,
  };
}
