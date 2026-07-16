import { defineProjectContent } from '../contentSchema';

const enSource = {
    metaTitle: 'CS182 MOF3R 3D Product Reconstruction Project — Song Zidong',
    metaDescription:
      'CS182 course project on mask-guided object-centric 3D reconstruction with SAM2 foreground masks, 3D Gaussian Splatting, Mask-Guided Compound Loss, and geometry-aware Gaussian pruning.',
    hero: {
      eyebrow: 'Course Project / CS182 Machine Learning',
      title: 'MOF3R: Mask-Guided 3D Product Reconstruction',
      subtitle:
        'Mask-Guided High-Fidelity 3D Product Reconstruction via SAM2 and 3D-Consistent Gaussian Splatting Refinement',
      affiliation: 'CS182: Introduction to Machine Learning · Course Project · ShanghaiTech University · 2026',
    },
    authors: ['Zidong Song', 'Boyang Zhou', 'Zian Chen'],
    metadata: [
      'CS182',
      'Machine Learning',
      '3D Gaussian Splatting',
      'SAM2',
      'Object-Centric Reconstruction',
      '3D Reconstruction',
      'Gaussian Pruning',
      'CO3Dv2',
      'Computer Vision',
    ],
    labels: {
      course: 'Course',
      type: 'Type',
      year: 'Year',
      authors: 'Authors',
      summary: 'Summary',
      method: 'Method',
      metricChanges: 'Course project metrics',
    },
    sections: {
      overview: 'Overview',
      method: 'Method',
      loss: 'Mask-Guided Compound Loss',
      pruning: 'Geometry-Aware Multi-Metric Pruning',
      experiments: 'Experiments and Results',
      gallery: 'Visual Results',
    },
    overview:
      'MOF3R is a segmentation-guided object-centric 3D reconstruction course project built on 3D Gaussian Splatting. It uses SAM2-generated foreground masks as semantic priors, optimizes 3DGS with a foreground-aware compound loss, and applies geometry-aware pruning to remove floating Gaussians and boundary artifacts. Experiments on CO3Dv2 show cleaner object reconstructions with sharper boundaries and fewer background artifacts than vanilla 3DGS.',
    overviewBullets: [
      'Input monocular videos are processed with COLMAP for camera parameters and SAM2 for foreground masks.',
      'Foreground masks guide 3DGS training so optimization focuses on target objects instead of cluttered backgrounds.',
      'Post-training refinement combines mask consistency, local density, anisotropy filtering, and adaptive shrinkage.',
      'The project evaluates object-centric reconstruction quality on representative CO3Dv2 sequences.',
    ],
    methodIntro:
      'The method is organized as a compact three-stage pipeline: camera and mask preprocessing, mask-guided 3DGS optimization, and geometry-aware pruning for residual artifacts.',
    methodCards: [
      {
        title: 'Preprocessing with COLMAP and SAM2',
        items: [
          'Extract frames from the input video sequence.',
          'Estimate camera intrinsics and extrinsics with COLMAP.',
          'Generate foreground masks with SAM2 using a first-frame prompt.',
        ],
      },
      {
        title: 'Mask-guided 3DGS optimization',
        items: [
          'Use SAM2 masks as foreground semantic priors.',
          'Apply mask-constrained L1 supervision to focus photometric training on the object.',
          'Use composite-image SSIM to preserve structural consistency near boundaries.',
        ],
      },
      {
        title: 'Geometry-aware pruning',
        items: [
          'Project Gaussians into visible views and vote with foreground masks.',
          'Analyze local KNN density and anisotropy to identify outlier primitives.',
          'Shrink or remove uncertain Gaussians to smooth silhouettes while preserving object detail.',
        ],
      },
    ],
    lossIntro:
      'The compound objective combines a mask-constrained L1 term with composite-image SSIM so foreground reconstruction improves without encouraging the model to fit background clutter.',
    lossCards: [
      {
        title: 'Mask-constrained L1 loss',
        tex: String.raw`\mathcal{L}_{\text{mask-L1}} = \left\| M \odot \left(I - \hat{I}\right) \right\|_1`,
        text: 'The foreground mask limits pixel-wise supervision to the target object and suppresses background fitting during optimization.',
      },
      {
        title: 'Composite-image SSIM loss',
        tex: String.raw`I_{\text{comp}} = M \odot \hat{I} + \left(1 - M\right) \odot I`,
        text: 'Rendered foreground pixels are blended with the original background before SSIM is computed, reducing boundary instability.',
      },
      {
        title: 'Compound objective',
        tex: String.raw`\mathcal{L} = \lambda_1 \mathcal{L}_{\text{mask-L1}} + \lambda_2 \mathcal{L}_{\text{mask-SSIM}}`,
        text: 'The final objective balances foreground photometric accuracy and structural consistency for cleaner object-centric 3DGS.',
      },
    ],
    lossHighlights: [
      'SAM2 foreground masks provide semantic supervision.',
      'Mask-constrained L1 focuses pixel loss on the object.',
      'Composite-image SSIM stabilizes boundary structure.',
      'The objective reduces background fitting during 3DGS optimization.',
    ],
    pruningIntro:
      'After reconstruction, MOF3R removes residual floating Gaussians and elongated boundary artifacts through a multi-metric pruning pass.',
    pruningCards: [
      {
        title: 'Multi-view mask consistency',
        items: [
          'Project each Gaussian center into visible camera views.',
          'Check whether the projections fall inside foreground masks.',
          'Remove Gaussians that consistently vote as background across valid views.',
        ],
      },
      {
        title: 'Density and anisotropy filtering',
        items: [
          'Use K-nearest-neighbor neighborhoods to estimate local density.',
          'Identify low-density outliers and excessive anisotropy.',
          'Target stretched structures and trailing artifacts near object boundaries.',
        ],
      },
      {
        title: 'Adaptive shrinkage',
        items: [
          'Avoid deleting all uncertain boundary candidates immediately.',
          'Gradually reduce scale and opacity for lower-confidence primitives.',
          'Preserve fine geometry while smoothing noisy silhouettes.',
        ],
      },
    ],
    experimentsIntro:
      'Experiments use CO3Dv2 object sequences, compare against original 3D Gaussian Splatting, and report foreground-mask PSNR, SSIM, and LPIPS. The numbers below are course project results from representative real object sequences rather than publication claims.',
    resultColumns: ['Method', 'PSNR ↑', 'SSIM ↑', 'LPIPS ↓'],
    resultRows: [
      ['Original 3DGS', '19.07', '0.592', '0.629'],
      ['Mask-Guided', '21.03', '0.931', '0.125'],
      ['MOF3R', '23.56', '0.935', '0.120'],
    ],
    resultHighlights: [
      'PSNR improves from 19.07 dB for original 3DGS to 23.56 dB for MOF3R.',
      'SSIM increases from 0.592 to 0.935, indicating stronger foreground structural consistency.',
      'LPIPS decreases from 0.629 to 0.120, matching the reduction in visible perceptual artifacts.',
    ],
    galleryIntro:
      'A single visual section collects the core pipeline, qualitative reconstruction comparison, and quantitative comparison from the project report.',
    gallery: [
      {
        src: '/projects/cs182/MOF3R_overview.png',
        alt: 'Overall pipeline of MOF3R with SAM2 masks, mask-guided 3DGS training, and pruning.',
        caption: 'Overall pipeline.',
      },
      {
        src: '/projects/cs182/comparsion.png',
        alt: 'Qualitative comparison between original 3DGS, mask-guided reconstruction, and MOF3R.',
        caption: 'Qualitative reconstruction comparison.',
      },
      {
        src: '/projects/cs182/result.png',
        alt: 'Quantitative comparison across representative CO3Dv2 sequences.',
        caption: 'Quantitative comparison.',
      },
    ],
  } as const;
