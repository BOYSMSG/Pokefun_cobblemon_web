"use client";

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';

export default function PokedexIndex() {
  const [pokemonList, setPokemonList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [limit, setLimit] = useState(151);

  useEffect(() => {
    fetch('https://pokeapi.co/api/v2/pokemon?limit=1025')
      .then(res => res.json())
      .then(data => {
        const results = data.results.map((p: any, index: number) => ({
          ...p,
          id: index + 1,
          name: p.name.charAt(0).toUpperCase() + p.name.slice(1).replace('-', ' ')
        }));
        setPokemonList(results);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const filteredPokemon = useMemo(() => {
    if (!searchTerm) return pokemonList;
    return pokemonList.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()));
  }, [pokemonList, searchTerm]);

  // Load more on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight - 500) {
        setLimit(prev => Math.min(prev + 50, filteredPokemon.length));
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [filteredPokemon.length]);

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
          <i className="fa-solid fa-book-bookmark"></i>
          <span>Cobblemon Database</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-3">
          Official Pokédex
        </h1>
        <p className="text-slate-400 text-sm md:text-base max-w-xl mx-auto leading-relaxed">
          Explore complete species stats, typings, catch rates, and evolutionary pathways available in Cobblemon 1.21.1.
        </p>

        {/* Search Input */}
        <div className="relative max-w-xl mx-auto mt-6">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-cyan-400">
            <i className="fa-solid fa-magnifying-glass"></i>
          </div>
          <input 
            type="text" 
            placeholder="Search Pokémon by name or ID..." 
            value={searchTerm}
            onChange={e => {
              setSearchTerm(e.target.value);
              setLimit(151);
            }}
            className="w-full pl-11 pr-4 py-3.5 bg-slate-900/80 border border-cyan-500/30 rounded-2xl text-white placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20 backdrop-blur-md shadow-lg shadow-black/40 transition-all"
          />
        </div>
      </div>

      {/* Content */}
      {loading ? (
        <div className="text-center py-24 text-slate-400">
          <i className="fa-solid fa-circle-notch fa-spin text-4xl text-cyan-400 mb-4 block"></i>
          <span className="text-base font-semibold">Loading Pokédex Database...</span>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-6 pb-12">
          {filteredPokemon.slice(0, limit).map((pokemon) => (
            <Link 
              key={pokemon.id} 
              href={`/wiki/pokedex/${pokemon.id}`}
              className="group relative flex flex-col items-center justify-between p-4 sm:p-5 rounded-2xl bg-slate-900/70 hover:bg-slate-900/90 border border-slate-800 hover:border-cyan-500/40 transition-all duration-300 hover:-translate-y-1.5 shadow-lg hover:shadow-cyan-500/10 backdrop-blur-md overflow-hidden text-center"
            >
              <div className="absolute top-2.5 left-3 text-[11px] font-black font-mono text-slate-600 group-hover:text-cyan-400/80 transition-colors">
                #{String(pokemon.id).padStart(4, '0')}
              </div>

              <div className="w-24 h-24 sm:w-28 sm:h-28 my-3 flex items-center justify-center relative">
                <div className="absolute inset-0 bg-cyan-500/10 rounded-full blur-lg group-hover:bg-cyan-500/25 transition-all"></div>
                <img 
                  src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`} 
                  alt={pokemon.name} 
                  className="relative w-full h-full object-contain filter drop-shadow-[0_4px_10px_rgba(0,0,0,0.5)] group-hover:scale-110 transition-transform duration-300"
                  loading="lazy"
                  onError={(e) => {
                    e.currentTarget.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`;
                  }}
                />
              </div>

              <h3 className="text-sm sm:text-base font-black text-white group-hover:text-cyan-400 transition-colors tracking-tight">
                {pokemon.name}
              </h3>
            </Link>
          ))}

          {filteredPokemon.length === 0 && (
            <div className="col-span-full py-16 text-center text-slate-400">
              <i className="fa-solid fa-ghost text-4xl text-slate-600 mb-3 block"></i>
              <p className="text-base font-bold text-slate-300">No Pokémon found matching &quot;{searchTerm}&quot;</p>
              <p className="text-slate-500 text-xs mt-1">Check spelling or search by species name.</p>
            </div>
          )}
        </div>
      )}

    </div>
  );
}
