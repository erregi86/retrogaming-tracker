import Head from 'next/head'
import { useState } from 'react'

const VINTED = 'https://www.vinted.it/catalog'

const buildUrl = ({ search = '', minPrice = null, maxPrice = null, catalog = null, brandId = null, platformId = null } = {}) => {
  let url = `${VINTED}?search_text=${encodeURIComponent(search)}&order=price_low_to_high&status_ids[]=6&currency=EUR`
  if (minPrice) url += `&price_from=${minPrice}`
  if (maxPrice) url += `&price_to=${maxPrice}`
  if (catalog) url += `&catalog[]=${catalog}`
  if (brandId) url += `&brand_id[]=${brandId}&brand_ids[]=${brandId}`
  if (platformId) url += `&video_game_platform_ids[]=${platformId}`
  return url
}

const CONSOLES = [
  {
    name: 'PlayStation 1', short: 'PS1', emoji: '🎮', color: '#003087',
    catalog: 3025, brandId: 272284, platformId: 1277,
    variants: [
      { label: 'Fat (SCPH-100x)', search: 'playstation 1 fat', priceMin: 10, priceMax: 25 },
      { label: 'PSOne (slim)', search: 'psone slim', priceMin: 15, priceMax: 29 },
    ]
  },
  {
    name: 'PlayStation 2', short: 'PS2', emoji: '🎮', color: '#003087',
    catalog: 3025, brandId: 272284, platformId: 1278,
    variants: [
      { label: 'Fat (50000–39000)', search: 'playstation 2 fat', priceMin: 20, priceMax: 39 },
      { label: 'Slim (70000–90000)', search: 'playstation 2 slim', priceMin: 20, priceMax: 35 },
    ]
  },
  {
    name: 'PlayStation 3', short: 'PS3', emoji: '🎮', color: '#003087',
    catalog: 3025, brandId: 272284, platformId: 1279,
    variants: [
      { label: 'Fat (60/80GB)', search: 'playstation 3 fat 60gb 80gb', priceMin: 30, priceMax: 55 },
      { label: 'Slim (120/320GB)', search: 'playstation 3 slim', priceMin: 25, priceMax: 45 },
      { label: 'Super Slim', search: 'playstation 3 super slim', priceMin: 25, priceMax: 49 },
    ]
  },
  {
    name: 'PlayStation 4', short: 'PS4', emoji: '🎮', color: '#003087',
    catalog: 3025, brandId: 272284, platformId: 1280,
    variants: [
      { label: 'Fat 500GB', search: 'playstation 4 fat 500gb', priceMin: 35, priceMax: 55 },
      { label: 'Fat 1TB', search: 'playstation 4 fat 1tb', priceMin: 40, priceMax: 59 },
      { label: 'Slim 500GB', search: 'playstation 4 slim 500gb', priceMin: 38, priceMax: 55 },
      { label: 'Slim 1TB', search: 'playstation 4 slim 1tb', priceMin: 42, priceMax: 59 },
      { label: 'Pro 1TB', search: 'playstation 4 pro 1tb', priceMin: 55, priceMax: 90 },
    ]
  },
  {
    name: 'Nintendo Wii', short: 'Wii', emoji: '🕹️', color: '#e4000f',
    catalog: 3025, brandId: 29,
    variants: [
      { label: 'Wii (bianca)', search: 'nintendo wii bianco', priceMin: 10, priceMax: 19 },
      { label: 'Wii Mini (rossa)', search: 'nintendo wii mini rosso', priceMin: 8, priceMax: 15 },
    ]
  },
  {
    name: 'Nintendo 64', short: 'N64', emoji: '🕹️', color: '#e4000f',
    catalog: 3025, brandId: 29,
    variants: [
      { label: 'Grigia (standard)', search: 'nintendo 64 grigio', priceMin: 25, priceMax: 55 },
      { label: 'Nera (limited)', search: 'nintendo 64 nero', priceMin: 30, priceMax: 60 },
    ]
  },
  {
    name: 'Atari', short: 'ATARI', emoji: '👾', color: '#f5a623',
    catalog: 3025, brandId: 13148,
    variants: [
      { label: '2600', search: 'atari 2600', priceMin: 10, priceMax: 35 },
      { label: '7800', search: 'atari 7800', priceMin: 15, priceMax: 45 },
      { label: 'Jaguar', search: 'atari jaguar', priceMin: 30, priceMax: 80 },
    ]
  },
  {
    name: 'Sega Dreamcast', short: 'DC', emoji: '💿', color: '#6c6c8a',
    catalog: 3025, brandId: 471,
    variants: [
      { label: 'Standard (bianca)', search: 'dreamcast bianco', priceMin: 30, priceMax: 65 },
      { label: 'Nera (Sega Sports)', search: 'dreamcast nero sport', priceMin: 40, priceMax: 70 },
    ]
  },
]

