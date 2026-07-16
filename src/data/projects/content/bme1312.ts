import { defineProjectContent } from '../contentSchema';

const enSource = {
    metaTitle: 'BME1312 MRI Reconstruction Project — Song Zidong',
    metaDescription:
      'BME1312 course project on accelerated multi-contrast MRI reconstruction from undersampled k-space data with U-Net baselines, multi-modal unrolled reconstruction, data consistency, wavelet loss, and perceptual objectives.',
    hero: {
      eyebrow: 'Course Project / Medical Imaging',
      title: 'Multi-contrast MRI Reconstruction from Undersampled Data',
      subtitle:
        'A BME1312 course project on accelerated MRI reconstruction with multi-modal guidance and unrolled deep reconstruction.',
      affiliation: 'Course project at ShanghaiTech University',
    },
    metadata: ['BME1312', 'Course Project', 'Medical Imaging', 'MRI Reconstruction', 'Deep Learning', '2026'],
    labels: {
      course: 'Course',
      type: 'Type',
      year: 'Year',
      context: 'Context',
      summary: 'Summary',
      method: 'Method',
      highlights: 'Highlights',
      metricChanges: 'Key metric changes',
    },
    sections: {
      overview: 'Overview',
      method: 'Method',
      results: 'Results',
      gallery: 'Visual gallery',
      contribution: 'My contribution',
      courseContext: 'Course context',
      future: 'Future improvements',
    },
    overview:
      'This course project studies accelerated multi-contrast MRI reconstruction from undersampled k-space data. Starting from a single-modal U-Net baseline for T2 reconstruction, we further developed a multi-modal unrolled reconstruction framework that leverages fully sampled T1 images as anatomical guidance for undersampled T2 reconstruction. The model combines feature fusion, iterative data consistency, wavelet-domain constraints, and perceptual objectives to improve both quantitative reconstruction quality and perceptual fidelity.',
    overviewBullets: [
      'Clinical MRI acquisition can be time-consuming, motivating accelerated acquisition protocols.',
      'K-space undersampling reduces acquisition time but introduces aliasing artifacts in reconstructed images.',
      'The project uses BraTS data to simulate undersampled MRI reconstruction and recover high-quality T2 images.',
      'The pipeline progresses from a single-modal U-Net baseline to a T1-guided multi-modal unrolled reconstruction network.',
    ],
    methodCards: [
      {
        title: 'U-Net Baseline',
        items: [
          'Single-modal T2 reconstruction from undersampled inputs.',
          'Encoder-decoder architecture with skip connections.',
          'L2 / MSE objective as the initial reconstruction baseline.',
        ],
      },
      {
        title: 'Multi-modal Unrolled Reconstruction',
        items: [
          'Uses fully sampled T1 images as anatomical guidance.',
          'Reconstructs undersampled T2 images with feature fusion.',
          'Iterative refinement with k-space data consistency layers.',
        ],
      },
      {
        title: 'Perceptual and Frequency-aware Objectives',
        items: [
          'Wavelet loss encourages high-frequency structure recovery.',
          'Perceptual loss improves feature-level reconstruction fidelity.',
          'DISTS and LPIPS complement PSNR and SSIM during evaluation.',
        ],
      },
    ],
    highlights: [
      'Simulated accelerated MRI reconstruction from undersampled k-space data.',
      'Implemented a U-Net baseline for single-modal T2 reconstruction.',
      'Built a multi-modal unrolled reconstruction network using fully sampled T1 guidance for undersampled T2 reconstruction.',
      'Added data consistency layers to enforce k-space fidelity during iterative reconstruction.',
      'Explored wavelet loss and perceptual loss to reduce over-smoothing and improve high-frequency detail recovery.',
      'Evaluated reconstruction quality using PSNR, SSIM, LPIPS, and DISTS.',
      'Analyzed the limitation of PSNR through a pixel-shift experiment.',
    ],
    resultsIntro:
      'Compared with the U-Net baseline, the proposed multi-modal unrolled reconstruction framework improves PSNR, SSIM, LPIPS, and DISTS, indicating better pixel-level fidelity, structural consistency, and perceptual reconstruction quality.',
    galleryIntro:
      'Selected processed figures from the course report, showing data simulation, model design, and evaluation analysis.',
    resultColumns: ['Model', 'DISTS ↓', 'LPIPS ↓', 'PSNR ↑', 'SSIM ↑'],
    resultRows: [
      ['Task 2 U-Net', '0.1558', '0.0205', '37.21', '0.885'],
      ['Task 3 Proposed', '0.0936', '0.0090', '41.11', '0.954'],
    ],
    gallery: [
      {
        src: '/projects/bme1312/data-processing.png',
        alt: 'Data processing and k-space undersampling simulation pipeline.',
        caption: 'Data processing and variable-density k-space undersampling simulation.',
      },
      {
        src: '/projects/bme1312/unet-baseline.png',
        alt: 'U-Net baseline reconstruction pipeline.',
        caption: 'Task 2 U-Net baseline for single-modal T2 reconstruction.',
      },
      {
        src: '/projects/bme1312/unrolled-reconstruction.png',
        alt: 'Multi-modal unrolled reconstruction pipeline.',
        caption: 'Task 3 multi-modal unrolled reconstruction with T1 guidance and data consistency.',
      },
      {
        src: '/projects/bme1312/qualitative-comparison.png',
        alt: 'Qualitative comparison between aliased input, ground truth, Task 2, and Task 3 reconstruction.',
        caption: 'Qualitative comparison between baseline and proposed reconstruction outputs.',
      },
      {
        src: '/projects/bme1312/psnr-analysis.png',
        alt: 'Pixel-shift experiment analyzing PSNR sensitivity.',
        caption: 'Pixel-shift experiment illustrating the limitation of purely pixel-aligned metrics such as PSNR.',
      },
    ],
    contribution:
      'My work in this team course project involved implementing and analyzing deep MRI reconstruction pipelines, comparing baseline and advanced reconstruction models, conducting experiments with multiple reconstruction metrics, and preparing visual and written analysis for the final report.',
    courseContext:
      'This work was completed as a team course project for BME1312: Applications of Artificial Intelligence in Medical Imaging at ShanghaiTech University. The page intentionally does not expose student IDs or personal emails of other team members.',
    future: [
      'Better edge-aware constraints.',
      'More robust multi-modal registration.',
      'Stronger frequency-domain modeling.',
      'Validation on broader clinical datasets.',
    ],
  } as const;
