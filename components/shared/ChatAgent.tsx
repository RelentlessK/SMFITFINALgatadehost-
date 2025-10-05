"use client";

import { useEffect } from "react";
import { useTranslation } from "react-i18next";

/**
 * ChatAgent
 * - Only loads for 'en' or 'ro'
 * - Loads the Voiceflow widget as a module (bundle.mjs)
 * - Avoids duplicate script inserts using an id
 * - Cleans up widget and script on unmount / language change
 */

declare global {
  interface Window {
    voiceflow?: any;
  }
}

const SCRIPT_ID = "voiceflow-widget-script";
const WIDGET_DATA_ATTR = "data-vf-widget";

const ChatAgent = () => {
  const { i18n } = useTranslation();

  useEffect(() => {
    // Only load chat agent for English or Romanian languages
    if (i18n?.language !== "en" && i18n?.language !== "ro") return;

    const projectID =
      i18n.language === "en"
        ? "68162c046675ec5c9d94b36f" // English
        : "6814c851a57c5925dbee41cb"; // Romanian

    // If script already exists, try to (re)load the chat for the new projectID
    const existingScript = document.getElementById(SCRIPT_ID) as HTMLScriptElement | null;

    const loadChat = () => {
      try {
        if (window.voiceflow && window.voiceflow.chat && typeof window.voiceflow.chat.load === "function") {
          // If widget already loaded, reload config (if supported) or remove and re-add
          window.voiceflow.chat.load({
            verify: { projectID },
            url: "https://general-runtime.voiceflow.com",
            versionID: "production",
            voice: {
              url: "https://runtime-api.voiceflow.com",
            },
          });
        }
      } catch (err) {
        // Safe catch so build/dev doesn't break
        // (logging is optional - avoid console spam in production)
        // console.warn("Voiceflow load error:", err);
      }
    };

    if (existingScript) {
      // script already present — attempt to initialize directly
      loadChat();
    } else {
      // create and append module script
      const script = document.createElement("script");
      script.id = SCRIPT_ID;
      // bundle.mjs is an ES module — set type="module"
      script.type = "module";
      script.async = true;

      // On load, attempt to initialize the chat
      script.onload = () => {
        loadChat();
      };

      // If the voiceflow bundle exports something via default, it should attach to window.
      script.onerror = () => {
        // silent fail - widget not critical
        // console.error("Failed to load Voiceflow widget script");
      };

      // Use the same URL you had; keep .mjs but ensure module type
      script.src = "https://cdn.voiceflow.com/widget-next/bundle.mjs";
      document.head.appendChild(script);
    }

    // Cleanup: remove widget DOM and (optionally) script if you want to fully unload
    return () => {
      // Remove chat widget element(s)
      const chatWidget = document.querySelector(`[${WIDGET_DATA_ATTR}]`);
      if (chatWidget && chatWidget.parentElement) chatWidget.remove();

      // Try to call any voiceflow unload if available (best-effort)
      try {
        if (window.voiceflow && window.voiceflow.chat && typeof window.voiceflow.chat.unload === "function") {
          window.voiceflow.chat.unload();
        }
      } catch {
        // ignore
      }

      // Optionally remove the script to allow a fresh reload next time
      const scriptToRemove = document.getElementById(SCRIPT_ID);
      if (scriptToRemove && scriptToRemove.parentElement) {
        scriptToRemove.parentElement.removeChild(scriptToRemove);
      }

      // Also clear the global to avoid stale references
      try {
        if (window.voiceflow) {
          // NOTE: only delete if it's safe in your app's context
          delete window.voiceflow;
        }
      } catch {
        // ignore
      }
    };
  }, [i18n?.language]);

  return null;
};

export default ChatAgent;
