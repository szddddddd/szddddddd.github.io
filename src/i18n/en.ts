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
    title: 'Academic Identity',
    intro:
      'I am an undergraduate Computer Science student at ShanghaiTech University, affiliated with VRVC Lab, building a research profile around visual computing, 3D reconstruction, and neural rendering.',
    bio:
      'I am an undergraduate student majoring in Computer Science at ShanghaiTech University and affiliated with VRVC Lab. My projects and coursework explore visual computing problems that connect geometry-aware reconstruction with learned representations.',
    profileTitle: 'Profile',
    identityTitle: 'Academic Identity',
    detailsTitle: 'Academic Details',
    interestsTitle: 'Research Interests',
    focusTitle: 'Current Focus / Research Direction',
    focusIntro:
      'My current direction centers on visual systems that recover, represent, and reason about 3D structure from images and learned scene representations.',
    focusItems: [
      'Geometry-aware 3D reconstruction pipelines for object-centric and scene-level understanding.',
      'Neural rendering and Gaussian Splatting methods that balance visual fidelity with structured geometry.',
      'World-model-style visual representations for connecting perception, generation, and spatial reasoning.',
    ],
    creativeTitle: 'Visual Computing / Creative Work',
    creativeIntro:
      'I also use creative coding and shader experiments to explore procedural image synthesis, motion, color, and pixel-level visual expression.',
    creativeItems: [
      'GLSL fragment shader artworks and procedural visual studies on Shadertoy.',
      'Course projects that connect visual computing ideas with practical systems and clean technical presentation.',
      'A visual portfolio style that keeps research content concise, reproducible, and easy to extend.',
    ],
    contactTitle: 'Contact',
    contactIntro: 'For research discussions, collaboration, or application materials, feel free to get in touch.',
    contactLabels: {
      email: 'Email',
      github: 'GitHub',
      cv: 'CV',
    },
  },
  projects: {
    eyebrow: 'Research / Projects',
    pageTitle: 'Projects',
    title: 'Research and Project Highlights',
    intro:
      'Selected academic, technical, and course-based projects in computer vision, 3D reconstruction, neural rendering, medical imaging, and creative coding.',
    fullTitle: 'Projects',
    fullIntro:
      'Academic, technical, and course-based projects spanning visual computing, medical imaging, and creative coding.',
    viewAll: 'View all projects',
    labels: {
      details: 'Project Page',
      shadertoy: 'Shadertoy',
      report: 'Report PDF',
      paper: 'Paper',
      code: 'Code',
      demo: 'Demo',
      readme: 'README',
      slides: 'Slides',
      role: 'Role',
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
    intro: 'Course projects have been merged into the Projects index.',
    empty: 'Course projects will be added later.',
    mergedTitle: 'Merged into Projects',
    mergedIntro: 'Course projects have been merged into Projects.',
    viewProjects: 'View Projects',
  },
  notes: {
    eyebrow: 'Notes / Blog',
    pageTitle: 'Notes / Blog',
    title: 'Notes',
    intro: 'A minimal writing space for future research notes, technical reflections, and reading summaries.',
    empty: 'Notes coming soon.',
  },
  si140a: {
    metaTitle: 'SI140A WeChat Red Envelope Probability Project — Song Zidong',
    metaDescription:
      'SI140A Probability Theory course project reverse engineering WeChat Red Envelope allocation mechanisms with controlled data collection, empirical visualization, Monte Carlo simulation, KS test, and Chi-square test.',
    hero: {
      eyebrow: 'Course Project / Probability Theory',
      title: 'Reverse Engineering the Mechanism of WeChat Red Envelope',
      subtitle:
        'A probability modeling and statistical testing project that infers candidate allocation mechanisms from controlled WeChat Red Envelope data.',
      affiliation: 'SI140A Probability Theory · Course Project · ShanghaiTech University · January 2026',
    },
    metadata: [
      'SI140A Probability Theory',
      'Course Project',
      'Probability Modeling',
      'Monte Carlo Simulation',
      'KS Test',
      'Chi-square Test',
      'January 2026',
    ],
    labels: {
      course: 'Course',
      type: 'Type',
      date: 'Date',
      topic: 'Topic',
      summary: 'Summary',
      setting: 'Setting',
      method: 'Method',
      model: 'Model',
      test: 'Statistical test',
      conclusion: 'Conclusion',
      contribution: 'Contribution',
      links: 'Links',
    },
    sections: {
      overview: 'Overview',
      setting: 'Experimental Setting',
      methodology: 'Methodology',
      models: 'Candidate Models',
      findings: 'Key Findings',
      contribution: 'My Contribution',
      visuals: 'Visuals',
      links: 'Links',
    },
    overview:
      'This project studies whether the probabilistic allocation behavior of WeChat Red Envelope can be inferred from real experimental observations. Under a controlled data-collection protocol, we collected allocation records, visualized the empirical distribution, designed candidate probabilistic mechanisms, and compared the simulated mechanisms with observed data using formal goodness-of-fit tests.',
    overviewBullets: [
      'The project is framed as a probability modeling and statistical inference study rather than a routine programming assignment.',
      'Empirical plots are used to identify distributional patterns across recipient ranks and total allocation samples.',
      'Candidate mechanisms are evaluated by Monte Carlo simulation and statistical tests against the observed allocation frequency.',
      'The analysis suggests that the Twice-as-the-Mean mechanism better matches the observed WeChat Red Envelope behavior.',
    ],
    settingCards: [
      { label: 'Amount per envelope', value: '60 RMB', note: 'fixed total allocation' },
      { label: 'Recipients', value: '15', note: 'people per red envelope' },
      { label: 'Red envelopes', value: '150', note: 'controlled experiment rounds' },
      { label: 'Samples', value: '2,250', note: 'allocation observations' },
    ],
    methodIntro:
      'The methodology combines empirical visualization, analytic mechanism design, simulation-based approximation, and hypothesis testing. The goal is not to exactly reproduce the implementation inside WeChat, but to determine which transparent probabilistic model is most consistent with the collected evidence.',
    methodCards: [
      {
        title: 'Data processing and visualization',
        items: [
          'Cleaned the allocation records into rank-wise and global samples.',
          'Examined histograms, boxplots, and scatter plots to summarize distributional behavior.',
        ],
      },
      {
        title: 'Candidate mechanism design',
        items: [
          'Formulated allocation rules with equal expected value across ranks.',
          'Derived expectation and variance properties for candidate mechanisms.',
        ],
      },
      {
        title: 'Monte Carlo simulation',
        items: [
          'Generated synthetic allocation samples under each candidate mechanism.',
          'Estimated theoretical frequency distributions for comparison with real data.',
        ],
      },
      {
        title: 'KS and Chi-square tests',
        items: [
          'Applied the Kolmogorov-Smirnov test to compare sample distributions.',
          'Applied a Chi-square test after frequency bin merging for expected-count validity.',
        ],
      },
      {
        title: 'Model comparison',
        items: [
          'Compared test statistics, p-values, and visual distributional patterns.',
          'Selected the mechanism with stronger empirical alignment and smaller deviations.',
        ],
      },
    ],
    modelsIntro:
      'Two primary candidate mechanisms were tested. The page summarizes their modeling ideas without reproducing the full derivations from the report.',
    modelCards: [
      {
        title: 'Gamma-Dirichlet Split',
        items: [
          'Samples allocation proportions through a Gamma / Dirichlet construction.',
          'Uses a concentration parameter to control variance while preserving target expectations.',
          'Provides analytic convenience, but its fitted distribution deviated significantly from the observed data.',
        ],
      },
      {
        title: 'Twice-as-the-Mean Mechanism',
        items: [
          'Sequentially allocates a random amount bounded by twice the current remaining mean.',
          'Keeps the expected value approximately balanced across recipient ranks.',
          'Naturally produces larger variance for later recipients, matching a key empirical pattern.',
        ],
      },
    ],
    findingsIntro:
      'The empirical and simulation results point to a clear qualitative conclusion: the Twice-as-the-Mean mechanism is closer to the observed WeChat Red Envelope distribution, while Gamma-Dirichlet Split produces a visibly and statistically different allocation pattern.',
    resultColumns: ['Model', 'KS p-value', 'Chi-square p-value', 'Interpretation'],
    resultRows: [
      ['Gamma-Dirichlet Split', '5.23e-6', '2.75e-69', 'Significant deviation'],
      ['Twice-as-the-Mean', '0.0869', '8.75e-11', 'Better empirical alignment'],
    ],
    findingBullets: [
      'All recipient ranks have roughly similar expected values, with an overall empirical mean of 4.00 RMB.',
      'Later recipient ranks exhibit larger variance and more extreme high-value observations.',
      'Gamma-Dirichlet Split differs significantly from the observed allocation frequency under both tests.',
      'Twice-as-the-Mean passes the KS test at the 5% level and has a much smaller Chi-square deviation than Gamma-Dirichlet Split.',
      'Further explorations considered user-specific allocation mechanisms and fairness-aware red envelope designs.',
    ],
    contributionBullets: [
      'Derived and verified the expectation and variance of candidate mechanisms.',
      'Organized and coordinated the experiment.',
      'Contributed to part of the implementation.',
      'Verified simulation results and statistical conclusions.',
    ],
    galleryIntro:
      'The figures below are web-optimized visuals extracted and redesigned from the project report, preserving the empirical histogram and rank-wise boxplot analysis without showing full PDF pages.',
    gallery: [
      {
        src: '/projects/si140a/total-histogram.png',
        alt: 'Total histogram of WeChat Red Envelope allocation samples with mean 4.00 RMB.',
        caption: 'Empirical total histogram over 2,250 allocation samples.',
      },
      {
        src: '/projects/si140a/rank-boxplots.png',
        alt: 'Boxplots of WeChat Red Envelope allocation amounts by recipient rank.',
        caption: 'Rank-wise boxplots showing comparable expected values and increasing tail behavior.',
      },
    ],
    linksIntro:
      'The full report contains the complete derivations, simulation code excerpts, statistical tests, and appendix materials. No code repository is linked because no public repository was provided for this project.',
    reportNote:
      'The PDF is provided as the original course report; the portfolio page intentionally omits raw teammate student IDs and other unnecessary personal identifiers.',
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
  bme1312Proj2: {
    metaTitle: 'HBA-VAN Glioma MRI Segmentation Project — Song Zidong',
    metaDescription:
      'BME1312 Artificial Intelligence in Medical Imaging course project on HBA-VAN, a hierarchical boundary-aware volumetric attention network for multi-modal BraTS-style glioma subregion segmentation.',
    hero: {
      eyebrow: 'Course Project / Medical Image Segmentation',
      title:
        'HBA-VAN: Hierarchical Boundary-Aware Volumetric Attention Network for Multi-Modal Glioma Subregion Segmentation',
      subtitle:
        'Boundary-aware 3D attention network for multi-modal BraTS glioma subregion segmentation.',
      affiliation: 'BME1312 Artificial Intelligence in Medical Imaging · Course Project · ShanghaiTech University · 2026',
    },
    metadata: [
      'BME1312',
      'Medical Imaging',
      'Brain Tumor Segmentation',
      '3D U-Net',
      'Attention',
      'BraTS',
      'WT / TC / ET',
    ],
    labels: {
      course: 'Course',
      type: 'Type',
      task: 'Task',
      modalities: 'Modalities',
      targetRegions: 'Target regions',
      summary: 'Summary',
      pipeline: 'Pipeline',
      result: 'Result',
      links: 'Links',
      context: 'Context',
    },
    sections: {
      overview: 'Overview',
      method: 'Method',
      results: 'Key Results',
      visuals: 'Visuals',
      contribution: 'My Contribution',
      links: 'Links and Assets',
      courseContext: 'Course Context',
    },
    overview:
      'This project addresses automatic glioma subregion segmentation from co-registered multi-modal brain MRI. The goal is to predict three clinically meaningful and anatomically nested target regions: whole tumor (WT), tumor core (TC), and enhancing tumor (ET). The portfolio page presents the work as a staged modeling study from 2D slice-wise segmentation to full 3D volumetric reasoning.',
    overviewBullets: [
      'T1, T1ce, T2, and FLAIR provide complementary signals for tumor extent, core structure, and enhancement.',
      'WT, TC, and ET form a nested multi-label hierarchy rather than mutually exclusive semantic classes.',
      'ET is usually small and sparse, producing severe class imbalance and unstable case-level Dice.',
      'Tumor boundaries are ambiguous, so HD95 and error maps are important alongside overlap metrics.',
    ],
    regionCards: [
      { label: 'WT', value: 'Whole Tumor', note: 'broad abnormal tumor extent' },
      { label: 'TC', value: 'Tumor Core', note: 'compact core and boundary-sensitive region' },
      { label: 'ET', value: 'Enhancing Tumor', note: 'small contrast-dependent enhancing component' },
    ],
    methodIntro:
      'The method is organized as a progressive pipeline. Each stage keeps the same WT / TC / ET multi-label task while increasing the amount of through-plane spatial evidence available to the model.',
    methodCards: [
      {
        title: 'Data preprocessing',
        items: [
          'Load co-registered NIfTI volumes for each patient.',
          'Stack T1, T1ce, T2, and FLAIR as four MRI input channels.',
          'Crop nonzero brain foreground to reduce redundant background.',
          'Apply per-modality z-score normalization within brain voxels.',
          'Construct WT / TC / ET multi-label masks from BraTS-style labels.',
          'Use patient-level train / validation / test splits to avoid slice leakage.',
        ],
      },
      {
        title: 'Task2 baseline',
        items: [
          'Train a 2D U-Net for slice-wise segmentation.',
          'Use one axial slice with four MRI modalities as input.',
          'Predict independent sigmoid masks for WT, TC, and ET.',
          'Use the 2D model as a strong reference rather than a weak baseline.',
        ],
      },
      {
        title: 'Task3 progression',
        items: [
          'Introduce 2.5D U-Net variants that use adjacent axial slices as local context.',
          'Evaluate whether neighboring slices help disambiguate TC and ET boundaries.',
          'Move from shallow depth context to full 3D volumetric feature learning.',
        ],
      },
      {
        title: 'Final model: HBA-VAN',
        items: [
          'Use a 3D residual encoder-decoder for volumetric reasoning.',
          'Apply attention-gated skip fusion, deep supervision, and boundary-aware auxiliary learning.',
          'Add an ET-specific refinement branch for the smallest subregion.',
          'Regularize predictions with the hierarchy ET ⊂ TC ⊂ WT.',
          'Reconstruct full-volume predictions with sliding-window inference.',
        ],
      },
    ],
    resultsIntro:
      'The final 3D HBA-VAN model improves both region overlap and boundary-sensitive evaluation. Compared with the 2D U-Net baseline, mean Dice increases from 0.8962 to 0.9167, while mean HD95 decreases from 6.6879 to 2.8165.',
    resultColumns: ['Method', 'Spatial Modeling', 'WT', 'TC', 'ET', 'Mean Dice', 'HD95'],
    resultRows: [
      ['Task2 U-Net', '2D', '0.9253', '0.9090', '0.8544', '0.8962', '6.6879'],
      ['Best 2.5D', '2.5D', '0.9381', '0.9224', '0.8667', '0.9091', '4.0447'],
      ['HBA-VAN', '3D', '0.9403', '0.9144', '0.8954', '0.9167', '2.8165'],
    ],
    resultHighlights: [
      'Mean Dice improves from 0.8962 for the 2D U-Net baseline to 0.9167 for HBA-VAN.',
      'Mean HD95 decreases from 6.6879 to 2.8165, indicating substantially better boundary localization.',
      'ET Dice improves from 0.8544 in Task2 U-Net to 0.8954 in HBA-VAN.',
      'The 2.5D model confirms the value of local inter-slice context, while full 3D modeling provides the best overall result.',
    ],
    metricCards: [
      { label: 'Mean Dice', value: '0.8962 → 0.9167', note: '2D U-Net to HBA-VAN' },
      { label: 'HD95', value: '6.6879 → 2.8165', note: 'lower boundary error' },
      { label: 'ET Dice', value: '0.8544 → 0.8954', note: 'small enhancing tumor gain' },
      { label: 'Spatial model', value: '2D → 2.5D → 3D', note: 'progressive context' },
    ],
    galleryIntro:
      'The figures below are cropped and web-optimized from the report and presentation materials, focusing on the actual diagrams and qualitative results rather than full-page screenshots.',
    gallery: [
      {
        src: '/projects/bme1312-proj2/multimodal-mri-segmentation.png',
        alt: 'Multi-modal MRI visualization with T1, T1ce, T2, FLAIR, and WT, TC, ET tumor masks.',
        caption: 'Multi-modal MRI visualization and nested WT / TC / ET target masks.',
      },
      {
        src: '/projects/bme1312-proj2/task2-unet-baseline.png',
        alt: 'Task2 2D U-Net slice-wise segmentation pipeline with sigmoid WT, TC, and ET outputs.',
        caption: 'Task2 baseline: 2D U-Net for four-channel axial slice segmentation.',
      },
      {
        src: '/projects/bme1312-proj2/hba-van-architecture.png',
        alt: 'HBA-VAN architecture with 3D residual encoder-decoder, attention gates, boundary head, ET refinement, hierarchy regularization, and sliding-window reconstruction.',
        caption: 'HBA-VAN architecture: volumetric attention, boundary learning, ET refinement, and hierarchy regularization.',
      },
      {
        src: '/projects/bme1312-proj2/cross-method-comparison.png',
        alt: 'Cross-method qualitative comparison among Task2 2D U-Net, 2.5D U-Net, and HBA-VAN with prediction and error maps.',
        caption: 'Cross-method qualitative comparison showing the progression from 2D to 2.5D to 3D segmentation.',
      },
      {
        src: '/projects/bme1312-proj2/ablation-error-map.png',
        alt: 'Ablation comparison showing 3D attention boundary model, HBA-VAN, and corresponding spatial error maps.',
        caption: 'Ablation and error-map visualization for ET refinement and boundary-aware prediction.',
      },
    ],
    contributionBullets: [
      'Contributed to the final project report and presentation material organization.',
      'Participated in result interpretation and qualitative analysis.',
      'Helped summarize the model design, experimental findings, and medical-imaging motivation.',
      'Integrated the project into a reproducible academic portfolio format.',
    ],
    linksIntro:
      'The original report and presentation slides are provided as static portfolio assets. No code link is shown because no public repository was provided for this project.',
    courseContext:
      'This was a team course project for BME1312 Artificial Intelligence in Medical Imaging. The webpage summarizes the technical work without displaying teammate student IDs, email addresses, or other unnecessary personal identifiers.',
  },
  si100b: {
    metaTitle: 'SI100B SAVE MY LINEAR ALGEBRA Pygame Project — Song Zidong',
    metaDescription:
      'SI100B: Introduction to Information Science and Technology final project on a Binding-of-Isaac-inspired 2D roguelike game implemented with Pygame, covering scene design, doors, obstacles, collision handling, NPC dialogue, resource UI, animation, and a final boss encounter.',
    hero: {
      eyebrow: 'Course Project / SI100B: Introduction to Information Science and Technology',
      title: 'SAVE MY LINEAR ALGEBRA: A Pygame Roguelike',
      subtitle:
        'A team-based Pygame final project for SI100B: Introduction to Information Science and Technology.',
      affiliation: 'SI100B: Introduction to Information Science and Technology · ShanghaiTech University · 2024 Fall',
    },
    authors: ['潘佑邦', '宋梓冬', '吴俊阳'],
    metadata: [
      'SI100B: Introduction to Information Science and Technology',
      'Pygame',
      'Python',
      '2D Roguelike Game',
      'Course Project',
      'Scene Design',
      'Collision System',
      'NPC Dialogue',
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
      report: 'Report',
    },
    sections: {
      overview: 'Overview',
      gameplay: 'Gameplay Design',
      systems: 'Implementation Design',
      reportDesign: 'Design Notes',
      contribution: 'My Contribution',
      gallery: 'Visual Gallery',
    },
    cover: {
      alt: 'Cropped gameplay cover showing the GURDY boss encounter.',
      caption: 'Optimized cover: centered boss-room gameplay crop used across the project cards and detail page.',
    },
    overview:
      'SAVE MY LINEAR ALGEBRA is the final project for SI100B: Introduction to Information Science and Technology. The game is a Pygame roguelike prototype inspired by The Binding of Isaac: the player controls Isaac, shoots tears, plants bombs, clears monsters, collects rewards, talks to NPCs, and ultimately defeats the boss. Isaac has limited health, so the game ends when HP reaches zero.',
    overviewBullets: [
      'The work is presented as a SI100B course final project rather than a commercial game.',
      'The game prototype and visual materials are explicitly inspired by The Binding of Isaac.',
      'Core play combines room exploration, shooting, bomb placement, monster clearing, NPC rewards, and a final boss fight.',
      'The report authors are listed as 潘佑邦, 宋梓冬, and 吴俊阳.',
    ],
    gameplayIntro:
      'The player loop is organized around room exploration and combat: Isaac starts from StartRoom, learns the controls, enters reward or combat rooms, unlocks doors by clearing enemies, and follows the boss-room hint toward the final encounter.',
    gameplayCards: [
      {
        title: 'Player control',
        items: [
          'W, A, S, and D move Isaac, with diagonal movement represented through the movement vector.',
          'Arrow keys fire tears in different directions, and tear attack can be strengthened during play.',
          'LShift accelerates movement, while E plants bombs that can damage enemies and also hurt Isaac.',
        ],
      },
      {
        title: 'Room progression',
        items: [
          'StartRoom introduces movement, attack, and bomb placement.',
          'Combat rooms close their doors during fights and reopen after all enemies are killed.',
          'Each run contains one BossRoom, and defeating the boss enters the win scene.',
        ],
      },
      {
        title: 'Rewards and failure state',
        items: [
          'Lucky Room provides a raffle machine that consumes coins and grants health, attack, or coin rewards.',
          'NPC Room lets players talk with Trainer or Merchant for hidden rewards or trades.',
          'Isaac dies and the game ends when health is depleted.',
        ],
      },
    ],
    systemIntro:
      'The implementation covers room scenes, door logic, obstacles, camera-like transitions, character behavior, a binary-tree map structure, collision handling, resource UI, NPC decision logic, menu scenes, and audio feedback.',
    systemCards: [
      {
        title: 'Scenes, doors, and transitions',
        items: [
          'The game uses StartRoom, reward rooms, combat rooms, and one BossRoom.',
          'Doors can appear on four sides, and door types determine the next room type.',
          'Room switching uses transition animation with a camera-follow effect between scenes.',
        ],
      },
      {
        title: 'Map and room generation',
        items: [
          'A binary tree stores the room structure, with StartRoom as the root.',
          'The map extends rightward and downward for four layers, producing 15 rooms.',
          'The BossRoom is guaranteed to appear on the fourth layer, and each node keeps parent and child information for iteration and backtracking.',
        ],
      },
      {
        title: 'Obstacles and collision',
        items: [
          'Rooms include Rock and Shit obstacles with different destruction rules.',
          'Combat rooms randomize Rock positions and Shit patterns.',
          'Collision handling covers player-scene, projectile-scene, projectile-enemy, player-enemy, NPC, and item interactions, including pixel-level mask collision.',
        ],
      },
      {
        title: 'NPC, resources, and feedback',
        items: [
          'Trainer asks math questions and can heal Isaac or strengthen attack patterns.',
          'Merchant trades coins or HP for healing, bombs, attack boosts, and attack-speed boosts.',
          'Health, coins, attack, bombs, and boss-room hints are updated in the UI, while actions trigger animations and sounds.',
        ],
      },
    ],
    reportIntro:
      'The project design includes scenes, doors, obstacles, collisions, character logic, NPC dialogue, resources, UI, menu animation, BGM, and hidden effects.',
    reportCards: [
      {
        title: 'Character and boss design',
        items: [
          'Normal enemies move around and damage the player on collision.',
          'Bug has normal and sprint states, while Fly moves irregularly.',
          'Gurdy has 100 HP, summons flies, fires bullets toward the player, and is implemented with separated body and attack classes.',
        ],
      },
      {
        title: 'NPC / LLM agent system',
        items: [
          'Players approach NPCs and press Q to enter the chatbox.',
          'Dialogue history and current player state are passed into the NPC decision process.',
          'Trainer and Merchant produce different rewards, penalties, or trades based on dialogue and resources.',
        ],
      },
      {
        title: 'UI, hints, and hidden effects',
        items: [
          'The UI updates health, coin, attack, and bomb values in real time.',
          'A boss-room hint helps the player infer the path to the BossRoom.',
          'Bomb self-damage can trigger a hidden split-body effect where Isaac’s head floats irregularly.',
        ],
      },
      {
        title: 'Code organization',
        items: [
          'The report describes modular object-oriented implementation.',
          'GameManager acts as the main control module, while Characters, Scenes, TmpTools, and UI folders separate responsibilities.',
          'Main.py and Statics.py are placed at the project root for running and shared data.',
        ],
      },
    ],
    contributionIntro:
      'My contribution focused on enemy logic, game management, animations, UI/scenes, and README documentation as part of the team project.',
    contributionBullets: ['Enemies.py', 'GameManager.py', 'Animations', 'UI / Scenes', 'README.md'],
    galleryIntro:
      'Selected in-game screenshots and design diagrams from the project materials are shown below.',
    gallery: [
      {
        src: '/projects/si100b/report-main-menu.png',
        alt: 'Screenshot of the animated start menu.',
        caption: 'Project screenshot: animated main menu scene.',
      },
      {
        src: '/projects/si100b/report-boss-room.png',
        alt: 'Screenshot of the GURDY boss room with health UI and boss-room hint.',
        caption: 'Project screenshot: GURDY boss encounter with health, resources, and boss-room hint.',
      },
      {
        src: '/projects/si100b/report-obstacle-room.png',
        alt: 'Screenshot showing room obstacles and combat-room layout.',
        caption: 'Project screenshot: combat room with randomized obstacle layout.',
      },
      {
        src: '/projects/si100b/report-map-generation.png',
        alt: 'Diagram of the binary-tree room generation structure.',
        caption: 'Design diagram: binary-tree room structure from Start Room to Boss Room.',
      },
      {
        src: '/projects/si100b/report-npc-chat.png',
        alt: 'Screenshot of the NPC dialogue interface.',
        caption: 'Project screenshot: NPC dialogue and merchant decision interface.',
      },
      {
        src: '/projects/si100b/report-ui.png',
        alt: 'Screenshot of the health, coin, attack, and bomb UI.',
        caption: 'Project screenshot: resource UI for health, coin, attack, and bomb state.',
      },
    ],
  },
  arts1308: {
    metaTitle: 'ARTS1308 Shader Art Collection — Song Zidong',
    metaDescription:
      'ARTS1308 Pixel Shading Art course project collecting GLSL fragment shader artworks created on Shadertoy by Song Zidong.',
    hero: {
      eyebrow: 'Course Project / ARTS1308 Pixel Shading Art',
      title: 'Shader Art Experiments on Shadertoy',
      subtitle:
        'A collection of GLSL fragment shader artworks exploring procedural visual generation, color, motion, and pixel-level image synthesis.',
      affiliation: 'ARTS1308 Pixel Shading Art · Course Project · ShanghaiTech University',
    },
    metadata: [
      'ARTS1308 Course Project',
      'Shader Art Collection',
      'Creative Coding',
      'Pixel Shading Art',
      'GLSL / Shadertoy',
    ],
    labels: {
      course: 'Course',
      type: 'Type',
      context: 'Context',
      account: 'Account',
      works: 'Works',
      stats: 'Views / Likes',
      openShader: 'Open on Shadertoy',
      profile: 'View Shadertoy Profile',
      embed: 'Optional interactive embed',
      loadEmbed: 'Load paused Shadertoy embed',
      shaderId: 'Shader ID',
    },
    sections: {
      overview: 'Overview',
      gallery: 'Visual Gallery',
    },
    overview:
      'This project collects my shader artworks created in the ARTS1308 Pixel Shading Art course. Instead of relying on traditional image assets, the works are generated through code, mathematical functions, color operations, procedural patterns, and time-dependent transformations in GLSL.',
    overviewBullets: [
      'Course project and creative coding portfolio, not a commercial project.',
      'All works are fragment-shader experiments published under the Shadertoy account szd.',
      'The gallery uses real Shadertoy thumbnails from the original shader pages.',
      'Interactive embeds are optional and are loaded only after opening an individual work.',
    ],
    galleryIntro:
      'Selected works from the Shadertoy profile sorted by popularity. Each card keeps the original Shadertoy title, shader link, thumbnail, and visible view / like counts.',
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
      authors: 'Authors',
      summary: 'Summary',
      method: 'Method',
      metricChanges: 'Course project metrics',
    },
    sections: {
      overview: 'Overview',
      method: 'Method',
      loss: 'Mask-Guided Compound Loss',
      pruning: 'Geometry-Aware Multi-Metric Pruning',
      experiments: 'Experiments and Results',
      gallery: 'Visual Results',
    },
    overview:
      'MOF3R is a segmentation-guided object-centric 3D reconstruction course project built on 3D Gaussian Splatting. It uses SAM2-generated foreground masks as semantic priors, optimizes 3DGS with a foreground-aware compound loss, and applies geometry-aware pruning to remove floating Gaussians and boundary artifacts. Experiments on CO3Dv2 show cleaner object reconstructions with sharper boundaries and fewer background artifacts than vanilla 3DGS.',
    overviewBullets: [
      'Input monocular videos are processed with COLMAP for camera parameters and SAM2 for foreground masks.',
      'Foreground masks guide 3DGS training so optimization focuses on target objects instead of cluttered backgrounds.',
      'Post-training refinement combines mask consistency, local density, anisotropy filtering, and adaptive shrinkage.',
      'The project evaluates object-centric reconstruction quality on representative CO3Dv2 sequences.',
    ],
    methodIntro:
      'The method is organized as a compact three-stage pipeline: camera and mask preprocessing, mask-guided 3DGS optimization, and geometry-aware pruning for residual artifacts.',
    methodCards: [
      {
        title: 'Preprocessing with COLMAP and SAM2',
        items: [
          'Extract frames from the input video sequence.',
          'Estimate camera intrinsics and extrinsics with COLMAP.',
          'Generate foreground masks with SAM2 using a first-frame prompt.',
        ],
      },
      {
        title: 'Mask-guided 3DGS optimization',
        items: [
          'Use SAM2 masks as foreground semantic priors.',
          'Apply mask-constrained L1 supervision to focus photometric training on the object.',
          'Use composite-image SSIM to preserve structural consistency near boundaries.',
        ],
      },
      {
        title: 'Geometry-aware pruning',
        items: [
          'Project Gaussians into visible views and vote with foreground masks.',
          'Analyze local KNN density and anisotropy to identify outlier primitives.',
          'Shrink or remove uncertain Gaussians to smooth silhouettes while preserving object detail.',
        ],
      },
    ],
    lossIntro:
      'The compound objective combines a mask-constrained L1 term with composite-image SSIM so foreground reconstruction improves without encouraging the model to fit background clutter.',
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
      'SAM2 foreground masks provide semantic supervision.',
      'Mask-constrained L1 focuses pixel loss on the object.',
      'Composite-image SSIM stabilizes boundary structure.',
      'The objective reduces background fitting during 3DGS optimization.',
    ],
    pruningIntro:
      'After reconstruction, MOF3R removes residual floating Gaussians and elongated boundary artifacts through a multi-metric pruning pass.',
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
      'Experiments use CO3Dv2 object sequences, compare against original 3D Gaussian Splatting, and report foreground-mask PSNR, SSIM, and LPIPS. The numbers below are course project results from representative real object sequences rather than publication claims.',
    resultColumns: ['Method', 'PSNR ↑', 'SSIM ↑', 'LPIPS ↓'],
    resultRows: [
      ['Original 3DGS', '19.07', '0.592', '0.629'],
      ['Mask-Guided', '21.03', '0.931', '0.125'],
      ['MOF3R', '23.56', '0.935', '0.120'],
    ],
    resultHighlights: [
      'PSNR improves from 19.07 dB for original 3DGS to 23.56 dB for MOF3R.',
      'SSIM increases from 0.592 to 0.935, indicating stronger foreground structural consistency.',
      'LPIPS decreases from 0.629 to 0.120, matching the reduction in visible perceptual artifacts.',
    ],
    galleryIntro:
      'A single visual section collects the core pipeline, qualitative reconstruction comparison, and quantitative comparison from the project report.',
    gallery: [
      {
        src: '/projects/cs182/MOF3R_overview.png',
        alt: 'Overall pipeline of MOF3R with SAM2 masks, mask-guided 3DGS training, and pruning.',
        caption: 'Overall pipeline.',
      },
      {
        src: '/projects/cs182/comparsion.png',
        alt: 'Qualitative comparison between original 3DGS, mask-guided reconstruction, and MOF3R.',
        caption: 'Qualitative reconstruction comparison.',
      },
      {
        src: '/projects/cs182/result.png',
        alt: 'Quantitative comparison across representative CO3Dv2 sequences.',
        caption: 'Quantitative comparison.',
      },
    ],
  },
} as const;
