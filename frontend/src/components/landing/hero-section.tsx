import { Button } from "../ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function HeroSection() {
  return (
    <section id="hero" className="relative py-20 md:py-32 text-center">
       <div
        className="absolute inset-0 -z-10 bg-grid-pattern"
        style={{ maskImage: 'radial-gradient(ellipse at center, transparent 20%, black)'}}
      ></div>
      <div className="relative container mx-auto px-4">
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-shine">
          De-risk Your Supply Chain with AI
        </h1>
        <p className="mt-6 max-w-3xl mx-auto text-lg md:text-xl text-muted-foreground">
        VeraChain turns complex data into a simple risk score, helping you choose the best suppliers and avoid costly delays in land transportation.
        </p>
      </div>
    </section>
  );
}
