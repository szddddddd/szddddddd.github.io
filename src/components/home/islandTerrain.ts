import * as THREE from 'three';

export type GroundKind = 'grass' | 'sand' | 'rock';
export type TerrainCell = { x:number; z:number; height:number; kind:GroundKind };
export type Pad = {name:string; x:number; z:number; width:number; depth:number; height:number};
export const islandLayout = {
  seaLevel: -.84,
  house: new THREE.Vector3(5,1.35,-3),
  salon: new THREE.Vector3(15,1.97,-5),
  lighthouse: new THREE.Vector3(5,3.25,-6),
  dock: new THREE.Vector3(9,0,4),
  lifeTree: {x:-4,z:-11,height:12,canopyRadius:3.4},
  dryadGarden: {x:-1.4,z:-10.5,width:2.8,depth:2.4,height:5},
  groveSteps: {x:1,fromZ:-8.43,toZ:-12,fromY:2.43,toY:5,count:12},
  pads: [
    {name:'farm',x:-12.8,z:0,width:11.6,depth:13,height:2},
    {name:'north-garden',x:-13.5,z:-6.2,width:7.6,depth:2.8,height:2},
    {name:'vegetable-garden',x:-6.6,z:-3.3,width:2.5,depth:6,height:2},
    {name:'house',x:3.9,z:-3.6,width:8,depth:7.8,height:2},
    {name:'merchant-shop',x:10,z:-4.5,width:4,depth:4.2,height:2},
    {name:'salon',x:5.2,z:3.5,width:4.4,depth:4.8,height:2},
    {name:'lighthouse',x:13,z:-12,width:3.6,depth:3.6,height:3.8},
    {name:'archery',x:-3,z:10,width:7,depth:7,height:.03},
    {name:'pylon',x:-5.6,z:6.35,width:2.4,depth:2.4,height:.03},
    {name:'campfire',x:-2,z:4.4,width:2,depth:2,height:.03},
    {name:'life-tree',x:-4,z:-11,width:2.8,depth:2.8,height:5},
    {name:'dryad-garden',x:-1.4,z:-10.5,width:2.8,depth:2.4,height:5},
  ] as Pad[],
  roads: [
    [[5.6,2,-.02],[8.7,2,-.02],[10,2,-2.5]],
    [[-10.35,2,2.65],[-7.5,2,2.65],[-5,2,1], [1,2,1],[5.6,2,-.02]],
    [[1,2,1],[1,2,3],[1,.66,6.98],[9,.66,6.98],[15.15,.66,6.98]],
    [[1,2,3],[5.2,2,5.4]],
    [[1,.66,6.98],[-2,.03,7],[-5.6,.03,6.35]],
    [[-2,.03,7],[-2,.03,9]],
    [[1,2,1],[-2,2,-8],[5,3,-9],[10,3.8,-10],[13,3.8,-11.1]],
    [[-5,2,1],[-4,2,-8],[-9,4.6,-12],[-7,5.1,-16]],
    [[1,2.43,-8.43],[1,5,-12],[-1.4,5,-12],[-1.4,5,-10.5]],
  ] as number[][][],
  anglerRoute: [[15.15,.66,6.98],[8.65,.66,6.98],[8.65,.66,9.4],[6.5,.66,9.4]],
  shipRoute: [[18,0,8],[25,0,11],[33,0,8],[36,0,0],[40,0,4],[35,0,17],[25,0,20],[18,0,15]],
  shark: {x:30,z:10, radiusX:2,radiusZ:3},
};

