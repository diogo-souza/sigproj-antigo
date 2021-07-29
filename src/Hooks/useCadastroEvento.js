/* eslint-disable object-shorthand */
/* eslint-disable camelcase */
import React, { useState } from 'react';
import { cargaHoraria } from './utils';
import { UserContext } from '../Services/UserContext';

const useCadastroEvento = () => {
  const { userSession } = React.useContext(UserContext);
  const [step, setStep] = useState(1);
  const [validated, setValidated] = useState(false);
  const [values, setValues] = useState({
    modalidade: 'Evento',
    tipo: 'Evento de Extensão',
    id: null,
    uuid: '',
    edital_resumo: {
      uuid: '',
      titulo: '',
    },

    cpf: userSession.cpf,
    nome: userSession.nome,
    centro: userSession.centro,
    departamento: userSession.departamento,
    cargo: userSession.tipo_institucional,
    categoria: userSession.categoria,
    email: userSession.email,
    telefone: userSession.telefone,

    titulo: '',
    subTitulo: '',
    objetivoGeral: '',
    atividades: [],
    periodo_inicio: '',
    periodo_fim: '',
    movimentacaoFinanceiraExterna: '',
    objetivosEspecificos: [],
    diretrizes_proposta: {
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
    cronograma: {
      atividades_planejamento: [],
      atividades_avaliacao: [],
    },
    periodoExecucao: '',
    carga_horaria: 0,
    local_estado: '',
    cidade: '',
    bairro: '',
    publico_interno: {
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
      telefone: '',
      email: '',
      instagram: '',
      twitter: '',
      facebook: '',
      youtube: '',
      podcast: '',
      consideracoes_finais: '',
      outro: '',
    },
  });
  const [errors, setErrors] = useState({});

  const [objetivoEspecifico, setObjetivoEspecifico] = useState('');

  const [membro, setMembro] = useState({
    cpf: '',
    email: '',
    nome: '',
    funcao: '',
    carga_horaria: 0,
    tipo: '',
  });

  const [atividade, setAtividade] = useState({
    atividades: '',
    data_inicio: '',
    data_fim: '',
    hora_inicio: '',
    hora_fim: '',
  });

  const [planejamento, setPlanejamento] = useState({
    atividades: '',
    data_inicio: '',
    data_fim: '',
    horas_semanais: '',
  });

  const [avaliacao, setAvaliacao] = useState({
    atividades: '',
    data_inicio: '',
    data_fim: '',
    horas_semanais: '',
  });
  // console.log(objetivoEspecifico);
  const [editandoObjetivo, setEditandoObjetivo] = useState(false);
  const [indexObjetivoEspecifico, setIndexObjetivoEspecifico] = useState(null);
  const [editandoMembro, setEditandoMembro] = useState(false); // Estado auxiliar para detectar quando está ocorrendo uma edição
  const [indexMembro, setIndexMembro] = useState(null);
  const [editandoAtividade, setEditandoAtividade] = useState(false); // Estado auxiliar para detectar quando está ocorrendo uma edição
  const [indexAtividade, setIndexAtividade] = useState(null);
  const [editandoPlanejamento, setEditandoPlanejamento] = useState(false); // Estado auxiliar para detectar quando está ocorrendo uma edição
  const [indexPlanejamento, setIndexPlanejamento] = useState(null);
  const [editandoAvaliacao, setEditandoAvaliacao] = useState(false); // Estado auxiliar para detectar quando está ocorrendo uma edição
  const [indexAvaliacao, setIndexAvaliacao] = useState(null);

  const handleMembro = (e) => {
    let { id, value, valueAsNumber } = e.target;
    setMembro({
      ...membro,
      [id]: value,
    });
  };

  const handleObjetivoEspecifico = (e) => {
    const { value, id } = e.target;
    setObjetivoEspecifico(value);
  };

  const handleAtividade = (e) => {
    const { value, id } = e.target;
    setAtividade({
      ...atividade,
      [id]: value,
    });
  };

  const handleBlur = (e) => {
    const { id, value, name } = e.target;
    // Salva o objetivo específico em values, com as novas descrções
    if (
      id === 'atividades' ||
      id === 'mes' ||
      id === 'cargaHoraria' ||
      id === 'descricao'
    ) {
      let objEspecificos = values.objetivosEspecificos;
      const index = parseInt(name, 10);
      objEspecificos[index] = objetivoEspecifico;
      setValues({
        ...values,
        objetivosEspecificos: objEspecificos,
      });
    }
  };

  const handleChanges = (e) => {
    const { id, title, name, value } = e.target;
    // Usando title porque botões não têm o atributo value,
    // então o valor precisa ser armazenado no id, e o id no title
    if (title === 'modalidade') {
      setValues({
        ...values,
        [title]: id,
      });
    } else if (title === 'edital') {
      setValues({
        ...values,
        edital_resumo: {
          ...values.edital_resumo,
          uuid: id,
          titulo: name,
        },
      });
    } else if (id === 'add-objetivo-especifico') {
      let { objetivosEspecificos } = values;
      const propertyName = 'objetivosEspecificos';
      objetivosEspecificos.push(objetivoEspecifico);
      setValues({
        ...values,
        [propertyName]: objetivosEspecificos,
      });
      setObjetivoEspecifico('');
    } else if (id === 'edit-objetivo-especifico') {
      let { objetivosEspecificos } = values;
      const propertyName = 'objetivosEspecificos';
      objetivosEspecificos[indexObjetivoEspecifico] = objetivoEspecifico;
      setValues({
        ...values,
        [propertyName]: objetivosEspecificos,
      });
      setObjetivoEspecifico('');
      setEditandoObjetivo(false);
    } else if (id.includes('pergunta')) {
      let { diretrizes_proposta } = values;
      const pergunta = id;
      diretrizes_proposta[pergunta] = value;
      setValues({
        ...values,
        diretrizes_proposta: {
          ...diretrizes_proposta,
          [id]: value,
        },
      });
    } else if (title === 'publico_externo') {
      let { publico_externo } = values;
      setValues({
        ...values,
        publico_externo: {
          ...publico_externo,
          [id]: Number(value),
        },
      });
    } else if (title === 'publico_interno') {
      let { publico_interno } = values;
      setValues({
        ...values,
        publico_interno: {
          ...publico_interno,
          [id]: Number(value),
        },
      });
    } else if (title === 'cronograma') {
      let { cronograma } = values;
      const cronogramaId = id;
      cronograma[cronogramaId] = value;
      setValues({
        ...values,
        cronograma: {
          ...cronograma,
          [id]: value,
        },
      });
      setValues({
        ...values,
        periodoExecucao: `${values.cronograma.inicio_planejamento}a${values.cronograma.fim_avaliacao}`,
        periodo_inicio: values.cronograma.inicio_planejamento,
        periodo_fim: values.cronograma.fim_avaliacao,
      });
    } else if (id === 'add-usuario_proposta') {
      let { usuarios_proposta } = values;
      let novosMembros = usuarios_proposta;
      novosMembros.push(membro);

      setValues({
        ...values,
        usuarios_proposta: novosMembros,
      });
      // Ao adicionar o projeto da tabela, é necessário limpar os campos de preenchimento
      setMembro({
        cpf: '',
        email: '',
        nome: '',
        funcao: '',
        carga_horaria: 0,
        tipo: '',
      });
    } else if (id === 'edit-usuario_proposta') {
      let { usuarios_proposta } = values;
      let novosMembros = usuarios_proposta;
      novosMembros[indexMembro] = membro;
      setValues({
        ...values,
        usuarios_proposta: novosMembros,
      });
      // Ao editar o projeto da tabela, é necessário limpar os campos de preenchimento
      setMembro({
        cpf: '',
        email: '',
        nome: '',
        funcao: '',
        carga_horaria: 0,
        tipo: '',
      });
      setEditandoMembro(false);
    } else if (title === 'info_proposta') {
      setValues({
        ...values,
        info_proposta: {
          ...values.info_proposta,
          [id]: value,
        },
      });
    } else if (id === 'add-atividades') {
      let { atividades } = values;
      const propertyName = 'atividades';
      atividades.push(atividade);
      setValues({
        ...values,
        [propertyName]: atividades,
      });
      let ch = cargaHoraria(values);

      setValues({
        ...values,
        carga_horaria: ch,
      });

      setAtividade({
        atividades: '',
        data_inicio: '',
        data_fim: '',
        hora_inicio: '',
        hora_fim: '',
      });
    } else if (id === 'edit-atividades') {
      let { atividades } = values;
      const propertyName = 'atividades';
      atividades[indexAtividade] = atividade;
      setValues({
        ...values,
        [propertyName]: atividades,
      });
      setAtividade({
        atividades: '',
        data_inicio: '',
        data_fim: '',
        hora_inicio: '',
        hora_fim: '',
      });
      setEditandoAtividade(false);
    } else if (id === 'add-planejamentos') {
      let { cronograma } = values;
      const propertyName = 'cronograma';
      cronograma.atividades_planejamento.push(planejamento);
      setValues({
        ...values,
        [propertyName]: cronograma,
      });
      setPlanejamento({
        atividade: '',
        data_inicio: '',
        data_fim: '',
        horas_semanais: '',
      });
    } else if (id === 'edit-planejamentos') {
      let { cronograma } = values;
      cronograma.atividades_planejamento[indexPlanejamento] = planejamento;
      setValues({
        ...values,
        planejamento: planejamento,
      });
      setPlanejamento({
        atividades: '',
        data_inicio: '',
        data_fim: '',
        horas_semanais: '',
      });
      setEditandoPlanejamento(false);
    } else if (id === 'add-avaliacoes') {
      let { cronograma } = values;
      const propertyName = 'cronograma';
      cronograma.atividades_avaliacao.push(avaliacao);
      setValues({
        ...values,
        [propertyName]: cronograma,
      });
      setAvaliacao({
        atividades: '',
        data_inicio: '',
        data_fim: '',
        horas_semanais: '',
      });
    } else if (id === 'edit-avaliacoes') {
      let { cronograma } = values;
      cronograma.atividades_avaliacao[indexAvaliacao] = avaliacao;
      setValues({
        ...values,
        avaliacao: avaliacao,
      });
      setAvaliacao({
        atividades: '',
        data_inicio: '',
        data_fim: '',
        horas_semanais: '',
      });
      setEditandoAvaliacao(false);
    } else {
      setValues({
        ...values,
        [id]: value,
      });
    }
  };

  const editAtividade = (e) => {
    const { id } = e.target;
    let { atividades } = values;
    const atividade = atividades.filter(
      (element, index) => index.toString() === id,
    );
    setAtividade(atividade[0]);
    setEditandoAtividade(true);
    setIndexAtividade(parseInt(id, 10));
  };

  const deleteAtividade = (e) => {
    const { id } = e.target;
    const propertyName = 'atividades';
    let { atividades } = values;
    atividades.splice(id, 1);
    setValues({
      ...values,
      [propertyName]: atividades,
    });
    if (parseInt(id, 10) === parseInt(indexObjetivoEspecifico, 10)) {
      setAtividade({
        atividades: '',
        data_inicio: '',
        data_fim: '',
        horas_semanais: '',
      });
      setEditandoAtividade(false);
    }
  };

  const editObjetivo = (e) => {
    const { id } = e.target;
    let { objetivosEspecificos } = values;
    const objetivo = objetivosEspecificos.filter(
      (element, index) => index.toString() === id,
    );
    setObjetivoEspecifico(objetivo[0]);
    setEditandoObjetivo(true);
    setIndexObjetivoEspecifico(parseInt(id, 10));
  };

  const deleteObjetivo = (e) => {
    const { id } = e.target;
    let { objetivosEspecificos } = values;
    const propertyName = 'objetivosEspecificos';
    objetivosEspecificos.splice(id, 1);
    setValues({
      ...values,
      [propertyName]: objetivosEspecificos,
    });
    if (parseInt(id, 10) === parseInt(indexObjetivoEspecifico, 10)) {
      setObjetivoEspecifico('');
      setEditandoObjetivo(false);
    }
  };

  const deleteMembro = (e) => {
    const { id } = e.target;
    let { usuarios_proposta } = values;
    usuarios_proposta.splice(id, 1);
    setValues({
      ...values,
      usuarios_proposta: usuarios_proposta,
    });
    // Caso o usuarios_proposta a ser deletado seja o usuarios_proposta em edição,
    // os campos serão limpos e o estado editandoMembro voltará para fale
    if (parseInt(id, 10) === parseInt(indexMembro, 10)) {
      setMembro({
        cpf: '',
        email: '',
        nome: '',
        funcao: '',
        carga_horaria: 0,
        tipo: '',
      });
      setEditandoMembro(false);
    }
  };

  const editMembro = (e) => {
    const { id } = e.target; // Index do projeto
    let { usuarios_proposta } = values;
    // Pega o projeto no array de objetos (values.projetos)
    const usuario_proposta = usuarios_proposta.filter(
      (element, index) => index.toString() === id,
    );
    // Seta os campos de edição do projeto com os valores atuais dele,
    // para que os valores possam ser modificados
    setMembro({
      cpf: usuario_proposta[0].cpf,
      nome: usuario_proposta[0].nome,
      funcao: usuario_proposta[0].funcao,
      carga_horaria: usuario_proposta[0].carga_horaria,
      email: usuario_proposta[0].email,
      tipo: usuario_proposta[0].tipo,
    });
    setEditandoMembro(true);
    setIndexMembro(parseInt(id, 10));
  };

  const handlePlanejamento = (e) => {
    let { value, id } = e.target;
    if (id === 'horas_semanais') {
      value = parseInt(value, 10);
    }
    setPlanejamento({
      ...planejamento,
      [id]: value,
    });
  };

  const editPlanejamento = (e) => {
    const { id } = e.target;
    let { cronograma } = values;
    const planejamento = cronograma.atividades_planejamento.filter(
      (element, index) => index.toString() === id,
    );
    // // console.log(planejamento);
    setPlanejamento(planejamento[0]);
    setEditandoPlanejamento(true);
    setIndexPlanejamento(parseInt(id, 10));
  };

  const deletePlanejamento = (e) => {
    const { id } = e.target;
    let { cronograma } = values;
    cronograma.atividades_planejamento.splice(id, 1);
    setValues({
      ...values,
      cronograma: cronograma,
    });
  };

  const handleAvaliacao = (e) => {
    let { value, id } = e.target;
    if (id === 'horas_semanais') {
      value = parseInt(value, 10);
    }
    setAvaliacao({
      ...avaliacao,
      [id]: value,
    });
  };

  const editAvaliacao = (e) => {
    const { id } = e.target;
    let { cronograma } = values;
    const avaliacao = cronograma.atividades_avaliacao.filter(
      (element, index) => index.toString() === id,
    );
    // // console.log(avaliacao);
    setAvaliacao(avaliacao[0]);
    setEditandoAvaliacao(true);
    setIndexAvaliacao(parseInt(id, 10));
  };

  const deleteAvaliacao = (e) => {
    const { id } = e.target;
    let { cronograma } = values;
    cronograma.atividades_avaliacao.splice(id, 1);
    setValues({
      ...values,
      cronograma: cronograma,
    });
  };

  return {
    step,
    setStep,

    values,
    setValues,

    objetivoEspecifico,
    editandoObjetivo,
    handleObjetivoEspecifico,
    editObjetivo,
    deleteObjetivo,

    validated,
    errors,

    membro,
    editandoMembro,
    handleMembro,
    deleteMembro,
    editMembro,

    atividade,
    editandoAtividade,
    handleAtividade,
    deleteAtividade,
    editAtividade,

    planejamento,
    editandoPlanejamento,
    handlePlanejamento,
    deletePlanejamento,
    editPlanejamento,

    avaliacao,
    editandoAvaliacao,
    handleAvaliacao,
    editAvaliacao,
    deleteAvaliacao,

    handleBlur,
    setValidated,
    setErrors,

    handleChanges,
  };
};

export default useCadastroEvento;
