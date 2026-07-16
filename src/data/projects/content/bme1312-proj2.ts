import { defineProjectContent } from '../contentSchema';

const enSource = {
    metaTitle: 'HBA-VAN Glioma MRI Segmentation Project — Song Zidong',
    metaDescription:
      'BME1312 Artificial Intelligence in Medical Imaging course project on HBA-VAN, a hierarchical boundary-aware volumetric attention network for multi-modal BraTS-style glioma subregion segmentation.',
    hero: {
      eyebrow: 'Course Project / Medical Image Segmentation',
      title:
        'HBA-VAN: Hierarchical Boundary-Aware Volumetric Attention Network for Multi-Modal Glioma Subregion Segmentation',
      subtitle:
        'Boundary-aware 3D attention network for multi-modal BraTS glioma subregion segmentation.',
      affiliation: 'BME1312 Artificial Intelligence in Medical Imaging · Course Project · ShanghaiTech University · 2026',
    },
    metadata: [
      'BME1312',
      'Medical Imaging',
      'Brain Tumor Segmentation',
      '3D U-Net',
      'Attention',
      'BraTS',
      'WT / TC / ET',
    ],
    labels: {
      course: 'Course',
      type: 'Type',
      task: 'Task',
      modalities: 'Modalities',
      targetRegions: 'Target regions',
      summary: 'Summary',
      pipeline: 'Pipeline',
      result: 'Result',
      links: 'Links',
      context: 'Context',
    },
    sections: {
      overview: 'Overview',
      method: 'Method',
      results: 'Key Results',
      visuals: 'Visuals',
      contribution: 'My Contribution',
      links: 'Links and Assets',
      courseContext: 'Course Context',
    },
    overview:
      'This project addresses automatic glioma subregion segmentation from co-registered multi-modal brain MRI. The goal is to predict three clinically meaningful and anatomically nested target regions: whole tumor (WT), tumor core (TC), and enhancing tumor (ET). The portfolio page presents the work as a staged modeling study from 2D slice-wise segmentation to full 3D volumetric reasoning.',
    overviewBullets: [
      'T1, T1ce, T2, and FLAIR provide complementary signals for tumor extent, core structure, and enhancement.',
      'WT, TC, and ET form a nested multi-label hierarchy rather than mutually exclusive semantic classes.',
      'ET is usually small and sparse, producing severe class imbalance and unstable case-level Dice.',
      'Tumor boundaries are ambiguous, so HD95 and error maps are important alongside overlap metrics.',
    ],
    regionCards: [
      { label: 'WT', value: 'Whole Tumor', note: 'broad abnormal tumor extent' },
      { label: 'TC', value: 'Tumor Core', note: 'compact core and boundary-sensitive region' },
      { label: 'ET', value: 'Enhancing Tumor', note: 'small contrast-dependent enhancing component' },
    ],
    methodIntro:
      'The method is organized as a progressive pipeline. Each stage keeps the same WT / TC / ET multi-label task while increasing the amount of through-plane spatial evidence available to the model.',
    methodCards: [
      {
        title: 'Data preprocessing',
        items: [
          'Load co-registered NIfTI volumes for each patient.',
          'Stack T1, T1ce, T2, and FLAIR as four MRI input channels.',
          'Crop nonzero brain foreground to reduce redundant background.',
          'Apply per-modality z-score normalization within brain voxels.',
          'Construct WT / TC / ET multi-label masks from BraTS-style labels.',
          'Use patient-level train / validation / test splits to avoid slice leakage.',
        ],
      },
      {
        title: 'Task2 baseline',
        items: [
          'Train a 2D U-Net for slice-wise segmentation.',
          'Use one axial slice with four MRI modalities as input.',
          'Predict independent sigmoid masks for WT, TC, and ET.',
          'Use the 2D model as a strong reference rather than a weak baseline.',
        ],
      },
      {
        title: 'Task3 progression',
        items: [
          'Introduce 2.5D U-Net variants that use adjacent axial slices as local context.',
          'Evaluate whether neighboring slices help disambiguate TC and ET boundaries.',
          'Move from shallow depth context to full 3D volumetric feature learning.',
        ],
      },
      {
        title: 'Final model: HBA-VAN',
        items: [
          'Use a 3D residual encoder-decoder for volumetric reasoning.',
          'Apply attention-gated skip fusion, deep supervision, and boundary-aware auxiliary learning.',
          'Add an ET-specific refinement branch for the smallest subregion.',
          'Regularize predictions with the hierarchy ET ⊂ TC ⊂ WT.',
          'Reconstruct full-volume predictions with sliding-window inference.',
        ],
      },
    ],
    resultsIntro:
      'The final 3D HBA-VAN model improves both region overlap and boundary-sensitive evaluation. Compared with the 2D U-Net baseline, mean Dice increases from 0.8962 to 0.9167, while mean HD95 decreases from 6.6879 to 2.8165.',
    resultColumns: ['Method', 'Spatial Modeling', 'WT', 'TC', 'ET', 'Mean Dice', 'HD95'],
    resultRows: [
      ['Task2 U-Net', '2D', '0.9253', '0.9090', '0.8544', '0.8962', '6.6879'],
      ['Best 2.5D', '2.5D', '0.9381', '0.9224', '0.8667', '0.9091', '4.0447'],
      ['HBA-VAN', '3D', '0.9403', '0.9144', '0.8954', '0.9167', '2.8165'],
    ],
    resultHighlights: [
      'Mean Dice improves from 0.8962 for the 2D U-Net baseline to 0.9167 for HBA-VAN.',
      'Mean HD95 decreases from 6.6879 to 2.8165, indicating substantially better boundary localization.',
      'ET Dice improves from 0.8544 in Task2 U-Net to 0.8954 in HBA-VAN.',
      'The 2.5D model confirms the value of local inter-slice context, while full 3D modeling provides the best overall result.',
    ],
    metricCards: [
      { label: 'Mean Dice', value: '0.8962 → 0.9167', note: '2D U-Net to HBA-VAN' },
      { label: 'HD95', value: '6.6879 → 2.8165', note: 'lower boundary error' },
      { label: 'ET Dice', value: '0.8544 → 0.8954', note: 'small enhancing tumor gain' },
      { label: 'Spatial model', value: '2D → 2.5D → 3D', note: 'progressive context' },
    ],
    galleryIntro:
      'The figures below are cropped and web-optimized from the report and presentation materials, focusing on the actual diagrams and qualitative results rather than full-page screenshots.',
    gallery: [
      {
        src: '/projects/bme1312-proj2/multimodal-mri-segmentation.png',
        alt: 'Multi-modal MRI visualization with T1, T1ce, T2, FLAIR, and WT, TC, ET tumor masks.',
        caption: 'Multi-modal MRI visualization and nested WT / TC / ET target masks.',
      },
      {
        src: '/projects/bme1312-proj2/task2-unet-baseline.png',
        alt: 'Task2 2D U-Net slice-wise segmentation pipeline with sigmoid WT, TC, and ET outputs.',
        caption: 'Task2 baseline: 2D U-Net for four-channel axial slice segmentation.',
      },
      {
        src: '/projects/bme1312-proj2/hba-van-architecture.png',
        alt: 'HBA-VAN architecture with 3D residual encoder-decoder, attention gates, boundary head, ET refinement, hierarchy regularization, and sliding-window reconstruction.',
        caption: 'HBA-VAN architecture: volumetric attention, boundary learning, ET refinement, and hierarchy regularization.',
      },
      {
        src: '/projects/bme1312-proj2/cross-method-comparison.png',
        alt: 'Cross-method qualitative comparison among Task2 2D U-Net, 2.5D U-Net, and HBA-VAN with prediction and error maps.',
        caption: 'Cross-method qualitative comparison showing the progression from 2D to 2.5D to 3D segmentation.',
      },
      {
        src: '/projects/bme1312-proj2/ablation-error-map.png',
        alt: 'Ablation comparison showing 3D attention boundary model, HBA-VAN, and corresponding spatial error maps.',
        caption: 'Ablation and error-map visualization for ET refinement and boundary-aware prediction.',
      },
    ],
    contributionBullets: [
      'Contributed to the final project report and presentation material organization.',
      'Participated in result interpretation and qualitative analysis.',
      'Helped summarize the model design, experimental findings, and medical-imaging motivation.',
      'Integrated the project into a reproducible academic portfolio format.',
    ],
    linksIntro:
      'The original report and presentation slides are provided as static portfolio assets. No code link is shown because no public repository was provided for this project.',
    courseContext:
      'This was a team course project for BME1312 Artificial Intelligence in Medical Imaging. The webpage summarizes the technical work without displaying teammate student IDs, email addresses, or other unnecessary personal identifiers.',
  } as const;
