"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";

export type AccountType = "reader" | "sme" | "associate-sme" | "company" | "leader";

export interface UserProfile {
  id?: string;
  name: string;
  email: string;
  mobile?: string;
  plan: "free" | "starter" | "pro" | "enterprise";
  readerPlan?: "free" | "pro" | "premium" | "enterprise";
  smePlan?: "none" | "free" | "pro" | "elite";
  associateSmePlan?: "none" | "free" | "plus" | "premium";
  companyPlan?: "none" | "free" | "silver" | "gold";
  leaderPlan?: "none" | "free" | "verified" | "elite";
  sectors: string[];
  countries: string[];
  leaders: string[];
  accountType?: AccountType;
  accountTypeSelectedAt?: string; // ISO timestamp
  onboardingComplete: boolean;
  onboardingRole?: "none" | "sme" | "associate-sme" | "company" | "leader";
  onboardingStatus?: "none" | "Draft" | "Submitted" | "Under Review" | "Need More Information" | "Approved" | "Rejected";
  onboardingForm?: any;
  onboardingDocs?: any;
  onboardingFeedback?: string;
}

interface AuthContextType {
  user: UserProfile | null;
  isLoggedIn: boolean;
  loading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (data: { name: string; email: string; mobile?: string; password: string }) => Promise<boolean>;
  logout: () => Promise<void>;
  updateOnboarding: (data: Partial<UserProfile>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const STORAGE_KEY = "ign_user";
const PASSWORD_KEY = "ign_pass";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  // On mount: restore session from localStorage
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem(STORAGE_KEY);
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (e) {
      console.error("Failed to restore session:", e);
    }
    setLoading(false);
  }, []);

  /**
   * SIGNUP — stores user data in localStorage only. No DB, no email verification.
   */
  const signup = useCallback(
    async (data: { name: string; email: string; mobile?: string; password: string }): Promise<boolean> => {
      const newUser: UserProfile = {
        id: `user-${Date.now()}`,
        name: data.name.trim(),
        email: data.email.trim().toLowerCase(),
        mobile: data.mobile?.trim(),
        plan: "free",
        readerPlan: "free",
        smePlan: "none",
        associateSmePlan: "none",
        companyPlan: "none",
        leaderPlan: "none",
        sectors: [],
        countries: [],
        leaders: [],
        accountType: undefined,
        onboardingComplete: false,
        onboardingRole: "none",
        onboardingStatus: "none",
        onboardingForm: null,
        onboardingDocs: null,
        onboardingFeedback: "",
      };

      // Cache in localStorage (temp storage)
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newUser));
      localStorage.setItem(PASSWORD_KEY, data.password);

      setUser(newUser);
      return true;
    },
    []
  );

  /**
   * LOGIN — checks localStorage for a matching email. Password is optional/lenient.
   */
  const login = useCallback(async (email: string, password: string): Promise<boolean> => {
    try {
      const storedUser = localStorage.getItem(STORAGE_KEY);
      if (!storedUser) return false;

      const userData: UserProfile = JSON.parse(storedUser);
      if (userData.email === email.trim().toLowerCase() && password.length > 0) {
        setUser(userData);
        return true;
      }
      return false;
    } catch (e) {
      console.error("Login error:", e);
      return false;
    }
  }, []);

  /**
   * LOGOUT — clears localStorage and state.
   */
  const logout = useCallback(async () => {
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(PASSWORD_KEY);
    setUser(null);
  }, []);

  /**
   * UPDATE ONBOARDING — updates user data in localStorage and state.
   */
  const updateOnboarding = useCallback(
    async (data: Partial<UserProfile>) => {
      setUser((prev) => {
        if (!prev) return prev;
        const updated: UserProfile = { ...prev, ...data };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
        return updated;
      });
    },
    []
  );

  const isLoggedIn = !!user;

  return (
    <AuthContext.Provider value={{ user, isLoggedIn, loading, login, signup, logout, updateOnboarding }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (ctx === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return ctx;
}
