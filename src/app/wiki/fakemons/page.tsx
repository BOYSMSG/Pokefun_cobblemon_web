"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import fakemonsData from "@/data/fakemons.json";
import showcaseData from "@/data/fakemon_showcase.json";

export default function FakemonsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredMons, setFilteredMons] = useState(fakemonsData);
  const [visibleCount, setVisibleCount] = useState(48);

  useEffect(() => {
    setFilteredMons(
      fakemonsData.filter(mon => 
        mon.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
    setVisibleCount(48);
  }, [searchTerm]);

  const getFakemonImage = (fakemonName: string, id: string) => {
    const match = showcaseData.find(s => s.name.toLowerCase().includes(fakemonName.toLowerCase()));
    return match ? match.image : `/images/fakemons/${id}.png`;
  };

  const displayedMons = filteredMons.slice(0, visibleCount);

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
          <i className="fa-solid fa-wand-magic-sparkles"></i>
          <span>Custom Species Roster</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-3">
          Fakemon Dex
        </h1>
        <p className="text-slate-400 text-sm md:text-base max-w-xl mx-auto leading-relaxed">
          Discover {fakemonsData.length} unique custom Pokémon and regional variants native to the POKEFUN SMP universe.
        </p>

        {/* Search */}
        <div className="relative max-w-xl mx-auto mt-6">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-cyan-400">
            <i className="fa-solid fa-magnifying-glass"></i>
          </div>
          <input 
            type="text" 
            placeholder="Search custom Fakemons..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-11 pr-4 py-3.5 bg-slate-900/80 border border-cyan-500/30 rounded-2xl text-white placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20 backdrop-blur-md shadow-lg shadow-black/40 transition-all"
          />
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-6 pb-12">
        {displayedMons.map((mon, idx) => (
          <Link 
            key={idx} 
            href={`/wiki/fakemons/${mon.id || mon.name.toLowerCase().replace(/ /g, '-')}`}
            className="group relative flex flex-col items-center justify-between p-4 sm:p-5 rounded-2xl bg-slate-900/70 hover:bg-slate-900/90 border border-slate-800 hover:border-cyan-500/40 transition-all duration-300 hover:-translate-y-1.5 shadow-lg hover:shadow-cyan-500/10 backdrop-blur-md overflow-hidden text-center"
          >
            <div className="w-24 h-24 sm:w-28 sm:h-28 my-3 flex items-center justify-center relative">
              <div className="absolute inset-0 bg-cyan-500/10 rounded-full blur-lg group-hover:bg-cyan-500/25 transition-all"></div>
              <img 
                src={getFakemonImage(mon.name, mon.id)}
                alt={mon.name} 
                className="relative w-full h-full object-contain filter drop-shadow-[0_4px_10px_rgba(0,0,0,0.5)] group-hover:scale-110 transition-transform duration-300"
                loading="lazy"
                onError={(e) => {
                  e.currentTarget.src = "/images/pokefun_logo_transparent.png";
                }}
              />
            </div>

            <h3 className="text-sm sm:text-base font-black text-white group-hover:text-cyan-400 transition-colors tracking-tight capitalize mb-2">
              {mon.name.replace(/_/g, ' ')}
            </h3>

            <div className="flex items-center justify-center gap-1.5 flex-wrap">
              {mon.types && mon.types.map((t: string, i: number) => (
                <span key={i} className="px-2 py-0.5 rounded text-[10px] font-black uppercase text-white bg-slate-800 border border-slate-700">
                  {t}
                </span>
              ))}
            </div>
          </Link>
        ))}

        {filteredMons.length === 0 && (
          <div className="col-span-full py-16 text-center text-slate-400">
            <i className="fa-solid fa-ghost text-4xl text-slate-600 mb-3 block"></i>
            <p className="text-base font-bold text-slate-300">No Fakemons found matching &quot;{searchTerm}&quot;</p>
            <p className="text-slate-500 text-xs mt-1">Try another search keyword.</p>
          </div>
        )}
      </div>

      {visibleCount < filteredMons.length && (
        <div className="text-center pb-12">
          <button 
            onClick={() => setVisibleCount(prev => prev + 36)}
            className="px-8 py-3.5 rounded-2xl font-black text-xs uppercase tracking-wider text-white bg-slate-800 hover:bg-slate-700 border border-cyan-500/30 transition-all shadow-lg hover:shadow-cyan-500/10"
          >
            Load More Fakemons ({filteredMons.length - visibleCount} remaining)
          </button>
        </div>
      )}

    </div>
  );
}
