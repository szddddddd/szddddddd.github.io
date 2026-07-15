import { defineNote } from '../noteSchema';

export default defineNote({
  id: 'resplat-paper-analysis',
  publishedAt: '2025-10-09',
  format: { en: 'Paper analysis', zh: '论文深度解析' },
  title: {
    en: 'ReSplat: Learning Recurrent Gaussian Splatting',
    zh: 'ReSplat：学习循环式 Gaussian Splatting',
  },
  summary: {
    en: 'A complete reading of compact Gaussian initialization, rendering-error feedback, recurrent 3D updates, generalization, ablations, appendices, and the official implementation.',
    zh: '从紧凑 Gaussian 初始化、渲染误差反馈和循环式三维更新，到泛化、消融、附录与官方实现边界的完整解析。',
  },
  topics: {
    en: ['3D Gaussian Splatting', 'Feed-forward reconstruction', 'Recurrent refinement', 'Novel view synthesis'],
    zh: ['3D Gaussian Splatting', '前馈式三维重建', '循环优化', '新视图合成'],
  },
  href: '/paper-analysis/resplat/',
});
