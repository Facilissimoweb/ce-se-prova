import React, { useState } from 'react';
import { ArrowRight, ChevronDown, Mail, MapPin, MessageCircle, Quote, ShieldCheck } from 'lucide-react';
import type { CourseId, ScreenId } from '../types/handoff';
import {
  clientTestimonials,
  educationalCourses,
  holisticFaqs,
  holisticPathways,
  siteContent,
} from '../data/siteContent';
import { CopyText } from '../components/CopyText';
import { ResilientImage } from '../components/ResilientImage';
import { MajorArcanaArtwork } from '../components/MajorArcanaArtwork';
import { TarotEmblemLogo } from '../components/TarotEmblem';
import heroSanctuaryImg from '../assets/images/hero_tarot_sanctuary_1794651607080.jpg';
import practitionerHandsImg from '../assets/images/percorsi_hands_tarot_1794651609400.jpg';

interface HomeScreenProps {
  showCmsKeys: boolean;
  onNavigate: (screen: ScreenId) => void;
  onSelectCourse: (courseId: CourseId) => void;
  onOpenHandoff: () => void;
  onOpenPrivacy: () => void;
}

export function HomeScreen({
  showCmsKeys,
  onNavigate,
  onSelectCourse,
  onOpenHandoff,
  onOpenPrivacy,
}: HomeScreenProps) {
  const [openFaqId, setOpenFaqId] = useState<string | null>(holisticFaqs[0]?.id ?? null);

  const toggleFaq = (id: string) => {
    setOpenFaqId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="space-y-16 md:space-y-24 pb-8">
      {/* Sartorial Hero — No overlapping cards, generous obsidian negative space */}
      <section className="pt-8 md:pt-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          <div className="lg:col-span-8 space-y-6">
            <p className="text-xs md:text-[13px] font-semibold uppercase tracking-[0.08em] text-[#D4AF37]">
              <CopyText entry={siteContent.home.kicker} showKeys={showCmsKeys} />
            </p>

            <h1 className="font-display text-[34px] leading-[42px] md:text-[52px] md:leading-[60px] tracking-[0.02em] font-normal text-[#F4F1EA] max-w-2xl text-balance">
              <CopyText entry={siteContent.home.hero} showKeys={showCmsKeys} />
            </h1>

            <p className="text-base md:text-[17px] leading-[26px] md:leading-[28px] text-[#A39B93] max-w-[62ch]">
              <CopyText entry={siteContent.home.heroSubtitle} showKeys={showCmsKeys} />
            </p>

            {/* Primary & Secondary Actions */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                type="button"
                onClick={() => onNavigate('consulti')}
                className="px-6 py-3 min-h-[44px] rounded-lg bg-[#D4AF37] hover:bg-[#E6C65C] text-[#12100E] text-sm font-semibold inline-flex items-center gap-2 whitespace-nowrap shrink-0 transition-all duration-150 hover:shadow-[0_0_20px_rgba(212,175,55,0.3)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E6C65C]"
              >
                Scegli il Consulto
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => onNavigate('chat')}
                className="px-6 py-3 min-h-[44px] rounded-lg bg-[#D4AF37]/5 border border-[#D4AF37]/30 hover:bg-[#D4AF37]/12 hover:border-[#D4AF37] text-[#F4F1EA] text-sm font-medium inline-flex items-center gap-2 whitespace-nowrap shrink-0 transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]"
              >
                <MessageCircle className="w-4 h-4 text-[#D4AF37]" />
                Apri Dialogo Tarot
              </button>
            </div>

            {/* Clean Unboxed Deontological & Modality Metadata */}
            <div className="pt-4 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs md:text-[13px] text-[#A39B93]">
              <span>Lettura del presente e del futuro</span>
              <span aria-hidden="true" className="text-[#D4AF37]/60">·</span>
              <span>Sessioni riservate 45 / 60 / 90 min</span>
              <span aria-hidden="true" className="text-[#D4AF37]/60">·</span>
              <span>Online &amp; Studio su appuntamento</span>
            </div>
          </div>

          {/* Right Sartorial Focal Anchor: Subtle Emblem & Arcana Preview */}
          <div className="lg:col-span-4 flex justify-center lg:justify-end">
            <button
              type="button"
              onClick={() => onNavigate('chat')}
              className="group glass-tier-1 rounded-2xl p-6 w-full max-w-[300px] text-left transition-all duration-200 hover:border-[#D4AF37]/40 hover:shadow-[0_0_28px_rgba(212,175,55,0.16)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]"
            >
              <div className="flex items-center justify-between text-xs text-[#A39B93] mb-4">
                <span className="uppercase tracking-[0.08em] text-[#D4AF37] font-semibold">
                  Arcano del Giorno
                </span>
                <span className="font-mono tabular-nums">IX</span>
              </div>
              <div className="w-40 mx-auto my-2 rounded-xl overflow-hidden transition-transform duration-300 group-hover:-translate-y-1">
                <MajorArcanaArtwork
                  number={9}
                  numeral="IX"
                  name="L'Eremita"
                  className="w-full h-auto"
                />
              </div>
              <div className="mt-4 pt-3 border-t border-[#D4AF37]/15 flex items-center justify-between">
                <span className="font-display text-sm text-[#F4F1EA]">L&apos;Eremita</span>
                <span className="text-xs text-[#D4AF37] inline-flex items-center gap-1">
                  Contempla <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </button>
          </div>
        </div>
      </section>

      {/* Atmospheric Studio Showcase — 16:9 Editorial Visual */}
      <section aria-label="Atmosfera dello studio Tarot Italia">
        <figure className="relative rounded-2xl overflow-hidden border border-[#D4AF37]/20 glass-tier-1">
          <div className="aspect-[16/9] w-full overflow-hidden">
            <ResilientImage
              src={heroSanctuaryImg}
              alt="Tavolo di consultazione olistica con tarocchi bordati in oro, candela in ottone e ramo d'ulivo"
              className="w-full h-full object-cover"
              fallbackLabel="Studio Tarot Italia · Maria Teresa Rogani"
            />
          </div>
          <div
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#12100E]/90 via-[#12100E]/20 to-transparent"
            aria-hidden="true"
          />
          <figcaption className="absolute bottom-0 left-0 right-0 p-5 md:p-8 flex flex-col sm:flex-row sm:items-end justify-between gap-2">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#D4AF37]">
                Lo Studio · Atmosfera e Metodo
              </p>
              <p className="font-display text-base md:text-xl text-[#F4F1EA] mt-1">
                Un dialogo riservato tra simboli archetipici, ascolto e previsione consapevole
              </p>
            </div>
            <span className="text-xs text-[#A39B93] whitespace-nowrap shrink-0">
              In studio &amp; Videochiamata
            </span>
          </figcaption>
        </figure>
      </section>

      <div className="gold-divider" aria-hidden="true" />

      {/* Editorial Deontological Section with Practitioner Hands Photograph */}
      <section aria-labelledby="ethics-heading" className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        <div className="lg:col-span-5 rounded-2xl overflow-hidden border border-[#D4AF37]/20 glass-tier-1">
          <ResilientImage
            src={practitionerHandsImg}
            alt="Mani dell'operatore olistico accanto ai tarocchi sul tavolo in legno"
            className="w-full h-full min-h-[240px] aspect-[4/3] lg:aspect-auto object-cover"
            fallbackLabel="Ascolto ed Etica Professionale"
          />
        </div>

        <div className="lg:col-span-7 glass-tier-1 rounded-2xl p-6 md:p-8 flex flex-col justify-center gap-4">
          <div className="flex items-center gap-2.5 text-[#D4AF37]">
            <ShieldCheck className="w-5 h-5 shrink-0" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.08em]">
              Etica Professionale
            </span>
          </div>
          <h2 id="ethics-heading" className="font-body text-2xl md:text-[28px] md:leading-[36px] font-semibold tracking-[-0.02em] text-[#F4F1EA] text-balance">
            <CopyText entry={siteContent.home.ethicsBannerTitle} showKeys={showCmsKeys} />
          </h2>
          <p className="text-sm md:text-base leading-relaxed text-[#E8e1dd]">
            <CopyText entry={siteContent.home.ethicsBannerBody} showKeys={showCmsKeys} />
          </p>
          <p className="text-xs md:text-sm text-[#A39B93] pt-2 border-t border-[#D4AF37]/15">
            Disciplinato ai sensi della Legge 4/2013 sulle professioni non organizzate · Operatore Olistico Maria Teresa Rogani.
          </p>
        </div>
      </section>

      {/* Holistic Pathways Grid */}
      <section aria-labelledby="pathways-heading" className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-2 max-w-2xl">
            <h2 id="pathways-heading" className="font-body text-2xl md:text-[32px] md:leading-[40px] font-semibold tracking-[-0.02em] text-[#F4F1EA]">
              <CopyText entry={siteContent.home.pathwaysHeading} showKeys={showCmsKeys} />
            </h2>
            <p className="text-sm md:text-base text-[#A39B93]">
              <CopyText entry={siteContent.home.pathwaysIntro} showKeys={showCmsKeys} />
            </p>
          </div>
          <button
            type="button"
            onClick={() => onNavigate('consulti')}
            className="text-sm font-medium text-[#D4AF37] hover:text-[#E6C65C] inline-flex items-center gap-1.5 whitespace-nowrap shrink-0 self-start md:self-auto"
          >
            Esplora tutte le tariffe <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
          {holisticPathways.map((pathway) => (
            <article
              key={pathway.index}
              className="glass-tier-1 rounded-2xl p-6 md:p-8 flex flex-col justify-between gap-5 transition-colors duration-150 hover:border-[#D4AF37]/35"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-3 text-xs text-[#A39B93]">
                  <span className="font-display text-sm text-[#D4AF37] tabular-nums">
                    {pathway.index}.
                  </span>
                  <span>{pathway.modality}</span>
                </div>
                <h3 className="font-display text-lg md:text-xl text-[#F4F1EA]">
                  {showCmsKeys ? (
                    <CopyText
                      entry={{ cmsKey: pathway.cmsKeyTitle, liveText: pathway.title }}
                      showKeys={true}
                    />
                  ) : (
                    pathway.title
                  )}
                </h3>
                <p className="text-sm leading-relaxed text-[#A39B93]">
                  {showCmsKeys ? (
                    <CopyText
                      entry={{ cmsKey: pathway.cmsKeyDesc, liveText: pathway.description }}
                      showKeys={true}
                    />
                  ) : (
                    pathway.description
                  )}
                </p>
              </div>

              <div className="pt-3 border-t border-[#D4AF37]/12 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() =>
                    onNavigate(pathway.index === '04' ? 'chat' : 'consulti')
                  }
                  className="text-xs md:text-sm font-medium text-[#F4F1EA] hover:text-[#D4AF37] inline-flex items-center gap-1.5 transition-colors"
                >
                  {pathway.index === '04' ? 'Vai al Dialogo Guidato' : 'Vedi durata e tariffa'}
                  <ArrowRight className="w-3.5 h-3.5 text-[#D4AF37]" />
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Paid Educational Courses Showcase — 1) Arcani Maggiori, 2) Arcani Minori, 3) Metodi di Stesura */}
      <section aria-labelledby="courses-preview-heading" className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-2 max-w-2xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#D4AF37]">
              Formazione a Pagamento · 3 Moduli
            </p>
            <h2
              id="courses-preview-heading"
              className="font-body text-2xl md:text-[32px] md:leading-[40px] font-semibold tracking-[-0.02em] text-[#F4F1EA]"
            >
              <CopyText entry={siteContent.home.coursesHeading} showKeys={showCmsKeys} />
            </h2>
            <p className="text-sm md:text-base text-[#A39B93]">
              <CopyText entry={siteContent.home.coursesIntro} showKeys={showCmsKeys} />
            </p>
          </div>
          <button
            type="button"
            onClick={() => onNavigate('corsi')}
            className="text-sm font-medium text-[#D4AF37] hover:text-[#E6C65C] inline-flex items-center gap-1.5 whitespace-nowrap shrink-0 self-start md:self-auto"
          >
            Apri area didattica completa <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6 items-stretch">
          {educationalCourses.map((course, idx) => (
            <article
              key={course.id}
              className={`rounded-2xl p-6 md:p-7 flex flex-col justify-between gap-6 transition-colors duration-150 ${
                course.recommended
                  ? 'glass-tier-2 border-[#D4AF37]/40 hover:border-[#D4AF37]/60'
                  : 'glass-tier-1 hover:border-[#D4AF37]/40'
              }`}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between gap-2 text-xs text-[#A39B93]">
                  <span className="font-semibold uppercase tracking-[0.08em] text-[#D4AF37]">
                    {idx + 1}) {course.title}
                  </span>
                  <span className="tabular-nums">{course.lessonsCount} lezioni</span>
                </div>

                <h3 className="font-display text-lg md:text-xl text-[#F4F1EA]">
                  {course.subtitle}
                </h3>

                <p className="text-sm leading-relaxed text-[#A39B93]">
                  {course.description}
                </p>
              </div>

              <div className="pt-4 border-t border-[#D4AF37]/15 flex items-center justify-between gap-3">
                <span className="font-display text-xl text-[#D4AF37] tabular-nums">
                  € {course.priceEur}
                </span>
                <button
                  type="button"
                  onClick={() => onSelectCourse(course.id)}
                  className="text-xs md:text-sm font-medium text-[#F4F1EA] hover:text-[#D4AF37] inline-flex items-center gap-1.5 transition-colors whitespace-nowrap"
                >
                  Scopri il percorso
                  <ArrowRight className="w-3.5 h-3.5 text-[#D4AF37]" />
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Testimonianze — Minimalist Dark Glass Cards with Gold-Accented Borders */}
      <section aria-labelledby="testimonials-heading" className="space-y-8">
        <div className="space-y-2 max-w-2xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#D4AF37]">
            Esperienze di Ascolto
          </p>
          <h2 id="testimonials-heading" className="font-body text-2xl md:text-[32px] md:leading-[40px] font-semibold tracking-[-0.02em] text-[#F4F1EA]">
            <CopyText entry={siteContent.home.testimonialsHeading} showKeys={showCmsKeys} />
          </h2>
          <p className="text-sm md:text-base text-[#A39B93]">
            <CopyText entry={siteContent.home.testimonialsIntro} showKeys={showCmsKeys} />
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6 items-stretch">
          {clientTestimonials.map((item) => (
            <figure
              key={item.id}
              className="glass-tier-1 rounded-2xl border border-[#D4AF37]/25 hover:border-[#D4AF37]/45 p-6 md:p-7 flex flex-col justify-between gap-6 transition-colors duration-150"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#D4AF37]">
                    {item.sessionContext}
                  </span>
                  <Quote className="w-4 h-4 text-[#D4AF37]/60 shrink-0" aria-hidden="true" />
                </div>

                <blockquote className="text-sm leading-relaxed text-[#E8e1dd]">
                  &ldquo;
                  {showCmsKeys ? (
                    <CopyText
                      entry={{ cmsKey: item.cmsKeyQuote, liveText: item.quote }}
                      showKeys={true}
                    />
                  ) : (
                    item.quote
                  )}
                  &rdquo;
                </blockquote>
              </div>

              <figcaption className="pt-4 border-t border-[#D4AF37]/15">
                <p className="font-display text-sm text-[#F4F1EA]">{item.authorName}</p>
                <p className="text-xs text-[#A39B93] mt-0.5">{item.authorRole}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* Holistic & Ethical FAQ Accordion */}
      <section aria-labelledby="faq-heading" className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-4 space-y-3">
          <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#D4AF37]">
            Chiarezza &amp; Deontologia
          </p>
          <h2 id="faq-heading" className="font-body text-2xl md:text-[30px] md:leading-[38px] font-semibold tracking-[-0.02em] text-[#F4F1EA] text-balance">
            <CopyText entry={siteContent.home.faqHeading} showKeys={showCmsKeys} />
          </h2>
          <p className="text-sm leading-relaxed text-[#A39B93]">
            <CopyText entry={siteContent.home.faqIntro} showKeys={showCmsKeys} />
          </p>
        </div>

        <div className="lg:col-span-8 glass-tier-1 rounded-2xl divide-y divide-[#D4AF37]/15 overflow-hidden">
          {holisticFaqs.map((faq, index) => {
            const isOpen = openFaqId === faq.id;
            const panelId = `${faq.id}-panel`;
            const buttonId = `${faq.id}-button`;

            return (
              <div key={faq.id}>
                <h3>
                  <button
                    id={buttonId}
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => toggleFaq(faq.id)}
                    className="w-full min-h-[56px] px-6 py-5 text-left flex items-start justify-between gap-4 hover:bg-[#D4AF37]/5 transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#D4AF37]"
                  >
                    <div className="space-y-1.5 pr-2">
                      <span className="block text-[11px] font-semibold uppercase tracking-[0.08em] text-[#D4AF37]/90">
                        {String(index + 1).padStart(2, '0')} · {faq.category}
                      </span>
                      <span className="block font-body font-semibold text-base md:text-[17px] tracking-[-0.01em] text-[#F4F1EA]">
                        {showCmsKeys ? (
                          <CopyText
                            entry={{ cmsKey: faq.cmsKeyQuestion, liveText: faq.question }}
                            showKeys={true}
                          />
                        ) : (
                          faq.question
                        )}
                      </span>
                    </div>
                    <ChevronDown
                      className={`w-5 h-5 text-[#D4AF37] shrink-0 mt-1 transition-transform duration-150 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                      aria-hidden="true"
                    />
                  </button>
                </h3>

                {isOpen && (
                  <div
                    id={panelId}
                    role="region"
                    aria-labelledby={buttonId}
                    className="px-6 pb-6 pt-1"
                  >
                    <p className="text-sm md:text-[15px] leading-relaxed text-[#A39B93]">
                      {showCmsKeys ? (
                        <CopyText
                          entry={{ cmsKey: faq.cmsKeyAnswer, liveText: faq.answer }}
                          showKeys={true}
                        />
                      ) : (
                        faq.answer
                      )}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Contact Dock & Quiet Studio Footer Block */}
      <section aria-labelledby="dock-heading" className="glass-tier-1 rounded-2xl p-6 md:p-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          <div className="md:col-span-5 flex items-center gap-4">
            <TarotEmblemLogo size={44} className="shrink-0" />
            <div>
              <h2 id="dock-heading" className="font-body font-semibold tracking-[-0.01em] text-lg text-[#F4F1EA]">
                <CopyText entry={siteContent.home.dockHeading} showKeys={showCmsKeys} />
              </h2>
              <p className="text-xs text-[#A39B93] mt-0.5">
                <CopyText entry={siteContent.brand.role} showKeys={showCmsKeys} />
              </p>
            </div>
          </div>

          <div className="md:col-span-7 flex flex-wrap items-center md:justify-end gap-3">
            <a
              href="https://wa.me/390000000000?text=Buongiorno%20Maria%20Teresa%2C%20vorrei%20richiedere%20un%20consulto."
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 min-h-[44px] rounded-lg bg-[#D4AF37]/10 border border-[#D4AF37]/30 hover:border-[#D4AF37] text-xs md:text-sm font-medium text-[#F4F1EA] inline-flex items-center gap-2 whitespace-nowrap shrink-0 transition-colors"
            >
              <MessageCircle className="w-4 h-4 text-[#D4AF37]" />
              WhatsApp Diretto
            </a>
            <a
              href="mailto:studio@tarotitalia.it"
              className="px-4 py-2.5 min-h-[44px] rounded-lg bg-[#12100E]/80 border border-[#D4AF37]/20 hover:border-[#D4AF37]/50 text-xs md:text-sm font-medium text-[#F4F1EA] inline-flex items-center gap-2 whitespace-nowrap shrink-0 transition-colors"
            >
              <Mail className="w-4 h-4 text-[#D4AF37]" />
              studio@tarotitalia.it
            </a>
            <button
              type="button"
              onClick={onOpenPrivacy}
              className="px-4 py-2.5 min-h-[44px] rounded-lg bg-[#12100E]/80 border border-[#A39B93]/25 hover:border-[#D4AF37] text-xs md:text-sm font-medium text-[#A39B93] hover:text-[#F4F1EA] inline-flex items-center gap-2 whitespace-nowrap shrink-0 transition-colors"
            >
              <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
              Privacy &amp; Cookie
            </button>
            <button
              type="button"
              onClick={onOpenHandoff}
              className="px-4 py-2.5 min-h-[44px] rounded-lg bg-[#12100E]/80 border border-[#A39B93]/25 hover:border-[#D4AF37] text-xs md:text-sm font-medium text-[#A39B93] hover:text-[#F4F1EA] inline-flex items-center gap-2 whitespace-nowrap shrink-0 transition-colors"
            >
              <MapPin className="w-4 h-4 text-[#D4AF37]" />
              Specifiche Handoff &amp; CMS
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
