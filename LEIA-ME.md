# Site — Manual de Estruturação Organizacional

Site de divulgação e venda do Manual de Empresas, com a mesma identidade visual do
Centro Clínico Campolim e do site profissional: azul-marinho `#0b1f3a` + dourado
`#c9a227`, tipografia Cormorant Garamond + Inter.

## Arquivos

| Arquivo | O que é |
|---|---|
| `index.html` | Todo o conteúdo do site |
| `styles.css` | Estilos e paleta |
| `script.js` | Menu, abas, sanfonas, contadores, animações |
| `sitemap.xml` | Mapa do site para o Google |
| `llms.txt` | Resumo estruturado para buscadores de IA |
| `robots.txt` | Cópia local (o que vale é o da raiz — veja abaixo) |
| `imagens/` | Todas as imagens do site |
| `_para-a-raiz-do-dominio/` | **Não é do site.** Arquivo para outro repositório |

## Como ver no computador

Abra `index.html` com duplo clique. Funciona sem servidor.

## Como publicar no GitHub Pages

1. Crie um repositório com o nome **`manual-empresas`**.
2. Envie tudo, **menos** a pasta `_para-a-raiz-do-dominio`.
3. Em **Settings → Pages**, escolha a branch `main` e a pasta `/ (root)`.
4. O endereço fica `https://jsimaoneto.github.io/manual-empresas/`.

> ⚠️ **O nome do repositório precisa ser exatamente `manual-empresas`.** Esse endereço
> está gravado no `canonical`, no `sitemap.xml`, no `llms.txt` e nos metadados de
> compartilhamento. Se usar outro nome, me avise que eu troco em todos os arquivos
> de uma vez.

---

# SEO — o que já está feito

Mesma leva aplicada no site do psicólogo em agosto.

| Item | Situação |
|---|---|
| `<title>` com palavra-chave (56 caracteres) | ✅ |
| `meta description` (158 caracteres) | ✅ |
| `link rel="canonical"` | ✅ |
| `meta robots` com `max-image-preview:large` | ✅ |
| Open Graph + Twitter Card com URL absoluta | ✅ |
| Palavras-chave no primeiro parágrafo | ✅ |
| Schema.org: `ProfessionalService`, `Person`, `Service`, `WebSite` | ✅ |
| Schema.org: **`FAQPage`** com as 7 perguntas | ✅ |
| `sitemap.xml` com as imagens declaradas | ✅ |
| `llms.txt` para buscadores de IA | ✅ |
| Alt em todas as imagens de conteúdo | ✅ |

O `FAQPage` é o de maior retorno visível: é ele que faz as perguntas aparecerem
sanfonadas direto no resultado do Google, ocupando mais espaço na tela.

## SEO — os 2 passos que dependem de você

### 1. Acrescentar o sitemap ao `robots.txt` da raiz

Buscadores só leem o `robots.txt` da **raiz do domínio**. O que está nesta pasta é
ignorado pelo Google. Veja `_para-a-raiz-do-dominio/LEIA-ME.md` — é uma linha para
acrescentar no repositório `jsimaoneto.github.io`.

### 2. Enviar o sitemap no Search Console

A propriedade `jsimaoneto.github.io` já está verificada desde agosto. Em **Sitemaps**,
envie — **sem barra no início**:

```
manual-empresas/sitemap.xml
```

> Foi exatamente aqui que deu erro da última vez: com barra na frente, o Google busca
> na raiz do domínio e retorna 404.

---

## Contato e formulário ✅

