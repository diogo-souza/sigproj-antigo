import React, { createContext } from 'react';
import usePropostaBasicaFacade from '../Hooks/Facade/usePropostaBasicaFacade';
import useCadastroProposta from '../Hooks/useCadastroProposta';
import usePropostaGeralFacade from '../Hooks/Facade/usePropostaGeralFacade';

export const CadastroProgramaContext = createContext();
export const CadastroProgramaData = ({ children }) => {
  const {
    step,
    setStep,

    values,
    setValues,

    projeto,
    handleProjeto,
    deleteProjeto,
    editProjeto,
    editandoProjeto,

    membro,
    editandoMembro,
    handleMembro,
    deleteMembro,
    editMembro,

    handleChanges,

    editandoObjetivo,
    deleteObjetivo,
    editObjetivo,

    objetivoEspecifico,
    handleObjetivoEspecifico,

    handleBlur,

    setValidated,
    validated,

    errors,
    setErrors,

    addProjeto,
    addEvento,
    addCurso,
    removeProjeto,
    removeEvento,
    removeCurso,
  } = useCadastroProposta();

  const {
    propostaBasica,
    handlePropostaBasica,
    handleModalidade,
  } = usePropostaBasicaFacade();
  const { propostaGeral, handlePropostaGeral } = usePropostaGeralFacade();

  return (
    <CadastroProgramaContext.Provider
      value={{
        step,
        setStep,

        values,
        setValues,

        projeto,
        handleProjeto,
        deleteProjeto,
        editProjeto,
        editandoProjeto,

        membro,
        editandoMembro,
        handleMembro,
        deleteMembro,
        editMembro,

        handleChanges,

        editandoObjetivo,
        deleteObjetivo,
        editObjetivo,

        objetivoEspecifico,
        handleObjetivoEspecifico,

        handleBlur,

        setValidated,
        validated,

        errors,
        setErrors,

        propostaBasica,
        handlePropostaBasica,
        propostaGeral,
        handlePropostaGeral,

        handleModalidade,

        addProjeto,
        addEvento,
        addCurso,
        removeProjeto,
        removeEvento,
        removeCurso,
      }}
    >
      {children}
    </CadastroProgramaContext.Provider>
  );
};
