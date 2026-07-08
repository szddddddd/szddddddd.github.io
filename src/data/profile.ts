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
    report: '',
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
    'World Models',
    'Neural Rendering',
    'Generative World Models',
  ],
  cv: {
    label: 'Coming soon',
    url: '',
  },
  projects: [
    bme1312CourseProject,
    {
      title: {
        en: 'Gaussian Splatting Project',
        zh: 'Gaussian Splatting 项目',
      },
      year: 'Coming soon',
      description: {
        en: 'Coming soon. Project details will be added later.',
        zh: '即将更新。项目细节将后续补充。',
      },
      tags: ['Gaussian Splatting', 'Rendering'],
      image: '',
      links: {
        paper: '',
        code: '',
        demo: '',
      },
    },
    {
      title: {
        en: 'World Models Project',
        zh: 'World Models 项目',
      },
      year: 'Coming soon',
      description: {
        en: 'Coming soon. Project details will be added later.',
        zh: '即将更新。项目细节将后续补充。',
      },
      tags: ['World Models', 'Generative Models'],
      image: '',
      links: {
        paper: '',
        code: '',
        demo: '',
      },
    },
  ] satisfies Project[],
  publications: [] satisfies Publication[],
  courseProjects: [bme1312CourseProject] satisfies CourseProject[],
};
