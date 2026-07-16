import { defineProject } from '../projectSchema';

export default defineProject({
  id: 'si140a',
  number: '06',
  slug: 'si140a',
  sortOrder: 60,
  featured: false,
  isPublic: true,
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
  summary: {
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
  categories: ['coursework'],
  displayTags: [
    { en: 'Probability Theory', zh: '概率论' },
    { en: 'Monte Carlo', zh: '蒙特卡洛' },
    { en: 'Statistical Testing', zh: '统计检验' },
  ],
  allTags: ['Probability Theory', 'Monte Carlo Simulation', 'Statistical Testing', 'Data Analysis'],
  tags: ['Probability Theory', 'Monte Carlo Simulation', 'Statistical Testing', 'Data Analysis'],
  image: '/projects/si140a/cover.png',
  cover: {
    src: '/projects/si140a/cover.png',
    alt: {
      en: 'WeChat Red Envelope allocation analysis visualization.',
      zh: '微信红包金额分配机制分析可视化。',
    },
  },
  spatialAccent: '#77e0f5',
  links: {
    details: {
      en: '/projects/si140a/',
      zh: '/zh/projects/si140a/',
    },
    report: '/projects/si140a/report.pdf',
  },
});
