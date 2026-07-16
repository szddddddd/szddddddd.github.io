import { defineProjectContent } from '../contentSchema';

const enSource = {
    metaTitle: 'ARTS1308 Shader Art Collection — Song Zidong',
    metaDescription:
      'ARTS1308 Pixel Shading Art course project collecting GLSL fragment shader artworks created on Shadertoy by Song Zidong.',
    hero: {
      eyebrow: 'Course Project / ARTS1308 Pixel Shading Art',
      title: 'Shader Art Experiments on Shadertoy',
      subtitle:
        'A collection of GLSL fragment shader artworks exploring procedural visual generation, color, motion, and pixel-level image synthesis.',
      affiliation: 'ARTS1308 Pixel Shading Art · Course Project · ShanghaiTech University',
    },
    metadata: [
      'ARTS1308 Course Project',
      'Shader Art Collection',
      'Creative Coding',
      'Pixel Shading Art',
      'GLSL / Shadertoy',
    ],
    labels: {
      course: 'Course',
      type: 'Type',
      context: 'Context',
      account: 'Account',
      works: 'Works',
      stats: 'Views / Likes',
      openShader: 'Open on Shadertoy',
      profile: 'View Shadertoy Profile',
      embed: 'Optional interactive embed',
      loadEmbed: 'Load paused Shadertoy embed',
      shaderId: 'Shader ID',
    },
    sections: {
      overview: 'Overview',
      gallery: 'Visual Gallery',
    },
    overview:
      'This project collects my shader artworks created in the ARTS1308 Pixel Shading Art course. Instead of relying on traditional image assets, the works are generated through code, mathematical functions, color operations, procedural patterns, and time-dependent transformations in GLSL.',
    overviewBullets: [
      'Course project and creative coding portfolio, not a commercial project.',
      'All works are fragment-shader experiments published under the Shadertoy account szd.',
      'The gallery uses real Shadertoy thumbnails from the original shader pages.',
      'Interactive embeds are optional and are loaded only after opening an individual work.',
    ],
    galleryIntro:
      'Selected works from the Shadertoy profile sorted by popularity. Each card keeps the original Shadertoy title, shader link, thumbnail, and visible view / like counts.',
  } as const;
const zhSource = {
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
  } as const;

const profileUrl = 'https://www.shadertoy.com/user/szd/sort=popular&from=0&num=8';

export default defineProjectContent({
  id: 'arts1308',
  articleClass: 'arts1308-detail',
  heroFigureClass: 'arts-hero-figure',
  heroImageClass: 'arts-hero-cover',
  heroCaption: 'heroCaption',
  heroActions: [{ type: 'external', href: profileUrl, label: 'labels.profile' }, { type: 'anchor', href: '#visual-gallery', label: 'sections.gallery' }],
  documents: {
    en: {
      ...enSource,
      heroCaption: 'cross-sea bridge',
      worksLabel: `${enSource.labels.works}: 11`,
      details: [
    { label: enSource.labels.course, value: 'ARTS1308 Pixel Shading Art' }, { label: enSource.labels.type, value: 'Course Project / Creative Coding' },
    { label: enSource.labels.context, value: 'Course Project · ShanghaiTech University' }, { label: enSource.labels.account, value: 'szd / Shadertoy' },
  ],
    },
    zh: {
      ...zhSource,
      heroCaption: 'cross-sea bridge',
      worksLabel: `${zhSource.labels.works}：11`,
      details: [
    { label: zhSource.labels.course, value: 'ARTS1308 像素着色艺术' }, { label: zhSource.labels.type, value: '课程项目 / 创意编程' },
    { label: zhSource.labels.context, value: '课程项目 · 上海科技大学' }, { label: zhSource.labels.account, value: 'szd / Shadertoy' },
  ],
    },
  },
  sections: [
    { title: 'sections.overview', eyebrow: 'ARTS1308', intro: 'overview', blocks: [{ type: 'group', className: 'detail-two-column', blocks: [{ type: 'bullet-panel', items: 'overviewBullets', label: 'worksLabel' }, { type: 'figure', src: '/projects/arts1308/shader-06.jpg', alt: 'heroCaption', caption: 'heroCaption', className: 'compact-figure arts-preview-figure' }] }] },
    { id: 'visual-gallery', title: 'sections.gallery', intro: 'galleryIntro', blocks: [{ type: 'shadertoy-gallery', labels: 'labels' }] },
  ],
});
