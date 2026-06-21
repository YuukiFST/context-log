# context.log — Especificação do Projeto (SPEC)

## 1. Visão Geral

**Nome do projeto:** context.log
**Tipo:** Blog pessoal técnico, estático, hospedado gratuitamente
**Tema:** Inteligência Artificial — LLMs, modelos de fronteira (frontier models), modelos chineses, agentes de IA, benchmarks, custo vs. performance
**Idiomas:** Português (PT-BR, idioma principal de escrita) e Inglês (EN, gerado via tradução assistida por agente)
**Público estimado:** menos de 100 visitantes/mês inicialmente, podendo se aproximar de 1.000/mês
**Restrição principal:** custo de operação = R$ 0 (zero)

### Conceito central

O blog é estruturado visualmente como um ambiente de desenvolvimento (IDE) — inspirado em ferramentas como VSCode, Zed, Cursor e Claude Code. A navegação principal é uma sidebar no estilo "file explorer", onde categorias de conteúdo são representadas como pastas e cada post como um arquivo. **Onde normalmente ficaria código sendo editado, fica o post do blog.**

O projeto é dividido em três zonas visuais com propósitos distintos:

- **Chrome** — a "moldura" da IDE (title bar, activity bar, sidebar, tabs, breadcrumbs, status bar, minimap). Limpa e funcional, com transições simples — sem 3D/WebGL pesado.
- **Documento** — onde o post é renderizado. Tipografia serifada, fundo "papel", e é aqui que se concentram as animações e efeitos 3D mais elaborados. Em versões futuras, pode receber canvas WebGL por post para efeitos de shader (Seção 13).
- **Terminal** — painel inferior colapsável que simula um shell real, navegando pelo mesmo sistema de arquivos virtual da sidebar (categorias = pastas, posts = arquivos). Recebe seu próprio conjunto de efeitos elaborados (typewriter, glow, scanlines).

## 2. Stack Técnica

### Core

- **Framework:** Next.js (App Router), TypeScript strict
- **Estilização:** Tailwind CSS + shadcn/ui
- **Conteúdo:** arquivos MDX versionados no próprio repositório Git
- **Validação:** `zod` — validação de frontmatter MDX em build time; validação do input do formulário de newsletter antes do fetch para o provedor externo
- **Datas:** `date-fns` — formatação de datas de publicação e timestamps nos posts (tree-shakeable, funciona em RSC/SSG)
- **Estado compartilhado:** `zustand` — gerencia o estado de navegação do virtual FS compartilhado entre Sidebar e Terminal (caminho atual, estado open/collapsed do Terminal). Usado onde React Context seria insuficiente para múltiplos consumidores com updates frequentes

### Animação & 3D

- **3D/WebGL:** `@react-three/fiber` + `@react-three/drei`
  - MVP: cena hero da home (rota `/`), único canvas WebGL por página
  - Arquitetura planejada para extensão ao Documento de posts individuais em v2, habilitando shaders GLSL (distortions, black holes, pós-processamento) via `@react-three/postprocessing` e `shaderMaterial`
  - Regra mantida: máximo 1 canvas WebGL por página; nunca no Chrome
- **Animação de UI:** `motion` (Framer Motion) — reveals ao scroll, microinterações no Documento e no Terminal
- **Animação avançada/timelines:** GSAP + ScrollTrigger (gratuitos) — efeitos de terminal (typewriter), coreografias de scroll no Documento

### Infraestrutura

- **Hospedagem:** Vercel (plano gratuito / Hobby)
- **Domínio:** subdomínio gratuito do Vercel (ex: `context-log.vercel.app`)
- **Controle de versão:** GitHub (repositório público — necessário para comentários via giscus)

### Deliberadamente excluídas do MVP (e por quê)

- **oRPC / tRPC / react-query:** o blog não tem camada de API própria — conteúdo é MDX lido em build time via RSC/`generateStaticParams`; as únicas "APIs" (RSS feed, newsletter) são route handlers Next.js simples que não se beneficiam de RPC type-safe
- **TanStack Form / react-hook-form:** único formulário é o de newsletter (um campo de email) — `useState` + `fetch` é suficiente; form libraries são justificadas para formulários multi-step, arrays dinâmicos e validação condicional complexa
- **TanStack Table / react-table:** não há tabelas de dados interativas; benchmarks são exibidos como imagens no `BenchmarkCard`
- **recharts:** benchmarks em MVP são imagens; charts interativos são candidatos para v2 (Seção 13)
- **Vercel AI SDK:** a IA é ferramenta do autor (Claude Code) para criar/traduzir conteúdo; o site em si não tem IA em runtime
- **nuqs:** estado de URL no MVP é inteiramente path-based (idioma via pt.mdx/en.mdx, categorias e tags via `/[category]`/`/tags/[tag]`); candidato natural para v2 quando o command palette for implementado

