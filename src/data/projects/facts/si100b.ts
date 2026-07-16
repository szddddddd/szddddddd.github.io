import { defineProject } from '../projectSchema';

export default defineProject({
  id: 'si100b',
  number: '03',
  slug: 'si100b',
  sortOrder: 30,
  featured: false,
  isPublic: true,
  title: {
    en: 'SAVE MY LINEAR ALGEBRA: A Pygame Roguelike',
    zh: 'SAVE MY LINEAR ALGEBRA：Pygame Roguelike 游戏项目',
  },
  type: {
    en: '2D Roguelike Game',
    zh: '2D Roguelike 游戏',
  },
  course: 'SI100B: Introduction to Information Science and Technology',
  year: '2024 Fall',
  description: {
    en:
      'A SI100B: Introduction to Information Science and Technology final project implemented with Pygame, featuring Isaac-style room exploration, shooting, bombs, obstacle and collision systems, NPC dialogue, resource UI, and a final boss encounter.',
    zh:
      '一个使用 Pygame 实现的 SI100B: Introduction to Information Science and Technology 期末项目，包含 Isaac 式房间探索、射击、炸弹、障碍物与碰撞系统、NPC 对话、资源 UI 和最终 Boss 战。',
  },
  summary: {
    en:
      'A SI100B: Introduction to Information Science and Technology final project implemented with Pygame, featuring Isaac-style room exploration, shooting, bombs, obstacle and collision systems, NPC dialogue, resource UI, and a final boss encounter.',
    zh:
      '一个使用 Pygame 实现的 SI100B: Introduction to Information Science and Technology 期末项目，包含 Isaac 式房间探索、射击、炸弹、障碍物与碰撞系统、NPC 对话、资源 UI 和最终 Boss 战。',
  },
  categories: ['coursework'],
  displayTags: [
    { en: 'Pygame', zh: 'Pygame' },
    { en: 'Python', zh: 'Python' },
    { en: 'Roguelike', zh: 'Roguelike' },
  ],
  allTags: ['SI100B', 'Pygame', 'Python', 'Roguelike', 'Game Development', 'Course Project'],
  tags: ['SI100B', 'Pygame', 'Python', 'Roguelike', 'Game Development', 'Course Project'],
  image: '/projects/si100b/cover.png',
  cover: {
    src: '/projects/si100b/cover.png',
    alt: {
      en: 'Cropped gameplay cover showing the GURDY boss encounter.',
      zh: '裁切后的 GURDY Boss 房游戏封面图。',
    },
  },
  spatialAccent: '#d98ec8',
  links: {
    details: {
      en: '/projects/si100b/',
      zh: '/zh/projects/si100b/',
    },
    report: '/projects/si100b/report.pdf',
    code: 'https://github.com/TossACoinTAC/Team-SAVE-MY-LINEAR-ALGEBRA',
    readme: 'https://github.com/TossACoinTAC/Team-SAVE-MY-LINEAR-ALGEBRA#readme',
  },
});
