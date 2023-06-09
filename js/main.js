// Constantes
// Guardando em uma constante todo o formulário
const form = document.getElementById('novoItem');
// Guardando em uma constante toda a lista
const lista = document.getElementById('lista');
/* 
    Guardando em uma constante toda todos os itens do localStorage em forma de objeto
    E se não houver nenhum objeto ele irá retornar um array vazio
*/
const itens = JSON.parse(localStorage.getItem('itens')) || [];

// Funções
// Função que é responsável por adicionar um elemento
function adicionarElemento(item) {
    // Cria um novo elemento de 'li'
    const novoItem = document.createElement('li');
    // Adiciona uma classe para o novoItem (li)
    novoItem.classList.add('item');

    // Criando um novo elemento para representar o a quantidade do item
    const numeroItem = document.createElement('strong');
    /*
        Utilziamos o innerHTML que coloca algo entre a tag HTML
        Passamos para o strong receber item.quantidade (item é um objeto que passamos no parâmetro da função)
    */
    numeroItem.innerHTML = item.quantidade;
    /*
        Colocamos um data- mesmo sem colocar no index.html, apenas com JS
        Atribuimos o data- como id que recebe item.id
    */
    numeroItem.dataset.id = item.id

    /*
        Fazemos um appendChild que é uma junção para que o novoItem que é a li receba dentro dele o numeroItem que é o strong
    */
    novoItem.appendChild(numeroItem);
    // Estamos colocando o nome agora porque se colocarmos antes do 'numeroItem.innerHTML = item.quantidade;' não vai ficar da ordem que queremos
    novoItem.innerHTML += item.nome;
    // Agora com essa junção de 'li' e 'strong' vamos colocat também o botão passando por parâmetro o id do item
    novoItem.appendChild(botaoDeletar(item.id))

    // Agora vamos colcoar dentro do lista ('ul') e acrescentar a 'li' que acabamos de criar
    lista.appendChild(novoItem);
}

// Pegamos a lista de objetos que desfazemos e vamos printar na tela utilizando o forEach
itens.forEach((elemento) => {
    // Para cada elemento vamos criar uma li
    adicionarElemento(elemento)
})

// Criamos uma função para atualizar o elemento e passamos por parâmetro o item
function atualizaElemento(item) {
    /*
        Utilizamos o querySelector que busca o primeiro elemento pois por se tratar de um id, só vai ter um
        Fazemos uma pesquisa pelo data do elemento e escrevemos nele o item.quantidade
    */
    document.querySelector("[data-id='" + item.id + "']").innerHTML = item.quantidade;
}

// Criamos uma função para remover o elemento que clicarmos
function deletaElemento(tag, id) {
    /*
        Poderiamos passar tag como 'evento' mas para ficar com mais sentido passamos como tag ou outro nome e podemos usar o .remove() que remove a tag
    */
    tag.remove();

    /*
        Com o nosso array de objetos utilizamos o método splice que é de remover um índice do array
        Dentro dele procuramos pelo indíce id e damos um nome para cada elemento do objeto e verificamos se o id que buscamos é igual ao id do elemento que clicamos, assim tendo certeza do que vamos remover assim removendo se não, retorna 1
    */
    itens.splice(itens.findIndex(elemento => elemento.id === id), 1);

    /*
        Atualizamos o localStorage com o novo array de objetos (itens) e já passamos para stringify do JSON
    */
    localStorage.setItem('itens', JSON.stringify(itens));
}

// Criamos uma função para mostrarmos o botão deletar e realizarmos a função
function botaoDeletar(id) {
    // Criando o elemento tag do botão
    const elementoBotao = document.createElement('button');
    // Atribuindo um contexto para esse botão
    elementoBotao.innerHTML = 'X';

    /*
        Adicionando um evento de click para esse botão realizar uma ação
        Utilizamos o function pois se passássemos como uma arrow function não conseguimos utilizar o this (que é utilizado para dizer 'esse elemento')
    */
    elementoBotao.addEventListener('click', function () {
        /*
            Chamamos a função que criamos antes que é o deletaElemento() passando por parâmetro a tag pai do elemento que clicamos, se deixássemos apenas 'this' ele iria deletar o botão mas como o botão está dentro do li, iremos deletar ele, para termos uma segurança que vamos deletar o certo, passamos o id
        */
        deletaElemento(this.parentNode, id);
    })

    // Retornamos para a função o elementoBotao
    return elementoBotao;
}

// Interações
// Damos funcionalidade ao clicamos para enviar o formulário e também recebemos o evento do que fizemos
form.addEventListener('submit', (evento) => {
    // Cancelamos o padrão de recarregar a página ao enviar
    evento.preventDefault();

    // Ao enviarmos o formulário enviamos os input, e pegamos eles e armazenamos pelo seu 'name'
    const nome = evento.target.elements['nome'];
    const quantidade = evento.target.elements['quantidade'];

    // Armazenamos como um objeto o item que adicionamos, pois nosso localStorage é um array de objetos
    const itemAdicionado = {
        'nome': nome.value,
        'quantidade': quantidade.value
    }

    /*
        Criamos uma constante que tem uma busca pelo o array de objetos buscando por cada elemento.nome se o há um nome.value idêntico
    */
    const existe = itens.find(elemento => elemento.nome === nome.value);

    // Condicional para se há um nome existente
    if (existe) {
        // Por já existir o item já tem um id, só pega o id do que existe e atribui ao que está sendo escrito
        itemAdicionado.id = existe.id;
        // Atualiza o elemento
        atualizaElemento(itemAdicionado)
        /*
            Ele vai pesquisar pelo indice exato do elemento que for igual ao existe.id e irá sobrescrever pelo novo itemAdicionado
        */
        itens[itens.findIndex(elemento => elemento.id === existe.id)] = itemAdicionado;
        // Se não existir
    } else {
        /*
            Atribui ao id do itemAdicionado verificando fazendo um operador ternário de if else se itens.lenght for maior que 0 ou seja, se houver itens, ele irá pegar o id do último item e somar mais 1, se não houver nenhum item ele irá retornar 0
        */
        itemAdicionado.id = (itens.length > 0) ? (itens[itens.length - 1].id + 1) : 0;
        // Irá colocar no itens o novo item adicionado
        itens.push(itemAdicionado);
        // Adicionar um novo item
        adicionarElemento(itemAdicionado);
    }

    /*
        Está setando os itens no localStorage como string, pois ele só lê como string
        O localStorage recebe dois valores a key que é a chave e o valor, por isso passamos o nosso array de objeto itens como uma string utilizando o JSON.stringify()
    */
    localStorage.setItem('itens', JSON.stringify(itens));

    // Aqui estamos setando nossos dois inputs como vazios para toda vez que enviarmos não ficar lá escrito o que enviamos
    nome.value = '';
    quantidade.value = '';
})