> Todas as bibliotecas incluídas são open-source/MIT, sem custo de licença. Rodam no client-side ou em build time e não impactam o custo de hospedagem no Vercel.

## 3. Identidade Visual & Layout "IDE"

### 3.1 Conceito: Chrome, Documento e Terminal

- **Chrome** — title bar, activity bar, sidebar, tab bar, breadcrumbs, status bar, minimap. Tons neutros, tipografia sans-serif (UI) e monoespaçada (nomes de arquivo, badges). Transições simples (hover, expand/collapse) — sem 3D/WebGL.
- **Documento** — área onde o post é renderizado. Tipografia serifada (Garamond) e fundo "papel". Aqui vivem o hero 3D da home, o `CategoryIcon`, o tilt do `BenchmarkCard`, o "carimbo" do `VerdictBox` e os scroll reveals. Em versões futuras, pode hospedar canvas WebGL por post para efeitos de shader (black holes, distortions).
- **Terminal** — painel inferior colapsável, fundo preto, fonte monoespaçada. Simula um shell que opera sobre `/content` (categorias = pastas, posts = arquivos), sincronizado bidirecionalmente com a sidebar via zustand. Tem seus próprios efeitos: typewriter, cursor piscante, glow, scanlines sutis.

### 3.2 Paleta de cores

A paleta é definida via tokens (CSS custom properties), compartilhados entre Tailwind/shadcn.

#### Modo claro — derivada de `#E1DAC6`

Toda a paleta do modo claro é construída a partir do tom fornecido pelo usuário, variando apenas luminosidade/saturação dentro da mesma família quente — Chrome e Documento ficam coesos, como diferentes tons de papel sobre a mesma mesa.

| Token | Valor | Uso |
|---|---|---|
| `--bg-document` | `#E1DAC6` | Fundo da Área de Documento (fixo, fornecido pelo usuário) |
| `--bg-chrome` | `#EDE8DA` | Title bar, activity bar, sidebar, tab bar, breadcrumbs, status bar |
| `--bg-chrome-elevated` | `#D8CFB6` | Item ativo na sidebar, hover states, divisores |
| `--border` | `#CFC6AC` | Bordas entre painéis |
| `--text-document` | `#332D22` | Texto do corpo do post (sobre `--bg-document`) |
| `--text-chrome` | `#4A4233` | Texto/labels do Chrome |
| `--text-muted` | `#8A8066` | Texto secundário (timestamps, breadcrumbs inativos) |
| `--accent` | `#B5652B` (terracota) | Links, item ativo, badges, ícones de destaque |

#### Modo escuro — preto

| Token | Valor | Uso |
|---|---|---|
| `--bg-document` | `#000000` | Fundo da Área de Documento e do Terminal |
| `--bg-chrome` | `#0A0A0A` | Title bar, activity bar, sidebar, tab bar, breadcrumbs, status bar |
| `--bg-chrome-elevated` | `#1A1A1A` | Item ativo na sidebar, hover states |
| `--border` | `#262626` | Bordas entre painéis |
| `--text-document` | `#E8DFD0` | Texto do corpo do post — creme quente sobre preto; o "calor" do Garamond passa a vir do texto, não do fundo |
| `--text-chrome` | `#D4D4D4` | Texto/labels do Chrome |
| `--text-muted` | `#737373` | Texto secundário |
| `--accent` | `#D9854A` | Links, item ativo, badges, glow do Terminal — terracota mais claro, para contraste sobre preto |

> `#E1DAC6` e a tipografia `EB Garamond`/`Adobe Garamond Pro`/serif no Documento (modo claro) são fixos. Os demais valores são pontos de partida ajustáveis na prototipagem — a relação entre os tokens (ex: `--bg-chrome-elevated` mais escuro/saturado que `--bg-chrome`) deve ser preservada para manter a hierarquia visual.

