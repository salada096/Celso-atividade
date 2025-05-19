document.addEventListener('DOMContentLoaded', () => {

const quizForm = document.getElementById('quizForm');
  const quizResult = document.getElementById('quizResult');
  const resultText = document.getElementById('resultText');

  quizForm.addEventListener('submit', (e) => {
    e.preventDefault();

let total = 0;
    const answers = ['q1', 'q2', 'q3', 'q4', 'q5', 'q6', 'q7'];
    
    answers.forEach(question => {
      const answer = document.querySelector(`input[name="${question}"]:checked`);
      if (answer) {
        total += parseInt(answer.value);
      }
    });

    const average = total / 7;
    let profile = '';
    let description = '';

    if (average <= 0.75) {
      profile = 'Perfil Sonhador';
      description = 'Você está começando sua jornada empreendedora! Recomendamos começar pelo módulo introdutório e mentoria básica para construir uma base sólida.';
    } else if (average <= 1.5) {
      profile = 'Perfil Construtor';
      description = 'Você está pronto para o Startup Plus com foco em validação e desenvolvimento do seu produto!';
    } else if (average <= 2.25) {
      profile = 'Perfil Acelerador';
      description = 'Seu negócio está pronto para crescer! Você precisa de ferramentas dos cursos para escalar.';
    } else {
      profile = 'Perfil Visionário';
      description = 'Você já tem experiência e está pensando em rodadas de investimento e escala global!';
    }

    resultText.innerHTML = `<strong>${profile}</strong><br><br>${description}`;
    quizResult.style.display = 'block';
    quizResult.scrollIntoView({ behavior: 'smooth' });
  });