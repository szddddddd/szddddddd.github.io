import { defineNote } from '../noteSchema';

export default defineNote({
  id: 'gaussiangpt-research-topics',
  publishedAt: '2026-07-17',
  format: { en: 'Research roadmap', zh: '研究路线图' },
  title: {
    en: 'GaussianGPT Research Roadmap: 12 Publishable Directions',
    zh: 'GaussianGPT 改进路线图：12 个可发表方向',
  },
  summary: {
    en: 'A paper- and code-grounded roadmap with twelve deduplicated ideas, recent-literature novelty checks, reviewer-risk analysis, a refined top proposal, and a claim-driven experiment plan. No GPU experiment was run.',
    zh: '结合 GaussianGPT 论文与官方代码，给出 12 个机械去重候选、近期文献查新、审稿风险、Top 1 精炼方案与 claim-driven 实验计划；本轮未运行 GPU 实验。',
  },
  topics: {
    en: ['3D Gaussian Splatting', 'GaussianGPT', 'Autoregressive generation', 'Research ideas', 'Experiment planning'],
    zh: ['3D Gaussian Splatting', 'GaussianGPT', '自回归生成', '研究选题', '实验规划'],
  },
  versions: [
    {
      label: { en: 'Full idea report', zh: '完整候选报告' },
      href: '/paper-analysis/gaussiangpt-research-topics/report/',
    },
    {
      label: { en: 'Refined top proposal', zh: 'Top 1 精炼方案' },
      href: '/paper-analysis/gaussiangpt-research-topics/proposal/',
    },
    {
      label: { en: 'Experiment roadmap', zh: '实验路线图' },
      href: '/paper-analysis/gaussiangpt-research-topics/experiment-plan/',
    },
  ],
});