const GAMECUBE = {
  name: 'GameCube', short: 'GCN', emoji: '🕹️', color: '#e4000f',
  search: 'nintendo gamecube', catalog: 3025, brandId: 29,
  priceMin: 35, priceMax: 70,
}

const GAMES_BY_CONSOLE = [
  { label: 'N64 — tutti', search: 'nintendo 64', maxPrice: 7, emoji: '🟡', catalog: 3026, brandId: 29 },
  { label: 'PS1', search: 'playstation 1', maxPrice: null, emoji: '🔵', catalog: 3026, brandId: 272284, platformId: 1277 },
  { label: 'PS2', search: 'playstation 2', maxPrice: null, emoji: '🔵', catalog: 3026, brandId: 272284, platformId: 1278 },
  { label: 'PS3', search: 'playstation 3', maxPrice: null, emoji: '🔵', catalog: 3026, brandId: 272284, platformId: 1279 },
  { label: 'Wii', search: 'nintendo wii', maxPrice: null, emoji: '🔴', catalog: 3026, brandId: 29 },
  { label: 'GameCube', search: 'gamecube', maxPrice: null, emoji: '🔴', catalog: 3026, brandId: 29 },
  { label: 'Dreamcast', search: 'dreamcast', maxPrice: null, emoji: '🟣', catalog: 3026, brandId: 471 },
  { label: 'Atari', search: 'atari', maxPrice: null, emoji: '🟠', catalog: 3026, brandId: 13148 },
]

const IMPERDIBILI = [
  { title: 'FIFA (qualsiasi anno) PS2', search: 'fifa ps2', console: 'PS2', platformId: 1278, brandId: 272284 },
  { title: 'Need for Speed PS2', search: 'need for speed ps2', console: 'PS2', platformId: 1278, brandId: 272284 },
  { title: 'GTA San Andreas PS2', search: 'gta san andreas ps2', console: 'PS2', platformId: 1278, brandId: 272284 },
  { title: 'Gran Turismo 3/4 PS2', search: 'gran turismo ps2', console: 'PS2', platformId: 1278, brandId: 272284 },
  { title: 'Crash Bandicoot PS1', search: 'crash bandicoot ps1', console: 'PS1', platformId: 1277, brandId: 272284 },
  { title: 'Spyro the Dragon PS1', search: 'spyro ps1', console: 'PS1', platformId: 1277, brandId: 272284 },
  { title: 'Tekken 3 PS1', search: 'tekken 3 ps1', console: 'PS1', platformId: 1277, brandId: 272284 },
  { title: 'Wii Sports', search: 'wii sports nintendo', console: 'Wii', brandId: 29 },
  { title: 'Mario Kart Wii', search: 'mario kart wii', console: 'Wii', brandId: 29 },
  { title: 'Just Dance Wii (qualsiasi)', search: 'just dance wii', console: 'Wii', brandId: 29 },
  { title: 'Sonic Adventure Dreamcast', search: 'sonic adventure dreamcast', console: 'DC', brandId: 471 },
  { title: 'Soul Calibur Dreamcast', search: 'soul calibur dreamcast', console: 'DC', brandId: 471 },
  { title: 'Atari — cartucce varie', search: 'atari cartuccia gioco', console: 'ATARI', brandId: 13148 },
  { title: 'Super Smash Bros N64', search: 'super smash bros nintendo 64', console: 'N64', brandId: 29 },
  { title: 'Pokémon Stadium N64', search: 'pokemon stadium nintendo 64', console: 'N64', brandId: 29 },
]

