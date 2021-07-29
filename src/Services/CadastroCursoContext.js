import React, { createContext } from 'react';
import useCadastroCurso from '../Hooks/useCadastroCurso';
import usePropostaBasicaFacade from '../Hooks/Facade/usePropostaBasicaFacade';
import usePropostaGeralFacade from '../Hooks/Facade/usePropostaGeralFacade';

export const CadastroCursoContext = createContext();
export const CadastroCursoData = ({ children }) => {
  const {
    step,
    setStep,

    values,
    setValues,

    errors,
    setErrors,

    curso,
    aulas_curso,
    aulas,
    editandoCurso,
    deleteCurso,
    handleCurso,
    editCurso,

    membro,
    editandoMembro,
    handleMembro,
    deleteMembro,
    editMembro,

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
    objEspecificos,
    objetivo_especifico,
    handleObjetivoEspecifico,
    editandoObjetivo,
    addObjetivo,
    handleBlur,
    deleteObjetivo,
  } = useCadastroCurso();

  const { propostaBasica, handlePropostaBasica } = usePropostaBasicaFacade();
  const { propostaGeral, handlePropostaGeral } = usePropostaGeralFacade();

  return (
    <CadastroCursoContext.Provider
      value={{
        step,
        setStep,

        values,
        setValues,

        curso,
        aulas_curso,
        aulas,
        editandoCurso,
        deleteCurso,
        handleCurso,
        editCurso,

        membro,
        editandoMembro,
        handleMembro,
        deleteMembro,
        editMembro,

        validated,
        setValidated,

        handleChanges,

        errors,
        setErrors,

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

        propostaBasica,
        handlePropostaBasica,

        propostaGeral,
        handlePropostaGeral,

        editObjetivo,
        objEspecificos,
        objetivo_especifico,
        handleObjetivoEspecifico,
        editandoObjetivo,
        addObjetivo,
        handleBlur,
        deleteObjetivo,
      }}
    >
      {children}
    </CadastroCursoContext.Provider>
  );
};
