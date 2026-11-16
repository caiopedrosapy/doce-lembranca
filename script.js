const NUMERO = '5581998334181';
const zap = msg => `https://wa.me/${NUMERO}?text=${encodeURIComponent(msg)}`;

// Fotos fictícias (picsum.photos). Troque o campo "foto" pelas fotos reais dos seus ímãs.
const foto = n => `https://picsum.photos/seed/doce-lembranca-${n}/600/600`;
const fotoDesfocada = n => `https://picsum.photos/seed/doce-lembranca-${n}/300/300?blur=6`;

const ims = [
  {nome:'Clássico com foto', cat:'Com foto', h:345, info:[['Tamanho','6×6 cm'],['Acabamento','Brilho'],['Prazo','até 5 dias']]},
  {nome:'Amor eterno', cat:'Casal', h:335, info:[['Tamanho','6×6 cm'],['Texto','Nomes e data'],['Prazo','até 5 dias']]},
  {nome:'Família reunida', cat:'Família', h:350, info:[['Tamanho','7×7 cm'],['Acabamento','Brilho'],['Prazo','até 5 dias']]},
  {nome:'Casamento', cat:'Festa', h:340, info:[['Tamanho','5×5 cm'],['Quantidade','a partir de 30'],['Prazo','sob consulta']]},
  {nome:'Aniversário', cat:'Festa', h:355, info:[['Tamanho','5×5 cm'],['Tema','à sua escolha'],['Prazo','sob consulta']]},
  {nome:'Chá de bebê', cat:'Festa', h:330, info:[['Tamanho','5×5 cm'],['Cores','delicadas'],['Prazo','sob consulta']]},
  {nome:'Viagem dos sonhos', cat:'Viagem', h:348, info:[['Tamanho','6×6 cm'],['Acabamento','Brilho'],['Prazo','até 5 dias']]},
  {nome:'Frase especial', cat:'Presente', h:338, info:[['Tamanho','6×6 cm'],['Texto','sua mensagem'],['Prazo','até 5 dias']]},
  {nome:'Kit presente', cat:'Presente', h:352, info:[['Itens','4 ímãs'],['Embalagem','caixinha'],['Prazo','até 7 dias']]}
];
ims.forEach((p, i) => { p.foto = foto(i + 1); p.fundo = fotoDesfocada(i + 1); });

const secao = document.getElementById('imas');
const shelf = document.getElementById('shelf');
const lista = document.getElementById('cases');
const espelho = document.getElementById('reflect');
const titulos = document.getElementById('titles');
const fundos = document.getElementById('fundos');
const pedir = document.getElementById('pedir');
const contador = document.getElementById('contador');
const btnAbrir = document.getElementById('abrir');
const ULTIMO = ims.length - 1;

const caixa = (p, i, decorativa) => `
  <li class="case" style="--i:${i};--h:${p.h}" data-i="${i}">
    <div class="box">
      <div class="cover">
        <div class="out">
          <img src="${p.foto}" alt="${decorativa ? '' : 'Foto do ímã ' + p.nome}" draggable="false">
          <span class="hinge"></span>
          <div class="art"><b>${p.nome}</b><span>${p.cat}</span></div>
        </div>
        <div class="in">
          <div class="notes-title">Detalhes</div>
          <ol>${p.info.map((d, k) => `<li><span>${k + 1}</span>${d[0]}<small>${d[1]}</small></li>`).join('')}</ol>
          <div class="notes-foot">Doce Lembrança, feito à mão</div>
        </div>
      </div>
      <div class="spine"><b>${p.nome}</b><span>${String(i + 1).padStart(2, '0')}</span></div>
      <div class="edge"></div><div class="lid"></div><div class="base"></div>
      <div class="tray"><div class="disc"><img src="${p.foto}" alt="" draggable="false"><i></i></div></div>
    </div>
  </li>`;

lista.innerHTML = ims.map((p, i) => caixa(p, i, false)).join('');
espelho.innerHTML = ims.map((p, i) => caixa(p, i, true)).join('');
titulos.innerHTML = ims.map((p, i) => `<div style="--i:${i}"><h3>${p.nome}</h3><p>${p.cat}</p></div>`).join('');
fundos.innerHTML = ims.map((p, i) => `<div style="--i:${i};--h:${p.h};--img:url('${p.fundo}')"></div>`).join('');

let sel = 0, aberto = 0;

function atualizar() {
  secao.style.setProperty('--sel', sel);
  secao.style.setProperty('--open', aberto);
  secao.classList.toggle('is-open', !!aberto);
  document.querySelectorAll('#cases .case, #reflect .case').forEach(c => c.classList.toggle('is-sel', +c.dataset.i === sel));
  contador.textContent = `${sel + 1} / ${ims.length}`;
  btnAbrir.textContent = aberto ? 'Fechar caixinha' : 'Ver por dentro';
  pedir.href = zap(`Olá! Quero o ímã "${ims[sel].nome}" da Doce Lembrança.`);
}
const ir = n => { if (!aberto) { sel = Math.max(0, Math.min(ULTIMO, n)); atualizar(); } };
const alternar = () => { aberto = aberto ? 0 : 1; atualizar(); };

// clique numa caixinha: escolhe; clique na escolhida: abre ou fecha
let arrastou = false;
lista.addEventListener('click', e => {
  const c = e.target.closest('.case');
  if (c && !arrastou) ir(+c.dataset.i);
});
document.getElementById('openhit').addEventListener('click', () => { if (!arrastou) alternar(); });
document.getElementById('prev').addEventListener('click', () => ir(sel - 1));
document.getElementById('next').addEventListener('click', () => ir(sel + 1));
btnAbrir.addEventListener('click', alternar);

// arrastar: uma caixinha a cada 70px
shelf.addEventListener('pointerdown', e => {
  const x0 = e.clientX, s0 = sel;
  arrastou = false;
  const mover = ev => {
    const dx = ev.clientX - x0;
    if (Math.abs(dx) > 5) arrastou = true;
    if (!aberto) { sel = Math.max(0, Math.min(ULTIMO, Math.round(s0 - dx / 70))); atualizar(); }
  };
  const soltar = () => {
    window.removeEventListener('pointermove', mover);
    window.removeEventListener('pointerup', soltar);
    window.removeEventListener('pointercancel', soltar);
    setTimeout(() => { arrastou = false; }, 0);
  };
  window.addEventListener('pointermove', mover);
  window.addEventListener('pointerup', soltar);
  window.addEventListener('pointercancel', soltar);
});

// teclado
shelf.addEventListener('keydown', e => {
  const teclas = {ArrowRight: () => ir(sel + 1), ArrowLeft: () => ir(sel - 1), Home: () => ir(0), End: () => ir(ULTIMO), Enter: alternar, Escape: () => { aberto = 0; atualizar(); }};
  if (teclas[e.key]) { e.preventDefault(); teclas[e.key](); }
});

atualizar();

document.getElementById('btn-zap').href = zap('Olá! Vim pelo site da Doce Lembrança e gostaria de fazer um orçamento.');

const burger = document.getElementById('burger');
const menu = document.getElementById('menu');
burger.addEventListener('click', () => {
  const aberto = menu.classList.toggle('aberto');
  burger.setAttribute('aria-expanded', aberto);
});
menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  menu.classList.remove('aberto');
  burger.setAttribute('aria-expanded', false);
}));

document.getElementById('ano').textContent = new Date().getFullYear();
