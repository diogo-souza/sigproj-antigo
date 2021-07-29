import React, { useEffect, useState } from 'react';

const useEditaisFiltro = () => {
  const [filters, setFilters] = useState({
    titulo: false,
    modalidade: false,
    expirado: null,
    dataInicial: '',
    dataFinal: '',
    search: '',
    departamento: '',
  });
  const [modificandoFiltros, setModificandoFiltros] = useState(false);
  // function formatData(d) {
  //   const data = d.match(/\d+/g);
  //   const dia = data[2];
  //   const mes = data[1];
  //   const ano = data[0];
  //   let dataFormatada = `${dia}/${mes}/${ano}`;

  //   return dataFormatada;
  // }

  function handleFilter(event) {
    const { id, value } = event.currentTarget;
    // console.log(id);
    if (id === 'search') {
      setFilters({
        ...filters,
        [id]: value,
      });
    } else if (id === 'ativo') {
      setFilters({
        ...filters,
        expirado: false,
      });
    } else if (id === 'expirado') {
      setFilters({
        ...filters,
        expirado: true,
      });
    } else if (id === 'titulo') {
      setFilters({
        ...filters,
        modalidade: false,
        titulo: true,
      });
    } else if (id === 'modalidade') {
      setFilters({
        ...filters,
        modalidade: true,
        titulo: false,
      });
    } else if (id === 'departamento') {
      // console.log('dep');
      setFilters({
        ...filters,
        departamento: value,
      });
    }
    setModificandoFiltros(true);
  }

  function clearFilter() {
    setFilters({
      titulo: false,
      modalidade: false,
      expirado: null,
      dataInicial: '',
      dataFinal: '',
      search: '',
      departamento: '',
    });
  }

  function handleDate(event) {
    const { id, value } = event.currentTarget;
    const data = value.replace(/\.|-/g, '/');
    // console.log(filters);
    setFilters({
      ...filters,
      [id]: value,
    });
  }
  return {
    filters,
    handleFilter,
    handleDate,
    clearFilter,
    modificandoFiltros,
    setModificandoFiltros,
  };
};

export default useEditaisFiltro;
