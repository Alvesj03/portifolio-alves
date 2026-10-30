# Portfólio | João Vítor Alves

Site de portfólio de João Vítor Alves, desenvolvedor web em Lauro de Freitas (BA). Faço sites para pequenos negócios e atendo todo o Brasil a distância.

No ar: https://alvesj03.github.io/portifolio-alves/

## Trabalhos mostrados

| Projeto | Tipo | Repositório |
| --- | --- | --- |
| Regina Alves, moda praia e artesanato | Cliente real | [regina-alves-site](https://github.com/Alvesj03/regina-alves-site) |
| Navalha Rubra, barbearia | Projeto conceito | [site-barbearia](https://github.com/Alvesj03/site-barbearia) |
| Corredor Logística | Projeto conceito | [empresa-de-logistica-site](https://github.com/Alvesj03/empresa-de-logistica-site) |

## A ideia

A página tem uma base neutra e, ao rolar, veste as cores e a fonte de cada projeto enquanto ele está na tela: areia e terracota na Regina, preto e vermelho na Navalha, azul-marinho na Corredor. É o argumento do portfólio mostrado na prática: cada cliente com a sua cara.

## Técnicas

- **Troca de tema guiada pela rolagem.** Cada seção tem `data-theme`. Um `ScrollTrigger` por seção anima as variáveis CSS (`--bg`, `--ink`, `--accent`...) no `:root` com GSAP, e todos os componentes leem essas variáveis. A `theme-color` do navegador acompanha.
- **Prévia da página inteira.** A captura de cada site fica dentro de uma janela de navegador e rola no hover, no foco pelo teclado ou com a roda do mouse. No celular, a janela rola com o dedo.
- **Leque de capas** na abertura, com variáveis CSS por card (`--i`) e entrada animada por uma variável `--lift`.
- **Fontes auto-hospedadas:** Instrument Sans (com eixo de largura), Playball, Bodoni Moda e Archivo, recortadas para latim.
- **Acessibilidade:** link para pular ao conteúdo, foco visível, foco levado à seção depois da rolagem, textos alternativos nas capturas e `prefers-reduced-motion` respeitado.

## Estrutura

```
index.html
css/style.css
js/main.js
assets/
  img/      capturas dos sites (WebP)
  fonts/    fontes e licenças OFL
  vendor/   GSAP 3.15 (ScrollTrigger, ScrollToPlugin)
```

## Rodar localmente

```bash
python3 -m http.server 8000
```

Abra http://localhost:8000. O `main.js` é um ES module, então o site precisa de um servidor e não abre direto pelo arquivo.

## Atualizar as capturas

As imagens em `assets/img/` são capturas de tela de 1440 px de largura convertidas para WebP: `*-capa.webp` com 1280 × 800 e `*-pagina.webp` com a página inteira a 960 px de largura.

## Contato

WhatsApp: (71) 99127-5973
