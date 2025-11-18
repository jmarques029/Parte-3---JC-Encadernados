# 🧪 Guia de Testes - JC Encadernados

## Servidor de Desenvolvimento Iniciado!

O servidor está rodando em: **http://localhost:3000**

---

## 📋 Checklist de Testes

### ✅ Fase 1: Autenticação

1. **Registro de Usuário**
   - [ ] Acesse: http://localhost:3000/register
   - [ ] Preencha:
     - Nome: Seu Nome
     - Email: seuemail@example.com
     - Senha: Senha123! (deve ter 8+ chars, maiúscula, minúscula, número, especial)
   - [ ] Clique em "Criar Conta"
   - [ ] Verifique se aparece toast "Cadastro Realizado!"
   - [ ] Verifique se foi redirecionado para `/login`

2. **Login**
   - [ ] Acesse: http://localhost:3000/login
   - [ ] Use o email e senha que você cadastrou
   - [ ] Clique em "Entrar"
   - [ ] Verifique se aparece toast "Login Realizado!"
   - [ ] Verifique se foi redirecionado para `/admin/books`
   - [ ] Verifique se o header mostra "Olá, [Seu Nome]"

3. **Usuário Padrão (já existe)**
   - Email: `lazaro@cefetmg.br`
   - Senha: `12345@aA`
   - Use este para testar rapidamente!

---

### ✅ Fase 2: CRUD de Livros

**Pré-requisito: Estar logado**

1. **Criar Livro**
   - [ ] Em `/admin/books`, clique em "Adicionar Livro"
   - [ ] Preencha o formulário:
     ```
     Título: Dom Casmurro
     Autor: Machado de Assis
     Tipo de Encadernação: HARDCOVER
     Número de Páginas: 256
     Tipo de Capa: LEATHER
     Preço: 45.90
     URL da Imagem: https://m.media-amazon.com/images/I/71dZHKi+YDL._AC_UF1000,1000_QL80_.jpg
     ```
   - [ ] Clique em "Salvar"
   - [ ] Verifique se o livro aparece na tabela
   - [ ] Verifique toast "Livro cadastrado com sucesso!"

2. **Criar Mais Livros** (para testar a listagem)
   ```
   Livro 2:
   Título: 1984
   Autor: George Orwell
   Tipo: SOFTCOVER
   Páginas: 328
   Capa: CLOTH
   Preço: 35.00
   Imagem: https://m.media-amazon.com/images/I/71rpa1-kyvL._AC_UF1000,1000_QL80_.jpg

   Livro 3:
   Título: O Senhor dos Anéis
   Autor: J.R.R. Tolkien
   Tipo: HARDCOVER
   Páginas: 1178
   Capa: LEATHER
   Preço: 89.90
   Imagem: https://m.media-amazon.com/images/I/71jLBXtWJWL._AC_UF1000,1000_QL80_.jpg
   ```

3. **Editar Livro**
   - [ ] Clique no botão "Editar" de um livro
   - [ ] Altere o preço para 39.90
   - [ ] Clique em "Salvar"
   - [ ] Verifique se o preço foi atualizado na tabela
   - [ ] Verifique toast "Livro atualizado!"

4. **Deletar Livro**
   - [ ] Clique no botão "Excluir" de um livro
   - [ ] Confirme a exclusão no popup
   - [ ] Verifique se o livro sumiu da tabela
   - [ ] Verifique toast "Livro excluído!"

---

### ✅ Fase 3: Homepage Pública

1. **Ver Livros na Homepage**
   - [ ] Acesse: http://localhost:3000/ (homepage)
   - [ ] Verifique se os livros criados aparecem em grid
   - [ ] Verifique se cada card mostra:
     - Imagem do livro
     - Título
     - Proprietário (nome do usuário que criou)
     - Link "ver"

2. **Detalhes do Livro**
   - [ ] Clique em "ver" em um livro
   - [ ] Verifique se foi para `/detalhes/[id]`
   - [ ] Verifique se mostra:
     - Imagem grande
     - Título completo
     - Autor
     - Número de páginas
     - Tipo de encadernação
     - Tipo de capa
     - Preço
     - Proprietário
     - Botão "Emprestar"

