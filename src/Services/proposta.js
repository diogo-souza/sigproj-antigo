export const saveProposta = (proposta, values) => {
  let propostasSalvas;
  if (localStorage.getItem('propostas-salvas') !== null) {
    propostasSalvas = JSON.parse(localStorage.getItem('propostas-salvas'));
  }
  propostasSalvas = {
    ...propostasSalvas,
    [proposta]: values
  }
  localStorage.setItem('propostas-salvas', JSON.stringify(propostasSalvas));
}
