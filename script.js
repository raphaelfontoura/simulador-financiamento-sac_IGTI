
var button = document.querySelector("button");
var inputValor = document.getElementById("valor");

var inputPrazoMeses = document.getElementById("res-prazo");
var inputJuroMes = document.getElementById("res-juros");

var tabelaLinhas = document.querySelector("tbody");

var divTabela = document.getElementById("div-tabela");

var juroMes, prazoMeses;

button.addEventListener("click", () => {
  var valor = inputValor.valueAsNumber;
  var prazo = document.getElementById("prazo-anos").valueAsNumber;
  var jurosAno = document.getElementById("juros-ano").valueAsNumber;

  var prestacoes = prazoAnoEmMeses(prazo);
  inputPrazoMeses.valueAsNumber = prestacoes;
  var juroMes = jurosAoMes(jurosAno);
  inputJuroMes.valueAsNumber = juroMes.toFixed(8);

  var amortizacao = calculaAmortizacao(valor, prestacoes);
  var jurosTotais = 0;

  for (var i = 0; i < prestacoes; i++) {
    var saldo = valor - i * amortizacao;
    var jurosPrestacao = saldo * juroMes;
    jurosTotais += jurosPrestacao;

    if (i < 5) {
      var tr = tabelaLinhas.children[i];
      tr.children[1].textContent = amortizacao.toFixed(2);
      tr.children[2].textContent = jurosPrestacao.toFixed(2);
      tr.children[3].textContent = (amortizacao + jurosPrestacao).toFixed(2);
    }
  }
  document.getElementById("res-juros-acum").valueAsNumber = jurosTotais.toFixed(2);

  divTabela.classList.remove("display-none")
});

function prazoAnoEmMeses(anos) {
  return anos * 12;
}

function jurosAoMes(juroAno) {
  return (1 + juroAno) ** (1 / 12) - 1;
}

function calculaAmortizacao(valor, meses) {
  return valor / meses;
}
