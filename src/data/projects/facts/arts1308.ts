import { defineProject } from '../projectSchema';

export default defineProject({
  id: 'arts1308',
  number: '02',
  slug: 'arts1308',
  sortOrder: 20,
  featured: false,
  isPublic: true,
  title: {
    en: 'Shader Art Experiments on Shadertoy',
    zh: 'ARTS1308 像素着色艺术：Shadertoy 作品集',
  },
  type: {
    en: 'Creative Coding / Shader Art',
    zh: '创意编程 / Shader Art',
  },
  course: {
    en: 'ARTS1308 Pixel Shading Art · Course Project',
    zh: 'ARTS1308 像素着色艺术 · 课程项目',
  },
  year: 'ARTS1308',
  description: {
    en:
      'A collection of GLSL fragment shader artworks created on Shadertoy, exploring procedural image synthesis, motion, color, and pixel-level visual expression.',
    zh:
      '一个基于 Shadertoy 的 GLSL fragment shader 课程作品集，探索程序化图像生成、运动、色彩与像素级视觉表达。',
  },
  summary: {
    en:
      'A collection of GLSL fragment shader artworks created on Shadertoy, exploring procedural image synthesis, motion, color, and pixel-level visual expression.',
    zh:
      '一个基于 Shadertoy 的 GLSL fragment shader 课程作品集，探索程序化图像生成、运动、色彩与像素级视觉表达。',
  },
  categories: ['creative-coding', 'coursework'],
  displayTags: [
    { en: 'Creative Coding', zh: '创意编程' },
    { en: 'GLSL', zh: 'GLSL' },
    { en: 'Shadertoy', zh: 'Shadertoy' },
  ],
  allTags: [
    'ARTS1308',
    'Shadertoy',
    'GLSL',
    'Shader Art',
    'Creative Coding',
    'Procedural Visuals',
    'Pixel Shading',
  ],
  tags: [
    'ARTS1308',
    'Shadertoy',
    'GLSL',
    'Shader Art',
    'Creative Coding',
    'Procedural Visuals',
    'Pixel Shading',
  ],
  image: '/projects/arts1308/shader-06.jpg',
  cover: {
    src: '/projects/arts1308/shader-06.jpg',
    alt: {
      en: 'cross-sea bridge Shadertoy thumbnail.',
      zh: 'cross-sea bridge Shadertoy 作品缩略图。',
    },
  },
  spatialAccent: '#d98ec8',
  links: {
    details: {
      en: '/projects/arts1308/',
      zh: '/zh/projects/arts1308/',
    },
    shadertoy: 'https://www.shadertoy.com/user/szd/sort=popular&from=0&num=8',
  },
});
