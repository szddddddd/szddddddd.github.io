import * as THREE from 'three';
import { groundHeight, isLand, islandLayout, roadSamples, terrainCells } from './islandTerrain';

// Fixed-seed planting keeps paths, building footprints and playable clearings open.
export function createIslandEcology(scene:THREE.Scene) {
  let seed=9173;
  const random=()=>((seed=(Math.imul(seed,1664525)+1013904223)>>>0)/4294967296);
  const edge=terrainCells.filter(c=>[[1,0],[-1,0],[0,1],[0,-1]].some(([dx,dz])=>!isLand(c.x+dx,c.z+dz)));
  const reserved=[...islandLayout.pads,{name:'north-beds',x:-13.5,z:-6.2,width:7.3,depth:2.8,height:2}];
  const protectedAt=(x:number,z:number,margin:number)=>reserved.some(p=>Math.abs(x-p.x)<p.width/2+margin&&Math.abs(z-p.z)<p.depth/2+margin);
  const roadDistance=(x:number,z:number)=>Math.min(...roadSamples.map(p=>Math.hypot(x-p.x,z-p.z)));
  const shoreDistance=(x:number,z:number)=>Math.min(...edge.map(c=>Math.hypot(x-c.x,z-c.z)))-.5;
  const positions: {x:number;z:number;height:number;kind:string}[]=[];
  const blocks:{x:number;y:number;z:number;w:number;h:number;d:number;c:string}[]=[];
  const box=(x:number,y:number,z:number,w:number,h:number,d:number,c:string)=>blocks.push({x,y,z,w,h,d,c});
  const candidates=terrainCells.map(c=>({...c,rank:random()})).sort((a,b)=>a.rank-b.rank);
  const trees=candidates.filter(c=>shoreDistance(c.x,c.z)>=3 && !protectedAt(c.x,c.z,1.3) && roadDistance(c.x,c.z)>1.7);
  for(const c of trees) {
    if(positions.length===11)break;
    if(positions.some(p=>Math.hypot(p.x-c.x,p.z-c.z)<1.9))continue;
    const palm=positions.length>=8,base=groundHeight(c.x,c.z),height=palm?2.8:2.6+random()*.9;
    positions.push({x:c.x,z:c.z,height:base,kind:palm?'palm':'tree'});
    if(palm) {
      for(let i=0;i<9;i++)box(c.x+i*i*.006,base+(i+.5)*height/9,c.z,.23,height/9,.23,i%2?'#94764f':'#ac8b59');
      for(let arm=0;arm<7;arm++)for(let j=0;j<4;j++) {
        const angle=arm*Math.PI*2/7,r=.18+j*.3;
        box(c.x+.4+Math.cos(angle)*r,base+height+.1-j*j*.04,c.z+Math.sin(angle)*r,.4,.12,.4,j%2?'#64854e':'#87a05e');
      }
    } else {
      box(c.x,base+height/2,c.z,.34,height,.34,'#735437');
      for(let a=-2;a<=2;a++)for(let b=-2;b<=2;b++)for(let y=-1;y<=1;y++) {
        if(Math.abs(a)+Math.abs(b)+Math.abs(y)>4||random()<.12)continue;
        box(c.x+a*.46,base+height+y*.38,c.z+b*.46,.48,.4,.48,['#587748','#6f8d50','#88a366'][Math.floor(random()*3)]);
      }
    }
  }
  const clutter:{x:number;z:number;kind:string}[]=[];
  for(const [kind,count] of [['grass',40],['shrub',12],['flower',8]] as const) {
    for(const c of candidates) {
      if(clutter.filter(p=>p.kind===kind).length>=count)break;
      const x=c.x+(random()-.5)*.35,z=c.z+(random()-.5)*.35;
      if(c.kind!=='grass'||protectedAt(x,z,.3)||shoreDistance(x,z)<.5||roadDistance(x,z)<.85||positions.some(p=>Math.hypot(p.x-x,p.z-z)<.8)||clutter.some(p=>Math.hypot(p.x-x,p.z-z)<.7))continue;
      const y=groundHeight(x,z);clutter.push({x,z,kind});
      if(kind==='grass')for(let i=0;i<3;i++)box(x-.13+i*.13,y+.12+i*.025,z+Math.sin(i)*.12,.05,.24+i*.05,.05,'#77934f');
      else if(kind==='shrub') {
        box(x,y+.18,z,.5,.36,.45,'#708653');box(x+.13,y+.36,z-.05,.32,.25,.32,'#97a86c');
      } else for(let i=0;i<5;i++) {
        const dx=Math.cos(i*2.4)*.28,dz=Math.sin(i*2.4)*.25;
        box(x+dx,y+.14,z+dz,.04,.28,.04,'#69874b');box(x+dx,y+.3,z+dz,.15,.12,.15,['#e5bb91','#d88fa2','#ede1ae','#bba7ce'][clutter.length%4]);
      }
    }
  }
  const geometry=new THREE.BoxGeometry(),material=new THREE.MeshStandardMaterial({roughness:.9});
  const mesh=new THREE.InstancedMesh(geometry,material,blocks.length),matrix=new THREE.Object3D();mesh.name='island-ecology';
  blocks.forEach((b,i)=>{matrix.position.set(b.x,b.y,b.z);matrix.scale.set(b.w,b.h,b.d);matrix.updateMatrix();mesh.setMatrixAt(i,matrix.matrix);mesh.setColorAt(i,new THREE.Color(b.c));});
  mesh.castShadow=true;mesh.receiveShadow=true;scene.add(mesh);
  scene.userData.ecology={trees:positions,clutter};
  return {dispose(){mesh.removeFromParent();mesh.dispose();geometry.dispose();material.dispose();}};
}
