import type {Rhythm,RhythmId} from './types';
export const RHYTHMS:Rhythm[]=[
{id:'sinus',name:'Ritmo sinusal',category:'Ritmos sinusais',defaultRate:75,rateRange:[40,180],defaultAmplitude:1,qrsWidth:0.09,regularity:'regular',atrialActivity:'p'},
{id:'sinus-brady',name:'Bradicardia sinusal',category:'Ritmos sinusais',defaultRate:48,rateRange:[30,59],defaultAmplitude:1,qrsWidth:0.09,regularity:'regular',atrialActivity:'p'},
{id:'sinus-tachy',name:'Taquicardia sinusal',category:'Ritmos sinusais',defaultRate:125,rateRange:[100,180],defaultAmplitude:1,qrsWidth:0.09,regularity:'regular',atrialActivity:'p'},
{id:'afib',name:'Fibrilação atrial',category:'Arritmias supraventriculares',defaultRate:110,rateRange:[60,190],defaultAmplitude:0.8,qrsWidth:0.09,regularity:'irregular',atrialActivity:'fibrillatory'},
{id:'flutter',name:'Flutter atrial',category:'Arritmias supraventriculares',defaultRate:150,rateRange:[60,220],defaultAmplitude:0.85,qrsWidth:0.09,regularity:'regular',atrialActivity:'flutter'},
{id:'svt',name:'Taquicardia supraventricular',category:'Arritmias supraventriculares',defaultRate:180,rateRange:[120,250],defaultAmplitude:0.85,qrsWidth:0.08,regularity:'regular',atrialActivity:'hidden'},
{id:'vt',name:'TV monomórfica',category:'Arritmias ventriculares',defaultRate:170,rateRange:[120,240],defaultAmplitude:1.3,qrsWidth:0.16,regularity:'regular',atrialActivity:'independent'},
{id:'vf',name:'Fibrilação ventricular',category:'Arritmias ventriculares',defaultRate:240,rateRange:[180,250],defaultAmplitude:1.4,qrsWidth:0.2,regularity:'chaotic',atrialActivity:'none'},
{id:'av-block-complete',name:'BAV total / BAVT',category:'Distúrbios de condução',defaultRate:38,rateRange:[25,70],defaultAmplitude:1,qrsWidth:0.11,regularity:'regular',atrialActivity:'independent'},
{id:'junctional',name:'Ritmo juncional',category:'Outros',defaultRate:52,rateRange:[40,100],defaultAmplitude:0.8,qrsWidth:0.09,regularity:'regular',atrialActivity:'hidden'}
];
export const rhythmById=(id:RhythmId)=>RHYTHMS.find(r=>r.id===id)!;