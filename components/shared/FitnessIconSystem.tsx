"use client";

import React, { useEffect, useState, useMemo } from "react";
import type { ComponentType, CSSProperties } from "react";
import {
  Dumbbell,
  Droplet,
  Apple,
  Heart,
  Activity,
  Flame,
  Timer,
  Footprints,
  Drumstick,
  Scale,
  ShieldCheck,
  Salad,
  Medal,
  Bike,
  Sun as Running,
  Cog as Yoga,
  Leaf,
  Target,
  Zap,
  Coffee,
  Sunset,
  PersonStanding,
  Brain,
  Smile,
  User,
} from "lucide-react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

// Type definitions
type IconComponent = ComponentType<any>;

type IconPosition = {
  x: string;
  y: string;
  scale: number;
  rotation: number;
  delay: number;
};

type IconDefinition = {
  component: IconComponent;
  color: string;
  variant: string;
  opacity: number;
  strokeWidth: number;
};

// Define icon components to use
const iconComponents: Record<string, IconComponent> = {
  Dumbbell,
  Droplet,
  Apple,
  Heart,
  Activity,
  Flame,
  Timer,
  Footprints,
  Drumstick,
  Scale,
  ShieldCheck,
  Salad,
  Medal,
  Bike,
  Running,
  Yoga,
  Leaf,
  Target,
  Zap,
  Coffee,
  Sunset,
  PersonStanding,
  Brain,
  Smile,
  User,
};

// Enhanced baby pink palette colors with better visibility
const pinkPalette: string[] = [
  "var(--baby-pink-primary)", // Enhanced pink color
  "var(--baby-pink-secondary)", // Enhanced secondary pink
  "var(--baby-pink-accent)", // Enhanced accent color
  "var(--baby-pink-bright)", // Enhanced bright pink
];

// Function to generate procedural positions for icons
const generateIconPositions = (
  count: number,
  width: number,
  height: number
): IconPosition[] => {
  const positions: IconPosition[] = [];

  // Guard against invalid dims
  if (width <= 0 || height <= 0 || count <= 0) return positions;

  // Create a grid-like distribution but with some randomness
  const columns = Math.max(1, Math.ceil(Math.sqrt(count) * 1.5));
  const rows = Math.max(1, Math.ceil(count / columns));

  // Calculate cell size
  const cellWidth = width / columns;
  const cellHeight = height / rows;

  // Exclusion zones (percentages)
  const centerExclusionX = width * 0.5;
  const centerExclusionY = height * 0.5;
  const centerExclusionRadius = Math.min(width, height) * 0.15; // 15% of viewport dimension

  for (let i = 0; i < count; i++) {
    // Get row and column
    const row = Math.floor(i / columns);
    const col = i % columns;

    // Add randomness within cell
    const randomX = Math.random() * 0.8 + 0.1; // 10% to 90% of cell
    const randomY = Math.random() * 0.8 + 0.1; // 10% to 90% of cell

    // Calculate position as percentage
    let x = ((col + randomX) * cellWidth) / width * 100;
    let y = ((row + randomY) * cellHeight) / height * 100;

    // Ensure positions are within bounds
    x = Math.max(2, Math.min(98, x));
    y = Math.max(2, Math.min(98, y));

    // Calculate distance from center (in percentage units comparable to x/y)
    const centerXPercent = (centerExclusionX / width) * 100;
    const centerYPercent = (centerExclusionY / height) * 100;
    const distanceFromCenter = Math.sqrt(
      Math.pow(x - centerXPercent, 2) + Math.pow(y - centerYPercent, 2)
    );

    // Convert centerExclusionRadius to percent-of-min-dimension to compare roughly with distanceFromCenter
    const exclusionRadiusPercent =
      (centerExclusionRadius / Math.min(width, height)) * 100;

    const isTooCloseToCenter = distanceFromCenter < exclusionRadiusPercent;

    // Only add if not in exclusion zone, or try repositioning
    if (!isTooCloseToCenter) {
      positions.push({
        x: `${x}%`,
        y: `${y}%`,
        scale: 0.7 + Math.random() * 0.6, // Random size between 70% and 130%
        rotation: Math.random() * 40 - 20, // Random rotation between -20 and 20 degrees
        delay: Math.random() * 2, // Random animation delay
      });
    } else {
      // Try edge positioning instead
      const edgeX = Math.random() > 0.5 ? Math.random() * 10 + 2 : Math.random() * 10 + 88;
      const edgeY = Math.random() > 0.5 ? Math.random() * 10 + 2 : Math.random() * 10 + 88;

      positions.push({
        x: `${edgeX}%`,
        y: `${edgeY}%`,
        scale: 0.7 + Math.random() * 0.6,
        rotation: Math.random() * 40 - 20,
        delay: Math.random() * 2,
      });
    }
  }

  return positions;
};

