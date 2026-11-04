/* ===== DADOS DA EMPRESA — edite aqui (WhatsApp: só dígitos, com 55 + DDD) ===== */
const CONFIG = {
  nome: 'Doce Lembrança Personalizados',
  whatsapp: '5581998685028',   // país + DDD + número, só dígitos
  instagram: 'https://www.instagram.com/bolsa_macrame/',
  email: 'caio2007pedrosa@gmail.com',
  telefone: '(81) 99868-5028',
  local: 'Palmares - PE'
};

/* Imagem ilustrativa (SVG). Para foto real use o campo "img" do produto. */
const PAL = [['#ffe3e8','#f48fa0','#7b1e3a'],['#fff0f3','#e8707a','#8f2445'],['#fbd0d8','#d94f6c','#5e1230'],['#ffffff','#f7b3c0','#7b1e3a']];
function ilustra(e, i) {
  const [a, b, c] = PAL[i % 4], f = i % 5; let s;
  if (f === 0) s = `<rect x="90" y="60" width="220" height="270" rx="10" fill="#fff" stroke="${b}" stroke-width="4"/><rect x="108" y="78" width="184" height="190" rx="6" fill="${b}" opacity=".35"/><text x="200" y="205" font-size="100" text-anchor="middle">${e}</text><text x="200" y="304" font-size="24" fill="${c}" text-anchor="middle" font-family="cursive">com carinho</text>`;
  else if (f === 1) s = `<path d="M200 335C55 235 65 105 138 95c42-5 58 27 62 42 4-15 20-47 62-42 73 10 83 140-62 240z" fill="${b}" stroke="#fff" stroke-width="8"/><text x="200" y="232" font-size="95" text-anchor="middle">${e}</text>`;
  else if (f === 2) s = `<circle cx="200" cy="195" r="135" fill="${b}" stroke="#fff" stroke-width="10"/><circle cx="200" cy="195" r="114" fill="none" stroke="${c}" stroke-opacity=".4" stroke-dasharray="6 8"/><text x="200" y="232" font-size="110" text-anchor="middle">${e}</text>`;
  else if (f === 3) s = `<rect x="68" y="62" width="264" height="264" rx="44" fill="${b}" stroke="#fff" stroke-width="10"/><text x="200" y="240" font-size="120" text-anchor="middle">${e}</text>`;
  else s = `<path d="M98 335V185a102 102 0 0 1 204 0v150z" fill="${b}" stroke="#fff" stroke-width="10"/><text x="200" y="270" font-size="105" text-anchor="middle">${e}</text>`;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400"><defs><radialGradient id="g"><stop offset="0" stop-color="#fff"/><stop offset="1" stop-color="${a}"/></radialGradient></defs><rect width="400" height="400" fill="url(#g)"/><ellipse cx="200" cy="365" rx="110" ry="11" fill="${c}" opacity=".13"/>${s}</svg>`;
  return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
}
