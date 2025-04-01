/* Botões para adicionar quantidade */
function alterarQuantidade(valor, id) {
    let quantidadeElement = document.getElementById(id);
    let quantidadeAtual = parseInt(quantidadeElement.innerText);
    if (quantidadeAtual + valor >= 0) {
        quantidadeElement.innerText = quantidadeAtual + valor;
    }
}

/* Preloader configuration  */
function closepreloader(){
    document.getElementById("preloader").style.display = 'none';
}
window.addEventListener("load",function(){
    setTimeout(closepreloader, 2000);
    
});