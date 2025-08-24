"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

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

    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values);
        alert("Supplier created successfully!");
        form.reset();
    }
  
    return (
        <Card>
            <CardHeader>
                <CardTitle>Create Supplier Profile</CardTitle>
                <CardDescription>Fill in the details below to create your supplier profile.</CardDescription>
            </CardHeader>
            <CardContent>
                 <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <FormField
                            control={form.control}
                            name="supplierName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Supplier Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="e.g. Reliable Transports" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="location"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Location</FormLabel>
                                    <FormControl>
                                        <Input placeholder="e.g. Mumbai, India" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                         <FormField
                            control={form.control}
                            name="contact"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Contact</FormLabel>
                                    <FormControl>
                                        <Input placeholder="e.g. +91 98765 43210" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                         <FormField
                            control={form.control}
                            name="serviceCategory"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Service Category</FormLabel>
                                    <FormControl>
                                        <Input placeholder="e.g. Long-haul freight" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                         <FormField
                            control={form.control}
                            name="volumeDistributing"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Volume Distributing (per month)</FormLabel>
                                    <FormControl>
                                        <Input type="number" placeholder="e.g. 1000" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="deliveryLeadTimes"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Delivery Lead Times</FormLabel>
                                    <FormControl>
                                        <Input placeholder="e.g. 3-5 business days" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit" className="w-full">Create Profile</Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
}
