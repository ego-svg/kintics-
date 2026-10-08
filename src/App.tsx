"use client";

import React, { useState } from "react";
import HeroVideoScrub from "./components/HeroVideoScrub";
import GarmentViewer3D from "./components/GarmentViewer3D";

export default function App() {
  const [cartCount, setCartCount] = useState(0);
  const [checkoutNotification, setCheckoutNotification] = useState<string | null>(null);

  const handleAddToCart = (productName: string) => {
    setCartCount((prev) => prev + 1);
    setCheckoutNotification(`ARCHIVED // ${productName} ADDED TO VAULT`);
    setTimeout(() => {
      setCheckoutNotification(null);
    }, 3500);
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-[#08080A] text-[#EDEDED] font-sans selection:bg-[#E2FF3B] selection:text-black">
      {/* 1. Global Haute Couture Architectural Navigation Header */}
      <header className="fixed top-0 left-0 right-0 z-50 px-6 sm:px-10 py-5 flex items-center justify-between backdrop-blur-md bg-[#08080A]/70 border-b border-white/[0.08]">
        <div className="flex items-center gap-8">
          <div className="flex items-baseline gap-3">
            <span className="font-bold tracking-[-0.04em] text-xl text-white">
              KINESIS
            </span>
            <span className="font-mono text-[9px] tracking-[0.25em] text-white/40 uppercase">
              PARIS / MILANO
            </span>
          </div>

          <div className="hidden lg:flex items-center gap-4 font-mono text-[10px] tracking-[0.2em] text-white/30 uppercase">
            <span>RUNWAY 2026</span>
            <span>·</span>
            <span>SPATIAL COMMERCE ENGINE</span>
          </div>
        </div>

        {/* Center Nav Anchors */}
        <nav className="hidden md:flex items-center gap-8 font-mono text-[10px] tracking-[0.22em] uppercase text-white/60">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="hover:text-white transition-colors"
          >
            01 / RUNWAY
          </button>
          <button
            onClick={() => scrollToSection("spatial-stage")}
            className="hover:text-white transition-colors"
          >
            02 / 3D STAGE
          </button>
          <button
            onClick={() => scrollToSection("bento-matrix")}
            className="hover:text-white transition-colors"
          >
            03 / MATRIX
          </button>
          <button
            onClick={() => scrollToSection("capsule-vault")}
            className="hover:text-white transition-colors"
          >
            04 / ARCHIVE
          </button>
        </nav>

        {/* Right Vault Trigger */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => handleAddToCart("DIGITAL TWIN LICENSE")}
            className="px-4 py-2 border border-white/20 hover:border-white/60 font-mono text-[10px] tracking-[0.2em] uppercase text-white transition-colors"
          >
            VAULT [{cartCount}]
          </button>
        </div>
      </header>

      {/* Cart Toast Notification */}
      {checkoutNotification && (
        <div className="fixed bottom-6 right-6 z-50 px-5 py-3.5 bg-[#0E0E12] border border-[#E2FF3B]/50 shadow-[0_0_30px_rgba(0,0,0,0.8)] font-mono text-[10px] tracking-[0.2em] uppercase text-white flex items-center gap-3">
          <span className="w-1.5 h-1.5 bg-[#E2FF3B]" />
          <span>{checkoutNotification}</span>
        </div>
      )}

      {/* 2. THE SCROLL-SCRUB HERO SECTION */}
      <HeroVideoScrub
        videoSrc="/video_2026-10-08_12-56-40.mp4"
        posterSrc="/hero-poster.jpg"
        brandTag="EDITION 2026 // SPATIAL ARCHIVE — RUNWAY REEL"
        headlineLine1="KINESIS"
        headlineLine2="SPATIAL RUNWAY"
        subhead="Precision frame-rate independent scroll scrubbing through microscopic cloth physics, virtual seam stress, and digital twins."
        primaryCtaText="EXPLORE 3D ASSETS"
        secondaryCtaText="SYSTEM ARCHITECTURE"
        onExploreClick={() => scrollToSection("spatial-stage")}
        onCatalogClick={() => scrollToSection("bento-matrix")}
      />

      {/* 3. EDITORIAL MANIFESTO */}
      <section className="relative z-10 px-6 sm:px-12 lg:px-16 py-28 border-t border-b border-white/[0.08] bg-[#08080A]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-baseline">
          <div className="lg:col-span-5">
            <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#E2FF3B] mb-4">
              01.0 / ART DIRECTION & THESIS
            </div>
            <h2 className="text-3xl sm:text-5xl font-semibold tracking-[-0.03em] uppercase leading-[0.95] text-white">
              HAUTE COUTURE DYNAMICS MEET SUB-MILLIMETER SHADER GRAPHS.
            </h2>
          </div>

          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-8 text-[#8E8E93] text-sm leading-relaxed">
            <p>
              Traditional luxury commerce forces garments onto static flat-pack 2D photography.
              KINESIS replaces obsolete product grids with interactive real-time spatial assets,
              allowing collectors to scrub through fluid motion, inspect microfiber weaves, and
              verify physical-digital twin authenticity.
            </p>
            <p>
              Engineered with zero-CLS scroll-bound transforms, frame-rate independent LERP physics,
              and GPU-accelerated WebGL materials. Every seam reflects dynamic HDR lighting and
              accurate tensile drape.
            </p>
          </div>
        </div>
      </section>

      {/* 4. INTERACTIVE 3D GARMENT STAGE */}
      <section id="spatial-stage" className="relative z-10 px-6 sm:px-12 lg:px-16 py-28 bg-[#09090D]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <div className="font-mono text-[10px] tracking-[0.25em] text-[#E2FF3B] uppercase mb-2">
                02.0 / SPATIAL ASSET VIEWER
              </div>
              <h2 className="text-3xl sm:text-5xl font-bold tracking-tight uppercase text-white">
                KINETIC TORSO SCULPTURE
              </h2>
            </div>
            <div className="flex items-center gap-3 font-mono text-[10px] text-white/50 tracking-[0.2em] uppercase">
              <span>THREE.JS R3F</span>
              <span className="text-white/20">/</span>
              <span>60 FPS INTERPOLATION</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* 3D WebGL Canvas Component */}
            <div className="lg:col-span-8">
              <GarmentViewer3D />
            </div>

            {/* Stage Side Inspector Controls */}
            <div className="lg:col-span-4 space-y-4">
              <div className="bg-[#0E0E12] border border-white/[0.08] p-6 space-y-6">
                <div className="flex items-center justify-between border-b border-white/[0.08] pb-4">
                  <span className="font-mono text-[10px] tracking-[0.2em] text-white/50 uppercase">
                    TECHNICAL TELEMETRY
                  </span>
                  <span className="font-mono text-[10px] text-[#E2FF3B] tracking-[0.2em]">
                    VERIFIED CAD
                  </span>
                </div>

                <div className="space-y-4 text-xs font-mono">
                  <div className="flex justify-between items-center py-2 border-b border-white/[0.04]">
                    <span className="text-white/40">TENSILE DRAPE RATING</span>
                    <span className="text-white font-medium">9.84 / 10.0</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-white/[0.04]">
                    <span className="text-white/40">TESSELLATION POLYCOUNT</span>
                    <span className="text-white font-medium">142,800 QUADS</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-white/[0.04]">
                    <span className="text-white/40">FABRIC WEIGHT DENSITY</span>
                    <span className="text-white font-medium">480 GSM TWILL</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-white/[0.04]">
                    <span className="text-white/40">CRYPTOGRAPHIC CHIP</span>
                    <span className="text-[#E2FF3B]">NFC-V HARDWARE</span>
                  </div>
                </div>

                <button
                  onClick={() => handleAddToCart("KINETIC TORSO SCULPTURE")}
                  className="w-full py-4 bg-[#E2FF3B] hover:bg-white text-black font-mono text-[11px] tracking-[0.22em] uppercase font-semibold transition-colors"
                >
                  ALLOCATE ASSET // $1,850 USD
                </button>
              </div>

              <div className="bg-[#0E0E12] border border-white/[0.08] p-5 font-mono text-[10px] tracking-wider text-white/50 leading-relaxed uppercase">
                Physical delivery includes bespoke hand-tailored garment and encrypted digital twin GLB/USDZ file for Apple Vision Pro & Unreal Engine 5.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. BENTO SPECIFICATION MATRIX */}
      <section id="bento-matrix" className="relative z-10 px-6 sm:px-12 lg:px-16 py-28 border-t border-white/[0.08] bg-[#08080A]">
        <div className="max-w-7xl mx-auto">
          <div className="mb-14">
            <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#E2FF3B] mb-2">
              03.0 / ENGINE ARCHITECTURE
            </div>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight uppercase text-white">
              BENTO SPECIFICATION MATRIX
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Bento Card 1: LERP Velocity */}
            <div className="md:col-span-2 bg-[#0E0E12] border border-white/[0.08] p-8 flex flex-col justify-between hover:border-white/30 transition-colors">
              <div>
                <div className="font-mono text-[10px] tracking-[0.25em] text-[#E2FF3B] uppercase mb-4">
                  MODULE [01] // LERP VELOCITY
                </div>
                <h3 className="text-2xl font-bold tracking-tight uppercase text-white mb-3">
                  Frame-Rate Independent Scroll Smoothing
                </h3>
                <p className="text-sm text-white/60 leading-relaxed max-w-lg">
                  Interpolates container scroll coordinates through delta time to maintain absolute 60fps rendering without jumpy seeking:
                </p>
                <div className="mt-4 p-4 bg-black/80 border border-white/10 font-mono text-xs text-[#E2FF3B]">
                  current += (target - current) * (1 - Math.exp(-dt * 8))
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-white/[0.06] flex items-center justify-between font-mono text-[10px] tracking-[0.2em] text-white/40 uppercase">
                <span>SEEK COEFFICIENT: 8.0</span>
                <span>DELTA CAP: 100MS</span>
              </div>
            </div>

            {/* Bento Card 2: Micro-Texture Fidelity */}
            <div className="bg-[#0E0E12] border border-white/[0.08] p-8 flex flex-col justify-between hover:border-white/30 transition-colors">
              <div>
                <div className="font-mono text-[10px] tracking-[0.25em] text-white/40 uppercase mb-4">
                  MODULE [02]
                </div>
                <h3 className="text-xl font-bold tracking-tight uppercase text-white mb-2">
                  Microfiber Weave Shaders
                </h3>
                <p className="text-xs text-white/60 leading-relaxed">
                  Sub-surface anisotropic cloth micro-fibers reacting physically to directional studio HDR probes.
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-white/[0.06] font-mono text-[10px] tracking-[0.2em] text-[#E2FF3B] uppercase">
                8K DISPLACEMENT MAPS
              </div>
            </div>

            {/* Bento Card 3: Cryptographic Twin */}
            <div className="bg-[#0E0E12] border border-white/[0.08] p-8 flex flex-col justify-between hover:border-white/30 transition-colors">
              <div>
                <div className="font-mono text-[10px] tracking-[0.25em] text-white/40 uppercase mb-4">
                  MODULE [03]
                </div>
                <h3 className="text-xl font-bold tracking-tight uppercase text-white mb-2">
                  Cryptographic Twin
                </h3>
                <p className="text-xs text-white/60 leading-relaxed">
                  Every real garment is linked via embedded NFC tag to an encrypted on-chain 3D spatial asset.
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-white/[0.06] font-mono text-[10px] tracking-[0.2em] text-white/40 uppercase">
                NFC-V HARDWARE SIGNATURE
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. CAPSULE ARCHIVE / COMMERCIAL CATALOG */}
      <section id="capsule-vault" className="relative z-10 px-6 sm:px-12 lg:px-16 py-28 border-t border-white/[0.08] bg-[#0A0A0E]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
            <div>
              <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#E2FF3B] mb-2">
                04.0 / CURATED PIECES
              </div>
              <h2 className="text-3xl sm:text-5xl font-bold tracking-tight uppercase text-white">
                CAPSULE COLLECTION 01
              </h2>
            </div>
            <div className="font-mono text-[10px] text-white/40 tracking-[0.2em] uppercase">
              3 EXCLUSIVE SPATIAL RUNWAY PIECES
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                id: "EDITION // 01",
                title: "BALLISTIC TECH TRENCH",
                tag: "WATERPROOF MEMBRANE",
                weight: "520 GSM",
                price: "$2,400",
                color: "OBSIDIAN NOIR",
              },
              {
                id: "EDITION // 02",
                title: "HYPER-STRUCTURAL CAPELET",
                tag: "TITANIUM BONING",
                weight: "340 GSM",
                price: "$1,950",
                color: "LIQUID SILVER",
              },
              {
                id: "EDITION // 03",
                title: "CYBER-VOLT TAILORED BLAZER",
                tag: "GRAPHENE FIBER",
                weight: "410 GSM",
                price: "$2,100",
                color: "ACID VOLT WEAVE",
              },
            ].map((item) => (
              <div
                key={item.id}
                className="bg-[#0E0E12] border border-white/[0.08] p-6 flex flex-col justify-between hover:border-white/30 transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between font-mono text-[10px] tracking-[0.2em] text-white/40 mb-6 uppercase">
                    <span>{item.id}</span>
                    <span className="text-[#E2FF3B]">{item.tag}</span>
                  </div>

                  <div className="h-56 bg-black flex items-center justify-center p-6 border border-white/[0.04] mb-6 relative">
                    <div className="w-24 h-24 border border-white/20 flex items-center justify-center">
                      <div className="w-12 h-12 border border-[#E2FF3B]/40" />
                    </div>
                    <span className="absolute bottom-3 left-4 font-mono text-[9px] text-white/30 tracking-[0.2em] uppercase">
                      3D ASSET CAD
                    </span>
                  </div>

                  <h4 className="text-xl font-bold tracking-tight uppercase text-white mb-2">
                    {item.title}
                  </h4>

                  <div className="flex items-center gap-3 font-mono text-[10px] text-white/40 mb-6 uppercase tracking-wider">
                    <span>{item.weight}</span>
                    <span>/</span>
                    <span>{item.color}</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between">
                  <span className="font-mono text-sm font-semibold text-white">
                    {item.price}
                  </span>
                  <button
                    onClick={() => handleAddToCart(item.title)}
                    className="px-4 py-2 border border-white/20 hover:border-white/60 hover:bg-white hover:text-black font-mono text-[10px] tracking-[0.2em] uppercase transition-colors"
                  >
                    ACQUIRE
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. HAUTE COUTURE EDITORIAL FOOTER */}
      <footer className="relative z-10 px-6 sm:px-12 lg:px-16 py-16 border-t border-white/[0.08] bg-[#060608] font-mono text-[10px] text-white/50 tracking-[0.2em] uppercase">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div>
            <div className="text-white font-bold text-sm tracking-tight mb-2">
              KINESIS // HAUTE COUTURE DIGITAL
            </div>
            <p className="text-white/40 max-w-sm text-[10px] leading-relaxed normal-case">
              Real-time video scroll scrub, WebGL spatial assets, and zero-latency commerce for luxury fashion houses.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-white/40">
            <span>PARIS</span>
            <span>—</span>
            <span>MILANO</span>
            <span>—</span>
            <span>NEW YORK</span>
            <span>—</span>
            <span>TOKYO</span>
          </div>

          <div className="text-white/30">
            © 2026 KINESIS SPATIAL CORP.
          </div>
        </div>
      </footer>
    </div>
  );
}
