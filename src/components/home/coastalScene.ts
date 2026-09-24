import * as THREE from "three";
import { createCoastalResidents } from './coastalResidents';
import { createIslandEcology } from './islandEcology';
import { createStardustDragon } from './stardustDragon';
import { createHarborAndCave } from './harborAndCave';
import { createLifeTree } from './lifeTree';
import { createFishery } from './islandFishery';
import { farmLayout } from './farmLayout';
import { buildIslandTerrain, groundHeight, islandLayout, sampleRoute } from './islandTerrain';

// Procedural coastal architecture with voxel interpretations of Terraria residents.
export function buildHabitat(scene: THREE.Scene) {
  const terrain = buildIslandTerrain(scene);
  const ecology = createIslandEcology(scene);
  const dragon = createStardustDragon(scene);
  const lifeTree = createLifeTree(scene);
  let reducedMotion=false;
  const harborAndCave = createHarborAndCave(scene);
  let offset = islandLayout.house;
  const geometry = new THREE.BoxGeometry(1, 1, 1);
  const material = new THREE.MeshStandardMaterial({ roughness: 0.88 });
  const blocks: { position: number[]; size: number[]; color: string; origin: THREE.Vector3 }[] = [];
  const box = (
    x: number,
    y: number,
    z: number,
    w: number,
    h: number,
    d: number,
    color: string,
  ) => blocks.push({ position: [x+offset.x, y+offset.y, z+offset.z], size: [w, h, d], color, origin:offset });
  let seed = 718;
  const rand = () =>
    (seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0) / 4294967296;
  const wood = "#885b3c",
    dark = "#493a2d",
    cream = "#d8cda2",
    green = "#65894c";
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
  // House veranda and the separate low-level harbor use independent origins.
  for(let x=-4.8;x<2.7;x+=.3)box(x,.66,2.7,.28,.18,1.6,wood);
  offset=islandLayout.dock;
  for(let x=-7.8;x<6.4;x+=.3)box(x,.66,2.7,.28,.18,1.6,wood);
  for(const x of [-4.5,-1,2.4,5.8])for(const z of [2.05,3.35]) {
    box(x,-.8,z,.2,2.9,.2,dark);
    if(z<3)box(x,1.06,z,.16,.9,.16,wood);
  }
  const crate = (x: number, z: number) => {
    box(x, 0.94, z, 0.65, 0.65, 0.65, "#a77a4f");
    for (const dy of [-0.23, 0.23])
      box(x, 0.94 + dy, z + 0.34, 0.69, 0.07, 0.06, "#5d4832");
    box(x, 0.94, z + 0.38, 0.08, 0.65, 0.04, "#5d4832");
  };
  crate(4.3, 2.22);
  crate(5.1, 2.22);
  offset=islandLayout.house;
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
    lamp.position.set(x+offset.x, y+offset.y, z+offset.z);
    scene.add(lamp);
  }
  offset=new THREE.Vector3(0,1.35,0);
  // Garden shed, closed walls and stepped roof.
  box(-9, 1.55, -4.6, 2.1, 1.8, 2, "#a3b8a0");
  box(-9, 0.72, -4.6, 2.3, 0.18, 2.2, wood);
  for (let row = 0; row < 5; row++)
    box(-9, 2.5 + row * 0.19, -4.6, 2.5, 0.2, 2.5 - row * 0.45, "#866b60");
  box(-9, 1.4, -3.54, 0.78, 1.5, 0.1, dark);
  box(-9, 1.4, -3.47, 0.6, 1.35, 0.04, "#b68c5f");
  box(-8.45, 1.8, -3.53, 0.5, 0.55, 0.1, dark);
  box(-8.45, 1.8, -3.46, 0.37, 0.4, 0.04, "#e3ca91");
  // Two staggered rows of beds retain the shared southern farm entrance.
  const beds=[[-9,-1.9],[-9,-.2],[-9,1.5],[-6.5,-5],[-6.5,-3.3],[-6.5,-1.6],[-16,-6.2],[-13.5,-6.2],[-11,-6.2]];
  scene.userData.farmBeds=beds;
  for (const [bed,[cx,z]] of beds.entries()) {
    box(cx, 0.8, z, 1.75, 0.25, 1.05, wood);
    box(cx, 0.95, z, 1.52, 0.06, 0.83, "#594d38");
    for (let i = 0; i < 4; i++)
      for (const dz of [-0.23, 0.23]) {
        const x = cx-.55 + i * .36;
        box(x, 1.15, z + dz, 0.18, 0.35, 0.16, "#729651");
        box(x, 1.36, z + dz, 0.27, 0.13, 0.26, ["#c79859", "#91ae5f", "#c18c83", "#e3b36c", "#86ad62", "#bf829f", "#cc9654", "#aac16c", "#c57666"][bed]);
      }
  }
  const farmPathY=.65+.025;
  box(-13.5,farmPathY,-7.1,7.6,.05,.55,'#c6bea0');
  box(-10.35,farmPathY,-5.25,.65,.05,4.25,'#c6bea0');
  box(-7.75,farmPathY,-1.4,.55,.05,8.1,'#c6bea0');
  for(const z of [-5.85,-4.15,-2.45,-.75])box(-6.5,farmPathY,z,2.1,.05,.42,'#c6bea0');
  box(farmLayout.laneX,farmPathY,-.35,.72,.05,6.7,'#c6bea0');
  for(const z of [-2.95,-1.05,.65,farmLayout.entranceZ]) {
    box(-9,farmPathY,z,1.95,.05,.45,'#c6bea0');
    box(-10.02,farmPathY,z,.13,.05,.45,'#c6bea0');
    box(-7.93,farmPathY,z,.2,.05,.45,'#c6bea0');
  }
  // Shared southern entrance connects the main-house path and the pasture gate.
  box(-9.65,farmPathY,farmLayout.entranceZ,3.2,.05,.8,'#c6bea0');
  box(-7.75,farmPathY,farmLayout.entranceZ,.6,.05,.8,'#c6bea0');
  box(farmLayout.laneX,farmPathY,3.75,.72,.05,1.4,'#c6bea0');
  table(-9, 0.68, 4.35, 1.8);
  box(-9, 1.1, 3.65, 1.9, 0.15, 0.35, wood);
  box(-9, 1.1, 5.05, 1.9, 0.15, 0.35, wood);

  offset=islandLayout.lighthouse;
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
  for (const x of [7.43, 8.57])
    for (const z of [-6.57, -5.43]) box(x, 4.13, z, 0.1, 0.8, 0.1, dark);
  box(8, 4.58, -6, 1.65, 0.18, 1.65, "#567e79");
  box(8, 4.78, -6, 1.16, 0.22, 1.16, "#567e79");
  box(8, 4.98, -6, 0.7, 0.2, 0.7, "#567e79");
  box(8, 1.15, -5.35, 0.55, 1.2, 0.09, dark);
  offset=new THREE.Vector3();
  const staticMeshes:THREE.InstancedMesh[]=[];
  const origins=[...new Set(blocks.map(b=>b.origin))];
  for(const origin of origins) {
    const batch=blocks.filter(b=>b.origin===origin);
    const root=new THREE.Group();root.position.copy(origin);
    root.name=origin===islandLayout.house?'village-house':origin===islandLayout.dock?'harbor-pier':origin===islandLayout.lighthouse?'clifftop-lighthouse':origin.y===1.35?'farm-garden':'island-vegetation';
    const mesh=new THREE.InstancedMesh(geometry,material,batch.length);
    const transform=new THREE.Object3D();
    batch.forEach((block,i)=>{transform.position.fromArray(block.position).sub(origin);transform.scale.fromArray(block.size);transform.updateMatrix();mesh.setMatrixAt(i,transform.matrix);mesh.setColorAt(i,new THREE.Color(block.color));});
    mesh.castShadow=true;mesh.receiveShadow=true;root.add(mesh);scene.add(root);staticMeshes.push(mesh);
  }
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
    item.receiveShadow = true;
    parent.add(item);
    return item;
  };
  const campfire = new THREE.Group();campfire.name='beach-campfire';
  // Sit on the front lawn beyond the porch; the stone ring rests on the grass.
  campfire.position.set(-2,groundHeight(-2,4.4),4.4);scene.add(campfire);
  for(let i=0;i<10;i++) {
    const angle=i*Math.PI/5;
    const stone=part(campfire,Math.cos(angle)*.68,.08,Math.sin(angle)*.68,.32,.22,.26,i%2?'#8b9189':'#6e7975');
    stone.rotation.y=-angle;
  }
  for(const side of [-1,1]) {
    const log=part(campfire,0,.16,side*.16,1.02,.2,.2,'#584636');
    log.rotation.y=side*.55;
  }
  const flameMaterials=['#e96c23','#ffad38','#ffe29b'].map(color=>new THREE.MeshBasicMaterial({color}));
  animatedMaterials.push(...flameMaterials);
  const flames=Array.from({length:7},(_,i)=>{
    const flame=new THREE.Mesh(geometry,flameMaterials[i%3]);campfire.add(flame);return flame;
  });
  const embers=Array.from({length:5},()=>{
    const mat=new THREE.MeshBasicMaterial({color:'#ffba59',transparent:true,depthWrite:false});
    animatedMaterials.push(mat);
    const ember=new THREE.Mesh(geometry,mat);ember.scale.setScalar(.035);campfire.add(ember);return ember;
  });
  const fireSmoke=Array.from({length:4},()=>{
    const mat=new THREE.MeshStandardMaterial({color:'#9d9e96',transparent:true,opacity:0,depthWrite:false,roughness:1});
    animatedMaterials.push(mat);
    const puff=new THREE.Mesh(geometry,mat);campfire.add(puff);return puff;
  });
  const fireLight=new THREE.PointLight('#ff9c46',8,4.5,2);
  fireLight.position.set(0,.85,0);campfire.add(fireLight);
  const sailboat = new THREE.Group();
  sailboat.name = 'pirate-ship';
  // Tapered hull sections, a planked deck and a raised stern cabin.
  for(let i=0;i<13;i++) {
    const x=-2.7+i*.45;
    const beam=1.85-Math.pow(Math.abs(x)/3,3)*1.3;
    part(sailboat,x,.08,0,.45,.58,beam,'#45392f');
    part(sailboat,x,.42,0,.44,.12,beam-.12,'#c49b67');
    for(const side of [-1,1]) {
      part(sailboat,x,.55,side*beam/2,.45,.36,.12,'#633b35');
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
        const skull = (row===1 && Math.abs(col-3)<=1) || (row===2 && col===3) || (row===3 && (col===1 || col===5));
        const panel=part(sailboat,x+billow,y+.49-row*.19,z,.045,.19,width/7-.008,skull?'#eee5cf':row===4?'#813d3d':'#30313c');
        sailPanels.push({mesh:panel,z:billow,phase:row*.3+col*.4});
      }
    }
    for(const side of [-1,1]) {
      riggingPoints.push(new THREE.Vector3(x,height+.35,0),new THREE.Vector3(x-.5,.74,side*.82));
    }
    part(sailboat,x+.25,height+.36,0,.5,.22,.05,'#292a32');
    part(sailboat,x+.25,height+.36,.03,.09,.12,.025,'#eee5cf');
  }
  // Broadside cannons and a treasure chest mark the ship as a pirate vessel.
  for (const side of [-1,1]) for (const x of [-.2,.7]) {
    part(sailboat,x,.58,side*.85,.26,.24,.62,'#30343a');
    part(sailboat,x,.58,side*1.17,.2,.18,.035,'#151e26');
  }
  part(sailboat,-1.8,1.58,0,.58,.25,.43,'#70462d');
  for(const x of [-1.98,-1.62])part(sailboat,x,1.59,0,.065,.28,.45,'#c3a358');
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
  shipHull.castShadow=true;shipHull.receiveShadow=true;sailboat.add(shipHull);
  const shipCloth=new THREE.InstancedMesh(geometry,material,sailPanels.length);
  shipCloth.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
  sailPanels.forEach((panel,i)=>{panel.mesh.updateMatrix();shipCloth.setMatrixAt(i,panel.mesh.matrix);shipCloth.setColorAt(i,(panel.mesh.material as THREE.MeshStandardMaterial).color);sailboat.remove(panel.mesh);});
  shipCloth.castShadow=true;shipCloth.receiveShadow=true;sailboat.add(shipCloth);
  scene.add(sailboat);
  // A closed water-only route keeps the heading continuous at the berth.
  const fishingRoute = new THREE.CatmullRomCurve3(islandLayout.shipRoute.map(p=>new THREE.Vector3(...p as [number,number,number])),true,'centripetal');
  const routePosition = new THREE.Vector3();
  const routeHeading = new THREE.Vector3();
  // The Angler inherits the complete cast, reel, catch and return-home cycle.
  const fisher = new THREE.Group();
  fisher.name = 'terraria-angler';
  fisher.position.set(6.15, 0.66, 2.68);
  scene.add(fisher);
  fisher.userData.character = 'terraria-angler';
  part(fisher, 0, 0.46, 0, 0.42, 0.62, 0.48, "#c5793e");
  for(const z of [-.15,.15])part(fisher,.216,.47,z,.025,.5,.055,'#715039');
  part(fisher, .22, .72, 0, .035, .12, .16, '#e3b18b');
  part(fisher, 0, 0.99, 0, 0.36, 0.37, 0.36, "#e3b18b");
  part(fisher, -.025, 1.19, 0, .43, .14, .42, '#dfa94a');
  part(fisher, -.18, 1.07, 0, .1, .3, .4, '#dfa94a');
  part(fisher, 0, 1.26, 0, .7, .09, .62, '#d9bc7c');
  part(fisher, 0, 1.38, 0, .43, .18, .4, '#cda868');
  part(fisher, .22, 1.32, 0, .03, .055, .41, '#94603d');
  for (const side of [-1, 1]) {
    part(fisher, -.02, 1.12, side*.19, .36, .15, .055, '#dfa94a');
    part(fisher, .16, 1.15, side*.12, .09, .13, .14, '#dfa94a');
    part(fisher, .187, 1.02, side*.105, .025, .055, .045, '#302b26');
  }
  part(fisher, .2, .96, 0, .07, .07, .09, '#cf9972');
  part(fisher, .188, .885, 0, .02, .025, .12, '#9a654e');
  const legs: THREE.Group[] = [];
  for (const z of [-0.16, 0.16]) {
    const leg = new THREE.Group(); leg.position.set(0,.18,z); fisher.add(leg); legs.push(leg);
    part(leg,0,-.27,0,.19,.54,.19,'#496d9e');
    part(leg,.07,-.57,0,.32,.15,.23,'#453c35');
  }
  const arm = new THREE.Group();
  arm.position.set(0.07, 0.68, 0);
  fisher.add(arm);
  for (const z of [-0.27, 0.27]) {
    part(arm, 0.1, -0.05, z, 0.28, 0.2, 0.2, "#c5793e");
    part(arm, 0.35, -0.05, z, 0.36, 0.16, 0.16, "#e3b18b");
  }
  const rod = part(arm, 1.04, 0.5, 0, 0.045, 1.9, 0.045, "#5c4731");
  rod.rotation.z = -0.8;
  const lineGeometry = new THREE.CylinderGeometry(.008,.008,1,5);
  const lineMaterial = new THREE.MeshStandardMaterial({ color: "#887f6e", roughness: 1 });
  const fishingLine = new THREE.InstancedMesh(lineGeometry, lineMaterial, 2);
  fishingLine.name = 'fishing-line';
  fishingLine.receiveShadow = true;
  fishingLine.frustumCulled = false;
  fishingLine.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
  const lineTransform = new THREE.Object3D();
  const lineMidpoint = new THREE.Vector3();
  const lineDirection = new THREE.Vector3();
  const lineUp = new THREE.Vector3(0,1,0);
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
  basket.position.set(6.5,.78,8.9);
  part(basket,0,.12,0,.64,.2,.4,'#a78051');
  for(const z of [-.22,.22])part(basket,0,.25,z,.68,.3,.065,wood);
  for(const x of [-.32,.32])part(basket,x,.25,0,.065,.3,.4,wood);
  const door = new THREE.Group(); door.position.set(.2,.85,1.73).add(islandLayout.house); scene.add(door);
  part(door,.4,.93,0,.76,1.86,.07,'#a47d50');
  part(door,.4,1.35,.055,.5,.6,.035,'#e9cf91');
  part(door,.66,.77,.08,.07,.07,.04,'#e9c568');
  const smooth = (value:number) => {const t=THREE.MathUtils.clamp(value,0,1);return t*t*(3-2*t);};
  const walkingRoute=islandLayout.anglerRoute.map(p=>new THREE.Vector3(...p as [number,number,number]));
  const dock=walkingRoute[0],home=walkingRoute[walkingRoute.length-1];
  const basketDrop=new THREE.Vector3(6.5,1.05,8.9);
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
    flatShading: false,
    transparent: true,
    opacity: .68,
    depthWrite: false,
  });
  const ocean = new THREE.Mesh(oceanGeometry, oceanMaterial);
  ocean.receiveShadow = true;
  scene.add(ocean);
  // The opaque water receives lighting at wave height, not on the deeper seabed.
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
  smoke.position.copy(islandLayout.house);scene.add(smoke);
  const wave = (x: number, z: number, t: number) =>
    -0.84 +
    Math.sin(x * 1.6 + z * 0.7 - t * 1.7) * 0.085 +
    Math.sin(z * 2.2 - t * 1.1) * 0.045;
  const tip = new THREE.Vector3();
  // All animation uses one accelerated clock, including water normals and fishing.
  const ambient = scene.children.find((item): item is THREE.HemisphereLight => item instanceof THREE.HemisphereLight)!;
  const sunlight = scene.children.find((item): item is THREE.DirectionalLight => item instanceof THREE.DirectionalLight)!;
  const daySky = new THREE.Color('#e0eeff'), nightSky = new THREE.Color('#819fc8');
  const daySun = new THREE.Color('#ffe0ab'), duskSun = new THREE.Color('#f6a579');
  const dayWater = new THREE.Color('#489ead'), nightWater = new THREE.Color('#244755');
  const dayBed = new THREE.Color('#438b92'), nightBed = new THREE.Color('#243e51');
  const lighthouse = new THREE.Group(); lighthouse.position.set(8,4.13,-6).add(islandLayout.lighthouse); lighthouse.name='lighthouse-light';scene.add(lighthouse);
  const beaconMaterial = new THREE.MeshStandardMaterial({color:'#ffe8ad',emissive:'#ffd078',emissiveIntensity:1});
  const beacon = new THREE.Mesh(geometry,beaconMaterial);
  beacon.scale.set(1.08,.75,1.08);beacon.position.copy(lighthouse.position);scene.add(beacon);
  // Surface lighting and occlusion come from the same shadow map, with no fake cone.
  const spotlight = new THREE.SpotLight('#ffe2a0',0,45,.18,.65,1.2);
  spotlight.name = 'lighthouse-spotlight';
  // The rotating lens sits outside the cage so its own posts cannot interrupt the sweep.
  spotlight.position.set(.95,0,0);
  spotlight.target.position.set(18.95,-5.2,0);
  const lens = new THREE.Mesh(geometry,beaconMaterial);
  lens.position.copy(spotlight.position);lens.scale.set(.12,.28,.32);lighthouse.add(lens);
  spotlight.castShadow = true;
  spotlight.shadow.mapSize.set(1024,1024);
  spotlight.shadow.camera.near = .1;
  spotlight.shadow.camera.far = 45;
  spotlight.shadow.bias = -.0001;
  spotlight.shadow.normalBias = .005;
  lighthouse.add(spotlight,spotlight.target);
  const houseLights = [[-2,2.5,2.1],[.6,1.8,1.9],[-2.2,5,2.2],[5.8,1.8,3.35]].map(([x,y,z])=>{
    const light = new THREE.PointLight('#ffcb82',0,5,1.5);light.position.set(x,y,z).add(islandLayout.house);scene.add(light);return light;
  });
  const residents = createCoastalResidents(scene, sailboat);
  let currentAnimationTime=0,fishingOffset=0;
  const fishery=createFishery(scene,{root:fisher,legs,arm,route:walkingRoute,onReturn:()=>{fishingOffset=currentAnimationTime;}});
  return {
    fishery,
    setReducedMotion(reduced:boolean){reducedMotion=reduced;},
    update: (elapsed: number) => {
      const time = elapsed * 2;
      currentAnimationTime=time;
      const solarAngle = time * Math.PI * 2 / 90;
      const sunHeight = Math.cos(solarAngle);
      // Orthogonal orbit axes preserve the noon direction while crossing the horizon.
      sunlight.position.set(
        55 * (-7 / Math.sqrt(309) * sunHeight + 8 / Math.sqrt(113) * Math.sin(solarAngle)),
        55 * 14 / Math.sqrt(309) * sunHeight,
        55 * (8 / Math.sqrt(309) * sunHeight + 7 / Math.sqrt(113) * Math.sin(solarAngle)),
      );
      const daylight = smooth((sunHeight+.25)/.95);
      const night = 1-daylight;
      dragon.update(elapsed,night);
      lifeTree.update(reducedMotion?0:elapsed,night);
      harborAndCave.update(elapsed,night);
      scene.userData.daylight = daylight;
      ambient.intensity=.85+daylight*1.75;
      ambient.color.copy(nightSky).lerp(daySky,daylight);
      sunlight.intensity=3.8*smooth(sunHeight/.35);
      sunlight.color.copy(duskSun).lerp(daySun,daylight);
      oceanMaterial.color.copy(nightWater).lerp(dayWater,daylight);
      seabedMaterial.color.copy(nightBed).lerp(dayBed,daylight);
      lanternMaterial.emissiveIntensity=1.3+night*3;
      houseLights.forEach(light=>light.intensity=night*9);
      lighthouse.rotation.y=-time*.42;
      beaconMaterial.emissiveIntensity=.7+night*4;
      spotlight.intensity=night*650;
      const flicker=.8+.12*Math.sin(time*8.3)+.08*Math.sin(time*13.7);
      fireLight.intensity=(6+night*5)*flicker;
      flames.forEach((flame,i)=>{
        const pulse=.5+.5*Math.sin(time*7+i*2.4);
        const height=.3+pulse*.46+(i===0?.25:0);
        flame.position.set(Math.sin(i*2.4)*.24+Math.sin(time*4+i)*.035,.22+height/2,Math.cos(i*2.4)*.24);
        flame.scale.set(.16+pulse*.06,height,.17);
        flame.rotation.z=Math.sin(time*5+i)*.12;
      });
      embers.forEach((ember,i)=>{
        const rise=(time*.55+i/5)%1;
        ember.position.set(Math.sin(i*2+rise*4)*.18+rise*.35,.5+rise*1.8,Math.cos(i*3+rise)*.2);
        ember.material.opacity=Math.sin(rise*Math.PI)*.75;
      });
      fireSmoke.forEach((puff,i)=>{
        const rise=(time*.24+i/4)%1;
        puff.position.set(rise*.65,1+rise*2.1,Math.sin(rise*3+i)*.12);
        puff.scale.setScalar(.15+rise*.45);
        puff.rotation.y=rise*.8;
        puff.material.opacity=Math.sin(rise*Math.PI)*.12;
      });
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

      // Dawn is one quarter-cycle before noon; the ship is home by sunset.
      const voyage = ((elapsed+11.25)%45)/45;
      const departing = voyage < .1;
      const cruising = voyage >= .1 && voyage < .38;
      const returningToPort = voyage >= .38 && voyage < .5;
      const routeProgress = departing ? .22*smooth(voyage/.1)
        : cruising ? .22+.48*smooth((voyage-.1)/.28)
        : returningToPort ? .7+.3*smooth((voyage-.38)/.12) : 0;
      fishingRoute.getPointAt(routeProgress,routePosition);
      fishingRoute.getTangentAt(routeProgress,routeHeading);
      sailboat.userData.phase=departing?'departing':cruising?'patrolling':returningToPort?'returning':'moored';
      sailboat.position.set(routePosition.x,wave(routePosition.x,routePosition.z,time),routePosition.z);
      sailboat.rotation.set(
        Math.sin(time * 0.9) * 0.03,
        Math.atan2(-routeHeading.z,routeHeading.x),
        Math.sin(time * 0.8) * 0.035,
      );
      residents.update(time, night);
      sailPanels.forEach((panel,i)=>{panel.mesh.rotation.z=Math.sin(time*1.4+panel.phase)*.035;panel.mesh.updateMatrix();shipCloth.setMatrixAt(i,panel.mesh.matrix);});
      shipCloth.instanceMatrix.needsUpdate=true;

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
      fishery.update(elapsed,night);
      if(fishery.ownsActor) {
        rod.visible=false;fishingLine.visible=false;floatGroup.visible=false;catchFish.visible=false;door.rotation.y=0;
        scene.updateMatrixWorld(true);return;
      }
      const cycle = (time-fishingOffset) % 32;
      const reeling = cycle >= 7 && cycle < 10;
      const outbound = cycle >= 11 && cycle < 17;
      const unloading = cycle >= 17 && cycle < 21;
      const returning = cycle >= 21 && cycle < 27;
      const standing = smooth((cycle-10)/1) * (1-smooth((cycle-27)/1));
      fisher.userData.phase = cycle < 7 ? 'fishing' : cycle < 10 ? 'reeling' : cycle < 11 ? 'standing' : outbound ? 'delivering-to-harbor' : unloading ? 'depositing' : returning ? 'returning' : 'casting';
      fisher.position.copy(dock);
      fisher.rotation.set(0,0,0);
      if (outbound || returning) {
        const travel = outbound ? (cycle-11)/6 : 1-(cycle-21)/6;
        const segment=sampleRoute(walkingRoute,travel,fisher.position);
        const heading=walkingRoute[segment+1].clone().sub(walkingRoute[segment]);
        fisher.rotation.y=Math.atan2(-heading.z,heading.x)+(returning?Math.PI:0);
      } else if(unloading) {
        fisher.position.copy(home); fisher.rotation.y=Math.PI/2;
      }
      fisher.position.y += standing*.47;
      const walking = outbound || returning;
      if(walking)fisher.position.y+=Math.abs(Math.sin(time*8))*.035;
      legs.forEach((leg,i)=>{leg.rotation.z=(1-standing)*Math.PI/2 + (walking?Math.sin(time*8+i*Math.PI)*.45:0);});
      fisher.rotation.z = unloading ? -.15*Math.sin((cycle-17)/4*Math.PI) : 0;
      arm.rotation.z = cycle < 7 ? Math.sin(time*1.1)*.045 : reeling ? smooth((cycle-7)/3)*.95 : cycle < 27 ? .95 : .95*(1-smooth((cycle-27)/2));
      door.rotation.y = 0;
      rod.visible = !unloading;
      fishingLine.visible = cycle < 10 || cycle >= 28;
      floatGroup.visible = fishingLine.visible;
      scene.updateMatrixWorld(true);
      tip.set(0, 0.95, 0);
      rod.localToWorld(tip);
      floatGroup.position.set(16.4, wave(16.4, 7.5, time) + 0.09, 7.5);
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
        if(cycle>=17)catchFish.position.lerp(basketDrop,smooth((cycle-17)/2));
      } else if(cycle>=19) {
        catchFish.position.copy(basketDrop);
      }
      lineMidpoint.copy(tip).lerp(floatGroup.position,.5);lineMidpoint.y-=.12;
      for (let i=0;i<2;i++) {
        const start = i===0 ? tip : lineMidpoint;
        const end = i===0 ? lineMidpoint : floatGroup.position;
        lineDirection.subVectors(end,start);
        lineTransform.position.copy(start).lerp(end,.5);
        lineTransform.scale.set(1,lineDirection.length(),1);
        lineTransform.quaternion.setFromUnitVectors(lineUp,lineDirection.normalize());
        lineTransform.updateMatrix();fishingLine.setMatrixAt(i,lineTransform.matrix);
      }
      fishingLine.instanceMatrix.needsUpdate=true;
    },
    dispose: () => {
      dragon.dispose();
      lifeTree.dispose();
      harborAndCave.dispose();
      ecology.dispose();
      fishery.dispose();
      terrain.dispose();
      residents.dispose();
      spotlight.shadow.dispose();beaconMaterial.dispose();
      fishingLine.dispose();
      shipHull.dispose();
      shipCloth.dispose();
      riggingGeometry.dispose();
      riggingMaterial.dispose();
      staticMeshes.forEach(mesh=>mesh.dispose());
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
