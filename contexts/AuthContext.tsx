"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { supabase } from "@/lib/supabase/client";
import { User } from "@supabase/supabase-js";

export interface UserProfile {
  id?: string;
  name: string;
  email: string;
  mobile?: string;
  plan: "free" | "starter" | "pro" | "enterprise";
  sectors: string[];
  countries: string[];
  leaders: string[];
  onboardingComplete: boolean;
}

interface AuthContextType {
  user: UserProfile | null;
  supabaseUser: User | null;
  isLoggedIn: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (data: { name: string; email: string; mobile?: string; password: string }) => Promise<boolean>;
  logout: () => Promise<void>;
  updateOnboarding: (data: { sectors?: string[]; countries?: string[]; leaders?: string[]; onboardingComplete?: boolean }) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const STORAGE_KEY = "ign_user";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [supabaseUser, setSupabaseUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Fetch profile matching the authenticated user
  const fetchProfile = async (uid: string) => {
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", uid)
        .single();

      if (error) {
        console.error("Error fetching profile:", error);
        return null;
      }
      
      // Map DB fields which are snake_case to camelCase if needed,
      // but if we created table with matching names or handled it, it's fine.
      // Our schema uses snake_case for multi-word columns usually, let's map:
      const profile: UserProfile = {
        id: data.id,
        name: data.name,
        email: data.email,
        mobile: data.mobile,
        plan: data.plan,
        sectors: data.sectors || [],
        countries: data.countries || [],
        leaders: data.leaders || [],
        onboardingComplete: data.onboarding_complete ?? false, // DB column snake_case
      };
      return profile;
    } catch (err) {
      console.error(err);
      return null;
    }
  };

  useEffect(() => {
    // DEV MODE: Load from localStorage
    const DEV_MODE = false;
    
    if (DEV_MODE) {
      const storedUser = localStorage.getItem(STORAGE_KEY);
      if (storedUser) {
        try {
          setUser(JSON.parse(storedUser));
        } catch (e) {
          console.error("Failed to parse stored user:", e);
        }
      }
      setLoading(false);
      return;
    }
    
    // PRODUCTION MODE: Check Supabase session
    const initAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session?.user) {
        setSupabaseUser(session.user);
        const profile = await fetchProfile(session.user.id);
        if (profile) setUser(profile);
      }
      setLoading(false);
    };

    initAuth();

    // Listen for changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      if (session?.user) {
        setSupabaseUser(session.user);
        if (!user || user.id !== session.user.id) {
          const profile = await fetchProfile(session.user.id);
          if (profile) setUser(profile);
        }
      } else {
        setSupabaseUser(null);
        setUser(null);
        localStorage.removeItem(STORAGE_KEY);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const signup = useCallback(async (data: { name: string; email: string; mobile?: string; password: string }): Promise<boolean> => {
    try {
      // DEV MODE: Skip Supabase entirely and use localStorage for testing
      const DEV_MODE = false; // Set to false when ready to use real database
      
      if (DEV_MODE) {
        // Simple mock signup for testing
        const mockUser: UserProfile = {
          id: `mock-${Date.now()}`,
          name: data.name,
          email: data.email,
          mobile: data.mobile,
          plan: "free",
          sectors: [],
          countries: [],
          leaders: [],
          onboardingComplete: false,
        };
        
        // Store in localStorage
        localStorage.setItem(STORAGE_KEY, JSON.stringify(mockUser));
        localStorage.setItem('mock_password', data.password); // For login
        
        setUser(mockUser);
        return true;
      }
      
      // PRODUCTION MODE: Use Supabase
      const { data: authData, error } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          data: {
            full_name: data.name,
          },
        },
      });

      if (error) throw error;
      if (!authData.user) return false;

      // Create profile record
      const newProfile = {
        id: authData.user.id,
        name: data.name,
        email: data.email,
        mobile: data.mobile || null,
        plan: "free",
        sectors: [],
        countries: [],
        leaders: [],
        onboarding_complete: false,
      };

      console.log("🔵 Attempting to insert profile:", newProfile);

      const { error: profileError } = await supabase
        .from("profiles")
        .insert([newProfile]);

      if (profileError) {
        console.error("❌ Profile creation error:", profileError);
        console.error("Error details:", {
          message: profileError.message,
          details: profileError.details,
          hint: profileError.hint,
          code: profileError.code,
        });
        
        // Important: Even if profile fails, let's continue for now
        // The user is already created in auth
        console.warn("⚠️ User created in auth but profile insert failed. Continuing anyway...");
      } else {
        console.log("✅ Profile created successfully!");
      }

      // Optimistically set user state
      setUser({
        ...newProfile,
        sectors: [],
        countries: [],
        leaders: [],
        onboardingComplete: false,
      } as UserProfile);
      
      return true;
    } catch (err) {
      console.error("Signup error:", err);
      throw err;
    }
  }, []);

  const login = useCallback(async (email: string, password: string): Promise<boolean> => {
    try {
      // DEV MODE: Use localStorage
      const DEV_MODE = false;
      
      if (DEV_MODE) {
        const storedUser = localStorage.getItem(STORAGE_KEY);
        const storedPassword = localStorage.getItem('mock_password');
        
        if (storedUser) {
          const userData = JSON.parse(storedUser);
          // Simple password check (or skip it for testing)
          if (!storedPassword || storedPassword === password || password === '123456') {
            setUser(userData);
            return true;
          }
        }
        return false;
      }
      
      // PRODUCTION MODE: Use Supabase
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;
      return !!data.user;
    } catch (err) {
      console.error("Login error:", err);
      return false;
    }
  }, []);

  const logout = useCallback(async () => {
    const DEV_MODE = false;
    
    if (DEV_MODE) {
      localStorage.removeItem(STORAGE_KEY);
      localStorage.removeItem('mock_password');
      setUser(null);
      return;
    }
    
    await supabase.auth.signOut();
    setUser(null);
    setSupabaseUser(null);
  }, []);

  const updateOnboarding = useCallback(async (data: { sectors?: string[]; countries?: string[]; leaders?: string[]; onboardingComplete?: boolean }) => {
    // DEV MODE: Update localStorage
    const DEV_MODE = false;
    
    if (DEV_MODE) {
      setUser((prev) => {
        if (!prev) return prev;
        const updated = { ...prev, ...data };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
        return updated;
      });
      return;
    }
    
    // PRODUCTION MODE: Update Supabase
    if (!supabaseUser) return;
    
    // Map to DB columns
    const updates: any = {};
    if (data.sectors) updates.sectors = data.sectors;
    if (data.countries) updates.countries = data.countries;
    if (data.leaders) updates.leaders = data.leaders;
    if (data.onboardingComplete !== undefined) updates.onboarding_complete = data.onboardingComplete;

    try {
      const { error } = await supabase
        .from("profiles")
        .update(updates)
        .eq("id", supabaseUser.id);

      if (error) throw error;

      // Update local state
      setUser((prev) => {
        if (!prev) return prev;
        return { ...prev, ...data };
      });
    } catch (err) {
      console.error("Error updating profile:", err);
    }
  }, [supabaseUser]);

  const DEV_MODE = false;
  const isLoggedIn = DEV_MODE ? !!user : !!supabaseUser;

  return (
    <AuthContext.Provider value={{ user, supabaseUser, isLoggedIn, login, signup, logout, updateOnboarding }}>
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
