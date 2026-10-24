# Achados e Perdidos - UNINASSAU (Front-end)

Este é o protótipo front-end do sistema de Achados e Perdidos da UNINASSAU.

## Como rodar o projeto
1. Tenha o Node.js (versão 20+) instalado.
2. Clone o repositório.
3. No terminal, rode: `npm install`
4. Após instalar, rode: `npm run dev`
5. Acesse http://localhost:5173 no navegador.

## Credenciais de Teste (Mock)
* O token enviado por e-mail é sempre: `123456`
* **Admin:** admin@uninassau.edu.br / Senha: 123456
* **Porteiro:** porteiro@uninassau.edu.br / Senha: 123456
* **Aluno:** use a opção "Primeiro Acesso" com qualquer e-mail terminado em `@uninassau.edu.br`.

## Nota para o time de Back-end
Todos os dados são mockados e salvos no `LocalStorage`. A estrutura de dados esperada pela API está definida em `src/types/index.ts`.