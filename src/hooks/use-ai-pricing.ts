import {useState, useCallback} from 'react';
import {AI_MODELS, AIModel} from '@/lib/ai-models';

interface AIPricingHook {
  selectedModel: string;
  setSelectedModel: (model: string) => void;
  getModelRates: () => Record<string, number>;
}

export function useAIPricing(): AIPricingHook {
  const [selectedModel, setSelectedModel] = useState<string>(AI_MODELS[0].id);

  const getModelRates = useCallback(() => {
    const model = AI_MODELS.find(m => m.id === selectedModel);
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
  }, [selectedModel]);

  return {
    selectedModel,
    setSelectedModel: (model: string) => {
      setSelectedModel(model);
    },
    getModelRates,
  };
}
