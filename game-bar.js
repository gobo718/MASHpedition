(()=>{
  const buttons=[...document.querySelectorAll('[data-display-mode]')];
  if(!buttons.length)return;
  const fsElement=()=>document.fullscreenElement||document.webkitFullscreenElement||null;
  const supported=()=>!!(document.documentElement.requestFullscreen||document.documentElement.webkitRequestFullscreen);
  function sync(){
    const full=!!fsElement();
    buttons.forEach(btn=>{
      btn.textContent=full?'BROWSER':'FULL';
      btn.hidden=!supported()&&!full;
      btn.setAttribute('aria-pressed',String(full));
    });
    window.dispatchEvent(new Event('mashpeditionviewportchange'));
  }
  async function toggle(){
    try{
      if(fsElement()){
        const exit=document.exitFullscreen||document.webkitExitFullscreen;
        if(exit)await exit.call(document);
      }else{
        const enter=document.documentElement.requestFullscreen||document.documentElement.webkitRequestFullscreen;
        if(enter)await enter.call(document.documentElement,{navigationUI:'hide'});
      }
    }catch(_e){}
    sync();
  }
  buttons.forEach(btn=>btn.addEventListener('click',toggle));
  document.addEventListener('fullscreenchange',sync);
  document.addEventListener('webkitfullscreenchange',sync);
  sync();
})();
