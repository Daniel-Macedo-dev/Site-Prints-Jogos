# 🎮 Site Prints Jogos

Aplicação frontend desenvolvida em **React + Vite** para exibição e upload de prints de jogos.  
O projeto foi criado para funcionar integrado à **Upload API** em ambiente local e também possui uma versão publicada no **GitHub Pages**, usada como demonstração estática da interface.

---

## 📌 Visão Geral

O **Site Prints Jogos** funciona como a interface visual do ecossistema formado junto com a **Upload API**, permitindo:

- exibir prints de jogos em uma galeria visual
- realizar upload de imagens quando conectado ao backend local
- navegar pela interface em modo estático no GitHub Pages
- testar a experiência visual do projeto mesmo sem a API em execução

---

## 🧱 Tecnologias Utilizadas

- **React 19**
- **Vite 7**
- **Axios**
- **React Router DOM**
- **Bootstrap 5**
- **gh-pages** *(deploy estático)*

---

## 🏛️ Estrutura do Projeto

```text
Site-Prints-Jogos/
├── public/                 # Arquivos públicos
├── src/
│   ├── components/         # Componentes reutilizáveis (Navbar, Footer, etc.)
│   ├── pages/              # Páginas principais da aplicação
│   ├── mockData.js         # Dados mockados usados no modo estático
│   ├── styles/             # Estilos customizados
│   ├── App.jsx             # Estrutura principal de rotas
│   └── main.jsx            # Ponto de entrada da aplicação
├── package.json
└── vite.config.js
````

---

## 🚀 Funcionalidades

* Exibição de **prints de jogos** em cards
* **Galeria com visualização ampliada**
* Área de **upload de imagens**
* Integração com o backend em ambiente local
* Modo **estático automático** quando publicado no GitHub Pages
* Navegação entre páginas com **React Router DOM**

---

## 🌐 Modos de Execução

O projeto pode funcionar de duas formas:

### 1. Modo local com backend

Quando executado localmente, o frontend pode consumir dados reais da **Upload API**, permitindo listagem e envio de prints.

### 2. Modo estático no GitHub Pages

Quando publicado no GitHub Pages, a aplicação utiliza dados mockados definidos em `mockData.js`, funcionando apenas como demonstração visual da interface.

---

## ⚙️ Como Executar o Projeto

### Pré-requisitos

Antes de iniciar, tenha instalado:

* Node.js
* npm

### Ambiente de desenvolvimento

```bash
npm install
npm run dev
```

A aplicação será iniciada em:

```text
http://localhost:5173/
```

---

## 🏗️ Build de Produção

```bash
npm run build
```

Os arquivos finais serão gerados na pasta `dist/`.

---

## 🚀 Deploy no GitHub Pages

O projeto utiliza o pacote `gh-pages` para publicação automática.

```bash
npm run deploy
```

Isso cria ou atualiza a branch `gh-pages` com os arquivos da pasta `dist/`, publicando a aplicação em:

```text
https://<seu-usuario>.github.io/Site-Prints-Jogos
```

> **Observação:** no GitHub Pages, o projeto funciona em modo estático e utiliza os dados de `mockData.js`.

---

## 🔄 Integração com o Backend

Quando executado em `localhost`, o frontend pode buscar dados reais da API, como no exemplo abaixo:

```js
axios.get("http://localhost:8080/prints", {
  headers: { Authorization: `Bearer ${token}` },
});
```

Em produção, o projeto usa automaticamente o modo mockado.

---

## 🧭 Rotas da Aplicação

| Caminho | Descrição                                   |
| ------- | ------------------------------------------- |
| `/`     | Página inicial com galeria e área de upload |
| `/auth` | Página de autenticação de usuários          |

---

## 🧠 Objetivo do Projeto

Este projeto foi desenvolvido com foco em:

* prática de frontend com React + Vite
* integração com uma API Java Spring Boot
* construção de interface para upload e exibição de imagens
* separação entre modo estático e modo dinâmico
* composição de portfólio com projeto full stack

---

## 🔗 Projeto Relacionado

Backend utilizado no ecossistema do projeto:

* **Upload API** — responsável por autenticação, upload para Amazon S3 e gerenciamento dos prints

---

## 📄 Licença
Este projeto está licenciado sob a **MIT License**.
