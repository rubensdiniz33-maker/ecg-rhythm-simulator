import {useEffect,useRef} from 'react'; import type {Rhythm,SimParams} from './types'; import {ecgSample} from './ecgEngine';
export default function ECGMonitor({rhythm,params}:{rhythm:Rhythm;params:SimParams}){
 const ref=useRef<HTMLCanvasElement>(null); const time=useRef(0); const raf=useRef(0); const last=useRef(performance.now());
 useEffect(()=>{const c=ref.current!; const ctx=c.getContext('2d')!; const resize=()=>{const d=devicePixelRatio||1;c.width=c.clientWidth*d;c.height=c.clientHeight*d;ctx.setTransform(d,0,0,d,0,0)}; resize(); addEventListener('resize',resize);
 const draw=(now:number)=>{const dt=Math.min(.05,(now-last.current)/1000);last.current=now;if(params.running&&!params.paused)time.current+=dt;
 const w=c.clientWidth,h=c.clientHeight;ctx.clearRect(0,0,w,h);ctx.fillStyle='#06100d';ctx.fillRect(0,0,w,h);
 const small=8*(params.gain/10), major=small*5; ctx.strokeStyle='rgba(83,190,124,.11)';ctx.lineWidth=1;
 for(let x=0;x<w;x+=small){ctx.beginPath();ctx.moveTo(x,0);ctx.lineTo(x,h);ctx.stroke()} for(let y=0;y<h;y+=small){ctx.beginPath();ctx.moveTo(0,y);ctx.lineTo(w,y);ctx.stroke()}
 ctx.strokeStyle='rgba(83,190,124,.22)';for(let x=0;x<w;x+=major){ctx.beginPath();ctx.moveTo(x,0);ctx.lineTo(x,h);ctx.stroke()}for(let y=0;y<h;y+=major){ctx.beginPath();ctx.moveTo(0,y);ctx.lineTo(w,y);ctx.stroke()}
 const pxPerSec=params.paperSpeed===25?180:360; const center=h*.52; ctx.beginPath();ctx.strokeStyle='#6cff9a';ctx.lineWidth=2;
 for(let x=0;x<w;x++){const sec=(x-w)/pxPerSec+time.current;const y=center-ecgSample(sec,rhythm,params)*(h*.23);if(x===0)ctx.moveTo(x,y);else ctx.lineTo(x,y)}ctx.stroke();
 ctx.fillStyle='rgba(120,255,160,.75)';ctx.font='11px ui-monospace,monospace';ctx.fillText('II',12,18);ctx.fillText(params.paperSpeed+' mm/s   '+params.gain+' mm/mV',12,h-12);
 raf.current=requestAnimationFrame(draw)};raf.current=requestAnimationFrame(draw);return()=>{cancelAnimationFrame(raf.current);removeEventListener('resize',resize)}},[rhythm,params]);
 return <canvas ref={ref} className="ecg-canvas"/>;}