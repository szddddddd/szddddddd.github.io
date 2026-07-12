import type { Locale } from '../i18n';

export type LocalizedText = Record<Locale, string>;
export type LinkValue = string | LocalizedText;

export type ProjectCategory = '3d-vision' | 'medical-imaging' | 'creative-coding' | 'coursework';

export type ProjectCover = {
  src: string;
  alt: LocalizedText;
};

export type ProjectSlug =
  | 'arts1308'
  | 'bme1312'
  | 'bme1312-proj2'
  | 'cs182'
  | 'si190c'
  | 'si100b'
  | 'si140a';

export type ProjectLinkSet = {
  details?: LinkValue;
  shadertoy?: LinkValue;
  report?: LinkValue;
  slides?: LinkValue;
  paper?: LinkValue;
  code?: LinkValue;
  demo?: LinkValue;
  readme?: LinkValue;
};

export type Project = {
  id: ProjectSlug;
  number: string;
  slug: ProjectSlug;
  sortOrder: number;
  featured: boolean;
  isPublic: boolean;
  title: LocalizedText;
  type?: LocalizedText;
  course?: string | LocalizedText;
  year: string;
  description: LocalizedText;
  summary: LocalizedText;
  role?: LocalizedText;
  categories: ProjectCategory[];
  displayTags: LocalizedText[];
  allTags: string[];
  tags: string[];
  image: string;
  cover: ProjectCover;
  previewVideo?: string;
  spatialAccent: string;
  links: ProjectLinkSet;
};

export const si190cCourseProject: Project = {
  id: 'si190c',
  number: '01',
  slug: 'si190c',
  sortOrder: 10,
  featured: false,
  isPublic: true,
  title: {
    en: 'SI190C: 6-DOF Robot Arm Integration',
    zh: 'SI190C：六自由度机械臂综合实践',
  },
  type: {
    en: 'Course Project / Robotics',
    zh: '课程项目 / 机器人学',
  },
  course: {
    en: 'SI190C Robotics Integrated Practice',
    zh: 'SI190C 机器人综合实践',
  },
  year: '2025 Summer',
  description: {
    en:
      'A group robotics project spanning 6-DOF arm assembly, linkage-gripper iteration, DH kinematics, calibration, ROS2/Gazebo simulation, and A* motion planning.',
    zh:
      '一个涵盖六自由度机械臂装配、连杆夹爪迭代、DH 运动学、标定、ROS2/Gazebo 仿真与 A* 运动规划的小组机器人课程项目。',
  },
  summary: {
    en:
      'A 6-DOF robot arm integration project covering end-effector design, kinematics, calibration, simulation, and obstacle-aware motion planning.',
    zh:
      '面向六自由度机械臂的综合实践，涵盖末端执行器设计、运动学、标定、仿真和避障运动规划。',
  },
  categories: ['coursework'],
  displayTags: [
    { en: 'Robotics', zh: '机器人学' },
    { en: 'ROS2 / Gazebo', zh: 'ROS2 / Gazebo' },
    { en: 'Motion Planning', zh: '运动规划' },
  ],
  allTags: ['SI190C', 'Robotics', 'DH Kinematics', 'Hand-Eye Calibration', 'ROS2', 'Gazebo', 'A* Motion Planning'],
  tags: ['SI190C', 'Robotics', 'DH Kinematics', 'Hand-Eye Calibration', 'ROS2', 'Gazebo', 'A* Motion Planning'],
  image: '/projects/si190c/si190c-urdf.png',
  cover: {
    src: '/projects/si190c/si190c-urdf.png',
    alt: {
      en: 'SI190C 6-DOF robot URDF model in the simulation environment.',
      zh: '仿真环境中的 SI190C 六自由度机械臂 URDF 模型。',
    },
  },
  spatialAccent: '#65d8cb',
  links: {
    details: {
      en: '/projects/si190c/',
      zh: '/zh/projects/si190c/',
    },
    report: '/projects/si190c/si190c-final-presentation.pdf',
  },
};

export const si100bCourseProject: Project = {
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
};

