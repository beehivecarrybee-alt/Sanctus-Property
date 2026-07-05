import { useEffect, useState } from "react";
import logo from "@/assets/logofor E and C_.png";

const SNOOZE_KEY = "pwa-install-snoozed-until";
const SNOOZE_DAYS = 14;

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed"; platform: string }>;
}

function isStandalone() {
  if (typeof window === "undefined") return false;
  const mm = window.matchMedia?.("(display-mode: standalone)").matches;
  const iosStandalone = (window.navigator as unknown as { standalone?: boolean }).standalone === true;
  return Boolean(mm || iosStandalone);
}

function isSnoozed() {
  if (typeof window === "undefined") return false;
  try {
    const until = window.localStorage.getItem(SNOOZE_KEY);
    if (!until) return false;
    return Date.now() < Number(until);
  } catch {
    return false;
  }
}

function snooze() {
  try {
    window.localStorage.setItem(SNOOZE_KEY, String(Date.now() + SNOOZE_DAYS * 24 * 60 * 60 * 1000));
  } catch {
    // ignore storage errors (private browsing, etc.)
  }
}

export function PwaPrompts() {
  const [updateReady, setUpdateReady] = useState(false);
  const [installEvent, setInstallEvent] = useState<BeforeInstallPromptEvent | null>(null);
  const [showInstallBanner, setShowInstallBanner] = useState(false);
  const [showIosHint, setShowIosHint] = useState(false);

  // Service worker registration + update toast
  useEffect(() => {
    if (!import.meta.env.PROD) return;
    if (!("serviceWorker" in navigator)) return;
    const hadController = !!navigator.serviceWorker.controller;
    try {
      navigator.serviceWorker.register("/sw.js").catch((err) => console.error("SW registration failed:", err));
    } catch (err) {
      console.error(err);
    }
    if (hadController) {
      const onChange = () => setUpdateReady(true);
      navigator.serviceWorker.addEventListener("controllerchange", onChange);
      return () => navigator.serviceWorker.removeEventListener("controllerchange", onChange);
    }
  }, []);

  // Install banner (Chromium beforeinstallprompt)
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (isStandalone() || isSnoozed()) return;

    const onBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setInstallEvent(e as BeforeInstallPromptEvent);
      setShowInstallBanner(true);
    };

    window.addEventListener("beforeinstallprompt", onBeforeInstallPrompt);
    return () => window.removeEventListener("beforeinstallprompt", onBeforeInstallPrompt);
  }, []);

  // iOS hint (no beforeinstallprompt support)
  useEffect(() => {
    if (!import.meta.env.PROD) return;
    if (typeof window === "undefined") return;
    if (isStandalone() || isSnoozed()) return;
    const isIos = /iphone|ipad|ipod/i.test(navigator.userAgent);
    if (!isIos) return;

    const timer = window.setTimeout(() => {
      setShowIosHint(true);
    }, 4000);
    return () => window.clearTimeout(timer);
  }, []);

  const handleInstall = async () => {
    if (!installEvent) return;
    try {
      await installEvent.prompt();
      await installEvent.userChoice;
    } catch (err) {
      console.error(err);
    } finally {
      setShowInstallBanner(false);
      setInstallEvent(null);
    }
  };

  const handleNotNow = () => {
    setShowInstallBanner(false);
    snooze();
  };

  const handleIosGotIt = () => {
    setShowIosHint(false);
    snooze();
  };

  return (
    <>
      {updateReady && (
        <div
          role="status"
          className="fixed z-[150] bottom-4 left-4 right-4 md:left-auto md:right-6 md:bottom-6 md:w-auto flex items-center justify-between gap-4 rounded-2xl px-5 py-4 shadow-[0_16px_40px_-8px_rgba(0,0,0,0.4)]"
          style={{ backgroundColor: "#17130F", color: "#fff" }}
        >
          <span className="text-sm">Site updated</span>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="rounded-full px-4 py-1.5 text-xs font-medium uppercase tracking-wide"
              style={{ backgroundColor: "var(--color-gold)", color: "#17130F" }}
            >
              Refresh
            </button>
            <button
              type="button"
              aria-label="Dismiss update notification"
              onClick={() => setUpdateReady(false)}
              className="text-white/70 hover:text-white transition-colors px-1"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {showInstallBanner && installEvent && (
        <div
          role="dialog"
          aria-label="Install app"
          className="fixed z-[150] bottom-4 left-4 right-4 md:left-6 md:right-auto md:bottom-6 md:w-[380px] flex items-center gap-3 rounded-2xl px-4 py-4 shadow-[0_16px_40px_-8px_rgba(0,0,0,0.4)]"
          style={{ backgroundColor: "#17130F", color: "#fff" }}
        >
          <span className="h-11 w-11 shrink-0 overflow-hidden rounded-full bg-white/10 flex items-center justify-center">
            <img src={logo} alt="" className="h-full w-full object-cover" />
          </span>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">Sanctus Property</p>
            <p className="text-xs text-white/70 truncate">Install the app for quick access</p>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={handleNotNow}
              className="text-xs text-white/70 hover:text-white transition-colors px-2 py-1.5"
            >
              Not now
            </button>
            <button
              type="button"
              onClick={handleInstall}
              className="rounded-full px-4 py-1.5 text-xs font-medium uppercase tracking-wide"
              style={{ backgroundColor: "var(--color-gold)", color: "#17130F" }}
            >
              Install
            </button>
          </div>
        </div>
      )}

      {!showInstallBanner && showIosHint && (
        <div
          role="dialog"
          aria-label="Install app"
          className="fixed z-[150] bottom-4 left-4 right-4 md:left-6 md:right-auto md:bottom-6 md:w-[380px] flex items-center gap-3 rounded-2xl px-4 py-4 shadow-[0_16px_40px_-8px_rgba(0,0,0,0.4)]"
          style={{ backgroundColor: "#17130F", color: "#fff" }}
        >
          <span className="h-11 w-11 shrink-0 overflow-hidden rounded-full bg-white/10 flex items-center justify-center">
            <img src={logo} alt="" className="h-full w-full object-cover" />
          </span>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">Sanctus Property</p>
            <p className="text-xs text-white/70">
              Install this app: tap the Share button, then "Add to Home Screen"
            </p>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={handleIosGotIt}
              className="rounded-full px-4 py-1.5 text-xs font-medium uppercase tracking-wide"
              style={{ backgroundColor: "var(--color-gold)", color: "#17130F" }}
            >
              Got it
            </button>
          </div>
        </div>
      )}
    </>
  );
}
