"use client";

import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Bot, Image as ImageIcon, Music, Video, Package } from "lucide-react";
import { AIModel, AI_MODELS } from "@/lib/ai-models";

const currencySymbol = "৳"; // Local currency symbol

const serviceIcons = {
  text: <Bot className="h-5 w-5" />,
  image: <ImageIcon className="h-5 w-5" />,
  audio: <Music className="h-5 w-5" />,
  video: <Video className="h-5 w-5" />,
  model3d: <Package className="h-5 w-5" />,
};

const servicePreviewContent = {
  text: (
    <div className="space-y-4">
      <div className="bg-muted/80 p-4 rounded-md">
        <p className="font-mono text-xs text-muted-foreground mb-2">// Prompt</p>
        <p className="font-medium">Write a product description for a smart water bottle that tracks hydration.</p>
      </div>
      <div className="bg-card p-4 rounded-md">
        <p className="font-mono text-xs text-muted-foreground mb-2">// Generated Output</p>
        <p>Introducing HydroTrack™, the intelligent hydration companion for your active lifestyle. This sleek smart water bottle seamlessly monitors your daily water intake, delivering real-time hydration insights through its intuitive app. With customizable hydration goals, gentle reminder notifications, and long-lasting battery life, HydroTrack™ ensures you stay optimally hydrated throughout your day. Its premium, BPA-free construction maintains your water's freshness while the leak-proof seal and ergonomic design make it perfect for gym sessions, office work, or outdoor adventures. Take control of your hydration habits with HydroTrack™ — because proper hydration is the foundation of wellness.</p>
      </div>
    </div>
  ),
  image: (
    <div className="space-y-4">
      <div className="bg-muted p-4 rounded-lg">
        <p className="font-mono text-xs text-muted-foreground mb-2">// Prompt</p>
        <p className="font-medium">A futuristic smart water bottle with glowing blue tracking indicators</p>
      </div>
      <div className="bg-card border border-border p-4 rounded-lg aspect-square flex items-center justify-center">
        <div className="w-full max-w-xs aspect-square bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg flex items-center justify-center">
          <p className="text-center text-muted-foreground">AI-generated image would appear here</p>
        </div>
      </div>
    </div>
  ),
  audio: (
    <div className="space-y-4">
      <div className="bg-muted p-4 rounded-lg">
        <p className="font-mono text-xs text-muted-foreground mb-2">// Prompt</p>
        <p className="font-medium">Create a commercial voiceover for HydroTrack smart water bottle</p>
      </div>
      <div className="bg-card border border-border p-4 rounded-lg">
        <div className="flex items-center justify-center h-20 w-full">
          <div className="w-full bg-muted/50 h-12 rounded-lg flex items-center justify-center gap-1">
            {Array.from({ length: 30 }).map((_, i) => (
              <div 
                key={i} 
                className="h-6 w-1 bg-primary/50 rounded-full"
                style={{ height: `${(Math.sin(i * 0.5) + 1) * 15 + 5}px` }}
              ></div>
            ))}
          </div>
        </div>
        <div className="flex justify-center mt-4">
          <button className="bg-primary text-primary-foreground rounded-full w-10 h-10 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
              <polygon points="5 3 19 12 5 21 5 3"></polygon>
            </svg>
          </button>
        </div>
      </div>
    </div>
  ),
  video: (
    <div className="space-y-4">
      <div className="bg-muted p-4 rounded-lg">
        <p className="font-mono text-xs text-muted-foreground mb-2">// Prompt</p>
        <p className="font-medium">A 3-second animation of water filling up a smart bottle with tracking indicators</p>
      </div>
      <div className="bg-card border border-border p-4 rounded-lg">
        <div className="aspect-video bg-muted/50 rounded-lg flex flex-col items-center justify-center">
          <Video className="h-10 w-10 text-primary/50 mb-4" />
          <p className="text-center text-muted-foreground">AI-generated video would play here</p>
        </div>
        <div className="flex justify-center mt-4">
          <button className="bg-primary text-primary-foreground rounded-full w-10 h-10 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
              <polygon points="5 3 19 12 5 21 5 3"></polygon>
            </svg>
          </button>
        </div>
      </div>
    </div>
  ),
  model3d: (
    <div className="space-y-4">
      <div className="bg-muted p-4 rounded-lg">
        <p className="font-mono text-xs text-muted-foreground mb-2">// Prompt</p>
        <p className="font-medium">3D model of a smart water bottle with digital display and tracking sensors</p>
      </div>
      <div className="bg-card border border-border p-4 rounded-lg">
        <div className="aspect-square bg-muted/50 rounded-lg flex flex-col items-center justify-center">
          <Package className="h-10 w-10 text-primary/50 mb-4" />
          <p className="text-center text-muted-foreground">Interactive 3D model would appear here</p>
          <div className="flex gap-2 mt-4">
            <button className="bg-muted/80 text-muted-foreground rounded-md px-3 py-1 text-sm">Rotate</button>
            <button className="bg-muted/80 text-muted-foreground rounded-md px-3 py-1 text-sm">Zoom</button>
            <button className="bg-muted/80 text-muted-foreground rounded-md px-3 py-1 text-sm">Download</button>
          </div>
        </div>
      </div>
    </div>
  )
};

