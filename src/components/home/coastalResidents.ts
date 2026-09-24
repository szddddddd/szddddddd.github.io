import * as THREE from 'three';
import { islandLayout, groundHeight } from './islandTerrain';
import { createPastureAndCombat } from './pastureAndCombat';

// Procedural voxel fan art inspired by Terraria; no game textures are loaded.
export function createCoastalResidents(scene: THREE.Scene, pirateShip: THREE.Group) {
  const cube = new THREE.BoxGeometry(1, 1, 1);
  const surface = new THREE.MeshStandardMaterial({ roughness: .85 });
  type Block = { position: number[]; size: number[]; color: string };
  const batches = new Map<THREE.Group, Block[]>();
  const instances: THREE.InstancedMesh[] = [];
  const box = (parent: THREE.Group, x: number, y: number, z: number, w: number, h: number, d: number, color: string) => {
    if (!batches.has(parent)) batches.set(parent, []);
    batches.get(parent)!.push({ position: [x, y, z], size: [w, h, d], color });
  };
  const group = (name: string, x: number, y: number, z: number) => {
    const root = new THREE.Group();
    root.name = name;
    root.position.set(x, y, z);
    scene.add(root);
    return root;
  };
  const skin = '#e3b18b', dark = '#302a30', wood = '#906242';
  // These residents face +Z. Their feet stay planted while heads and arms move.
  const person = (name: string, x: number, y: number, z: number, shirt: string, pants: string) => {
    const root = group(name, x, y, z);
    const legs = [-1, 1].map(side => {
      const leg = new THREE.Group(); leg.position.set(side*.14,.6,0); root.add(leg);
      box(leg, 0, -.51, .05, .24, .18, .4, '#493c35');
      box(leg, 0, -.22, 0, .21, .44, .25, pants);
      return leg;
    });
    box(root, 0, .88, 0, .52, .6, .34, shirt);
    box(root, 0, .61, .015, .54, .09, .37, '#654632');
    const head = new THREE.Group(); head.position.y = 1.4; root.add(head);
    box(head, 0, 0, 0, .42, .42, .38, skin);
    for (const side of [-1, 1]) box(head, side*.1, .025, .2, .055, .06, .025, dark);
    box(head, 0, -.13, .2, .13, .025, .025, '#a06c50');
    const arms = [-1, 1].map(side => {
      const arm = new THREE.Group(); arm.position.set(side*.34, 1.12, 0); root.add(arm);
      box(arm, 0, -.13, 0, .2, .28, .25, shirt);
      box(arm, 0, -.36, 0, .16, .22, .19, skin);
      return arm;
    });
    return { root, head, arms, legs };
  };

  // Open-front general store shares the village terrace and entrance path.
  const shopPad=islandLayout.pads.find(p=>p.name==='merchant-shop')!;
  const shop=group('merchant-general-store',shopPad.x,groundHeight(shopPad.x,shopPad.z),shopPad.z);
  box(shop,0,.1,0,3.4,.2,3.2,wood);
  box(shop,0,.08,1.75,3.4,.16,.5,'#b99b71');
  box(shop,0,1.42,-1.48,3.3,2.45,.15,'#c5b78e');
  for(const side of [-1,1]) {
    box(shop,side*1.62,1.42,-.35,.15,2.45,2.3,'#c5b78e');
    for(const z of [-1.48,1.45])box(shop,side*1.55,1.5,z,.16,2.65,.16,'#69503b');
    box(shop,side*1.71,1.6,-.55,.08,.84,.86,'#68543f');
    box(shop,side*1.76,1.6,-.55,.03,.65,.66,'#a9c7bc');
  }
  for(let i=0;i<6;i++)box(shop,0,2.82+i*.14,-.45,3.8,.17,2.95-i*.46,i%2?'#937549':'#7d6241');
  // Cream and moss striped canopy marks the shop while leaving the merchant visible.
  for(let i=0;i<9;i++) {
    box(shop,-1.6+i*.4,2.62,1.2,.4,.12,1.25,i%2?'#7d9561':'#ddd0a4');
    box(shop,-1.6+i*.4,2.5,1.82,.4,.22,.08,i%2?'#7d9561':'#ddd0a4');
  }
  box(shop,-.45,.58,.97,1.85,.76,.58,'#825b3c');
  box(shop,-.45,1,.97,2,.12,.72,'#c49c68');
  for(const y of [.48,1.12,1.76])box(shop,0,y,-1.14,2.65,.09,.46,'#87613f');
  for(const x of [-1.34,1.34])box(shop,x,1.14,-1.17,.1,1.9,.46,'#69503b');
  // Bottled supplies, books, rope, a chest and coins reference the Merchant's wares.
  for(let row=0;row<3;row++)for(let i=0;i<5;i++) {
    const x=-1.05+i*.5,y=.67+row*.64;
    if((i+row)%2===0) {
      box(shop,x,y,-1.12,.17,.28,.18,['#b56c61','#83b5ad','#c6a358'][row]);
      box(shop,x,y+.17,-1.12,.09,.08,.1,'#bfa176');
    } else for(let j=0;j<3;j++)box(shop,x-.1+j*.09,y,-1.12,.075,.31,.24,j%2?'#729087':'#a87e63');
  }
  box(shop,-1.05,1.22,.95,.48,.32,.35,'#a67b43');
  for(const x of [-1.19,-.91])box(shop,x,1.22,1.135,.045,.34,.03,'#dab96d');
  for(let i=0;i<3;i++)box(shop,.03+i*.14,1.085+i*.025,1.06,.12,.05,.12,'#e0bc60');
  for(let i=0;i<8;i++){const a=i*Math.PI/4;box(shop,.99+Math.cos(a)*.19,.29,1.01+Math.sin(a)*.17,.1,.13,.1,'#c5af7f');}
  box(shop,1.12,.45,-.27,.55,.5,.55,'#997345');
  box(shop,1.12,.73,-.27,.6,.07,.6,'#b2915d');
  // Hanging coin sign beside the clear eastern entrance.
  box(shop,1.7,2.13,1.43,.63,.08,.1,'#715239');
  box(shop,1.97,1.86,1.43,.045,.5,.045,'#715239');
  box(shop,1.97,1.54,1.43,.6,.51,.1,'#69503b');
  box(shop,1.97,1.54,1.49,.32,.32,.035,'#dfb863');
  box(shop,1.97,1.54,1.515,.07,.23,.02,'#a97e38');
  const merchant=person('terraria-merchant',-.35,.2,.21,'#936946','#716552');
  shop.add(merchant.root);merchant.root.userData.character='terraria-merchant';
  box(merchant.root,0,.93,.19,.2,.48,.035,'#e5d5b7');
  for(const x of [-.22,.22])box(merchant.root,x,.9,.18,.12,.57,.055,'#795338');
  for(const y of [.8,.98])box(merchant.root,.13,y,.215,.04,.04,.025,'#d6b46e');
  box(merchant.root,.15,.66,.23,.2,.17,.1,'#604731');
  // Receding grey hair, heavy brows and a full white beard distinguish the older NPC.
  box(merchant.head,0,.08,-.2,.45,.35,.09,'#b5b5a6');
  for(const side of [-1,1]) {
    box(merchant.head,side*.22,.03,-.025,.09,.33,.35,'#d0cdbc');
    box(merchant.head,side*.1,.09,.215,.14,.045,.025,'#d8d3be');
    box(merchant.head,side*.1,-.08,.23,.15,.075,.07,'#e5dfc9');
  }
  box(merchant.head,0,-.2,.17,.4,.22,.24,'#e5dfc9');
  box(merchant.head,0,-.34,.17,.26,.1,.19,'#cbc8b5');
  box(merchant.head,0,-.015,.23,.09,.12,.08,skin);
  const shopLampMaterial=new THREE.MeshStandardMaterial({color:'#ffe0a5',emissive:'#ffbd68',emissiveIntensity:1});
  const shopLamp=new THREE.Mesh(cube,shopLampMaterial);shopLamp.position.set(-1.43,2.05,1.4);shopLamp.scale.set(.18,.28,.18);shop.add(shopLamp);
  box(shop,-1.43,2.24,1.4,.28,.08,.28,'#5c5140');
  const shopLight=new THREE.PointLight('#ffcc88',0,5,2);shopLight.position.set(0,1.8,1.1);shop.add(shopLight);

  const salon = group('stylist-salon', -9.8, .03, 8.5);
  box(salon,0,.1,0,3.4,.2,3.3,wood);
  box(salon,0,.16,1.8,3.4,.1,.6,'#b99571');
  box(salon,0,1.45,-1.5,3.2,2.5,.16,'#e0b8aa');
  for(const side of [-1,1]) {
    box(salon,side*1.55,1.45,0,.16,2.5,3.1,'#e0b8aa');
    box(salon,side*1.5,1.5,1.5,.18,2.65,.18,'#78544e');
    box(salon,side*1.65,1.55,0,.06,1.05,1.1,'#78544e');
    box(salon,side*1.69,1.55,0,.035,.83,.88,'#a6d5d1');
  }
  // Open shopfront, a mirror, styling chair and a striped barber pole.
  box(salon,-.65,1.65,-1.37,1.15,1.35,.09,'#845b4f');
  box(salon,-.65,1.65,-1.3,.94,1.12,.025,'#b5dedb');
  box(salon,-.65,.88,-1.02,1.5,.12,.6,wood);
  box(salon,-.5,.53,.2,.7,.14,.7,'#a85174');
  box(salon,-.5,.88,-.1,.7,.7,.13,'#a85174');
  box(salon,-.5,.29,.2,.14,.42,.14,'#6e7b7e');
  box(salon,-.5,.14,.2,.65,.08,.55,'#6e7b7e');
  for(let i=0;i<9;i++) box(salon,1.65,.65+i*.16,1.6,.2,.16,.2,['#e2d9c3','#bd5166','#6eabb8'][i%3]);
  for(let i=0;i<6;i++) box(salon,0,2.82+i*.18,0,3.75,.2,3.65-i*.55,i%2?'#946d8f':'#805d81');
  box(salon,0,2.48,1.62,1.3,.42,.12,'#6b514b');
  // Pixel scissors on the shop sign.
  for(const side of [-1,1]) {
    for(let i=0;i<4;i++) box(salon,side*(.04+i*.06),2.41+i*.055,1.7,.075,.065,.03,'#eee0b8');
    box(salon,side*.16,2.36,1.7,.13,.1,.03,'#eee0b8');
  }
  const pirate = person('terraria-pirate', 2.1, .48, 0, '#345d72', '#74624d');
  pirateShip.add(pirate.root);
  pirate.root.rotation.y = Math.PI / 2;
  // Open blue coat, brass buttons, red sash, beard, eye patch and tricorn.
  box(pirate.root, 0, .9, .18, .19, .48, .035, '#e5d4b4');
  box(pirate.root, 0, .66, .2, .55, .12, .045, '#a33e36');
  for (const x of [-.2, .2]) for (const y of [.82, 1.02]) box(pirate.root, x, y, .2, .045, .045, .035, '#dbb45a');
  box(pirate.head, 0, -.18, .13, .44, .19, .24, '#74472e');
  box(pirate.head, -.1, .025, .225, .13, .09, .03, '#272831');
  box(pirate.head, 0, .07, .209, .43, .025, .025, '#272831');
  box(pirate.head, 0, .21, 0, .46, .09, .42, '#b44539');
  box(pirate.head, 0, .28, 0, .86, .12, .56, '#302e36');
  box(pirate.head, 0, .4, -.02, .48, .2, .4, '#302e36');
  for (const side of [-1, 1]) box(pirate.head, side*.32, .35, .1, .17, .17, .32, '#302e36');
  box(pirate.head, 0, .4, .19, .14, .12, .025, '#e4d8b6');
  // A brass telescope follows the waving hand.
  box(pirate.arms[1], 0, -.39, .2, .14, .14, .52, '#b69551');
  box(pirate.arms[1], 0, -.39, .48, .18, .18, .055, '#647f89');

  const bucket = group('angler-bait-bucket', 5.6, .65, 2.1);
  box(bucket, 0, .16, 0, .38, .32, .38, '#738e92');
  box(bucket, 0, .33, 0, .43, .05, .43, '#b6c8c0');
  box(bucket, 0, .36, 0, .3, .02, .3, '#425e62');

  const stylist = person('terraria-stylist', -9.35, .24, 10.1, '#e1bdba', '#765071');
  stylist.root.rotation.y = .5;
  box(stylist.root, 0, .9, .18, .35, .44, .035, '#493748');
  box(stylist.root, 0, .5, 0, .57, .34, .4, '#9c527c');
  box(stylist.head, 0, .21, -.025, .5, .18, .46, '#c75479');
  box(stylist.head, -.14, .1, .19, .25, .17, .08, '#e5799b');
  box(stylist.head, 0, -.05, -.21, .47, .53, .16, '#af456c');
  box(stylist.head, .24, .12, -.13, .2, .28, .23, '#d96a8b');
  box(stylist.head, .31, -.13, -.15, .15, .32, .18, '#c75479');
  // Scissors and a comb beside a small outdoor styling station.
  box(stylist.arms[0], -.04, -.45, .08, .035, .26, .035, '#cedad5');
  box(stylist.arms[0], .04, -.45, .08, .035, .26, .035, '#cedad5');
  const station = group('stylist-station', -10.25, .24, 10.1);
  box(station, 0, .32, 0, .1, .64, .1, wood);
  box(station, 0, .65, 0, .65, .09, .5, wood);
  box(station, 0, .09, 0, .53, .12, .4, wood);
  box(station, -.12, .8, 0, .11, .22, .11, '#9ad5cd');
  box(station, .12, .72, 0, .22, .04, .09, '#d587a5');

  for(const object of [salon,stylist.root,station])object.position.add(islandLayout.salon);
  bucket.position.add(islandLayout.dock);

  const pylon = group('ocean-pylon', -5.6, .03, 6.35);
  pylon.position.y=groundHeight(pylon.position.x,pylon.position.z);
  box(pylon, 0, .1, 0, 1.65, .2, 1.45, '#688d90');
  box(pylon, 0, .25, 0, 1.35, .13, 1.2, '#a8c4bc');
  box(pylon, 0, .5, 0, .7, .4, .66, '#607d83');
  box(pylon, 0, .75, 0, 1.02, .14, .91, '#aad2ca');
  for (const side of [-1, 1]) {
    box(pylon, side*.61, .55, 0, .2, .65, .3, '#79b7ae');
    box(pylon, side*.5, .92, 0, .25, .16, .3, '#a3d7ca');
    box(pylon, side*.63, .3, .5, .32, .22, .22, '#e8b9a3');
    box(pylon, side*.66, .45, .5, .16, .13, .15, '#f0d9be');
  }
  const crystalGeometry = new THREE.OctahedronGeometry(.62);
  const crystalMaterial = new THREE.MeshStandardMaterial({ color: '#6de7df', emissive: '#24b5c7', emissiveIntensity: .7, roughness: .25, metalness: .15, flatShading: true });
  const crystal = new THREE.Mesh(crystalGeometry, crystalMaterial);
  crystal.name = 'ocean-pylon-crystal';
  crystal.scale.set(.75, 1.55, .75);
  crystal.position.y = 1.85;
  pylon.add(crystal);
  const shardMaterial = new THREE.MeshBasicMaterial({ color: '#a4f6ee' });
  const sparks = Array.from({ length: 7 }, () => {
    const spark = new THREE.Mesh(cube, shardMaterial);
    spark.scale.setScalar(.045);
    pylon.add(spark);
    return spark;
  });
  const glow = new THREE.PointLight('#65e9df', 3, 5, 2);
  glow.position.y = 1.7; pylon.add(glow);

  const guide = person('terraria-guide', -2, .03, 7, '#709448', '#496d9e');
  box(guide.head,0,.21,0,.47,.15,.43,'#704526');
  box(guide.head,0,.03,-.2,.44,.32,.1,'#633c24');
  box(guide.head,-.12,.13,.2,.25,.13,.06,'#80512c');
  box(guide.root,.19,.94,-.24,.16,.45,.18,'#765336');
  for(const x of [.13,.2,.27])box(guide.root,x,1.28,-.24,.025,.35,.025,'#d5c093');
  guide.arms[0].rotation.x = -Math.PI/2;
  guide.arms[1].rotation.x = -Math.PI/2;
  const bow = new THREE.Group(); guide.root.add(bow); bow.position.set(-.34,1.12,.6);
  const bowPoints = Array.from({length:9},(_,i)=>{
    const y=(i-4)*.13;
    const z=.22*(1-Math.pow(y/.52,2));
    box(bow,0,y,z,.065,.145,.065,'#9c7143');
    return new THREE.Vector3(0,y,z);
  });
  const stringGeometry = new THREE.BufferGeometry().setFromPoints([bowPoints[0],new THREE.Vector3(0,0,-.2),bowPoints[8]]);
  const stringMaterial = new THREE.LineBasicMaterial({color:'#e7d7b1'});
  bow.add(new THREE.Line(stringGeometry,stringMaterial));
  const arrow = group('guide-arrow',0,0,0);
  box(arrow,0,0,0,.035,.035,.6,'#c39a61');
  box(arrow,0,0,.34,.095,.07,.14,'#b4c6c8');
  for(const side of [-1,1])box(arrow,side*.045,0,-.22,.065,.025,.14,'#e3d8b8');

  const slime = group('blue-slime',-2,.03,10);
  const slimeMaterial = new THREE.MeshStandardMaterial({color:'#3695de',emissive:'#124c87',emissiveIntensity:.22,roughness:.3,transparent:true,opacity:.86});
  for(const [y,w,h,d] of [[.2,1.15,.4,.95],[.49,.97,.23,.82],[.67,.65,.15,.57]]) {
    const layer = new THREE.Mesh(cube,slimeMaterial);
    layer.position.y=y; layer.scale.set(w,h,d); layer.castShadow=true; slime.add(layer);
  }
  for(const side of [-1,1])box(slime,side*.23,.36,-.486,.1,.12,.025,'#15334d');
  box(slime,-.24,.6,-.36,.22,.075,.03,'#9addf6');
  const slimeShadow = group('slime-landing-mark',-2,.055,10);
  box(slimeShadow,0,0,0,.9,.025,.7,'#b1aa88');
  const arrowStart = new THREE.Vector3(-2.34,1.15,7.6);
  const arrowEnd = new THREE.Vector3(-2,.48,10);
  const flightDirection = new THREE.Vector3();
  const arrowAxis = new THREE.Vector3(0,0,1);
  const archeryTarget = group('archery-target',-2,.03,12.2);
  for(const x of [-.48,.48])box(archeryTarget,x,.65,0,.12,1.3,.16,'#795639');
  box(archeryTarget,0,1.2,0,1.4,1.4,.22,'#d9cba8');
  box(archeryTarget,0,1.2,-.125,1.06,1.06,.04,'#b75b4a');
  box(archeryTarget,0,1.2,-.15,.72,.72,.025,'#e5d9b4');
  box(archeryTarget,0,1.2,-.17,.34,.34,.025,'#b75b4a');
  box(archeryTarget,0,1.2,.125,1.06,1.06,.04,'#b75b4a');
  box(archeryTarget,0,1.2,.15,.72,.72,.025,'#e5d9b4');
  box(archeryTarget,0,1.2,.17,.34,.34,.025,'#b75b4a');
  const pastureAndCombat = createPastureAndCombat(scene, pirateShip);

  // One instanced batch per articulated group keeps the added population cheap.
  const matrix = new THREE.Object3D();
  for (const [parent, blocks] of batches) {
    const mesh = new THREE.InstancedMesh(cube, surface, blocks.length);
    blocks.forEach((block, index) => {
      matrix.position.fromArray(block.position);
      matrix.scale.fromArray(block.size);
      matrix.updateMatrix();
      mesh.setMatrixAt(index, matrix.matrix);
      mesh.setColorAt(index, new THREE.Color(block.color));
    });
    mesh.castShadow = true; mesh.receiveShadow = true;
    parent.add(mesh); instances.push(mesh);
  }
  return {
    update(time: number, night: number) {
      pastureAndCombat.update(time, night);
      merchant.head.rotation.y=Math.sin(time*.45)*.2;
      merchant.arms[0].rotation.x=-.55+Math.sin(time*1.1)*.1;
      merchant.arms[1].rotation.x=-.4-Math.max(0,Math.sin(time*.5))*.7;
      merchant.arms[1].rotation.z=Math.sin(time*1.4)*.12;
      shopLight.intensity=night*7;
      shopLampMaterial.emissiveIntensity=1+night*2;
      pirate.head.rotation.y = Math.sin(time*.35)*.22;
      pirate.arms[1].rotation.x = -.7 + Math.sin(time*.8)*.18;
      stylist.head.rotation.y = -.25 + Math.sin(time*.5)*.2;
      stylist.arms[0].rotation.z = -.35 + Math.sin(time*1.7)*.16;
      // Stationary target practice; the slime watches safely outside the firing lane.
      const shot = time % 5;
      slime.position.set(-4.6,.03+Math.max(0,Math.sin(time*1.2))*.12,10.9);
      guide.root.position.set(-2,.03,9);
      guide.root.rotation.y = 0;
      slime.rotation.y = Math.PI/2;
      slimeShadow.position.set(slime.position.x,.055,slime.position.z);
      guide.legs.forEach(leg=>leg.rotation.x=0);
      const hit = shot>=2.65 && shot<3;
      slime.scale.set(1,1+Math.sin(time*1.2)*.045,1);
      slimeMaterial.emissiveIntensity = .22;
      archeryTarget.rotation.x = hit?Math.sin((shot-2.65)*35)*.035:0;
      guide.arms[1].rotation.x = -Math.PI/2 + (shot<2 ? .5*shot/2 : .05);
      const stringPositions = stringGeometry.attributes.position;
      stringPositions.setZ(1,shot<2?-.08-.22*shot/2:-.08);
      stringPositions.needsUpdate = true;
      arrow.visible = shot<2.7;
      const flight = THREE.MathUtils.clamp((shot-2)/.7,0,1);
      guide.root.updateWorldMatrix(true,true);
      arrowStart.set(0,0,-.08); bow.localToWorld(arrowStart);
      arrowEnd.set(-2,1.23,12.02);
      arrow.position.copy(arrowStart).lerp(arrowEnd,flight);
      arrow.position.y += Math.sin(flight*Math.PI)*.16;
      flightDirection.subVectors(arrowEnd,arrowStart).normalize();
      arrow.quaternion.setFromUnitVectors(arrowAxis,flightDirection);
      crystal.position.y = 1.85 + Math.sin(time*1.5)*.12;
      crystal.rotation.y = time*.4;
      crystalMaterial.emissiveIntensity = .6 + night*.8 + Math.sin(time*2)*.12;
      glow.intensity = (2 + night*4)*(1 + Math.sin(time*2)*.12);
      sparks.forEach((spark, i) => {
        const phase = (time*.16+i/7)%1;
        const angle = time*.7+i*Math.PI*2/7;
        spark.position.set(Math.cos(angle)*.85, .8+phase*1.9, Math.sin(angle)*.65);
        spark.scale.setScalar(.025+Math.sin(phase*Math.PI)*.035);
      });
    },
    dispose() {
      shopLampMaterial.dispose();
      pastureAndCombat.dispose();
      instances.forEach(mesh => mesh.dispose());
      cube.dispose(); surface.dispose(); crystalGeometry.dispose();
      crystalMaterial.dispose(); shardMaterial.dispose();
      stringGeometry.dispose(); stringMaterial.dispose(); slimeMaterial.dispose();
      [shop, salon, pirate.root, bucket, stylist.root, station, pylon, guide.root, arrow, slime, slimeShadow, archeryTarget].forEach(root => root.removeFromParent());
    },
  };
}