#### Terminal — tokens dedicados, sempre escuro

O Terminal (Seção 8.5) tem tokens próprios, fixos em qualquer tema (claro/escuro) do site:

| Token | Valor | Uso |
|---|---|---|
| `--terminal-bg` | `#000000` | Fundo do painel de terminal |
| `--terminal-fg` | `#E8DFD0` | Texto padrão / saída de comandos (`.output`) |
| `--terminal-accent` | `#D9854A` | Prompt, caminho atual, diretórios (`.dir`), argumentos destacados (`.highlight`), cursor |
| `--terminal-dim` | `#8A7A6A` | Texto secundário (ex: linha de versão, `.dim`) |

> Importante: `--terminal-bg` **não** deve reutilizar `--accent`/`--terminal-accent` (essa é a cor do texto/glow, não do fundo). O fundo é sempre `#000000`.

### 3.3 Tipografia

- **Chrome (UI da IDE):** sans-serif (ex: Inter) para labels, menus, breadcrumbs, status bar; monoespaçada (ex: JetBrains Mono) para nomes de arquivo, badges, blocos de código e o bloco de frontmatter
- **Documento (corpo do post):** `font-family: "EB Garamond", "Adobe Garamond Pro", serif;` — título, headings e parágrafos do conteúdo renderizado
- **Terminal:** monoespaçada (JetBrains Mono), mesma fonte usada no Chrome

### 3.4 Anatomia completa do layout

Do topo para a base, da esquerda para a direita.

#### 1. Title Bar
- Barra superior, largura total, ~40px de altura, estilo Chrome
- Esquerda: três círculos decorativos (vermelho/amarelo/verde, estilo macOS)
- Centro-esquerda: "título da janela" — `context.log — {arquivo atual}`
- Direita: campo de busca estilizado como command palette (ícone de lupa + placeholder "Buscar por tag... ⌘K"); no MVP, navega para `/tags`
- Transições simples (hover/focus)

#### 2. Activity Bar
- Faixa vertical estreita (~48px), à esquerda, abaixo da title bar
- Ícones no topo: **Explorer** (pastas, ativo por padrão), **Tags** (leva para `/tags`), **Sobre** (leva para o README)
- Ícones no rodapé: tema (sol/lua), idioma (PT/EN), GitHub, RSS
- Item ativo destacado com barra lateral na cor de destaque

#### 3. Sidebar (Explorer)
- À direita da activity bar, largura ~260px
- Árvore de arquivos: categorias = pastas expansíveis/colapsáveis; posts = itens de arquivo (um item por post, sem duplicar PT/EN)
- Expand/collapse animado de forma simples (height transition); indicador do item ativo
- **Sincronizada com o Terminal via zustand:** navegar aqui atualiza o `cd` do terminal, e vice-versa (Seção 8.5)

#### 4. Tab Bar
- Topo da área de conteúdo principal (à direita da sidebar)
- Uma única aba: ícone de arquivo + nome do arquivo atual (ex: `📄 README.md`)
- **Tokens:** fundo da barra = `--bg-chrome`; a aba ativa usa `--bg-chrome-elevated` para se destacar do restante da barra (que permanece em `--bg-chrome`)

#### 5. Breadcrumbs
- Logo abaixo da tab bar
- Caminho completo do arquivo, ex: `context-log › frontier-models › comparando-gpt5-vs-claude-opus › pt.mdx`
- Cada segmento clicável

#### 6. Área de Documento (conteúdo do post)
- Corpo principal, abaixo das breadcrumbs — fundo conforme Seção 3.2
- Estrutura interna, de cima para baixo:
  a. **Bloco de Frontmatter** — recolhido por padrão, estilizado como bloco YAML; anima como "desdobrar" ao expandir
  b. **CategoryIcon** — ícone 3D rotativo representando a categoria do post (Seção 8.3)
  c. **Conteúdo renderizado** — título, headings e parágrafos em Garamond; fade+slide ao entrar na viewport (escalonado)
  d. **Componentes especiais** (`BenchmarkCard`, `VerdictBox` — Seção 8) — com seus efeitos 3D/animados
- Toggle de idioma PT/EN no canto superior, integrado à tab bar

