import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight, Check, ChevronDown, Mail, MapPin, MessageCircle, Phone, ShieldCheck } from 'lucide-react';
import type { ConsultationTariff, CourseId, ScreenId } from '../types/handoff';
import {
  consultationTariffs,
  educationalCourses,
  holisticFaqs,
  siteContent,
} from '../data/siteContent';
import { CopyText } from '../components/CopyText';
import { ResilientImage } from '../components/ResilientImage';
import { MajorArcanaArtwork } from '../components/MajorArcanaArtwork';
import { TAROT_ITALIA_HOME_HERO_SRC, TarotEmblemLogo } from '../components/TarotEmblem';
import { HomeHeroNebula } from '../components/HomeHeroNebula';
import { HomeArticlesLoop } from '../components/HomeArticlesLoop';
import {
  HOME_CONSULTI_SECTION_ID,
  HOME_DIDATTICA_SECTION_ID,
  HomeSectionBookmarks,
} from '../components/HomeSectionBookmarks';
import { HomeTestimonialsCarousel } from '../components/HomeTestimonialsCarousel';
import { COURSE_SECTION_IMAGES, TARIFF_SECTION_IMAGES } from '../data/sectionImages';
import {
  SITE_ADDRESS,
  SITE_EMAIL,
  SITE_PHONE_DISPLAY,
  SITE_PHONE_TEL,
  whatsappHref,
} from '../lib/siteContacts';
import practitionerHandsImg from '../assets/images/percorsi_hands_tarot_1794651609400.jpg';
import homePageVideo from '../assets/videos/home-page.mp4';

function isReduceMotionPreferred(): boolean {
  if (typeof window === 'undefined' || typeof document === 'undefined') return false;
  const osPrefers =
    typeof window.matchMedia === 'function' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const a11yPrefers = document.documentElement.classList.contains('a11y-reduce-motion');
  return osPrefers || a11yPrefers;
}

interface HomeScreenProps {
  showCmsKeys: boolean;
  onNavigate: (screen: ScreenId) => void;
  onSelectTariffAndBook: (tariffId: ConsultationTariff['id']) => void;
  onSelectCourse: (courseId: CourseId) => void;
  onOpenHandoff: () => void;
  onOpenPrivacy: () => void;
}

