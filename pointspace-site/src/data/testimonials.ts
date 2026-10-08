// Testimonials exactly as published on pointspace.ca (client and title spellings corrected: Carosielli, Nelmar).
export const TESTIMONIALS = {
  carosielliShort: {
    name: 'Juliano Rodriguez-Daoust', company: 'Groupe Carosielli',
    fr: { quote: 'Un service de grande qualité, rapide et efficace.', role: 'Vice-président du développement commercial et des acquisitions' },
    en: { quote: 'A high-quality, fast, and efficient service.', role: 'VP Business Development and Acquisitions' },
  },
  carosielliLong: {
    name: 'Juliano Rodriguez-Daoust', company: 'Groupe Carosielli',
    fr: { quote: "L'équipe de pointSpace a fourni un service de haute qualité, rapide et efficace pour répondre à nos besoins opérationnels. Les plans produits par pointSpace aident nos clients et notre équipe de coordination à préparer des événements exceptionnels au Théâtre St-James.", role: 'Vice-président du développement commercial et des acquisitions' },
    en: { quote: 'The pointSpace team provided a high-quality, fast and efficient service to meet our operational needs. The plans produced by pointSpace help both our customers and our coordination team prepare for outstanding events at the St-James Theatre.', role: 'VP Business Development and Acquisitions' },
  },
  nelmar: {
    name: 'Olivier Tremblay', company: 'Nelmar',
    fr: { quote: 'Le service était A1, nous avons apporté plusieurs modifications et celles-ci ont toujours été effectuées rapidement.', role: 'Responsable Amélioration et Maintenance des Procédés' },
    en: { quote: 'The service was A1, we made several changes and these were always made quickly.', role: 'Process Improvement and Maintenance Manager' },
  },
  marquis: {
    name: 'Jacob Marquis', company: 'Broccolini',
    fr: { quote: "Le travail de pointSpace nous a permis de démystifier l'état actuel d'un bâtiment qui, depuis sa construction en 1960, a subi plusieurs interventions non documentées. Le plan détaillé fourni par l'équipe nous évitera bien des imprévus pendant la phase de construction.", role: 'Coordonnateur du développement immobilier' },
    en: { quote: "pointSpace's work has enabled us to demystify the current state of a building that, since its construction in 1960, has undergone several undocumented interventions. The detailed layout provided by the team will save us many unforeseen problems during the construction phase.", role: 'Real Estate Development Coordinator' },
  },
  wragg: {
    name: 'Jean-François Wragg', company: 'Groupe CDF',
    fr: { quote: "pointSpace a été un partenaire essentiel dans nos projets. En combinant notre savoir-faire avec celui de pointSpace, le projet a bénéficié d'une précision inégalée et d'une efficacité opérationnelle remarquable.", role: 'Directeur des estimations et de la surveillance' },
    en: { quote: 'pointSpace has been an essential partner in our projects. By combining our know-how with pointSpace, the project benefited from unrivalled precision and remarkable operational efficiency.', role: 'Director of Estimates and Surveillance' },
  },
  bakayoko: {
    name: 'William Bakayoko', company: 'Laurier Capital',
    fr: { quote: "Au fil des années, dans les édifices de bureaux, il arrive fréquemment que plusieurs unités soient modifiées ou fusionnées. Ceci fait en sorte que la superficie de ces unités, ou les plans disponibles suite à une acquisition récente, ne sont plus à jour. Les pieds carrés réels de l'immeuble demeurent importants pour plusieurs raisons, et nous sommes très satisfaits du résultat obtenu avec le soutien de pointSpace, qui nous a permis d'obtenir l'heure juste à titre de nouveau propriétaire.", role: 'Chef de l\'exploitation (COO)' },
    en: { quote: 'Over the years, office buildings often undergo changes where multiple suites are renovated, reconfigured, or combined. As a result, the recorded square footage and the floor plans available following a recent acquisition are not always up to date. Having accurate building measurements is essential for many reasons, and we are extremely pleased with the results delivered by pointSpace, which provided us with the reliable information we needed as the new property owner.', role: 'COO' },
  },
} as const;

export type TestimonialId = keyof typeof TESTIMONIALS;
