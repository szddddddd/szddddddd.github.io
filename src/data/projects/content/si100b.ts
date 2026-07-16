import { defineProjectContent } from '../contentSchema';

const enSource = {
    metaTitle: 'SI100B SAVE MY LINEAR ALGEBRA Pygame Project — Song Zidong',
    metaDescription:
      'SI100B: Introduction to Information Science and Technology final project on a Binding-of-Isaac-inspired 2D roguelike game implemented with Pygame, covering scene design, doors, obstacles, collision handling, NPC dialogue, resource UI, animation, and a final boss encounter.',
    hero: {
      eyebrow: 'Course Project / SI100B: Introduction to Information Science and Technology',
      title: 'SAVE MY LINEAR ALGEBRA: A Pygame Roguelike',
      subtitle:
        'A team-based Pygame final project for SI100B: Introduction to Information Science and Technology.',
      affiliation: 'SI100B: Introduction to Information Science and Technology · ShanghaiTech University · 2024 Fall',
    },
    authors: ['潘佑邦', '宋梓冬', '吴俊阳'],
    metadata: [
      'SI100B: Introduction to Information Science and Technology',
      'Pygame',
      'Python',
      '2D Roguelike Game',
      'Course Project',
      'Scene Design',
      'Collision System',
      'NPC Dialogue',
    ],
    labels: {
      course: 'Course',
      type: 'Type',
      term: 'Term',
      team: 'Team',
      summary: 'Summary',
      gameplay: 'Gameplay',
      system: 'System',
      contribution: 'Contribution',
      report: 'Report',
    },
    sections: {
      overview: 'Overview',
      gameplay: 'Gameplay Design',
      systems: 'Implementation Design',
      reportDesign: 'Design Notes',
      contribution: 'My Contribution',
      gallery: 'Visual Gallery',
    },
    cover: {
      alt: 'Cropped gameplay cover showing the GURDY boss encounter.',
      caption: 'Optimized cover: centered boss-room gameplay crop used across the project cards and detail page.',
    },
    overview:
      'SAVE MY LINEAR ALGEBRA is the final project for SI100B: Introduction to Information Science and Technology. The game is a Pygame roguelike prototype inspired by The Binding of Isaac: the player controls Isaac, shoots tears, plants bombs, clears monsters, collects rewards, talks to NPCs, and ultimately defeats the boss. Isaac has limited health, so the game ends when HP reaches zero.',
    overviewBullets: [
      'The work is presented as a SI100B course final project rather than a commercial game.',
      'The game prototype and visual materials are explicitly inspired by The Binding of Isaac.',
      'Core play combines room exploration, shooting, bomb placement, monster clearing, NPC rewards, and a final boss fight.',
      'The report authors are listed as 潘佑邦, 宋梓冬, and 吴俊阳.',
    ],
    gameplayIntro:
      'The player loop is organized around room exploration and combat: Isaac starts from StartRoom, learns the controls, enters reward or combat rooms, unlocks doors by clearing enemies, and follows the boss-room hint toward the final encounter.',
    gameplayCards: [
      {
        title: 'Player control',
        items: [
          'W, A, S, and D move Isaac, with diagonal movement represented through the movement vector.',
          'Arrow keys fire tears in different directions, and tear attack can be strengthened during play.',
          'LShift accelerates movement, while E plants bombs that can damage enemies and also hurt Isaac.',
        ],
      },
      {
        title: 'Room progression',
        items: [
          'StartRoom introduces movement, attack, and bomb placement.',
          'Combat rooms close their doors during fights and reopen after all enemies are killed.',
          'Each run contains one BossRoom, and defeating the boss enters the win scene.',
        ],
      },
      {
        title: 'Rewards and failure state',
        items: [
          'Lucky Room provides a raffle machine that consumes coins and grants health, attack, or coin rewards.',
          'NPC Room lets players talk with Trainer or Merchant for hidden rewards or trades.',
          'Isaac dies and the game ends when health is depleted.',
        ],
      },
    ],
    systemIntro:
      'The implementation covers room scenes, door logic, obstacles, camera-like transitions, character behavior, a binary-tree map structure, collision handling, resource UI, NPC decision logic, menu scenes, and audio feedback.',
    systemCards: [
      {
        title: 'Scenes, doors, and transitions',
        items: [
          'The game uses StartRoom, reward rooms, combat rooms, and one BossRoom.',
          'Doors can appear on four sides, and door types determine the next room type.',
          'Room switching uses transition animation with a camera-follow effect between scenes.',
        ],
      },
      {
        title: 'Map and room generation',
        items: [
          'A binary tree stores the room structure, with StartRoom as the root.',
          'The map extends rightward and downward for four layers, producing 15 rooms.',
          'The BossRoom is guaranteed to appear on the fourth layer, and each node keeps parent and child information for iteration and backtracking.',
        ],
      },
      {
        title: 'Obstacles and collision',
        items: [
          'Rooms include Rock and Shit obstacles with different destruction rules.',
          'Combat rooms randomize Rock positions and Shit patterns.',
          'Collision handling covers player-scene, projectile-scene, projectile-enemy, player-enemy, NPC, and item interactions, including pixel-level mask collision.',
        ],
      },
      {
        title: 'NPC, resources, and feedback',
        items: [
          'Trainer asks math questions and can heal Isaac or strengthen attack patterns.',
          'Merchant trades coins or HP for healing, bombs, attack boosts, and attack-speed boosts.',
          'Health, coins, attack, bombs, and boss-room hints are updated in the UI, while actions trigger animations and sounds.',
        ],
      },
    ],
    reportIntro:
      'The project design includes scenes, doors, obstacles, collisions, character logic, NPC dialogue, resources, UI, menu animation, BGM, and hidden effects.',
    reportCards: [
      {
        title: 'Character and boss design',
        items: [
          'Normal enemies move around and damage the player on collision.',
          'Bug has normal and sprint states, while Fly moves irregularly.',
          'Gurdy has 100 HP, summons flies, fires bullets toward the player, and is implemented with separated body and attack classes.',
        ],
      },
      {
        title: 'NPC / LLM agent system',
        items: [
          'Players approach NPCs and press Q to enter the chatbox.',
          'Dialogue history and current player state are passed into the NPC decision process.',
          'Trainer and Merchant produce different rewards, penalties, or trades based on dialogue and resources.',
        ],
      },
      {
        title: 'UI, hints, and hidden effects',
        items: [
          'The UI updates health, coin, attack, and bomb values in real time.',
          'A boss-room hint helps the player infer the path to the BossRoom.',
          'Bomb self-damage can trigger a hidden split-body effect where Isaac’s head floats irregularly.',
        ],
      },
      {
        title: 'Code organization',
        items: [
          'The report describes modular object-oriented implementation.',
          'GameManager acts as the main control module, while Characters, Scenes, TmpTools, and UI folders separate responsibilities.',
          'Main.py and Statics.py are placed at the project root for running and shared data.',
        ],
      },
    ],
    contributionIntro:
      'My contribution focused on enemy logic, game management, animations, UI/scenes, and README documentation as part of the team project.',
    contributionBullets: ['Enemies.py', 'GameManager.py', 'Animations', 'UI / Scenes', 'README.md'],
    galleryIntro:
      'Selected in-game screenshots and design diagrams from the project materials are shown below.',
    gallery: [
      {
        src: '/projects/si100b/report-main-menu.png',
        alt: 'Screenshot of the animated start menu.',
        caption: 'Project screenshot: animated main menu scene.',
      },
      {
        src: '/projects/si100b/report-boss-room.png',
        alt: 'Screenshot of the GURDY boss room with health UI and boss-room hint.',
        caption: 'Project screenshot: GURDY boss encounter with health, resources, and boss-room hint.',
      },
      {
        src: '/projects/si100b/report-obstacle-room.png',
        alt: 'Screenshot showing room obstacles and combat-room layout.',
        caption: 'Project screenshot: combat room with randomized obstacle layout.',
      },
      {
        src: '/projects/si100b/report-map-generation.png',
        alt: 'Diagram of the binary-tree room generation structure.',
        caption: 'Design diagram: binary-tree room structure from Start Room to Boss Room.',
      },
      {
        src: '/projects/si100b/report-npc-chat.png',
        alt: 'Screenshot of the NPC dialogue interface.',
        caption: 'Project screenshot: NPC dialogue and merchant decision interface.',
      },
      {
        src: '/projects/si100b/report-ui.png',
        alt: 'Screenshot of the health, coin, attack, and bomb UI.',
        caption: 'Project screenshot: resource UI for health, coin, attack, and bomb state.',
      },
    ],
  } as const;
