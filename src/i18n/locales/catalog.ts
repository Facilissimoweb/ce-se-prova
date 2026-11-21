import type { SiteLang } from '../types';

type Dict = Record<string, string>;

/** Tariffs, courses, FAQs — keyed for stable lookup by id + field. */
const en: Dict = {
  // Tariffs
  'tariff.20m.title': 'Short Reading',
  'tariff.20m.description':
    'One precise question, a focused reading, immediate clarity. For a punctual doubt — a relationship, an expectation, or a nearby choice — when you want lucid insight before acting.',
  'tariff.20m.focus': 'WhatsApp voice call only',
  'tariff.20m.includes.0':
    'We focus on a single theme through the 78 Arcana, going to the essence with listening and precision',
  'tariff.20m.includes.1':
    'Afterwards: a clear view of the situation and 2–3 practical indications via WhatsApp or email',
  'tariff.20m.includes.2':
    'Best if you want light on one question, quickly and accessibly (not suited to multiple themes together)',
  'tariff.45m.title': 'Essential Reading',
  'tariff.45m.description':
    'To bring order when you have two or three open questions and want to steer your energy well. When a quick answer is not enough because more than one area is involved — for example love and work, or an important decision to take with balance.',
  'tariff.45m.focus': 'Voice or Studio Macerata (Via Crispi 37)',
  'tariff.45m.includes.0':
    'We look at linked situations, focusing dynamics, obstacles and concrete possibilities in the present',
  'tariff.45m.includes.1':
    'Afterwards: a written summary of the main points that emerged, to reread calmly',
  'tariff.45m.includes.2':
    'Best if you seek concrete clarity on several aspects of daily life in a gathered, balanced time',
  'tariff.60m.title': 'Full Evolutive Reading',
  'tariff.60m.description':
    'To understand the roots of what you live and find a conscious direction again. When a pattern repeats — in relationships, work, or personal choices — and you want to look honestly at both the outer context and your room for action.',
  'tariff.60m.focus': 'Most chosen · Voice or Studio Macerata',
  'tariff.60m.includes.0':
    'A full hour, without rush, to deepen root causes, recognise blind spots and find the most authentic paths ahead',
  'tariff.60m.includes.1':
    'Afterwards: a synthesis of the reading plus practical reflection traces for the following weeks',
  'tariff.60m.includes.2':
    'Best if you want a deep, respectful reading that helps you choose with awareness and autonomy',
  'tariff.90m.title': 'Integrated Session',
  'tariff.90m.description':
    'An hour and a half to gather all the threads and look with breadth at the path ahead. Ideal when you are closing a demanding phase, starting a new chapter, or need to explore relationships, work, personal resources and overall direction without fragmenting the work.',
  'tariff.90m.focus': 'Voice or Studio Macerata (Via Crispi 37)',
  'tariff.90m.includes.0':
    'A wide, in-depth meeting that embraces several life areas and sets priorities for the coming months',
  'tariff.90m.includes.1':
    'Afterwards: written feedback within 48 hours on a private channel, to lock in key steps with a calm mind',
  'tariff.90m.includes.2':
    'Best if you want complete work in one dedicated space, with the best balance of time, depth and investment',
  // Home FAQs
  'faq.faq-1.category': 'Holistic Approach',
  'faq.faq-1.question':
    'How do Tarot Italia cards read the present and foresee the future?',
  'faq.faq-1.answer':
    'In the Tarot Italia method the Arcana illuminate current dynamics and trace predictive lines of future developments. Predictive reading identifies scenarios, opportunities and upcoming junctions while always respecting your free will, so you can make lucid, conscious choices.',
  'faq.faq-2.category': 'Professional Role',
  'faq.faq-2.question':
    'What is the scope of a Holistic Practitioner under Italian Law 4/2013?',
  'faq.faq-2.answer':
    'Maria Teresa Rogani works as a Holistic Practitioner under Law 4/2013 on non-organised professions. Counselling offers empathic listening, symbolic and predictive reading and stimuli for inner awareness, without ever replacing doctors, psychotherapists, psychiatrists or legal advisers.',
  'faq.faq-3.category': 'Code of Ethics',
  'faq.faq-3.question': 'Which requests are excluded for professional ethics?',
  'faq.faq-3.answer':
    'No medical diagnoses or indications, no prognoses on illness or death, and no binding legal or financial advice. Magical rituals, bindings or promises of guaranteed results are categorically excluded.',
  'faq.faq-4.category': 'Session Flow',
  'faq.faq-4.question':
    'How should I prepare for a 20, 45, 60 or 90-minute reading?',
  'faq.faq-4.answer':
    'Bring one or more clear questions about your present path or future developments — professional, creative or relational. Online readings happen exclusively as a private voice call: after booking you will receive connection details or the Via Crispi 37 address in Macerata for an in-person meeting.',
  'faq.faq-5.category': 'Confidentiality',
  'faq.faq-5.question': 'Do themes shared in the meeting stay confidential?',
  'faq.faq-5.answer':
    'Yes. Every dialogue respects maximum professional confidentiality: sessions are neither recorded nor shared with third parties, and booking data are processed solely to manage the appointment.',
  // Consulti FAQs
  'cfaq.cfaq-1.category': 'Hybrid Method',
  'cfaq.cfaq-1.question':
    'What is the difference between traditional cartomancy and my method?',
  'cfaq.cfaq-1.answer':
    'Traditional cartomancy often seeks watertight mechanical answers (yes, no, when). My approach is a hybrid that integrates pure cartomancy and evolutive tarotology: I use the 78 Arcana (Major and Minor) not to nail you to a fixed future, but to turn chaos into cosmos, giving the spread a more reflective and deep fold than a static answer.',
  'cfaq.cfaq-2.category': 'Questions & Affection',
  'cfaq.cfaq-2.question':
    'Does a simple or affection-related question like “Does he think of me?” make sense?',
  'cfaq.cfaq-2.answer':
    'Absolutely yes. Often we start from an immediate or impulsive cartomancy-style question to dig deeper. From an affection question I begin tracing dynamics, motivations and anything-but-banal keys, returning a reflective perspective and the real complexity of the situation.',
  'cfaq.cfaq-3.category': 'The 78 Arcana',
  'cfaq.cfaq-3.question': 'What is the role of the 78 Arcana during a session?',
  'cfaq.cfaq-3.answer':
    'The 78 Arcana — Major and Minor — act as icons, archetypes and mirrors of your inner life. They are not entities that decide for you, but messengers and narrators that accompany you in exploring your most authentic story, in a safe, judgement-free space.',
  'cfaq.cfaq-4.category': 'Outcome',
  'cfaq.cfaq-4.question': 'What should I expect at the end of a consultation?',
  'cfaq.cfaq-4.answer':
    'To leave with a renewed vision. More than prefabricated answers, you receive traces, reading keys and practical awareness to reorder your experience and take the reins of your path with greater clarity.',
  'cfaq.cfaq-5.category': 'Flow & Welcome',
  'cfaq.cfaq-5.question':
    'How does the reading unfold, and do I need prior knowledge?',
  'cfaq.cfaq-5.answer':
    'No prior knowledge of symbolism or the language of the Arcana is required. I integrate the living reading of cartomancy with a path of deep reflection: I meet you exactly where you are, guiding you step by step through the images to decipher your story. Online readings happen exclusively as a voice call.',
  // Courses — marketing surfaces
  'course.arcani-maggiori.orderLabel': '01 · First Pillar',
  'course.arcani-maggiori.title': 'Major Arcana',
  'course.arcani-maggiori.subtitle':
    'The Archetypal Journey from 0 to XXI · Present and Prediction',
  'course.arcani-maggiori.description':
    'Complete first step on the 22 Triumphs: formative handouts, Waite-Smith visual sheets, multiple visions (symbolism, deep sense, light/shadow, present and prediction) and learning questions with the Seal flashcard.',
  'course.arcani-maggiori.levelLabel': 'Beginner & Intermediate',
  'course.arcani-maggiori.formatLabel':
    'Interactive handouts + Visual sheets + Seal · PDF coming soon',
  'course.arcani-maggiori.totalHours': 'handouts + Seal',
  'course.arcani-maggiori.includes.0':
    '4 modules with formative handouts on the 22 Triumphs (0–XXI) and verification workshop',
  'course.arcani-maggiori.includes.1':
    'Waite-Smith visual sheets and Seal flashcards with learning questions',
  'course.arcani-maggiori.includes.2':
    'Multiple visions for each blade: symbolism, deep sense, light/shadow, present and prediction',
  'course.arcani-maggiori.includes.3':
    'Illustrated PDF manual with archetypal sheets and keywords',
  'course.arcani-maggiori.module.01.title':
    'Architecture and First Septenary (0 – VII)',
  'course.arcani-maggiori.module.01.duration': '≈ 40 min reading',
  'course.arcani-maggiori.module.01.summary':
    'Map of the Three Septenaries, from the Fool to the Chariot: bullets, visual sheets and Seal of the First Septenary.',
  'course.arcani-maggiori.module.02.title':
    'Second Septenary: Ethical Trial (VIII – XIV)',
  'course.arcani-maggiori.module.02.duration': '≈ 40 min reading',
  'course.arcani-maggiori.module.02.summary':
    'Justice, Hermit, Wheel, Strength, Hanged One, Death and Temperance: interiorisation and cycles of trial.',
  'course.arcani-maggiori.module.03.title':
    'Third Septenary: Shadow and Completion (XV – XXI)',
  'course.arcani-maggiori.module.03.duration': '≈ 40 min reading',
  'course.arcani-maggiori.module.03.summary':
    'From Devil and Tower to Stars, Moon, Sun, Judgement and World: crisis, vision and realisation.',
  'course.arcani-maggiori.module.04.title':
    'Final Practical Workshop and Verification',
  'course.arcani-maggiori.module.04.duration': '≈ 25 min reading',
  'course.arcani-maggiori.module.04.summary':
    'Self-assessment of cycles, integrative spreads and review with the learning Seal.',
  'course.arcani-minori.orderLabel': '02 · Second Pillar',
  'course.arcani-minori.title': 'Minor Arcana',
  'course.arcani-minori.subtitle':
    'The Four Suits, Numerology 1–10 and Court Cards',
  'course.arcani-minori.description':
    'From intuition to everyday precision: master the 56 Minor Arcana to read timing, people involved, work, relational and material dynamics.',
  'course.arcani-minori.levelLabel': 'Intermediate',
  'course.arcani-minori.formatLabel':
    'On-demand + Suit atlas PDF + 1h live Q&A',
  'course.arcani-minori.totalHours': '9h 45m video',
  'course.arcani-minori.includes.0':
    '14 video lessons on the 4 Suits (Wands, Cups, Swords, Pentacles)',
  'course.arcani-minori.includes.1':
    'Comparative numerology map from Ace to Ten per suit',
  'course.arcani-minori.includes.2':
    'Psychological and predictive profiles of the 16 Court figures',
  'course.arcani-minori.includes.3':
    'Guided exercises combining Major + Minor Arcana',
  'course.arcani-minori.module.01.title':
    'The Four Elements in the Tarot: Fire, Water, Air and Earth',
  'course.arcani-minori.module.01.duration': '1h 50m',
  'course.arcani-minori.module.01.summary':
    'How to recognise the elemental dominant of a spread to see where the querent’s energy flows or stalls.',
  'course.arcani-minori.module.02.title': 'The Numerological Cycle from Ace to Ten',
  'course.arcani-minori.module.02.duration': '3h 15m',
  'course.arcani-minori.module.02.summary':
    'Number progression: beginnings (Aces), choices (Twos), expansion (Threes), stability and crisis (Fours–Fives) through to completion (Tens).',
  'course.arcani-minori.module.03.title':
    'The 16 Court Figures: Pages, Knights, Queens and Kings',
  'course.arcani-minori.module.03.duration': '2h 40m',
  'course.arcani-minori.module.03.summary':
    'Identify real people, moods, incoming messages and professional roles without confusing profiles.',
  'course.arcani-minori.module.04.title':
    'Practical Integration: Timing and Predictive Detail',
  'course.arcani-minori.module.04.duration': '2h 00m',
  'course.arcani-minori.module.04.summary':
    'Use Minor Arcana to refine modalities, seasonal timing and concrete actions around a Major Arcana.',
  'course.metodi-stesura.orderLabel': '03 · Third Pillar',
  'course.metodi-stesura.title': 'Spread Methods',
  'course.metodi-stesura.subtitle':
    'Reading Architectures, Synthesis and Ethics of the Consultation',
  'course.metodi-stesura.description':
    'From question to coherent narrative: learn to choose the most suitable spread geometry, connect the cards and conduct a professional reading.',
  'course.metodi-stesura.levelLabel': 'Advanced & Practice',
  'course.metodi-stesura.formatLabel':
    'On-demand + Vector diagrams + Live supervision',
  'course.metodi-stesura.totalHours': '7h 30m video',
  'course.metodi-stesura.includes.0':
    '10 operative video lessons on classic and predictive spread architectures',
  'course.metodi-stesura.includes.1':
    'Workbook with 12 downloadable spread schemas and conduction checklist',
  'course.metodi-stesura.includes.2':
    'Real case studies commented step by step',
  'course.metodi-stesura.includes.3':
    'Practical supervision on one of your real spreads with Maria Teresa Rogani',
  'course.metodi-stesura.module.01.title':
    'The Art of the Question and the Ethical Pact',
  'course.metodi-stesura.module.01.duration': '1h 20m',
  'course.metodi-stesura.module.01.summary':
    'How to reframe confused questions into open, clear and ethically grounded ones before touching the deck.',
  'course.metodi-stesura.module.02.title':
    'Essential Spreads (3 and 5 Cards) and Temporal Dynamics',
  'course.metodi-stesura.module.02.duration': '2h 00m',
  'course.metodi-stesura.module.02.summary':
    'Past, Present, Near Future and development line: build incisive, essential readings without dispersion.',
  'course.metodi-stesura.module.03.title':
    'The Celtic Cross and the Two-Path Decision Spread',
  'course.metodi-stesura.module.03.duration': '2h 20m',
  'course.metodi-stesura.module.03.summary':
    'Master the 10 positions of the Celtic Cross and compare two alternative future scenarios with rigour.',
  'course.metodi-stesura.module.04.title':
    'The Wheel of 12 Houses and Final Synthesis',
  'course.metodi-stesura.module.04.duration': '1h 50m',
  'course.metodi-stesura.module.04.summary':
    'Map a full yearly cycle and return a lucid, respectful oral and written synthesis to the querent.',
};

