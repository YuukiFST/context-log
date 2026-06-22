<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

<!-- BEGIN:writing-rules -->
# Writing Rules

## No Hallucinations or Speculation

- **Nunca adicione informações que o usuário não disse.** Se o usuário mencionou dados específicos (ex: "testes feitos com Haiku 4.5, Sonnet 4.6 e Opus 4.8"), não generalize, não adicione causas, motivos, ou interpretações que ele não forneceu.
- Se o usuário diz "os testes mostraram X", não adicione "porque Y" a menos que ele tenha dito Y.
- Ao organizar rascunhos, preserve o significado original. Organize estrutura, corrija gramática, mas não invente conteúdo novo.
- Se algo está ambíguo ou incompleto no rascunho do usuário, pergunte — não complete com suposições.
- Prefira perguntar a assumir. Sempre.
<!-- END:writing-rules -->
