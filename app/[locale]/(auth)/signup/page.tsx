"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import { Loader2, Mail, Lock, User } from "lucide-react";

export default function SignupPage() {
  const { signup } = useAuth();
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (field: string, value: string) => {
    setForm({ ...form, [field]: value });
    if (error) setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!form.name || !form.email || !form.password || !form.confirmPassword) {
      setError("All fields are required");
      return;
    }

    if (form.password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);
    
    try {
      const success = await signup({
        name: form.name.trim(),
        email: form.email.trim().toLowerCase(),
        password: form.password,
      });

      if (!success) {
        setError("An account with this email already exists or signup failed");
        setLoading(false);
        return;
      }

      // Successful signup - redirect to onboarding
      router.push("/onboarding");
    } catch (err: any) {
      console.error("Signup error:", err);
      
      // Handle specific Supabase errors
      let errorMessage = "Failed to create account. Please try again.";
      
      if (err.message) {
        if (err.message.includes("rate limit") || err.message.includes("Email rate limit exceeded")) {
          errorMessage = "Too many signup attempts. Please wait a few minutes and try again, or disable email confirmation in Supabase settings.";
        } else if (err.message.includes("already registered") || err.message.includes("already exists")) {
          errorMessage = "An account with this email already exists. Try logging in instead.";
        } else if (err.message.includes("invalid email")) {
          errorMessage = "Please enter a valid email address.";
        } else {
          errorMessage = err.message;
        }
      }
      
      setError(errorMessage);
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen">
      {/* Left Panel - Brand & Visual */}
      <div className="lg:w-1/2 bg-gradient-to-br from-primary via-primary-dark to-secondary relative overflow-hidden py-12 px-8 lg:px-16">
        {/* Decorative elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-64 h-64 bg-accent-gold rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-secondary-light rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative z-10 flex flex-col justify-center min-h-full text-white">
          <div className="space-y-8">
            <div>
              <h1 className="text-4xl lg:text-5xl font-display font-bold mb-4 leading-tight">
                Welcome to India Global News
              </h1>
              <p className="text-xl text-white/90 font-medium">
                The Intelligence Pulse of Global India
              </p>
            </div>

            <div className="h-px bg-white/20 w-24"></div>

            <div className="space-y-6 text-lg text-white/90">
              <p className="leading-relaxed">
                Join 50,000+ leaders getting real-time trade intelligence, market trends, and personalized insights.
              </p>
              
              <ul className="space-y-4">
                <li className="flex items-center gap-4">
                  <div className="w-2 h-2 bg-accent-gold rounded-full flex-shrink-0"></div>
                  <span>Real-time market analytics and tracking</span>
                </li>
                <li className="flex items-center gap-4">
                  <div className="w-2 h-2 bg-accent-gold rounded-full flex-shrink-0"></div>
                  <span>Verified B2B intelligence sources</span>
                </li>
                <li className="flex items-center gap-4">
                  <div className="w-2 h-2 bg-accent-gold rounded-full flex-shrink-0"></div>
                  <span>Personalized trade news feed</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel - Form */}
      <div className="lg:w-1/2 flex items-center justify-center p-8 lg:p-12 bg-neutral-light">
        <div className="w-full">
          <div className="bg-white rounded-2xl shadow-xl p-8 lg:p-10">
            <div className="mb-8">
              <h2 className="text-3xl font-display font-bold text-primary mb-2">
                Create Account
              </h2>
              <p className="text-neutral-dark text-lg">
                Enter your details to get started
              </p>
            </div>

            {error && (
              <div className="mb-6 p-4 rounded-lg bg-breaking-light border border-breaking text-sm text-breaking font-medium">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Full Name */}
              <div>
                <label className="block text-sm font-semibold text-neutral-dark mb-2">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-mid" />
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => handleChange("name", e.target.value)}
                    className="w-full pl-12 pr-4 py-3 border-2 border-neutral-mid rounded-lg focus:border-primary focus:outline-none transition-colors text-text-body font-medium"
                    placeholder="John Doe"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-semibold text-neutral-dark mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-mid" />
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                    className="w-full pl-12 pr-4 py-3 border-2 border-neutral-mid rounded-lg focus:border-primary focus:outline-none transition-colors text-text-body font-medium"
                    placeholder="name@company.com"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-semibold text-neutral-dark mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-mid" />
                  <input
                    type="password"
                    value={form.password}
                    onChange={(e) => handleChange("password", e.target.value)}
                    className="w-full pl-12 pr-4 py-3 border-2 border-neutral-mid rounded-lg focus:border-primary focus:outline-none transition-colors text-text-body font-medium"
                    placeholder="Min. 6 characters"
                  />
                </div>
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-sm font-semibold text-neutral-dark mb-2">
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-mid" />
                  <input
                    type="password"
                    value={form.confirmPassword}
                    onChange={(e) => handleChange("confirmPassword", e.target.value)}
                    className="w-full pl-12 pr-4 py-3 border-2 border-neutral-mid rounded-lg focus:border-primary focus:outline-none transition-colors text-text-body font-medium"
                    placeholder="Re-enter password"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 rounded-lg bg-gradient-to-r from-primary to-secondary hover:from-primary-dark hover:to-primary text-white font-bold text-lg shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading && <Loader2 className="w-5 h-5 animate-spin" />}
                {loading ? "Creating Account..." : "Create Account"}
              </button>
            </form>

            <div className="mt-8 text-center">
              <p className="text-neutral-dark">
                Already have an account?{" "}
                <Link href="/login" className="font-bold text-primary hover:text-secondary underline">
                  Log in
                </Link>
              </p>
            </div>

            <div className="mt-6 pt-6 border-t border-neutral-light">
              <p className="text-xs text-center text-neutral-dark">
                By creating an account, you agree to our{" "}
                <a href="#" className="underline hover:text-primary font-medium">Terms of Service</a>
                {" "}and{" "}
                <a href="#" className="underline hover:text-primary font-medium">Privacy Policy</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
