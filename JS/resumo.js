document.addEventListener("DOMContentLoaded", () => {
    const container = document.querySelector(".resumo-container");
    const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

    if (cartItems.length === 0) {
        container.innerHTML = "<p>O carrinho está vazio.</p>";
        return;
    }

    let totalGeral = 0;

    cartItems.forEach(item => {
        totalGeral += item.total;

        const itemDiv = document.createElement("div");
        itemDiv.className = "resumo-item";
        itemDiv.innerHTML = `
            <h3>${item.name}</h3>
            <p>Quantidade: ${item.quantity}</p>
            <p>Preço unitário: R$ ${item.price.toFixed(2).replace('.', ',')}</p>
            <p>Total: R$ ${item.total.toFixed(2).replace('.', ',')}</p>
        `;
        container.appendChild(itemDiv);
    });

    // Adiciona o frete fixo de R$ 10,00
    const shippingCost = 10.00;
    totalGeral += shippingCost;

    const shippingDiv = document.createElement("div");
    shippingDiv.className = "frete";
    shippingDiv.innerHTML = `<p>Frete: R$ ${shippingCost.toFixed(2).replace('.', ',')}</p>`;
    container.appendChild(shippingDiv);

    const totalDiv = document.createElement("div");
    totalDiv.className = "total";
    totalDiv.innerHTML = `<p>Total Geral: R$ ${totalGeral.toFixed(2).replace('.', ',')}</p>`;
    container.appendChild(totalDiv);
});

// Botão finalizar carrinho
$(function () {
    $("#button").click(function () {
        var $btn = $(this);

        // Desabilita o botão imediatamente
        $btn.prop('disabled', true);

        // Adiciona a classe de carregamento (rotação)
        $btn.addClass("onclic");

        // Após 2080ms, executa a sequência de validação
        setTimeout(function () {
            $btn.removeClass("onclic");
            $btn.addClass("validate");
            window.location.href = "payment.html";

            // Após mais 2080ms, volta ao estado original e reabilita
            setTimeout(function () {
                $btn.removeClass("validate");
                $btn.prop('disabled', false);
            }, 2090);
        }, 2090);
    });
});

// Função para cancelar pedido
function finalizarPedido() {
    localStorage.removeItem("carrinho");

    // Alerta estilizado
    Swal.fire({
        title: 'Pedido cancelado!',
        text: 'Seu pedido será reembolsado em até 24 horas.',
        icon: 'info',
        confirmButtonText: 'OK',
        confirmButtonColor: '#3085d6'
    }).then((result) => {
        if (result.isConfirmed) {
            window.location.href = "index.html";
        }
    });
}
