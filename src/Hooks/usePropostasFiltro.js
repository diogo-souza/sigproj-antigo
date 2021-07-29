import React, { useEffect, useState } from 'react';

const usePropostasFiltro = () => {
  const [filters, setFilters] = useState({
    titulo: '',
    modalidade: '',
    status: '',
    relacao: '',
    departamento: '',
  });

  function handleFilter(event) {
    const { id, value } = event.target;
    // console.log(id);
    setFilters({
      ...filters,
      [id]: value,
    });
  }

  function clearFilter() {
    setFilters({
      titulo: '',
      modalidade: '',
      status: '',
      relacao: '',
      departamento: '',
    });
  }

  return { filters, handleFilter, clearFilter };
};

export default usePropostasFiltro;
