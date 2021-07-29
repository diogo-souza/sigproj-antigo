import React, { useState } from 'react';

const useEventoFacade = () => {
  const [evento, setEvento] = useState({
    id: null,
    projeto: null,
    objetivo_evento_projeto: null,
    conteudo_programatico: 'aaa',
    objetivos_especificos: 'aaaaas',
    cronograma: {
      inicio_planejamento: '2000-12-12',
      fim_planejamento: '2002-12-12',
      horas_semanais_planejamento: 12,
      atividades_planejamento: 'aaa',
      inicio_avaliacao: '2000-12-12',
      fim_avaliacao: '2002-12-12',
      horas_semanais_avaliacao: 12,
      atividades_avaliacao: 'bb',
    },
    atividades: [],
  });

  const handleEvento = (id, value) => {
    setEvento({
      ...evento,
      [id]: value,
    });
  };
  // console.log(evento)
  return { evento, handleEvento };
};

export default useEventoFacade;
