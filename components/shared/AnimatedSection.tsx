"use client";

import { ReactNode, useEffect, useRef } from 'react';
import { motion, useInView, useAnimation, Variants } from 'framer-motion';

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  variants?: Variants;
  delay?: number;
  duration?: number;
  once?: boolean;
  direction?: 'up' | 'down' | 'left' | 'right';
}

const defaultVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1]
    }
  }
};

const getDirectionalVariants = (direction: 'up' | 'down' | 'left' | 'right', duration: number = 0.6): Variants => {
  return {
    hidden: {
      opacity: 0,
      x: direction === 'left' ? 50 : direction === 'right' ? -50 : 0,
      y: direction === 'up' ? 50 : direction === 'down' ? -50 : 0,
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        duration: duration,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };
};

const AnimatedSection = ({
  children,
  className = '',
  variants,
  delay = 0,
  duration = 0.6,
  once = true,
  direction
}: AnimatedSectionProps) => {
  const controls = useAnimation();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once, amount: 0.3 });

  // Determine which variants to use
  const selectedVariants = variants || (direction ? getDirectionalVariants(direction, duration) : defaultVariants);

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    } else if (!once) {
      controls.start('hidden');
    }
  }, [controls, inView, once]);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={selectedVariants}
      transition={{ 
        duration, 
        delay,
        ease: [0.22, 1, 0.36, 1]
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedSection;