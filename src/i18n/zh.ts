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
    title: '学术身份',
    intro: '我是上海科技大学计算机科学专业本科生，目前在 VRVC Lab，围绕视觉计算、三维重建与神经渲染逐步建立研究方向。',
    bio:
      '我是上海科技大学计算机科学专业本科生，目前在 VRVC Lab。我的项目与课程实践主要围绕视觉计算中的几何重建与学习式表示展开。',
    profileTitle: '个人简介',
    identityTitle: '学术身份',
    detailsTitle: '学术信息',
    interestsTitle: '研究兴趣',
    focusTitle: '当前关注 / 研究方向',
    focusIntro: '我当前关注从图像与学习式场景表示中恢复、表达并理解三维结构的视觉系统。',
    focusItems: [
      '面向物体与场景理解的几何感知三维重建流程。',
      '兼顾视觉质量与结构几何的神经渲染与 Gaussian Splatting 方法。',
      '连接感知、生成与空间推理的 World Model 风格视觉表示。',
    ],
    creativeTitle: '视觉计算 / 创意作品',
    creativeIntro: '除研究型项目外，我也通过创意编程与 shader 实验探索程序化图像生成、运动、色彩和像素级视觉表达。',
    creativeItems: [
      '基于 Shadertoy 的 GLSL fragment shader 作品与程序化视觉实验。',
      '将视觉计算想法转化为实际系统与清晰技术展示的课程项目。',
      '保持简洁、可复现、易扩展的研究型视觉作品集表达方式。',
    ],
    contactTitle: '联系',
    contactIntro: '如需交流研究、合作或申请材料，可以通过以下方式联系我。',
    contactLabels: {
      email: '邮箱',
      github: 'GitHub',
      cv: 'CV',
    },
  },
  projects: {
    eyebrow: '研究 / 项目',
    pageTitle: '项目',
    title: '研究与项目亮点',
    intro: '代表性学术、技术与课程项目，涵盖计算机视觉、三维重建、神经渲染、医学影像与创意编程。',
    fullTitle: '项目',
    fullIntro: '学术、技术与课程项目，涵盖视觉计算、医学影像与创意编程等方向。',
    viewAll: '查看全部项目',
    labels: {
      details: '详情',
      shadertoy: 'Shadertoy',
      report: '报告',
      paper: '论文',
      code: '代码',
      demo: '演示',
      readme: 'README',
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
      'SI100B: Introduction to Information Science and Technology 期末项目，使用 Pygame 实现了一个受《以撒的结合》启发的 2D Roguelike 游戏，报告记录了场景、房门、障碍物、碰撞、NPC 对话、资源 UI、动画和 Boss 战等设计。',
    hero: {
      eyebrow: '课程项目 / SI100B: Introduction to Information Science and Technology',
      title: 'SAVE MY LINEAR ALGEBRA：Pygame Roguelike 游戏项目',
      subtitle: '一个小组合作完成的 SI100B: Introduction to Information Science and Technology Pygame 期末项目。',
      affiliation: 'SI100B: Introduction to Information Science and Technology · 上海科技大学 · 2024 Fall',
    },
    authors: ['潘佑邦', '宋梓冬', '吴俊阳'],
    metadata: [
      'SI100B: Introduction to Information Science and Technology',
      'Pygame',
      'Python',
      '2D Roguelike Game',
      '课程项目',
      '场景设计',
      '碰撞系统',
      'NPC 对话',
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
      report: '报告',
    },
    sections: {
      overview: '项目概述',
      gameplay: '玩法设计',
      systems: '实现设计',
      reportDesign: '设计补充',
      contribution: '我的贡献',
      gallery: '视觉展示',
    },
    cover: {
      alt: '裁切后的 GURDY Boss 房游戏封面图。',
      caption: '优化后的封面：居中的 Boss 房游戏画面裁切，用于项目卡片和详情页。',
    },
    overview:
      'SAVE MY LINEAR ALGEBRA 是 SI100B: Introduction to Information Science and Technology 的期末项目。该项目是一个使用 Pygame 实现、受《以撒的结合》启发的 2D Roguelike 原型：玩家操纵 Isaac 发射子弹、放置炸弹、击杀怪物、获取奖励、与 NPC 对话，并最终击败 Boss。Isaac 的血量有限，血量清零时游戏结束。',
    overviewBullets: [
      '该项目定位为 SI100B 课程期末项目，而不是商业游戏。',
      '游戏原型和素材明确来自 / 参考《以撒的结合》。',
      '核心玩法包括房间探索、射击、放置炸弹、清理怪物、NPC 奖励和最终 Boss 战。',
      '报告作者列为潘佑邦、宋梓冬和吴俊阳。',
    ],
    gameplayIntro:
      '玩家循环围绕房间探索与战斗展开：Isaac 从 StartRoom 出生并学习操作，随后进入奖励房或战斗房，清理敌人后解锁房门，并根据 Boss 房间提示前往最终战斗。',
    gameplayCards: [
      {
        title: '角色控制',
        items: [
          'W、A、S、D 控制 Isaac 移动，并通过移动向量支持斜向移动。',
          '方向键控制 Isaac 向不同方向发射 tear，子弹攻击力和形态可以在游戏中增强。',
          'LShift 用于加速移动，E 键放置炸弹；炸弹可以伤害敌人，也可能误伤 Isaac。',
        ],
      },
      {
        title: '房间推进',
        items: [
          'StartRoom 展示移动、攻击和放置炸弹等基本操作。',
          '战斗房在战斗过程中会关闭房门，只有清除所有敌人后才会重新打开。',
          '每轮游戏有且仅有一个 BossRoom，击败 Boss 后进入胜利结算画面。',
        ],
      },
      {
        title: '奖励与失败状态',
        items: [
          'Lucky Room 中的抽奖机会消耗金币，并给予血量、攻击力或金币增益。',
          'NPC Room 中玩家可以与 Trainer 或 Merchant 对话，获得隐藏奖励或进行交易。',
          'Isaac 血量清零时死亡，游戏进入结束状态。',
        ],
      },
    ],
    systemIntro:
      '实现内容覆盖房间场景、房门逻辑、障碍物、场景切换、角色行为、二叉树地图结构、碰撞处理、资源 UI、NPC 决策、菜单场景和音效反馈等细节。',
    systemCards: [
      {
        title: '场景、房门与转场',
        items: [
          '游戏包含 StartRoom、奖励房、战斗房和一个 BossRoom。',
          '门可能出现在上、下、左、右四个方向，门的类型决定即将进入的房间类型。',
          '房间切换时使用过渡动画，使镜头产生跟随移动的转场效果。',
        ],
      },
      {
        title: '地图与房间生成',
        items: [
          '游戏通过二叉树存储地图结构，StartRoom 是根节点。',
          '地图向右方和下方延伸四层，总计 15 个房间。',
          'BossRoom 保证在第四层生成，每个节点保存父节点和左右子节点，便于迭代和回溯。',
        ],
      },
      {
        title: '障碍物与碰撞',
        items: [
          '房间中包含 Rock 和 Shit 两类障碍物，破坏规则不同。',
          '战斗房中 Rock 的位置随机，Shit 会从多种模式中随机生成。',
          '碰撞处理覆盖玩家与场景、子弹与场景、子弹与敌人、玩家与敌人、NPC 和道具交互，并包含像素级 mask 碰撞。',
        ],
      },
      {
        title: 'NPC、资源与反馈',
        items: [
          'Trainer 提出数学问题，并可能回复血量或强化攻击方式。',
          'Merchant 可用金币或 HP 交换治疗、炸弹、攻击力和攻击速度加成。',
          '生命、金币、攻击、炸弹和 Boss 房间提示会在 UI 中实时更新，动作会触发动画和音效。',
        ],
      },
    ],
    reportIntro:
      '项目设计包括场景、房门、障碍物、碰撞、角色逻辑、NPC 对话、资源、UI、菜单动画、BGM 和隐藏效果等内容。',
    reportCards: [
      {
        title: '角色与 Boss 设计',
        items: [
          '普通敌人不会主动攻击玩家，而是在移动中与玩家碰撞造成扣血。',
          'Bug 具有普通形态和冲刺形态，Fly 会进行无规则飞行。',
          'Gurdy 拥有 100 点血量，会召唤 Fly 并向玩家方向发射子弹；实现上将 Boss 身体和攻击机制拆分为两个类。',
        ],
      },
      {
        title: 'NPC / LLM Agent 系统',
        items: [
          '玩家靠近 NPC 并按 Q 键进入对话框。',
          '对话历史和玩家当前状态会传入 NPC 决策流程。',
          'Trainer 与 Merchant 会根据对话和资源状态产生不同奖励、惩罚或交易结果。',
        ],
      },
      {
        title: 'UI、提示与隐藏效果',
        items: [
          '游戏实时更新血量、金币、攻击力和炸弹数量。',
          '右上角 Boss Room 位置提示帮助玩家推断前往 Boss 房间的路径。',
          'Isaac 被自己的炸弹炸伤时会触发分尸隐藏效果，头颅进行无规则飘动。',
        ],
      },
      {
        title: '代码组织',
        items: [
          '报告描述了面向对象和模块化封装的实现方式。',
          'GameManager 是主要总控部分，Characters、Scenes、TmpTools 和 UI 等目录分离不同功能。',
          'Main.py 和 Statics.py 位于项目根目录，用于运行程序和保存共享数据。',
        ],
      },
    ],
    contributionIntro:
      '作为团队项目的一部分，我的贡献主要集中在敌人逻辑、游戏管理、动画、UI / 场景以及 README 文档整理。',
    contributionBullets: ['Enemies.py', 'GameManager.py', 'Animations', 'UI / Scenes', 'README.md'],
    galleryIntro:
      '下方展示项目材料中的游戏截图和设计示意图。',
    gallery: [
      {
        src: '/projects/si100b/report-main-menu.png',
        alt: '动画主菜单截图。',
        caption: '项目截图：动画主菜单场景。',
      },
      {
        src: '/projects/si100b/report-boss-room.png',
        alt: 'GURDY Boss 房截图，包含生命 UI 和 Boss 房间提示。',
        caption: '项目截图：GURDY Boss 战，包含生命、资源和 Boss 房间提示。',
      },
      {
        src: '/projects/si100b/report-obstacle-room.png',
        alt: '展示房间障碍物和战斗房布局的截图。',
        caption: '项目截图：包含随机障碍物布局的战斗房。',
      },
      {
        src: '/projects/si100b/report-map-generation.png',
        alt: '展示二叉树房间生成结构的示意图。',
        caption: '设计示意图：从 Start Room 到 Boss Room 的二叉树房间结构。',
      },
      {
        src: '/projects/si100b/report-npc-chat.png',
        alt: 'NPC 对话界面截图。',
        caption: '项目截图：NPC 对话与 Merchant 决策界面。',
      },
      {
        src: '/projects/si100b/report-ui.png',
        alt: '生命、金币、攻击和炸弹资源 UI 截图。',
        caption: '项目截图：生命、金币、攻击和炸弹资源 UI。',
      },
    ],
  },
  arts1308: {
    metaTitle: 'ARTS1308 像素着色艺术：Shadertoy 作品集 — 宋梓冬',
    metaDescription:
      '宋梓冬在 ARTS1308 像素着色艺术课程中完成的 Shadertoy GLSL fragment shader 作品集。',
    hero: {
      eyebrow: '课程项目 / ARTS1308 像素着色艺术',
      title: 'ARTS1308 像素着色艺术：Shadertoy 作品集',
      subtitle: '一个探索程序化视觉生成、色彩、运动与像素级图像合成的 GLSL fragment shader 作品集。',
      affiliation: 'ARTS1308 像素着色艺术 · 课程项目 · 上海科技大学',
    },
    metadata: [
      'ARTS1308 课程项目',
      'Shader Art 作品集',
      '创意编程',
      '像素着色艺术',
      'GLSL / Shadertoy',
    ],
    labels: {
      course: '课程',
      type: '类型',
      context: '背景',
      account: '账号',
      works: '作品数量',
      stats: '浏览 / 喜欢',
      openShader: '在 Shadertoy 打开',
      profile: '查看 Shadertoy 主页',
      embed: '可选交互嵌入',
      loadEmbed: '加载暂停状态的 Shadertoy 嵌入',
      shaderId: 'Shader ID',
    },
    sections: {
      overview: '项目概述',
      gallery: '作品展示',
    },
    overview:
      '该项目整理了我在 ARTS1308 像素着色艺术课程中完成的 shader art 作品。这些作品并不依赖传统图像素材，而是通过 GLSL 中的数学函数、色彩运算、程序化图案和随时间变化的变换生成视觉效果。',
    overviewBullets: [
      '该页面展示课程作品集与创意编程练习，不将其表述为商业项目。',
      '所有作品均发布在 Shadertoy 账号 szd 下。',
      '作品展示区使用来自原始 Shadertoy 页面中的真实缩略图。',
      '交互式嵌入为可选内容，只有展开单个作品时才会加载。',
    ],
    galleryIntro:
      '以下作品来自按热度排序的 Shadertoy 主页。每个作品保留原始 Shadertoy 标题、链接、缩略图和页面可见的浏览 / 喜欢数量。',
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
  },
} as const;
