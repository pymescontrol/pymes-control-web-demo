'use strict';

const titleElement = document.getElementById('editable-title');
const refreshButton = document.getElementById('refresh-content');
const statusElement = document.getElementById('content-status');

async function loadContent() {
  if (refreshButton.disabled) return;
  refreshButton.disabled = true;
  statusElement.textContent = 'Actualizando el texto…';
  try {
    const url = new URL('./control-de-web.json', window.location.href);
    url.searchParams.set('v', String(Date.now()));
    const response = await fetch(url, {cache: 'no-store', credentials: 'omit'});
    if (!response.ok) throw new Error('Content unavailable');
    const content = await response.json();
    const title = content?.home?.webModernTitle;
    if (typeof title !== 'string' || !title.trim() || title.length > 80 || /[<>\u0000-\u001f\u007f]/.test(title)) {
      throw new Error('Invalid title');
    }
    titleElement.textContent = title;
    statusElement.textContent = 'Contenido actualizado.';
  } catch {
    statusElement.textContent = 'No se pudo actualizar. Conservamos el texto visible; inténtalo de nuevo.';
  } finally {
    refreshButton.disabled = false;
  }
}

refreshButton.addEventListener('click', loadContent);
loadContent();
