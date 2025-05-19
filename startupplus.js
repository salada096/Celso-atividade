document.addEventListener('DOMContentLoaded', function () {
  const quizForm = document.getElementById('quizForm');
  const quizResult = document.getElementById('quizResult');
  const resultText = document.getElementById('resultText');

  quizForm.addEventListener('submit', function (e) {
    e.preventDefault(); 

    let totalScore = 0;
    let totalQuestions = 7;

    for (let i = 1; i <= totalQuestions; i++) {
      const answer = quizForm.querySelector(`input[name="q${i}"]:checked`);
      if (answer) {
        totalScore += parseInt(answer.value);
      } else {
        alert(`Por favor, responda a pergunta ${i}.`);
        return;
      }
    }

    let profile = '';
    if (totalScore <= 7) {
      profile = 'Explorador Iniciante - Você está dando os primeiros passos no mundo do empreendedorismo!';
    } else if (totalScore <= 14) {
      profile = 'Construtor em Ação - Você já tem uma ideia em desenvolvimento e está no caminho certo!';
    } else if (totalScore <= 18) {
      profile = 'Empreendedor Estratégico - Você já possui experiência e busca escalar com inteligência.';
    } else {
      profile = 'Líder Visionário - Sua jornada está avançada e você busca grandes impactos e conexões!';
    }

    resultText.textContent = profile;
    quizResult.style.display = 'block';
    quizResult.scrollIntoView({ behavior: 'smooth' });
  });
});