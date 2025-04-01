function alterarQuantidade(valor, id) {
    let quantidadeElement = document.getElementById(id);
    let quantidadeAtual = parseInt(quantidadeElement.innerText);
    if (quantidadeAtual + valor >= 0) {
        quantidadeElement.innerText = quantidadeAtual + valor;
    }
}