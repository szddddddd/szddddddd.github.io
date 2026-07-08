export const zh = {
  lang: 'zh',
  htmlLang: 'zh-CN',
  languageName: '中文',
  switchLabel: 'English',
  meta: {
    siteTitle: '宋梓冬 — 学术个人主页',
    description:
      '宋梓冬的学术个人主页，展示视觉计算、三维重建、神经渲染、World Models 与课程项目等内容。',
  },
  common: {
    skipToContent: '跳转到正文',
    comingSoon: '即将更新',
    disabledLink: '即将更新',
    builtWith: '使用 Astro 构建并部署于 GitHub Pages。',
    project: '项目',
    publication: '论文',
    courseProject: '课程项目',
    placeholder: '占位内容',
    bio: '简介',
    noItems: '暂未添加内容。',
  },
  nav: {
    home: '首页',
    about: '关于',
    projects: '项目',
    publications: '论文',
    coursework: '课程',
    notes: '笔记',
    contact: '联系',
  },
  hero: {
    eyebrow: '学术主页 / 视觉研究身份',
    statement:
      '我关注连接三维几何、神经表示与生成式场景理解的视觉系统。',
    primaryAction: '查看项目',
    secondaryAction: '联系我',
    cvAction: 'CV',
    githubAction: 'GitHub',
    emailAction: 'Email',
    visualIndex: '3D / 视觉场',
    identityLabels: {
      role: '身份',
      university: '学校',
      lab: '实验室',
      major: '专业',
    },
    majorPrefix: '专业',
  },
  about: {
    eyebrow: '关于',
    pageTitle: '关于我',
    title: '面向研究的学术主页',
    intro: '页面内容保持克制、清晰、可维护，后续可继续补充教育经历、课程、奖项与研究动态。',
    bio:
      '我是上海科技大学计算机科学专业本科生，目前在 VRVC Lab。我的项目与课程实践主要围绕视觉计算中的几何重建与学习式表示展开。',
    profileTitle: '个人简介',
    identityTitle: '学术信息',
    interestsTitle: '研究兴趣',
    futureTitle: '后续更新',
    futureItems: ['教育经历', '课程学习', '奖项荣誉', '研究动态'],
  },
  projects: {
    eyebrow: '研究 / 项目',
    pageTitle: '项目',
    title: '作为视觉研究载体的项目展示',
    intro: '这里整理研究原型、课程项目、代码、演示与论文链接等项目内容。',
    fullTitle: '项目索引',
    fullIntro: '研究原型、课程项目与技术作品的统一索引。',
    viewAll: '打开项目索引',
    labels: {
      details: '详情',
      report: '报告',
      paper: '论文',
      code: '代码',
      demo: '演示',
    },
  },
  publications: {
    eyebrow: '论文',
    pageTitle: '论文与学术产出',
    title: '论文与学术产出',
    intro: '在提供真实论文或 manuscript 信息之前，此处保持为空。',
    empty: '论文与学术产出将后续补充。',
    support: '数据结构已支持 title、authors、venue、year、paper URL、code URL、BibTeX 与 DOI。',
    labels: {
      paper: '论文',
      code: '代码',
      bibtex: 'BibTeX',
      doi: 'DOI',
    },
  },
  coursework: {
    eyebrow: '课程 / 课程项目',
    pageTitle: '课程项目',
    title: '课程项目',
    intro: '课程项目已合并到项目页面。',
    empty: '课程项目将后续补充。',
    mergedTitle: '已合并到项目页面',
    mergedIntro: '课程项目已合并到项目页面。',
    viewProjects: '查看项目',
  },
  notes: {
    eyebrow: '笔记 / 博客',
    pageTitle: '笔记',
    title: '笔记',
    intro: '这里将作为后续研究笔记、技术反思与阅读总结的轻量写作空间。',
    empty: '笔记将后续补充。',
  },
  contact: {
    eyebrow: '联系',
    pageTitle: '联系',
    title: '联系方式',
    intro: '当前仅展示已提供的邮箱、GitHub 主页与 CV 占位信息。',
    email: '邮箱',
    github: 'GitHub',
    cv: 'CV',
  },
  bme1312: {
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
  },
  si100b: {
    metaTitle: 'SI100B SAVE MY LINEAR ALGEBRA Pygame 项目 — 宋梓冬',
    metaDescription:
      'SI100B 课程项目，使用 Pygame 实现了一个受《以撒的结合》启发的 2D Roguelike 游戏，包含房间探索、实时射击、敌人、NPC 交互、资源 UI 和 Boss 战。',
    hero: {
      eyebrow: '课程项目 / SI100B',
      title: 'SAVE MY LINEAR ALGEBRA：Pygame Roguelike 游戏项目',
      subtitle: '一个小组合作完成的 SI100B Pygame 课程项目，受《以撒的结合》的房间式 Roguelike 结构启发。',
      affiliation: 'SI100B 课程项目 · 上海科技大学 · 2024 Fall',
    },
    authors: ['潘佑邦', '吴俊阳', '宋梓冬'],
    metadata: [
      'SI100B',
      'Pygame',
      'Python',
      '2D Roguelike Game',
      '课程项目',
      '房间探索',
      '敌人系统',
      'NPC 交互',
    ],
    labels: {
      course: '课程',
      type: '类型',
      term: '学期',
      team: '团队',
      summary: '摘要',
      gameplay: '玩法',
      system: '系统',
      contribution: '贡献',
      links: '链接',
      report: '报告',
    },
    sections: {
      overview: '项目概述',
      gameplay: '玩法设计',
      systems: '系统设计',
      reportDesign: '报告设计补充',
      contribution: '我的贡献',
      gallery: '视觉展示',
      courseContext: '课程背景',
      links: '相关链接',
    },
    overview:
      'Team SAVE MY LINEAR ALGEBRA 是一个使用 Pygame 实现的 SI100B 课程项目。项目是受《以撒的结合》启发的 2D Roguelike 原型，包含过程式连接房间、实时移动与射击、敌人遭遇、资源 UI、NPC 交互、抽奖机、炸弹、冲刺机制以及动画场景等内容。',
    overviewBullets: [
      '该游戏以团队课程项目形式展示，不是商业发布作品。',
      '玩家需要探索连接房间、清理怪物、收集金币、遇见 NPC，并挑战最终 Boss。',
      '实现内容结合了 Pygame 场景、精灵动画、房间逻辑、战斗逻辑和 UI 系统。',
      'README 中列出的团队成员为潘佑邦、吴俊阳和宋梓冬。',
    ],
    gameplayIntro:
      'README 描述了一个键盘驱动的 Roguelike 循环：进入房间、实时射击、使用冲刺和炸弹、与特殊对象交互，并积累资源挑战 Boss。',
    gameplayCards: [
      {
        title: '移动与战斗',
        items: [
          'WASD 控制八方向移动。',
          '方向键控制八方向射击。',
          'LSHIFT 用于冲刺和快速调整位置。',
        ],
      },
      {
        title: '探索循环',
        items: [
          '玩家进入房间、清理怪物，并解锁相邻房间的门。',
          '主要目标包括收集金币、提升能力，并在最终 Boss 前尽可能变强。',
          'E 键可以放置炸弹，作为额外的资源型动作。',
        ],
      },
      {
        title: '交互机制',
        items: [
          'Q 键用于与抽奖机和 NPC 交互。',
          '玩家在探索过程中可以遇到 Trainer 和 Merchant。',
          '完整流程最终进入 Boss 战。',
        ],
      },
    ],
    systemIntro:
      '项目通过地图生成、房间类型、场景管理、敌人系统、资源 UI、NPC 系统和 hardship coefficient 组织游戏流程；击败 Boss 后难度会继续提升。',
    systemCards: [
      {
        title: '地图与房间',
        items: [
          '基于二叉树的地图生成。',
          '使用随机生成和迭代式回溯。',
          '房间类型包括 Common room、Boss room、Lucky room 和 NPC room。',
        ],
      },
      {
        title: '资源与 UI',
        items: [
          'Health 显示剩余生命值。',
          'Coin 记录收集到的金币数量。',
          'Attack 和 Bomb UI 展示战斗与资源状态。',
        ],
      },
      {
        title: '敌人与 Boss',
        items: [
          'Fly / BloodyFly 会移动，并在接触玩家时造成伤害。',
          'Bug 会在四个方向上随机冲刺。',
          'Boss GURDY 会发射 bloody bullets，并召唤 BloodyFly 敌人。',
        ],
      },
      {
        title: '特殊系统',
        items: [
          '抽奖机消耗 5 个金币，可能获得金币、攻击力或生命值。',
          'NPC Trainer 会根据回答给予奖励或惩罚。',
          'NPC Merchant 会用金币或 HP 交换治疗、炸弹和攻击强化等资源。',
        ],
      },
    ],
    reportIntro:
      '最终报告补充记录了场景结构、房间切换、障碍物、碰撞处理、资源更新、NPC 对话与菜单动画等具体实现设计，并包含多张游戏截图。',
    reportCards: [
      {
        title: '场景、门与房间',
        items: [
          'StartRoom 用于展示移动、攻击和放置炸弹等基本操作。',
          '奖励房包括 Lucky Room 和 NPC Room；战斗房会在敌人清除前关闭房门。',
          '每轮游戏生成一个 Boss Room，并通过 UI 提示其所在位置。',
        ],
      },
      {
        title: '障碍物与碰撞',
        items: [
          '房间中包含 Rock 和 Shit 两类障碍物，二者具有不同的破坏规则。',
          '战斗房中的障碍物位置和模式会随机生成。',
          '碰撞逻辑覆盖玩家与场景、子弹与场景、子弹与敌人、玩家与敌人、NPC 和道具交互。',
        ],
      },
      {
        title: 'NPC 与 LLM 对话',
        items: [
          'Trainer 会提出数学问题，并可能回复生命值或增强攻击方式。',
          'Merchant 会用金币或 HP 交换治疗、炸弹、攻击力和攻速强化。',
          'NPC 决策流程会接收对话状态和玩家当前资源。',
        ],
      },
      {
        title: '动画与 UI',
        items: [
          '报告记录了菜单、移动、子弹、敌人受击、死亡和场景切换等动画效果。',
          '生命、金币、攻击、炸弹和 Boss 房间提示会在游戏中实时更新。',
          '炸弹误伤玩家时会触发隐藏的分尸效果。',
        ],
      },
    ],
    contributionIntro:
      '我的贡献主要集中在敌人逻辑、游戏管理、动画、UI / 场景以及 README 文档整理。',
    contributionBullets: ['Enemies.py', 'GameManager.py', 'Animations', 'UI / Scenes', 'README.md'],
    galleryIntro:
      '以下视觉素材包含仓库真实贴图、精灵组合图以及从最终报告文档中提取的游戏截图，没有使用生成式图片。',
    gallery: [
      {
        src: '/projects/si100b/hero.png',
        alt: 'SI100B Pygame 项目的初始房间与操作提示贴图。',
        caption: '来自项目素材的初始房间与操作提示贴图。',
      },
      {
        src: '/projects/si100b/gameplay.png',
        alt: '使用项目真实房间、玩家、敌人、Boss、子弹和资源精灵组合的玩法视觉图。',
        caption: '由真实项目精灵与房间贴图组合的玩法视觉图。',
      },
      {
        src: '/projects/si100b/room-types.png',
        alt: '展示 start、shop、treasure 和 blue womb 风格房间的房间类型贴图网格。',
        caption: '基于仓库场景素材整理的房间类型贴图网格。',
      },
      {
        src: '/projects/si100b/systems.png',
        alt: '由 Boss、敌人、资源、Merchant 和 Trainer 精灵组成的系统视觉图。',
        caption: '来自项目仓库的敌人、资源、NPC 与 Boss 素材组合。',
      },
      {
        src: '/projects/si100b/report-boss-room.png',
        alt: '最终报告中的 GURDY Boss 房截图，包含生命 UI 和 Boss 房间提示。',
        caption: '最终报告截图：GURDY Boss 战，包含生命、资源和 Boss 房间提示。',
      },
      {
        src: '/projects/si100b/report-obstacle-room.png',
        alt: '最终报告中展示房间障碍物和战斗房布局的截图。',
        caption: '最终报告截图：包含随机障碍物布局的战斗房。',
      },
      {
        src: '/projects/si100b/report-main-menu.png',
        alt: '最终报告中的动画主菜单截图。',
        caption: '最终报告截图：动画主菜单场景。',
      },
      {
        src: '/projects/si100b/report-map-generation.png',
        alt: '最终报告中展示二叉树房间生成结构的示意图。',
        caption: '最终报告示意图：从 Start Room 到 Boss Room 的二叉树房间结构。',
      },
      {
        src: '/projects/si100b/report-npc-chat.png',
        alt: '最终报告中的 NPC 对话界面截图。',
        caption: '最终报告截图：NPC 对话与 Merchant 决策界面。',
      },
      {
        src: '/projects/si100b/report-ui.png',
        alt: '最终报告中的生命、金币、攻击和炸弹资源 UI 截图。',
        caption: '最终报告截图：生命、金币、攻击和炸弹资源 UI。',
      },
    ],
    courseContext:
      '该项目完成于上海科技大学 2024 Fall 的 SI100B 课程，是一个小组合作的 Pygame 课程项目。页面将其作为受《以撒的结合》启发的课程原型展示，不表述为原创商业游戏，也不表述为个人独立完成。',
    links: [
      {
        title: '最终报告 PDF',
        text: '打开转换后的 SI100B 项目最终报告。',
        href: '/projects/si100b/report.pdf',
      },
      {
        title: 'GitHub 仓库',
        text: '打开 Team SAVE MY LINEAR ALGEBRA 项目仓库。',
        href: 'https://github.com/TossACoinTAC/Team-SAVE-MY-LINEAR-ALGEBRA',
      },
      {
        title: 'README 来源',
        text: '项目概述、操作方式、团队成员与分工信息均整理自仓库 README。',
        href: 'https://github.com/TossACoinTAC/Team-SAVE-MY-LINEAR-ALGEBRA#readme',
      },
    ],
  },
  cs182: {
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
      context: '背景',
      authors: '作者',
      summary: '摘要',
      method: '方法',
      courseProject: '课程项目',
      metricChanges: '课程项目实验指标',
    },
    sections: {
      overview: '项目概述',
      motivation: '研究动机',
      method: '方法',
      loss: 'Mask-Guided 损失',
      pruning: '几何感知 Pruning',
      experiments: '实验设置',
      results: '实验结果',
      gallery: '可视化结果',
      contribution: '我的贡献',
      courseContext: '课程背景',
      future: '后续改进',
    },
    overview:
      'MOF3R 是一个面向物体中心三维重建的课程项目，基于 3D Gaussian Splatting，并引入 SAM2 生成的前景 mask 作为语义先验。项目通过 Mask-Guided Compound Loss 抑制背景拟合，并使用多视角 mask 一致性、局部密度和各向异性分析进行几何感知 pruning，从而减少 floating artifacts 和边界噪声。CO3Dv2 上的课程项目实验显示，相比原始 3DGS，该流程可以得到边界更清晰、背景伪影更少的物体重建结果。',
    overviewBullets: [
      '输入单目视频先经过 COLMAP 估计相机参数，并使用 SAM2 生成前景 mask。',
      '前景 mask 用于指导 3DGS 训练，使优化更集中于目标物体而不是杂乱背景。',
      '训练后的 pruning 阶段结合 mask 一致性、局部密度、各向异性过滤和自适应缩放。',
      '项目在代表性的 CO3Dv2 序列上评估物体中心重建质量。',
    ],
    motivationIntro:
      '日常拍摄的手机视频适合用于构建三维物体资产，但背景杂乱、视角有限和图像退化会使原始 3DGS 将 Gaussian primitives 分配到无关区域。',
    motivationCards: [
      {
        title: '从日常视频生成物体资产',
        items: [
          '项目目标是从单目视频序列中获得干净的三维商品或物体资产。',
          '报告中将这一设定与电商、虚拟现实和数字内容创作等应用联系起来。',
        ],
      },
      {
        title: '原始 3DGS 的局限',
        items: [
          '标准 3DGS 对所有像素进行同等优化，容易拟合目标物体周围的背景区域。',
          '这会带来 floating artifacts、嘈杂结构和不准确的物体边界。',
        ],
      },
      {
        title: '用于重建的语义先验',
        items: [
          'SAM2 可以根据第一帧提示在视频中生成较可靠的前景 mask。',
          'MOF3R 将这些 mask 用于优化和几何细化，而不仅作为预处理结果。',
        ],
      },
    ],
    methodIntro:
      '整体流程结合 mask-guided 优化和几何感知细化。项目先获得相机位姿和物体 mask，再使用前景监督训练 3DGS 表示，最后通过多指标 pruning 移除残留伪影。',
    methodCards: [
      {
        title: '预处理',
        items: [
          '从输入视频序列中抽取帧。',
          '使用 COLMAP 估计相机内参和外参。',
          '使用 SAM2 和第一帧提示生成前景 mask。',
        ],
      },
      {
        title: 'Mask-guided 3DGS 训练',
        items: [
          '将 SAM2 mask 作为前景语义先验。',
          '使用 mask-constrained L1 监督，使光度训练聚焦于目标物体。',
          '使用 composite-image SSIM 维持边界附近的结构一致性。',
        ],
      },
      {
        title: '几何感知细化',
        items: [
          '将 Gaussians 投影到可见视角，并通过前景 mask 进行投票。',
          '分析局部 KNN 密度和各向异性以寻找异常 primitives。',
          '对不确定的边界 Gaussians 使用自适应缩放。',
        ],
      },
    ],
    lossIntro:
      'Mask-Guided Compound Loss 将光度监督限制在前景区域，并通过 composite image 上的 SSIM 计算保持结构稳定性。',
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
      '来自 SAM2 的前景语义先验。',
      'Mask-constrained L1 监督。',
      'Composite-image SSIM 损失。',
      '减少 3DGS 优化过程中的背景拟合。',
    ],
    pruningIntro:
      '重建完成后，MOF3R 使用几何感知多指标 pruning 移除残留 floating Gaussians 和细长的边界伪影。',
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
      '课程项目在 CO3Dv2 上评估该方法，重点关注具有多样视角、杂乱背景、自遮挡和复杂形状的真实物体序列。',
    experimentCards: [
      {
        title: '数据集',
        items: [
          'CO3Dv2 包含真实世界物体的多视角视频采集。',
          '代表性类别包括 Bowl、Teddy 和 Apple。',
          '报告中特别关注薄壁结构、自遮挡和复杂几何。',
        ],
      },
      {
        title: 'Baseline',
        items: [
          '原始 3D Gaussian Splatting 直接在原始视频帧上训练。',
          'Baseline 不使用 segmentation guidance。',
          '比较重点是物体中心的重建质量。',
        ],
      },
      {
        title: '评价指标',
        items: [
          'PSNR 和 SSIM 用于评价保真度与结构相似性。',
          'LPIPS 用于评价感知距离。',
          '报告中的定量指标在前景 mask 区域内计算。',
        ],
      },
    ],
    resultsIntro:
      '以下数值来自课程项目报告中的实验结果，不是正式论文发表结果。相比原始 3DGS，mask-guided 训练和完整 MOF3R 流程在代表性 CO3Dv2 序列的前景区域上提升了 PSNR、SSIM 和 LPIPS。',
    resultColumns: ['方法', 'PSNR ↑', 'SSIM ↑', 'LPIPS ↓'],
    resultRows: [
      ['Original 3DGS', '19.07', '0.592', '0.629'],
      ['Mask-Guided', '21.03', '0.931', '0.125'],
      ['MOF3R', '23.56', '0.935', '0.120'],
    ],
    resultHighlights: [
      '平均 PSNR 从原始 3DGS 的 19.07 dB 提升到 MOF3R 的 23.56 dB。',
      'LPIPS 从 0.629 降低到 0.120，说明评估前景区域中的感知伪影减少。',
      '定性对比展示出更干净的边界、更少的 floating artifacts 和更弱的背景拟合。',
      '报告中指出 Bowl、TeddyBear 和 Apple 场景上的改进较为明显。',
    ],
    featuredVisual: {
      eyebrow: '定性对比',
      title: '关键可视化结果',
      intro:
        '该对比图展示了 MOF3R 最直观的视觉效果：通过 mask-guided training 与 geometry-aware pruning，方法能够减少背景拟合、浮动伪影和边界噪声，从而获得更干净的物体中心重建结果。',
      src: '/projects/cs182/comparsion.png',
      alt: '原始 3DGS、mask-guided reconstruction 与带 pruning 的 MOF3R 定性对比。',
      caption:
        '原始 3DGS、mask-guided reconstruction 与 MOF3R 的定性对比。完整流程能够产生更干净的物体边界，并减少 floating artifacts。',
    },
    galleryIntro: '以下图示来自 CS182 项目报告素材，展示整体流程和定量结果可视化。',
    gallery: [
      {
        src: '/projects/cs182/MOF3R_overview.png',
        alt: 'MOF3R 整体流程，包含 SAM2 mask、mask-guided 3DGS 训练和 pruning。',
        caption: 'MOF3R 的整体流程。',
      },
      {
        src: '/projects/cs182/comparsion.png',
        alt: '原始 3DGS、mask-guided reconstruction 和 MOF3R 的定性对比。',
        caption: '原始 3DGS、mask-guided reconstruction 与完整 MOF3R 流程的定性对比。',
      },
      {
        src: '/projects/cs182/result.png',
        alt: '代表性 CO3Dv2 序列上的定量结果对比。',
        caption: '代表性 CO3Dv2 序列上的定量结果对比。',
      },
    ],
    contribution:
      '报告将 Zidong Song、Boyang Zhou 和 Zian Chen 列为上海科技大学作者，并标注为共同第一作者。在个人主页中，我将 MOF3R 展示为团队 CS182 课程项目；除报告作者身份外，页面不进一步声明未经确认的个人任务划分。',
    courseContext:
      '该项目完成于上海科技大学 2026 年 CS182: Introduction to Machine Learning 课程。页面会明确将其作为课程项目展示，而不是表述为已发表论文。',
    future: [
      '更紧密地结合 segmentation 与 reconstruction。',
      '更稳健的几何正则化方法。',
      '更好地处理透明物体和反光表面。',
      '提升对高遮挡物体序列的鲁棒性。',
    ],
  },
} as const;