const zhSource = {
    metaTitle: 'HBA-VAN 脑胶质瘤 MRI 分割课程项目 — 宋梓冬',
    metaDescription:
      'BME1312 医学影像人工智能课程项目：HBA-VAN，一种面向 BraTS 风格多模态脑胶质瘤子区域分割的层次边界感知体素注意力网络。',
    hero: {
      eyebrow: '课程项目 / 医学影像分割',
      title:
        'HBA-VAN: Hierarchical Boundary-Aware Volumetric Attention Network for Multi-Modal Glioma Subregion Segmentation',
      subtitle:
        '面向多模态 BraTS 脑胶质瘤子区域分割的边界感知 3D attention network。',
      affiliation: 'BME1312 Artificial Intelligence in Medical Imaging · 课程项目 · 上海科技大学 · 2026',
    },
    metadata: [
      'BME1312',
      '医学影像',
      '脑肿瘤分割',
      '3D U-Net',
      'Attention',
      'BraTS',
      'WT / TC / ET',
    ],
    labels: {
      course: '课程',
      type: '类型',
      task: '任务',
      modalities: '模态',
      targetRegions: '目标区域',
      summary: '摘要',
      pipeline: '流程',
      result: '结果',
      links: '链接',
      context: '背景',
    },
    sections: {
      overview: '项目概述',
      method: '方法设计',
      results: '核心结果',
      visuals: '视觉材料',
      contribution: '我的参与',
      links: '链接与资源',
      courseContext: '课程背景',
    },
    overview:
      '本项目面向配准后的多模态脑 MRI，研究自动化脑胶质瘤子区域分割。目标是预测三个具有临床含义且存在嵌套关系的区域：WT（Whole Tumor）、TC（Tumor Core）和 ET（Enhancing Tumor）。网页将其整理为一个从 2D slice-wise segmentation 逐步推进到完整 3D volumetric reasoning 的作品集项目。',
    overviewBullets: [
      'T1、T1ce、T2 和 FLAIR 为肿瘤范围、核心结构和增强区域提供互补信息。',
      'WT、TC 和 ET 是嵌套的 multi-label hierarchy，而不是互斥的语义类别。',
      'ET 通常很小且稀疏，带来严重类别不平衡和不稳定的 case-level Dice。',
      '肿瘤边界较模糊，因此 HD95 和 error map 与 overlap metric 同样重要。',
    ],
    regionCards: [
      { label: 'WT', value: 'Whole Tumor', note: '覆盖更广的异常肿瘤范围' },
      { label: 'TC', value: 'Tumor Core', note: '更紧凑且边界敏感的核心区域' },
      { label: 'ET', value: 'Enhancing Tumor', note: '较小且依赖增强模态的增强肿瘤区域' },
    ],
    methodIntro:
      '方法按照渐进式 pipeline 组织。各阶段保持 WT / TC / ET multi-label segmentation 任务不变，同时逐步增加模型可以利用的 through-plane spatial evidence。',
    methodCards: [
      {
        title: 'Data preprocessing',
        items: [
          '读取每个病例的配准 NIfTI volumes。',
          '将 T1、T1ce、T2 和 FLAIR 堆叠为四通道 MRI 输入。',
          '裁剪 nonzero brain foreground，减少冗余黑色背景。',
          '在 brain voxels 内对每个模态进行 z-score normalization。',
          '根据 BraTS-style labels 构造 WT / TC / ET multi-label masks。',
          '采用 patient-level train / validation / test split，避免 slice leakage。',
        ],
      },
      {
        title: 'Task2 baseline',
        items: [
          '训练 2D U-Net 进行 slice-wise segmentation。',
          '输入为单个 axial slice 上的四模态 MRI。',
          '输出 WT、TC 和 ET 三个独立 sigmoid masks。',
          '将 2D 模型作为强 baseline，而不是弱化的参考实现。',
        ],
      },
      {
        title: 'Task3 progression',
        items: [
          '引入 2.5D U-Net variants，将相邻 axial slices 作为局部上下文。',
          '评估 neighboring slices 对 TC 和 ET 边界判别的帮助。',
          '进一步从浅层 depth context 推进到完整 3D volumetric feature learning。',
        ],
      },
      {
        title: 'Final model: HBA-VAN',
        items: [
          '使用 3D residual encoder-decoder 进行体数据推理。',
          '结合 attention-gated skip fusion、deep supervision 与 boundary-aware auxiliary learning。',
          '为最小的 ET 子区域加入 ET-specific refinement branch。',
          '通过 ET ⊂ TC ⊂ WT 的 hierarchy regularization 约束预测。',
          '使用 sliding-window inference 重建 full-volume predictions。',
        ],
      },
    ],
    resultsIntro:
      '最终 3D HBA-VAN 同时提升了区域 overlap 与边界敏感指标。相比 2D U-Net baseline，mean Dice 从 0.8962 提升到 0.9167，mean HD95 从 6.6879 降低到 2.8165。',
    resultColumns: ['Method', 'Spatial Modeling', 'WT', 'TC', 'ET', 'Mean Dice', 'HD95'],
    resultRows: [
      ['Task2 U-Net', '2D', '0.9253', '0.9090', '0.8544', '0.8962', '6.6879'],
      ['Best 2.5D', '2.5D', '0.9381', '0.9224', '0.8667', '0.9091', '4.0447'],
      ['HBA-VAN', '3D', '0.9403', '0.9144', '0.8954', '0.9167', '2.8165'],
    ],
    resultHighlights: [
      'Mean Dice 从 2D U-Net baseline 的 0.8962 提升到 HBA-VAN 的 0.9167。',
      'Mean HD95 从 6.6879 降低到 2.8165，说明边界定位质量显著改善。',
      'ET Dice 从 Task2 U-Net 的 0.8544 提升到 HBA-VAN 的 0.8954。',
      '2.5D 模型验证了局部 inter-slice context 的价值，而完整 3D 建模取得最佳整体结果。',
    ],
    metricCards: [
      { label: 'Mean Dice', value: '0.8962 → 0.9167', note: '2D U-Net 到 HBA-VAN' },
      { label: 'HD95', value: '6.6879 → 2.8165', note: '边界误差降低' },
      { label: 'ET Dice', value: '0.8544 → 0.8954', note: '小增强肿瘤区域提升' },
      { label: 'Spatial model', value: '2D → 2.5D → 3D', note: '逐步增强空间上下文' },
    ],
    galleryIntro:
      '下方图片从报告和展示材料中裁剪并优化为网页素材，重点保留图表和定性结果本身，而不是直接展示完整页面截图。',
    gallery: [
      {
        src: '/projects/bme1312-proj2/multimodal-mri-segmentation.png',
        alt: '包含 T1、T1ce、T2、FLAIR 以及 WT、TC、ET 肿瘤 mask 的多模态 MRI 可视化。',
        caption: '多模态 MRI 可视化与嵌套 WT / TC / ET 目标 mask。',
      },
      {
        src: '/projects/bme1312-proj2/task2-unet-baseline.png',
        alt: 'Task2 2D U-Net slice-wise segmentation 流程，输出 WT、TC 和 ET sigmoid masks。',
        caption: 'Task2 baseline：四通道 axial slice 输入的 2D U-Net 分割流程。',
      },
      {
        src: '/projects/bme1312-proj2/hba-van-architecture.png',
        alt: 'HBA-VAN 架构图，包含 3D residual encoder-decoder、attention gates、boundary head、ET refinement、hierarchy regularization 和 sliding-window reconstruction。',
        caption: 'HBA-VAN 架构：volumetric attention、boundary learning、ET refinement 与 hierarchy regularization。',
      },
      {
        src: '/projects/bme1312-proj2/cross-method-comparison.png',
        alt: 'Task2 2D U-Net、2.5D U-Net 和 HBA-VAN 的定性比较，包含 prediction 和 error maps。',
        caption: '从 2D 到 2.5D 再到 3D segmentation 的跨方法定性对比。',
      },
      {
        src: '/projects/bme1312-proj2/ablation-error-map.png',
        alt: '展示 3D attention boundary model、HBA-VAN 及其空间 error maps 的 ablation comparison。',
        caption: 'ET refinement 与 boundary-aware prediction 的 ablation / error-map 可视化。',
      },
    ],
    contributionBullets: [
      'Contributed to the final project report and presentation material organization.',
      'Participated in result interpretation and qualitative analysis.',
      'Helped summarize the model design, experimental findings, and medical-imaging motivation.',
      'Integrated the project into a reproducible academic portfolio format.',
    ],
    linksIntro:
      '原始项目报告和展示 slides 作为静态 portfolio assets 提供。由于没有提供公开代码仓库，网页中不添加不存在的代码链接。',
    courseContext:
      '该项目是 BME1312 Artificial Intelligence in Medical Imaging 的团队课程项目。网页仅总结技术内容，不展示队友学号、邮箱或其他不必要的个人标识信息。',
  } as const;

