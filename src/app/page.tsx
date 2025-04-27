"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Toaster } from "@/components/ui/toaster";
import { Separator } from "@/components/ui/separator";

const rates = {
  text: 1,
  image: 5,
  audio: 50,
  video: 100,
  model3d: 100,
};

type Service = keyof typeof rates;

const serviceLabels: Record<Service, string> = {
  text: "Text Prompts",
  image: "Image Generations",
  audio: "Audio Clips",
  video: "Video Clips",
  model3d: "3D Models",
};

export default function Home() {
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);
  const [serviceCounts, setServiceCounts] = useState({
    text: 100,
    image: 10,
    audio: 5,
    video: 1,
    model3d: 0,
  });

  const [totalPrice, setTotalPrice] = useState(calculateTotal());

  useEffect(() => {
    setTotalPrice(calculateTotal());
  }, [serviceCounts]);

  function calculateTotal() {
    let total = 0;
    for (const service in rates) {
      total += serviceCounts[service as Service] * rates[service as Service];
    }
    return total;
  }

  const handlePackageSelect = (packageName: string) => {
    setSelectedPackage(packageName);
  };

  const handleServiceCountChange = (service: Service, count: number) => {
    setServiceCounts((prevCounts) => ({
      ...prevCounts,
      [service]: count,
    }));
  };

  return (
    <div className="min-h-screen py-12">
      <Toaster />
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold text-primary mb-2">AI Landing Hub</h1>
        <p className="text-muted-foreground">Your All-In-One AI Solution</p>
      </header>

      <main className="container mx-auto px-4">
        {/* Pricing Calculator Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-primary mb-4">Pricing Calculator</h2>
          <Card>
            <CardHeader>
              <CardTitle>Customize Your AI Service Plan</CardTitle>
              <CardDescription>Adjust the sliders to match your needs and budget.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6">
              {Object.entries(rates).map(([service, rate]) => (
                <div key={service} className="grid gap-2">
                  <label htmlFor={`${service}Slider`} className="text-sm font-medium leading-none">
                    {serviceLabels[service as Service]}
                  </label>
                  <Slider
                    id={`${service}Slider`}
                    min={0}
                    max={service === "text" ? 1000 : 200}
                    step={service === "text" ? 10 : 5}
                    defaultValue={[serviceCounts[service as Service]]}
                    onValueChange={(value) => handleServiceCountChange(service as Service, value[0])}
                  />
                </div>
              ))}
            </CardContent>
          </Card>
        </section>
        {/* Displaying Prices in Seperate Coloumns  */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-primary mb-4">Pricing Details</h2>
          <Card>
            <CardHeader>
              <CardTitle>Service Costs</CardTitle>
              <CardDescription>View the cost breakdown for each service.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {Object.entries(rates).map(([service, rate]) => (
                  <div key={service} className="border rounded-md p-4">
                    <div className="font-semibold">{serviceLabels[service as Service]}</div>
                    <div>Count: {serviceCounts[service as Service]}</div>
                    <div>Rate: {rate} BDT</div>
                    <div>Cost: {serviceCounts[service as Service] * rate} BDT</div>
                  </div>
                ))}
              </div>
              <Separator className="my-4" />
              <div className="text-xl font-semibold">Total: {totalPrice} BDT / mo</div>
            </CardContent>
          </Card>
        </section>
        {/* User Dashboard Access Section - Conditionally Rendered */}
        {selectedPackage && (
          <section>
            <h2 className="text-2xl font-semibold text-primary mb-4">User Dashboard</h2>
            <Card>
              <CardHeader>
                <CardTitle>Welcome to Your Dashboard</CardTitle>
                <CardDescription>Manage your AI services and access exclusive features.</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="mb-4">You have access to the following features:</p>
                <Button>Go to Dashboard</Button>
              </CardContent>
            </Card>
          </section>
        )}
      </main>

      <footer className="text-center mt-8 text-muted-foreground">
        <p>&copy; 2024 AI Landing Hub. All rights reserved.</p>
      </footer>
    </div>
  );
}
