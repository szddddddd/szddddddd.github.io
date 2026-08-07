import { defineProjectContent } from '../contentSchema';

const enSource = {
  metaTitle: 'TI Cup 2026 H Problem: Balancing Ball Motion Control — Song Zidong',
  metaDescription:
    'Song Zidong\'s 2026 TI Cup Shanghai H-problem project: a two-layer vehicle combining line following, machine vision, and ball-on-rail motion control.',
  hero: {
    eyebrow: 'Competition Project / Embedded Systems',
    title: 'TI Cup 2026 H Problem: Car-Borne Balancing Ball Motion Control System',
    subtitle:
      'A two-layer electromechanical platform combining line following, machine vision, and closed-loop ball balancing.',
    affiliation: '2026 TI Cup Shanghai Collegiate Electronic Design Competition · H Problem · ShanghaiTech University',
  },
  metadata: [
    'TI Cup 2026',
    'H Problem',
    'Embedded Systems',
    'Computer Vision',
    'Motion Control',
    'Third Prize · Preliminary Evaluation',
  ],
  labels: {
    system: 'System Summary',
    architecture: 'Architecture',
    metrics: 'Acceptance Metrics',
    acceptance: 'Physical Acceptance',
    team: 'Official Team Record',
    scope: 'Source Note',
    report: 'Open Technical Report',
    award: 'Open Preliminary Award List',
  },
  sections: {
    overview: 'Overview',
    architecture: 'System Architecture',
    results: 'Testing and Results',
    award: 'Award Record',
    note: 'Source and Attribution',
  },
  overview:
    'The project implements a two-layer four-wheel vehicle for the H problem of the 2026 TI Cup Shanghai collegiate electronic design competition. The lower layer handles infrared line following, differential drive, task timing, and A-point recognition. The upper layer uses MaixCAM2 to observe the steel ball and controls a longitudinal PPR rail through an outer ball-position loop and an inner QEI position loop.',
  overviewBullets: [
    'The lower controller uses a six-channel infrared array, weighted line-position error, discrete PD correction, segmented speed control, lost-line recovery, and task timing.',
    'The upper controller combines MaixCAM2 circle detection with an MSPM0G3507 controller, D36A stepper driver, MS42C stepper motor, and a linkage-driven rail.',
    'A two-wire pulse-level interface synchronizes task selection, execution, query, and running-state feedback between the two controllers.',
    'The vehicle is designed within the 35 cm × 25 cm size constraint and supports six physical task procedures.',
  ],
  architectureIntro:
    'The report separates the system into independently running control loops with different time scales, then joins them through task-level synchronization.',
  architectureCards: [
    {
      title: 'Lower Layer / Chassis',
      items: [
        'Six-channel infrared line sensor and LP-MSPM0G3507 controller.',
        'Two TB6612 dual H-bridge drivers and four MG513 geared motors.',
        'Weighted line error, discrete PD differential drive, speed scheduling, and A-point recognition.',
      ],
    },
    {
      title: 'Upper Layer / Ball Control',
      items: [
        'MaixCAM2 ROI circle detection and UART2 ball-position frames.',
        'Ball-position outer loop with QEI position inner loop.',
        'D36A / MS42C stepper actuation for the longitudinal PPR rail.',
      ],
    },
    {
      title: 'Task Synchronization',
      items: [
        'Pulse-width commands encode task selection, execution, and query operations.',
        'The lower layer reports task state and keeps the OLED timing display updated.',
        'Tasks 1–6 combine chassis motion, ball control, timing, and stopping conditions.',
      ],
    },
  ],
  resultsIntro:
    'The report records that all six physical acceptance procedures passed. The clearest quantitative result is the task-2 one-lap run, which finished in 16.8 seconds with a stopping deviation below 1 cm.',
  metrics: [
    { label: 'Physical tasks accepted', value: '6 / 6', note: 'H-R1 through H-R6 passed' },
    { label: 'Task 2 lap time', value: '16.8 s', note: '3.2 s below the 20 s limit' },
    { label: 'Task 2 stopping deviation', value: '< 1 cm', note: 'official criterion: ≤ 2 cm' },
    { label: 'Vehicle envelope', value: '35 × 25 cm', note: 'competition size constraint' },
  ],
  resultHighlights: [
    'H-R1 external display and complete recording: passed.',
    'H-R2 one-lap line following and stop: 16.8 s, stopping deviation below 1 cm.',
    'H-R3 fixed-point ball motion, H-R4 A-to-B traversal, H-R5 fixed-point lap, and H-R6 selected-position lap: passed.',
  ],
  awardIntro:
    'The official preliminary award list records the team under H problem at ShanghaiTech University. The page shows only the team associated with this project and links the complete source list as a PDF.',
  awardSummary: [
    'Problem: H — Car-Borne Balancing Ball Motion Control System.',
    'School: ShanghaiTech University.',
    'Students: Song Zidong, Ning Zidong, and Shao Zhengran — Third Prize, preliminary evaluation.',
  ],
  sourcesIntro:
    'The technical report and official preliminary award list are preserved as the two source documents for this project.',
  note:
    'The technical report is an anonymous design report. The page therefore records the official team membership and competition result without assigning specific engineering tasks to individual students.',
} as const;

