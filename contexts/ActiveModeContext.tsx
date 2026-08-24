"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { useAuth } from "@/contexts/AuthContext";
import SignupGateModal from "@/components/auth/SignupGateModal";
import PostSignupChoiceModal from "@/components/auth/PostSignupChoiceModal";
import OnboardingGateModal from "@/components/auth/OnboardingGateModal";

export type OnboardingStatus = "not_started" | "deferred" | "complete";

interface ActiveModeContextType {
  isActiveMode: boolean;
  toggleActiveMode: () => void;
  anonymousClickCount: number;
  postSignupClickCount: number;
  onboardingStatus: OnboardingStatus;
  showSignupGate: boolean;
  setShowSignupGate: (val: boolean) => void;
  showPostSignupChoice: boolean;
  setShowPostSignupChoice: (val: boolean) => void;
  showOnboardingGate: boolean;
  setShowOnboardingGate: (val: boolean) => void;
  incrementClick: () => void;
  deferOnboarding: () => void;
  completeOnboarding: () => void;
  resetAnonymousCount: () => void;
  triggerPostSignupFlow: () => void;
}

const ActiveModeContext = createContext<ActiveModeContextType | undefined>(undefined);

const ACTIVE_MODE_KEY = "ign_active_mode";
const ANON_CLICKS_KEY = "ign_anon_clicks";
const POST_SIGNUP_CLICKS_KEY = "ign_post_signup_clicks";
const ONBOARDING_STATUS_KEY = "ign_onboarding_status";

