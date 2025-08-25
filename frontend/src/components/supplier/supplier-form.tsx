"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState } from "react";
import { motion } from "framer-motion";

import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { useToast } from "../../hooks/use-toast";
import { CheckCircle, Truck, Building, MapPin, Phone, Package, Clock } from "lucide-react";

const formSchema = z.object({
  supplierName: z.string().min(2, "Supplier name must be at least 2 characters."),
  location: z.string().min(2, "Location is required."),
  contact: z.string().min(10, "Contact number must be at least 10 digits."),
  serviceCategory: z.string().min(2, "Service category is required."),
  volumeDistributing: z.string().min(1, "Volume is required"),
  deliveryLeadTimes: z.string().min(2, "Delivery lead time is required."),
});

export function SupplierForm() {
    const { toast } = useToast();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            supplierName: "",
            location: "",
            contact: "",
            serviceCategory: "",
            volumeDistributing: "",
            deliveryLeadTimes: "",
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setIsSubmitting(true);
        
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        console.log(values);
        setIsSubmitting(false);
        setIsSubmitted(true);
        
        toast({
            title: "Profile Created Successfully!",
            description: "Your supplier profile has been created successfully.",
        });
        
        // Reset form after 3 seconds
        setTimeout(() => {
            form.reset();
            setIsSubmitted(false);
        }, 3000);
    }

    if (isSubmitted) {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="text-center space-y-6 py-12"
            >
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto" />
                <h3 className="text-2xl font-semibold text-foreground">Profile Created!</h3>
                <p className="text-muted-foreground">Your supplier profile has been created successfully.</p>
            </motion.div>
        );
    }
  
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
        >
            <Card className="border-0 shadow-xl bg-gradient-to-br from-background to-secondary/50 backdrop-blur-sm">
                <CardHeader className="text-center pb-6">
                    <motion.div
                        initial={{ scale: 0.9 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.5 }}
                        className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4"
                    >
                        <Truck className="w-8 h-8 text-primary" />
                    </motion.div>
                    <CardTitle className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                        Create Supplier Profile
                    </CardTitle>
                    <CardDescription className="text-lg">
                        Fill in the details below to create your supplier profile and start connecting with customers.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.6, delay: 0.1 }}
                            >
                                <FormField
                                    control={form.control}
                                    name="supplierName"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="flex items-center gap-2 text-base font-semibold">
                                                <Building className="w-4 h-4" />
                                                Supplier Name
                                            </FormLabel>
                                            <FormControl>
                                                <Input 
                                                    placeholder="e.g. Reliable Transports" 
                                                    {...field} 
                                                    className="h-12 text-lg border-2 border-primary/20 focus:border-primary transition-colors"
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                            >
                                <FormField
                                    control={form.control}
                                    name="location"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="flex items-center gap-2 text-base font-semibold">
                                                <MapPin className="w-4 h-4" />
                                                Location
                                            </FormLabel>
                                            <FormControl>
                                                <Input 
                                                    placeholder="e.g. Mumbai, India" 
                                                    {...field} 
                                                    className="h-12 text-lg border-2 border-primary/20 focus:border-primary transition-colors"
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.6, delay: 0.3 }}
                            >
                                <FormField
                                    control={form.control}
                                    name="contact"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="flex items-center gap-2 text-base font-semibold">
                                                <Phone className="w-4 h-4" />
                                                Contact
                                            </FormLabel>
                                            <FormControl>
                                                <Input 
                                                    placeholder="e.g. +91 98765 43210" 
                                                    {...field} 
                                                    className="h-12 text-lg border-2 border-primary/20 focus:border-primary transition-colors"
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.6, delay: 0.4 }}
                            >
                                <FormField
                                    control={form.control}
                                    name="serviceCategory"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="flex items-center gap-2 text-base font-semibold">
                                                <Truck className="w-4 h-4" />
                                                Service Category
                                            </FormLabel>
                                            <FormControl>
                                                <Input 
                                                    placeholder="e.g. Long-haul freight" 
                                                    {...field} 
                                                    className="h-12 text-lg border-2 border-primary/20 focus:border-primary transition-colors"
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.6, delay: 0.5 }}
                            >
                                <FormField
                                    control={form.control}
                                    name="volumeDistributing"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="flex items-center gap-2 text-base font-semibold">
                                                <Package className="w-4 h-4" />
                                                Volume Distributing (per month)
                                            </FormLabel>
                                            <FormControl>
                                                <Input 
                                                    type="number" 
                                                    placeholder="e.g. 1000" 
                                                    {...field} 
                                                    className="h-12 text-lg border-2 border-primary/20 focus:border-primary transition-colors"
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.6, delay: 0.6 }}
                            >
                                <FormField
                                    control={form.control}
                                    name="deliveryLeadTimes"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="flex items-center gap-2 text-base font-semibold">
                                                <Clock className="w-4 h-4" />
                                                Delivery Lead Times
                                            </FormLabel>
                                            <FormControl>
                                                <Input 
                                                    placeholder="e.g. 3-5 business days" 
                                                    {...field} 
                                                    className="h-12 text-lg border-2 border-primary/20 focus:border-primary transition-colors"
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.7 }}
                            >
                                <Button 
                                    type="submit" 
                                    className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-primary to-primary/70 hover:from-primary/90 hover:to-primary/80 transition-all duration-300"
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? (
                                        <div className="flex items-center gap-2">
                                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                            Creating Profile...
                                        </div>
                                    ) : (
                                        "Create Profile"
                                    )}
                                </Button>
                            </motion.div>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </motion.div>
    );
}