#### 7. Painel de Terminal
- Painel inferior, colapsável, ocupando a largura da área de conteúdo (entre a Sidebar e a borda direita), posicionado entre a Área de Documento e a Status Bar
- Toggle via botão na Status Bar (ex: `[ ⌨ Terminal ]`)
- Estado open/collapsed gerenciado via zustand (compartilhado com o botão da Status Bar)
- Detalhes completos na Seção 8.5

#### 8. Status Bar
- Rodapé, largura total, ~24px de altura
- Conteúdo: `⎇ {categoria}` (estilo branch git), `{idioma} · Markdown`, tempo de leitura estimado, progresso de leitura (%), botão de toggle do Terminal
- Barra de progresso de leitura com transição simples

### 3.5 Adaptação para Mobile

- Activity Bar + Sidebar colapsam num único drawer/menu deslizante
- Tab bar + Breadcrumbs colapsam numa única linha mostrando apenas o nome do arquivo atual
- Terminal abre em tela cheia (overlay) quando ativado, com botão de fechar
- Minimap é ocultado
- Status bar permanece, em versão condensada

### 3.6 Animação, 3D & Efeitos

#### Estratégia técnica

- **WebGL/Three.js (`@react-three/fiber` + `drei`)** — MVP: cena 3D do hero na rota `/` (home). Arquitetura planejada para extensão ao Documento de posts individuais em v2, habilitando shaders GLSL (distortions, black holes, pós-processamento) via `@react-three/postprocessing` e `shaderMaterial`. Regra mantida: máximo 1 canvas WebGL por página; nunca no Chrome.
- **CSS 3D transforms + `motion` + GSAP** — usados de forma pervasiva **dentro do Documento** (todas as páginas de post) e **dentro do Terminal**
- **Chrome** — apenas transições simples (CSS/`motion` básico): sem 3D, sem WebGL

#### Catálogo de efeitos

| Zona | Elemento | Efeito | Tecnologia |
|---|---|---|---|
| Documento (home) | Hero | Cena 3D interativa (rede neural / tokens flutuantes), responde ao mouse | R3F + drei, lazy-loaded |
| Documento (todas) | `CategoryIcon` | Forma geométrica 3D em rotação contínua, uma por categoria | CSS 3D transform |
| Documento (todas) | `BenchmarkCard` | Tilt 3D no hover seguindo o mouse; eleva com sombra dinâmica; zoom transition no lightbox | CSS 3D + `motion` |
| Documento (todas) | `VerdictBox` | Selo/ícone (✓/⚠/✕) com efeito de "carimbo" 3D ao entrar na viewport | CSS 3D + `motion` |
| Documento (todas) | Headings/Parágrafos | Fade+slide escalonado ao entrar na viewport | `motion` (`whileInView`) |
| Documento (todas) | Lightbox | Zoom transition do card para tela cheia, backdrop com blur animado | `<dialog>` + `::backdrop` + `@starting-style` |
| Terminal | Saída de comandos | Efeito de "digitação" (typewriter) | GSAP/CSS |
| Terminal | Cursor | Piscante | CSS |
| Terminal | Texto | Glow/efeito phosphor na cor de destaque | CSS |
| Terminal | Tela | Scanlines CRT sutis | CSS |
| Chrome (todos) | Sidebar, tabs, breadcrumbs etc. | Transições simples de hover/expand — sem 3D/WebGL | CSS/`motion` básico |

#### Acessibilidade & performance

- Todas as animações respeitam `prefers-reduced-motion: reduce` — a cena hero é substituída por uma imagem estática/gradiente, e os efeitos do terminal (typewriter, scanlines) são desativados (texto aparece instantaneamente)
- A cena R3F é carregada via `next/dynamic` (`ssr: false`) e montada apenas quando está na viewport
- No máximo 1 canvas WebGL por página (a cena hero, presente apenas em `/`)

## 4. Arquitetura de Conteúdo

### 4.1 Taxonomia

Sistema de duas camadas:

- **Categorias** = pastas reais no projeto; cada post pertence a exatamente uma categoria (a pasta onde ele está)
- **Tags** = metadados no frontmatter; um post pode ter múltiplas tags, usadas para filtros cruzados entre categorias

Categorias sugeridas para o lançamento (ajustáveis — basta criar/renomear pastas e atualizar `lib/categories.ts`), cada uma associada a uma forma geométrica para o `CategoryIcon`:

- `frontier-models` — Frontier Models — icosaedro
- `chinese-models` — Modelos Chineses — toro
- `benchmarks` — Benchmarks — octaedro
- `cost-performance` — Custo & Performance — dodecaedro
- `tools-agents` — Ferramentas & Agentes — cubo

### 4.2 Estrutura de pastas de conteúdo

```
/content
  README.pt.mdx
  README.en.mdx
  /frontier-models/
    /comparando-gpt5-vs-claude-opus/
      pt.mdx
      en.mdx
      images/
        benchmark-mmlu.png
  /chinese-models/
    /deepseek-v4-vale-a-pena/
      pt.mdx
      en.mdx
      images/
  /benchmarks/
  /cost-performance/
  /tools-agents/
```

Cada post é representado por uma **pasta** (nomeada com o slug do post), contendo:

- `pt.mdx` — conteúdo em português (escrito pelo autor)
- `en.mdx` — conteúdo em inglês (gerado pelo agente via tradução)
- `images/` — imagens usadas no post (ex: prints de benchmarks)

### 4.3 Frontmatter

```yaml
---
title: "Comparando GPT-5 vs Claude Opus em tarefas de código"
excerpt: "Um comparativo prático entre os dois modelos em cenários reais de desenvolvimento."
date: "2026-06-12"
tags: ["gpt-5", "claude", "code-generation"]
---
```

- `title` e `excerpt` são específicos de cada arquivo de idioma (cada `pt.mdx`/`en.mdx` tem sua própria versão)
- `date` e `tags` são compartilhados entre as duas versões
- O frontmatter é validado via `zod` em build time para garantir tipos corretos
- Esse frontmatter é exibido no "Bloco de Frontmatter" descrito na Seção 3.4
- Tempo de leitura é calculado automaticamente a partir do conteúdo (não precisa estar no frontmatter)

### 4.4 Sistema de arquivos virtual (`lib/virtual-fs.ts`)

Uma camada de abstração sobre `/content` que expõe operações de "sistema de arquivos" (listar diretório, resolver caminho, verificar existência). É consumida por:

- **Sidebar** (Seção 5) — renderiza a árvore completa
- **Terminal** (Seção 8.5) — executa `ls`, `cd`, `cat`, `pwd` contra essa mesma estrutura
- **Páginas de categoria** (`/{categoria}`) — listam os posts daquela pasta

O estado de navegação atual (caminho, posição no virtual FS) é gerenciado pelo store zustand e consumido por ambos os componentes — garante que sidebar e terminal nunca fiquem fora de sincronia.

### 4.5 Fluxo de criação de conteúdo

1. O usuário descreve o novo post para o agente (tema, categoria, conteúdo) durante uma conversa no chat
2. O agente cria a pasta `/content/{categoria}/{slug}/` e escreve `pt.mdx` com o conteúdo fornecido
3. O agente gera `en.mdx` traduzindo o conteúdo de `pt.mdx`
4. Imagens de benchmark fornecidas pelo usuário são salvas em `images/` dentro da pasta do post
5. O agente faz commit e push — o Vercel faz o deploy automaticamente

## 5. Navegação

### 5.1 Sidebar (Explorer)

- A sidebar exibe uma árvore de arquivos: cada categoria é uma pasta expansível/colapsável, e cada post dentro dela é um item de arquivo
- O estado de expansão das pastas é persistido em localStorage (entre visitas)
- O estado de navegação atual (item ativo, caminho) é lido do store zustand
- Cada post aparece **uma única vez** na árvore (não há entradas duplicadas para PT/EN)

### 5.2 Páginas de categoria (`/{categoria}`)

- Listagem estilizada dos posts daquela categoria, renderizada na Área de Documento como uma "listagem de diretório" (nome do post, excerpt, data via `date-fns`, tags)
- Destino do comando `cd <categoria>` no Terminal

### 5.3 Página de tags (`/tags/[tag]`)

- Listagem simples de todos os posts, de qualquer categoria, que possuem a tag em questão
- Cada tag exibida em um post é um link para essa página; o ícone "Tags" da Activity Bar também leva para lá

### 5.4 Terminal

- Navegação alternativa via comandos de shell, sincronizada com a sidebar via zustand (Seção 8.5)

## 6. Homepage (`README.md`)