const zhSource = {
    metaTitle: 'BME1312 MRI 重建课程项目 — 宋梓冬',
    metaDescription:
      'BME1312 医学影像人工智能课程项目，研究基于欠采样 k-space 数据的多对比度 MRI 加速重建，包含 U-Net baseline、多模态 unrolled reconstruction、data consistency、wavelet loss 与 perceptual objectives。',
    hero: {
      eyebrow: '课程项目 / 医学影像',
      title: '基于欠采样数据的多对比度 MRI 重建',
      subtitle: '一个关于多对比度 MRI 加速重建的 BME1312 课程项目，结合多模态结构先验与 unrolled deep reconstruction。',
      affiliation: '上海科技大学课程项目',
    },
    metadata: ['BME1312', '课程项目', '医学影像', 'MRI 重建', '深度学习', '2026'],
    labels: {
      course: '课程',
      type: '类型',
      year: '年份',
      context: '背景',
      summary: '摘要',
      method: '方法',
      highlights: '方法亮点',
      metricChanges: '核心指标变化',
    },
    sections: {
      overview: '项目概览',
      method: '方法设计',
      results: '实验结果',
      gallery: '视觉展示',
      contribution: '我的参与',
      courseContext: '课程背景',
      future: '后续改进方向',
    },
    overview:
      '本课程项目研究基于深度学习的多对比度 MRI 加速重建问题。项目首先实现了以 U-Net 为基础的单模态 T2 重建模型，随后进一步构建了多模态 unrolled reconstruction framework，利用 fully sampled T1 图像作为解剖结构先验来辅助 undersampled T2 图像重建。方法结合特征融合、迭代式 data consistency、wavelet loss 与 perceptual loss，以提升重建图像的定量指标与视觉质量。',
    overviewBullets: [
      '临床 MRI 采集时间较长，因此加速采集具有实际研究意义。',
      'k-space 欠采样可以缩短采集过程，但会在重建图像中引入 aliasing artifacts。',
      '项目基于 BraTS 数据模拟欠采样 MRI 重建，并尝试恢复高质量 T2 图像。',
      '整体流程从单模态 U-Net baseline 扩展到 T1 引导的多模态 unrolled reconstruction network。',
    ],
    methodCards: [
      {
        title: 'U-Net Baseline',
        items: [
          '针对 undersampled input 进行单模态 T2 重建。',
          '采用带 skip connections 的 encoder-decoder 架构。',
          '以 L2 / MSE objective 作为初始重建 baseline。',
        ],
      },
      {
        title: 'Multi-modal Unrolled Reconstruction',
        items: [
          '利用 fully sampled T1 图像作为解剖结构先验。',
          '通过特征融合辅助 undersampled T2 图像重建。',
          '在迭代式重建过程中加入 k-space data consistency。',
        ],
      },
      {
        title: 'Perceptual and Frequency-aware Objectives',
        items: [
          '使用 wavelet loss 强化高频结构恢复。',
          '使用 perceptual loss 提升 feature-level fidelity。',
          '使用 DISTS 与 LPIPS 补充 PSNR 和 SSIM 的评价局限。',
        ],
      },
    ],
    highlights: [
      '模拟基于 undersampled k-space data 的 MRI 加速重建任务。',
      '实现了用于单模态 T2 重建的 U-Net baseline。',
      '构建了利用 fully sampled T1 guidance 的多模态 unrolled reconstruction network。',
      '加入 data consistency layers，在迭代重建中约束 k-space fidelity。',
      '探索 wavelet loss 与 perceptual loss，以减少过度平滑并改善高频细节恢复。',
      '使用 PSNR、SSIM、LPIPS 与 DISTS 对重建质量进行评估。',
      '通过 pixel-shift experiment 分析 PSNR 的局限性。',
    ],
    resultsIntro:
      '与 U-Net baseline 相比，提出的多模态 unrolled reconstruction framework 在 PSNR、SSIM、LPIPS 和 DISTS 上均有提升，说明其在 pixel-level fidelity、结构一致性与感知重建质量方面表现更好。',
    galleryIntro: '精选课程报告中的整理后图示，用于展示数据处理、模型结构与实验分析。',
    resultColumns: ['模型', 'DISTS ↓', 'LPIPS ↓', 'PSNR ↑', 'SSIM ↑'],
    resultRows: [
      ['Task 2 U-Net', '0.1558', '0.0205', '37.21', '0.885'],
      ['Task 3 Proposed', '0.0936', '0.0090', '41.11', '0.954'],
    ],
    gallery: [
      {
        src: '/projects/bme1312/data-processing.png',
        alt: '数据处理与 k-space 欠采样模拟流程。',
        caption: '数据处理与 variable-density k-space undersampling simulation。',
      },
      {
        src: '/projects/bme1312/unet-baseline.png',
        alt: 'U-Net baseline 重建流程。',
        caption: 'Task 2 U-Net baseline，用于单模态 T2 图像重建。',
      },
      {
        src: '/projects/bme1312/unrolled-reconstruction.png',
        alt: '多模态 unrolled reconstruction 流程。',
        caption: 'Task 3 多模态 unrolled reconstruction，结合 T1 guidance 与 data consistency。',
      },
      {
        src: '/projects/bme1312/qualitative-comparison.png',
        alt: 'Aliased input、ground truth、Task 2 与 Task 3 重建结果的定性对比。',
        caption: 'Baseline 与 proposed reconstruction outputs 的定性对比。',
      },
      {
        src: '/projects/bme1312/psnr-analysis.png',
        alt: '分析 PSNR 对空间位移敏感性的 pixel-shift experiment。',
        caption: 'Pixel-shift experiment 展示 PSNR 等 pixel-aligned metrics 的局限性。',
      },
    ],
    contribution:
      '我在该团队课程项目中参与了深度 MRI 重建流程的实现与分析，对 baseline 与 advanced reconstruction model 进行了实验比较，并使用多种重建指标进行评估，同时参与了最终报告中的实验结果整理与可视化分析。',
    courseContext:
      '该项目完成于上海科技大学 BME1312: Applications of Artificial Intelligence in Medical Imaging 课程。网页中不会公开展示其他组员的学号或个人邮箱。',
    future: [
      '更好的 edge-aware constraints。',
      '更稳健的多模态 registration。',
      '更强的 frequency-domain modeling。',
      '在更广泛的临床数据集上进行验证。',
    ],
  } as const;

