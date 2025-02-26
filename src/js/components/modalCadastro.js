fetch('../../src/html/components/modalCadastro.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById('my-modalCadastro-importacao').innerHTML = data;
        
        // Função para o cadastro (mostrar/ocultar senha)
        const toggleRegisterPassword = document.querySelector('#toggleRegisterPassword');
        const passwordCadastroInput = document.querySelector('#passwordCadastroInput');
        const registerEyeIcon = document.querySelector('#registerEyeIcon');

        toggleRegisterPassword.addEventListener('click', function () {
            const type = passwordCadastroInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordCadastroInput.setAttribute('type', type);
            registerEyeIcon.classList.toggle('fa-eye');
            registerEyeIcon.classList.toggle('fa-eye-slash');
        });
    })
    .catch(error => console.error('Erro ao carregar a página:', error));