// Generate icon definition array with variants
const generateIcons = (count: number): IconDefinition[] => {
  const result: IconDefinition[] = [];

  // Get all icon keys
  const iconKeys = Object.keys(iconComponents);

  // Create variants for each icon type
  for (let i = 0; i < count; i++) {
    const iconKey = iconKeys[i % iconKeys.length];
    const component = iconComponents[iconKey];
    const colorIndex = i % pinkPalette.length;

    // For variants, add a suffix for differentiation when we reuse icons
    const variantSuffix = Math.floor(i / iconKeys.length) > 0 ? `-${Math.floor(i / iconKeys.length)}` : "";

    result.push({
      component,
      color: pinkPalette[colorIndex],
      variant: `${iconKey.toLowerCase()}${variantSuffix}`,
      opacity: 0.15 + Math.random() * 0.2, // Slightly increased opacity baseline (0.15-0.35)
      strokeWidth: 1.5 + Math.random(), // Random stroke width for variety
    });
  }

  return result;
};

const FitnessIconSystem: React.FC = () => {
  const [mounted, setMounted] = useState<boolean>(false);
  const [scrollY, setScrollY] = useState<number>(0);
  const [dimensions, setDimensions] = useState<{ width: number; height: number }>({
    width: 1200,
    height: 800,
  });

  // usePathname may return null on some Next versions; guard with fallback
  const pathname = usePathname() ?? "/";
  const isHomepage = pathname === "/";

  // Determine icon count based on viewport size
  const getIconCount = (): number => {
    const { width } = dimensions;
    if (width >= 1024) return 54; // Desktop: 54 icons
    if (width >= 768) return 40; // Tablet: 40 icons
    return 30; // Mobile: 30 icons
  };

  // Generate positions and icons based on viewport dimensions
  const iconCount = getIconCount();
  const iconPositions = useMemo<IconPosition[]>(
    () => generateIconPositions(iconCount, dimensions.width, dimensions.height),
    [iconCount, dimensions.width, dimensions.height]
  );
  const icons = useMemo<IconDefinition[]>(() => generateIcons(iconCount), [iconCount]);

  // Handle scroll and resize
  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleScroll = () => {
      setScrollY(window.scrollY || window.pageYOffset || 0);
    };

    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    setMounted(true);
    handleResize(); // Initial size check
    handleScroll(); // Initial scroll check

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
      setMounted(false);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // intentionally empty deps: only mount/unmount handlers

  if (!mounted) return null;

  // Don't show icons in the hero section of the homepage
  if (isHomepage && scrollY < 650) return null;

  // Calculate opacity based on scroll position (fade in effect)
  const getOpacity = (baseOpacity: number): number => {
    if (isHomepage) {
      // For homepage, gradually increase opacity as user scrolls down
      const scrollProgress = Math.min(1, Math.max(0, (scrollY - 650) / 300));
      return baseOpacity * scrollProgress;
    }
    return baseOpacity;
  };

  return (
    <>
      {iconPositions.map((position, index) => {
        // Ensure we don't exceed our icons array
        const iconIndex = index % icons.length;
        const { component: Icon, color, variant, opacity, strokeWidth } = icons[iconIndex];

        // Dynamic styles with GPU acceleration
        const style: CSSProperties = {
          left: position.x,
          top: position.y,
          transform: `rotate(${position.rotation}deg) scale(${position.scale}) translateZ(0)`,
          color: color,
          opacity: getOpacity(opacity),
          zIndex: 500 + (index % 20),
          willChange: "transform, opacity",
          animationDelay: `${position.delay}s`,
          // strokeWidth is a prop on the Lucide icon component, not a CSS property.
        };

        return (
          <div
            key={`${variant}-${index}`}
            className={cn(
              "fixed-icon",
              index % 2 === 0 ? "fixed-icon-animate-1" : "fixed-icon-animate-2"
            )}
            style={style}
            data-icon={variant}
            aria-hidden="true"
          >
            {/* Pass strokeWidth to the icon component */}
            <Icon size={32} strokeWidth={strokeWidth} />
          </div>
        );
      })}
    </>
  );
};

export default FitnessIconSystem;
