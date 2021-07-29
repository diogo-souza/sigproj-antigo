import React, { useState } from 'react';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import DOMPurify from 'dompurify';

const useCadastroEdital = () => {
  const html = '<p>Insira o corpo do edital aqui</p>';
  const contentBlock = htmlToDraft(html);
  const contentState = ContentState.createFromBlockArray(
    contentBlock.contentBlocks,
  );

  const [step, setStep] = useState(0); // Ainda não precisará ser usado
  const [errors, setErrors] = useState({});
  const [convertedContent, setConvertedContent] = useState(null);
  const [editorState, setEditorState] = useState(() =>
    EditorState.createWithContent(contentState),
  );

  const [values, setValues] = useState({
    titulo: '',
    chamada: '',
    modalidades: [],
    data_inicio: '',
    data_fim: '',
    corpo: '',
    estado: true,
    // instituicao: '',
    // url: '',
  });

  const [modalidades, setModalidades] = useState({
    Programa: false,
    Projeto: false,
    Curso: false,
    Evento: false,
  });

  const convertContentToHTML = () => {
    let currentContentAsHTML = draftToHtml(
      convertToRaw(editorState.getCurrentContent()),
    );
    setConvertedContent(currentContentAsHTML);
    setValues({
      ...values,
      corpo: currentContentAsHTML,
    });
  };

  const handleEditorChange = (state) => {
    setEditorState(state);
    convertContentToHTML();
  };

  const createMarkup = (html) => ({
    __html: DOMPurify.sanitize(html),
  });

  const handleChanges = (e) => {
    const { id, value, checked } = e.currentTarget;
    if (
      id === 'Curso' ||
      id === 'Projeto' ||
      id === 'Evento' ||
      id === 'Programa'
    ) {
      if (checked) {
        setValues({});
      }
      setValues({
        ...values,
        modalidades: {
          ...values.modalidades,
          [id]: checked,
        },
      });
    } else {
      setValues({
        ...values,
        [id]: value,
      });
    }
  };

  const handleModalidades = (e) => {
    const { id, checked } = e.currentTarget;
    setModalidades({
      ...modalidades,
      [id]: checked,
    });

    if (checked === true) {
      let novasModalidades = values.modalidades;
      novasModalidades.push(id);
      setValues({
        ...values,
        modalidades: novasModalidades,
      });
    } else {
      const index = values.modalidades.indexOf(id);
      let novasModalidades = values.modalidades;
      novasModalidades.splice(index, 1);
      setValues({
        ...values,
        modalidades: novasModalidades,
      });
    }
  };

  return {
    step,
    values,
    modalidades,
    editorState,
    convertedContent,
    errors,
    handleModalidades,
    handleChanges,
    handleEditorChange,
    createMarkup,
    setEditorState,
    setErrors,
  };
};

export default useCadastroEdital;
