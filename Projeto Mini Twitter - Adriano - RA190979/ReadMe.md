# Mini Twitter

Um projeto de rede social simplificada desenvolvido com HTML, CSS e JavaScript vanilla.

## Funcionalidades

- **Sistema de Usuários**
  - Registro de novos usuários
  - Login e logout
  - Edição de perfil

- **Feed de Postagens**
  - Criar postagens (limite de 280 caracteres)
  - Visualizar todas as postagens
  - Visualizar postagens do usuário logado
  - Deletar postagens próprias

- **Interface Responsiva**
  - Design mobile-first
  - Interface intuitiva e moderna
  - Navegação por hash routing

## Tecnologias Utilizadas

- HTML5 semântico
- CSS3 com variáveis CSS e Flexbox
- JavaScript ES6+ (vanilla, sem frameworks)
- API REST para backend
- LocalStorage para persistência de dados

## Estrutura do Projeto

```
mini-twitter/
├── index.html
├── css/
│   ├── style.css
│   └── reset.css
├── js/
│   ├── controllers/
│   │   ├── AuthController.js
│   │   ├── PostController.js
│   │   └── UserController.js
│   ├── views/
│   │   ├── AuthView.js
│   │   ├── PostView.js
│   │   └── UserView.js
│   ├── repositories/
│   │   ├── AuthRepository.js
│   │   ├── PostRepository.js
│   │   └── UserRepository.js
│   └── main.js
└── assets/
    └── images/
```

## Como Usar

1. Abra o arquivo `index.html` em um navegador web
2. Registre uma nova conta ou faça login
3. Comece a postar e interagir!

## API

O projeto utiliza a API disponível em: https://mini-twitter-api-vy9q.onrender.com/

### Endpoints principais:
- `POST /api/auth/register` - Registrar usuário
- `POST /api/auth/login` - Fazer login
- `GET /api/posts` - Listar todas as postagens
- `POST /api/posts` - Criar postagem
- `DELETE /api/posts/:id` - Deletar postagem
- `GET /api/users/profile` - Obter perfil do usuário
- `PUT /api/users/profile` - Atualizar perfil

## Arquitetura

O projeto segue o padrão MVC (Model-View-Controller):

- **Models (Repositories)**: Responsáveis pela comunicação com a API
- **Views**: Responsáveis pela renderização da interface
- **Controllers**: Responsáveis pela lógica de negócio e coordenação

## Características Técnicas

- **Roteamento**: Sistema de roteamento baseado em hash
- **Autenticação**: JWT tokens armazenados no localStorage
- **Responsividade**: Design adaptável para desktop e mobile
- **Validações**: Validações de formulário e limite de caracteres
- **Tratamento de Erros**: Mensagens de erro e sucesso para o usuário

## Desenvolvido por

Adriano Fernandes da Silva RA190979
Este projeto foi desenvolvido como parte de um exercício de desenvolvimento web frontend.

