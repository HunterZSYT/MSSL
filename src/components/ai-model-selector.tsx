'use client';

import {useState, useEffect} from 'react';
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from '@/components/ui/select';
import {AI_MODELS} from '@/lib/ai-models';
import {useAIPricing} from '@/hooks/use-ai-pricing';

interface AIModelSelectorProps {
  onModelChange: (model: string) => void;
}

export function AIModelSelector({onModelChange}: AIModelSelectorProps) {
  const [selectedModel, setSelectedModel] = useState(AI_MODELS[0].id);

  useEffect(() => {
    onModelChange(selectedModel);
  }, [selectedModel, onModelChange]);

  return (
    <Select onValueChange={setSelectedModel} defaultValue={selectedModel}>
      <SelectTrigger className="w-[180px]">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {AI_MODELS.map(model => (
          <SelectItem key={model.id} value={model.id}>
            {model.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
