import {build} from 'esbuild';

const result=await build({stdin:{contents:`
import assert from 'node:assert/strict';
import * as THREE from 'three';
import {createLifeTree} from './src/components/home/lifeTree';
import {createStardustDragon} from './src/components/home/stardustDragon';
import {buildHabitat} from './src/components/home/coastalScene';
import {groundHeight,isLand,islandLayout,terrainCells} from './src/components/home/islandTerrain';

const scene=new THREE.Scene(),grove=createLifeTree(scene),dragon=createStardustDragon(scene);
const tree=scene.getObjectByName('giant-life-tree')!,dryad=scene.getObjectByName('terraria-dryad')!;
const crown=scene.getObjectByName('life-tree-canopy')!,garden=islandLayout.dryadGarden;
scene.updateMatrixWorld(true);
const treeBounds=new THREE.Box3().setFromObject(tree),base=groundHeight(-4,-11);
assert.equal(terrainCells.length,847,'Existing shoreline and area retained');
assert(treeBounds.max.y-base>11.5&&treeBounds.max.y-base<=12.01,'Twelve-unit tree');
const matrix=new THREE.Matrix4(),unit=new THREE.Box3(new THREE.Vector3(-.5,-.5,-.5),new THREE.Vector3(.5,.5,.5));
const boxes=(group:THREE.Object3D)=>{const result:THREE.Box3[]=[];group.traverse(o=>{
  if(o instanceof THREE.InstancedMesh)for(let i=0;i<o.count;i++){
    o.getMatrixAt(i,matrix);result.push(unit.clone().applyMatrix4(matrix.clone().premultiply(o.matrixWorld)));
  }
});return result;};
const crownBoxes=boxes(crown);
let radius=0;
for(const b of crownBoxes)for(const x of [b.min.x,b.max.x])for(const z of [b.min.z,b.max.z]){
  radius=Math.max(radius,Math.hypot(x+4,z+11));assert(isLand(x,z),'Canopy remains inland');
}
assert(radius<=3.4,'Canopy radius');
const hollowRay=new THREE.Raycaster(new THREE.Vector3(-4+3/Math.sqrt(2),base+1,-11+3/Math.sqrt(2)),new THREE.Vector3(-1,0,-1).normalize(),0,2.8);
assert.equal(hollowRay.intersectObject(tree,true).length,0,'Open southeast hollow');
const roots=scene.userData.lifeTree.roots as THREE.Box3[];
for(const b of roots){const p=b.getCenter(new THREE.Vector3());assert(Math.abs(b.min.y-groundHeight(p.x,p.z))<1e-5,'Grounded roots');}
const phaseSet=new Set<string>();let maxStep=0,last:THREE.Vector3|undefined,minDragonGap=Infinity;
const staticBoxes=[...boxes(tree),...roots,...boxes(scene.getObjectByName('dryad-garden-plants')!)];
for(let i=0;i<=960;i++){
  const t=i*.05;grove.update(t,(1-Math.cos(t/45*Math.PI*2))/2);scene.updateMatrixWorld(true);
  const p=dryad.position,b=new THREE.Box3().setFromObject(dryad);phaseSet.add(dryad.userData.phase);
  assert.equal(p.y,groundHeight(p.x,p.z),'Dryad grounded');
  assert(Math.abs(p.x-garden.x)<.6&&Math.abs(p.z-garden.z)<.4,'Garden-only patrol');
  const nearby=staticBoxes.filter(other=>b.intersectsBox(other));
  const collision=nearby.length?nearby.find(other=>boxes(dryad).some(part=>part.intersectsBox(other))):undefined;
  assert(!collision,'Patrol clears tree, roots and flowers at '+t+': '+JSON.stringify({actor:b,obstacle:collision}));
  if(last)maxStep=Math.max(maxStep,last.distanceTo(p));last=p.clone();
}
assert.deepEqual([...phaseSet].sort(),['blessing','resting','walking']);assert(maxStep<.05,'Continuous walk');
const leaves=scene.getObjectByName('dryad-windblown-leaves') as THREE.InstancedMesh;
const leafPoint=new THREE.Vector3();let previousAngle:number|undefined,leafTurns=0;
for(let t=0;t<=8;t+=.05){
  grove.update(t,0);
  for(let i=0;i<leaves.count;i++){
    leaves.getMatrixAt(i,matrix);assert(matrix.elements.every(Number.isFinite),'Finite leaf transforms');
    leafPoint.setFromMatrixPosition(matrix).sub(dryad.position);
    const radius=Math.hypot(leafPoint.x,leafPoint.z);
    assert(radius>.65&&radius<1.8&&leafPoint.y>.2&&leafPoint.y<3.2,'Leaves remain around the moving Dryad');
    if(i===0){const angle=Math.atan2(leafPoint.z,leafPoint.x);
      if(previousAngle!==undefined)leafTurns+=Math.atan2(Math.sin(angle-previousAngle),Math.cos(angle-previousAngle));previousAngle=angle;
    }
  }
}
assert(leafTurns>Math.PI*2,'Leaves complete a full orbit, rather than only drifting');
for(let t=0;t<=34;t+=.1){
  dragon.update(t,0);scene.updateMatrixWorld(true);
  for(const b of boxes(scene.getObjectByName('stardust-dragon-segments')!)){
    const gap=Math.hypot(Math.max(0,treeBounds.min.x-b.max.x,b.min.x-treeBounds.max.x),Math.max(0,treeBounds.min.y-b.max.y,b.min.y-treeBounds.max.y),Math.max(0,treeBounds.min.z-b.max.z,b.min.z-treeBounds.max.z));
    minDragonGap=Math.min(minDragonGap,gap);
  }
}
assert(minDragonGap>=1,'Entire dragon clears the tree by one unit');
const all=new THREE.Scene();all.add(new THREE.HemisphereLight(),new THREE.DirectionalLight());
const habitat=buildHabitat(all);habitat.setReducedMotion(true);habitat.update(8);
const still=all.getObjectByName('terraria-dryad')!,pose=still.position.clone();habitat.update(22);
assert(still.position.equals(pose)&&still.userData.phase==='resting','Reduced motion stationary');
habitat.setReducedMotion(false);habitat.update(10);assert.equal(still.userData.phase,'walking');habitat.dispose();
let disposed=0;const geometries=new Set<THREE.BufferGeometry>(),materials=new Set<THREE.Material>();
scene.getObjectByName('life-tree-grove')!.traverse(o=>{if(o instanceof THREE.Mesh){geometries.add(o.geometry);for(const m of Array.isArray(o.material)?o.material:[o.material])materials.add(m);}});
for(const resource of [...geometries,...materials])resource.addEventListener('dispose',()=>disposed++);
grove.dispose();assert.equal(disposed,geometries.size+materials.size,'All grove GPU resources released');
assert(!scene.getObjectByName('life-tree-grove'));dragon.dispose();
console.log(JSON.stringify({height:treeBounds.max.y-base,canopyRadius:radius,canopyVoxels:crownBoxes.length,phases:[...phaseSet],maxStep,minDragonGap,leafOrbits:leafTurns/(Math.PI*2),disposed},null,2));
`,resolveDir:process.cwd(),loader:'ts'},bundle:true,platform:'node',format:'esm',write:false});
try{await import('data:text/javascript;base64,'+Buffer.from(result.outputFiles[0].text).toString('base64'));}
catch(error){console.error(error.message);process.exitCode=1;}
