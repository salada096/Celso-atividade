document.getElementById("quizForm").addEventListener("submit", function (event) {
  event.preventDefault();

  let total = 0;
  for (let i = 1; i <= 7; i++) {
    const radios = document.getElementsByName("q" + i);
    let answered = false;
    for (const radio of radios) {
      if (radio.checked) {
        total += parseInt(radio.value);
        answered = true;
        break;
      }
    }
    if (!answered) {
      alert("Responda todas as perguntas antes de ver o resultado.");
      return;
    }
  }

  const resultText = document.getElementById("resultText");
  const quizResult = document.getElementById("quizResult");

  let perfil = "";

  if (total <= 7) {
    perfil = "Explorador Iniciante: você está começando sua jornada no empreendedorismo e busca aprender o essencial.";
  } else if (total <= 14) {
    perfil = "Validador Estratégico: você já tem alguma experiência e está pronto para testar e validar ideias.";
  } else if (total <= 18) {
    perfil = "Construtor de Produtos: você já está no caminho certo e quer avançar no desenvolvimento e escalar.";
  } else {
    perfil = "Líder Visionário: você domina ferramentas e estratégias, pronto para liderar com impacto!";
  }

  resultText.textContent = perfil;
  quizResult.style.display = "block";
});