# Doce Lembrança Personalizados — loja de ímãs (demonstrativa)
Site estático (HTML, CSS e JavaScript). Pedido finalizado pelo WhatsApp, carrinho salvo no navegador.

## Rodar no VS Code
1. Abra a pasta no VS Code (Arquivo > Abrir Pasta).
2. Instale a extensão **Live Server** (Ritwick Dey).
3. Clique com o botão direito em `index.html` > **Open with Live Server**.

## Trocar os dados fictícios — `js/config.js`
- `CONFIG.whatsapp`: só dígitos, com país + DDD (ex.: `5581988887777`)
- `CONFIG.instagram`, `email`, `telefone`, `local`, `nome`
- `LISTA`: produtos, códigos e preços (não altere códigos existentes; novos: IM026, IM027…). `CATEGORIAS`: categorias.
- Fotos reais: salve em `assets/imagens/` e coloque o caminho como último item do produto/galeria (somente fotos autorizadas).
- Textos de "Quem Somos", depoimentos e perguntas frequentes: `index.html`.

## Publicar no GitHub Pages
```
git init
git add .
git commit -m "Site Doce Lembrança"
git branch -M main
git remote add origin https://github.com/SEU_USUARIO/doce-lembranca.git
git push -u origin main
```
No repositório: Settings > Pages > Source: *Deploy from a branch* > `main` / `(root)` > Save.
