import {build} from 'esbuild';
const result=await build({stdin:{contents:`
import assert from 'node:assert/strict';
import * as THREE from 'three';
import {buildHabitat} from './src/components/home/coastalScene';
import {terrainCells,isLand} from './src/components/home/islandTerrain';
const scene=new THREE.Scene();scene.add(new THREE.HemisphereLight(),new THREE.DirectionalLight());
const habitat=buildHabitat(scene);habitat.update(0);
assert.equal(scene.userData.farmBeds.length,9,'9 crop beds');
const ecology=scene.userData.ecology;
assert.equal(ecology.trees.filter(p=>p.kind==='tree').length,8,'8 broadleaf trees');assert.equal(ecology.trees.filter(p=>p.kind==='palm').length,3,'3 palms');
for(const [kind,count] of [['grass',40],['shrub',12],['flower',8]])assert.equal(ecology.clutter.filter(p=>p.kind===kind).length,count,kind);
const edge=terrainCells.filter(c=>[[1,0],[-1,0],[0,1],[0,-1]].some(([dx,dz])=>!isLand(c.x+dx,c.z+dz)));
for(const tree of ecology.trees)assert(Math.min(...edge.map(c=>Math.hypot(c.x-tree.x,c.z-tree.z)))-.5>=3,'Tree shore margin');
const fishery=habitat.fishery;fishery.collect();assert.equal(fishery.getState().notice,'empty');
let timestamp=0,maxJump=0,minCoast=Infinity,minPirate=Infinity;
const actor=scene.getObjectByName('terraria-angler')!,phases=new Set();
for(const initial of [0,6.7,9.3,12.1]) {
  timestamp+=initial;habitat.update(timestamp);fishery.start();fishery.start();
  let previous=actor.position.clone();
  for(let i=0;i<1600;i++) {
    timestamp+=.05;habitat.update(timestamp);scene.updateMatrixWorld(true);
    const state=fishery.getState();phases.add(state.phase);
    if(['approaching','boarding','unloading'].includes(state.phase)) {
      // Actor body/feet clearance against the working platform's physical props.
      const body=new THREE.Box3().setFromCenterAndSize(actor.position.clone().add(new THREE.Vector3(0,.28,0)),new THREE.Vector3(.45,1.45,.45));
      const names=['fishery-sorting-table','fishery-barrel','fishery-drying-net','fishery-lantern'];
      scene.children.filter(o=>names.includes(o.name)).forEach(o=>assert(!body.intersectsBox(new THREE.Box3().setFromObject(o)),'Harbor walking clearance: '+o.name));
    }
    maxJump=Math.max(maxJump,previous.distanceTo(actor.position));previous.copy(actor.position);
    const boat=scene.getObjectByName('fishery-boat')!,pirate=scene.getObjectByName('pirate-ship')!;
    for(const c of edge)minCoast=Math.min(minCoast,Math.hypot(c.x-boat.position.x,c.z-boat.position.z)-.71);
    minPirate=Math.min(minPirate,Math.hypot(pirate.position.x-boat.position.x,pirate.position.z-boat.position.z));
    if(state.phase==='ready')break;
  }
  assert.equal(fishery.getState().pending,5);const total=fishery.getState().total;
  fishery.start();assert.equal(fishery.getState().phase,'ready');fishery.collect();fishery.collect();assert.equal(fishery.getState().total,total+5,'One award per trip');
}
assert(maxJump<.5,'Continuous actor movement: '+maxJump);assert(minCoast>2.3,'Boat shoreline clearance');assert(minPirate>5.5,'Fishing and pirate vessel separation');
for(const phase of ['approaching','boarding','departing','casting','waiting','hauling','returning','unloading','ready'])assert(phases.has(phase),phase);
fishery.start(true);assert.equal(fishery.getState().pending,5);fishery.collect();
fishery.start();timestamp+=10;habitat.update(timestamp);fishery.setReduced();assert.equal(fishery.getState().phase,'ready');fishery.collect();
const before=fishery.getState().total;habitat.update(timestamp);assert.equal(fishery.getState().total,before);
console.log(JSON.stringify({trees:ecology.trees.length,clutter:ecology.clutter.length,maxJump,minCoast,minPirate,total:before,phases:[...phases]},null,2));habitat.dispose();
`,resolveDir:process.cwd(),loader:'ts'},bundle:true,platform:'node',format:'esm',write:false});
await import('data:text/javascript;base64,'+Buffer.from(result.outputFiles[0].text).toString('base64'));
