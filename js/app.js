const $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)];
const R = n => n.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const wa = t => `https://wa.me/${CONFIG.whatsapp}` + (t ? '?text=' + encodeURIComponent(t) : '');
const norm = s => String(s).toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');

const PRODUTOS = PRODUTOS_LISTA.map((p, i) => ({ ...p, preco: +p.preco || 0, i }));
const imgP = p => tagImg(p, p.i, 100 + p.i, esc(p.nome));

/* ===== Carrinho ===== */
const CK = 'dl_cart_v2';
let CART = {}; try { CART = JSON.parse(localStorage.getItem(CK)) || {}; } catch (e) {}
const salva = () => { try { localStorage.setItem(CK, JSON.stringify(CART)); } catch (e) {} desenhaCarrinho(); };
const itens = () => Object.keys(CART).map(k => ({ p: PRODUTOS.find(p => p.codigo === k), q: CART[k] })).filter(i => i.p && i.q > 0);
const totais = () => itens().reduce((t, { p, q }) => ({ un: t.un + q, val: t.val + p.preco * q }), { un: 0, val: 0 });

function desenhaCarrinho() {
  const it = itens(), t = totais();
  $$('.cart-count').forEach(e => e.textContent = t.un);
  $('#itens').innerHTML = it.length ? it.map(({ p, q }) => `<div class="item">${imgP(p)}<div class="info"><span class="cod">${esc(p.codigo)}</span><b>${esc(p.nome)}</b><small>${p.preco ? R(p.preco) + ' un.' : 'Valor a combinar'}</small></div>
    <div class="qtd"><button data-m="${esc(p.codigo)}" aria-label="Diminuir">−</button><b>${q}</b><button data-p="${esc(p.codigo)}" aria-label="Aumentar">+</button></div>
    <button class="rem" data-r="${esc(p.codigo)}" aria-label="Remover"><i class="fa-solid fa-trash"></i></button></div>`).join('')
    : `<div class="vazio"><i class="fa-solid fa-basket-shopping"></i><h3>Seu carrinho está vazio</h3><p>Escolha seus ímãs favoritos!</p><button class="btn" data-fechar>Ver produtos</button></div>`;
  $('#fim').hidden = !it.length; $('#tUn').textContent = t.un; $('#tVal').textContent = t.val ? 'Total: ' + R(t.val) : '';
}
function mensagem(nome, obs) {
  const it = itens(), t = totais();
  let m = `Olá! Tudo bem? 😊\n\nGostaria de fazer um pedido na ${CONFIG.nome}.\n\n*Cliente:* ${nome}\n\n*Produtos selecionados:*\n`;
  it.forEach(({ p, q }, n) => { m += `\n${n + 1}. Código: ${p.codigo}\n   Produto: ${p.nome}\n   Quantidade: ${q} ${q === 1 ? 'unidade' : 'unidades'}` + (p.preco ? `\n   Valor unitário: ${R(p.preco)}\n   Subtotal: ${R(p.preco * q)}` : '') + '\n'; });
  m += `\n*Total de itens:* ${t.un}`; if (t.val) m += `\n*Valor total:* ${R(t.val)}`;
  if (obs) m += `\n\n*Observações:*\n${obs}`;
  return m + `\n\nAguardo o retorno para confirmar o pedido. Obrigado(a)! ❤️`;
}
function toast(msg) {
  let t = $('#toast'); if (!t) { t = document.createElement('div'); t.id = 'toast'; document.body.appendChild(t); }
  t.textContent = msg; t.classList.add('show'); clearTimeout(t._t); t._t = setTimeout(() => t.classList.remove('show'), 2200);
}
const abre = v => document.body.classList.toggle('aberto', v);

