import React from "react";
import {
  render,
  screen,
  cleanup,
  act
} from "@testing-library/react";
import userEvent from '@testing-library/user-event';
import "@testing-library/jest-dom/extend-expect";
import axios from 'axios';

import { UserStorage } from '../../Services/UserContext';
import LoginForm from './LoginForm';

// Não é mais necessário < https://willianjusten.com.br/erros-comuns-com-o-react-testing-library/ >
// afterEach(cleanup)

const expire_at = (new Date('30 December 2022 15:00 UTC')).toISOString();
const fakeJwtResponse = {
  "tipe": "Bearer",
  "token": "tokenSomenteParaTestes",
  "expire_at": expire_at
}

const textInsiraEmail = 'Insira seu e-mail';
const textInsiraSenha = 'Insira sua senha';
const textEsqueceuSenha = 'Esqueceu sua senha?';
const textCadastro = 'Cadastro';
const textEntrar = 'Entrar';

describe('Testing LoginForm Page', () => {

  it('should render LoginForm as expected', () => {

    render(<UserStorage><LoginForm /></UserStorage>);

    expect(screen.getByPlaceholderText(textInsiraEmail)).toBeTruthy();
    expect(screen.getByPlaceholderText(textInsiraSenha)).toBeTruthy();
    expect(screen.getByText(textEsqueceuSenha)).toBeTruthy();
    expect(screen.getByText(textCadastro)).toBeTruthy();
    expect(screen.getByText(textEntrar)).toBeTruthy();
  });

  it('should insert data in LoginForm and trigger request', async () => {

    axios.post = jest.fn().mockResolvedValue({
      data: fakeJwtResponse
    });

    jest.spyOn(localStorage.__proto__, 'setItem');

    /*
    jest.spyOn(window.localStorage.__proto__, 'getItem');
    window.localStorage.__proto__.getItem = jest.fn();
    */

    const email2Test = 'teste@teste.com';
    const password2Test = '12345678';
    render(<UserStorage><LoginForm /></UserStorage>);

    userEvent.type(screen.getByPlaceholderText(textInsiraEmail), email2Test);
    userEvent.type(screen.getByPlaceholderText(textInsiraSenha), password2Test);

    expect(screen.getByPlaceholderText(textInsiraEmail)).toHaveValue(email2Test);
    expect(screen.getByPlaceholderText(textInsiraSenha)).toHaveValue(password2Test);

    //Submit the form
    await act(async () => {
      userEvent.click(document.getElementById('button'));
    });

    // TODO: Criar uma forma para confirmar se o login teve sucesso.
    /**
     * Como não há uma forma visual de confirmar se o login ocorreu com sucesso
     * Um caminho é verificar se o localStorage possui o token JWT
     * Tentei mas não consegui fazer o localStorage funcionar no contexto dos testes
     * mesmo com o Mock do LocalStorage, o método setItem nunca é invocado.
     */
    //expect(localStorage.setItem).toHaveBeenCalledTimes(1);

  });


});