export function HomeScreen({
  showCmsKeys,
  onNavigate,
  onSelectTariffAndBook,
  onSelectCourse,
  onOpenHandoff,
  onOpenPrivacy,
}: HomeScreenProps) {
  const [openFaqId, setOpenFaqId] = useState<string | null>(holisticFaqs[0]?.id ?? null);
  const atmosferaVideoRef = useRef<HTMLVideoElement | null>(null);

  const toggleFaq = (id: string) => {
    setOpenFaqId((prev) => (prev === id ? null : id));
  };

  useEffect(() => {
    const video = atmosferaVideoRef.current;
    if (!video) return;

    const syncPlayback = () => {
      if (isReduceMotionPreferred()) {
        video.pause();
        return;
      }
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          /* Autoplay may be blocked; muted + playsInline covers typical cases. */
        });
      }
    };

    syncPlayback();

    const mediaQuery =
      typeof window.matchMedia === 'function'
        ? window.matchMedia('(prefers-reduced-motion: reduce)')
        : null;
    const onMediaChange = () => syncPlayback();
    mediaQuery?.addEventListener('change', onMediaChange);

    const observer = new MutationObserver(syncPlayback);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    return () => {
      mediaQuery?.removeEventListener('change', onMediaChange);
      observer.disconnect();
    };
  }, []);

  return (
    <div className="space-y-16 md:space-y-24 pb-8">
      <HomeSectionBookmarks visible />

      {/* Opening brand mark — full-bleed hero so nebula can reach true viewport edges */}
      <section
        className="home-hero-bleed relative isolate overflow-hidden pt-1 md:pt-3"
        aria-labelledby="home-hero-heading"
      >
        <HomeHeroNebula />

        <div
          className="pointer-events-none absolute inset-x-0 top-[4%] z-[1] flex justify-center"
          aria-hidden="true"
        >
          <div className="h-[min(44vw,260px)] w-[min(64vw,340px)] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(212,175,55,0.16)_0%,rgba(88,60,140,0.08)_42%,transparent_72%)] animate-hero-mark-glow" />
        </div>

        <div className="relative z-[2] mx-auto flex max-w-3xl flex-col items-center px-5 text-center md:px-8 lg:px-12">
          <img
            src={TAROT_ITALIA_HOME_HERO_SRC}
            alt="Tarot Italia"
            width={1024}
            height={1024}
            decoding="async"
            fetchPriority="high"
            className="h-auto w-[min(68vw,236px)] object-contain object-center md:w-[min(34vw,268px)] animate-hero-mark-rise"
          />

          <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#D4AF37]/90 md:mt-5 md:text-xs animate-hero-copy-rise [animation-delay:120ms]">
            <CopyText entry={siteContent.home.kicker} showKeys={showCmsKeys} />
          </p>

          <h1
            id="home-hero-heading"
            className="mt-2 max-w-xl font-display text-[22px] leading-[30px] font-normal tracking-[0.02em] text-[#F4F1EA] text-balance md:mt-3 md:text-[28px] md:leading-[36px] animate-hero-copy-rise [animation-delay:220ms]"
          >
            <CopyText entry={siteContent.home.hero} showKeys={showCmsKeys} />
          </h1>

          <p className="mt-2.5 max-w-[46ch] text-[13px] leading-[20px] text-[#A39B93] md:mt-3 md:text-sm md:leading-[22px] animate-hero-copy-rise [animation-delay:320ms]">
            <CopyText entry={siteContent.home.heroSubtitle} showKeys={showCmsKeys} />
          </p>

          <div className="mt-5 flex flex-wrap items-center justify-center gap-3 md:mt-6 md:gap-4 animate-hero-copy-rise [animation-delay:420ms]">
            <button
              type="button"
              onClick={() => onNavigate('consulti')}
              className="cta-label px-6 py-3 min-h-[44px] rounded-lg bg-[#D4AF37] hover:bg-[#E6C65C] text-[#12100E] text-sm font-semibold inline-flex items-center justify-center gap-2 shrink-0 transition-all duration-150 hover:shadow-[0_0_20px_rgba(212,175,55,0.3)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E6C65C]"
            >
              Scegli il Consulto
              <ArrowRight className="w-4 h-4 shrink-0" />
            </button>

            <button
              type="button"
              onClick={() => onNavigate('chat')}
              className="cta-label px-6 py-3 min-h-[44px] rounded-lg bg-[#D4AF37]/5 border border-[#D4AF37]/30 hover:bg-[#D4AF37]/12 hover:border-[#D4AF37] text-[#F4F1EA] text-sm font-medium inline-flex items-center justify-center gap-2 shrink-0 transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]"
            >
              <MessageCircle className="w-4 h-4 text-[#D4AF37] shrink-0" />
              Apri Dialogo Tarot
            </button>
          </div>
        </div>
      </section>

      {/* Atmospheric Showcase — below the opening brand composition */}
      <section aria-labelledby="atmosfera-metodo-heading" className="space-y-4">
        <h2
          id="atmosfera-metodo-heading"
          className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#D4AF37]"
        >
          Atmosfera e Metodo
        </h2>
        <figure className="rounded-2xl overflow-hidden border border-[#D4AF37]/20 glass-tier-1">
          <div className="aspect-[16/9] w-full overflow-hidden">
            <video
              ref={atmosferaVideoRef}
              src={homePageVideo}
              className="h-full w-full object-cover object-center"
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              aria-label="Atmosfera e Metodo"
            />
          </div>
        </figure>
      </section>

      {/* Arcano del Giorno — after opening composition (not in the hero) */}
      <section aria-labelledby="arcano-giorno-heading" className="flex justify-center">
        <button
          type="button"
          onClick={() => onNavigate('chat')}
          className="group glass-tier-1 rounded-2xl p-6 w-full max-w-[300px] text-left transition-all duration-200 hover:border-[#D4AF37]/40 hover:shadow-[0_0_28px_rgba(212,175,55,0.16)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]"
        >
          <div className="mb-4 flex items-center justify-between text-xs text-[#A39B93]">
            <span
              id="arcano-giorno-heading"
              className="font-semibold uppercase tracking-[0.08em] text-[#D4AF37]"
            >
              Arcano del Giorno
            </span>
            <span className="font-mono tabular-nums">IX</span>
          </div>
          <div className="mx-auto my-2 w-40 overflow-hidden rounded-xl transition-transform duration-300 group-hover:-translate-y-1">
            <MajorArcanaArtwork
              number={9}
              numeral="IX"
              name="L'Eremita"
              className="h-auto w-full"
            />
          </div>
          <div className="mt-4 flex items-center justify-between border-t border-[#D4AF37]/15 pt-3">
            <span className="font-display text-sm text-[#F4F1EA]">L&apos;Eremita</span>
            <span className="inline-flex items-center gap-1 text-xs text-[#D4AF37]">
              Contempla <ArrowRight className="h-3.5 w-3.5" />
            </span>
          </div>
        </button>
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
          <div className="pt-2 border-t border-[#D4AF37]/15 flex flex-wrap items-center justify-between gap-3">
            <p className="text-xs md:text-sm text-[#A39B93]">
              Disciplinato ai sensi della Legge 4/2013 · Operatore Olistico Maria Teresa Rogani.
            </p>
            <button
              type="button"
              onClick={() => onNavigate('chi-sono')}
              className="text-xs md:text-sm font-medium text-[#D4AF37] hover:text-[#E6C65C] inline-flex items-center gap-1.5 whitespace-nowrap"
            >
              Chi sono e percorso formativo
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>

      {/* Consulti Section — Matches ConsultiScreen cards & 4:3 images */}
      <section
        id={HOME_CONSULTI_SECTION_ID}
        aria-labelledby="pathways-heading"
        className="scroll-mt-28 space-y-8 md:scroll-mt-32"
      >
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-2 max-w-2xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#D4AF37]">
              Sessioni Individuali · 20 / 45 / 60 / 90 Minuti
            </p>
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
            Esplora area Consulti <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 items-stretch">
          {consultationTariffs.map((tariff) => {
            const tariffImage = TARIFF_SECTION_IMAGES[tariff.id];
            return (
              <article
                key={tariff.id}
                className={`rounded-2xl p-6 md:p-7 flex flex-col justify-between gap-6 transition-all duration-200 ${
                  tariff.recommended
                    ? 'glass-tier-2 border-[#D4AF37]/45 shadow-[0_0_28px_rgba(212,175,55,0.12)]'
                    : 'glass-tier-1 hover:border-[#D4AF37]/35'
                }`}
              >
                <div className="space-y-5">
                  <div className="rounded-xl overflow-hidden border border-[#D4AF37]/20 bg-[#12100E]">
                    <ResilientImage
                      src={tariffImage.src}
                      alt={tariffImage.alt}
                      className="w-full aspect-[4/3] object-cover"
                      fallbackLabel={tariff.title}
                    />
                  </div>

                  <div className="flex items-center justify-between gap-2 text-xs">
                    <span className="font-semibold uppercase tracking-[0.08em] text-[#D4AF37]">
                      {tariff.durationMinutes} Minuti
                    </span>
                    <span className="text-[#A39B93]">
                      {tariff.recommended ? 'Percorso Consigliato' : 'Individuale'}
                    </span>
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-display text-xl md:text-2xl text-[#F4F1EA]">
                      {showCmsKeys ? (
                        <CopyText
                          entry={{ cmsKey: tariff.cmsKeyTitle, liveText: tariff.title }}
                          showKeys={true}
                        />
                      ) : (
                        tariff.title
                      )}
                    </h3>
                    <p className="text-xs font-medium text-[#D4AF37]/90">
                      {showCmsKeys ? (
                        <CopyText
                          entry={{ cmsKey: tariff.cmsKeyFocus, liveText: tariff.focusLabel }}
                          showKeys={true}
                        />
                      ) : (
                        tariff.focusLabel
                      )}
                    </p>
                  </div>

                  <div className="py-3 border-y border-[#D4AF37]/15 flex items-baseline justify-between">
                    <span className="font-display text-3xl text-[#F4F1EA] tabular-nums">
                      € {tariff.priceEur}
                    </span>
                    <span className="text-xs text-[#A39B93] tabular-nums">
                      {tariff.durationMinutes} min · IVA inclusa
                    </span>
                  </div>

                  <p className="text-sm leading-relaxed text-[#A39B93]">
                    {showCmsKeys ? (
                      <CopyText
                        entry={{ cmsKey: tariff.cmsKeyDesc, liveText: tariff.description }}
                        showKeys={true}
                      />
                    ) : (
                      tariff.description
                    )}
                  </p>

                  <ul className="space-y-2.5 pt-1">
                    {tariff.includes.map((item) => (
                      <li key={item} className="flex items-start gap-2.5 text-xs md:text-sm text-[#E8e1dd]">
                        <Check className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" aria-hidden="true" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => onSelectTariffAndBook(tariff.id)}
                    className={`cta-label w-full min-h-[46px] px-5 py-3 rounded-lg text-sm font-semibold inline-flex items-center justify-center gap-2 transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E6C65C] ${
                      tariff.recommended
                        ? 'bg-[#D4AF37] hover:bg-[#E6C65C] text-[#12100E] hover:shadow-[0_0_16px_rgba(212,175,55,0.3)]'
                        : 'bg-[#D4AF37]/10 border border-[#D4AF37]/35 hover:bg-[#D4AF37] hover:text-[#12100E] text-[#F4F1EA]'
                    }`}
                  >
                    Scegli e Prenota ({tariff.durationMinutes}m)
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* Paid Educational Courses Showcase — 1) Arcani Maggiori, 2) Arcani Minori, 3) Metodi di Stesura */}
      <section
        id={HOME_DIDATTICA_SECTION_ID}
        aria-labelledby="courses-preview-heading"
        className="scroll-mt-28 space-y-8 md:scroll-mt-32"
      >
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
          {educationalCourses.map((course, idx) => {
            const courseImage = COURSE_SECTION_IMAGES[course.id];
            return (
              <article
                key={course.id}
                className={`rounded-2xl p-5 md:p-6 flex flex-col justify-between gap-6 transition-colors duration-150 ${
                  course.recommended
                    ? 'glass-tier-2 border-[#D4AF37]/40 hover:border-[#D4AF37]/60'
                    : 'glass-tier-1 hover:border-[#D4AF37]/40'
                }`}
              >
                <div className="space-y-4">
                  <div className="rounded-xl overflow-hidden border border-[#D4AF37]/20 bg-[#12100E]">
                    <ResilientImage
                      src={courseImage.src}
                      alt={courseImage.alt}
                      className="w-full aspect-[4/3] object-cover"
                      fallbackLabel={course.title}
                    />
                  </div>

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

              <div className="pt-4 border-t border-[#D4AF37]/15 flex items-center justify-end">
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
            );
          })}
        </div>
      </section>

      {/* Testimonianze — horizontal auto-rotating carousel */}
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

        <HomeTestimonialsCarousel showCmsKeys={showCmsKeys} />
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

      {/* News loop — prima del footer / dock contatti */}
      <HomeArticlesLoop onNavigate={onNavigate} />

      {/* Contact Dock */}
      <section aria-labelledby="dock-heading" className="glass-tier-1 rounded-2xl p-6 md:p-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          <div className="md:col-span-5 flex items-center gap-4">
            <TarotEmblemLogo size={64} className="shrink-0" />
            <div>
              <h2 id="dock-heading" className="font-body font-semibold tracking-[-0.01em] text-lg text-[#F4F1EA]">
                <CopyText entry={siteContent.home.dockHeading} showKeys={showCmsKeys} />
              </h2>
              <p className="text-xs text-[#A39B93] mt-0.5">
                <CopyText entry={siteContent.brand.role} showKeys={showCmsKeys} />
              </p>
              <p className="text-xs text-[#A39B93] mt-2 inline-flex items-start gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#D4AF37] shrink-0 mt-0.5" />
                <span>{SITE_ADDRESS}</span>
              </p>
            </div>
          </div>

          <div className="md:col-span-7 flex flex-wrap items-center md:justify-end gap-3">
            <a
              href={whatsappHref(
                'Buongiorno Maria Teresa, vorrei richiedere un consulto.'
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="cta-label px-4 py-2.5 min-h-[44px] rounded-lg bg-[#D4AF37]/10 border border-[#D4AF37]/30 hover:border-[#D4AF37] text-xs md:text-sm font-medium text-[#F4F1EA] inline-flex items-center justify-center gap-2 shrink-0 transition-colors"
            >
              <MessageCircle className="w-4 h-4 text-[#D4AF37] shrink-0" />
              WhatsApp
            </a>
            <a
              href={`tel:${SITE_PHONE_TEL}`}
              className="cta-label px-4 py-2.5 min-h-[44px] rounded-lg bg-[#12100E]/80 border border-[#D4AF37]/20 hover:border-[#D4AF37]/50 text-xs md:text-sm font-medium text-[#F4F1EA] inline-flex items-center justify-center gap-2 shrink-0 transition-colors"
            >
              <Phone className="w-4 h-4 text-[#D4AF37] shrink-0" />
              {SITE_PHONE_DISPLAY}
            </a>
            <a
              href={`mailto:${SITE_EMAIL}`}
              className="cta-label px-4 py-2.5 min-h-[44px] rounded-lg bg-[#12100E]/80 border border-[#D4AF37]/20 hover:border-[#D4AF37]/50 text-xs md:text-sm font-medium text-[#F4F1EA] inline-flex items-center justify-center gap-2 shrink-0 transition-colors"
            >
              <Mail className="w-4 h-4 text-[#D4AF37] shrink-0" />
              {SITE_EMAIL}
            </a>
            <button
              type="button"
              onClick={onOpenPrivacy}
              className="cta-label px-4 py-2.5 min-h-[44px] rounded-lg bg-[#12100E]/80 border border-[#A39B93]/25 hover:border-[#D4AF37] text-xs md:text-sm font-medium text-[#A39B93] hover:text-[#F4F1EA] inline-flex items-center justify-center gap-2 shrink-0 transition-colors"
            >
              <ShieldCheck className="w-4 h-4 text-[#D4AF37] shrink-0" />
              Privacy &amp; Cookie
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
