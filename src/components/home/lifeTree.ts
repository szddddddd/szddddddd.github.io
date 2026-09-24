import * as THREE from 'three';
import { groundHeight, groveBlend, islandBounds, islandLayout, isLand, roadSamples } from './islandTerrain';
import { buildVoxelPerson, type VoxelBox } from './voxelPerson';

export function createLifeTree(scene:THREE.Scene) {
  const root=new THREE.Group();root.name='life-tree-grove';scene.add(root);
  const tree=new THREE.Group();tree.name='giant-life-tree';root.add(tree);
  const layout=islandLayout.lifeTree,garden=islandLayout.dryadGarden;
  const base=groundHeight(layout.x,layout.z);
  tree.position.set(layout.x,base,layout.z);tree.rotation.y=Math.PI/4;
  const geometry=new THREE.BoxGeometry();
  const material=new THREE.MeshStandardMaterial({roughness:.9});
  type Block={p:number[];s:number[];c:string};
  const batches=new Map<THREE.Group,Block[]>(),meshes:THREE.InstancedMesh[]=[];
  const box:VoxelBox=(g,x,y,z,w,h,d,c)=>{
    if(!batches.has(g))batches.set(g,[]);batches.get(g)!.push({p:[x,y,z],s:[w,h,d],c});
  };
  const bark='#775334',lightBark='#967146',deepBark='#543e2c';
  // Hollow lower trunk, facing southeast. The cavity has a floor, sides and back.
  box(tree,0,.055,.08,2.3,.11,2.1,'#a48757');
  box(tree,0,1.15,-.78,2.3,2.3,.55,deepBark);
  for(const side of [-1,1]) {
    box(tree,side*.87,1.1,.2,.58,2.2,1.65,bark);
    box(tree,side*.64,2.18,.67,.28,.45,.58,lightBark);
  }
  box(tree,0,2.52,.3,1.7,.42,1.7,bark);
  box(tree,0,1.05,-.46,1.05,1.95,.045,'#302e22');
  for(let i=0;i<14;i++) {
    const y=2.7+(i+.5)*.45,w=1.76-i*.07;
    box(tree,Math.sin(i*.48)*.11,y,-.12,w,.46,w*.85,i%3?bark:lightBark);
    box(tree,w*.46,y,.34,.13,.4,.16,deepBark);
    box(tree,-w*.44,y,-.12,.12,.42,.2,lightBark);
  }
  // Branches are stair-stepped blocks, with broad leafy boughs above the village.
  for(const [angle,start,end] of [[-.9,4.4,7.8],[1.05,5.4,8.9],[3.1,6.2,9.8],[4.6,7.5,10.8]]) {
    for(let i=0;i<8;i++) {
      const t=i/7,r=.3+t*2.25;
      box(tree,Math.cos(angle)*r,start+(end-start)*t,Math.sin(angle)*r,.55-t*.23,.5,.55-t*.23,i%3?bark:lightBark);
    }
  }
  tree.updateMatrixWorld(true);
  const world=new THREE.Vector3();
  const roots:THREE.Box3[]=[];
  for(let arm=0;arm<8;arm++)for(let j=0;j<10;j++) {
    const angle=arm*Math.PI/4;
    if(Math.sin(angle)>.65)continue; // Keep the hollow's entrance clear.
    const radius=.92+j*.24,bend=angle+Math.sin(j*.48+arm)*j*.018;
    const x=Math.cos(bend)*radius,z=Math.sin(bend)*radius;
    world.set(x,0,z);tree.localToWorld(world);
    if(roadSamples.some(p=>Math.hypot(p.x-world.x,p.z-world.z)<.85))continue;
    if(Math.abs(world.x-garden.x)<garden.width/2+.1&&Math.abs(world.z-garden.z)<garden.depth/2+.1)continue;
    if(scene.userData.ecology?.trees.some((p:{x:number;z:number})=>Math.hypot(p.x-world.x,p.z-world.z)<.65))continue;
    const floor=groundHeight(world.x,world.z),h=.62-j*.05,w=.51-j*.022;
    box(root,world.x,floor+h/2,world.z,w,h,w,j%2?bark:lightBark);
    if(j>4&&j%2===0)box(root,world.x,floor+h+.015,world.z,w*.7,.03,w*.75,'#728d4f');
    roots.push(new THREE.Box3(new THREE.Vector3(world.x-w/2,floor,world.z-w/2),new THREE.Vector3(world.x+w/2,floor+h,world.z+w/2)));
  }
  const foliage=new THREE.Group();foliage.name='life-tree-canopy';tree.add(foliage);
  const leafKeys=new Set<string>();
  let seed=1948;const random=()=>((seed=(Math.imul(seed,1664525)+1013904223)>>>0)/4294967296);
  for(const [cx,cy,cz,rx,ry,rz] of [[-1.45,7.4,-.35,1.5,1.15,1.6],[1.25,8.5,1,1.55,1.5,1.6],[-.4,9.5,-1.2,2.0,1.3,1.65],[.15,10.6,-.05,1.55,1.35,1.55]]) {
    for(let ix=-7;ix<=7;ix++)for(let iz=-7;iz<=7;iz++)for(let iy=13;iy<=25;iy++) {
      const x=ix*.43,z=iz*.43,y=iy*.46;
      if(((x-cx)/rx)**2+((y-cy)/ry)**2+((z-cz)/rz)**2>1.06)continue;
      if(Math.hypot(x,z)+.32>layout.canopyRadius||y+.24>layout.height)continue;
      const key=`${ix},${iy},${iz}`;if(leafKeys.has(key))continue;leafKeys.add(key);
      world.set(x,y,z);tree.localToWorld(world);
      if(![-.32,.32].every(dx=>[-.32,.32].every(dz=>isLand(world.x+dx,world.z+dz))))continue;
      if(islandLayout.pads.some(p=>!['life-tree','dryad-garden'].includes(p.name)&&Math.abs(world.x-p.x)<p.width/2+.32&&Math.abs(world.z-p.z)<p.depth/2+.32))continue;
      box(foliage,x,y,z,.45,.48,.45,['#426537','#557c40','#749553','#8aa964'][Math.floor(random()*4)]);
    }
  }
  for(const [x,z,y] of [[-2.3,-.5,7],[1.9,.8,7.5],[-.9,-2.1,8.4],[1.1,2.2,7.6]]) {
    for(let i=0;i<7;i++)box(tree,x+Math.sin(i*.8)*.06,y-i*.26,z,.065,.27,.065,'#567745');
    for(let i=0;i<3;i++)box(tree,x+.1,y-.3-i*.5,z,.23,.13,.16,'#769653');
  }
  const hollowGlow=new THREE.MeshStandardMaterial({color:'#ffe7a7',emissive:'#efb85c',emissiveIntensity:1.1});
  const lantern=new THREE.Mesh(geometry,hollowGlow);lantern.position.set(-.55,1.35,-.19);lantern.scale.set(.15,.23,.15);tree.add(lantern);
  const hollowLight=new THREE.PointLight('#ffd48a',1.2,4,2);hollowLight.position.set(0,1.05,.65);tree.add(hollowLight);
  // An explicit staircase connects the raised grove to the existing northern path.
  const steps=islandLayout.groveSteps;
  const stride=(steps.fromZ-steps.toZ)/steps.count;
  for(let i=0;i<steps.count;i++) {
    const z=steps.fromZ-(i+.5)*stride,top=THREE.MathUtils.lerp(steps.fromY,steps.toY,(i+1)/steps.count)+.035;
    const bottom=Math.min(groundHeight(steps.x,z),top-.15);
    box(root,steps.x+Math.sin(i*2.4)*.025,(top+bottom)/2,z,.94+(i%3)*.035,top-bottom,stride,i%2?'#a5af92':'#b4b99e');
  }
  // Garden borders leave a central, flat loop free for the Dryad and the approach.
  const plants=new THREE.Group();plants.name='dryad-garden-plants';root.add(plants);
  for(let i=0;i<22;i++) {
    const a=i*Math.PI*2/22,x=garden.x+Math.cos(a)*(1.16+random()*.18),z=garden.z+Math.sin(a)*(.9+random()*.16);
    if(z<garden.z-.72)continue;
    const y=groundHeight(x,z);
    box(plants,x,y+.05,z,.23,.1,.23,'#68885a');
    for(const side of [-1,1])box(plants,x+side*.1,y+.2,z,.16,.08,.09,'#7ba15f');
    box(plants,x,y+.16,z,.04,.28,.04,'#557c43');
    if(i%3===0)box(plants,x,y+.33,z,.15,.1,.15,['#ead4b1','#d8a7b5','#c5d6ae'][Math.floor(i/3)%3]);
  }
  // Irregular understory patches extend beyond the garden into the mossy mound.
  for(let i=0;i<145;i++) {
    const x=layout.x+(random()-.5)*9,z=layout.z+(random()-.5)*7;
    if(groveBlend(x,z)<.12||!isLand(x,z)||Math.hypot(x-layout.x,z-layout.z)<1.9)continue;
    if(roadSamples.some(p=>Math.hypot(p.x-x,p.z-z)<.8))continue;
    if(islandLayout.pads.some(p=>p.name!=='life-tree'&&Math.abs(x-p.x)<p.width/2+.2&&Math.abs(z-p.z)<p.depth/2+.2))continue;
    if(roots.some(b=>x>b.min.x-.15&&x<b.max.x+.15&&z>b.min.z-.15&&z<b.max.z+.15))continue;
    const y=groundHeight(x,z);
    if(i%5===0) {
      box(plants,x,y+.11,z,.36,.22,.3,'#7f8d6d');
      box(plants,x-.03,y+.235,z,.27,.04,.23,'#90a669');
    } else {
      for(let j=0;j<5;j++) {
        const a=j*2.4,dx=Math.cos(a)*.16,dz=Math.sin(a)*.16;
        box(plants,x+dx,y+.12+j*.02,z+dz,.055,.24+j*.04,.045,'#6f8b4b');
        box(plants,x+dx*1.3,y+.22+j*.02,z+dz*1.3,.19,.055,.12,j%2?'#8eae66':'#709553');
        if(i%4===0&&j%2===0)box(plants,x+dx,y+.3+j*.02,z+dz,.115,.09,.11,i%8===0?'#e6d7aa':'#cfb9cf');
      }
    }
  }
  const dryadRoot=new THREE.Group();dryadRoot.name='terraria-dryad';root.add(dryadRoot);
  const dryad=buildVoxelPerson(dryadRoot,box,'#88a759','#e3b18b','#e3b18b');
  dryadRoot.userData.character='terraria-dryad';
  box(dryad.head,0,.22,-.035,.5,.14,.46,'#65843c');
  box(dryad.head,0,-.09,-.23,.47,.71,.15,'#577b38');
  for(const side of [-1,1]) {
    box(dryad.head,side*.23,-.13,.025,.12,.6,.34,'#749344');
    box(dryad.head,side*.2,-.44,-.13,.12,.23,.15,'#668c40');
    box(dryad.root,side*.17,.57,.03,.21,.25,.4,'#668a40');
    box(dryad.root,side*.19,.81,.19,.13,.31,.055,'#648a3d');
  }
  box(dryad.head,-.17,.2,.23,.19,.15,.09,'#e2b5ca');
  box(dryad.head,-.17,.2,.285,.06,.06,.03,'#eed7a2');
  box(dryad.root,0,.66,.205,.15,.1,.07,'#b1c16d');
  const transform=new THREE.Object3D();
  for(const [parent,blocks] of batches) {
    const mesh=new THREE.InstancedMesh(geometry,material,blocks.length);
    blocks.forEach((b,i)=>{transform.position.fromArray(b.p);transform.scale.fromArray(b.s);transform.updateMatrix();mesh.setMatrixAt(i,transform.matrix);mesh.setColorAt(i,new THREE.Color(b.c));});
    mesh.castShadow=true;mesh.receiveShadow=true;parent.add(mesh);meshes.push(mesh);
  }
  const particleMaterial=new THREE.MeshBasicMaterial({transparent:true,opacity:.65,depthWrite:false,toneMapped:false});
  const particles=new THREE.InstancedMesh(geometry,particleMaterial,36);particles.name='dryad-leaf-magic';root.add(particles);
  particles.instanceMatrix.setUsage(THREE.DynamicDrawUsage);particles.frustumCulled=false;
  for(let i=0;i<36;i++)particles.setColorAt(i,new THREE.Color(i%4===0?'#e3edb0':'#a6d987'));
  // Stepped pixel leaves form a loose, layered Dryad's Blessing wind aura.
  const leafGeometry=new THREE.BufferGeometry(),leafVertices:number[]=[];
  const outline=[[-.5,0],[-.3,0],[-.3,.16],[-.1,.16],[-.1,.28],[.3,.28],[.3,.14],[.55,.14],[.55,0],[.3,0],[.3,-.16],[-.1,-.16],[-.1,-.08],[-.5,-.08]];
  for(let i=0;i<outline.length;i++)leafVertices.push(0,0,.07,...outline[i],0,...outline[(i+1)%outline.length],0);
  leafGeometry.setAttribute('position',new THREE.Float32BufferAttribute(leafVertices,3));leafGeometry.computeVertexNormals();
  const leafMaterial=new THREE.MeshStandardMaterial({roughness:.75,side:THREE.DoubleSide,transparent:true,opacity:.88,depthWrite:false,emissive:'#87bd48',emissiveIntensity:.22});
  const leafCount=80,leaves=new THREE.InstancedMesh(leafGeometry,leafMaterial,leafCount);leaves.name='dryad-windblown-leaves';
  const glowGeometry=new THREE.PlaneGeometry();
  const glowMaterial=new THREE.ShaderMaterial({transparent:true,depthWrite:false,blending:THREE.AdditiveBlending,
    uniforms:{strength:{value:.65}},
    vertexShader:`varying vec2 vUv; varying vec3 vColor; varying float vFade;
      void main(){vUv=uv;vColor=instanceColor;vFade=length(instanceMatrix[2].xyz);
        vec4 p=modelViewMatrix*instanceMatrix*vec4(0.,0.,0.,1.);
        p.xy+=position.xy*vec2(length(instanceMatrix[0].xyz),length(instanceMatrix[1].xyz));gl_Position=projectionMatrix*p;}`,
    fragmentShader:`varying vec2 vUv; varying vec3 vColor; varying float vFade; uniform float strength;
      void main(){vec2 p=abs(vUv-.5)*2.;float r=length(p);
        float halo=exp(-r*r*5.)*(1.-smoothstep(.6,1.,r));
        float spark=exp(-r*r*65.);gl_FragColor=vec4(vColor,(halo*.25+spark*.8)*vFade*strength);}`});
  const leafGlow=new THREE.InstancedMesh(glowGeometry,glowMaterial,leafCount*3);leafGlow.name='dryad-leaf-glow';
  for(const mesh of [leaves,leafGlow]){mesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);mesh.frustumCulled=false;root.add(mesh);}
  const leafSeeds=Array.from({length:leafCount},()=>({offset:random(),angle:random()*Math.PI*2,radius:1.05+random()*.4,speed:.95+random()*.65,size:.2+random()*.17}));
  for(let i=0;i<leafCount;i++){
    leaves.setColorAt(i,new THREE.Color(['#83c64c','#b6e46a','#58983d','#cddd80'][i%4]));
    for(let j=0;j<3;j++)leafGlow.setColorAt(i*3+j,new THREE.Color(i%4===0?'#e0eba0':'#a5e96e'));
  }
  const hand=new THREE.Vector3();
  // An eased garden loop, a pause, and a blessing; the first pose is stationary.
  const update=(time:number,night:number)=>{
    const phase=time%24,walking=phase>=3&&phase<17;
    const travel=phase<3?0:phase<17?THREE.MathUtils.smoothstep((phase-3)/14,0,1):1;
    const angle=travel*Math.PI*2;
    const x=garden.x+Math.cos(angle)*.4,z=garden.z+Math.sin(angle)*.23;
    dryad.root.position.set(x,groundHeight(x,z),z);
    dryad.root.rotation.y=walking?Math.atan2(-.4*Math.sin(angle),.23*Math.cos(angle)):.45;
    dryad.legs.forEach((leg,i)=>{leg.rotation.x=walking?Math.sin(time*5+i*Math.PI)*.19:0;});
    const blessing=phase>=19?Math.sin((phase-19)/5*Math.PI):0;
    dryad.arms.forEach((arm,i)=>{arm.rotation.x=-blessing*.85+(walking?Math.sin(time*5+i*Math.PI)*.08:0);arm.rotation.z=(i===0?1:-1)*blessing*.15;});
    dryad.head.rotation.y=Math.sin(time*.35)*.12;
    dryad.root.userData.phase=walking?'walking':blessing>0?'blessing':'resting';
    dryad.root.updateWorldMatrix(true,true);hand.set(0,-.42,.04);dryad.arms[1].localToWorld(hand);
    for(let i=0;i<36;i++) {
      const age=(time*.38+i/36)%1,ambient=i<8;
      transform.position.set(ambient?garden.x+Math.sin(i*3.1)*.9:hand.x+Math.sin(i*2.4)*age*.5,
        ambient?garden.height+.4+age*.7:hand.y+age*1.25,
        ambient?garden.z+Math.cos(i*1.7)*.7:hand.z+Math.cos(i*2.3)*age*.4);
      transform.rotation.set(age+i,time*.18+i,age);
      const size=Math.sin(age*Math.PI)*(ambient?.027:.062*blessing);
      transform.scale.set(size,size*.55,size);transform.updateMatrix();particles.setMatrixAt(i,transform.matrix);
    }
    particles.instanceMatrix.needsUpdate=true;particleMaterial.opacity=.5+night*.25;
    for(let i=0;i<leafCount;i++) {
      const s=leafSeeds[i],age=(time*.13+s.offset)%1;
      const orbit=s.angle+time*s.speed;
      const radius=s.radius+Math.sin(time*.8+i)*.08+blessing*.12;
      const height=.45+s.offset*2.35+Math.sin(orbit*.8+i)*.16;
      // Follow the NPC in horizontal wind bands, with small independent lifts and
      // flutter. Keep the face and body readable inside the open center.
      const lx=x+Math.cos(orbit)*radius*.8,lz=z+Math.sin(orbit)*radius;
      const ly=Math.max(dryad.root.position.y+height,groundHeight(lx,lz)+.22);
      const fade=THREE.MathUtils.smoothstep(age,0,.12)*(1-THREE.MathUtils.smoothstep(age,.82,1));
      const size=s.size*fade*(1+blessing*.2);
      transform.position.set(lx,ly,lz);transform.rotation.set(Math.sin(time*3+i)*.7,Math.PI/2-orbit,Math.sin(time*2+i)*.6);
      transform.scale.setScalar(size);transform.updateMatrix();leaves.setMatrixAt(i,transform.matrix);
      for(let j=0;j<3;j++) {
        const behind=orbit-j*.09,glowSize=(.21+size)*(1-j*.22);
        transform.position.set(x+Math.cos(behind)*radius*.8,ly+.035*j,z+Math.sin(behind)*radius);
        transform.quaternion.identity();transform.scale.set(glowSize,glowSize,fade*(.58+blessing*.25)*(1-j*.3));
        transform.updateMatrix();leafGlow.setMatrixAt(i*3+j,transform.matrix);
      }
    }
    leaves.instanceMatrix.needsUpdate=true;leafGlow.instanceMatrix.needsUpdate=true;
    leafMaterial.emissiveIntensity=.18+night*.55;glowMaterial.uniforms.strength.value=.65+night*.55;
    hollowLight.intensity=1.1+night*1.1;hollowGlow.emissiveIntensity=1+night*.7;
  };
  update(0,0);root.updateMatrixWorld(true);
  const bounds=new THREE.Box3().setFromObject(tree);islandBounds.union(bounds);
  scene.userData.lifeTree={bounds,roots,garden,islandCenter:{x:layout.x,z:layout.z},base};
  return {update,dispose(){root.removeFromParent();meshes.forEach(m=>m.dispose());particles.dispose();leaves.dispose();leafGlow.dispose();geometry.dispose();leafGeometry.dispose();glowGeometry.dispose();material.dispose();particleMaterial.dispose();leafMaterial.dispose();glowMaterial.dispose();hollowGlow.dispose();}};
}
