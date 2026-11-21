import type { SiteLang } from '../types';

/**
 * Marketing / commerce overlays for siteContent cmsKeys.
 * Italian stays in siteContent.liveText (source of truth); other langs use these keys.
 * Key = cmsKey without the `[COPY: …]` wrapper.
 */
type ContentDict = Record<string, string>;

const en: ContentDict = {
  'siteContent.brand.name': 'Tarot Italia',
  'siteContent.brand.practitioner': 'Maria Teresa Rogani',
  'siteContent.brand.role': 'Holistic Practitioner · Symbolic & Evolutive Reading',
  'siteContent.home.kicker': 'Maria Teresa Rogani · Holistic Practitioner',
  'siteContent.home.hero':
    'A space of symbolic listening to orient the present and read the future.',
  'siteContent.home.heroSubtitle':
    'Through the archetypal language of the Tarot I accompany you in a reserved, lucid dialogue to understand the present and glimpse the evolutive lines of the future.',
  'siteContent.ethics.title': 'Code of Ethics · Reading Present and Future',
  'siteContent.ethics.body':
    'Holistic counselling joins listening to the present with a predictive reading of possible future developments, fully respecting free will. It does not replace medical, psychological or legal advice.',
  'siteContent.home.pathwaysHeading': 'Holistic Counselling Paths',
  'siteContent.home.pathwaysIntro':
    'Every session is shaped around the real question you bring — no prefabricated formulas.',
  'siteContent.home.dockHeading': 'Direct Contact and Studio',
  'siteContent.home.faqHeading': 'FAQ on Approach and Ethics',
  'siteContent.home.faqIntro':
    'Essential clarifications on the holistic method, ethical boundaries and how sessions unfold.',
  'siteContent.home.testimonialsHeading': 'Google Reviews',
  'siteContent.home.testimonialsIntro':
    'The same reviews published on Google by people who consulted Tarot Italia.',
  'siteContent.home.coursesHeading': 'Didactic Paths · Tarot Italia Academy',
  'siteContent.home.coursesIntro':
    'Three paid training modules to learn symbolic and predictive Tarot reading with rigorous, ethical method.',
  'siteContent.chiSono.kicker': 'Maria Teresa Rogani · About',
  'siteContent.chiSono.heading': 'My path',
  'siteContent.chiSono.researchHeading': 'Training and research',
  'siteContent.chiSono.researchP1':
    'My academic and humanistic training informs how I observe and interpret the cards.',
  'siteContent.chiSono.researchP2':
    'Trained as a graphic designer and graduated in Visual Communication Techniques at the Academy of Fine Arts, I deepened contemporary sculpture and classical philosophy.',
  'siteContent.chiSono.researchP3':
    'This background guides my eye for composition, colour and symbols, always considered in their historical, iconographic and symbolic context.',
  'siteContent.chiSono.disciplinaryKicker': 'Integrated Disciplinary Path',
  'siteContent.chiSono.disciplinaryHeading': 'Disciplinary path',
  'siteContent.chiSono.disciplinaryIntro':
    'A coherent weave of esoteric tarotology, Rider–Waite–Smith iconographic tradition and holistic practices of listening and awareness.',
  'siteContent.consulti.heading': 'Choosing a Reading and Fees',
  'siteContent.consulti.subheading':
    'Four durations calibrated for different depths. In every session I read Major and Minor Arcana: online via a private voice call, or in person in Macerata (Via Crispi 37) by appointment — the Short Reading is online only.',
  'siteContent.consulti.welcomeKicker': 'Welcome · From Chaos to Cosmos',
  'siteContent.consulti.welcomeHeading':
    'I meet you exactly where you are — without judgement or mechanical answers.',
  'siteContent.consulti.welcomeBody1':
    'Whether you arrive with an immediate, sincere question — even a simple one about affection, such as “Does he think of me?” — or with the need to clarify a complex passage, my readings are born to turn chaos into cosmos. I integrate the living reading of pure cartomancy with evolutive tarotology across all 78 Arcana, Major and Minor.',
  'siteContent.consulti.welcomeBody2':
    'No prior knowledge of the cards is required: I guide you step by step through archetypes, motivations and practical keys so you leave with a renewed vision and can take the reins of your path again. Online readings take place exclusively as a voice call, to favour deep listening and concentration.',
  'siteContent.consulti.faqHeading': 'FAQ on Method and How a Reading Works',
  'siteContent.consulti.ethicsCallout':
    'Ethical commitment: every reading offers a clear view of the present and future tendencies while respecting free will. No miraculous promises or substitution of medical or legal advice.',
  'siteContent.corsi.kicker': 'Holistic Training & Tarotology · 3 Paid Paths',
  'siteContent.corsi.heading': 'Tarot Italia Didactic Paths',
  'siteContent.corsi.subheading':
    'A progressive itinerary in three autonomous modules, purchasable individually, to master the Major Arcana, Minor Arcana and predictive & evolutive spread methods.',
  'siteContent.corsi.soonBadge': 'Curriculum coming soon',
  'siteContent.corsi.soonHoverTitle': 'Content shortly',
  'siteContent.corsi.soonHoverBody':
    'Didactic materials for this path will be distributed shortly. Stay tuned: Tarot Italia training is being prepared with care.',
  'siteContent.corsi.checkoutNote':
    'Members-area access only after verified Stripe payment (Checkout Session paid / webhook) and enrolment on Postgres, protected by Firebase Auth.',
  'siteContent.booking.heading': 'Book a Session',
  'siteContent.booking.subheading':
    'Choose duration, day and time: in every session Maria Teresa reads Major and Minor Arcana. Pay online with Stripe Checkout; the reading takes place on WhatsApp. The Short Reading is online only.',
  'siteContent.booking.stripeNote':
    'Secure payment with Stripe Checkout. After payment you receive email confirmation; Maria Teresa gets a slot alert. The reading takes place on WhatsApp.',
  'siteContent.chat.title': 'Tarot Dialogue',
  'siteContent.chat.subtitle':
    'Guided reflection space · 5 free minutes and timed passes',
  'siteContent.chat.whatsappNote':
    'WhatsApp bridge: if after dialogue with Tarot Italia AI you wish a personal voice call with Maria Teresa Rogani, continue on WhatsApp.',
  'siteContent.privacy.bannerTitle': 'Privacy and Cookies',
  'siteContent.privacy.bannerBody':
    'We use essential technical cookies for the site to work and, only with consent, functional preferences and anonymous statistics.',
  'siteContent.privacy.modalTitle': 'Privacy and Cookie Preferences',
  'siteContent.privacy.modalIntro':
    'Manage consent for non-essential cookies transparently. You can change your choice anytime from the footer or side rail.',
  'siteContent.privacy.gdprSummary':
    'Data controller: Maria Teresa Rogani — Tarot Italia (VAT 02136780430; info@tarotitalia.com). Contact and booking data are processed solely to deliver the reading and manage Stripe Checkout / Firebase Auth obligations, with no sale to third parties for marketing. Full notice: /privacy and /privacy.html.',
};

