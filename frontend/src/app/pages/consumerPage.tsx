"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { Button } from "../../components/ui/button";
import { InfoCard } from "../../components/info-card";
import { Header } from "../../components/landing/header";
import { Footer } from "../../components/landing/footer";
import { useAuth } from "../../hooks/auth-context";
import { Info } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../../components/ui/tooltip";

const BACKEND_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3001";

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
  {
    name: "Reliable Transports",
    cost: 550,
    rating: 6,
    reviews: 5,
    riskScore: 25,
  },
  {
    name: "Speedy Logistics",
    cost: 650,
    rating: 4,
    reviews: 2,
    riskScore: 45,
  },
  {
    name: "Quick Haulers",
    cost: 480,
    rating: 8,
    reviews: 3,
    riskScore: 10,
  },
  {
    name: "Safe Cargo Movers",
    cost: 520,
    rating: 7,
    reviews: 7,
    riskScore: 30,
  },
];

const seaCardData = [
  { name: "Oceanic Shipping Co.", cost: 680, rating: 5, reviews: 6 },
  { name: "Maritime Logistics", cost: 720, rating: 9, reviews: 9 },
  { name: "Blue Water Transport", cost: 590, rating: 3, reviews: 4 },
  { name: "Pacific Cargo Lines", cost: 630, rating: 7, reviews: 8 },
];

