"use client";

import { Header } from '../../components/landing/header';
import { Footer } from '../../components/landing/footer';
import { SupplierForm } from '../../components/supplier/supplier-form';

export default function SupplierPage() {
  return (
    <div className="flex flex-col min-h-screen bg-secondary/30">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-12">
            <div className="max-w-2xl mx-auto text-center mb-10">
                <h1 className="text-4xl font-bold tracking-tight">VeraChain for Suppliers</h1>
                <p className="mt-4 text-lg text-muted-foreground">
                    Create your supplier profile to get started.
                </p>
            </div>
            
            <div className="max-w-2xl mx-auto">
                <SupplierForm />
            </div>
        </main>
        <Footer />
    </div>
  );
}
