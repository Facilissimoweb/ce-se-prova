import type { ConsultationTariff, CourseId } from '../types/handoff';
import consultoEssenzialeImg from '../assets/images/consulto_essenziale_tarot_1794660969807.jpg';
import consultoEvolutivoImg from '../assets/images/consulto_evolutivo_tarot_1794660970759.jpg';
import consultoCicloImg from '../assets/images/consulto_ciclo_annuale_1794660971389.jpg';
import corsoArcaniMaggioriImg from '../assets/images/corso_arcani_maggiori_1794660972624.jpg';
import corsoArcaniMinoriImg from '../assets/images/corso_arcani_minori_1794660972863.jpg';
import corsoMetodiStesuraImg from '../assets/images/corso_metodi_stesura_1794660973007.jpg';

export interface SectionImageAsset {
  src: string;
  alt: string;
  caption: string;
}

export const TARIFF_SECTION_IMAGES: Record<ConsultationTariff['id'], SectionImageAsset> = {
  '20m': {
    src: consultoEssenzialeImg,
    alt: 'Singola carta dei Tarocchi bordata in oro su lino scuro per il Consulto Breve da venti minuti',
    caption: 'Consulto Breve · Domanda rapida e primo orientamento',
  },
  '45m': {
    src: consultoEssenzialeImg,
    alt: 'Singola carta dei Tarocchi bordata in oro su lino scuro accanto a un candeliere in ottone battuto per il Consulto Essenziale',
    caption: 'Consulto Essenziale · Domanda singola e messa a fuoco',
  },
  '60m': {
    src: consultoEvolutivoImg,
    alt: 'Stesa a cinque carte su pietra scura con quaderno in pelle e penna stilografica in ottone per il Consulto Evolutivo Completo',
    caption: 'Consulto Evolutivo · Dinamiche e linee future',
  },
  '90m': {
    src: consultoCicloImg,
    alt: 'Dodici carte dei Tarocchi disposte in ruota simmetrica attorno a un astrolabio in ottone e una candela accesa per la Sessione Integrata e Ciclo',
    caption: 'Sessione Integrata · Ruota delle dodici case e ciclo annuale',
  },
};

export const COURSE_SECTION_IMAGES: Record<CourseId, SectionImageAsset> = {
  'arcani-maggiori': {
    src: corsoArcaniMaggioriImg,
    alt: 'Tavole dorate degli Arcani Maggiori a ventaglio accanto a un taccuino di studi iconografici a china e foglia oro',
    caption: 'Pilastro 01 · I 22 Arcani Maggiori e l’iconografia archetipica',
  },
  'arcani-minori': {
    src: corsoArcaniMinoriImg,
    alt: 'I quattro oggetti simbolici dei Semi (bastone d’ulivo, calice in ottone, daga e moneta aurea) attorno a carte nere e oro su pietra lavica',
    caption: 'Pilastro 02 · I Quattro Semi, Numerologia e Figure di Corte',
  },
  'metodi-stesura': {
    src: corsoMetodiStesuraImg,
    alt: 'Carta cotone con diagrammi geometrici in oro, compasso proporzionale in ottone e carte allineate per i Metodi di Stesura',
    caption: 'Pilastro 03 · Geometrie di Stesa e Sintesi del Consulto',
  },
};
