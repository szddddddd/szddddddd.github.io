import { defineNote } from '../noteSchema';

export default defineNote({
  id: 'resplat-research-topics',
  publishedAt: '2026-07-16',
  format: { en: 'Research roadmap', zh: '研究路线图' },
  title: {
    en: 'ReSplat Research Roadmap: 10 Publishable 3DGS Topics',
    zh: 'ReSplat 改进路线图：10 个可投稿的 3DGS Topic',
  },
  summary: {
    en: 'A code-grounded survey of the latest 12 months of 3D Gaussian Splatting research, with ten falsifiable topics, novelty checks, reviewer risks, GPU budgets, a refined top proposal, and a claim-driven experiment plan.',
    zh: '结合 ReSplat 论文与官方代码，检索近 12 个月 3D Gaussian Splatting 工作，给出 10 个可证伪候选、逐项查新、审稿风险、GPU 预算、Top 1 精炼方案与实验路线图。',
  },
  topics: {
    en: ['3D Gaussian Splatting', 'ReSplat', 'Research ideas', 'Novelty check', 'Experiment planning'],
    zh: ['3D Gaussian Splatting', 'ReSplat', '研究选题', '论文查新', '实验规划'],
  },
  versions: [
    {
      label: { en: 'Full topic report', zh: '完整候选报告' },
      href: '/paper-analysis/resplat-research-topics/report/',
    },
    {
      label: { en: 'Refined top proposal', zh: 'Top 1 精炼方案' },
      href: '/paper-analysis/resplat-research-topics/proposal/',
    },
    {
      label: { en: 'Experiment roadmap', zh: '实验路线图' },
      href: '/paper-analysis/resplat-research-topics/experiment-plan/',
    },
  ],
});
