# 🎮 Site Prints Jogos

Aplicação **frontend** desenvolvida em **React + Vite** para exibir prints de jogos enviados via API.
O site conta com **galeria de imagens**, **área de upload (simulada no modo estático)** e **suporte à integração com o backend de upload**.

## 🧱 Tecnologias Utilizadas

* React 19
* Vite 7
* Axios
* React Router DOM
* Bootstrap 5
* gh-pages (para deploy estático)

## 📁 Estrutura do Projeto

```
Site-Prints-Jogos/
├── public/                 # Arquivos públicos (favicon, etc)
├── src/
│   ├── components/         # Navbar, Footer, etc
│   ├── pages/              # Páginas (HomePage, AuthPage)
│   ├── mockData.js         # Dados mockados para o modo estático
│   ├── styles/             # Estilos customizados
│   ├── App.jsx             # Estrutura principal de rotas
│   └── main.jsx            # Ponto de entrada
├── package.json
└── vite.config.js
```
## 🚀 Funcionalidades

* Exibição de **prints de jogos** em cards
* **Galeria com visualização em tela cheia**
* Área de **upload (simulada)** para manter a interface completa no modo estático
* Integração com o backend (modo dinâmico, quando em `localhost`)
* Modo **estático** automático quando hospedado via GitHub Pages

## ⚙️ Execução do Projeto

### 🔹 Ambiente de Desenvolvimento

```bash
npm install
npm run dev
```

O projeto será iniciado em:

```
http://localhost:5173/
```

### 🔹 Build de Produção

```bash
npm run build
```

Os arquivos finais serão gerados na pasta `dist/`.

## 🌐 Deploy no GitHub Pages

O projeto utiliza o pacote `gh-pages` para publicação automática.

```bash
npm run deploy
```

Isso cria (ou atualiza) a branch `gh-pages` com os arquivos da pasta `dist/`, tornando o site acessível em:

```
https://<seu-usuario>.github.io/Site-Prints-Jogos
```

> **Obs:** no modo estático, os dados vêm de `mockData.js`, sem necessidade de API.

## 🔄 Integração com o Backend

Quando executado em `localhost`, o frontend busca dados reais da API:

```js
axios.get("http://localhost:8080/prints", {
  headers: { Authorization: `Bearer ${token}` },
});
```

Em produção (GitHub Pages ou outro domínio), ele automaticamente usa o modo **mockado**.

## 🧩 Estrutura de Rotas

| Caminho | Descrição                                   |
| ------- | ------------------------------------------- |
| `/`     | Página inicial com galeria e área de upload |
| `/auth` | Página de autenticação de usuários          |

## 🧠 Conceito

O **Site Prints Jogos** serve como interface para o projeto **Upload API**, permitindo visualizar e simular o envio de imagens de jogos, unindo front e back em um ecossistema completo.

## 📄 Licença

Este projeto está licenciado sob a **MIT License**.
