
<script src="../js/principal.js"></script>

const $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)];
const R = n => n.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
const wa = t => `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(t)}`;
const norm = s => s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');

/* ===== Carrinho (localStorage) ===== */
const Cart = {
  get() { try { return JSON.parse(localStorage.getItem('dl_cart')) || {}; } catch (e) { return {}; } },
  set(c) { try { localStorage.setItem('dl_cart', JSON.stringify(c)); } catch (e) {} Cart.badge(); },
  add(code, q) { const c = Cart.get(); c[code] = (c[code] || 0) + q; Cart.set(c); },
  setQty(code, q) { const c = Cart.get(); if (q < 1) delete c[code]; else c[code] = q; Cart.set(c); },
  items() { const c = Cart.get(); return Object.keys(c).map(k => ({ p: PRODUTOS.find(p => p.codigo === k), q: c[k] })).filter(i => i.p); },
  count() { return Cart.items().reduce((s, i) => s + i.q, 0); },
  total() { return Cart.items().reduce((s, i) => s + i.q * i.p.preco, 0); },
  badge() { $$('.cart-count').forEach(e => e.textContent = Cart.count()); }
};

function toast(msg) {
  let t = $('#toast'); if (!t) { t = document.createElement('div'); t.id = 'toast'; document.body.appendChild(t); }
  t.textContent = msg; t.classList.add('show'); clearTimeout(t._t); t._t = setTimeout(() => t.classList.remove('show'), 2200);
}

const card = p => `<article class="card"><div class="ph"><img src="${p.img}" alt="${p.nome}" loading="lazy"></div><div class="cb"><span class="cod">${p.codigo}</span><h3>${p.nome}</h3><small>${CATEGORIAS[p.cat]}</small><p>${p.desc}</p><strong class="pr">${R(p.preco)} <em>por unidade</em></strong><div class="buy"><input type="number" min="1" max="999" value="1" aria-label="Quantidade"><button class="btn" data-add="${p.codigo}"><i class="fa-solid fa-cart-plus"></i> Adicionar ao carrinho</button></div></div></article>`;

/* ===== Cabeçalho, rodapé e botão flutuante ===== */
function montaLayout() {
  const pg = location.pathname.split('/').pop() || 'index.html';
  const links = [['index.html','Início'],['produtos.html','Produtos'],['clientes.html','Clientes'],['index.html#quem-somos','Quem Somos']];
  const nav = links.map(([h, t]) => `<a href="${h}" class="${h === pg ? 'on' : ''}">${t}</a>`).join('');
  $('#topo').innerHTML = `<div class="wrap bar"><a href="index.html" class="logo"><i class="fa-solid fa-heart"></i> ${CONFIG.nome}</a>
   <nav id="menu">${nav}</nav>
   <div class="acoes">
    <button class="ic" id="bBusca" aria-label="Pesquisar"><i class="fa-solid fa-magnifying-glass"></i></button>
    <a class="ic" href="carrinho.html" aria-label="Carrinho"><i class="fa-solid fa-cart-shopping"></i><span class="cart-count">0</span></a>
    <a class="ic wa" href="${wa(CONFIG.msgFlutuante)}" target="_blank" rel="noopener" aria-label="WhatsApp"><i class="fa-brands fa-whatsapp"></i></a>
    <a class="ic ig" href="${CONFIG.instagram}" target="_blank" rel="noopener" aria-label="Instagram"><i class="fa-brands fa-instagram"></i></a>
    <button class="ic burger" id="bMenu" aria-label="Menu"><i class="fa-solid fa-bars"></i></button>
   </div></div>
   <form class="wrap busca" id="fBusca" action="produtos.html"><input name="q" placeholder="Pesquise por nome, código ou categoria…" aria-label="Pesquisar"><button class="btn" type="submit">Buscar</button></form>`;
  $('#rodape').innerHTML = `<div class="wrap fgrid"><div><h4>${CONFIG.nome}</h4><p><i class="fa-solid fa-envelope"></i> ${CONFIG.email}</p><p><i class="fa-solid fa-phone"></i> ${CONFIG.telefone}</p><p><i class="fa-solid fa-location-dot"></i> ${CONFIG.local}</p><p>Entregamos em Palmares-PE.</p></div>
   <div><h4>Navegue</h4>${nav}</div>
   <div><h4>Redes</h4><div class="soc"><a class="ic wa" href="${wa(CONFIG.msgFlutuante)}" target="_blank" rel="noopener" aria-label="WhatsApp"><i class="fa-brands fa-whatsapp"></i></a><a class="ic ig" href="${CONFIG.instagram}" target="_blank" rel="noopener" aria-label="Instagram"><i class="fa-brands fa-instagram"></i></a></div></div></div>
   <p class="aviso">Os dados de contato, o WhatsApp e o Instagram deste site são demonstrativos e devem ser substituídos pelos reais (arquivo js/config.js).</p>
   <p class="copy">© 2026 ${CONFIG.nome}. Todos os direitos reservados.</p>`;
  const f = document.createElement('a');
  f.className = 'flutuante'; f.href = wa(CONFIG.msgFlutuante); f.target = '_blank'; f.rel = 'noopener'; f.setAttribute('aria-label', 'Falar no WhatsApp');
  f.innerHTML = '<i class="fa-brands fa-whatsapp"></i>'; document.body.appendChild(f);
  $('#bMenu').onclick = () => $('#menu').classList.toggle('open');
  $('#bBusca').onclick = () => { $('#fBusca').classList.toggle('open'); $('#fBusca input').focus(); };
  Cart.badge();
}

/* ===== Adicionar ao carrinho (qualquer card) ===== */
document.addEventListener('click', e => {
  const b = e.target.closest('[data-add]'); if (!b) return;
  const inp = b.closest('.buy').querySelector('input');
  const q = Math.max(1, parseInt(inp.value) || 1);
  Cart.add(b.dataset.add, q); inp.value = 1;
  const p = PRODUTOS.find(x => x.codigo === b.dataset.add);
  toast(`✓ ${q}× ${p.nome} adicionado ao carrinho`);
});

document.addEventListener('DOMContentLoaded', () => {
  montaLayout();
  const d = $('#destaques'); if (d) d.innerHTML = [0, 3, 6, 13].map(i => card(PRODUTOS[i])).join('');
  const fd = $('#feed'); if (fd) fd.innerHTML = GALERIA.map(g => `<figure class="post"><img src="${g.img}" alt="${g.legenda}" loading="lazy"><figcaption><b>${g.nome}</b><span>${g.legenda}</span></figcaption></figure>`).join('');
  $$('[data-ig]').forEach(a => { a.href = CONFIG.instagram; a.target = '_blank'; a.rel = 'noopener'; });
  $$('[data-wa]').forEach(a => { a.href = wa(CONFIG.msgFlutuante); a.target = '_blank'; a.rel = 'noopener'; });
});