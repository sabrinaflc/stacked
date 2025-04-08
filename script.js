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

/* Botão finalizar carrinho */
$(function () {
    $("#button").click(function () {
      var $btn = $(this);
  
      // Adiciona a classe de carregamento (rotação)
      $btn.addClass("onclic");
  
      // Após 2.25s, troca para validação
      setTimeout(function () {
        $btn.removeClass("onclic");
        $btn.addClass("validate");
  
        // Após 2.25s, volta ao estado original
        setTimeout(function () {
          $btn.removeClass("validate");
        }, 2250);
      }, 2250);
    });
  });
  