"use client";

import React from 'react';
import Link from 'next/link';
import { Button } from '../ui/button';
import { Sheet, SheetContent, SheetTrigger } from '../ui/sheet';
import { Menu, LogOut } from 'lucide-react';
import Image from 'next/image';
import { useAuth } from '../../hooks/auth-context';

export function Header() {
  const { user, logout, isLoading } = useAuth();
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-20 items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3">
          <Image src="/logo.png" alt="VeraChain Logo" width={180} height={45} className="h-12 w-auto" />
        </Link>
        
        <nav className="hidden md:flex items-center gap-2">
            <Button variant="ghost" asChild>
              <Link href="#about">About</Link>
            </Button>
            <Button variant="ghost" asChild>
              <Link href="#features">Features</Link>
            </Button>
            <Button variant="ghost" asChild>
              <Link href="#faq">FAQ</Link>
            </Button>
          {user ? (
            <Button 
              variant="outline" 
              onClick={logout} 
              disabled={isLoading}
              className="relative overflow-hidden group"
            >
              <span className="relative z-10 flex items-center">
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </span>
              <span className="absolute inset-0 bg-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </Button>
          ) : (
            <Button asChild className="relative overflow-hidden group">
              <Link href="/login" className="relative z-10">
                Login / Signup
                <span className="absolute inset-0 bg-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </Link>
            </Button>
          )}
        </nav>

        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <nav className="grid gap-6 text-lg font-medium p-6">
                <Link href="/" className="flex items-center gap-2 mb-4">
                  <Image src="/logo.png" alt="VeraChain Logo" width={160} height={40} className="h-10 w-auto" />
                </Link>
                <Link href="#about" className="hover:text-primary">About</Link>
                <Link href="#features" className="hover:text-primary">Features</Link>
                <Link href="#faq" className="hover:text-primary">FAQ</Link>
                {user ? (
                  <Button 
                    variant="outline" 
                    onClick={logout} 
                    disabled={isLoading} 
                    className="mt-4 relative overflow-hidden group"
                  >
                    <span className="relative z-10 flex items-center">
                      <LogOut className="mr-2 h-4 w-4" />
                      Logout
                    </span>
                    <span className="absolute inset-0 bg-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </Button>
                ) : (
                  <Button asChild className="mt-4 relative overflow-hidden group">
                    <Link href="/login" className="relative z-10">
                      Login / Signup
                      <span className="absolute inset-0 bg-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </Link>
                  </Button>
                )}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
