import React, { useState, useEffect } from 'react';
import { UserContext } from '../Services/UserContext';

const useCadastroCurso = () => {
  const { userSession } = React.useContext(UserContext);
  const [step, setStep] = useState(1);
  const [validated, setValidated] = useState(false);
  const [values, setValues] = useState({
    modalidade: 'Curso',
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

    tipo: '',
    areaTematica: '',
    movimentacaoFinanceiraExterna: '',

    titulo: '',
    subtitulo: '',
    ementa: '',
    objetivoGeral: '',
    objetivos_especificos: [],
    aulas: [],

    cronograma: {
      atividades_planejamento: [],
      atividades_execucao: [],
      atividades_avaliacao: [],
    },
    estado: '',
    cidade: '',
    bairro: '',
    endereco: '',

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
      outros: '',
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

    periodoAvaliacao: '',
    cargaHorariaTotal: '',
  });

  const [errors, setErrors] = useState({});

  const [editandoMembro, setEditandoMembro] = useState(false); // Estado auxiliar para detectar quando está ocorrendo uma edição
  const [indexMembro, setIndexMembro] = useState(null);

  // curso
  const [curso, setCurso] = useState({
    titulo: '',
    conteudo: '',
  });

  const [editandoCurso, setEditandoCurso] = useState(false);
  const [indexCurso, setIndexCurso] = useState(null);

  const handleCurso = (e) => {
    const { id, value } = e.currentTarget;
    setCurso({
      ...curso,
      [id]: value,
    });
  };

  const editCurso = (e) => {
    const { id } = e.target;
    let { aulas } = values;

    const curso = aulas.filter((element, index) => index.toString() === id);

    setCurso(curso[0]);
    setEditandoCurso(true);
    setIndexCurso(parseInt(id, 10));
  };

  const deleteCurso = (e) => {
    const { id } = e.target;
    let { aulas } = values;
    aulas.splice(id, 1);
    setValues({
      ...values,
      aulas,
    });
  };

  // Objetivo Específico

  const [objetivo_especifico, setObjetivoEspecifico] = useState('');

  const [indexObjetivoEspecifico, setIndexObjetivoEspecifico] = useState(null);

  const [editandoObjetivo, setEditandoObjetivo] = useState(false);

  const editObjetivo = (e) => {
    const { id } = e.currentTarget;
    let { objetivos_especificos } = values;
    const objetivo = objetivos_especificos.filter(
      (element, index) => index.toString() === id,
    );
    setObjetivoEspecifico(objetivo[0]);
    setEditandoObjetivo(true);
    setIndexObjetivoEspecifico(parseInt(id, 10));
  };

  const handleObjetivoEspecifico = (e) => {
    const { value, id } = e.currentTarget;
    setObjetivoEspecifico(value);
  };

  const deleteObjetivo = (e) => {
    const { id } = e.target;
    let { objetivos_especificos } = values;
    const propertyName = 'objetivos_especificos';
    objetivos_especificos.splice(id, 1);
    setValues({
      ...values,
      [propertyName]: objetivos_especificos,
    });
    if (parseInt(id, 10) === parseInt(indexObjetivoEspecifico, 10)) {
      setObjetivoEspecifico('');
      setEditandoObjetivo(false);
    }
  };

  const handleBlur = (e) => {
    const { id, value, name } = e.currentTarget;
    // Salva o objetivo específico em values, com as novas descrções
    if (
      id === 'atividades' ||
      id === 'data' ||
      id === 'cargaHoraria' ||
      id === 'descricao'
    ) {
      let objEspecificos = values.objetivos_especificos;
      const index = parseInt(name, 10);
      objEspecificos[index] = objetivo_especifico;
      setValues({
        ...values,
        objetivos_especificos: objEspecificos,
      });
    } else if (id === 'titulo' || id === 'conteudo') {
      let aulas_curso = values.aulas;
      const index = parseInt(name, 10);
      aulas_curso[index] = curso;
      setValues({
        ...values,
        aulas: aulas_curso,
      });
    }
  };

  // AcaoCurso2 planejamento
  const [planejamento, setPlanejamento] = useState({
    atividades: '',
    data_inicio: '',
    data_fim: '',
    horas_semanais: '',
  });

  const [editandoPlanejamento, setEditandoPlanejamento] = useState(false); // Estado auxiliar para detectar quando está ocorrendo uma edição
  const [indexPlanejamento, setIndexPlanejamento] = useState(null);

  const handlePlanejamento = (e) => {
    const { value, id } = e.target;
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
      cronograma,
    });
  };

  // AcaoCurso2 execução
  const [execucao, setExecucao] = useState({
    atividades: '',
    data_inicio: '',
    data_fim: '',
    horas_semanais: '',
  });

  const [editandoExecucao, setEditandoExecucao] = useState(false); // Estado auxiliar para detectar quando está ocorrendo uma edição
  const [indexExecucao, setIndexExecucao] = useState(null);

  const handleExecucao = (e) => {
    const { value, id } = e.target;
    setExecucao({
      ...execucao,
      [id]: value,
    });
  };

  const editExecucao = (e) => {
    const { id } = e.target;
    let { cronograma } = values;
    const execucao = cronograma.atividades_execucao.filter(
      (element, index) => index.toString() === id,
    );
    // // console.log(execucao);
    setExecucao(execucao[0]);
    setEditandoExecucao(true);
    setIndexExecucao(parseInt(id, 10));
  };

  const deleteExecucao = (e) => {
    const { id } = e.target;
    let { cronograma } = values;
    cronograma.atividades_execucao.splice(id, 1);
    setValues({
      ...values,
      cronograma,
    });
  };

  // AcaoCurso2 avaliação
  const [avaliacao, setAvaliacao] = useState({
    atividades: '',
    data_inicio: '',
    data_fim: '',
    horas_semanais: '',
  });

  const [editandoAvaliacao, setEditandoAvaliacao] = useState(false); // Estado auxiliar para detectar quando está ocorrendo uma edição
  const [indexAvaliacao, setIndexAvaliacao] = useState(null);

  const handleAvaliacao = (e) => {
    const { value, id } = e.target;
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
      cronograma,
    });
  };

  const [membro, setMembro] = useState({
    cpf: '',
    email: '',
    nome: '',
    funcao: '',
    carga_horaria: 0,
    tipo: '',
  });

  const handleChanges = (e) => {
    const { id, title, value, name } = e.target;

    if (title === 'edital') {
      setValues({
        ...values,
        edital_resumo: {
          ...values.edital_resumo,
          uuid: id,
          titulo: name,
        },
      });
    } else if (id === 'add-curso') {
      let { aulas } = values;
      const propertyName = 'aulas';
      aulas.push(curso);

      setValues({
        ...values,
        [propertyName]: aulas,
      });

      setCurso({
        titulo: '',
        conteudo: '',
      });
    } else if (id === 'edit-curso') {
      let { aulas } = values;
      const propertyName = 'aulas';
      aulas[indexCurso] = curso;
      setValues({
        ...values,
        [propertyName]: aulas,
      });
      setCurso({
        titulo: '',
        conteudo: '',
      });
      setEditandoCurso(false);
    } else if (title === 'cronograma') {
      let { cronograma } = values;
      // const cronogramas = id;
      cronograma[id] = value;
      setValues({
        ...values,
        cronograma: {
          ...cronograma,
          [id]: value,
        },
      });
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
    } else if (title === 'referencias_aplicadas') {
      setValues({
        ...values,
        referencias_aplicadas: id,
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
    } else if (id === 'add-objetivo-especifico') {
      let { objetivos_especificos } = values;
      const propertyName = 'objetivos_especificos';
      objetivos_especificos.push(objetivo_especifico);
      setValues({
        ...values,
        [propertyName]: objetivos_especificos,
      });
      setObjetivoEspecifico('');
    } else if (id === 'edit-objetivo-especifico') {
      let { objetivos_especificos } = values;
      const propertyName = 'objetivos_especificos';
      objetivos_especificos[indexObjetivoEspecifico] = objetivo_especifico;
      setValues({
        ...values,
        [propertyName]: objetivos_especificos,
      });
      setObjetivoEspecifico('');
      setEditandoObjetivo(false);
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
    } else if (id === 'add-planejamentos') {
      let { cronograma } = values;
      const propertyName = 'cronograma';
      cronograma.atividades_planejamento.push(planejamento);
      setValues({
        ...values,
        [propertyName]: cronograma,
      });
      setPlanejamento({
        atividades: '',
        data_inicio: '',
        data_fim: '',
        horas_semanais: '',
      });
    } else if (id === 'edit-planejamentos') {
      let { cronograma } = values;
      cronograma.atividades_planejamento[indexPlanejamento] = planejamento;
      setValues({
        ...values,
        planejamento,
      });
      setPlanejamento({
        atividades: '',
        data_inicio: '',
        data_fim: '',
        horas_semanais: '',
      });
      setEditandoPlanejamento(false);
    } else if (id === 'add-execucoes') {
      let { cronograma } = values;
      const propertyName = 'cronograma';
      cronograma.atividades_execucao.push(execucao);
      setValues({
        ...values,
        [propertyName]: cronograma,
      });
      setExecucao({
        atividades: '',
        data_inicio: '',
        data_fim: '',
        horas_semanais: '',
      });
    } else if (id === 'edit-execucoes') {
      let { cronograma } = values;
      cronograma.atividades_execucao[indexExecucao] = execucao;
      setValues({
        ...values,
        execucao,
      });
      setExecucao({
        atividades: '',
        data_inicio: '',
        data_fim: '',
        horas_semanais: '',
      });
      setEditandoExecucao(false);
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
        avaliacao,
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
  // console.log(values);
  const deleteMembro = (e) => {
    const { id } = e.target;
    let { usuarios_proposta } = values;
    usuarios_proposta.splice(id, 1);
    setValues({
      ...values,
      usuarios_proposta,
    });
    // Caso o membro a ser deletado seja o membro em edição,
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

  const handleMembro = (e) => {
    const { id, value } = e.currentTarget;
    setMembro({
      ...membro,
      [id]: value,
    });
  };

  const editMembro = (e) => {
    const { id } = e.currentTarget; // Index do projeto
    let { usuarios_proposta } = values;
    // Pega o projeto no array de objetos (values.projetos)
    const usuario_proposta = usuarios_proposta.filter(
      (element, index) => index.toString() === id,
    );
    // Seta os campos de edição do projeto com os valores atuais dele,
    // para que os valores possam ser modificados
    setMembro({
      cpf: usuario_proposta[0].cpf,
      email: usuario_proposta[0].email,
      nome: usuario_proposta[0].nome,
      funcao: usuario_proposta[0].funcao,
      carga_horaria: usuario_proposta[0].carga_horaria,
      tipo: usuario_proposta[0].tipo,
    });
    setEditandoMembro(true);
    setIndexMembro(parseInt(id, 10));
  };

  // // console.log(values)
  return {
    step,
    setStep,

    values,
    setValues,

    curso,
    editandoCurso,
    handleCurso,
    deleteCurso,
    editCurso,

    membro,
    editandoMembro,
    handleMembro,
    deleteMembro,
    editMembro,

    errors,
    setErrors,

    handleChanges,

    validated,
    setValidated,

    planejamento,
    editandoPlanejamento,
    editPlanejamento,
    handlePlanejamento,
    deletePlanejamento,

    execucao,
    editandoExecucao,
    editExecucao,
    handleExecucao,
    deleteExecucao,

    avaliacao,
    editandoAvaliacao,
    editAvaliacao,
    handleAvaliacao,
    deleteAvaliacao,

    editObjetivo,
    objetivo_especifico,
    handleObjetivoEspecifico,
    editandoObjetivo,
    handleBlur,
    deleteObjetivo,
  };
};

export default useCadastroCurso;