const zhSource = {
  metaTitle: '2026 TI 杯 H 题：车载平衡滚球运动控制系统 — 宋梓冬',
  metaDescription:
    '宋梓冬参与的 2026 年 TI 杯上海赛区 H 题项目：结合循迹、机器视觉与滚球摆杆运动控制的双层车载系统。',
  hero: {
    eyebrow: '竞赛项目 / 嵌入式系统',
    title: '2026 TI 杯 H 题：车载平衡滚球运动控制系统',
    subtitle: '一个结合循迹、机器视觉与闭环滚球控制的双层机电平台。',
    affiliation: '2026 年 TI 杯上海市大学生电子设计竞赛 · H 题 · 上海科技大学',
  },
  metadata: [
    '2026 TI 杯',
    'H 题',
    '嵌入式系统',
    '机器视觉',
    '运动控制',
    '三等奖 · 初评',
  ],
  labels: {
    system: '系统摘要',
    architecture: '系统架构',
    metrics: '验收指标',
    acceptance: '实物验收',
    team: '官方队伍记录',
    scope: '来源说明',
    report: '打开技术报告',
    award: '打开获奖名单（初评）',
  },
  sections: {
    overview: '项目概览',
    architecture: '系统架构',
    results: '测试与结果',
    award: '获奖记录',
    note: '来源与署名说明',
  },
  overview:
    '本项目面向 2026 年 TI 杯上海市大学生电子设计竞赛 H 题，设计并实现一辆双层四轮车。下层负责红外循迹、差速驱动、任务计时与 A 点识别；上层使用 MaixCAM2 检测钢球，通过球位外环与 QEI 位置内环控制纵向 PPR 摆杆。',
  overviewBullets: [
    '下层控制器使用六路红外阵列、加权线位误差、离散 PD 差速校正、分段调速、丢线恢复与任务计时。',
    '上层控制器结合 MaixCAM2 圆检测、MSPM0G3507 主控、D36A 步进驱动、MS42C 步进电机和连杆摆杆。',
    '两块主控通过双线脉宽接口同步任务选择、执行、查询与运行状态回复。',
    '整车在 35 cm × 25 cm 尺寸约束内完成六项实物任务。',
  ],
  architectureIntro:
    '报告将两个不同时间尺度的控制回路分层运行，再通过任务级通信完成整车协同。',
  architectureCards: [
    {
      title: '下层 / 底盘循迹',
      items: [
        '六路红外巡线传感器与 LP-MSPM0G3507 主控。',
        '两块 TB6612 双路驱动和四台 MG513 减速电机。',
        '加权线位误差、离散 PD 四轮差速、分段调速与 A 点识别。',
      ],
    },
    {
      title: '上层 / 滚球控制',
      items: [
        'MaixCAM2 ROI 圆检测与 UART2 球位文本帧。',
        '球位外环与 QEI 位置内环串级控制。',
        'D36A / MS42C 步进执行机构驱动纵向 PPR 摆杆。',
      ],
    },
    {
      title: '任务同步',
      items: [
        '使用脉宽编码任务选择、执行与查询命令。',
        '下层回复任务状态并维护 OLED 计时显示。',
        '任务 1–6 组合底盘运动、滚球控制、计时和停车判据。',
      ],
    },
  ],
  resultsIntro:
    '报告记录六项实物验收全部通过。其中任务 2 完成一圈的量化结果为 16.8 秒，停车偏差小于 1 厘米。',
  metrics: [
    { label: '实物任务验收', value: '6 / 6', note: 'H-R1 至 H-R6 全部通过' },
    { label: '任务 2 一圈用时', value: '16.8 s', note: '低于 20 s 判据 3.2 s' },
    { label: '任务 2 停车偏差', value: '< 1 cm', note: '官方判据为 ≤ 2 cm' },
    { label: '整车尺寸约束', value: '35 × 25 cm', note: '竞赛题目要求' },
  ],
  resultHighlights: [
    'H-R1 外部显示与完整录像：通过。',
    'H-R2 一圈循迹与停车：16.8 秒，停车偏差小于 1 厘米。',
    'H-R3 定点滚球、H-R4 A 到 B、H-R5 定点一圈与 H-R6 指定球位一圈：通过。',
  ],
  awardIntro:
    '官方获奖名单（初评）将该队列于 H 题、上海科技大学名下。页面只展示与本项目对应的队伍，并保留完整名单 PDF 作为来源。',
  awardSummary: [
    '题号：H — 车载平衡滚球运动控制系统。',
    '参赛学校：上海科技大学。',
    '学生：宋梓冬、宁梓栋、邵钲然 — 三等奖（初评）。',
  ],
  sourcesIntro: '技术报告与官方获奖名单（初评）作为本项目的两份来源文件保存在网页中。',
  note: '技术报告为匿名设计报告。因此页面只记录官方名单中的队伍成员与竞赛结果，不将具体工程任务分配给个人。',
} as const;

