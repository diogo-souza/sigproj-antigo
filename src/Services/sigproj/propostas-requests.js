import api from './api';

// GET
// Listar todos os usuarios
async function listarUsuarios() {
  try {
    const response = await api.get('/usuarios');
  } catch (error) {
    // // console.log(error)
  }
}
// Retorna dados do usuario logado
async function dadosUsuario() {
  try {
    const response = await api.get('/usuarios/perfil');
  } catch (error) {
    // // console.log(error)
  }
}

// POST
// Cadastrar novo usuario
async function novoUsuario(dados) {
  try {
    const response = await api.post('/usuarios', dados);
  } catch (error) {
    // // console.log(error)
  }
}
// Solicitação Recuperação de senha
async function solicitarNovaSenha(email) {
  try {
    const response = await api.post('/usuarios/recovery-password', { email });
  } catch (error) {
    // // console.log(error)
  }
}
// Alterar Nova Senha
async function alterarNovaSenha(token, novaSenha, confirmarSenha) {
  try {
    const response = await api.post(
      '/usuarios/recovery-token/'.concat({ token }),
      novaSenha,
      ConfirmarSenha,
    );
  } catch (error) {
    // // console.log(error)
  }
}
// Solicitar Refresh Token
async function refreshToken() {
  try {
    const response = await api.post('/usuarios/refresh-token');
  } catch (error) {
    // // console.log(error)
  }
}

// PUT
// Atualizar qualquer usuario
async function atualizarUsuario() {
  try {
    const response = await api.put('/usuarios');
  } catch (error) {
    // // console.log(error)
  }
}
