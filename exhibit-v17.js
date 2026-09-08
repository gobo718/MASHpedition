(()=>{
  const shell=document.getElementById('exhibitShell');
  const viewLabel=document.getElementById('viewLabel');
  const leftBtn=document.getElementById('leftBtn');
  const rightBtn=document.getElementById('rightBtn');
  const overheadBtn=document.getElementById('overheadBtn');
  const roomBtn=document.getElementById('roomBtn');
  const thumbnailBtn=document.getElementById('thumbnailBtn');
  const endlessBtn=document.getElementById('endlessBtn');
  const doorBtn=document.getElementById('doorBtn');
  const frontDoor=document.getElementById('frontDoor');
  const exhibitControls=document.getElementById('exhibitControls');

  const thumbnailGrid=document.getElementById('thumbnailGrid');
  const thumbnailStatus=document.getElementById('thumbnailStatus');
  const endlessStatus=document.getElementById('endlessStatus');
  const endlessSlots=[
    document.getElementById('endlessLeftArt'),
    document.getElementById('endlessCenterArt'),
    document.getElementById('endlessRightArt')
  ];

  const artworkScroll=document.getElementById('artworkScroll');
  const artworkBack=document.getElementById('artworkBack');
  const artworkCenter=document.getElementById('artworkCenter');
  const artworkPlaque=document.getElementById('artworkPlaque');
  const artworkLabel=document.getElementById('artworkLabel');
  const artworkArea=document.getElementById('artworkArea');
  const artworkRankTime=document.getElementById('artworkRankTime');
  const artworkEmojis=document.getElementById('artworkEmojis');
  const artworkTheme=document.getElementById('artworkTheme');
  const creatorLink=document.getElementById('creatorLink');
  const plaqueText=document.getElementById('plaqueText');
  const artworkExpand=document.getElementById('artworkExpand');
  const expandBack=document.getElementById('expandBack');
  const expandContent=document.getElementById('expandContent');

  const leftSlots=[
    document.getElementById('leftPerspectiveSlot'),
    document.getElementById('leftNormalSlot1'),
    document.getElementById('leftNormalSlot2')
  ];

  // Because the entire right-corner canvas is mirrored, its visual left-to-right
  // order is normal-2, normal-1, perspective.
  const rightSlotsVisual=[
    document.getElementById('rightNormalSlot2'),
    document.getElementById('rightNormalSlot1'),
    document.getElementById('rightPerspectiveSlot')
  ];

  const wallSlots=[
    document.getElementById('wallLeftArt'),
    document.getElementById('wallCenterArt'),
    document.getElementById('wallRightArt')
  ];

  const allRoomSlotButtons=[...leftSlots,...rightSlotsVisual,...wallSlots];
  const overheadSlots=[...document.querySelectorAll('.overhead-slot')];
  const rankButtons=[...document.querySelectorAll('.rank-selector [data-rank]')];

  // ----------------------------------------------------------------
  // Shared viewer configuration.
  //
  // URL test hooks:
  //   ?mix=A|B|C
  //   ?ranks=1|2|3      (GEH unlock depth; default 1)
  //   ?start=exhibit|room|thumbnail|endless|door
  //   ?count=120        (generic paginated result count)
  //
  // Mix B is the default current prototype and is treated as the GEH
  // demonstration so the rank-layer behavior is visible when unlocked.
  // ----------------------------------------------------------------
  const params=new URLSearchParams(window.location.search);
  const requestedMix=(params.get('mix')||'B').toUpperCase();
  const mix=['A','B','C'].includes(requestedMix)?requestedMix:'B';
  const maxUnlockedRank=Math.max(1,Math.min(3,Number(params.get('ranks'))||1));
  const gehMode=(params.get('geh')==='1') || (params.get('geh')!=='0' && mix==='B');
  const defaultResultCount=mix==='A'?120:22;
  const genericResultCount=Math.max(1,Math.min(5000,Number(params.get('count'))||defaultResultCount));
  const PAGE_SIZE=22;

  const capabilities={
    A:{exhibit:false,room:false,thumbnail:true,endless:true},
    B:{exhibit:true, room:true, thumbnail:true,endless:false},
    C:{exhibit:true, room:true, thumbnail:true,endless:true}
  }[mix];

  shell.dataset.mix=mix;
  shell.classList.toggle('geh-mode',gehMode);

  // 24 fixed physical positions around the approved room:
  // 22 artwork positions + two fixed doors.
  const roomSlots=[
    {kind:'door',number:1},
    {kind:'art',number:1},
    {kind:'art',number:2},
    {kind:'art',number:3},
    {kind:'art',number:4},
    {kind:'art',number:5},
    {kind:'art',number:6},
    {kind:'art',number:7},
    {kind:'art',number:8},
    {kind:'door',number:2},
    {kind:'art',number:9},
    {kind:'art',number:10},
    {kind:'art',number:11},
    {kind:'art',number:12},
    {kind:'art',number:13},
    {kind:'art',number:14},
    {kind:'art',number:15},
    {kind:'art',number:16},
    {kind:'art',number:17},
    {kind:'art',number:18},
    {kind:'art',number:19},
    {kind:'art',number:20},
    {kind:'art',number:21},
    {kind:'art',number:22}
  ];

  // Approved corners. Do not change these without changing room geometry.
  const cornerAfter=new Set([1,7,13,19]);

  let roomStart=1;
  let lastRoomStart=1;
  let selectedArt=1;
  let selectedRank=1;
  let gehRank=1;
  let thumbnailPage=0;
  let endlessIndex=0;
  let artworkReturn=null;
  let expandedScrollTop=0;

  const labels={
    door:'DOOR',
    left:'ROOM VIEW',
    wall:'ROOM VIEW',
    right:'ROOM VIEW',
    zoom:'ARTWORK VIEW',
    thumbnail:'THUMBNAILS',
    overhead:'EXHIBIT VIEW',
    endless:'ENDLESS WALL VIEW'
  };

  const emojiPairs=[
    ['🎭','✨'],['😂','🤪'],['😢','🌧️'],['😍','🔥'],['😱','🌑'],['🌀','👁️'],
    ['😡','⚡'],['🌙','💫'],['💋','🎪'],['🤢','🫠'],['👻','🕯️'],['🧠','💡'],
    ['🥳','🎉'],['🫶','🌈'],['🪞','🕸️'],['🌹','🗡️'],['🧸','🌟'],['👽','📡'],
    ['🫣','🧨'],['🏆','🎨'],['🦴','🧿'],['🎬','🪩']
  ];

  function wrap(i){
    const n=roomSlots.length;
    return ((i%n)+n)%n;
  }

  function trioAt(start){
    return [roomSlots[wrap(start)],roomSlots[wrap(start+1)],roomSlots[wrap(start+2)]];
  }

  function viewTypeFor(start){
    const s=wrap(start);
    if(cornerAfter.has(s)) return 'left';
    if(cornerAfter.has(wrap(s+1))) return 'right';
    return 'wall';
  }

  function rankWord(rank){
    return rank===1?'1ST':rank===2?'2ND':'3RD';
  }

  function setView(view){
    const allowed=new Set(['door','left','wall','right','overhead','zoom','thumbnail','endless']);
    const next=allowed.has(view)?view:'door';
    shell.dataset.view=next;
    viewLabel.textContent=labels[next]||next.toUpperCase();
    updateNavigationState();
  }

  function applyCapabilities(){
    const capabilityButtons=[
      [overheadBtn,'exhibit'],
      [roomBtn,'room'],
      [thumbnailBtn,'thumbnail'],
      [endlessBtn,'endless']
    ];
    capabilityButtons.forEach(([button,key])=>{
      button.hidden=!capabilities[key];
    });
    const visible=[...exhibitControls.querySelectorAll('button')].filter(button=>!button.hidden).length;
    exhibitControls.style.setProperty('--control-count',String(visible));
  }

  function updateRankButtons(){
    rankButtons.forEach(button=>{
      const rank=Number(button.dataset.rank);
      button.hidden=!gehMode || rank>maxUnlockedRank;
      button.classList.toggle('is-selected',rank===gehRank);
      button.setAttribute('aria-pressed',rank===gehRank?'true':'false');
    });
  }

  function resetSlotButton(button){
    button.classList.remove('is-door-slot','is-art-slot');
    button.disabled=false;
    button.removeAttribute('data-art');
    button.removeAttribute('data-door');
    button.removeAttribute('data-rank');
    button.setAttribute('aria-label','');
    const span=button.querySelector('span');
    if(span) span.textContent='';
  }

  // Room View is always the primary (#1) room. It does not participate in
  // GEH 2nd/3rd rank switching.
  function paintRoomSlot(button,slot){
    resetSlotButton(button);
    const span=button.querySelector('span');

    if(slot.kind==='door'){
      button.classList.add('is-door-slot');
      button.dataset.door=String(slot.number);
      button.disabled=slot.number!==1;
      button.setAttribute(
        'aria-label',
        slot.number===1 ? 'Exit exhibit through Door 1' : `Door ${slot.number}`
      );
      if(span) span.textContent='';
      return;
    }

    button.classList.add('is-art-slot');
    button.dataset.art=String(slot.number);
    button.dataset.rank='1';
    button.setAttribute('aria-label',`Art ${slot.number}`);
    if(span) span.textContent=`ART ${slot.number}`;
  }

  function paintOverheadSlot(button,slot){
    button.classList.remove('is-overhead-art','is-overhead-door');
    button.disabled=false;
    button.removeAttribute('data-art');
    button.removeAttribute('data-door');
    button.removeAttribute('data-rank');

    const span=button.querySelector('span');

    if(slot.kind==='door'){
      button.classList.add('is-overhead-door');
      button.dataset.door=String(slot.number);
      button.disabled=slot.number!==1;
      button.setAttribute(
        'aria-label',
        slot.number===1 ? 'Door 1 — exit exhibit' : 'Door 2'
      );
      if(span) span.textContent=`DOOR ${slot.number}`;
      return;
    }

    button.classList.add('is-overhead-art');
    button.dataset.art=String(slot.number);
    button.dataset.rank=String(gehMode?gehRank:1);
    const suffix=gehMode?` · ${rankWord(gehRank)}`:'';
    button.setAttribute('aria-label',`Art ${slot.number}${gehMode?`, ${rankWord(gehRank)} place`:''}`);
    if(span) span.textContent=`ART ${slot.number}${suffix}`;
  }

  function renderOverhead(){
    if(!capabilities.exhibit){
      renderThumbnailPage();
      return;
    }
    overheadSlots.forEach(button=>{
      const index=Number(button.dataset.roomIndex);
      paintOverheadSlot(button,roomSlots[wrap(index)]);
    });
    updateRankButtons();
    setView('overhead');
  }

  function renderRoom(start=lastRoomStart){
    if(!capabilities.room){
      renderThumbnailPage();
      return;
    }

    roomStart=wrap(start);
    lastRoomStart=roomStart;
    const trio=trioAt(roomStart);
    const type=viewTypeFor(roomStart);

    if(type==='left'){
      trio.forEach((slot,i)=>paintRoomSlot(leftSlots[i],slot));
    }else if(type==='right'){
      trio.forEach((slot,i)=>paintRoomSlot(rightSlotsVisual[i],slot));
    }else{
      trio.forEach((slot,i)=>paintRoomSlot(wallSlots[i],slot));
    }

    setView(type);
  }

  function currentGenericPageCount(){
    return Math.ceil(genericResultCount/PAGE_SIZE);
  }

  function renderThumbnailPage(){
    if(!capabilities.thumbnail) return;

    thumbnailGrid.replaceChildren();

    if(gehMode){
      thumbnailPage=0;
      for(let art=1;art<=22;art++){
        const button=document.createElement('button');
        button.type='button';
        button.dataset.art=String(art);
        button.dataset.rank=String(gehRank);
        button.textContent=`ART ${art} · ${rankWord(gehRank)}`;
        button.setAttribute('aria-label',`Art ${art}, ${rankWord(gehRank)} place`);
        button.addEventListener('click',()=>openArtwork(art,gehRank,'thumbnail'));
        thumbnailGrid.appendChild(button);
      }
      thumbnailStatus.textContent=`GRAND EXHIBITION HALL · ${rankWord(gehRank)} · 22 THEMES`;
      updateRankButtons();
    }else{
      const pageCount=currentGenericPageCount();
      thumbnailPage=Math.max(0,Math.min(pageCount-1,thumbnailPage));
      const start=thumbnailPage*PAGE_SIZE;
      const end=Math.min(genericResultCount,start+PAGE_SIZE);
      for(let i=start;i<end;i++){
        const button=document.createElement('button');
        button.type='button';
        button.dataset.result=String(i);
        button.textContent=`RESULT ${i+1}`;
        button.setAttribute('aria-label',`Result ${i+1}`);
        button.addEventListener('click',()=>openArtwork(i+1,1,'thumbnail'));
        thumbnailGrid.appendChild(button);
      }
      thumbnailStatus.textContent=`PAGE ${thumbnailPage+1} / ${pageCount} · ${start+1}–${end} OF ${genericResultCount}`;
    }

    setView('thumbnail');
  }

  function paintEndlessSlot(button,index){
    button.classList.remove('is-empty');
    button.disabled=false;
    button.removeAttribute('data-result');
    const span=button.querySelector('span');

    if(index<0 || index>=genericResultCount){
      button.classList.add('is-empty');
      button.disabled=true;
      if(span) span.textContent='';
      return;
    }

    button.dataset.result=String(index);
    button.setAttribute('aria-label',`Result ${index+1}`);
    if(span) span.textContent=`RESULT ${index+1}`;
  }

  // Endless Wall displays only three DOM image positions. PAGE_SIZE controls
  // which logical result batch is considered loaded. Crossing a page boundary
  // swaps the batch; the entire result set is never placed in the DOM.
  function renderEndless(){
    if(!capabilities.endless){
      renderThumbnailPage();
      return;
    }

    endlessIndex=Math.max(0,Math.min(genericResultCount-1,endlessIndex));
    paintEndlessSlot(endlessSlots[0],endlessIndex-1);
    paintEndlessSlot(endlessSlots[1],endlessIndex);
    paintEndlessSlot(endlessSlots[2],endlessIndex+1);

    const loadedPage=Math.floor(endlessIndex/PAGE_SIZE);
    const loadedStart=loadedPage*PAGE_SIZE;
    const loadedEnd=Math.min(genericResultCount,loadedStart+PAGE_SIZE);
    endlessStatus.textContent=
      `RESULT ${endlessIndex+1} OF ${genericResultCount} · LOADED ${loadedStart+1}–${loadedEnd}`;

    setView('endless');
  }

  function setRank(rank){
    rank=Number(rank);
    if(!gehMode || rank<1 || rank>maxUnlockedRank) return;
    gehRank=rank;
    updateRankButtons();

    if(shell.dataset.view==='overhead') renderOverhead();
    else if(shell.dataset.view==='thumbnail') renderThumbnailPage();
  }

  function rememberArtworkReturn(){
    artworkReturn={
      view:shell.dataset.view,
      roomStart:lastRoomStart,
      thumbnailPage,
      endlessIndex,
      gehRank
    };
  }

  function updateArtworkCopy(number,rank){
    selectedArt=Number(number)||1;
    selectedRank=Number(rank)||1;

    const theme=((selectedArt-1)%22)+1;
    const pair=emojiPairs[(theme-1)%emojiPairs.length];

    artworkLabel.textContent=gehMode
      ? `ART ${selectedArt} · ${rankWord(selectedRank)}`
      : `RESULT ${selectedArt}`;

    artworkArea.textContent=gehMode?'GRAND EXHIBITION HALL':'ARTWORK RESULT';
    artworkRankTime.textContent=gehMode
      ? `#${selectedRank} · ALL TIME`
      : `RESULT ${selectedArt}`;
    artworkEmojis.textContent=`${pair[0]} ${pair[1]}`;
    artworkTheme.textContent=`THEME ${theme}`;
    creatorLink.textContent=`Creator${String(selectedArt).padStart(2,'0')}`;
    plaqueText.textContent=gehMode
      ? `Plaque for Theme ${theme}, ${rankWord(selectedRank)} place. Tap to fill the viewing area.`
      : `Plaque associated with Result ${selectedArt}. Tap to fill the viewing area.`;
  }

  function openArtwork(number,rank=1){
    rememberArtworkReturn();
    updateArtworkCopy(number,rank);
    artworkScroll.scrollTop=0;
    setView('zoom');
  }

  function restoreArtworkSource(){
    if(!artworkReturn){
      renderRoom(lastRoomStart);
      return;
    }

    const target=artworkReturn;
    thumbnailPage=target.thumbnailPage;
    endlessIndex=target.endlessIndex;
    gehRank=target.gehRank;
    lastRoomStart=target.roomStart;

    if(target.view==='thumbnail') renderThumbnailPage();
    else if(target.view==='endless') renderEndless();
    else if(target.view==='overhead') renderOverhead();
    else if(['left','right','wall'].includes(target.view)) renderRoom(target.roomStart);
    else if(target.view==='door') setView('door');
    else if(capabilities.room) renderRoom(target.roomStart);
    else renderThumbnailPage();
  }

  function openExpanded(kind){
    expandedScrollTop=artworkScroll.scrollTop;
    expandContent.replaceChildren();

    if(kind==='plaque'){
      const panel=document.createElement('div');
      panel.className='expand-plaque';
      const heading=document.createElement('strong');
      heading.textContent='PLAQUE';
      const copy=document.createElement('span');
      copy.textContent=plaqueText.textContent;
      panel.append(heading,copy);
      expandContent.appendChild(panel);
    }else{
      const art=document.createElement('div');
      art.className='expand-art';
      art.textContent=artworkLabel.textContent;
      expandContent.appendChild(art);
    }

    artworkExpand.classList.add('is-open');
    expandBack.focus({preventScroll:true});
  }

  function closeExpanded(){
    artworkExpand.classList.remove('is-open');
    expandContent.replaceChildren();
    requestAnimationFrame(()=>{
      artworkScroll.scrollTop=expandedScrollTop;
    });
  }

  function updateNavigationState(){
    const view=shell.dataset.view;

    leftBtn.disabled=false;
    rightBtn.disabled=false;

    if(view==='thumbnail'){
      if(gehMode){
        leftBtn.disabled=true;
        rightBtn.disabled=true;
      }else{
        const pageCount=currentGenericPageCount();
        leftBtn.disabled=thumbnailPage<=0;
        rightBtn.disabled=thumbnailPage>=pageCount-1;
      }
    }else if(view==='endless'){
      leftBtn.disabled=endlessIndex<=0;
      rightBtn.disabled=endlessIndex>=genericResultCount-1;
    }else if(view==='zoom'){
      leftBtn.disabled=true;
      rightBtn.disabled=true;
    }else if(view==='overhead' && !capabilities.room){
      leftBtn.disabled=true;
      rightBtn.disabled=true;
    }
  }

  function handleLeft(){
    const view=shell.dataset.view;

    if(view==='thumbnail'){
      if(!gehMode && thumbnailPage>0){
        thumbnailPage-=1;
        renderThumbnailPage();
      }
      return;
    }

    if(view==='endless'){
      if(endlessIndex>0){
        endlessIndex-=1;
        renderEndless();
      }
      return;
    }

    if(view==='zoom') return;

    if(view==='door'){
      if(capabilities.room) renderRoom(0);
      else if(capabilities.thumbnail) renderThumbnailPage();
      return;
    }

    if(capabilities.room) renderRoom(lastRoomStart-1);
  }

  function handleRight(){
    const view=shell.dataset.view;

    if(view==='thumbnail'){
      if(!gehMode && thumbnailPage<currentGenericPageCount()-1){
        thumbnailPage+=1;
        renderThumbnailPage();
      }
      return;
    }

    if(view==='endless'){
      if(endlessIndex<genericResultCount-1){
        endlessIndex+=1;
        renderEndless();
      }
      return;
    }

    if(view==='zoom') return;

    if(view==='door'){
      if(capabilities.room) renderRoom(1);
      else if(capabilities.thumbnail) renderThumbnailPage();
      return;
    }

    if(capabilities.room) renderRoom(lastRoomStart+1);
  }

  allRoomSlotButtons.forEach(button=>{
    button.addEventListener('click',()=>{
      if(button.classList.contains('is-door-slot')){
        if(button.dataset.door==='1') setView('door');
        return;
      }
      openArtwork(button.dataset.art,1);
    });
  });

  overheadSlots.forEach(button=>{
    button.addEventListener('click',()=>{
      if(button.classList.contains('is-overhead-door')){
        if(button.dataset.door==='1') setView('door');
        return;
      }
      openArtwork(button.dataset.art,gehMode?gehRank:1);
    });
  });

  endlessSlots.forEach(button=>{
    button.addEventListener('click',()=>{
      if(button.classList.contains('is-empty')) return;
      const index=Number(button.dataset.result);
      if(!Number.isFinite(index)) return;
      endlessIndex=index;
      renderEndless();
      openArtwork(index+1,1);
    });
  });

  rankButtons.forEach(button=>{
    button.addEventListener('click',()=>setRank(button.dataset.rank));
  });

  leftBtn.addEventListener('click',handleLeft);
  rightBtn.addEventListener('click',handleRight);
  overheadBtn.addEventListener('click',renderOverhead);
  roomBtn.addEventListener('click',()=>renderRoom(lastRoomStart));
  thumbnailBtn.addEventListener('click',renderThumbnailPage);
  endlessBtn.addEventListener('click',renderEndless);

  // Exterior Door 1 enters at its exact interior physical position:
  // ART 22 | DOOR 1 | ART 1, with Door 1 centered.
  frontDoor.addEventListener('click',()=>{
    if(capabilities.room) renderRoom(23);
    else if(capabilities.thumbnail) renderThumbnailPage();
  });

  doorBtn.addEventListener('click',()=>{
    roomStart=23;
    lastRoomStart=23;
    setView('door');
  });

  artworkBack.addEventListener('click',restoreArtworkSource);
  artworkCenter.addEventListener('click',()=>openExpanded('art'));
  artworkPlaque.addEventListener('click',()=>openExpanded('plaque'));
  expandBack.addEventListener('click',closeExpanded);

  // Creator interaction is intentionally not invented in this engine pass.
  creatorLink.addEventListener('click',event=>event.preventDefault());

  applyCapabilities();
  updateRankButtons();

  // Prepare the overhead map once so it is immediately ready.
  overheadSlots.forEach(button=>{
    const index=Number(button.dataset.roomIndex);
    paintOverheadSlot(button,roomSlots[wrap(index)]);
  });

  const requestedStart=(params.get('start')||'door').toLowerCase();
  if(requestedStart==='exhibit' && capabilities.exhibit) renderOverhead();
  else if(requestedStart==='room' && capabilities.room) renderRoom(1);
  else if(requestedStart==='thumbnail' && capabilities.thumbnail) renderThumbnailPage();
  else if(requestedStart==='endless' && capabilities.endless) renderEndless();
  else setView('door');
})();
