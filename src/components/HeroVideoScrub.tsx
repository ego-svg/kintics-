"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "motion/react";

export interface HeroVideoScrubProps {
  videoSrc?: string;
  posterSrc?: string;
  brandTag?: string;
  headlineLine1?: string;
  headlineLine2?: string;
  subhead?: string;
  primaryCtaText?: string;
  secondaryCtaText?: string;
  onExploreClick?: () => void;
  onCatalogClick?: () => void;
}

export const HeroVideoScrub: React.FC<HeroVideoScrubProps> = ({
  videoSrc = "/video_2026-10-08_12-56-40.mp4",
  posterSrc = "/hero-poster.jpg",
  brandTag = "EDITION 2026 // SPATIAL ARCHIVE — RUNWAY REEL",
  headlineLine1 = "KINESIS",
  headlineLine2 = "HAUTE COUTURE",
  subhead = "Real-time physics, microscopic weave fidelity, and zero-latency spatial commerce for the next era of digital fashion houses.",
  primaryCtaText = "ENTER SPATIAL RUNWAY",
  secondaryCtaText = "SPECIFICATION MATRIX",
  onExploreClick,
  onCatalogClick,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const [videoLoaded, setVideoLoaded] = useState(false);
  const [isReducedMotion, setIsReducedMotion] = useState(false);
  const [videoDuration, setVideoDuration] = useState<number>(0);
  const [isPlayingManual, setIsPlayingManual] = useState(false);

  // Framer Motion scroll hooks for zero-CLS hardware-accelerated UI overlay fade
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Fade out smoothly as user scrolls past first 20%
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.16, 0.22], [1, 0.35, 0]);
  const overlayY = useTransform(scrollYProgress, [0, 0.22], [0, -50]);
  const overlayScale = useTransform(scrollYProgress, [0, 0.22], [1, 0.98]);

  // Floating telemetry indicators during scroll
  const scrollTrackerOpacity = useTransform(scrollYProgress, [0, 0.04, 0.88, 0.98], [0, 1, 1, 0]);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setIsReducedMotion(mediaQuery.matches);

    const handleMotionChange = (e: MediaQueryListEvent) => {
      setIsReducedMotion(e.matches);
    };

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener("change", handleMotionChange);
    } else {
      mediaQuery.addListener(handleMotionChange);
    }

    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener("change", handleMotionChange);
      } else {
        mediaQuery.removeListener(handleMotionChange);
      }
    };
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    const container = containerRef.current;
    if (!video || !container) return;

    let targetTime = 0;
    let currentTime = 0;
    let lastTimestamp = performance.now();
    let animationFrameId: number;

    const onMetadata = () => {
      if (Number.isFinite(video.duration) && video.duration > 0) {
        setVideoDuration(video.duration);
        setVideoLoaded(true);
        try {
          if (video.currentTime === 0) {
            video.currentTime = 0.05;
          }
        } catch {
          // ignore
        }
      }
    };

    if (video.readyState >= 1 && Number.isFinite(video.duration) && video.duration > 0) {
      onMetadata();
    } else {
      video.addEventListener("loadedmetadata", onMetadata);
      video.addEventListener("canplay", onMetadata);
    }

    if (isReducedMotion) {
      video.muted = true;
      video.playsInline = true;
      video.play().catch(() => {});
      return () => {
        video.removeEventListener("loadedmetadata", onMetadata);
        video.removeEventListener("canplay", onMetadata);
      };
    }

    const updateScrub = (now: number) => {
      const dt = Math.min((now - lastTimestamp) / 1000, 0.1);
      lastTimestamp = now;

      if (!isPlayingManual) {
        const duration = video.duration;

        if (Number.isFinite(duration) && duration > 0 && container) {
          const rect = container.getBoundingClientRect();
          const totalScrollableDistance = rect.height - window.innerHeight;

          if (totalScrollableDistance > 0) {
            const scrolledAmount = -rect.top;
            const rawProgress = scrolledAmount / totalScrollableDistance;
            const progress = Math.max(0, Math.min(1, rawProgress));

            targetTime = progress * duration;

            // Mathematical smoothing: current += (target - current) * (1 - Math.exp(-dt * 8))
            const smoothingFactor = 1 - Math.exp(-dt * 8);
            currentTime += (targetTime - currentTime) * smoothingFactor;

            if (Math.abs(targetTime - currentTime) < 0.0004) {
              currentTime = targetTime;
            }

            if (
              Number.isFinite(currentTime) &&
              Math.abs(video.currentTime - currentTime) > 0.001
            ) {
              video.currentTime = Math.max(0, Math.min(duration, currentTime));
            }
          }
        }
      }

      animationFrameId = requestAnimationFrame(updateScrub);
    };

    animationFrameId = requestAnimationFrame(updateScrub);

    return () => {
      cancelAnimationFrame(animationFrameId);
      video.removeEventListener("loadedmetadata", onMetadata);
      video.removeEventListener("canplay", onMetadata);
    };
  }, [isReducedMotion, isPlayingManual]);

  const toggleManualPlayback = () => {
    const video = videoRef.current;
    if (!video) return;

    if (isPlayingManual) {
      video.pause();
      setIsPlayingManual(false);
    } else {
      video.muted = true;
      video.playsInline = true;
      video.play().then(() => {
        setIsPlayingManual(true);
      }).catch(() => {});
    }
  };

  const handleScrollDownClick = () => {
    if (containerRef.current) {
      const targetY = containerRef.current.offsetTop + window.innerHeight * 0.9;
      window.scrollTo({
        top: targetY,
        behavior: "smooth",
      });
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[300vh] select-none"
    >
      {/* Sticky Fullscreen Video Stage */}
      <div className="sticky top-0 h-screen w-full overflow-hidden z-0 bg-[#08080A]">
        {/* Background Video */}
        <video
          ref={videoRef}
          src={videoSrc}
          poster={posterSrc}
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 h-full w-full object-cover brightness-[0.88] contrast-[1.05]"
        />

        {/* Minimal Editorial Vignettes */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#08080A] via-transparent to-[#08080A]/40" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#08080A]/30 via-transparent to-[#08080A]/30" />

        {/* Top Architectural HUD */}
        <div className="pointer-events-none absolute top-20 left-6 right-6 z-30 flex items-center justify-between font-mono text-[10px] tracking-[0.2em] uppercase text-white/60">
          <div className="flex items-center gap-3">
            <span className="w-1.5 h-1.5 bg-[#E2FF3B]" />
            <span>KINESIS // SCROLL_TIMELINE</span>
          </div>

          <div className="flex items-center gap-4 pointer-events-auto">
            <button
              onClick={toggleManualPlayback}
              className={`px-3 py-1 border text-[9px] font-mono tracking-[0.2em] uppercase transition-colors ${
                isPlayingManual
                  ? "bg-[#E2FF3B] text-black border-[#E2FF3B] font-bold"
                  : "bg-black/60 text-white/80 border-white/20 hover:border-white/50"
              }`}
            >
              {isPlayingManual ? "[ PAUSE RUNWAY ]" : "[ PLAY REEL ]"}
            </button>

            <span className="hidden sm:inline text-white/40">
              {videoDuration > 0 ? `${videoDuration.toFixed(1)}S ARCHIVE` : "11.4S REEL"}
            </span>
          </div>
        </div>

        {/* Bottom Scroll Telemetry Line */}
        <motion.div
          style={{ opacity: scrollTrackerOpacity }}
          className="pointer-events-none absolute bottom-8 left-8 right-8 z-30 flex items-center justify-between font-mono text-[9px] tracking-[0.25em] text-white/50 uppercase"
        >
          <div className="flex items-center gap-3">
            <span className="text-[#E2FF3B]">TIMELINE PROGRESS</span>
            <span className="text-white/20">/</span>
            <span>FRAME-RATE INDEPENDENT LERP</span>
          </div>

          <div className="flex items-center gap-2">
            <span>SCROLL TO ADVANCE SEQUENCE</span>
            <span className="text-[#E2FF3B]">↓</span>
          </div>
        </motion.div>

        {/* Main Editorial Typographic Overlay */}
        <motion.div
          style={{
            opacity: overlayOpacity,
            y: overlayY,
            scale: overlayScale,
          }}
          className="absolute inset-0 z-20 flex flex-col justify-between p-6 sm:p-12 lg:p-16 select-none pointer-events-none"
        >
          <div className="pt-24" />

          {/* Monumental Fashion Title */}
          <div className="max-w-5xl mx-auto w-full my-auto text-center flex flex-col items-center">
            {/* Clean Unboxed Editorial Tag */}
            <div className="mb-6 font-mono text-[10px] sm:text-[11px] tracking-[0.3em] uppercase text-white/70">
              {brandTag}
            </div>

            <h1 className="font-bold text-6xl sm:text-8xl md:text-9xl lg:text-[124px] tracking-[-0.05em] leading-[0.85] uppercase text-white drop-shadow-2xl">
              {headlineLine1}
            </h1>
            <h2 className="font-light text-2xl sm:text-4xl md:text-5xl lg:text-6xl tracking-[-0.03em] uppercase text-white/50 mt-2">
              {headlineLine2}
            </h2>

            <p className="mt-8 max-w-xl text-center text-xs sm:text-sm text-white/70 font-normal leading-relaxed tracking-wide">
              {subhead}
            </p>

            {/* Architectural CTA Buttons */}
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4 pointer-events-auto">
              <button
                onClick={onExploreClick}
                className="px-8 py-4 bg-[#EDEDED] hover:bg-[#E2FF3B] text-black font-mono text-[11px] tracking-[0.22em] uppercase font-semibold transition-all duration-200"
              >
                {primaryCtaText}
              </button>

              <button
                onClick={onCatalogClick}
                className="px-8 py-4 bg-black/60 hover:bg-white/[0.08] border border-white/20 hover:border-white/50 text-white font-mono text-[11px] tracking-[0.22em] uppercase transition-all duration-200 backdrop-blur-sm"
              >
                {secondaryCtaText}
              </button>
            </div>
          </div>

          {/* Minimalist Vertical Hairline Scroll Indicator */}
          <div className="flex flex-col items-center justify-center pb-4 text-center pointer-events-auto">
            <button
              onClick={handleScrollDownClick}
              className="group flex flex-col items-center gap-3 text-white/40 hover:text-white transition-colors"
            >
              <span className="font-mono text-[9px] tracking-[0.3em] uppercase text-white/50 group-hover:text-[#E2FF3B] transition-colors">
                SCROLL TO SCRUB
              </span>
              <div className="w-[1px] h-10 bg-white/20 relative overflow-hidden">
                <motion.div
                  animate={{ y: [-10, 40] }}
                  transition={{
                    repeat: Infinity,
                    duration: 1.6,
                    ease: "easeInOut",
                  }}
                  className="w-full h-3 bg-[#E2FF3B]"
                />
              </div>
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default HeroVideoScrub;
