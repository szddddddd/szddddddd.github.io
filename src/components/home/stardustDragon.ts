import * as THREE from 'three';
import { islandBounds } from './islandTerrain';

// Reference: https://terraria.wiki.gg/wiki/Stardust_Dragon_Staff
// Procedural voxel interpretation of Terraria's Stardust Dragon summon.
// Every segment follows the same closed curve at a fixed arc-length offset.
export function createStardustDragon(scene:THREE.Scene) {
  const root=new THREE.Group();root.name='terraria-stardust-dragon';scene.add(root);
  const geometry=new THREE.BoxGeometry();
  const material=new THREE.MeshStandardMaterial({roughness:.45,metalness:.12,transparent:true,opacity:.84,depthWrite:true,emissive:'#fff5dc',emissiveIntensity:.12});
  // Keep each scale's blue/gold hue in its own glow, including at night.
  material.onBeforeCompile=shader=>{
    shader.vertexShader=shader.vertexShader.replace('#include <common>','#include <common>\nvarying vec3 vScaleGlow;')
      .replace('#include <color_vertex>','#include <color_vertex>\nvScaleGlow=instanceColor;');
    shader.fragmentShader=shader.fragmentShader.replace('#include <common>','#include <common>\nvarying vec3 vScaleGlow;')
      .replace('#include <emissivemap_fragment>','#include <emissivemap_fragment>\ntotalEmissiveRadiance*=vScaleGlow;');
  };
  type Block={segment:number;position:THREE.Vector3;scale:THREE.Vector3;color:string};
  const blocks:Block[]=[];
  const box=(segment:number,x:number,y:number,z:number,w:number,h:number,d:number,color:string)=>blocks.push({segment,position:new THREE.Vector3(x,y,z),scale:new THREE.Vector3(w,h,d),color});
  const ivory='#83d9f5',gold='#eead27',blue='#188dda',shadow='#244b9d';
  const segments=24;
  // The head faces local +Z: long muzzle, paired swept horns, brows and whiskers.
  box(0,0,0,.15,.9,.68,1.12,ivory);
  box(0,0,-.16,.83,.64,.33,.7,gold);
  box(0,0,-.31,.78,.59,.1,.66,ivory);
  box(0,0,.27,.17,.55,.16,.63,gold);
  box(0,0,.43,-.15,.25,.27,.33,blue);
  for(const side of [-1,1]) {
    box(0,side*.46,.05,.46,.045,.2,.28,shadow);
    box(0,side*.49,.07,.5,.04,.11,.15,'#c3ffff');
    box(0,side*.42,.21,.42,.17,.09,.39,gold);
    for(let j=0;j<4;j++) {
      box(0,side*(.38+j*.1),.29+j*.14,-.2-j*.2,.18-j*.025,.19,.29,gold);
      box(0,side*(.34+j*.12),-.19-j*.07,.94-j*.19,.19,.065,.09,j<2?ivory:blue);
    }
    box(0,side*.52,-.01,-.3,.22,.52,.38,blue);
    box(0,side*.69,.1,-.49,.16,.4,.29,ivory);
  }
  for(let i=1;i<segments;i++) {
    const taper=i<17?1:1-(i-16)*.105;
    box(i,0,0,0,.58*taper,.55*taper,.72,blue);
    box(i,0,-.23*taper,.02,.46*taper,.12,.62,blue);
    box(i,0,.23*taper,-.14,.59*taper,.14,.3,gold);
    box(i,0,.43*taper,-.2,.12,.35*taper,.32,blue);
    for(const side of [-1,1]) {
      box(i,side*.32*taper,.02,-.1,.13*taper,.34*taper,.31,gold);
      if(i%3===1){box(i,side*.5*taper,.05,-.2,.38*taper,.09,.35,blue);box(i,side*.64*taper,.12,-.33,.21*taper,.08,.28,ivory);}
    }
  }
  box(segments-1,0,.08,-.5,.17,.19,.6,gold);
  box(segments-1,0,.16,-.83,.1,.12,.25,blue);
  const mesh=new THREE.InstancedMesh(geometry,material,blocks.length);mesh.name='stardust-dragon-segments';
  mesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);mesh.frustumCulled=false;root.add(mesh);
  blocks.forEach((b,i)=>mesh.setColorAt(i,new THREE.Color(b.color)));
  const curve=new THREE.CatmullRomCurve3(Array.from({length:12},(_,i)=>{
    const a=i*Math.PI/6;return new THREE.Vector3(-3+Math.cos(a)*12,13.1+Math.sin(a*2)*1.05,-2+Math.sin(a)*10);
  }),true,'centripetal');
  const length=curve.getLength(),spacing=.64;
  const segmentMatrices=Array.from({length:segments},()=>new THREE.Matrix4());
  const transform=new THREE.Object3D(),local=new THREE.Object3D(),forward=new THREE.Vector3(0,0,1),tangent=new THREE.Vector3(),point=new THREE.Vector3();
  // Batched camera-facing stars keep the trail visible from every orbit angle.
  // Separate low-opacity halos preserve the voxel body's ivory/gold details.
  const glowGeometry=new THREE.PlaneGeometry(1,1);
  const glowMaterial=new THREE.ShaderMaterial({
    transparent:true,depthWrite:false,blending:THREE.AdditiveBlending,
    uniforms:{sparkle:{value:1},strength:{value:1}},
    vertexShader:`
      varying vec2 vUv;
      varying vec3 vColor;
      varying float vFade;
      void main() {
        vUv=uv;
        vColor=instanceColor;
        vFade=length(instanceMatrix[2].xyz);
        vec4 center=modelViewMatrix*instanceMatrix*vec4(0.0,0.0,0.0,1.0);
        center.xy+=position.xy*vec2(length(instanceMatrix[0].xyz),length(instanceMatrix[1].xyz));
        gl_Position=projectionMatrix*center;
      }
    `,
    fragmentShader:`
      uniform float sparkle;
      uniform float strength;
      varying vec2 vUv;
      varying vec3 vColor;
      varying float vFade;
      void main() {
        vec2 p=abs(vUv-0.5)*2.0;
        float radius=length(p);
        float halo=exp(-radius*radius*5.0)*(1.0-smoothstep(0.65,1.0,radius));
        float core=exp(-radius*radius*80.0);
        float rays=pow(1.0-min(p.x,p.y),28.0)*pow(max(0.0,1.0-max(p.x,p.y)),2.0);
        float alpha=(halo*0.3+sparkle*(core*0.65+rays*0.55))*vFade*strength;
        gl_FragColor=vec4(vColor,alpha);
      }
    `
  });
  const auraMaterial=glowMaterial.clone();auraMaterial.uniforms.sparkle.value=0;
  const particleCount=88,bodyParticles=64;
  const dustMaterial=new THREE.MeshBasicMaterial({color:'#c8f5ff',transparent:true,opacity:.85,depthWrite:false,toneMapped:false});
  const dust=new THREE.InstancedMesh(geometry,dustMaterial,particleCount);dust.name='stardust-dragon-trail';
  const stars=new THREE.InstancedMesh(glowGeometry,glowMaterial,particleCount);stars.name='stardust-dragon-stars';
  const aura=new THREE.InstancedMesh(glowGeometry,auraMaterial,segments);aura.name='stardust-dragon-aura';
  for(const effect of [dust,stars,aura]) {
    effect.instanceMatrix.setUsage(THREE.DynamicDrawUsage);effect.frustumCulled=false;root.add(effect);
  }
  for(let i=0;i<particleCount;i++) {
    const color=new THREE.Color(i%3===0?'#ffc44f':'#48baff');
    dust.setColorAt(i,color);stars.setColorAt(i,color);
  }
  for(let i=0;i<segments;i++)aura.setColorAt(i,new THREE.Color('#59bbff'));
  const light=new THREE.PointLight('#96e5ff',1,5,2);root.add(light);
  // Include the aerial route in default framing without changing land or actor scale.
  islandBounds.expandByPoint(new THREE.Vector3(-16,16,-13));islandBounds.expandByPoint(new THREE.Vector3(10,16,9));
  const update=(time:number,night:number)=>{
    const travel=time/34;
    for(let i=0;i<segments;i++) {
      const u=((travel-i*spacing/length)%1+1)%1;
      curve.getPointAt(u,point);curve.getTangentAt(u,tangent);
      transform.position.copy(point);transform.quaternion.setFromUnitVectors(forward,tangent.normalize());transform.scale.set(1,1,1);transform.updateMatrix();
      segmentMatrices[i].copy(transform.matrix);
      if(i===0)light.position.copy(point);
    }
    blocks.forEach((b,i)=>{local.position.copy(b.position);local.scale.copy(b.scale);local.updateMatrix();mesh.setMatrixAt(i,local.matrix.premultiply(segmentMatrices[b.segment]));});
    mesh.instanceMatrix.needsUpdate=true;material.emissiveIntensity=.1+night*.48;light.intensity=.4+night*1.8;
    glowMaterial.uniforms.strength.value=.95+night*.25;
    auraMaterial.uniforms.strength.value=.3+night*.2;
    for(let i=0;i<segments;i++) {
      transform.position.setFromMatrixPosition(segmentMatrices[i]);
      transform.quaternion.identity();
      const size=(i===0?1.6:1.1)+Math.sin(time*2.2-i*.45)*.06;
      transform.scale.set(size,size,.5);transform.updateMatrix();aura.setMatrixAt(i,transform.matrix);
    }
    for(let i=0;i<particleCount;i++) {
      const age=(time*.24+i*.61803398875)%1;
      const onBody=i<bodyParticles;
      const offset=onBody?(i/bodyParticles)*(segments-1)*spacing:(segments-1)*spacing+age*4;
      const u=((travel-offset/length)%1+1)%1;
      curve.getPointAt(u,point);curve.getTangentAt(u,tangent);
      // Surface sparks shed backwards from the scales; no orbiting particle helix.
      const side=Math.sin(i*12.9898),height=Math.cos(i*7.233);
      const drift=onBody?age*.18:age*.45;
      transform.position.set(point.x+tangent.z*side*(.28+drift),
        point.y+.18+height*.16+age*.22,
        point.z-tangent.x*side*(.28+drift));
      const fade=Math.sin(Math.PI*age)*(onBody?.8:.65);
      const size=(.065+(i%5)*.015)*fade;
      transform.quaternion.identity();transform.rotation.set(time*.7+i,time+i,time*.4);
      transform.scale.setScalar(size);transform.updateMatrix();dust.setMatrixAt(i,transform.matrix);
      const glowSize=(i%9===0?.7:.4)+fade*.15;
      transform.quaternion.identity();transform.scale.set(glowSize,glowSize,fade*.8);
      transform.updateMatrix();stars.setMatrixAt(i,transform.matrix);
    }
    dust.instanceMatrix.needsUpdate=true;stars.instanceMatrix.needsUpdate=true;aura.instanceMatrix.needsUpdate=true;
  };
  update(0,0);
  return {update,dispose(){root.removeFromParent();mesh.dispose();dust.dispose();stars.dispose();aura.dispose();geometry.dispose();glowGeometry.dispose();material.dispose();dustMaterial.dispose();glowMaterial.dispose();auraMaterial.dispose();}};
}
