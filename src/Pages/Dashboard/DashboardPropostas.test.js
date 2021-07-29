import React from 'react';
/* import nock from "nock"; */
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';

import { UserStorage } from '../../Services/UserContext';
import MinhasPropostas from './MinhasPropostas';

describe('Testing Dashboard Page', () => {
  it('should render Dashboard Page as expected', () => {
    render(
      <UserStorage>
        <MinhasPropostas />
      </UserStorage>,
    );

    // title / filtros
    expect(screen.getByText(/propostas/i)).toBeInTheDocument();
    expect(screen.getByText(/filtros de pesquisa/i)).toBeInTheDocument();
    expect(screen.getByText(/limpar filtros/i)).toBeInTheDocument();

    // multiple elements with the same text
    expect(screen.getAllByText(/edital/i)).toBeTruthy();
    expect(screen.getAllByText(/em execução/i)).toBeTruthy();
    expect(screen.getAllByText(/em avaliação/i)).toBeTruthy();
    expect(screen.getAllByText(/não avaliada/i)).toBeTruthy();
    expect(screen.getAllByText(/finalizada/i)).toBeTruthy();
    expect(screen.getAllByText(/recusada/i)).toBeTruthy();

    // table-propostas Header
    expect(screen.getByText(/título/i)).toBeInTheDocument();
    expect(screen.getByText(/modalidade/i)).toBeInTheDocument();
    expect(screen.getByText(/status/i)).toBeInTheDocument();
    expect(screen.getByText(/relação/i)).toBeInTheDocument();
    expect(screen.getByText(/título/i)).toBeInTheDocument();

    // consultar / cadastrar
    expect(screen.getByText(/consultar/i)).toBeInTheDocument();
    expect(screen.getByText(/cadastrar/i)).toBeInTheDocument();
  });

  it('should render filter Propostas as expected', () => {
    render(
      <UserStorage>
        <MinhasPropostas />
      </UserStorage>,
    );

    const trCount1 = document.getElementsByTagName('tr').length;

    userEvent.click(document.getElementById('em-execucao'));

    const trCount2 = document.getElementsByTagName('tr').length;

    expect(trCount1 > trCount2).toBeTruthy();
  });
});
