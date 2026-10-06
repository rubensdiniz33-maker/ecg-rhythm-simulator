import type {Rhythm,SimParams} from './types';
const gauss=(x:number,c:number,w:number,a:number)=>a*Math.exp(-0.5*((x-c)/w)**2);
const seeded=(n:number)=>{const x=Math.sin(n*12.9898)*43758.5453; return x-Math.floor(x);};
export function ecgSample(t:number,r:Rhythm,p:SimParams):number{
 const period=60/p.rate;
 let phase=((t%period)+period)%period/period;
 if(r.id==='vf'){let n=Math.floor(t*180); return (seeded(n)*2-1)*p.amplitude*(0.55+0.45*Math.sin(t*8)**2);}
 let beatIndex=Math.floor(t/period);
 let jitter=0;
 if(r.regularity==='irregular') jitter=(seeded(beatIndex)-0.5)*0.18;
 let ph=(phase+jitter+1)%1;
 if(r.id==='flutter'){const f=12*ph; return p.amplitude*(0.22*Math.sin(2*Math.PI*f)+gauss(ph,.26,.018,.95)+gauss(ph,.31,.022,-1.8)+gauss(ph,.36,.018,.8));}
 if(r.id==='vt'){const q=gauss(ph,.28,.045,1.6)-gauss(ph,.34,.05,.85)+gauss(ph,.42,.06,-.8); return p.amplitude*q;}
 if(r.id==='svt'){return p.amplitude*(gauss(ph,.38,.012,-.2)+gauss(ph,.405,.018,1.4)-gauss(ph,.43,.014,.45)+gauss(ph,.64,.08,.28));}
 if(r.id==='junctional'){return p.amplitude*(gauss(ph,.40,.014,-.16)+gauss(ph,.425,.012,1.2)-gauss(ph,.45,.014,.32)+gauss(ph,.64,.08,.25));}
 if(r.id==='av-block-complete'){const atrial=(Math.sin(2*Math.PI*(t/(60/90)))*0.09); const q=gauss(ph,.28,.012,-.18)+gauss(ph,.31,.012,1.15)-gauss(ph,.34,.014,-.3)+gauss(ph,.58,.08,.25); return p.amplitude*q+atrial;}
 const pWave=gauss(ph,.18,.025,r.atrialActivity==='fibrillatory'?.05:.16);
 const q=gauss(ph,.285,.012,-.18)+gauss(ph,.31,.009,1.05)-gauss(ph,.335,.012,-.28);
 const tWave=gauss(ph,.60,.075,.28);
 let y=pWave+q+tWave;
 if(r.id==='afib') y+=((seeded(Math.floor(t*18))-0.5)*0.045);
 return p.amplitude*y;
}