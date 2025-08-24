"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardFooter
} from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import Link from "next/link";
import { useAuth } from "../../hooks/auth-context";
import { Alert, AlertDescription } from "../ui/alert";

export function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const { login, error, clearError, isLoading } = useAuth();

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!username.trim()) {
      newErrors.username = "Username is required";
    }

    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();

    if (!validateForm()) {
      return;
    }

    try {
      await login(username, password);
      // Redirect will be handled by the auth context or page component
    } catch (err) {
      // Error is already handled by the auth context
      console.error("Login error:", err);
    }
  };

  return (
    <Card className="bg-transparent border-0 shadow-none">
      <CardContent>
        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input 
              id="username" 
              placeholder="your_username" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required 
              className={errors.username ? "border-destructive" : ""}
            />
            {errors.username && (
              <p className="text-sm text-destructive">{errors.username}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input 
              id="password" 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required 
              className={errors.password ? "border-destructive" : ""}
            />
            {errors.password && (
              <p className="text-sm text-destructive">{errors.password}</p>
            )}
          </div>
          <Button 
            type="submit" 
            className="w-full"
            disabled={isLoading}
          >
            {isLoading ? "Logging in..." : "Login"}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex justify-center text-sm">
        <p>
          Don't have an account?{" "}
          <Link href="/signup" className="text-primary hover:underline font-semibold">
            Sign up
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}
