import {build} from 'esbuild';

const result=await build({stdin:{contents:`
import assert from 'node:assert/strict';
import * as THREE from 'three';
import {buildHabitat} from './src/components/home/coastalScene';
import {terrainCells,originalLandArea,groundHeight,isLand,islandLayout,roadSamples} from './src/components/home/islandTerrain';
const scene=new THREE.Scene();scene.add(new THREE.HemisphereLight(),new THREE.DirectionalLight());
const habitat=buildHabitat(scene);
const keys=new Set(terrainCells.map(c=>c.x+','+c.z));const first=terrainCells[0];const visited=new Set([first.x+','+first.z]);const q=[first];
while(q.length){const c=q.pop()!;for(const [dx,dz] of [[1,0],[-1,0],[0,1],[0,-1]]){const x=c.x+dx,z=c.z+dz,k=x+','+z;if(keys.has(k)&&!visited.has(k)){visited.add(k);q.push({x,z,height:0,kind:'grass'});}}}
const route=new THREE.CatmullRomCurve3(islandLayout.shipRoute.map(p=>new THREE.Vector3(...p as [number,number,number])),true,'centripetal');
let clearance=Infinity;for(let i=0;i<=500;i++){const p=route.getPointAt(i/500);for(const c of terrainCells)clearance=Math.min(clearance,Math.hypot(p.x-c.x,p.z-c.z)-.71);}
const padIssues=islandLayout.pads.flatMap(p=>terrainCells.filter(c=>Math.abs(c.x-p.x)<=p.width/2&&Math.abs(c.z-p.z)<=p.depth/2&&Math.abs(c.height-p.height)>.001).map(c=>p.name+':'+c.x+','+c.z));
let invalid=0,horseCollision=0,obstacleCollision=0;const cycles=[];
for(let t=0;t<=95;t+=.25){habitat.update(t);scene.updateMatrixWorld(true);scene.traverse(o=>{if(!o.position.toArray().every(Number.isFinite))invalid++;});const a=new THREE.Box3().setFromObject(scene.getObjectByName('bay-horse')!),b=new THREE.Box3().setFromObject(scene.getObjectByName('cream-horse')!);if(a.intersectsBox(b))horseCollision++;
const obstacles=['farm-horse-shelter',...Array.from({length:9},(_,i)=>'pasture-fence-'+i)].filter(n=>n!=='pasture-fence-3').map(n=>new THREE.Box3().setFromObject(scene.getObjectByName(n)!));
obstacles.push(new THREE.Box3(new THREE.Vector3(-13.1,2,-2.95),new THREE.Vector3(-11.8,2.55,-2.35)),new THREE.Box3(new THREE.Vector3(-13.05,2,-1.95),new THREE.Vector3(-11.85,2.43,-1.35)));
if(obstacles.some(o=>a.intersectsBox(o)||b.intersectsBox(o)))obstacleCollision++;
if(Number.isInteger(t)&&t%5===0){const shark=scene.getObjectByName('ocean-shark')!;cycles.push([t,shark.visible,shark.userData.hits]);}}
assert(terrainCells.length/originalLandArea>=1.8&&terrainCells.length/originalLandArea<=2.2,'Land area');
assert.equal(visited.size,keys.size,'Connected land');assert(clearance>4,'Hull clearance');
assert.equal(padIssues.length,0,'Level foundations');assert.equal(invalid,0,'Finite transforms');assert.equal(horseCollision,0,'Horse collision');assert.equal(obstacleCollision,0,'Horse obstacle clearance');
assert(cycles.some(c=>c[0]>=45&&c[1]===false&&c[2]===3),'Three hits in second cycle');
assert(cycles.some(c=>c[0]>=60&&c[1]===true&&c[2]===0),'Second night refresh');
console.log(JSON.stringify({originalLandArea,area:terrainCells.length,ratio:terrainCells.length/originalLandArea,connected:visited.size===keys.size,clearance,padIssues,invalid,horseCollision,obstacleCollision,cycles},null,2));
habitat.dispose();
`,resolveDir:process.cwd(),loader:'ts'},bundle:true,platform:'node',format:'esm',write:false});
await import('data:text/javascript;base64,'+Buffer.from(result.outputFiles[0].text).toString('base64'));
