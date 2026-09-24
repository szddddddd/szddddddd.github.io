import * as THREE from 'three';
import { caveLayout, islandLayout } from './islandTerrain';

// Traders follow the eastern cape and northern coast before heading offshore to the northwest.
export const tradeRoute=new THREE.CatmullRomCurve3([
  new THREE.Vector3(20.3,0,-.7),new THREE.Vector3(22.4,0,-4.7),
  new THREE.Vector3(23,0,-15),new THREE.Vector3(16,0,-24),
  new THREE.Vector3(3,0,-28),new THREE.Vector3(-11,0,-26),
  new THREE.Vector3(-23,0,-23),new THREE.Vector3(-37,0,-28),new THREE.Vector3(-52,0,-37)
],false,'centripetal');

export function createHarborAndCave(scene:THREE.Scene) {
  const root=new THREE.Group();root.name='harbor-and-mushroom-cave';scene.add(root);
  const geometry=new THREE.BoxGeometry(),meshes:THREE.InstancedMesh[]=[],materials:THREE.Material[]=[];
  type Block={p:number[];s:number[];c:string};
  const batches=new Map<THREE.Group,Block[]>();
  const group=(name:string,x=0,y=0,z=0)=>{const g=new THREE.Group();g.name=name;g.position.set(x,y,z);root.add(g);return g;};
  const box=(g:THREE.Group,x:number,y:number,z:number,w:number,h:number,d:number,c:string)=>{
    if(!batches.has(g))batches.set(g,[]);batches.get(g)!.push({p:[x,y,z],s:[w,h,d],c});
  };
  const wood='#a77c50',dark='#604530',cream='#d9c393',blue='#386f87';
  const harbor=group('trade-harbor');
  const deck=(x:number,z:number,w:number,d:number)=>{
    const count=Math.ceil(w/.3);
    for(let i=0;i<count;i++)box(harbor,x-w/2+(i+.5)*w/count,.61,z,w/count-.025,.28,d,wood);
    for(const dx of [-w/2+.18,w/2-.18])for(const dz of [-d/2+.2,d/2-.2]) {
      box(harbor,x+dx,-.65,z+dz,.25,2.8,.25,dark);
      box(harbor,x+dx,.98,z+dz,.26,.46,.26,dark);
    }
    box(harbor,x,.33,z-d/2+.12,w,.22,.18,dark);
    box(harbor,x,.33,z+d/2-.12,w,.22,.18,dark);
  };
  deck(16.35,4.9,4.1,1.8);
  deck(14.85,5.85,1.1,.1);
  deck(17.3,1.05,2.2,5.9);
  deck(16,-2.45,4.8,1.1);
  // Roped cargo, barrels and a striped customs awning occupy the inland edge.
  for(const [x,z,level] of [[14.8,5.05,0],[15.6,5.05,0],[14.8,5.05,1],[16.3,-2.45,0],[15.4,-2.45,0]]) {
    box(harbor,x,1.1+level*.68,z,.68,.66,.66,'#997345');
    for(const dx of [-.22,.22])box(harbor,x+dx,1.12+level*.68,z,.055,.72,.72,cream);
  }
  for(const x of [14.65,16.05]) {
    box(harbor,x,1.78,4.8,.12,2.1,.12,dark);
    box(harbor,x,1.78,5.65,.12,2.1,.12,dark);
  }
  for(let i=0;i<7;i++)box(harbor,14.5+i*.27,2.85,5.35,.27,.14,1.5,i%2?cream:blue);
  for(const z of [-.8,1.5,3.5]) {
    box(harbor,18.2,.96,z,.22,.44,.22,'#635e52');
    for(let i=0;i<8;i++){const a=i*Math.PI/4;box(harbor,17.9+Math.cos(a)*.23,.82,z+Math.sin(a)*.23,.13,.055,.13,'#c4b08b');}
    box(harbor,18.44,.23,z,.18,.55,.45,'#3e4b4c');
  }
  const glow=new THREE.MeshStandardMaterial({color:'#ffe1a1',emissive:'#ffa94f',emissiveIntensity:1.8});materials.push(glow);
  const lanterns:THREE.PointLight[]=[];
  for(const [x,z] of [[18,5.45],[16.35,.2],[17.6,-2.45]]) {
    box(harbor,x,1.6,z,.12,1.8,.12,dark);box(harbor,x,2.63,z,.4,.12,.4,dark);
    const lamp=new THREE.Mesh(geometry,glow);lamp.position.set(x,2.38,z);lamp.scale.set(.23,.35,.23);harbor.add(lamp);
    const light=new THREE.PointLight('#ffcc83',0,6,2);light.position.copy(lamp.position);harbor.add(light);lanterns.push(light);
  }

  const ship=group('merchant-trading-ship');
  // Larger than the fishing boat, with a cabin, square sail and deck cargo.
  for(let i=-7;i<=7;i++) {
    const width=2.45-Math.pow(Math.abs(i)/7,3)*1.5;
    box(ship,0,.6,i*.43,width,1.3,.44,dark);
    box(ship,0,1.3,i*.43,width-.12,.14,.44,'#bf9b69');
    for(const side of [-1,1])box(ship,side*width/2,1.49,i*.43,.13,.38,.43,blue);
  }
  box(ship,0,1.9,-1.65,1.5,1.1,1.6,'#876c50');
  box(ship,0,2.5,-1.65,1.85,.16,1.9,blue);
  box(ship,0,2.05,-.81,.88,.42,.06,'#b9d3d1');
  box(ship,0,3,.35,.14,3.8,.14,dark);
  box(ship,0,4.35,.35,3.5,.13,.13,wood);
  const sail=group('merchant-sail');ship.add(sail);sail.position.set(0,0,0);
  for(let i=0;i<9;i++) {
    const x=(i-4)*.36;
    box(sail,x,3.48,.43+Math.cos(x)*.14,.365,1.6,.1,i%3===0?'#76a1ab':'#e6d8b6');
  }
  box(ship,.42,4.91,.35,.85,.34,.07,'#d6a651');
  for(const [x,z] of [[-.55,1.5],[.55,1.5],[-.55,2.25],[.55,2.25]]) {
    box(ship,x,1.65,z,.62,.64,.62,'#b58d52');box(ship,x,1.98,z,.08,.035,.68,cream);
  }
  // Helmsman, kept in the same proportions as the existing island residents.
  box(ship,.42,1.61,-2.5,.28,.48,.3,'#414a59');
  box(ship,.42,2.08,-2.5,.45,.52,.33,'#7e4150');
  box(ship,.42,2.53,-2.5,.38,.38,.35,'#c99369');
  box(ship,.42,2.77,-2.5,.51,.14,.44,'#5d4e38');
  // A dockside winch makes unloading part of the harbor, with a moving hoist rope.
  box(harbor,17.85,2.15,-.7,.2,2.8,.2,dark);
  box(harbor,19,3.57,-.7,3,.18,.18,wood);
  box(harbor,17.85,1.2,-.7,.48,.3,.45,dark);
  const hoist=group('trade-hoist-rope');box(hoist,0,-.5,0,.045,1,.045,'#c4b08b');
  const cargoLift=group('trade-cargo-transfer');
  box(cargoLift,0,0,0,.65,.6,.65,'#ae8150');box(cargoLift,0,.32,0,.08,.06,.72,cream);

  // Wide flat dashes sit just above wave crests, rather than disappearing in water.
  const routeGeometry=new THREE.PlaneGeometry(.14,.65);routeGeometry.rotateX(-Math.PI/2);
  const routeMaterial=new THREE.MeshBasicMaterial({color:'#ffffff',transparent:true,opacity:.48,depthWrite:false,toneMapped:false});materials.push(routeMaterial);
  const transform=new THREE.Object3D();
  const markRoute=(curve:THREE.CatmullRomCurve3,name:string)=>{
    const count=Math.ceil(curve.getLength()/1.5);
    const marks=new THREE.InstancedMesh(routeGeometry,routeMaterial,count);
    marks.name=name;marks.renderOrder=3;marks.frustumCulled=false;root.add(marks);meshes.push(marks);
    for(let i=0;i<count;i++) {
      const u=(i+.5)/count,p=curve.getPointAt(u),t=curve.getTangentAt(u);
      transform.position.set(p.x,islandLayout.seaLevel+.27,p.z);
      transform.rotation.set(0,Math.atan2(t.x,t.z),0);transform.scale.set(1,1,1);transform.updateMatrix();marks.setMatrixAt(i,transform.matrix);
    }
  };
  markRoute(tradeRoute,'white-dashed-trade-route');
  markRoute(new THREE.CatmullRomCurve3(islandLayout.shipRoute.map(p=>new THREE.Vector3(...p as [number,number,number])),true,'centripetal'),'white-dashed-pirate-route');

  const cave=group('coastal-mushroom-cave');
  const floor=caveLayout.floor;
  // The terrain module cuts the interior; these blocks form the mouth and tidal ledge.
  box(cave,15,floor-.13,-7.95,3.6,.26,1.3,'#69797b');
  box(cave,15,floor+.025,-8.4,2.95,.05,2.8,'#354e65');
  for(const side of [-1,1])for(let i=0;i<4;i++) {
    box(cave,15+side*(1.55-i*.045),floor+.29+i*.59,-8.05,.62,.61,.85,i%2?'#7b8688':'#64737b');
  }
  box(cave,15,2.58,-8.28,2.65,.58,1.08,'#7c8787');
  box(cave,15,2.93,-8.4,1.65,.16,.85,'#8e9a8b');
  box(cave,15,1.22,-10.49,3,1.88,.03,'#192735');
  const mushroomGlow=new THREE.MeshStandardMaterial({color:'#3a91e1',emissive:'#168fea',emissiveIntensity:.7,roughness:.65});materials.push(mushroomGlow);
  const luminous=group('glowing-mushroom-caps');
  const mushroomPositions=[[14,-8.15,.8],[16,-8.55,1.1],[14.2,-9.4,.55],[15.55,-9.7,.72],[16.35,-7.65,.4],[13.8,-7.55,.35],[14.65,-10,.42]];
  for(const [x,z,height] of mushroomPositions) {
    box(cave,x,floor+height/2,z,.13,height,.13,'#88b8bf');
    box(luminous,x,floor+height,z,height*.9,.15,height*.75,'#52a6f6');
    box(luminous,x,floor+height+.12,z,height*.65,.12,height*.52,'#559dff');
    for(const dx of [-.17,.13])box(cave,x+dx*height,floor+height+.19,z+.1*height,.07,.045,.07,'#b5efff');
    for(let j=0;j<3;j++)box(cave,x-.2+j*.2,floor+.08,z+.22,.06,.16,.055,'#478295');
  }
  // Terraria's Glowing Snail lives in the glowing mushroom biome.
  // https://terraria.wiki.gg/wiki/Glowing_Snail
  const snail=group('terraria-glowing-snail');
  box(snail,0,.12,0,1.06,.22,.38,'#65becb');
  box(snail,-.13,.48,0,.63,.62,.5,'#2355aa');
  box(snail,-.13,.48,.265,.43,.4,.045,'#619ae9');
  box(snail,-.13,.5,.295,.22,.2,.035,'#273f85');
  box(snail,-.11,.49,.32,.09,.09,.025,'#a0eaff');
  box(snail,.43,.25,0,.27,.25,.32,'#7ad0d8');
  for(const z of [-.11,.11]) {box(snail,.49,.47,z,.06,.28,.055,'#8ce9e6');box(snail,.51,.62,z,.09,.07,.08,'#ddfaff');}
  const caveLight=new THREE.PointLight('#429cff',3.5,7,2);caveLight.position.set(15,1.25,-8.1);root.add(caveLight);
  const spores=group('cave-spores');
  for(let i=0;i<16;i++)box(spores,14+((i*7)%13)/6,floor+.3+(i%5)*.24,-8.2-((i*3)%7)*.22,.045,.045,.045,'#7cc9ff');

  for(const [g,blocks] of batches) {
    const mat=g===luminous?mushroomGlow:new THREE.MeshStandardMaterial({roughness:.8});
    if(g!==luminous)materials.push(mat);
    const mesh=new THREE.InstancedMesh(geometry,mat,blocks.length);
    blocks.forEach((b,i)=>{transform.position.fromArray(b.p);transform.rotation.set(0,0,0);transform.scale.fromArray(b.s);transform.updateMatrix();mesh.setMatrixAt(i,transform.matrix);mesh.setColorAt(i,new THREE.Color(b.c));});
    mesh.castShadow=true;mesh.receiveShadow=true;g.add(mesh);meshes.push(mesh);
  }
  const facing=(u:number,incoming:boolean)=>{
    const t=tradeRoute.getTangentAt(u);return Math.atan2(t.x,t.z)+(incoming?Math.PI:0);
  };
  // Extend the timetable with the route so the longer coastal passage stays unhurried.
  const arrival=tradeRoute.getLength()/1.65,departure=arrival+16,offshore=departure+tradeRoute.getLength()/1.5;
  const update=(time:number,night:number)=>{
    const cycle=(time+arrival*.65)%(offshore+16);
    // Arrival, unload, gradual turn, departure, then a quiet offshore interval.
    const incoming=cycle<arrival,moored=cycle>=arrival&&cycle<departure,outgoing=cycle>=departure&&cycle<offshore;
    const progress=incoming?1-cycle/arrival:moored?0:outgoing?(cycle-departure)/(offshore-departure):1;
    const p=tradeRoute.getPointAt(THREE.MathUtils.clamp(progress,0,1));
    ship.position.set(p.x,islandLayout.seaLevel+Math.sin(time*1.7)*.04,p.z);
    const routeAngle=facing(progress,incoming);
    const shortestAngle=Math.atan2(Math.sin(routeAngle),Math.cos(routeAngle));
    ship.rotation.set(Math.sin(time)*.014,moored?0:shortestAngle*THREE.MathUtils.smoothstep(progress*tradeRoute.getLength(),0,6),Math.sin(time*.8)*.014);
    ship.visible=cycle<offshore;
    ship.userData.phase=incoming?'arriving':moored?'trading':outgoing?'departing':'offshore';
    const transfer=(cycle-arrival-2)/6;
    cargoLift.visible=cycle>=arrival+2&&cycle<=arrival+8;
    cargoLift.position.set(THREE.MathUtils.lerp(20.3,17.4,Math.max(0,Math.min(1,transfer))),1.25+Math.sin(Math.max(0,Math.min(1,transfer))*Math.PI),-.7);
    hoist.visible=cargoLift.visible;hoist.position.set(cargoLift.position.x,3.48,-.7);hoist.scale.y=Math.max(.1,3.18-cargoLift.position.y);
    lanterns.forEach(l=>l.intensity=night*5);glow.emissiveIntensity=1+night*1.5;
    snail.position.set(15+Math.sin(time*.18)*.62,floor+.035,-7.9+Math.cos(time*.18)*.12);
    snail.rotation.y=Math.atan2(.12*Math.sin(time*.18),.62*Math.cos(time*.18));
    spores.position.y=Math.sin(time*.6)*.12;
    mushroomGlow.emissiveIntensity=.65+Math.sin(time*.8)*.08+night*.2;
  };
  update(0,0);
  return {update,dispose(){root.removeFromParent();meshes.forEach(m=>m.dispose());geometry.dispose();routeGeometry.dispose();materials.forEach(m=>m.dispose());}};
}
