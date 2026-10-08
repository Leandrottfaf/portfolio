// Project request form, shared by the Contact and Get-a-quote pages (marketing recommendation, 2026-10-02).
// Project-type labels follow the site's service names (brief wording rules: "Plans tels que construits",
// "Mesurage BOMA", "Scan-to-BIM"), plus "Je ne sais pas encore".
import type { Lang } from './routes';

export const PROJECT_FORM = {
  fr: {
    fields: [
      { name: 'prenom', label: 'Prénom', required: true, autocomplete: 'given-name', half: true },
      { name: 'nom', label: 'Nom', required: true, autocomplete: 'family-name', half: true },
      { name: 'entreprise', label: 'Entreprise', autocomplete: 'organization', half: true },
      { name: 'courriel', label: 'Courriel', type: 'email', required: true, autocomplete: 'email', half: true },
      { name: 'telephone', label: 'Téléphone', type: 'tel', autocomplete: 'tel', half: true },
      {
        name: 'type', label: 'Type de projet', type: 'select', required: true, half: true, placeholder: 'Choisir un type de projet',
        options: [
          'Numérisation LiDAR 3D', "Scan-to-BIM (modélisation BIM de l'existant)", 'Plans tels que construits', 'Mesurage BOMA',
          'Analyse du bâtiment', "Suivi d'avancement", 'Visite virtuelle Matterport', 'Jumeau numérique', 'Modélisation 3D', 'Photo 360°',
          'Je ne sais pas encore',
        ],
      },
      { name: 'ville', label: 'Ville / emplacement du projet', autocomplete: 'address-level2' },
      { name: 'description', label: 'Description brève du projet', type: 'textarea', required: true },
    ],
    submit: 'Demander une soumission',
    notice: "Prototype : ce formulaire n'envoie rien. En production, il sera relié au système de formulaires choisi.",
    req: '* Champs obligatoires',
  },
  en: {
    fields: [
      { name: 'prenom', label: 'First name', required: true, autocomplete: 'given-name', half: true },
      { name: 'nom', label: 'Last name', required: true, autocomplete: 'family-name', half: true },
      { name: 'entreprise', label: 'Company', autocomplete: 'organization', half: true },
      { name: 'courriel', label: 'Email', type: 'email', required: true, autocomplete: 'email', half: true },
      { name: 'telephone', label: 'Phone', type: 'tel', autocomplete: 'tel', half: true },
      {
        name: 'type', label: 'Project type', type: 'select', required: true, half: true, placeholder: 'Choose a project type',
        options: [
          'LiDAR 3D Scanning', 'Scan-to-BIM (as-built BIM modeling)', 'As-Built Drawings', 'BOMA Measurement',
          'Building Analysis', 'Progress Tracking', 'Matterport Virtual Tour', 'Digital Twin', '3D Modeling', '360° Photo',
          'Not sure yet',
        ],
      },
      { name: 'ville', label: 'City / project location', autocomplete: 'address-level2' },
      { name: 'description', label: 'Short project description', type: 'textarea', required: true },
    ],
    submit: 'Request a quote',
    notice: 'Prototype: this form does not send anything. In production it will be connected to the chosen form system.',
    req: '* Required fields',
  },
} satisfies Record<Lang, unknown>;
