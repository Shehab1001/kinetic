(() => {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const clamp = (n,min,max)=>Math.min(Math.max(n,min),max);

  // Loader-like hero entrance
  window.addEventListener('DOMContentLoaded', () => {
    if (!reduce) {
      document.querySelectorAll('.hero-line i').forEach((el,i)=>{
        el.animate([
          {transform:'translateY(110%) rotate(1.5deg)'},
          {transform:'translateY(0) rotate(0deg)'}
        ],{duration:950,delay:130+i*120,easing:'cubic-bezier(.16,1,.3,1)',fill:'forwards'});
      });
      document.querySelectorAll('.hero .reveal-up').forEach((el,i)=>{
        el.animate([{opacity:0,transform:'translateY(24px)'},{opacity:1,transform:'translateY(0)'}],{duration:700,delay:650+i*100,easing:'cubic-bezier(.2,.7,.2,1)',fill:'forwards'});
      });
    } else {
      document.querySelectorAll('.hero-line i,.hero .reveal-up').forEach(el=>{el.style.opacity='1';el.style.transform='none'});
    }
  });

  // Scroll reveals
  const reveal = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
      if(!entry.isIntersecting) return;
      const el=entry.target;
      if(!reduce) el.animate(
        [{opacity:0,transform:el.classList.contains('reveal-card')?'translateY(80px) scale(.985)':'translateY(28px)'},{opacity:1,transform:'translateY(0) scale(1)'}],
        {duration:850,easing:'cubic-bezier(.16,1,.3,1)',fill:'forwards'}
      ); else {el.style.opacity='1';el.style.transform='none'}
      reveal.unobserve(el);
    });
  },{threshold:.12});
  document.querySelectorAll('.reveal-up:not(.hero .reveal-up),.reveal-card').forEach(el=>reveal.observe(el));

  // Scroll progress, hero parallax, pinned sequence, kinetic strip
  const progressBar=document.querySelector('.scroll-progress span');
  const heroLines=[...document.querySelectorAll('.hero-line')];
  const seq=document.querySelector('.sequence');
  const seqWord=document.querySelector('.sequence-word');
  const stageNum=document.querySelector('.stage-number');
  const stageLabel=document.querySelector('.stage-label');
  const rings=[...document.querySelectorAll('.stage-ring')];
  const kinetic=document.querySelector('.kinetic-track');
  const stages=[
    {word:'structure',num:'01',label:'STRUCTURE',color:'#6848ff'},
    {word:'tension',num:'02',label:'TENSION',color:'#ff4f99'},
    {word:'release',num:'03',label:'RELEASE',color:'#00a9c9'},
    {word:'memory',num:'04',label:'MEMORY',color:'#65a400'}
  ];
  let ticking=false;
  function onScroll(){
    if(ticking) return; ticking=true;
    requestAnimationFrame(()=>{
      const y=window.scrollY, h=document.documentElement.scrollHeight-innerHeight;
      progressBar.style.width=`${h>0?(y/h)*100:0}%`;
      if(!reduce){
        heroLines.forEach(line=>{const s=Number(line.dataset.speed||0);line.style.transform=`translate3d(${y*s}px,0,0)`});
        if(seq){
          const r=seq.getBoundingClientRect();
          const p=clamp((-r.top)/(seq.offsetHeight-innerHeight),0,1);
          const idx=Math.min(3,Math.floor(p*4));
          const stage=stages[idx];
          seqWord.textContent=stage.word;seqWord.style.color=stage.color;stageNum.textContent=stage.num;stageLabel.textContent=stage.label;
          rings[0].style.transform=`rotate(${p*190}deg) scale(${.9+p*.25})`;
          rings[1].style.transform=`rotate(${-p*260}deg) scale(${1.08-p*.12})`;
          rings[2].style.transform=`translate(${Math.sin(p*10)*46}px,${Math.cos(p*8)*28}px) scale(${.8+p*.5})`;
        }
        if(kinetic){const rr=kinetic.parentElement.getBoundingClientRect(); const p=clamp((innerHeight-rr.top)/(innerHeight+rr.height),0,1);kinetic.style.transform=`translateX(${(0.5-p)*38}vw) rotate(-8deg)`}
      }
      ticking=false;
    });
  }
  addEventListener('scroll',onScroll,{passive:true}); onScroll();

  // Draw SVG path when VANTA project enters
  const scribble=document.querySelector('.scribble path');
  const drawObs=new IntersectionObserver(entries=>entries.forEach(e=>{
    if(e.isIntersecting && !reduce){ scribble.animate([{strokeDashoffset:1500},{strokeDashoffset:0}],{duration:1700,easing:'cubic-bezier(.2,.7,.2,1)',fill:'forwards'}); drawObs.disconnect(); }
  }),{threshold:.45});
  if(scribble) drawObs.observe(scribble);

  // Interactive project tilt / internal parallax
  document.querySelectorAll('.interactive-visual').forEach(card=>{
    card.addEventListener('pointermove',e=>{
      if(reduce || innerWidth<900) return;
      const r=card.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;
      card.style.transform=`perspective(1100px) rotateX(${-y*4}deg) rotateY(${x*6}deg) translateZ(0)`;
      card.querySelectorAll('.glass-card,.arch-block').forEach((c,i)=>c.style.translate=`${x*(i+1)*7}px ${y*(i+1)*7}px`);
    });
    card.addEventListener('pointerleave',()=>{card.style.transform='';card.querySelectorAll('.glass-card,.arch-block').forEach(c=>c.style.translate='')});
  });

  // Magnetic elements
  document.querySelectorAll('.magnetic').forEach(el=>{
    el.addEventListener('pointermove',e=>{
      if(reduce || innerWidth<900) return; const r=el.getBoundingClientRect(); const x=e.clientX-(r.left+r.width/2),y=e.clientY-(r.top+r.height/2); el.style.transform=`translate(${x*.16}px,${y*.16}px)`;
    });
    el.addEventListener('pointerleave',()=>el.style.transform='translate(0,0)');
  });

  // Custom cursor
  const dot=document.querySelector('.cursor-dot'),ring=document.querySelector('.cursor-ring');
  if(!reduce && matchMedia('(pointer:fine)').matches){
    let mx=-100,my=-100,rx=-100,ry=-100;
    addEventListener('pointermove',e=>{mx=e.clientX;my=e.clientY;dot.style.transform=`translate(${mx}px,${my}px) translate(-50%,-50%)`});
    const loop=()=>{rx+=(mx-rx)*.15;ry+=(my-ry)*.15;ring.style.transform=`translate(${rx}px,${ry}px) translate(-50%,-50%)`;requestAnimationFrame(loop)};loop();
    document.querySelectorAll('a,button,.interactive-visual').forEach(el=>{el.addEventListener('mouseenter',()=>ring.classList.add('active'));el.addEventListener('mouseleave',()=>ring.classList.remove('active'))});
  }

  // Mobile menu
  const btn=document.querySelector('.menu-btn'),panel=document.querySelector('.menu-panel');
  const toggle=(open)=>{btn.classList.toggle('active',open);panel.classList.toggle('open',open);btn.setAttribute('aria-expanded',String(open));panel.setAttribute('aria-hidden',String(!open));document.body.style.overflow=open?'hidden':''};
  btn.addEventListener('click',()=>toggle(!panel.classList.contains('open')));
  panel.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>toggle(false)));
})();
