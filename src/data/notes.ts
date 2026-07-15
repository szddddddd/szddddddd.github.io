type NoteText = Readonly<Record<'en' | 'zh', string>>;

type NoteTopics = Readonly<Record<'en' | 'zh', readonly string[]>>;

type NoteVersion = Readonly<{
  label: NoteText;
  href: string;
}>;

export type NoteEntry = Readonly<{
  id: string;
  date: string;
  format: NoteText;
  title: NoteText;
  summary: NoteText;
  topics: NoteTopics;
  href: string;
  versions?: readonly NoteVersion[];
}>;

export const noteEntries: readonly NoteEntry[] = [
  {
    id: 'quicksplat-paper-analysis',
    date: '2026-07-15',
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
  },
  {
    id: 'worldmesh-paper-analysis',
    date: '2026-07-14',
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
  },
  {
    id: 'scal3r-paper-analysis',
    date: '2026-07-14',
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
  },
];
