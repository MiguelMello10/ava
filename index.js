const elementoContador = document.querySelector('#contador');

function atualizarContagemRegressiva() {
  const agora = new Date();
  
  // Define a meia-noite do dia atual (00:00:00)
  const meiaNoite = new Date();
  meiaNoite.setHours(24, 0, 0, 0); // Vai para o início do próximo dia e subtrai, ou ajusta para o fim do dia atual

  const diferencaTempo = meiaNoite - agora;

  if (diferencaTempo <= 0) {
    if (elementoContador) {
      elementoContador.innerHTML = "As ofertas exclusivas terminam em: 00:00:00";
    }
    return;
  }

  // Calcula horas, minutos e segundos restantes
  const horas = Math.floor((diferencaTempo % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutos = Math.floor((diferencaTempo % (1000 * 60 * 60)) / (1000 * 60));
  const segundos = Math.floor((diferencaTempo % (1000 * 60)) / 1000);

  // Formata os números para sempre terem 2 dígitos (ex: 02:04:37)
  const formatoHoras = String(horas).padStart(2, '0');
  const formatoMinutos = String(minutos).padStart(2, '0');
  const formatoSegundos = String(segundos).padStart(2, '0');

  // Exibe o texto na tela
  if (elementoContador) {
    elementoContador.innerHTML = `As ofertas exclusivas terminam em: ${formatoHoras}:${formatoMinutos}:${formatoSegundos}`;
  }
}

// Atualiza a cada 1 segundo
setInterval(atualizarContagemRegressiva, 1000);

// Executa imediatamente ao carregar a página
atualizarContagemRegressiva();