const N64_TITLES = [
  { title: 'Super Mario 64', search: 'super mario 64 nintendo 64' },
  { title: 'Zelda Ocarina of Time', search: 'zelda ocarina time nintendo 64' },
  { title: "Zelda Majora's Mask", search: 'zelda majora mask nintendo 64' },
  { title: 'Mario Kart 64', search: 'mario kart 64 nintendo 64' },
  { title: 'GoldenEye 007', search: 'goldeneye 007 nintendo 64' },
  { title: 'Banjo-Kazooie', search: 'banjo kazooie nintendo 64' },
  { title: 'Pokémon Snap', search: 'pokemon snap nintendo 64' },
  { title: 'Star Fox 64', search: 'star fox 64 nintendo 64' },
  { title: 'Donkey Kong 64', search: 'donkey kong 64 nintendo 64' },
  { title: 'Perfect Dark', search: 'perfect dark nintendo 64' },
]

const COLLECTIBLES = [
  { label: 'Lotti retrogaming', desc: 'Bundle console + giochi misti', search: 'lotto retrogaming console giochi bundle', emoji: '📦' },
  { label: 'Controller vintage', desc: 'Joypad e paddle originali', search: 'controller joypad retro vintage console originale', emoji: '🕹️' },
  { label: 'Memory card', desc: 'PS1, PS2, GameCube originali', search: 'memory card ps1 ps2 gamecube nintendo', emoji: '💾' },
  { label: 'Box & manuali', desc: 'Scatole originali con libretto', search: 'scatola box manuale gioco console originale', emoji: '📖' },
  { label: 'Merchandise', desc: 'Figure, gadget, oggetti rari', search: 'merchandise figure gadget retrogaming nintendo sega', emoji: '🏆' },
  { label: 'Accessori rari', desc: 'Periferiche e cavi originali', search: 'accessori cavi periferiche retrogaming console', emoji: '🔌' },
]

function ConsoleCard({ console: c, onOpen }) {
  const [selectedVariant, setSelectedVariant] = useState(0)
  const variant = c.variants[selectedVariant]
  const [priceMin, setPriceMin] = useState(variant.priceMin)
  const [priceMax, setPriceMax] = useState(variant.priceMax)

  const handleVariantChange = (idx) => {
    const v = c.variants[idx]
    setSelectedVariant(idx)
    setPriceMin(v.priceMin)
    setPriceMax(v.priceMax)
  }

  const go = () => onOpen(buildUrl({
    search: variant.search,
    minPrice: priceMin,
    maxPrice: priceMax,
    catalog: c.catalog,
    brandId: c.brandId,
    platformId: c.platformId,
  }))

  return (
    <div className="ccard" style={{ '--accent': c.color }}>
      <div className="ccard-top">
        <span className="ccard-emoji">{c.emoji}</span>
        <div className="ccard-titles">
          <span className="ccard-name">{c.name}</span>
          <span className="ccard-short">{c.short}</span>
        </div>
      </div>
      <select
        className="ccard-select"
        value={selectedVariant}
        onChange={e => handleVariantChange(Number(e.target.value))}
      >
        {c.variants.map((v, i) => (
          <option key={i} value={i}>{v.label}</option>
        ))}
      </select>
      <div className="ccard-price-row">
        <div className="ccard-price-group">
          <label className="ccard-price-label">Min <strong>€{priceMin}</strong></label>
          <input type="range" min="0" max="150" step="1" value={priceMin} className="ccard-slider"
            onChange={e => setPriceMin(Number(e.target.value))} />
        </div>
        <div className="ccard-price-group">
          <label className="ccard-price-label">Max <strong>€{priceMax}</strong></label>
          <input type="range" min="0" max="150" step="1" value={priceMax} className="ccard-slider"
            onChange={e => setPriceMax(Number(e.target.value))} />
        </div>
      </div>
      <button className="ccard-btn" onClick={go}>Cerca su Vinted →</button>
    </div>
  )
}

