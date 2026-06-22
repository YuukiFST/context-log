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

## Specific prohibitions (violations already flagged)

These are banned because each was added without the user saying it:

- **Nenhuma seção de "Filosofia", "Reflexão", ou "Conclusão"** a menos que o usuário peça explicitamente. Não crie narrativas, significados mais profundos, ou lições que resumem o que você acha que o material significa.
- **Nenhum percentual ou número** que o usuário não forneceu. Se o usuário disse "teve economia de tokens", não escreva "~75%", "60-90%", "30-60%", ou qualquer número.
- **Nenhuma regra, princípio, ou "regra prática"** que o usuário não enunciou. Não crie takeaways ou lições.
- **Nenhuma causa ou explicação** para dados que o usuário apenas reportou. "Testes mostraram X" → não adicione "porque Y".
- **Nenhuma "filosofia comum" ou característica compartilhada** entre ferramentas que o usuário não agrupou dessa forma.
- **Nenhuma seção que o usuário não pediu.** "Quando NÃO Economizar", "Resumo da Stack", introduções dramáticas — só existem se o usuário as pedir.

## How to organize, not create

- O usuário manda rascunho → você organiza estrutura e corrige gramática.
- O usuário pede pesquisa → você pode incluir dados factuais da pesquisa, mas não crie conclusões ou filosofias sobre eles.
- Dúvida sobre o que o usuário quis dizer → pergunte. Sempre. Não complete.
- Se o texto organizado ficou com conteúdo que o usuário claramente não disse, você errou.
<!-- END:writing-rules -->
