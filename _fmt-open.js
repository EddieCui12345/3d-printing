const mode = new URLSearchParams(location.search).get('mode');
if (mode === 'dialog' || mode === 'cart')
  document.querySelector('#collection [data-product="2"]').click();
if (mode === 'unpriced') document.querySelector('#collection [data-product="0"]').click();
if (mode === 'cart') {
  document.querySelector('[data-add]').click();
  document.querySelector('[data-add]')?.click();
  document.querySelector('#collection [data-product="1"]').click();
  document.querySelector('[data-add]').click();
}
if (mode === 'filter') document.querySelector('[data-filter="Chess"]').click();
