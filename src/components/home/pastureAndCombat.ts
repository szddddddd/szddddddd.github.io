import * as THREE from 'three';
import { farmLayout } from './farmLayout';
import { islandLayout } from './islandTerrain';

export function createPastureAndCombat(scene: THREE.Scene, ship: THREE.Group) {
  const geometry = new THREE.BoxGeometry(1,1,1);
  const material = new THREE.MeshStandardMaterial({roughness:.8});
  const roots: THREE.Group[] = [];
  const batches = new Map<THREE.Group, {p:number[];s:number[];c:string}[]>();
  const meshes: THREE.InstancedMesh[] = [];
  const group = (name:string, parent:THREE.Object3D=scene) => {
    const g=new THREE.Group();g.name=name;parent.add(g);roots.push(g);return g;
  };
  const box = (g:THREE.Group,x:number,y:number,z:number,w:number,h:number,d:number,c:string) => {
    if(!batches.has(g))batches.set(g,[]);
    batches.get(g)!.push({p:[x,y,z],s:[w,h,d],c});
  };
  const pasture=group('horse-pasture');
  const ground = farmLayout.ground;
  const fence=farmLayout.fence;
  fence.forEach(([x,z],i)=>{
    const next=fence[(i+1)%fence.length];
    const section=group('pasture-fence-'+i);section.position.set(x,0,z);
    section.rotation.y=-Math.atan2(next[1]-z,next[0]-x);
    const length=Math.hypot(next[0]-x,next[1]-z);
    const count=Math.ceil(length/1.15);
    for(let post=0;post<(i===farmLayout.gateSegment?1:count);post++)box(section,post*length/count,ground+.5,0,.13,1,.13,'#856545');
    if(i!==farmLayout.gateSegment)for(const y of [.32,.72])box(section,length/2,ground+y,0,length,.09,.09,'#b79970');
  });
  // An open gate connects the pasture to the shared farm lane.
  const gate=group('farm-open-gate');gate.position.set(-11,ground,2.05);gate.rotation.y=-Math.PI/2;
  for(const y of [.32,.72])box(gate,-.5,y,0,1,.09,.09,'#b79970');
  box(gate,-1,.5,0,.12,1,.12,'#856545');
  box(pasture,-11.45,ground+.025,farmLayout.entranceZ,1.9,.05,.8,'#c6bea0');
  // Open-front shelter, with feeding supplies grouped along the northern edge.
  const shelter=group('farm-horse-shelter');shelter.position.set(-15.35,ground,-2.45);
  for(const x of [-1.35,1.35])for(const z of [-.8,.8])box(shelter,x,1,z,.14,2,.14,'#856545');
  box(shelter,0,.8,-.85,2.85,1.6,.12,'#b79970');
  for(let row=0;row<5;row++)box(shelter,0,1.9+row*.13,0,3.1,.15,2.05-row*.36,row%2?'#71866e':'#65795f');
  box(shelter,0,.035,0,2.7,.07,1.6,'#b4a16f');
  for(const x of [-12.8,-12.15]) {
    box(pasture,x,ground+.25,-2.65,.55,.5,.6,'#c5ab5d');
    box(pasture,x,ground+.25,-2.65,.07,.52,.62,'#997c45');
  }
  box(pasture,-12.45,ground+.2,-1.65,1.2,.4,.6,'#8e7151');
  box(pasture,-12.45,ground+.405,-1.65,.98,.025,.39,'#73bac4');
  for(let i=0;i<9;i++)box(pasture,-16.3+(i%3)*.2,ground+.12,-.85+Math.floor(i/3)*.18,.06,.24,.06,'#73924d');
  for(const [x,z] of [[-11.8,3.7],[-10.9,3.7],[-17,-3.7],[-13.7,-3.7]]) {
    box(pasture,x,ground+.14,z,.36,.28,.32,'#73924d');
    for(const dx of [-.1,.1])box(pasture,x+dx,ground+.32,z,.12,.12,.13,'#e4b891');
  }
  const horses = ['#906044','#d4c6ae'].map((coat,index)=>{
    const horse=group(index?'cream-horse':'bay-horse');
    box(horse,0,1.02,0,1.4,.65,.58,coat);
    const head=new THREE.Group();head.position.set(.38,1.25,0);horse.add(head);
    box(head,.19,.23,0,.37,.9,.46,coat);
    box(head,.47,.6,0,.65,.37,.42,coat);
    box(head,.74,.48,0,.27,.23,.43,index?'#9a9287':'#70432f');
    for(const side of [-1,1]) {
      box(head,.22,.85,side*.15,.13,.28,.12,coat);
      box(head,.47,.68,side*.22,.08,.08,.035,'#282d2f');
    }
    box(head,0,.4,0,.13,.8,.48,'#43392f');
    box(horse,-.78,.9,0,.16,.75,.2,'#43392f');
    const legs:THREE.Group[]=[];
    for(const x of [-.48,.48])for(const z of [-.21,.21]) {
      const leg=new THREE.Group();leg.position.set(x,.88,z);horse.add(leg);legs.push(leg);
      box(leg,0,-.33,0,.17,.66,.18,coat);
      box(leg,.025,-.79,0,.22,.18,.23,'#403b35');
      box(leg,0,-.65,0,.16,.16,.17,coat);
    }
    horse.scale.setScalar(.86);
    return {horse,head,legs,index};
  });
  const fireMaterial=new THREE.MeshBasicMaterial({color:'#ffc067'});
  const torches=[[-17.5,-2.5],[-17.5,2.5],[-11,2.05],[-11,3.25]].map(([x,z])=>{
    box(pasture,x,ground+1,z,.14,2,.14,'#684e37');
    box(pasture,x,ground+1.93,z,.3,.15,.3,'#49483d');
    const flame=new THREE.Mesh(geometry,fireMaterial);flame.position.set(x,ground+2.22,z);flame.scale.set(.2,.5,.2);pasture.add(flame);
    const light=new THREE.PointLight('#ffb55e',8,8,2);light.position.set(x,ground+2.25,z);pasture.add(light);
    return {flame,light};
  });

  // A visible swivelling broadside gun aims at the shark from the moving deck.
  const gun=group('pirate-shark-cannon',ship);gun.position.set(.7,.72,.72);
  box(gun,0,0,0,.42,.3,.45,'#704d38');
  box(gun,0,.13,.4,.24,.23,.9,'#363c44');
  box(gun,0,.13,.88,.3,.29,.12,'#242c34');
  const flash=new THREE.Mesh(geometry,fireMaterial);flash.position.set(0,.13,1);flash.scale.set(.35,.35,.35);gun.add(flash);
  const shark=group('ocean-shark');
  shark.scale.setScalar(1.25);
  box(shark,0,0,0,.75,.52,2.1,'#44677e');
  box(shark,0,-.18,.1,.65,.2,1.85,'#c2d1cb');
  box(shark,0,.02,1.17,.52,.36,.42,'#44677e');
  // A tall, stepped dorsal fin; the tail and body stay below the wave troughs.
  box(shark,0,.49,-.15,.18,.58,.95,'#3c586e');
  box(shark,0,.91,-.24,.15,.32,.66,'#3c586e');
  box(shark,0,1.16,-.34,.12,.22,.34,'#3c586e');
  for(const side of [-1,1]) {
    box(shark,side*.52,-.09,-.05,.65,.12,.5,'#526d83');
    box(shark,side*.28,.1,1.15,.045,.065,.07,'#172d3a');
  }
  const tail=new THREE.Group();tail.position.z=-1.2;shark.add(tail);
  box(tail,0,0,0,.24,.33,.55,'#708b9d');
  box(tail,0,.13,-.25,.16,.9,.28,'#526d83');
  const ball=group('pirate-cannonball');box(ball,0,0,0,.22,.22,.22,'#222d37');
  const splash=group('shark-hit-splash');
  for(let i=0;i<8;i++) {
    const a=i*Math.PI/4;box(splash,Math.cos(a)*.6,.18+(i%3)*.18,Math.sin(a)*.6,.14,.4,.14,'#bdeee9');
  }
  // Keep the body below the lowest wave while the dorsal fin breaks the surface.
  const sharkAt=(t:number,out:THREE.Vector3)=>out.set(islandLayout.shark.x+Math.sin(t*.18)*2,-1.72,islandLayout.shark.z+Math.cos(t*.18)*3);
  const launch=new THREE.Vector3(),target=new THREE.Vector3(),aim=new THREE.Vector3();
  let launchedCycle=-1;
  let hitCycle=-1, hits=0, previousDay: boolean | undefined;
  const transform=new THREE.Object3D();
  for(const [parent,blocks] of batches) {
    const mesh=new THREE.InstancedMesh(geometry,material,blocks.length);
    blocks.forEach((b,i)=>{transform.position.fromArray(b.p);transform.scale.fromArray(b.s);transform.updateMatrix();mesh.setMatrixAt(i,transform.matrix);mesh.setColorAt(i,new THREE.Color(b.c));});
    mesh.castShadow=true;mesh.receiveShadow=true;parent.add(mesh);meshes.push(mesh);
  }
  return {
    update(time:number,night:number) {
      horses.forEach(({horse,head,legs,index})=>{
        if(index===0) {
          horse.position.set(farmLayout.grazing.x,ground,farmLayout.grazing.z);horse.rotation.y=Math.PI/2;
          head.rotation.z=-1.25+Math.sin(time*1.8)*.045;
          legs.forEach(leg=>leg.rotation.z=0);
        } else {
          const a=time*.13;
          const path=farmLayout.walking;
          horse.position.set(path.x+Math.cos(a)*path.radiusX,ground,path.z+Math.sin(a)*path.radiusZ);
          horse.rotation.y=Math.atan2(-path.radiusZ*Math.cos(a),-path.radiusX*Math.sin(a));
          head.rotation.z=Math.sin(time*.8)*.06;
          legs.forEach((leg,i)=>leg.rotation.z=Math.sin(time*2.2+i*Math.PI/2)*.2);
        }
      });
      torches.forEach(({flame,light},i)=>{
        const flicker=1+Math.sin(time*9+i)*.15;
        flame.scale.y=.5*flicker;light.intensity=(3+night*12)*flicker;
      });
      sharkAt(time,shark.position);shark.rotation.y=Math.atan2(2*Math.cos(time*.18),-3*Math.sin(time*.18));tail.rotation.y=Math.sin(time*5)*.35;
      const daytime=Math.cos(time*Math.PI*2/90)>0;
      if(previousDay===true && !daytime) { hits=0; launchedCycle=-1; hitCycle=-1; }
      previousDay=daytime;
      shark.visible=hits<3;
      shark.userData.hits=hits;
      const phase=time%6,cycle=Math.floor(time/6);
      ship.updateWorldMatrix(true,true);
      sharkAt(time+1.5,aim);ship.worldToLocal(aim);aim.sub(gun.position);
      gun.rotation.y=Math.atan2(aim.x,aim.z);
      gun.updateWorldMatrix(true,true);
      if(daytime && hits<3 && phase>=1 && phase<2.5 && launchedCycle!==cycle) {
        launchedCycle=cycle;launch.set(0,.13,.95);gun.localToWorld(launch);
        sharkAt(cycle*6+2.5,target);
      }
      const active=daytime && launchedCycle===cycle;
      if(active && phase>=2.5 && hitCycle!==cycle) {
        hitCycle=cycle;hits++;shark.visible=hits<3;shark.userData.hits=hits;
      }
      flash.visible=active && phase<1.16 && phase>=1;
      ball.visible=active && phase>=1 && phase<2.5;
      const progress=THREE.MathUtils.clamp((phase-1)/1.5,0,1);
      ball.position.copy(launch).lerp(target,progress);ball.position.y+=Math.sin(progress*Math.PI)*2.1;
      splash.visible=active && hitCycle===cycle && phase>=2.5 && phase<3.2;
      splash.position.copy(target);splash.position.y=-.72;
      splash.scale.setScalar(1+Math.max(0,phase-2.5)*1.6);
      if(splash.visible)shark.position.y-=Math.sin((phase-2.5)/.7*Math.PI)*.8;
    },
    dispose() {
      roots.forEach(root=>root.removeFromParent());meshes.forEach(mesh=>mesh.dispose());
      geometry.dispose();material.dispose();fireMaterial.dispose();
    },
  };
}
