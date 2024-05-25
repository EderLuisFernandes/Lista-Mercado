### ADD UM TRY CATCH TRATAMENTO DE ERRO COM UM CONSUMO DE API..
<!-- let exchangeRate = 0.20; 

async function fetchExchangeRate() {
  try {
    const response = await fetch('https://api.exchangerate-api.com/v4/latest/BRL');
    const data = await response.json();
    exchangeRate = data.rates.EUR;
    renderizarLista();
  } catch (error) {
    console.error('Error fetching exchange rate:', error);
    Swal.fire({
      position: 'top',
      icon: 'error',
      title: 'Erro ao buscar taxa de câmbio',
      showConfirmButton: true,
    });
  }
} -->
## DEPOIS  AI DENTRO DO REDENRIZARlISTA CRIO UMA CONDIÇÃO PARA ALTERA EM BRL OU EURO 

<!-- let displayTotal;
  if (selectedCurrency === "BRL") {
    displayTotal = `Total Geral: R$ ${totalGeral.toFixed(2)}`;
  } else if (selectedCurrency === "EUR") {
    const totalGeralEuros = totalGeral * exchangeRate;
    displayTotal = `Total Geral: € ${totalGeralEuros.toFixed(2)}`;
  }

  totalDisplay.textContent = displayTotal; -->
  ## mudar img quando clicar

  <!-- currencyImages.forEach(img => {
  img.addEventListener("click", (event) => {
    currencyImages.forEach(img => img.classList.remove("selected"));
    event.target.classList.add("selected");
    selectedCurrency = event.target.id;
    renderizarLista();
  });
}); -->