function GameCubeCard({ onOpen }) {
  const c = GAMECUBE
  const [priceMin, setPriceMin] = useState(c.priceMin)
  const [priceMax, setPriceMax] = useState(c.priceMax)
  const go = () => onOpen(buildUrl({ search: c.search, minPrice: priceMin, maxPrice: priceMax, catalog: c.catalog, brandId: c.brandId }))
  return (
    <div className="ccard" style={{ '--accent': c.color }}>
      <div className="ccard-top">
        <span className="ccard-emoji">{c.emoji}</span>
        <div className="ccard-titles">
          <span className="ccard-name">{c.name}</span>
          <span className="ccard-short">{c.short}</span>
        </div>
      </div>
      <div className="ccard-no-variant">Versione unica sul mercato italiano</div>
      <div className="ccard-price-row">
        <div className="ccard-price-group">
          <label className="ccard-price-label">Min <strong>€{priceMin}</strong></label>
          <input type="range" min="0" max="150" step="1" value={priceMin} className="ccard-slider"
            onChange={e => setPriceMin(Number(e.target.value))} />
        </div>
        <div className="ccard-price-group">
          <label className="ccard-price-label">Max <strong>€{priceMax}</strong></label>
          <input type="range" min="0" max="150" step="1" value={priceMax} className="ccard-slider"
            onChange={e => setPriceMax(Number(e.target.value))} />
        </div>
      </div>
      <button className="ccard-btn" onClick={go}>Cerca su Vinted →</button>
    </div>
  )
}

