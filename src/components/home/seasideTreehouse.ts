const WIDTH = 640;
const HEIGHT = 400;
const lamps = [
  [109, 109],
  [230, 94],
  [326, 77],
  [402, 126],
  [463, 124],
  [86, 190],
  [149, 166],
  [239, 165],
  [360, 237],
  [472, 244],
  [596, 269],
];

/** Draw once at native resolution; only the small ambient details animate. */
function paintHouse(ctx: CanvasRenderingContext2D, sprites: HTMLImageElement) {
  let seed = 1837;
  const random = () =>
    (seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0) / 4294967296;
  const rect = (x: number, y: number, w: number, h: number, color: string) => {
    ctx.fillStyle = color;
    ctx.fillRect(Math.round(x), Math.round(y), Math.round(w), Math.round(h));
  };
  const polygon = (points: number[][], color: string) => {
    ctx.beginPath();
    points.forEach(([x, y], i) => (i ? ctx.lineTo(x, y) : ctx.moveTo(x, y)));
    ctx.closePath();
    ctx.fillStyle = color;
    ctx.fill();
  };
  const line = (
    x: number,
    y: number,
    x2: number,
    y2: number,
    color: string,
    width = 1,
  ) => {
    ctx.strokeStyle = color;
    ctx.lineWidth = width;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x2, y2);
    ctx.stroke();
  };
  const gradient = ctx.createLinearGradient(0, 0, 0, 290);
  gradient.addColorStop(0, "#405bb5");
  gradient.addColorStop(0.62, "#a887bd");
  gradient.addColorStop(1, "#d8a7bf");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, WIDTH, HEIGHT);
  const cloud = (x: number, y: number, size: number, color: string) => {
    polygon(
      [
        [x, y + 9 * size],
        [x + 9 * size, y + 6 * size],
        [x + 13 * size, y + 2 * size],
        [x + 20 * size, y + 4 * size],
        [x + 25 * size, y],
        [x + 33 * size, y + 3 * size],
        [x + 37 * size, y + 7 * size],
        [x + 49 * size, y + 9 * size],
        [x + 42 * size, y + 12 * size],
        [x + 12 * size, y + 12 * size],
      ],
      color,
    );
  };
  for (let i = 0; i < 34; i++)
    cloud(
      random() * 660 - 25,
      random() * 238,
      0.35 + random() * 1.2,
      ["#b091c1", "#c59bc7", "#d3a2c9", "#9b84bc"][i % 4],
    );
  const sun = ctx.createRadialGradient(558, 65, 2, 558, 65, 27);
  sun.addColorStop(0, "#ffe0cc");
  sun.addColorStop(0.4, "#f6b8c6");
  sun.addColorStop(1, "#efb2c000");
  ctx.fillStyle = sun;
  ctx.fillRect(530, 37, 56, 56);
  cloud(568, 42, 1.25, "#c09bc9");
  for (let layer = 0; layer < 3; layer++) {
    const points = [[0, 280]];
    for (let x = 0; x <= 660; x += 15)
      points.push([x, 206 + layer * 24 - random() * 26]);
    points.push([640, 292]);
    polygon(points, ["#9385b8", "#938dbb", "#929ac2"][layer]);
  }
  const water = ctx.createLinearGradient(0, 278, 0, 400);
  water.addColorStop(0, "#398ec3");
  water.addColorStop(0.3, "#146cb1");
  water.addColorStop(1, "#103855");
  ctx.fillStyle = water;
  ctx.fillRect(0, 278, 640, 122);

  const wood = (
    x: number,
    y: number,
    w: number,
    h: number,
    vertical = false,
  ) => {
    rect(x, y, w, h, "#352b23");
    rect(x + 1, y + 1, w - 2, h - 2, "#65432c");
    rect(x + 2, y + 1, w - 4, 1, "#a17b49");
    for (let i = 0; i < (w * h) / 20; i++) {
      rect(
        x + 2 + random() * (w - 4),
        y + 2 + random() * (h - 4),
        vertical ? 1 : 2 + random() * 8,
        vertical ? 2 + random() * 8 : 1,
        random() > 0.5 ? "#805639" : "#493426",
      );
    }
  };
  const foliage = (
    x: number,
    y: number,
    rx: number,
    ry: number,
    bright = false,
  ) => {
    const colors = bright
      ? ["#293b0c", "#3c5110", "#536c15", "#718523", "#8c9d32"]
      : ["#172f1b", "#274919", "#385d1d", "#4f7223", "#738633"];
    for (let row = -ry; row <= ry; row += 2) {
      const span =
        Math.floor((rx * Math.sqrt(1 - (row * row) / (ry * ry))) / 2) * 2;
      rect(x - span, y + row, span * 2, 2, colors[0]);
    }
    for (let i = 0; i < rx * ry; i++) {
      const dx = (random() * 2 - 1) * rx,
        dy = (random() * 2 - 1) * ry;
      if ((dx * dx) / (rx * rx) + (dy * dy) / (ry * ry) > 1) continue;
      const n = Math.floor(random() * 3) + (dy < -ry * 0.2 ? 2 : 0);
      rect(
        x + dx,
        y + dy,
        1 + random() * 3,
        1 + random() * 3,
        colors[Math.min(n, 4)],
      );
    }
  };
  const vine = (x: number, y: number, length: number) => {
    for (let j = 0; j < length; j += 3) {
      const px = x + Math.round(Math.sin(j * 0.2) * 2);
      rect(px, y + j, 1, 4, "#47532a");
      rect(px + (j % 2 ? -3 : 1), y + j, 3, 2, "#60763a");
    }
  };
  // Greenery sits behind the roof and beams, giving the house a continuous canopy.
  for (const [x, y, rx, ry] of [
    [41, 150, 39, 18],
    [90, 137, 55, 21],
    [252, 34, 47, 18],
    [304, 25, 36, 18],
    [344, 44, 24, 24],
    [358, 65, 13, 20],
    [398, 77, 52, 18],
    [460, 85, 38, 17],
    [486, 114, 17, 19],
    [469, 219, 33, 24],
    [401, 277, 70, 17],
    [319, 291, 42, 18],
  ])
    foliage(x, y, rx, ry, true);

  polygon(
    [
      [0, 216],
      [73, 216],
      [107, 230],
      [162, 253],
      [207, 275],
      [253, 293],
      [282, 341],
      [290, 400],
      [0, 400],
    ],
    "#443b2c",
  );
  ctx.save();
  ctx.beginPath();
  ctx.moveTo(0, 216);
  [
    [73, 216],
    [107, 230],
    [162, 253],
    [207, 275],
    [253, 293],
    [282, 341],
    [290, 400],
    [0, 400],
  ].forEach(([x, y]) => ctx.lineTo(x, y));
  ctx.closePath();
  ctx.clip();
  for (let y = 216; y < 400; y += 3)
    for (let x = 0; x < 292; x += 5)
      rect(
        x,
        y,
        4,
        2,
        ["#645239", "#705b3a", "#806844", "#4a432f"][Math.floor(random() * 4)],
      );
  const earthShade = ctx.createLinearGradient(0, 220, 0, 370);
  earthShade.addColorStop(0, "#111b1100");
  earthShade.addColorStop(1, "#08110e");
  ctx.fillStyle = earthShade;
  ctx.fillRect(0, 216, 292, 184);
  ctx.restore();
  for (const [x, y] of [
    [27, 222],
    [92, 228],
    [149, 246],
    [213, 273],
    [256, 296],
  ])
    foliage(x, y, 20, 10);
  for (let i = 0; i < 15; i++) {
    const x = 290 + i * 10,
      base = 386 + random() * 20,
      height = 20 + random() * 55;
    for (let j = 0; j < height; j += 4) {
      const px = x + Math.sin(j / 9) * 4;
      rect(px, base - j, 2, 5, "#155c49");
      rect(px + (j % 8 === 0 ? 2 : -4), base - j, 4, 3, "#237e55");
    }
  }
  const room = (
    x: number,
    y: number,
    w: number,
    h: number,
    plaster = "#c5bc88",
  ) => {
    rect(x, y, w, h, "#302d22");
    rect(x + 4, y + 4, w - 8, h - 8, plaster);
    for (let i = 0; i < (w * h) / 50; i++)
      rect(
        x + 5 + random() * (w - 10),
        y + 5 + random() * (h - 10),
        1,
        2,
        "#a59d7048",
      );
    rect(x + 4, y + h - 20, w - 8, 14, "#737349");
    for (let xx = x + 5; xx < x + w - 5; xx += 12) {
      rect(xx, y + h - 19, 1, 13, "#494e35");
      rect(xx + 2, y + h - 18, 8, 1, "#999363");
    }
    wood(x, y, 5, h, true);
    wood(x + w - 5, y, 5, h, true);
    wood(x, y, w, 5);
  };
  room(124, 76, 189, 74);
  room(75, 151, 123, 62);
  room(198, 151, 114, 62);
  room(312, 108, 139, 57);
  room(312, 165, 139, 48);
  room(280, 218, 154, 61, "#b4aa7e");
  const window = (x: number, y: number, w: number, h: number) => {
    wood(x - 3, y - 3, w + 6, h + 6);
    rect(x, y, w, h, "#767daa");
    polygon(
      [
        [x, y + h],
        [x + w, y + h],
        [x + w, y],
      ],
      "#aa98b9",
    );
    rect(x + Math.floor(w / 2), y, 2, h, "#d4c79b");
    rect(x - 2, y - 1, 4, h + 2, "#46513b");
    rect(x + w - 2, y - 1, 4, h + 2, "#46513b");
    wood(x - 4, y + h, w + 8, 3);
  };
  window(143, 92, 18, 32);
  window(210, 89, 17, 33);
  window(292, 70, 16, 50);
  window(93, 174, 23, 25);
  window(427, 120, 15, 30);
  window(321, 175, 16, 26);
  window(406, 179, 22, 23);
  const sprite = (
    column: number,
    row: number,
    x: number,
    y: number,
    w = 16,
    h = 16,
  ) => ctx.drawImage(sprites, column * 16, row * 16, 16, 16, x, y, w, h);
  const shelf = (x: number, y: number, w: number, h: number) => {
    wood(x, y, w, h);
    rect(x + 3, y + 3, w - 6, h - 6, "#313528");
    for (let yy = y + 4; yy < y + h - 4; yy += 12) {
      for (let xx = x + 4; xx < x + w - 4; xx += 4) {
        const bh = 5 + random() * 5;
        rect(
          xx,
          yy + 9 - bh,
          3,
          bh,
          ["#838c47", "#a65b46", "#609189", "#b6a56b", "#7783a0"][
            Math.floor(random() * 5)
          ],
        );
        rect(xx, yy + 7, 2, 1, "#d0b17c");
      }
      wood(x + 2, yy + 10, w - 4, 2);
    }
  };
  const table = (x: number, y: number, w: number) => {
    wood(x, y, w, 4);
    wood(x + 3, y + 4, 3, 11, true);
    wood(x + w - 6, y + 4, 3, 11, true);
  };
  const pot = (x: number, y: number, flower = false) => {
    rect(x, y, 8, 2, "#c39466");
    rect(x + 1, y + 2, 6, 6, "#865b3c");
    rect(x + 2, y + 2, 1, 4, "#b68550");
    rect(x + 4, y - 7, 1, 7, "#4f713a");
    rect(x + 1, y - 4, 3, 2, "#70933f");
    rect(x + 5, y - 6, 3, 2, "#456c38");
    if (flower) {
      rect(x + 1, y - 10, 6, 4, "#cc6b92");
      rect(x + 3, y - 11, 2, 6, "#f398b6");
      rect(x + 3, y - 9, 2, 2, "#f7c889");
    }
  };
  const chair = (x: number, y: number) => {
    wood(x, y, 3, 20, true);
    wood(x, y + 12, 13, 3);
    wood(x + 10, y + 15, 3, 5, true);
    rect(x + 3, y + 12, 7, 2, "#7d8c41");
  };
  const picture = (x: number, y: number, w: number, h: number) => {
    wood(x, y, w, h);
    rect(x + 2, y + 2, w - 4, h - 4, "#497b73");
    polygon(
      [
        [x + 3, y + h - 3],
        [x + w / 2, y + 4],
        [x + w - 3, y + h - 3],
      ],
      "#7c975c",
    );
    rect(x + w - 6, y + 3, 2, 2, "#cdbd7a");
  };
  const barrel = (x: number, y: number) => {
    rect(x + 2, y, 11, 17, "#3c3126");
    wood(x + 1, y + 2, 13, 13, true);
    rect(x + 1, y + 4, 13, 2, "#87816a");
    rect(x + 1, y + 11, 13, 2, "#87816a");
  };
  const crate = (x: number, y: number) => {
    wood(x, y, 17, 16);
    line(x + 2, y + 2, x + 14, y + 13, "#b07d53", 2);
    line(x + 14, y + 2, x + 2, y + 13, "#473426", 2);
    rect(x + 1, y + 1, 15, 1, "#b68b5f");
  };

  picture(158, 106, 20, 14);
  picture(188, 95, 12, 12);
  shelf(234, 117, 18, 25);
  table(184, 134, 32);
  pot(196, 126);
  chair(146, 124);
  chair(167, 124);
  sprite(14, 6, 267, 132);
  sprite(15, 0, 232, 131);
  sprite(12, 1, 280, 127);
  // Hanging herbs and a reading lamp in the upper studio.
  for (let x = 204; x < 263; x += 8) vine(x, 79, 8 + random() * 14);
  rect(222, 126, 2, 8, "#514c2d");
  polygon(
    [
      [218, 126],
      [227, 126],
      [225, 119],
      [220, 119],
    ],
    "#f9d57d",
  );
  rect(221, 119, 3, 6, "#fff3b5");
  table(119, 192, 31);
  pot(127, 184, true);
  chair(114, 190);
  shelf(157, 176, 20, 34);
  picture(211, 164, 18, 14);
  table(204, 192, 35);
  pot(218, 184);
  picture(367, 124, 17, 13);
  shelf(407, 116, 13, 24);
  table(368, 145, 30);
  pot(383, 137, true);
  sprite(14, 0, 417, 145);
  table(377, 197, 49);
  pot(405, 189);
  sprite(13, 0, 343, 195);
  picture(390, 172, 13, 12);
  rect(281, 175, 18, 31, "#493a2b");
  rect(284, 176, 12, 25, "#232c28");
  wood(278, 204, 25, 4);
  rect(265, 182, 14, 23, "#514538");
  for (let y = 182; y < 207; y += 5) {
    rect(266, y, 12, 1, "#8c7d5b");
    rect(271 + (y % 2) * 3, y, 1, 4, "#302f28");
  }
  rect(266, 194, 11, 10, "#242623");
  // Central ladder connects all three levels.
  wood(253, 142, 3, 132, true);
  wood(262, 142, 3, 132, true);
  for (let y = 145; y < 274; y += 8) wood(253, y, 12, 3);
  barrel(287, 251);
  barrel(303, 227);
  barrel(337, 224);
  barrel(358, 239);
  crate(287, 258);
  crate(305, 258);
  crate(323, 258);
  table(356, 261, 48);
  sprite(14, 6, 338, 257);
  picture(334, 246, 15, 12);
  shelf(411, 247, 16, 28);
  // A suspended tool rack in the workshop.
  wood(296, 222, 72, 3);
  for (let x = 310; x < 365; x += 13) {
    line(x, 224, x, 235, "#403b2f", 2);
    rect(x - 3, 232, 6, 3, "#7e8170");
  }
  sprite(0, 0, 273, 193);
  sprite(1, 0, 395, 194);
  sprite(2, 0, 284, 132);

  for (const [x, y, w] of [
    [67, 147, 250],
    [61, 211, 408],
    [278, 278, 220],
    [454, 282, 160],
  ])
    wood(x, y, w, 8);
  for (const [x, y, h] of [
    [65, 154, 70],
    [121, 81, 69],
    [307, 63, 156],
    [444, 121, 92],
    [267, 217, 183],
    [438, 286, 114],
    [26, 218, 50],
    [79, 218, 62],
    [137, 219, 92],
    [194, 219, 112],
  ])
    wood(x, y, 8, h, true);
  for (const [x, y, flip] of [
    [75, 158, 1],
    [190, 158, -1],
    [317, 158, 1],
    [439, 172, -1],
    [281, 226, 1],
    [432, 227, -1],
    [453, 290, 1],
  ]) {
    polygon(
      [
        [x, y],
        [x + flip * 22, y],
        [x, y + 23],
      ],
      "#3b3025",
    );
    polygon(
      [
        [x + flip * 3, y + 3],
        [x + flip * 17, y + 3],
        [x + flip * 3, y + 17],
      ],
      "#7a5736",
    );
  }
  const roof = (points: number[][]) => {
    polygon(points, "#172a2b");
    ctx.save();
    ctx.beginPath();
    points.forEach(([x, y], i) => (i ? ctx.lineTo(x, y) : ctx.moveTo(x, y)));
    ctx.closePath();
    ctx.clip();
    const xs = points.map((p) => p[0]),
      ys = points.map((p) => p[1]);
    const minX = Math.min(...xs),
      maxX = Math.max(...xs),
      minY = Math.min(...ys),
      maxY = Math.max(...ys);
    for (let y = minY; y < maxY; y += 5)
      for (let x = minX - 8; x < maxX; x += 11) {
        const xx = x + (y % 10 ? 5 : 0);
        rect(
          xx,
          y,
          10,
          5,
          ["#293d3f", "#304648", "#25383a", "#35484a"][
            Math.floor(random() * 4)
          ],
        );
        rect(xx + 1, y, 8, 1, "#586766");
        rect(xx + 1, y + 1, 1, 2, "#445957");
        rect(xx, y + 4, 11, 1, "#182a2b");
      }
    ctx.restore();
    for (let i = 0; i < points.length - 1; i++)
      line(
        ...(points[i] as [number, number]),
        ...(points[i + 1] as [number, number]),
        "#1b2826",
        2,
      );
  };
  wood(100, 87, 105, 10);
  wood(197, 66, 135, 10);
  roof([
    [87, 79],
    [105, 79],
    [105, 70],
    [145, 70],
    [145, 60],
    [185, 60],
    [185, 50],
    [226, 50],
    [226, 36],
    [265, 36],
    [265, 29],
    [330, 29],
    [330, 63],
    [277, 63],
    [277, 70],
    [232, 70],
    [232, 80],
    [189, 80],
    [189, 89],
    [107, 89],
    [107, 83],
    [87, 83],
  ]);
  wood(314, 118, 135, 8);
  roof([
    [308, 105],
    [321, 105],
    [321, 95],
    [351, 95],
    [351, 86],
    [378, 86],
    [378, 77],
    [444, 77],
    [444, 85],
    [467, 85],
    [467, 94],
    [486, 94],
    [486, 100],
    [450, 100],
    [450, 110],
    [369, 110],
    [369, 120],
    [308, 120],
  ]);
  wood(263, 17, 15, 12);
  for (let y = 17; y < 29; y += 4)
    for (let x = 263; x < 278; x += 7) {
      rect(x, y, 6, 3, "#8d7476");
      rect(x, y, 5, 1, "#b19994");
    }
  rect(261, 16, 19, 3, "#5b4a4e");
  for (const [x, y, rx, ry] of [
    [196, 47, 16, 4],
    [246, 34, 20, 6],
    [299, 26, 22, 7],
    [343, 37, 13, 12],
    [361, 70, 8, 13],
    [414, 75, 29, 6],
    [477, 93, 14, 7],
    [485, 116, 9, 14],
  ])
    foliage(x, y, rx, ry, true);
  for (const [x, y, len] of [
    [328, 66, 18],
    [348, 73, 12],
    [457, 122, 21],
    [78, 156, 15],
    [458, 223, 23],
    [421, 289, 14],
    [378, 286, 13],
  ])
    vine(x, y, len);
  // Dock rails, stored supplies and small flowers along the bank.
  for (let x = 510; x < 607; x += 16) {
    wood(x, 269, 3, 15, true);
    wood(x, 272, 16, 3);
  }
  crate(520, 266);
  crate(538, 266);
  crate(529, 250);
  crate(555, 267);
  barrel(574, 267);
  pot(562, 259, true);
  sprite(4, 0, 545, 247);
  sprite(1, 1, 588, 267);
  for (let x = 15; x < 68; x += 9) {
    wood(x, 202, 3, 11, true);
    wood(x, 205, 10, 2);
  }
  pot(21, 202);
  pot(58, 202, true);
  for (const [x, y] of [
    [106, 237],
    [149, 251],
    [233, 282],
  ])
    pot(x, y, true);
  for (const [x, y] of [
    [317, 308],
    [368, 326],
  ]) {
    vine(x, y, 400 - y);
    rect(x - 3, y, 7, 3, "#d57496");
    rect(x - 3, y - 5, 2, 6, "#f28bb1");
    rect(x + 2, y - 7, 2, 8, "#ee9cb9");
  }
  // Lanterns are actual fixtures; their glow is composited in the ambient pass.
  for (const [x, y] of lamps) {
    line(x, y - 7, x, y - 2, "#554b37");
    rect(x - 3, y - 2, 7, 2, "#343b2c");
    rect(x - 2, y, 5, 6, "#e7c974");
    rect(x - 1, y, 2, 5, "#fff6bc");
    rect(x - 3, y + 6, 7, 1, "#514b32");
  }
  for (const [x, y] of [
    [146, 166],
    [352, 142],
  ]) {
    line(x, y - 12, x, y + 2, "#69582e");
    line(x - 10, y, x + 10, y, "#766332", 2);
    for (const dx of [-10, -5, 5, 10]) {
      rect(x + dx, y - 4, 2, 5, "#f4d775");
      rect(x + dx, y - 5, 1, 2, "#fff9b6");
    }
  }
}