- Rota: `/`
- A área de Documento exibe automaticamente o `README.{idioma}.mdx`, como se fosse o arquivo aberto por padrão ao "abrir o projeto"
- A Tab Bar mostra `📄 README.md` e a Title Bar mostra `context.log — README.md`
- No topo do Documento, a **cena 3D hero** (Seção 3.6) substitui/precede o `CategoryIcon` — única ocorrência de WebGL no site no MVP
- Conteúdo esperado (a ser escrito futuramente pelo autor): apresentação pessoal, o que o blog cobre, e possivelmente links para redes sociais/GitHub
- Possui o mesmo toggle de idioma PT/EN dos posts

## 7. Página de Post

- Rota: `/{categoria}/{slug}`
- Layout completo: Title Bar, Activity Bar, Sidebar (item ativo destacado), Tab Bar (`📄 {slug}.{idioma}.mdx`), Breadcrumbs, Área de Documento (Frontmatter + CategoryIcon + conteúdo em Garamond com reveals + componentes especiais), Terminal (colapsado por padrão), Status Bar
- O toggle de idioma troca entre `pt.mdx` e `en.mdx` do mesmo post, preservando a posição de leitura quando possível
- Rodapé do conteúdo: seção de comentários (giscus)

## 8. Componentes Customizados

### 8.1 `BenchmarkCard`

Exibe uma imagem de benchmark ao lado do comentário do autor sobre ela.

```mdx
<BenchmarkCard image="./images/benchmark-mmlu.png" alt="Resultado MMLU">
  O DeepSeek ficou surpreendentemente próximo do GPT-5 nesse benchmark,
  considerando a diferença de custo entre os dois...
</BenchmarkCard>
```

- **Desktop:** imagem e texto lado a lado (proporção ~50/50, ajustável)
- **Mobile:** imagem em cima, texto embaixo — usar *container queries* (Modern Web Guidance) para decidir o layout com base no espaço disponível
- Tilt 3D no hover (a imagem "acompanha" o mouse com `perspective`/`rotateX`/`rotateY`); o card inteiro "eleva" com sombra dinâmica
- Clique na imagem abre o **lightbox** com zoom transition (Seção 8.4)

### 8.2 `VerdictBox`

Caixa de destaque com o veredito final do autor sobre o assunto do post, no estilo "resultado de teste" de uma IDE/CI.

```mdx
<VerdictBox verdict="positive">
  Vale a pena para quem já usa o ecossistema X — o ganho de performance
  compensa a curva de aprendizado.
</VerdictBox>
```

- `verdict`: `"positive" | "mixed" | "negative"` — define ícone (✓ / ⚠ / ✕) e cor de destaque (verde / amarelo / vermelho)
- Rótulos exibidos (ex: "Recomendo" / "Com ressalvas" / "Não recomendo") variam conforme o idioma ativo (PT/EN)
- O ícone de veredito entra com efeito de "carimbo" 3D (escala + rotação leve) ao entrar na viewport

### 8.3 `CategoryIcon`

Ícone 3D decorativo no topo de cada post, representando sua categoria através de uma forma geométrica em rotação contínua e suave.

- Mapeamento categoria → forma, conforme Seção 4.1 (icosaedro, toro, octaedro, dodecaedro, cubo)
- Implementado via CSS 3D transforms (`transform-style: preserve-3d`, `@keyframes` de rotação) — leve, sem WebGL
- Rotação contínua lenta; pode reagir sutilmente ao hover (acelera/inclina)

### 8.4 Lightbox de imagens

- Implementado com o elemento nativo `<dialog>` (top layer), conforme os guias do Modern Web Guidance `light-dismiss-a-dialog` e `animate-to-from-top-layer`
- Fecha ao clicar fora, pressionar Esc, ou em um botão de fechar
- Transição de zoom do card para tela cheia; backdrop com blur animado via `::backdrop` e `@starting-style`

### 8.5 `Terminal`

Painel inferior colapsável que simula um shell operando sobre o sistema de arquivos virtual do blog (Seção 4.4) — uma navegação alternativa às Categorias/Tags, totalmente sincronizada com a sidebar via zustand.

**Ativação:** botão na Status Bar (ex: `[ ⌨ Terminal ]`)

**Prompt:** `context-log:{caminho-atual} $`

**Comandos suportados (MVP):**

