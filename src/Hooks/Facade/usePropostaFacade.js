import React, { useState } from 'react';

const useEventoFacade = () => {
  const [evento, setEvento] = useState({
    area_tematica: '',
    carga_horaria: 0,
    ch_proponente: 0,
    chefia_coordenador: '',
    diretrizes_proposta: {
      impacto_estudante: '',
      impacto_social: '',
      indissociabilidade: '',
      interacao_dialogica: '',
      interdisciplinaridade: '',
    },
    doc_chefia_imediata: '',
    edital_resumo: {
      titulo: '',
      uuid: '',
    },
    estado: '',
    id: 0,
    info_proposta: {
      consideracoes_finais: '',
      email: '',
      redes_sociais: '',
      telefone: '',
    },
    local: '',
    lotacao_coordenador: '',
    modalidade: '',
    objetivoGeral: '',
    periodo_fim: '',
    periodo_inicio: '',
    proponente: {
      email: '',
      name: '',
      uuid: '',
    },
    publico_externo: {
      discentes_estaduais: 0,
      discentes_federais: 0,
      discentes_municipais: 0,
      grupos_comunitarios: 0,
      id: 0,
      movimentos_sociais: 0,
      ongs: 0,
      organizacoes_privadas: 0,
      organizacoes_sindicais: 0,
      outros: 0,
      servidores_estaduais: 0,
      servidores_federais: 0,
      servidores_municipais: 0,
    },
    publico_interno: {
      discentes_grad: 0,
      discentes_pos: 0,
      docentes: 0,
      id: 0,
      outros: 0,
      tecs_adm: 0,
    },
    setores_externos: [
      {
        apoio: true,
        documento: '',
        id: 0,
        instituicao: '',
        parceria: true,
        patrocinio: true,
      },
    ],
    subTitulo: '',
    titulo: '',
    usuarios_proposta: [
      {
        carga_horaria: 0,
        funcao: '',
        usuario: {
          email: '',
          name: '',
          uuid: '',
        },
      },
    ],
    uuid: '',
  });

  const handleChanges = (e) => {
    const { id, value } = e.target;
    setEvento({
      ...evento,
      id: value,
    });
  };

  return { evento, setId, setProjeto, setObjetivoEspecifico, set };
};

export default useEventoFacade;
