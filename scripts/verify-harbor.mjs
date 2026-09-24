import { build } from 'esbuild';

const result=await build({stdin:{contents:`
import assert from 'node:assert/strict';
import * as THREE from 'three';
import {buildHabitat} from './src/components/home/coastalScene';
import {tradeRoute} from './src/components/home/harborAndCave';
import {terrainCells,caveLayout,islandLayout} from './src/components/home/islandTerrain';
const scene=new THREE.Scene();scene.add(new THREE.HemisphereLight(),new THREE.DirectionalLight());
const habitat=buildHabitat(scene);
const ship=scene.getObjectByName('merchant-trading-ship')!,pirate=scene.getObjectByName('pirate-ship')!;
const terrain=scene.getObjectByName('unified-island-terrain')!;
const angler=scene.getObjectByName('terraria-angler')!,snail=scene.getObjectByName('terraria-glowing-snail')!;
const decks=[[14.3,18.4,4,5.8],[14.3,15.4,5.8,5.9],[16.2,18.4,-1.9,4],[13.6,18.4,-3,-1.9]];
let minShore=Infinity,minPirate=Infinity,maxJump=0;let previous:THREE.Vector3|undefined;
const phases=new Set();
for(let step=0;step<=2000;step++) {
  const time=step*.2;habitat.update(time);scene.updateMatrixWorld(true);
  assert(angler.position.z>=6.7,'Daily catch remains at the harbor');
  assert(snail.position.y>=caveLayout.floor,'Snail stays on the cave floor');
  phases.add(ship.userData.phase);
  if(ship.visible) {
    if(previous)maxJump=Math.max(maxJump,ship.position.distanceTo(previous));
    previous=ship.position.clone();minPirate=Math.min(minPirate,ship.position.distanceTo(pirate.position));
    for(let z=-3;z<=3;z+=.5)for(const side of [-1,1]) {
      const width=2.45-Math.pow(Math.abs(z)/3.01,3)*1.5;
      const p=ship.localToWorld(new THREE.Vector3(side*width/2,.65,z));
      for(const c of terrainCells)minShore=Math.min(minShore,Math.hypot(p.x-c.x,p.z-c.z)-.71);
      assert(!decks.some(([x0,x1,z0,z1])=>p.x>x0&&p.x<x1&&p.z>z0&&p.z<z1),'Trade hull hits pier');
    }
  } else previous=undefined;
  for(let x=-2.7;x<=2.7;x+=.45)for(const side of [-1,1]) {
    const beam=1.85-Math.pow(Math.abs(x)/3,3)*1.3;
    const p=pirate.localToWorld(new THREE.Vector3(x,.5,side*beam/2));
    assert(!decks.some(([x0,x1,z0,z1])=>p.x>x0&&p.x<x1&&p.z>z0&&p.z<z1),'Pirate hull hits expanded pier');
  }
}
assert(minShore>2,'Trader clears coastline');assert(minPirate>7,'Trader clears pirate route');assert(maxJump<.4,'Continuous sailing');
for(const phase of ['arriving','trading','departing','offshore'])assert(phases.has(phase),phase);
const ray=new THREE.Raycaster(new THREE.Vector3(15,1.3,-7),new THREE.Vector3(0,0,-1));
const wall=ray.intersectObject(terrain)[0];assert(wall&&wall.point.z<=-10.4,'Cave is open through the terrain');
const dashes=scene.getObjectByName('white-dashed-trade-route') as THREE.InstancedMesh;
assert(dashes.count>60,'Coastal trade route is extended');
const matrix=new THREE.Matrix4(),point=new THREE.Vector3();
for(let i=0;i<dashes.count;i++){dashes.getMatrixAt(i,matrix);point.setFromMatrixPosition(matrix);const expected=tradeRoute.getPointAt((i+.5)/dashes.count);assert(Math.hypot(point.x-expected.x,point.z-expected.z)<.001,'Dashes follow the actual sailing route');}
assert(scene.getObjectByName('white-dashed-pirate-route'),'Pirate route markers');assert(dashes.renderOrder>2,'Route visible above transparent water');
assert.equal(islandLayout.anglerRoute.at(-1)![0],6.5);
console.log(JSON.stringify({minShore,minPirate,maxJump,caveBackWall:wall.point.z,phases:[...phases]},null,2));
habitat.dispose();
`,resolveDir:process.cwd(),loader:'ts'},bundle:true,platform:'node',format:'esm',write:false});
await import('data:text/javascript;base64,'+Buffer.from(result.outputFiles[0].text).toString('base64'));
