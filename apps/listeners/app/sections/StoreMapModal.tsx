"use client";

import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";

type Store = {
  id: string;
  name: string;
  type: "Barbershop" | "Bodega" | "Restaurant" | "Cafe" | "Record store";
  address: string;
  neighborhood: string;
  /** position on the stylized map, as % */
  x: number;
  y: number;
};

/**
 * Curated sample of B2B partner locations. Replace with live data once
 * your store-partner backend exposes an endpoint.
 */
const STORES: Store[] = [
  { id: "s1", name: "Levels Barbershop", type: "Barbershop", address: "125th St & Lenox", neighborhood: "Harlem", x: 45, y: 40 },
  { id: "s2", name: "La Caridad Bodega", type: "Bodega", address: "116th St & 7th Ave", neighborhood: "Harlem", x: 42, y: 55 },
  { id: "s3", name: "Uptown Records", type: "Record store", address: "145th & St. Nicholas", neighborhood: "Harlem", x: 38, y: 25 },
  { id: "s4", name: "Casa Adela", type: "Restaurant", address: "Loisaida Ave", neighborhood: "LES", x: 62, y: 78 },
  { id: "s5", name: "Silverstone Cafe", type: "Cafe", address: "Frederick Douglass Blvd", neighborhood: "Harlem", x: 40, y: 48 },
  { id: "s6", name: "Manolo's Cuts", type: "Barbershop", address: "3rd Ave & 115th", neighborhood: "East Harlem", x: 55, y: 50 },
  { id: "s7", name: "Dominican Joe's", type: "Bodega", address: "181st & Broadway", neighborhood: "Washington Heights", x: 30, y: 12 },
  { id: "s8", name: "Sylvia's", type: "Restaurant", address: "Lenox Ave", neighborhood: "Harlem", x: 44, y: 42 },
  { id: "s9", name: "The Dutch", type: "Cafe", address: "Fulton St", neighborhood: "Bed-Stuy", x: 72, y: 68 },
  { id: "s10", name: "Marcus Books", type: "Record store", address: "Malcolm X Blvd", neighborhood: "Harlem", x: 48, y: 38 },
  { id: "s11", name: "El Nuevo Amanecer", type: "Bodega", address: "Grand Concourse", neighborhood: "South Bronx", x: 58, y: 18 },
  { id: "s12", name: "Corner Social", type: "Restaurant", address: "Lenox & 126th", neighborhood: "Harlem", x: 46, y: 36 },
];

type StoreMapModalProps = {
  open: boolean;
  onClose: () => void;
};

