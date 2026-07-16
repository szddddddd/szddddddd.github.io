import { defineProjectContent } from '../contentSchema';

const enSource = {
      metaTitle: 'SI190C 6-DOF Robot Arm Integration — Song Zidong',
      metaDescription: 'SI190C Robotics Integrated Practice final project covering 6-DOF arm assembly, end-effector design, DH kinematics, calibration, simulation, and A* motion planning.',
      eyebrow: 'Course Project / Robotics',
      title: 'SI190C: 6-DOF Robot Arm Integration',
      subtitle: 'A robot-arm systems project from end-effector design through obstacle-aware motion planning.',
      affiliation: 'SI190C Robotics Integrated Practice · Group 5 · ShanghaiTech University · Summer 2025',
      metadata: ['SI190C', 'Course Project', '6-DOF Arm', 'ROS2 / Gazebo', 'Hand-Eye Calibration', 'A* Motion Planning'],
      labels: { course: 'Course', type: 'Type', term: 'Term', format: 'Format', summary: 'Project Summary', workstream: 'Workstream', finding: 'Finding', contribution: 'Project Note' },
      sections: { overview: 'Overview', workstreams: 'System Workstreams', calibration: 'Calibration and Error Analysis', simulation: 'Simulation and Motion Planning', contribution: 'Project Note' },
      overview: 'This course project integrates a 6-DOF robot arm across mechanical assembly, end-effector modeling and iteration, DH-parameter kinematics, camera and hand-eye calibration, ROS2 / Gazebo simulation, and A*-based obstacle-aware motion planning. The page preserves reviewable artifacts and conclusions instead of reproducing the raw slide deck.',
      overviewBullets: [
        'Assembled six reducers, 3D-printed structural components, and serial motor wiring into a basic arm, then verified joint motion through the provided visualization interface.',
        'Iterated through four end-effector concepts before selecting a linkage mechanism that achieved light-payload grasping.',
        'Built the DH model, forward and inverse kinematics, and ROS2 pose control, including an extension path for treating the gripper as a seventh joint.',
        'Validated modeling, trajectory tracking, end-effector monitoring, and obstacle-aware planning in MATLAB, Robotics Toolbox, and Gazebo.',
      ],
      streamCards: [
        { title: 'Assembly and Gripper', items: ['Built the 6-DOF arm and debugged serial motor connections.', 'Iterated through four gripper designs, moving from leadscrew concepts to a linkage end-effector.', 'The final mechanism achieved light-payload grasping while exposing precision, payload, and stall-protection limits.'] },
        { title: 'Kinematics and Control', items: ['Measured and assembled the six-joint DH parameter table.', 'Implemented forward and inverse kinematics with wrist-center decomposition.', 'Used quaternions for ROS2 end-effector pose representation to avoid Euler-angle gimbal lock.'] },
        { title: 'Calibration and Perception', items: ['Applied an iterative least-squares error-compensation model to DH calibration.', 'Estimated camera intrinsics and distortion from 25 valid chessboard images.', 'Compared multiple hand-eye calibration methods within the AX = XB formulation.'] },
        { title: 'Simulation and Planning', items: ['Built models in MATLAB Robotics System Toolbox and a third-party toolbox.', 'Published joint commands and monitored /tf end-effector motion in ROS2 / Gazebo.', 'Used continuous initial guesses and denser samples to reduce IK jumps, then planned obstacle-aware paths with A*.'] },
      ],
      metrics: [
        { label: 'Mechanical Degrees of Freedom', value: '6-DOF', note: 'serial robot arm' },
        { label: 'Gripper Iterations', value: '04', note: 'final linkage mechanism' },
        { label: 'Camera Calibration', value: '25', note: 'valid chessboard images' },
        { label: 'DH Error Change', value: '20.5%', note: 'average improvement reported in the presentation' },
      ],
      calibrationIntro: 'DH calibration models the difference between sensed and theoretical poses with an error-compensation matrix and estimates parameter corrections through iterative least squares. Hand-eye calibration uses AX = XB and compares Tsai-Lenz, Park, Horaud, Andreff, and Daniilidis methods; the presentation also documents insufficient excitation and unreliable translation estimates as open limitations.',
      calibrationBullets: ['The reported average DH error changed from 0.042002 to 0.033400, described as an approximately 20.5% improvement.', 'Camera calibration recorded a reprojection error of 0.16898 after estimating intrinsics and distortion from chessboard observations.', 'The hand-eye rotation matrix was checked for unit row norms, orthogonality, and determinant; translation still requires validation with more diverse robot poses.'],
      simulationIntro: 'The digital workflow covers interactive URDF inspection, a DH-based rigidBodyTree, circular trajectory tracking, and Gazebo end-effector monitoring. Motion planning marks obstacle safety margins in an occupancy grid, then combines A* search, spline interpolation, and continuous inverse-kinematics seeds to generate smoother joint motion.',
      gallery: [
        { src: '/projects/si190c/si190c-urdf.png', alt: 'SI190C robot URDF model shown in an interactive MATLAB environment.', caption: 'SI190C URDF model and coordinate-frame inspection in the simulation environment.' },
        { src: '/projects/si190c/urdf-trajectory.png', alt: 'Circular end-effector trajectory tracked by the SI190C URDF model.', caption: 'End-effector trajectory tracking with the URDF-based robot model.' },
        { src: '/projects/si190c/astar-motion-plan.png', alt: 'A star motion-planning path through circular obstacles.', caption: 'A* path planning with obstacle safety margins before trajectory interpolation.' },
      ],
      contribution: 'This is a Group 5 integrated-practice report. The page describes the system, process, and findings recorded in the final presentation, and deliberately does not attribute unspecified team work to an individual contributor.',
    } as const;
