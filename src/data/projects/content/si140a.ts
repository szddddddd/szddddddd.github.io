import { defineProjectContent } from '../contentSchema';

const enSource = {
    metaTitle: 'SI140A WeChat Red Envelope Probability Project — Song Zidong',
    metaDescription:
      'SI140A Probability Theory course project reverse engineering WeChat Red Envelope allocation mechanisms with controlled data collection, empirical visualization, Monte Carlo simulation, KS test, and Chi-square test.',
    hero: {
      eyebrow: 'Course Project / Probability Theory',
      title: 'Reverse Engineering the Mechanism of WeChat Red Envelope',
      subtitle:
        'A probability modeling and statistical testing project that infers candidate allocation mechanisms from controlled WeChat Red Envelope data.',
      affiliation: 'SI140A Probability Theory · Course Project · ShanghaiTech University · January 2026',
    },
    metadata: [
      'SI140A Probability Theory',
      'Course Project',
      'Probability Modeling',
      'Monte Carlo Simulation',
      'KS Test',
      'Chi-square Test',
      'January 2026',
    ],
    labels: {
      course: 'Course',
      type: 'Type',
      date: 'Date',
      topic: 'Topic',
      summary: 'Summary',
      setting: 'Setting',
      method: 'Method',
      model: 'Model',
      test: 'Statistical test',
      conclusion: 'Conclusion',
      contribution: 'Contribution',
      links: 'Links',
    },
    sections: {
      overview: 'Overview',
      setting: 'Experimental Setting',
      methodology: 'Methodology',
      models: 'Candidate Models',
      findings: 'Key Findings',
      contribution: 'My Contribution',
      visuals: 'Visuals',
      links: 'Links',
    },
    overview:
      'This project studies whether the probabilistic allocation behavior of WeChat Red Envelope can be inferred from real experimental observations. Under a controlled data-collection protocol, we collected allocation records, visualized the empirical distribution, designed candidate probabilistic mechanisms, and compared the simulated mechanisms with observed data using formal goodness-of-fit tests.',
    overviewBullets: [
      'The project is framed as a probability modeling and statistical inference study rather than a routine programming assignment.',
      'Empirical plots are used to identify distributional patterns across recipient ranks and total allocation samples.',
      'Candidate mechanisms are evaluated by Monte Carlo simulation and statistical tests against the observed allocation frequency.',
      'The analysis suggests that the Twice-as-the-Mean mechanism better matches the observed WeChat Red Envelope behavior.',
    ],
    settingCards: [
      { label: 'Amount per envelope', value: '60 RMB', note: 'fixed total allocation' },
      { label: 'Recipients', value: '15', note: 'people per red envelope' },
      { label: 'Red envelopes', value: '150', note: 'controlled experiment rounds' },
      { label: 'Samples', value: '2,250', note: 'allocation observations' },
    ],
    methodIntro:
      'The methodology combines empirical visualization, analytic mechanism design, simulation-based approximation, and hypothesis testing. The goal is not to exactly reproduce the implementation inside WeChat, but to determine which transparent probabilistic model is most consistent with the collected evidence.',
    methodCards: [
      {
        title: 'Data processing and visualization',
        items: [
          'Cleaned the allocation records into rank-wise and global samples.',
          'Examined histograms, boxplots, and scatter plots to summarize distributional behavior.',
        ],
      },
      {
        title: 'Candidate mechanism design',
        items: [
          'Formulated allocation rules with equal expected value across ranks.',
          'Derived expectation and variance properties for candidate mechanisms.',
        ],
      },
      {
        title: 'Monte Carlo simulation',
        items: [
          'Generated synthetic allocation samples under each candidate mechanism.',
          'Estimated theoretical frequency distributions for comparison with real data.',
        ],
      },
      {
        title: 'KS and Chi-square tests',
        items: [
          'Applied the Kolmogorov-Smirnov test to compare sample distributions.',
          'Applied a Chi-square test after frequency bin merging for expected-count validity.',
        ],
      },
      {
        title: 'Model comparison',
        items: [
          'Compared test statistics, p-values, and visual distributional patterns.',
          'Selected the mechanism with stronger empirical alignment and smaller deviations.',
        ],
      },
    ],
    modelsIntro:
      'Two primary candidate mechanisms were tested. The page summarizes their modeling ideas without reproducing the full derivations from the report.',
    modelCards: [
      {
        title: 'Gamma-Dirichlet Split',
        items: [
          'Samples allocation proportions through a Gamma / Dirichlet construction.',
          'Uses a concentration parameter to control variance while preserving target expectations.',
          'Provides analytic convenience, but its fitted distribution deviated significantly from the observed data.',
        ],
      },
      {
        title: 'Twice-as-the-Mean Mechanism',
        items: [
          'Sequentially allocates a random amount bounded by twice the current remaining mean.',
          'Keeps the expected value approximately balanced across recipient ranks.',
          'Naturally produces larger variance for later recipients, matching a key empirical pattern.',
        ],
      },
    ],
    findingsIntro:
      'The empirical and simulation results point to a clear qualitative conclusion: the Twice-as-the-Mean mechanism is closer to the observed WeChat Red Envelope distribution, while Gamma-Dirichlet Split produces a visibly and statistically different allocation pattern.',
    resultColumns: ['Model', 'KS p-value', 'Chi-square p-value', 'Interpretation'],
    resultRows: [
      ['Gamma-Dirichlet Split', '5.23e-6', '2.75e-69', 'Significant deviation'],
      ['Twice-as-the-Mean', '0.0869', '8.75e-11', 'Better empirical alignment'],
    ],
    findingBullets: [
      'All recipient ranks have roughly similar expected values, with an overall empirical mean of 4.00 RMB.',
      'Later recipient ranks exhibit larger variance and more extreme high-value observations.',
      'Gamma-Dirichlet Split differs significantly from the observed allocation frequency under both tests.',
      'Twice-as-the-Mean passes the KS test at the 5% level and has a much smaller Chi-square deviation than Gamma-Dirichlet Split.',
      'Further explorations considered user-specific allocation mechanisms and fairness-aware red envelope designs.',
    ],
    contributionBullets: [
      'Derived and verified the expectation and variance of candidate mechanisms.',
      'Organized and coordinated the experiment.',
      'Contributed to part of the implementation.',
      'Verified simulation results and statistical conclusions.',
    ],
    galleryIntro:
      'The figures below are web-optimized visuals extracted and redesigned from the project report, preserving the empirical histogram and rank-wise boxplot analysis without showing full PDF pages.',
    gallery: [
      {
        src: '/projects/si140a/total-histogram.png',
        alt: 'Total histogram of WeChat Red Envelope allocation samples with mean 4.00 RMB.',
        caption: 'Empirical total histogram over 2,250 allocation samples.',
      },
      {
        src: '/projects/si140a/rank-boxplots.png',
        alt: 'Boxplots of WeChat Red Envelope allocation amounts by recipient rank.',
        caption: 'Rank-wise boxplots showing comparable expected values and increasing tail behavior.',
      },
    ],
    linksIntro:
      'The full report contains the complete derivations, simulation code excerpts, statistical tests, and appendix materials. No code repository is linked because no public repository was provided for this project.',
    reportNote:
      'The PDF is provided as the original course report; the portfolio page intentionally omits raw teammate student IDs and other unnecessary personal identifiers.',
  } as const;
