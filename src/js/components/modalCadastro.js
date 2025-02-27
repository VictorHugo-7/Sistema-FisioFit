fetch('../../src/html/components/modalCadastro.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById('my-modalCadastro-importacao').innerHTML = data;

        // Script Mostrar Senha
        const toggleRegisterPassword = document.querySelector('#toggleRegisterPassword');
        const passwordCadastroInput = document.querySelector('#passwordCadastroInput');
        const registerEyeIcon = document.querySelector('#registerEyeIcon');
        toggleRegisterPassword.addEventListener('click', function () {
            const type = passwordCadastroInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordCadastroInput.setAttribute('type', type);
            registerEyeIcon.classList.toggle('fa-eye');
            registerEyeIcon.classList.toggle('fa-eye-slash');
        });

        // Script Aumentar Textarea Quando Usuario Digita
        document.getElementById('descricaoProblemaInputCadastro').addEventListener('input', function () {
            this.style.height = 'auto';
            this.style.height = (this.scrollHeight) + 'px';
        });

    })
    .catch(error => console.error('Erro ao carregar a página:', error));