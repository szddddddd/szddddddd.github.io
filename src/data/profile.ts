export type Project = {
  title: string;
  year: string;
  description: string;
  tags: string[];
  links: {
    paper: string;
    code: string;
    demo: string;
  };
};

export type Publication = {
  title: string;
  authors: string;
  venue: string;
  year: string;
  note: string;
  links: {
    bibtex: string;
    doi: string;
    pdf: string;
  };
};

export const profile: {
  name: string;
  role: string;
  affiliation: string;
  bio: string;
  researchInterests: string[];
  education: string[];
  links: {
    email: string;
    github: string;
    cv: string;
  };
  projects: Project[];
  publications: Publication[];
  notes: {
    title: string;
    description: string;
  };
} = {
  name: 'Your Name',
  role: 'Researcher / Student / Developer',
  affiliation: 'Your Affiliation',
  bio: 'A short academic bio will be added here.',
  researchInterests: ['Your research interests here'],
  education: ['Your Affiliation'],
  links: {
    email: 'your.email@example.com',
    github: 'https://github.com/szddddddd',
    cv: 'Coming soon',
  },
  projects: [
    {
      title: 'Project Title',
      year: 'Coming soon',
      description: 'Coming soon',
      tags: ['Research Area', 'Method', 'Artifact'],
      links: {
        paper: 'Coming soon',
        code: 'Coming soon',
        demo: 'Coming soon',
      },
    },
  ],
  publications: [
    {
      title: 'Publication Title',
      authors: 'Your Name',
      venue: 'Venue / Journal / Conference',
      year: 'Coming soon',
      note: 'Coming soon',
      links: {
        bibtex: 'Coming soon',
        doi: 'Coming soon',
        pdf: 'Coming soon',
      },
    },
  ],
  notes: {
    title: 'Notes / Blog',
    description: 'Short research notes and technical writing will be added here.',
  },
};
