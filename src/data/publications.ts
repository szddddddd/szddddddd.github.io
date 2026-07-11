import type { LocalizedText, ProjectSlug } from './projects';

export type PublicationKind = 'peer-reviewed' | 'technical-report';

export type PublicationRecord = {
  id: string;
  kind: PublicationKind;
  projectId?: ProjectSlug;
  title?: LocalizedText;
  authors?: LocalizedText;
  venue?: LocalizedText;
  year?: string;
  type: LocalizedText;
  status: LocalizedText;
};

export const peerReviewed: PublicationRecord[] = [];

export const technicalReports: PublicationRecord[] = [
  {
    id: 'mof3r-course-report',
    kind: 'technical-report',
    projectId: 'cs182',
    authors: {
      en: 'Zidong Song, Boyang Zhou, Zian Chen',
      zh: 'Zidong Song、Boyang Zhou、Zian Chen',
    },
    type: { en: 'Course Project Report', zh: '课程项目报告' },
    status: { en: 'Coursework', zh: '课程项目' },
  },
  {
    id: 'mri-reconstruction-course-report',
    kind: 'technical-report',
    projectId: 'bme1312',
    type: { en: 'Course Project Report', zh: '课程项目报告' },
    status: { en: 'Coursework', zh: '课程项目' },
  },
  {
    id: 'hba-van-course-report',
    kind: 'technical-report',
    projectId: 'bme1312-proj2',
    type: { en: 'Course Project Report', zh: '课程项目报告' },
    status: { en: 'Coursework', zh: '课程项目' },
  },
  {
    id: 'wechat-red-envelope-course-report',
    kind: 'technical-report',
    projectId: 'si140a',
    type: { en: 'Course Project Report', zh: '课程项目报告' },
    status: { en: 'Coursework', zh: '课程项目' },
  },
  {
    id: 'save-my-linear-algebra-course-report',
    kind: 'technical-report',
    projectId: 'si100b',
    authors: {
      en: '潘佑邦, 宋梓冬, 吴俊阳',
      zh: '潘佑邦、宋梓冬、吴俊阳',
    },
    type: { en: 'Course Project Report', zh: '课程项目报告' },
    status: { en: 'Coursework', zh: '课程项目' },
  },
];