export function ModelPreview() {
  const [activeTab, setActiveTab] = useState<string>("text");
  
  // Group models by service type
  const serviceModels: Record<string, AIModel[]> = {};
  AI_MODELS.forEach(model => {
    if (!serviceModels[model.service]) {
      serviceModels[model.service] = [];
    }
    serviceModels[model.service].push(model);
  });

  // Map service to their respective icons
  const getServiceIcon = (service: string) => {
    switch(service) {
      case 'text': return <Bot className="h-5 w-5 text-blue-300" />;
      case 'image': return <ImageIcon className="h-5 w-5 text-blue-300" />;
      case 'audio': return <Music className="h-5 w-5 text-blue-300" />;
      case 'video': return <Video className="h-5 w-5 text-blue-300" />;
      case 'model3d': return <Package className="h-5 w-5 text-blue-300" />;
      default: return <Bot className="h-5 w-5 text-blue-300" />;
    }
  };

  return (
    <section className="py-16 md:py-24 bg-white dark:bg-black" id="ai-models">
      <div className="container mx-auto px-4 md:px-6 max-w-6xl">
        <div className="text-center mb-10">
          <h2 className="text-4xl font-bold mb-3 text-gray-900 dark:text-white">Explore Our AI Models</h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Experience the power of our diverse range of AI models across different content types.
          </p>
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="flex justify-center mb-8 overflow-x-auto -mx-4 px-4">
            {/* Add horizontal scroll for mobile */}
            <TabsList className="inline-flex w-full sm:w-auto bg-gray-100 dark:bg-[#1a1a24] p-1 rounded-lg overflow-x-auto">
              <TabsTrigger 
                value="text" 
                className="flex whitespace-nowrap items-center gap-2 px-3 sm:px-5 py-2 rounded-md text-gray-600 dark:text-gray-400
                           data-[state=active]:bg-white dark:data-[state=active]:bg-[#2563eb] 
                           data-[state=active]:text-gray-900 dark:data-[state=active]:text-white
                           dark:data-[state=active]:border dark:data-[state=active]:border-white/20"
              >
                <Bot className="h-5 w-5" /> <span>Text</span>
              </TabsTrigger>
              <TabsTrigger 
                value="image" 
                className="flex whitespace-nowrap items-center gap-2 px-3 sm:px-5 py-2 rounded-md text-gray-600 dark:text-gray-400
                           data-[state=active]:bg-white dark:data-[state=active]:bg-[#2563eb] 
                           data-[state=active]:text-gray-900 dark:data-[state=active]:text-white
                           dark:data-[state=active]:border dark:data-[state=active]:border-white/20"
              >
                <ImageIcon className="h-5 w-5" /> <span>Image</span>
              </TabsTrigger>
              <TabsTrigger 
                value="audio" 
                className="flex whitespace-nowrap items-center gap-2 px-3 sm:px-5 py-2 rounded-md text-gray-600 dark:text-gray-400
                           data-[state=active]:bg-white dark:data-[state=active]:bg-[#2563eb] 
                           data-[state=active]:text-gray-900 dark:data-[state=active]:text-white
                           dark:data-[state=active]:border dark:data-[state=active]:border-white/20"
              >
                <Music className="h-5 w-5" /> <span>Audio</span>
              </TabsTrigger>
              <TabsTrigger 
                value="video" 
                className="flex whitespace-nowrap items-center gap-2 px-3 sm:px-5 py-2 rounded-md text-gray-600 dark:text-gray-400
                           data-[state=active]:bg-white dark:data-[state=active]:bg-[#2563eb] 
                           data-[state=active]:text-gray-900 dark:data-[state=active]:text-white
                           dark:data-[state=active]:border dark:data-[state=active]:border-white/20"
              >
                <Video className="h-5 w-5" /> <span>Video</span>
              </TabsTrigger>
              <TabsTrigger 
                value="model3d" 
                className="flex whitespace-nowrap items-center gap-2 px-3 sm:px-5 py-2 rounded-md text-gray-600 dark:text-gray-400
                           data-[state=active]:bg-white dark:data-[state=active]:bg-[#2563eb] 
                           data-[state=active]:text-gray-900 dark:data-[state=active]:text-white
                           dark:data-[state=active]:border dark:data-[state=active]:border-white/20"
              >
                <Package className="h-5 w-5" /> <span>3D</span>
              </TabsTrigger>
            </TabsList>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main content panel - full width on mobile */}
            <div className="lg:col-span-2">
              {Object.keys(servicePreviewContent).map(key => (
                <TabsContent key={key} value={key} className="mt-0 h-full">
                  <Card className="border-0 dark:border dark:border-white/20 rounded-lg overflow-hidden bg-white dark:bg-[#131520] shadow-md h-auto sm:h-[850px]">
                    <CardContent className="p-0 h-full">
                      <div className="h-full flex flex-col">
                        
                        {key === "text" && (
                          <>
                            <div className="p-4 sm:p-6 space-y-4">
                              <div className="text-blue-500 dark:text-blue-400 text-sm">
                                // Prompt
                              </div>
                              <div className="font-medium text-gray-900 dark:text-white">
                                Write a product description for a smart water bottle that tracks hydration.
                              </div>
                            </div>
                            
                            <div className="px-4 sm:px-6 pb-4 sm:pb-6 flex-grow flex flex-col overflow-y-auto">
                              <div className="text-blue-500 dark:text-blue-400 text-sm mb-4">
                                // Generated Output
                              </div>
                              <div className="bg-gray-50 dark:bg-[#1a202c]/60 p-4 sm:p-6 rounded-md text-gray-700 dark:text-gray-300">
                                Introducing HydroTrack™, the intelligent hydration companion for your active lifestyle. This sleek smart water bottle seamlessly monitors your daily water intake, delivering real-time hydration insights through its intuitive app. With customizable hydration goals, gentle reminder notifications, and long-lasting battery life, HydroTrack™ ensures you stay optimally hydrated throughout your day. Its premium, BPA-free construction maintains your water's freshness while the leak-proof seal and ergonomic design make it perfect for gym sessions, office work, or outdoor adventures. Take control of your hydration habits with HydroTrack™ — because proper hydration is the foundation of wellness.
                              </div>
                            </div>
                          </>
                        )}
                        
                        {key === "image" && (
                          <>
                            <div className="p-4 sm:p-6 space-y-4">
                              <div className="text-blue-500 dark:text-blue-400 text-sm">
                                // Prompt
                              </div>
                              <div className="font-medium text-gray-900 dark:text-white">
                                A futuristic smart water bottle with glowing blue tracking indicators
                              </div>
                            </div>
                            
                            <div className="p-4 sm:p-6 pt-0 flex-grow flex items-center justify-center">
                              <div className="bg-gray-200 dark:bg-gray-700/50 rounded-lg w-full max-w-[300px] sm:max-w-[400px] h-[300px] sm:h-[400px] flex items-center justify-center">
                                <p className="text-center text-gray-500 dark:text-gray-400">AI-generated image would appear here</p>
                              </div>
                            </div>
                          </>
                        )}
                        
                        {key === "audio" && (
                          <>
                            <div className="p-4 sm:p-6 space-y-4">
                              <div className="text-blue-500 dark:text-blue-400 text-sm">
                                // Prompt
                              </div>
                              <div className="font-medium text-gray-900 dark:text-white">
                                Create a commercial voiceover for HydroTrack smart water bottle
                              </div>
                            </div>
                            
                            <div className="p-4 sm:p-6 pt-0 flex-grow flex items-center justify-center">
                              <div className="w-full flex items-center justify-center flex-col">
                                <div className="w-full sm:w-3/4 h-24 relative">
                                  {/* Audio waveform visualization */}
                                  <div className="absolute inset-0 flex items-center justify-center gap-1">
                                    {Array.from({ length: 30 }).map((_, i) => (
                                      <div 
                                        key={i} 
                                        className="h-8 w-1 bg-blue-400/50 rounded-full"
                                        style={{ height: `${(Math.sin(i * 0.5) + 1) * 15 + 5}px` }}
                                      ></div>
                                    ))}
                                  </div>
                                </div>
                                <button className="mt-8 w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center text-white">
                                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <polygon points="5 3 19 12 5 21 5 3"></polygon>
                                  </svg>
                                </button>
                              </div>
                            </div>
                          </>
                        )}
                        
                        {key === "video" && (
                          <>
                            <div className="p-4 sm:p-6 space-y-4">
                              <div className="text-blue-500 dark:text-blue-400 text-sm">
                                // Prompt
                              </div>
                              <div className="font-medium text-gray-900 dark:text-white">
                                A 3-second animation of water filling up a smart bottle with tracking indicators
                              </div>
                            </div>
                            
                            <div className="p-4 sm:p-6 pt-0 flex-grow flex items-center justify-center">
                              <div className="flex flex-col items-center justify-center">
                                <div className="w-full max-w-[350px] sm:max-w-[500px] aspect-video bg-gray-200 dark:bg-gray-700/50 rounded-lg flex flex-col items-center justify-center">
                                  <Video className="h-10 w-10 text-gray-400 dark:text-gray-500 mb-4" />
                                  <p className="text-center text-gray-500 dark:text-gray-400">AI-generated video would play here</p>
                                </div>
                                <button className="mt-8 w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center text-white">
                                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <polygon points="5 3 19 12 5 21 5 3"></polygon>
                                  </svg>
                                </button>
                              </div>
                            </div>
                          </>
                        )}
                        
                        {key === "model3d" && (
                          <>
                            <div className="p-4 sm:p-6 space-y-4">
                              <div className="text-blue-500 dark:text-blue-400 text-sm">
                                // Prompt
                              </div>
                              <div className="font-medium text-gray-900 dark:text-white">
                                3D model of a smart water bottle with digital display and tracking sensors
                              </div>
                            </div>
                            
                            <div className="p-4 sm:p-6 pt-0 flex-grow flex items-center justify-center">
                              <div className="flex flex-col items-center justify-center">
                                <div className="w-full max-w-[300px] sm:max-w-[500px] h-[300px] sm:h-[500px] bg-gray-200 dark:bg-gray-700/50 rounded-lg flex flex-col items-center justify-center">
                                  <Package className="h-10 w-10 text-gray-400 dark:text-gray-500 mb-4" />
                                  <p className="text-center text-gray-500 dark:text-gray-400">Interactive 3D model would appear here</p>
                                  <div className="flex flex-wrap gap-2 sm:gap-3 mt-6 justify-center">
                                    <button className="px-3 sm:px-4 py-1 rounded bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-200 text-sm">Rotate</button>
                                    <button className="px-3 sm:px-4 py-1 rounded bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-200 text-sm">Zoom</button>
                                    <button className="px-3 sm:px-4 py-1 rounded bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-200 text-sm">Download</button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              ))}
            </div>
            
            {/* Models list panel - Full width on mobile, lower on the page */}
            <div className="order-last lg:order-none">
              <Card className="border-0 dark:border dark:border-white/20 rounded-lg overflow-hidden bg-white dark:bg-[#131520] shadow-md h-auto sm:h-[850px]">
                <CardContent className="p-4 sm:p-6 h-full flex flex-col">
                  <h3 className="text-xl font-semibold mb-6 text-gray-900 dark:text-white">Available Models</h3>
                  <div className="overflow-y-auto pr-2 flex-grow custom-scrollbar">
                    {Object.keys(serviceModels).map(service => (
                      <div key={service} className={service === activeTab ? "block" : "hidden"}>
                        <div className="space-y-4">
                          {serviceModels[service].map(model => (
                            <div key={model.id} className="flex items-center p-4 rounded-md bg-gray-50 dark:bg-[#1a202c] hover:bg-gray-100 dark:hover:bg-[#2d3748] transition-colors">
                              <div className="flex items-center justify-center p-2 bg-gray-100 dark:bg-[#2a4365] rounded-md mr-3">
                                {getServiceIcon(service)}
                              </div>
                              <div>
                                <p className="font-medium text-gray-900 dark:text-white">{model.name.split('/').join('/')}</p>
                                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                  0.1 ৳/prompt
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </Tabs>
      </div>
      
      {/* Add custom scrollbar styling */}
      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #444;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #555;
        }
      `}</style>
    </section>
  );
}