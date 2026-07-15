import { defineNote } from '../noteSchema';

export default defineNote({
  id: 'scal3r-paper-analysis',
  date: '2026-07-14',
  order: 1,
  format: { en: 'Paper analysis', zh: '论文深度解析' },
  title: {
    en: 'Scal3R: Scalable Test-Time Training for Large-Scale 3D Reconstruction',
    zh: 'Scal3R：可扩展的测试时训练，面向大规模三维重建',
  },
  summary: {
    en: 'A technical reading of Scal3R, covering global context memory, test-time adaptation, cross-chunk synchronization, long-sequence experiments, and reproducibility boundaries.',
    zh: '从全局上下文记忆、测试时适应、跨块同步，到长序列实验与复现边界，系统拆解 Scal3R 的方法与证据。',
  },
  topics: {
    en: ['3D reconstruction', 'Test-time training', 'Global context', 'Visual computing'],
    zh: ['三维重建', '测试时训练', '全局上下文', '视觉计算'],
  },
  href: '/paper-analysis/scal3r/index.html',
});
