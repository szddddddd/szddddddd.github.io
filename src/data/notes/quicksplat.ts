import { defineNote } from '../noteSchema';

export default defineNote({
  id: 'quicksplat-paper-analysis',
  publishedAt: '2025-05-08',
  format: { en: 'Paper analysis', zh: '论文深度解析' },
  title: {
    en: 'QuickSplat: Fast 3D Surface Reconstruction via Learned Gaussian Initialization',
    zh: 'QuickSplat：通过学习式高斯初始化加速三维表面重建',
  },
  summary: {
    en: 'An academic reading of QuickSplat, covering learned Gaussian initialization, gradient-aware densification, iterative sparse-UNet optimization, ScanNet++ evidence, code correspondence, and reproducibility limits.',
    zh: '从学习式 Gaussian 初始化、梯度感知 densifier、稀疏 UNet 迭代优化，到 ScanNet++ 证据、源码对应关系与复现边界，系统拆解 QuickSplat。',
  },
  topics: {
    en: ['3D reconstruction', 'Gaussian splatting', 'Learned optimization', 'Computer vision'],
    zh: ['三维重建', '高斯泼溅', '学习式优化', '计算机视觉'],
  },
  href: '/paper-analysis/quicksplat/',
});