export default function ConsumerPage() {
  const { user, isLoading: authLoading } = useAuth();
  const router = useRouter();
  const [fromCountry, setFromCountry] = useState<string | null>(null);
  const [toCountry, setToCountry] = useState<string | null>(null);
  const [transportMode, setTransportMode] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [backendResponse, setBackendResponse] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/login");
    }
  }, [user, authLoading, router]);

  if (authLoading) {
    return (
      <div className="flex flex-col min-h-screen bg-secondary/30">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-12 flex items-center justify-center">
          <div className="text-center">
            <p className="text-lg text-muted-foreground">Loading...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!user) {
    return null;
  }

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
    if (transportMode === "sea") {
      if (!toCountry) {
        alert(
          "Please select a destination and ensure Sea transport is selected."
        );
        return;
      }

      setLoading(true);
      setShowResult(false);
      setBackendResponse(null);

      try {
        const response = await fetch(`${BACKEND_BASE_URL}/sea/assess`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ placeName: toCountry }),
        });

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`API Error ${response.status}: ${errorText}`);
        }

        const data = await response.json();
        console.log("Backend /sea/assess Response:", data);
        setBackendResponse(data);
        setShowResult(true);
      } catch (error) {
        console.error("Error fetching Gemini assessment:", error);
        setShowResult(false);
        alert("Failed to fetch assessment. Check the console for details.");
      } finally {
        setLoading(false);
      }
    }

    if (transportMode === "land") {
      if (!fromCountry || !toCountry) {
        alert("Please select both source and destination for Land transport.");
        return;
      }

      setLoading(true);
      setShowResult(false);
      setBackendResponse(null);

      try {
        const response = await fetch(
          `${BACKEND_BASE_URL}/suppliers/risk-analysis`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              locationA: fromCountry,
              locationB: toCountry,
            }),
          }
        );

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`API Error ${response.status}: ${errorText}`);
        }

        const data = await response.json();
        console.log("Backend /land/assess Response:", data);
        setBackendResponse(data);
        setShowResult(true);
      } catch (error) {
        console.error("Error fetching Land assessment:", error);
        setShowResult(false);
        alert("Failed to fetch land assessment. Check console for details.");
      } finally {
        setLoading(false);
      }
    }
  };

  const isFormComplete = fromCountry && toCountry && transportMode;

  const bestSupplier =
    transportMode === "land"
      ? landCardData.reduce((prev, curr) =>
          curr.riskScore < prev.riskScore ? curr : prev
        )
      : null;

  return (
    <div className="flex flex-col min-h-screen bg-secondary/30">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto text-center mb-10">
          <h1 className="text-4xl font-bold tracking-tight text-shine">
            VeraChain for Consumers
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Select your transportation details to view available suppliers and
            their risk profiles.
          </p>
        </div>

        {/* Form Section */}
        <div className="max-w-2xl mx-auto mb-12 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2 text-center">
              From City
            </label>
            <Select onValueChange={handleFromCountrySelect}>
              <SelectTrigger className="w-full h-12 text-base">
                <SelectValue placeholder="Select from city..." />
              </SelectTrigger>
              <SelectContent>
                {countries.map((country) => (
                  <SelectItem
                    key={country.value}
                    value={country.value}
                    className="text-base"
                  >
                    {country.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-center">
              To City
            </label>
            <Select onValueChange={handleToCountrySelect}>
              <SelectTrigger className="w-full h-12 text-base">
                <SelectValue placeholder="Select to city..." />
              </SelectTrigger>
              <SelectContent>
                {countries.map((country) => (
                  <SelectItem
                    key={country.value}
                    value={country.value}
                    className="text-base"
                  >
                    {country.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-center">
              Transport Mode
            </label>
            <Select onValueChange={handleTransportModeSelect}>
              <SelectTrigger className="w-full h-12 text-base">
                <SelectValue placeholder="Select mode..." />
              </SelectTrigger>
              <SelectContent>
                {transportModes.map((mode) => (
                  <SelectItem
                    key={mode.value}
                    value={mode.value}
                    className="text-base"
                  >
                    {mode.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {transportMode && (
          <div className="flex justify-center mb-8">
            <Button
              size="lg"
              className="px-10 py-6 text-lg"
              onClick={handleAssessRisk}
              disabled={loading || !isFormComplete}
            >
              {loading ? "Assessing..." : "Get Access"}
            </Button>
          </div>
        )}

        {showResult && backendResponse && (
          <div className="flex flex-col items-center gap-12">
            {/* Show Sea Assessment Report only */}
            {transportMode === "sea" && (
              <div className="risk-assessment-card bg-white shadow-lg rounded-lg p-6 w-full max-w-3xl mx-auto">
                <h2 className="text-2xl font-bold mb-4">Assessment Report</h2>
                <div className="flex items-center gap-4 mb-4">
                  <div>
                    <p className="text-lg font-semibold">
                      {backendResponse.riskLevel}
                    </p>
                  </div>
                </div>
                <div className="bg-gray-50 rounded-md p-4 text-left">
                  <h3 className="text-lg font-semibold mb-2">
                    Detailed Assessment:
                  </h3>
                  <pre className="whitespace-pre-wrap break-words text-gray-700">
                    {(() => {
                      try {
                        return JSON.parse(backendResponse.geminiAssessment);
                      } catch {
                        return backendResponse.geminiAssessment;
                      }
                    })()}
                  </pre>
                </div>
              </div>
            )}

            {/* Land suppliers styled with risk % */}
            {transportMode === "land" && (
              <div className="w-full max-w-6xl">
                <h2 className="text-2xl font-bold mb-6 text-center">
                  Suggested Suppliers
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 justify-center">
                  {landCardData.map((card, index) => (
                    <div
                      key={index}
                      className="rounded-2xl shadow-md hover:shadow-lg transition"
                    >
                      <div className="bg-gradient-to-r from-purple-400 to-purple-600 p-6 rounded-t-2xl text-white font-semibold text-lg text-center">
                        {card.name}
                      </div>
                      <div className="p-4">
                        <p className="text-2xl font-bold mb-2">${card.cost}</p>
                        <div className="flex items-center text-sm text-gray-600 mb-2">
                          <span
                            className={`font-semibold flex items-center ${
                              card.rating >= 7
                                ? "text-green-600"
                                : card.rating <= 3
                                ? "text-red-600"
                                : "text-orange-500"
                            }`}
                          >
                            ★ {card.rating}/10
                          </span>
                          <span className="ml-4">{card.reviews} Reviews</span>
                        </div>

                        {/* Risk Score + Tooltip */}
                        <div className="flex items-center justify-between text-sm mt-3">
                          <span className="font-medium text-gray-700">
                            Risk: {card.riskScore}%
                          </span>
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger>
                                <Info className="w-4 h-4 text-gray-500 cursor-pointer" />
                              </TooltipTrigger>
                              <TooltipContent className="max-w-xs text-sm">
  Risk % represents the likelihood of delays or issues with this supplier,
  based on factors like cost, rating, customer reviews, and current weather conditions.
</TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Best Supplier */}
                {bestSupplier && (
                  <div className="mt-12 text-center">
                    <h2 className="text-2xl font-bold mb-6">
                      🌟 The Best Supplier Is
                    </h2>
                    <div className="flex justify-center">
                      <div className="rounded-2xl shadow-md hover:shadow-lg transition w-72">
                        <div className="bg-gradient-to-r from-purple-400 to-purple-600 p-6 rounded-t-2xl text-white font-semibold text-lg text-center">
                          {bestSupplier.name}
                        </div>
                        <div className="p-4">
                          <p className="text-2xl font-bold mb-2">
                            ${bestSupplier.cost}
                          </p>
                          <div className="flex items-center text-sm text-gray-600 mb-2">
                            <span
                              className={`font-semibold flex items-center ${
                                bestSupplier.rating >= 7
                                  ? "text-green-600"
                                  : bestSupplier.rating <= 3
                                  ? "text-red-600"
                                  : "text-orange-500"
                              }`}
                            >
                              ★ {bestSupplier.rating}/10
                            </span>
                            <span className="ml-4">
                              {bestSupplier.reviews} Reviews
                            </span>
                          </div>
                          <div className="flex items-center justify-between text-sm mt-3">
                            <span className="font-medium text-gray-700">
                              Risk: {bestSupplier.riskScore}%
                            </span>
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger>
                                  <Info className="w-4 h-4 text-gray-500 cursor-pointer" />
                                </TooltipTrigger>
                                <TooltipContent className="max-w-xs text-sm">
  Risk % represents the likelihood of delays or issues with this supplier,
  based on factors like cost, rating, customer reviews, and current weather conditions.
</TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Sea suppliers remain unchanged */}
            {transportMode === "sea" && (
              <div className="w-full max-w-6xl">
                <h2 className="text-2xl font-bold mb-6 text-center">
                  Suggested Suppliers
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 justify-center">
                  {seaCardData.map((card, index) => (
                    <InfoCard
                      key={index}
                      name={card.name}
                      cost={card.cost}
                      rating={card.rating}
                      reviews={card.reviews}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