const zhSource = {
    metaTitle: 'SI140A 微信红包概率机制逆向工程课程项目 — 宋梓冬',
    metaDescription:
      'SI140A 概率论课程项目：基于受控实验数据，使用经验可视化、蒙特卡洛仿真、KS 检验和卡方检验逆向分析微信红包金额分配机制。',
    hero: {
      eyebrow: '课程项目 / 概率论',
      title: 'Reverse Engineering the Mechanism of WeChat Red Envelope',
      subtitle:
        '一个基于受控微信红包实验数据的概率建模与统计检验项目，用于比较候选金额分配机制。',
      affiliation: 'SI140A Probability Theory · 课程项目 · 上海科技大学 · 2026 年 1 月',
    },
    metadata: [
      'SI140A Probability Theory',
      '课程项目',
      '概率建模',
      'Monte Carlo Simulation',
      'KS Test',
      'Chi-square Test',
      '2026 年 1 月',
    ],
    labels: {
      course: '课程',
      type: '类型',
      date: '日期',
      topic: '主题',
      summary: '摘要',
      setting: '实验设置',
      method: '方法',
      model: '模型',
      test: '统计检验',
      conclusion: '结论',
      contribution: '贡献',
      links: '链接',
    },
    sections: {
      overview: '项目概述',
      setting: '实验设置',
      methodology: '方法设计',
      models: '候选模型',
      findings: '核心发现',
      contribution: '我的贡献',
      visuals: '可视化',
      links: '链接',
    },
    overview:
      '该项目研究能否从真实实验观测数据中反推出微信红包的概率分配行为。在受控数据采集协议下，我们收集红包金额分配记录，对经验分布进行可视化，设计候选概率机制，并通过正式的拟合优度检验比较仿真机制与观测数据的一致性。',
    overviewBullets: [
      '该项目被整理为概率建模与统计推断研究，而不是普通编程作业展示。',
      '通过经验直方图、箱线图和散点图分析不同领取顺序及总体样本的分布模式。',
      '候选机制通过蒙特卡洛仿真生成理论频率，再与真实分配频率进行统计检验。',
      '分析结果表明，Twice-as-the-Mean 机制更接近观测到的微信红包行为。',
    ],
    settingCards: [
      { label: '单个红包金额', value: '60 RMB', note: '固定总金额' },
      { label: '领取人数', value: '15', note: '每个红包的接收者数量' },
      { label: '红包数量', value: '150', note: '受控实验轮数' },
      { label: '样本数量', value: '2,250', note: '金额分配观测值' },
    ],
    methodIntro:
      '项目方法结合了经验可视化、解析机制设计、基于仿真的近似分布估计和假设检验。目标不是完全复刻微信内部实现，而是判断哪个透明的概率模型与收集到的证据最一致。',
    methodCards: [
      {
        title: '数据处理与可视化',
        items: [
          '将分配记录整理为按领取顺序划分的样本和总体样本。',
          '使用直方图、箱线图和散点图总结经验分布特征。',
        ],
      },
      {
        title: '候选机制设计',
        items: [
          '构造在不同领取顺序上具有相同期望的分配规则。',
          '推导并验证候选机制的期望与方差性质。',
        ],
      },
      {
        title: '蒙特卡洛仿真',
        items: [
          '在每个候选机制下生成合成红包分配样本。',
          '估计理论频率分布，用于与真实数据进行比较。',
        ],
      },
      {
        title: 'KS 与卡方检验',
        items: [
          '使用 Kolmogorov-Smirnov 检验比较样本分布差异。',
          '在合并低期望频数区间后使用卡方检验比较频率。',
        ],
      },
      {
        title: '模型比较',
        items: [
          '综合比较检验统计量、p-value 和可视化分布差异。',
          '选择与观测数据更一致、偏差更小的候选机制。',
        ],
      },
    ],
    modelsIntro:
      '项目主要检验了两个候选机制。这里保留核心建模思想，不在网页中完整复刻报告中的公式推导。',
    modelCards: [
      {
        title: 'Gamma-Dirichlet Split',
        items: [
          '通过 Gamma / Dirichlet 构造采样金额分配比例。',
          '使用集中参数控制方差，同时保持目标期望。',
          '解析性质较清晰，但拟合后的分布与真实数据存在显著差异。',
        ],
      },
      {
        title: 'Twice-as-the-Mean Mechanism',
        items: [
          '按顺序分配金额，每一步的随机上界为当前剩余均值的两倍。',
          '在不同领取顺序上维持近似相同的期望金额。',
          '自然产生后续领取者方差更大的现象，与经验观察更一致。',
        ],
      },
    ],
    findingsIntro:
      '经验分析与仿真检验共同指向一个清晰结论：Twice-as-the-Mean 机制更接近观测到的微信红包分布，而 Gamma-Dirichlet Split 在可视化和统计检验上都显示出明显偏差。',
    resultColumns: ['模型', 'KS p-value', '卡方 p-value', '解释'],
    resultRows: [
      ['Gamma-Dirichlet Split', '5.23e-6', '2.75e-69', '显著偏离'],
      ['Twice-as-the-Mean', '0.0869', '8.75e-11', '更接近经验分布'],
    ],
    findingBullets: [
      '不同领取顺序的期望金额大致相近，总体经验均值为 4.00 RMB。',
      '后续领取者呈现更大的方差，并更容易出现较大的高金额观测值。',
      'Gamma-Dirichlet Split 在两种统计检验下都与真实频率存在显著差异。',
      'Twice-as-the-Mean 在 5% 显著性水平下通过 KS 检验，且卡方偏差明显小于 Gamma-Dirichlet Split。',
      '后续探索包括 user-specific allocation mechanisms 和 fairness-aware red envelope designs。',
    ],
    contributionBullets: [
      'Derived and verified the expectation and variance of candidate mechanisms.',
      'Organized and coordinated the experiment.',
      'Contributed to part of the implementation.',
      'Verified simulation results and statistical conclusions.',
    ],
    galleryIntro:
      '以下图片从课程报告中的图表提取并重新设计为适合网页展示的版本，保留总体直方图和按领取顺序划分的箱线图分析，而不是直接展示整页 PDF 截图。',
    gallery: [
      {
        src: '/projects/si140a/total-histogram.png',
        alt: '微信红包金额分配样本总体直方图，均值为 4.00 RMB。',
        caption: '基于 2,250 个金额分配样本的总体经验直方图。',
      },
      {
        src: '/projects/si140a/rank-boxplots.png',
        alt: '按照领取顺序划分的微信红包金额箱线图。',
        caption: '按领取顺序划分的箱线图，展示相近的期望与后续顺序更明显的尾部波动。',
      },
    ],
    linksIntro:
      '完整报告包含详细推导、仿真代码片段、统计检验与附录材料。由于没有提供公开代码仓库，因此网页中不添加虚假的代码链接。',
    reportNote:
      'PDF 作为原始课程报告提供；作品集页面本身有意不展示队友学号等不必要的个人标识信息。',
  } as const;

