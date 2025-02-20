## 💡 Sobre
O **AdvControl** é uma plataforma desenvolvida para advogados gerenciarem suas demandas jurídicas de forma eficiente. Com ele, é possível cadastrar clientes e demandas, modificar o status das demandas, aplicar filtros e garantir a segurança das informações com autenticação e proteção de rotas. Além disso, o sistema permite que qualquer pessoa crie uma demanda pública, fornecendo apenas o e-mail do cliente.

---

## 🌎 Acesse a plataforma
[AdvControl](https://advcontrol.vercel.app/)

---

## 💻 Visão Geral
<img src="public/advcontrol.gif" alt="Prévia AdvControl" />
<img width="350px" src="public/advcontrol-mobile.gif" alt="Prévia em celular AdvControl" />

---

## ✅ Funcionalidades
- **Login social com o Google**: Autenticação segura usando NextAuth.js.
- **Cadastro de demandas e clientes**: Armazene informações de clientes e demandas no banco de dados.
- **Exclusão de demandas e clientes**:
  - Clientes só podem ser excluídos se não houver demandas em aberto vinculadas a eles.
- **Modificação do status da demanda**: Atualize o status das demandas conforme o progresso.
- **Filtros avançados**:
  - Filtre demandas por status, categoria e prazo.
  - Filtrando por 'qualquer status', é possível ver o histórico de demandas.
- **Proteção de rotas**:
  - Apenas usuários autenticados podem acessar o dashboard.
- **Rota pública para criação de demandas**:
  - Qualquer pessoa pode criar uma demanda, fornecendo o e-mail do cliente.
- **Toast de confirmação**:
  - Mensagens de confirmação para ações como cadastro, exclusão e atualização.

---

## ⚙️ Tecnologias
- **Next.js**: Framework React para criação de rotas e renderização do lado do servidor.
- **NextAuth.js**: Autenticação segura com provedores sociais, como o Google.
- **TypeScript**: Garante a tipagem estática, melhorando a qualidade e a segurança do código.
- **Tailwind CSS**: Framework CSS utilitário para estilização rápida e responsiva.
- **MongoDB**: Banco de dados não relacional para armazenamento de dados de clientes e demandas.
- **Prisma**: ORM para gerenciamento e consulta ao banco de dados de forma eficiente.
- **API Routes do Next.js**: Criação de rotas API para integração com o front-end.

---

## 📁 Estrutura do Projeto
O projeto está organizado na seguinte estrutura:

```bash
prisma/schema.prisma # Estrutura do banco de dados MongoDB usando o Prisma ORM
public/ # Arquivos estáticos, como imagens.
src/
├── @types/ # Extensão de tipos para a sessão do usuário
├── app/ # Arquivos principais e rotas
│  ├── api/
│     └── auth/[...nextauth]/ # Rota de autenticação (NextAuth)
│     └── customer/ # Rota de criação de API para clientes
│     └── demand/ # Rota de criação de API para demandas
│  ├── dashboard/ # Página de dashboard
│     └── components/ # Componentes reutilizáveis do dashboard
│     └── customer/ # Página de clientes
│         └── components/ # Componentes reutilizáveis de dashboard/customer
│         └── new/ # Página de novo cliente
│     └── new/ # Página de nova demanda
│  ├── public/ # Página pública de criação de demandas
│  └── layout.tsx # Layout principal
│  └── loading.tsx # Componente de carregamento
│  └── page.tsx # Página inicial
├── assets/ # Arquivo estático de imagem
├── components/ # Componentes reutilizáveis de toda aplicação
├── lib/
│  └── api.ts # Cria um padrão de chamada API já com a URL base
│  └── auth.ts # Define provedores e adapters do NextAuth.js
│  └── prisma.ts # Configuração de instância do PrismaClient
├── providers/
│  └── auth.tsx # Wrapper para o provider de autenticação
│  └── modal.tsx # Contexto para componente de modal
├── utils/ # funções e tipagens reutilizáveis
│  ├── customer.type.ts/ # Tipagem de propriedades do cliente
│  ├── customer.type.ts/ # Tipagem de propriedades da demanda
│  ├── fix-date.ts # Utilitários de conversão de data
```

---

## 🚀 Como executar o projeto
Siga os passos abaixo para rodar o projeto localmente:

### Pré-requisitos
- Node.js instalado.
- Conta no Google para configurar o login social.
- Banco de dados MongoDB configurado.

### Passos
1. Clone o repositório:
   ```bash
   git clone https://github.com/Antonio-Savio/AdvControl.git
   ```
2. Instale as dependências:
   ```bash
   cd AdvControl
   npm install
   ```
3. Configure as variáveis de ambiente:
   Crie um arquivo `.env` na raiz do projeto e adicione as seguintes variáveis:
   ```env
   DATABASE_URL=sua_string_de_conexao_mongodb
   NODE_ENV=development
   NEXTAUTH_URL=http://localhost:3000
   HOST_URL=http://localhost:3000
   NEXTAUTH_SECRET=sua_chave_secreta_para_nextauth
   GOOGLE_ID=seu_google_client_id
   GOOGLE_SECRET=seu_google_client_secret
   ```
4. Execute o projeto:
   ```bash
   npm run dev
   ```
5. Acesse o sistema no navegador:
   ```
   http://localhost:3000
   ```

---

## 📄 Licença
Este projeto está sob a licença MIT. Consulte o arquivo [LICENSE](LICENSE) para mais detalhes.

---

## 🤝 Contribuição
Contribuições são bem-vindas! Siga os passos abaixo:
1. Faça um fork do projeto.
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`).
3. Commit suas mudanças (`git commit -m 'Adiciona nova feature'`).
4. Push para a branch (`git push origin feature/nova-feature`).
5. Abra um Pull Request.

---

## 📧 Contato
Se tiver dúvidas ou sugestões, entre em contato:
- **Email** - [savio.aragao@hotmail.com](mailto:savio.aragao@hotmail.com)
- **GitHub**: [Antonio-Savio](https://github.com/Antonio-Savio)
- **LinkedIn**: [antonio-savio](https://www.linkedin.com/in/antonio-savio)
