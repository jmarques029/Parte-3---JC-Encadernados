# JC Encadernados - Sistema de Gerenciamento

Sistema web completo para gerenciamento de encadernação de livros, desenvolvido com Next.js 14, TypeScript e Clean Architecture.

## 🎯 Funcionalidades

- ✅ **Controle de Acesso por Usuário**: Sistema de autenticação com área pública e privada
- ✅ **CRUD de Livros**: Gerenciamento completo de livros encadernados (criar, ler, atualizar, deletar)
- ✅ **Sistema de Empréstimos**: Controle de empréstimos de livros
- ✅ **Cobertura de Testes**: Mais de 50% de cobertura com testes unitários e de integração
- ✅ **Clean Architecture**: Arquitetura limpa com separação de domínio, casos de uso e infraestrutura

## 🏗️ Arquitetura

O projeto segue os princípios de **Clean Architecture**:

```
src/
├── core/
│   ├── domain/
│   │   ├── entities/          # Entidades do domínio (User, Book, Loan)
│   │   ├── value-objects/     # Objetos de valor (Name, Email, Title, etc)
│   │   ├── repositories/      # Interfaces de repositórios
│   │   └── use-cases/         # Casos de uso da aplicação
│   ├── infra/
│   │   └── mocks/            # Implementações mock dos repositórios
│   └── factories/            # Factories para criar casos de uso
├── components/               # Componentes React
├── context/                  # Context API (AuthContext)
├── app/                      # Pages (App Router do Next.js)
└── test/                     # Testes unitários e de integração
```

## 🚀 Tecnologias

- **Next.js 14** - Framework React com App Router
- **TypeScript** - Tipagem estática
- **Styled Components** - Estilização CSS-in-JS
- **Tailwind CSS** - Utilitários CSS
- **Jest** - Framework de testes
- **React Testing Library** - Testes de componentes React

## 📦 Instalação

```bash
# Instalar dependências
npm install

# Executar em desenvolvimento
npm run dev

# Executar testes
npm test

# Build para produção
npm run build

# Iniciar produção
npm start
```

## 🎨 Estrutura de Dados

### User (Usuário)
- ID único
- Nome
- Email (validado)
- Senha (com validação de complexidade)

### Book (Livro)
- ID único
- Título
- Autor
- Tipo de Encadernação (HARDCOVER, SOFTCOVER, SPIRAL)
- Número de Páginas
- Tipo de Capa (LEATHER, CLOTH, PAPER)
- Preço
- URL da Imagem
- Proprietário (User)

### Loan (Empréstimo)
- ID único
- Usuário que emprestou
- Livro emprestado
- Data do empréstimo
- Data de devolução (null se não devolvido)

## 🧪 Testes

O projeto possui cobertura completa de testes:

```bash
# Executar todos os testes
npm test

# Executar testes em modo watch
npm run test:watch

# Ver relatório de cobertura
npm test -- --coverage
```

### Tipos de Testes

- **Testes de Entidades**: Validação de regras de negócio
- **Testes de Value Objects**: Validação de valores
- **Testes de Casos de Uso**: Lógica de aplicação
- **Testes de Componentes**: Renderização e interação
- **Testes de Integração**: Fluxos completos (CRUD, autenticação, empréstimos)

## 🔒 Autenticação

O sistema usa **Context API** para gerenciar autenticação:

- Registro de novos usuários com validação
- Login com email e senha
- Persistência de sessão via localStorage
- Proteção de rotas administrativas
- Logout

## 📱 Páginas

### Públicas
- `/` - Homepage com lista de livros
- `/login` - Página de login
- `/register` - Página de registro
- `/detalhes/[id]` - Detalhes do livro

### Protegidas (Admin)
- `/admin/books` - Gerenciamento de livros (CRUD)
- `/admin/loans` - Meus empréstimos

## 🎨 Componentes

### Layout
- **Header** - Navegação e informações do usuário
- **Footer** - Rodapé da aplicação

### Formulários
- **BookForm** - Formulário para criar/editar livros

### UI (shadcn/ui)
- Button, Card, Dialog, Input, Label, Table, Toast

## 🛠️ Padrões de Desenvolvimento

### Value Objects
Todos os value objects possuem validação:
```typescript
const title = Title.create('Meu Livro'); // Valida e cria
console.log(title.value); // Acessa o valor
```

### Repositories (Singleton Pattern)
```typescript
const repository = MockBookRepository.getInstance();
await repository.save(book);
const allBooks = await repository.findAll();
```

### Use Cases
```typescript
const bookUseCases = makeBookUseCases();
const book = await bookUseCases.registerBook.execute({
  title: 'Dom Casmurro',
  author: 'Machado de Assis',
  bindingType: 'HARDCOVER',
  pages: 256,
  coverType: 'LEATHER',
  price: 45.90,
  photoUrl: 'https://example.com/image.jpg',
  userId: 'user-123'
});
```

## 📄 Licença

Este projeto foi desenvolvido como parte do trabalho acadêmico para CEFET-MG.

## 👥 Autor

**JC Encadernados** - Sistema de Gerenciamento de Encadernação
