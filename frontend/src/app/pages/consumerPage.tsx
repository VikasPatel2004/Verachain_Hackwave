"use client";

import React, { useState } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { Button } from "../../components/ui/button";
import { InfoCard } from "../../components/info-card";
import { Header } from '../../components/landing/header';
import { Footer } from '../../components/landing/footer';
import { ResultComponent } from '../../components/result-component';

const transportationRoutes = [
    { value: "route1", label: "Mumbai to Delhi" },
    { value: "route2", label: "Delhi to Bangalore" },
    { value: "route3", label: "Bangalore to Chennai" },
    { value: "route4", label: "Chennai to Kolkata" },
    { value: "route5", label: "Kolkata to Mumbai" },
];

const cardData = [
  {
    name: 'Reliable Transports',
    cost: 50000,
    rating: 1,
    reviews: 5,
    "data-ai-hint": "cargo truck"
  },
  {
    name: 'Speedy Logistics',
    cost: 55000,
    rating: 3,
    reviews: 1,
     "data-ai-hint": "delivery van"
  },
  {
    name: 'Quick Haulers',
    cost: 48000,
    rating: 7,
    reviews: 3,
     "data-ai-hint": "freight container"
  },
  {
    name: 'Safe Cargo Movers',
    cost: 52000,
    rating: 9,
    reviews: 2,
     "data-ai-hint": "moving truck"
  },
];

export default function ConsumerPage() {
  const [selectedRoute, setSelectedRoute] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);

  const handleRouteSelect = (value: string) => {
    setSelectedRoute(value);
    setShowResult(false);
  };
  
  const handleAssessRisk = () => {
    setShowResult(true);
  };

  return (
    <div className="flex flex-col min-h-screen bg-secondary/30">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-12">
            <div className="max-w-2xl mx-auto text-center mb-10">
                <h1 className="text-4xl font-bold tracking-tight text-shine">VeraChain for Consumers</h1>
                <p className="mt-4 text-lg text-muted-foreground">
                    Select your transportation route to view available suppliers and their risk profiles.
                </p>
            </div>
            
            <div className="max-w-lg mx-auto mb-12">
                 <Select onValueChange={handleRouteSelect}>
                    <SelectTrigger className="w-full h-12 text-base">
                        <SelectValue placeholder="Select a route..." />
                    </SelectTrigger>
                    <SelectContent>
                        {transportationRoutes.map(route => (
                            <SelectItem key={route.value} value={route.value} className="text-base">
                                {route.label}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            {selectedRoute && (
                <div className="flex flex-col items-center gap-12">
                    <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 justify-center">
                        {cardData.map((card, index) => (
                            <InfoCard
                                key={index}
                                name={card.name}
                                cost={card.cost}
                                rating={card.rating}
                                reviews={card.reviews}
                            />
                        ))}
                    </div>
                    <Button size="lg" className="px-10 py-6 text-lg" onClick={handleAssessRisk}>
                        Assess Risk
                    </Button>

                    {showResult && (
                      <div className="w-full mt-4">
                        <ResultComponent 
                          result={78} 
                          description="This score combines supplier reliability, real-time weather, and news data for a comprehensive risk assessment."
                        />
                      </div>
                    )}
                </div>
            )}
        </main>
        <Footer />
    </div>
  );
}
