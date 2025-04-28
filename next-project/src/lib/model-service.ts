import { AIModel } from "./ai-models";

export async function callModel(model: AIModel, input: any) {
  try {
    const response = await fetch("/api/huggingface", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: model.id,
        inputs: input,
        parameters: {},
      }),
    });
    
    if (!response.ok) {
      throw new Error(`API error: ${response.statusText}`);
    }
    
    return response.json();
  } catch (error) {
    console.error("Error calling model:", error);
    throw error;
  }
}

export interface UsageRecord {
  userId: string;
  modelId: string;
  service: string;
  units: number;
  timestamp: Date;
}

export async function trackUsage(modelId: string, service: string, units: number) {
  // In a production app, this would update a database
  const usageRecord: UsageRecord = {
    userId: "current-user", // In a real app, get from auth context
    modelId,
    service,
    units,
    timestamp: new Date(),
  };
  
  // Log the usage for development
  console.log("Tracking usage:", usageRecord);
  
  // In production, this would call an API or update a database
  // Example: await fetch('/api/usage/track', { method: 'POST', body: JSON.stringify(usageRecord) });
  
  // For now, store in localStorage for demo purposes
  const storedUsage = localStorage.getItem('aiUsage') ? 
    JSON.parse(localStorage.getItem('aiUsage') || '[]') : 
    [];
  
  storedUsage.push(usageRecord);
  localStorage.setItem('aiUsage', JSON.stringify(storedUsage));
  
  return usageRecord;
}