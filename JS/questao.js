function exibirMail() {
    let usuario = localStorage.getItem("usuario");
    //if (usuario) {
    //  usuario.mail = JSON.parse(usuario);
    //  document.getElementById("email").innerText = usuario.mail;
    //}
    //   }
}
function listarQuestao() {
    // Verifica se o usuário está logado
    if (usuarioLogado) {
      document.getElementById("btnLogin").style.display="none"
  
    } else {
        document.getElementById("botao-logout").style.display="none"
        document.getElementById("saida").innerHTML =
       "<p>O usuário não está logado. Clique para efetuar o <a href='./login.html'>login</a>.</p>";
        const mensagem = "Usuário não logado, realize o login para continuar";
        alert(mensagem);
    }
}

async function enviarRespostas() {
  // Obtém o usuário logado
  const usuario = localStorage.getItem('usuario');
  if (!usuario) {
    alert('Usuário não está logado.');
    console.log('Usuário não encontrado no localStorage');
    return;
  }

  // Converte o usuário de volta para um objeto (presumindo que foi salvo como JSON)
  const usuarioObj = JSON.parse(usuario);
  console.log('Usuário encontrado:', usuarioObj);

  // Coleta as respostas das questões
  const respostas = [
    {
      idquestao: 1,
      resposta_aluno: document.getElementById('questao1_true').checked, // Verifica se o "verdadeiro" está marcado
    },
    {
      idquestao: 2,
      resposta_aluno: document.getElementById('questao2_true').checked,
    },
    {
      idquestao: 3,
      resposta_aluno: document.getElementById('questao3_true').checked,
    },
  ];

  // Adiciona log para verificar as respostas coletadas
  console.log('Respostas coletadas:', respostas);

  // Prepara o corpo da requisição
  const requestBody = {
    idusuario: usuarioObj.idusuario, // ID do usuário
    respostas: respostas, // Array com as respostas coletadas
  };

  // Adiciona log para verificar o corpo da requisição
  console.log('Corpo da requisição:', requestBody);

  try {
    // Envia as respostas para o backend via fetch
    const response = await fetch('http://localhost:3000/submit-questoes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(requestBody),
    });

    // Adiciona log para verificar o status da requisição
    console.log('Status da resposta:', response.status);

    // Verifica a resposta do servidor
    const data = await response.json();
    if (response.ok) {
      alert('Respostas enviadas com sucesso!');
      console.log(data); // Exibe os resultados no console
    } else {
      alert(`Erro: ${data.message}`); // Exibe mensagem de erro, caso ocorra
    }
  } catch (error) {
    console.error('Erro ao enviar respostas:', error);
  }
}


  