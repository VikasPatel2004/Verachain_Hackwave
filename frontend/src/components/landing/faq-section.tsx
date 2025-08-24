import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { Button } from "../ui/button";
import Link from "next/link";

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
];

export function FaqSection() {
  return (
      <section id="faq" className="py-20 md:py-28">
          <div className="container mx-auto px-4">
              <div className="text-center mb-12">
                  <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Frequently Asked Questions</h2>
              </div>
              <div className="max-w-3xl mx-auto">
                  <Accordion type="single" collapsible className="w-full space-y-4">
                      {faqs.map((faq, index) => (
                          <AccordionItem value={`item-${index}`} key={index} className="bg-secondary/50 rounded-lg px-6">
                              <AccordionTrigger className="text-left font-semibold text-lg hover:no-underline">
                                  {faq.question}
                              </AccordionTrigger>
                              <AccordionContent className="text-base text-muted-foreground">
                                  {faq.answer}
                              </AccordionContent>
                          </AccordionItem>
                      ))}
                  </Accordion>
              </div>
              <div className="mt-12 text-center">
                  <h3 className="text-xl font-semibold mb-2">Still have questions?</h3>
                  <p className="text-muted-foreground mb-4">Contact us for more information.</p>
                  <Button asChild>
                      <Link href="/contact">Contact Us</Link>
                  </Button>
              </div>
          </div>
      </section>
  );
}