const es: ContentDict = {
  'siteContent.brand.name': 'Tarot Italia',
  'siteContent.brand.practitioner': 'Maria Teresa Rogani',
  'siteContent.brand.role': 'Operadora Holística · Lectura Simbólica y Evolutiva',
  'siteContent.home.kicker': 'Maria Teresa Rogani · Operadora Holística',
  'siteContent.home.hero':
    'Un espacio de escucha simbólica para orientar el presente y leer el futuro.',
  'siteContent.home.heroSubtitle':
    'A través del lenguaje arquetípico del Tarot te acompaño en un diálogo reservado y lúcido para comprender el presente e intuir las líneas evolutivas del futuro.',
  'siteContent.ethics.title': 'Código Deontológico · Lectura del Presente y del Futuro',
  'siteContent.ethics.body':
    'La consulta holística une la escucha del presente con la lectura previsional de posibles evoluciones futuras, respetando plenamente el libre albedrío. No sustituye dictámenes médicos, psicológicos o legales.',
  'siteContent.home.pathwaysHeading': 'Recorridos de Consulta Holística',
  'siteContent.home.pathwaysIntro':
    'Cada encuentro se construye a medida alrededor de la pregunta real que traes, sin fórmulas prefabricadas.',
  'siteContent.home.dockHeading': 'Contacto Directo y Estudio',
  'siteContent.home.faqHeading': 'Preguntas frecuentes sobre enfoque y ética',
  'siteContent.home.faqIntro':
    'Aclaraciones esenciales sobre el método holístico, los límites deontológicos y el desarrollo de las sesiones.',
  'siteContent.home.testimonialsHeading': 'Reseñas de Google',
  'siteContent.home.testimonialsIntro':
    'Las mismas reseñas publicadas en Google por quienes consultaron Tarot Italia.',
  'siteContent.home.coursesHeading': 'Recorridos Didácticos · Academia Tarot Italia',
  'siteContent.home.coursesIntro':
    'Tres módulos formativos de pago para aprender la lectura simbólica y previsional del Tarot con método riguroso y ético.',
  'siteContent.chiSono.kicker': 'Maria Teresa Rogani · Quién soy',
  'siteContent.chiSono.heading': 'Mi recorrido',
  'siteContent.chiSono.researchHeading': 'Formación e investigación',
  'siteContent.chiSono.researchP1':
    'Mi formación académica y humanística informa el modo en que observo e interpreto las cartas.',
  'siteContent.chiSono.researchP2':
    'Diplomada como gráfica y licenciada en Técnicas de la Comunicación Visual en la Academia de Bellas Artes, profundicé la escultura contemporánea y la filosofía clásica.',
  'siteContent.chiSono.researchP3':
    'Esta formación guía mi mirada sobre composición, color y símbolos, siempre en su contexto histórico, iconográfico y simbólico.',
  'siteContent.chiSono.disciplinaryKicker': 'Recorrido Disciplinario Integrado',
  'siteContent.chiSono.disciplinaryHeading': 'Recorrido disciplinario',
  'siteContent.chiSono.disciplinaryIntro':
    'Un tejido coherente entre tarología esotérica, tradición iconográfica Rider–Waite–Smith y prácticas holísticas de escucha y conciencia.',
  'siteContent.consulti.heading': 'Elección de la Consulta y Tarifas',
  'siteContent.consulti.subheading':
    'Cuatro duraciones calibradas para distintas profundidades. En cada sesión leo Arcanos Mayores y Menores: en línea por llamada de voz reservada, o en persona en Macerata (Via Crispi 37) con cita — la Consulta Breve es solo en línea.',
  'siteContent.consulti.welcomeKicker': 'Bienvenida · Del Caos al Cosmos',
  'siteContent.consulti.welcomeHeading':
    'Te recibo exactamente donde estás, sin juicio ni respuestas mecánicas.',
  'siteContent.consulti.welcomeBody1':
    'Ya llegues con una pregunta inmediata y sincera — incluso sencilla o ligada a los afectos, como «¿Piensa en mí?» — o con la necesidad de aclarar un paso complejo, mis consultas nacen para transformar el caos en cosmos. Integro la lectura viva de la cartomancia pura con la tarología evolutiva a través de los 78 Arcanos, Mayores y Menores.',
  'siteContent.consulti.welcomeBody2':
    'No se requiere conocimiento previo de las cartas: te guío paso a paso entre arquetipos, motivaciones y claves prácticas para que salgas con una visión renovada y recuperes las riendas de tu camino. Las consultas en línea se realizan exclusivamente por llamada de voz, para favorecer la escucha profunda y la concentración.',
  'siteContent.consulti.faqHeading': 'Preguntas sobre el método y el desarrollo de la consulta',
  'siteContent.consulti.ethicsCallout':
    'Compromiso ético: cada consulta ofrece una lectura clara del presente y de las tendencias futuras respetando el libre albedrío. Ninguna promesa milagrosa ni sustitución de dictámenes médicos o legales.',
  'siteContent.corsi.kicker': 'Formación Holística y Tarología · 3 Recorridos de Pago',
  'siteContent.corsi.heading': 'Recorridos Didácticos Tarot Italia',
  'siteContent.corsi.subheading':
    'Un itinerario progresivo en tres módulos autónomos, adquiribles por separado, para dominar los Arcanos Mayores, los Menores y los métodos de tirada previsionales y evolutivos.',
  'siteContent.corsi.soonBadge': 'Didáctica en camino',
  'siteContent.corsi.soonHoverTitle': 'Contenidos en breve',
  'siteContent.corsi.soonHoverBody':
    'Los materiales didácticos de este recorrido se distribuirán en breve. Mantente a la escucha: la formación Tarot Italia se prepara con cuidado.',
  'siteContent.corsi.checkoutNote':
    'Acceso al área reservada solo tras pago Stripe verificado (Checkout Session paid / webhook) e inscripción en Postgres, protegida por Firebase Auth.',
  'siteContent.booking.heading': 'Reserva de Sesión',
  'siteContent.booking.subheading':
    'Elige duración, día y hora: en cada sesión Maria Teresa lee Arcanos Mayores y Menores. Paga en línea con Stripe Checkout; la consulta se realiza por WhatsApp. La Consulta Breve es solo en línea.',
  'siteContent.booking.stripeNote':
    'Pago seguro con Stripe Checkout. Tras el pago recibes confirmación por email; Maria Teresa recibe un aviso del horario. La consulta se realiza por WhatsApp.',
  'siteContent.chat.title': 'Diálogo Tarot',
  'siteContent.chat.subtitle':
    'Espacio de reflexión guiada · 5 minutos gratis y pases temporizados',
  'siteContent.chat.whatsappNote':
    'Puente WhatsApp: si tras el diálogo con Tarot Italia IA deseas una llamada de voz personal con Maria Teresa Rogani, continúa en WhatsApp.',
  'siteContent.privacy.bannerTitle': 'Privacidad y Cookies',
  'siteContent.privacy.bannerBody':
    'Usamos cookies técnicas indispensables para el funcionamiento del sitio y, solo con consentimiento, preferencias funcionales y estadísticas anónimas.',
  'siteContent.privacy.modalTitle': 'Preferencias de Privacidad y Cookies',
  'siteContent.privacy.modalIntro':
    'Gestiona con transparencia tu consentimiento para cookies no esenciales. Puedes cambiar la elección en cualquier momento desde el pie o la barra lateral.',
  'siteContent.privacy.gdprSummary':
    'Responsable del tratamiento: Maria Teresa Rogani — Tarot Italia (NIF 02136780430; info@tarotitalia.com). Los datos de contacto y reserva se tratan solo para prestar la consulta y gestionar Stripe Checkout / Firebase Auth, sin cesión a terceros con fines comerciales. Información completa: /privacy y /privacy.html.',
};

