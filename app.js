let listaNumSorteados = [];
let numeroMaximo = 2;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;

function inserirTextos(tag, texto) {
    let campo = document.querySelector (tag);
    campo.innerHTML = texto;
     if ('speechSynthesis' in window) {
        let utterance = new SpeechSynthesisUtterance(texto);
        utterance.lang = 'pt-BR'; 
        utterance.rate = 1; 
        window.speechSynthesis.speak(utterance); 
    } else {
        console.log("Web Speech API não suportada neste navegador.");
    }
}
 
function mensagemInicial() {
    inserirTextos ('h1', 'Jogo do número secreto');
    inserirTextos ('p', 'Escolha um número entre 1 e 10');
}

mensagemInicial();

function verificarChute() {
    let chute = document.querySelector('input').value;
    if (chute == numeroSecreto) {
        let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
        let mensagemAceto = `Você descobriu o número secreto com ${tentativas} ${palavraTentativa}.`;
        inserirTextos('h1', 'Acertou!');
        inserirTextos('p', mensagemAceto);
        console.log ('Usuário acertou');

        // habilitar botão de reniciar quando usuário ganhar jogo
        document.getElementById ('reiniciar').removeAttribute ('disabled');
    } else {
        if (numeroSecreto > chute) {
            inserirTextos('p', `O número secreto é maior que ${chute}`);
        } else {
            inserirTextos('p', `O número secreto é menor que ${chute}`);
        }
        console.log (`Usuário fez tentiva ${tentativas}`);
        tentativas++;
        limparCampo();
    }

}

function gerarNumeroAleatorio() {
    let numeroSorteado = parseInt(Math.random() * numeroMaximo + 1);
    let quantidadeDeElementosNaLista = listaNumSorteados.length;

    // limpar lista quando atingir número máximo de elementos
    if (quantidadeDeElementosNaLista == numeroMaximo) {
        listaNumSorteados = [];
    }

    // não repetir o número sorteado
    if (listaNumSorteados.includes(numeroSorteado)) {
       return gerarNumeroAleatorio();
    } else {
        listaNumSorteados.push(numeroSorteado);
        return parseInt(numeroSorteado);
    }
}

function limparCampo() {
    chute = document.querySelector('input');
    chute.value = '';
}

function reiniciarJogo() {
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 1
    mensagemInicial();
    document.getElementById ('reiniciar').setAttribute('disabled', true);
    console.log ('Usuário reiniciou o jogo');
    console.log (`Numeros sorteados: ${listaNumSorteados}`);
}