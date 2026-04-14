import Head from 'next/head'
import { useState } from 'react'

const VINTED = 'https://www.vinted.it/catalog'

// status 3=Buone, 4=Ottime — NO nuovo con cartellino (1) o senza (2)
// order newest_first — annunci piu recenti prima
const buildUrl = ({ search = '', minPrice = null, maxPrice = null, catalog = null, brandId = null, platformId = null } = {}) => {
  let url = `${VINTED}?search_text=${encodeURIComponent(search)}&order=newest_first&status_ids[]=3&status_ids[]=4&currency=EUR`
  if (minPrice) url += `&price_from=${minPrice}`
  if (maxPrice) url += `&price_to=${maxPrice}`
  if (catalog) url += `&catalog[]=${catalog}`
  if (brandId) url += `&brand_id[]=${brandId}&brand_ids[]=${brandId}`
  if (platformId) url += `&video_game_platform_ids[]=${platformId}`
  return url
}

const CONSOLES = [
  { name: 'PlayStation 1', short: 'PS1', emoji: '🎮', color: '#2255cc', catalog: 3025, brandId: 272284, platformId: 1277,
    variants: [
      { label: 'Fat (SCPH-100x)', search: 'playstation 1 fat', priceMin: 10, priceMax: 25 },
      { label: 'PSOne (slim)', search: 'psone slim', priceMin: 15, priceMax: 29 },
    ]},
  { name: 'PlayStation 2', short: 'PS2', emoji: '🎮', color: '#2255cc', catalog: 3025, brandId: 272284, platformId: 1278,
    variants: [
      { label: 'Fat (50000-39000)', search: 'playstation 2 fat', priceMin: 20, priceMax: 39 },
      { label: 'Slim (70000-90000)', search: 'playstation 2 slim', priceMin: 20, priceMax: 35 },
    ]},
  { name: 'PlayStation 3', short: 'PS3', emoji: '🎮', color: '#2255cc', catalog: 3025, brandId: 272284, platformId: 1279,
    variants: [
      { label: 'Fat (60/80GB)', search: 'playstation 3 fat 80gb', priceMin: 30, priceMax: 55 },
      { label: 'Slim (120/320GB)', search: 'playstation 3 slim', priceMin: 25, priceMax: 45 },
      { label: 'Super Slim', search: 'playstation 3 super slim', priceMin: 25, priceMax: 49 },
    ]},
  { name: 'PlayStation 4', short: 'PS4', emoji: '🎮', color: '#2255cc', catalog: 3025, brandId: 272284, platformId: 1280,
    variants: [
      { label: 'Fat 500GB', search: 'playstation 4 fat 500gb', priceMin: 35, priceMax: 55 },
      { label: 'Fat 1TB', search: 'playstation 4 fat 1tb', priceMin: 40, priceMax: 59 },
      { label: 'Slim 500GB', search: 'playstation 4 slim 500gb', priceMin: 38, priceMax: 55 },
      { label: 'Slim 1TB', search: 'playstation 4 slim 1tb', priceMin: 42, priceMax: 59 },
      { label: 'Pro 1TB', search: 'playstation 4 pro 1tb', priceMin: 55, priceMax: 90 },
    ]},
  { name: 'Nintendo Wii', short: 'Wii', emoji: '🕹️', color: '#cc2222', catalog: 3025, brandId: 29,
    variants: [
      { label: 'Wii (bianca)', search: 'nintendo wii bianco', priceMin: 10, priceMax: 19 },
      { label: 'Wii Mini (rossa)', search: 'nintendo wii mini', priceMin: 8, priceMax: 15 },
    ]},
  { name: 'Nintendo 64', short: 'N64', emoji: '🕹️', color: '#cc2222', catalog: 3025, brandId: 29,
    variants: [
      { label: 'Grigia (standard)', search: 'nintendo 64 grigio', priceMin: 25, priceMax: 55 },
      { label: 'Nera (limited)', search: 'nintendo 64 nero', priceMin: 30, priceMax: 60 },
    ]},
  { name: 'Atari', short: 'ATARI', emoji: '👾', color: '#bb7700', catalog: 3025, brandId: 13148,
    variants: [
      { label: '2600', search: 'atari 2600', priceMin: 10, priceMax: 35 },
      { label: '7800', search: 'atari 7800', priceMin: 15, priceMax: 45 },
      { label: 'Jaguar', search: 'atari jaguar', priceMin: 30, priceMax: 80 },
    ]},
  { name: 'Sega Dreamcast', short: 'DC', emoji: '💿', color: '#5566bb', catalog: 3025, brandId: 471,
    variants: [
      { label: 'Standard (bianca)', search: 'dreamcast bianco', priceMin: 30, priceMax: 65 },
      { label: 'Nera (Sports)', search: 'dreamcast nero sport', priceMin: 40, priceMax: 70 },
    ]},
]

