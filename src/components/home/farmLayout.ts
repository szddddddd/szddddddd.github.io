import { islandLayout } from './islandTerrain';
// Shared coordinates keep the farm paths, fence opening and animals on one level.
export const farmLayout = {
  ground: islandLayout.pads.find(p=>p.name==='farm')!.height,
  laneX: -10.35,
  entranceZ: 2.65,
  fence: [[-16.5,-3.5],[-12,-3.5],[-11,-2.5],[-11,2.05],[-11,3.25],[-12,3.5],[-16.5,3.5],[-17.5,2.5],[-17.5,-2.5]],
  gateSegment: 3,
  grazing: { x: -16, z: .15 },
  walking: { x: -13.5, z: 1.05, radiusX: .85, radiusZ: .7 },
} as const;
