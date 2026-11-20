import React, { useId, useState } from 'react';
import { ChevronDown, Eye } from 'lucide-react';
import type { SchedaVisivaContent } from '../../data/schedeVisive/types';

type SectionId = 'mappa' | 'decodifica' | 'griglia' | 'sintesi';

const SECTION_LABELS: Record<SectionId, string> = {
  mappa: 'Mappa della composizione',
  decodifica: 'Decodifica iconografica',
  griglia: 'Griglia di osservazione',
  sintesi: 'Sintesi operativa',
};

interface DispensaSchedaVisivaProps {
  content: SchedaVisivaContent;
}

function AccordionSection({
  id,
  title,
  open,
  onToggle,
  children,
}: {
  id: string;
  title: string;
  open: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}) {
  const panelId = `${id}-panel`;
  const buttonId = `${id}-button`;

  return (
    <div className="rounded-xl border border-[#D4AF37]/22 bg-[#151311]/70 overflow-hidden">
      <button
        type="button"
        id={buttonId}
        aria-expanded={open}
        aria-controls={panelId}
        onClick={onToggle}
        className="w-full min-h-[48px] px-4 py-3 flex items-center justify-between gap-3 text-left hover:bg-[#D4AF37]/06 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#D4AF37]"
      >
        <span className="font-body font-semibold text-sm md:text-[15px] text-[#F4F1EA]">
          {title}
        </span>
        <ChevronDown
          className={`w-4 h-4 text-[#D4AF37] shrink-0 transition-transform duration-200 ${
            open ? 'rotate-180' : ''
          }`}
          aria-hidden="true"
        />
      </button>
      <div
        id={panelId}
        role="region"
        aria-labelledby={buttonId}
        hidden={!open}
        className={open ? 'border-t border-[#D4AF37]/15' : undefined}
      >
        <div className="px-4 py-4 space-y-3 text-sm leading-relaxed text-[#E8e1dd]">
          {children}
        </div>
      </div>
    </div>
  );
}

/** Didactic body stays Italian for study precision (ENN-155). */
function SchedaBody({ children }: { children: React.ReactNode }) {
  return (
    <div className="notranslate space-y-3" translate="no">
      {children}
    </div>
  );
}

