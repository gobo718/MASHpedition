(()=>{
  const shell=document.getElementById('viewerShell');
  const stage=document.getElementById('viewerStage');
  const viewLabel=document.getElementById('viewLabel');
  const controls=document.getElementById('viewerControls');
  const leftBtn=document.getElementById('leftBtn');
  const rightBtn=document.getElementById('rightBtn');
  const exhibitBtn=document.getElementById('exhibitBtn');
  const roomBtn=document.getElementById('roomBtn');
  const thumbnailBtn=document.getElementById('thumbnailBtn');
  const endlessBtn=document.getElementById('endlessBtn');
  const doorBtn=document.getElementById('doorBtn');
  const thumbnailGrid=document.getElementById('thumbnailGrid');
  const thumbnailStatus=document.getElementById('thumbnailStatus');
  const endlessStatus=document.getElementById('endlessStatus');
  const endlessArts=[document.getElementById('endlessA'),document.getElementById('endlessB'),document.getElementById('endlessC')];
  const artworkBack=document.getElementById('artworkBack');
  const artworkLabel=document.getElementById('artworkLabel');
  const artworkCopy=document.getElementById('artworkCopy');
  const mapTop=document.getElementById('mapTop');
  const mapLeft=document.getElementById('mapLeft');
  const mapRight=document.getElementById('mapRight');
  const mapBottom=document.getElementById('mapBottom');
  const rankButtons=[...document.querySelectorAll('.rank-selector [data-rank]')];

  const params=new URLSearchParams(location.search);
  const PAGE_SIZE=22;
  const AREA_PRESETS={
    gallery:{mix:'A',label:'GALLERY',count:66,start:'thumbnail'},
    collection:{mix:'B',label:'COLLECTION',count:22,start:'exhibit'},
    fyc:{mix:'A',label:'FOR YOUR CONSIDERATION',count:66,start:'thumbnail'},
    se:{mix:'A',label:'SALON ECLECTIQUE',count:66,start:'thumbnail'},
    geh:{mix:'B',label:'GRAND EXHIBITION HALLS',count:22,start:'exhibit',geh:true},
    'cat-theme':{mix:'A',label:'CATACOMBS · THEME',count:66,start:'thumbnail'},
    'cat-search':{mix:'C',label:'CATACOMBS · SEARCH',count:66,start:'exhibit'}
  };
  const area=(params.get('area')||'').toLowerCase();
  const preset=AREA_PRESETS[area]||{mix:'B',label:'VIEWER',count:22,start:'exhibit'};
  const mix=(params.get('mix')||preset.mix).toUpperCase();
  const capabilities={A:{exhibit:false,room:false,thumbnail:true,endless:true},B:{exhibit:true,room:true,thumbnail:true,endless:false},C:{exhibit:true,room:true,thumbnail:true,endless:true}}[mix]||{exhibit:true,room:true,thumbnail:true,endless:false};
  const gehMode=Boolean(preset.geh);
  const maxRank=Math.max(1,Math.min(3,Number(params.get('ranks'))||1));
  const resultCount=Math.max(1,Math.min(5000,Number(params.get('count'))||preset.count));
  shell.dataset.mix=mix;
  shell.dataset.area=area||'viewer';
  shell.classList.toggle('geh-mode',gehMode);

  const states=[
    {type:'left',items:['22','1','2']},{type:'straight',items:['1','2','3']},{type:'straight',items:['2','3','4']},{type:'straight',items:['3','4','5']},{type:'straight',items:['4','5','6']},{type:'right',items:['5','6','7']},{type:'left',items:['6','7','DOOR']},{type:'straight',items:['7','DOOR','8']},{type:'straight',items:['DOOR','8','9']},{type:'straight',items:['8','9','10']},{type:'straight',items:['9','10','11']},{type:'right',items:['10','11','12']},{type:'left',items:['11','12','13']},{type:'straight',items:['12','13','14']},{type:'straight',items:['13','14','15']},{type:'straight',items:['14','15','16']},{type:'straight',items:['15','16','17']},{type:'right',items:['16','17','18']},{type:'left',items:['17','18','19']},{type:'straight',items:['18','19','20']},{type:'straight',items:['19','20','21']},{type:'straight',items:['20','21','DOOR']},{type:'straight',items:['21','DOOR','22']},{type:'right',items:['DOOR','22','1']}
  ];
  const roomFrame=document.getElementById('roomFrame');
  const slots={angledLeft:document.getElementById('angledLeft'),flatLeft:document.getElementById('flatLeft'),flatCenter:document.getElementById('flatCenter'),flatRight:document.getElementById('flatRight'),angledRight:document.getElementById('angledRight'),leftCorner:document.getElementById('leftCorner'),rightCorner:document.getElementById('rightCorner')};
  const roomButtons=[slots.angledLeft,slots.flatLeft,slots.flatCenter,slots.flatRight,slots.angledRight];

  let view='thumbnail';
  let roomState=0;
  let thumbPage=0;
  let endlessStart=0;
  let rank=1;
  let artworkReturn=null;

  function rankWord(n){return n===1?'1ST':n===2?'2ND':'3RD'}
  function itemText(item){return item==='DOOR'?'DOOR':`ART ${item}`}
  function setView(next){view=next;shell.dataset.view=next;viewLabel.textContent={exhibit:'EXHIBIT VIEW',room:'ROOM VIEW',thumbnail:'THUMBNAILS',endless:'ENDLESS WALL',artwork:'ARTWORK VIEW'}[next]||'';updateNav()}

  function applyCapabilities(){
    [[exhibitBtn,'exhibit'],[roomBtn,'room'],[thumbnailBtn,'thumbnail'],[endlessBtn,'endless'],[doorBtn,'room']].forEach(([button,key])=>button.hidden=!capabilities[key]);
    const visible=[...controls.children].filter(el=>el.tagName==='A'||!el.hidden).length;
    controls.style.setProperty('--control-count',String(visible));
  }
  function updateRankButtons(){rankButtons.forEach(b=>{const n=Number(b.dataset.rank);b.hidden=!gehMode||n>maxRank;b.classList.toggle('is-selected',n===rank);b.setAttribute('aria-pressed',n===rank?'true':'false')})}

  function makeMapButton(label,art){const b=document.createElement('button');b.type='button';b.className='map-spot';b.textContent=label;b.dataset.art=String(art);b.addEventListener('click',()=>openArtwork(art,rank,'exhibit'));return b}
  function makeDoor(label){const b=document.createElement('button');b.type='button';b.className='map-door';b.textContent=label;b.disabled=true;return b}
  function renderExhibitMap(){
    if(!capabilities.exhibit)return;
    [mapTop,mapLeft,mapRight,mapBottom].forEach(el=>el.replaceChildren());
    // Exact 22 art positions + two fixed door positions, rendered as a plain room perimeter.
    [8,'D2',9,10,11,12].forEach(v=>mapTop.append(v==='D2'?makeDoor('DOOR'):makeMapButton(`THEME ${v}`,v)));
    [7,6,5,4,3,2].forEach(v=>mapLeft.append(makeMapButton(`THEME ${v}`,v)));
    [13,14,15,16,17,18].forEach(v=>mapRight.append(makeMapButton(`THEME ${v}`,v)));
    [1,'D1',22,21,20,19].forEach(v=>mapBottom.append(v==='D1'?makeDoor('DOOR'):makeMapButton(`THEME ${v}`,v)));
    setView('exhibit');
  }

  function clearRoom(){Object.values(slots).forEach(el=>{el.hidden=true;el.classList.add('hidden');if(el.tagName==='BUTTON'){el.textContent='';el.classList.remove('door-card');el.dataset.item=''}})}
  function prepareSlot(el,item){el.hidden=false;el.classList.remove('hidden');el.dataset.item=item;el.classList.toggle('door-card',item==='DOOR');el.textContent=itemText(item);el.setAttribute('aria-label',itemText(item))}
  function renderRoom(index=roomState){
    if(!capabilities.room)return;
    roomState=(index+states.length)%states.length;clearRoom();const s=states[roomState];roomFrame.dataset.layout=s.type;
    if(s.type==='left'){prepareSlot(slots.angledLeft,s.items[0]);slots.leftCorner.hidden=false;slots.leftCorner.classList.remove('hidden');prepareSlot(slots.flatCenter,s.items[1]);prepareSlot(slots.flatRight,s.items[2])}
    else if(s.type==='right'){prepareSlot(slots.flatLeft,s.items[0]);prepareSlot(slots.flatCenter,s.items[1]);slots.rightCorner.hidden=false;slots.rightCorner.classList.remove('hidden');prepareSlot(slots.angledRight,s.items[2])}
    else{prepareSlot(slots.flatLeft,s.items[0]);prepareSlot(slots.flatCenter,s.items[1]);prepareSlot(slots.flatRight,s.items[2])}
    setView('room');
  }

  function renderThumbnails(){
    if(!capabilities.thumbnail)return;
    thumbnailGrid.replaceChildren();
    if(gehMode){
      for(let i=1;i<=22;i++){const b=document.createElement('button');b.type='button';b.textContent=`THEME ${i} · ${rankWord(rank)}`;b.addEventListener('click',()=>openArtwork(i,rank,'thumbnail'));thumbnailGrid.appendChild(b)}
      thumbnailStatus.textContent=`${preset.label} · ${rankWord(rank)} · 22 THEMES`;
    }else{
      const pages=Math.ceil(resultCount/PAGE_SIZE);thumbPage=Math.max(0,Math.min(pages-1,thumbPage));const first=thumbPage*PAGE_SIZE;const last=Math.min(resultCount,first+PAGE_SIZE);
      for(let i=first;i<last;i++){const b=document.createElement('button');b.type='button';b.textContent=`ART ${i+1}`;b.addEventListener('click',()=>openArtwork(i+1,1,'thumbnail'));thumbnailGrid.appendChild(b)}
      thumbnailStatus.textContent=`${preset.label} · ${first+1}–${last} OF ${resultCount}`;
    }
    setView('thumbnail');
  }

  function renderEndless(){
    if(!capabilities.endless)return;
    const maxStart=Math.max(0,resultCount-3);endlessStart=Math.max(0,Math.min(maxStart,endlessStart));
    endlessArts.forEach((b,i)=>{const index=endlessStart+i;if(index>=resultCount){b.classList.add('is-empty');b.textContent='';delete b.dataset.result}else{b.classList.remove('is-empty');b.textContent=`ART ${index+1}`;b.dataset.result=String(index)}});
    const end=Math.min(resultCount,endlessStart+3);endlessStatus.textContent=`${preset.label} · ${endlessStart+1}–${end} OF ${resultCount}`;setView('endless');
  }

  function openArtwork(number,selectedRank=1,source=view){artworkReturn={source,roomState,thumbPage,endlessStart,rank};artworkLabel.textContent=gehMode?`THEME ${number} · ${rankWord(selectedRank)}`:`ART ${number}`;artworkCopy.textContent=gehMode?`${preset.label} · THEME ${number} · ${rankWord(selectedRank)}`:`${preset.label} · ART ${number}`;setView('artwork')}
  function restoreArtwork(){if(!artworkReturn){capabilities.thumbnail?renderThumbnails():renderRoom();return}({roomState,thumbPage,endlessStart,rank}=artworkReturn);updateRankButtons();if(artworkReturn.source==='exhibit')renderExhibitMap();else if(artworkReturn.source==='room')renderRoom(roomState);else if(artworkReturn.source==='endless')renderEndless();else renderThumbnails()}

  function setRank(n){n=Number(n);if(!gehMode||n<1||n>maxRank)return;rank=n;updateRankButtons();if(view==='exhibit')renderExhibitMap();else if(view==='thumbnail')renderThumbnails()}
  function updateNav(){
    leftBtn.disabled=false;rightBtn.disabled=false;
    if(view==='thumbnail'&&!gehMode){const pages=Math.ceil(resultCount/PAGE_SIZE);leftBtn.disabled=thumbPage<=0;rightBtn.disabled=thumbPage>=pages-1}
    else if(view==='thumbnail'&&gehMode){leftBtn.disabled=true;rightBtn.disabled=true}
    else if(view==='endless'){leftBtn.disabled=endlessStart<=0;rightBtn.disabled=endlessStart>=Math.max(0,resultCount-3)}
    else if(view==='artwork'||view==='exhibit'){leftBtn.disabled=true;rightBtn.disabled=true}
  }
  function goLeft(){if(view==='room')renderRoom(roomState-1);else if(view==='thumbnail'&&!gehMode&&thumbPage>0){thumbPage--;renderThumbnails()}else if(view==='endless'&&endlessStart>0){endlessStart--;renderEndless()}}
  function goRight(){if(view==='room')renderRoom(roomState+1);else if(view==='thumbnail'&&!gehMode&&thumbPage<Math.ceil(resultCount/PAGE_SIZE)-1){thumbPage++;renderThumbnails()}else if(view==='endless'&&endlessStart<Math.max(0,resultCount-3)){endlessStart++;renderEndless()}}

  roomButtons.forEach(b=>b.addEventListener('click',()=>{if(b.dataset.item&&b.dataset.item!=='DOOR')openArtwork(Number(b.dataset.item),1,'room')}));
  endlessArts.forEach(b=>b.addEventListener('click',()=>{if(b.dataset.result!=null)openArtwork(Number(b.dataset.result)+1,1,'endless')}));
  rankButtons.forEach(b=>b.addEventListener('click',()=>setRank(b.dataset.rank)));
  leftBtn.addEventListener('click',goLeft);rightBtn.addEventListener('click',goRight);exhibitBtn.addEventListener('click',renderExhibitMap);roomBtn.addEventListener('click',()=>renderRoom(roomState));thumbnailBtn.addEventListener('click',renderThumbnails);endlessBtn.addEventListener('click',renderEndless);doorBtn.addEventListener('click',()=>renderRoom(7));artworkBack.addEventListener('click',restoreArtwork);

  let sx=0,sy=0,tracking=false,suppressUntil=0;const SWIPE_MIN=42;
  stage.addEventListener('touchstart',e=>{if(e.touches.length!==1){tracking=false;return}const t=e.touches[0];sx=t.clientX;sy=t.clientY;tracking=true},{passive:true});
  stage.addEventListener('touchmove',e=>{if(!tracking||e.touches.length!==1)return;const t=e.touches[0],dx=t.clientX-sx,dy=t.clientY-sy;if(Math.abs(dx)>14&&Math.abs(dx)>Math.abs(dy)*1.15)e.preventDefault()},{passive:false});
  stage.addEventListener('touchend',e=>{if(!tracking)return;tracking=false;const t=e.changedTouches[0],dx=t.clientX-sx,dy=t.clientY-sy;if(Math.abs(dx)<SWIPE_MIN||Math.abs(dx)<=Math.abs(dy)*1.15)return;if(view!=='room'&&view!=='endless'&&view!=='thumbnail')return;suppressUntil=Date.now()+400;dx<0?goRight():goLeft()},{passive:true});
  stage.addEventListener('touchcancel',()=>tracking=false,{passive:true});stage.addEventListener('click',e=>{if(Date.now()<suppressUntil){e.preventDefault();e.stopPropagation()}},true);

  applyCapabilities();updateRankButtons();
  const start=(params.get('start')||preset.start).toLowerCase();
  if(start==='exhibit'&&capabilities.exhibit)renderExhibitMap();else if(start==='room'&&capabilities.room)renderRoom(1);else if(start==='endless'&&capabilities.endless)renderEndless();else renderThumbnails();
})();