export default defineProjectContent({
  id: 'si140a',
  articleClass: 'si140a-detail',
  heroFigureClass: 'si140a-cover-figure',
  heroCaption: 'gallery.0.caption',
  heroActions: [{ type: 'project-link', link: 'report', label: 'report', optional: true }],
  documents: {
    en: {
      ...enSource,


      details: [
    { label: enSource.labels.course, value: 'SI140A Probability Theory' },
    { label: enSource.labels.type, value: 'Course Project / Probability Theory' },
    { label: enSource.labels.date, value: '2026' },
    { label: enSource.labels.topic, value: 'Reverse engineering WeChat Red Envelope allocation mechanisms' },
  ],
    },
    zh: {
      ...zhSource,


      details: [
    { label: zhSource.labels.course, value: 'SI140A 概率论' },
    { label: zhSource.labels.type, value: '课程项目 / 概率论' },
    { label: zhSource.labels.date, value: '2026' },
    { label: zhSource.labels.topic, value: '微信红包金额分配机制逆向分析' },
  ],
    },
  },
  sections: [
    { id: 'overview', eyebrow: 'SI140A', title: 'sections.overview', intro: 'overview', blocks: [{ type: 'group', className: 'detail-two-column', blocks: [{ type: 'bullet-panel', items: 'overviewBullets', label: 'labels.summary' }, { type: 'figure', item: 'gallery.0', className: 'compact-figure si140a-figure' }] }] },
    { id: 'experimental-setting', title: 'sections.setting', blocks: [{ type: 'metric-cards', items: 'settingCards', className: 'si140a-setting-cards', ariaLabel: 'sections.setting' }] },
    { id: 'methodology', title: 'sections.methodology', intro: 'methodIntro', blocks: [{ type: 'card-grid', items: 'methodCards', label: 'labels.method', className: 'method-grid si140a-method-grid' }] },
    { id: 'candidate-models', title: 'sections.models', intro: 'modelsIntro', blocks: [{ type: 'card-grid', items: 'modelCards', label: 'labels.model', className: 'method-detail-grid', cardClassName: 'panel method-technical-panel' }] },
    { id: 'key-findings', title: 'sections.findings', intro: 'findingsIntro', blocks: [{ type: 'metric-table', columns: 'resultColumns', rows: 'resultRows', className: 'metric-row-3', ariaLabel: 'SI140A statistical test comparison' }, { type: 'highlight', items: 'findingBullets', label: 'labels.conclusion' }] },
    { id: 'my-contribution', title: 'sections.contribution', blocks: [{ type: 'highlight', items: 'contributionBullets', label: 'labels.contribution' }] },
    { id: 'visuals', title: 'sections.visuals', intro: 'galleryIntro', blocks: [{ type: 'gallery', items: 'gallery', className: 'si140a-gallery-grid', figureClassName: 'si140a-figure' }] },
    { id: 'links', title: 'sections.links', intro: 'linksIntro', blocks: [{ type: 'links', text: 'reportNote', links: ['report'], className: 'si140a-links-panel' }] },
  ],
});
