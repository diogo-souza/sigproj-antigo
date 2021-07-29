import React, { useState } from 'react';

const usePropostaBasicaFacade = () => {
  const [propostaBasica, setPropostaBasica] = useState({
    modalidade: '',
    edital_uuid: '',
    cpf_proponente: JSON.parse(localStorage.getItem('session')).cpf,
    area_tematica: '',
    titulo: '',
  });
  // // console.log(propostaBasica);

  const capitalize = (word) =>
    word[0].toUpperCase() + word.slice(1).toLowerCase();

  const handlePropostaBasica = (e, modalidadeAcao) => {
    const { id, value, title } = e.currentTarget;
    if (title === 'edital') {
      const edital = 'edital_uuid';
      setPropostaBasica({
        ...propostaBasica,
        [edital]: id,
        modalidade: modalidadeAcao,
      });
    } else {
      setPropostaBasica({
        ...propostaBasica,
        [id]: value,
      });
    }
  };

  return { propostaBasica, handlePropostaBasica };
};

export default usePropostaBasicaFacade;
