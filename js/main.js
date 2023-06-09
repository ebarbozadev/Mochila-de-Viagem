const form = document.getElementById('novoItem');

form.addEventListener('submit', (evento) => {
    evento.preventDefault();
    adicionarElemento(evento.target.elements['nome'].value, evento.target.elements['quantidade'].value)
})

function adicionarElemento(nome, quantidade){
    console.log(nome);
    console.log(quantidade)
}