import React, { createContext } from 'react';
import usePropostaBasicaFacade from '../Hooks/Facade/usePropostaBasicaFacade';
import useCadastroProjeto from '../Hooks/useCadastroProjeto';
import useCadastroProposta from '../Hooks/useCadastroProposta';

export const CadastroProjetoContext = createContext();
export const CadastroProjetoData = ({ children }) => {
  const {
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
  } = useCadastroProjeto();

  const {
    propostaBasica,
    handlePropostaBasica,
    handleModalidade,
  } = usePropostaBasicaFacade();

  return (
    <CadastroProjetoContext.Provider
      value={{
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
        propostaBasica,
        handlePropostaBasica,
        handleModalidade,
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
      }}
    >
      {children}
    </CadastroProjetoContext.Provider>
  );
};