const zhSource = {
    metaTitle: 'CS182 MOF3R 三维商品重建课程项目 — 宋梓冬',
    metaDescription:
      'CS182 课程项目，研究结合 SAM2 前景 mask、3D Gaussian Splatting、Mask-Guided Compound Loss 与几何感知 Gaussian pruning 的物体中心三维重建。',
    hero: {
      eyebrow: '课程项目 / CS182 机器学习',
      title: 'MOF3R：基于 SAM2 与 3DGS 的 Mask-Guided 三维商品重建',
      subtitle: 'Mask-Guided High-Fidelity 3D Product Reconstruction via SAM2 and 3D-Consistent Gaussian Splatting Refinement',
      affiliation: 'CS182: Introduction to Machine Learning · 课程项目 · 上海科技大学 · 2026',
    },
    authors: ['Zidong Song', 'Boyang Zhou', 'Zian Chen'],
    metadata: [
      'CS182',
      'Machine Learning',
      '3D Gaussian Splatting',
      'SAM2',
      'Object-Centric Reconstruction',
      '3D Reconstruction',
      'Gaussian Pruning',
      'CO3Dv2',
      'Computer Vision',
    ],
    labels: {
      course: '课程',
      type: '类型',
      year: '年份',
      authors: '作者',
      summary: '摘要',
      method: '方法',
      metricChanges: '课程项目实验指标',
    },
    sections: {
      overview: '项目概述',
      method: '方法',
      loss: 'Mask-Guided 损失',
      pruning: '几何感知 Pruning',
      experiments: '实验与结果',
      gallery: '可视化结果',
    },
    overview:
      'MOF3R 是一个面向物体中心三维重建的课程项目，基于 3D Gaussian Splatting，并引入 SAM2 生成的前景 mask 作为语义先验。项目通过 foreground-aware compound loss 优化 3DGS，并使用几何感知 pruning 移除 floating Gaussians 和边界伪影。CO3Dv2 上的实验显示，相比原始 3DGS，该流程可以得到边界更清晰、背景伪影更少的物体重建结果。',
    overviewBullets: [
      '输入单目视频先经过 COLMAP 估计相机参数，并使用 SAM2 生成前景 mask。',
      '前景 mask 用于指导 3DGS 训练，使优化更集中于目标物体而不是杂乱背景。',
      '训练后的细化阶段结合 mask 一致性、局部密度、各向异性过滤和自适应缩放。',
      '项目在代表性的 CO3Dv2 序列上评估物体中心重建质量。',
    ],
    methodIntro:
      '方法被整理为三个紧凑阶段：相机与 mask 预处理、mask-guided 3DGS 优化，以及用于移除残余伪影的几何感知 pruning。',
    methodCards: [
      {
        title: '使用 COLMAP 与 SAM2 进行预处理',
        items: [
          '从输入视频序列中抽取帧。',
          '使用 COLMAP 估计相机内参和外参。',
          '使用 SAM2 和第一帧提示生成前景 mask。',
        ],
      },
      {
        title: 'Mask-guided 3DGS 优化',
        items: [
          '将 SAM2 mask 作为前景语义先验。',
          '使用 mask-constrained L1 监督，使光度训练聚焦于目标物体。',
          '使用 composite-image SSIM 维持边界附近的结构一致性。',
        ],
      },
      {
        title: '几何感知 pruning',
        items: [
          '将 Gaussians 投影到可见视角，并通过前景 mask 进行投票。',
          '分析局部 KNN 密度和各向异性以识别异常 primitives。',
          '对不确定 Gaussians 进行缩放或删除，在保留细节的同时平滑轮廓。',
        ],
      },
    ],
    lossIntro:
      '组合目标将 mask-constrained L1 与 composite-image SSIM 结合，使前景重建质量提升，同时避免模型过度拟合杂乱背景。',
    lossCards: [
      {
        title: 'Mask-constrained L1 loss',
        tex: String.raw`\mathcal{L}_{\text{mask-L1}} = \left\| M \odot \left(I - \hat{I}\right) \right\|_1`,
        text: '前景 mask 将像素级监督限制在目标物体区域，从而在优化过程中抑制背景拟合。',
      },
      {
        title: 'Composite-image SSIM loss',
        tex: String.raw`I_{\text{comp}} = M \odot \hat{I} + \left(1 - M\right) \odot I`,
        text: '渲染前景与原始背景组合后再计算 SSIM，可以降低物体边界附近的不稳定性。',
      },
      {
        title: '组合优化目标',
        tex: String.raw`\mathcal{L} = \lambda_1 \mathcal{L}_{\text{mask-L1}} + \lambda_2 \mathcal{L}_{\text{mask-SSIM}}`,
        text: '最终目标在前景光度精度和结构一致性之间取得平衡，用于更干净的物体中心 3DGS。',
      },
    ],
    lossHighlights: [
      'SAM2 前景 mask 提供语义监督。',
      'Mask-constrained L1 将像素损失集中在目标物体上。',
      'Composite-image SSIM 稳定边界结构。',
      '该目标减少 3DGS 优化过程中的背景拟合。',
    ],
    pruningIntro:
      '重建完成后，MOF3R 通过多指标 pruning 移除残留 floating Gaussians 和细长边界伪影。',
    pruningCards: [
      {
        title: '多视角 mask 一致性',
        items: [
          '将每个 Gaussian center 投影到可见相机视角。',
          '检查投影点是否落在对应前景 mask 内。',
          '移除在多个有效视角中持续被判断为背景的 Gaussians。',
        ],
      },
      {
        title: '密度与各向异性过滤',
        items: [
          '使用 K-nearest-neighbor 邻域估计局部密度。',
          '识别低密度异常点和过高各向异性结构。',
          '针对物体边界附近的拉伸结构和拖尾伪影。',
        ],
      },
      {
        title: '自适应缩放',
        items: [
          '避免立即删除所有不确定的边界候选。',
          '逐步减小低置信 primitives 的尺度和不透明度。',
          '在平滑噪声轮廓的同时保留细节几何。',
        ],
      },
    ],
    experimentsIntro:
      '实验使用 CO3Dv2 物体序列，与原始 3D Gaussian Splatting 进行对比，并报告前景 mask 区域内的 PSNR、SSIM 和 LPIPS。以下数值来自代表性真实物体序列上的课程项目实验结果，不作为正式论文发表结论。',
    resultColumns: ['方法', 'PSNR ↑', 'SSIM ↑', 'LPIPS ↓'],
    resultRows: [
      ['Original 3DGS', '19.07', '0.592', '0.629'],
      ['Mask-Guided', '21.03', '0.931', '0.125'],
      ['MOF3R', '23.56', '0.935', '0.120'],
    ],
    resultHighlights: [
      'PSNR 从原始 3DGS 的 19.07 dB 提升到 MOF3R 的 23.56 dB。',
      'SSIM 从 0.592 提升到 0.935，说明前景结构一致性更强。',
      'LPIPS 从 0.629 降低到 0.120，与可见感知伪影的减少一致。',
    ],
    galleryIntro: '单一可视化区块集中展示项目报告中的整体 pipeline、定性重建对比和定量结果对比。',
    gallery: [
      {
        src: '/projects/cs182/MOF3R_overview.png',
        alt: 'MOF3R 整体流程，包含 SAM2 mask、mask-guided 3DGS 训练和 pruning。',
        caption: 'Overall pipeline。',
      },
      {
        src: '/projects/cs182/comparsion.png',
        alt: '原始 3DGS、mask-guided reconstruction 和 MOF3R 的定性对比。',
        caption: 'Qualitative reconstruction comparison。',
      },
      {
        src: '/projects/cs182/result.png',
        alt: '代表性 CO3Dv2 序列上的定量结果对比。',
        caption: 'Quantitative comparison。',
      },
    ],
  } as const;

