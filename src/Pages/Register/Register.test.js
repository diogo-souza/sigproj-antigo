import React from "react";
/* import nock from "nock"; */
import {
  render,
  fireEvent,
  screen,
  cleanup,
  waitFor,
  act,
  waitForElementToBeRemoved
} from "@testing-library/react";
import userEvent from '@testing-library/user-event';
import "@testing-library/jest-dom/extend-expect";

import { UserStorage } from '../../Services/UserContext';
import Register from './Register';

// Não é mais necessário < https://willianjusten.com.br/erros-comuns-com-o-react-testing-library/ >
//afterEach(cleanup);

const txtInsiraNome = 'Insira seu nome completo';
const txtInsiraEmail = 'Insira seu e-mail';
const txtInsiraSenha = 'Insira sua senha';
const txtConfirmSenha = 'Confirme sua senha';
const txtCpf = '000.000.000-00';
const txtDtNascimento = 'Data de Nascimento';
const txtSexo = 'Sexo';
const txtTipoInstitucional = 'Tipo Institucional';
const txtCep = '00.000-00';
const txtEstado = 'Estado';
const txtCidade = 'Cidade';
const txtBairro = 'Bairro';
const txtLogradouro = 'Logradouro';
const txtNumero = 'Número';
const txtComplemento = 'Complemento';
const txtTelefone = 'Telefone';
const txtCelular = '(00)0.0000-0000';
const txtInstituicão = 'Instituição';
const txtCentro = 'Centro';
const txtDepartamento = 'Departamento';
const txtCategoria = 'Categoria';
const txtRegimeDeTrabalho = 'Regime de Trabalho';
const txtTitulacao = 'Titulação';
const txtCadastro = 'Realizar Cadastro';

