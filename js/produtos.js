
/* ===== SEUS PRODUTOS — edite aqui =====
   codigo: único (não repita nem mude depois)   nome: nome do item   desc: descrição curta
   preco: valor em reais (use 0 para "valor a combinar")
   emoji: usado na imagem ilustrativa (pode apagar quando tiver foto real)
   img: foto real, ex.: "assets/imagens/im001.jpg" (salve a foto na pasta assets/imagens). Sem img = usa a ilustração.
   Para adicionar um produto, copie uma linha, mude os dados e lembre da vírgula no fim. */
const PRODUTOS_LISTA = [
 { codigo: "IM001", nome: "Ímã Polaroid", desc: "Sua foto favorita em formato polaroid, ideal para guardar boas lembranças.", preco: 8, emoji: "📸", img: "" },
 { codigo: "IM002", nome: "Ímã Casal", desc: "Para eternizar o amor com foto, nomes e a data especial de vocês.", preco: 10, emoji: "💑", img: "" },
 { codigo: "IM003", nome: "Ímã Aniversário", desc: "Parabéns personalizado com nome e idade, perfeito para festas.", preco: 6, emoji: "🎂", img: "" },
 { codigo: "IM004", nome: "Ímã Chegada do Bebê", desc: "Anuncie a chegada do bebê com nome, data e carinho.", preco: 7, emoji: "👶", img: "" },
 { codigo: "IM005", nome: "Ímã Casamento", desc: "Lembrança delicada com nomes e data dos noivos.", preco: 9, emoji: "💍", img: "" },
 { codigo: "IM006", nome: "Ímã Batizado", desc: "Anjinho com nome e data para celebrar o batizado.", preco: 6.5, emoji: "😇", img: "" },
 { codigo: "IM007", nome: "Ímã Formatura", desc: "Celebre a conquista com curso, nome e ano de formatura.", preco: 8, emoji: "🎓", img: "" },
 { codigo: "IM008", nome: "Ímã Família", desc: "A foto da família em um ímã cheio de afeto.", preco: 9, emoji: "👨‍👩‍👧", img: "" },
 { codigo: "IM009", nome: "Ímã Lembrancinha", desc: "Tamanho mini com mensagem de agradecimento para convidados.", preco: 4, emoji: "🎁", img: "" }
];

/* ===== VITRINE "NOSSOS MODELOS" (12 fotos) — troque o img por fotos reais quando quiser ===== */
const MODELOS = [
 { nome: "Polaroid", emoji: "📸", img: "" }, { nome: "Casal", emoji: "💑", img: "" }, { nome: "Aniversário", emoji: "🎂", img: "" },
 { nome: "Bebê", emoji: "👶", img: "" }, { nome: "Casamento", emoji: "💍", img: "" }, { nome: "Formatura", emoji: "🎓", img: "" },
 { nome: "Família", emoji: "👨‍👩‍👧", img: "" }, { nome: "Lembrancinha", emoji: "🎁", img: "" }, { nome: "Temático", emoji: "🦄", img: "" },
 { nome: "Datas especiais", emoji: "🌷", img: "" }, { nome: "Para empresas", emoji: "🏢", img: "" }, { nome: "Foto quadrada", emoji: "🖼️", img: "" }
];

/* ===== "NOSSOS CLIENTES" (6 fotos) — use só fotos reais com autorização dos clientes ===== */
const CLIENTES = [
 { nome: "Cliente 1", legenda: "Uma lembrança especial para um dia inesquecível ❤️", emoji: "💍", img: "" },
 { nome: "Cliente 2", legenda: "Personalizados feitos com muito carinho!", emoji: "🎂", img: "" },
 { nome: "Cliente 3", legenda: "Pequenos detalhes que tornam grandes momentos eternos.", emoji: "👶", img: "" },
 { nome: "Cliente 4", legenda: "Mais uma encomenda entregue com amor!", emoji: "🎓", img: "" },
 { nome: "Cliente 5", legenda: "Lembrancinhas lindas, todo mundo amou!", emoji: "🎁", img: "" },
 { nome: "Cliente 6", legenda: "Nossa família em um ímã cheio de afeto.", emoji: "👨‍👩‍👧", img: "" }
];
