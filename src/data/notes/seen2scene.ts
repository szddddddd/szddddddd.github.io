import { defineNote } from '../noteSchema';

export default defineNote({
  id: 'seen2scene-paper-analysis',
  publishedAt: '2026-03-30',
  format: { en: 'Paper analysis', zh: '论文深度解析' },
  title: {
    en: 'Seen2Scene: Completing Realistic 3D Scenes with Visibility-Guided Flow',
    zh: 'Seen2Scene：从“看见的扫描”学习完整三维场景',
  },
  summary: {
    en: 'An academic reading of visibility-aware TSDF masking, sparse VAE compression, flow matching, ControlNet completion, experiments, source code, and reproducibility boundaries.',
    zh: '从可见性 TSDF 掩码、稀疏 VAE、流匹配与 ControlNet，到实验、源码对应和复现边界，系统解析如何直接用不完整真实扫描学习三维场景。',
  },
  topics: {
    en: ['3D scene completion', 'Flow matching', 'TSDF', 'Generative models'],
    zh: ['三维场景补全', '流匹配', 'TSDF', '生成模型'],
  },
  href: '/paper-analysis/seen2scene/',
});