/* ===== Páginas ===== */
const card = p => `<article class="card"><div class="ph">${imgP(p)}</div><div class="cb"><span class="cod">${esc(p.codigo)}</span><h3>${esc(p.nome)}</h3><p>${esc(p.desc || '')}</p>
 <strong class="pr">${p.preco ? R(p.preco) + ' <em>por unidade</em>' : '<em>Valor a combinar</em>'}</strong>
 <div class="buy"><input type="number" min="1" max="999" value="1" aria-label="Quantidade"><button class="btn" data-add="${esc(p.codigo)}"><i class="fa-solid fa-cart-plus"></i> Adicionar</button></div></div></article>`;
function lista() {
  const t = norm($('#busca').value.trim());
  const l = PRODUTOS.filter(p => !t || norm(p.codigo + ' ' + p.nome + ' ' + (p.desc || '')).includes(t));
  $('#grade').innerHTML = l.map(card).join(''); $('#vazio').hidden = l.length > 0;
}
document.addEventListener('click', e => {
  const g = s => e.target.closest(s); let b;
  if (b = g('[data-add]')) {
    const inp = b.closest('.buy').querySelector('input'), q = Math.max(1, parseInt(inp.value) || 1), c = b.dataset.add;
    CART[c] = (CART[c] || 0) + q; salva(); inp.value = 1;
    toast(`✓ ${q}× ${PRODUTOS.find(p => p.codigo === c).nome} adicionado ao carrinho`);
  } else if (b = g('[data-p]')) { CART[b.dataset.p]++; salva(); }
  else if (b = g('[data-m]')) { if (--CART[b.dataset.m] < 1) delete CART[b.dataset.m]; salva(); }
  else if (b = g('[data-r]')) { delete CART[b.dataset.r]; salva(); }
  else if (g('#bCarrinho')) abre(true);
  else if (g('#fechar') || g('#fundo') || g('[data-fechar]')) abre(false);
  else if (g('#enviar')) {
    const nome = $('#nome').value.trim();
    if (!itens().length) return;
    if (!nome) { $('#nome').focus(); toast('Informe seu nome para continuar'); return; }
    window.open(wa(mensagem(nome, $('#obs').value.trim())), '_blank');
  } else if (g('#menu a')) $('#menu').classList.remove('open');
  else if (g('#bMenu')) $('#menu').classList.toggle('open');
});
document.addEventListener('DOMContentLoaded', () => {
  $$('[data-nome]').forEach(e => e.textContent = CONFIG.nome); $$('[data-email]').forEach(e => e.textContent = CONFIG.email);
  $$('[data-tel]').forEach(e => e.textContent = CONFIG.telefone); $$('[data-local]').forEach(e => e.textContent = CONFIG.local);
  $$('[data-ig]').forEach(a => { a.href = CONFIG.instagram; a.target = '_blank'; a.rel = 'noopener'; });
  $$('[data-wa]').forEach(a => { a.href = wa('Olá! Conheci a ' + CONFIG.nome + ' pelo site e gostaria de saber mais sobre os produtos.'); a.target = '_blank'; a.rel = 'noopener'; });
  $('#qimg').innerHTML = tagImg({ emoji: '💌', tags: 'gift,flowers' }, 0, 900, 'Ímãs personalizados');
  $('#mapa').src = 'https://maps.google.com/maps?q=' + encodeURIComponent(CONFIG.mapa) + '&output=embed';
  $('#abrirMapa').href = 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(CONFIG.mapa);
  $('#vit').innerHTML = MODELOS.map((m, i) => `<figure class="v">${tagImg(m, i + 2, 200 + i, esc(m.nome))}<figcaption>${esc(m.nome)}</figcaption></figure>`).join('');
  $('#feed').innerHTML = CLIENTES.map((c, i) => `<figure class="post">${tagImg(c, i + 1, 300 + i, esc(c.nome))}<figcaption><b>${esc(c.nome)}</b><span>${esc(c.legenda)}</span></figcaption></figure>`).join('');
  $('#busca').oninput = lista; lista(); desenhaCarrinho();
});
