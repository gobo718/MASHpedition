(()=>{
 const p=new URLSearchParams(location.search);
 if(p.get('creation')==='palette'){
  document.body.classList.add('easel-session');
  const back=document.createElement('a'); back.className='easel-return'; back.href='creation-station.html?view=palettes'; back.textContent='RETURN TO CREATION STATION'; document.body.append(back);
  return;
 }
 if(p.get('easel')!=='1')return;
 document.body.classList.add('easel-session');
 const back=document.createElement('a'); back.className='easel-return'; back.href='easel.html'; back.textContent='RETURN TO PROJECT'; document.body.append(back);
 const icons=['🖌️','🫟','🖼️','📊','🔡','📄','✏️','✨','🌈','🎨','🎨'];
 const box=document.createElement('aside'); box.className='easel-loadout'; box.setAttribute('aria-label','Current Easel selections');
 icons.forEach(i=>{const s=document.createElement('span');s.className='slot';s.innerHTML=`<span class="ico">${i}</span><span class="def">DEFAULT</span>`;box.append(s)});
 document.body.append(box);
})();
