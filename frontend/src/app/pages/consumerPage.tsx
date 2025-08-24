"use client";

import React, { useState } from 'react';
import axios from 'axios';
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

const API_KEY = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;
const BACKEND_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3001";

const countries = [
  { value: "delhi", label: "Delhi" },
  { value: "tokyo", label: "Tokyo" },
  { value: "canberra", label: "Canberra" },
  { value: "luanda", label: "Luanda" },
];

const transportModes = [
  { value: "land", label: "Land" },
  { value: "sea", label: "Sea" },
];

const landCardData = [
  { name: 'Reliable Transports', cost: 550, rating: 6, reviews: 5, "data-ai-hint": "cargo truck" },
  { name: 'Speedy Logistics', cost: 650, rating: 4, reviews: 2, "data-ai-hint": "delivery van" },
  { name: 'Quick Haulers', cost: 480, rating: 8, reviews: 3, "data-ai-hint": "freight container" },
  { name: 'Safe Cargo Movers', cost: 520, rating: 7, reviews: 7, "data-ai-hint": "moving truck" },
];

const seaCardData = [
  { name: 'Oceanic Shipping Co.', cost: 680, rating: 5, reviews: 6, "data-ai-hint": "cargo ship" },
  { name: 'Maritime Logistics', cost: 720, rating: 9, reviews: 9, "data-ai-hint": "container ship" },
  { name: 'Blue Water Transport', cost: 590, rating: 3, reviews: 4, "data-ai-hint": "bulk carrier" },
  { name: 'Pacific Cargo Lines', cost: 630, rating: 7, reviews: 8, "data-ai-hint": "tanker ship" },
];

export default function ConsumerPage() {
  const [fromCountry, setFromCountry] = useState<string | null>(null);
  const [toCountry, setToCountry] = useState<string | null>(null);
  const [transportMode, setTransportMode] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [backendResponse, setBackendResponse] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleFromCountrySelect = (value: string) => {
    setFromCountry(value);
    setShowResult(false);
    setBackendResponse(null);
  };

  const handleToCountrySelect = (value: string) => {
    setToCountry(value);
    setShowResult(false);
    setBackendResponse(null);
  };

  const handleTransportModeSelect = (value: string) => {
    setTransportMode(value);
    setShowResult(false);
    setBackendResponse(null);
  };

  const handleAssessRisk = async () => {
    if (!toCountry || transportMode !== "sea") {
      alert("Please select a destination and ensure Sea transport is selected.");
      return;
    }

    setLoading(true);
    setShowResult(false);
    setBackendResponse(null);

    try {
      const response = await fetch(`${BACKEND_BASE_URL}/sea/assess`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ placeName: toCountry }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`API Error ${response.status}: ${errorText}`);
      }

      const data = await response.json();
      console.log("Gemini API Response:", data);
      setBackendResponse(data);
      setShowResult(true);
    } catch (error) {
      console.error('Error fetching Gemini assessment:', error);
      setShowResult(false);
      alert("Failed to fetch assessment. Check the console for details.");
    } finally {
      setLoading(false);
    }
  };

  const isFormComplete = fromCountry && toCountry && transportMode;

  const getCurrentCardData = () => {
    return transportMode === 'land' ? landCardData : seaCardData;
  };

  const renderGeminiAssessment = () => {
    if (!backendResponse?.geminiAssessment) return null;

    let parsedAssessment;
    try {
      parsedAssessment = JSON.parse(backendResponse.geminiAssessment);
    } catch {
      parsedAssessment = backendResponse.geminiAssessment;
    }

    return (
      <div className="w-full mt-4 bg-white rounded-lg shadow-md p-6 text-left space-y-4">
        <h2 className="text-2xl font-semibold text-shine">AI Risk Assessment</h2>
        <pre className="whitespace-pre-wrap break-words text-muted-foreground">
          {typeof parsedAssessment === 'string'
            ? parsedAssessment
            : JSON.stringify(parsedAssessment, null, 2)}
        </pre>
      </div>
    );
  };

  return (
    <div className="flex flex-col min-h-screen bg-secondary/30">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto text-center mb-10">
          <h1 className="text-4xl font-bold tracking-tight text-shine">VeraChain for Consumers</h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Select your transportation details to view available suppliers and their risk profiles.
          </p>
        </div>

        <div className="max-w-2xl mx-auto mb-12 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2 text-center">From Country</label>
            <Select onValueChange={handleFromCountrySelect}>
              <SelectTrigger className="w-full h-12 text-base">
                <SelectValue placeholder="Select from country..." />
              </SelectTrigger>
              <SelectContent>
                {countries.map(country => (
                  <SelectItem key={country.value} value={country.value} className="text-base">
                    {country.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-center">To Country</label>
            <Select onValueChange={handleToCountrySelect}>
              <SelectTrigger className="w-full h-12 text-base">
                <SelectValue placeholder="Select to country..." />
              </SelectTrigger>
              <SelectContent>
                {countries.map(country => (
                  <SelectItem key={country.value} value={country.value} className="text-base">
                    {country.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-center">Transport Mode</label>
            <Select onValueChange={handleTransportModeSelect}>
              <SelectTrigger className="w-full h-12 text-base">
                <SelectValue placeholder="Select mode..." />
              </SelectTrigger>
              <SelectContent>
                {transportModes.map(mode => (
                  <SelectItem key={mode.value} value={mode.value} className="text-base">
                    {mode.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {isFormComplete && (
          <div className="flex flex-col items-center gap-12">
            <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 justify-center">
              {getCurrentCardData().map((card, index) => (
                <InfoCard
                  key={index}
                  name={card.name}
                  cost={card.cost}
                  rating={card.rating}
                  reviews={card.reviews}
                />
              ))}
            </div>

            <Button
              size="lg"
              className="px-10 py-6 text-lg"
              onClick={handleAssessRisk}
              disabled={loading}
            >
              {loading ? 'Assessing...' : 'Assess Risk'}
            </Button>

            {showResult && renderGeminiAssessment()}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
