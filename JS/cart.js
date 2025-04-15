// Inicializa o carrinho
let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

function displayCartItems() {
    const container = document.querySelector('.container');
    const buttonContainer = document.querySelector('.container-btn'); // Referência ao contêiner do botão

    if (!container) return;

    container.innerHTML = '';

    // Verifica se o carrinho está vazio
    if (cartItems.length === 0) {
        container.innerHTML = '<h2>O carrinho está vazio, adicione um item primeiro</h2>';
        buttonContainer.style.display = 'none'; // Esconde o botão de prosseguir
        return;
    }

    // Exibe a tabela com os itens do carrinho
    const table = document.createElement('table');
    table.innerHTML = `
        <thead>
            <tr>
                <th>Item</th>
                <th>Quantidade</th>
                <th>Preço Unitário</th>
                <th> </th>
            </tr>
        </thead>
        <tbody>
        </tbody>
    `;

    const tbody = table.querySelector('tbody');
    let grandTotal = 0;

    cartItems.forEach((item, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.name}</td>
            <td>${item.quantity}</td>
            <td>R$ ${item.price.toFixed(2).replace('.', ',')}</td>
            <td><button class="btn-remove" data-index="${index}">Remover</button></td>
        `;
        tbody.appendChild(row);
        grandTotal += item.total;
    });

    // Adiciona o frete fixo de R$ 10,00
    const shippingCost = 10.00;
    grandTotal += shippingCost;

    const shippingRow = document.createElement('tr');
    shippingRow.innerHTML = `
        <td colspan="2">Frete</td>
        <td>R$ ${shippingCost.toFixed(2).replace('.', ',')}</td>
        <td></td>
    `;
    tbody.appendChild(shippingRow);

    // Total geral com frete
    const totalRow = document.createElement('tr');
    totalRow.innerHTML = `
        <td colspan="2"><strong>Total</strong></td>
        <td><strong>R$ ${grandTotal.toFixed(2).replace('.', ',')}</strong></td>
        <td></td>
    `;
    tbody.appendChild(totalRow);

    container.appendChild(table);

    // Exibe o botão de prosseguir quando houver itens no carrinho
    buttonContainer.style.display = 'block'; // Exibe o botão

    // Adicionar eventos aos botões "Remover" após criar a tabela
    const removeButtons = document.querySelectorAll('.btn-remove');
    removeButtons.forEach(button => {
        button.addEventListener('click', () => {
            const index = parseInt(button.getAttribute('data-index'));
            removeFromCart(index);
        });
    });
}

// Função para remover item do carrinho
function removeFromCart(index) {
    cartItems.splice(index, 1);
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    displayCartItems();
}

// Botão de realizar pagamento
$(function () {
    $("#button-p").click(function () {
        var $btn = $(this);
        if (cartItems.length === 0) {
            alert("Adicione um item ao carrinho antes de finalizar.");
            return;
        }
        $btn.prop('disabled', true);
        $btn.addClass("onclic");
        setTimeout(function () {
            $btn.removeClass("onclic");
            $btn.addClass("validate");
            window.location.href = "payment.html";
            setTimeout(function () {
                $btn.removeClass("validate");
                $btn.prop('disabled', false);
            }, 2090);
        }, 2090);
    });
});

// Exibir itens no carrinho ao carregar a página
document.addEventListener('DOMContentLoaded', function () {
    displayCartItems();
});

// NAV RESPONSIVA
function toggleMenu() {
    document.querySelector('nav ul').classList.toggle('active');
}