export const bme1312CourseProject: Project = {
  id: 'bme1312',
  number: '05',
  slug: 'bme1312',
  sortOrder: 50,
  featured: true,
  isPublic: true,
  title: {
    en: 'Multi-contrast MRI Reconstruction from Undersampled Data',
    zh: '基于欠采样数据的多对比度 MRI 重建',
  },
  type: {
    en: 'Course Project',
    zh: '课程项目',
  },
  course: 'BME1312: Applications of Artificial Intelligence in Medical Imaging',
  year: '2026',
  description: {
    en:
      'Deep learning-based accelerated MRI reconstruction using U-Net baselines, multi-modal fusion, unrolled data consistency, wavelet loss, and perceptual objectives.',
    zh:
      '基于深度学习的 MRI 加速重建课程项目，涉及 U-Net baseline、多模态融合、unrolled data consistency、wavelet loss 与 perceptual objectives。',
  },
  summary: {
    en:
      'Deep learning-based accelerated MRI reconstruction using U-Net baselines, multi-modal fusion, unrolled data consistency, wavelet loss, and perceptual objectives.',
    zh:
      '基于深度学习的 MRI 加速重建课程项目，涉及 U-Net baseline、多模态融合、unrolled data consistency、wavelet loss 与 perceptual objectives。',
  },
  categories: ['medical-imaging', 'coursework'],
  displayTags: [
    { en: 'Medical Imaging', zh: '医学影像' },
    { en: 'MRI Reconstruction', zh: 'MRI 重建' },
    { en: 'Deep Learning', zh: '深度学习' },
  ],
  allTags: [
    'Medical Imaging',
    'MRI Reconstruction',
    'Deep Learning',
    'U-Net',
    'Unrolled Network',
    'Data Consistency',
  ],
  tags: [
    'Medical Imaging',
    'MRI Reconstruction',
    'Deep Learning',
    'U-Net',
    'Unrolled Network',
    'Data Consistency',
  ],
  image: '/projects/bme1312/qualitative-comparison.png',
  cover: {
    src: '/projects/bme1312/qualitative-comparison.png',
    alt: {
      en: 'Qualitative comparison between aliased input, ground truth, baseline, and proposed MRI reconstruction.',
      zh: '欠采样输入、真实图像、基线与改进 MRI 重建结果的定性对比。',
    },
  },
  spatialAccent: '#e7c46a',
  links: {
    details: {
      en: '/projects/bme1312/',
      zh: '/zh/projects/bme1312/',
    },
    report: '/projects/bme1312/bme1312-mri-reconstruction-report.pdf',
  },
};

export const bme1312Proj2CourseProject: Project = {
  id: 'bme1312-proj2',
  number: '07',
  slug: 'bme1312-proj2',
  sortOrder: 70,
  featured: true,
  isPublic: true,
  title: {
    en: 'HBA-VAN for Glioma MRI Segmentation',
    zh: 'HBA-VAN 多模态脑胶质瘤 MRI 分割',
  },
  type: {
    en: 'Course Project / Medical Image Segmentation / Deep Learning',
    zh: '课程项目 / 医学影像分割 / 深度学习',
  },
  course: 'BME1312 Artificial Intelligence in Medical Imaging',
  year: '2026',
  description: {
    en:
      'Boundary-aware 3D attention network for multi-modal BraTS glioma subregion segmentation.',
    zh:
      '面向 BraTS 风格多模态脑胶质瘤子区域分割的边界感知 3D attention network。',
  },
  summary: {
    en:
      'Boundary-aware 3D attention network for multi-modal BraTS glioma subregion segmentation.',
    zh:
      '面向 BraTS 风格多模态脑胶质瘤子区域分割的边界感知 3D attention network。',
  },
  role: {
    en:
      'Report writing, result analysis, project presentation integration',
    zh:
      '报告撰写、结果分析、项目展示材料整合',
  },
  categories: ['medical-imaging', 'coursework'],
  displayTags: [
    { en: 'Medical Imaging', zh: '医学影像' },
    { en: '3D U-Net', zh: '3D U-Net' },
    { en: 'Attention', zh: '注意力机制' },
  ],
  allTags: ['Medical Imaging', 'Brain Tumor Segmentation', '3D U-Net', 'Attention', 'BraTS'],
  tags: ['Medical Imaging', 'Brain Tumor Segmentation', '3D U-Net', 'Attention', 'BraTS'],
  image: '/projects/bme1312-proj2/hba-van-architecture.png',
  cover: {
    src: '/projects/bme1312-proj2/hba-van-architecture.png',
    alt: {
      en: 'HBA-VAN architecture for multi-modal glioma MRI segmentation.',
      zh: '用于多模态脑胶质瘤 MRI 分割的 HBA-VAN 网络结构。',
    },
  },
  spatialAccent: '#e7c46a',
  links: {
    details: {
      en: '/projects/bme1312-proj2/',
      zh: '/zh/projects/bme1312-proj2/',
    },
    report: '/projects/bme1312-proj2/hba-van-report.pdf',
    slides: '/projects/bme1312-proj2/hba-van-slides.pptx',
  },
};

