fetch('../../src/html/components/modalPerfil.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById('my-modalPerfil-importacao').innerHTML = data;

        /* Script Perfil Mostrar Senha */
        document.getElementById('perfilTogglePassword').addEventListener('click', function () {
            const passwordField = document.getElementById('perfilPassword');
            const icon = this;
            if (passwordField.textContent === '******') {
                passwordField.textContent = 'senha123';
                icon.classList.remove('fa-eye');
                icon.classList.add('fa-eye-slash');
            } else {
                passwordField.textContent = '******';
                icon.classList.remove('fa-eye-slash');
                icon.classList.add('fa-eye');
            }
        });

        // Script Formulário Mostrar Senha
        const togglePerfilPassword = document.querySelector('#togglePerfilPassword');
        const passwordPerfilInput = document.querySelector('#passwordPerfilInput');
        const perfilEyeIcon = document.querySelector('#perfilEyeIcon');
        togglePerfilPassword.addEventListener('click', function () {
            const type = passwordPerfilInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordPerfilInput.setAttribute('type', type);
            perfilEyeIcon.classList.toggle('fa-eye');
            perfilEyeIcon.classList.toggle('fa-eye-slash');
        });

        // Script Aumentar Textarea Quando Usuario Digita
        document.getElementById('descricaoProblemaInputPerfil').addEventListener('input', function () {
            this.style.height = 'auto';
            this.style.height = (this.scrollHeight) + 'px';
        });

    })
    .catch(error => console.error('Erro ao carregar a página:', error));