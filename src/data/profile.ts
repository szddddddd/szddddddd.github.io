export type Lang = 'en' | 'zh';

export type LocalizedText = Record<Lang, string>;
export type LinkValue = string | LocalizedText;

export type ProjectLinkSet = {
  details?: LinkValue;
  shadertoy?: LinkValue;
  report?: LinkValue;
  slides?: LinkValue;
  paper?: LinkValue;
  code?: LinkValue;
  demo?: LinkValue;
  readme?: LinkValue;
};

export type Project = {
  title: LocalizedText;
  type?: LocalizedText;
  course?: string | LocalizedText;
  year: string;
  description: LocalizedText;
  role?: LocalizedText;
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
  image: '/projects/si100b/cover.png',
  links: {
    details: {
      en: '/projects/si100b',
      zh: '/zh/projects/si100b',
    },
    report: '/projects/si100b/report.pdf',
    code: 'https://github.com/TossACoinTAC/Team-SAVE-MY-LINEAR-ALGEBRA',
    readme: 'https://github.com/TossACoinTAC/Team-SAVE-MY-LINEAR-ALGEBRA#readme',
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

export const bme1312Proj2CourseProject: CourseProject = {
  title: {
    en: 'HBA-VAN for Glioma MRI Segmentation',
    zh: 'HBA-VAN 多模态脑胶质瘤 MRI 分割',
  },
  type: {
    en: 'Course Project / Medical Image Segmentation / Deep Learning',
    zh: '课程项目 / 医学影像分割 / 深度学习',
  },
  course: 'BME1312 Artificial Intelligence in Medical Imaging',
  year: '2026',
  description: {
    en:
      'Boundary-aware 3D attention network for multi-modal BraTS glioma subregion segmentation.',
    zh:
      '面向 BraTS 风格多模态脑胶质瘤子区域分割的边界感知 3D attention network。',
  },
  role: {
    en:
      'Report writing, result analysis, project presentation integration',
    zh:
      '报告撰写、结果分析、项目展示材料整合',
  },
  tags: ['Medical Imaging', 'Brain Tumor Segmentation', '3D U-Net', 'Attention', 'BraTS'],
  image: '/projects/bme1312-proj2/hba-van-architecture.png',
  links: {
    details: {
      en: '/projects/bme1312-proj2',
      zh: '/zh/projects/bme1312-proj2',
    },
    report: '/projects/bme1312-proj2/hba-van-report.pdf',
    slides: '/projects/bme1312-proj2/hba-van-slides.pptx',
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

export const arts1308CourseProject: CourseProject = {
  title: {
    en: 'Shader Art Experiments on Shadertoy',
    zh: 'ARTS1308 像素着色艺术：Shadertoy 作品集',
  },
  type: {
    en: 'Creative Coding / Shader Art',
    zh: '创意编程 / Shader Art',
  },
  course: {
    en: 'ARTS1308 Pixel Shading Art · Course Project',
    zh: 'ARTS1308 像素着色艺术 · 课程项目',
  },
  year: 'ARTS1308',
  description: {
    en:
      'A collection of GLSL fragment shader artworks created on Shadertoy, exploring procedural image synthesis, motion, color, and pixel-level visual expression.',
    zh:
      '一个基于 Shadertoy 的 GLSL fragment shader 课程作品集，探索程序化图像生成、运动、色彩与像素级视觉表达。',
  },
  tags: [
    'ARTS1308',
    'Shadertoy',
    'GLSL',
    'Shader Art',
    'Creative Coding',
    'Procedural Visuals',
    'Pixel Shading',
  ],
  image: '/projects/arts1308/shader-06.jpg',
  links: {
    details: {
      en: '/projects/arts1308',
      zh: '/zh/projects/arts1308',
    },
    shadertoy: 'https://www.shadertoy.com/user/szd/sort=popular&from=0&num=8',
  },
};

export const si140aCourseProject: CourseProject = {
  title: {
    en: 'Reverse Engineering WeChat Red Envelope',
    zh: '微信红包机制逆向工程',
  },
  type: {
    en: 'Course Project / Probability Modeling / Statistical Testing',
    zh: '课程项目 / 概率建模 / 统计检验',
  },
  course: 'SI140A Probability Theory',
  year: 'January 2026',
  description: {
    en:
      'Probabilistic modeling and statistical testing of WeChat Red Envelope allocation mechanisms under controlled experimental data.',
    zh:
      '基于受控实验数据，对微信红包金额分配机制进行概率建模、蒙特卡洛仿真与统计检验。',
  },
  role: {
    en:
      'Mathematical derivation, experiment organization, partial implementation, simulation verification',
    zh:
      '数学推导、实验组织、部分实现、仿真验证',
  },
  tags: ['Probability Theory', 'Monte Carlo Simulation', 'Statistical Testing', 'Data Analysis'],
  image: '/projects/si140a/cover.png',
  links: {
    details: {
      en: '/projects/si140a',
      zh: '/zh/projects/si140a',
    },
    report: '/projects/si140a/report.pdf',
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
    bme1312Proj2CourseProject,
    si140aCourseProject,
    si100bCourseProject,
    arts1308CourseProject,
  ] satisfies Project[],
  publications: [] satisfies Publication[],
  courseProjects: [
    cs182CourseProject,
    bme1312CourseProject,
    bme1312Proj2CourseProject,
    si140aCourseProject,
    si100bCourseProject,
    arts1308CourseProject,
  ] satisfies CourseProject[],
};
