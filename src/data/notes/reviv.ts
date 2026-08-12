import { defineNote } from '../noteSchema';

export default defineNote({
  id: 'reviv-paper-analysis',
  publishedAt: '2026-07-20',
  format: { en: 'Paper analysis', zh: '论文深度解析' },
  title: {
    en: 'ReViV: Reconstructing the Viewer and the View in 4D',
    zh: 'ReViV：从单目第一视角视频统一重建观看者与所见世界',
  },
  summary: {
    en: 'Two complementary readings of ReViV, covering multimodal tokenization, masked joint-distribution learning, body and hand reconstruction, camera, gaze, depth, metric alignment, ablations, and the official implementation.',
    zh: '以学术解析与按原文结构的完整易读版，系统讲清多模态离散化、掩码联合分布学习、身体与手重建、相机、视线、深度、米制对齐、消融实验和官方源码。',
  },
  topics: {
    en: ['Egocentric vision', '4D reconstruction', 'Human motion', 'Multimodal transformers'],
    zh: ['第一视角视觉', '4D 重建', '人体运动', '多模态 Transformer'],
  },
  versions: [
    {
      label: { en: 'Paper Analyzer academic version', zh: 'Paper Analyzer 学术解析版' },
      href: '/paper-analysis/reviv/',
    },
    {
      label: { en: 'Complete easy-reading guide', zh: '完整易读学术版' },
      href: '/paper-analysis/reviv/easyreading/',
    },
  ],
});