// Union of the original one-unit land cells, including the former three
// independently generated extensions. Overlapping cells count only once.
function legacyArea() {
  const cells=new Set<string>();const add=(x:number,z:number)=>cells.add(`${x},${z}`);
  for(let x=-7;x<=2;x++)for(let z=-5;z<=5;z++)if(!((x>0&&z>1)||(x===2&&z< -3)))add(x,z);
  for(let x=-10;x<=-8;x++)for(let z=-6;z<=6;z++)add(x,z);
  for(let x=2;x<=8;x++)add(x,-6);add(2,-5);
  for(let x=7;x<=9;x++)for(let z=-7;z<=-5;z++)add(x,z);
  for(let x=-15;x<=1;x++)for(let z=-11;z<=8;z++) {
    const edge=Math.min(((x+10)/4.7)**2+((z+1)/8.6)**2,((x+6)/6.2)**2+((z+6)/3.8)**2);
    if(edge>.97+Math.sin(x*2.1+z)*.09)continue;
    if(x>=-10&&z>=-5&&z<=5)continue;
    if(x<=-8&&x>=-10&&z>=-6&&z<=6)continue;add(x,z);
  }
  for(let x=-7;x<=-5;x++)for(let z=5;z<=8;z++)add(x,z);
  for(let x=-13;x<=-1;x++)for(let z=6;z<=12;z++) {
    const edge=((x+7)/6.8)**2+((z-7.5)/5)**2;
    if(edge>1&&!(x>=-11&&x<=-8&&z<=10))continue;
    if(z===6&&x< -10)continue;add(x,z);
  }
  for(let x=-7;x<=0;x++)for(let z=10;z<=14;z++) {
    if(z<=11&&x<0)continue;
    if(z>=13&&(x===-7||x===0||(z===14&&x===-1)))continue;add(x,z);
  }
  for(let x=-21;x<=-11;x++)for(let z=-6;z<=6;z++)if(((x+13.7)/7.3)**2+(z/6.4)**2<=1+Math.sin(x*2+z)*.06)add(x,z);
  return cells.size;
}
export const originalLandArea=legacyArea();
const noise=(x:number,z:number)=>{let n=Math.imul(x+718,374761393)^Math.imul(z+913,668265263);n=Math.imul(n^(n>>>13),1274126177);return ((n^(n>>>16))>>>0)/4294967296;};
const insidePad=(x:number,z:number,p:Pad,margin=0)=>Math.abs(x-p.x)<=p.width/2+margin&&Math.abs(z-p.z)<=p.depth/2+margin;
// An uneven woodland mound blends both grove foundations into the highland.
export function groveBlend(x:number,z:number) {
  const dx=(x+3.2)/5.2,dz=(z+11)/4.1;
  const radius=Math.hypot(dx,dz)+.065*Math.sin(x*1.4+z*.7)+.035*Math.cos(z*2.1);
  return 1-THREE.MathUtils.smoothstep(radius,.48,1);
}
function contour(x:number,z:number,scale:number) {
  const ellipse=((x+4)/(22*scale))**2+((z+3)/(19*scale))**2;
  const bay=((x-16)/13)**2+((z-11)/13)**2;
  const main=ellipse<1+.045*Math.sin(x*.7+z*.4)+.035*Math.cos(z*.9) && bay>1;
  const cape=((x-12)/5.6)**2+((z+12)/5.8)**2 < 1+.06*Math.sin(z*1.2);
  const south=((x+4)/7.4)**2+((z-10)/6.7)**2 < 1+.05*Math.sin(x+z);
  return main||cape||south;
}
let lo=.75,hi=1.5;
const count=(s:number)=>{let n=0;for(let x=-40;x<=40;x++)for(let z=-35;z<=30;z++)if(contour(x,z,s))n++;return n;};
for(let i=0;i<24;i++){const mid=(lo+hi)/2;if(count(mid)<originalLandArea*2)lo=mid;else hi=mid;}
export const terrainCells:TerrainCell[]=[];
const grid=new Map<string,TerrainCell>();
for(let x=-40;x<=40;x++)for(let z=-35;z<=30;z++) {
  if(!contour(x,z,hi))continue;
  const coastal= !contour(x-2,z,hi)||!contour(x+2,z,hi)||!contour(x,z-2,hi)||!contour(x,z+2,hi);
  let height=z< -9 ? 4.8+Math.sin(x*.36+z*.13)*.65+Math.cos(z*.65-x*.2)*.35 : z<3?2:Math.max(.03,2-(z-3)*.55);
  let kind:GroundKind=z< -10?'rock':'grass';
  if(coastal&&z> -9){height=Math.min(height,-.12+noise(x,z)*.25);kind='sand';}
  height=Math.round(height*5)/5;
  // Feather the earth around level foundations instead of adding separate plinths.
  for(const p of islandLayout.pads) {
    if(insidePad(x,z,p,2.5)) {
      const distance=Math.max(0,Math.abs(x-p.x)-p.width/2,Math.abs(z-p.z)-p.depth/2);
      const blend=1-Math.min(1,distance/2.5);
      height=height*(1-blend)+p.height*blend;
      if(blend===1)kind=p.name==='pylon'?'sand':'grass';
    }
  }
  const foundation=islandLayout.pads.find(p=>insidePad(x,z,p));
  const grove=groveBlend(x,z);
  if(grove>0&&!foundation&&!coastal) {
    const mound=5+.2*Math.sin(x*.8+z*.6)*Math.sin(z*.9);
    height=THREE.MathUtils.lerp(height,mound,grove);
    height=Math.round(height*8)/8;
    if(grove>.15)kind='grass';
  }
  if(foundation){height=foundation.height;kind=foundation.name==='pylon'?'sand':'grass';}
  const cell={x,z,height,kind};grid.set(`${x},${z}`,cell);terrainCells.push(cell);
}
// Cut graded paths into the same height field. Steeper runs are short stair treads.
export const roadSamples:{x:number;y:number;z:number;stairs:boolean}[]=[];
for(const road of islandLayout.roads)for(let i=1;i<road.length;i++) {
  const a=road[i-1],b=road[i],length=Math.hypot(b[0]-a[0],b[2]-a[2]);
  const steps=Math.ceil(length/.32),stairs=Math.abs(b[1]-a[1])/length>1/3;
  for(let j=0;j<=steps;j++) {
    const t=j/steps,x=a[0]+(b[0]-a[0])*t,z=a[2]+(b[2]-a[2])*t;
    const y=stairs?Math.round((a[1]+(b[1]-a[1])*t)*8)/8:a[1]+(b[1]-a[1])*t;
    roadSamples.push({x,y,z,stairs});
    const cell=grid.get(`${Math.round(x)},${Math.round(z)}`);
    if(cell&&!islandLayout.pads.some(p=>insidePad(cell.x,cell.z,p)))cell.height=Math.min(cell.height,y-.04);
  }
}
export function groundHeight(x:number,z:number) {return grid.get(`${Math.round(x)},${Math.round(z)}`)?.height ?? -2.5;}
export function isLand(x:number,z:number){return grid.has(`${Math.round(x)},${Math.round(z)}`);}
export const islandBounds=new THREE.Box3().setFromPoints([...terrainCells.map(c=>new THREE.Vector3(c.x,c.height,c.z)),...islandLayout.shipRoute.map(p=>new THREE.Vector3(p[0]+3,8,p[2]+3)),new THREE.Vector3(13,9,-12)]);
// A true opening cut through the coastal cliff, beneath its intact upper surface.
export const caveLayout={minX:14,maxX:16,minZ:-10,maxZ:-8,floor:.28,ceiling:2.25};
export function buildIslandTerrain(scene:THREE.Scene) {
  const geometry=new THREE.BoxGeometry(1,1,1),material=new THREE.MeshStandardMaterial({roughness:.95});
  const blocks:{x:number;y:number;z:number;w:number;h:number;d:number;c:string}[]=[];
  const put=(x:number,y:number,z:number,w:number,h:number,d:number,c:string)=>blocks.push({x,y,z,w,h,d,c});
  for(const c of terrainCells) {
    const {x,z,height:h,kind}=c;
    const grove=groveBlend(x,z);
    const layers=h>3?Math.ceil((h+2.36)/.8):1;
    const layerHeight=(h+2.36)/layers;
    const cave=x>=caveLayout.minX&&x<=caveLayout.maxX&&z>=caveLayout.minZ&&z<=caveLayout.maxZ;
    if(cave) {
      put(x,(-2.5+caveLayout.floor)/2,z,1,caveLayout.floor+2.5,1,'#616b72');
      if(h>caveLayout.ceiling) {
        put(x,(h+caveLayout.ceiling)/2,z,1,h-caveLayout.ceiling,1,'#79858a');
        put(x,h-.04,z,1,.08,1,'#919d8b');
      }
    } else {
      for(let i=0;i<layers;i++)put(x,-2.5+(i+.5)*layerHeight,z,1,layerHeight,1,
        grove>.15&&i>=layers-2?['#748064','#82906c','#909b73'][(i+Math.floor(noise(x,z)*3))%3]:h>3?['#7e877e','#92988a','#a3a58f'][i%3]:'#a89b79');
      const road=roadSamples.reduce<typeof roadSamples[number]|undefined>((best,p)=>{
        const distance=Math.hypot(x-p.x,z-p.z);
        return distance<.72&&(!best||distance<Math.hypot(x-best.x,z-best.z))?p:best;
      },undefined);
      // One top face per land cell: paving replaces grass instead of overlapping it.
      put(x,h-.07,z,1,.14,1,road?(road.stairs?'#b0b4a5':'#c7c4ab'):grove>.15?['#7c9660','#8ba76c','#92ab73'][Math.floor(noise(x,z)*3)]:kind==='grass'?['#899f6b','#96aa76','#91a36e'][Math.floor(noise(x,z)*3)]:kind==='sand'?'#d8c69b':'#9a9d87');
    }
    if(kind==='rock'&&h>4.4&&noise(x,z)>.9&&!islandLayout.pads.some(p=>insidePad(x,z,p))&&!roadSamples.some(p=>Math.hypot(x-p.x,z-p.z)<1.4)) {
      put(x,h+.24,z,.7,.48,.65,'#78877a');
    }
  }
  // Submerged sand shelves follow the entire unified coast.
  const shelf=new Set<string>();
  for(const c of terrainCells)for(const [dx,dz] of [[1,0],[-1,0],[0,1],[0,-1]]) {
    const x=c.x+dx,z=c.z+dz,key=`${x},${z}`;
    if(!grid.has(key)&&!shelf.has(key)){shelf.add(key);put(x,-1.35,z,1,.5,1,'#b9b295');if(z< -6&&noise(x,z)>.97)put(x,-.72,z,.65,1.1,.7,'#8b978c');}
  }
  const mesh=new THREE.InstancedMesh(geometry,material,blocks.length);mesh.name='unified-island-terrain';
  const m=new THREE.Object3D();blocks.forEach((b,i)=>{m.position.set(b.x,b.y,b.z);m.scale.set(b.w,b.h,b.d);m.updateMatrix();mesh.setMatrixAt(i,m.matrix);mesh.setColorAt(i,new THREE.Color(b.c));});
  mesh.castShadow=true;mesh.receiveShadow=true;scene.add(mesh);
  scene.userData.terrain={originalArea:originalLandArea,area:terrainCells.length,ratio:terrainCells.length/originalLandArea};
  return {dispose(){mesh.removeFromParent();mesh.dispose();geometry.dispose();material.dispose();}};
}
export function sampleRoute(nodes:THREE.Vector3[],progress:number,out:THREE.Vector3) {
  const lengths=nodes.slice(1).map((p,i)=>p.distanceTo(nodes[i]));
  let distance=THREE.MathUtils.clamp(progress,0,1)*lengths.reduce((a,b)=>a+b,0);
  for(let i=0;i<lengths.length;i++){if(distance<=lengths[i]||i===lengths.length-1){out.lerpVectors(nodes[i],nodes[i+1],distance/lengths[i]);return i;}distance-=lengths[i];}
  return 0;
}
