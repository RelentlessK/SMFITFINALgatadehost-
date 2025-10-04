"use client";

import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const ChatAgent = () => {
  const { i18n } = useTranslation();

  useEffect(() => {
    // Only load chat agent for English or Romanian languages
    if (i18n.language !== 'en' && i18n.language !== 'ro') {
      return;
    }

    // Determine the project ID based on language
    const projectID = i18n.language === 'en' 
      ? '68162c046675ec5c9d94b36f'  // English chat agent
      : '6814c851a57c5925dbee41cb'; // Romanian chat agent

    // Create and inject the Voiceflow chat script
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.onload = function() {
      if (window.voiceflow) {
        window.voiceflow.chat.load({
          verify: { projectID: projectID },
          url: 'https://general-runtime.voiceflow.com',
          versionID: 'production',
          voice: {
            url: "https://runtime-api.voiceflow.com"
          }
        });
      }
    };
    script.src = "https://cdn.voiceflow.com/widget-next/bundle.mjs";
    
    // Append script to document head
    document.head.appendChild(script);

    // Cleanup function
    return () => {
      // Remove the script when component unmounts or language changes
      const existingScript = document.querySelector('script[src="https://cdn.voiceflow.com/widget-next/bundle.mjs"]');
      if (existingScript) {
        document.head.removeChild(existingScript);
      }
      
      // Remove chat widget if it exists
      if (window.voiceflow && window.voiceflow.chat) {
        const chatWidget = document.querySelector('[data-vf-widget]');
        if (chatWidget) {
          chatWidget.remove();
        }
      }
    };
  }, [i18n.language]);

  return null; // This component doesn't render anything visible
};

export default ChatAgent;