import React, { useState } from 'react';

interface SuitSpec {
  id: 'bastoni' | 'coppe' | 'spade' | 'denari';
  name: string;
  element: string;
  season: string;
  sphere: string;
  teachingFocus: string;
}

const SUITS: SuitSpec[] = [
  {
    id: 'bastoni',
    name: 'Bastoni',
    element: 'Fuoco',
    season: 'Primavera · Azione rapida',
    sphere: 'Volontà, progetti, slancio creativo',
    teachingFocus:
      'Nel modulo impari a leggere l’impulso iniziale, il coraggio imprenditoriale e le accelerazioni degli eventi futuri.',
  },
  {
    id: 'coppe',
    name: 'Coppe',
    element: 'Acqua',
    season: 'Estate · Flusso emotivo',
    sphere: 'Relazioni, intuizione, vita affettiva',
    teachingFocus:
      'Approfondisci la risonanza emotiva, i legami di coppia, le aperture del cuore e i segnali intuitivi.',
  },
  {
    id: 'spade',
    name: 'Spade',
    element: 'Aria',
    season: 'Autunno · Lucidità mentale',
    sphere: 'Pensiero, decisioni, verità e tagli netti',
    teachingFocus:
      'Decifri conflitti verbali, dubbi strategici, chiarezza comunicativa e scelte risolutive senza timore.',
  },
  {
    id: 'denari',
    name: 'Denari',
    element: 'Terra',
    season: 'Inverno · Radicamento',
    sphere: 'Lavoro, stabilità, risorse e corpo',
    teachingFocus:
      'Impari a stimare tempi concreti di maturazione, risultati economici, contratti e solidità materiale.',
  },
];

function SuitEngraving({ id }: { id: SuitSpec['id'] }) {
  return (
    <svg viewBox="0 0 80 112" className="w-full h-auto" aria-hidden="true">
      <rect
        x="3"
        y="3"
        width="74"
        height="106"
        rx="6"
        fill="#12100E"
        stroke="#D4AF37"
        strokeOpacity="0.45"
        strokeWidth="1.1"
      />
      <rect
        x="7"
        y="7"
        width="66"
        height="98"
        rx="3"
        fill="none"
        stroke="#D4AF37"
        strokeOpacity="0.2"
        strokeWidth="0.7"
      />
      {id === 'bastoni' && (
        <g stroke="#D4AF37" strokeWidth="1.4" strokeLinecap="round" fill="none">
          <path d="M40 88 L40 26" />
          <path d="M36 30 L40 22 L44 30" />
          <path d="M40 44 C48 40, 50 34, 46 31" />
          <path d="M40 58 C32 54, 30 48, 34 45" />
          <path d="M40 72 C47 68, 49 63, 45 60" />
          <circle cx="40" cy="20" r="2.2" fill="#D4AF37" fillOpacity="0.6" />
        </g>
      )}
      {id === 'coppe' && (
        <g stroke="#D4AF37" strokeWidth="1.4" strokeLinecap="round" fill="none">
          <path d="M26 30 H54 C54 48, 46 56, 40 56 C34 56, 26 48, 26 30 Z" fill="#D4AF37" fillOpacity="0.1" />
          <path d="M40 56 V80" />
          <path d="M29 84 H51 L46 80 H34 Z" fill="#D4AF37" fillOpacity="0.2" />
          <path d="M31 36 H49" strokeOpacity="0.55" />
          <circle cx="40" cy="22" r="2.5" strokeOpacity="0.7" />
        </g>
      )}
      {id === 'spade' && (
        <g stroke="#D4AF37" strokeWidth="1.4" strokeLinecap="round" fill="none">
          <path d="M40 20 L44 32 L42.5 72 H37.5 L36 32 Z" fill="#D4AF37" fillOpacity="0.1" />
          <line x1="40" y1="22" x2="40" y2="71" strokeOpacity="0.55" />
          <path d="M26 72 C32 70, 48 70, 54 72" />
          <line x1="40" y1="72" x2="40" y2="85" />
          <circle cx="40" cy="88" r="2.8" fill="#D4AF37" fillOpacity="0.5" />
        </g>
      )}
      {id === 'denari' && (
        <g stroke="#D4AF37" strokeWidth="1.3" fill="none">
          <circle cx="40" cy="56" r="20" fill="#D4AF37" fillOpacity="0.08" />
          <circle cx="40" cy="56" r="15.5" strokeOpacity="0.5" />
          <polygon
            points="40,41 44,51 54,51 46,57.5 49,68 40,61.5 31,68 34,57.5 26,51 36,51"
            fill="#D4AF37"
            fillOpacity="0.18"
          />
        </g>
      )}
    </svg>
  );
}

