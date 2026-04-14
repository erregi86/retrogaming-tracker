import Head from 'next/head'
import { useState } from 'react'

const VINTED = 'https://www.vinted.it/catalog'
const GOOD_CONDITIONS = '&status_ids[]=3&status_ids[]=6'

// Vinted .it catalog IDs (confirmed from URL structure)
// 3025 = Consoles, 3026 = Games, all under 3002 = Video games & consoles
const buildUrl = (search, maxPrice = null, catalog = null) => {
  let url = `${VINTED}?search_text=${encodeURIComponent(search)}&order=price_low_to_high${GOOD_CONDITIONS}`
  if (maxPrice) url += `&price_to=${maxPrice}`
  if (catalog) url += `&catalog[]=${catalog}`
  return url
}

const CONSOLES = [
  { name: 'PlayStation 1', short: 'PS1', emoji: '🎮', color: '#003087', search: 'console playstation 1 PSX PSOne', catalog: 3025 },
  { name: 'PlayStation 2', short: 'PS2', emoji: '🎮', color: '#003087', search: 'console playstation 2 PS2 slim fat', catalog: 3025 },
  { name: 'PlayStation 3', short: 'PS3', emoji: '🎮', color: '#003087', search: 'console playstation 3 PS3', catalog: 3025 },
  { name: 'PlayStation 4', short: 'PS4', emoji: '🎮', color: '#003087', search: 'console playstation 4 PS4', catalog: 3025 },
  { name: 'Nintendo Wii', short: 'Wii', emoji: '🕹️', color: '#e4000f', search: 'console nintendo wii', catalog: 3025 },
  { name: 'GameCube', short: 'GCN', emoji: '🕹️', color: '#e4000f', search: 'console nintendo gamecube', catalog: 3025 },
  { name: 'Nintendo 64', short: 'N64', emoji: '🕹️', color: '#e4000f', search: 'console nintendo 64 N64', catalog: 3025 },
  { name: 'Atari 2600', short: 'ATARI', emoji: '👾', color: '#f5a623', search: 'console atari 2600 VCS', catalog: 3025 },
  { name: 'Sega Dreamcast', short: 'DC', emoji: '💿', color: '#1a1a2e', search: 'console sega dreamcast', catalog: 3025 },
]

const GAMES_BY_CONSOLE = [
  { console: 'N64', label: 'Tutti i giochi N64', search: 'gioco nintendo 64 N64 cartuccia', maxPrice: 7, emoji: '🟡' },
  { console: 'PS1', label: 'Giochi PS1', search: 'gioco playstation 1 PS1 PSX disco', maxPrice: null, emoji: '🔵' },
  { console: 'PS2', label: 'Giochi PS2', search: 'gioco playstation 2 PS2', maxPrice: null, emoji: '🔵' },
  { console: 'PS3', label: 'Giochi PS3', search: 'gioco playstation 3 PS3', maxPrice: null, emoji: '🔵' },
  { console: 'Wii', label: 'Giochi Wii', search: 'gioco nintendo wii disco', maxPrice: null, emoji: '🔴' },
  { console: 'GCN', label: 'Giochi GameCube', search: 'gioco nintendo gamecube GCN disco', maxPrice: null, emoji: '🔴' },
  { console: 'DC', label: 'Giochi Dreamcast', search: 'gioco sega dreamcast GD-ROM', maxPrice: null, emoji: '🟣' },
  { console: 'ATARI', label: 'Giochi Atari', search: 'gioco atari 2600 cartuccia', maxPrice: null, emoji: '🟠' },
]

const N64_TITLES = [
  { title: 'Super Mario 64', search: 'super mario 64 n64 cartuccia' },
  { title: 'Zelda Ocarina of Time', search: 'zelda ocarina time n64 cartuccia' },
  { title: 'Zelda Majora\'s Mask', search: 'zelda majora mask n64 cartuccia' },
  { title: 'Mario Kart 64', search: 'mario kart 64 n64 cartuccia' },
  { title: 'GoldenEye 007', search: 'goldeneye 007 n64 cartuccia' },
  { title: 'Banjo-Kazooie', search: 'banjo kazooie n64 cartuccia' },
  { title: 'Pokémon Snap', search: 'pokemon snap n64 cartuccia' },
  { title: 'Star Fox 64', search: 'star fox 64 n64 cartuccia' },
  { title: 'Donkey Kong 64', search: 'donkey kong 64 n64 cartuccia' },
  { title: 'Perfect Dark', search: 'perfect dark n64 cartuccia' },
]

