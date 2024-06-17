document.addEventListener('DOMContentLoaded', function() {
    let calculo = document.getElementById('calculo');
    let resultado = document.getElementById('resultado');
    let historicoLista = document.getElementById('historico-lista');
    let operacao = '';
    let valorAtual = '';
    let novoCalculo = false;

    function atualizarDisplay() {
        calculo.textContent = operacao || '0';
        resultado.textContent = valorAtual || '0';
    }

    function adicionarAoHistorico(expressao, resultado) {
        let itemHistorico = document.createElement('li');
        itemHistorico.textContent = `${expressao} = ${resultado}`;
        historicoLista.appendChild(itemHistorico);
    }

    document.querySelectorAll('.botoes button').forEach(button => {
        button.addEventListener('click', function() {
            let textoBotao = this.textContent;

            if (!isNaN(textoBotao) || textoBotao === '.') {
                if (novoCalculo) {
                    valorAtual = textoBotao;
                    novoCalculo = false;
                } else {
                    valorAtual += textoBotao;
                }
            } else if (textoBotao === 'CE') {
                operacao = '';
                valorAtual = '';
            } else if (textoBotao === 'C') {
                valorAtual = '';
            } else if (textoBotao === '+/-') {
                valorAtual = String(-parseFloat(valorAtual));
            } else if (textoBotao === '%') {
                valorAtual = String(parseFloat(valorAtual) / 100);
            } else if (textoBotao === '÷' || textoBotao === 'x' || textoBotao === '-' || textoBotao === '+') {
                if (operacao && valorAtual) {
                    operacao += ` ${valorAtual} ${textoBotao}`;
                } else {
                    operacao = `${valorAtual} ${textoBotao}`;
                }
                valorAtual = '';
            } else if (textoBotao === '=') {
                if (operacao && valorAtual) {
                    operacao += ` ${valorAtual}`;
                    let resultadoFinal = eval(operacao.replace('÷', '/').replace('x', '*'));
                    adicionarAoHistorico(operacao, resultadoFinal);
                    valorAtual = String(resultadoFinal);
                    operacao = '';
                    novoCalculo = true;
                }
            }

            atualizarDisplay();
        });
    });

    document.querySelector('.reset-button').addEventListener('click', function() {
        historicoLista.innerHTML = '';
    });

    atualizarDisplay();
});
