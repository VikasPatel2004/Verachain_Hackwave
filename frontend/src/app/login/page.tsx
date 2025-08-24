import { LoginForm } from '../../components/login/login-form';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '../../components/ui/button';
import { ArrowLeft } from 'lucide-react';

export default function LoginPage() {
  return (
    <div className="w-full min-h-screen lg:grid lg:grid-cols-2">
      <div className="flex items-center justify-center p-6 lg:p-10">
        <div className="w-full max-w-md">
           <div className="absolute top-6 left-6 lg:hidden">
            <Button variant="ghost" asChild size="sm">
              <Link href="/" className="flex items-center gap-2">
                <ArrowLeft />
                Home
              </Link>
            </Button>
          </div>
          <div className="mx-auto mb-8 flex flex-col items-center text-center">
             <Link href="/" className="mb-4">
                <Image src="/logo.png" alt="VeraChain Logo" width={160} height={40} className="h-10 w-auto" />
            </Link>
            <h1 className="text-3xl font-bold tracking-tight">Welcome Back</h1>
            <p className="text-muted-foreground mt-2">Enter your credentials to access your account.</p>
          </div>
          <LoginForm />
        </div>
      </div>
      <div className="hidden lg:flex lg:flex-col items-center justify-between bg-secondary/50 p-10 text-center relative bg-grid-pattern">
         <div className="absolute top-6 left-6">
            <Button variant="ghost" asChild>
              <Link href="/" className="flex items-center gap-2">
                <ArrowLeft />
                Back to Home
              </Link>
            </Button>
          </div>
         <div className="m-auto max-w-md space-y-4">
            <h2 className="text-3xl font-bold tracking-tight">De-risk Your Supply Chain with AI</h2>
            <p className="text-muted-foreground">
                VeraChain turns complex data into a simple risk score, helping you choose the best suppliers and avoid costly delays in land transportation.
            </p>
         </div>
         <p className="text-sm text-muted-foreground">&copy; {new Date().getFullYear()} VeraChain. All Rights Reserved.</p>
      </div>
    </div>
  );
}
