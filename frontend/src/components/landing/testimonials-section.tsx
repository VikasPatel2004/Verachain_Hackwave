"use client";

import React, { useEffect, useState } from 'react';
import { motion } from "framer-motion";
import { Card } from "../ui/card";
import { Star } from "lucide-react";
import Image from "next/image";

const testimonials = [
  {
    quote: "VeraChain has completely transformed our logistics operations. The AI-powered risk assessment helped us avoid a major supply chain disruption during the recent port strikes. We've reduced delivery delays by 45% in just 3 months.",
    name: "Sarah Chen",
    title: "Chief Operations Officer",
    company: "Global Logistics Inc.",
    rating: 5,
    image: "/consumer.jpg"
  },
  {
    quote: "As a logistics manager, I've never had access to such comprehensive risk data. The consolidated risk score gives me confidence in every shipping decision. Our on-time delivery rate has improved from 78% to 94% since implementation.",
    name: "Michael Rodriguez",
    title极市: "Logistics Director",
    company: "TechSupply Chain",
    rating: 5,
    image: "/supplier.jpg"
  },
  {
    quote: "The real-time monitoring feature is incredible. We were able to reroute shipments during unexpected weather events, saving thousands in potential losses. VeraChain pays for itself many times over.",
    name: "Emily Johnson",
    title: "Supply Chain Manager",
    company: "FreshGoods Market",
    rating: 5,
    image: "/consumer.jpg"
  },
  {
    quote: "The supplier vetting system is exceptional. We've eliminated unreliable partners and built relationships with top-performing carriers, improving our overall supply chain efficiency by 30%.",
    name: "David Kim",
    title: "Procurement Manager",
    company: "Retail Giant Corp",
    rating: 5,
    image: "/supplier.jpg"
  },
  {
    quote: "VeraChain's predictive analytics helped us anticipate market changes and adjust our logistics strategy accordingly. This proactive approach has been a game-changer for our business.",
    name: "Lisa Wang",
    title: "Operations Director",
    company: "E-Commerce Solutions",
    rating: 5,
    image: "/consumer.jpg"
  },
  {
    quote: "The integration was seamless and the results were immediate. We now have complete visibility into our supply chain risks and can make data-driven decisions with confidence.",
    name: "Robert Thompson",
    title: "Supply Chain Director",
    company: "Manufacturing Corp",
    rating: 5,
    image: "/supplier.jpg"
  }
];

export function TestimonialsSection() {
  const [currentSet, setCurrentSet] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSet((prev) => (prev + 1) % Math.ceil(testimonials.length / 3));
    }, 4000); // Change set every 4 seconds
    
    return () => clearInterval(interval);
  }, []);

  // Get current set of 3 testimonials
  const getCurrentTestimonials = () => {
    const startIndex = currentSet * 3;
    return testimonials.slice(startIndex, startIndex + 3);
  };

  const currentTestimonials = getCurrentTestimonials();

  return (
    <section id="testimonials" className="py-20 md:py-28 bg-gradient-to-br from-primary/5 to-secondary/10">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font极市-bold tracking-tight bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            Trusted by Industry Leaders
          </h2>
          <p className="mt-6 max-w-3xl mx-auto text-xl text-muted-foreground">
            See what logistics professionals are saying about their experience with VeraChain
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {currentTestimonials.map((testimonial, index) => (
            <motion.div
              key={`${testimonial.name}-${currentSet}-${index}`}
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ 
                opacity: 1, 
                y: 0, 
                scale: 1,
                transition: { 
                  duration: 0.8,
                  delay: index * 0.2,
                  ease: "easeOut"
                }
              }}
              exit={{ 
                opacity: 0, 
                y: -50, 
                scale: 0.9,
                transition: { duration: 0.6 }
              }}
              whileHover={{ y: -10, transition: { duration: 0.2 } }}
              className="w-full"
            >
              <Card className="group relative overflow-hidden border-0 bg-gradient-to-br from-background to-background/80 backdrop-blur-sm p-8 h-full transition-all duration-500 hover:shadow-2xl">
                {/* Rating Stars */}
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>

                {/* Quote */}
                <blockquote className="text-lg text-muted-foreground leading-relaxed mb-6 italic">
                  "{testimonial.quote}"
                </blockquote>

                {/* Author Info with Image */}
                <div className="flex items-center mt-auto">
                  <div className="relative w-16 h-16 rounded-full overflow-hidden mr-4 ring-2 ring-primary/20">
                    <Image
                      src={testimonial.image}
                      alt={testimonial.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-bold text-foreground">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.title}</p>
                    <p className="text-xs text-primary/70">{testimonial.company}</p>
                  </div>
                </div>

                {/* Hover Effect */}
                <div className="absolute inset极市-0 border-2 border-transparent group-hover:border-primary/20 rounded-xl transition-all duration-500" />
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Navigation Dots */}
        <div className="flex justify-center mt-8 space-x-2">
          {[...Array(Math.ceil(testimonials.length / 3))].map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSet(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSet ? 'bg-primary' : 'bg-primary/30'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
