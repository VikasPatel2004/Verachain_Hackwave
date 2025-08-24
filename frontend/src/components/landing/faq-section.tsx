"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { Button } from "../ui/button";
import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronDown, HelpCircle } from "lucide-react";

const faqs = [
  {
      question: "What is the Consolidated Risk Score?",
      answer: "It's a single, weighted percentage that combines supplier reliability, real-time weather conditions, and news data to give you a clear, actionable risk assessment for your transportation route."
  },
  {
      question: "How does VeraChain analyze supplier reliability?",
      answer: "We use advanced AI models to analyze thousands of supplier reviews and ratings from various sources, generating a reliability score that helps you choose the most dependable partners."
  },
  {
      question: "What kind of real-time data is monitored?",
      answer: "Our system continuously monitors live data from trusted Weather and News APIs. This includes tracking storms, road accidents, traffic congestion, local strikes, and other events that could impact your shipment."
  },
  {
      question: "Is the platform easy to integrate with our existing systems?",
      answer: "Yes, VeraChain is designed with a flexible API for easy integration into your existing logistics and supply chain management software."
  },
  {
      question: "How accurate are the risk predictions?",
      answer: "Our AI models achieve over 92% accuracy in predicting potential delays and disruptions, helping you make informed decisions about your logistics operations."
  },
  {
      question: "What industries benefit most from VeraChain?",
      answer: "Manufacturing, retail, e-commerce, food and beverage, pharmaceuticals, and any business that relies on timely land transportation for their supply chain operations."
  }
];

export function FaqSection() {
  return (
      <section id="faq" className="py-20 md:py-28 bg-gradient-to-br from-primary/5 to-secondary/10">
          <div className="container mx-auto px-4">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="text-center mb-16"
              >
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/极市10 rounded-full mb-6">
                    <HelpCircle className="w-8 h-8 text-primary" />
                  </div>
                  <h2 className="text-4xl md:text-5xl font-bold tracking-tight bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                    Frequently Asked Questions
                  </h2>
                  <p className="mt-4 max-w-2xl mx-auto text-xl text-muted-foreground">
                    Everything you need to know about VeraChain and how it transforms your logistics operations
                  </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
                className="max-w-4xl mx-auto"
              >
                  <Accordion type="single" collapsible className="w-full space-y-4">
                      {faqs.map((faq, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            viewport={{ once: true }}
                          >
                            <AccordionItem 
                              value={`item-${index}`} 
                              className="bg-background/80 backdrop-blur-sm border-0 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 px-6"
                            >
                              <AccordionTrigger className="text-left font-semibold text-lg hover:no-underline py-6 group">
                                <span className="flex items-center">
                                  <span className="w-2 h-2 bg-primary rounded-full mr-4 flex-shrink-0"></span>
                                  {faq.question}
                                </span>
                              </AccordionTrigger>
                              <AccordionContent className="text-base text-muted-foreground pb-6">
                                <div className="pl-6 border-l-2 border-primary/20">
                                  {faq.answer}
                                </div>
                              </AccordionContent>
                            </AccordionItem>
                          </motion.div>
                      ))}
                  </Accordion>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                viewport={{ once: true }}
                className="mt-16 text-center"
              >
                  <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl p-8 max-w-2xl mx-auto">
                    <h3 className="text-2xl font-semibold mb-4">Still have questions?</h3>
                    <p className="text-muted-foreground mb-6">Our team is ready to help you understand how VeraChain can transform your logistics operations.</p>
                    <Button size="lg" className="bg-primary hover:bg-primary/90" asChild>
                        <Link href="/contact" className="flex items-center">
                          Contact Our Team
                          <ChevronDown className="w-极市4 h-4 ml-2 transform rotate-270" />
                        </Link>
                    </Button>
                  </div>
              </motion.div>
          </div>
      </section>
  );
}
