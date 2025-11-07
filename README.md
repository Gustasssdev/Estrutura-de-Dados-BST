# 🌳 Visualizador de Árvore AVL

## 📋 Descrição do Projeto

Este projeto é uma aplicação web simples desenvolvida para a disciplina de **Estrutura de Dados**, que permite visualizar e interagir com uma **Árvore Binária AVL** (Adelson-Velsky e Landis) de forma gráfica e intuitiva.

A árvore AVL é uma árvore binária de busca auto-balanceada, onde a diferença de altura entre as subárvores esquerda e direita de qualquer nó não pode ser maior que 1. Este balanceamento garante que as operações de busca, inserção e remoção sejam executadas em tempo O(log n).

## ✨ Funcionalidades

A aplicação oferece as seguintes funcionalidades:

- **🔍 Buscar Valor**: Permite buscar um valor específico na árvore AVL
- **➕ Inserir Nó**: Adiciona um novo valor na árvore mantendo o balanceamento AVL
- **➖ Remover Nó**: Remove um valor específico da árvore e rebalanceia quando necessário
- **🎨 Visualização Gráfica**: Desenha a árvore de forma visual no navegador
- **🔄 Rotações**: Exibe automaticamente as rotações (simples e duplas) necessárias para manter o balanceamento
- **📊 Informações da Árvore**: Mostra altura, fator de balanceamento e outras métricas

## 🛠️ Tecnologias Utilizadas

- **HTML5**: Estrutura da página web
- **CSS3**: Estilização e layout da interface
- **JavaScript**: Lógica da árvore AVL e manipulação do DOM
- **Canvas API**: Renderização gráfica da árvore binária

## 🚀 Como Executar

### Pré-requisitos

- Um navegador web moderno (Chrome, Firefox, Edge, Safari)
- Um servidor local (pode ser qualquer um dos seguintes):
  - Python (se instalado)
  - Node.js com http-server
  - Extensão Live Server do VS Code
  - Qualquer outro servidor HTTP local

### Opção 1: Usando Python

```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000
```

### Opção 2: Usando Node.js

```bash
# Instalar http-server globalmente (primeira vez)
npm install -g http-server

# Executar o servidor
http-server -p 8000
```

### Opção 3: Usando VS Code

1. Instale a extensão "Live Server"
2. Clique com o botão direito no arquivo `index.html`
3. Selecione "Open with Live Server"

### Acessar a Aplicação

Após iniciar o servidor, abra seu navegador e acesse:
```
http://localhost:8000
```

## 📖 Como Usar

### Inserir Valores

1. Digite um número no campo de entrada "Inserir Valor"
2. Clique no botão "Inserir"
3. A árvore será automaticamente balanceada e redesenhada

### Buscar Valores

1. Digite o valor que deseja buscar no campo "Buscar Valor"
2. Clique no botão "Buscar"
3. O nó será destacado na visualização se for encontrado

### Remover Valores

1. Digite o valor que deseja remover no campo "Remover Valor"
2. Clique no botão "Remover"
3. A árvore será rebalanceada automaticamente após a remoção

### Limpar a Árvore

- Clique no botão "Limpar Árvore" para remover todos os nós

## 🎓 Conceitos de Estrutura de Dados

### O que é uma Árvore AVL?

Uma árvore AVL é uma árvore binária de busca auto-balanceada, nomeada em homenagem aos seus inventores **A**delson-**V**elsky e **L**andis. 

### Propriedades:

1. **Fator de Balanceamento**: Para cada nó, a diferença de altura entre a subárvore esquerda e direita é no máximo 1
2. **Auto-balanceamento**: Após inserções e remoções, a árvore realiza rotações para manter o balanceamento
3. **Complexidade**: Todas as operações principais (busca, inserção, remoção) têm complexidade O(log n)

### Tipos de Rotações:

- **Rotação Simples à Direita (LL)**: Quando o desbalanceamento ocorre à esquerda da esquerda
- **Rotação Simples à Esquerda (RR)**: Quando o desbalanceamento ocorre à direita da direita
- **Rotação Dupla Esquerda-Direita (LR)**: Quando o desbalanceamento ocorre à direita da esquerda
- **Rotação Dupla Direita-Esquerda (RL)**: Quando o desbalanceamento ocorre à esquerda da direita

## 📚 Métodos Implementados

### Classe Node (Nó)
```javascript
- constructor(valor): Cria um novo nó
- altura: Retorna a altura do nó
- fatorBalanceamento: Retorna o fator de balanceamento
```

### Classe AVLTree (Árvore AVL)
```javascript
- inserir(valor): Insere um novo valor na árvore
- remover(valor): Remove um valor da árvore
- buscar(valor): Busca um valor na árvore
- rotacaoEsquerda(no): Realiza rotação à esquerda
- rotacaoDireita(no): Realiza rotação à direita
- balancear(no): Balanceia o nó após inserção/remoção
- desenharArvore(): Desenha a árvore visualmente no canvas
```

## 🎯 Objetivos Educacionais

Este projeto foi desenvolvido para auxiliar no aprendizado de:

- Estruturas de dados não-lineares
- Árvores binárias de busca
- Algoritmos de balanceamento
- Complexidade de algoritmos
- Implementação prática de conceitos teóricos
- Visualização de estruturas de dados

## 👨‍💻 Autor

Desenvolvido como parte da disciplina de **Estrutura de Dados**.

## 📄 Licença

Este projeto é de código aberto e está disponível para fins educacionais.

## 🤝 Contribuições

Contribuições são bem-vindas! Sinta-se à vontade para:

- Reportar bugs
- Sugerir novas funcionalidades
- Melhorar a documentação
- Enviar pull requests

## 📞 Suporte

Para dúvidas ou sugestões sobre o projeto, abra uma issue no repositório.

---

**Nota**: Este é um projeto educacional desenvolvido para demonstrar conceitos de estrutura de dados. A implementação foca em clareza e fins didáticos.