const zhSource = {
      metaTitle: 'SI190C 六自由度机械臂综合实践 — 宋梓冬',
      metaDescription: 'SI190C 机器人综合实践课程汇报，涵盖六自由度机械臂装配、夹爪设计、DH 运动学、标定、仿真与 A* 运动规划。',
      eyebrow: '课程项目 / 机器人学',
      title: 'SI190C：六自由度机械臂综合实践',
      subtitle: '从末端执行器设计到运动规划的机械臂系统集成课程项目。',
      affiliation: 'SI190C 机器人综合实践 · Group 5 · 上海科技大学 · 2025 年夏',
      metadata: ['SI190C', '课程项目', '6-DOF 机械臂', 'ROS2 / Gazebo', '手眼标定', 'A* 运动规划'],
      labels: { course: '课程', type: '类型', term: '学期', format: '形式', summary: '项目摘要', workstream: '工作模块', finding: '成果', contribution: '项目说明' },
      sections: { overview: '项目概览', workstreams: '系统工作模块', calibration: '标定与误差分析', simulation: '仿真与运动规划', contribution: '项目说明' },
      overview: '该课程项目以一台六自由度机械臂为对象，串联完成机械装配、末端夹爪建模与迭代、DH 参数建模、正逆运动学、相机与手眼标定、ROS2 / Gazebo 仿真以及基于 A* 的避障路径规划。网页保留可复核的阶段性产物与结论，而非直接堆叠原始课件。',
      overviewBullets: [
        '完成 6 个减速器、3D 打印结构件与电机串联的基础机械臂装配，并通过可视化接口验证各关节转动。',
        '经历四轮末端执行器方案迭代，最终采用连杆机构实现轻载抓取。',
        '基于 DH 参数实现正运动学、逆运动学与 ROS2 位姿控制，并讨论夹爪作为第七关节的可扩展性。',
        '在 MATLAB、Robotics Toolbox 和 Gazebo 中完成模型、轨迹跟踪、末端监听及避障规划验证。',
      ],
      streamCards: [
        { title: '机械装配与夹爪', items: ['六自由度机械臂基础装配与电机串联调试。', '四轮夹爪设计迭代，从丝杠方案转向连杆式末端执行器。', '最终夹爪实现轻载抓取，并记录精度、负载与堵转等限制。'] },
        { title: '运动学与控制', items: ['测量并建立六关节 DH 参数表。', '实现正、逆运动学与腕部中心分解。', '使用四元数描述 ROS2 中的末端位姿，规避欧拉角万向锁。'] },
        { title: '标定与感知', items: ['以最小二乘误差补偿模型校正 DH 参数。', '完成相机内参与畸变标定，并采集 25 组有效棋盘格图像。', '通过 AX = XB 框架比较多种手眼标定算法。'] },
        { title: '仿真与规划', items: ['在 MATLAB Robotics System Toolbox 和第三方工具箱建立机器人模型。', '通过 ROS2 / Gazebo 发布关节指令并监听 /tf 末端轨迹。', '使用连续初值与加密采样缓解 IK 跳变，结合 A* 实现平面避障路径。'] },
      ],
      metrics: [
        { label: '机械自由度', value: '6-DOF', note: '串联关节机械臂' },
        { label: '夹爪迭代', value: '04', note: '最终采用连杆机构' },
        { label: '相机标定', value: '25', note: '有效棋盘格图像' },
        { label: 'DH 误差变化', value: '20.5%', note: '汇报记录的平均误差改善' },
      ],
      calibrationIntro: 'DH 参数标定将传感位姿与理论位姿的差异写为误差补偿矩阵，并以最小二乘迭代估计参数修正。手眼标定采用 AX = XB 建模，对 Tsai-Lenz、Park、Horaud、Andreff 与 Daniilidis 等方法进行比较；汇报同时明确指出了数据激励不足与平移结果不可靠等问题。',
      calibrationBullets: ['DH 标定的平均误差从 0.042002 降至 0.033400，汇报中记为约 20.5% 的改善。', '相机重投影误差记录为 0.16898，内参与畸变系数通过棋盘格图像估计。', '手眼标定的旋转矩阵可通过单位长度、正交性和行列式进行合理性检验；平移结果仍需通过扩大位姿变化范围进一步验证。'],
      simulationIntro: '数字模型覆盖交互式 URDF、基于 DH 的 rigidBodyTree、圆轨迹跟踪和 Gazebo 末端位姿监听。运动规划部分在占据栅格中加入障碍物安全边界，通过 A* 搜索、样条插值与连续逆解初值生成更平滑的关节轨迹。',
      gallery: [
        { src: '/projects/si190c/si190c-urdf.png', alt: 'SI190C robot URDF model shown in an interactive MATLAB environment.', caption: 'SI190C URDF model and coordinate-frame inspection in the simulation environment.' },
        { src: '/projects/si190c/urdf-trajectory.png', alt: 'Circular end-effector trajectory tracked by the SI190C URDF model.', caption: 'End-effector trajectory tracking with the URDF-based robot model.' },
        { src: '/projects/si190c/astar-motion-plan.png', alt: 'A star motion-planning path through circular obstacles.', caption: 'A* path planning with obstacle safety margins before trajectory interpolation.' },
      ],
      contribution: '这是 Group 5 的课程综合实践汇报。页面陈述的是项目系统、汇报中记录的实验过程与结果，不将未明确分配的团队成果归因给个人。',
    } as const;

