import { defineProject } from '../projectSchema';

export default defineProject({
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
});
