import { defineProject } from '../projectSchema';

export default defineProject({
  id: 'bme1312',
  number: '05',
  slug: 'bme1312',
  sortOrder: 50,
  featured: true,
  isPublic: true,
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
  summary: {
    en:
      'Deep learning-based accelerated MRI reconstruction using U-Net baselines, multi-modal fusion, unrolled data consistency, wavelet loss, and perceptual objectives.',
    zh:
      '基于深度学习的 MRI 加速重建课程项目，涉及 U-Net baseline、多模态融合、unrolled data consistency、wavelet loss 与 perceptual objectives。',
  },
  categories: ['medical-imaging', 'coursework'],
  displayTags: [
    { en: 'Medical Imaging', zh: '医学影像' },
    { en: 'MRI Reconstruction', zh: 'MRI 重建' },
    { en: 'Deep Learning', zh: '深度学习' },
  ],
  allTags: [
    'Medical Imaging',
    'MRI Reconstruction',
    'Deep Learning',
    'U-Net',
    'Unrolled Network',
    'Data Consistency',
  ],
  tags: [
    'Medical Imaging',
    'MRI Reconstruction',
    'Deep Learning',
    'U-Net',
    'Unrolled Network',
    'Data Consistency',
  ],
  image: '/projects/bme1312/qualitative-comparison.png',
  cover: {
    src: '/projects/bme1312/qualitative-comparison.png',
    alt: {
      en: 'Qualitative comparison between aliased input, ground truth, baseline, and proposed MRI reconstruction.',
      zh: '欠采样输入、真实图像、基线与改进 MRI 重建结果的定性对比。',
    },
  },
  spatialAccent: '#e7c46a',
  links: {
    details: {
      en: '/projects/bme1312/',
      zh: '/zh/projects/bme1312/',
    },
    report: '/projects/bme1312/bme1312-mri-reconstruction-report.pdf',
  },
});
