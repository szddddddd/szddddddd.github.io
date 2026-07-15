import { defineNote } from '../noteSchema';

export default defineNote({
  id: 'gaussiangpt-paper-analysis',
  publishedAt: '2026-03-27',
  format: { en: 'Paper analysis', zh: '论文深度解析' },
  title: {
    en: 'GaussianGPT: Autoregressive 3D Gaussian Scene Generation',
    zh: 'GaussianGPT：面向自回归 3D Gaussian 场景生成的系统解析',
  },
  summary: {
    en: 'An academic reading of GaussianGPT, connecting sparse LFQ compression, position-feature tokenization, 3D RoPE, causal sampling, scene completion, outpainting, source code, and reproducibility limits.',
    zh: '从稀疏 LFQ 压缩、位置/特征 token 化与 3D RoPE，到因果采样、场景补全、外推、源码对应和复现边界，系统拆解 GaussianGPT。',
  },
  topics: {
    en: ['3D Gaussian Splatting', 'Autoregressive generation', 'Scene synthesis', 'Transformers'],
    zh: ['3D Gaussian Splatting', '自回归生成', '场景合成', 'Transformer'],
  },
  href: '/paper-analysis/gaussiangpt/index.html',
  versions: [
    {
      label: { en: 'Academic analysis', zh: '学术解析版' },
      href: '/paper-analysis/gaussiangpt/index.html',
    },
    {
      label: { en: 'Complete easy-reading guide', zh: '完整易读版' },
      href: '/paper-analysis/gaussiangpt/easyreading/',
    },
  ],
});
