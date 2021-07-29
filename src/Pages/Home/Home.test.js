import '@testing-library/jest-dom'
import {render, screen, cleanup} from '@testing-library/react';
import Home from './Home';

afterEach(cleanup)

describe('Testing HOME Component (home.jsx)', () => {

  it('should render the homepage Head Tag', async () => {
    render(<Home />);

    /* Intro */
    expect(screen.getByText(/Novo Sistema de Registro/i)).toBeTruthy();

    /* Consultas */
    expect(screen.getByText(/Consulte Editais e Ações Registradas/i)).toBeTruthy();

    /* Cadastro */
    expect(screen.getByText(/Cadastre suas Ações em um Edital/i)).toBeTruthy();

    /* Sobre */
    expect(screen.getByText(/Conheça a Plataforma/i)).toBeTruthy();
  });

});
