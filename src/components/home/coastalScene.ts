import * as THREE from "three";

// All shapes and colors are original; no Minecraft assets are used.
export function buildHabitat(scene: THREE.Scene) {
  const geometry = new THREE.BoxGeometry(1, 1, 1);
  const material = new THREE.MeshStandardMaterial({ roughness: 0.88 });
  const blocks: { position: number[]; size: number[]; color: string }[] = [];
  const box = (
    x: number,
    y: number,
    z: number,
    w: number,
    h: number,
    d: number,
    color: string,
  ) => blocks.push({ position: [x, y, z], size: [w, h, d], color });
  let seed = 718;
  const rand = () =>
    (seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0) / 4294967296;
  const wood = "#885b3c",
    dark = "#493a2d",
    cream = "#d8cda2",
    green = "#65894c";
  // The land rises directly out of continuous water, without a display plinth.
  for (let x = -7; x <= 2; x++)
    for (let z = -5; z <= 5; z++) {
      if ((x > 0 && z > 1) || (x === 2 && z < -3)) continue;
      const h = 0.8 + (x < -3 ? 0.35 : 0);
      box(
        x,
        -0.85 + h / 2,
        z,
        0.99,
        h,
        0.99,
        ["#7b7660", "#8c8268", "#777e6b"][Math.floor(rand() * 3)],
      );
      box(
        x,
        -0.85 + h + 0.09,
        z,
        1,
        0.18,
        1,
        ["#829763", "#92a66e", "#718952"][Math.floor(rand() * 3)],
      );
      if (rand() > 0.75)
        box(x + 0.15, 0.38, z - 0.1, 0.22, 0.28, 0.22, "#a4b37a");
    }
  // One continuous shell per storey. Decorative windows sit outside it;
  // they never punch accidental gaps through the facade.
  const windowFront = (x: number, y: number, z: number) => {
    box(x, y, z, 1.02, 1.22, 0.12, dark);
    box(x, y, z + 0.085, 0.83, 1.03, 0.035, "#abc5c0");
    box(x, y, z + 0.12, 0.055, 1.04, 0.025, wood);
    box(x, y, z + 0.14, 0.84, 0.055, 0.025, wood);
    box(x, y - 0.65, z + 0.1, 1.2, 0.12, 0.32, wood);
  };
  const storey = (cx: number, base: number, width: number) => {
    const left = cx - width / 2,
      right = cx + width / 2;
    box(cx, base, -0.75, width + 0.18, 0.2, 4.6, wood);
    box(cx, base + 1.3, -2.95, width, 2.6, .2, cream);
    if (base < 1) {
      box((left+.12)/2,base+1.3,1.45,.12-left,2.6,.2,cream);
      box((1.08+right)/2,base+1.3,1.45,right-1.08,2.6,.2,cream);
      box(.6,base+2.35,1.45,.96,.5,.2,cream);
    } else box(cx,base+1.3,1.45,width,2.6,.2,cream);
    for (const x of [left, right])
      box(x, base + 1.3, -0.75, 0.2, 2.6, 4.2, cream);
    for (const x of [left, right])
      for (const z of [-2.95, 1.45])
        box(x, base + 1.3, z, 0.27, 2.6, 0.27, dark);
    for (const z of [-3.08, 1.58])
      for (const y of [base + 0.2, base + 2.48])
        box(cx, y, z, width, 0.18, 0.12, wood);
    const count = Math.floor((width - 0.5) / 1.4);
    for (let i = 0; i < count; i++) {
      const x = left + 0.75 + (i * (width - 1.5)) / Math.max(1, count - 1);
      if (base > 1 || Math.abs(x - 0.6) > 0.7)
        windowFront(x, base + 1.35, 1.59);
      // Back windows face outward too.
      box(x, base + 1.35, -3.09, 1.02, 1.22, 0.12, dark);
      box(x, base + 1.35, -3.175, 0.83, 1.03, 0.035, "#d5bf90");
      box(x, base + 1.35, -3.21, 0.055, 1.04, 0.025, wood);
    }
    for (const side of [-1, 1])
      for (const z of [-1.9, 0.3]) {
        const x = side < 0 ? left : right;
        box(x + side * 0.15, base + 1.35, z, 0.12, 1.22, 1.02, dark);
        box(x + side * 0.235, base + 1.35, z, 0.035, 1.03, 0.83, "#d5bf90");
        box(x + side * 0.27, base + 1.35, z, 0.025, 1.04, 0.055, wood);
      }
  };
  storey(-1, 0.75, 6.6);
  storey(-1.9, 3.35, 4.8);
  // Continuous stepped backing closes every riser and gable. Each roof
  // row is emitted once (including the ridge), with tiles inset above it.
  const roof = (cx: number, base: number, width: number) => {
    const cz = -0.75,
      halfDepth = 2.65,
      steps = 8,
      step = halfDepth / steps,
      rise = 0.18;
    for (let i = 0; i < steps; i++) {
      const depth = 2 * (halfDepth - i * step);
      box(cx, base + i * rise, cz, width, 0.2, depth, "#315956");
      // Fill attic to the underside of the stepped roof without exceeding it.
      if (i < steps - 1)
        box(
          cx,
          base - 0.11 + i * rise,
          cz,
          width - 0.55,
          0.18,
          depth - 0.48,
          cream,
        );
    }
    const columns = Math.ceil(width / 0.38),
      tileWidth = width / columns;
    for (let row = 0; row < steps; row++)
      for (const side of [-1, 1]) {
        const z = cz + side * (halfDepth - (row + 0.5) * step);
        for (let col = 0; col < columns; col++) {
          const x = cx - width / 2 + (col + 0.5) * tileWidth;
          box(
            x,
            base + row * rise + 0.115,
            z,
            tileWidth - 0.018,
            0.03,
            step - 0.025,
            ["#3c655c", "#476f61", "#527865"][Math.floor(rand() * 3)],
          );
        }
      }
    box(
      cx,
      base + (steps - 1) * rise + 0.16,
      cz,
      width + 0.06,
      0.14,
      0.19,
      "#708777",
    );
    for (const z of [cz - halfDepth, cz + halfDepth])
      box(cx, base - 0.1, z, width + 0.08, 0.22, 0.16, dark);
  };
  roof(-1.9, 5.99, 5.55);
  // The lower wing joins the upper shell, with no separate tall gable.
  roof(1.55, 3.39, 2.1);
  for(const x of [.12,1.08])box(x,1.78,1.64,.1,2.06,.12,dark);
  box(.6,2.84,1.64,1.06,.12,.12,dark);
  box(-2.2, 3.37, 1.92, 4.3, 0.16, 0.65, wood);
  for (let i = 0; i < 14; i++)
    box(-4.15 + i * 0.3, 3.87, 2.19, 0.08, 0.84, 0.08, wood);
  box(-2.2, 4.33, 2.19, 4.3, 0.12, 0.16, dark);
  for (const x of [-3.4, -1.9]) {
    box(x, 3.99, 1.9, 0.88, 0.22, 0.3, wood);
    for (let i = 0; i < 4; i++) {
      box(x - 0.3 + i * 0.2, 4.17, 1.9, 0.1, 0.26, 0.1, green);
      box(
        x - 0.3 + i * 0.2,
        4.34,
        1.9,
        0.16,
        0.12,
        0.16,
        i % 2 ? "#efb484" : "#c98a9a",
      );
    }
  }
  // Brick chimney.
  box(-3, 6.95, -1.6, 0.65, 1.9, 0.7, "#846a5c");
  for (let y = 6.2; y < 7.9; y += 0.22) {
    box(-3, y, -1.23, 0.65, 0.025, 0.03, "#c0a28a");
    box(-3.34, y, -1.6, 0.03, 0.025, 0.7, "#c0a28a");
  }
  box(-3, 7.95, -1.6, 0.83, 0.18, 0.87, "#a88e79");
  // Furnishings are visible through the cutaway front.
  const table = (x: number, y: number, z: number, w: number) => {
    box(x, y + 0.7, z, w, 0.14, 0.75, wood);
    for (const dx of [-w / 2 + 0.12, w / 2 - 0.12])
      for (const dz of [-0.25, 0.25])
        box(x + dx, y + 0.35, z + dz, 0.1, 0.7, 0.1, dark);
  };
  table(-2.7, 0.85, 0.6, 1.6);
  table(-2.7, 3.45, 0.5, 1.4);
  box(-0.3, 1.13, -1.9, 1.8, 0.45, 1, "#5e7858");
  box(-0.3, 1.4, -2.22, 1.8, 0.75, 0.24, "#768c62");
  box(-3.9, 2, -1.7, 0.7, 2.1, 0.55, wood);
  for (let y = 1.25; y < 2.9; y += 0.55) {
    box(-3.9, y, -1.39, 0.63, 0.07, 0.6, dark);
    for (let x = -4.13; x < -3.65; x += 0.12)
      box(
        x,
        y + 0.22,
        -1.45,
        0.09,
        0.36,
        0.26,
        ["#a65e4d", "#758f80", "#c2ab73"][Math.floor(rand() * 3)],
      );
  }
  box(-1.4, 3.72, -1.6, 1.85, 0.42, 0.95, dark);
  box(-1.4, 3.97, -1.6, 1.85, 0.13, 0.95, "#6f9690");
  box(-2, 4.08, -1.6, 0.42, 0.15, 0.78, "#e6d6b3");
  // Stairs climb the side of the porch to the studio.
  for (let i = 0; i < 9; i++)
    box(0.4, 1 + i * 0.27, 1.95 - i * 0.28, 0.85, 0.2, 0.38, wood);
  const pot = (x: number, y: number, z: number) => {
    box(x, y + 0.17, z, 0.32, 0.34, 0.32, "#b67959");
    box(x, y + 0.38, z, 0.4, 0.08, 0.4, "#d59a72");
    box(x, y + 0.6, z, 0.1, 0.42, 0.1, green);
    box(x - 0.12, y + 0.65, z, 0.27, 0.12, 0.2, "#849c53");
    box(x + 0.09, y + 0.85, z, 0.28, 0.18, 0.23, "#e8b985");
  };
  pot(-2.6, 1.62, 0.6);
  pot(-2.8, 4.2, 0.5);
  pot(1.5, 0.87, 1.1);
  pot(-4.9, 0.7, 1.9);
  // Porch and pier over the water, including posts and rope-like rails.
  for (let x = -4.8; x < 6.4; x += 0.3)
    box(x, 0.56, 2.7, 0.28, 0.18, 1.6, wood);
  for (const x of [-4.5, -1, 2.4, 5.8]) {
    for (const z of [2.05, 3.35]) {
      box(x, -0.13, z, 0.2, 1.6, 0.2, dark);
      box(x, 1.06, z, 0.16, 0.9, 0.16, wood);
    }
    if (x < 5) box(x + 1.5, 1.34, 3.35, 3, 0.07, 0.07, "#b6a887");
  }
  const crate = (x: number, z: number) => {
    box(x, 0.94, z, 0.65, 0.65, 0.65, "#a77a4f");
    for (const dy of [-0.23, 0.23])
      box(x, 0.94 + dy, z + 0.34, 0.69, 0.07, 0.06, "#5d4832");
    box(x, 0.94, z + 0.38, 0.08, 0.65, 0.04, "#5d4832");
  };
  crate(4.3, 2.22);
  crate(5.1, 2.22);
  const boatStart = blocks.length;
  // A tiny boat moored next to the pier.
  box(5.4, -0.78, 4.65, 1.7, 0.16, 0.7, "#59432f");
  for (const z of [4.2, 5.1]) box(5.4, -0.53, z, 1.7, 0.45, 0.16, wood);
  for (const x of [4.5, 6.3]) box(x, -0.54, 4.65, 0.16, 0.4, 0.7, wood);
  box(5.2, -0.38, 4.65, 0.23, 0.12, 0.8, "#c09765");
  const boatBlocks = blocks.splice(boatStart);
  // Block canopies, branch structure, shrubs and grassy edge.
  const tree = (x: number, z: number, height: number) => {
    box(x, height / 2 + 0.4, z, 0.45, height, 0.45, "#6b5237");
    box(x + 0.42, height * 0.7, z, 0.7, 0.22, 0.22, wood);
    for (let a = -2; a <= 2; a++)
      for (let b = -2; b <= 2; b++)
        for (let c = -1; c <= 1; c++) {
          if (Math.abs(a) + Math.abs(b) + Math.abs(c) > 4 || rand() < 0.16)
            continue;
          box(
            x + a * 0.58,
            height + c * 0.5,
            z + b * 0.58,
            0.58,
            0.5,
            0.58,
            ["#557549", "#648550", "#77975d", "#92a96c"][
              Math.floor(rand() * 4)
            ],
          );
        }
  };
  tree(-5.9, -2.5, 4.3);
  tree(-5.5, 3.7, 2.9);
  tree(0.6, -4.6, 3.7);
  tree(-3.8, -4.8, 4.4);
  for (let i = 0; i < 35; i++) {
    const x = -6.7 + rand() * 8,
      z = -5 + rand() * 10;
    if (x > -4.8 && z > -3.5 && z < 3.5) continue;
    box(x, 0.58, z, 0.28, 0.5, 0.28, ["#6a884c", "#a8b46b", "#8e9f55"][i % 3]);
    if (i % 4 === 0) box(x, 0.88, z, 0.18, 0.18, 0.18, "#e7b28b");
  }
  // Warm fixtures use emissive blocks, avoiding a shadow map per lamp.
  const lanternMaterial = new THREE.MeshStandardMaterial({
    color: "#ffe1a0",
    emissive: "#ffb64c",
    emissiveIntensity: 1.8,
  });
  for (const [x, y, z] of [
    [-4.4, 2.8, 1.5],
    [-0.1, 5.5, 1.5],
    [2.5, 2.8, 1.5],
    [5.8, 1.55, 3.35],
  ]) {
    box(x, y + 0.2, z, 0.26, 0.09, 0.26, dark);
    box(x, y - 0.2, z, 0.26, 0.08, 0.26, dark);
    const lamp = new THREE.Mesh(geometry, lanternMaterial);
    lamp.scale.set(0.17, 0.3, 0.17);
    lamp.position.set(x, y, z);
    scene.add(lamp);
  }
  // Extend the mainland westward; new buildings stay clear of the original house.
  for (let x = -10; x <= -8; x++)
    for (let z = -6; z <= 6; z++) {
      box(x, -0.15, z, 1, 1.4, 1, "#858273");
      box(x, 0.6, z, 1, 0.1, 1, "#97a776");
    }
  for (let z = -5; z <= 5; z++) {
    box(-7.7, 0.68, z, 0.75, 0.08, 0.7, z % 2 ? "#bdc0a5" : "#adb49e");
  }
  // Garden shed, closed walls and stepped roof.
  box(-9, 1.55, -4.6, 2.1, 1.8, 2, "#a3b8a0");
  box(-9, 0.72, -4.6, 2.3, 0.18, 2.2, wood);
  for (let row = 0; row < 5; row++)
    box(-9, 2.5 + row * 0.19, -4.6, 2.5, 0.2, 2.5 - row * 0.45, "#866b60");
  box(-9, 1.4, -3.54, 0.78, 1.5, 0.1, dark);
  box(-9, 1.4, -3.47, 0.6, 1.35, 0.04, "#b68c5f");
  box(-8.45, 1.8, -3.53, 0.5, 0.55, 0.1, dark);
  box(-8.45, 1.8, -3.46, 0.37, 0.4, 0.04, "#e3ca91");
  // Three raised beds and a low picket fence.
  for (const z of [-1.9, -0.2, 1.5]) {
    box(-9, 0.8, z, 1.75, 0.25, 1.05, wood);
    box(-9, 0.95, z, 1.52, 0.06, 0.83, "#594d38");
    for (let i = 0; i < 4; i++)
      for (const dz of [-0.23, 0.23]) {
        const x = -9.55 + i * 0.36;
        box(x, 1.15, z + dz, 0.18, 0.35, 0.16, "#729651");
        box(x, 1.36, z + dz, 0.27, 0.13, 0.26, z < -1 ? "#c79859" : "#91ae5f");
      }
  }
  for (let z = -2.8; z < 2.7; z += 0.45)
    box(-10.2, 1.07, z, 0.1, 0.8, 0.12, "#d4c8a8");
  box(-10.2, 1.17, -0.1, 0.12, 0.1, 5.7, "#c9bb97");
  table(-9, 0.68, 4.35, 1.8);
  box(-9, 1.1, 3.65, 1.9, 0.15, 0.35, wood);
  box(-9, 1.1, 5.05, 1.9, 0.15, 0.35, wood);
  tree(-9.2, 6, 2.8);
  // Lighthouse island and a narrow breakwater connection.
  for (let x = 2; x <= 8; x++) box(x, -0.2, -5.9, 1, 1.2, 0.9, "#939584");
  box(2, -0.2, -4.9, 1, 1.2, 1.1, "#939584");
  for (let x = 7; x <= 9; x++)
    for (let z = -7; z <= -5; z++) {
      box(x, -0.3, z, 0.99, 1.3, 0.99, "#939584");
      box(x, 0.4, z, 0.99, 0.12, 0.99, "#c5c1a2");
    }
  for (let i = 0; i < 6; i++)
    box(
      8,
      0.8 + i * 0.5,
      -6,
      1.25,
      0.5,
      1.25,
      i % 3 === 1 ? "#b36e61" : "#e2d9bb",
    );
  box(8, 3.65, -6, 1.65, 0.18, 1.65, dark);
  box(8, 4.13, -6, 1.08, 0.75, 1.08, "#e5ca8e");
  for (const x of [7.43, 8.57])
    for (const z of [-6.57, -5.43]) box(x, 4.13, z, 0.1, 0.8, 0.1, dark);
  box(8, 4.58, -6, 1.65, 0.18, 1.65, "#567e79");
  box(8, 4.78, -6, 1.16, 0.22, 1.16, "#567e79");
  box(8, 4.98, -6, 0.7, 0.2, 0.7, "#567e79");
  box(8, 1.15, -5.35, 0.55, 1.2, 0.09, dark);
  for (const x of [-7.6, 3.1, 6]) {
    const z = x < 0 ? 3.8 : -5.9;
    box(x, 1.05, z, 0.11, 1.5, 0.11, dark);
    box(x, 1.83, z, 0.25, 0.35, 0.25, "#efd59a");
    box(x, 2.04, z, 0.37, 0.09, 0.37, dark);
  }
  // Deterministic shore contours leave the dock, shipping lane and gardens clear.
  const shoreCells: { x: number; z: number; height: number }[] = [];
  for (let x = -15; x <= 1; x++) for (let z = -11; z <= 8; z++) {
    const west = Math.pow((x + 10) / 4.7, 2) + Math.pow((z + 1) / 8.6, 2);
    const north = Math.pow((x + 6) / 6.2, 2) + Math.pow((z + 6) / 3.8, 2);
    const edge = Math.min(west, north);
    if (edge > .97 + Math.sin(x * 2.1 + z) * .09) continue;
    // Existing mainland already occupies this area.
    if (x >= -10 && z >= -5 && z <= 5) continue;
    if (x <= -8 && x >= -10 && z >= -6 && z <= 6) continue;
    const height = edge > .72 ? -.48 : -.12;
    box(x, (height - 1.35) / 2, z, 1, height + 1.35, 1, '#a7a38c');
    box(x, height + .035, z, 1, .07, 1, edge > .72 ? '#c3bb96' : '#d8c99d');
    if (edge < .48) box(x, height + .12, z, .96, .1, .96, '#98a372');
    shoreCells.push({ x, z, height });
  }
  const palm = (x: number, z: number, base: number, height: number) => {
    for (let i = 0; i < 9; i++) {
      const lean = i * i * .007;
      box(x + lean, base + (i + .5) * height / 9, z, .27, height / 9, .27, i % 2 ? '#91734d' : '#a58b5e');
    }
    const crownX = x + .5;
    for (let arm = 0; arm < 7; arm++) {
      const angle = arm * Math.PI * 2 / 7;
      for (let segment = 0; segment < 5; segment++) {
        const reach = .22 + segment * .32;
        box(crownX + Math.cos(angle) * reach, base + height + .24 - segment * segment * .035, z + Math.sin(angle) * reach,
          .44, .13, .44, segment % 2 ? '#638655' : '#77945b');
      }
    }
    for (const dx of [-.16, .17]) box(crownX + dx, base + height - .17, z + .1, .22, .24, .22, '#836748');
  };
  palm(-12, -3, .05, 3.6);
  palm(-11, -7, .05, 3.1);
  palm(-4, -8, .05, 3.5);
  palm(-13, 3, -.25, 2.6);
  for (const cell of shoreCells) {
    const { x, z, height } = cell;
    if (rand() > .75) {
      box(x + .12, height + .17, z, .48, .26, .4, '#85916c');
      box(x, height + .32, z + .12, .34, .16, .32, '#9fa775');
    } else if (rand() > .8) {
      for (let i = 0; i < 3; i++) box(x - .2 + i * .19, height + .21, z + (i % 2) * .15, .065, .37, .065, '#859466');
    }
  }
  // Irregular rock shelves sit in shallow water and soften the island silhouette.
  for (const [cx, cz] of [[-14, -5], [-12, 7], [-5, -10], [11, -7], [10, -3]]) {
    for (let i = 0; i < 5; i++) {
      const x = cx + (rand() - .5) * 1.8, z = cz + (rand() - .5) * 1.6;
      const h = .35 + rand() * .65;
      box(x, -.8 + h / 2, z, .55 + rand() * .5, h, .55 + rand() * .4, ['#828f88', '#98a19a', '#aab0a1'][i % 3]);
    }
  }
  // Driftwood and small shell clusters on the western beach.
  box(-12.6, -.04, .5, 1.6, .17, .22, '#a18c6d');
  box(-13.15, .06, .62, .11, .25, .4, '#938062');
  for (let i = 0; i < 12; i++) {
    const cell = shoreCells[Math.floor(rand() * shoreCells.length)];
    box(cell.x + .2, cell.height + .1, cell.z - .2, .13, .07, .1, i % 2 ? '#e3d9c0' : '#c5a999');
  }
  const mesh = new THREE.InstancedMesh(geometry, material, blocks.length);
  const transform = new THREE.Object3D();
  blocks.forEach((block, i) => {
    transform.position.fromArray(block.position);
    transform.scale.fromArray(block.size);
    transform.updateMatrix();
    mesh.setMatrixAt(i, transform.matrix);
    mesh.setColorAt(i, new THREE.Color(block.color));
  });
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  scene.add(mesh);
  const animatedMaterials: THREE.Material[] = [];
  const partMaterials = new Map<string, THREE.MeshStandardMaterial>();
  const part = (
    parent: THREE.Group,
    x: number,
    y: number,
    z: number,
    w: number,
    h: number,
    d: number,
    color: string,
  ) => {
    let mat = partMaterials.get(color);
    if (!mat) {
      mat = new THREE.MeshStandardMaterial({ color, roughness: 0.85 });
      partMaterials.set(color, mat);
      animatedMaterials.push(mat);
    }
    const item = new THREE.Mesh(geometry, mat);
    item.position.set(x, y, z);
    item.scale.set(w, h, d);
    item.castShadow = true;
    parent.add(item);
    return item;
  };
  const boat = new THREE.Group();
  boatBlocks.forEach((b) =>
    part(
      boat,
      ...(b.position as [number, number, number]),
      ...(b.size as [number, number, number]),
      b.color,
    ),
  );
  scene.add(boat);
  const sailboat = new THREE.Group();
  sailboat.name = 'large-sailing-ship';
  // Tapered hull sections, a planked deck and a raised stern cabin.
  for(let i=0;i<13;i++) {
    const x=-2.7+i*.45;
    const beam=1.85-Math.pow(Math.abs(x)/3,3)*1.3;
    part(sailboat,x,.08,0,.45,.58,beam,'#76543d');
    part(sailboat,x,.42,0,.44,.12,beam-.12,'#c49b67');
    for(const side of [-1,1]) {
      part(sailboat,x,.55,side*beam/2,.45,.36,.12,'#80513c');
      part(sailboat,x,.76,side*beam/2,.45,.08,.16,'#d3b37b');
    }
  }
  part(sailboat,-1.95,.92,0,1.05,.9,1.3,'#b19168');
  part(sailboat,-1.95,1.42,0,1.23,.12,1.46,'#476e6c');
  for(const side of [-1,1])for(const x of [-2.23,-1.72]) {
    part(sailboat,x,1.01,side*.665,.27,.3,.035,'#e8d0a0');
    part(sailboat,x,1.01,side*.69,.03,.3,.025,dark);
  }
  const riggingPoints:THREE.Vector3[]=[];
  const sailPanels:{mesh:THREE.Mesh;z:number;phase:number}[]=[];
  for(const [x,height] of [[-.85,4.65],[1.25,3.9]]) {
    part(sailboat,x,height/2+.45,0,.11,height,.11,dark);
    for(const [y,width] of [[height*.57,1.65],[height*.83,1.3]]) {
      part(sailboat,x,y+.65,0,.1,.1,width+.3,wood);
      for(let row=0;row<5;row++)for(let col=0;col<7;col++) {
        const z=(col-3)*width/7;
        const billow=Math.sin((col+1)/8*Math.PI)*.17;
        const panel=part(sailboat,x+billow,y+.49-row*.19,z,.045,.19,width/7-.008,row===4?'#749e98':'#f1dfb6');
        sailPanels.push({mesh:panel,z:billow,phase:row*.3+col*.4});
      }
    }
    for(const side of [-1,1]) {
      riggingPoints.push(new THREE.Vector3(x,height+.35,0),new THREE.Vector3(x-.5,.74,side*.82));
    }
    part(sailboat,x+.25,height+.36,0,.5,.22,.05,'#b86851');
  }
  const bowsprit=part(sailboat,3.02,.91,0,1.35,.08,.08,wood);bowsprit.rotation.z=.18;
  riggingPoints.push(new THREE.Vector3(1.25,4.32,0),new THREE.Vector3(3.65,1.04,0));
  const riggingGeometry=new THREE.BufferGeometry().setFromPoints(riggingPoints);
  const riggingMaterial=new THREE.LineBasicMaterial({color:'#736751'});
  sailboat.add(new THREE.LineSegments(riggingGeometry,riggingMaterial));
  // The rigid ship is instanced; cloth panels retain their individual wind motion.
  const clothSet=new Set(sailPanels.map(panel=>panel.mesh));
  const rigidParts=sailboat.children.filter((item):item is THREE.Mesh<THREE.BoxGeometry,THREE.MeshStandardMaterial>=>item instanceof THREE.Mesh&&!clothSet.has(item));
  const shipHull=new THREE.InstancedMesh(geometry,material,rigidParts.length);
  rigidParts.forEach((item,i)=>{item.updateMatrix();shipHull.setMatrixAt(i,item.matrix);shipHull.setColorAt(i,item.material.color);sailboat.remove(item);});
  shipHull.castShadow=true;sailboat.add(shipHull);
  const shipCloth=new THREE.InstancedMesh(geometry,material,sailPanels.length);
  shipCloth.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
  sailPanels.forEach((panel,i)=>{panel.mesh.updateMatrix();shipCloth.setMatrixAt(i,panel.mesh.matrix);shipCloth.setColorAt(i,(panel.mesh.material as THREE.MeshStandardMaterial).color);sailboat.remove(panel.mesh);});
  shipCloth.castShadow=true;sailboat.add(shipCloth);
  scene.add(sailboat);
  // Seated angler: boots over the edge, straw hat, hands and a moving rod.
  const fisher = new THREE.Group();
  fisher.name = 'fisher';
  fisher.position.set(6.15, 0.66, 2.68);
  scene.add(fisher);
  part(fisher, 0, 0.46, 0, 0.42, 0.62, 0.48, "#456b79");
  part(fisher, 0, 0.99, 0, 0.36, 0.37, 0.36, "#d9ab83");
  part(fisher, 0, 1.19, 0, 0.66, 0.09, 0.62, "#d5b778");
  part(fisher, 0, 1.3, 0, 0.4, 0.18, 0.38, "#c9a267");
  const legs: THREE.Group[] = [];
  for (const z of [-0.16, 0.16]) {
    const leg = new THREE.Group(); leg.position.set(0,.18,z); fisher.add(leg); legs.push(leg);
    part(leg,0,-.27,0,.19,.54,.19,'#596358');
    part(leg,.07,-.57,0,.32,.15,.23,'#453c35');
  }
  const arm = new THREE.Group();
  arm.position.set(0.07, 0.68, 0);
  fisher.add(arm);
  for (const z of [-0.27, 0.27]) {
    part(arm, 0.2, -0.05, z, 0.48, 0.18, 0.18, "#456b79");
    part(arm, 0.44, -0.05, z, 0.18, 0.16, 0.16, "#d9ab83");
  }
  const rod = part(arm, 1.04, 0.5, 0, 0.045, 1.9, 0.045, "#5c4731");
  rod.rotation.z = -0.8;
  const lineGeometry = new THREE.BufferGeometry().setFromPoints([
    new THREE.Vector3(),
    new THREE.Vector3(),
    new THREE.Vector3(),
  ]);
  const lineMaterial = new THREE.LineBasicMaterial({
    color: "#e7d8b3",
    transparent: true,
    opacity: 0.8,
  });
  const fishingLine = new THREE.Line(lineGeometry, lineMaterial);
  scene.add(fishingLine);
  const floatGroup = new THREE.Group();
  scene.add(floatGroup);
  part(floatGroup, 0, 0, 0, 0.09, 0.2, 0.09, "#d66e51");
  part(floatGroup, 0, 0.12, 0, 0.09, 0.09, 0.09, "#fff0bf");
  const catchFish = new THREE.Group(); catchFish.name='fishing-catch'; scene.add(catchFish);
  part(catchFish,0,0,0,.5,.2,.14,'#c5d8ca');
  part(catchFish,-.3,0,0,.16,.31,.08,'#789f98');
  part(catchFish,.19,.045,.08,.035,.035,.025,dark);
  const basket = new THREE.Group(); scene.add(basket);
  basket.position.set(.6,.86,.7);
  part(basket,0,.12,0,.64,.2,.4,'#a78051');
  for(const z of [-.22,.22])part(basket,0,.25,z,.68,.3,.065,wood);
  for(const x of [-.32,.32])part(basket,x,.25,0,.065,.3,.4,wood);
  const door = new THREE.Group(); door.position.set(.2,.85,1.73); scene.add(door);
  part(door,.4,.93,0,.76,1.86,.07,'#a47d50');
  part(door,.4,1.35,.055,.5,.6,.035,'#e9cf91');
  part(door,.66,.77,.08,.07,.07,.04,'#e9c568');
  const smooth = (value:number) => {const t=THREE.MathUtils.clamp(value,0,1);return t*t*(3-2*t);};
  const dock = new THREE.Vector3(6.15,.66,2.98);
  const porch = new THREE.Vector3(.6,.66,2.98);
  const home = new THREE.Vector3(.6,.86,1.12);
  const hand = new THREE.Vector3();
  // Real surface displacement, not just sliding marks on a flat plane.
  // Cover the full orthographic frustum at every orbit angle, including corners.
  const oceanGeometry = new THREE.PlaneGeometry(240, 240, 160, 160);
  oceanGeometry.rotateX(-Math.PI / 2);
  const oceanMaterial = new THREE.MeshPhysicalMaterial({
    color: "#489ead",
    roughness: 0.72,
    metalness: 0,
    specularIntensity: 0.2,
    transparent: true,
    opacity: 0.38,
    depthWrite: false,
    flatShading: false,
  });
  const ocean = new THREE.Mesh(oceanGeometry, oceanMaterial);
  ocean.receiveShadow = true;
  scene.add(ocean);
  // Opaque seabed preserves full frame coverage below the translucent surface.
  const seabedMaterial = new THREE.MeshStandardMaterial({
    color: "#438b92",
    roughness: 1,
  });
  const seabedGeometry = new THREE.PlaneGeometry(240, 240);
  seabedGeometry.rotateX(-Math.PI / 2);
  const seabed = new THREE.Mesh(seabedGeometry, seabedMaterial);
  seabed.position.y = -4.2;
  scene.add(seabed);
  ocean.renderOrder = 2;
  ocean.name = "ocean-surface";
  const rippleMaterial = new THREE.MeshBasicMaterial({
    color: "#c7e8dc",
    transparent: true,
    opacity: 0.2,
    depthWrite: false,
  });
  const rippleCount = 650;
  const ripples = new THREE.InstancedMesh(
    geometry,
    rippleMaterial,
    rippleCount,
  );
  const rippleOrigins: THREE.Vector3[] = [];
  const rippleTransform = new THREE.Object3D();
  for (let i = 0; i < rippleCount; i++) {
    rippleOrigins.push(
      new THREE.Vector3(-45 + rand() * 90, 0, -45 + rand() * 90),
    );
  }
  ripples.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
  ripples.frustumCulled = false;
  scene.add(ripples);
  const smoke = new THREE.Group();
  for (let i = 0; i < 9; i++) {
    const mat = new THREE.MeshBasicMaterial({
      color: "#e6d8c7",
      transparent: true,
      opacity: 0.3,
      depthWrite: false,
    });
    animatedMaterials.push(mat);
    smoke.add(new THREE.Mesh(geometry, mat));
  }
  scene.add(smoke);
  const wave = (x: number, z: number, t: number) =>
    -0.84 +
    Math.sin(x * 1.6 + z * 0.7 - t * 1.7) * 0.085 +
    Math.sin(z * 2.2 - t * 1.1) * 0.045;
  const tip = new THREE.Vector3();
  return {
    update: (time: number) => {
      const positions = oceanGeometry.attributes.position;
      for (let i = 0; i < positions.count; i++)
        positions.setY(i, wave(positions.getX(i), positions.getZ(i), time));
      positions.needsUpdate = true;
      const normals = oceanGeometry.attributes.normal;
      for (let i = 0; i < positions.count; i++) {
        const x = positions.getX(i),
          z = positions.getZ(i);
        const dx = 0.136 * Math.cos(x * 1.6 + z * 0.7 - time * 1.7);
        const dz =
          0.0595 * Math.cos(x * 1.6 + z * 0.7 - time * 1.7) +
          0.099 * Math.cos(z * 2.2 - time * 1.1);
        const length = Math.hypot(dx, 1, dz);
        normals.setXYZ(i, -dx / length, 1 / length, -dz / length);
      }
      normals.needsUpdate = true;
      rippleOrigins.forEach((p, i) => {
        const x = p.x + Math.sin(time * 0.7 + i) * 0.12;
        rippleTransform.position.set(x, wave(x, p.z, time) + 0.04, p.z);
        rippleTransform.scale.set(
          0.2 + 0.4 * (0.5 + 0.5 * Math.sin(time * 1.5 + i)),
          0.008,
          0.025,
        );
        rippleTransform.updateMatrix();
        ripples.setMatrixAt(i, rippleTransform.matrix);
      });
      ripples.instanceMatrix.needsUpdate = true;
      boat.position.y = Math.sin(time * 1.3) * 0.055;
      sailboat.position.set(
        4.8 + Math.sin(time * 0.1) * 1.1,
        wave(4.8, 9, time),
        9 + Math.cos(time * 0.1) * 0.3,
      );
      sailboat.rotation.set(
        Math.sin(time * 0.9) * 0.03,
        -0.3 + Math.cos(time * 0.13) * 0.12,
        Math.sin(time * 0.8) * 0.035,
      );
      sailPanels.forEach((panel,i)=>{panel.mesh.rotation.z=Math.sin(time*1.4+panel.phase)*.035;panel.mesh.updateMatrix();shipCloth.setMatrixAt(i,panel.mesh.matrix);});
      shipCloth.instanceMatrix.needsUpdate=true;
      boat.rotation.x = Math.sin(time * 0.9) * 0.014;
      smoke.children.forEach((puff, i) => {
        const phase = (time * 0.17 + i / 9) % 1;
        puff.position.set(
          -3 + phase * 1.3 + Math.sin(phase * 5 + time * 0.3) * phase * 0.25,
          8.05 + phase * 2.4,
          -1.6 + phase * 0.25,
        );
        puff.scale.setScalar(0.16 + phase * 0.65);
        puff.rotation.y = phase * 0.6;
        (
          puff as THREE.Mesh<THREE.BoxGeometry, THREE.MeshBasicMaterial>
        ).material.opacity = Math.sin(phase * Math.PI) * 0.36;
      });
      // One absolute timeline makes pauses and repeated cycles deterministic.
      const cycle = time % 32;
      const reeling = cycle >= 7 && cycle < 10;
      const outbound = cycle >= 11 && cycle < 17;
      const unloading = cycle >= 17 && cycle < 21;
      const returning = cycle >= 21 && cycle < 27;
      const standing = smooth((cycle-10)/1) * (1-smooth((cycle-27)/1));
      fisher.userData.phase = cycle < 7 ? 'fishing' : cycle < 10 ? 'reeling' : cycle < 11 ? 'standing' : outbound ? 'going-home' : unloading ? 'depositing' : returning ? 'returning' : 'casting';
      fisher.position.copy(dock);
      fisher.rotation.set(0,0,0);
      if (outbound || returning) {
        const travel = outbound ? (cycle-11)/6 : 1-(cycle-21)/6;
        if(travel < .82) fisher.position.lerpVectors(dock,porch,travel/.82);
        else fisher.position.lerpVectors(porch,home,(travel-.82)/.18);
        const facing = travel < .82 ? Math.PI : Math.PI/2;
        fisher.rotation.y = facing + (returning ? Math.PI : 0);
      } else if(unloading) {
        fisher.position.copy(home); fisher.rotation.y=Math.PI/2;
      }
      fisher.position.y += standing*.47;
      const walking = outbound || returning;
      if(walking)fisher.position.y+=Math.abs(Math.sin(time*8))*.035;
      legs.forEach((leg,i)=>{leg.rotation.z=(1-standing)*Math.PI/2 + (walking?Math.sin(time*8+i*Math.PI)*.45:0);});
      fisher.rotation.z = unloading ? -.15*Math.sin((cycle-17)/4*Math.PI) : 0;
      arm.rotation.z = cycle < 7 ? Math.sin(time*1.1)*.045 : reeling ? smooth((cycle-7)/3)*.95 : cycle < 27 ? .95 : .95*(1-smooth((cycle-27)/2));
      door.rotation.y = -1.3*smooth((cycle-15.5)/.5)*(1-smooth((cycle-22)/.5));
      rod.visible = !unloading;
      fishingLine.visible = cycle < 10 || cycle >= 28;
      floatGroup.visible = fishingLine.visible;
      scene.updateMatrixWorld(true);
      tip.set(0, 0.95, 0);
      rod.localToWorld(tip);
      floatGroup.position.set(7.4, wave(7.4, 3.5, time) + 0.09, 3.5);
      const lift = smooth((cycle-7)/3);
      if(reeling)floatGroup.position.lerp(new THREE.Vector3(tip.x,tip.y-.6,tip.z),lift);
      if(cycle>=28)floatGroup.position.lerp(new THREE.Vector3(tip.x,tip.y-.6,tip.z),1-smooth((cycle-28)/2));
      catchFish.visible=cycle>=7 && cycle<24;
      catchFish.rotation.set(0,0,0);
      if(reeling) {
        catchFish.position.copy(floatGroup.position);catchFish.position.y-=.23;
        catchFish.rotation.z=Math.sin(time*12)*.3;
      } else if(cycle>=10 && cycle<19) {
        hand.set(.5,-.1,.25);arm.localToWorld(hand);catchFish.position.copy(hand);
        if(cycle>=17)catchFish.position.lerp(new THREE.Vector3(.6,1.13,.7),smooth((cycle-17)/2));
      } else if(cycle>=19) {
        catchFish.position.set(.6,1.13,.7);
      }
      const points = lineGeometry.attributes.position;
      points.setXYZ(0, tip.x, tip.y, tip.z);
      points.setXYZ(1, (tip.x + floatGroup.position.x) / 2, (tip.y+floatGroup.position.y)/2-.12, (tip.z+floatGroup.position.z)/2);
      points.setXYZ(2, floatGroup.position.x, floatGroup.position.y, floatGroup.position.z);
      points.needsUpdate = true;
      lineGeometry.computeBoundingSphere();
    },
    dispose: () => {
      shipHull.dispose();
      shipCloth.dispose();
      riggingGeometry.dispose();
      riggingMaterial.dispose();
      mesh.dispose();
      ripples.dispose();
      geometry.dispose();
      material.dispose();
      lanternMaterial.dispose();
      oceanGeometry.dispose();
      oceanMaterial.dispose();
      seabedGeometry.dispose();
      seabedMaterial.dispose();
      rippleMaterial.dispose();
      lineGeometry.dispose();
      lineMaterial.dispose();
      animatedMaterials.forEach((m) => m.dispose());
    },
  };
}
