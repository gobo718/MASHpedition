(()=>{
  const shell=document.getElementById('exhibitShell');
  const viewLabel=document.getElementById('viewLabel');
  const artworkLabel=document.getElementById('artworkLabel');
  const depthPanel=document.getElementById('depthPanel');
  const leftBtn=document.getElementById('leftBtn');
  const rightBtn=document.getElementById('rightBtn');
  const thumbnailBtn=document.getElementById('thumbnailBtn');
  const doorBtn=document.getElementById('doorBtn');

  const wallButtons=[
    document.getElementById('wallLeftArt'),
    document.getElementById('wallCenterArt'),
    document.getElementById('wallRightArt')
  ];
  const wallLabels=[
    document.getElementById('wallLeftLabel'),
    document.getElementById('wallCenterLabel'),
    document.getElementById('wallRightLabel')
  ];

  let selectedArt=3;
  const artSequence=Array.from({length:22},(_,i)=>i+1);

  const labels={
    door:'DOOR',
    left:'LEFT CORNER VIEW',
    wall:'WALL VIEW',
    right:'RIGHT CORNER VIEW',
    zoom:'ARTWORK VIEW',
    thumbnail:'THUMBNAIL VIEW'
  };

  // Physical room-view order for the prototype.
  // RIGHT rotates: DOOR -> LEFT CORNER -> WALL -> RIGHT CORNER -> DOOR.
  // LEFT rotates through the same views in reverse.
  const roomCycle=['door','left','wall','right'];

  function setView(view){
    const allowed=new Set(['door','left','wall','right','zoom','thumbnail']);
    const next=allowed.has(view)?view:'door';
    shell.dataset.view=next;
    viewLabel.textContent=labels[next]||next.toUpperCase();
  }

  function wrapIndex(i,len){
    return (i+len)%len;
  }

  function rotateRoom(direction){
    const current=shell.dataset.view;
    let base=current;

    // If leaving a detail/thumbnail surface, return to the wall first.
    if(base==='zoom'||base==='thumbnail') base='wall';

    let i=roomCycle.indexOf(base);
    if(i<0) i=0;
    i=wrapIndex(i+(direction==='right'?1:-1),roomCycle.length);
    setView(roomCycle[i]);
  }

  function wallTriplet(center){
    const centerIndex=Math.max(0,artSequence.indexOf(center));
    return [
      artSequence[wrapIndex(centerIndex-1,artSequence.length)],
      artSequence[centerIndex],
      artSequence[wrapIndex(centerIndex+1,artSequence.length)]
    ];
  }

  function renderWall(center){
    if(!artSequence.includes(center)) center=2;
    selectedArt=center;
    const trio=wallTriplet(center);
    trio.forEach((n,i)=>{
      wallButtons[i].dataset.art=String(n);
      wallLabels[i].textContent=`ART ${n}`;
    });
    artworkLabel.textContent=`ART ${selectedArt}`;
    depthPanel.textContent='IMAGE DETAIL';
  }

  function selectArt(n,goWall=true){
    n=Number(n)||1;
    renderWall(n);
    if(goWall) setView('wall');
  }

  document.querySelectorAll(
    '.corner-art[data-art],.right-normal-art[data-art],.right-perspective-art[data-art],.thumbnail-grid [data-art]'
  ).forEach(btn=>{
    btn.addEventListener('click',()=>selectArt(btn.dataset.art,true));
  });

  wallButtons.forEach(btn=>{
    btn.addEventListener('click',()=>{
      selectedArt=Number(btn.dataset.art)||1;
      artworkLabel.textContent=`ART ${selectedArt}`;
      depthPanel.textContent='IMAGE DETAIL';
      setView('zoom');
    });
  });

  leftBtn.addEventListener('click',()=>rotateRoom('left'));
  rightBtn.addEventListener('click',()=>rotateRoom('right'));

  thumbnailBtn.addEventListener('click',()=>setView('thumbnail'));
  doorBtn.addEventListener('click',()=>setView('door'));

  document.querySelectorAll('[data-depth]').forEach(btn=>{
    btn.addEventListener('click',()=>{
      const depth=btn.dataset.depth;
      depthPanel.textContent=
        depth==='image'?'IMAGE DETAIL':
        depth==='plaque'?'DESCRIPTION PLAQUE':'BLURBLETS';
    });
  });

  // The straight wall occupies the former ART 1 / 2 / 3 positions, now ART 2 / 3 / 4.
  renderWall(3);
  setView('door');
})();