(()=>{
  const shell=document.getElementById('exhibitShell');
  const roomStage=shell.querySelector('.room-stage');
  const viewLabel=document.getElementById('viewLabel');
  const leftBtn=document.getElementById('leftBtn');
  const rightBtn=document.getElementById('rightBtn');
  const overheadBtn=document.getElementById('overheadBtn');
  const roomBtn=document.getElementById('roomBtn');
  const thumbnailBtn=document.getElementById('thumbnailBtn');
  const endlessBtn=document.getElementById('endlessBtn');
  const doorBtn=document.getElementById('doorBtn');
  const frontDoor=document.getElementById('frontDoor');
  const entranceLocation=document.getElementById('entranceLocation');
  const entranceEmojis=document.getElementById('entranceEmojis');
  const entranceRank=document.getElementById('entranceRank');
  const entranceSearch=document.getElementById('entranceSearch');
  const entranceSelections=document.getElementById('entranceSelections');
  const exhibitControls=document.getElementById('exhibitControls');
  const overheadView=document.getElementById('overheadView');
  const overheadCenterIdentity=document.getElementById('overheadCenterIdentity');
  const roomCenterIdentity=document.getElementById('roomCenterIdentity');
  const endlessIdentity=document.getElementById('endlessIdentity');
  const thumbnailIdentity=document.getElementById('thumbnailIdentity');
  const thumbnailIdentityPrimary=document.getElementById('thumbnailIdentityPrimary');
  const thumbnailIdentitySecondary=document.getElementById('thumbnailIdentitySecondary');
  const endlessView=document.getElementById('endlessView');

  const thumbnailGrid=document.getElementById('thumbnailGrid');
  const thumbnailView=document.getElementById('thumbnailView');
  const thumbnailStatus=document.getElementById('thumbnailStatus');
  const endlessStatus=document.getElementById('endlessStatus');
  const pageNav=document.getElementById('pageNav');
  const pagePrevBtn=document.getElementById('pagePrevBtn');
  const pageNextBtn=document.getElementById('pageNextBtn');
  const pageStatus=document.getElementById('pageStatus');
  const catSearchHas=document.getElementById('catSearchHas');
  const catSearchHasRadios=[...document.querySelectorAll('input[name=\"catSearchHas\"]')];
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
  const blurbletFiltersBtn=document.getElementById('blurbletFiltersBtn');
  const blurbletSortBtn=document.getElementById('blurbletSortBtn');
  const blurbletFilterPanel=document.getElementById('blurbletFilterPanel');
  const blurbletSortPanel=document.getElementById('blurbletSortPanel');
  const blurbletList=document.getElementById('blurbletList');
  const blurbletSortChoices=[...document.querySelectorAll('[data-blurblet-sort]')];

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
  let overheadSlots=[...document.querySelectorAll('.overhead-slot')];
  const rankButtons=[...document.querySelectorAll('.rank-selector [data-rank]')];

  // ----------------------------------------------------------------
  // Shared viewer configuration.
  //
  // v18 puts representative viewer states where they actually belong:
  // Gallery, Collection, FYC, SALON ECLECTIQUE, GEH, and both Catacombs
  // result shapes link into this same engine with area-specific presets.
  // Area-specific search/options UI remains deliberately undefined.
  // ----------------------------------------------------------------
  const params=new URLSearchParams(window.location.search);
  const PAGE_SIZE=22;
  const THUMBNAIL_PAGE_SIZE=11;

  const AREA_PRESETS={
    gallery:{mix:'A',label:'PRIVATE GALLERY',count:66,start:'thumbnail'},
    collection:{mix:'B',label:'COLLECTION',count:66,start:'exhibit'},
    fyc:{mix:'A',label:'FOR YOUR CONSIDERATION',count:66,start:'thumbnail'},
    se:{mix:'A',label:'SALON ECLECTIQUE',count:12,start:'thumbnail'},
    geh:{mix:'B',label:'GRAND EXHIBITION HALL',count:66,start:'exhibit',geh:true},
    'cat-theme':{mix:'A',label:'CATACOMBS',count:66,start:'thumbnail'},
    'cat-search':{mix:'C',label:'CATACOMBS · SEARCH',count:66,start:'exhibit'}
  };

  const requestedArea=(params.get('area')||'').toLowerCase();
  const catacombsMode=requestedArea==='cat-theme' || requestedArea==='cat-search';
  const zazzlyMode=requestedArea==='zazzly';
  const collectionContext=requestedArea==='collection' || (zazzlyMode && params.get('returnArea')==='collection');
  let catSearchHasTheme=requestedArea!=='cat-search';

  // Authoritative Theme content. Presentation code resolves identities from
  // these definitions instead of maintaining view-specific copies.
  const THEME_SETS={
    main:{start:1,items:[
      'Celebration','Playful','Adorable','UglyCute','Disgusting','CreepyCute',
      'Funny','Goofy','Whimsical','Psychedelic','Weird','Absurd','Dreamy','Nostalgia',
      'Tragic','Angry','Intense','Scary','Epic','Beautiful','Cozy','Joy'
    ]},
    alternate:{start:23,items:[
      'Mundane','Poignant','Satisfying','Romance','Festive','Halloween','Eerie','Magical',
      'Spirituality','Ethereal','Strange','Hilarious','Grossout','Chaotic','Overstimulated',
      'Cringe','Bougie','Camp','Sassy','Badass','Glory','Bittersweet'
    ]},
    mature:{start:45,items:[
      'Excess','PartyTime','Freakshow','Medicated','Scandalarious','Schadenfreude','Mockery',
      'Grotesque','Collapse','Corrupted','Cursed','Aggressive','Outrage','Monstrous','Horror',
      'Nightmarish','Phantasmagoric','Foreboding','Vulnerable','Paranoia','Despair','Shame'
    ]},
    zazzly:{start:67,items:[
      'Zazzly','ZazzlyParty','Cheeky','Fleshy','Raunchy','Lewd',
      'Exposure','Zazzploitation','Humiliation','Sadomasochism','FreakyDeaky','Seduction'
    ]}
  };

  const STANDARD_ROOM_MAP={
    id:'standard-22',
    slots:[
      {kind:'door',number:1},
      ...Array.from({length:8},(_,i)=>({kind:'art',number:i+1})),
      {kind:'door',number:2},
      ...Array.from({length:14},(_,i)=>({kind:'art',number:i+9}))
    ],
    cornerAfter:[1,7,13,19]
  };

  // Zazzly owns a genuine compact map: 12 art positions + Doors 4/5.
  // Its Aerial coordinates are the approved v91 3/4/3/4 perimeter, expressed
  // directly as this map's geometry rather than as hidden standard-map nodes.
  const ZAZZLY_ROOM_MAP={
    id:'zazzly-12',
    slots:[
      {kind:'door',number:4},{kind:'art',number:1},{kind:'art',number:2},
      {kind:'art',number:3},{kind:'art',number:4},{kind:'art',number:5},
      {kind:'art',number:6},{kind:'door',number:5,locked:true},{kind:'art',number:7},
      {kind:'art',number:8},{kind:'art',number:9},{kind:'art',number:10},
      {kind:'art',number:11},{kind:'art',number:12}
    ],
    cornerAfter:[1,5,8,12],
    overhead:[
      {roomIndex:5,x:26,y:42},{roomIndex:4,x:26,y:104},{roomIndex:3,x:26,y:166},{roomIndex:2,x:26,y:228},
      {roomIndex:6,x:198,y:18},{roomIndex:7,x:412,y:18},{roomIndex:8,x:626,y:18},
      {roomIndex:9,x:798,y:42},{roomIndex:10,x:798,y:104},{roomIndex:11,x:798,y:166},{roomIndex:12,x:798,y:228},
      {roomIndex:13,x:198,y:242},{roomIndex:0,x:412,y:242},{roomIndex:1,x:626,y:242}
    ]
  };

  const ZAZZLY_DEFINITION={
    key:'zazzly',label:'ZAZZLY EXHIBIT',count:12,start:'room',mix:'C',
    themeSet:'zazzly',map:ZAZZLY_ROOM_MAP,
    capabilities:{exhibit:true,room:true,thumbnail:true,endless:true},
    connections:{4:{area:'standard',room:3},5:{locked:true,label:'LOCKED'}}
  };

  const areaPreset=zazzlyMode?ZAZZLY_DEFINITION:(AREA_PRESETS[requestedArea]||null);
  const requestedMix=(params.get('mix') || areaPreset?.mix || 'B').toUpperCase();
  const mix=['A','B','C'].includes(requestedMix)?requestedMix:'B';
  const maxUnlockedRank=Math.max(1,Math.min(10,Number(params.get('ranks'))||1));
  const gehMode=areaPreset?.geh===true || params.get('geh')==='1' ||
    (!areaPreset && params.get('geh')!=='0' && mix==='B');
  const areaLabel=(zazzlyMode && gehMode) ? 'GRAND EXHIBITION HALL' : (collectionContext ? 'COLLECTION' : (areaPreset?.label || (gehMode?'GRAND EXHIBITION HALL':'VIEWER SAMPLE')));
  const centerIdentityText=`${areaLabel} - ${params.get('emojis') || '😀 😎'}`;
  overheadCenterIdentity.textContent=centerIdentityText;
  roomCenterIdentity.textContent=centerIdentityText;
  const defaultResultCount=areaPreset?.count ?? (mix==='A'?120:22);
  const requestedCount=Number(params.get('count'))||defaultResultCount;
  const genericResultCount=requestedArea==='se'
    ? Math.max(3,Math.min(22,requestedCount))
    : Math.max(1,Math.min(5000,requestedCount));
  const defaultStart=areaPreset?.start || 'door';

  // Exhibit ENTRANCE facade. Theme is intentionally absent: the exhibit's
  // individual selections are represented by Themes inside the room.
  const entranceEmojiText=params.get('emojis') || '😀 😎';
  const residentName=params.get('resident') || 'USERNAME OF RESIDENT';
  const searchDetails=params.get('search') || 'DETAILS OF SEARCH';
  const requestedRank=Math.max(1,Math.min(10,Number(params.get('rank'))||1));
  const entranceKind=gehMode?'geh':(
    collectionContext?'collection':
    requestedArea==='gallery'?'gallery':
    requestedArea==='fyc'?'fyc':
    requestedArea==='se'?'salon':
    (requestedArea==='cat-search' || requestedArea==='cat-theme'?'catacombs':'generic')
  );

  // v58: the booked 01–22 Main-room Theme names follow the numbered
  // locations anywhere the art space is defined by one shared emoji pair.
  // Catacombs is intentionally excluded: its search presentations do not
  // carry a shared pair.
  const emojiPairDefinedLocation=gehMode || collectionContext;

  entranceLocation.textContent=entranceKind==='catacombs'?'CATACOMBS':areaLabel;
  entranceEmojis.textContent=entranceEmojiText;
  entranceEmojis.hidden=['gallery','fyc','salon','catacombs'].includes(entranceKind);
  entranceRank.hidden=entranceKind!=='geh';
  entranceSearch.hidden=entranceKind!=='catacombs';
  if(entranceKind==='geh') entranceRank.textContent=`${rankWord(requestedRank)} PLACE`;
  if(entranceKind==='catacombs') entranceSearch.textContent=searchDetails;
  if(entranceKind==='collection') {
    const curatorLead=document.createElement('span');
    curatorLead.textContent='Selections Curated by';
    const curatorName=document.createElement('span');
    curatorName.textContent=residentName;
    entranceSelections.replaceChildren(curatorLead,curatorName);
  } else if(entranceKind==='gallery') {
    const worksLead=document.createElement('span');
    worksLead.textContent='The Works of';
    const worksName=document.createElement('span');
    worksName.textContent=residentName;
    entranceSelections.replaceChildren(worksLead,worksName);
  } else if(entranceKind==='fyc') {
    entranceSelections.textContent='Freshly Painted Selections Begging for Your Opinion';
  } else if(entranceKind==='salon') {
    entranceSelections.textContent='Bespoke selections tailored to your requests, presented via curation by a personal docent.';
  } else {
    entranceSelections.textContent='Selections Curated by Community Vote';
  }


  // Presentation identity: Theme is set-level context only when Theme defines the set.
  const presentationTheme=params.get('theme') || 'THEME';
  const sharedPairAreas=new Set(['collection','cat-search']);
  const hasSharedPresentationPair=gehMode || sharedPairAreas.has(requestedArea);
  const isThemeFilteredCatacombs=requestedArea==='cat-theme';
  const docentName=params.get('docent') || 'DOCENT NAME';
  const salonDescription=params.get('description') || 'A curious assortment selected in response to your request.';

  function updatePresentationIdentity(){
    if(endlessIdentity){
      if(requestedArea==='cat-search' || requestedArea==='cat-theme'){
        endlessIdentity.hidden=false;
        endlessIdentity.textContent=searchDetails;
      }else if(requestedArea==='fyc' || requestedArea==='se' || requestedArea==='gallery'){
        endlessIdentity.hidden=true;
      }else if(hasSharedPresentationPair){
        endlessIdentity.hidden=false;
        endlessIdentity.textContent=entranceEmojiText;
      }else{
        endlessIdentity.hidden=true;
      }
    }
    if(thumbnailIdentity){
      if(requestedArea==='cat-search' || requestedArea==='cat-theme'){
        thumbnailIdentity.hidden=false;
        thumbnailIdentityPrimary.textContent='';
        thumbnailIdentitySecondary.textContent='DETAILS OF SEARCH';
      }else if(requestedArea==='fyc' || requestedArea==='se' || requestedArea==='gallery'){
        thumbnailIdentity.hidden=true;
      }else if(hasSharedPresentationPair){
        thumbnailIdentity.hidden=false;
        thumbnailIdentityPrimary.textContent=entranceEmojiText;
        thumbnailIdentitySecondary.textContent='';
      }else{
        thumbnailIdentity.hidden=true;
      }
    }
  }
  updatePresentationIdentity();

  const capabilities=zazzlyMode
    ? ZAZZLY_DEFINITION.capabilities
    : catacombsMode
    ? {exhibit:true,room:true,thumbnail:true,endless:true}
    : ({
        A:{exhibit:false,room:false,thumbnail:true,endless:true},
        B:{exhibit:true, room:true, thumbnail:true,endless:false},
        C:{exhibit:true, room:true, thumbnail:true,endless:true}
      }[mix]);

  shell.dataset.mix=mix;
  shell.dataset.area=requestedArea||'sample';
  shell.classList.toggle('geh-mode',gehMode);
  shell.classList.toggle('collection-context',collectionContext);
  shell.classList.toggle('catacombs-mode',catacombsMode);

  // Map geometry is selected independently from the content/presentation layer.
  const activeRoomMap=zazzlyMode?ZAZZLY_DEFINITION.map:STANDARD_ROOM_MAP;
  const roomSlots=activeRoomMap.slots;
  const cornerAfter=new Set(activeRoomMap.cornerAfter);

  // For Zazzly, replace the legacy 24-node standard Aerial DOM with exactly
  // the 14 physical positions defined by the Zazzly map (12 art + 2 doors).
  if(zazzlyMode){
    const canvas=overheadView.querySelector('.overhead-canvas');
    canvas.querySelectorAll('.overhead-slot').forEach(node=>node.remove());
    const standardLines=canvas.querySelector('.overhead-room-lines');
    if(standardLines) standardLines.remove();

    const svg=document.createElementNS('http://www.w3.org/2000/svg','svg');
    svg.setAttribute('class','overhead-room-lines zazzly-room-lines');
    svg.setAttribute('viewBox','0 0 980 300');
    svg.setAttribute('aria-hidden','true');
    const floor=document.createElementNS('http://www.w3.org/2000/svg','polygon');
    floor.setAttribute('class','overhead-room-floor');
    floor.setAttribute('points','240,18 740,18 760,282 220,282');
    svg.appendChild(floor);
    canvas.prepend(svg);

    ZAZZLY_DEFINITION.map.overhead.forEach(position=>{
      const button=document.createElement('button');
      button.type='button';
      button.className='overhead-slot zazzly-overhead-slot';
      button.dataset.roomIndex=String(position.roomIndex);
      button.style.left=`${position.x}px`;
      button.style.top=`${position.y}px`;
      const span=document.createElement('span');
      button.appendChild(span);
      canvas.appendChild(button);
    });
    overheadSlots=[...canvas.querySelectorAll('.zazzly-overhead-slot')];
  }

  let roomStart=1;
  let lastRoomStart=1;
  let selectedArt=1;
  let selectedRank=1;
  let gehRank=requestedRank;
  const requestedRoomPage=Number(params.get('roomPage'));
  let roomPage=Number.isInteger(requestedRoomPage) && requestedRoomPage>=0 ? requestedRoomPage : 0;
  let thumbnailPage=0;
  let endlessIndex=0;
  let artworkReturn=null;
  let expandedScrollTop=0;

  const labels={
    door:'DOOR',
    left:centerIdentityText,
    wall:centerIdentityText,
    right:centerIdentityText,
    zoom:'ARTWORK VIEW',
    thumbnail:'THUMBNAILS',
    overhead:'AERIAL VIEW',
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

  const orderedThemeSets=[THEME_SETS.main,THEME_SETS.alternate,THEME_SETS.mature,THEME_SETS.zazzly];

  function exhibitArtLabel(artNumber){
    const number=Number(artNumber);
    const set=orderedThemeSets.find(candidate=>number>=candidate.start && number<candidate.start+candidate.items.length);
    const theme=set?.items[number-set.start];
    return theme ? `${String(number).padStart(2,'0')} - ${theme}` : `Art ${number}`;
  }

  function exhibitThemeWord(artNumber){
    const number=Number(artNumber);
    const set=orderedThemeSets.find(candidate=>number>=candidate.start && number<candidate.start+candidate.items.length);
    return set?.items[number-set.start] || `Art ${number}`;
  }

  const MUSEUM_HIGH_LETTERS=new Set('AKMNVWXY');
  const MUSEUM_LOW_LETTERS=new Set('BCDGJOQSU');

  function paintMuseumPlateText(label,text){
    label.replaceChildren();
    const textWrap=document.createElement('span');
    textWrap.className='museum-plate-text';
    label.appendChild(textWrap);
    for(const sourceChar of String(text)){
      if(!/[A-Za-z]/.test(sourceChar)){
        textWrap.appendChild(document.createTextNode(sourceChar));
        continue;
      }
      const char=sourceChar.toUpperCase();
      const glyph=document.createElement('span');
      glyph.className='museum-plate-glyph';
      if(/[A-Z]/.test(sourceChar)){
        // Preserve every capital in the authoritative Theme name as a full-size cap.
        // Full-size caps stay on the baseline and receive no tier shift.
        glyph.classList.add('museum-cap');
      }else{
        // Lowercase source letters become small caps; only these receive ±2px tiers.
        glyph.classList.add('museum-smallcap');
        if(MUSEUM_HIGH_LETTERS.has(char)) glyph.classList.add('museum-tier-high');
        else if(MUSEUM_LOW_LETTERS.has(char)) glyph.classList.add('museum-tier-low');
        else glyph.classList.add('museum-tier-mid');
      }
      glyph.textContent=char;
      textWrap.appendChild(glyph);
    }
  }

  function paintGehThumbnail(button,art,rank){
    // Keep the established in-thumbnail identity visible while also providing
    // the compact Theme-only plate beneath the future image viewport.
    button.textContent=`${exhibitArtLabel(art)} · ${rankWord(rank)}`;
    const label=document.createElement('span');
    label.className='geh-thumbnail-theme-label museum-thumbnail-plate';
    paintMuseumPlateText(label,exhibitThemeWord(art));
    button.appendChild(label);
    button.setAttribute('aria-label',`${exhibitThemeWord(art)}, ${rankWord(rank)} place`);
  }

  function roomArtNumber(slot){
    const start=zazzlyMode?THEME_SETS.zazzly.start:roomPage*PAGE_SIZE+1;
    return start+slot.number-1;
  }

  function roomDoorNumber(slot){
    return zazzlyMode ? slot.number : slot.number+roomPage;
  }

  function rankWord(rank){
    const words=['','1st','2nd','3rd','4th','5th','6th','7th','8th','9th','10th'];
    return words[Number(rank)] || `${rank}th`;
  }

  function setView(view){
    const allowed=new Set(['door','left','wall','right','overhead','zoom','thumbnail','endless']);
    const next=allowed.has(view)?view:'door';
    shell.dataset.view=next;
    viewLabel.textContent=labels[next]||next.toUpperCase();
    updateNavigationState();
    updatePageNav();
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
    if(catacombsMode){
      // THEME search: THUMBNAILS + ENDLESS. NO THEME: AERIAL + EXHIBIT + THUMBNAILS.
      overheadBtn.disabled=catSearchHasTheme;
      roomBtn.disabled=catSearchHasTheme;
      endlessBtn.disabled=!catSearchHasTheme;
      thumbnailBtn.disabled=false;
      catSearchHas.hidden=false;
      catSearchHasRadios.forEach(radio=>{ radio.checked=(radio.value===(catSearchHasTheme?'theme':'no-theme')); });
    }
    const visible=[...exhibitControls.querySelectorAll('button')].filter(button=>!button.hidden).length;
    exhibitControls.style.setProperty('--control-count',String(visible));
  }

  function setCatSearchHas(value){
    if(!catacombsMode) return;
    catSearchHasTheme=value==='theme';
    applyCapabilities();
    const view=shell.dataset.view;
    if(catSearchHasTheme && ['overhead','left','wall','right'].includes(view)) renderThumbnailPage();
    else if(!catSearchHasTheme && view==='endless') renderThumbnailPage();
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
    button.classList.remove('is-door-slot','is-art-slot','is-locked-door');
    button.disabled=false;
    button.removeAttribute('data-art');
    button.removeAttribute('data-door');
    button.removeAttribute('data-rank');
    button.setAttribute('aria-label','');
    const span=button.querySelector('span');
    if(span) span.textContent='';
  }

  function paintRoomSlot(button,slot){
    resetSlotButton(button);
    const span=button.querySelector('span');

    if(slot.kind==='door'){
      const displayedDoorNumber=roomDoorNumber(slot);
      button.classList.add('is-door-slot');
      button.dataset.door=String(displayedDoorNumber);
      const locked=slot.locked===true;
      button.disabled=locked;
      button.classList.toggle('is-locked-door',locked);
      button.setAttribute(
        'aria-label',
        locked ? `Door ${displayedDoorNumber} — locked` : (displayedDoorNumber===1 ? 'Door 1 — entrance' : `Door ${displayedDoorNumber}`)
      );
      if(span) span.textContent=locked?'LOCKED':'';
      return;
    }

    button.classList.add('is-art-slot');
    const artNumber=roomArtNumber(slot);
    button.dataset.art=String(artNumber);
    button.dataset.rank=String(gehMode?gehRank:1);
    button.setAttribute('aria-label',`${exhibitArtLabel(artNumber)}${gehMode?`, ${rankWord(gehRank)} place`:''}`);
    if(span) span.textContent=`${exhibitArtLabel(artNumber)}${gehMode?` · ${rankWord(gehRank)}`:''}`;
  }

  function paintOverheadSlot(button,slot){
    button.classList.remove('is-overhead-art','is-overhead-door','is-locked-door');
    button.disabled=false;
    button.removeAttribute('data-art');
    button.removeAttribute('data-door');
    button.removeAttribute('data-rank');

    const span=button.querySelector('span');

    if(slot.kind==='door'){
      const displayedDoorNumber=roomDoorNumber(slot);
      button.classList.add('is-overhead-door');
      button.dataset.door=String(displayedDoorNumber);
      const locked=slot.locked===true;
      button.disabled=locked;
      button.classList.toggle('is-locked-door',locked);
      button.setAttribute(
        'aria-label',
        locked ? `Door ${displayedDoorNumber} — locked` : (displayedDoorNumber===1 ? 'Door 1 — entrance' : `Door ${displayedDoorNumber}`)
      );
      if(span) span.textContent=locked?'LOCKED':`DOOR ${displayedDoorNumber}`;
      return;
    }

    button.classList.add('is-overhead-art');
    const artNumber=roomArtNumber(slot);
    button.dataset.art=String(artNumber);
    button.dataset.rank=String(gehMode?gehRank:1);
    const suffix=gehMode?` · ${rankWord(gehRank)}`:'';
    button.setAttribute('aria-label',`${exhibitArtLabel(artNumber)}${gehMode?`, ${rankWord(gehRank)} place`:''}`);
    if(span) span.textContent=`${exhibitArtLabel(artNumber)}${suffix}`;
  }

  function renderOverhead(){
    if(catacombsMode && catSearchHasTheme) return;
    if(!capabilities.exhibit){
      renderThumbnailPage();
      return;
    }
    overheadSlots.forEach(button=>{
      button.hidden=false;
      button.style.display='';
      const index=Number(button.dataset.roomIndex);
      paintOverheadSlot(button,roomSlots[wrap(index)]);
    });
    updateRankButtons();
    setView('overhead');
  }

  function renderRoom(start=lastRoomStart){
    if(catacombsMode && catSearchHasTheme) return;
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

  function currentThumbnailPageCount(){
    if(zazzlyMode && collectionContext) return 1;
    return Math.ceil(genericResultCount/THUMBNAIL_PAGE_SIZE);
  }


  function thumbnailBrickCompositions(count){
    const candidates=[];
    const visit=(remaining,rows)=>{
      if(remaining===0){
        if(rows.length>=1 && rows.length<=3) candidates.push(rows.slice());
        return;
      }
      if(rows.length>=3) return;
      for(let n=1;n<=Math.min(8,remaining);n++){
        if(rows.length && rows[rows.length-1]===n) continue;
        rows.push(n); visit(remaining-n,rows); rows.pop();
      }
    };
    visit(count,[]);
    return candidates;
  }

  function chooseThumbnailBrick(count){
    if(count>=PAGE_SIZE) return null; // preserve established 22 = 7 / 8 / 7
    const width=thumbnailGrid.clientWidth;
    const height=thumbnailGrid.clientHeight;
    const gap=6;
    let best=null;
    for(const rows of thumbnailBrickCompositions(count)){
      const widest=Math.max(...rows);
      const size=Math.min(
        (width-gap*(widest-1))/widest,
        (height-gap*(rows.length-1))/rows.length
      );
      if(size<=0) continue;
      // Primary: largest square. Tie: fewer rows, then more balanced outer silhouette.
      const spread=Math.max(...rows)-Math.min(...rows);
      const score={rows,size,spread};
      if(!best || size>best.size+.5 ||
         (Math.abs(size-best.size)<=.5 && rows.length<best.rows.length) ||
         (Math.abs(size-best.size)<=.5 && rows.length===best.rows.length && spread<best.spread)) best=score;
    }
    return best;
  }

  function applyAdaptiveThumbnailBrick(){
    const buttons=[...thumbnailGrid.querySelectorAll(':scope > button')];
    thumbnailGrid.classList.remove('adaptive-brick');
    thumbnailGrid.style.removeProperty('--adaptive-thumb-size');
    // GEH rooms own explicit thumbnail maps. In particular, Zazzly's 12-item
    // room is intentionally 4 / 4 / 4 and must not be repacked by the generic
    // partial-page optimizer (which previously rewrote it into 5 / 7).
    if(gehMode || (zazzlyMode && collectionContext) || buttons.length===THUMBNAIL_PAGE_SIZE) return;
    if(!buttons.length || buttons.length>=PAGE_SIZE) return;
    const best=chooseThumbnailBrick(buttons.length);
    if(!best) return;
    thumbnailGrid.classList.add('adaptive-brick');
    thumbnailGrid.style.setProperty('--adaptive-thumb-size',`${best.size}px`);
    thumbnailGrid.replaceChildren();
    let offset=0;
    for(const count of best.rows){
      const row=document.createElement('div');
      row.className='thumbnail-brick-row';
      for(let i=0;i<count;i++) row.appendChild(buttons[offset++]);
      thumbnailGrid.appendChild(row);
    }
    thumbnailGrid.dataset.brick=best.rows.join('/');
  }

  function renderThumbnailPage(){
    if(!capabilities.thumbnail) return;

    thumbnailGrid.replaceChildren();

    if(gehMode){
      // Standard GEH Themes are six 11-item thumbnail pages: 1A, 1B, 2A,
      // 2B, 3A, 3B. Zazzly remains the seventh/final 12-item page (4).
      const standardThumbnailPageCount=6;
      const gehThumbnailPageCount=7;
      if(zazzlyMode){
        thumbnailPage=0;
        const set=THEME_SETS.zazzly;
        for(let i=0;i<set.items.length;i++){
          const art=set.start+i;
          const button=document.createElement('button');
          button.type='button';
          button.dataset.art=String(art);
          button.dataset.rank=String(gehRank);
          paintGehThumbnail(button,art,gehRank);
          button.addEventListener('click',()=>openArtwork(art,gehRank,'thumbnail'));
          thumbnailGrid.appendChild(button);
        }
        thumbnailStatus.textContent=`GRAND EXHIBITION HALLS\n${rankWord(gehRank).toUpperCase()} · PAGE 4 · 67–78`;
      }else{
        thumbnailPage=Math.max(0,Math.min(standardThumbnailPageCount-1,thumbnailPage));
        const start=thumbnailPage*THUMBNAIL_PAGE_SIZE;
        const end=Math.min(genericResultCount,start+THUMBNAIL_PAGE_SIZE);
        for(let i=start;i<end;i++){
          const art=i+1;
          const button=document.createElement('button');
          button.type='button';
          button.dataset.art=String(art);
          button.dataset.rank=String(gehRank);
          paintGehThumbnail(button,art,gehRank);
          button.addEventListener('click',()=>openArtwork(art,gehRank,'thumbnail'));
          thumbnailGrid.appendChild(button);
        }
        const room=Math.floor(thumbnailPage/2)+1;
        const half=thumbnailPage%2===0?'A':'B';
        thumbnailStatus.textContent=`GRAND EXHIBITION HALLS\n${rankWord(gehRank).toUpperCase()} · PAGE ${room}${half} · ${start+1}–${end}`;
      }
      updateRankButtons();
    }else{
      if(zazzlyMode && collectionContext){
        thumbnailPage=0;
        const set=THEME_SETS.zazzly;
        for(let i=0;i<set.items.length;i++){
          const art=set.start+i;
          const button=document.createElement('button');
          button.type='button';
          button.dataset.art=String(art);
          button.textContent=exhibitArtLabel(art);
          const label=document.createElement('span');
          label.className='collection-thumbnail-theme-label museum-thumbnail-plate';
          paintMuseumPlateText(label,exhibitThemeWord(art));
          button.appendChild(label);
          button.setAttribute('aria-label',exhibitThemeWord(art));
          button.addEventListener('click',()=>openArtwork(art,1,'thumbnail'));
          thumbnailGrid.appendChild(button);
        }
        thumbnailStatus.textContent='COLLECTION · PAGE 4 · 67–78';
      }else{
      const pageCount=currentThumbnailPageCount();
      thumbnailPage=Math.max(0,Math.min(pageCount-1,thumbnailPage));
      const start=thumbnailPage*THUMBNAIL_PAGE_SIZE;
      const end=Math.min(genericResultCount,start+THUMBNAIL_PAGE_SIZE);
      for(let i=start;i<end;i++){
        const button=document.createElement('button');
        button.type='button';
        button.dataset.result=String(i);
        const artNumber=i+1;
        const displayedArtNumber=zazzlyMode?66+artNumber:artNumber;
        const useRoomLabel=zazzlyMode || (emojiPairDefinedLocation && artNumber<=PAGE_SIZE);
        button.textContent=useRoomLabel?exhibitArtLabel(displayedArtNumber):`RESULT ${artNumber}`;
        if(catacombsMode || requestedArea==='collection'){
          const label=document.createElement('span');
          label.className=`${catacombsMode?'catacombs':'collection'}-thumbnail-theme-label museum-thumbnail-plate`;
          paintMuseumPlateText(label,exhibitThemeWord(displayedArtNumber));
          button.appendChild(label);
        }
        button.setAttribute('aria-label',useRoomLabel?exhibitArtLabel(displayedArtNumber):`Result ${artNumber}`);
        button.addEventListener('click',()=>openArtwork(displayedArtNumber,1,'thumbnail'));
        thumbnailGrid.appendChild(button);
      }
      thumbnailStatus.textContent=requestedArea==='se'
        ? `${areaLabel} · CURRENT SELECTIONS`
        : `${areaLabel} · PAGE ${thumbnailPage+1} / ${pageCount} · ${start+1}–${end} OF ${genericResultCount}`;
      }
    }

    setView('thumbnail');
    applyThumbnailBrickLayout();
    updatePageNav();
    updateNavigationState();
  }

  function renderEndless(){
    if(catacombsMode && !catSearchHasTheme) return;
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
    endlessStatus.textContent=requestedArea==='se'
      ? `${areaLabel} · CURRENT SELECTION`
      : `${areaLabel} · RESULT ${endlessIndex+1} OF ${genericResultCount} · LOADED ${loadedStart+1}–${loadedEnd}`;

    setView('endless');
  }

  function setRank(rank){
    rank=Number(rank);
    if(!gehMode || rank<1 || rank>maxUnlockedRank) return;
    gehRank=rank;
    entranceRank.textContent=`${rankWord(gehRank)} PLACE`;
    updateRankButtons();

    if(shell.dataset.view==='overhead') renderOverhead();
    else if(shell.dataset.view==='thumbnail') renderThumbnailPage();
    else if(shell.dataset.view==='left' || shell.dataset.view==='wall' || shell.dataset.view==='right') renderRoom(lastRoomStart);
  }

  function rememberArtworkReturn(){
    artworkReturn={
      view:shell.dataset.view,
      roomStart:lastRoomStart,
      roomPage,
      thumbnailPage,
      endlessIndex,
      gehRank
    };
  }

  function updateArtworkCopy(number,rank){
    selectedArt=Number(number)||1;
    selectedRank=Number(rank)||1;

    const theme=((selectedArt-1)%66)+1;
    const pair=['geh','collection','catacombs'].includes(entranceKind)
      ? entranceEmojiText.split(/\s+/).slice(0,2)
      : emojiPairs[(theme-1)%emojiPairs.length];

    artworkLabel.textContent=gehMode
      ? `${exhibitArtLabel(selectedArt)} · ${rankWord(selectedRank)}`
      : (emojiPairDefinedLocation && selectedArt<=PAGE_SIZE
        ? exhibitArtLabel(selectedArt)
        : `RESULT ${selectedArt}`);

    artworkArea.textContent=areaLabel;
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
    roomPage=target.roomPage ?? roomPage;
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
    const artFullscreen=kind==='art';

    artworkExpand.classList.toggle('is-art-fullscreen',artFullscreen);
    shell.classList.toggle('is-art-fullscreen',artFullscreen);
    expandBack.hidden=artFullscreen;

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
      art.setAttribute('role','button');
      art.setAttribute('tabindex','0');
      art.setAttribute('aria-label','Return to artwork selection');
      art.addEventListener('click',closeExpanded);
      art.addEventListener('keydown',event=>{
        if(event.key==='Enter' || event.key===' '){
          event.preventDefault();
          closeExpanded();
        }
      });
      expandContent.appendChild(art);
    }

    artworkExpand.classList.add('is-open');
    if(artFullscreen){
      expandContent.firstElementChild?.focus({preventScroll:true});
    }else{
      expandBack.focus({preventScroll:true});
    }
  }

  function closeExpanded(){
    artworkExpand.classList.remove('is-open','is-art-fullscreen');
    shell.classList.remove('is-art-fullscreen');
    expandBack.hidden=false;
    expandContent.replaceChildren();
    requestAnimationFrame(()=>{
      artworkScroll.scrollTop=expandedScrollTop;
      artworkCenter.focus({preventScroll:true});
    });
  }

  function currentPageForView(){
    const view=shell.dataset.view;
    if(view==='endless') return Math.floor(endlessIndex/PAGE_SIZE);
    if(view==='thumbnail') return thumbnailPage;
    return roomPage;
  }

  function pageCount(){
    return Math.max(1,shell.dataset.view==='thumbnail' ? currentThumbnailPageCount() : currentGenericPageCount());
  }

  function syncThumbnailPageControls(){
    if(!pageNav || shell.dataset.view!=='thumbnail' || pageNav.hidden) return;
    const museum=document.querySelector('.museum-return');
    if(!museum) return;
    const museumRect=museum.getBoundingClientRect();
    const shellRect=shell.getBoundingClientRect();
    const gap=6;
    const width=museumRect.width;
    const height=museumRect.height;
    pageNav.style.left='auto';
    pageNav.style.right=`${Math.max(0,shellRect.right-museumRect.right)}px`;
    pageNav.style.top=`${Math.max(0,museumRect.top-shellRect.top)}px`;
    pageNav.style.bottom='auto';
    pageNav.style.width=`${width}px`;
    pageNav.style.height=`${(height+gap)*4-gap}px`;
    [pagePrevBtn,pageNextBtn].forEach(button=>{
      button.style.width=`${width}px`;
      button.style.height=`${height}px`;
    });
    // v125 — halve only the blank space between MUSEUM and the PAGE control cluster.
    // Keep the PAGE PREV/PAGE NEXT gap unchanged.
    const museumToPageGap=(height+(2*gap))/2;
    const pagePrevTop=height+museumToPageGap;
    pagePrevBtn.style.top=`${pagePrevTop}px`;
    pageNextBtn.style.top=`${pagePrevTop+height+gap}px`;
  }

  function updatePageNav(){
    if(!pageNav) return;
    const view=shell.dataset.view;
    const gehThumbnail=view==='thumbnail' && gehMode;
    const connectedZazzlyThumbnail=view==='thumbnail' && zazzlyMode && collectionContext;
    const count=gehThumbnail ? (zazzlyMode?1:6) : pageCount();
    const show=(view==='thumbnail' || view==='endless') && (count>1 || gehThumbnail || connectedZazzlyThumbnail);
    pageNav.hidden=!show;
    if(!show) return;
    const page=Math.max(0,Math.min(count-1,currentPageForView()));
    const unit=view==='thumbnail'?THUMBNAIL_PAGE_SIZE:PAGE_SIZE;
    const start=page*unit+1;
    const end=Math.min(genericResultCount,start+unit-1);
    pagePrevBtn.disabled=gehThumbnail ? (!zazzlyMode && page<=0) : (connectedZazzlyThumbnail ? false : page<=0);
    pageNextBtn.disabled=gehThumbnail ? zazzlyMode : (connectedZazzlyThumbnail ? true : page>=count-1);
    syncThumbnailPageControls();
    if(view==='thumbnail' && gehMode){
      if(zazzlyMode) pageStatus.textContent='PAGE 4';
      else pageStatus.textContent=`PAGE ${Math.floor(page/2)+1}${page%2===0?'A':'B'}`;
    }else{
      pageStatus.textContent=view==='thumbnail' ? `PAGE ${page+1} / ${count}` : `${start}–${end}`;
    }
  }

  function renderCurrentViewAfterPageChange(view){
    if(view==='overhead') renderOverhead();
    else if(view==='thumbnail') renderThumbnailPage();
    else if(view==='endless') renderEndless();
    else if(['left','wall','right'].includes(view)) renderRoom(lastRoomStart);
  }

  function navigateConnectedZazzlyBoundary(direction,view){
    if(!(gehMode || collectionContext)) return false;

    // GEH has a fourth physical Theme room: Zazzly. Main/Alternate/Mature
    // live in the standard 22-item area; Zazzly has its own map/area, so
    // crossing the Room 3 <-> Room 4 boundary is navigation rather than
    // an in-page page increment. Preserve the selected GEH rank.
    if(direction>0 && !zazzlyMode){
      const lastStandardPage=view==='thumbnail' ? 5 : currentGenericPageCount()-1;
      const current=view==='thumbnail' ? thumbnailPage : roomPage;
      if(current!==lastStandardPage) return false;
      const next=new URLSearchParams(params);
      next.set('area','zazzly');
      if(gehMode) next.set('geh','1');
      else next.delete('geh');
      next.set('returnArea',requestedArea || (gehMode?'geh':'collection'));
      next.set('returnRoomPage',String(lastStandardPage));
      next.delete('roomPage');
      next.delete('entryDoor');
      next.set('start',view==='overhead'?'exhibit':view==='thumbnail'?'thumbnail':'room');
      window.location.href=`exhibit.html?${next.toString()}`;
      return true;
    }

    if(direction<0 && zazzlyMode){
      const next=new URLSearchParams(params);
      const returnArea=standardAreaForReturn();
      const returnRoomPage=standardRoomForReturn();
      next.set('area',returnArea);
      next.delete('geh');
      next.delete('returnArea');
      next.delete('returnRoomPage');
      next.set('roomPage',String(view==='thumbnail'?5:returnRoomPage));
      next.delete('entryDoor');
      next.set('start',view==='overhead'?'exhibit':view==='thumbnail'?'thumbnail':'room');
      window.location.href=`exhibit.html?${next.toString()}`;
      return true;
    }
    return false;
  }

  function changePage(delta){
    const view=shell.dataset.view;
    const current=currentPageForView();
    const rawNext=current+delta;
    if((rawNext<0 || rawNext>=pageCount()) && navigateConnectedZazzlyBoundary(delta,view)) return;
    const next=Math.max(0,Math.min(pageCount()-1,rawNext));
    if(next===current) return;
    if(view!=='thumbnail') roomPage=next;
    thumbnailPage=next;
    if(view==='endless') endlessIndex=next*PAGE_SIZE;
    renderCurrentViewAfterPageChange(view);
  }

  const artworkSequenceViews=new Set(['thumbnail','overhead','left','wall','right','endless']);

  function updateNavigationState(){
    const view=shell.dataset.view;

    leftBtn.disabled=false;
    rightBtn.disabled=false;

    if(view==='thumbnail'){
      const connectedCollectionThumb=collectionContext && (requestedArea==='collection' || zazzlyMode);
      const pages=gehMode ? (zazzlyMode?1:6) : currentThumbnailPageCount();
      leftBtn.disabled=thumbnailPage<=0 && !((gehMode || connectedCollectionThumb) && zazzlyMode);
      rightBtn.disabled=thumbnailPage>=pages-1 && !((gehMode || connectedCollectionThumb) && !zazzlyMode);
    }else if(view==='endless'){
      leftBtn.disabled=endlessIndex<=0;
      rightBtn.disabled=endlessIndex>=genericResultCount-1;
    }else if(view==='zoom'){
      if(artworkSequenceViews.has(artworkReturn?.view)){
        const sourceView=artworkReturn?.view;
        const fromExhibit=['left','wall','right'].includes(sourceView);
        if(fromExhibit){
          const page=artworkReturn?.roomPage ?? roomPage;
          const pageStart=page*PAGE_SIZE+1;
          const pageEnd=Math.min(genericResultCount,pageStart+PAGE_SIZE-1);
          const hasMultiple=pageEnd>pageStart;
          leftBtn.disabled=!hasMultiple;
          rightBtn.disabled=!hasMultiple;
        }else{
          leftBtn.disabled=selectedArt<=1;
          rightBtn.disabled=selectedArt>=genericResultCount;
        }
      }else{
        leftBtn.disabled=true;
        rightBtn.disabled=true;
      }
    }else if(view==='overhead' && !capabilities.room){
      leftBtn.disabled=true;
      rightBtn.disabled=true;
    }
  }

  function stepSelectedArtwork(delta){
    const sourceView=artworkReturn?.view;
    if(!artworkSequenceViews.has(sourceView)) return;

    const fromExhibit=['left','wall','right'].includes(sourceView);
    let nextArt;

    if(fromExhibit){
      // Artwork opened from Exhibit View stays inside that physical room.
      // LEFT/RIGHT and selection-view swipe loop only through that room's
      // 22 artwork positions; moving to another Exhibit room requires a door.
      const page=artworkReturn?.roomPage ?? roomPage;
      const pageStart=page*PAGE_SIZE+1;
      const pageEnd=Math.min(genericResultCount,pageStart+PAGE_SIZE-1);
      if(pageEnd<=pageStart) return;

      nextArt=selectedArt+delta;
      if(nextArt<pageStart) nextArt=pageEnd;
      else if(nextArt>pageEnd) nextArt=pageStart;
    }else{
      nextArt=selectedArt+delta;
      if(nextArt<1 || nextArt>genericResultCount) return;
    }

    updateArtworkCopy(nextArt,selectedRank);
    const nextPage=Math.floor((nextArt-1)/(sourceView==='thumbnail'?THUMBNAIL_PAGE_SIZE:PAGE_SIZE));

    if(!fromExhibit){
      roomPage=nextPage;
      artworkReturn.roomPage=nextPage;
    }

    if(sourceView==='thumbnail'){
      thumbnailPage=nextPage;
      artworkReturn.thumbnailPage=nextPage;
    }else if(sourceView==='endless'){
      endlessIndex=nextArt-1;
      artworkReturn.endlessIndex=endlessIndex;
    }

    artworkScroll.scrollTop=0;
    updateNavigationState();
  }

  function handleLeft(){
    const view=shell.dataset.view;

    if(view==='thumbnail'){ changePage(-1); return; }

    if(view==='overhead'){ changePage(-1); return; }

    if(view==='endless'){
      if(endlessIndex>0){
        endlessIndex-=1;
        renderEndless();
      }
      return;
    }

    if(view==='zoom'){
      stepSelectedArtwork(-1);
      return;
    }

    if(view==='door'){
      if(capabilities.room) renderRoom(0);
      else if(capabilities.thumbnail) renderThumbnailPage();
      return;
    }

    if(capabilities.room) renderRoom(lastRoomStart-1);
  }

  function handleRight(){
    const view=shell.dataset.view;

    if(view==='thumbnail'){ changePage(1); return; }

    if(view==='overhead'){ changePage(1); return; }

    if(view==='endless'){
      if(endlessIndex<genericResultCount-1){
        endlessIndex+=1;
        renderEndless();
      }
      return;
    }

    if(view==='zoom'){
      stepSelectedArtwork(1);
      return;
    }

    if(view==='door'){
      if(capabilities.room) renderRoom(1);
      else if(capabilities.thumbnail) renderThumbnailPage();
      return;
    }

    if(capabilities.room) renderRoom(lastRoomStart+1);
  }

  // ---------------------------------------------------------------
  // v18 touch navigation.
  // A deliberate horizontal swipe in Exhibit View or Endless Wall
  // invokes the exact same LEFT/RIGHT behavior as the visible buttons.
  // Vertical-dominant gestures are ignored so normal page scrolling wins.
  // ---------------------------------------------------------------
  function installHorizontalSwipe(element,viewName,swipeMode='navigation'){
    if(!element || !window.PointerEvent) return;

    let gesture=null;
    let suppressClickUntil=0;
    const MIN_SWIPE=50;
    const HORIZONTAL_BIAS=1.25;

    element.addEventListener('pointerdown',event=>{
      if(shell.dataset.view!==viewName || !event.isPrimary || event.pointerType==='mouse') return;
      gesture={
        pointerId:event.pointerId,
        x:event.clientX,
        y:event.clientY
      };
    },{passive:true});

    element.addEventListener('pointercancel',event=>{
      if(gesture?.pointerId===event.pointerId) gesture=null;
    },{passive:true});

    element.addEventListener('pointerup',event=>{
      if(!gesture || gesture.pointerId!==event.pointerId) return;
      const dx=event.clientX-gesture.x;
      const dy=event.clientY-gesture.y;
      gesture=null;

      if(shell.dataset.view!==viewName) return;
      if(Math.abs(dx)<MIN_SWIPE) return;
      if(Math.abs(dx)<=Math.abs(dy)*HORIZONTAL_BIAS) return;

      suppressClickUntil=performance.now()+350;
      if(swipeMode==='page'){
        changePage(dx<0?1:-1);
      }else{
        if(dx<0) handleRight();
        else handleLeft();
      }
    },{passive:true});

    // A swipe can begin on an artwork button. Suppress the synthetic click
    // that follows the completed swipe so navigation does not also open it.
    element.addEventListener('click',event=>{
      if(performance.now()>=suppressClickUntil) return;
      event.preventDefault();
      event.stopImmediatePropagation();
    },true);
  }

  // Restore the approved swipe behavior without changing any room geometry.
  // Room camera states advance/reverse the 24-state circuit; Thumbnail View
  // mirrors its current LEFT/RIGHT paging behavior; Exhibit and Endless Wall
  // keep their existing swipe behavior.
  installHorizontalSwipe(roomStage,'left');
  installHorizontalSwipe(roomStage,'wall');
  installHorizontalSwipe(roomStage,'right');
  installHorizontalSwipe(thumbnailView,'thumbnail');
  installHorizontalSwipe(overheadView,'overhead','page');
  installHorizontalSwipe(endlessView,'endless');
  installHorizontalSwipe(artworkScroll,'zoom');

  function standardAreaForReturn(){
    return params.get('returnArea') || 'geh';
  }

  function standardRoomForReturn(){
    const raw=params.get('returnRoomPage');
    const saved=raw===null ? NaN : Number(raw);
    return Number.isInteger(saved) && saved>=0 ? saved : 2;
  }

  function navigateDoor4(presentation){
    const next=new URLSearchParams(params);
    if(zazzlyMode){
      const returnArea=standardAreaForReturn();
      const returnRoomPage=standardRoomForReturn();
      next.delete('returnArea');
      next.delete('returnRoomPage');
      next.set('area',returnArea);
      next.set('roomPage',String(returnRoomPage));
      next.set('entryDoor','4');
    }else{
      if(requestedArea) next.set('returnArea',requestedArea);
      next.set('returnRoomPage',String(roomPage));
      next.delete('roomPage');
      next.delete('entryDoor');
      // Zazzly is Room 4 of GEH when entered from GEH. Preserve that art-space
      // identity so the selected 1st–10th rank and rank controls remain active.
      if(gehMode) next.set('geh','1');
      next.set('area','zazzly');
    }
    next.set('start',presentation==='overhead'?'exhibit':'room');
    window.location.href=`exhibit.html?${next.toString()}`;
  }

  function roomPageAcrossDoor(doorNumber){
    doorNumber=Number(doorNumber);
    if(doorNumber===5) return {kind:'locked'};
    if(doorNumber===1){
      setView('door');
      return {kind:'entrance'};
    }
    if(doorNumber===4){
      navigateDoor4('room');
      return {kind:'navigation'};
    }

    // Door 2 connects Exhibit Rooms 1 and 2; Door 3 connects Rooms 2 and 3.
    const lowerPage=doorNumber-2;
    const upperPage=doorNumber-1;
    let nextPage=null;
    if(roomPage===lowerPage) nextPage=upperPage;
    else if(roomPage===upperPage) nextPage=lowerPage;
    if(nextPage===null || nextPage<0 || nextPage>=pageCount()) return {kind:'none'};

    roomPage=nextPage;
    thumbnailPage=nextPage;
    return {kind:'room',page:nextPage};
  }

  function useAerialDoor(doorNumber){
    doorNumber=Number(doorNumber);
    if(doorNumber===5) return;
    if(doorNumber===4){
      navigateDoor4('overhead');
      return;
    }

    const before=roomPage;
    const result=roomPageAcrossDoor(doorNumber);
    if(result?.kind==='entrance' || roomPage===before) return;
    renderOverhead();
  }

  function useExhibitDoor(doorNumber){
    const before=roomPage;
    roomPageAcrossDoor(doorNumber);
    if(shell.dataset.view==='door' || roomPage===before) return;

    // Enter the connected room facing the same doorway. The first physical
    // door slot centers at camera start 23; the second centers at start 8.
    const targetLocalDoor=Number(doorNumber)-roomPage;
    renderRoom(targetLocalDoor===1 ? 23 : 8);
  }

  allRoomSlotButtons.forEach(button=>{
    button.addEventListener('click',()=>{
      if(button.classList.contains('is-door-slot')){
        useExhibitDoor(button.dataset.door);
        return;
      }
      openArtwork(button.dataset.art,gehMode?gehRank:1);
    });
  });

  overheadSlots.forEach(button=>{
    button.addEventListener('click',()=>{
      if(button.classList.contains('is-overhead-door')){
        useAerialDoor(button.dataset.door);
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

  pagePrevBtn?.addEventListener('click',()=>changePage(-1));
  pageNextBtn?.addEventListener('click',()=>changePage(1));

  catSearchHasRadios.forEach(radio=>radio.addEventListener('change',()=>{ if(radio.checked) setCatSearchHas(radio.value); }));

  leftBtn.addEventListener('click',handleLeft);
  rightBtn.addEventListener('click',handleRight);
  overheadBtn.addEventListener('click',renderOverhead);
  roomBtn.addEventListener('click',()=>renderRoom(lastRoomStart));
  thumbnailBtn.addEventListener('click',renderThumbnailPage);
  endlessBtn.addEventListener('click',renderEndless);

  // Exterior Door 1 enters at its exact interior physical position:
  // ART 22 | DOOR 1 | ART 1, with Door 1 centered.
  frontDoor.addEventListener('click',()=>{
    // The GEH entrance always enters GEH Room 1 at Door 1. If the entrance
    // was opened while viewing GEH's Zazzly Room 4, return to the standard
    // GEH area rather than treating the facade as Zazzly's private entrance.
    if(gehMode && zazzlyMode){
      const next=new URLSearchParams(params);
      next.set('area',standardAreaForReturn());
      next.delete('geh');
      next.delete('returnArea');
      next.delete('returnRoomPage');
      next.set('roomPage','0');
      next.set('entryDoor','1');
      next.set('start','room');
      window.location.href=`exhibit.html?${next.toString()}`;
      return;
    }
    if(capabilities.room) renderRoom(zazzlyMode?13:23);
    else if(capabilities.thumbnail) renderThumbnailPage();
  });

  doorBtn.addEventListener('click',()=>{
    roomStart=zazzlyMode?13:23;
    lastRoomStart=zazzlyMode?13:23;
    setView('door');
  });

  artworkBack.addEventListener('click',restoreArtworkSource);
  artworkCenter.addEventListener('click',()=>openExpanded('art'));
  artworkPlaque.addEventListener('click',()=>openExpanded('plaque'));
  expandBack.addEventListener('click',closeExpanded);

  function toggleBlurbletPanel(panel,button,otherPanel,otherButton){
    const opening=panel.hidden;
    panel.hidden=!opening;
    button.setAttribute('aria-expanded',String(opening));
    if(opening && otherPanel){
      otherPanel.hidden=true;
      otherButton?.setAttribute('aria-expanded','false');
    }
  }

  function sortBlurblets(mode){
    const articles=[...blurbletList.querySelectorAll('article')];
    articles.sort((a,b)=>Number(a.dataset[mode])-Number(b.dataset[mode]));
    articles.forEach(article=>blurbletList.appendChild(article));
    blurbletSortChoices.forEach(button=>button.classList.toggle('is-selected',button.dataset.blurbletSort===mode));
    blurbletSortBtn.textContent=`SORT: ${mode.toUpperCase()}`;
    blurbletSortPanel.hidden=true;
    blurbletSortBtn.setAttribute('aria-expanded','false');
  }

  blurbletFiltersBtn?.addEventListener('click',()=>toggleBlurbletPanel(blurbletFilterPanel,blurbletFiltersBtn,blurbletSortPanel,blurbletSortBtn));
  blurbletSortBtn?.addEventListener('click',()=>toggleBlurbletPanel(blurbletSortPanel,blurbletSortBtn,blurbletFilterPanel,blurbletFiltersBtn));
  blurbletSortChoices.forEach(button=>button.addEventListener('click',()=>sortBlurblets(button.dataset.blurbletSort)));

  // Creator interaction is intentionally not invented in this engine pass.
  creatorLink.addEventListener('click',event=>event.preventDefault());

  applyCapabilities();
  updateRankButtons();

  // Prepare the overhead map once so it is immediately ready.
  overheadSlots.forEach(button=>{
    const index=Number(button.dataset.roomIndex);
    paintOverheadSlot(button,roomSlots[wrap(index)]);
  });

  window.addEventListener('resize',()=>{ if(shell.dataset.view==='thumbnail') syncThumbnailPageControls(); });

  const requestedStart=(params.get('start')||defaultStart).toLowerCase();
  if(requestedStart==='exhibit' && capabilities.exhibit && !(catacombsMode && catSearchHasTheme)) renderOverhead();
  else if(requestedStart==='room' && capabilities.room && !(catacombsMode && catSearchHasTheme)){
    const entryDoor=Number(params.get('entryDoor'));
    const targetLocalDoor=entryDoor-roomPage;
    renderRoom(zazzlyMode?13:(entryDoor && targetLocalDoor===1 ? 23 : entryDoor ? 8 : 1));
  }
  else if(requestedStart==='thumbnail' && capabilities.thumbnail) renderThumbnailPage();
  else if(requestedStart==='endless' && capabilities.endless && !(catacombsMode && !catSearchHasTheme)) renderEndless();
  else setView('door');
})();
