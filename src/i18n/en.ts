export const en = {
  lang: 'en',
  htmlLang: 'en',
  languageName: 'English',
  switchLabel: '中文',
  meta: {
    siteTitle: 'Song Zidong — Academic Portfolio',
    description:
      'Academic portfolio of Song Zidong, an undergraduate student at ShanghaiTech University interested in 3D vision, generative world models, neural rendering, and medical imaging course projects.',
  },
  common: {
    skipToContent: 'Skip to content',
    comingSoon: 'Coming soon',
    disabledLink: 'Coming soon',
    builtWith: 'Built with Astro for GitHub Pages.',
    project: 'Project',
    publication: 'Publication',
    courseProject: 'Course project',
    placeholder: 'Placeholder',
    bio: 'Bio',
    noItems: 'No items have been added yet.',
  },
  nav: {
    home: 'Home',
    about: 'About',
    projects: 'Projects',
    publications: 'Publications',
    coursework: 'Coursework',
    notes: 'Notes',
    contact: 'Contact',
  },
  hero: {
    eyebrow: 'Academic portfolio / Visual research identity',
    statement:
      'I am interested in 3D vision, generative world models, and neural rendering, especially visual systems that connect geometry, representation, and synthesis.',
    primaryAction: 'View projects',
    secondaryAction: 'Contact',
    cvAction: 'CV',
    githubAction: 'GitHub',
    emailAction: 'Email',
    visualIndex: '3D / vision field',
    identityLabels: {
      role: 'Role',
      university: 'University',
      lab: 'Lab',
      major: 'Major',
    },
    majorPrefix: 'Major in',
  },
  about: {
    eyebrow: 'About',
    title: 'A research-oriented academic profile',
    intro:
      'This page keeps the content precise and editable, with space for future education, coursework, awards, and research updates.',
    bio:
      'I am an undergraduate student majoring in Computer Science at ShanghaiTech University and affiliated with VRVC Lab. My current interests focus on 3D Vision, Generative World Models, and Neural Rendering.',
    identityTitle: 'Academic identity',
    interestsTitle: 'Research interests',
    futureTitle: 'Future additions',
    futureItems: ['Education details', 'Coursework', 'Awards', 'Research updates'],
  },
  projects: {
    eyebrow: 'Research / Projects',
    title: 'Projects as visual research artifacts',
    intro:
      'A curated project index for research prototypes, course projects, code, demos, and paper links.',
    fullTitle: 'Project index',
    fullIntro:
      'The BME1312 MRI reconstruction project is included as a formal academic course project, while future research projects remain structured placeholders.',
    viewAll: 'Open project index',
    labels: {
      details: 'Details',
      report: 'Report',
      paper: 'Paper',
      code: 'Code',
      demo: 'Demo',
    },
  },
  publications: {
    eyebrow: 'Publications',
    title: 'Publications',
    intro: 'The publication list is intentionally empty until real papers or manuscripts are provided.',
    empty: 'Publications coming soon.',
    support: 'The data structure already supports title, authors, venue, year, paper URL, code URL, BibTeX, and DOI.',
    labels: {
      paper: 'Paper',
      code: 'Code',
      bibtex: 'BibTeX',
      doi: 'DOI',
    },
  },
  coursework: {
    eyebrow: 'Coursework / Course Projects',
    title: 'Course projects',
    intro: 'A dedicated area for course-based technical artifacts and academic project work.',
    empty: 'Course projects will be added later.',
  },
  notes: {
    eyebrow: 'Notes / Blog',
    title: 'Notes',
    intro: 'A minimal writing space for future research notes, technical reflections, and reading summaries.',
    empty: 'Notes coming soon.',
  },
  contact: {
    eyebrow: 'Contact',
    title: 'Contact',
    intro: 'The current contact section includes only the provided email, GitHub profile, and CV placeholder.',
    email: 'Email',
    github: 'GitHub',
    cv: 'CV',
  },
  bme1312: {
    metaTitle: 'BME1312 MRI Reconstruction Project — Song Zidong',
    metaDescription:
      'BME1312 course project on accelerated multi-contrast MRI reconstruction from undersampled k-space data with U-Net baselines, multi-modal unrolled reconstruction, data consistency, wavelet loss, and perceptual objectives.',
    hero: {
      eyebrow: 'Course Project / Medical Imaging',
      title: 'Multi-contrast MRI Reconstruction from Undersampled Data',
      subtitle:
        'A BME1312 course project on accelerated MRI reconstruction with multi-modal guidance and unrolled deep reconstruction.',
      affiliation: 'Course project at ShanghaiTech University',
    },
    metadata: ['BME1312', 'Course Project', 'Medical Imaging', 'MRI Reconstruction', 'Deep Learning', '2026'],
    labels: {
      course: 'Course',
      type: 'Type',
      year: 'Year',
      context: 'Context',
      summary: 'Summary',
      method: 'Method',
      highlights: 'Highlights',
      metricChanges: 'Key metric changes',
    },
    sections: {
      overview: 'Overview',
      method: 'Method',
      results: 'Results',
      gallery: 'Visual gallery',
      contribution: 'My contribution',
      courseContext: 'Course context',
      future: 'Future improvements',
    },
    overview:
      'This course project studies accelerated multi-contrast MRI reconstruction from undersampled k-space data. Starting from a single-modal U-Net baseline for T2 reconstruction, we further developed a multi-modal unrolled reconstruction framework that leverages fully sampled T1 images as anatomical guidance for undersampled T2 reconstruction. The model combines feature fusion, iterative data consistency, wavelet-domain constraints, and perceptual objectives to improve both quantitative reconstruction quality and perceptual fidelity.',
    overviewBullets: [
      'Clinical MRI acquisition can be time-consuming, motivating accelerated acquisition protocols.',
      'K-space undersampling reduces acquisition time but introduces aliasing artifacts in reconstructed images.',
      'The project uses BraTS data to simulate undersampled MRI reconstruction and recover high-quality T2 images.',
      'The pipeline progresses from a single-modal U-Net baseline to a T1-guided multi-modal unrolled reconstruction network.',
    ],
    methodCards: [
      {
        title: 'U-Net Baseline',
        items: [
          'Single-modal T2 reconstruction from undersampled inputs.',
          'Encoder-decoder architecture with skip connections.',
          'L2 / MSE objective as the initial reconstruction baseline.',
        ],
      },
      {
        title: 'Multi-modal Unrolled Reconstruction',
        items: [
          'Uses fully sampled T1 images as anatomical guidance.',
          'Reconstructs undersampled T2 images with feature fusion.',
          'Iterative refinement with k-space data consistency layers.',
        ],
      },
      {
        title: 'Perceptual and Frequency-aware Objectives',
        items: [
          'Wavelet loss encourages high-frequency structure recovery.',
          'Perceptual loss improves feature-level reconstruction fidelity.',
          'DISTS and LPIPS complement PSNR and SSIM during evaluation.',
        ],
      },
    ],
    highlights: [
      'Simulated accelerated MRI reconstruction from undersampled k-space data.',
      'Implemented a U-Net baseline for single-modal T2 reconstruction.',
      'Built a multi-modal unrolled reconstruction network using fully sampled T1 guidance for undersampled T2 reconstruction.',
      'Added data consistency layers to enforce k-space fidelity during iterative reconstruction.',
      'Explored wavelet loss and perceptual loss to reduce over-smoothing and improve high-frequency detail recovery.',
      'Evaluated reconstruction quality using PSNR, SSIM, LPIPS, and DISTS.',
      'Analyzed the limitation of PSNR through a pixel-shift experiment.',
    ],
    resultsIntro:
      'Compared with the U-Net baseline, the proposed multi-modal unrolled reconstruction framework improves PSNR, SSIM, LPIPS, and DISTS, indicating better pixel-level fidelity, structural consistency, and perceptual reconstruction quality.',
    galleryIntro:
      'Selected processed figures from the course report, showing data simulation, model design, and evaluation analysis.',
    resultColumns: ['Model', 'DISTS ↓', 'LPIPS ↓', 'PSNR ↑', 'SSIM ↑'],
    resultRows: [
      ['Task 2 U-Net', '0.1558', '0.0205', '37.21', '0.885'],
      ['Task 3 Proposed', '0.0936', '0.0090', '41.11', '0.954'],
    ],
    gallery: [
      {
        src: '/projects/bme1312/data-processing.png',
        alt: 'Data processing and k-space undersampling simulation pipeline.',
        caption: 'Data processing and variable-density k-space undersampling simulation.',
      },
      {
        src: '/projects/bme1312/unet-baseline.png',
        alt: 'U-Net baseline reconstruction pipeline.',
        caption: 'Task 2 U-Net baseline for single-modal T2 reconstruction.',
      },
      {
        src: '/projects/bme1312/unrolled-reconstruction.png',
        alt: 'Multi-modal unrolled reconstruction pipeline.',
        caption: 'Task 3 multi-modal unrolled reconstruction with T1 guidance and data consistency.',
      },
      {
        src: '/projects/bme1312/qualitative-comparison.png',
        alt: 'Qualitative comparison between aliased input, ground truth, Task 2, and Task 3 reconstruction.',
        caption: 'Qualitative comparison between baseline and proposed reconstruction outputs.',
      },
      {
        src: '/projects/bme1312/psnr-analysis.png',
        alt: 'Pixel-shift experiment analyzing PSNR sensitivity.',
        caption: 'Pixel-shift experiment illustrating the limitation of purely pixel-aligned metrics such as PSNR.',
      },
    ],
    contribution:
      'My work in this team course project involved implementing and analyzing deep MRI reconstruction pipelines, comparing baseline and advanced reconstruction models, conducting experiments with multiple reconstruction metrics, and preparing visual and written analysis for the final report.',
    courseContext:
      'This work was completed as a team course project for BME1312: Applications of Artificial Intelligence in Medical Imaging at ShanghaiTech University. The page intentionally does not expose student IDs or personal emails of other team members.',
    future: [
      'Better edge-aware constraints.',
      'More robust multi-modal registration.',
      'Stronger frequency-domain modeling.',
      'Validation on broader clinical datasets.',
    ],
  },
} as const;
