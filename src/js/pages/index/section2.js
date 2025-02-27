fetch('../../src/html/pages/index/section2.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById('my-index-s2-importacao').innerHTML = data;

        /* Script Index Section 2 */

    })
    .catch(error => console.error('Erro ao carregar a página:', error));