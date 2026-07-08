export const en = {
  lang: 'en',
  htmlLang: 'en',
  languageName: 'English',
  switchLabel: '中文',
  meta: {
    siteTitle: 'Song Zidong — Academic Portfolio',
    description:
      'Academic portfolio of Song Zidong, an undergraduate student at ShanghaiTech University interested in visual computing, 3D reconstruction, neural rendering, world models, and course projects.',
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
      'I explore visual systems that connect 3D geometry, neural representation, and generative scene understanding.',
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
    pageTitle: 'About',
    title: 'A research-oriented academic profile',
    intro:
      'This page keeps the content precise and editable, with space for future education, coursework, awards, and research updates.',
    bio:
      'I am an undergraduate student majoring in Computer Science at ShanghaiTech University and affiliated with VRVC Lab. My projects and coursework explore visual computing problems that connect geometry-aware reconstruction with learned representations.',
    profileTitle: 'Profile',
    identityTitle: 'Academic details',
    interestsTitle: 'Research interests',
    futureTitle: 'Future updates',
    futureItems: ['Education details', 'Coursework', 'Awards', 'Research updates'],
  },
  projects: {
    eyebrow: 'Research / Projects',
    pageTitle: 'Research / Projects',
    title: 'Projects as visual research artifacts',
    intro:
      'A curated project index for research prototypes, course projects, code, demos, and paper links.',
    fullTitle: 'Project index',
    fullIntro:
      'The BME1312 MRI reconstruction and CS182 MOF3R reconstruction projects are included as academic course projects, while future research projects remain structured placeholders.',
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
    pageTitle: 'Publications',
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
    pageTitle: 'Coursework / Course Projects',
    title: 'Course projects',
    intro: 'A dedicated area for course-based technical artifacts and academic project work.',
    empty: 'Course projects will be added later.',
  },
  notes: {
    eyebrow: 'Notes / Blog',
    pageTitle: 'Notes / Blog',
    title: 'Notes',
    intro: 'A minimal writing space for future research notes, technical reflections, and reading summaries.',
    empty: 'Notes coming soon.',
  },
  contact: {
    eyebrow: 'Contact',
    pageTitle: 'Contact',
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
  si100b: {
    metaTitle: 'SI100B SAVE MY LINEAR ALGEBRA Pygame Project — Song Zidong',
    metaDescription:
      'SI100B course project on a Binding-of-Isaac-inspired 2D roguelike game implemented with Pygame, featuring room exploration, real-time shooting, enemies, NPC interactions, resource UI, and boss encounters.',
    hero: {
      eyebrow: 'Course Project / SI100B',
      title: 'SAVE MY LINEAR ALGEBRA: A Pygame Roguelike',
      subtitle:
        'A team-based SI100B Pygame course project inspired by the room-based roguelike structure of The Binding of Isaac.',
      affiliation: 'SI100B Course Project · ShanghaiTech University · 2024 Fall',
    },
    authors: ['潘佑邦', '吴俊阳', '宋梓冬'],
    metadata: [
      'SI100B',
      'Pygame',
      'Python',
      '2D Roguelike Game',
      'Course Project',
      'Room Exploration',
      'Enemy System',
      'NPC Interaction',
    ],
    labels: {
      course: 'Course',
      type: 'Type',
      term: 'Term',
      team: 'Team',
      summary: 'Summary',
      gameplay: 'Gameplay',
      system: 'System',
      contribution: 'Contribution',
      links: 'Links',
    },
    sections: {
      overview: 'Overview',
      gameplay: 'Gameplay Design',
      systems: 'System Design',
      contribution: 'My Contribution',
      gallery: 'Visual Gallery',
      courseContext: 'Course Context',
      links: 'Links',
    },
    overview:
      'Team SAVE MY LINEAR ALGEBRA is a SI100B course project implemented with Pygame. The project presents a Binding-of-Isaac-inspired 2D roguelike prototype with procedurally connected rooms, real-time movement and shooting, enemy encounters, resource UI, NPC interactions, a raffle machine, bombs, dash mechanics, and animated game scenes.',
    overviewBullets: [
      'The game is presented as a team course project rather than a commercial release.',
      'Players explore connected rooms, defeat monsters, collect coins, meet NPCs, and fight a final boss.',
      'The implementation combines Pygame scenes, sprite animation, room logic, combat logic, and UI systems.',
      'The README identifies the team members as 潘佑邦, 吴俊阳, and 宋梓冬.',
    ],
    gameplayIntro:
      'The README describes a keyboard-driven roguelike loop: move through rooms, shoot in real time, use mobility and bombs, interact with special objects, and build enough resources to challenge the boss.',
    gameplayCards: [
      {
        title: 'Movement and combat',
        items: [
          'WASD controls eight-direction movement.',
          'Arrow keys fire in eight directions.',
          'LSHIFT triggers a dash for quick repositioning.',
        ],
      },
      {
        title: 'Exploration loop',
        items: [
          'Players enter rooms, clear monsters, and unlock adjacent doors.',
          'The objective loop includes collecting coins and becoming stronger before the final boss.',
          'E plants bombs as an additional resource-based action.',
        ],
      },
      {
        title: 'Interactions',
        items: [
          'Q interacts with the raffle machine and NPCs.',
          'Players can meet a Trainer or Merchant during room exploration.',
          'The final loop culminates in a boss encounter.',
        ],
      },
    ],
    systemIntro:
      'The project organizes gameplay through map generation, room types, scene management, enemies, resource UI, NPC systems, and a hardship coefficient that increases difficulty after boss clears.',
    systemCards: [
      {
        title: 'Map and rooms',
        items: [
          'Binary-tree based map generation.',
          'Random generation with iterative backtracking.',
          'Room types include Common room, Boss room, Lucky room, and NPC room.',
        ],
      },
      {
        title: 'Resources and UI',
        items: [
          'Health displays remaining HP.',
          'Coin tracks collected gold coins.',
          'Attack and Bomb UI expose combat and resource state.',
        ],
      },
      {
        title: 'Enemies and boss',
        items: [
          'Fly / BloodyFly units move and damage the player on contact.',
          'Bug units sprint randomly in four directions.',
          'Boss GURDY fires bloody bullets and summons BloodyFly enemies.',
        ],
      },
      {
        title: 'Special systems',
        items: [
          'A raffle machine costs 5 coins and can return coins, attack, or HP.',
          'NPC Trainer rewards or punishes answers.',
          'NPC Merchant trades resources such as coins or HP for heals, bombs, and attack boosts.',
        ],
      },
    ],
    contributionIntro:
      'My contribution focused on enemy logic, game management, animations, UI/scenes, and README documentation.',
    contributionBullets: ['Enemies.py', 'GameManager.py', 'Animations', 'UI / Scenes', 'README.md'],
    galleryIntro:
      'Selected visual assets are copied or composed from real files in the project repository. Composite images use the repository room textures, sprites, UI resources, NPCs, and boss assets rather than generated artwork.',
    gallery: [
      {
        src: '/projects/si100b/hero.png',
        alt: 'Start room control texture from the SI100B Pygame project.',
        caption: 'Start room and control guide texture from the project assets.',
      },
      {
        src: '/projects/si100b/gameplay.png',
        alt: 'Composed gameplay visual using real project room, player, enemy, boss, projectile, and resource sprites.',
        caption: 'Composed gameplay visual assembled from real project sprites and room textures.',
      },
      {
        src: '/projects/si100b/room-types.png',
        alt: 'Room type texture grid showing start, shop, treasure, and blue womb style rooms.',
        caption: 'Room type texture grid based on the repository scene assets.',
      },
      {
        src: '/projects/si100b/systems.png',
        alt: 'Composed systems visual with boss, enemies, resources, merchant, and trainer sprites.',
        caption: 'Enemy, resource, NPC, and boss asset composition from the project repository.',
      },
    ],
    courseContext:
      'This work was completed as a team SI100B course project at ShanghaiTech University in 2024 Fall. The page presents it as a course-based Pygame prototype inspired by The Binding of Isaac, not as an original commercial game or a solo project.',
    links: [
      {
        title: 'GitHub repository',
        text: 'Open the Team SAVE MY LINEAR ALGEBRA repository.',
        href: 'https://github.com/TossACoinTAC/Team-SAVE-MY-LINEAR-ALGEBRA',
      },
      {
        title: 'README source',
        text: 'Project overview, controls, team members, and division of labor are summarized from the repository README.',
        href: 'https://github.com/TossACoinTAC/Team-SAVE-MY-LINEAR-ALGEBRA#readme',
      },
    ],
  },
  cs182: {
    metaTitle: 'CS182 MOF3R 3D Product Reconstruction Project — Song Zidong',
    metaDescription:
      'CS182 course project on mask-guided object-centric 3D reconstruction with SAM2 foreground masks, 3D Gaussian Splatting, Mask-Guided Compound Loss, and geometry-aware Gaussian pruning.',
    hero: {
      eyebrow: 'Course Project / CS182 Machine Learning',
      title: 'MOF3R: Mask-Guided 3D Product Reconstruction',
      subtitle:
        'Mask-Guided High-Fidelity 3D Product Reconstruction via SAM2 and 3D-Consistent Gaussian Splatting Refinement',
      affiliation: 'CS182: Introduction to Machine Learning · Course Project · ShanghaiTech University · 2026',
    },
    authors: ['Zidong Song', 'Boyang Zhou', 'Zian Chen'],
    metadata: [
      'CS182',
      'Machine Learning',
      '3D Gaussian Splatting',
      'SAM2',
      'Object-Centric Reconstruction',
      '3D Reconstruction',
      'Gaussian Pruning',
      'CO3Dv2',
      'Computer Vision',
    ],
    labels: {
      course: 'Course',
      type: 'Type',
      year: 'Year',
      context: 'Context',
      authors: 'Authors',
      summary: 'Summary',
      method: 'Method',
      courseProject: 'Course Project',
      metricChanges: 'Course project metrics',
    },
    sections: {
      overview: 'Overview',
      motivation: 'Motivation',
      method: 'Method',
      loss: 'Mask-Guided Compound Loss',
      pruning: 'Geometry-Aware Multi-Metric Pruning',
      experiments: 'Experiments',
      results: 'Results',
      gallery: 'Visual gallery',
      contribution: 'My contribution',
      courseContext: 'Course context',
      future: 'Future improvements',
    },
    overview:
      'MOF3R is a segmentation-guided object-centric 3D reconstruction course project built on 3D Gaussian Splatting. It uses SAM2-generated foreground masks as semantic priors, introduces a Mask-Guided Compound Loss to suppress background fitting, and applies a geometry-aware multi-metric pruning strategy to remove floating Gaussians and boundary artifacts. Experiments on CO3Dv2 show cleaner object reconstructions with sharper boundaries and fewer background artifacts compared with vanilla 3DGS.',
    overviewBullets: [
      'Input monocular videos are processed with COLMAP for camera parameters and SAM2 for foreground masks.',
      'Foreground masks guide 3DGS training so that optimization focuses on target objects instead of cluttered backgrounds.',
      'A post-training pruning stage combines mask consistency, local density, anisotropy filtering, and adaptive shrinkage.',
      'The project evaluates object-centric reconstruction quality on representative CO3Dv2 sequences.',
    ],
    motivationIntro:
      'Casual mobile videos are attractive for creating 3D object assets, but cluttered backgrounds, limited viewpoints, and image degradations make vanilla 3DGS allocate Gaussian primitives to irrelevant regions.',
    motivationCards: [
      {
        title: 'Object assets from casual videos',
        items: [
          'The project targets clean 3D product or object assets from monocular video sequences.',
          'The report motivates this setting through applications in e-commerce, virtual reality, and digital content creation.',
        ],
      },
      {
        title: 'Limits of vanilla 3DGS',
        items: [
          'Standard 3DGS optimizes all pixels equally and may fit surrounding background regions.',
          'This can create floating artifacts, noisy geometry, and inaccurate object boundaries.',
        ],
      },
      {
        title: 'Semantic priors for reconstruction',
        items: [
          'SAM2 provides reliable video foreground masks from a prompt on the first frame.',
          'MOF3R uses these masks during optimization and geometric refinement instead of only as preprocessing.',
        ],
      },
    ],
    methodIntro:
      'The pipeline combines mask-guided optimization with geometry-aware refinement. It first obtains camera poses and object masks, then trains a 3DGS representation with foreground supervision, and finally removes residual artifacts with multi-metric pruning.',
    methodCards: [
      {
        title: 'Preprocessing',
        items: [
          'Extract frames from the input video sequence.',
          'Estimate camera intrinsics and extrinsics with COLMAP.',
          'Generate foreground masks with SAM2 using a first-frame prompt.',
        ],
      },
      {
        title: 'Mask-guided 3DGS training',
        items: [
          'Use SAM2 masks as foreground semantic priors.',
          'Apply mask-constrained L1 supervision to focus photometric training on the object.',
          'Use composite-image SSIM to preserve structural consistency near boundaries.',
        ],
      },
      {
        title: 'Geometry-aware refinement',
        items: [
          'Project Gaussians into visible views and vote with foreground masks.',
          'Analyze local KNN density and anisotropy to find outlier primitives.',
          'Apply adaptive shrinkage for uncertain boundary Gaussians.',
        ],
      },
    ],
    lossIntro:
      'The Mask-Guided Compound Loss restricts photometric supervision to foreground regions while keeping SSIM stable by evaluating structural consistency on a composite image.',
    lossCards: [
      {
        title: 'Mask-constrained L1 loss',
        tex: String.raw`\mathcal{L}_{\text{mask-L1}} = \left\| M \odot \left(I - \hat{I}\right) \right\|_1`,
        text: 'The foreground mask limits pixel-wise supervision to the target object and suppresses background fitting during optimization.',
      },
      {
        title: 'Composite-image SSIM loss',
        tex: String.raw`I_{\text{comp}} = M \odot \hat{I} + \left(1 - M\right) \odot I`,
        text: 'Rendered foreground pixels are blended with the original background before SSIM is computed, reducing boundary instability.',
      },
      {
        title: 'Compound objective',
        tex: String.raw`\mathcal{L} = \lambda_1 \mathcal{L}_{\text{mask-L1}} + \lambda_2 \mathcal{L}_{\text{mask-SSIM}}`,
        text: 'The final objective balances foreground photometric accuracy and structural consistency for cleaner object-centric 3DGS.',
      },
    ],
    lossHighlights: [
      'Foreground semantic prior from SAM2.',
      'Mask-constrained L1 supervision.',
      'Composite-image SSIM loss.',
      'Reduced background fitting during 3DGS optimization.',
    ],
    pruningIntro:
      'After reconstruction, MOF3R removes residual floating Gaussians and elongated boundary artifacts through a geometry-aware multi-metric pruning strategy.',
    pruningCards: [
      {
        title: 'Multi-view mask consistency',
        items: [
          'Project each Gaussian center into visible camera views.',
          'Check whether the projections fall inside foreground masks.',
          'Remove Gaussians that consistently vote as background across valid views.',
        ],
      },
      {
        title: 'Density and anisotropy filtering',
        items: [
          'Use K-nearest-neighbor neighborhoods to estimate local density.',
          'Identify low-density outliers and excessive anisotropy.',
          'Target stretched structures and trailing artifacts near object boundaries.',
        ],
      },
      {
        title: 'Adaptive shrinkage',
        items: [
          'Avoid deleting all uncertain boundary candidates immediately.',
          'Gradually reduce scale and opacity for lower-confidence primitives.',
          'Preserve fine geometry while smoothing noisy silhouettes.',
        ],
      },
    ],
    experimentsIntro:
      'The course project evaluates the method on CO3Dv2, focusing on real object sequences with diverse views, cluttered backgrounds, self-occlusions, and challenging shapes.',
    experimentCards: [
      {
        title: 'Dataset',
        items: [
          'CO3Dv2 multi-view video captures of real-world objects.',
          'Representative categories include Bowl, Teddy, and Apple.',
          'The report highlights thin-walled structures, self-occlusions, and complex geometries.',
        ],
      },
      {
        title: 'Baseline',
        items: [
          'Original 3D Gaussian Splatting trained directly on original video frames.',
          'No segmentation guidance is used in the baseline.',
          'The comparison focuses on object-centered reconstruction quality.',
        ],
      },
      {
        title: 'Metrics',
        items: [
          'PSNR and SSIM evaluate fidelity and structural similarity.',
          'LPIPS evaluates perceptual distance.',
          'The reported quantitative metrics are evaluated within foreground mask regions.',
        ],
      },
    ],
    resultsIntro:
      'The following numbers are course project experiment results reported in the project report, not publication claims. Compared with original 3DGS, mask-guided training and the full MOF3R pipeline improve foreground-region PSNR, SSIM, and LPIPS on representative CO3Dv2 sequences.',
    resultColumns: ['Method', 'PSNR ↑', 'SSIM ↑', 'LPIPS ↓'],
    resultRows: [
      ['Original 3DGS', '19.07', '0.592', '0.629'],
      ['Mask-Guided', '21.03', '0.931', '0.125'],
      ['MOF3R', '23.56', '0.935', '0.120'],
    ],
    resultHighlights: [
      'Average PSNR improves from 19.07 dB for original 3DGS to 23.56 dB for MOF3R.',
      'LPIPS is reduced from 0.629 to 0.120, indicating fewer perceptual artifacts in the evaluated foreground regions.',
      'Qualitative comparisons show cleaner boundaries, fewer floating artifacts, and less background fitting.',
      'The report notes particularly visible gains on Bowl, TeddyBear, and Apple scenes.',
    ],
    featuredVisual: {
      eyebrow: 'Qualitative Comparison',
      title: 'Key Visual Result',
      intro:
        'The qualitative comparison highlights the main visual effect of MOF3R: mask-guided training and geometry-aware pruning suppress background fitting, remove floating artifacts, and produce cleaner object-centric reconstructions.',
      src: '/projects/cs182/comparsion.png',
      alt: 'Qualitative comparison between original 3DGS, mask-guided reconstruction, and MOF3R with pruning.',
      caption:
        'Qualitative comparison between vanilla 3DGS, mask-guided reconstruction, and MOF3R. The full pipeline produces cleaner object boundaries and fewer floating artifacts.',
    },
    galleryIntro:
      'Selected figures copied from the CS182 project report assets. They show the pipeline and quantitative visualization.',
    gallery: [
      {
        src: '/projects/cs182/MOF3R_overview.png',
        alt: 'Overall pipeline of MOF3R with SAM2 masks, mask-guided 3DGS training, and pruning.',
        caption: 'Overall pipeline of MOF3R.',
      },
      {
        src: '/projects/cs182/comparsion.png',
        alt: 'Qualitative comparison between original 3DGS, mask-guided reconstruction, and MOF3R.',
        caption:
          'Qualitative comparison between vanilla 3DGS, mask-guided reconstruction, and the full MOF3R pipeline.',
      },
      {
        src: '/projects/cs182/result.png',
        alt: 'Quantitative comparison across representative CO3Dv2 sequences.',
        caption: 'Quantitative comparison across representative CO3Dv2 sequences.',
      },
    ],
    contribution:
      'The report lists Zidong Song, Boyang Zhou, and Zian Chen from ShanghaiTech University as co-first authors. On this personal site, I present MOF3R as a team CS182 course project and do not claim a finer individual task split beyond my participation as one of the report authors.',
    courseContext:
      'This work was completed as a course project for CS182: Introduction to Machine Learning at ShanghaiTech University in 2026. The page intentionally presents it as coursework rather than a published paper.',
    future: [
      'Tighter integration between segmentation and reconstruction.',
      'More robust geometric regularization.',
      'Better handling of transparent objects and reflective surfaces.',
      'Improved robustness for highly occluded object sequences.',
    ],
  },
} as const;
