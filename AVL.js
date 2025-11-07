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

    // Função max implementada manualmente (substitui Math.max)
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
        no.altura = 1 + this.max(alturaEsq, alturaDir); // Usando max manual
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
        if (no === null) return new Node(valor);

        if (valor < no.info) no.esq = this.inserirNo(no.esq, valor);
        else if (valor > no.info) no.dir = this.inserirNo(no.dir, valor);
        else return no;

        this.atualizarAltura(no);
        const fb = this.calcularFatorBalanceamento(no);

        if (fb > 1 && valor < no.esq.info) return this.rotacaoDireita(no);
        if (fb < -1 && valor > no.dir.info) return this.rotacaoEsquerda(no);
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

    buscarNo(no, valor) {
        if (no === null) return null;
        if (valor === no.info) return no;
        if (valor < no.info) return this.buscarNo(no.esq, valor);
        return this.buscarNo(no.dir, valor);
    }

    get(valor) {
        return this.buscarNo(this.raiz, valor);
    }

    encontrarMinimo(no) {
        if (no === null) return null;
        while (no.esq) no = no.esq;
        return no.info;
    }

    encontrarMaximo(no) {
        if (no === null) return null;
        while (no.dir) no = no.dir;
        return no.info;
    }

    encontrarMin() {
        return this.encontrarMinimo(this.raiz);
    }

    encontrarMax() {
        return this.encontrarMaximo(this.raiz);
    }

    contarNos(no) {
        if (no === null) return 0;
        return 1 + this.contarNos(no.esq) + this.contarNos(no.dir);
    }

    tamanho() {
        return this.contarNos(this.raiz);
    }

    altura() {
        return this.calcularAltura(this.raiz);
    }

    calcularComprimentoInterno(no, profundidade) {
        if (no === null) return 0;
        return (
            profundidade +
            this.calcularComprimentoInterno(no.esq, profundidade + 1) +
            this.calcularComprimentoInterno(no.dir, profundidade + 1)
        );
    }

    internalPathLength() {
        return this.calcularComprimentoInterno(this.raiz, 0);
    }

    emOrdem(no, resultado) {
        if (no) {
            this.emOrdem(no.esq, resultado);
            resultado.push(no.info);
            this.emOrdem(no.dir, resultado);
        }
    }

    preOrdem(no, resultado) {
        if (no) {
            resultado.push(no.info);
            this.preOrdem(no.esq, resultado);
            this.preOrdem(no.dir, resultado);
        }
    }

    posOrdem(no, resultado) {
        if (no) {
            this.posOrdem(no.esq, resultado);
            this.posOrdem(no.dir, resultado);
            resultado.push(no.info);
        }
    }

    ordem() {
        const res = [];
        this.emOrdem(this.raiz, res);
        return res;
    }

    getPreOrdem() {
        const res = [];
        this.preOrdem(this.raiz, res);
        return res;
    }

    getPosOrdem() {
        const res = [];
        this.posOrdem(this.raiz, res);
        return res;
    }
}