const GAMECUBE = { name: 'GameCube', short: 'GCN', emoji: '🕹️', color: '#cc2222', search: 'nintendo gamecube', catalog: 3025, brandId: 29, priceMin: 35, priceMax: 70 }

const GAMES = [
  { label: 'N64', search: 'nintendo 64', maxPrice: 7, emoji: '🟡', catalog: 3026, brandId: 29 },
  { label: 'PS1', search: 'playstation 1', emoji: '🔵', catalog: 3026, brandId: 272284, platformId: 1277 },
  { label: 'PS2', search: 'playstation 2', emoji: '🔵', catalog: 3026, brandId: 272284, platformId: 1278 },
  { label: 'PS3', search: 'playstation 3', emoji: '🔵', catalog: 3026, brandId: 272284, platformId: 1279 },
  { label: 'Wii', search: 'nintendo wii', emoji: '🔴', catalog: 3026, brandId: 29 },
  { label: 'GameCube', search: 'gamecube', emoji: '🔴', catalog: 3026, brandId: 29 },
  { label: 'Dreamcast', search: 'dreamcast', emoji: '🟣', catalog: 3026, brandId: 471 },
  { label: 'Atari', search: 'atari', emoji: '🟠', catalog: 3026, brandId: 13148 },
]

const IMPERDIBILI = [
  { title: 'FIFA PS2', search: 'fifa ps2', con: 'PS2', platformId: 1278, brandId: 272284 },
  { title: 'Need for Speed PS2', search: 'need for speed ps2', con: 'PS2', platformId: 1278, brandId: 272284 },
  { title: 'GTA San Andreas PS2', search: 'gta san andreas ps2', con: 'PS2', platformId: 1278, brandId: 272284 },
  { title: 'Gran Turismo PS2', search: 'gran turismo ps2', con: 'PS2', platformId: 1278, brandId: 272284 },
  { title: 'Crash Bandicoot PS1', search: 'crash bandicoot ps1', con: 'PS1', platformId: 1277, brandId: 272284 },
  { title: 'Spyro PS1', search: 'spyro ps1', con: 'PS1', platformId: 1277, brandId: 272284 },
  { title: 'Tekken 3 PS1', search: 'tekken 3 ps1', con: 'PS1', platformId: 1277, brandId: 272284 },
  { title: 'Wii Sports', search: 'wii sports nintendo', con: 'Wii', brandId: 29 },
  { title: 'Mario Kart Wii', search: 'mario kart wii', con: 'Wii', brandId: 29 },
  { title: 'Just Dance Wii', search: 'just dance wii', con: 'Wii', brandId: 29 },
  { title: 'Sonic Adventure DC', search: 'sonic adventure dreamcast', con: 'DC', brandId: 471 },
  { title: 'Soul Calibur DC', search: 'soul calibur dreamcast', con: 'DC', brandId: 471 },
  { title: 'Atari cartucce varie', search: 'atari cartuccia gioco', con: 'ATARI', brandId: 13148 },
  { title: 'Super Smash Bros N64', search: 'super smash bros nintendo 64', con: 'N64', brandId: 29 },
  { title: 'Pokemon Stadium N64', search: 'pokemon stadium nintendo 64', con: 'N64', brandId: 29 },
]

const N64_TITLES = [
  { title: 'Super Mario 64', search: 'super mario 64 nintendo 64' },
  { title: 'Zelda Ocarina of Time', search: 'zelda ocarina time nintendo 64' },
  { title: 'Zelda Majora Mask', search: 'zelda majora mask nintendo 64' },
  { title: 'Mario Kart 64', search: 'mario kart 64 nintendo 64' },
  { title: 'GoldenEye 007', search: 'goldeneye 007 nintendo 64' },
  { title: 'Banjo-Kazooie', search: 'banjo kazooie nintendo 64' },
  { title: 'Pokemon Snap', search: 'pokemon snap nintendo 64' },
  { title: 'Star Fox 64', search: 'star fox 64 nintendo 64' },
  { title: 'Donkey Kong 64', search: 'donkey kong 64 nintendo 64' },
  { title: 'Perfect Dark', search: 'perfect dark nintendo 64' },
]