export function DispensaSchedaVisiva({ content }: DispensaSchedaVisivaProps) {
  const baseId = useId();
  const [openSections, setOpenSections] = useState<Record<SectionId, boolean>>({
    mappa: true,
    decodifica: false,
    griglia: false,
    sintesi: false,
  });

  const toggle = (section: SectionId) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  // ENN-155 — chrome / section titles follow GT; didactic lists stay notranslate.
  return (
    <section
      className="space-y-4 rounded-2xl border border-[#D4AF37]/25 bg-[#12100E]/55 p-4 md:p-6"
      aria-label={`Scheda visiva: ${content.title}`}
    >
      <div className="space-y-1.5">
        <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#D4AF37] inline-flex items-center gap-2">
          <Eye className="w-3.5 h-3.5" aria-hidden="true" />
          {content.eyebrow}
        </p>
        <h4 className="font-display text-lg md:text-xl text-[#F4F1EA] leading-snug">
          {content.title}
        </h4>
        <p className="text-xs md:text-sm text-[#A39B93] leading-relaxed">
          {content.subtitle}
        </p>
      </div>

      {/* Mobile-first: carta Waite in evidenza */}
      <figure className="mx-auto w-full max-w-[280px] sm:max-w-[320px]">
        <div className="rounded-2xl border border-[#D4AF37]/35 bg-gradient-to-b from-[#1A1615] to-[#0E0C0B] p-2.5 shadow-[0_12px_40px_rgba(0,0,0,0.45)]">
          <img
            src={content.imageSrc}
            alt={content.imageAlt}
            className="w-full h-auto rounded-xl object-contain"
            loading="lazy"
            decoding="async"
          />
        </div>
        <figcaption className="mt-2.5 text-center text-[11px] text-[#A39B93]">
          {content.imageCaption}
        </figcaption>
      </figure>

      <div className="space-y-2.5">
        <AccordionSection
          id={`${baseId}-mappa`}
          title={SECTION_LABELS.mappa}
          open={openSections.mappa}
          onToggle={() => toggle('mappa')}
        >
          <p className="text-[11px] uppercase tracking-[0.06em] text-[#E6C65C] font-semibold">
            Mappa della Composizione Visiva (Pamela Colman Smith)
          </p>
          <SchedaBody>
            <ul className="space-y-3">
              {content.mappa.map((item) => (
                <li key={item.title} className="space-y-1">
                  <p className="font-body font-semibold text-[#F4F1EA] text-sm">
                    {item.title}
                  </p>
                  <p>{item.body}</p>
                </li>
              ))}
            </ul>
          </SchedaBody>
        </AccordionSection>

        <AccordionSection
          id={`${baseId}-decodifica`}
          title={SECTION_LABELS.decodifica}
          open={openSections.decodifica}
          onToggle={() => toggle('decodifica')}
        >
          <p className="text-[11px] uppercase tracking-[0.06em] text-[#E6C65C] font-semibold">
            Decodifica Visiva: Elemento per Elemento
          </p>
          <SchedaBody>
            <ul className="space-y-4">
              {content.decodifica.map((item) => (
                <li
                  key={item.title}
                  className="space-y-2 rounded-lg border border-[#D4AF37]/12 bg-[#12100E]/40 p-3"
                >
                  <p className="font-body font-semibold text-[#F4F1EA] text-sm">
                    {item.title}
                  </p>
                  <p>
                    <span className="text-[#D4AF37] font-medium">Cosa si vede: </span>
                    {item.cosaSiVede}
                  </p>
                  <p>
                    <span className="text-[#D4AF37] font-medium">
                      Cosa comunica visivamente:{' '}
                    </span>
                    {item.cosaComunica}
                  </p>
                </li>
              ))}
            </ul>
          </SchedaBody>
        </AccordionSection>

        <AccordionSection
          id={`${baseId}-griglia`}
          title={SECTION_LABELS.griglia}
          open={openSections.griglia}
          onToggle={() => toggle('griglia')}
        >
          <p className="text-[11px] uppercase tracking-[0.06em] text-[#E6C65C] font-semibold">
            Griglia di Osservazione Rapida in Stesa
          </p>
          <SchedaBody>
            {/* Mobile: stacked rows; sm+: compact table */}
            <div className="space-y-3 sm:hidden">
              {content.griglia.map((row) => (
                <div
                  key={row.dettaglio}
                  className="rounded-lg border border-[#D4AF37]/12 bg-[#12100E]/40 p-3 space-y-2"
                >
                  <p className="font-body font-semibold text-[#F4F1EA]">{row.dettaglio}</p>
                  <p>
                    <span className="text-[#D4AF37] font-medium">Focus: </span>
                    {row.focus}
                  </p>
                  <p>
                    <span className="text-[#D4AF37] font-medium">Messaggio: </span>
                    {row.messaggio}
                  </p>
                </div>
              ))}
            </div>
            <div className="hidden sm:block overflow-x-auto -mx-1">
              <table className="w-full min-w-[480px] text-left text-sm border-collapse">
                <thead>
                  <tr className="border-b border-[#D4AF37]/25 text-[#E6C65C]">
                    <th className="py-2 pr-3 font-semibold font-body">Dettaglio Visivo</th>
                    <th className="py-2 pr-3 font-semibold font-body">Focus dell&apos;Osservazione</th>
                    <th className="py-2 font-semibold font-body">Messaggio Chiave</th>
                  </tr>
                </thead>
                <tbody>
                  {content.griglia.map((row) => (
                    <tr
                      key={row.dettaglio}
                      className="border-b border-[#D4AF37]/12 align-top"
                    >
                      <td className="py-2.5 pr-3 font-semibold text-[#F4F1EA]">
                        {row.dettaglio}
                      </td>
                      <td className="py-2.5 pr-3">{row.focus}</td>
                      <td className="py-2.5">{row.messaggio}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </SchedaBody>
        </AccordionSection>

        <AccordionSection
          id={`${baseId}-sintesi`}
          title={SECTION_LABELS.sintesi}
          open={openSections.sintesi}
          onToggle={() => toggle('sintesi')}
        >
          <p className="text-[11px] uppercase tracking-[0.06em] text-[#E6C65C] font-semibold">
            Sintesi Operativa della Scheda
          </p>
          <SchedaBody>
            <ul className="space-y-3">
              {content.sintesi.map((item) => (
                <li key={item.title} className="space-y-1">
                  <p className="font-body font-semibold text-[#F4F1EA] text-sm">
                    {item.title}
                  </p>
                  <p>{item.body}</p>
                </li>
              ))}
            </ul>
          </SchedaBody>
        </AccordionSection>
      </div>
    </section>
  );
}
