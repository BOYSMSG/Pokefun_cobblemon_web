"use client";

import React, { useState } from "react";
import Link from "next/link";
import fusionsData from "@/data/fusions.json";

export default function FusionDex() {
  const [searchTerm, setSearchTerm] = useState("");
  const fusions = (fusionsData as any[]).filter(fusion => 
    fusion.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (fusion.primaryType && fusion.primaryType.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (fusion.secondaryType && fusion.secondaryType.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 text-slate-100 min-h-[85vh]">
      
      {/* Back button */}
      <div className="mb-6">
        <Link 
          href="/wiki" 
          className="inline-flex items-center gap-2 text-xs font-bold text-cyan-400 hover:text-cyan-300 transition-colors bg-cyan-950/40 px-3 py-1.5 rounded-xl border border-cyan-500/20"
        >
          <i className="fa-solid fa-arrow-left text-[10px]"></i>
          <span>Back to Wiki</span>
        </Link>
      </div>

      {/* Header */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-400 text-xs font-black uppercase tracking-wider mb-3">
          <i className="fa-solid fa-dna"></i>
          <span>Cobblemon DNA Splicing</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-3">
          Pokémon Fusion Dex
        </h1>
        <p className="text-slate-400 text-sm md:text-base max-w-xl mx-auto leading-relaxed mb-6">
          Discover powerful hybrid Pokémon created through Cobblemon DNA splicing. Inspect unique multi-type combinations, base stats, and custom abilities.
        </p>

        {/* Search */}
        <div className="max-w-md mx-auto relative">
          <i className="fa-solid fa-magnifying-glass absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 text-sm"></i>
          <input 
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search fusions by name or type..."
            className="w-full pl-11 pr-4 py-3 bg-slate-900/80 border border-slate-700/80 rounded-2xl text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/50 text-sm shadow-inner"
          />
        </div>
      </div>

      {fusions.length === 0 ? (
        <div className="text-center py-20 text-slate-500">
          <i className="fa-solid fa-flask text-4xl mb-3 block"></i>
          <p className="text-base font-bold text-slate-300">No Fusions Found</p>
          <p className="text-xs text-slate-500 mt-1">Try a different search keyword</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-6 pb-12">
          {fusions.map((fusion, idx) => (
            <Link 
              key={idx} 
              href={`/wiki/fusions/${fusion.id || fusion.name.toLowerCase().replace(/ /g, '-')}`}
              className="group relative flex flex-col items-center justify-between p-4 sm:p-5 rounded-2xl bg-slate-900/70 hover:bg-slate-900/90 border border-slate-800 hover:border-cyan-500/40 transition-all duration-300 hover:-translate-y-1.5 shadow-lg hover:shadow-cyan-500/10 backdrop-blur-md overflow-hidden text-center"
            >
              <div className="w-24 h-24 sm:w-28 sm:h-28 my-3 flex items-center justify-center relative">
                <div className="absolute inset-0 bg-cyan-500/10 rounded-full blur-lg group-hover:bg-cyan-500/25 transition-all"></div>
                <img 
                  src={fusion.image || `/images/fakemons/${fusion.name.toLowerCase().replace(/ /g, '_')}.png`}
                  alt={fusion.name} 
                  className="relative w-full h-full object-contain filter drop-shadow-[0_4px_10px_rgba(0,0,0,0.5)] group-hover:scale-110 transition-transform duration-300"
                  loading="lazy"
                  onError={(e) => {
                    e.currentTarget.src = "/images/pokefun_logo_transparent.png";
                  }}
                />
              </div>

              <h3 className="text-sm sm:text-base font-black text-white group-hover:text-cyan-400 transition-colors tracking-tight capitalize mb-2">
                {fusion.name.replace(/_/g, ' ')}
              </h3>

              <div className="flex items-center justify-center gap-1.5 flex-wrap">
                {fusion.primaryType && (
                  <span className={`px-2 py-0.5 rounded text-[10px] font-black uppercase text-white bg-slate-800 border border-slate-700`}>
                    {fusion.primaryType}
                  </span>
                )}
                {fusion.secondaryType && (
                  <span className={`px-2 py-0.5 rounded text-[10px] font-black uppercase text-white bg-slate-800 border border-slate-700`}>
                    {fusion.secondaryType}
                  </span>
                )}
              </div>
            </Link>
          ))}
        </div>
      )}

    </div>
  );
}