/** Compact ES/FR/DE — full commerce strings; modules summaries abbreviated where needed. */
const es: Dict = {
  'tariff.20m.title': 'Consulta Breve',
  'tariff.20m.description':
    'Una pregunta precisa, una lectura enfocada, claridad inmediata. Para una duda puntual — una relación, una espera o una elección cercana — cuando deseas comprender con lucidez qué se está moviendo antes de actuar.',
  'tariff.20m.focus': 'Solo llamada de voz por WhatsApp',
  'tariff.20m.includes.0':
    'Nos concentramos en un único tema a través de los 78 Arcanos, yendo a la esencia con escucha y precisión',
  'tariff.20m.includes.1':
    'Después: una visión clara de la situación y 2–3 indicaciones prácticas por WhatsApp o email',
  'tariff.20m.includes.2':
    'Indicada si deseas aclarar una sola cuestión de forma rápida y accesible (no apta para varios temas a la vez)',
  'tariff.45m.title': 'Consulta Esencial',
  'tariff.45m.description':
    'Para poner orden cuando tienes dos o tres cuestiones abiertas y quieres orientar bien tu energía. Cuando una respuesta rápida no basta porque hay más de un ámbito involucrado.',
  'tariff.45m.focus': 'Voz o Estudio Macerata (Via Crispi 37)',
  'tariff.45m.includes.0':
    'Observamos las situaciones conectadas, enfocando dinámicas, obstáculos y posibilidades concretas del presente',
  'tariff.45m.includes.1':
    'Después: una síntesis escrita de los puntos principales emergentes, para releerlos con calma',
  'tariff.45m.includes.2':
    'Indicada si buscas claridad concreta sobre varios aspectos de tu cotidianidad en un tiempo recogido y equilibrado',
  'tariff.60m.title': 'Consulta Evolutiva Completa',
  'tariff.60m.description':
    'Para comprender las raíces de lo que vives y recuperar una dirección consciente. Cuando sientes que una dinámica se repite y deseas mirar con honestidad el contexto externo y tu margen de acción.',
  'tariff.60m.focus': 'La más elegida · Voz o Estudio Macerata',
  'tariff.60m.includes.0':
    'Una hora entera, sin prisas, para profundizar causas profundas, reconocer puntos ciegos e identificar caminos auténticos',
  'tariff.60m.includes.1':
    'Después: una síntesis de la lectura junto a trazas de reflexión prácticas para las semanas siguientes',
  'tariff.60m.includes.2':
    'Indicada si deseas una lectura profunda y respetuosa que te acompañe a elegir con conciencia y autonomía',
  'tariff.90m.title': 'Sesión Integrada',
  'tariff.90m.description':
    'Una hora y media para reunir todos los hilos y mirar con amplitud el recorrido que te espera. Ideal al cerrar una fase exigente, empezar un nuevo capítulo o explorar varios ámbitos sin fragmentar el trabajo.',
  'tariff.90m.focus': 'Voz o Estudio Macerata (Via Crispi 37)',
  'tariff.90m.includes.0':
    'Un encuentro amplio y profundo que abarca varios ámbitos de vida y define las prioridades de los próximos meses',
  'tariff.90m.includes.1':
    'Después: respuesta escrita en 48 horas por un canal reservado, para fijar los pasos clave con mente serena',
  'tariff.90m.includes.2':
    'Indicada si deseas un trabajo completo en un único espacio dedicado, con el mejor equilibrio entre tiempo, profundidad e inversión',
  'faq.faq-1.category': 'Enfoque Holístico',
  'faq.faq-1.question':
    '¿Cómo leen los Tarots de Tarot Italia el presente y prevén el futuro?',
  'faq.faq-1.answer':
    'En el método de Tarot Italia los Arcanos iluminan las dinámicas actuales y trazan las líneas previsionales de los desarrollos futuros. La lectura previsional identifica escenarios, oportunidades y nudos por llegar respetando siempre tu libre albedrío, para que puedas elegir con lucidez y conciencia.',
  'faq.faq-2.category': 'Rol Profesional',
  'faq.faq-2.question':
    '¿Cuál es el ámbito de una Operadora Holística según la Ley 4/2013?',
  'faq.faq-2.answer':
    'Maria Teresa Rogani opera como Operadora Holística disciplinada según la Ley 4/2013 sobre profesiones no organizadas. La consulta ofrece escucha empática, lectura simbólica y previsional y estímulos de conciencia interior, sin sustituir nunca a médicos, psicoterapeutas, psiquiatras o asesores legales.',
  'faq.faq-3.category': 'Código Deontológico',
  'faq.faq-3.question': '¿Qué peticiones se excluyen por ética profesional?',
  'faq.faq-3.answer':
    'No se formulan diagnósticos ni indicaciones sanitarias, pronósticos sobre patologías o fallecimientos, ni asesorías legales o financieras vinculantes. Quedan excluidos rituales mágicos, ligaduras o promesas de resultados garantizados.',
  'faq.faq-4.category': 'Desarrollo de la Sesión',
  'faq.faq-4.question':
    '¿Cómo prepararse para una consulta de 20, 45, 60 o 90 minutos?',
  'faq.faq-4.answer':
    'Basta llevar una o más preguntas claras sobre tu recorrido presente o los desarrollos futuros — en ámbito profesional, creativo o relacional. Las consultas en línea ocurren exclusivamente en llamada de voz reservada: tras la reserva recibirás las indicaciones de conexión o la dirección de Via Crispi 37 en Macerata para el encuentro en persona.',
  'faq.faq-5.category': 'Confidencialidad',
  'faq.faq-5.question': '¿Los temas compartidos en el encuentro permanecen confidenciales?',
  'faq.faq-5.answer':
    'Sí. Cada diálogo se desarrolla con la máxima reserva profesional: las sesiones no se graban ni se comparten con terceros y los datos de reserva se tratan solo para gestionar la cita.',
  'cfaq.cfaq-1.category': 'Método Híbrido',
  'cfaq.cfaq-1.question':
    '¿Qué diferencia hay entre la cartomancia tradicional y mi método?',
  'cfaq.cfaq-1.answer':
    'La cartomancia tradicional busca a menudo respuestas mecánicas y estancas (sí, no, cuándo). Mi enfoque es un híbrido que integra cartomancia pura y tarología evolutiva: uso los 78 Arcanos (Mayores y Menores) no para fijarte a un futuro inmóvil, sino para transformar el caos en cosmos, dando a la tirada un pliegue más reflexivo y profundo.',
  'cfaq.cfaq-2.category': 'Preguntas y Afectos',
  'cfaq.cfaq-2.question':
    '¿Tiene sentido una pregunta sencilla o ligada a los afectos, como «¿Piensa en mí?»?',
  'cfaq.cfaq-2.answer':
    'Absolutamente sí. A menudo se parte de un interrogante inmediato o impulsivo típico de la cartomancia para profundizar. Desde una pregunta sobre afectos empiezo a trazar dinámicas, motivaciones y claves nada banales, devolviendo una perspectiva reflexiva y la complejidad real de la situación.',
  'cfaq.cfaq-3.category': 'Los 78 Arcanos',
  'cfaq.cfaq-3.question': '¿Cuál es el papel de los 78 Arcanos durante una sesión?',
  'cfaq.cfaq-3.answer':
    'Los 78 Arcanos — Mayores y Menores — actúan como iconos, arquetipos y espejos de tu interioridad. No son entidades que decidan por ti, sino mensajeros y narradores que te acompañan en la exploración de tu narrativa más auténtica, en un espacio seguro y sin juicio.',
  'cfaq.cfaq-4.category': 'Resultado de la Consulta',
  'cfaq.cfaq-4.question': '¿Qué debo esperar al final de una consulta?',
  'cfaq.cfaq-4.answer':
    'Salir con una visión renovada. Más que respuestas prefabricadas, recibirás huellas, claves de lectura y conciencias prácticas para ordenar tu vivencia y retomar las riendas de tu camino con mayor claridad.',
  'cfaq.cfaq-5.category': 'Desarrollo y Acogida',
  'cfaq.cfaq-5.question':
    '¿Cómo se desarrolla la lectura y necesito conocimiento previo?',
  'cfaq.cfaq-5.answer':
    'No se requiere conocimiento previo de la simbología o el lenguaje de los arcanos. Integro la lectura viva de la cartomancia con un recorrido de reflexión profunda: te recibo exactamente donde estás, guiándote paso a paso a través de las imágenes para descifrar tu historia. Las consultas en línea ocurren exclusivamente en llamada de voz.',
  'course.arcani-maggiori.orderLabel': '01 · Primer Pilar',
  'course.arcani-maggiori.title': 'Arcanos Mayores',
  'course.arcani-maggiori.subtitle':
    'El Viaje Arquetípico de 0 a XXI · Presente y Previsión',
  'course.arcani-maggiori.description':
    'Primer paso completo sobre los 22 Triunfos: apuntes formativos, fichas visuales Waite-Smith, visiones múltiples (simbología, sentido profundo, luz/sombra, presente y previsión) y preguntas de aprendizaje con el Sello flashcard.',
  'course.arcani-maggiori.levelLabel': 'Nivel Básico e Intermedio',
  'course.arcani-maggiori.formatLabel':
    'Apuntes interactivos + Fichas visuales + Sello · PDF en camino',
  'course.arcani-maggiori.totalHours': 'apuntes + Sello',
  'course.arcani-maggiori.includes.0':
    '4 módulos con apuntes formativos sobre los 22 Triunfos (0–XXI) y laboratorio de verificación',
  'course.arcani-maggiori.includes.1':
    'Fichas visuales Waite-Smith y Sello flashcard con preguntas de aprendizaje',
  'course.arcani-maggiori.includes.2':
    'Visiones múltiples por cada lámina: simbología, sentido profundo, luz/sombra, presente y previsión',
  'course.arcani-maggiori.includes.3':
    'Manual PDF ilustrado con fichas arquetípicas y palabras clave',
  'course.arcani-maggiori.module.01.title':
    'Arquitectura y Primer Septenario (0 – VII)',
  'course.arcani-maggiori.module.01.duration': '≈ 40 min lectura',
  'course.arcani-maggiori.module.01.summary':
    'Mapa de los Tres Septenarios, del Loco al Carro: bullets, fichas visuales y Sello del Primer Septenario.',
  'course.arcani-maggiori.module.02.title':
    'Segundo Septenario: Prueba Ética (VIII – XIV)',
  'course.arcani-maggiori.module.02.duration': '≈ 40 min lectura',
  'course.arcani-maggiori.module.02.summary':
    'Justicia, Ermitaño, Rueda, Fuerza, Colgado, Muerte y Templanza: interiorización y ciclos de prueba.',
  'course.arcani-maggiori.module.03.title':
    'Tercer Septenario: Sombra y Cumplimiento (XV – XXI)',
  'course.arcani-maggiori.module.03.duration': '≈ 40 min lectura',
  'course.arcani-maggiori.module.03.summary':
    'Del Diablo y la Torre a Estrellas, Luna, Sol, Juicio y Mundo: crisis, visión y realización.',
  'course.arcani-maggiori.module.04.title':
    'Laboratorio Práctico Final y Verificación',
  'course.arcani-maggiori.module.04.duration': '≈ 25 min lectura',
  'course.arcani-maggiori.module.04.summary':
    'Autoevaluación de ciclos, tiradas integradoras y repaso con el Sello de aprendizaje.',
  'course.arcani-minori.orderLabel': '02 · Segundo Pilar',
  'course.arcani-minori.title': 'Arcanos Menores',
  'course.arcani-minori.subtitle':
    'Los Cuatro Palos, Numerología 1–10 y Cartas de Corte',
  'course.arcani-minori.description':
    'De la intuición a la precisión cotidiana: domina los 56 Arcanos Menores para leer tiempos, personas involucradas, dinámicas laborales, sentimentales y materiales.',
  'course.arcani-minori.levelLabel': 'Nivel Intermedio',
  'course.arcani-minori.formatLabel':
    'On-demand + Atlas de palos PDF + 1h Q&A en vivo',
  'course.arcani-minori.totalHours': '9h 45m vídeo',
  'course.arcani-minori.includes.0':
    '14 videolecciones dedicadas a los 4 Palos (Bastos, Copas, Espadas, Oros)',
  'course.arcani-minori.includes.1':
    'Mapa comparativo de la Numerología del As al Diez por palo',
  'course.arcani-minori.includes.2':
    'Perfil psicológico y previsional de las 16 Figuras de Corte',
  'course.arcani-minori.includes.3':
    'Ejercicios guiados de lectura combinada Mayores + Menores',
  'course.arcani-minori.module.01.title':
    'Los Cuatro Elementos en el Tarot: Fuego, Agua, Aire y Tierra',
  'course.arcani-minori.module.01.duration': '1h 50m',
  'course.arcani-minori.module.01.summary':
    'Cómo reconocer la dominante elemental de una tirada para entender dónde fluye o se bloquea la energía del consultante.',
  'course.arcani-minori.module.02.title': 'El Ciclo Numerológico del As al Diez',
  'course.arcani-minori.module.02.duration': '3h 15m',
  'course.arcani-minori.module.02.summary':
    'Progresión de los números: inicios (Ases), elecciones (Dos), expansión (Tres), estabilidad y crisis (Cuatro-Cinco) hasta el cumplimiento (Diez).',
  'course.arcani-minori.module.03.title':
    'Las 16 Figuras de Corte: Sotas, Caballeros, Reinas y Reyes',
  'course.arcani-minori.module.03.duration': '2h 40m',
  'course.arcani-minori.module.03.summary':
    'Identificar personas reales, estados de ánimo, mensajes en camino y roles profesionales sin confundir perfiles.',
  'course.arcani-minori.module.04.title':
    'Integración Práctica: Temporalidades y Detalles Previsionales',
  'course.arcani-minori.module.04.duration': '2h 00m',
  'course.arcani-minori.module.04.summary':
    'Usar los Arcanos Menores para precisar modalidades, tiempos estacionales y acciones concretas en torno a un Arcano Mayor.',
  'course.metodi-stesura.orderLabel': '03 · Tercer Pilar',
  'course.metodi-stesura.title': 'Métodos de Tirada',
  'course.metodi-stesura.subtitle':
    'Arquitecturas de Lectura, Síntesis y Ética de la Consulta',
  'course.metodi-stesura.description':
    'De la pregunta a la narración coherente: aprende a elegir la geometría de tirada más adecuada, conectar las cartas y conducir una consulta profesional.',
  'course.metodi-stesura.levelLabel': 'Nivel Avanzado y Práctica',
  'course.metodi-stesura.formatLabel':
    'On-demand + Esquemas vectoriales + Supervisión en vivo',
  'course.metodi-stesura.totalHours': '7h 30m vídeo',
  'course.metodi-stesura.includes.0':
    '10 videolecciones operativas sobre arquitecturas de tirada clásicas y previsionales',
  'course.metodi-stesura.includes.1':
    'Cuaderno con 12 esquemas de tirada descargables y checklist de conducción',
  'course.metodi-stesura.includes.2':
    'Casos de estudio reales comentados paso a paso',
  'course.metodi-stesura.includes.3':
    'Supervisión práctica sobre una tirada tuya real con Maria Teresa Rogani',
  'course.metodi-stesura.module.01.title':
    'El Arte de la Pregunta y el Pacto Deontológico',
  'course.metodi-stesura.module.01.duration': '1h 20m',
  'course.metodi-stesura.module.01.summary':
    'Cómo reformular preguntas confusas en preguntas abiertas, claras y éticamente fundadas antes de tocar el mazo.',
  'course.metodi-stesura.module.02.title':
    'Tiradas Esenciales (3 y 5 Cartas) y Dinámica Temporal',
  'course.metodi-stesura.module.02.duration': '2h 00m',
  'course.metodi-stesura.module.02.summary':
    'Pasado, Presente, Futuro inmediato y línea de desarrollo: construir lecturas incisivas y esenciales sin dispersión.',
  'course.metodi-stesura.module.03.title':
    'La Cruz Celta y la Tirada de Dos Bifurcaciones Decisorias',
  'course.metodi-stesura.module.03.duration': '2h 20m',
  'course.metodi-stesura.module.03.summary':
    'Dominar las 10 posiciones de la Cruz Celta y comparar dos escenarios futuros alternativos con rigor.',
  'course.metodi-stesura.module.04.title':
    'La Rueda de las 12 Casas y la Síntesis Final',
  'course.metodi-stesura.module.04.duration': '1h 50m',
  'course.metodi-stesura.module.04.summary':
    'Mapear un ciclo anual completo y devolver al consultante una síntesis oral y escrita lúcida y respetuosa.',
};

