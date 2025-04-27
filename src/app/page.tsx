"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Toaster } from "@/components/ui/toaster";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { cn } from "@/lib/utils";

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

const serviceUnits: Record<Service, string> = {
  text: "texts",
  image: "images",
  audio: "seconds",
  video: "seconds",
  model3d: "models",
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

  const sliderMaxValues: Record<Service, number> = {
    text: 1000,
    image: 200,
    audio: 60,
    video: 30,
    model3d: 10,
  };

  return (
    <div className="min-h-screen py-12 bg-secondary">
      <Toaster />
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold text-primary mb-2">AI Landing Hub</h1>
        <p className="text-muted-foreground text-lg">Your All-In-One AI Solution</p>
      </header>

      <main className="container mx-auto px-4">
        {/* Pricing Calculator Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-primary mb-4">Pricing Calculator</h2>
          <Card className="border-2 border-primary/20">
            <CardHeader>
              <CardTitle className="text-3xl font-bold">Customize Your AI Service Plan</CardTitle>
              <CardDescription className="text-muted-foreground text-lg">Adjust the sliders to match your needs and budget.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="table-responsive">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[150px] md:w-[200px] text-base md:text-lg">Service</TableHead>
                      <TableHead className="text-center text-base md:text-lg">Rate (BDT)</TableHead>
                      <TableHead className="text-center text-base md:text-lg">Count &amp; Adjust</TableHead>
                      <TableHead className="text-right w-[120px] md:w-[150px] text-base md:text-lg">Cost (BDT)</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {Object.entries(rates).map(([service, rate]) => (
                      <TableRow key={service}>
                        <TableCell className="font-medium text-sm md:text-lg">{serviceLabels[service as Service]}</TableCell>
                        <TableCell className="font-bold text-primary text-center text-sm md:text-lg">
                          {rate} BDT / {serviceUnits[service as Service]}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-4 justify-center">
                            <Slider
                              id={`${service}Slider`}
                              min={0}
                              max={sliderMaxValues[service as Service]}
                              step={service === "text" ? 10 : 1}
                              defaultValue={[serviceCounts[service as Service]]}
                              onValueChange={(value) => handleServiceCountChange(service as Service, value[0])}
                              className="w-32 md:w-48"
                            />
                            <span className={cn("font-medium w-24 text-right text-sm md:text-base", serviceCounts[service as Service] > 100 ? "text-sm" : "text-base")}>
                              {serviceCounts[service as Service]} {serviceUnits[service as Service]}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell className="text-right font-bold text-base md:text-xl" style={{ color: 'hsl(var(--cost-color))' }}>
                          {serviceCounts[service as Service] * rate} BDT
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                  <TableFooter>
                    <TableRow>
                      <TableCell colSpan={3} className="text-xl font-semibold">Total Cost</TableCell>
                      <TableCell className="text-right font-bold total-cost-text text-xl text-primary">
                        {totalPrice} BDT / mo
                      </TableCell>
                    </TableRow>
                  </TableFooter>
                </Table>
              </div>
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
