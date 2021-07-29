import React, { useState } from 'react';

const usePropostaGeralFacade = () => {
  const [step, setStep] = useState(1);
  const [validated, setValidated] = useState(false);
  const [propostaGeral, setPropostaGeral] = useState({
    modalidade: '',
    tipo: '',
    id: null,
    uuid: '',
    edital_resumo: {
      uuid: '',
      titulo: '',
    },
    area_tematica: '',
    titulo: '',
    subTitulo: '',
    objetivoGeral: '',
    periodo_inicio: '',
    periodo_fim: '',
    // movimentacaoFinanceiraExterna: '', // NAO TEM NA API?
    diretrizes_proposta: {
      // TA DIFERENTE NO BACKEND
      pergunta1: '',
      pergunta2: '',
      pergunta3: '',
      pergunta4: '',
      pergunta5: '',
      pergunta6: '',
      pergunta7: '',
      pergunta8: '',
      pergunta9: '',
      pergunta10: '',
      pergunta11: '',
      pergunta12: '',
      pergunta13: '',
      pergunta14: '',
      pergunta15: '',
    },
    carga_horaria: '',
    estado: '', // TA DIFERENTE NA API (UMA STRING COM TODOS OS DADOS DO LOCAL)
    cidade: '', // TA DIFERENTE NA API (UMA STRING COM TODOS OS DADOS DO LOCAL)
    bairro: '', // TA DIFERENTE NA API (UMA STRING COM TODOS OS DADOS DO LOCAL)
    publico_interno: {
      id: null,
      docentes: 0,
      discentes_grad: 0,
      discentes_pos: 0,
      tecs_adm: 0,
      outros: 0,
    },
    publico_externo: {
      id: null,
      servidores_federais: 0,
      discentes_federais: 0,
      servidores_estaduais: 0,
      discentes_estaduais: 0,
      servidores_municipais: 0,
      discentes_municipais: 0,
      organizacoes_privadas: 0,
      movimentos_sociais: 0,
      ongs: 0,
      organizacoes_sindicais: 0,
      grupos_comunitarios: 0,
      outros: 0,
    },
    usuarios_proposta: [],
    info_proposta: {
      email: '',
      telefone: '',
      redes_sociais: {
        instagram: '',
        twitter: '',
        facebook: '',
        youtube: '',
        podcast: '',
        outro: '',
      },
      consideracoes_finais: '',
    },
  });
  const [errors, setErrors] = useState({});

  const [objetivoEspecifico, setObjetivoEspecifico] = useState('');

  const [usuario_proposta, setUsuarioProposta] = useState({
    uuid: '',
    name: '',
    email: '',
    funcao: '',
    carga_horaria: ''
  });

  const [atividade, setAtividade] = useState({
    atividade: '',
    data_inicio: '',
    data_fim: '',
    hora_inicio: '',
    hora_fim: '',
  });

  // Valor do campo de objetivo específico
  const [editandoObjetivo, setEditandoObjetivo] = useState(false);
  const [indexObjetivoEspecifico, setIndexObjetivoEspecifico] = useState(null);
  const [editandoMembro, setEditandoMembro] = useState(false); // Estado auxiliar para detectar quando está ocorrendo uma edição
  const [indexMembro, setIndexMembro] = useState(null);
  const [editandoAtividade, setEditandoAtividade] = useState(false); // Estado auxiliar para detectar quando está ocorrendo uma edição
  const [indexAtividade, setIndexAtividade] = useState(null);

  const handlePropostaGeral = (id, value) => {
    setPropostaGeral({
      ...propostaGeral,
      [id]: value
    })
  }

  return { propostaGeral, handlePropostaGeral}
};

export default usePropostaGeralFacade;