const fr: Dict = {
  'tariff.20m.title': 'Consultation Brève',
  'tariff.20m.description':
    'Une question précise, une lecture ciblée, une clarté immédiate. Pour un doute ponctuel — relation, attente ou choix proche — quand vous voulez comprendre avec lucidité ce qui bouge avant d’agir.',
  'tariff.20m.focus': 'Appel vocal WhatsApp uniquement',
  'tariff.20m.includes.0':
    'Nous nous concentrons sur un seul thème à travers les 78 Arcanes, jusqu’à l’essence, avec écoute et précision',
  'tariff.20m.includes.1':
    'Ensuite : une vision claire de la situation et 2–3 indications pratiques via WhatsApp ou email',
  'tariff.20m.includes.2':
    'Indiquée si vous voulez éclairer une seule question rapidement et de façon accessible (pas adaptée à plusieurs thèmes)',
  'tariff.45m.title': 'Consultation Essentielle',
  'tariff.45m.description':
    'Pour remettre de l’ordre quand vous avez deux ou trois questions ouvertes et voulez bien orienter votre énergie. Quand une réponse rapide ne suffit pas parce que plusieurs domaines sont en jeu.',
  'tariff.45m.focus': 'Vocal ou Studio Macerata (Via Crispi 37)',
  'tariff.45m.includes.0':
    'Nous observons les situations liées, en ciblant dynamiques, obstacles et possibilités concrètes du présent',
  'tariff.45m.includes.1':
    'Ensuite : une synthèse écrite des points principaux émergés, à relire avec calme',
  'tariff.45m.includes.2':
    'Indiquée si vous cherchez une clarté concrète sur plusieurs aspects du quotidien, dans un temps recueilli et équilibré',
  'tariff.60m.title': 'Consultation Évolutive Complète',
  'tariff.60m.description':
    'Pour comprendre les racines de ce que vous vivez et retrouver une direction consciente. Quand une dynamique se répète et que vous voulez regarder avec honnêteté le contexte extérieur et votre marge d’action.',
  'tariff.60m.focus': 'La plus choisie · Vocal ou Studio Macerata',
  'tariff.60m.includes.0':
    'Une heure entière, sans précipitation, pour approfondir les causes profondes, reconnaître les angles morts et repérer les chemins les plus authentiques',
  'tariff.60m.includes.1':
    'Ensuite : une synthèse de la lecture avec des pistes de réflexion pratiques pour les semaines suivantes',
  'tariff.60m.includes.2':
    'Indiquée si vous désirez une lecture profonde et respectueuse qui vous aide à choisir avec conscience et autonomie',
  'tariff.90m.title': 'Séance Intégrée',
  'tariff.90m.description':
    'Une heure et demie pour rassembler tous les fils et regarder avec ampleur le chemin qui vous attend. Idéale pour clore une phase exigeante, ouvrir un nouveau chapitre, ou explorer plusieurs domaines sans fragmenter le travail.',
  'tariff.90m.focus': 'Vocal ou Studio Macerata (Via Crispi 37)',
  'tariff.90m.includes.0':
    'Une rencontre large et approfondie qui embrasse plusieurs domaines de vie et définit les priorités des mois à venir',
  'tariff.90m.includes.1':
    'Ensuite : un retour écrit sous 48 heures sur un canal réservé, pour fixer les étapes clés l’esprit serein',
  'tariff.90m.includes.2':
    'Indiquée si vous voulez un travail complet dans un seul espace dédié, avec le meilleur équilibre entre temps, profondeur et investissement',
  'faq.faq-1.category': 'Approche holistique',
  'faq.faq-1.question':
    'Comment les Tarots de Tarot Italia lisent-ils le présent et prévoient-ils l’avenir ?',
  'faq.faq-1.answer':
    'Dans la méthode Tarot Italia, les Arcanes éclairent les dynamiques actuelles et tracent les lignes prévisionnelles des développements futurs. La lecture prévisionnelle identifie scénarios, opportunités et nœuds à venir en respectant toujours votre libre arbitre, pour des choix lucides et conscients.',
  'faq.faq-2.category': 'Rôle professionnel',
  'faq.faq-2.question':
    'Quel est le champ d’une Opératrice holistique au sens de la Loi 4/2013 ?',
  'faq.faq-2.answer':
    'Maria Teresa Rogani exerce comme Opératrice holistique au sens de la Loi 4/2013 sur les professions non organisées. La consultation offre écoute empathique, lecture symbolique et prévisionnelle et stimuli de conscience intérieure, sans jamais se substituer à médecins, psychothérapeutes, psychiatres ou conseillers juridiques.',
  'faq.faq-3.category': 'Code déontologique',
  'faq.faq-3.question': 'Quelles demandes sont exclues pour éthique professionnelle ?',
  'faq.faq-3.answer':
    'Aucune diagnose ou indication sanitaire, aucun pronostic sur pathologies ou décès, ni conseils juridiques ou financiers contraignants. Rituals magiques, ligatures ou promesses de résultats garantis sont catégoriquement exclus.',
  'faq.faq-4.category': 'Déroulement de la séance',
  'faq.faq-4.question':
    'Comment se préparer à une consultation de 20, 45, 60 ou 90 minutes ?',
  'faq.faq-4.answer':
    'Il suffit d’apporter une ou plusieurs questions claires sur votre parcours présent ou les développements futurs — professionnel, créatif ou relationnel. Les consultations en ligne se font exclusivement en appel vocal privé : après réservation vous recevrez les indications de connexion ou l’adresse Via Crispi 37 à Macerata pour la rencontre en personne.',
  'faq.faq-5.category': 'Confidentialité',
  'faq.faq-5.question': 'Les thèmes partagés restent-ils confidentiels ?',
  'faq.faq-5.answer':
    'Oui. Chaque dialogue se déroule dans le respect de la plus grande confidentialité professionnelle : les séances ne sont ni enregistrées ni partagées avec des tiers, et les données de réservation sont traitées uniquement pour gérer le rendez-vous.',
  'cfaq.cfaq-1.category': 'Méthode hybride',
  'cfaq.cfaq-1.question':
    'Quelle différence entre la cartomancie traditionnelle et ma méthode ?',
  'cfaq.cfaq-1.answer':
    'La cartomancie traditionnelle cherche souvent des réponses mécaniques et étanches (oui, non, quand). Mon approche est un hybride qui intègre cartomancie pure et tarologie évolutive : j’utilise les 78 Arcanes (Majeurs et Mineurs) non pour vous clouer à un futur immobile, mais pour transformer le chaos en cosmos, donnant au tirage un pli plus réflexif et profond.',
  'cfaq.cfaq-2.category': 'Questions et affections',
  'cfaq.cfaq-2.question':
    'Une question simple ou liée aux affections, comme « Pense-t-il à moi ? », a-t-elle du sens ?',
  'cfaq.cfaq-2.answer':
    'Absolument oui. Souvent on part d’un interrogatif immédiat ou impulsif typique de la cartomancie pour creuser en profondeur. À partir d’une question sur les affections, je commence à tracer dynamiques, motivations et clés rien de banales, restituant une perspective réflexive et la complexité réelle de la situation.',
  'cfaq.cfaq-3.category': 'Les 78 Arcanes',
  'cfaq.cfaq-3.question': 'Quel est le rôle des 78 Arcanes pendant une séance ?',
  'cfaq.cfaq-3.answer':
    'Les 78 Arcanes — Majeurs et Mineurs — agissent comme icônes, archétypes et miroirs de votre intériorité. Ce ne sont pas des entités qui décident pour vous, mais des messagers et narrateurs qui vous accompagnent dans l’exploration de votre narration la plus authentique, dans un espace sûr et sans jugement.',
  'cfaq.cfaq-4.category': 'Issue de la consultation',
  'cfaq.cfaq-4.question': 'Que dois-je attendre à la fin d’une consultation ?',
  'cfaq.cfaq-4.answer':
    'De repartir avec une vision renouvelée. Plus que des réponses toutes faites, vous recevez des traces, des clés de lecture et des prises de conscience pratiques pour remettre de l’ordre dans votre vécu et reprendre les rênes de votre parcours avec plus de clarté.',
  'cfaq.cfaq-5.category': 'Déroulement et accueil',
  'cfaq.cfaq-5.question':
    'Comment se déroule la lecture, et me faut-il une connaissance préalable ?',
  'cfaq.cfaq-5.answer':
    'Aucune connaissance préalable de la symbolique ou du langage des arcanes n’est requise. J’intègre la lecture vivante de la cartomancie à un parcours de réflexion profonde : je vous accueille exactement où vous êtes, en vous guidant pas à pas à travers les images pour déchiffrer votre histoire. Les consultations en ligne se font exclusivement en appel vocal.',
  'course.arcani-maggiori.orderLabel': '01 · Premier pilier',
  'course.arcani-maggiori.title': 'Arcanes Majeurs',
  'course.arcani-maggiori.subtitle':
    'Le voyage archétypal de 0 à XXI · Présent et prévision',
  'course.arcani-maggiori.description':
    'Premier pas complet sur les 22 Triomphes : fascicules formatifs, fiches visuelles Waite-Smith, visions multiples (symbolique, sens profond, lumière/ombre, présent et prévision) et questions d’apprentissage avec le Sceau flashcard.',
  'course.arcani-maggiori.levelLabel': 'Niveau débutant et intermédiaire',
  'course.arcani-maggiori.formatLabel':
    'Fascicules interactifs + Fiches visuelles + Sceau · PDF à venir',
  'course.arcani-maggiori.totalHours': 'fascicules + Sceau',
  'course.arcani-maggiori.includes.0':
    '4 modules avec fascicules formatifs sur les 22 Triomphes (0–XXI) et atelier de vérification',
  'course.arcani-maggiori.includes.1':
    'Fiches visuelles Waite-Smith et Sceau flashcard avec questions d’apprentissage',
  'course.arcani-maggiori.includes.2':
    'Visions multiples pour chaque lame : symbolique, sens profond, lumière/ombre, présent et prévision',
  'course.arcani-maggiori.includes.3':
    'Manuel PDF illustré avec fiches archétypales et mots-clés',
  'course.arcani-maggiori.module.01.title':
    'Architecture et Premier Septénaire (0 – VII)',
  'course.arcani-maggiori.module.01.duration': '≈ 40 min lecture',
  'course.arcani-maggiori.module.01.summary':
    'Carte des Trois Septénaires, du Mat au Chariot : bullets, fiches visuelles et Sceau du Premier Septénaire.',
  'course.arcani-maggiori.module.02.title':
    'Deuxième Septénaire : Épreuve éthique (VIII – XIV)',
  'course.arcani-maggiori.module.02.duration': '≈ 40 min lecture',
  'course.arcani-maggiori.module.02.summary':
    'Justice, Ermite, Roue, Force, Pendu, Mort et Tempérance : intériorisation et cycles d’épreuve.',
  'course.arcani-maggiori.module.03.title':
    'Troisième Septénaire : Ombre et accomplissement (XV – XXI)',
  'course.arcani-maggiori.module.03.duration': '≈ 40 min lecture',
  'course.arcani-maggiori.module.03.summary':
    'Du Diable et de la Tour aux Étoiles, Lune, Soleil, Jugement et Monde : crise, vision et réalisation.',
  'course.arcani-maggiori.module.04.title':
    'Atelier pratique final et vérification',
  'course.arcani-maggiori.module.04.duration': '≈ 25 min lecture',
  'course.arcani-maggiori.module.04.summary':
    'Auto-évaluation des cycles, tirages intégrateurs et révision avec le Sceau d’apprentissage.',
  'course.arcani-minori.orderLabel': '02 · Deuxième pilier',
  'course.arcani-minori.title': 'Arcanes Mineurs',
  'course.arcani-minori.subtitle':
    'Les Quatre Couleurs, Numérologie 1–10 et Figures de Cour',
  'course.arcani-minori.description':
    'De l’intuition à la précision quotidienne : maîtrisez les 56 Arcanes Mineurs pour lire temps, personnes impliquées, dynamiques professionnelles, sentimentales et matérielles.',
  'course.arcani-minori.levelLabel': 'Niveau intermédiaire',
  'course.arcani-minori.formatLabel':
    'On-demand + Atlas des couleurs PDF + 1h Q&R live',
  'course.arcani-minori.totalHours': '9h 45m vidéo',
  'course.arcani-minori.includes.0':
    '14 vidéoleçons dédiées aux 4 Couleurs (Bâtons, Coupes, Épées, Deniers)',
  'course.arcani-minori.includes.1':
    'Carte comparative de la Numérologie de l’As au Dix par couleur',
  'course.arcani-minori.includes.2':
    'Profil psychologique et prévisionnel des 16 Figures de Cour',
  'course.arcani-minori.includes.3':
    'Exercices guidés de lecture combinée Majeurs + Mineurs',
  'course.arcani-minori.module.01.title':
    'Les Quatre Éléments dans le Tarot : Feu, Eau, Air et Terre',
  'course.arcani-minori.module.01.duration': '1h 50m',
  'course.arcani-minori.module.01.summary':
    'Comment reconnaître la dominante élémentaire d’un tirage pour comprendre où l’énergie du consultant circule ou se bloque.',
  'course.arcani-minori.module.02.title': 'Le Cycle Numérologique de l’As au Dix',
  'course.arcani-minori.module.02.duration': '3h 15m',
  'course.arcani-minori.module.02.summary':
    'Progression des nombres : débuts (As), choix (Deux), expansion (Trois), stabilité et crise (Quatre-Cinq) jusqu’à l’accomplissement (Dix).',
  'course.arcani-minori.module.03.title':
    'Les 16 Figures de Cour : Valets, Cavaliers, Reines et Rois',
  'course.arcani-minori.module.03.duration': '2h 40m',
  'course.arcani-minori.module.03.summary':
    'Identifier personnes réelles, états d’âme, messages en approche et rôles professionnels sans confondre les profils.',
  'course.arcani-minori.module.04.title':
    'Intégration pratique : Temporalités et détails prévisionnels',
  'course.arcani-minori.module.04.duration': '2h 00m',
  'course.arcani-minori.module.04.summary':
    'Utiliser les Arcanes Mineurs pour préciser modalités, temporalités saisonnières et actions concrètes autour d’un Arcane Majeur.',
  'course.metodi-stesura.orderLabel': '03 · Troisième pilier',
  'course.metodi-stesura.title': 'Méthodes de Tirage',
  'course.metodi-stesura.subtitle':
    'Architectures de lecture, synthèse et éthique de la consultation',
  'course.metodi-stesura.description':
    'De la question à la narration cohérente : apprenez à choisir la géométrie de tirage la plus adaptée, relier les cartes et conduire une consultation professionnelle.',
  'course.metodi-stesura.levelLabel': 'Niveau avancé & pratique',
  'course.metodi-stesura.formatLabel':
    'On-demand + Schémas vectoriels + Supervision live',
  'course.metodi-stesura.totalHours': '7h 30m vidéo',
  'course.metodi-stesura.includes.0':
    '10 vidéoleçons opératives sur les architectures de tirage classiques et prévisionnelles',
  'course.metodi-stesura.includes.1':
    'Cahier avec 12 schémas de tirage téléchargeables et checklist de conduite',
  'course.metodi-stesura.includes.2':
    'Études de cas réels commentées pas à pas',
  'course.metodi-stesura.includes.3':
    'Supervision pratique sur l’un de vos tirages réels avec Maria Teresa Rogani',
  'course.metodi-stesura.module.01.title':
    'L’Art de la Question et le Pacte Déontologique',
  'course.metodi-stesura.module.01.duration': '1h 20m',
  'course.metodi-stesura.module.01.summary':
    'Comment reformuler des questions confuses en questions ouvertes, claires et éthiquement fondées avant de toucher le jeu.',
  'course.metodi-stesura.module.02.title':
    'Tirages essentiels (3 et 5 cartes) et dynamique temporelle',
  'course.metodi-stesura.module.02.duration': '2h 00m',
  'course.metodi-stesura.module.02.summary':
    'Passé, Présent, Futur imminent et ligne de développement : construire des lectures incisives et essentielles sans dispersion.',
  'course.metodi-stesura.module.03.title':
    'La Croix Celtique et le Tirage à Deux Bifurcations Décisionnelles',
  'course.metodi-stesura.module.03.duration': '2h 20m',
  'course.metodi-stesura.module.03.summary':
    'Maîtriser les 10 positions de la Croix Celtique et comparer deux scénarios futurs alternatifs avec rigueur.',
  'course.metodi-stesura.module.04.title':
    'La Roue des 12 Maisons et la Synthèse Finale',
  'course.metodi-stesura.module.04.duration': '1h 50m',
  'course.metodi-stesura.module.04.summary':
    'Cartographier un cycle annuel entier et restituer au consultant une synthèse orale et écrite lucide et respectueuse.',
};

