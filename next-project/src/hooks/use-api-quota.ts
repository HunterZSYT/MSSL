import { useState, useEffect } from "react";

type Service = 'text' | 'image' | 'audio' | 'video' | 'model3d';

interface ApiQuota {
  quotas: Record<Service, number>;
  usage: Record<Service, number>;
  remainingPercentage: Record<Service, number>;
  logUsage: (service: Service, units: number) => void;
  resetUsage: () => void;
}

export function useApiQuota(initialQuotas: Record<Service, number>): ApiQuota {
  const [quotas, setQuotas] = useState<Record<Service, number>>(initialQuotas);
  const [usage, setUsage] = useState<Record<Service, number>>({
    text: 0,
    image: 0,
    audio: 0,
    video: 0,
    model3d: 0
  });
  
  // Calculate remaining percentage for each service
  const remainingPercentage: Record<Service, number> = Object.fromEntries(
    Object.entries(usage).map(([key, value]) => [
      key,
      100 - ((value / (quotas[key as Service] || 1)) * 100)
    ])
  ) as Record<Service, number>;
  
  // Function to log service usage
  const logUsage = (service: Service, units: number) => {
    setUsage(prev => ({
      ...prev,
      [service]: prev[service] + units
    }));
    
    // In a real app, you would also log to your backend
    localStorage.setItem('aiServiceUsage', JSON.stringify({
      ...usage,
      [service]: usage[service] + units
    }));
  };
  
  // Reset all usage counters
  const resetUsage = () => {
    setUsage({
      text: 0,
      image: 0,
      audio: 0,
      video: 0,
      model3d: 0
    });
    localStorage.setItem('aiServiceUsage', JSON.stringify({
      text: 0,
      image: 0,
      audio: 0,
      video: 0,
      model3d: 0
    }));
  };
  
  // Load saved usage data from localStorage on mount
  useEffect(() => {
    const savedUsage = localStorage.getItem('aiServiceUsage');
    if (savedUsage) {
      try {
        setUsage(JSON.parse(savedUsage));
      } catch (error) {
        console.error('Error parsing saved usage data:', error);
      }
    }
    
    // In a real app, you would fetch this data from your API
    // Example:
    // async function fetchQuota() {
    //   const response = await fetch('/api/user/quota');
    //   const data = await response.json();
    //   setQuotas(data.quotas);
    //   setUsage(data.usage);
    // }
    // fetchQuota();
  }, []);
  
  return { quotas, usage, remainingPercentage, logUsage, resetUsage };
}