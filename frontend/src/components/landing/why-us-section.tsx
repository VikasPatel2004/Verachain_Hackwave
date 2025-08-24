"use client";

import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardDescription } from "../ui/card";
import { ShieldCheck, TrendingUp, Clock, ArrowRight } from "lucide-react";

const features = [
    {
        icon: <ShieldCheck className="w-10 h-10" />,
        title: "Supplier Vetting",
        description: "Analyze supplier reviews and ratings using AI to determine reliability and ensure you work with the best.",
        gradient: "from-blue-500 to-purple-600"
    },
    {
        icon: <TrendingUp className="w-10 h-10" />,
        title: "Consolidated Risk Score",
        description: "We combine supplier, weather, and news data into a single, weighted percentage for clear, actionable insights.",
        gradient: "from-green-500 to-teal-600"
    },
    {
        icon: <Clock className="w-10 h-10" />,
        title: "Real-Time Monitoring",
        description: "Gather live data from weather and news APIs to assess route-specific risks like storms, accidents, or strikes.",
        gradient: "from-orange-500 to-red-600"
    }
];

export function WhyUsSection() {
    return (
        <section id="features" className="py-20 md:py-28 bg-gradient-to-br from-background to-secondary/10">
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-bold tracking-tight bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                        Why Choose VeraChain?
                    </h2>
                    <p className="mt-6 max-w-3xl mx-auto text-xl text-muted-foreground">
                        Our AI-powered platform transforms complex logistics data into simple, actionable insights
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: index * 0.2 }}
                            viewport={{ once: true }}
                            whileHover={{ y: -10 }}
                        >
                            <Card className="group relative overflow-hidden border-0 bg-gradient-to-br from-card to-card/80 backdrop-blur-sm p-8 h-full transition-all duration-500 hover:shadow-2xl">
                                {/* Gradient Background Effect */}
                                <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
                                
                                {/* Icon Container */}
                                <motion.div
                                    whileHover={{ scale: 1.1, rotate: 5 }}
                                    className="mb-6 bg-gradient-to-br from-primary/20 to-primary/10 p-4 rounded-2xl w-16 h-16 flex items-center justify-center"
                                >
                                    <div className="text-primary">
                                        {feature.icon}
                                    </div>
                                </motion.div>

                                {/* Content */}
                                <CardHeader className="p-0">
                                    <CardTitle className="text-2xl font-bold text-foreground mb-4">
                                        {feature.title}
                                    </CardTitle>
                                </CardHeader>
                                
                                <CardDescription className="text-lg text-muted-foreground leading-relaxed mb-6">
                                    {feature.description}
                                </CardDescription>

                                {/* Learn More Arrow */}
                                <motion.div
                                    initial={{ opacity: 0, x: -10 }}
                                    whileHover={{ opacity: 1, x: 0 }}
                                    className="flex items-center text-primary font-semibold text-sm"
                                >
                                    <span className="mr-2">Learn more</span>
                                    <ArrowRight className="w-4 h-4" />
                                </motion.div>

                                {/* Hover Border Effect */}
                                <div className="absolute inset-0 border-2 border-transparent group-hover:border-primary/20 rounded-xl transition-all duration-500" />
                            </Card>
                        </motion.div>
                    ))}
                </div>

                {/* Stats Banner */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    viewport={{ once: true }}
                    className="mt-16 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl p-8 text-center"
                >
                </motion.div>
            </div>
        </section>
    );
}
