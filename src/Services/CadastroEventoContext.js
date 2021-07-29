import React, { createContext } from 'react';
import useEventoFacade from '../Hooks/Facade/useEventoFacade';
import usePropostaBasicaFacade from '../Hooks/Facade/usePropostaBasicaFacade';
import usePropostaGeralFacade from '../Hooks/Facade/usePropostaGeralFacade';
import useCadastroEvento from '../Hooks/useCadastroEvento';

export const CadastroEventoContext = createContext();
export const CadastroEventoData = ({ children }) => {
  const {
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
  } = useCadastroEvento();

  const { propostaBasica, handlePropostaBasica } = usePropostaBasicaFacade();
  const { propostaGeral, handlePropostaGeral } = usePropostaGeralFacade();
  const { evento, handleEvento } = useEventoFacade();

  return (
    <CadastroEventoContext.Provider
      value={{
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
        propostaBasica,
        handlePropostaBasica,
        evento,
        handleEvento,
        propostaGeral,
        handlePropostaGeral
      }}
    >
      {children}
    </CadastroEventoContext.Provider>
  );
};
