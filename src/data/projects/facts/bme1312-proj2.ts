import { defineProject } from '../projectSchema';

export default defineProject({
  id: 'bme1312-proj2',
  number: '07',
  slug: 'bme1312-proj2',
  sortOrder: 70,
  featured: true,
  isPublic: true,
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
  summary: {
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
  categories: ['medical-imaging', 'coursework'],
  displayTags: [
    { en: 'Medical Imaging', zh: '医学影像' },
    { en: '3D U-Net', zh: '3D U-Net' },
    { en: 'Attention', zh: '注意力机制' },
  ],
  allTags: ['Medical Imaging', 'Brain Tumor Segmentation', '3D U-Net', 'Attention', 'BraTS'],
  tags: ['Medical Imaging', 'Brain Tumor Segmentation', '3D U-Net', 'Attention', 'BraTS'],
  image: '/projects/bme1312-proj2/hba-van-architecture.png',
  cover: {
    src: '/projects/bme1312-proj2/hba-van-architecture.png',
    alt: {
      en: 'HBA-VAN architecture for multi-modal glioma MRI segmentation.',
      zh: '用于多模态脑胶质瘤 MRI 分割的 HBA-VAN 网络结构。',
    },
  },
  spatialAccent: '#e7c46a',
  links: {
    details: {
      en: '/projects/bme1312-proj2/',
      zh: '/zh/projects/bme1312-proj2/',
    },
    report: '/projects/bme1312-proj2/hba-van-report.pdf',
    slides: '/projects/bme1312-proj2/hba-van-slides.pptx',
  },
});
