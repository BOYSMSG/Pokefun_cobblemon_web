"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

const MODE_COLUMNS: Record<string, { label: string, key: string, color: string }[]> = {
  ranked: [
    { label: 'Elo', key: 'elo', color: '#10b981' },
    { label: 'Wins', key: 'wins', color: '#3b82f6' },
    { label: 'Losses', key: 'losses', color: '#ef4444' },
    { label: 'Streak', key: 'win_streak', color: '#f59e0b' },
    { label: 'Matches', key: 'total_matches', color: '#8b5cf6' },
  ],
  alphazone: [
    { label: 'Elo', key: 'elo', color: '#10b981' },
    { label: 'Kills', key: 'kills', color: '#ef4444' },
    { label: 'Deaths', key: 'deaths', color: '#6b7280' },
    { label: 'Wins', key: 'wins', color: '#3b82f6' },
    { label: 'Losses', key: 'losses', color: '#ef4444' },
  ],
  dungeon: [
    { label: 'Completed', key: 'dungeons_completed', color: '#10b981' },
    { label: 'Kills', key: 'dungeon_kills', color: '#ef4444' },
    { label: 'Deaths', key: 'dungeon_deaths', color: '#6b7280' },
    { label: 'Points', key: 'dungeon_points', color: '#3b82f6' },
  ],
  raid: [
    { label: 'Points', key: 'points', color: '#10b981' },
    { label: 'Won', key: 'total_raids_won', color: '#3b82f6' },
    { label: 'Damage', key: 'total_damage_dealt', color: '#ef4444' },
  ],
  battletower: [
    { label: 'Floor', key: 'highest_floor', color: '#10b981' },
    { label: 'Wins', key: 'total_wins', color: '#3b82f6' },
    { label: 'Losses', key: 'total_losses', color: '#ef4444' },
  ],
  pokedex: [
    { label: 'Caught', key: 'captures', color: '#10b981' },
  ]
};