const COLLECTIBLES = [
  { label: 'Lotti retrogaming', desc: 'Bundle console + giochi misti', search: 'lotto retrogaming console giochi bundle', emoji: '📦' },
  { label: 'Controller vintage', desc: 'Joypad e paddle originali', search: 'controller joypad retro vintage console originale', emoji: '🕹️' },
  { label: 'Memory card', desc: 'PS1, PS2, GameCube originali', search: 'memory card ps1 ps2 gamecube nintendo originale', emoji: '💾' },
  { label: 'Box & manuali', desc: 'Scatole originali con libretto', search: 'scatola box manuale gioco console originale', emoji: '📖' },
  { label: 'Merchandise', desc: 'Figure, gadget, oggetti rari', search: 'merchandise figure gadget retrogaming nintendo sega', emoji: '🏆' },
  { label: 'Accessori rari', desc: 'Periferiche e cavi originali', search: 'accessori cavi periferiche retrogaming console originali', emoji: '🔌' },
]

export default function Home() {
  const [activeTab, setActiveTab] = useState('consoles')
  const [n64Max, setN64Max] = useState(7)
  const [searchQuery, setSearchQuery] = useState('')

  const handleOpen = (url) => {
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  const filteredConsoles = CONSOLES.filter(c =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.short.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <>
      <Head>
        <title>Retrogaming Vinted Tracker</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Traccia i prezzi più bassi per retrogaming su Vinted" />
        <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🎮</text></svg>" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=DM+Sans:wght@400;500;600&display=swap" rel="stylesheet" />
      </Head>

      <div className="app">
        {/* Header */}
        <header className="header">
          <div className="header-inner">
            <div className="logo">
              <span className="logo-icon">👾</span>
              <div>
                <h1 className="logo-title">Retrogaming Tracker</h1>
                <p className="logo-sub">Prezzi più bassi su Vinted · Condizioni buone/ottime</p>
              </div>
            </div>
            <div className="search-wrap">
              <input
                className="global-search"
                placeholder="Cerca console..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </header>

        {/* Tabs */}
        <div className="tabs-wrap">
          <div className="tabs">
            {[
              { id: 'consoles', label: '🖥️ Console' },
              { id: 'games', label: '💾 Giochi' },
              { id: 'n64', label: '🟡 N64 Titoli' },
              { id: 'collect', label: '🏆 Collezionismo' },
            ].map(tab => (
              <button
                key={tab.id}
                className={`tab ${activeTab === tab.id ? 'tab-active' : ''}`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <main className="main">

          {/* CONSOLES TAB */}
          {activeTab === 'consoles' && (
            <div className="section">
              <p className="section-hint">Clicca su una console per aprire Vinted con la ricerca filtrata dal prezzo più basso</p>
              <div className="grid-consoles">
                {filteredConsoles.map(c => (
                  <button
                    key={c.short}
                    className="console-card"
                    onClick={() => handleOpen(buildUrl(c.search, null, c.catalog))}
                    style={{ '--accent': c.color }}
                  >
                    <span className="con-emoji">{c.emoji}</span>
                    <span className="con-name">{c.name}</span>
                    <span className="con-badge">{c.short}</span>
                    <span className="con-arrow">→</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* GAMES TAB */}
          {activeTab === 'games' && (
            <div className="section">
              <p className="section-hint">Tutti i giochi ordinati per prezzo crescente · solo condizioni buone e ottime</p>
              <div className="grid-games">
                {GAMES_BY_CONSOLE.map(g => (
                  <button
                    key={g.console}
                    className="game-card"
                    onClick={() => handleOpen(buildUrl(g.search, g.maxPrice, 3026))}
                  >
                    <span className="gc-emoji">{g.emoji}</span>
                    <div className="gc-info">
                      <span className="gc-label">{g.label}</span>
                      {g.maxPrice && <span className="gc-price">fino a €{g.maxPrice}</span>}
                    </div>
                    <span className="gc-arrow">↗</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* N64 TITLES TAB */}
          {activeTab === 'n64' && (
            <div className="section">
              <div className="n64-controls">
                <div className="n64-header">
                  <span className="n64-icon">🟡</span>
                  <div>
                    <h2 className="n64-title">Giochi Nintendo 64</h2>
                    <p className="n64-sub">Titoli specifici con prezzo massimo personalizzabile</p>
                  </div>
                </div>
                <div className="price-filter">
                  <label className="price-label">Prezzo max: <strong>€{n64Max}</strong></label>
                  <input
                    type="range"
                    min="1"
                    max="50"
                    value={n64Max}
                    onChange={e => setN64Max(Number(e.target.value))}
                    className="price-slider"
                  />
                  <div className="price-row">
                    <span>€1</span>
                    <span>€50</span>
                  </div>
                </div>
                <button
                  className="btn-all-n64"
                  onClick={() => handleOpen(buildUrl('gioco nintendo 64 N64 cartuccia', n64Max, 3026))}
                >
                  🔍 Tutti i giochi N64 fino a €{n64Max} →
                </button>
              </div>

              <div className="n64-grid">
                {N64_TITLES.map(t => (
                  <button
                    key={t.title}
                    className="n64-card"
                    onClick={() => handleOpen(buildUrl(t.search, n64Max, 3026))}
                  >
                    <span className="n64-card-title">{t.title}</span>
                    <span className="n64-card-price">≤ €{n64Max}</span>
                    <span className="n64-card-arrow">↗</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* COLLECTIBLES TAB */}
          {activeTab === 'collect' && (
            <div className="section">
              <p className="section-hint">Oggetti da collezione, lotti e accessori originali</p>
              <div className="grid-collect">
                {COLLECTIBLES.map(c => (
                  <button
                    key={c.label}
                    className="collect-card"
                    onClick={() => handleOpen(buildUrl(c.search))}
                  >
                    <span className="cc-emoji">{c.emoji}</span>
                    <div className="cc-info">
                      <span className="cc-label">{c.label}</span>
                      <span className="cc-desc">{c.desc}</span>
                    </div>
                    <span className="cc-arrow">↗</span>
                  </button>
                ))}
              </div>
            </div>
          )}

        </main>

        <footer className="footer">
          <p>I link aprono Vinted con filtri: prezzo crescente · condizioni buone/ottime</p>
        </footer>
      </div>

      <style jsx global>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { font-size: 16px; }
        body {
          font-family: 'DM Sans', sans-serif;
          background: #0d0d0d;
          color: #f0f0f0;
          min-height: 100vh;
        }

        .app { max-width: 900px; margin: 0 auto; padding: 0 16px 60px; }

        /* Header */
        .header { padding: 24px 0 16px; }
        .header-inner { display: flex; align-items: center; gap: 16px; flex-wrap: wrap; justify-content: space-between; }
        .logo { display: flex; align-items: center; gap: 12px; }
        .logo-icon { font-size: 32px; }
        .logo-title { font-family: 'Space Mono', monospace; font-size: 20px; font-weight: 700; color: #fff; }
        .logo-sub { font-size: 12px; color: #888; margin-top: 2px; }
        .search-wrap { flex: 1; max-width: 260px; }
        .global-search {
          width: 100%;
          background: #1a1a1a;
          border: 1px solid #2a2a2a;
          border-radius: 8px;
          padding: 9px 14px;
          color: #f0f0f0;
          font-family: 'DM Sans', sans-serif;
          font-size: 14px;
          outline: none;
          transition: border-color 0.2s;
        }
        .global-search:focus { border-color: #555; }
        .global-search::placeholder { color: #555; }

        /* Tabs */
        .tabs-wrap { overflow-x: auto; margin-bottom: 24px; }
        .tabs { display: flex; gap: 4px; min-width: max-content; border-bottom: 1px solid #1e1e1e; padding-bottom: 0; }
        .tab {
          background: none;
          border: none;
          border-bottom: 2px solid transparent;
          color: #666;
          font-family: 'DM Sans', sans-serif;
          font-size: 14px;
          font-weight: 500;
          padding: 10px 16px;
          cursor: pointer;
          white-space: nowrap;
          transition: color 0.2s, border-color 0.2s;
          margin-bottom: -1px;
        }
        .tab:hover { color: #ccc; }
        .tab-active { color: #fff; border-bottom-color: #e8ff2a; }

        /* Section */
        .section {}
        .section-hint { font-size: 13px; color: #666; margin-bottom: 20px; }

        /* Console grid */
        .grid-consoles {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(170px, 1fr));
          gap: 10px;
        }
        .console-card {
          background: #161616;
          border: 1px solid #222;
          border-radius: 12px;
          padding: 18px 16px;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 4px;
          cursor: pointer;
          text-align: left;
          transition: background 0.15s, border-color 0.15s, transform 0.1s;
          position: relative;
          overflow: hidden;
        }
        .console-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 3px;
          background: var(--accent);
          opacity: 0.7;
        }
        .console-card:hover { background: #1e1e1e; border-color: #333; transform: translateY(-2px); }
        .console-card:active { transform: translateY(0); }
        .con-emoji { font-size: 22px; margin-bottom: 4px; }
        .con-name { font-size: 14px; font-weight: 600; color: #fff; }
        .con-badge { font-family: 'Space Mono', monospace; font-size: 10px; color: #888; background: #222; padding: 2px 6px; border-radius: 4px; margin-top: 2px; }
        .con-arrow { position: absolute; bottom: 14px; right: 14px; color: #444; font-size: 14px; }
        .console-card:hover .con-arrow { color: #aaa; }

        /* Games grid */
        .grid-games { display: flex; flex-direction: column; gap: 8px; }
        .game-card {
          background: #161616;
          border: 1px solid #222;
          border-radius: 10px;
          padding: 14px 18px;
          display: flex;
          align-items: center;
          gap: 14px;
          cursor: pointer;
          text-align: left;
          transition: background 0.15s, border-color 0.15s;
        }
        .game-card:hover { background: #1e1e1e; border-color: #333; }
        .gc-emoji { font-size: 18px; flex-shrink: 0; }
        .gc-info { flex: 1; display: flex; align-items: center; gap: 10px; flex-wrap: wrap; }
        .gc-label { font-size: 14px; font-weight: 500; color: #f0f0f0; }
        .gc-price { font-family: 'Space Mono', monospace; font-size: 11px; color: #4caf50; background: #0a1f0a; padding: 2px 8px; border-radius: 20px; }
        .gc-arrow { color: #555; font-size: 14px; flex-shrink: 0; }
        .game-card:hover .gc-arrow { color: #aaa; }

        /* N64 section */
        .n64-controls { background: #161616; border: 1px solid #222; border-radius: 14px; padding: 20px; margin-bottom: 20px; }
        .n64-header { display: flex; align-items: center; gap: 12px; margin-bottom: 20px; }
        .n64-icon { font-size: 28px; }
        .n64-title { font-size: 16px; font-weight: 600; color: #fff; }
        .n64-sub { font-size: 12px; color: #888; margin-top: 2px; }
        .price-filter { margin-bottom: 16px; }
        .price-label { display: block; font-size: 13px; color: #aaa; margin-bottom: 8px; }
        .price-label strong { color: #e8ff2a; }
        .price-slider {
          width: 100%;
          accent-color: #e8ff2a;
          cursor: pointer;
        }
        .price-row { display: flex; justify-content: space-between; font-size: 11px; color: #555; margin-top: 4px; }
        .btn-all-n64 {
          width: 100%;
          background: #e8ff2a;
          color: #0d0d0d;
          border: none;
          border-radius: 10px;
          padding: 12px 20px;
          font-family: 'DM Sans', sans-serif;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: opacity 0.2s, transform 0.1s;
        }
        .btn-all-n64:hover { opacity: 0.9; transform: translateY(-1px); }
        .btn-all-n64:active { transform: translateY(0); }

        .n64-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
          gap: 8px;
        }
        .n64-card {
          background: #161616;
          border: 1px solid #222;
          border-radius: 10px;
          padding: 14px 16px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 8px;
          cursor: pointer;
          text-align: left;
          transition: background 0.15s, border-color 0.15s;
        }
        .n64-card:hover { background: #1e1e1e; border-color: #333; }
        .n64-card-title { font-size: 13px; font-weight: 500; color: #f0f0f0; flex: 1; }
        .n64-card-price { font-family: 'Space Mono', monospace; font-size: 11px; color: #e8ff2a; flex-shrink: 0; }
        .n64-card-arrow { color: #555; font-size: 12px; flex-shrink: 0; }
        .n64-card:hover .n64-card-arrow { color: #aaa; }

        /* Collectibles */
        .grid-collect { display: flex; flex-direction: column; gap: 8px; }
        .collect-card {
          background: #161616;
          border: 1px solid #222;
          border-radius: 10px;
          padding: 16px 18px;
          display: flex;
          align-items: center;
          gap: 14px;
          cursor: pointer;
          text-align: left;
          transition: background 0.15s, border-color 0.15s;
        }
        .collect-card:hover { background: #1e1e1e; border-color: #333; }
        .cc-emoji { font-size: 22px; flex-shrink: 0; }
        .cc-info { flex: 1; }
        .cc-label { display: block; font-size: 14px; font-weight: 600; color: #fff; }
        .cc-desc { display: block; font-size: 12px; color: #888; margin-top: 2px; }
        .cc-arrow { color: #555; font-size: 14px; flex-shrink: 0; }
        .collect-card:hover .cc-arrow { color: #aaa; }

        /* Footer */
        .footer { text-align: center; padding: 30px 0 0; font-size: 12px; color: #444; border-top: 1px solid #1a1a1a; margin-top: 40px; }

        /* Mobile tweaks */
        @media (max-width: 600px) {
          .logo-title { font-size: 17px; }
          .grid-consoles { grid-template-columns: repeat(2, 1fr); }
          .n64-grid { grid-template-columns: 1fr; }
          .header-inner { flex-direction: column; align-items: flex-start; gap: 12px; }
          .search-wrap { max-width: 100%; width: 100%; }
          .tab { font-size: 13px; padding: 10px 12px; }
        }
      `}</style>
    </>
  )
}
