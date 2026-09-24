import * as THREE from 'three';

export type VoxelBox=(parent:THREE.Group,x:number,y:number,z:number,w:number,h:number,d:number,color:string)=>void;

// Shared body proportions and pivots for all island residents, feet at local Y=0.
export function buildVoxelPerson(root:THREE.Group,box:VoxelBox,shirt:string,pants:string,shoes='#493c35') {
  const skin='#e3b18b',dark='#302a30';
  const legs=[-1,1].map(side=>{
    const leg=new THREE.Group();leg.position.set(side*.14,.6,0);root.add(leg);
    box(leg,0,-.51,.05,.24,.18,.4,shoes);box(leg,0,-.22,0,.21,.44,.25,pants);
    return leg;
  });
  box(root,0,.88,0,.52,.6,.34,shirt);
  box(root,0,.61,.015,.54,.09,.37,'#654632');
  const head=new THREE.Group();head.position.y=1.4;root.add(head);
  box(head,0,0,0,.42,.42,.38,skin);
  for(const side of [-1,1])box(head,side*.1,.025,.2,.055,.06,.025,dark);
  box(head,0,-.13,.2,.13,.025,.025,'#a06c50');
  const arms=[-1,1].map(side=>{
    const arm=new THREE.Group();arm.position.set(side*.34,1.12,0);root.add(arm);
    box(arm,0,-.13,0,.2,.28,.25,shirt);box(arm,0,-.36,0,.16,.22,.19,skin);
    return arm;
  });
  return {root,head,arms,legs};
}
