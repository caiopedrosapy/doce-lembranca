
function desenha() {
  const it = Cart.items(), box = $('#conteudo');
  if (!it.length) { box.innerHTML = `<div class="vazio"><i class="fa-solid fa-basket-shopping"></i><h2>Seu carrinho está vazio</h2><p>Que tal escolher alguns ímãs com carinho?</p><a class="btn" href="produtos.html">Voltar ao catálogo</a></div>`; return; }
  const un = it.reduce((s, i) => s + i.q, 0);
  box.innerHTML = `<div class="lista">${it.map(({ p, q }) => `<div class="item"><img src="${p.img}" alt="${p.nome}">
    <div class="info"><span class="cod">${p.codigo}</span><h3>${p.nome}</h3><small>${R(p.preco)} por unidade</small></div>
    <div class="qtd"><button data-m="${p.codigo}" aria-label="Diminuir">−</button><b>${q}</b><button data-p="${p.codigo}" aria-label="Aumentar">+</button></div>
    <strong class="sub">${R(p.preco * q)}</strong><button class="rem" data-r="${p.codigo}" aria-label="Remover"><i class="fa-solid fa-trash"></i></button></div>`).join('')}</div>
   <aside class="resumo"><h3>Resumo do pedido</h3><p>${un} unidade(s)</p><p class="total">Total: <b>${R(Cart.total())}</b></p>
    <label>Seu nome *<input id="nome" placeholder="Ex.: Maria Silva"></label>
    <label>Data desejada (opcional)<input id="data" placeholder="Ex.: 20/12"></label>
    <label>Detalhes de personalização (opcional)<textarea id="info" rows="3" placeholder="Fotos, nomes, datas, cores…"></textarea></label>
    <button class="btn grande" id="fim"><i class="fa-brands fa-whatsapp"></i> Finalizar pedido pelo WhatsApp</button>
    <small>O WhatsApp abrirá com a mensagem pronta. Você revisa e toca em enviar — o pedido não é enviado automaticamente.</small></aside>`;
}
function mensagem(nome, info, data) {
  const it = Cart.items(), un = it.reduce((s, i) => s + i.q, 0);
  const linhas = it.map(({ p, q }, n) => `${n + 1}. Código: ${p.codigo}\n   Produto: ${p.nome}\n   Quantidade: ${q} ${q === 1 ? 'unidade' : 'unidades'}\n   Valor unitário: ${R(p.preco)}\n   Subtotal: ${R(p.preco * q)}`).join('\n\n');
  let m = `Olá! Tudo bem? 😊\n\nGostaria de fazer um pedido na ${CONFIG.nome}.\n\n*Dados do cliente:*\nNome: ${nome}\n\n*Produtos selecionados:*\n\n${linhas}\n\n*Resumo do pedido:*\nTotal de produtos: ${un} ${un === 1 ? 'unidade' : 'unidades'}\nValor total: ${R(Cart.total())}\n`;
  if (data || info) m += `\n*Informações adicionais:*\n${data ? 'Data desejada: ' + data + '\n' : ''}${info || ''}\n`;
  return m + `\nAguardo o retorno para confirmar os detalhes do pedido. Obrigado(a)! ❤️`;
}
document.addEventListener('click', e => {
  const g = a => e.target.closest(`[${a}]`), q = c => Cart.get()[c];
  let b;
  if (b = g('data-p')) Cart.setQty(b.dataset.p, q(b.dataset.p) + 1);
  else if (b = g('data-m')) Cart.setQty(b.dataset.m, q(b.dataset.m) - 1);
  else if (b = g('data-r')) Cart.setQty(b.dataset.r, 0);
  else if (e.target.closest('#fim')) {
    const nome = $('#nome').value.trim();
    if (!nome) { $('#nome').focus(); toast('Informe seu nome para continuar'); return; }
    window.open(wa(mensagem(nome, $('#info').value.trim(), $('#data').value.trim())), '_blank');
    return;
  } else return;
  const v = ['nome', 'data', 'info'].map(i => $('#' + i)?.value || ''); desenha();
  ['nome', 'data', 'info'].forEach((i, k) => { if ($('#' + i)) $('#' + i).value = v[k]; });
});
document.addEventListener('DOMContentLoaded', desenha);