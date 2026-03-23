(function() {
  const KEY = 'agridera-view';

  const icnDesktop = '<svg viewBox="0 0 24 24"><path d="M21 2H3a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h7v2H8a1 1 0 0 0 0 2h8a1 1 0 0 0 0-2h-2v-2h7a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2zm0 14H3V4h18z"/></svg>';
  const icnMobile  = '<svg viewBox="0 0 24 24"><path d="M17 1H7a2 2 0 0 0-2 2v18a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2zm-5 21a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5-5H7V4h10z"/></svg>';

  function getMode() {
    return localStorage.getItem(KEY) || (window.innerWidth < 768 ? 'mobile' : 'desktop');
  }

  function setMode(mode) {
    document.body.classList.toggle('mobile-view', mode === 'mobile');
  }

  function makeBtn(mode) {
    const btn = document.createElement('button');
    btn.id = 'view-toggle-btn';

    const toMode = mode === 'mobile' ? 'desktop' : 'mobile';
    btn.innerHTML = `
      ${mode === 'mobile' ? icnDesktop : icnMobile}
      <span class="btn-label">${toMode}</span>
      <span class="btn-dots">
        <span class="${mode === 'desktop' ? 'active' : ''}"></span>
        <span class="${mode === 'mobile' ? 'active' : ''}"></span>
      </span>
    `;

    btn.onclick = () => {
      localStorage.setItem(KEY, toMode);
      setMode(toMode);
      btn.replaceWith(makeBtn(toMode));
    };

    return btn;
  }

  const mode = getMode();
  setMode(mode);

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => document.body.appendChild(makeBtn(mode)));
  } else {
    document.body.appendChild(makeBtn(mode));
  }
})();
