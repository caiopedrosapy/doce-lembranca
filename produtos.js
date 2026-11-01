let catAtual = -1, termo = '';
function render() {
  const t = norm(termo.trim());
  const lista = PRODUTOS.filter(p => (catAtual < 0 || p.cat === catAtual) &&
    (!t || norm([p.nome, p.codigo, CATEGORIAS[p.cat], p.desc].join(' ')).includes(t)));
  const o = $('#ordem').value;
  if (o === 'menor') lista.sort((a, b) => a.preco - b.preco);
  if (o === 'maior') lista.sort((a, b) => b.preco - a.preco);
  if (o === 'az') lista.sort((a, b) => a.nome.localeCompare(b.nome, 'pt-BR'));
  if (o === 'cod') lista.sort((a, b) => a.codigo.localeCompare(b.codigo));
  $('#grade').innerHTML = lista.map(card).join('');
  $('#vazio').hidden = lista.length > 0;
  $('#contagem').textContent = `${lista.length} produto(s)`;
}
document.addEventListener('DOMContentLoaded', () => {
  const f = $('#filtros');
  f.innerHTML = ['Todos', ...CATEGORIAS].map((c, i) => `<button class="chip ${i === 0 ? 'on' : ''}" data-c="${i - 1}">${c}</button>`).join('');
  f.onclick = e => { const b = e.target.closest('.chip'); if (!b) return; catAtual = +b.dataset.c; $$('.chip', f).forEach(x => x.classList.toggle('on', x === b)); render(); };
  const inp = $('#busca');
  inp.oninput = () => { termo = inp.value; render(); };
  $('#limpar').onclick = () => { inp.value = ''; termo = ''; catAtual = -1; $$('.chip', f).forEach((x, i) => x.classList.toggle('on', i === 0)); render(); };
  $('#ordem').onchange = render;
  const q = new URLSearchParams(location.search).get('q'); if (q) { inp.value = q; termo = q; }
  render();
});
