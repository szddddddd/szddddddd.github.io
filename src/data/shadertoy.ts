export type ShadertoyWork = {
  title: string;
  shaderId: string;
  shaderUrl: string;
  embedUrl: string;
  thumbnail: string;
  remoteThumbnail: string;
  views: number | null;
  likes: number | null;
  description: string;
  tags: string[];
};

const makeWork = (
  index: number,
  title: string,
  shaderId: string,
  views: number,
  likes: number,
): ShadertoyWork => ({
  title,
  shaderId,
  shaderUrl: `https://www.shadertoy.com/view/${shaderId}`,
  embedUrl: `https://www.shadertoy.com/embed/${shaderId}?gui=true&t=10&paused=true&muted=true`,
  thumbnail: `/projects/arts1308/shader-${String(index).padStart(2, '0')}.jpg`,
  remoteThumbnail: `https://www.shadertoy.com/media/shaders/${shaderId}.jpg`,
  views,
  likes,
  description: '',
  tags: ['GLSL', 'Shadertoy', 'Shader Art'],
});

export const shadertoyWorks = [
  makeWork(1, 'Simulation of oil painting', 'W3dXzH', 359, 12),
  makeWork(2, 'Light Shield', 'WXd3DH', 295, 15),
  makeWork(3, 'Crystal laser column', 't3t3DN', 255, 6),
  makeWork(4, 'Colored 3D sphere', 'w33GzB', 239, 6),
  makeWork(5, 'Julia gnomonic projection', 'w3d3D2', 238, 8),
  makeWork(6, 'cross-sea bridge', 'wXK3Dh', 234, 16),
  makeWork(7, 'Mirror fragments', 'WXtGDn', 217, 7),
  makeWork(8, 'Red Cloud Sea', '333GDn', 201, 9),
  makeWork(9, 'Fractal sphere section', '33dGzf', 153, 5),
  makeWork(10, 'visualization of Fourier series', 'WXVGRK', 114, 7),
  makeWork(11, 'conservation of momentum', '3XtXR8', 99, 9),
] satisfies ShadertoyWork[];

export const shadertoyProfileUrl = 'https://www.shadertoy.com/user/szd/sort=popular&from=0&num=8';
export const shadertoyProfilePageTwoUrl = 'https://www.shadertoy.com/user/szd/sort=popular&from=8&num=8';
