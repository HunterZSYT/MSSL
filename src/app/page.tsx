"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Toaster } from "@/components/ui/toaster";
import { Separator } from "@/components/ui/separator";
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
            <CardContent className="space-y-4">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[200px]">Service</TableHead>
                    <TableHead>Count</TableHead>
                    <TableHead>Rate (BDT)</TableHead>
                    <TableHead>Cost (BDT)</TableHead>
                    <TableHead>Adjust</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {Object.entries(rates).map(([service, rate]) => (
                    <TableRow key={service}>
                      <TableCell className="font-medium">{serviceLabels[service as Service]}</TableCell>
                      <TableCell>{serviceCounts[service as Service]}</TableCell>
                      <TableCell>{rate}</TableCell>
                      <TableCell>{serviceCounts[service as Service] * rate}</TableCell>
                      <TableCell>
                        <Slider
                          id={`${service}Slider`}
                          min={0}
                          max={service === "text" ? 1000 : 200}
                          step={service === "text" ? 10 : 5}
                          defaultValue={[serviceCounts[service as Service]]}
                          onValueChange={(value) => handleServiceCountChange(service as Service, value[0])}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
                <TableFooter>
                  <TableRow>
                    <TableCell colSpan={3}>Total Cost</TableCell>
                    <TableCell className="font-bold">{totalPrice} BDT / mo</TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                </TableFooter>
              </Table>
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