export const cs182CourseProject: Project = {
  id: 'cs182',
  number: '04',
  slug: 'cs182',
  sortOrder: 40,
  featured: true,
  isPublic: true,
  title: {
    en: 'MOF3R: Mask-Guided 3D Product Reconstruction',
    zh: 'MOF3R：基于 SAM2 与 3DGS 的 Mask-Guided 三维商品重建',
  },
  type: {
    en: 'Course Project',
    zh: '课程项目',
  },
  course: 'CS182: Introduction to Machine Learning',
  year: '2026',
  description: {
    en:
      'A CS182 course project for object-centric 3D reconstruction using SAM2-guided masks, 3D Gaussian Splatting, and geometry-aware Gaussian pruning.',
    zh:
      'CS182《机器学习引论》课程项目，使用 SAM2 前景分割、3D Gaussian Splatting 与几何感知 Gaussian pruning 进行物体中心三维重建。',
  },
  summary: {
    en:
      'A CS182 course project for object-centric 3D reconstruction using SAM2-guided masks, 3D Gaussian Splatting, and geometry-aware Gaussian pruning.',
    zh:
      'CS182《机器学习引论》课程项目，使用 SAM2 前景分割、3D Gaussian Splatting 与几何感知 Gaussian pruning 进行物体中心三维重建。',
  },
  categories: ['3d-vision', 'coursework'],
  displayTags: [
    { en: '3D Vision', zh: '三维视觉' },
    { en: 'Gaussian Splatting', zh: '高斯泼溅' },
    { en: 'SAM2', zh: 'SAM2' },
  ],
  allTags: ['CS182', '3DGS', 'SAM2', 'Object-Centric Reconstruction', 'CO3Dv2'],
  tags: ['CS182', '3DGS', 'SAM2', 'Object-Centric Reconstruction', 'CO3Dv2'],
  image: '/projects/cs182/MOF3R_overview.png',
  cover: {
    src: '/projects/cs182/MOF3R_overview.png',
    alt: {
      en: 'MOF3R pipeline showing SAM2 masks, mask-guided Gaussian Splatting, and geometry-aware pruning.',
      zh: 'MOF3R 流程图，包含 SAM2 掩码、掩码引导的高斯泼溅训练与几何感知 pruning。',
    },
  },
  spatialAccent: '#8b7cff',
  links: {
    details: {
      en: '/projects/cs182/',
      zh: '/zh/projects/cs182/',
    },
    report: '/projects/cs182/report.pdf',
  },
};

export const arts1308CourseProject: Project = {
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
};

export const si140aCourseProject: Project = {
  id: 'si140a',
  number: '06',
  slug: 'si140a',
  sortOrder: 60,
  featured: false,
  isPublic: true,
  title: {
    en: 'Reverse Engineering WeChat Red Envelope',
    zh: '微信红包机制逆向工程',
  },
  type: {
    en: 'Course Project / Probability Modeling / Statistical Testing',
    zh: '课程项目 / 概率建模 / 统计检验',
  },
  course: 'SI140A Probability Theory',
  year: 'January 2026',
  description: {
    en:
      'Probabilistic modeling and statistical testing of WeChat Red Envelope allocation mechanisms under controlled experimental data.',
    zh:
      '基于受控实验数据，对微信红包金额分配机制进行概率建模、蒙特卡洛仿真与统计检验。',
  },
  summary: {
    en:
      'Probabilistic modeling and statistical testing of WeChat Red Envelope allocation mechanisms under controlled experimental data.',
    zh:
      '基于受控实验数据，对微信红包金额分配机制进行概率建模、蒙特卡洛仿真与统计检验。',
  },
  role: {
    en:
      'Mathematical derivation, experiment organization, partial implementation, simulation verification',
    zh:
      '数学推导、实验组织、部分实现、仿真验证',
  },
  categories: ['coursework'],
  displayTags: [
    { en: 'Probability Theory', zh: '概率论' },
    { en: 'Monte Carlo', zh: '蒙特卡洛' },
    { en: 'Statistical Testing', zh: '统计检验' },
  ],
  allTags: ['Probability Theory', 'Monte Carlo Simulation', 'Statistical Testing', 'Data Analysis'],
  tags: ['Probability Theory', 'Monte Carlo Simulation', 'Statistical Testing', 'Data Analysis'],
  image: '/projects/si140a/cover.png',
  cover: {
    src: '/projects/si140a/cover.png',
    alt: {
      en: 'WeChat Red Envelope allocation analysis visualization.',
      zh: '微信红包金额分配机制分析可视化。',
    },
  },
  spatialAccent: '#77e0f5',
  links: {
    details: {
      en: '/projects/si140a/',
      zh: '/zh/projects/si140a/',
    },
    report: '/projects/si140a/report.pdf',
  },
};

export const projects = [
  cs182CourseProject,
  bme1312CourseProject,
  bme1312Proj2CourseProject,
  si140aCourseProject,
  si100bCourseProject,
  arts1308CourseProject,
  si190cCourseProject,
].sort((left, right) => left.sortOrder - right.sortOrder) satisfies Project[];

export const projectsBySlug: Record<ProjectSlug, Project> = {
  arts1308: arts1308CourseProject,
  bme1312: bme1312CourseProject,
  'bme1312-proj2': bme1312Proj2CourseProject,
  cs182: cs182CourseProject,
  si190c: si190cCourseProject,
  si100b: si100bCourseProject,
  si140a: si140aCourseProject,
};

export function getProject(slug: ProjectSlug) {
  return projectsBySlug[slug];
}
