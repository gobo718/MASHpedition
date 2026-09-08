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

  let selectedArt=1;
  const artSequence=[1,2,3,4,5,6,7];

  const labels={
    door:'DOOR',
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

  function wrapIndex(i){
    return (i+artSequence.length)%artSequence.length;
  }

  function wallTriplet(center){
    const centerIndex=Math.max(0,artSequence.indexOf(center));
    return [
      artSequence[wrapIndex(centerIndex-1)],
      artSequence[centerIndex],
      artSequence[wrapIndex(centerIndex+1)]
    ];
  }

  function renderWall(center){
    if(!artSequence.includes(center)) center=1;
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
    if(n===22){
      // Legacy entry-side placeholder: the approved opening corner still
      // calls this ART 22 until the room is renumbered.
      selectedArt=1;
      renderWall(1);
    }else{
      renderWall(n);
    }
    if(goWall) setView('wall');
  }

  document.querySelectorAll('.corner-art[data-art],.right-normal-art[data-art],.right-perspective-art[data-art],.thumbnail-grid [data-art]').forEach(btn=>{
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

  leftBtn.addEventListener('click',()=>{
    const view=shell.dataset.view;
    if(view==='wall'||view==='zoom'){
      const i=artSequence.indexOf(selectedArt);
      renderWall(artSequence[wrapIndex(i-1)]);
      setView('wall');
    }else{
      setView('left');
    }
  });

  rightBtn.addEventListener('click',()=>{
    const view=shell.dataset.view;
    if(view==='wall'||view==='zoom'){
      const i=artSequence.indexOf(selectedArt);
      renderWall(artSequence[wrapIndex(i+1)]);
      setView('wall');
    }else{
      setView('right');
    }
  });

  thumbnailBtn.addEventListener('click',()=>setView('thumbnail'));
  doorBtn.addEventListener('click',()=>setView('door'));

  document.querySelectorAll('[data-depth]').forEach(btn=>{
    btn.addEventListener('click',()=>{
      const depth=btn.dataset.depth;
      depthPanel.textContent=depth==='image'?'IMAGE DETAIL':depth==='plaque'?'DESCRIPTION PLAQUE':'BLURBLETS';
    });
  });

  renderWall(2);
})();