| Comando | Comportamento |
|---|---|
| `ls` | Lista o conteúdo do diretório atual. Na raiz: lista as categorias (como pastas, com `/`). Dentro de uma categoria: lista os posts (como arquivos, ex: `comparando-gpt5-vs-claude-opus.mdx`) |
| `cd <categoria>` | Entra na pasta da categoria, atualiza o prompt e navega para `/{categoria}` (Seção 5.2) |
| `cd ..` / `cd /` | Volta para a raiz |
| `cat <slug>` / `open <slug>` | Abre o post correspondente na Área de Documento (`/{categoria}/{slug}`) |
| `pwd` | Mostra o caminho atual |
| `clear` | Limpa a tela do terminal |
| `help` | Lista os comandos disponíveis |

**Erros:** comandos, categorias ou posts inexistentes retornam mensagens estilo bash, ex: `cd: no such file or directory: foo`

**Sincronização via zustand:** navegar pela sidebar atualiza o `cd` do terminal (e o prompt); usar `cd`/`cat`/`open` no terminal navega a página e expande/destaca o item correspondente na sidebar — ambos consomem e atualizam o mesmo store, que por sua vez espelha `lib/virtual-fs.ts`

**Estilo & animação:**
- Cores via tokens dedicados (`--terminal-bg`, `--terminal-fg`, `--terminal-accent`, `--terminal-dim` — Seção 3.2), fixos independente do tema claro/escuro do site
- Fonte monoespaçada (JetBrains Mono); `--terminal-fg` para saída geral (`.output`), `--terminal-accent` para prompt/caminho/diretórios (`.dir`)/destaques (`.highlight`)/cursor, `--terminal-dim` para texto secundário (`.dim`)
- Texto em `--terminal-accent` com leve glow/efeito phosphor
- Cursor piscante
- Saída de comandos com efeito de "digitação" (typewriter)
- Scanlines CRT sutis, desativadas com `prefers-reduced-motion`

## 9. Funcionalidades Extras (MVP)

### 9.1 RSS

- Duas rotas de feed: `/feed/pt.xml` e `/feed/en.xml`, geradas a partir dos posts em cada idioma
- Cada item do feed: título, link, data de publicação (formatada via `date-fns`), resumo (excerpt), categoria

### 9.2 Analytics

- `@vercel/analytics`, adicionado ao layout raiz — sem configuração adicional, gratuito no plano Hobby

### 9.3 Comentários (giscus)

- Repositório GitHub público com Discussions habilitado
- Componente giscus embutido no rodapé de cada post
- Mapeamento de discussão por slug + idioma, para que comentários em PT e EN não se misturem

### 9.4 Newsletter

- Formulário simples de inscrição por e-mail (ex: na sidebar ou no README)
- Input de email com validação via `zod` antes do `fetch` para a API do provedor
- Provedor com camada gratuita a ser escolhido na implementação (ex: Buttondown ou equivalente) — confirmar limites do plano gratuito no momento da implementação
- Sem biblioteca de formulários (campo único — `useState` + `fetch` é suficiente)

## 10. SEO & Internacionalização

- Metadados (`title`, `description`, Open Graph) por página via Next.js Metadata API
- Tags `hreflang` ligando as versões PT/EN de cada post entre si
- Imagens Open Graph geradas dinamicamente via `@vercel/og` (gratuito no plano Hobby), com título do post + marca "context.log"
- `sitemap.xml` gerado automaticamente a partir do conteúdo

## 11. Deploy

- Repositório no GitHub conectado ao Vercel
- Deploy automático a cada push na branch principal; preview deployments para outras branches/PRs
- Nenhuma variável de ambiente obrigatória para o MVP, exceto eventual chave de API do provedor de newsletter (armazenada como variável de ambiente no Vercel, gratuito)

## 12. Modern Web Guidance

Este projeto deve ser desenvolvido com o Modern Web Guidance instalado para o agente de codificação (recomendado: Claude Code):

```
/plugin marketplace add GoogleChrome/modern-web-guidance
/plugin install modern-web-guidance@googlechrome
/reload-plugins
```

- **Baseline target:** Baseline Widely available (adicionar essa linha ao `CLAUDE.md` do projeto)
- Guias especialmente relevantes para este projeto:
  - `light-dismiss-a-dialog` e `animate-to-from-top-layer` — para o lightbox do `BenchmarkCard`
  - View Transitions — para a transição entre "arquivos" (navegação entre posts)
  - Container queries — para o layout responsivo do `BenchmarkCard`, da sidebar e da adaptação mobile (Seção 3.5)
  - Guia de acessibilidade — `prefers-reduced-motion`, navegação por teclado no terminal, na sidebar/explorer e na activity bar
  - `oklch`/cores modernas — para a paleta de cores do tema (Seção 3.2)

