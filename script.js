// Botões para adicionar quantidade
function alterarQuantidade(valor, id) {
  let quantidadeElement = document.getElementById(id);
  let quantidadeAtual = parseInt(quantidadeElement.innerText);
  if (quantidadeAtual + valor >= 0) {
      quantidadeElement.innerText = quantidadeAtual + valor;
  }
}

// Preloader configuration 
function closepreloader(){
  document.getElementById("preloader").style.display = 'none';
}
window.addEventListener("load",function(){
  setTimeout(closepreloader, 2000);
  
});

// Botão finalizar carrinho
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

// Carrinho configuration

// Inicializa o carrinho a partir do localStorage ou cria um array vazio
let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

// Função para alterar quantidade
function alterarQuantidade(delta, id) {
    const quantityElement = document.getElementById(id);
    let quantity = parseInt(quantityElement.textContent);
    quantity = Math.max(1, quantity + delta); // Não permite menos que 1
    quantityElement.textContent = quantity;
}

// Função para adicionar ao carrinho
function addToCart(itemName, price, quantityId) {
    const quantity = parseInt(document.getElementById(quantityId).textContent);
    const priceNumber = parseFloat(price.replace('R$ ', '').replace(',', '.'));
    const totalPrice = priceNumber * quantity;

    const cartItem = {
        name: itemName,
        price: priceNumber,
        quantity: quantity,
        total: totalPrice
    };

    cartItems.push(cartItem);
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    console.log('Item adicionado:', cartItem);
    alert(`${itemName} adicionado ao carrinho!`);
}

// Função para exibir itens no carrinho
function displayCartItems() {
    const container = document.querySelector('.container');
    if (!container) return;

    container.innerHTML = '';

    if (cartItems.length === 0) {
        container.innerHTML = '<h2>O carrinho está vazio, adicione um item primeiro</h2>';
        return;
    }

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
    
    const totalRow = document.createElement('tr');
    totalRow.innerHTML = `
        <td colspan="2">Total</td>
        <td>R$ ${grandTotal.toFixed(2).replace('.', ',')}</td>
        <td></td>
    `;
    tbody.appendChild(totalRow);

    container.appendChild(table);

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

// Adicionar eventos ao carregar a página
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(closepreloader, 2000);

    const addButtons = document.querySelectorAll('.btn-add');
    if (addButtons.length > 0) {
        addButtons.forEach(button => {
            button.addEventListener('click', () => {
                const itemDiv = button.closest('.item');
                const itemName = itemDiv.querySelector('h3').textContent;
                const price = itemDiv.querySelector('.price').textContent;
                const quantityId = itemDiv.querySelector('.quantity').id;
                addToCart(itemName, price, quantityId);
            });
        });
    }

    if (document.querySelector('.title')?.textContent === 'PEDIDO') {
        displayCartItems();
        setupFinalizeButton();
    }
});