const de: Dict = {
  'tariff.20m.title': 'Kurze Beratung',
  'tariff.20m.description':
    'Eine präzise Frage, eine gezielte Deutung, sofortige Klarheit. Für einen punktuellen Zweifel — Beziehung, Erwartung oder nahe Entscheidung — wenn Sie mit Klarheit verstehen wollen, was sich bewegt, bevor Sie handeln.',
  'tariff.20m.focus': 'Nur WhatsApp-Sprachanruf',
  'tariff.20m.includes.0':
    'Wir konzentrieren uns auf ein einziges Thema durch die 78 Arkana und gehen mit Zuhören und Präzision zum Wesentlichen',
  'tariff.20m.includes.1':
    'Danach: eine klare Sicht auf die Situation und 2–3 praktische Hinweise per WhatsApp oder E-Mail',
  'tariff.20m.includes.2':
    'Geeignet, wenn Sie eine einzelne Frage schnell und zugänglich klären wollen (nicht für mehrere Themen zugleich)',
  'tariff.45m.title': 'Essenzielle Beratung',
  'tariff.45m.description':
    'Um Ordnung zu schaffen, wenn zwei oder drei Fragen offen sind und Sie Ihre Energie gut ausrichten wollen. Wenn eine schnelle Antwort nicht reicht, weil mehrere Bereiche berührt sind.',
  'tariff.45m.focus': 'Sprachanruf oder Studio Macerata (Via Crispi 37)',
  'tariff.45m.includes.0':
    'Wir betrachten verknüpfte Situationen und fokussieren Dynamiken, Hindernisse und konkrete Möglichkeiten der Gegenwart',
  'tariff.45m.includes.1':
    'Danach: eine schriftliche Zusammenfassung der wichtigsten Punkte, zum ruhigen Nachlesen',
  'tariff.45m.includes.2':
    'Geeignet, wenn Sie konkrete Klarheit zu mehreren Aspekten des Alltags in einer gesammelten, ausgewogenen Zeit suchen',
  'tariff.60m.title': 'Vollständige evolutive Beratung',
  'tariff.60m.description':
    'Um die Wurzeln dessen zu verstehen, was Sie erleben, und eine bewusste Richtung wiederzufinden. Wenn sich eine Dynamik wiederholt und Sie den äußeren Kontext und Ihren Handlungsspielraum ehrlich betrachten wollen.',
  'tariff.60m.focus': 'Am häufigsten gewählt · Sprachanruf oder Studio Macerata',
  'tariff.60m.includes.0':
    'Eine volle Stunde, ohne Eile, um tiefe Ursachen zu vertiefen, blinde Flecken zu erkennen und die authentischsten Wege zu finden',
  'tariff.60m.includes.1':
    'Danach: eine Synthese der Deutung plus praktische Reflexionsspuren für die folgenden Wochen',
  'tariff.60m.includes.2':
    'Geeignet, wenn Sie eine tiefe, respektvolle Deutung wünschen, die Sie hilft, bewusst und autonom zu wählen',
  'tariff.90m.title': 'Integrierte Sitzung',
  'tariff.90m.description':
    'Eineinhalb Stunden, um alle Fäden zusammenzuführen und den Weg voraus mit Weite zu betrachten. Ideal beim Abschluss einer anspruchsvollen Phase, dem Beginn eines neuen Kapitels oder der Erkundung mehrerer Lebensbereiche ohne Zersplitterung.',
  'tariff.90m.focus': 'Sprachanruf oder Studio Macerata (Via Crispi 37)',
  'tariff.90m.includes.0':
    'Ein weites, vertieftes Treffen, das mehrere Lebensbereiche umfasst und Prioritäten für die kommenden Monate setzt',
  'tariff.90m.includes.1':
    'Danach: schriftliches Feedback innerhalb von 48 Stunden über einen privaten Kanal, um die Schlüssel Schritte mit ruhigem Geist festzuhalten',
  'tariff.90m.includes.2':
    'Geeignet, wenn Sie komplette Arbeit in einem einzigen Raum wünschen — mit dem besten Gleichgewicht aus Zeit, Tiefe und Investition',
  'faq.faq-1.category': 'Holistischer Ansatz',
  'faq.faq-1.question':
    'Wie lesen die Tarots von Tarot Italia die Gegenwart und sehen die Zukunft voraus?',
  'faq.faq-1.answer':
    'In der Methode von Tarot Italia beleuchten die Arkana aktuelle Dynamiken und zeichnen vorausschauende Linien künftiger Entwicklungen. Die vorausschauende Deutung erkennt Szenarien, Chancen und kommende Knoten unter Achtung Ihres freien Willens — für klare, bewusste Entscheidungen.',
  'faq.faq-2.category': 'Berufliche Rolle',
  'faq.faq-2.question':
    'Welchen Rahmen hat eine holistische Praktikerin nach dem Gesetz 4/2013?',
  'faq.faq-2.answer':
    'Maria Teresa Rogani arbeitet als holistische Praktikerin nach dem Gesetz 4/2013 über nicht organisierte Berufe. Die Beratung bietet empathisches Zuhören, symbolische und vorausschauende Deutung und Impulse innerer Bewusstheit — ohne jemals Ärzte, Psychotherapeuten, Psychiater oder Rechtsberater zu ersetzen.',
  'faq.faq-3.category': 'Berufsethischer Kodex',
  'faq.faq-3.question': 'Welche Anfragen sind aus ethischen Gründen ausgeschlossen?',
  'faq.faq-3.answer':
    'Keine medizinischen Diagnosen oder Hinweise, keine Prognosen zu Krankheiten oder Todesfällen und keine verbindlichen Rechts- oder Finanzberatungen. Magische Rituale, Bindungen oder Versprechen garantierter Ergebnisse sind kategorisch ausgeschlossen.',
  'faq.faq-4.category': 'Ablauf der Sitzung',
  'faq.faq-4.question':
    'Wie bereite ich mich auf eine Beratung von 20, 45, 60 oder 90 Minuten vor?',
  'faq.faq-4.answer':
    'Bringen Sie eine oder mehrere klare Fragen zu Ihrem gegenwärtigen Weg oder künftigen Entwicklungen mit — beruflich, kreativ oder beziehungsbezogen. Online-Beratungen finden ausschließlich als privater Sprachanruf statt: Nach der Buchung erhalten Sie Verbindungsangaben oder die Adresse Via Crispi 37 in Macerata für das persönliche Treffen.',
  'faq.faq-5.category': 'Vertraulichkeit',
  'faq.faq-5.question': 'Bleiben geteilte Themen vertraulich?',
  'faq.faq-5.answer':
    'Ja. Jeder Dialog wahrt maximale berufliche Vertraulichkeit: Sitzungen werden weder aufgezeichnet noch an Dritte weitergegeben, und Buchungsdaten werden ausschließlich zur Terminverwaltung verarbeitet.',
  'cfaq.cfaq-1.category': 'Hybride Methode',
  'cfaq.cfaq-1.question':
    'Worin unterscheidet sich traditionelle Kartomantie von meiner Methode?',
  'cfaq.cfaq-1.answer':
    'Traditionelle Kartomantie sucht oft mechanische, wasserdichte Antworten (ja, nein, wann). Mein Ansatz ist ein Hybrid aus reiner Kartomantie und evolutiver Tarologie: Ich nutze die 78 Arkana (Groß und Klein) nicht, um Sie an eine starre Zukunft zu nageln, sondern um Chaos in Kosmos zu verwandeln — mit einem reflektierteren, tieferen Faltenwurf der Legung.',
  'cfaq.cfaq-2.category': 'Fragen & Affekte',
  'cfaq.cfaq-2.question':
    'Macht eine einfache oder affektbezogene Frage wie „Denkt er an mich?“ Sinn?',
  'cfaq.cfaq-2.answer':
    'Absolut ja. Oft starten wir von einer unmittelbaren oder impulsiven kartomantischen Frage, um tiefer zu graben. Aus einer Affektfrage beginne ich, Dynamiken, Motivationen und alles andere als banale Schlüssel zu zeichnen und gebe eine reflektierte Perspektive sowie die reale Komplexität der Situation zurück.',
  'cfaq.cfaq-3.category': 'Die 78 Arkana',
  'cfaq.cfaq-3.question': 'Welche Rolle haben die 78 Arkana in einer Sitzung?',
  'cfaq.cfaq-3.answer':
    'Die 78 Arkana — Groß und Klein — wirken als Ikonen, Archetypen und Spiegel Ihrer Innerlichkeit. Sie sind keine Wesen, die für Sie entscheiden, sondern Boten und Erzähler, die Sie bei der Erkundung Ihrer authentischsten Erzählung begleiten — in einem sicheren, urteilsfreien Raum.',
  'cfaq.cfaq-4.category': 'Ergebnis der Beratung',
  'cfaq.cfaq-4.question': 'Was darf ich am Ende einer Beratung erwarten?',
  'cfaq.cfaq-4.answer':
    'Mit erneuerter Sicht zu gehen. Mehr als vorgefertigte Antworten erhalten Sie Spuren, Deutungsschlüssel und praktische Bewusstheiten, um Ihr Erleben zu ordnen und die Zügel Ihres Weges mit mehr Klarheit wieder in die Hand zu nehmen.',
  'cfaq.cfaq-5.category': 'Ablauf & Empfang',
  'cfaq.cfaq-5.question':
    'Wie läuft die Deutung ab, und brauche ich Vorkenntnisse?',
  'cfaq.cfaq-5.answer':
    'Vorkenntnisse der Symbolik oder Sprache der Arkana sind nicht nötig. Ich verbinde die lebendige Lesung der Kartomantie mit einem Weg tiefer Reflexion: Ich empfange Sie genau dort, wo Sie sind, und führe Sie Schritt für Schritt durch die Bilder, um Ihre Geschichte zu entschlüsseln. Online-Beratungen finden ausschließlich als Sprachanruf statt.',
  'course.arcani-maggiori.orderLabel': '01 · Erste Säule',
  'course.arcani-maggiori.title': 'Große Arkana',
  'course.arcani-maggiori.subtitle':
    'Die archetypische Reise von 0 bis XXI · Gegenwart und Vorausschau',
  'course.arcani-maggiori.description':
    'Vollständiger erster Schritt zu den 22 Triumphen: formative Skripte, Waite-Smith-Visualbögen, multiple Visionen (Symbolik, tiefer Sinn, Licht/Schatten, Gegenwart und Vorausschau) und Lernfragen mit dem Siegel-Flashcard.',
  'course.arcani-maggiori.levelLabel': 'Basis- und Mittelstufe',
  'course.arcani-maggiori.formatLabel':
    'Interaktive Skripte + Visualbögen + Siegel · PDF folgt',
  'course.arcani-maggiori.totalHours': 'Skripte + Siegel',
  'course.arcani-maggiori.includes.0':
    '4 Module mit formativen Skripten zu den 22 Triumphen (0–XXI) und Verifikationslabor',
  'course.arcani-maggiori.includes.1':
    'Waite-Smith-Visualbögen und Siegel-Flashcards mit Lernfragen',
  'course.arcani-maggiori.includes.2':
    'Multiple Visionen je Klinge: Symbolik, tiefer Sinn, Licht/Schatten, Gegenwart und Vorausschau',
  'course.arcani-maggiori.includes.3':
    'Illustriertes PDF-Handbuch mit Archetypenbögen und Schlüsselwörtern',
  'course.arcani-maggiori.module.01.title':
    'Architektur und Erstes Septenar (0 – VII)',
  'course.arcani-maggiori.module.01.duration': '≈ 40 Min. Lektüre',
  'course.arcani-maggiori.module.01.summary':
    'Karte der Drei Septenare, vom Narren zum Wagen: Bullets, Visualbögen und Siegel des Ersten Septenars.',
  'course.arcani-maggiori.module.02.title':
    'Zweites Septenar: Ethische Prüfung (VIII – XIV)',
  'course.arcani-maggiori.module.02.duration': '≈ 40 Min. Lektüre',
  'course.arcani-maggiori.module.02.summary':
    'Gerechtigkeit, Eremit, Rad, Kraft, Gehängter, Tod und Mäßigkeit: Verinnerlichung und Prüfungszyklen.',
  'course.arcani-maggiori.module.03.title':
    'Drittes Septenar: Schatten und Vollendung (XV – XXI)',
  'course.arcani-maggiori.module.03.duration': '≈ 40 Min. Lektüre',
  'course.arcani-maggiori.module.03.summary':
    'Vom Teufel und Turm zu Sternen, Mond, Sonne, Gericht und Welt: Krise, Vision und Verwirklichung.',
  'course.arcani-maggiori.module.04.title':
    'Abschließendes Praktikum und Verifikation',
  'course.arcani-maggiori.module.04.duration': '≈ 25 Min. Lektüre',
  'course.arcani-maggiori.module.04.summary':
    'Selbstbewertung der Zyklen, integrative Legungen und Wiederholung mit dem Lernsiegel.',
  'course.arcani-minori.orderLabel': '02 · Zweite Säule',
  'course.arcani-minori.title': 'Kleine Arkana',
  'course.arcani-minori.subtitle':
    'Die Vier Farben, Numerologie 1–10 und Hofkarten',
  'course.arcani-minori.description':
    'Von der Intuition zur alltäglichen Präzision: Meistern Sie die 56 Kleinen Arkana, um Zeiten, beteiligte Personen, berufliche, emotionale und materielle Dynamiken zu lesen.',
  'course.arcani-minori.levelLabel': 'Mittelstufe',
  'course.arcani-minori.formatLabel':
    'On-Demand + Farbenatlas-PDF + 1h Live-Q&A',
  'course.arcani-minori.totalHours': '9h 45m Video',
  'course.arcani-minori.includes.0':
    '14 Videolektionen zu den 4 Farben (Stäbe, Kelche, Schwerter, Münzen)',
  'course.arcani-minori.includes.1':
    'Vergleichende Numerologiekarte vom Ass bis Zehn je Farbe',
  'course.arcani-minori.includes.2':
    'Psychologisches und vorausschauendes Profil der 16 Hoffiguren',
  'course.arcani-minori.includes.3':
    'Geführte Übungen kombinierter Deutung Groß + Klein',
  'course.arcani-minori.module.01.title':
    'Die Vier Elemente im Tarot: Feuer, Wasser, Luft und Erde',
  'course.arcani-minori.module.01.duration': '1h 50m',
  'course.arcani-minori.module.01.summary':
    'Wie man die elementare Dominante einer Legung erkennt, um zu sehen, wo die Energie des Fragenden fließt oder stockt.',
  'course.arcani-minori.module.02.title': 'Der numerologische Zyklus vom Ass bis Zehn',
  'course.arcani-minori.module.02.duration': '3h 15m',
  'course.arcani-minori.module.02.summary':
    'Zahlenprogression: Anfänge (Asse), Wahl (Zweien), Expansion (Dreien), Stabilität und Krise (Vieren–Fünfen) bis zur Vollendung (Zehnen).',
  'course.arcani-minori.module.03.title':
    'Die 16 Hoffiguren: Buben, Ritter, Königinnen und Könige',
  'course.arcani-minori.module.03.duration': '2h 40m',
  'course.arcani-minori.module.03.summary':
    'Reale Personen, Stimmungen, ankommende Botschaften und berufliche Rollen erkennen, ohne Profile zu verwechseln.',
  'course.arcani-minori.module.04.title':
    'Praktische Integration: Zeitlichkeiten und vorausschauende Details',
  'course.arcani-minori.module.04.duration': '2h 00m',
  'course.arcani-minori.module.04.summary':
    'Kleine Arkana nutzen, um Modalitäten, saisonale Zeiten und konkrete Handlungen um eine Große Arkana zu präzisieren.',
  'course.metodi-stesura.orderLabel': '03 · Dritte Säule',
  'course.metodi-stesura.title': 'Legemethoden',
  'course.metodi-stesura.subtitle':
    'Deutungsarchitekturen, Synthese und Ethik der Beratung',
  'course.metodi-stesura.description':
    'Von der Frage zur kohärenten Erzählung: Lernen Sie, die passende Legegeometrie zu wählen, Karten zu verbinden und eine professionelle Beratung zu führen.',
  'course.metodi-stesura.levelLabel': 'Fortgeschritten & Praxis',
  'course.metodi-stesura.formatLabel':
    'On-Demand + Vektorschemas + Live-Supervision',
  'course.metodi-stesura.totalHours': '7h 30m Video',
  'course.metodi-stesura.includes.0':
    '10 operative Videolektionen zu klassischen und vorausschauenden Legearchitekturen',
  'course.metodi-stesura.includes.1':
    'Heft mit 12 herunterladbaren Legeschemas und Durchführung-Checkliste',
  'course.metodi-stesura.includes.2':
    'Reale Fallstudien Schritt für Schritt kommentiert',
  'course.metodi-stesura.includes.3':
    'Praktische Supervision einer Ihrer realen Legungen mit Maria Teresa Rogani',
  'course.metodi-stesura.module.01.title':
    'Die Kunst der Frage und der ethische Pakt',
  'course.metodi-stesura.module.01.duration': '1h 20m',
  'course.metodi-stesura.module.01.summary':
    'Wie man verworrene Fragen in offene, klare und ethisch fundierte Fragen umformuliert, bevor man das Deck berührt.',
  'course.metodi-stesura.module.02.title':
    'Essenzielle Legungen (3 und 5 Karten) und zeitliche Dynamik',
  'course.metodi-stesura.module.02.duration': '2h 00m',
  'course.metodi-stesura.module.02.summary':
    'Vergangenheit, Gegenwart, nahe Zukunft und Entwicklungslinie: prägnante, essentielle Deutungen ohne Streuung aufbauen.',
  'course.metodi-stesura.module.03.title':
    'Das Keltische Kreuz und die Zwei-Wege-Entscheidungslegung',
  'course.metodi-stesura.module.03.duration': '2h 20m',
  'course.metodi-stesura.module.03.summary':
    'Die 10 Positionen des Keltischen Kreuzes meistern und zwei alternative Zukunftsszenarien mit Strenge vergleichen.',
  'course.metodi-stesura.module.04.title':
    'Das Rad der 12 Häuser und die Abschlusssynthese',
  'course.metodi-stesura.module.04.duration': '1h 50m',
  'course.metodi-stesura.module.04.summary':
    'Einen ganzen Jahreszyklus kartieren und dem Fragenden eine klare, respektvolle mündliche und schriftliche Synthese zurückgeben.',
};

export const catalogTranslations: Record<SiteLang, Dict> = {
  it: {},
  en,
  es,
  fr,
  de,
};