export function MinorArcanaSuitsPlate() {
  const [selectedSuitId, setSelectedSuitId] = useState<SuitSpec['id']>('bastoni');
  const activeSuit = SUITS.find((s) => s.id === selectedSuitId) ?? SUITS[0];

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {SUITS.map((suit) => {
          const isSelected = suit.id === selectedSuitId;
          return (
            <button
              key={suit.id}
              type="button"
              onClick={() => setSelectedSuitId(suit.id)}
              aria-pressed={isSelected}
              className={`rounded-xl p-3 text-left border transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] ${
                isSelected
                  ? 'bg-[#D4AF37]/12 border-[#D4AF37] shadow-[0_0_20px_rgba(212,175,55,0.16)]'
                  : 'bg-[#12100E]/75 border-[#D4AF37]/18 hover:border-[#D4AF37]/45'
              }`}
            >
              <div className="w-14 mx-auto mb-2.5">
                <SuitEngraving id={suit.id} />
              </div>
              <p className="font-display text-sm text-center text-[#F4F1EA]">
                {suit.name}
              </p>
              <p className="text-[11px] text-center text-[#D4AF37] mt-0.5">
                {suit.element}
              </p>
            </button>
          );
        })}
      </div>

      <div className="rounded-xl bg-[#12100E]/80 border border-[#D4AF37]/20 p-4 md:p-5 space-y-2">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-[#D4AF37]">
          <span className="font-semibold uppercase tracking-[0.06em]">
            Seme di {activeSuit.name} · {activeSuit.element}
          </span>
          <span aria-hidden="true" className="text-[#D4AF37]/50">·</span>
          <span className="text-[#A39B93]">{activeSuit.season}</span>
        </div>
        <p className="text-sm font-medium text-[#F4F1EA]">{activeSuit.sphere}</p>
        <p className="text-xs md:text-sm leading-relaxed text-[#A39B93]">
          {activeSuit.teachingFocus}
        </p>
      </div>
    </div>
  );
}

interface SpreadPosition {
  idx: number;
  label: string;
  x: number;
  y: number;
  rotate?: number;
  role: string;
}

interface SpreadMethod {
  id: 'tre-carte' | 'croce-celtica-sintesi' | 'bivio';
  name: string;
  subtitle: string;
  positions: SpreadPosition[];
}

const SPREAD_METHODS: SpreadMethod[] = [
  {
    id: 'tre-carte',
    name: 'Linea del Tempo (3 Carte)',
    subtitle: 'Presente, sviluppo prossimo e direzione futura',
    positions: [
      { idx: 1, label: 'I', x: 42, y: 34, role: 'Radice e stato attuale della situazione' },
      { idx: 2, label: 'II', x: 112, y: 34, role: 'Forza attiva o nodo di passaggio immediato' },
      { idx: 3, label: 'III', x: 182, y: 34, role: 'Tendenza futura probabile e consiglio operativo' },
    ],
  },
  {
    id: 'bivio',
    name: 'Stesa del Bivio (5 Carte)',
    subtitle: 'Confronto tra due scelte future alternative',
    positions: [
      { idx: 1, label: 'I', x: 42, y: 40, role: 'Il consultante e l’intenzione di partenza' },
      { idx: 2, label: 'II', x: 112, y: 14, role: 'Sentiero A · Sviluppo a breve termine' },
      { idx: 3, label: 'III', x: 182, y: 14, role: 'Sentiero A · Esito futuro consolidato' },
      { idx: 4, label: 'IV', x: 112, y: 66, role: 'Sentiero B · Sviluppo a breve termine' },
      { idx: 5, label: 'V', x: 182, y: 66, role: 'Sentiero B · Esito futuro consolidato' },
    ],
  },
  {
    id: 'croce-celtica-sintesi',
    name: 'Croce Centrale & Futuro (6 Carte)',
    subtitle: 'Struttura classica per domande complesse',
    positions: [
      { idx: 1, label: 'I', x: 78, y: 40, role: 'Cuore della questione nel presente' },
      { idx: 2, label: 'II', x: 78, y: 40, rotate: 90, role: 'Sfida o dinamica che attraversa la situazione' },
      { idx: 3, label: 'III', x: 78, y: 4, role: 'Consapevolezza e obiettivo dichiarato' },
      { idx: 4, label: 'IV', x: 78, y: 76, role: 'Radice profonda e base non visibile' },
      { idx: 5, label: 'V', x: 26, y: 40, role: 'Passato recente che cede il passo' },
      { idx: 6, label: 'VI', x: 162, y: 40, role: 'Futuro in arrivo e direzione evolutiva' },
    ],
  },
];

