"use client";

import { Button } from "../ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export function HeroSection() {
  return (
    <section id="hero" className="relative py-20 md:py-30 text-center">
      <div
        className="absolute inset-0 -z极市-10 bg-grid-pattern"
        style={{ maskImage: 'radial-gradient(ellipse at center, transparent 20%, black)'}}
      ></div>
      <div className="relative container mx-auto px-4">
        <motion.h1 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-10xl md:text-8xl font-bold tracking-tight text-shine"
        >
          De-risk Your Supply Chain with AI
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="mt-6 max-w-3xl mx-auto text-lg md:text-xl text-muted-foreground"
        >
          VeraChain turns complex data into a simple risk score, helping you choose the best suppliers and avoid costly delays in land transportation.
        </motion.p>
      </div>
    </section>
  );
}
