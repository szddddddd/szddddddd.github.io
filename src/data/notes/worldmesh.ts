import { defineNote } from '../noteSchema';

export default defineNote({
  id: 'worldmesh-paper-analysis',
  publishedAt: '2026-03-24',
  order: 2,
  format: { en: 'Paper analysis', zh: '论文深度解析' },
  title: {
    en: 'WorldMesh: Mesh-Conditioned Diffusion for Navigable Multi-Room 3D Scenes',
    zh: 'WorldMesh：用网格条件扩散生成可导航的多房间 3D 世界',
  },
  summary: {
    en: 'A technical reading of WorldMesh, covering geometry-first layout construction, object reconstruction, progressive wall-texture accumulation, depth validation, geometry-regularized 3DGS, and reproducibility limits.',
    zh: '从几何优先的布局构建、物体重建、墙面纹理累积，到深度验证、几何正则化 3DGS 与复现边界，系统拆解 WorldMesh。',
  },
  topics: {
    en: ['3D scene generation', 'Mesh conditioning', 'Image diffusion', 'Gaussian splatting'],
    zh: ['三维场景生成', '网格条件', '图像扩散', '高斯泼溅'],
  },
  href: '/paper-analysis/worldmesh/concise/',
  versions: [
    {
      label: { en: 'Academic version', zh: '学术版' },
      href: '/paper-analysis/worldmesh/academic/',
    },
    {
      label: { en: 'Concise version', zh: '精炼版' },
      href: '/paper-analysis/worldmesh/concise/',
    },
  ],
});