## 13. Roadmap (v2 — fora do MVP)

- **Shaders GLSL por post:** canvas WebGL no Documento de posts individuais habilitando efeitos de shader — black holes que distorcem o conteúdo, chromatic aberration, lens distortion, warp effects — via `@react-three/postprocessing` e `shaderMaterial` do drei. Mantém a regra de máximo 1 canvas por página.
- **recharts para charts interativos:** substituir imagens estáticas de benchmark por gráficos interativos (curvas de performance ao longo do tempo, comparativos de custo) diretamente nos posts MDX via componente customizado
- **nuqs:** URL state para o command palette completo (⌘K) — busca fuzzy por posts/tags como search param na URL
- Terminal: autocompletar (Tab) para nomes de categorias/posts, histórico de comandos (↑/↓), comandos extras (`grep`/`find` por tag)
- Command palette completo (⌘K): busca fuzzy por posts/tags, abre como overlay sobre toda a UI
- Múltiplas abas / histórico de "arquivos abertos" na sessão (evolução da Tab Bar única)
- Sidebar redimensionável (drag to resize)
- "Modo leve" (toggle explícito de performance, além do automático via `prefers-reduced-motion`)
- Domínio próprio (atualmente fora do orçamento de custo zero)

## 14. Fora de Escopo (v1)

- CMS ou painel administrativo (conteúdo é versionado em Git e editado via agente de IA)
- Contas de usuário / login
- Banco de dados / backend próprio
- Qualquer serviço pago
- oRPC / tRPC / react-query (sem camada de API que justifique RPC type-safe)
- Bibliotecas de formulários (react-hook-form, TanStack Form) — formulário de newsletter usa useState + fetch
- Bibliotecas de tabelas (react-table, TanStack Table) — sem tabelas de dados interativas
- Vercel AI SDK — IA é ferramenta do autor, não funcionalidade runtime do site

## Anexo — Estrutura de pastas do projeto (código)

```
context-log/
├── app/
│   ├── page.tsx                 # Homepage (README)
│   ├── layout.tsx
│   ├── [category]/
│   │   ├── page.tsx             # Listagem da categoria (Seção 5.2)
│   │   └── [slug]/
│   │       └── page.tsx         # Página de post
│   ├── tags/
│   │   └── [tag]/
│   │       └── page.tsx         # Listagem por tag
│   └── feed/
│       ├── pt.xml/route.ts
│       └── en.xml/route.ts
├── components/
│   ├── shell/                    # "Chrome" da IDE
│   │   ├── title-bar.tsx
│   │   ├── activity-bar.tsx
│   │   ├── sidebar.tsx
│   │   ├── tab-bar.tsx
│   │   ├── breadcrumbs.tsx
│   │   ├── minimap.tsx
│   │   ├── status-bar.tsx
│   │   └── terminal.tsx          # Painel de terminal (Seção 8.5)
│   ├── document/                 # Área de "Documento"
│   │   ├── frontmatter-block.tsx
│   │   ├── benchmark-card.tsx
│   │   ├── verdict-box.tsx
│   │   ├── category-icon.tsx
│   │   └── lightbox.tsx
│   ├── three/
│   │   └── hero-scene.tsx        # Cena WebGL da home (MVP); base para shaders por post em v2
│   └── ui/                       # componentes shadcn/ui
├── content/
│   ├── README.pt.mdx
│   ├── README.en.mdx
│   ├── frontier-models/
│   ├── chinese-models/
│   ├── benchmarks/
│   ├── cost-performance/
│   └── tools-agents/
├── lib/
│   ├── content.ts                 # leitura/parse de MDX
│   ├── virtual-fs.ts              # abstração de "sistema de arquivos" (Seção 4.4)
│   ├── categories.ts              # labels, ordem e forma 3D das categorias (PT/EN)
│   ├── motion-variants.ts         # variantes reutilizáveis de animação
│   ├── schemas.ts                 # schemas zod (frontmatter, newsletter input)
│   └── store.ts                   # store zustand (navegação virtual FS, estado do terminal)
├── public/
├── CLAUDE.md                       # instruções para o agente, incl. Baseline target
└── package.json
```
