# Visualizador de Árvore AVL

## Descrição do projeto

Este projeto é uma aplicação web simples desenvolvida para a disciplina de Estruturas de Dados. A aplicação permite visualizar e interagir graficamente com uma Árvore Binária AVL (Adelson‑Velsky e Landis).

Uma árvore AVL é uma árvore binária de busca auto‑balanceada: para qualquer nó, a diferença de altura entre as subárvores esquerda e direita (fator de balanceamento) não pode ser maior que 1. Esse balanceamento garante que operações como busca, inserção e remoção sejam executadas em tempo O(log n) na média e no pior caso.

## Funcionalidades

- Buscar um valor na árvore
- Inserir um novo nó mantendo o balanceamento AVL
- Remover um nó e rebalancear quando necessário
- Visualização gráfica da árvore no navegador (Canvas)
- Exibição automática das rotações realizadas para manter o balanceamento
- Informações da árvore (altura, fator de balanceamento, etc.)

## Tecnologias utilizadas

- HTML5 — Estrutura da página
- CSS3 — Estilos e layout
- JavaScript — Lógica da árvore AVL e manipulação do DOM
- Canvas API — Renderização gráfica da árvore

## Como executar

### Pré‑requisitos

- Navegador web moderno (Chrome, Firefox, Edge, Safari)
- Um servidor HTTP local (ex.: Python, http-server do Node.js ou extensão Live Server do VS Code)

### Opção 1: Usando Python

```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000
```

### Opção 2: Usando Node.js

```bash
# Instalar http-server globalmente (apenas na primeira vez)
npm install -g http-server

# Executar o servidor
http-server -p 8000
```

### Opção 3: Usando VS Code

1. Instale a extensão "Live Server".
2. Clique com o botão direito no arquivo `index.html`.
3. Selecione "Open with Live Server".

### Acessar a aplicação

Após iniciar o servidor, abra no navegador:
http://localhost:8000

## Como usar

### Inserir valores

1. Digite um número no campo "Inserir Valor".
2. Clique em "Inserir".
3. A árvore será balanceada automaticamente e redesenhada.

### Buscar valores

1. Digite o valor desejado no campo "Buscar Valor".
2. Clique em "Buscar".
3. O nó será destacado na visualização, se encontrado.

### Remover valores

1. Digite o valor desejado no campo "Remover Valor".
2. Clique em "Remover".
3. A árvore será rebalanceada automaticamente após a remoção.

### Limpar a árvore

Clique em "Limpar Árvore" para remover todos os nós.

## Conceitos de Estruturas de Dados

### O que é uma árvore AVL?

Uma árvore AVL é uma árvore binária de busca auto‑balanceada, nomeada em homenagem a Adelson‑Velsky e Landis. Ela mantém um fator de balanceamento por nó (diferença entre as alturas das subárvores esquerda e direita) que deve ser -1, 0 ou 1.

Propriedades principais:
- Fator de balanceamento: para cada nó, a diferença de altura entre as subárvores esquerda e direita é no máximo 1.
- Auto‑balanceamento: após inserções e remoções, a árvore realiza rotações para manter o balanceamento.
- Complexidade: operações de busca, inserção e remoção têm complexidade O(log n).

### Tipos de rotações

- Rotação simples à direita (LL): quando o desbalanceamento ocorre à esquerda da subárvore esquerda.
- Rotação simples à esquerda (RR): quando o desbalanceamento ocorre à direita da subárvore direita.
- Rotação dupla esquerda‑direita (LR): quando o desbalanceamento ocorre à direita da subárvore esquerda.
- Rotação dupla direita‑esquerda (RL): quando o desbalanceamento ocorre à esquerda da subárvore direita.

## Métodos implementados

Classe Node (Nó)
- constructor(valor): cria um novo nó
- altura: retorna a altura do nó
- fatorBalanceamento: retorna o fator de balanceamento do nó

Classe AVLTree (Árvore AVL)
- inserir(valor): insere um novo valor na árvore
- remover(valor): remove um valor da árvore
- buscar(valor): busca um valor na árvore
- rotacaoEsquerda(no): realiza rotação à esquerda
- rotacaoDireita(no): realiza rotação à direita
- balancear(no): balanceia o nó após inserção/removal
- desenharArvore(): desenha a árvore visualmente no canvas

## Objetivos educacionais

Este projeto foi desenvolvido para auxiliar no aprendizado de:
- Estruturas de dados não lineares
- Árvores binárias de busca
- Algoritmos de balanceamento
- Complexidade de algoritmos
- Implementação prática de conceitos teóricos
- Visualização de estruturas de dados

## Autor

Desenvolvido como parte da disciplina de Estruturas de Dados.

## Licença

Projeto de código aberto disponível para fins educacionais. Sinta‑se à vontade para reutilizar e adaptar o código, observando as práticas comuns de atribuição quando aplicável.

## Contribuições

Contribuições são bem‑vindas! Você pode:
- Reportar bugs
- Sugerir novas funcionalidades
- Melhorar a documentação
- Enviar pull requests

## Suporte

Para dúvidas ou sugestões, abra uma issue no repositório.

---

Nota: Este é um projeto educacional com foco em clareza e didática. A implementação prioriza entendimento e aprendizagem dos conceitos.
```
