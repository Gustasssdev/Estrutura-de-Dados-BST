class Node {
    constructor(info) {
        this.info = info;
        this.esq = null;
        this.dir = null;
        this.altura = 1;
    }
}

class AVL {
    constructor() {
        this.raiz = null;
    }

    max(a, b) {
        return a > b ? a : b;
    }

    calcularAltura(no) {
        if (no === null) return 0;
        return no.altura;
    }

    atualizarAltura(no) {
        if (no === null) return;
        const alturaEsq = this.calcularAltura(no.esq);
        const alturaDir = this.calcularAltura(no.dir);
        no.altura = 1 + this.max(alturaEsq, alturaDir);
    }

    calcularFatorBalanceamento(no) {
        if (no === null) return 0;
        return this.calcularAltura(no.esq) - this.calcularAltura(no.dir);
    }

    rotacaoDireita(y) {
        const x = y.esq;
        const T2 = x.dir;

        x.dir = y;
        y.esq = T2;

        this.atualizarAltura(y);
        this.atualizarAltura(x);

        return x;
    }

    rotacaoEsquerda(x) {
        const y = x.dir;
        const T2 = y.esq;

        y.esq = x;
        x.dir = T2;

        this.atualizarAltura(x);
        this.atualizarAltura(y);

        return y;
    }

    inserirNo(no, valor) {
        if (no === null) {
            return new Node(valor);
        }

        if (valor < no.info) {
            no.esq = this.inserirNo(no.esq, valor);
        } else if (valor > no.info) {
            no.dir = this.inserirNo(no.dir, valor);
        } else {
            return no;
        }

        this.atualizarAltura(no);

        const fb = this.calcularFatorBalanceamento(no);

        if (fb > 1 && valor < no.esq.info) {
            return this.rotacaoDireita(no);
        }

        if (fb < -1 && valor > no.dir.info) {
            return this.rotacaoEsquerda(no);
        }

        if (fb > 1 && valor > no.esq.info) {
            no.esq = this.rotacaoEsquerda(no.esq);
            return this.rotacaoDireita(no);
        }

        if (fb < -1 && valor < no.dir.info) {
            no.dir = this.rotacaoDireita(no.dir);
            return this.rotacaoEsquerda(no);
        }

        return no;
    }

    put(valor) {
        this.raiz = this.inserirNo(this.raiz, valor);
    }

    buscar(no, valor) {
        if (no === null) {
            return null;
        }

        if (valor === no.info) {
            return no;
        }

        if (valor < no.info) {
            return this.buscar(no.esq, valor);
        } else {
            return this.buscar(no.dir, valor);
        }
    }

    get(valor) {
        return this.buscar(this.raiz, valor);
    }

    emOrdem(no, resultado) {
        if (no !== null) {
            this.emOrdem(no.esq, resultado);
            resultado.push(no.info);
            this.emOrdem(no.dir, resultado);
        }
    }

    ordem() {
        const resultado = [];
        this.emOrdem(this.raiz, resultado);
        return resultado;
    }

    preOrdem(no, resultado) {
        if (no !== null) {
            resultado.push(no.info);
            this.preOrdem(no.esq, resultado);
            this.preOrdem(no.dir, resultado);
        }
    }

    getPreOrdem() {
        const resultado = [];
        this.preOrdem(this.raiz, resultado);
        return resultado;
    }

    posOrdem(no, resultado) {
        if (no !== null) {
            this.posOrdem(no.esq, resultado);
            this.posOrdem(no.dir, resultado);
            resultado.push(no.info);
        }
    }

    getPosOrdem() {
        const resultado = [];
        this.posOrdem(this.raiz, resultado);
        return resultado;
    }

    getLevelOrder() {
        if (!this.raiz) return [];
        
        const resultado = [];
        const fila = [this.raiz];
        
        while (fila.length > 0) {
            const no = fila.shift();
            resultado.push(no.info);
            
            if (no.esq !== null) {
                fila.push(no.esq);
            }
            if (no.dir !== null) {
                fila.push(no.dir);
            }
        }
        
        return resultado;
    }

    getAltura(no) {
        if (no === null) return 0;
        return no.altura;
    }

    altura() {
        return this.getAltura(this.raiz);
    }

    contarNos(no) {
        if (no === null) return 0;
        return 1 + this.contarNos(no.esq) + this.contarNos(no.dir);
    }

    tamanho() {
        return this.contarNos(this.raiz);
    }

    encontrarMin(no = this.raiz) {
        if (no === null) return null;
        while (no.esq !== null) {
            no = no.esq;
        }
        return no.info;
    }

    encontrarMax(no = this.raiz) {
        if (no === null) return null;
        while (no.dir !== null) {
            no = no.dir;
        }
        return no.info;
    }

    internalPathLength(no = this.raiz, profundidade = 0) {
        if (no === null) return 0;
        return profundidade + 
               this.internalPathLength(no.esq, profundidade + 1) +
               this.internalPathLength(no.dir, profundidade + 1);
    }

    verificarBalanceamentoRecursivo(no) {
        if (no === null) return true;

        const fb = this.calcularFatorBalanceamento(no);
        
        if (fb < -1 || fb > 1) {
            return false;
        }

        return this.verificarBalanceamentoRecursivo(no.esq) && 
               this.verificarBalanceamentoRecursivo(no.dir);
    }

    estaBalanceada() {
        return this.verificarBalanceamentoRecursivo(this.raiz);
    }

    balancearArvore() {
        const valores = this.ordem();
        
        this.raiz = null;
        
        this.raiz = this.construirArvoreBalanceada(valores, 0, valores.length - 1);
    }

    construirArvoreBalanceada(valores, inicio, fim) {
        if (inicio > fim) return null;

        const meio = Math.floor((inicio + fim) / 2);
        const no = new Node(valores[meio]);

        no.esq = this.construirArvoreBalanceada(valores, inicio, meio - 1);
        no.dir = this.construirArvoreBalanceada(valores, meio + 1, fim);

        this.atualizarAltura(no);

        return no;
    }
}
