import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import {
  consultationTariffs,
  consultiFaqs,
  educationalCourses,
  holisticFaqs,
} from '../data/siteContent';
import { joinTariffDescription } from '../data/consultationTariffs';
import { isCoursePubliclyPresented } from '../lib/coursePresentation';
import type {
  ConsultationTariff,
  EducationalCourse,
  HolisticFaqItem,
} from '../types/handoff';
import { DEFAULT_LANG, getSiteLanguage } from './index';

export { isCoursePubliclyPresented } from '../lib/coursePresentation';

export function useLocalizedTariffs(): ConsultationTariff[] {
  const { t, i18n } = useTranslation('catalog');
  return useMemo(() => {
    if (getSiteLanguage() === DEFAULT_LANG) return consultationTariffs;
    return consultationTariffs.map((tariff) => {
      const descriptionParagraphs = tariff.descriptionParagraphs.map(
        (paragraph, index) =>
          t(`tariff.${tariff.id}.description.${index}`, {
            defaultValue: paragraph,
          })
      );
      return {
        ...tariff,
        title: t(`tariff.${tariff.id}.title`, { defaultValue: tariff.title }),
        descriptionParagraphs,
        description: joinTariffDescription(descriptionParagraphs),
        focusLabel: t(`tariff.${tariff.id}.focus`, {
          defaultValue: tariff.focusLabel,
        }),
        includes: tariff.includes.map((item, index) =>
          t(`tariff.${tariff.id}.includes.${index}`, { defaultValue: item })
        ),
      };
    });
  }, [t, i18n.language]);
}

export function useLocalizedHolisticFaqs(): HolisticFaqItem[] {
  const { t, i18n } = useTranslation('catalog');
  return useMemo(() => {
    if (getSiteLanguage() === DEFAULT_LANG) return holisticFaqs;
    return holisticFaqs.map((faq) => ({
      ...faq,
      category: t(`faq.${faq.id}.category`, { defaultValue: faq.category }),
      question: t(`faq.${faq.id}.question`, { defaultValue: faq.question }),
      answer: t(`faq.${faq.id}.answer`, { defaultValue: faq.answer }),
    }));
  }, [t, i18n.language]);
}

export function useLocalizedConsultiFaqs(): HolisticFaqItem[] {
  const { t, i18n } = useTranslation('catalog');
  return useMemo(() => {
    if (getSiteLanguage() === DEFAULT_LANG) return consultiFaqs;
    return consultiFaqs.map((faq) => ({
      ...faq,
      category: t(`cfaq.${faq.id}.category`, { defaultValue: faq.category }),
      question: t(`cfaq.${faq.id}.question`, { defaultValue: faq.question }),
      answer: t(`cfaq.${faq.id}.answer`, { defaultValue: faq.answer }),
    }));
  }, [t, i18n.language]);
}

/**
 * Corsi catalog for the public UI (Home + Corsi).
 * ENN-154 — Arcani Maggiori always keeps Italian live copy as the DOM source
 * so Google Translate can localize it. Pre-baked EN catalog overlays cannot be
 * “re-translated” by GT and left Maggiori stuck in English.
 * ENN-174 — filters out non-public courses (Minori / Metodi frozen this week).
 */
export function useLocalizedCourses(): EducationalCourse[] {
  const { t, i18n } = useTranslation('catalog');
  return useMemo(() => {
    const localized =
      getSiteLanguage() === DEFAULT_LANG
        ? educationalCourses
        : educationalCourses.map((course) => {
            // Maggiori: IT-only source of truth (GT / PDF lang handle visitor language).
            if (course.id === 'arcani-maggiori') return course;
            return {
              ...course,
              orderLabel: t(`course.${course.id}.orderLabel`, {
                defaultValue: course.orderLabel,
              }),
              title: t(`course.${course.id}.title`, {
                defaultValue: course.title,
              }),
              subtitle: t(`course.${course.id}.subtitle`, {
                defaultValue: course.subtitle,
              }),
              description: t(`course.${course.id}.description`, {
                defaultValue: course.description,
              }),
              levelLabel: t(`course.${course.id}.levelLabel`, {
                defaultValue: course.levelLabel,
              }),
              formatLabel: t(`course.${course.id}.formatLabel`, {
                defaultValue: course.formatLabel,
              }),
              totalHours: t(`course.${course.id}.totalHours`, {
                defaultValue: course.totalHours,
              }),
              includes: course.includes.map((item, index) =>
                t(`course.${course.id}.includes.${index}`, {
                  defaultValue: item,
                })
              ),
              modules: course.modules.map((mod) => ({
                ...mod,
                title: t(`course.${course.id}.module.${mod.number}.title`, {
                  defaultValue: mod.title,
                }),
                duration: t(
                  `course.${course.id}.module.${mod.number}.duration`,
                  { defaultValue: mod.duration }
                ),
                summary: t(`course.${course.id}.module.${mod.number}.summary`, {
                  defaultValue: mod.summary,
                }),
              })),
            };
          });
    return localized.filter(isCoursePubliclyPresented);
  }, [t, i18n.language]);
}
