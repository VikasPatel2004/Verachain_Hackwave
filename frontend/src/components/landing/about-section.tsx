"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export function AboutSection() {
  return (
    <section id="about" className="py-20 md:py-28 bg-gradient-to-br from-background to-secondary/20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            Transforming Logistics with AI
          </h2>
          <p className="mt-4 max-w-3xl mx-auto text-xl text-muted-foreground">
            We're revolutionizing how businesses manage their supply chain risks through intelligent data analysis
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Mission Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="space-y-4">
              <h3 className="text-2xl md:text-3xl font-semibold text-foreground">
                Our Mission
              </h3>
              <p className="text-lg text-muted-foreground leading-relaxed">
                At VeraChain, we're dedicated to transforming logistics decision-making. 
                Our AI-powered platform provides actionable risk scores that help managers 
                confidently navigate land transportation and prevent disruptions before they occur.
              </p>
            </div>

            {/* Key Features */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="p-4 bg-primary/10 rounded-lg border border-primary/20"
              >
                <h4 className="font-semibold text-primary mb-2">Real-time Analytics</h4>
                <p className="text-sm text-muted-foreground">Instant risk assessment for every shipment</p>
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="p-4 bg-primary/10 rounded-lg border border-primary/20"
              >
                <h4 className="font-semibold text-primary mb-2">Predictive Insights</h4>
                <p className="text-sm text-muted-foreground">Anticipate and prevent potential delays</p>
              </motion.div>
            </div>
          </motion.div>

          {/* Logo/Image Section */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="flex items-center justify-center"
          >
            <div className="relative">
              <motion.div
                animate={{
                  rotate: [0, 5, -5, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
                className="absolute -inset-8 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-full blur-xl opacity-50"
              />
              <Image 
                src="/logo.png" 
                alt="VeraChain Logo" 
                width={400} 
                height={100} 
                className="relative z-10 rounded-lg shadow-2xl"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