const enMetricCards = [{ label: 'PSNR', value: '19.07 → 23.56' }, { label: 'SSIM', value: '0.592 → 0.935' }, { label: 'LPIPS', value: '0.629 → 0.120' }] as const;
const zhMetricCards = enMetricCards;

export default defineProjectContent({
  id: 'cs182',
  articleClass: 'cs182-detail',
  heroCaptionFallback: 'project-title',
  heroActions: [{ type: 'email' }, { type: 'project-link', link: 'report', label: 'report' }, { type: 'project-link', link: 'code', label: 'code' }],
  documents: {
    en: {
      ...enSource,
      authorSentence: `This project was completed as a CS182 course project by ${enSource.authors[0]}, ${enSource.authors[1]}, and ${enSource.authors[2]}.`, metricCards: enMetricCards,

      details: [
    { label: enSource.labels.course, value: 'CS182: Introduction to Machine Learning' }, { label: enSource.labels.type, value: 'Course Project / Machine Learning' },
    { label: enSource.labels.year, value: '2026' }, { label: enSource.labels.authors, value: enSource.authors.join(' · ') },
  ],
    },
    zh: {
      ...zhSource,
      authorSentence: `该项目由 ${zhSource.authors[0]}、${zhSource.authors[1]} 和 ${zhSource.authors[2]} 作为 CS182 课程项目完成。`, metricCards: zhMetricCards,

      details: [
    { label: zhSource.labels.course, value: 'CS182 机器学习导论' }, { label: zhSource.labels.type, value: '课程项目 / 机器学习' },
    { label: zhSource.labels.year, value: '2026' }, { label: zhSource.labels.authors, value: zhSource.authors.join(' · ') },
  ],
    },
  },
  sections: [
    { id: 'overview', eyebrow: 'CS182', title: 'sections.overview', intro: 'overview', blocks: [{ type: 'group', className: 'detail-two-column', blocks: [{ type: 'bullet-panel', items: 'overviewBullets', label: 'labels.summary' }, { type: 'narrative', text: 'authorSentence' }] }] },
    { id: 'method', title: 'sections.method', intro: 'methodIntro', blocks: [{ type: 'card-grid', items: 'methodCards', label: 'labels.method' }, { type: 'group', className: 'method-detail-grid', blocks: [{ type: 'math-panel', formula: 'lossCards.2.tex', intro: 'lossIntro', highlights: 'lossHighlights', label: 'sections.loss' }, { type: 'card-grid', items: 'pruningCards', label: 'sections.pruning', className: 'method-detail-grid', cardClassName: 'panel method-technical-panel' }] }] },
    { id: 'experiments-results', title: 'sections.experiments', intro: 'experimentsIntro', blocks: [{ type: 'metric-table', columns: 'resultColumns', rows: 'resultRows', className: 'metric-row-3', ariaLabel: 'CS182 MOF3R quantitative comparison' }, { type: 'metric-cards', items: 'metricCards', className: 'metric-cards-three', ariaLabel: 'labels.metricChanges' }, { type: 'highlight', items: 'resultHighlights', label: 'labels.summary' }] },
    { id: 'visual-results', title: 'sections.gallery', intro: 'galleryIntro', blocks: [{ type: 'gallery', items: 'gallery', className: 'cs182-visual-grid' }] },
  ],
});
