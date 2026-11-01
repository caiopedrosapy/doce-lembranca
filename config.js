/* ===== CONFIGURAÇÕES CENTRAIS — edite aqui os dados da empresa ===== */
const CONFIG = {
  nome: 'Doce Lembrança Personalizados',
  whatsapp: '5581998685028',                 // país + DDD + número, só dígitos
  instagram: 'https://www.instagram.com/bolsa_macrame/',
  email: 'caio2007pedrosa@gmail.com',
  telefone: '(81) 99868-5028',
  local: 'Palmares - PE',
  msgFlutuante: 'Olá! Conheci a Doce Lembrança Personalizados pelo site e gostaria de saber mais sobre os produtos.'
};

const CATEGORIAS = ['Ímãs de aniversário','Ímãs de casamento','Ímãs de nascimento de bebê','Ímãs de batizado','Ímãs de formatura','Ímãs de casal','Ímãs de família','Ímãs com fotos personalizadas','Ímãs para lembrancinhas','Ímãs temáticos','Ímãs para datas comemorativas','Ímãs personalizados para empresas'];

/* Imagem ilustrativa (SVG gerado). Para usar foto real, preencha "foto" com o caminho, ex.: 'assets/imagens/im001.jpg' */
const PALETA = [['#fde2e4','#f4a3ab'],['#ffe5ec','#e8707a'],['#fbd5da','#c94a63'],['#fff0f1','#f19aa5']];
function ilustra(emoji, i) {
  const [a, b] = PALETA[i % PALETA.length];
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${a}"/><stop offset="1" stop-color="${b}"/></linearGradient></defs><rect width="400" height="400" fill="${a}"/><rect x="60" y="60" width="280" height="280" rx="36" fill="url(#g)" stroke="#fff" stroke-width="10"/><rect x="70" y="70" width="260" height="260" rx="28" fill="none" stroke="#7b1e3a" stroke-opacity=".25" stroke-dasharray="6 8"/><text x="200" y="240" font-size="130" text-anchor="middle">${emoji}</text></svg>`;
  return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
}

/* [código, nome, categoria (índice acima), preço, emoji, descrição, foto opcional] — NÃO altere códigos já existentes */
const LISTA = [
 ['IM001','Ímã Polaroid Personalizado',7,8,'📸','Ímã personalizado com foto, ideal para presentear e guardar boas lembranças.'],
 ['IM002','Ímã Foto Coração',7,9,'❤️','Sua foto favorita em formato de coração, feito com carinho.'],
 ['IM003','Ímã Parabéns',0,6,'🎂','Lembrança para comemorar mais um ano de vida com nome e idade.'],
 ['IM004','Ímã Casal',5,10,'💑','Para eternizar o amor com foto e data especial.'],
 ['IM005','Ímã Aniversário Infantil',0,6,'🎈','Colorido e divertido, perfeito para festas infantis.'],
 ['IM006','Ímã Save the Date',1,9,'💍','Avise a data do grande dia de um jeito inesquecível.'],
 ['IM007','Ímã Casamento Floral',1,10,'💐','Lembrança delicada com flores, nomes e data dos noivos.'],
 ['IM008','Ímã Chegada do Bebê',2,7,'👶','Anuncie a chegada do bebê com nome, peso e data.'],
 ['IM009','Ímã Maternidade',2,7,'🍼','Lembrancinha de maternidade personalizada.'],
 ['IM010','Ímã Batizado Anjinho',3,6.5,'😇','Anjinho fofo com nome e data do batizado.'],
 ['IM011','Ímã Batizado Cruz',3,6.5,'✝️','Modelo delicado para celebrar a fé e a família.'],
 ['IM012','Ímã Formatura Capelo',4,8,'🎓','Celebre a conquista com curso, nome e ano.'],
 ['IM013','Ímã Turma de Formandos',4,8.5,'📜','Lembrança da turma para guardar para sempre.'],
 ['IM014','Ímã Casal Apaixonados',5,10,'💞','Ilustração romântica com a história de vocês.'],
 ['IM015','Ímã Família Feliz',6,9,'👨‍👩‍👧','Foto da família em um ímã cheio de afeto.'],
 ['IM016','Ímã Árvore da Família',6,9.5,'🌳','Árvore com os nomes de quem você mais ama.'],
 ['IM017','Ímã Foto Quadrada',7,7.5,'🖼️','Clássico quadrado com sua foto em alta qualidade.'],
 ['IM018','Ímã Lembrancinha Mini',8,3.5,'🎁','Tamanho mini, ótimo para festas e eventos.'],
 ['IM019','Ímã Agradecimento',8,4,'💌','Com mensagem de gratidão para seus convidados.'],
 ['IM020','Ímã Temático Unicórnio',9,6.5,'🦄','Tema encantado para festas e presentes.'],
 ['IM021','Ímã Temático Safari',9,6.5,'🦁','Bichinhos da selva em tons alegres.'],
 ['IM022','Ímã Dia das Mães',10,7,'🌷','Presente carinhoso com foto e mensagem especial.'],
 ['IM023','Ímã Natal',10,7,'🎄','Lembrança natalina personalizada com nome.'],
 ['IM024','Ímã com Logo da Empresa',11,5,'🏢','Brinde com a marca da sua empresa.'],
 ['IM025','Ímã Brinde Corporativo',11,4.5,'💼','Ideal para eventos, feiras e ações de marketing.']
];
const PRODUTOS = LISTA.map((l, i) => ({ codigo:l[0], nome:l[1], cat:l[2], preco:l[3], desc:l[5], img:l[6] || ilustra(l[4], i) }));

/* Galeria de clientes — IMAGENS DEMONSTRATIVAS. Substitua por fotos reais AUTORIZADAS (campo foto). */
const GALERIA = [
 ['💑','Uma lembrança especial para um dia inesquecível ❤️','Cliente exemplo 1'],
 ['🎂','Personalizados feitos com muito carinho!','Cliente exemplo 2'],
 ['👶','Pequenos detalhes que tornam grandes momentos eternos.','Cliente exemplo 3'],
 ['🎓','Mais uma encomenda entregue com amor!','Cliente exemplo 4'],
 ['💍','Uma lembrança especial para um dia inesquecível ❤️','Cliente exemplo 5'],
 ['🎁','Personalizados feitos com muito carinho!','Cliente exemplo 6'],
 ['📸','Pequenos detalhes que tornam grandes momentos eternos.','Cliente exemplo 7'],
 ['🌷','Mais uma encomenda entregue com amor!','Cliente exemplo 8'],
 ['👨‍👩‍👧','Uma lembrança especial para um dia inesquecível ❤️','Cliente exemplo 9']
].map((g, i) => ({ img: g[3] || ilustra(g[0], i + 1), legenda: g[1], nome: g[2] }));
