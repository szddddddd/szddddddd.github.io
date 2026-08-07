import { defineProject } from '../projectSchema';

export default defineProject({
  id: 'ti-cup-2026',
  number: '08',
  slug: 'ti-cup-2026',
  sortOrder: 80,
  featured: false,
  isPublic: true,
  title: {
    en: 'TI Cup 2026 H Problem: Car-Borne Balancing Ball Motion Control System',
    zh: '2026 TI 杯 H 题：车载平衡滚球运动控制系统',
  },
  type: {
    en: 'Competition Project / Embedded Systems / Robotics',
    zh: '竞赛项目 / 嵌入式系统 / 机器人学',
  },
  year: '2026',
  description: {
    en:
      'A two-layer electromechanical system combining line-following, machine vision, ball-on-rail control, and synchronized task execution for the 2026 TI Cup Shanghai collegiate electronic design competition.',
    zh:
      '面向 2026 年 TI 杯上海市大学生电子设计竞赛 H 题的双层机电系统，结合循迹、机器视觉、滚球摆杆控制与跨层任务同步。',
  },
  summary: {
    en:
      'A two-layer control system for line following and ball balancing, awarded Third Prize in the preliminary evaluation with Song Zidong, Ning Zidong, and Shao Zhengran.',
    zh:
      '一个结合循迹与滚球平衡控制的双层控制系统，宋梓冬、宁梓栋、邵钲然所在队伍获三等奖（初评）。',
  },
  role: {
    en: 'Team member; individual responsibilities are not specified in the anonymous design report.',
    zh: '团队成员；匿名设计报告未按个人拆分具体分工。',
  },
  categories: ['embedded-systems'],
  displayTags: [
    { en: 'Embedded Systems', zh: '嵌入式系统' },
    { en: 'Computer Vision', zh: '机器视觉' },
    { en: 'Motion Control', zh: '运动控制' },
  ],
  allTags: [
    'TI Cup 2026',
    'H Problem',
    'Embedded Systems',
    'Computer Vision',
    'Line Following',
    'Ball Balancing',
    'Motion Control',
    'Robotics Competition',
  ],
  tags: [
    'TI Cup 2026',
    'H Problem',
    'Embedded Systems',
    'Computer Vision',
    'Line Following',
    'Ball Balancing',
    'Motion Control',
    'Robotics Competition',
  ],
  image: '/projects/ti-cup-2026/system-architecture.png',
  cover: {
    src: '/projects/ti-cup-2026/system-architecture.png',
    alt: {
      en: 'Dual-layer control, actuation, and power architecture for the H-problem vehicle.',
      zh: 'H 题车载系统的双层控制、执行与供电关系图。',
    },
  },
  spatialAccent: '#65d8cb',
  links: {
    details: {
      en: '/projects/ti-cup-2026/',
      zh: '/zh/projects/ti-cup-2026/',
    },
    report: '/projects/ti-cup-2026/technical-report.pdf',
    award: '/projects/ti-cup-2026/award-list-preliminary.pdf',
  },
});