export function StoreMapModal({ open, onClose }: StoreMapModalProps) {
  const [selected, setSelected] = useState<Store | null>(null);

  // Close on ESC
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (open) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  // Lock body scroll while open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "";
      };
    }
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          style={{ background: "rgba(10, 14, 26, 0.92)", backdropFilter: "blur(16px)" }}
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.4, ease: [0.2, 0.8, 0.2, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-6xl h-[85vh] max-h-[900px] rounded-2xl overflow-hidden flex"
            style={{
              background: "var(--bg-surface)",
              border: "1px solid var(--divider-soft)",
            }}
          >
            {/* Close */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-bg-deep/70 hover:bg-bg-deep text-white flex items-center justify-center border border-divider transition-colors"
              aria-label="Close map"
            >
              ✕
            </button>

            {/* Map */}
            <div className="relative flex-1 overflow-hidden">
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "radial-gradient(circle at 30% 40%, rgba(37, 99, 235, 0.15) 0%, transparent 60%), #0a0e1a",
                }}
              />
              <div
                aria-hidden
                className="absolute inset-0 opacity-20"
                style={{
                  backgroundImage:
                    "linear-gradient(to right, rgba(37, 99, 235, 0.3) 1px, transparent 1px), linear-gradient(to bottom, rgba(37, 99, 235, 0.3) 1px, transparent 1px)",
                  backgroundSize: "60px 60px",
                }}
              />

              {/* Pins */}
              {STORES.map((store) => (
                <button
                  key={store.id}
                  onClick={() => setSelected(store)}
                  className="absolute -translate-x-1/2 -translate-y-1/2 group"
                  style={{ left: `${store.x}%`, top: `${store.y}%` }}
                  aria-label={store.name}
                >
                  <div className="relative">
                    <div
                      className={
                        "w-4 h-4 rounded-full transition-all " +
                        (selected?.id === store.id
                          ? "bg-white scale-150"
                          : "bg-brand-electric group-hover:scale-125")
                      }
                      style={{
                        boxShadow:
                          selected?.id === store.id
                            ? "0 0 0 8px rgba(255,255,255,0.2)"
                            : "0 0 0 6px rgba(37, 99, 235, 0.25)",
                      }}
                    />
                    <div
                      className="absolute inset-0 rounded-full bg-brand-electric opacity-60"
                      style={{ animation: "ping 2.5s ease-in-out infinite" }}
                    />
                  </div>
                </button>
              ))}

              {/* Map title overlay */}
              <div className="absolute top-6 left-6 pointer-events-none">
                <div className="text-eyebrow uppercase text-brand-electric font-semibold mb-1">
                  Participating businesses
                </div>
                <div className="font-display font-semibold text-white text-[28px] leading-[1.1] tracking-[-0.02em]">
                  Find a code near you.
                </div>
                <div className="text-text-muted text-sm mt-1">
                  Walk in. Scan the poster. Join Unis.
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="w-[340px] border-l border-divider-soft flex flex-col bg-bg-deep">
              <div className="p-6 border-b border-divider">
                <div className="text-eyebrow uppercase text-text-muted font-semibold mb-1">
                  {STORES.length} locations · Harlem area
                </div>
                <div className="font-display text-white text-[20px] tracking-tight">
                  Each one has its own referral code.
                </div>
              </div>

              {selected ? (
                <div className="flex-1 overflow-auto p-6">
                  <div className="text-eyebrow uppercase text-brand-electric font-semibold mb-2">
                    {selected.type}
                  </div>
                  <h3 className="font-display font-semibold text-white text-[28px] leading-[1.1] tracking-[-0.02em] mb-3">
                    {selected.name}
                  </h3>
                  <div className="text-text-secondary text-[15px] mb-1">
                    {selected.address}
                  </div>
                  <div className="text-text-muted text-sm mb-6">
                    {selected.neighborhood}
                  </div>
                  <div className="rounded-xl bg-bg-elevated p-4 mb-4 border border-divider">
                    <div className="text-eyebrow uppercase text-text-muted font-semibold mb-2">
                      Their referral code
                    </div>
                    <div className="font-display font-semibold text-brand-electric text-[22px] tracking-[0.1em]">
                      UNIS-{selected.id.toUpperCase()}
                    </div>
                  </div>
                  <p className="text-text-secondary text-[14px] leading-[1.6]">
                    Walk in, scan the poster in their window, and you'll be
                    signed up with {selected.name}'s code. They earn lifetime
                    passive income from every user they bring in.
                  </p>
                </div>
              ) : (
                <div className="flex-1 overflow-auto p-6">
                  <div className="text-text-muted text-sm mb-4">
                    Click a pin to see the business and their code.
                  </div>
                  <ul className="space-y-1">
                    {STORES.map((s) => (
                      <li key={s.id}>
                        <button
                          onClick={() => setSelected(s)}
                          className="w-full text-left p-3 rounded-lg hover:bg-bg-elevated transition-colors"
                        >
                          <div className="text-white text-sm font-medium">
                            {s.name}
                          </div>
                          <div className="text-text-muted text-xs flex items-center gap-1.5">
                            <span>{s.type}</span>
                            <span className="text-brand-electric">·</span>
                            <span>{s.neighborhood}</span>
                          </div>
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
