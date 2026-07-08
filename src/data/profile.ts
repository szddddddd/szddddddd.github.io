export type Lang = 'en' | 'zh';

export type LocalizedText = Record<Lang, string>;
export type LinkValue = string | LocalizedText;

export type ProjectLinkSet = {
  details?: LinkValue;
  report?: LinkValue;
  paper?: LinkValue;
  code?: LinkValue;
  demo?: LinkValue;
};

export type Project = {
  title: LocalizedText;
  type?: LocalizedText;
  course?: string;
  year: string;
  description: LocalizedText;
  tags: string[];
  image: string;
  links: ProjectLinkSet;
};

export type Publication = {
  title: string;
  authors: string;
  venue: string;
  year: string;
  paperUrl: string;
  codeUrl: string;
  bibtex: string;
  doi: string;
};

export type CourseProject = Project;

export const si100bCourseProject: CourseProject = {
  title: {
    en: 'SAVE MY LINEAR ALGEBRA: A Pygame Roguelike',
    zh: 'SAVE MY LINEAR ALGEBRA：Pygame Roguelike 游戏项目',
  },
  type: {
    en: '2D Roguelike Game',
    zh: '2D Roguelike 游戏',
  },
  course: 'SI100B: Introduction to Information Science and Technology',
  year: '2024 Fall',
  description: {
    en:
      'A SI100B: Introduction to Information Science and Technology final project implemented with Pygame, featuring Isaac-style room exploration, shooting, bombs, obstacle and collision systems, NPC dialogue, resource UI, and a final boss encounter.',
    zh:
      '一个使用 Pygame 实现的 SI100B: Introduction to Information Science and Technology 期末项目，包含 Isaac 式房间探索、射击、炸弹、障碍物与碰撞系统、NPC 对话、资源 UI 和最终 Boss 战。',
  },
  tags: ['SI100B', 'Pygame', 'Python', 'Roguelike', 'Game Development', 'Course Project'],
  image: '/projects/si100b/report-main-menu.png',
  links: {
    details: {
      en: '/projects/si100b',
      zh: '/zh/projects/si100b',
    },
    report: '/projects/si100b/report.pdf',
    code: 'https://github.com/TossACoinTAC/Team-SAVE-MY-LINEAR-ALGEBRA',
  },
};

export const bme1312CourseProject: CourseProject = {
  title: {
    en: 'Multi-contrast MRI Reconstruction from Undersampled Data',
    zh: '基于欠采样数据的多对比度 MRI 重建',
  },
  type: {
    en: 'Course Project',
    zh: '课程项目',
  },
  course: 'BME1312: Applications of Artificial Intelligence in Medical Imaging',
  year: '2026',
  description: {
    en:
      'Deep learning-based accelerated MRI reconstruction using U-Net baselines, multi-modal fusion, unrolled data consistency, wavelet loss, and perceptual objectives.',
    zh:
      '基于深度学习的 MRI 加速重建课程项目，涉及 U-Net baseline、多模态融合、unrolled data consistency、wavelet loss 与 perceptual objectives。',
  },
  tags: [
    'Medical Imaging',
    'MRI Reconstruction',
    'Deep Learning',
    'U-Net',
    'Unrolled Network',
    'Data Consistency',
  ],
  image: '/projects/bme1312/qualitative-comparison.png',
  links: {
    details: {
      en: '/projects/bme1312',
      zh: '/zh/projects/bme1312',
    },
    report: '/projects/bme1312/bme1312-mri-reconstruction-report.pdf',
    code: '',
  },
};

export const cs182CourseProject: CourseProject = {
  title: {
    en: 'MOF3R: Mask-Guided 3D Product Reconstruction',
    zh: 'MOF3R：基于 SAM2 与 3DGS 的 Mask-Guided 三维商品重建',
  },
  type: {
    en: 'Course Project',
    zh: '课程项目',
  },
  course: 'CS182: Introduction to Machine Learning',
  year: '2026',
  description: {
    en:
      'A CS182 course project for object-centric 3D reconstruction using SAM2-guided masks, 3D Gaussian Splatting, and geometry-aware Gaussian pruning.',
    zh:
      'CS182《机器学习引论》课程项目，使用 SAM2 前景分割、3D Gaussian Splatting 与几何感知 Gaussian pruning 进行物体中心三维重建。',
  },
  tags: ['CS182', '3DGS', 'SAM2', 'Object-Centric Reconstruction', 'CO3Dv2'],
  image: '/projects/cs182/MOF3R_overview.png',
  links: {
    details: {
      en: '/projects/cs182',
      zh: '/zh/projects/cs182',
    },
    report: '/projects/cs182/report.pdf',
    code: '',
  },
};

export const profile = {
  nameZh: '宋梓冬',
  nameEn: 'Song Zidong',
  githubUsername: 'szddddddd',
  email: 'songzd2024@shanghaitech.edu.cn',
  githubUrl: 'https://github.com/szddddddd',
  role: 'Undergraduate Student',
  university: 'ShanghaiTech University',
  lab: 'VRVC Lab',
  major: 'Computer Science',
  display: {
    en: {
      name: 'Song Zidong',
      alternateName: '宋梓冬',
      role: 'Undergraduate Student',
      university: 'ShanghaiTech University',
      major: 'Computer Science',
    },
    zh: {
      name: '宋梓冬',
      alternateName: 'Song Zidong',
      role: '本科生',
      university: '上海科技大学',
      major: '计算机科学',
    },
  },
  researchInterests: [
    'Computer Vision',
    '3D Reconstruction',
    'Gaussian Splatting',
    'Neural Rendering',
    'World Models',
  ],
  cv: {
    label: 'Coming soon',
    url: '',
  },
  projects: [
    cs182CourseProject,
    bme1312CourseProject,
    si100bCourseProject,
  ] satisfies Project[],
  publications: [] satisfies Publication[],
  courseProjects: [cs182CourseProject, bme1312CourseProject, si100bCourseProject] satisfies CourseProject[],
};
