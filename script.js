let currentLevel = 0;

/**
 * This function transforms const and let into var.
 * @param {*} value
 * @returns
 */
const updateConstOrLet = (value) => {
  const updatedCode = value.replace(/\b(const|let)\b/g, "var");
  return updatedCode;
};

const levels = [
  {
    story:
      "Peter Parker deve desativar uma bomba. Defina a variável de tempo de desativação corretamente para salvar o dia!",
    instructions:
      "Declare uma variável chamada `tempoDesativacao` e atribua o valor `10`.",
    validate: function () {
      try {
        const codeReturn = updateConstOrLet(
          document.getElementById("code-input").value
        );
        eval(codeReturn);

        return (
          typeof tempoDesativacao !== "undefined" && tempoDesativacao === 10
        );
      } catch (error) {
        return false;
      }
    },
  },
  {
    story:
      "Peter precisa hackear uma rede de drones inimigos. Ele deve escrever um loop para desativar todos os drones.",
    instructions:
      "Use um loop `for` para desativar 5 drones e imprimir 'Drone desativado' para cada um.",
    validate: function () {
      let log = console.log;
      let output = [];
      console.log = function (message) {
        output.push(message);
      };
      try {
        eval(document.getElementById("code-input").value);
      } catch (e) {
        console.log = log;
        throw e;
      }
      console.log = log;
      return (
        output.length === 5 && output.every((msg) => msg === "Drone desativado")
      );
    },
  },
  {
    story:
      "Peter deve modificar o conteúdo de uma página da web para encontrar pistas escondidas pelos vilões.",
    instructions:
      "Use JavaScript para criar um elemento `<p>` com id `mensagem` e definir seu texto para 'Pista encontrada!'. \n E por último insira este paragrafo no elemento #test-container deste site",
    validate: function () {
      const container = document.getElementById("test-container");
      container.innerHTML = "";

      try {
        eval(document.getElementById("code-input").value);
        const pElement = container.querySelector("#mensagem");
        return pElement && pElement.innerText === "Pista encontrada!";
      } catch (e) {
        throw e;
      }
    },
  },
  {
    story:
      "Peter precisa decifrar um código complexo para acessar um sistema de segurança.",
    instructions:
      "Escreva uma função chamada `decifrarCodigo` que retorna a string 'Código decifrado!'.",
    validate: function () {
      try {
        const codeReturn = updateConstOrLet(
            document.getElementById("code-input").value
        );
        eval(codeReturn);
        return (
          typeof decifrarCodigo !== "undefined" &&
          decifrarCodigo() === "Código decifrado!"
        );
      } catch (error) {
        return false;
      }
    },
  },
];

function loadLevel(level) {
    document.getElementById('story-text').innerText = levels[level].story;
    document.getElementById('instructions-text').innerText = levels[level].instructions;
    document.getElementById('code-input').value = "// Escreva seu código aqui";
    document.getElementById('output-message').innerText = "Saída do jogo será exibida aqui.";
    document.getElementById('next-level').style.display = 'none';
}

document.getElementById('run-code').addEventListener('click', function() {
    const codeInput = document.getElementById('code-input').value;
    let success = false;

    try {
        eval(codeInput);
        success = levels[currentLevel].validate();
    } catch (error) {
        document.getElementById('output-message').innerText = 'Erro no código: ' + error.message;
        return;
    }

    if (success) {
        document.getElementById('output-message').innerText = 'Parabéns! Você completou o nível.';
        document.getElementById('next-level').style.display = 'block';
    } else {
        document.getElementById('output-message').innerText = 'Tente novamente.';
    }
});

document.getElementById('next-level').addEventListener('click', function() {
    currentLevel++;
    if (currentLevel < levels.length) {
        loadLevel(currentLevel);
    } else {
        document.getElementById('game-story').innerText = 'Parabéns! Você completou todos os níveis.';
        document.getElementById('game-instructions').style.display = 'none';
        document.getElementById('game-input').style.display = 'none';
        document.getElementById('game-output').style.display = 'none';
        document.getElementById('next-level').style.display = 'none';
    }
});

loadLevel(currentLevel);
