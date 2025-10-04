"use client";

import { useTranslation } from 'react-i18next';
import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { Instagram } from 'lucide-react'

const InstagramIcon = () => {
  const [tooltipText, setTooltipText] = useState("")
  const [isHovered, setIsHovered] = useState(false)
  const tooltipRef = useRef(null)
  const { t } = useTranslation('common');
  const fullText = "Urmărește-mă pe Instagram!"
  
  // Typewriter effect when hovering
  useEffect(() => {
    if (!isHovered) {
      setTooltipText("")
      return
    }
    
    let index = 0
    const interval = setInterval(() => {
      setTooltipText(fullText.substring(0, index + 1))
      index++
      
      if (index >= fullText.length) {
        clearInterval(interval)
      }
    }, 30)
    
    return () => clearInterval(interval)
  }, [isHovered])
  
  return (
    <div className="fixed bottom-6 left-6 z-50">
      <div className="relative inline-flex items-center">
        <a
          href="https://www.instagram.com/sabina.meruta/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Urmărește-mă pe Instagram!"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <motion.div
            className="bg-primary-600 text-white font-sans rounded-full p-3 flex items-center justify-center shadow-md hover:scale-110 hover:shadow-[0_0_15px_rgba(230,157,184,0.7)] transition-all duration-300 ease-in-out"
            animate={{
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 1,
              ease: "easeInOut",
              repeat: Infinity,
            }}
          >
            <Instagram size={24} />
          </motion.div>
        </a>
        <div
          ref={tooltipRef}
          className="ml-3 whitespace-nowrap bg-primary-600 text-white font-sans font-medium rounded-md px-2 py-1 text-xs"
          style={{ 
            opacity: isHovered ? 1 : 0,
            transform: `translateX(${isHovered ? '0' : '-10px'})`,
            transition: 'opacity 200ms ease-in-out, transform 200ms ease-in-out'
          }}
        >
          {t('instagram.followMe')}
        </div>
      </div>
    </div>
  )
}

export default InstagramIcon