const fr: ContentDict = {
  'siteContent.brand.name': 'Tarot Italia',
  'siteContent.brand.practitioner': 'Maria Teresa Rogani',
  'siteContent.brand.role': 'Opératrice holistique · Lecture symbolique et évolutive',
  'siteContent.home.kicker': 'Maria Teresa Rogani · Opératrice holistique',
  'siteContent.home.hero':
    'Un espace d’écoute symbolique pour orienter le présent et lire l’avenir.',
  'siteContent.home.heroSubtitle':
    'À travers le langage archétypal du Tarot, je vous accompagne dans un dialogue réservé et lucide pour comprendre le présent et entrevoir les lignes évolutives du futur.',
  'siteContent.ethics.title': 'Code déontologique · Lecture du présent et du futur',
  'siteContent.ethics.body':
    'La consultation holistique unit l’écoute du présent à la lecture prévisionnelle des évolutions possibles, dans le plein respect du libre arbitre. Elle ne remplace pas un avis médical, psychologique ou juridique.',
  'siteContent.home.pathwaysHeading': 'Parcours de consultation holistique',
  'siteContent.home.pathwaysIntro':
    'Chaque rencontre est construite sur mesure autour de la question réelle que vous apportez, sans formules toutes faites.',
  'siteContent.home.dockHeading': 'Contact direct et studio',
  'siteContent.home.faqHeading': 'FAQ sur l’approche et l’éthique',
  'siteContent.home.faqIntro':
    'Éclaircissements essentiels sur la méthode holistique, les limites déontologiques et le déroulement des séances.',
  'siteContent.home.testimonialsHeading': 'Avis Google',
  'siteContent.home.testimonialsIntro':
    'Les mêmes avis publiés sur Google par celles et ceux qui ont consulté Tarot Italia.',
  'siteContent.home.coursesHeading': 'Parcours didactiques · Académie Tarot Italia',
  'siteContent.home.coursesIntro':
    'Trois modules de formation payants pour apprendre la lecture symbolique et prévisionnelle du Tarot avec une méthode rigoureuse et éthique.',
  'siteContent.chiSono.kicker': 'Maria Teresa Rogani · Qui suis-je',
  'siteContent.chiSono.heading': 'Mon parcours',
  'siteContent.chiSono.researchHeading': 'Formation et recherche',
  'siteContent.chiSono.researchP1':
    'Ma formation académique et humaniste informe la façon dont j’observe et interprète les cartes.',
  'siteContent.chiSono.researchP2':
    'Diplômée en graphisme et graduée en Techniques de la communication visuelle à l’Académie des Beaux-Arts, j’ai approfondi la sculpture contemporaine et la philosophie classique.',
  'siteContent.chiSono.researchP3':
    'Cette formation guide mon regard sur la composition, la couleur et les symboles, toujours dans leur contexte historique, iconographique et symbolique.',
  'siteContent.chiSono.disciplinaryKicker': 'Parcours disciplinaire intégré',
  'siteContent.chiSono.disciplinaryHeading': 'Parcours disciplinaire',
  'siteContent.chiSono.disciplinaryIntro':
    'Un entrelacs cohérent entre tarologie ésotérique, tradition iconographique Rider–Waite–Smith et pratiques holistiques d’écoute et de conscience.',
  'siteContent.consulti.heading': 'Choix de la consultation et tarifs',
  'siteContent.consulti.subheading':
    'Quatre durées calibrées pour des profondeurs différentes. À chaque séance je lis les Arcanes Majeurs et Mineurs : en ligne en appel vocal privé, ou en personne à Macerata (Via Crispi 37) sur rendez-vous — la Consultation Brève est uniquement en ligne.',
  'siteContent.consulti.welcomeKicker': 'Accueil · Du Chaos au Cosmos',
  'siteContent.consulti.welcomeHeading':
    'Je vous accueille exactement là où vous êtes, sans jugement ni réponses mécaniques.',
  'siteContent.consulti.welcomeBody1':
    'Que vous arriviez avec une question immédiate et sincère — même simple ou liée aux affections, comme « Pense-t-il à moi ? » — ou avec le besoin de clarifier un passage complexe, mes consultations naissent pour transformer le chaos en cosmos. J’intègre la lecture vivante de la cartomancie pure à la tarologie évolutive à travers les 78 Arcanes, Majeurs et Mineurs.',
  'siteContent.consulti.welcomeBody2':
    'Aucune connaissance préalable des cartes n’est requise : je vous guide pas à pas parmi archétypes, motivations et clés pratiques pour que vous repartiez avec une vision renouvelée et repreniez les rênes de votre parcours. Les consultations en ligne se déroulent exclusivement en appel vocal, pour favoriser l’écoute profonde et la concentration.',
  'siteContent.consulti.faqHeading': 'FAQ sur la méthode et le déroulement',
  'siteContent.consulti.ethicsCallout':
    'Engagement éthique : chaque consultation offre une lecture claire du présent et des tendances futures dans le respect du libre arbitre. Aucune promesse miraculeuse ni substitution d’avis médicaux ou juridiques.',
  'siteContent.corsi.kicker': 'Formation holistique & tarologie · 3 parcours payants',
  'siteContent.corsi.heading': 'Parcours didactiques Tarot Italia',
  'siteContent.corsi.subheading':
    'Un itinéraire progressif en trois modules autonomes, achetables séparément, pour maîtriser les Arcanes Majeurs, les Mineurs et les méthodes de tirage prévisionnelles et évolutives.',
  'siteContent.corsi.soonBadge': 'Didactique à venir',
  'siteContent.corsi.soonHoverTitle': 'Contenus sous peu',
  'siteContent.corsi.soonHoverBody':
    'Les supports didactiques de ce parcours seront distribués sous peu. Restez à l’écoute : la formation Tarot Italia se prépare avec soin.',
  'siteContent.corsi.checkoutNote':
    'Accès à l’espace réservé uniquement après paiement Stripe vérifié (Checkout Session paid / webhook) et inscription sur Postgres, protégée par Firebase Auth.',
  'siteContent.booking.heading': 'Réservation de séance',
  'siteContent.booking.subheading':
    'Choisissez durée, jour et horaire : à chaque séance Maria Teresa lit les Arcanes Majeurs et Mineurs. Payez en ligne avec Stripe Checkout ; la consultation se déroule sur WhatsApp. La Consultation Brève est uniquement en ligne.',
  'siteContent.booking.stripeNote':
    'Paiement sécurisé avec Stripe Checkout. Après le paiement vous recevez une confirmation par e-mail ; Maria Teresa reçoit une alerte du créneau. La consultation se déroule sur WhatsApp.',
  'siteContent.chat.title': 'Dialogue Tarot',
  'siteContent.chat.subtitle':
    'Espace de réflexion guidée · 5 minutes gratuites et passes chronométrées',
  'siteContent.chat.whatsappNote':
    'Pont WhatsApp : si après le dialogue avec Tarot Italia IA vous souhaitez un appel vocal personnel avec Maria Teresa Rogani, continuez sur WhatsApp.',
  'siteContent.privacy.bannerTitle': 'Confidentialité et cookies',
  'siteContent.privacy.bannerBody':
    'Nous utilisons des cookies techniques indispensables au fonctionnement du site et, uniquement avec consentement, des préférences fonctionnelles et des statistiques anonymes.',
  'siteContent.privacy.modalTitle': 'Préférences confidentialité et cookies',
  'siteContent.privacy.modalIntro':
    'Gérez en transparence votre consentement pour les cookies non essentiels. Vous pouvez modifier votre choix à tout moment depuis le pied de page ou la barre latérale.',
  'siteContent.privacy.gdprSummary':
    'Responsable du traitement : Maria Teresa Rogani — Tarot Italia (TVA 02136780430 ; info@tarotitalia.com). Les données de contact et de réservation sont traitées uniquement pour délivrer la consultation et gérer Stripe Checkout / Firebase Auth, sans cession à des tiers à des fins commerciales. Notice complète : /privacy et /privacy.html.',
};

