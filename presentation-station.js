(()=>{
  const buttons=[...document.querySelectorAll('[data-station-view]')];
  const views=[...document.querySelectorAll('[data-view]')];
  const show=name=>{
    views.forEach(view=>view.hidden=view.dataset.view!==name);
    buttons.forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.stationView===name)));
  };
  buttons.forEach(button=>button.addEventListener('click',()=>show(button.dataset.stationView)));
})();