const COLLECTIBLES = [
  { label: 'Lotti retrogaming', desc: 'Bundle console + giochi misti', search: 'lotto retrogaming console giochi bundle', emoji: '📦' },
  { label: 'Controller vintage', desc: 'Joypad e paddle originali', search: 'controller joypad retro vintage console', emoji: '🕹️' },
  { label: 'Memory card', desc: 'PS1, PS2, GameCube originali', search: 'memory card ps1 ps2 gamecube nintendo', emoji: '💾' },
  { label: 'Box e manuali', desc: 'Scatole originali con libretto', search: 'scatola box manuale gioco console originale', emoji: '📖' },
  { label: 'Merchandise', desc: 'Figure, gadget, oggetti rari', search: 'merchandise figure gadget retrogaming nintendo', emoji: '🏆' },
  { label: 'Accessori rari', desc: 'Periferiche e cavi originali', search: 'accessori cavi periferiche retrogaming console', emoji: '🔌' },
]

function CCard({ con, onOpen }) {
  const [idx, setIdx] = useState(0)
  const v = con.variants[idx]
  const [pMin, setPMin] = useState(v.priceMin)
  const [pMax, setPMax] = useState(v.priceMax)
  const change = (i) => { const nv = con.variants[i]; setIdx(i); setPMin(nv.priceMin); setPMax(nv.priceMax) }
  const go = () => onOpen(buildUrl({ search: v.search, minPrice: pMin, maxPrice: pMax, catalog: con.catalog, brandId: con.brandId, platformId: con.platformId }))
  return (
    <div className="ccard" style={{ borderTop: `3px solid ${con.color}` }}>
      <div className="ctop">
        <span className="cemoji">{con.emoji}</span>
        <div><div className="cname">{con.name}</div><div className="cshort">{con.short}</div></div>
      </div>
      <select className="csel" value={idx} onChange={e => change(Number(e.target.value))}>
        {con.variants.map((vv, i) => <option key={i} value={i}>{vv.label}</option>)}
      </select>
      <div className="csliders">
        <div className="sgroup">
          <div className="slabel">Min <strong>EUR {pMin}</strong></div>
          <input type="range" min="0" max="150" step="1" value={pMin} className="rng" onChange={e => setPMin(Number(e.target.value))} />
        </div>
        <div className="sgroup">
          <div className="slabel">Max <strong>EUR {pMax}</strong></div>
          <input type="range" min="0" max="150" step="1" value={pMax} className="rng" onChange={e => setPMax(Number(e.target.value))} />
        </div>
      </div>
      <button className="cbtn" onClick={go}>Cerca su Vinted</button>
    </div>
  )
}

function GCNCard({ onOpen }) {
  const [pMin, setPMin] = useState(GAMECUBE.priceMin)
  const [pMax, setPMax] = useState(GAMECUBE.priceMax)
  const go = () => onOpen(buildUrl({ search: GAMECUBE.search, minPrice: pMin, maxPrice: pMax, catalog: GAMECUBE.catalog, brandId: GAMECUBE.brandId }))
  return (
    <div className="ccard" style={{ borderTop: `3px solid ${GAMECUBE.color}` }}>
      <div className="ctop">
        <span className="cemoji">{GAMECUBE.emoji}</span>
        <div><div className="cname">{GAMECUBE.name}</div><div className="cshort">{GAMECUBE.short}</div></div>
      </div>
      <div className="cnovar">Versione unica sul mercato italiano</div>
      <div className="csliders">
        <div className="sgroup">
          <div className="slabel">Min <strong>EUR {pMin}</strong></div>
          <input type="range" min="0" max="150" step="1" value={pMin} className="rng" onChange={e => setPMin(Number(e.target.value))} />
        </div>
        <div className="sgroup">
          <div className="slabel">Max <strong>EUR {pMax}</strong></div>
          <input type="range" min="0" max="150" step="1" value={pMax} className="rng" onChange={e => setPMax(Number(e.target.value))} />
        </div>
      </div>
      <button className="cbtn" onClick={go}>Cerca su Vinted</button>
    </div>
  )
}

const TABS = [
  { id: 'consoles', label: 'Console' },
  { id: 'games', label: 'Giochi' },
  { id: 'imperdibili', label: 'Imperdibili EUR 1-2' },
  { id: 'n64', label: 'N64 Titoli' },
  { id: 'collect', label: 'Collezionismo' },
]