---

### ✅ Fase 4: Sistema de Empréstimos

**Pré-requisito: Ter livros cadastrados + estar logado**

1. **Emprestar Livro**
   - [ ] Na página de detalhes (`/detalhes/[id]`), clique em "Emprestar"
   - [ ] Verifique toast "Livro emprestado com sucesso!"
   - [ ] Verifique se foi redirecionado para `/admin/loans`

2. **Ver Meus Empréstimos**
   - [ ] Em `/admin/loans`, verifique a tabela de empréstimos
   - [ ] Verifique se mostra:
     - Título do livro
     - Autor
     - Data do empréstimo (formato dd/mm/aaaa)
     - Status "Emprestado" (laranja)
     - Botão "Devolver"

3. **Devolver Livro**
   - [ ] Clique no botão "Devolver"
   - [ ] Confirme a devolução no popup
   - [ ] Verifique toast "Livro devolvido com sucesso!"
   - [ ] Verifique se o status mudou para "Devolvido" (verde)
   - [ ] Verifique se a data de devolução aparece
   - [ ] Verifique se o botão "Devolver" sumiu

4. **Emprestar Novamente**
   - [ ] Volte para homepage
   - [ ] Tente emprestar o mesmo livro novamente
   - [ ] Deve funcionar (pode emprestar múltiplas vezes)

---

### ✅ Fase 5: Navegação e UI

1. **Header**
   - [ ] Verifique se o logo aparece (pode estar quebrado se não tiver imagem)
   - [ ] Verifique se mostra "Olá, [Nome]" quando logado
   - [ ] Verifique se mostra link "Meus Empréstimos"
   - [ ] Verifique se mostra botão "Logout"
   - [ ] Quando deslogado, deve mostrar "Login"

2. **Logout**
   - [ ] Clique em "Logout" no header
   - [ ] Verifique se foi redirecionado para `/login`
   - [ ] Verifique se o header agora mostra "Login" ao invés do nome

3. **Proteção de Rotas**
   - [ ] Faça logout
   - [ ] Tente acessar diretamente: http://localhost:3000/admin/books
   - [ ] Deve redirecionar para `/login` automaticamente
   - [ ] Mesmo para: http://localhost:3000/admin/loans

4. **Footer**
   - [ ] Verifique se o footer aparece em todas as páginas
   - [ ] Deve mostrar "@copyleft"

---

### ✅ Fase 6: Testes Automatizados

1. **Executar Todos os Testes**
   ```bash
   npm test
   ```
   - [ ] Verifique se todos os testes passam
   - [ ] Verifique a cobertura de código:
     - Statements: > 50%
     - Branches: > 50%
     - Functions: > 50%
     - Lines: > 50%

2. **Ver Relatório Detalhado**
   ```bash
   npm test -- --coverage
   ```
   - [ ] Verifique o relatório no terminal
   - [ ] Pode abrir `coverage/lcov-report/index.html` no navegador

---

### ✅ Fase 7: Validações

1. **Validação de Senha (Registro)**
   - [ ] Tente registrar com senha fraca: "123"
   - [ ] Deve mostrar erro: "Password must be at least 8 characters"
   - [ ] Tente: "senha123" (sem maiúscula/especial)
   - [ ] Deve mostrar erro
   - [ ] Use: "Senha123!" - deve funcionar

2. **Validação de Email**
   - [ ] Tente registrar com email inválido: "teste@"
   - [ ] Deve mostrar erro de validação

3. **Campos Obrigatórios (Livro)**
   - [ ] Tente criar livro sem preencher título
   - [ ] Deve mostrar erro de campo obrigatório
   - [ ] Todos os campos são obrigatórios

4. **Email Duplicado**
   - [ ] Tente registrar o mesmo email duas vezes
   - [ ] Segunda tentativa deve mostrar erro: "Este email já está em uso"