describe('Testing Register Page', () => {

  const inputDataProponente = {
    "nome": 'usuário teste',
    "email": 'usuarioteste@teste.com',
    "senha": '12345678',
    "cpf": '15394232040',
    "data_nascimento": '2001-12-05',
    "sexo": "Prefiro não Informar",
    "tipo_institucional": "ROLE_PROPONENTE",
    "cep": "51330290",
    "estado": "PE",
    "cidade": "Recife",
    "bairro": "Cohab",
    "logradouro": "Rua Iratinga",
    "numero_residencial": "1",
    "complemento": "casa",
    "telefone": "8133330022",
    "celular": "81988997766",
    "universidade": "Universidade Federal de Pernambuco - UFPE",
    "centro": "Centro de Informática",
    "departamento": "Departamento de Informática",
    "categoria": "Categoria 1",
    "regime_trabalho": "40 horas semanais",
    "titulacao": "Titulação 1"
  }

  it('should render Register Page as expected', () => {
    render(<UserStorage><Register /></UserStorage>);

    expect(screen.getByPlaceholderText(txtInsiraNome)).toBeTruthy();
    expect(screen.getByPlaceholderText(txtInsiraEmail)).toBeTruthy();
    expect(screen.getByPlaceholderText(txtInsiraSenha)).toBeTruthy();
    expect(screen.getByPlaceholderText(txtConfirmSenha)).toBeTruthy();
    expect(screen.getByPlaceholderText(txtCpf)).toBeTruthy();
    expect(screen.getByText(txtDtNascimento)).toBeTruthy();
    expect(screen.getByText(txtSexo)).toBeTruthy();
    expect(screen.getByText(txtTipoInstitucional)).toBeTruthy();
    expect(screen.getByPlaceholderText(txtCep)).toBeTruthy();
    expect(screen.getByText(txtEstado)).toBeTruthy();
    expect(screen.getByText(txtCidade)).toBeTruthy();
    expect(screen.getByText(txtBairro)).toBeTruthy();
    expect(screen.getByText(txtLogradouro)).toBeTruthy();
    expect(screen.getByText(txtNumero)).toBeTruthy();
    expect(screen.getByText(txtComplemento)).toBeTruthy();
    expect(screen.getByText(txtTelefone)).toBeTruthy();
    expect(screen.getByPlaceholderText(txtCelular)).toBeTruthy();
    expect(screen.getByText(txtInstituicão)).toBeTruthy();
    expect(screen.getByText(txtCentro)).toBeTruthy();
    expect(screen.getByText(txtDepartamento)).toBeTruthy();
    expect(screen.getByText(txtCategoria)).toBeTruthy();
    expect(screen.getByText(txtRegimeDeTrabalho)).toBeTruthy();
    expect(screen.getByText(txtTitulacao)).toBeTruthy();
    expect(screen.getByText(txtCadastro)).toBeTruthy();

  });

  it('should insert data in Register form with sucess', async () => {
    render(<UserStorage><Register /></UserStorage>);
    /*
    const myElement = await screen.findByTestId('registerform');
    const maxLengthToPrint = 100000
    screen.debug(myElement, maxLengthToPrint);
    */

    /*
    render(
      <select name="sexo" id="sexo">
        <option value="1">
          Value 1
        </option>
        <option value="2">
          Value 2
        </option>
        <option value="3">
          Value 3
        </option>
      </select>,
    );
    await userEvent.selectOptions(document.getElementById('sexo'), "3");
    expect(document.getElementById('sexo').value).toBe("3");
    */

    userEvent.type(document.getElementById('nome'), inputDataProponente.nome);
    userEvent.type(document.getElementById('email'), inputDataProponente.email);
    userEvent.type(document.getElementById('senha'), inputDataProponente.senha);
    userEvent.type(document.getElementById('confirmarSenha'), inputDataProponente.senha);
    userEvent.type(document.getElementById('cpf'), inputDataProponente.cpf);
    userEvent.type(document.getElementById('data_nascimento'), inputDataProponente.data_nascimento);
    userEvent.selectOptions(document.getElementById('sexo'), [inputDataProponente.sexo]);
    userEvent.selectOptions(document.getElementById('tipo_institucional'), [inputDataProponente.tipo_institucional]);
    userEvent.type(document.getElementById('cep'), inputDataProponente.cep);
    userEvent.selectOptions(document.getElementById('estado'), inputDataProponente.estado);
    userEvent.selectOptions(document.getElementById('cidade'), inputDataProponente.cidade);
    userEvent.type(document.getElementById('bairro'), inputDataProponente.bairro);
    userEvent.type(document.getElementById('logradouro'), inputDataProponente.logradouro);
    userEvent.type(document.getElementById('numero_residencial'), inputDataProponente.numero_residencial);
    userEvent.type(document.getElementById('complemento'), inputDataProponente.complemento);
    userEvent.type(document.getElementById('telefone'), inputDataProponente.telefone);
    userEvent.type(document.getElementById('celular'), inputDataProponente.celular);
    userEvent.selectOptions(document.getElementById('universidade'), inputDataProponente.universidade);
    userEvent.selectOptions(document.getElementById('centro'), inputDataProponente.centro);
    userEvent.selectOptions(document.getElementById('departamento'), inputDataProponente.departamento);
    userEvent.selectOptions(document.getElementById('categoria'), inputDataProponente.categoria);
    userEvent.selectOptions(document.getElementById('regime_trabalho'), inputDataProponente.regime_trabalho);
    userEvent.selectOptions(document.getElementById('titulacao'), inputDataProponente.titulacao);

    expect(document.getElementById('nome').value).toBe(inputDataProponente.nome);
    expect(document.getElementById('email').value).toBe(inputDataProponente.email);
    expect(document.getElementById('senha').value).toBe(inputDataProponente.senha);
    expect(document.getElementById('confirmarSenha').value).toBe(inputDataProponente.senha);
    expect(document.getElementById('cpf').value).toBe(inputDataProponente.cpf);
    expect(document.getElementById('data_nascimento').value).toBe(inputDataProponente.data_nascimento);
    expect(screen.getByText(inputDataProponente.sexo).selected).toBeTruthy();
    expect(document.getElementById('cep').value).toBe(inputDataProponente.cep);
    // TODO: Criar uma forma para confirmar dinamicamente no DOM a atualização do campo estado
    // expect(screen.getByText(inputDataProponente.estado).selected).toBeTruthy();
    expect(screen.getByText(inputDataProponente.cidade).selected).toBeTruthy();
    expect(document.getElementById('bairro').value).toBe(inputDataProponente.bairro);
    expect(document.getElementById('logradouro').value).toBe(inputDataProponente.logradouro);
    expect(document.getElementById('numero_residencial').value).toBe(inputDataProponente.numero_residencial);
    expect(document.getElementById('complemento').value).toBe(inputDataProponente.complemento);
    expect(document.getElementById('telefone').value).toBe(inputDataProponente.telefone);
    expect(document.getElementById('celular').value).toBe(inputDataProponente.celular);
    expect(screen.getByText(inputDataProponente.universidade).selected).toBeTruthy();
    expect(screen.getByText(inputDataProponente.centro).selected).toBeTruthy();
    expect(screen.getByText(inputDataProponente.departamento).selected).toBeTruthy();
    expect(screen.getByText(inputDataProponente.categoria).selected).toBeTruthy();
    expect(screen.getByText(inputDataProponente.regime_trabalho).selected).toBeTruthy();
    expect(screen.getByText(inputDataProponente.titulacao).selected).toBeTruthy();

    // TODO: Criar uma forma para confirmar se o cadastro
    /**
     * Como não há uma forma visual de confirmar se o cadastro ocorreu com sucesso
     * é necessário criar um mock da requisição
     */
  });

});
