(() => {
  const display = document.getElementById('display');
  const stages = {
    1:{jars:5,buckets:0,cases:0,note:'5 large pigments · bookshelf'},
    2:{jars:15,buckets:0,cases:1,cap:[15],note:'15 jars · 1 case'},
    3:{jars:41,buckets:3,cases:2,cap:[22,22],shared:true,note:'41 jars + 3 Earthy buckets · 2 cases'},
    4:{jars:84,buckets:6,cases:4,cap:[28,28,28,6],bucketCase:3,note:'84 jars + 6 buckets · 4 cases'},
    5:{jars:168,buckets:9,cases:5,cap:[42,42,42,42,9],bucketCase:4,note:'168 jars + 9 buckets · 5 cases'},
    6:{jars:278,buckets:9,cases:8,cap:[40,40,40,40,40,40,40,9],bucketCase:7,note:'278 jars + 9 buckets · 8 cases'},
    7:{jars:500,buckets:9,cases:11,cap:[50,50,50,50,50,50,50,50,50,50,9],bucketCase:10,note:'500 jars + 9 buckets · 11 cases'}
  };
  const earthy=['#7b6855','#6f775b','#77736c','#66503f','#566049','#5e5b57','#a38b70','#8e9874','#98938b'];
  const hue = i => `hsl(${(i*137.508)%360} ${(45+(i*17)%43)}% ${(35+(i*11)%40)}%)`;
  function jar(color,name,large=false){const d=document.createElement('div');d.className=large?'jar':'mini-jar';d.style.setProperty('--c',color);if(large&&name){const l=document.createElement('span');l.className='jar-label';l.textContent=name;d.append(l)}return d}
  function bucket(i){const d=document.createElement('div');d.className='bucket';d.style.setProperty('--c',earthy[i%earthy.length]);return d}
  function renderBookcase(){
    const b=document.createElement('div');b.className='bookcase';
    const top=document.createElement('div');top.className='shelf';
    [['#FF2E5B','RED'],['#FFEE00','YELLOW'],['#0033FF','BLUE']].forEach(x=>top.append(jar(x[0],x[1],true)));
    const bottom=document.createElement('div');bottom.className='shelf';
    [['#FFFFFF','WHITE'],['#000000','BLACK']].forEach(x=>bottom.append(jar(x[0],x[1],true)));
    b.append(top,bottom);display.append(b);
  }
  function renderCases(stage,s){
    const wrap=document.createElement('div');wrap.className='cases';
    let jarIndex=0,bucketIndex=0;
    s.cap.forEach((capacity,ci)=>{
      const c=document.createElement('div');c.className='case';
      const isBucketCase=s.bucketCase===ci;
      let objects=[];
      if(isBucketCase){for(let i=0;i<capacity;i++)objects.push(bucket(bucketIndex++));}
      else if(stage===3){
        const bucketHere=ci===1?3:0;
        const jarsHere=capacity-bucketHere;
        for(let i=0;i<jarsHere;i++)objects.push(jar(hue(jarIndex++)));
        for(let i=0;i<bucketHere;i++)objects.push(bucket(bucketIndex++));
      } else {
        const remaining=s.jars-jarIndex;
        const count=Math.min(capacity,remaining);
        for(let i=0;i<count;i++)objects.push(jar(hue(jarIndex++)));
      }
      const shelves = capacity<=15?3:(capacity<=28?4:(capacity<=42?6:5));
      const cols=Math.ceil(capacity/shelves);
      let idx=0;
      for(let r=0;r<shelves;r++){
        const sh=document.createElement('div');sh.className='case-shelf';sh.style.setProperty('--cols',cols);
        for(let k=0;k<cols&&idx<objects.length;k++,idx++)sh.append(objects[idx]);
        c.append(sh);
      }
      wrap.append(c);
    });
    display.append(wrap);
  }
  function render(stage){
    const s=stages[stage];display.replaceChildren();display.dataset.stage=stage;
    if(stage===1)renderBookcase();else renderCases(stage,s);
    const note=document.createElement('div');note.className='stage-note';note.textContent=s.note;display.append(note);
  }
  document.querySelectorAll('input[name="stage"]').forEach(r=>r.addEventListener('change',()=>render(Number(r.value))));
  render(1);
})();
