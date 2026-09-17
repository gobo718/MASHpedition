/* v274 — fit with temporary landscape + portrait fixtures, then remove them. */
(()=>{
  const easel=document.querySelector('.easel');
  if(!easel)return;
  function measureFixture(wRatio,hRatio){
    const fixture=document.createElement('div');
    fixture.className='easel-fit-fixture';
    fixture.style.aspectRatio=`${wRatio}/${hRatio}`;
    easel.appendChild(fixture);
    const box=easel.getBoundingClientRect();
    let w=box.width;
    let h=w*hRatio/wRatio;
    if(h>box.height){h=box.height;w=h*wRatio/hRatio;}
    fixture.style.width=`${w}px`;
    fixture.style.height=`${h}px`;
    const measured=fixture.getBoundingClientRect();
    fixture.remove();
    return {width:measured.width,height:measured.height};
  }
  function fit(){
    const landscape=measureFixture(16,9);
    const portrait=measureFixture(9,16);
    easel.style.setProperty('--easel-landscape-w',`${landscape.width}px`);
    easel.style.setProperty('--easel-landscape-h',`${landscape.height}px`);
    easel.dataset.portraitFit=`${portrait.width}x${portrait.height}`;
  }
  fit();
  addEventListener('resize',fit,{passive:true});
  addEventListener('mashpeditionviewportchange',fit);
})();