export class SeasideTreehouse extends HTMLElement {
  private frame = 0;
  private observer?: IntersectionObserver;
  private preferences?: MutationObserver;
  private media = matchMedia("(prefers-reduced-motion: reduce)");
  private visible = false;
  private base?: HTMLCanvasElement;
  private lastFrame = 0;
  private elapsed = 0;
  private generation = 0;

  connectedCallback() {
    const generation = ++this.generation;
    const image = new Image();
    image.onload = () => {
      if (!this.isConnected || generation !== this.generation) return;
      this.base = document.createElement("canvas");
      this.base.width = WIDTH;
      this.base.height = HEIGHT;
      const context = this.base.getContext("2d");
      if (!context) return;
      context.imageSmoothingEnabled = false;
      paintHouse(context, image);
      this.render(0);
      this.dataset.ready = "";
      this.observer = new IntersectionObserver(([entry]) => {
        this.visible = entry.isIntersecting;
        this.sync();
      });
      this.observer.observe(this);
      this.preferences = new MutationObserver(this.sync);
      this.preferences.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ["data-motion"],
      });
      this.media.addEventListener("change", this.sync);
      document.addEventListener("visibilitychange", this.sync);
    };
    image.src = "/assets/pixel-habitat/versatile-tiles.png";
  }

  disconnectedCallback() {
    this.generation++;
    cancelAnimationFrame(this.frame);
    this.frame = 0;
    this.observer?.disconnect();
    this.preferences?.disconnect();
    this.media.removeEventListener("change", this.sync);
    document.removeEventListener("visibilitychange", this.sync);
  }

  private sync = () => {
    cancelAnimationFrame(this.frame);
    this.frame = 0;
    const reduced =
      this.media.matches ||
      document.documentElement.dataset.motion === "reduced";
    if (reduced) this.render(0);
    if (this.visible && !document.hidden && !reduced) {
      this.lastFrame = 0;
      this.frame = requestAnimationFrame(this.tick);
    }
  };

  private tick = (now: number) => {
    if (now - this.lastFrame >= 80) {
      this.elapsed += this.lastFrame ? Math.min(now - this.lastFrame, 120) : 0;
      this.lastFrame = now;
      this.render(this.elapsed / 1000);
    }
    this.frame = requestAnimationFrame(this.tick);
  };

  private render(time: number) {
    const ctx = this.querySelector("canvas")?.getContext("2d");
    if (!ctx || !this.base) return;
    ctx.imageSmoothingEnabled = false;
    ctx.drawImage(this.base, 0, 0);
    for (let i = 0; i < 42; i++) {
      const x = 455 + ((i * 47) % 183),
        y = 293 + ((i * 19) % 94);
      ctx.globalAlpha =
        (0.12 + 0.1 * Math.sin(time * 1.3 + i)) * (1 - (y - 293) / 130);
      ctx.fillStyle = i % 3 ? "#90d7da" : "#f4c0b3";
      ctx.fillRect(
        Math.round(x + Math.sin(time * 0.5 + i) * 3),
        y,
        3 + ((i * 7) % 17),
        1,
      );
    }
    ctx.globalAlpha = 1;
    for (const [x, y] of lamps) {
      const glow = ctx.createRadialGradient(x, y + 3, 1, x, y + 3, 13);
      glow.addColorStop(
        0,
        `rgba(255,218,117,${0.18 + Math.sin(time * 2 + x) * 0.035})`,
      );
      glow.addColorStop(1, "rgba(255,205,99,0)");
      ctx.fillStyle = glow;
      ctx.fillRect(x - 13, y - 10, 26, 26);
    }
    for (let i = 0; i < 4; i++) {
      const phase = (time * 0.14 + i * 0.25) % 1;
      ctx.globalAlpha = (1 - phase) * 0.4;
      ctx.fillStyle = "#e1bfcc";
      ctx.fillRect(
        Math.round(268 + Math.sin(phase * 6) * 4 + phase * 11),
        Math.round(13 - phase * 28),
        3 + Math.floor(phase * 7),
        2 + Math.floor(phase * 4),
      );
    }
    ctx.globalAlpha = 1;
    for (let i = 0; i < 4; i++) {
      const h = 3 + Math.round(3 * (1 + Math.sin(time * 7 + i * 2)));
      ctx.fillStyle = i % 2 ? "#ffc965" : "#e98236";
      ctx.fillRect(267 + i * 2, 203 - h, 2, h);
    }
    for (let i = 0; i < 7; i++) {
      const x = 68 + i * 66 + Math.round(Math.sin(time * 0.7 + i) * 5),
        y = 132 + ((i * 41) % 146) + Math.round(Math.cos(time * 0.6 + i) * 4);
      ctx.globalAlpha = 0.3 + 0.5 * Math.max(0, Math.sin(time * 1.2 + i));
      ctx.fillStyle = "#e9edab";
      ctx.fillRect(x, y, 1, 2);
    }
    ctx.globalAlpha = 1;
  }
}