export default function LeaderboardPage() {
  const [activeMainTab, setActiveMainTab] = useState('ranked');
  const [activeSubTab, setActiveSubTab] = useState('alphazone');
  const [leaderboardData, setLeaderboardData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState('');

  const mainTabs = [
    { id: 'ranked', label: 'Cobblemon Ranked (Elo)', icon: 'fa-solid fa-trophy', color: '#f59e0b' },
    { id: 'other', label: 'Activity & PvE Ranks', icon: 'fa-solid fa-layer-group', color: '#0ea5e9' }
  ];

  const subTabs = [
    { id: 'pokedex', label: 'Pokédex', icon: 'fa-solid fa-book', color: '#10b981' },
    { id: 'dungeon', label: 'Dungeons', icon: 'fa-solid fa-skull', color: '#8b5cf6' },
    { id: 'alphazone', label: 'AlphaZone', icon: 'fa-solid fa-fire', color: '#ef4444' },
    { id: 'raid', label: 'Raids', icon: 'fa-solid fa-meteor', color: '#ec4899' },
    { id: 'battletower', label: 'BattleTower', icon: 'fa-solid fa-chess-rook', color: '#6366f1' },
  ];

  const currentFetchMode = activeMainTab === 'ranked' ? 'ranked' : activeSubTab;

  useEffect(() => {
    setLoading(true);
    fetch(`/api/leaderboard?mode=${currentFetchMode}`)
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setLeaderboardData(data.data || []);
          setSortBy(data.sort);
        } else {
          setLeaderboardData([]);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLeaderboardData([]);
        setLoading(false);
      });
  }, [currentFetchMode]);

  const activeColumns = MODE_COLUMNS[currentFetchMode] || [];

  return (
    <div className="max-w-6xl mx-auto px-4 py-12 text-slate-100 min-h-[85vh]">
      
      {/* Header */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-950/60 border border-amber-500/30 text-amber-400 text-xs font-black uppercase tracking-wider mb-3">
          <i className="fa-solid fa-crown"></i>
          <span>Official Hall of Fame</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-3">
          Global Leaderboards
        </h1>
        <p className="text-slate-400 text-sm md:text-base max-w-xl mx-auto leading-relaxed">
          Track top ranked trainers across competitive Elo, dungeon clears, raid masteries, and Pokédex completion.
        </p>
      </div>

      {/* Main Tabs */}
      <div className="flex justify-center gap-3 mb-6">
        {mainTabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveMainTab(tab.id)}
            className={`px-5 py-3 rounded-2xl text-xs md:text-sm font-bold flex items-center gap-2.5 transition-all shadow-md ${
              activeMainTab === tab.id
                ? "bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 shadow-amber-500/20 scale-105"
                : "bg-slate-900/80 text-slate-400 hover:text-white border border-slate-800"
            }`}
          >
            <i className={tab.icon}></i>
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Sub Tabs */}
      {activeMainTab === 'other' && (
        <div className="flex justify-center gap-2 mb-8 flex-wrap">
          {subTabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveSubTab(tab.id)}
              className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
                activeSubTab === tab.id
                  ? "bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20 font-black"
                  : "bg-slate-900/70 text-slate-400 hover:text-white border border-slate-800"
              }`}
            >
              <i className={tab.icon}></i>
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      )}

      {/* Top 3 Podium (If data available) */}
      {!loading && leaderboardData.length >= 3 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {/* Silver #2 */}
          <div className="order-2 md:order-1 p-5 rounded-3xl bg-slate-900/80 border border-slate-600/40 text-center flex flex-col items-center justify-center backdrop-blur-md shadow-xl">
            <span className="text-2xl font-black text-slate-300 mb-1">#2</span>
            <img 
              src={`https://mc-heads.net/avatar/${leaderboardData[1].name || leaderboardData[1].player_name || 'steve'}/64`}
              alt="Rank 2"
              className="w-14 h-14 rounded-xl border-2 border-slate-400 my-2 shadow"
            />
            <span className="font-bold text-white text-base">{leaderboardData[1].name || leaderboardData[1].player_name || 'Trainer'}</span>
            <span className="text-xs text-cyan-400 font-mono mt-1">
              {activeColumns[0] ? `${activeColumns[0].label}: ${leaderboardData[1][activeColumns[0].key] || 0}` : ''}
            </span>
          </div>

          {/* Gold #1 */}
          <div className="order-1 md:order-2 p-6 rounded-3xl bg-gradient-to-b from-amber-950/60 to-slate-900/90 border-2 border-amber-500/50 text-center flex flex-col items-center justify-center backdrop-blur-md shadow-2xl scale-105">
            <i className="fa-solid fa-crown text-amber-400 text-2xl mb-1"></i>
            <span className="text-3xl font-black text-amber-400">#1</span>
            <img 
              src={`https://mc-heads.net/avatar/${leaderboardData[0].name || leaderboardData[0].player_name || 'steve'}/72`}
              alt="Rank 1"
              className="w-16 h-16 rounded-xl border-2 border-amber-400 my-2 shadow-lg shadow-amber-500/30"
            />
            <span className="font-extrabold text-white text-lg">{leaderboardData[0].name || leaderboardData[0].player_name || 'Trainer'}</span>
            <span className="text-xs text-amber-300 font-black font-mono mt-1">
              {activeColumns[0] ? `${activeColumns[0].label}: ${leaderboardData[0][activeColumns[0].key] || 0}` : ''}
            </span>
          </div>

          {/* Bronze #3 */}
          <div className="order-3 p-5 rounded-3xl bg-slate-900/80 border border-amber-800/40 text-center flex flex-col items-center justify-center backdrop-blur-md shadow-xl">
            <span className="text-2xl font-black text-amber-700 mb-1">#3</span>
            <img 
              src={`https://mc-heads.net/avatar/${leaderboardData[2].name || leaderboardData[2].player_name || 'steve'}/64`}
              alt="Rank 3"
              className="w-14 h-14 rounded-xl border-2 border-amber-700 my-2 shadow"
            />
            <span className="font-bold text-white text-base">{leaderboardData[2].name || leaderboardData[2].player_name || 'Trainer'}</span>
            <span className="text-xs text-cyan-400 font-mono mt-1">
              {activeColumns[0] ? `${activeColumns[0].label}: ${leaderboardData[2][activeColumns[0].key] || 0}` : ''}
            </span>
          </div>
        </div>
      )}

      {/* Main Table */}
      <div className="rounded-3xl bg-slate-900/80 border border-slate-800 overflow-hidden shadow-2xl backdrop-blur-md overflow-x-auto">
        {loading ? (
          <div className="py-24 text-center text-slate-400">
            <i className="fa-solid fa-circle-notch fa-spin text-3xl text-cyan-400 mb-3 block"></i>
            <span>Loading stats from game servers...</span>
          </div>
        ) : leaderboardData.length === 0 ? (
          <div className="py-24 text-center text-slate-400">
            <i className="fa-solid fa-ghost text-4xl text-slate-600 mb-3 block"></i>
            <p className="text-base font-bold text-slate-300">No data found for this category yet.</p>
          </div>
        ) : (
          <table className="w-full min-w-[700px] text-left border-collapse">
            <thead>
              <tr className="bg-slate-950/80 text-[11px] font-black uppercase tracking-wider text-slate-400 border-b border-slate-800">
                <th className="py-4 px-6 w-16 text-center">Rank</th>
                <th className="py-4 px-6">Trainer</th>
                {activeColumns.map(col => (
                  <th key={col.key} className="py-4 px-5 text-center text-white">
                    {col.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-sm">
              {leaderboardData.map((player, idx) => {
                const playerName = player.name || player.player_name || player.uuid || "Unknown Player";
                return (
                  <tr 
                    key={idx}
                    className={`transition-colors hover:bg-slate-800/50 ${
                      idx === 0 ? "bg-amber-500/5" : idx === 1 ? "bg-slate-300/5" : idx === 2 ? "bg-amber-700/5" : ""
                    }`}
                  >
                    <td className="py-4 px-6 font-black text-center">
                      {idx === 0 ? (
                        <span className="text-amber-400 font-extrabold flex items-center justify-center gap-1">
                          <i className="fa-solid fa-medal text-amber-400"></i> #1
                        </span>
                      ) : idx === 1 ? (
                        <span className="text-slate-300 font-extrabold flex items-center justify-center gap-1">
                          <i className="fa-solid fa-medal text-slate-300"></i> #2
                        </span>
                      ) : idx === 2 ? (
                        <span className="text-amber-600 font-extrabold flex items-center justify-center gap-1">
                          <i className="fa-solid fa-medal text-amber-600"></i> #3
                        </span>
                      ) : (
                        <span className="text-slate-500 font-mono">#{idx + 1}</span>
                      )}
                    </td>

                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <img 
                          src={`https://mc-heads.net/avatar/${playerName}/32`}
                          alt={playerName}
                          className="w-8 h-8 rounded-lg bg-slate-800 border border-slate-700 shrink-0"
                          onError={(e) => { e.currentTarget.src = "/images/pokefun_logo_transparent.png"; }}
                        />
                        <span className="font-bold text-white tracking-wide">{playerName}</span>
                      </div>
                    </td>

                    {activeColumns.map(col => (
                      <td key={col.key} className="py-4 px-5 text-center font-mono font-bold" style={{ color: col.color }}>
                        {player[col.key] !== undefined ? player[col.key] : 0}
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>

    </div>
  );
}