export default function Home() {
  const [tab, setTab] = useState('consoles')
  const [n64Max, setN64Max] = useState(7)
  const [q, setQ] = useState('')
  const open = (url) => window.open(url, '_blank', 'noopener,noreferrer')
  const filtered = CONSOLES.filter(c => c.name.toLowerCase().includes(q.toLowerCase()) || c.short.toLowerCase().includes(q.toLowerCase()))
  const showGCN = !q || 'gamecube gcn'.includes(q.toLowerCase())
  return (
    <>
      <Head>
        <title>Retrogaming Vinted Tracker</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=DM+Sans:wght@400;500;600&display=swap" rel="stylesheet" />
      </Head>
      <div className="app">
        <header className="header">
          <div className="hinner">
            <div className="logo">
              <span className="logo-icon">👾</span>
              <div>
                <div className="logo-title">Retrogaming Tracker</div>
                <div className="logo-sub">Solo usato buono/ottimo · recenti prima · nessun nuovo con cartellino</div>
              </div>
            </div>
            <div className="swrap">
              <input className="gsearch" placeholder="Filtra console..." value={q} onChange={e => setQ(e.target.value)} />
            </div>
          </div>
        </header>
        <div className="twrap">
          <div className="tabs">
            {TABS.map(t => (
              <button key={t.id} className={"tab" + (tab === t.id ? " on" : "")} onClick={() => setTab(t.id)}>{t.label}</button>
            ))}
          </div>
        </div>
        <main>
          {tab === 'consoles' && (
            <>
              <p className="hint">Scegli variante, regola Min/Max, clicca Cerca su Vinted</p>
              <div className="gcols">
                {filtered.map(c => <CCard key={c.short} con={c} onOpen={open} />)}
                {showGCN && <GCNCard onOpen={open} />}
              </div>
            </>
          )}
          {tab === 'games' && (
            <>
              <p className="hint">Tutti i giochi per console, recenti prima, solo usato buono/ottimo</p>
              <div className="grows">
                {GAMES.map(g => (
                  <button key={g.label} className="grow" onClick={() => open(buildUrl({ search: g.search, maxPrice: g.maxPrice, catalog: g.catalog, brandId: g.brandId, platformId: g.platformId }))}>
                    <span className="gemoji">{g.emoji}</span>
                    <div className="ginfo">
                      <span className="glabel">{g.label}</span>
                      {g.maxPrice && <span className="gprice pgreen">fino a EUR {g.maxPrice}</span>}
                    </div>
                    <span className="garr">↗</span>
                  </button>
                ))}
              </div>
            </>
          )}
          {tab === 'imperdibili' && (
            <>
              <p className="hint">Titoli da trovare tra EUR 1 e EUR 2 — rari a quel prezzo, ma esistono</p>
              <div className="grows">
                {IMPERDIBILI.map(g => (
                  <button key={g.title} className="grow" onClick={() => open(buildUrl({ search: g.search, minPrice: 1, maxPrice: 2, catalog: 3026, brandId: g.brandId, platformId: g.platformId }))}>
                    <span className="gemoji">🔥</span>
                    <div className="ginfo">
                      <span className="glabel">{g.title}</span>
                      <span className="gbadge">{g.con}</span>
                    </div>
                    <span className="gprice porange">EUR 1-2</span>
                    <span className="garr">↗</span>
                  </button>
                ))}
              </div>
            </>
          )}
          {tab === 'n64' && (
            <>
              <div className="n64box">
                <div className="n64hd">
                  <span className="n64hdicon">🟡</span>
                  <div>
                    <div className="n64hdtitle">Giochi Nintendo 64</div>
                    <div className="n64hdsub">Prezzo massimo personalizzabile</div>
                  </div>
                </div>
                <div className="n64lbl">Prezzo max: <strong>EUR {n64Max}</strong></div>
                <input type="range" min="1" max="50" step="1" value={n64Max} className="n64rng" onChange={e => setN64Max(Number(e.target.value))} />
                <div className="n64ends"><span>EUR 1</span><span>EUR 50</span></div>
                <button className="n64btn" onClick={() => open(buildUrl({ search: 'nintendo 64', maxPrice: n64Max, catalog: 3026, brandId: 29 }))}>
                  Tutti i giochi N64 fino a EUR {n64Max}
                </button>
              </div>
              <div className="n64grid">
                {N64_TITLES.map(t => (
                  <button key={t.title} className="n64card" onClick={() => open(buildUrl({ search: t.search, maxPrice: n64Max, catalog: 3026, brandId: 29 }))}>
                    <span className="n64ctitle">{t.title}</span>
                    <span className="n64cprice">max EUR {n64Max}</span>
                    <span className="n64carr">↗</span>
                  </button>
                ))}
              </div>
            </>
          )}
          {tab === 'collect' && (
            <>
              <p className="hint">Oggetti da collezione, lotti e accessori originali</p>
              <div className="ccols">
                {COLLECTIBLES.map(c => (
                  <button key={c.label} className="crow" onClick={() => open(buildUrl({ search: c.search }))}>
                    <span className="cremoji">{c.emoji}</span>
                    <div className="crinfo">
                      <span className="crlabel">{c.label}</span>
                      <span className="crdesc">{c.desc}</span>
                    </div>
                    <span className="crarr">↗</span>
                  </button>
                ))}
              </div>
            </>
          )}
        </main>
        <footer className="footer">
          <p>Usato buono/ottimo · recenti prima · nessun nuovo con cartellino · vinted.it</p>
        </footer>
      </div>
    </>
  )
}
