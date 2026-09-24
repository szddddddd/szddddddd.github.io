import * as THREE from 'three';
import { sampleRoute } from './islandTerrain';

export type FisheryPhase='idle'|'approaching'|'boarding'|'departing'|'casting'|'waiting'|'hauling'|'returning'|'unloading'|'ready';
export type FisheryAction='sail'|'collect';
type Actor={root:THREE.Group;legs:THREE.Group[];arm:THREE.Group;route:THREE.Vector3[];onReturn:()=>void};
export function createFishery(scene:THREE.Scene,actor:Actor) {
  const geometry=new THREE.BoxGeometry(),materials:THREE.Material[]=[],instances:THREE.InstancedMesh[]=[],roots:THREE.Object3D[]=[];
  const batches=new Map<THREE.Group,{p:number[];s:number[];c:string}[]>();
  const group=(name:string,x=0,y=0,z=0,parent:THREE.Object3D=scene)=>{const g=new THREE.Group();g.name=name;g.position.set(x,y,z);parent.add(g);if(parent===scene)roots.push(g);return g;};
  const box=(g:THREE.Group,x:number,y:number,z:number,w:number,h:number,d:number,c:string)=>{if(!batches.has(g))batches.set(g,[]);batches.get(g)!.push({p:[x,y,z],s:[w,h,d],c});};
  const wood='#a77b50',dark='#674a34',rope='#c5af7f';
  const harbor=group('fishery-work-platform',8,.66,8.6);
  for(let x=-2.5;x<2.6;x+=.26)box(harbor,x,-.1,0,.24,.2,3.3,wood);
  for(const x of [-2.4,0,2.4])for(const z of [-1.5,1.5]){box(harbor,x,-1.15,z,.19,2.3,.19,dark);box(harbor,x,.24,z,.2,.5,.2,dark);}
  const shed=group('fishery-collection-shed',6.5,.66,8.2);
  for(const x of [-.82,.82])for(const z of [-.8,.8])box(shed,x,.95,z,.12,1.9,.12,dark);
  for(let i=0;i<5;i++)box(shed,0,1.94+i*.1,0,2,.12,2.1-i*.35,i%2?'#688782':'#507571');
  box(shed,0,.32,-.73,1.6,.64,.12,'#b49771');
  box(shed,0,1.64,.85,.94,.3,.1,'#63827b');
  // Small fish emblem identifies the collection point without floating labels.
  box(shed,0,1.65,.915,.36,.12,.025,'#eee0b1');box(shed,-.22,1.65,.915,.13,.22,.025,'#eee0b1');
  const crates=group('fishery-storage-crates',6.5,.66,8.2);
  for(const [x,z] of [[-.42,-.38],[.42,-.38],[-.42,.35],[.42,.35]]) {
    box(crates,x,.06,z,.64,.12,.57,dark);
    for(const dx of [-.3,.3])box(crates,x+dx,.25,z,.08,.4,.62,wood);
    for(const dz of [-.27,.27])box(crates,x,.25,z+dz,.65,.4,.08,wood);
  }
  const fishPile=group('fishery-pending-catch',6.5,.66,8.2);
  for(let i=0;i<5;i++){const x=-.46+(i%3)*.43,z=-.28+Math.floor(i/3)*.48;box(fishPile,x,.38,z,.34,.13,.13,i%2?'#94c7c6':'#cadbbd');box(fishPile,x-.22,.38,z,.12,.22,.08,'#70a2ac');}
  fishPile.visible=false;
  // Two drying frames use shared line geometry instead of individual rope meshes.
  const netGeometries:THREE.BufferGeometry[]=[];
  const netMaterial=new THREE.LineBasicMaterial({color:rope,transparent:true,opacity:.75});materials.push(netMaterial);
  const makeNet=(width:number,height:number)=>{
    const points:THREE.Vector3[]=[];
    for(let i=0;i<=8;i++){const x=-width/2+i*width/8;points.push(new THREE.Vector3(x,0,0),new THREE.Vector3(x,-height,0));}
    for(let i=0;i<=6;i++){const y=-i*height/6;points.push(new THREE.Vector3(-width/2,y,0),new THREE.Vector3(width/2,y,0));}
    const g=new THREE.BufferGeometry().setFromPoints(points);netGeometries.push(g);return new THREE.LineSegments(g,netMaterial);
  };
  for(const x of [7.3,9.8]) {
    const rack=group('fishery-drying-net',x,.66,10);
    for(const dx of [-.7,.7])box(rack,dx,.7,0,.09,1.4,.09,dark);
    box(rack,0,1.4,0,1.55,.09,.09,wood);
    const net=makeNet(1.3,1.15);net.position.y=1.35;rack.add(net);
  }
  const table=group('fishery-sorting-table',9.8,.66,8);
  box(table,0,.68,0,1.3,.12,.68,wood);
  for(const x of [-.5,.5])for(const z of [-.22,.22])box(table,x,.32,z,.09,.64,.09,dark);
  box(table,0,.78,0,.8,.09,.44,'#c3b69b');
  for(const z of [8.75,9.4]) {
    const barrel=group('fishery-barrel',10.15,.66,z);
    box(barrel,0,.3,0,.5,.6,.5,'#98734d');for(const y of [.12,.47])box(barrel,0,y,0,.53,.07,.53,'#5e6864');
  }
  const lights:THREE.PointLight[]=[];
  const glow=new THREE.MeshStandardMaterial({color:'#ffdaa0',emissive:'#ffb451',emissiveIntensity:2});materials.push(glow);
  for(const x of [5.6,10.4]) {
    const post=group('fishery-lantern',x,.66,6.1);box(post,0,.8,0,.12,1.6,.12,dark);box(post,0,1.94,0,.35,.08,.35,dark);
    const lamp=new THREE.Mesh(geometry,glow);lamp.position.y=1.72;lamp.scale.set(.19,.3,.19);post.add(lamp);
    const light=new THREE.PointLight('#ffc27e',0,7,2);light.position.y=1.75;post.add(light);lights.push(light);
  }
  for(const [x,z] of [[8.3,7.6],[10.1,9.2]]) {
    for(let j=0;j<8;j++){const a=j*Math.PI/4;box(harbor,x-8+Math.cos(a)*.2,.025,z-8.6+Math.sin(a)*.2,.13,.06,.13,rope);}
    box(harbor,x-8+.34,.15,z-8.6,.13,.28,.13,'#d5b484');
  }
  const boat=group('fishery-boat',9.5,-.84,11.35);
  for(let i=-4;i<=4;i++) {
    const width=1.45-Math.pow(Math.abs(i)/4,3)*.65;
    box(boat,i*.43,.48,0,.44,1.05,width,dark);box(boat,i*.43,1.04,0,.44,.12,width-.12,'#c7a775');
    for(const side of [-1,1])box(boat,i*.43,1.13,side*width/2,.43,.26,.1,'#648c93');
  }
  box(boat,-.7,1.24,0,.45,.2,.7,wood);box(boat,-1.3,1.45,0,.14,.6,.12,dark);
  for(const x of [-.3,.8])box(boat,x,1.85,-.42,.09,1.5,.09,wood);
  box(boat,.25,2.6,-.42,1.3,.08,.1,wood);
  box(boat,.5,1.34,.13,.6,.48,.5,wood);box(boat,.5,1.59,.13,.55,.07,.43,'#705139');
  box(boat,.28,1.49,-.49,.7,.26,.26,rope);
  for(const x of [-.1,.35,.8])box(boat,x,1.12,.8,.17,.25,.17,'#efba78');
  const fishingNet=group('fishery-cast-net',.4,1.7,-.6,boat);
  fishingNet.add(makeNet(2.1,1.7));
  const netCatch=group('fishery-net-catch',0,-1.15,0,fishingNet);
  for(let i=0;i<5;i++){box(netCatch,-.7+i*.32,0,(i%2)*.08,.26,.11,.1,'#c3daca');box(netCatch,-.85+i*.32,0,(i%2)*.08,.1,.2,.08,'#78a3b0');}
  netCatch.visible=false;
  const cargo=group('fishery-unloading-crate');box(cargo,0,0,0,.55,.3,.45,wood);box(cargo,0,.18,0,.35,.1,.23,'#bad6c1');cargo.visible=false;
  const plank=group('fishery-boarding-plank',8.65,.58,10.7);box(plank,0,0,0,.62,.12,1.5,wood);
  const rootMaterials=new Map<THREE.Group,THREE.MeshStandardMaterial>();
  for(const [root,blocks] of batches) {
    const material=new THREE.MeshStandardMaterial({roughness:.85});materials.push(material);rootMaterials.set(root,material);
    const mesh=new THREE.InstancedMesh(geometry,material,blocks.length),matrix=new THREE.Object3D();
    blocks.forEach((b,i)=>{matrix.position.fromArray(b.p);matrix.scale.fromArray(b.s);matrix.updateMatrix();mesh.setMatrixAt(i,matrix.matrix);mesh.setColorAt(i,new THREE.Color(b.c));});
    mesh.castShadow=true;mesh.receiveShadow=true;root.add(mesh);instances.push(mesh);
  }
  const hitMaterial=new THREE.MeshBasicMaterial({visible:false});materials.push(hitMaterial);
  const hit=(root:THREE.Group,w:number,h:number,d:number,y:number,action:FisheryAction)=>{const m=new THREE.Mesh(geometry,hitMaterial);m.scale.set(w,h,d);m.position.y=y;m.userData.fisheryAction=action;root.add(m);return m;};
  const targets=[hit(boat,4,2.8,1.8,1.25,'sail'),hit(shed,2,2.5,2,.95,'collect')];
  const path=new THREE.CatmullRomCurve3([new THREE.Vector3(9.5,0,11.35),new THREE.Vector3(11,0,13.5),new THREE.Vector3(10,0,17),new THREE.Vector3(8,0,18.5)]);
  const boardingPoint=new THREE.Vector3(8.65,1.13,10.15),rider=new THREE.Vector3(-.85,1.57,0);
  let phase:FisheryPhase='idle',pending=0,total=0,elapsed=0,startTime=0,approachDuration=0,route:THREE.Vector3[]=[],notice='';
  let initialPosition=new THREE.Vector3(),initialLegs:number[]=[],initialAngle=0;
  const getState=()=>({phase,pending,total,notice,busy:phase!=='idle'&&phase!=='ready'});
  const finish=()=>{pending=5;phase='ready';fishPile.visible=true;cargo.visible=false;netCatch.visible=false;plank.visible=true;actor.root.position.copy(actor.route[0]);actor.root.rotation.set(0,0,0);actor.legs.forEach(l=>l.rotation.z=Math.PI/2);actor.onReturn();};
  const poseWalking=(nodes:THREE.Vector3[],progress:number,time:number)=>{const i=sampleRoute(nodes,progress,actor.root.position),d=nodes[i+1].clone().sub(nodes[i]);actor.root.rotation.set(0,Math.atan2(-d.z,d.x),0);actor.legs.forEach((l,j)=>l.rotation.z=Math.sin(time*8+j*Math.PI)*.35);actor.arm.rotation.z=.7;};
  const start=(reduced=false)=>{
    notice='';if(getState().busy)return;if(pending){notice='uncollected';return;}
    if(reduced){pending=5;phase='ready';fishPile.visible=true;return;}
    initialPosition.copy(actor.root.position);initialAngle=actor.root.rotation.y;initialLegs=actor.legs.map(l=>l.rotation.z);
    // Project onto the actual walking polyline, then retrace it toward the pier.
    let best=Infinity,index=0,nearest=new THREE.Vector3();
    for(let i=0;i<actor.route.length-1;i++) {
      const a=actor.route[i],b=actor.route[i+1],dx=b.x-a.x,dz=b.z-a.z;
      const t=THREE.MathUtils.clamp(((initialPosition.x-a.x)*dx+(initialPosition.z-a.z)*dz)/(dx*dx+dz*dz),0,1),p=a.clone().lerp(b,t),distance=Math.hypot(p.x-initialPosition.x,p.z-initialPosition.z);
      if(distance<best){best=distance;index=i;nearest=p;}
    }
    nearest.y+=.47;route=[nearest,...actor.route.slice(0,index+1).reverse().map(p=>p.clone().add(new THREE.Vector3(0,.47,0))),new THREE.Vector3(11,1.13,6.98),new THREE.Vector3(8.65,1.13,6.98),boardingPoint.clone()];
    route=route.filter((p,i)=>i===0||p.distanceTo(route[i-1])>.01);
    approachDuration=route.slice(1).reduce((sum,p,i)=>sum+p.distanceTo(route[i]),0)/2.2;
    startTime=elapsed;phase='approaching';
  };
  const collect=()=>{if(!pending){notice=getState().busy?'busy':'empty';return;}total+=pending;pending=0;fishPile.visible=false;phase='idle';notice='collected';};
  const update=(time:number,night:number)=>{
    elapsed=time;lights.forEach(l=>l.intensity=night*6);glow.emissiveIntensity=1+night*2;
    let t=time-startTime-approachDuration-.6;
    if(phase==='approaching'&&t>=0)phase='boarding';
    const busy=getState().busy;
    let progress=0;
    if(busy&&t>=2&&t<10)progress=(t-2)/8;
    else if(busy&&t>=10&&t<25)progress=1;
    else if(busy&&t>=25&&t<35)progress=1-(t-25)/10;
    const p=path.getPointAt(THREE.MathUtils.smoothstep(progress,0,1));
    boat.position.set(p.x,-.84+Math.sin(time*2)*.04,p.z);
    const tangent=path.getTangentAt(progress),heading=Math.atan2(-tangent.z,tangent.x);
    // Ease away from the mooring orientation at each end of the journey.
    boat.rotation.set(Math.sin(time)*.012,heading*Math.min(1,progress*8),Math.sin(time*1.4)*.016);
    plank.visible=!busy||t<2||t>=35;
    if(!busy){fishingNet.rotation.x=0;fishingNet.scale.set(1,.28,1);fishingNet.position.set(.4,2.3,-.6);return;}
    notice='';actor.root.userData.phase='fishery-'+phase;
    if(t<0) {
      const walked=time-startTime;
      if(walked<.6) {actor.root.position.copy(initialPosition).lerp(route[0],walked/.6);actor.root.rotation.y=initialAngle;actor.legs.forEach((l,i)=>l.rotation.z=initialLegs[i]*(1-walked/.6));}
      else poseWalking(route,(walked-.6)/approachDuration,time);
      return;
    }
    phase=t<2?'boarding':t<10?'departing':t<14?'casting':t<21?'waiting':t<25?'hauling':t<35?'returning':'unloading';
    boat.updateWorldMatrix(true,true);const riderWorld=boat.localToWorld(rider.clone());
    actor.root.position.copy(riderWorld);actor.root.rotation.set(0,boat.rotation.y,0);actor.legs.forEach(l=>l.rotation.z=0);actor.arm.rotation.z=.25;
    if(t<2)actor.root.position.lerpVectors(boardingPoint,riderWorld,t/2);
    let net=0;if(t>=10&&t<14)net=(t-10)/4;else if(t>=14&&t<21)net=1;else if(t>=21&&t<25)net=1-(t-21)/4;
    fishingNet.position.set(.4,2.3-net*1.5,-.6-net*.8);fishingNet.scale.set(1,.28+net*.72,1);fishingNet.rotation.x=-net*.4;
    netCatch.visible=t>=21&&t<35;
    if(t>=35) {
      const delivery=new THREE.Vector3(6.5,1.13,9.4);
      const exitNodes=[riderWorld,boardingPoint,new THREE.Vector3(8.65,1.13,9.4),delivery];
      if(t<40) {
        poseWalking(exitNodes,(t-35)/5,time);
        cargo.visible=true;cargo.position.copy(actor.root.position).add(new THREE.Vector3(0,.55,-.3));
      } else {
        cargo.visible=false;fishPile.visible=true;netCatch.visible=false;
        const returnNodes=[delivery,new THREE.Vector3(8.65,1.13,9.4),new THREE.Vector3(8.65,1.13,6.98),actor.route[0].clone().add(new THREE.Vector3(0,.47,0))];
        poseWalking(returnNodes,Math.min(1,(t-40)/5.5),time);
        if(t>45.5){const sit=THREE.MathUtils.clamp((t-45.5)/.5,0,1);actor.root.position.copy(actor.route[0]).add(new THREE.Vector3(0,.47*(1-sit),0));actor.root.rotation.set(0,0,0);actor.legs.forEach(l=>l.rotation.z=Math.PI/2*sit);}
      }
    }
    if(t>=46)finish();
  };
  return {start,collect,update,getState,targets,
    get ownsActor(){return getState().busy;},
    setReduced(){if(getState().busy){boat.position.set(9.5,-.84,11.35);boat.rotation.set(0,0,0);finish();}},
    hover(action:FisheryAction|undefined){for(const [g,a] of [[boat,'sail'],[shed,'collect']] as const){const m=rootMaterials.get(g)!;m.emissive.set('#f4c372');m.emissiveIntensity=action===a?.2:0;}},
    dispose(){roots.forEach(r=>r.removeFromParent());instances.forEach(m=>m.dispose());geometry.dispose();netGeometries.forEach(g=>g.dispose());materials.forEach(m=>m.dispose());},
  };
}
