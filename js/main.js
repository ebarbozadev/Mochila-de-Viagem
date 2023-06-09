// Criando uma const que armazena o formulário
const form = document.getElementById('novoItem');
// Criando uma const que armazena a lista (ul)
const lista = document.getElementById('lista');
// Criando uma const que armazena o conteúdo do localStorage da forma que está, se não achar esse conteúdo armazena um array vazio
const itens = JSON.parse(localStorage.getItem('itens')) || [];

function adicionarElemento(item) {
    const novoItem = document.createElement('li');
    novoItem.classList.add('item');

    const numeroItem = document.createElement('strong');
    numeroItem.innerHTML = item.quantidade;

    novoItem.appendChild(numeroItem);
    novoItem.innerHTML += item.nome;

    lista.appendChild(novoItem);
}

// Com a const que criamos acima que é um array de objetos (pois o JSON.parse(localStorage.getItem('itens')) pegou o localStorage.setItem('itens', JSON.stringify(itens)) que transforma o array de objeto em string e o transformou em objeto novamente)
itens.forEach((elemento) => {
    // Para cada elemento do objeto itens vamos adicionar um elemento na tabela
    adicionarElemento(elemento)
})

form.addEventListener('submit', (evento) => {
    evento.preventDefault();

    const nome = evento.target.elements['nome'];
    const quantidade = evento.target.elements['quantidade'];
    const itemAdicionado = {
        'nome': nome.value,
        'quantidade': quantidade.value
    }

    itens.push(itemAdicionado);
    localStorage.setItem('itens', JSON.stringify(itens));
    adicionarElemento(itemAdicionado);

    nome.value = '';
    quantidade.value = '';
})