(()=>{
  const shell=document.getElementById('endlessShell');
  const stage=document.getElementById('endlessStage');
  const arts=[document.getElementById('wallA'),document.getElementById('wallB'),document.getElementById('wallC')];
  const thumbnailGrid=document.getElementById('thumbnailGrid');
  const thumbnailBtn=document.getElementById('thumbnailBtn');
  const leftBtn=document.getElementById('leftBtn');
  const rightBtn=document.getElementById('rightBtn');
  const viewLabel=document.getElementById('viewLabel');
  let start=1;

  function renderWall(){
    shell.dataset.view='wall';
    viewLabel.textContent='ENDLESS WALL';
    arts.forEach((btn,i)=>{const n=start+i;btn.textContent=`ART ${n}`;btn.dataset.item=String(n);});
  }

  function renderThumbnails(){
    shell.dataset.view='thumbnail';
    viewLabel.textContent='THUMBNAILS';
    thumbnailGrid.replaceChildren();
    const first=Math.max(1,start-9);
    for(let i=0;i<22;i++){
      const n=first+i;
      const b=document.createElement('button');
      b.type='button';b.textContent=`ART ${n}`;b.dataset.item=String(n);
      b.addEventListener('click',()=>{start=Math.max(1,n-1);renderWall();});
      thumbnailGrid.appendChild(b);
    }
  }

  function move(delta){
    start=Math.max(1,start+delta);
    if(shell.dataset.view==='thumbnail') renderThumbnails(); else renderWall();
  }

  leftBtn.addEventListener('click',()=>move(-1));
  rightBtn.addEventListener('click',()=>move(1));
  thumbnailBtn.addEventListener('click',()=>shell.dataset.view==='thumbnail'?renderWall():renderThumbnails());

  let sx=0,sy=0,tracking=false,suppress=0; const MIN=42;
  stage.addEventListener('touchstart',e=>{if(e.touches.length!==1){tracking=false;return}const t=e.touches[0];sx=t.clientX;sy=t.clientY;tracking=true},{passive:true});
  stage.addEventListener('touchmove',e=>{if(!tracking||e.touches.length!==1)return;const t=e.touches[0],dx=t.clientX-sx,dy=t.clientY-sy;if(Math.abs(dx)>14&&Math.abs(dx)>Math.abs(dy)*1.15)e.preventDefault()},{passive:false});
  stage.addEventListener('touchend',e=>{if(!tracking)return;tracking=false;const t=e.changedTouches[0],dx=t.clientX-sx,dy=t.clientY-sy;if(Math.abs(dx)<MIN||Math.abs(dx)<=Math.abs(dy)*1.15)return;suppress=Date.now()+450;move(dx<0?1:-1)},{passive:true});
  stage.addEventListener('touchcancel',()=>tracking=false,{passive:true});
  stage.addEventListener('click',e=>{if(Date.now()<suppress){e.preventDefault();e.stopPropagation()}},true);

  renderWall();
})();
