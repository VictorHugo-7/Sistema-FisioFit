fetch('../../html/components/modalPerfil.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById('my-modalPerfil-importacao').innerHTML = data;
    })
    .catch(error => console.error('Erro ao carregar a página:', error));