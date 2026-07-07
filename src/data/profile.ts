export type Lang = 'en' | 'zh';

export type LocalizedText = Record<Lang, string>;

export type ProjectLinkSet = {
  paper: string;
  code: string;
  demo: string;
};

export type Project = {
  title: LocalizedText;
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

export type CourseProject = {
  title: LocalizedText;
  course: string;
  year: string;
  description: LocalizedText;
  tags: string[];
  links: {
    report: string;
    code: string;
    demo: string;
  };
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
    {
      title: {
        en: '3D Vision Project',
        zh: '3D Vision 项目',
      },
      year: 'Coming soon',
      description: {
        en: 'Coming soon. Project details will be added later.',
        zh: '即将更新。项目细节将后续补充。',
      },
      tags: ['3D Vision', 'Reconstruction'],
      image: '',
      links: {
        paper: '',
        code: '',
        demo: '',
      },
    },
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
  courseProjects: [] satisfies CourseProject[],
};
