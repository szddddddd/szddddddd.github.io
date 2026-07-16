import { defineProject } from '../projectSchema';

export default defineProject({
  id: 'cs182',
  number: '04',
  slug: 'cs182',
  sortOrder: 40,
  featured: true,
  isPublic: true,
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
  summary: {
    en:
      'A CS182 course project for object-centric 3D reconstruction using SAM2-guided masks, 3D Gaussian Splatting, and geometry-aware Gaussian pruning.',
    zh:
      'CS182《机器学习引论》课程项目，使用 SAM2 前景分割、3D Gaussian Splatting 与几何感知 Gaussian pruning 进行物体中心三维重建。',
  },
  categories: ['3d-vision', 'coursework'],
  displayTags: [
    { en: '3D Vision', zh: '三维视觉' },
    { en: 'Gaussian Splatting', zh: '高斯泼溅' },
    { en: 'SAM2', zh: 'SAM2' },
  ],
  allTags: ['CS182', '3DGS', 'SAM2', 'Object-Centric Reconstruction', 'CO3Dv2'],
  tags: ['CS182', '3DGS', 'SAM2', 'Object-Centric Reconstruction', 'CO3Dv2'],
  image: '/projects/cs182/MOF3R_overview.png',
  cover: {
    src: '/projects/cs182/MOF3R_overview.png',
    alt: {
      en: 'MOF3R pipeline showing SAM2 masks, mask-guided Gaussian Splatting, and geometry-aware pruning.',
      zh: 'MOF3R 流程图，包含 SAM2 掩码、掩码引导的高斯泼溅训练与几何感知 pruning。',
    },
  },
  spatialAccent: '#8b7cff',
  links: {
    details: {
      en: '/projects/cs182/',
      zh: '/zh/projects/cs182/',
    },
    report: '/projects/cs182/report.pdf',
  },
});
