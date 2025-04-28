"use client";

import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type Service = 'text' | 'image' | 'audio' | 'video' | 'model3d';

const serviceLabels: Record<Service, string> = {
  text: "Text Prompts",
  image: "Image Generations",
  audio: "Audio Clips",
  video: "Video Clips",
  model3d: "3D Models",
};

interface UsageDashboardProps {
  quotas: Record<Service, number>;
  usage: Record<Service, number>;
}

export function UsageDashboard({ quotas, usage }: UsageDashboardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Usage Dashboard</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {(Object.keys(usage) as Service[]).map((service) => {
          if (quotas[service] === 0) return null;
          
          const percentage = Math.min(100, (usage[service] / quotas[service]) * 100);
          const displayPercentage = Math.round(percentage);
          
          // Determine color based on usage percentage
          let progressColor = "bg-primary";
          if (percentage > 90) progressColor = "bg-destructive";
          else if (percentage > 70) progressColor = "bg-amber-500";
          
          return (
            <div key={service} className="space-y-1.5">
              <div className="flex justify-between text-sm">
                <span>{serviceLabels[service]}</span>
                <span>
                  {usage[service]} / {quotas[service]} ({displayPercentage}%)
                </span>
              </div>
              <Progress
                value={percentage}
                className={cn("h-2", progressColor)}
              />
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}