export default defineProjectContent({
  id: 'ti-cup-2026',
  heroCaption: 'heroCaption',
  heroActions: [
    { type: 'project-link', link: 'report', label: 'report' },
    { type: 'project-link', link: 'award', label: 'award' },
  ],
  documents: {
    en: {
      ...enSource,
      heroCaption: 'Dual-layer control, actuation, and power architecture for the H-problem vehicle.',
      details: [
        { label: 'Competition', value: '2026 TI Cup Shanghai Collegiate Electronic Design Competition' },
        { label: 'Problem', value: 'H — Car-Borne Balancing Ball Motion Control System' },
        { label: 'Award', value: 'Third Prize · Preliminary Evaluation' },
        { label: 'Team', value: 'Song Zidong · Ning Zidong · Shao Zhengran' },
      ],
    },
    zh: {
      ...zhSource,
      heroCaption: 'H 题车载系统的双层控制、执行与供电关系图。',
      details: [
        { label: '竞赛', value: '2026 年 TI 杯上海市大学生电子设计竞赛' },
        { label: '题目', value: 'H — 车载平衡滚球运动控制系统' },
        { label: '奖项', value: '三等奖（初评）' },
        { label: '队伍', value: '宋梓冬 · 宁梓栋 · 邵钲然' },
      ],
    },
  },
  sections: [
    {
      id: 'overview',
      eyebrow: 'H / 2026',
      title: 'sections.overview',
      intro: 'overview',
      blocks: [
        {
          type: 'group',
          className: 'detail-two-column',
          blocks: [
            { type: 'bullet-panel', items: 'overviewBullets', label: 'labels.system' },
            {
              type: 'figure',
              src: '/projects/ti-cup-2026/system-architecture.png',
              alt: 'heroCaption',
              caption: 'heroCaption',
              className: 'compact-figure',
            },
          ],
        },
      ],
    },
    {
      id: 'architecture',
      title: 'sections.architecture',
      intro: 'architectureIntro',
      blocks: [{ type: 'card-grid', items: 'architectureCards', className: 'method-detail-grid', cardClassName: 'panel method-technical-panel' }],
    },
    {
      id: 'results',
      title: 'sections.results',
      intro: 'resultsIntro',
      blocks: [
        { type: 'metric-cards', items: 'metrics', ariaLabel: 'labels.metrics' },
        { type: 'highlight', items: 'resultHighlights', label: 'labels.acceptance' },
      ],
    },
    {
      id: 'award',
      title: 'sections.award',
      intro: 'awardIntro',
      blocks: [
        { type: 'highlight', items: 'awardSummary', label: 'labels.team' },
        { type: 'links', text: 'sourcesIntro', links: ['report', 'award'] },
      ],
    },
    {
      id: 'source-note',
      title: 'sections.note',
      blocks: [{ type: 'narrative', text: 'note', label: 'labels.scope' }],
    },
  ],
});
