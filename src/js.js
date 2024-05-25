const todoForm = document.getElementById("todo-form");
const todoList = document.getElementById("todo-list");
const totalDisplay = document.getElementById("total");
const aparecertotal = document.querySelector("#TotalBtn");

let productList = [];
let selectedCurrency = localStorage.getItem('selectedCurrency') || 'BRL';
let exchangeRate = 0;



const fetchExchangeRate = async () => {
  try {
    const response = await fetch('https://api.exchangerate-api.com/v4/latest/BRL');  // Replace with your API endpoint
    const data = await response.json();
    exchangeRate = data.rates.EUR;  // Assuming you want BRL to EUR rate
    renderizarLista();  // Re-render the list with the updated exchange rate
  } catch (error) {
    console.error('Error fetching exchange rate:', error);
  }
};

// Fetch exchange rate when the page loads
fetchExchangeRate();



function renderizarLista() {
  todoList.innerHTML = "";
  let totalGeral = 0;

  productList.forEach((product, index) => {
    const totalProduto = product.quantity * product.value;
    totalGeral += totalProduto;

    const item = document.createElement("li");
    item.classList.add("todo-item");

    const quantityDisplay = isNaN(product.quantity) ? "" : product.quantity;
    const valueDisplay = isNaN(product.value)
      ? ""
      : selectedCurrency === "BRL" ?
      `R$ ${product.value.toFixed(2)}`:
      `€  ${(product.value).toFixed(2)}`
      ;
    const totalDisplay = isNaN(totalProduto)
      ? ""
      : selectedCurrency === "BRL" ? 
      `R$ ${totalProduto.toFixed(2)}`:
      `€  ${totalProduto.toFixed(2)}`;

    item.innerHTML = `
            <strong>${product.name}</strong>
            <strong> | </strong>   ${quantityDisplay} 
            <strong> | </strong>    ${valueDisplay}
            <strong> | </strong>    ${totalDisplay}
            
             <button onclick="editarProduto(${index})"><i class="fa-solid fa-pen"></i></button>
             <button onclick="deletarProduto(${index})"><i class="fa-solid fa-xmark"></i></button>
                     
        `;
    todoList.appendChild(item);
  });
  const displayTotal = selectedCurrency === "BRL" ?
  `Total Geral: R$ ${totalGeral.toFixed(2)}` :
  `Total Geral: € ${totalGeral.toFixed(2)}`;
totalDisplay.textContent = displayTotal;
}

function saveLocalS() {
  localStorage.setItem("productList", JSON.stringify(productList));
}

try {
  productList = JSON.parse(localStorage.getItem("productList")) || [];
} catch (error) {
  console.error("Error parsing local storage:", error);
}

renderizarLista();

function adicionarProduto(event) {
  event.preventDefault();

  const nameInput = document.getElementById("todo-name");
  const quantityInput = document.getElementById("todo-quantity");
  const valueInput = document.getElementById("todo-value");

  const name = nameInput.value.trim();
  const quantity = parseInt(quantityInput.value);
  const value = parseFloat(valueInput.value);

  if (
    ((name !== "" && !isNaN(quantity)) || quantity > 0) &&
    (!isNaN(value) || value > 0)
  ) {
    productList.push({ name, quantity, value });
    renderizarLista();
    saveLocalS();
    nameInput.value = "";
    quantityInput.value = "";
    valueInput.value = "";
    nameInput.focus();
  } else {
    Swal.fire({
      position: "top",
      icon: "error",
      title: "Por favor Preencha todos os campos",
      showConfirmButton: true,
      backdrop: `
    rgba(0,0,0, .99999)
    url("/assets/transparent.png")
    left top
    no-repeat
  `,
      customClass: {
        backdrop: "swal2-backdrop-custom",
      },
    });
  }
}

function editarProduto(index) {
  const product = productList[index];
  const nameInput = document.getElementById("todo-name");
  const quantityInput = document.getElementById("todo-quantity");
  const valueInput = document.getElementById("todo-value");

  nameInput.value = product.name;
  quantityInput.value = product.quantity;
  valueInput.value = product.value;

  productList.splice(index, 1);
  renderizarLista();
  saveLocalS();
}

function deletarProduto(index) {
  productList.splice(index, 1);
  renderizarLista();
  saveLocalS();
}

todoForm.addEventListener("submit", adicionarProduto);

aparecertotal.addEventListener("click", () => {
  if (totalDisplay.style.display === "block") {
    totalDisplay.style.display = "none";
    aparecertotal.innerHTML = '<i class="fa fa-eye-slash"></i>';
  } else {
    totalDisplay.style.display = "block";
    aparecertotal.innerHTML = '<i class="fa fa-eye"></i>';
  }
});

document.querySelectorAll(".currency-img").forEach((img) => {
  img.addEventListener("click", (event) => {
    document
      .querySelectorAll(".currency-img")
      .forEach((img) => img.classList.remove("selected"));
    event.target.classList.add("selected");
    selectedCurrency = event.target.id;
    localStorage.setItem('selectedCurrency', selectedCurrency);
    renderizarLista();
  });
});
document.querySelectorAll(".currency-img").forEach((img) => {
  if (img.id === selectedCurrency) {
    img.classList.add("selected");
  } else {
    img.classList.remove("selected");
  }
});