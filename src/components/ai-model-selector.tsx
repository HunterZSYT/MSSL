'use client';

import {useState, useEffect} from 'react';
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from '@/components/ui/select';
import {AI_MODELS} from '@/lib/ai-models';

interface AIModelSelectorProps {
  service: string;
  onModelChange: (service: string, model: string) => void;
  selectedModel: string;
}

export function AIModelSelector({service, onModelChange, selectedModel}: AIModelSelectorProps) {
  const handleModelChange = (model: string) => {
    onModelChange(service, model);
  };

  return (
    <Select onValueChange={value => handleModelChange(value)} defaultValue={selectedModel}>
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