export function SpreadGeometryExplorer() {
  const [selectedMethodId, setSelectedMethodId] =
    useState<SpreadMethod['id']>('tre-carte');
  const [activePosIdx, setActivePosIdx] = useState<number>(1);

  const method =
    SPREAD_METHODS.find((m) => m.id === selectedMethodId) ?? SPREAD_METHODS[0];
  const activePos =
    method.positions.find((p) => p.idx === activePosIdx) ?? method.positions[0];

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {SPREAD_METHODS.map((m) => {
          const isCurrent = m.id === selectedMethodId;
          return (
            <button
              key={m.id}
              type="button"
              onClick={() => {
                setSelectedMethodId(m.id);
                setActivePosIdx(1);
              }}
              aria-pressed={isCurrent}
              className={`px-3.5 py-2 min-h-[40px] rounded-lg text-xs font-medium whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] ${
                isCurrent
                  ? 'bg-[#D4AF37] text-[#12100E] font-semibold'
                  : 'bg-[#12100E]/80 border border-[#D4AF37]/20 text-[#A39B93] hover:text-[#F4F1EA] hover:border-[#D4AF37]/45'
              }`}
            >
              {m.name}
            </button>
          );
        })}
      </div>

      <div className="rounded-xl bg-[#12100E]/80 border border-[#D4AF37]/20 p-4 md:p-5 grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
        <div className="md:col-span-7">
          <svg
            viewBox="0 0 248 124"
            className="w-full h-auto max-w-[360px] mx-auto"
            role="img"
            aria-label={`Schema geometrico ${method.name}`}
          >
            {/* Subtle alignment axes */}
            <line
              x1="12"
              y1="62"
              x2="236"
              y2="62"
              stroke="#D4AF37"
              strokeOpacity="0.12"
              strokeDasharray="3 3"
            />
            {method.positions.map((pos) => {
              const isPosSelected = pos.idx === activePos.idx;
              const cx = pos.x + 14;
              const cy = pos.y + 22;
              return (
                <g
                  key={pos.idx}
                  onClick={() => setActivePosIdx(pos.idx)}
                  className="cursor-pointer"
                  transform={
                    pos.rotate ? `rotate(${pos.rotate} ${cx} ${cy})` : undefined
                  }
                >
                  <rect
                    x={pos.x}
                    y={pos.y}
                    width="28"
                    height="44"
                    rx="3"
                    fill={isPosSelected ? '#D4AF37' : '#1A1615'}
                    fillOpacity={isPosSelected ? 0.22 : 0.9}
                    stroke="#D4AF37"
                    strokeOpacity={isPosSelected ? 0.95 : 0.4}
                    strokeWidth={isPosSelected ? '1.4' : '1'}
                  />
                  <text
                    x={cx}
                    y={cy + 4}
                    textAnchor="middle"
                    fill={isPosSelected ? '#E6C65C' : '#A39B93'}
                    fontSize="10"
                    fontFamily="Cinzel, Georgia, serif"
                    fontWeight="600"
                  >
                    {pos.label}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        <div className="md:col-span-5 space-y-3">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#D4AF37]">
              Posizione {activePos.label} di {method.positions.length}
            </p>
            <p className="text-sm font-medium text-[#F4F1EA] mt-1">
              {activePos.role}
            </p>
          </div>
          <p className="text-xs text-[#A39B93] leading-relaxed">
            {method.subtitle}. Seleziona una carta nello schema per ispezionarne la funzione nella stesa.
          </p>
          <div className="flex flex-wrap gap-1.5 pt-1">
            {method.positions.map((pos) => (
              <button
                key={pos.idx}
                type="button"
                onClick={() => setActivePosIdx(pos.idx)}
                className={`w-8 h-8 rounded text-xs font-mono tabular-nums border transition-colors ${
                  pos.idx === activePos.idx
                    ? 'bg-[#D4AF37] border-[#D4AF37] text-[#12100E] font-bold'
                    : 'border-[#D4AF37]/25 text-[#A39B93] hover:text-[#F4F1EA]'
                }`}
              >
                {pos.idx}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
