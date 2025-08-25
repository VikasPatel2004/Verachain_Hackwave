"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Header } from '../../components/landing/header';
import { Footer } from '../../components/landing/footer';
import { SupplierForm } from '../../components/supplier/supplier-form';
import { useAuth } from '../../hooks/auth-context';
import { motion } from 'framer-motion';

export default function SupplierPage() {
  const { user, isLoading: authLoading } = useAuth();
  const router = useRouter();

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login');
    }
  }, [user, authLoading, router]);

  // Show loading while checking authentication
  if (authLoading) {
    return (
      <div className="flex flex-col min-h-screen bg-secondary/30">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-12 flex items-center justify-center">
          <div className="text-center">
            <p className="text-lg text-muted-foreground">Loading...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Don't render content if not authenticated (will redirect)
  if (!user) {
    return null;
  }

  return (
    <div className="flex flex-col min-h-screen bg-secondary/30">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-12">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto text-center mb-10"
        >
          <h1 className="text-4xl font-bold tracking-tight">VeraChain for Suppliers</h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Create your supplier profile to get started.
          </p>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto"
        >
          <SupplierForm />
        </motion.div>
      </main>
      <Footer />
    </div>
  );
}
