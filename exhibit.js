(()=>{
  const shell=document.getElementById('exhibitShell');
  const viewLabel=document.getElementById('viewLabel');
  const wallArtLabel=document.getElementById('wallArtLabel');
  const artworkLabel=document.getElementById('artworkLabel');
  const depthPanel=document.getElementById('depthPanel');
  const leftBtn=document.getElementById('leftBtn');
  const rightBtn=document.getElementById('rightBtn');
  const thumbnailBtn=document.getElementById('thumbnailBtn');
  const doorBtn=document.getElementById('doorBtn');
  const wallArt=document.getElementById('wallArt');
  const thumbnailGrid=document.getElementById('thumbnailGrid');
  const roomFrame=document.getElementById('roomFrame');
  const MAX_EXHIBITS=66;
  const requestedExhibit=Number(new URLSearchParams(location.search).get('exhibit')||1);
  const exhibitNumber=Math.max(1,Math.min(MAX_EXHIBITS,Number.isFinite(requestedExhibit)?Math.trunc(requestedExhibit):1));
  shell.dataset.exhibit=String(exhibitNumber);
  const slots={
    angledLeft:document.getElementById('angledLeft'),
    flatLeft:document.getElementById('flatLeft'),
    flatCenter:document.getElementById('flatCenter'),
    flatRight:document.getElementById('flatRight'),
    angledRight:document.getElementById('angledRight'),
    leftCorner:document.getElementById('leftCorner'),
    rightCorner:document.getElementById('rightCorner')
  };

  const states=[
    {type:'left', items:['22','1','2']},
    {type:'straight', items:['1','2','3']},
    {type:'straight', items:['2','3','4']},
    {type:'straight', items:['3','4','5']},
    {type:'straight', items:['4','5','6']},
    {type:'right', items:['5','6','7']},
    {type:'left', items:['6','7','DOOR']},
    {type:'straight', items:['7','DOOR','8']},
    {type:'straight', items:['DOOR','8','9']},
    {type:'straight', items:['8','9','10']},
    {type:'straight', items:['9','10','11']},
    {type:'right', items:['10','11','12']},
    {type:'left', items:['11','12','13']},
    {type:'straight', items:['12','13','14']},
    {type:'straight', items:['13','14','15']},
    {type:'straight', items:['14','15','16']},
    {type:'straight', items:['15','16','17']},
    {type:'right', items:['16','17','18']},
    {type:'left', items:['17','18','19']},
    {type:'straight', items:['18','19','20']},
    {type:'straight', items:['19','20','21']},
    {type:'straight', items:['20','21','DOOR']},
    {type:'straight', items:['21','DOOR','22']},
    {type:'right', items:['DOOR','22','1']},
  ];

  let stateIndex=0;
  let selectedArt='1';

  function itemLabel(item){ return item==='DOOR' ? 'DOOR' : `ART ${item}`; }
  function isDoor(item){ return item==='DOOR'; }

  function setView(view){
    shell.dataset.view=view;
    if(view==='thumbnail') viewLabel.textContent='THUMBNAIL VIEW';
    else if(view==='wall') viewLabel.textContent='WALL VIEW';
    else if(view==='zoom') viewLabel.textContent='ARTWORK VIEW';
    else {
      const type=states[stateIndex].type;
      viewLabel.textContent=type==='left' ? 'LEFT CORNER VIEW' : type==='right' ? 'RIGHT CORNER VIEW' : 'STRAIGHT WALL VIEW';
    }
  }

  function prepareSlot(el,item){
    if(!el) return;
    if(item==null){ el.hidden=true; el.classList.add('hidden'); el.replaceChildren(); el.dataset.item=''; return; }
    el.hidden=false; el.classList.remove('hidden');
    el.dataset.item=item;
    el.classList.toggle('door-card',isDoor(item));
    el.setAttribute('aria-label',itemLabel(item));
    el.innerHTML=`<span>${itemLabel(item)}</span>`;
  }

  function clearRoom(){
    Object.values(slots).forEach(el=>{ if(el.tagName==='BUTTON'){ el.hidden=true; el.classList.add('hidden'); el.innerHTML=''; el.classList.remove('door-card'); } else { el.hidden=true; el.classList.add('hidden'); } });
  }

  function renderRoom(){
    clearRoom();
    const s=states[stateIndex];
    roomFrame.dataset.layout=s.type;
    if(s.type==='left'){
      prepareSlot(slots.angledLeft,s.items[0]);
      slots.leftCorner.hidden=false; slots.leftCorner.classList.remove('hidden');
      prepareSlot(slots.flatCenter,s.items[1]);
      prepareSlot(slots.flatRight,s.items[2]);
    }else if(s.type==='right'){
      prepareSlot(slots.flatLeft,s.items[0]);
      prepareSlot(slots.flatCenter,s.items[1]);
      slots.rightCorner.hidden=false; slots.rightCorner.classList.remove('hidden');
      prepareSlot(slots.angledRight,s.items[2]);
    }else{
      prepareSlot(slots.flatLeft,s.items[0]);
      prepareSlot(slots.flatCenter,s.items[1]);
      prepareSlot(slots.flatRight,s.items[2]);
    }
    setView('room');
  }

  function selectArt(item,goWall=true){
    if(isDoor(item)) return;
    selectedArt=String(item);
    wallArtLabel.textContent=itemLabel(item);
    artworkLabel.textContent=itemLabel(item);
    depthPanel.textContent='IMAGE DETAIL';
    if(goWall) setView('wall');
  }

  [slots.angledLeft,slots.flatLeft,slots.flatCenter,slots.flatRight,slots.angledRight].forEach(btn=>{
    btn.addEventListener('click',()=>selectArt(btn.dataset.item,true));
  });

  function moveRoom(delta){
    stateIndex=(stateIndex+delta+states.length)%states.length;
    renderRoom();
  }

  leftBtn.addEventListener('click',()=>moveRoom(-1));
  rightBtn.addEventListener('click',()=>moveRoom(1));

  thumbnailBtn.addEventListener('click',()=>setView('thumbnail'));
  doorBtn.addEventListener('click',()=>{ stateIndex=7; renderRoom(); });
  wallArt.addEventListener('click',()=>setView('zoom'));

  document.querySelectorAll('[data-depth]').forEach(btn=>{
    btn.addEventListener('click',()=>{
      const depth=btn.dataset.depth;
      depthPanel.textContent=depth==='image'?'IMAGE DETAIL':depth==='plaque'?'DESCRIPTION PLAQUE':'BLURBLETS';
    });
  });

  // Horizontal swipes are navigation-equivalent to RIGHT/LEFT everywhere on the exhibit surface,
  // including straight-wall states and Thumbnail View. A completed swipe suppresses the synthetic click.
  let touchStartX=0;
  let touchStartY=0;
  let trackingSwipe=false;
  let suppressClickUntil=0;
  const SWIPE_MIN=42;

  const swipeSurface=document.getElementById('roomStage');
  swipeSurface.addEventListener('touchstart',e=>{
    if(e.touches.length!==1){ trackingSwipe=false; return; }
    const t=e.touches[0];
    touchStartX=t.clientX;
    touchStartY=t.clientY;
    trackingSwipe=true;
  },{passive:true});

  swipeSurface.addEventListener('touchmove',e=>{
    if(!trackingSwipe || e.touches.length!==1) return;
    const t=e.touches[0];
    const dx=t.clientX-touchStartX;
    const dy=t.clientY-touchStartY;
    if(Math.abs(dx)>14 && Math.abs(dx)>Math.abs(dy)*1.15) e.preventDefault();
  },{passive:false});

  swipeSurface.addEventListener('touchend',e=>{
    if(!trackingSwipe){ return; }
    trackingSwipe=false;
    const t=e.changedTouches[0];
    const dx=t.clientX-touchStartX;
    const dy=t.clientY-touchStartY;
    if(Math.abs(dx)<SWIPE_MIN || Math.abs(dx)<=Math.abs(dy)*1.15) return;
    suppressClickUntil=Date.now()+450;
    moveRoom(dx<0?1:-1);
  },{passive:true});

  swipeSurface.addEventListener('touchcancel',()=>{trackingSwipe=false;},{passive:true});
  swipeSurface.addEventListener('click',e=>{
    if(Date.now()<suppressClickUntil){ e.preventDefault(); e.stopPropagation(); }
  },true);

  for(let i=1;i<=22;i++){
    const b=document.createElement('button');
    b.type='button';
    b.textContent=`ART ${i}`;
    b.dataset.item=String(i);
    b.addEventListener('click',()=>selectArt(String(i),true));
    thumbnailGrid.appendChild(b);
  }

  renderRoom();
})();
