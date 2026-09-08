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
  let selectedArt=4;

  const labels={
    door:'DOOR / ROOM VIEW',
    left:'LEFT CORNER VIEW',
    right:'RIGHT CORNER VIEW',
    wall:'WALL VIEW',
    zoom:'ARTWORK VIEW',
    thumbnail:'THUMBNAIL VIEW'
  };

  function setView(view){
    shell.dataset.view=view;
    viewLabel.textContent=labels[view]||view.toUpperCase();
  }

  function selectArt(n,goWall=true){
    selectedArt=Number(n)||1;
    wallArtLabel.textContent=`ART ${selectedArt}`;
    artworkLabel.textContent=`ART ${selectedArt}`;
    depthPanel.textContent='IMAGE DETAIL';
    if(goWall) setView('wall');
  }

  document.querySelectorAll('[data-art]').forEach(btn=>{
    btn.addEventListener('click',()=>selectArt(btn.dataset.art,true));
  });

  leftBtn.addEventListener('click',()=>{
    const view=shell.dataset.view;
    if(view==='wall'||view==='zoom') selectArt(selectedArt===1?7:selectedArt-1,true);
    else setView('left');
  });

  rightBtn.addEventListener('click',()=>{
    const view=shell.dataset.view;
    if(view==='wall'||view==='zoom') selectArt(selectedArt===7?1:selectedArt+1,true);
    else setView('right');
  });

  thumbnailBtn.addEventListener('click',()=>setView('thumbnail'));
  doorBtn.addEventListener('click',()=>setView('door'));
  wallArt.addEventListener('click',()=>setView('zoom'));

  document.querySelectorAll('[data-depth]').forEach(btn=>{
    btn.addEventListener('click',()=>{
      const depth=btn.dataset.depth;
      depthPanel.textContent=depth==='image'?'IMAGE DETAIL':depth==='plaque'?'DESCRIPTION PLAQUE':'BLURBLETS';
    });
  });
})();
