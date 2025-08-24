"use client";

import React, { useEffect, useState } from 'react';
import { Card, CardContent } from "../ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "../ui/carousel";

const testimonials = [
  {
    quote: "VeraChain has transformed our logistics. The consolidated risk score is a game-changer for our decision-making process.",
    name: "Priya Sharma",
    title: "Logistics Manager, ShipCorp",
    emoji: "👩‍💼"
  },
  {
    quote: "The real-time monitoring feature saved us from a major disruption during a strike. Invaluable service!",
    name: "Rajesh Kumar",
    title: "Supply Chain Director, Global Goods",
    emoji: "👨‍💻"
  },
  {
    quote: "Finally, a tool that provides clear, actionable data for transportation risk. Highly recommended for any logistics professional.",
    name: "Anjali Singh",
    title: "Operations Head, Freightify",
    emoji: "👩‍🔬"
  },
   {
    quote: "We've seen a significant reduction in delays since we started using VeraChain. The supplier vetting is top-notch.",
    name: "Vikram Patel",
    title: "CEO, QuickHaul",
    emoji: "👨‍💼"
  }
];

export function TestimonialsSection() {
  const [api, setApi] = useState<CarouselApi>();

  useEffect(() => {
    if (!api) {
      return;
    }

    const interval = setInterval(() => {
      if (api.canScrollNext()) {
        api.scrollNext();
      } else {
        api.scrollTo(0);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [api]);

  return (
    <section id="testimonials" className="py-20 md:py-28 bg-secondary/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Client Testimonials</h2>
        </div>
        <Carousel
          setApi={setApi}
          className="w-full max-w-4xl mx-auto"
          opts={{
            loop: true,
          }}
        >
          <CarouselContent>
            {testimonials.map((testimonial, index) => (
              <CarouselItem key={index}>
                <div className="p-1">
                  <Card className="bg-background">
                    <CardContent className="flex flex-col items-center justify-center p-8 md:p-12 text-center min-h-[320px]">
                      <div className="w-20 h-20 mb-4 rounded-full flex items-center justify-center bg-primary/10 ring-4 ring-primary/20">
                        <span className="text-4xl">{testimonial.emoji}</span>
                      </div>
                      <blockquote className="text-lg md:text-xl font-medium mb-4">
                        “{testimonial.quote}”
                      </blockquote>
                      <div className="mt-auto text-center">
                        <p className="font-bold">{testimonial.name}</p>
                        <p className="text-sm text-muted-foreground">{testimonial.title}</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden sm:inline-flex" />
          <CarouselNext className="hidden sm:inline-flex" />
        </Carousel>
      </div>
    </section>
  );
}
