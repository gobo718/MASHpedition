(()=>{
 const buttons=[...document.querySelectorAll('[data-station-view]')];
 const views=[...document.querySelectorAll('[data-view]')];
 const show=name=>views.forEach(v=>v.hidden=v.dataset.view!==name);
 buttons.forEach(b=>b.addEventListener('click',()=>show(b.dataset.stationView)));
 const q=new URLSearchParams(location.search);
 if(q.get('view')==='palettes')show('palettes');
})();