const de: ContentDict = {
  'siteContent.brand.name': 'Tarot Italia',
  'siteContent.brand.practitioner': 'Maria Teresa Rogani',
  'siteContent.brand.role': 'Holistische Praktikerin · Symbolische & evolutive Deutung',
  'siteContent.home.kicker': 'Maria Teresa Rogani · Holistische Praktikerin',
  'siteContent.home.hero':
    'Ein Raum symbolischen Zuhörens, um die Gegenwart zu orientieren und die Zukunft zu lesen.',
  'siteContent.home.heroSubtitle':
    'Durch die archetypische Sprache des Tarot begleite ich Sie in einem zurückhaltenden, klaren Dialog, um die Gegenwart zu verstehen und die evolutiven Linien der Zukunft zu erahnen.',
  'siteContent.ethics.title': 'Berufsethischer Kodex · Lesen von Gegenwart und Zukunft',
  'siteContent.ethics.body':
    'Die holistische Beratung verbindet das Zuhören der Gegenwart mit der vorausschauenden Lesung möglicher zukünftiger Entwicklungen – unter voller Achtung des freien Willens. Sie ersetzt keine medizinischen, psychologischen oder rechtlichen Ratschläge.',
  'siteContent.home.pathwaysHeading': 'Holistische Beratungswege',
  'siteContent.home.pathwaysIntro':
    'Jede Begegnung entsteht maßgeschneidert um die echte Frage, die Sie mitbringen – ohne vorgefertigte Formeln.',
  'siteContent.home.dockHeading': 'Direkter Kontakt und Studio',
  'siteContent.home.faqHeading': 'FAQ zu Ansatz und Ethik',
  'siteContent.home.faqIntro':
    'Wesentliche Klarstellungen zu holistischer Methode, ethischen Grenzen und Ablauf der Sitzungen.',
  'siteContent.home.testimonialsHeading': 'Google-Bewertungen',
  'siteContent.home.testimonialsIntro':
    'Dieselben Bewertungen, die auf Google von Menschen veröffentlicht wurden, die Tarot Italia konsultiert haben.',
  'siteContent.home.coursesHeading': 'Didaktische Wege · Akademie Tarot Italia',
  'siteContent.home.coursesIntro':
    'Drei kostenpflichtige Ausbildungsmodule, um symbolische und vorausschauende Tarot-Deutung mit strenger, ethischer Methode zu erlernen.',
  'siteContent.chiSono.kicker': 'Maria Teresa Rogani · Über mich',
  'siteContent.chiSono.heading': 'Mein Weg',
  'siteContent.chiSono.researchHeading': 'Ausbildung und Forschung',
  'siteContent.chiSono.researchP1':
    'Meine akademische und humanistische Ausbildung prägt, wie ich die Karten beobachte und deute.',
  'siteContent.chiSono.researchP2':
    'Ausgebildet als Grafikerin und graduierte in Techniken der Visuellen Kommunikation an der Akademie der Schönen Künste, vertiefte ich zeitgenössische Skulptur und klassische Philosophie.',
  'siteContent.chiSono.researchP3':
    'Diese Ausbildung leitet meinen Blick auf Komposition, Farbe und Symbole – stets in ihrem historischen, ikonografischen und symbolischen Kontext.',
  'siteContent.chiSono.disciplinaryKicker': 'Integrierter disziplinärer Weg',
  'siteContent.chiSono.disciplinaryHeading': 'Disziplinärer Weg',
  'siteContent.chiSono.disciplinaryIntro':
    'Ein kohärentes Geflecht aus esoterischer Tarologie, Rider–Waite–Smith-Ikonografie und holistischen Praktiken des Zuhörens und der Achtsamkeit.',
  'siteContent.consulti.heading': 'Wahl der Beratung und Tarife',
  'siteContent.consulti.subheading':
    'Vier Dauern für unterschiedliche Tiefen. In jeder Sitzung lese ich Große und Kleine Arkana: online per privatem Sprachanruf oder persönlich in Macerata (Via Crispi 37) nach Termin — die Kurze Beratung ist nur online.',
  'siteContent.consulti.welcomeKicker': 'Willkommen · Vom Chaos zum Kosmos',
  'siteContent.consulti.welcomeHeading':
    'Ich empfange Sie genau dort, wo Sie sind — ohne Urteil und ohne mechanische Antworten.',
  'siteContent.consulti.welcomeBody1':
    'Ob Sie mit einer unmittelbaren, aufrichtigen Frage kommen — auch einer einfachen oder affektbezogenen wie „Denkt er an mich?“ — oder Klarheit über einen komplexen Übergang brauchen: Meine Beratungen entstehen, um Chaos in Kosmos zu verwandeln. Ich verbinde die lebendige Lesung reiner Kartomantie mit evolutiver Tarologie über alle 78 Arkana, Groß und Klein.',
  'siteContent.consulti.welcomeBody2':
    'Vorkenntnisse der Karten sind nicht nötig: Ich führe Sie Schritt für Schritt durch Archetypen, Motivationen und praktische Schlüssel, damit Sie mit erneuerter Sicht gehen und die Zügel Ihres Weges wieder in die Hand nehmen. Online-Beratungen finden ausschließlich als Sprachanruf statt, um tiefes Zuhören und Konzentration zu fördern.',
  'siteContent.consulti.faqHeading': 'FAQ zu Methode und Ablauf der Beratung',
  'siteContent.consulti.ethicsCallout':
    'Ethisches Engagement: Jede Beratung bietet eine klare Lesung der Gegenwart und zukünftiger Tendenzen unter Achtung des freien Willens. Keine Wunderversprechen und kein Ersatz medizinischer oder rechtlicher Ratschläge.',
  'siteContent.corsi.kicker': 'Holistische Ausbildung & Tarologie · 3 kostenpflichtige Wege',
  'siteContent.corsi.heading': 'Didaktische Wege Tarot Italia',
  'siteContent.corsi.subheading':
    'Ein progressiver Weg in drei eigenständigen Modulen, einzeln erwerbbar, um Große Arkana, Kleine Arkana und vorausschauende & evolutive Legemethoden zu meistern.',
  'siteContent.corsi.soonBadge': 'Didaktik folgt',
  'siteContent.corsi.soonHoverTitle': 'Inhalte in Kürze',
  'siteContent.corsi.soonHoverBody':
    'Die didaktischen Materialien dieses Weges werden in Kürze verteilt. Bleiben Sie dran: Die Ausbildung Tarot Italia wird mit Sorgfalt vorbereitet.',
  'siteContent.corsi.checkoutNote':
    'Zugang zum Mitgliederbereich erst nach verifizierter Stripe-Zahlung (Checkout Session paid / Webhook) und Einschreibung in Postgres, geschützt durch Firebase Auth.',
  'siteContent.booking.heading': 'Sitzung buchen',
  'siteContent.booking.subheading':
    'Wählen Sie Dauer, Tag und Uhrzeit: In jeder Sitzung liest Maria Teresa Große und Kleine Arkana. Zahlen Sie online mit Stripe Checkout; die Beratung findet über WhatsApp statt. Die Kurze Beratung ist nur online.',
  'siteContent.booking.stripeNote':
    'Sichere Zahlung mit Stripe Checkout. Nach der Zahlung erhalten Sie eine E-Mail-Bestätigung; Maria Teresa bekommt eine Slot-Benachrichtigung. Die Beratung findet über WhatsApp statt.',
  'siteContent.chat.title': 'Tarot-Dialog',
  'siteContent.chat.subtitle':
    'Geführter Reflexionsraum · 5 Freiminuten und zeitlich begrenzte Pässe',
  'siteContent.chat.whatsappNote':
    'WhatsApp-Brücke: Wenn Sie nach dem Dialog mit Tarot Italia KI einen persönlichen Sprachanruf mit Maria Teresa Rogani wünschen, fahren Sie auf WhatsApp fort.',
  'siteContent.privacy.bannerTitle': 'Datenschutz und Cookies',
  'siteContent.privacy.bannerBody':
    'Wir verwenden technisch notwendige Cookies für den Betrieb der Website und, nur mit Einwilligung, funktionale Einstellungen und anonyme Statistiken.',
  'siteContent.privacy.modalTitle': 'Datenschutz- und Cookie-Einstellungen',
  'siteContent.privacy.modalIntro':
    'Verwalten Sie transparent Ihre Einwilligung für nicht notwendige Cookies. Sie können die Wahl jederzeit im Footer oder in der Seitenleiste ändern.',
  'siteContent.privacy.gdprSummary':
    'Verantwortliche: Maria Teresa Rogani — Tarot Italia (MwSt. 02136780430; info@tarotitalia.com). Kontakt- und Buchungsdaten werden ausschließlich zur Erbringung der Beratung und zur Verwaltung von Stripe Checkout / Firebase Auth verarbeitet, ohne Weitergabe an Dritte zu Werbezwecken. Vollständige Information: /privacy und /privacy.html.',
};

/** Italian entries intentionally empty — liveText in siteContent is canonical. */
export const contentTranslations: Record<SiteLang, ContentDict> = {
  it: {},
  en,
  es,
  fr,
  de,
};

export function cmsKeyToContentKey(cmsKey: string): string {
  const match = cmsKey.match(/^\[COPY:\s*(.+?)\]$/);
  return (match?.[1] ?? cmsKey).trim();
}
