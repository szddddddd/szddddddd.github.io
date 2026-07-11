export type HumanitiesEssaySlug = 'global-knowledge' | 'city-of-sadness' | 'steel-piano' | 'existentialism';

type LocalizedText = Readonly<Record<'en' | 'zh', string>>;

export type HumanitiesEssay = Readonly<{
  slug: HumanitiesEssaySlug;
  number: string;
  year: string;
  course: LocalizedText;
  format: LocalizedText;
  title: LocalizedText;
  shortTitle: LocalizedText;
  abstract: LocalizedText;
  keywords: Readonly<Record<'en' | 'zh', readonly string[]>>;
  sections: readonly string[];
  pdf: string;
}>;

export const humanitiesEssays: readonly HumanitiesEssay[] = [
  {
    slug: 'global-knowledge',
    number: '01',
    year: '2025',
    course: { en: 'GEHA1004 Science and Civilisation', zh: 'GEHA1004 科学文明通论' },
    format: { en: 'History of Science Essay', zh: '科学史课程论文' },
    title: {
      en: 'On the Shoulders of Giants, or of Caravans?',
      zh: '站在巨人的肩膀上，还是站在商队的肩膀上？',
    },
    shortTitle: {
      en: 'Global Knowledge Circulation in the Scientific Revolution',
      zh: '从“图西双圆”看科学革命中的全球知识环流',
    },
    abstract: {
      en: 'Using the Tusi couple as a case study, this essay challenges a Europe-centred story of the Scientific Revolution and traces the material, political, and commercial networks through which astronomical knowledge moved across Eurasia.',
      zh: '本文以“图西双圆”为切口，反思欧洲中心主义的科学革命叙事，并从物质交换、地缘政治与商贸网络中追踪天文学知识在欧亚大陆的流动与重组。',
    },
    keywords: {
      en: ['Tusi couple', 'Copernicus', 'Maragheh school', 'knowledge circulation'],
      zh: ['图西双圆', '哥白尼', '马拉盖学派', '知识环流'],
    },
    sections: ['摘要', '第一章 引言：被神话的“欧洲理性”', '第二章 证据：几何相似', '第三章 路径：流动的知识', '结语'],
    pdf: '/humanities/global-knowledge.pdf',
  },
  {
    slug: 'city-of-sadness',
    number: '02',
    year: '2026',
    course: { en: 'GEHA1153 Hong Kong, Taiwan Literature and Film', zh: 'GEHA1153 港台文学与电影' },
    format: { en: 'Film Studies Essay', zh: '电影研究课程论文' },
    title: {
      en: 'History Revealed in Everyday Life',
      zh: '在日常中显影的历史',
    },
    shortTitle: {
      en: 'Long-Take Narration in A City of Sadness',
      zh: '《悲情城市》长镜头叙事研究',
    },
    abstract: {
      en: 'This essay examines how Hou Hsiao-hsien turns historical trauma into everyday experience through long takes, domestic spaces, silence, writing, photography, and off-screen violence in A City of Sadness.',
      zh: '本文分析侯孝贤如何在《悲情城市》中通过长镜头、家庭空间、沉默、书写、摄影与画外暴力，将历史创伤转化为普通人能够承受的日常经验。',
    },
    keywords: {
      en: ['A City of Sadness', 'Hou Hsiao-hsien', 'long take', 'historical memory'],
      zh: ['悲情城市', '侯孝贤', '长镜头', '历史记忆'],
    },
    sections: ['一、引言：问题提出与研究路径', '二、日常生活如何承载历史', '三、长镜头如何让历史显影', '四、沉默、缺席与创伤记忆', '结语'],
    pdf: '/humanities/city-of-sadness.pdf',
  },
  {
    slug: 'steel-piano',
    number: '03',
    year: '2024',
    course: { en: 'GEHA1155 Reading Cities: Fiction and Film', zh: 'GEHA1155 阅读城市：小说与电影' },
    format: { en: 'Film Aesthetics Essay', zh: '电影美学课程论文' },
    title: {
      en: 'The Expressive Work of Film Colour',
      zh: '浅谈电影色彩语言对艺术表达的作用',
    },
    shortTitle: {
      en: 'A Study of The Piano in a Factory',
      zh: '以《钢的琴》为例',
    },
    abstract: {
      en: 'Taking The Piano in a Factory as its case, this essay studies colour as film language: its work in rendering character and environment, holding a film’s emotional register, organising narrative movement, and carrying symbolic meaning.',
      zh: '本文以《钢的琴》为例，讨论色彩如何作为电影语言呈现人物情绪与环境、维系影片情感基调、组织叙事结构，并承载具有主题指向的象征意义。',
    },
    keywords: {
      en: ['film colour', 'The Piano in a Factory', 'narrative form', 'symbolism'],
      zh: ['电影色彩语言', '钢的琴', '叙事功能', '象征意义'],
    },
    sections: ['摘要', '电影简介', '概念阐释', '电影色彩语言的叙事功能', '电影色彩语言的象征意义', '结语'],
    pdf: '/humanities/steel-piano.pdf',
  },
  {
    slug: 'existentialism',
    number: '04',
    year: '2025',
    course: { en: 'GEHA1254 Introduction to Philosophy B', zh: 'GEHA1254 哲学导论 B' },
    format: { en: 'Philosophy Essay', zh: '哲学课程论文' },
    title: {
      en: 'Creating Dignity Amid Absurdity',
      zh: '在荒诞中创造尊严',
    },
    shortTitle: {
      en: 'Sartre’s Existentialism as a Humanism',
      zh: '论萨特的存在主义是一种人道主义',
    },
    abstract: {
      en: 'A defence of Sartre’s account of freedom, responsibility, and dignity. The essay responds to objections concerning moral nihilism, material constraint, unbearable responsibility, and the need for social recognition.',
      zh: '本文为萨特关于自由、责任与尊严的存在主义立场辩护，并回应道德虚无、物质条件制约、责任压力与社会承认等质疑。',
    },
    keywords: {
      en: ['Sartre', 'existentialism', 'freedom', 'responsibility', 'dignity'],
      zh: ['萨特', '存在主义', '自由', '责任', '尊严'],
    },
    sections: ['人面对自由和责任', '在荒诞中创造尊严', '结语'],
    pdf: '/humanities/existentialism.pdf',
  },
];

export function getHumanitiesEssay(slug: string | undefined): HumanitiesEssay | undefined {
  return humanitiesEssays.find((essay) => essay.slug === slug);
}

export function getHumanitiesPath(locale: 'en' | 'zh', slug: HumanitiesEssaySlug): string {
  return locale === 'zh' ? `/zh/humanities/${slug}/` : `/humanities/${slug}/`;
}