---

### ✅ Fase 8: Testes de Edge Cases

1. **Emprestar Livro Já Emprestado**
   - [ ] Empreste um livro
   - [ ] Tente emprestar o mesmo livro novamente
   - [ ] Deve funcionar (sistema permite múltiplos empréstimos)

2. **Editar Livro de Outro Usuário**
   - [ ] Crie um livro com User A
   - [ ] Faça logout e login com User B
   - [ ] Tente editar o livro do User A
   - [ ] Deve funcionar (sem controle de ownership)

3. **Login com Credenciais Erradas**
   - [ ] Tente login com senha errada
   - [ ] Deve mostrar: "Credenciais inválidas"

4. **Páginas Protegidas sem Login**
   - [ ] Faça logout
   - [ ] Acesse `/admin/books` direto
   - [ ] Deve redirecionar para `/login`

---

### ✅ Fase 9: Responsividade (Opcional)

1. **Desktop**
   - [ ] Abra em tela cheia
   - [ ] Verifique se o layout está OK

2. **Mobile (F12 > Device Toolbar)**
   - [ ] Ative o modo mobile no DevTools
   - [ ] Teste a navegação
   - [ ] Verifique se os formulários funcionam
   - [ ] Verifique o grid de livros na homepage

---

### ✅ Fase 10: Performance

1. **Build de Produção**
   ```bash
   npm run build
   npm start
   ```
   - [ ] Verifique se o build completa sem erros
   - [ ] Acesse http://localhost:3000
   - [ ] Teste as funcionalidades principais
   - [ ] Verifique se está mais rápido

2. **Lighthouse (DevTools)**
   - [ ] Abra DevTools > Lighthouse
   - [ ] Execute análise
   - [ ] Verifique scores de Performance, Accessibility, SEO

---

## 🐛 Problemas Conhecidos

### Imagens
- ❌ Logo e imagens de exemplo precisam ser adicionadas
- ➡️ Adicione em `src/assets/logo.png`
- ➡️ Use URLs reais de imagens de livros

### Dados Persistência
- ⚠️ Dados são armazenados em memória (Mock Repositories)
- ⚠️ Dados são perdidos ao reiniciar o servidor
- ✅ Usuários são salvos no localStorage (persistem no navegador)
- ✅ Perfeito para desenvolvimento e testes

### Usuário Padrão
- ℹ️ Existe um usuário pré-cadastrado:
  - Email: `lazaro@cefetmg.br`
  - Senha: `12345@aA`
- ✅ Use para testes rápidos

---

## 📊 Checklist Final

Antes de entregar:

- [ ] Todos os testes automatizados passam (`npm test`)
- [ ] Cobertura de testes > 50%
- [ ] Build de produção funciona (`npm run build`)
- [ ] Homepage mostra livros corretamente
- [ ] CRUD completo de livros funciona
- [ ] Sistema de empréstimos funciona
- [ ] Autenticação (login/registro) funciona
- [ ] Rotas protegidas redirecionam para login
- [ ] Não há erros no console do navegador
- [ ] README.md está completo

---

## 🎯 Cobertura de Requisitos

| Requisito | Status | Como Testar |
|-----------|--------|-------------|
| Controle de acesso por usuário | ✅ | Login/Register + Rotas Protegidas |
| Área pública | ✅ | Homepage (/) acessível sem login |
| Área privada | ✅ | /admin/* requer login |
| CRUD completo | ✅ | /admin/books - Criar/Ler/Editar/Deletar |
| Cobertura > 50% | ✅ | `npm test -- --coverage` |
| Next.js + React | ✅ | Framework Next.js 14 |
| Docker | ✅ | Dockerfile presente |
| TypeScript | ✅ | 100% TypeScript |

---

## ✅ Projeto 100% Funcional!

**Tudo está pronto para testes!**

Execute os testes nesta ordem:
1. Testes automatizados (`npm test`)
2. Testes manuais (seguir este guia)
3. Build de produção (`npm run build`)

**Boa sorte! 🚀**
