import React from 'react';
import {
  ArrowLeft,
  ArrowUpRight,
  Calendar,
  Mail,
  MapPin,
  MessageCircle,
  ParkingSquare,
  Phone,
} from 'lucide-react';
import type { ScreenId } from '../types/handoff';
import { ContattiStyledMap } from '../components/ContattiStyledMap';
import {
  NEARBY_PARKING,
  SITE_ADDRESS_FULL,
  SITE_BUSINESS_PROFILE_URL,
  SITE_EMAIL,
  SITE_MAPS_DIRECTIONS_URL,
  SITE_MAPS_OPEN_URL,
  SITE_PARKING_SEARCH_URL,
  SITE_PHONE_DISPLAY,
  SITE_PHONE_TEL,
  SITE_PIVA,
  hasGoogleMapsApiKey,
  whatsappHref,
} from '../lib/siteContacts';

type Props = {
  onNavigate: (screen: ScreenId) => void;
};

export function ContattiScreen({ onNavigate }: Props) {
  const usingOfficialMaps = hasGoogleMapsApiKey();

  return (
    <div className="space-y-12 pb-12 pt-6 md:pt-10">
      <button
        type="button"
        onClick={() => onNavigate('home')}
        className="inline-flex items-center gap-2 text-sm text-[#A39B93] transition-colors hover:text-[#D4AF37]"
      >
        <ArrowLeft className="h-4 w-4" />
        Torna alla Home
      </button>

      <header className="max-w-3xl space-y-4 border-b border-[#D4AF37]/15 pb-8">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#D4AF37]">
          Contatti
        </p>
        <h1 className="font-display text-3xl leading-tight text-[#F4F1EA] md:text-4xl">
          Scrivimi o vieni a Macerata
        </h1>
        <p className="max-w-2xl text-sm leading-relaxed text-[#A39B93]">
          Consulti in chiamata vocale online, oppure di persona a{' '}
          <span className="text-[#F4F1EA]/90">Via Crispi 37</span> — solo su
          appuntamento. Non è uno studio aperto al pubblico senza prenotazione.
        </p>
      </header>

      {/* Contatti diretti */}
      <section
        aria-labelledby="contatti-diretti-heading"
        className="grid grid-cols-1 gap-6 lg:grid-cols-12"
      >
        <div className="space-y-5 lg:col-span-5">
          <div className="space-y-2">
            <h2
              id="contatti-diretti-heading"
              className="font-display text-xl tracking-[0.02em] text-[#F4F1EA]"
            >
              Riferimenti
            </h2>
            <p className="text-sm leading-relaxed text-[#A39B93]">
              Maria Teresa Rogani · Tarot Italia · Operatore Olistico L. 4/2013
            </p>
          </div>

          <ul className="space-y-3">
            <li>
              <a
                href={`mailto:${SITE_EMAIL}`}
                className="group flex items-start gap-3 rounded-xl border border-[#D4AF37]/18 bg-[#151311]/70 px-4 py-3.5 transition-colors hover:border-[#D4AF37]/45"
              >
                <Mail
                  className="mt-0.5 h-4 w-4 shrink-0 text-[#D4AF37]"
                  aria-hidden="true"
                />
                <span>
                  <span className="block text-[11px] font-semibold uppercase tracking-[0.12em] text-[#A39B93]">
                    Email
                  </span>
                  <span className="text-sm text-[#F4F1EA] group-hover:text-[#D4AF37]">
                    {SITE_EMAIL}
                  </span>
                </span>
              </a>
            </li>
            <li>
              <a
                href={`tel:${SITE_PHONE_TEL}`}
                className="group flex items-start gap-3 rounded-xl border border-[#D4AF37]/18 bg-[#151311]/70 px-4 py-3.5 transition-colors hover:border-[#D4AF37]/45"
              >
                <Phone
                  className="mt-0.5 h-4 w-4 shrink-0 text-[#D4AF37]"
                  aria-hidden="true"
                />
                <span>
                  <span className="block text-[11px] font-semibold uppercase tracking-[0.12em] text-[#A39B93]">
                    Telefono
                  </span>
                  <span className="text-sm text-[#F4F1EA] group-hover:text-[#D4AF37]">
                    {SITE_PHONE_DISPLAY}
                  </span>
                </span>
              </a>
            </li>
            <li>
              <div className="flex items-start gap-3 rounded-xl border border-[#D4AF37]/18 bg-[#151311]/70 px-4 py-3.5">
                <MapPin
                  className="mt-0.5 h-4 w-4 shrink-0 text-[#D4AF37]"
                  aria-hidden="true"
                />
                <span>
                  <span className="block text-[11px] font-semibold uppercase tracking-[0.12em] text-[#A39B93]">
                    Indirizzo
                  </span>
                  <span className="text-sm text-[#F4F1EA]">
                    {SITE_ADDRESS_FULL}
                  </span>
                  <span className="mt-1 block text-xs text-[#A39B93]">
                    Di persona solo su appuntamento
                  </span>
                </span>
              </div>
            </li>
            <li>
              <div className="flex items-start gap-3 rounded-xl border border-[#D4AF37]/12 bg-[#151311]/40 px-4 py-3.5">
                <span className="mt-0.5 w-4 shrink-0 text-center text-[10px] font-semibold text-[#D4AF37]">
                  P.IVA
                </span>
                <span className="text-sm tracking-wide text-[#F4F1EA]/85">
                  {SITE_PIVA}
                </span>
              </div>
            </li>
          </ul>

          <div className="flex flex-wrap gap-2.5 pt-1">
            <a
              href={whatsappHref(
                'Buongiorno Maria Teresa, desidero informazioni su un consulto Tarot Italia.'
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="cta-label inline-flex min-h-[44px] items-center justify-center gap-2 rounded-lg border border-[#D4AF37]/30 bg-[#151311]/85 px-4 py-2.5 text-xs font-medium text-[#F4F1EA] transition-colors hover:border-[#D4AF37] hover:text-[#D4AF37]"
            >
              <MessageCircle className="h-4 w-4 text-[#D4AF37]" aria-hidden />
              WhatsApp
            </a>
            <button
              type="button"
              onClick={() => onNavigate('booking')}
              className="cta-label inline-flex min-h-[44px] items-center justify-center gap-2 rounded-lg bg-[#D4AF37] px-4 py-2.5 text-xs font-semibold text-[#12100E] transition-colors hover:bg-[#E6C65C]"
            >
              <Calendar className="h-4 w-4" aria-hidden />
              Prenota consulto
            </button>
          </div>
        </div>

        {/* Mappa sede */}
        <div className="space-y-3 lg:col-span-7">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <h2 className="font-display text-xl tracking-[0.02em] text-[#F4F1EA]">
                Dove trovarci
              </h2>
              <p className="mt-1 text-sm text-[#A39B93]">
                Mappa di Via Crispi 37 a Macerata
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <a
                href={SITE_MAPS_OPEN_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-[#D4AF37] transition-colors hover:text-[#E6C65C]"
              >
                Apri su Google Maps
                <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
              </a>
              <span className="text-[#D4AF37]/30" aria-hidden>
                ·
              </span>
              <a
                href={SITE_BUSINESS_PROFILE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-[#D4AF37] transition-colors hover:text-[#E6C65C]"
              >
                Scheda attività
                <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
              </a>
            </div>
          </div>

          <div className="overflow-hidden rounded-2xl border border-[#D4AF37]/20 bg-[#151311]/80 shadow-[0_0_0_1px_rgba(212,175,55,0.05)]">
            <ContattiStyledMap
              mode="place"
              title="Mappa Google — Via Crispi 37, Macerata"
              className="h-[280px] w-full border-0 md:h-[340px]"
            />
          </div>

          <div className="flex flex-wrap gap-x-4 gap-y-2 text-xs text-[#A39B93]">
            <a
              href={SITE_MAPS_DIRECTIONS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 hover:text-[#D4AF37]"
            >
              Indicazioni stradali
              <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
            </a>
            <span className="text-[#A39B93]/70">
              {usingOfficialMaps
                ? 'Mappa stilizzata (Maps JavaScript API · tema dark/oro)'
                : 'Mappa soft senza API key — imposta VITE_GOOGLE_MAPS_API_KEY per lo stile dark/oro'}
            </span>
          </div>
        </div>
      </section>

      <div className="gold-divider" aria-hidden="true" />

      {/* Parcheggi */}
      <section aria-labelledby="parcheggi-heading" className="space-y-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl space-y-2">
            <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#D4AF37]">
              Arrivo in auto
            </p>
            <h2
              id="parcheggi-heading"
              className="font-display text-2xl tracking-[0.02em] text-[#F4F1EA]"
            >
              Parcheggi nelle vicinanze
            </h2>
            <p className="text-sm leading-relaxed text-[#A39B93]">
              Il centro storico di Macerata è in ZTL: conviene lasciare l’auto in
              una struttura pubblica e proseguire a piedi (o con ascensore)
              verso Via Crispi. Il più vicino è il Parcheggio Direzionale.
            </p>
          </div>
          <a
            href={SITE_PARKING_SEARCH_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex shrink-0 items-center gap-1.5 text-xs text-[#D4AF37] hover:text-[#E6C65C]"
          >
            Cerca parcheggi su Maps
            <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
          </a>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          <ul className="space-y-3 lg:col-span-5">
            {NEARBY_PARKING.map((spot, index) => (
              <li key={spot.name}>
                <a
                  href={spot.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group flex gap-3 rounded-xl border px-4 py-3.5 transition-colors ${
                    index === 0
                      ? 'border-[#D4AF37]/40 bg-[#151311]/85 hover:border-[#D4AF37]/70'
                      : 'border-[#D4AF37]/15 bg-[#151311]/60 hover:border-[#D4AF37]/40'
                  }`}
                >
                  <ParkingSquare
                    className="mt-0.5 h-4 w-4 shrink-0 text-[#D4AF37]"
                    aria-hidden="true"
                  />
                  <span className="min-w-0">
                    <span className="flex flex-wrap items-center gap-x-2 gap-y-0.5">
                      <span className="font-medium text-[#F4F1EA] group-hover:text-[#D4AF37]">
                        {spot.name}
                      </span>
                      {index === 0 && (
                        <span className="text-[10px] font-semibold uppercase tracking-[0.1em] text-[#D4AF37]">
                          Più vicino
                        </span>
                      )}
                    </span>
                    <span className="mt-0.5 block text-xs text-[#A39B93]">
                      {spot.address}
                    </span>
                    <span className="mt-1 block text-xs leading-relaxed text-[#A39B93]/85">
                      {spot.note}
                    </span>
                  </span>
                  <ArrowUpRight
                    className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#A39B93] group-hover:text-[#D4AF37]"
                    aria-hidden
                  />
                </a>
              </li>
            ))}
          </ul>

          <div className="overflow-hidden rounded-2xl border border-[#D4AF37]/20 bg-[#151311]/80 lg:col-span-7">
            <ContattiStyledMap
              mode="parking"
              title="Parcheggi vicino a Via Crispi 37, Macerata"
              className="h-[280px] w-full border-0 md:h-full md:min-h-[340px]"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