export function ActiveModeProvider({ children }: { children: React.ReactNode }) {
  const { isLoggedIn, user, updateOnboarding } = useAuth();

  // Active mode state (default true)
  const [isActiveMode, setIsActiveMode] = useState<boolean>(true);

  // Click counters
  const [anonymousClickCount, setAnonymousClickCount] = useState<number>(0);
  const [postSignupClickCount, setPostSignupClickCount] = useState<number>(0);
  const [onboardingStatus, setOnboardingStatus] = useState<OnboardingStatus>("not_started");

  // Modal display states
  const [showSignupGate, setShowSignupGate] = useState<boolean>(false);
  const [showPostSignupChoice, setShowPostSignupChoice] = useState<boolean>(false);
  const [showOnboardingGate, setShowOnboardingGate] = useState<boolean>(false);

  // Initialize from storage on mount
  useEffect(() => {
    try {
      // Active Mode toggle
      const storedActive = localStorage.getItem(ACTIVE_MODE_KEY);
      if (storedActive !== null) {
        setIsActiveMode(storedActive === "true");
      }

      // Anonymous clicks
      const storedAnon = sessionStorage.getItem(ANON_CLICKS_KEY) || localStorage.getItem(ANON_CLICKS_KEY);
      if (storedAnon) {
        setAnonymousClickCount(parseInt(storedAnon, 10) || 0);
      }

      // Post-signup clicks
      const storedPost = localStorage.getItem(POST_SIGNUP_CLICKS_KEY);
      if (storedPost) {
        setPostSignupClickCount(parseInt(storedPost, 10) || 0);
      }

      // Onboarding status
      const storedStatus = localStorage.getItem(ONBOARDING_STATUS_KEY) as OnboardingStatus | null;
      if (storedStatus) {
        setOnboardingStatus(storedStatus);
      }
    } catch (e) {
      console.error("Failed to load active mode state:", e);
    }
  }, []);

  // Sync user object with onboarding status
  useEffect(() => {
    if (user) {
      if (user.onboardingComplete) {
        setOnboardingStatus("complete");
        localStorage.setItem(ONBOARDING_STATUS_KEY, "complete");
      } else {
        const storedStatus = localStorage.getItem(ONBOARDING_STATUS_KEY) as OnboardingStatus | null;
        if (storedStatus && storedStatus !== "complete") {
          setOnboardingStatus(storedStatus);
        } else if (!storedStatus) {
          setOnboardingStatus("not_started");
          localStorage.setItem(ONBOARDING_STATUS_KEY, "not_started");
        }
      }
    }
  }, [user]);

  // Save active mode state
  const toggleActiveMode = useCallback(() => {
    setIsActiveMode((prev) => {
      const next = !prev;
      localStorage.setItem(ACTIVE_MODE_KEY, String(next));
      return next;
    });
  }, []);

  // Update anonymous clicks
  const setAnonCount = useCallback((count: number) => {
    setAnonymousClickCount(count);
    sessionStorage.setItem(ANON_CLICKS_KEY, String(count));
    localStorage.setItem(ANON_CLICKS_KEY, String(count));
  }, []);

  // Update post-signup clicks
  const setPostCount = useCallback((count: number) => {
    setPostSignupClickCount(count);
    localStorage.setItem(POST_SIGNUP_CLICKS_KEY, String(count));
  }, []);

  // Reset anonymous counter (when user signs up / logs in)
  const resetAnonymousCount = useCallback(() => {
    setAnonCount(0);
    setShowSignupGate(false);
  }, [setAnonCount]);

  // Trigger post signup choice screen
  const triggerPostSignupFlow = useCallback(() => {
    setShowSignupGate(false);
    setShowPostSignupChoice(true);
  }, []);

  // Action: User chooses "Not now, I'll browse first"
  const deferOnboarding = useCallback(() => {
    setOnboardingStatus("deferred");
    localStorage.setItem(ONBOARDING_STATUS_KEY, "deferred");
    setPostCount(0);
    setShowPostSignupChoice(false);
    setShowOnboardingGate(false);
  }, [setPostCount]);

  // Action: User completes onboarding
  const completeOnboarding = useCallback(() => {
    setOnboardingStatus("complete");
    localStorage.setItem(ONBOARDING_STATUS_KEY, "complete");
    setShowPostSignupChoice(false);
    setShowOnboardingGate(false);
    if (updateOnboarding) {
      updateOnboarding({ onboardingComplete: true });
    }
  }, [updateOnboarding]);

  // Increment click manually or via handler
  const incrementClick = useCallback(() => {
    if (!isActiveMode) return;

    if (!isLoggedIn) {
      setAnonymousClickCount((prev) => {
        const next = prev + 1;
        sessionStorage.setItem(ANON_CLICKS_KEY, String(next));
        localStorage.setItem(ANON_CLICKS_KEY, String(next));
        if (next >= 10) {
          setShowSignupGate(true);
        }
        return next;
      });
    } else if (onboardingStatus === "deferred") {
      setPostSignupClickCount((prev) => {
        const next = prev + 1;
        localStorage.setItem(POST_SIGNUP_CLICKS_KEY, String(next));
        if (next >= 10) {
          setShowOnboardingGate(true);
        }
        return next;
      });
    }
  }, [isActiveMode, isLoggedIn, onboardingStatus]);

  // Global Click Listener Interceptor
  useEffect(() => {
    if (!isActiveMode) return;

    const handleGlobalClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      if (!target) return;

      // Ignore clicks inside gate modals
      if (target.closest("[data-active-gate-modal]")) {
        return;
      }

      // Ignore clicks on header utilities, toggle button, search, dark mode, language, bell
      if (
        target.closest("[data-active-toggle]") ||
        target.closest("#active-mode-toggle") ||
        target.closest("#theme-toggle") ||
        target.closest("#lang-selector") ||
        target.closest("#notif-bell") ||
        target.closest("input") ||
        target.closest("textarea") ||
        target.closest("select")
      ) {
        return;
      }

      // Check if click target is content consumption (links, buttons, article cards, news items, etc.)
      const isContentClick =
        target.closest("a") ||
        target.closest("button") ||
        target.closest('[role="button"]') ||
        target.closest("[data-click-target]") ||
        target.closest("article") ||
        target.closest(".article-card") ||
        target.closest(".news-item");

      if (isContentClick) {
        if (!isLoggedIn) {
          if (anonymousClickCount >= 9) {
            // Reached 10th click limit!
            setAnonCount(10);
            setShowSignupGate(true);
            event.preventDefault();
            event.stopPropagation();
          } else {
            setAnonCount(anonymousClickCount + 1);
          }
        } else if (onboardingStatus === "deferred") {
          if (postSignupClickCount >= 9) {
            // Reached 10th post-signup click limit!
            setPostCount(10);
            setShowOnboardingGate(true);
            event.preventDefault();
            event.stopPropagation();
          } else {
            setPostCount(postSignupClickCount + 1);
          }
        }
      }
    };

    window.addEventListener("click", handleGlobalClick, true);
    return () => {
      window.removeEventListener("click", handleGlobalClick, true);
    };
  }, [
    isActiveMode,
    isLoggedIn,
    onboardingStatus,
    anonymousClickCount,
    postSignupClickCount,
    setAnonCount,
    setPostCount,
  ]);

  return (
    <ActiveModeContext.Provider
      value={{
        isActiveMode,
        toggleActiveMode,
        anonymousClickCount,
        postSignupClickCount,
        onboardingStatus,
        showSignupGate,
        setShowSignupGate,
        showPostSignupChoice,
        setShowPostSignupChoice,
        showOnboardingGate,
        setShowOnboardingGate,
        incrementClick,
        deferOnboarding,
        completeOnboarding,
        resetAnonymousCount,
        triggerPostSignupFlow,
      }}
    >
      {children}

      {/* Render Active Mode Gate Modals */}
      {isActiveMode && (
        <>
          {showSignupGate && <SignupGateModal />}
          {showPostSignupChoice && <PostSignupChoiceModal />}
          {showOnboardingGate && <OnboardingGateModal />}
        </>
      )}
    </ActiveModeContext.Provider>
  );
}

export function useActiveMode() {
  const context = useContext(ActiveModeContext);
  if (!context) {
    throw new Error("useActiveMode must be used within an ActiveModeProvider");
  }
  return context;
}