const enMetricCards = [
  { label: 'PSNR', value: '37.21 → 41.11' }, { label: 'SSIM', value: '0.885 → 0.954' },
  { label: 'LPIPS', value: '0.0205 → 0.0090' }, { label: 'DISTS', value: '0.1558 → 0.0936' },
] as const;
const zhMetricCards = enMetricCards;

export default defineProjectContent({
  id: 'bme1312',
  heroCaption: 'gallery.3.caption',
  heroActions: [{ type: 'email' }, { type: 'project-link', link: 'report', label: 'report' }, { type: 'project-link', link: 'code', label: 'code' }],
  documents: {
    en: {
      ...enSource,
      metricCards: enMetricCards,

      details: [
    { label: enSource.labels.course, value: 'BME1312' },
    { label: enSource.labels.type, value: 'Course Project / Medical Imaging' },
    { label: enSource.labels.year, value: '2025' },
    { label: enSource.labels.context, value: enSource.hero.affiliation },
  ],
    },
    zh: {
      ...zhSource,
      metricCards: zhMetricCards,

      details: [
    { label: zhSource.labels.course, value: 'BME1312' },
    { label: zhSource.labels.type, value: '课程项目 / 医学影像' },
    { label: zhSource.labels.year, value: '2025' },
    { label: zhSource.labels.context, value: zhSource.hero.affiliation },
  ],
    },
  },
  sections: [
    { title: 'sections.overview', eyebrow: 'BME1312', intro: 'overview', blocks: [{ type: 'group', className: 'detail-two-column', blocks: [{ type: 'bullet-panel', items: 'overviewBullets', label: 'labels.summary' }, { type: 'figure', item: 'gallery.0', className: 'compact-figure' }] }] },
    { title: 'sections.method', introSource: 'project-description', blocks: [{ type: 'card-grid', items: 'methodCards', label: 'labels.method' }, { type: 'highlight', items: 'highlights', label: 'labels.highlights' }] },
    { title: 'sections.results', intro: 'resultsIntro', blocks: [{ type: 'metric-table', columns: 'resultColumns', rows: 'resultRows', ariaLabel: 'MRI reconstruction quantitative comparison' }, { type: 'metric-cards', items: 'metricCards', ariaLabel: 'labels.metricChanges' }] },
    { title: 'sections.gallery', intro: 'galleryIntro', blocks: [{ type: 'gallery', items: 'gallery' }] },
    { title: 'sections.contribution', blocks: [{ type: 'narrative', text: 'contribution' }] },
    { title: 'sections.courseContext', blocks: [{ type: 'narrative', text: 'courseContext' }] },
    { title: 'sections.future', blocks: [{ type: 'future-grid', items: 'future' }] },
  ],
});
