// ====== INICIALIZAÇÃO ======
console.log('✅ main.js carregado!');

// Esperar o DOM estar pronto
document.addEventListener('DOMContentLoaded', function() {
    console.log('✅ DOM carregado!');
    
    // Inicializar AVL
    const avl = new AVL();
    console.log('✅ AVL inicializado:', avl);
    
    let foundNode = null;

    // ====== ELEMENTOS DO DOM ======
    const inputValue = document.getElementById('inputValue');
    const searchValue = document.getElementById('searchValue');
    const addBtn = document.getElementById('addBtn');
    const searchBtn = document.getElementById('searchBtn');
    const clearBtn = document.getElementById('clearBtn');
    const refreshBtn = document.getElementById('refreshBtn');
    const message = document.getElementById('message');
    const sidebar = document.querySelector('.sidebar');
    const openSidebar = document.getElementById('openSidebar');
    const closeSidebar = document.getElementById('closeSidebar');

    console.log('✅ Elementos encontrados:', {
        inputValue: !!inputValue,
        searchValue: !!searchValue,
        addBtn: !!addBtn,
        searchBtn: !!searchBtn,
        clearBtn: !!clearBtn,
        refreshBtn: !!refreshBtn,
        message: !!message
    });

    // ====== FUNÇÕES ======
    function showMessage(text) {
        console.log('💬 Mensagem:', text);
        if (message) {
            message.textContent = text;
            message.classList.add('show');
            setTimeout(() => {
                message.classList.remove('show');
            }, 3000);
        }
    }

    function updateStats() {
        console.log('📊 Atualizando estatísticas...');
        
        const countNos = document.getElementById('countNos');
        const countAltura = document.getElementById('countAltura');
        const countMin = document.getElementById('countMin');
        const countMax = document.getElementById('countMax');
        const emOrdemEl = document.getElementById('emOrdem');
        const preOrdemEl = document.getElementById('preOrdem');
        const posOrdemEl = document.getElementById('posOrdem');

        if (countNos) countNos.textContent = avl.tamanho();
        if (countAltura) countAltura.textContent = avl.altura();
        if (countMin) countMin.textContent = avl.encontrarMin() ?? '-';
        if (countMax) countMax.textContent = avl.encontrarMax() ?? '-';

        const emOrdem = avl.ordem();
        const preOrdem = avl.getPreOrdem();
        const posOrdem = avl.getPosOrdem();

        if (emOrdemEl) emOrdemEl.textContent = emOrdem.length > 0 ? emOrdem.join(' → ') : 'Vazio';
        if (preOrdemEl) preOrdemEl.textContent = preOrdem.length > 0 ? preOrdem.join(' → ') : 'Vazio';
        if (posOrdemEl) posOrdemEl.textContent = posOrdem.length > 0 ? posOrdem.join(' → ') : 'Vazio';

        drawTree();
    }

    function drawTree() {
        console.log('🌳 Desenhando árvore...');
        const svg = document.getElementById('tree-svg');
        if (!svg) return;

        svg.innerHTML = '';

        if (!avl.raiz) {
            const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
            text.setAttribute('x', '50%');
            text.setAttribute('y', '50%');
            text.setAttribute('text-anchor', 'middle');
            text.setAttribute('dominant-baseline', 'middle');
            text.setAttribute('fill', '#6b7280');
            text.setAttribute('font-size', '16');
            text.textContent = 'Árvore vazia';
            svg.appendChild(text);
            return;
        }

        const width = svg.clientWidth || 800;
        const height = svg.clientHeight || 400;

        const treeData = convertToD3(avl.raiz);
        const hierarchy = d3.hierarchy(treeData);
        const treeLayout = d3.tree().size([width - 60, height - 60]);
        const treeStructure = treeLayout(hierarchy);

        const g = d3.select('#tree-svg')
            .append('g')
            .attr('transform', 'translate(30, 30)');

        // Links
        g.selectAll('.link')
            .data(treeStructure.links())
            .enter()
            .append('line')
            .attr('x1', d => d.source.x)
            .attr('y1', d => d.source.y)
            .attr('x2', d => d.target.x)
            .attr('y2', d => d.target.y)
            .attr('stroke', '#4b5563')
            .attr('stroke-width', 2);

        // Nodes
        const nodes = g.selectAll('.node')
            .data(treeStructure.descendants())
            .enter()
            .append('g')
            .attr('transform', d => `translate(${d.x},${d.y})`);

        nodes.append('circle')
            .attr('r', 20)
            .attr('fill', d => d.data.value === foundNode ? '#10b981' : '#22d3ee')
            .attr('stroke', d => d.data.value === foundNode ? '#047857' : '#0891b2')
            .attr('stroke-width', 2);

        nodes.append('text')
            .attr('text-anchor', 'middle')
            .attr('dominant-baseline', 'middle')
            .attr('fill', 'white')
            .attr('font-weight', 'bold')
            .attr('font-size', '13')
            .text(d => d.data.value);

        nodes.append('text')
            .attr('text-anchor', 'middle')
            .attr('y', -30)
            .attr('fill', '#d1d5db')
            .attr('font-size', '10')
            .text(d => `FB: ${avl.calcularFatorBalanceamento(d.data.node)}`);
    }

    function convertToD3(node) {
        if (!node) return null;
        return {
            value: node.info,
            node: node,
            children: [
                convertToD3(node.esq),
                convertToD3(node.dir)
            ].filter(d => d !== null)
        };
    }

    // ====== EVENT LISTENERS ======
    if (addBtn) {
        addBtn.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('🔘 Botão adicionar clicado');
            const value = parseInt(inputValue.value);

            if (isNaN(value)) {
                showMessage('❌ Insira um número válido');
                return;
            }

            if (avl.get(value)) {
                showMessage('⚠️ Valor já existe');
                return;
            }

            avl.put(value);
            console.log('✅ Valor adicionado:', value);
            inputValue.value = '';
            updateStats();
            showMessage(`✅ ${value} inserido`);
        });
    }

    if (searchBtn) {
        searchBtn.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('🔘 Botão buscar clicado');
            const value = parseInt(searchValue.value);

            if (isNaN(value)) {
                showMessage('❌ Insira um número válido');
                return;
            }

            const node = avl.get(value);
            if (node) {
                foundNode = value;
                updateStats();
                showMessage(`🔍 ${value} encontrado`);
                setTimeout(() => {
                    foundNode = null;
                    updateStats();
                }, 2000);
            } else {
                showMessage(`❌ ${value} não encontrado`);
            }
            searchValue.value = '';
        });
    }

    if (clearBtn) {
        clearBtn.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('🔘 Botão limpar clicado');
            avl.raiz = null;
            foundNode = null;
            updateStats();
            showMessage('🧹 Árvore limpa');
        });
    }

    if (refreshBtn) {
        refreshBtn.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('🔘 Botão atualizar clicado');
            updateStats();
            showMessage('🔄 Atualizado');
        });
    }

    if (inputValue) {
        inputValue.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                addBtn.click();
            }
        });
    }

    if (searchValue) {
        searchValue.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                searchBtn.click();
            }
        });
    }

    if (openSidebar) {
        openSidebar.addEventListener('click', function() {
            sidebar.classList.add('show');
        });
    }

    if (closeSidebar) {
        closeSidebar.addEventListener('click', function() {
            sidebar.classList.remove('show');
        });
    }

    window.addEventListener('resize', updateStats);

    // ====== INICIAR ======
    console.log('✅ Inicializando...');
    updateStats();
    console.log('✅ Sistema pronto!');
});