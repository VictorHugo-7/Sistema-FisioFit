fetch('../../html/components/modalLogin.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById('my-modalLogin-importacao').innerHTML = data;
        // Configura o botão de alternância de senha
        const toggleLoginPassword = document.querySelector('#toggleLoginPassword');
        const loginPassword = document.querySelector('#loginPassword');
        const loginEyeIcon = document.querySelector('#loginEyeIcon');

        if (toggleLoginPassword && loginPassword && loginEyeIcon) {
            toggleLoginPassword.addEventListener('click', function () {
                const type = loginPassword.getAttribute('type') === 'password' ? 'text' : 'password';
                loginPassword.setAttribute('type', type);
                loginEyeIcon.classList.toggle('fa-eye');
                loginEyeIcon.classList.toggle('fa-eye-slash');
            });
        }
    })
    .catch(error => console.error('Erro ao carregar a página:', error));