export default defineProjectContent({
  id: 'si190c',
  articleClass: 'si190c-detail',
  heroCaption: 'gallery.0.caption',
  heroActions: [{ type: 'project-link', link: 'report', label: 'report', optional: true }],
  documents: {
    en: {
      ...enSource,
      hero: { eyebrow: enSource.eyebrow, title: enSource.title, subtitle: enSource.subtitle, affiliation: enSource.affiliation }, outcomesTitle: 'Key Stage Outcomes', metricsLabel: 'Project key metrics', gripperAlt: 'Final linkage gripper design for the SI190C 6-DOF robot arm.', gripperCaption: 'Final linkage-gripper CAD design for light-payload end-effector grasping.', calibrationAlt: 'Comparison of rotation error, translation error, and computation time across hand-eye calibration methods.', calibrationCaption: 'Error and computation-time comparison for hand-eye calibration methods.',

      details: [
    { label: enSource.labels.course, value: 'SI190C Robotics Integrated Practice' }, { label: enSource.labels.type, value: 'Course Project / Robotics' },
    { label: enSource.labels.term, value: '2025 Summer' }, { label: enSource.labels.format, value: 'Group 5 integrated practice' },
  ],
    },
    zh: {
      ...zhSource,
      hero: { eyebrow: zhSource.eyebrow, title: zhSource.title, subtitle: zhSource.subtitle, affiliation: zhSource.affiliation }, outcomesTitle: '关键阶段成果', metricsLabel: '项目关键指标', gripperAlt: 'SI190C 六自由度机械臂的最终连杆夹爪设计。', gripperCaption: '最终连杆夹爪的 CAD 设计，用于机械臂末端轻载抓取。', calibrationAlt: '多种手眼标定方法的旋转误差、平移误差与计算时间比较。', calibrationCaption: '手眼标定方法的误差与计算时间比较。',

      details: [
    { label: zhSource.labels.course, value: 'SI190C 机器人综合实践' }, { label: zhSource.labels.type, value: '课程项目 / 机器人学' },
    { label: zhSource.labels.term, value: '2025 年夏' }, { label: zhSource.labels.format, value: 'Group 5 综合实践' },
  ],
    },
  },
  sections: [
    { id: 'overview', eyebrow: 'SI190C', title: 'sections.overview', intro: 'overview', blocks: [{ type: 'group', className: 'detail-two-column', blocks: [{ type: 'bullet-panel', items: 'overviewBullets', label: 'labels.summary' }, { type: 'figure', src: '/projects/si190c/final-linkage-gripper.png', alt: 'gripperAlt', caption: 'gripperCaption', className: 'compact-figure' }] }] },
    { id: 'workstreams', title: 'sections.workstreams', blocks: [{ type: 'card-grid', items: 'streamCards', label: 'labels.workstream', className: 'method-detail-grid', cardClassName: 'panel method-technical-panel' }] },
    { id: 'outcomes', title: 'outcomesTitle', blocks: [{ type: 'metric-cards', items: 'metrics', ariaLabel: 'metricsLabel' }] },
    { id: 'calibration', title: 'sections.calibration', intro: 'calibrationIntro', blocks: [{ type: 'group', className: 'detail-two-column', blocks: [{ type: 'figure', src: '/projects/si190c/hand-eye-method-comparison.png', alt: 'calibrationAlt', caption: 'calibrationCaption', className: 'compact-figure' }, { type: 'bullet-panel', items: 'calibrationBullets', label: 'labels.finding' }] }] },
    { id: 'simulation', title: 'sections.simulation', intro: 'simulationIntro', blocks: [{ type: 'gallery', items: 'gallery', start: 1 }] },
    { id: 'project-note', title: 'sections.contribution', blocks: [{ type: 'narrative', text: 'contribution', label: 'labels.contribution' }] },
  ],
});
