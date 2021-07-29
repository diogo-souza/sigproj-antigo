import React, { useState } from 'react';
import { UserContext } from '../Services/UserContext';

const useCadastroProjeto = () => {
  const { userSession } = React.useContext(UserContext);
  const [step, setStep] = useState(1);
  const [validated, setValidated] = useState(false);
  const [values, setValues] = useState({
    modalidade: 'Projeto',
    uuid: '',
    edital_resumo: {
      uuid: '',
      titulo: '',
    },
    cpf: userSession.cpf,
    nome: userSession.nome,
    centro: userSession.centro,
    departamento: userSession.departamento,
    cargo: '',
    categoria: userSession.categoria,
    email: userSession.email,
    telefone: userSession.telefone,
    tipo: 'Projeto de Extensão',
    area_tematica: '',
    titulo: '',
    subTitulo: '',
    objetivoGeral: '',
    movimentacaoFinanceiraExterna: '',
    projetos: [],
    eventosVinculados: [],
    cursosVinculados: [],
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
    saberesTeoricos: '',
    periodoExecucao: '',
    carga_horaria: '',
    estado: '',
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
  const [projeto, setProjeto] = useState({
    // Valores dos campos de projeto
    numeroRegistro: 0,
    nomeProjeto: '',
    nomeProponente: '',
    objetivoGeral: '',
  });

  const [objetivoEspecifico, setObjetivoEspecifico] = useState({
    objetivo_especifico: '',
    atividades: '',
    desenvolvimento_atv: '',
    data_inicio: '',
    data_fim: '',
    horas_semanais: '',
  });

  const [membro, setMembro] = useState({
    cpf: '',
    email: '',
    nome: '',
    funcao: '',
    carga_horaria: 0,
    tipo: '',
  });
  // Valor do campo de objetivo específico
  const [editandoProjeto, setEditandoProjeto] = useState(false); // Estado auxiliar para detectar quando está ocorrendo uma edição
  const [indexProjeto, setIndexProjeto] = useState(null); // Estado que representa o índice do elmemento em edição
  const [editandoObjetivo, setEditandoObjetivo] = useState(false);
  const [indexObjetivoEspecifico, setIndexObjetivoEspecifico] = useState(null);
  const [editandoMembro, setEditandoMembro] = useState(false); // Estado auxiliar para detectar quando está ocorrendo uma edição
  const [indexMembro, setIndexMembro] = useState(null);

  const handleProjeto = (e) => {
    const { id, value } = e.target;
    setProjeto({
      ...projeto,
      [id]: value,
    });
  };

  const handleMembro = (e) => {
    const { id, value } = e.target;
    setMembro({
      ...membro,
      [id]: value,
    });
  };
  const handleObjetivoEspecifico = (e) => {
    const { value, id, name, title } = e.target;
    const field = id;
    const index = parseInt(name, 10);
    if (id === 'objetivo_especifico') {
      setObjetivoEspecifico({
        ...objetivoEspecifico,
        [id]: value,
      });
    } else {
      // Está setando os outros valores que compõem o objetivo específico
      let objEspecificos = values.objetivosEspecificos;
      if (id === 'atividades') {
        objEspecificos[index].atividades = value;
      } else if (id === 'desenvolvimento_atv') {
        objEspecificos[index].desenvolvimento_atv = value;
      } else if (id === 'data_inicio') {
        objEspecificos[index].data_inicio = value;
      } else if (id === 'data_fim') {
        objEspecificos[index].data_fim = value;
      } else {
        objEspecificos[index].horas_semanais = value;
      }

      setValues({
        ...values,
        objetivosEspecificos: objEspecificos,
      });

      setObjetivoEspecifico({
        ...objetivoEspecifico,
        objetivo_especifico:
          values.objetivosEspecificos[index].objetivo_especifico,
        [id]: value,
      });
    }
  };

  const handleBlur = (e) => {
    const { id, value, name } = e.target;
    // Salva o objetivo específico em values, com as novas descrções
    if (
      id === 'atividades' ||
      id === 'data_inicio' ||
      id === 'data_fim' ||
      id === 'horas_semanais' ||
      id === 'desenvolvimento_atv'
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
    } else if (id === 'add-projeto') {
      let { projetos } = values;
      const propertyName = 'projetos';
      projetos.push(projeto);

      setValues({
        ...values,
        [propertyName]: projetos,
      });
      // Ao adicionar o projeto da tabela, é necessário limpar os campos de preenchimento
      setProjeto({
        numeroRegistro: '',
        nomeProjeto: '',
        nomeProponente: '',
        objetivoGeral: '',
      });
    } else if (id === 'edit-projeto') {
      let { projetos } = values;
      const propertyName = 'projetos';
      projetos[indexProjeto] = projeto;
      setValues({
        ...values,
        [propertyName]: projetos,
      });
      // Ao editar o projeto da tabela, é necessário limpar os campos de preenchimento
      setProjeto({
        numeroRegistro: '',
        nomeProjeto: '',
        nomeProponente: '',
        objetivoGeral: '',
      });
      setEditandoProjeto(false);
    } else if (id === 'add-objetivo-especifico') {
      let { objetivosEspecificos } = values;
      const propertyName = 'objetivosEspecificos';
      objetivosEspecificos.push(objetivoEspecifico);
      setValues({
        ...values,
        [propertyName]: objetivosEspecificos,
      });
      setObjetivoEspecifico({
        objetivo_especifico: '',
        atividades: '',
        desenvolvimento_atv: '',
        data_inicio: '',
        data_fim: '',
        horas_semanais: '',
      });
    } else if (id === 'edit-objetivo-especifico') {
      let { objetivosEspecificos } = values;
      const propertyName = 'objetivosEspecificos';
      objetivosEspecificos[indexObjetivoEspecifico] = objetivoEspecifico;
      setValues({
        ...values,
        [propertyName]: objetivosEspecificos,
      });
      setObjetivoEspecifico({
        objetivo_especifico: '',
        atividades: '',
        desenvolvimento_atv: '',
        data_inicio: '',
        data_fim: '',
        horas_semanais: '',
      });
      setEditandoObjetivo(false);
    } else if (id === 'previous') {
      setObjetivoEspecifico({
        objetivo_especifico: '',
        atividades: '',
        desenvolvimento_atv: '',
        data_inicio: '',
        data_fim: '',
        horas_semanais: '',
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
    } else if (id === 'add-usuario_proposta') {
      let { usuarios_proposta } = values;
      usuarios_proposta.push(membro);
      setValues({
        ...values,
        usuarios_proposta,
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
      usuarios_proposta[indexMembro] = membro;
      setValues({
        ...values,
        usuarios_proposta,
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
    } else {
      setValues({
        ...values,
        [id]: value,
      });
    }
  };
  // A utilização de parseInt nas funções deleteProjeto e editProjeto
  // ocorrem porque a id é do tipo string e o indexProjeto do tipo object
  const deleteProjeto = (e) => {
    const { id } = e.target;
    let { projetos } = values;
    projetos.splice(id, 1);
    setValues({
      ...values,
      [projetos]: projetos,
    });
    // Caso o projeto a ser deletado seja o projeto em edição,
    // os campos serão limpos e o estado editandoProjeto voltará para fale
    if (parseInt(id, 10) === parseInt(indexProjeto, 10)) {
      setProjeto({
        numeroRegistro: '',
        nomeProjeto: '',
        nomeProponente: '',
        objetivoGeral: '',
      });
      setEditandoProjeto(false);
    }
  };

  const editProjeto = (e) => {
    const { id } = e.target; // Index do projeto
    let { projetos } = values;
    // Pega o projeto no array de objetos (values.projetos)
    const projeto = projetos.filter(
      (element, index) => index.toString() === id,
    );
    // Seta os campos de edição do projeto com os valores atuais dele,
    // para que os valores possam ser modificados
    setProjeto({
      numeroRegistro: projeto[0].numeroRegistro,
      nomeProjeto: projeto[0].nomeProjeto,
      nomeProponente: projeto[0].nomeProponente,
      objetivoGeral: projeto[0].objetivoGeral,
    });
    setEditandoProjeto(true);
    setIndexProjeto(parseInt(id, 10));
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
      setObjetivoEspecifico({
        objetivo_especifico: '',
        atividades: '',
        desenvolvimento_atv: '',
        data_inicio: '',
        data_fim: '',
        horas_semanais: '',
      });
      setEditandoObjetivo(false);
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

  const deleteMembro = (e) => {
    const { id } = e.target;
    let { usuarios_proposta } = values;
    usuarios_proposta.splice(id, 1);
    setValues({
      ...values,
      usuarios_proposta,
    });
    // Caso o projeto a ser deletado seja o projeto em edição,
    // os campos serão limpos e o estado editandoProjeto voltará para fale
    if (parseInt(id, 10) === parseInt(indexProjeto, 10)) {
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
      tipo: usuario_proposta[0].tipo,
      funcao: usuario_proposta[0].funcao,
      carga_horaria: usuario_proposta[0].carga_horaria,
      email: usuario_proposta[0].email,
    });
    setEditandoMembro(true);
    setIndexMembro(parseInt(id, 10));
  };

  const addEvento = (uuid, titulo) => {
    let { eventosVinculados } = values;
    eventosVinculados.push({ uuid, titulo });
    const id = 'eventosVinculados';
    setValues({
      ...values,
      [id]: eventosVinculados,
    });
  };

  const addCurso = (uuid, titulo) => {
    let { cursosVinculados } = values;
    cursosVinculados.push({ uuid, titulo });
    const id = 'cursosVinculados';
    setValues({
      ...values,
      [id]: cursosVinculados,
    });
  };

  const removeEvento = (index) => {
    let { eventosVinculados } = values;
    eventosVinculados.splice(index, 1);
    setValues({
      ...values,
      eventosVinculados,
    });
  };

  const removeCurso = (index) => {
    let { cursosVinculados } = values;
    cursosVinculados.splice(index, 1);
    setValues({
      ...values,
      cursosVinculados,
    });
  };

  return {
    step,
    values,
    projeto,
    membro,
    editandoProjeto,
    objetivoEspecifico,
    editandoObjetivo,
    editandoMembro,
    validated,
    errors,
    setValues,
    setStep,
    handleChanges,
    handleProjeto,
    deleteProjeto,
    editProjeto,
    handleObjetivoEspecifico,
    deleteObjetivo,
    editObjetivo,
    handleMembro,
    deleteMembro,
    editMembro,
    handleBlur,
    setValidated,
    setErrors,

    addEvento,
    addCurso,
    removeEvento,
    removeCurso,
  };
};

export default useCadastroProjeto;
