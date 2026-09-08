(()=>{
  const shell=document.getElementById('exhibitShell');
  const viewLabel=document.getElementById('viewLabel');
  const artworkLabel=document.getElementById('artworkLabel');
  const depthPanel=document.getElementById('depthPanel');
  const leftBtn=document.getElementById('leftBtn');
  const rightBtn=document.getElementById('rightBtn');
  const thumbnailBtn=document.getElementById('thumbnailBtn');
  const doorBtn=document.getElementById('doorBtn');

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

  // 24 fixed physical positions around the room:
  // 22 artwork positions + the two doors, which never move.
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

  // Four six-position wall runs. The approved opening corner is between
  // ART 1 and ART 2; the remaining corners follow every six physical slots.
  // These are the slot indexes immediately BEFORE a corner.
  const cornerAfter=new Set([1,7,13,19]);

  // Opening room position: ART 1 on the peripheral side, ART 2 and ART 3
  // on the straight wall — the geometry already approved in v9/v13.
  let roomStart=1;
  let lastRoomStart=1;
  let selectedArt=1;

  const labels={
    door:'DOOR',
    left:'LEFT CORNER VIEW',
    wall:'WALL VIEW',
    right:'RIGHT CORNER VIEW',
    zoom:'ARTWORK VIEW',
    thumbnail:'THUMBNAIL VIEW'
  };

  function wrap(i){
    const n=roomSlots.length;
    return ((i%n)+n)%n;
  }

  function trioAt(start){
    return [roomSlots[wrap(start)],roomSlots[wrap(start+1)],roomSlots[wrap(start+2)]];
  }

  function viewTypeFor(start){
    const s=wrap(start);
    // Corner after the first visible position: LEFT CORNER geometry.
    if(cornerAfter.has(s)) return 'left';
    // Corner after the second visible position: RIGHT CORNER geometry.
    if(cornerAfter.has(wrap(s+1))) return 'right';
    return 'wall';
  }

  function setView(view){
    const allowed=new Set(['door','left','wall','right','zoom','thumbnail']);
    const next=allowed.has(view)?view:'door';
    shell.dataset.view=next;
    viewLabel.textContent=labels[next]||next.toUpperCase();
  }

  function resetSlotButton(button){
    button.classList.remove('is-door-slot','is-art-slot');
    button.disabled=false;
    button.removeAttribute('data-art');
    button.removeAttribute('data-door');
    button.setAttribute('aria-label','');
    const span=button.querySelector('span');
    if(span) span.textContent='';
  }

  function paintSlot(button,slot){
    resetSlotButton(button);
    const span=button.querySelector('span');

    if(slot.kind==='door'){
      button.classList.add('is-door-slot');
      button.disabled=true;
      button.dataset.door=String(slot.number);
      button.setAttribute('aria-label',`Door ${slot.number}`);
      if(span) span.textContent='';
      return;
    }

    button.classList.add('is-art-slot');
    button.dataset.art=String(slot.number);
    button.setAttribute('aria-label',`Art ${slot.number}`);
    if(span) span.textContent=`ART ${slot.number}`;
  }

  function renderRoom(start){
    roomStart=wrap(start);
    lastRoomStart=roomStart;
    const trio=trioAt(roomStart);
    const type=viewTypeFor(roomStart);

    if(type==='left'){
      trio.forEach((slot,i)=>paintSlot(leftSlots[i],slot));
    }else if(type==='right'){
      // Assign in VISUAL left-to-right order; geometry stays an exact mirror.
      trio.forEach((slot,i)=>paintSlot(rightSlotsVisual[i],slot));
    }else{
      trio.forEach((slot,i)=>paintSlot(wallSlots[i],slot));
    }

    setView(type);
  }

  function moveRoom(delta){
    // Leaving a non-spatial overlay returns to the last physical room position,
    // then advances one physical slot in the requested direction.
    const base=(shell.dataset.view==='door')
      ? (delta>0?1:0)
      : lastRoomStart+delta;

    if(shell.dataset.view==='door'){
      renderRoom(base);
    }else{
      renderRoom(base);
    }
  }

  function openPlaceholderArt(number){
    // Click behavior is deliberately still only a placeholder; the room circuit
    // is the scope of v14. Preserve enough behavior to keep current testing usable.
    selectedArt=Number(number)||1;
    artworkLabel.textContent=`ART ${selectedArt}`;
    depthPanel.textContent='IMAGE DETAIL';
    setView('zoom');
  }

  allRoomSlotButtons.forEach(button=>{
    button.addEventListener('click',()=>{
      if(button.classList.contains('is-door-slot')) return;
      openPlaceholderArt(button.dataset.art);
    });
  });

  document.querySelectorAll('.thumbnail-grid [data-art]').forEach(button=>{
    button.addEventListener('click',()=>openPlaceholderArt(button.dataset.art));
  });

  leftBtn.addEventListener('click',()=>{
    if(shell.dataset.view==='door') renderRoom(0);
    else renderRoom(lastRoomStart-1);
  });

  rightBtn.addEventListener('click',()=>{
    if(shell.dataset.view==='door') renderRoom(1);
    else renderRoom(lastRoomStart+1);
  });

  thumbnailBtn.addEventListener('click',()=>setView('thumbnail'));

  doorBtn.addEventListener('click',()=>{
    // Entry/whip design remains for later. Reset the eventual entry target to
    // the approved opening position without changing any inside-room door slot.
    roomStart=1;
    lastRoomStart=1;
    setView('door');
  });

  document.querySelectorAll('[data-depth]').forEach(button=>{
    button.addEventListener('click',()=>{
      const depth=button.dataset.depth;
      depthPanel.textContent=
        depth==='image'?'IMAGE DETAIL':
        depth==='plaque'?'DESCRIPTION PLAQUE':'BLURBLETS';
    });
  });

  // The unfinished door transition remains the initial surface.
  // RIGHT enters at the approved ART 1 / ART 2 opening corner.
  setView('door');
})();