export default defineProjectContent({
  id: 'bme1312-proj2',
  articleClass: 'bme1312-proj2-detail',
  heroCaptionFallback: 'project-title',
  heroActions: [{ type: 'email' }, { type: 'project-link', link: 'report', label: 'report' }, { type: 'project-link', link: 'slides', label: 'slides' }],
  documents: {
    en: {
      ...enSource,


      details: [
    { label: enSource.labels.course, value: 'BME1312' }, { label: enSource.labels.type, value: 'Course Project / Medical Image Segmentation' },
    { label: enSource.labels.task, value: 'BraTS-style multi-modal glioma subregion segmentation' },
    { label: enSource.labels.modalities, value: 'T1 · T1ce · T2 · FLAIR' }, { label: enSource.labels.targetRegions, value: 'WT · TC · ET' },
  ],
    },
    zh: {
      ...zhSource,


      details: [
    { label: zhSource.labels.course, value: 'BME1312' }, { label: zhSource.labels.type, value: '课程项目 / 医学影像分割' },
    { label: zhSource.labels.task, value: 'BraTS 风格多模态脑胶质瘤子区域分割' },
    { label: zhSource.labels.modalities, value: 'T1 · T1ce · T2 · FLAIR' }, { label: zhSource.labels.targetRegions, value: 'WT · TC · ET' },
  ],
    },
  },
  sections: [
    { id: 'overview', eyebrow: 'BME1312', title: 'sections.overview', intro: 'overview', blocks: [{ type: 'group', className: 'detail-two-column', blocks: [{ type: 'bullet-panel', items: 'overviewBullets', label: 'labels.summary' }, { type: 'metric-cards', items: 'regionCards', className: 'metric-cards-three region-card-grid', ariaLabel: 'labels.targetRegions' }] }] },
    { id: 'method', title: 'sections.method', intro: 'methodIntro', blocks: [{ type: 'card-grid', items: 'methodCards', label: 'labels.pipeline', className: 'method-grid bme1312-proj2-method-grid' }] },
    { id: 'key-results', title: 'sections.results', intro: 'resultsIntro', blocks: [{ type: 'metric-table', columns: 'resultColumns', rows: 'resultRows', className: 'metric-row-6', ariaLabel: 'HBA-VAN glioma segmentation quantitative comparison' }, { type: 'metric-cards', items: 'metricCards', ariaLabel: 'labels.result' }, { type: 'highlight', items: 'resultHighlights', label: 'labels.result' }] },
    { id: 'visuals', title: 'sections.visuals', intro: 'galleryIntro', blocks: [{ type: 'gallery', items: 'gallery', className: 'bme1312-proj2-gallery' }] },
    { id: 'contribution', title: 'sections.contribution', blocks: [{ type: 'bullet-panel', items: 'contributionBullets' }] },
    { id: 'links', title: 'sections.links', intro: 'linksIntro', blocks: [{ type: 'links', text: 'courseContext', links: ['report', 'slides'] }] },
  ],
});