const zhSource = {
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
  } as const;

export default defineProjectContent({
  id: 'si100b',
  articleClass: 'si100b-detail',
  heroFigureClass: 'si100b-cover-figure',
  heroCaption: 'cover.caption',
  heroActions: [{ type: 'project-link', link: 'code', label: 'code', optional: true }, { type: 'project-link', link: 'report', label: 'report', optional: true }, { type: 'project-link', link: 'readme', label: 'readme', optional: true }],
  documents: {
    en: {
      ...enSource,


      details: [
    { label: enSource.labels.course, value: 'SI100B: Introduction to Information Science and Technology' },
    { label: enSource.labels.type, value: 'Course Project / Game Development' }, { label: enSource.labels.term, value: '2024' },
    { label: enSource.labels.team, value: enSource.authors.join(' · ') },
  ],
    },
    zh: {
      ...zhSource,


      details: [
    { label: zhSource.labels.course, value: 'SI100B 信息科学技术导论' },
    { label: zhSource.labels.type, value: '课程项目 / 游戏开发' }, { label: zhSource.labels.term, value: '2024' },
    { label: zhSource.labels.team, value: zhSource.authors.join(' · ') },
  ],
    },
  },
  sections: [
    { title: 'sections.overview', eyebrow: 'SI100B', intro: 'overview', blocks: [{ type: 'group', className: 'detail-two-column', blocks: [{ type: 'bullet-panel', items: 'overviewBullets', label: 'labels.summary' }, { type: 'figure', item: 'gallery.1', className: 'compact-figure si100b-asset-figure' }] }] },
    { title: 'sections.gameplay', intro: 'gameplayIntro', blocks: [{ type: 'card-grid', items: 'gameplayCards', label: 'labels.gameplay' }] },
    { title: 'sections.systems', intro: 'systemIntro', blocks: [{ type: 'card-grid', items: 'systemCards', label: 'labels.system', className: 'method-grid si100b-system-grid', cardClassName: 'method-card si100b-card' }, { type: 'figure', item: 'gallery.3', className: 'wide-result-figure si100b-asset-figure' }] },
    { title: 'sections.reportDesign', intro: 'reportIntro', blocks: [{ type: 'card-grid', items: 'reportCards', label: 'labels.report', className: 'method-grid si100b-system-grid', cardClassName: 'method-card si100b-card' }] },
    { title: 'sections.contribution', intro: 'contributionIntro', blocks: [{ type: 'highlight', items: 'contributionBullets', label: 'labels.contribution' }] },
    { title: 'sections.gallery', intro: 'galleryIntro', blocks: [{ type: 'gallery', items: 'gallery' }] },
  ],
});