- **Instagram:** [@j_simao_neto](https://www.instagram.com/j_simao_neto/), no rodapé e na seção de contato
- **Formulário:** envia pelo **WhatsApp**. Ao clicar em *Enviar pelo WhatsApp*, o site
  monta a mensagem com nome, empresa, telefone, número de colaboradores e a situação
  descrita, e abre a conversa já preenchida. A pessoa só confere e envia.

  Não depende de serviço externo nem de servidor, então funciona no GitHub Pages sem
  configuração. O texto da mensagem fica no fim do `script.js`, no bloco `contatoForm`.

---

## ⚠️ Um ponto que ainda merece atenção

A **capa** já foi trocada pela versão genérica ("Sua marca aqui"), então o cliente
não aparece mais na imagem principal.

Mas as **páginas internas** dos mockups continuam sendo páginas reais do manual da
Elite Car, e os cabeçalhos e rodapés ainda trazem o nome da empresa e a cidade:

| Imagem | Onde o nome aparece |
|---|---|
| `mk-leque.jpg` | rodapé das duas páginas atrás da capa |
| `mk-capa.jpg` | cabeçalho da página que espia atrás |
| `mk-missao-valores.jpg` | rodapé das duas páginas |
| `mk-cargos.jpg` | cabeçalho e rodapé das duas páginas |
| `mk-politicas.jpg` | cabeçalho e rodapé das duas páginas |

Não há dado pessoal de colaborador nem valor de salário nas páginas escolhidas.
Ainda assim, com o lightbox a pessoa consegue ampliar e ler. Se quiser, eu regero
essas quatro com o nome borrado ou trocado por um fictício — a estrutura, as tabelas
e a diagramação continuam aparecendo, que é o que vende.

---

# IMAGENS

Todas já estão instaladas. Nenhum prompt pendente.

## Artes do topo ✅

Cinco peças do seu material de divulgação, rodando no topo do site a cada 4,5
segundos, com bolinhas para navegar. São 1080×1080, vindas da pasta
`Desktop/Imagens`.

| Arquivo | Origem | O que mostra |
|---|---|---|
| `art-capa.jpg` | `instagram_01` | Capa do manual |
| `art-pilares.jpg` | `instagram_04` | Os quatro pilares |
| `art-transformacao.jpg` | `instagram_07` | Antes e depois |
| `art-cargos.jpg` | `instagram_08` | Lista de cargos descritos |
| `art-autoridade.jpg` | `instagram_05` | Assinatura e CRP |

A `art-capa.jpg` também virou a imagem de compartilhamento, no lugar do retrato.

**Sobraram 8 peças** na pasta do Desktop que ainda não entraram: `instagram_02`,
`03`, `06`, `09`, `10` e as três `resumo_*`. Elas conversam com seções que já
existem no site, então é só dizer onde quer cada uma.

---

## Mockups do manual ✅

Montados a partir das **páginas reais dos PDFs**, renderizadas em 200 dpi e compostas
sobre o fundo azul-marinho do site, com sombra e leve inclinação, como um manual impresso.

| Arquivo | O que mostra | Onde aparece |
|---|---|---|
| `mk-leque.jpg` | Três páginas em leque: capa, descrição de cargo e valores | Showcase, 1º |
| `mk-capa.jpg` | A capa sozinha, com uma página espiando atrás | Showcase, 2º |
| `mk-missao-valores.jpg` | Missão e visão + a tabela dos 8 valores | Showcase, 3º |
| `mk-cargos.jpg` | Descrição de cargo com CBO + checklist de rotina | Showcase, 4º |
| `mk-politicas.jpg` | Políticas internas, conduta e ética | Showcase, 5º |

A capa usada é a versão **"Sua marca aqui"**, que vende melhor do que a de um cliente:
quem olha imagina a própria marca ali.

**Para regerar com outras páginas:** os mockups saem de um script que renderiza o PDF
e compõe a arte. Me diga quais páginas quer no lugar e eu refaço.

**Para acrescentar um slide:** copie um `<figure class="showcase__img">` e o
`<figcaption class="showcase__cap" data-cap>` correspondente. A bolinha de navegação
extra é criada sozinha.

## Retrato e marca ✅

| Arquivo | O que é |
|---|---|
| `autor.jpg` | Seu retrato com a placa dourada (1080×1456), o mesmo do site josesimaoneto |
| `logo.png` | Logotipo do Centro Clínico Campolim (512×512, fundo transparente) |

A moldura do retrato foi travada em `aspect-ratio:1080/1456`, então o nome e o telefone
no rodapé da foto não são cortados em nenhuma tela. Se trocar por uma foto de outra
proporção, ajuste esse valor no `index.html`.

## Fotos do Centro Clínico Campolim ✅

Trazidas do site `ccc` e otimizadas (de 3,5 MB para 810 KB no total). Alimentam o
showcase da seção **"A empresa"**, que troca a cada 4,2 segundos.

`ccc-fachada.jpg` · `ccc-recepcao.jpg` · `ccc-espera.jpg` · `ccc-jardim.jpg`

## Opcional — imagem de compartilhamento

Hoje o link compartilhado no WhatsApp mostra o seu retrato. Funciona, mas é vertical,
e o WhatsApp corta. Se quiser uma arte horizontal dedicada, salve como
`imagens/cartao.jpg` (1536×1024) e troque as duas linhas `og:image` e `twitter:image`.

> Cartão de compartilhamento social, design gráfico limpo, fundo azul-marinho profundo
> com um leve brilho dourado radial no canto inferior direito. Ao centro, um manual
> corporativo encadernado em perspectiva, com capa azul-marinho e filete dourado.
> Espaço negativo generoso à esquerda. Estética elegante e minimalista, sem texto.
> Proporção 3:2, alta definição.

---

# Ampliar imagem

Clicar em qualquer imagem do site abre ela em tela cheia sobre um fundo escuro.
Vale para as artes do topo, os mockups do manual, as fotos do Centro Clínico e o retrato.

| Ação | Como |
|---|---|
| Abrir | Clique na imagem |
| Navegar | Setas na tela, teclas ← →, ou arrastar o dedo no celular |
| Ampliar mais | Clique de novo na imagem: ela vai ao tamanho real e dá para arrastar |
| Fechar | Botão X, tecla Esc, ou clique no fundo |

Quando a imagem faz parte de um carrossel, o lightbox mostra o contador
("3 de 5") e navega dentro daquele bloco. Ao fechar, o carrossel fica parado
na mesma imagem em que a pessoa estava.

O zoom foi pensado para o celular: uma página do manual em tela de 375px fica
com 339px de largura, pequena demais para ler as tabelas. Com um toque a mais
ela vai para o tamanho real e dá para arrastar e ler.

---

# Efeitos e animações

Mesmo motor do site josesimaoneto, sem biblioteca externa:

| Efeito | Como usar |
|---|---|
| Entrada ao rolar | `data-anim="fade-up"` (ou `fade-down`, `fade-left`, `fade-right`, `zoom-in`, `zoom-out`) |
| Entrada escalonada | `data-stagger="90"` no contêiner, em milissegundos entre um filho e outro |
| Parallax suave | `data-parallax="0.05"` no elemento |
| Contador animado | `data-count="30"` e, se quiser, `data-suffix="+"` |
| Troca de imagens | `data-showcase="4200"` no bloco, em milissegundos |

Também estão ativos: brilho dourado pulsante no topo, flutuação contínua da moldura,
ponto pulsante no selo, indicador "rolar" animado, barra de progresso de leitura e
cabeçalho que ganha sombra ao rolar.

Quem tiver **"reduzir movimento"** ligado no sistema vê o site inteiro sem animação,
tudo já revelado. É o comportamento correto de acessibilidade.

## Cache ao atualizar

O CSS e o JS são chamados com `?v=10`. Ao editar esses arquivos, **suba esse número**
(`?v=6`, `?v=7`…) nas duas linhas do `index.html`, senão o navegador de quem já visitou
continua servindo a versão antiga.