export default function Home() {
  const [activeTab, setActiveTab] = useState('consoles')
  const [n64Max, setN64Max] = useState(7)
  const [searchQuery, setSearchQuery] = useState('')

  const handleOpen = (url) => window.open(url, '_blank', 'noopener,noreferrer')

  const filteredConsoles = CONSOLES.filter(c =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.short.toLowerCase().includes(searchQuery.toLowerCase())
  )
  const showGCN = !searchQuery || 'gamecube gcn'.includes(searchQuery.toLowerCase())

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
        <header className="header">
          <div className="header-inner">
            <div className="logo">
              <span className="logo-icon">👾</span>
              <div>
                <h1 className="logo-title">Retrogaming Tracker</h1>
                <p className="logo-sub">Prezzi bassi su Vinted · Solo usato in buone condizioni</p>
              </div>
            </div>
            <div className="search-wrap">
              <input className="global-search" placeholder="Filtra console..."
                value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
            </div>
          </div>
        </header>

        <div className="tabs-wrap">
          <div className="tabs">
            {[
              { id: 'consoles', label: '🖥️ Console' },
              { id: 'games',    label: '💾 Giochi' },
              { id: 'imperdibili', label: '🔥 Imperdibili €1–2' },
              { id: 'n64',     label: '🟡 N64 Titoli' },
              { id: 'collect', label: '🏆 Collezionismo' },
            ].map(tab => (
              <button key={tab.id}
                className={`tab ${activeTab === tab.id ? 'tab-active' : ''}`}
                onClick={() => setActiveTab(tab.id)}>
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <main className="main">

          {activeTab === 'consoles' && (
            <div className="section">
              <p className="section-hint">Scegli variante · regola range prezzo · clicca Cerca su Vinted</p>
              <div className="grid-consoles">
                {filteredConsoles.map(c => <ConsoleCard key={c.short} console={c} onOpen={handleOpen} />)}
                {showGCN && <GameCubeCard onOpen={handleOpen} />}
              </div>
            </div>
          )}

          {activeTab === 'games' && (
            <div className="section">
              <p className="section-hint">Tutti i giochi per console · dal prezzo più basso · solo usato buono</p>
              <div className="grid-games">
                {GAMES_BY_CONSOLE.map(g => (
                  <button key={g.label} className="game-card"
                    onClick={() => handleOpen(buildUrl({ search: g.search, maxPrice: g.maxPrice, catalog: g.catalog, brandId: g.brandId, platformId: g.platformId }))}>
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

          {activeTab === 'imperdibili' && (
            <div className="section">
              <p className="section-hint">Titoli da trovare tra €1 e €2 — rari a quel prezzo, ma esistono</p>
              <div className="grid-games">
                {IMPERDIBILI.map(g => (
                  <button key={g.title} className="game-card"
                    onClick={() => handleOpen(buildUrl({ search: g.search, minPrice: 1, maxPrice: 2, catalog: 3026, brandId: g.brandId, platformId: g.platformId }))}>
                    <span className="gc-emoji">🔥</span>
                    <div className="gc-info">
                      <span className="gc-label">{g.title}</span>
                      <span className="gc-console-badge">{g.console}</span>
                    </div>
                    <span className="gc-price imp-price">€1–2</span>
                    <span className="gc-arrow">↗</span>
                  </button>
                ))}
              </div>
            </div>
          )}

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
                  <input type="range" min="1" max="50" step="1" value={n64Max}
                    onChange={e => setN64Max(Number(e.target.value))} className="price-slider" />
                  <div className="price-row"><span>€1</span><span>€50</span></div>
                </div>
                <button className="btn-all-n64"
                  onClick={() => handleOpen(buildUrl({ search: 'nintendo 64', maxPrice: n64Max, catalog: 3026, brandId: 29 }))}>
                  🔍 Tutti i giochi N64 fino a €{n64Max} →
                </button>
              </div>
              <div className="n64-grid">
                {N64_TITLES.map(t => (
                  <button key={t.title} className="n64-card"
                    onClick={() => handleOpen(buildUrl({ search: t.search, maxPrice: n64Max, catalog: 3026, brandId: 29 }))}>
                    <span className="n64-card-title">{t.title}</span>
                    <span className="n64-card-price">≤€{n64Max}</span>
                    <span className="n64-card-arrow">↗</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'collect' && (
            <div className="section">
              <p className="section-hint">Oggetti da collezione, lotti e accessori originali</p>
              <div className="grid-collect">
                {COLLECTIBLES.map(c => (
                  <button key={c.label} className="collect-card"
                    onClick={() => handleOpen(buildUrl({ search: c.search }))}>
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
          <p>Solo usato in buone condizioni · ordine prezzo crescente · vinted.it</p>
        </footer>
      </div>

      <style jsx global>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: 'DM Sans', sans-serif; background: #0d0d0d; color: #f0f0f0; min-height: 100vh; }
        .app { max-width: 960px; margin: 0 auto; padding: 0 16px 60px; }

        .header { padding: 24px 0 16px; }
        .header-inner { display: flex; align-items: center; gap: 16px; flex-wrap: wrap; justify-content: space-between; }
        .logo { display: flex; align-items: center; gap: 12px; }
        .logo-icon { font-size: 32px; }
        .logo-title { font-family: 'Space Mono', monospace; font-size: 20px; font-weight: 700; color: #fff; }
        .logo-sub { font-size: 12px; color: #888; margin-top: 2px; }
        .search-wrap { flex: 1; max-width: 260px; }
        .global-search {
          width: 100%; background: #1a1a1a; border: 1px solid #2a2a2a; border-radius: 8px;
          padding: 9px 14px; color: #f0f0f0; font-family: 'DM Sans', sans-serif;
          font-size: 14px; outline: none; transition: border-color 0.2s;
        }
        .global-search:focus { border-color: #555; }
        .global-search::placeholder { color: #555; }

        .tabs-wrap { overflow-x: auto; margin-bottom: 24px; }
        .tabs { display: flex; gap: 4px; min-width: max-content; border-bottom: 1px solid #1e1e1e; }
        .tab {
          background: none; border: none; border-bottom: 2px solid transparent;
          color: #666; font-family: 'DM Sans', sans-serif; font-size: 14px; font-weight: 500;
          padding: 10px 16px; cursor: pointer; white-space: nowrap;
          transition: color 0.2s, border-color 0.2s; margin-bottom: -1px;
        }
        .tab:hover { color: #ccc; }
        .tab-active { color: #fff; border-bottom-color: #e8ff2a; }

        .section-hint { font-size: 13px; color: #666; margin-bottom: 20px; }

        /* Console cards */
        .grid-consoles { display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 12px; }
        .ccard {
          background: #161616; border: 1px solid #222; border-radius: 14px;
          padding: 16px; display: flex; flex-direction: column; gap: 10px;
          position: relative; overflow: hidden;
        }
        .ccard::before {
          content: ''; position: absolute; top: 0; left: 0; right: 0;
          height: 3px; background: var(--accent); opacity: 0.8;
        }
        .ccard-top { display: flex; align-items: center; gap: 10px; }
        .ccard-emoji { font-size: 24px; }
        .ccard-titles { display: flex; flex-direction: column; }
        .ccard-name { font-size: 14px; font-weight: 600; color: #fff; }
        .ccard-short { font-family: 'Space Mono', monospace; font-size: 10px; color: #888; margin-top: 1px; }
        .ccard-select {
          width: 100%; background: #222; border: 1px solid #333; border-radius: 7px;
          color: #e0e0e0; font-family: 'DM Sans', sans-serif; font-size: 12px;
          padding: 7px 28px 7px 10px; outline: none; cursor: pointer; appearance: none;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%23888' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E");
          background-repeat: no-repeat; background-position: right 10px center;
        }
        .ccard-select:focus { border-color: #555; }
        .ccard-no-variant { font-size: 11px; color: #555; font-style: italic; padding: 2px 0; }
        .ccard-price-row { display: flex; gap: 10px; }
        .ccard-price-group { flex: 1; display: flex; flex-direction: column; gap: 4px; }
        .ccard-price-label { font-size: 11px; color: #888; }
        .ccard-price-label strong { color: #e8ff2a; }
        .ccard-slider { width: 100%; accent-color: #e8ff2a; cursor: pointer; }
        .ccard-btn {
          width: 100%; background: #1e1e1e; border: 1px solid #333; border-radius: 8px;
          color: #e0e0e0; font-family: 'DM Sans', sans-serif; font-size: 13px; font-weight: 500;
          padding: 9px; cursor: pointer; transition: background 0.15s, border-color 0.15s, color 0.15s;
        }
        .ccard-btn:hover { background: #e8ff2a; color: #0d0d0d; border-color: #e8ff2a; }
        .ccard-btn:active { opacity: 0.85; }

        /* Games */
        .grid-games { display: flex; flex-direction: column; gap: 8px; }
        .game-card {
          background: #161616; border: 1px solid #222; border-radius: 10px;
          padding: 14px 18px; display: flex; align-items: center; gap: 14px;
          cursor: pointer; text-align: left; transition: background 0.15s, border-color 0.15s;
        }
        .game-card:hover { background: #1e1e1e; border-color: #333; }
        .gc-emoji { font-size: 18px; flex-shrink: 0; }
        .gc-info { flex: 1; display: flex; align-items: center; gap: 8px; flex-wrap: wrap; }
        .gc-label { font-size: 14px; font-weight: 500; color: #f0f0f0; }
        .gc-console-badge { font-family: 'Space Mono', monospace; font-size: 10px; color: #888; background: #222; padding: 2px 6px; border-radius: 4px; }
        .gc-price { font-family: 'Space Mono', monospace; font-size: 11px; color: #4caf50; background: #0a1f0a; padding: 2px 8px; border-radius: 20px; flex-shrink: 0; }
        .imp-price { color: #ff9f2a; background: #1f1200; }
        .gc-arrow { color: #555; font-size: 14px; flex-shrink: 0; }
        .game-card:hover .gc-arrow { color: #aaa; }

        /* N64 */
        .n64-controls { background: #161616; border: 1px solid #222; border-radius: 14px; padding: 20px; margin-bottom: 20px; }
        .n64-header { display: flex; align-items: center; gap: 12px; margin-bottom: 20px; }
        .n64-icon { font-size: 28px; }
        .n64-title { font-size: 16px; font-weight: 600; color: #fff; }
        .n64-sub { font-size: 12px; color: #888; margin-top: 2px; }
        .price-filter { margin-bottom: 16px; }
        .price-label { display: block; font-size: 13px; color: #aaa; margin-bottom: 8px; }
        .price-label strong { color: #e8ff2a; }
        .price-slider { width: 100%; accent-color: #e8ff2a; cursor: pointer; }
        .price-row { display: flex; justify-content: space-between; font-size: 11px; color: #555; margin-top: 4px; }
        .btn-all-n64 {
          width: 100%; background: #e8ff2a; color: #0d0d0d; border: none; border-radius: 10px;
          padding: 12px 20px; font-family: 'DM Sans', sans-serif; font-size: 14px; font-weight: 600;
          cursor: pointer; transition: opacity 0.2s, transform 0.1s;
        }
        .btn-all-n64:hover { opacity: 0.9; transform: translateY(-1px); }
        .n64-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 8px; }
        .n64-card {
          background: #161616; border: 1px solid #222; border-radius: 10px;
          padding: 14px 16px; display: flex; align-items: center; justify-content: space-between;
          gap: 8px; cursor: pointer; text-align: left; transition: background 0.15s, border-color 0.15s;
        }
        .n64-card:hover { background: #1e1e1e; border-color: #333; }
        .n64-card-title { font-size: 13px; font-weight: 500; color: #f0f0f0; flex: 1; }
        .n64-card-price { font-family: 'Space Mono', monospace; font-size: 11px; color: #e8ff2a; flex-shrink: 0; }
        .n64-card-arrow { color: #555; font-size: 12px; flex-shrink: 0; }
        .n64-card:hover .n64-card-arrow { color: #aaa; }

        /* Collectibles */
        .grid-collect { display: flex; flex-direction: column; gap: 8px; }
        .collect-card {
          background: #161616; border: 1px solid #222; border-radius: 10px;
          padding: 16px 18px; display: flex; align-items: center; gap: 14px;
          cursor: pointer; text-align: left; transition: background 0.15s, border-color 0.15s;
        }
        .collect-card:hover { background: #1e1e1e; border-color: #333; }
        .cc-emoji { font-size: 22px; flex-shrink: 0; }
        .cc-info { flex: 1; }
        .cc-label { display: block; font-size: 14px; font-weight: 600; color: #fff; }
        .cc-desc { display: block; font-size: 12px; color: #888; margin-top: 2px; }
        .cc-arrow { color: #555; font-size: 14px; flex-shrink: 0; }
        .collect-card:hover .cc-arrow { color: #aaa; }

        .footer { text-align: center; padding: 30px 0 0; font-size: 12px; color: #444; border-top: 1px solid #1a1a1a; margin-top: 40px; }

        @media (max-width: 600px) {
          .logo-title { font-size: 17px; }
          .grid-consoles { grid-template-columns: 1fr; }
          .n64-grid { grid-template-columns: 1fr; }
          .header-inner { flex-direction: column; align-items: flex-start; gap: 12px; }
          .search-wrap { max-width: 100%; width: 100%; }
          .tab { font-size: 13px; padding: 10px 12px; }
          .ccard-price-row { flex-direction: column; }
        }
      `}</style>
    </>
  )
}
