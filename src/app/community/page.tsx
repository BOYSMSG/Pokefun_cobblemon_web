"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { createPortal } from 'react-dom';

export default function CommunityPage() {
  const router = useRouter();
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("All");
  const [sortBy, setSortBy] = useState("Newest");

  // Stats Modal State
  const [activeStatsReel, setActiveStatsReel] = useState<string | null>(null);
  const [statsData, setStatsData] = useState<{ likes: any[], dislikes: any[], viewers: any[] }>({ likes: [], dislikes: [], viewers: [] });
  const [activeStatsTab, setActiveStatsTab] = useState<'views' | 'likes' | 'dislikes'>('views');
  const [isStatsLoading, setIsStatsLoading] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const fetchStats = async (id: string) => {
    setActiveStatsReel(id);
    setActiveStatsTab('views');
    setIsStatsLoading(true);
    try {
      const res = await fetch(`/api/community/${id}/stats`);
      if (res.ok) {
        setStatsData(await res.json());
      } else {
        setStatsData({ likes: [], dislikes: [], viewers: [] });
      }
    } catch (e) {
      setStatsData({ likes: [], dislikes: [], viewers: [] });
    } finally {
      setIsStatsLoading(false);
    }
  };

  useEffect(() => {
    fetch('/api/community')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setPosts(data);
        } else {
          console.error("API returned error:", data);
          setPosts([]);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const handleInteract = async (e: React.MouseEvent, postId: string, action: 'like' | 'dislike') => {
    e.stopPropagation();
    try {
      const res = await fetch(`/api/community/${postId}/interact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action })
      });
      if (res.ok) {
        const data = await res.json();
        setPosts((prev: any) => prev.map((p: any) => {
          if (p.id === postId) {
            return { 
              ...p, 
              upvotes: data.likes, 
              downvotes: data.dislikes,
              isLiked: data.isLiked,
              isDisliked: data.isDisliked
            };
          }
          return p;
        }));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleFavorite = async (e: React.MouseEvent, postId: string) => {
    e.stopPropagation();
    try {
      const res = await fetch(`/api/community/${postId}/favorite`, {
        method: 'POST',
      });
      if (res.ok) {
        const data = await res.json();
        setPosts((prev: any) => prev.map((p: any) => {
          if (p.id === postId) {
            return { ...p, isSaved: data.isFavorited };
          }
          return p;
        }));
      } else if (res.status === 401) {
        alert("Please login to save posts.");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleFollow = async (e: React.MouseEvent, authorUsername: string) => {
    e.stopPropagation();
    try {
      const res = await fetch(`/api/profile/${authorUsername}/follow`, { method: 'POST' });
      if (res.ok) {
        const data = await res.json();
        if (data.success) {
          setPosts((prev: any) => prev.map((p: any) => {
            if (p.authorUsername === authorUsername) {
              return { ...p, isFollowing: data.isFollowing };
            }
            return p;
          }));
        } else {
          alert(data.error || "Please login to follow.");
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  const categories = ["All", "Favorites", "Announcements", "Guides", "Showcase", "Builds", "Safe Warp", "Home Locations", "/phome", "Homes", "FAQs", "Memes"];

  let filteredPosts = filter === "All" 
    ? [...posts] 
    : filter === "Favorites"
    ? posts.filter((p: any) => p.isSaved)
    : posts.filter((p: any) => p.category === filter);

  if (sortBy === "Newest") {
    filteredPosts.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
  } else if (sortBy === "Oldest") {
    filteredPosts.sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());
  } else if (sortBy === "Most Liked") {
    filteredPosts.sort((a, b) => b.upvotes - a.upvotes);
  } else if (sortBy === "Trending") {
    filteredPosts.sort((a, b) => (b.views || 0) + b.upvotes * 5 - ((a.views || 0) + a.upvotes * 5));
  }

  return (
    <div style={{ background: '#F8FBFF', minHeight: '100vh', color: '#0B1524', paddingBottom: '90px' }}>
      <div className="inner" style={{ paddingTop: '110px', maxWidth: '1240px', margin: '0 auto', paddingLeft: '20px', paddingRight: '20px' }}>
        
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px', flexWrap: 'wrap', gap: '20px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <i className="fa-solid fa-users" style={{ color: '#06b6d4' }}></i>
              <span style={{ color: '#38bdf8', fontSize: '0.82rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px' }}>Trainer Social Feed</span>
            </div>
            <h1 style={{ fontSize: '2.8rem', fontWeight: 800, margin: 0, color: '#0B1524', letterSpacing: '-0.5px' }}>
              Community Hub
            </h1>
            <p style={{ fontSize: '1.05rem', color: '#3D567A', margin: '6px 0 0 0' }}>
              Share your epic builds, rare shiny catches, warp locations, and adventure stories.
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flexWrap: 'wrap' }}>
            <div style={{ position: 'relative' }}>
              <select 
                value={sortBy} 
                onChange={(e) => setSortBy(e.target.value)}
                style={{
                  background: '#FFFFFF',
                  color: '#0B1524',
                  border: '1.5px solid rgba(0, 201, 216, 0.35)',
                  padding: '12px 20px',
                  borderRadius: '14px',
                  fontSize: '0.95rem',
                  outline: 'none',
                  cursor: 'pointer',
                  fontWeight: 600
                }}
              >
                <option value="Newest" style={{ background: '#FFFFFF', color: '#0B1524' }}>Newest Posts</option>
                <option value="Oldest" style={{ background: '#FFFFFF', color: '#0B1524' }}>Oldest Posts</option>
                <option value="Most Liked" style={{ background: '#FFFFFF', color: '#0B1524' }}>Most Liked</option>
                <option value="Trending" style={{ background: '#FFFFFF', color: '#0B1524' }}>Trending (Reach)</option>
              </select>
            </div>

            <Link href="/community/create" style={{ textDecoration: 'none' }}>
              <button style={{
                background: 'linear-gradient(135deg, #1677FF 0%, #00C9D8 100%)',
                color: '#FFFFFF',
                border: 'none',
                padding: '12px 24px',
                borderRadius: '14px',
                fontSize: '0.95rem',
                fontWeight: 800,
                cursor: 'pointer',
                boxShadow: '0 4px 15px rgba(6, 182, 212, 0.35)',
                transition: 'all 0.2s ease',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                <i className="fa-solid fa-plus"></i> Create Post
              </button>
            </Link>
          </div>
        </div>

        {/* Category Pills */}
        <div style={{ width: '100%', marginBottom: '35px', overflowX: 'auto', paddingBottom: '10px' }}>
          <div style={{ display: 'flex', gap: '10px', minWidth: 'max-content' }}>
            {categories.map(cat => (
              <button 
                key={cat}
                onClick={() => setFilter(cat)}
                style={{
                  padding: '8px 18px',
                  borderRadius: '20px',
                  border: filter === cat ? '1.5px solid #00C9D8' : '1.5px solid rgba(0, 201, 216, 0.25)',
                  background: filter === cat ? 'linear-gradient(135deg, #1677FF 0%, #00C9D8 100%)' : '#FFFFFF',
                  color: filter === cat ? '#FFFFFF' : '#3D567A',
                  boxShadow: filter === cat ? '0 4px 14px rgba(0, 201, 216, 0.35)' : '0 2px 8px rgba(0, 0, 0, 0.04)',
                  cursor: 'pointer',
                  fontWeight: 700,
                  fontSize: '0.88rem',
                  transition: 'all 0.2s ease'
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Posts Grid */}
        {loading ? (
          <div style={{ textAlign: 'center', padding: '80px 20px', color: '#94a3b8' }}>
            <i className="fa-solid fa-circle-notch fa-spin" style={{ fontSize: '2.5rem', color: '#06b6d4', marginBottom: '14px' }}></i>
            <p style={{ margin: 0, fontSize: '1.05rem' }}>Loading community feed...</p>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', gap: '26px' }}>
            {filteredPosts.length === 0 ? (
              <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '60px 20px', color: '#94a3b8', background: '#FFFFFF', borderRadius: '20px', border: '1.5px dashed rgba(0, 201, 216, 0.3)' }}>
                <i className="fa-solid fa-comments" style={{ fontSize: '2.5rem', color: '#475569', marginBottom: '14px' }}></i>
                <h3 style={{ color: '#0B1524', margin: '0 0 8px 0' }}>No posts found in this category</h3>
                <p style={{ margin: 0 }}>Be the first trainer to share a post in #{filter}!</p>
              </div>
            ) : (
              filteredPosts.map((post: any) => (
                <div 
                  key={post.id} 
                  onClick={() => router.push(`/community/post/${post.id}`)} 
                  style={{ 
                    background: '#FFFFFF', 
                    color: '#0B1524',
                    border: '1.5px solid rgba(0, 201, 216, 0.22)', 
                    borderRadius: '20px', 
                    overflow: 'hidden',
                    transition: 'all 0.25s ease',
                    cursor: 'pointer',
                    display: 'flex',
                    flexDirection: 'column',
                    boxShadow: '0 8px 25px rgba(0, 201, 216, 0.08)'
                  }}
                  onMouseOver={e => { 
                    e.currentTarget.style.transform = 'translateY(-4px)'; 
                    e.currentTarget.style.borderColor = '#00C9D8';
                    e.currentTarget.style.boxShadow = '0 16px 40px rgba(0, 201, 216, 0.18)'; 
                  }}
                  onMouseOut={e => { 
                    e.currentTarget.style.transform = 'none'; 
                    e.currentTarget.style.borderColor = 'rgba(0, 201, 216, 0.22)';
                    e.currentTarget.style.boxShadow = '0 8px 25px rgba(0, 201, 216, 0.08)'; 
                  }}
                >
                  {/* Media */}
                  {post.media && (
                    <div style={{ width: '100%', height: '220px', overflow: 'hidden', background: '#F0F6FE', position: 'relative' }}>
                      {post.mediaType === 'image' ? (
                        <img src={post.media} alt={post.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      ) : post.mediaType === 'youtube' ? (
                        <iframe width="100%" height="100%" src={post.media.replace("watch?v=", "embed/").replace("autoplay=1", "autoplay=0")} title="YouTube video" frameBorder="0" allowFullScreen onClick={e => e.stopPropagation()}></iframe>
                      ) : post.mediaType === 'instagram' ? (
                        <iframe width="100%" height="100%" src={post.media} frameBorder="0" scrolling="no" onClick={e => e.stopPropagation()}></iframe>
                      ) : post.mediaType === 'video' ? (
                        <video src={post.media} controls style={{ width: '100%', height: '100%', objectFit: 'cover' }} onClick={e => e.stopPropagation()}></video>
                      ) : null}
                    </div>
                  )}
                  
                  <div style={{ padding: '22px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                      <span style={{ fontSize: '0.75rem', background: 'rgba(6, 182, 212, 0.15)', color: '#38bdf8', padding: '4px 10px', borderRadius: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                        {post.category || 'General'}
                      </span>
                      <span style={{ fontSize: '0.8rem', color: '#64748b' }}>{new Date(post.timestamp).toLocaleDateString()}</span>
                    </div>
                    
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 700, margin: '0 0 8px 0', color: '#0B1524', lineHeight: 1.4 }}>
                      {post.title}
                    </h3>
                    <p style={{ color: '#475569', fontSize: '0.92rem', lineHeight: '1.6', margin: '0 0 20px 0', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden', flex: 1 }}>
                      {post.content}
                    </p>
                    
                    {/* Author & Interactions Footer */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(0, 201, 216, 0.12)', paddingTop: '16px', flexWrap: 'wrap', gap: '14px', marginTop: 'auto' }}>
                      {/* Author */}
                      <div onClick={(e) => { e.stopPropagation(); router.push(`/profile/${post.authorUsername}`); }} style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
                        <img src={post.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(post.author || 'User')}&background=06b6d4&color=fff`} alt={post.author} style={{ width: '32px', height: '32px', borderRadius: '50%', objectFit: 'cover', border: '1.5px solid rgba(0, 201, 216, 0.45)' }} />
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#0B1524' }}>{post.author}</span>
                            <button onClick={(e) => handleFollow(e, post.authorUsername)} style={{ background: post.isFollowing ? 'transparent' : 'rgba(6, 182, 212, 0.2)', color: post.isFollowing ? '#64748b' : '#38bdf8', border: post.isFollowing ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(6, 182, 212, 0.4)', padding: '2px 8px', borderRadius: '10px', fontSize: '0.68rem', fontWeight: 700, cursor: 'pointer' }}>
                              {post.isFollowing ? 'Following' : 'Follow'}
                            </button>
                          </div>
                          <span style={{ fontSize: '0.72rem', color: '#64748b' }}>@{post.authorUsername}</span>
                        </div>
                      </div>

                      {/* Action Icons */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', color: '#94a3b8', fontSize: '0.95rem' }}>
                        <button onClick={(e) => handleInteract(e, post.id, 'like')} style={{ background: 'transparent', border: 'none', color: post.isLiked ? '#ef4444' : '#94a3b8', cursor: 'pointer', display: 'flex', gap: '6px', alignItems: 'center', fontSize: '0.92rem' }}>
                          <i className="fa-solid fa-thumbs-up"></i> {post.upvotes}
                        </button>
                        <button onClick={(e) => handleInteract(e, post.id, 'dislike')} style={{ background: 'transparent', border: 'none', color: post.isDisliked ? '#3b82f6' : '#94a3b8', cursor: 'pointer', display: 'flex', gap: '6px', alignItems: 'center', fontSize: '0.92rem' }}>
                          <i className="fa-solid fa-thumbs-down"></i> {post.downvotes}
                        </button>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '5px', color: '#64748b', fontSize: '0.85rem' }} title="Reach">
                          <i className="fa-solid fa-eye"></i> {post.views || 0}
                        </div>
                        <button onClick={(e) => handleFavorite(e, post.id)} style={{ background: 'transparent', border: 'none', color: post.isSaved ? '#f59e0b' : '#94a3b8', cursor: 'pointer', fontSize: '0.92rem' }}>
                          <i className={post.isSaved ? "fa-solid fa-star" : "fa-regular fa-star"}></i>
                        </button>
                        <button onClick={(e) => { e.stopPropagation(); fetchStats(post.id); }} style={{ background: 'transparent', border: 'none', color: '#94a3b8', cursor: 'pointer', fontSize: '0.92rem' }} title="Insights">
                          <i className="fa-solid fa-chart-simple"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* Insights Modal */}
        {mounted && activeStatsReel && createPortal(
          <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(3, 6, 10, 0.8)', backdropFilter: 'blur(8px)', zIndex: 100002, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }} onClick={() => setActiveStatsReel(null)}>
            <div style={{ background: '#FFFFFF', width: '100%', maxHeight: '60%', borderTopLeftRadius: '24px', borderTopRightRadius: '24px', padding: '24px', display: 'flex', flexDirection: 'column', borderTop: '2px solid rgba(0, 201, 216, 0.4)' }} onClick={e => e.stopPropagation()}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
                <h3 style={{ margin: 0, color: '#0B1524', fontSize: '1.2rem', fontWeight: 800 }}>Post Analytics & Interactions</h3>
                <button onClick={() => setActiveStatsReel(null)} style={{ background: 'transparent', border: 'none', color: '#94a3b8', fontSize: '1.3rem', cursor: 'pointer' }}><i className="fa-solid fa-times"></i></button>
              </div>
              
              <div style={{ display: 'flex', gap: '15px', borderBottom: '1px solid rgba(0, 201, 216, 0.15)', marginBottom: '18px' }}>
                <button onClick={() => setActiveStatsTab('views')} style={{ background: 'transparent', border: 'none', color: activeStatsTab === 'views' ? '#06b6d4' : '#94a3b8', paddingBottom: '10px', borderBottom: activeStatsTab === 'views' ? '2px solid #06b6d4' : 'none', fontWeight: 700, cursor: 'pointer' }}>Views ({statsData?.viewers?.length || 0})</button>
                <button onClick={() => setActiveStatsTab('likes')} style={{ background: 'transparent', border: 'none', color: activeStatsTab === 'likes' ? '#06b6d4' : '#94a3b8', paddingBottom: '10px', borderBottom: activeStatsTab === 'likes' ? '2px solid #06b6d4' : 'none', fontWeight: 700, cursor: 'pointer' }}>Likes ({statsData?.likes?.length || 0})</button>
                <button onClick={() => setActiveStatsTab('dislikes')} style={{ background: 'transparent', border: 'none', color: activeStatsTab === 'dislikes' ? '#06b6d4' : '#94a3b8', paddingBottom: '10px', borderBottom: activeStatsTab === 'dislikes' ? '2px solid #06b6d4' : 'none', fontWeight: 700, cursor: 'pointer' }}>Dislikes ({statsData?.dislikes?.length || 0})</button>
              </div>

              <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {isStatsLoading ? (
                  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100px', flexDirection: 'column', gap: '10px' }}>
                    <i className="fa-solid fa-circle-notch fa-spin" style={{ color: '#06b6d4', fontSize: '2rem' }}></i>
                    <span style={{ color: '#94a3b8', fontSize: '0.85rem' }}>Loading interactions...</span>
                  </div>
                ) : !(statsData?.[activeStatsTab === 'views' ? 'viewers' : activeStatsTab]?.length > 0) ? (
                  <p style={{ color: '#64748b', textAlign: 'center', margin: '30px 0' }}>No player interactions recorded yet.</p>
                ) : (
                  statsData[activeStatsTab === 'views' ? 'viewers' : activeStatsTab].map((u: any, idx: number) => (
                    <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '8px 12px', borderRadius: '10px', background: '#F8FBFF' }}>
                      <img src={u.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(u.username || 'Trainer')}&background=06b6d4&color=fff`} alt={u.name || 'User'} style={{ width: '36px', height: '36px', borderRadius: '50%' }} />
                      <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <span style={{ color: '#0B1524', fontWeight: 700, fontSize: '0.9rem' }}>{u.username || 'Unknown'}</span>
                        <span style={{ color: '#64748b', fontSize: '0.75rem' }}>{u.name || ''}</span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>,
          document.body
        )}

      </div>
    </div>
  );
}