
document.addEventListener('DOMContentLoaded', function() {
    const metodoPagamento = document.getElementById('metodo-pagamento');
    const camposCartao = document.getElementById('campos-cartao');
    const camposPix = document.getElementById('campos-pix');
    const camposBoleto = document.getElementById('campos-boleto');
    
    // Mostrar campos conforme método de pagamento selecionado
    if (metodoPagamento) {
        metodoPagamento.addEventListener('change', function() {
            // Esconder todos os campos de pagamento
            camposCartao.style.display = 'none';
            camposPix.style.display = 'none';
            camposBoleto.style.display = 'none';
            
            // Mostrar apenas o campo do método selecionado
            const metodoSelecionado = this.value;
            if (metodoSelecionado === 'cartao') {
                camposCartao.style.display = 'block';
            } else if (metodoSelecionado === 'pix') {
                camposPix.style.display = 'block';
            } else if (metodoSelecionado === 'boleto') {
                camposBoleto.style.display = 'block';
            }
        });
    }
    
    // Formatação de campos
    const cpfInput = document.getElementById('cpf');
    if (cpfInput) {
        cpfInput.addEventListener('input', function() {
            let value = this.value.replace(/\D/g, '');
            if (value.length > 11) value = value.slice(0, 11);
            
            if (value.length > 9) {
                this.value = value.replace(/(\d{3})(\d{3})(\d{3})(\d{1,2})/, '$1.$2.$3-$4');
            } else if (value.length > 6) {
                this.value = value.replace(/(\d{3})(\d{3})(\d{1,3})/, '$1.$2.$3');
            } else if (value.length > 3) {
                this.value = value.replace(/(\d{3})(\d{1,3})/, '$1.$2');
            } else {
                this.value = value;
            }
        });
    }
    
    const telefoneInput = document.getElementById('telefone');
    if (telefoneInput) {
        telefoneInput.addEventListener('input', function() {
            let value = this.value.replace(/\D/g, '');
            if (value.length > 11) value = value.slice(0, 11);
            
            if (value.length > 10) {
                this.value = value.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
            } else if (value.length > 6) {
                this.value = value.replace(/(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3');
            } else if (value.length > 2) {
                this.value = value.replace(/(\d{2})(\d{0,5})/, '($1) $2');
            } else {
                this.value = value;
            }
        });
    }
    
    const cepInput = document.getElementById('cep');
    if (cepInput) {
        cepInput.addEventListener('input', function() {
            let value = this.value.replace(/\D/g, '');
            if (value.length > 8) value = value.slice(0, 8);
            
            if (value.length > 5) {
                this.value = value.replace(/(\d{5})(\d{1,3})/, '$1-$2');
            } else {
                this.value = value;
            }
        });
    }

    // Formatação dos campos de cartão de crédito
    const numeroCartaoInput = document.getElementById('cartao-numero');
    if (numeroCartaoInput) {
        numeroCartaoInput.addEventListener('input', function() {
            let value = this.value.replace(/\D/g, '');
            if (value.length > 16) value = value.slice(0, 16);
            
            let formattedValue = '';
            for (let i = 0; i < value.length; i++) {
                if (i > 0 && i % 4 === 0) {
                    formattedValue += ' ';
                }
                formattedValue += value[i];
            }
            
            this.value = formattedValue;
        });
    }
    
    const validadeCartaoInput = document.getElementById('cartao-validade');
    if (validadeCartaoInput) {
        validadeCartaoInput.addEventListener('input', function() {
            let value = this.value.replace(/\D/g, '');
            if (value.length > 4) value = value.slice(0, 4);
            
            if (value.length > 2) {
                this.value = value.replace(/(\d{2})(\d{1,2})/, '$1/$2');
            } else {
                this.value = value;
            }
        });
    }
    
    // Validação do formulário completo
    const form = document.getElementById('matricula-form');
    if (form) {
        form.addEventListener('submit', function(event) {
            event.preventDefault();
            
            
            document.querySelectorAll('.error-message').forEach(el => {
                el.textContent = '';
            });
            
            document.querySelectorAll('.error').forEach(el => {
                el.classList.remove('error');
            });
            
            let isValid = true;
            
            // Validar dados pessoais
            const nome = document.getElementById('nome');
            if (!nome.value.trim()) {
                showError(nome, 'erro-nome', 'Nome é obrigatório');
                isValid = false;
            } else if (nome.value.trim().length < 5) {
                showError(nome, 'erro-nome', 'Nome deve ter pelo menos 5 caracteres');
                isValid = false;
            }
            
            const cpf = document.getElementById('cpf');
            if (!cpf.value.trim()) {
                showError(cpf, 'erro-cpf', 'CPF é obrigatório');
                isValid = false;
            } else if (!validarCPF(cpf.value)) {
                showError(cpf, 'erro-cpf', 'CPF inválido');
                isValid = false;
            }
            
            const email = document.getElementById('email');
            if (!email.value.trim()) {
                showError(email, 'erro-email', 'E-mail é obrigatório');
                isValid = false;
            } else if (!validarEmail(email.value)) {
                showError(email, 'erro-email', 'E-mail inválido');
                isValid = false;
            }
            
            const telefone = document.getElementById('telefone');
            if (!telefone.value.trim()) {
                showError(telefone, 'erro-telefone', 'Telefone é obrigatório');
                isValid = false;
            } else if (telefone.value.replace(/\D/g, '').length < 10) {
                showError(telefone, 'erro-telefone', 'Telefone inválido');
                isValid = false;
            }
            
            const dataNascimento = document.getElementById('data-nascimento');
            if (!dataNascimento.value) {
                showError(dataNascimento, 'erro-data-nascimento', 'Data de nascimento é obrigatória');
                isValid = false;
            } else {
                const hoje = new Date();
                const nascimento = new Date(dataNascimento.value);
                const idade = hoje.getFullYear() - nascimento.getFullYear();
                if (idade < 18) {
                    showError(dataNascimento, 'erro-data-nascimento', 'É necessário ter pelo menos 18 anos');
                    isValid = false;
                }
            }
            
            const escolaridade = document.getElementById('escolaridade');
            if (!escolaridade.value) {
                showError(escolaridade, 'erro-escolaridade', 'Escolaridade é obrigatória');
                isValid = false;
            }
            
            // Validar informações profissionais
            const experiencia = document.getElementById('experiencia');
            if (!experiencia.value) {
                showError(experiencia, 'erro-experiencia', 'Experiência é obrigatória');
                isValid = false;
            }
            
            const areaInteresse = document.getElementById('area-interesse');
            if (!areaInteresse.value) {
                showError(areaInteresse, 'erro-area-interesse', 'Área de interesse é obrigatória');
                isValid = false;
            }
            
            const objetivo = document.getElementById('objetivo');
            if (!objetivo.value.trim()) {
                showError(objetivo, 'erro-objetivo', 'Objetivo é obrigatório');
                isValid = false;
            } else if (objetivo.value.trim().length < 10) {
                showError(objetivo, 'erro-objetivo', 'Descreva seu objetivo com pelo menos 10 caracteres');
                isValid = false;
            } else if (objetivo.value.trim().length > 500) {
                showError(objetivo, 'erro-objetivo', 'Seu objetivo deve ter no máximo 500 caracteres');
                isValid = false;
            } else {
               
                const palavrasSignificativas = ['aprender', 'desenvolver', 'criar', 'melhorar', 'conhecer', 'empreender', 
                                               'iniciar', 'startup', 'negócio', 'empresa', 'carreira', 'profissional', 
                                               'habilidade', 'competência', 'mercado', 'tecnologia'];
                const temPalavraSignificativa = palavrasSignificativas.some(palavra => 
                    objetivo.value.toLowerCase().includes(palavra));
                
                if (!temPalavraSignificativa) {
                    showError(objetivo, 'erro-objetivo', 'Por favor, descreva um objetivo válido relacionado ao curso');
                    isValid = false;
                }
            }
            
            // Validar método de pagamento
            if (!metodoPagamento.value) {
                showError(metodoPagamento, 'erro-metodo-pagamento', 'Escolha um método de pagamento');
                isValid = false;
            }
            
            // Validar campos específicos do cartão se este for o método escolhido
            if (metodoPagamento.value === 'cartao') {
                const cartaoNome = document.getElementById('cartao-nome');
                if (!cartaoNome.value.trim()) {
                    showError(cartaoNome, 'erro-cartao-nome', 'Nome no cartão é obrigatório');
                    isValid = false;
                }
                
                const cartaoNumero = document.getElementById('cartao-numero');
                if (!cartaoNumero.value.trim()) {
                    showError(cartaoNumero, 'erro-cartao-numero', 'Número do cartão é obrigatório');
                    isValid = false;
                } else if (cartaoNumero.value.replace(/\D/g, '').length < 16) {
                    showError(cartaoNumero, 'erro-cartao-numero', 'Número do cartão inválido');
                    isValid = false;
                }
                
                const cartaoValidade = document.getElementById('cartao-validade');
                if (!cartaoValidade.value.trim()) {
                    showError(cartaoValidade, 'erro-cartao-validade', 'Validade é obrigatória');
                    isValid = false;
                } else {
                    const [mes, ano] = cartaoValidade.value.split('/');
                    const hoje = new Date();
                    const anoAtual = hoje.getFullYear() % 100;
                    const mesAtual = hoje.getMonth() + 1;
                    
                    if (!mes || !ano || mes < 1 || mes > 12 || ano < anoAtual || (ano == anoAtual && mes < mesAtual)) {
                        showError(cartaoValidade, 'erro-cartao-validade', 'Validade inválida');
                        isValid = false;
                    }
                }
                
                const cartaoCVV = document.getElementById('cartao-cvv');
                if (!cartaoCVV.value.trim()) {
                    showError(cartaoCVV, 'erro-cartao-cvv', 'CVV é obrigatório');
                    isValid = false;
                } else if (cartaoCVV.value.replace(/\D/g, '').length < 3) {
                    showError(cartaoCVV, 'erro-cartao-cvv', 'CVV inválido');
                    isValid = false;
                }
            }
            
           
            const termos = document.getElementById('termos');
            if (!termos.checked) {
                showError(termos, 'erro-termos', 'Você deve aceitar os termos');
                isValid = false;
            }
            
         
            if (!isValid) {
                alert('Por favor, corrija os erros no formulário antes de continuar.');
              
                const firstError = document.querySelector('.error');
                if (firstError) {
                    firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            } else {
              
                const cursoNome = document.getElementById('curso-nome').textContent;
                const nomeAluno = nome.value;
                
                alert(`Matrícula realizada com sucesso!\n\nParabéns, ${nomeAluno}!\nVocê está matriculado no curso ${cursoNome}.\n\nUm e-mail de confirmação foi enviado com todas as informações da sua matrícula.`);
                
              
                console.log('Formulário enviado com sucesso');

            }
        });
    }
    
    // Função auxiliar para mostrar erro nos campos
    function showError(element, errorId, message) {
        element.classList.add('error');
        document.getElementById(errorId).textContent = message;
    }
    
    // Função para validar CPF
    function validarCPF(cpf) {
        cpf = cpf.replace(/[^\d]+/g, '');
        
        if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) return false;
        
        let soma = 0;
        let resto;
        
        for (let i = 1; i <= 9; i++) 
            soma = soma + parseInt(cpf.substring(i-1, i)) * (11 - i);
        resto = (soma * 10) % 11;
        
        if ((resto === 10) || (resto === 11)) resto = 0;
        if (resto !== parseInt(cpf.substring(9, 10))) return false;
        
        soma = 0;
        for (let i = 1; i <= 10; i++) 
            soma = soma + parseInt(cpf.substring(i-1, i)) * (12 - i);
        resto = (soma * 10) % 11;
        
        if ((resto === 10) || (resto === 11)) resto = 0;
        if (resto !== parseInt(cpf.substring(10, 11))) return false;
        
        return true;
    }
    
    // Função para validar email
    function validarEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
    
    // Preencher automaticamente o nome do curso e valor
    const urlParams = new URLSearchParams(window.location.search);
    const cursoId = urlParams.get('curso');
    
    if (cursoId) {
        const cursoInfo = {
            'one': {
                nome: 'Startup One',
                valor: 'R$ 297'
            },
            'plus': {
                nome: 'Startup Plus',
                valor: 'R$ 497'
            },
            'master': {
                nome: 'Startup Master',
                valor: 'R$ 997'
            }
        };
        
        if (cursoInfo[cursoId]) {
            document.getElementById('curso-nome').textContent = cursoInfo[cursoId].nome;
            document.getElementById('curso-valor').textContent = cursoInfo[cursoId].valor;
            document.getElementById('curso-id').value = cursoId;
        }
    }
});
