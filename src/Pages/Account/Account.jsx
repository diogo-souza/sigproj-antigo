import React, { useRef, useEffect, useContext } from 'react';
import {
  Form,
  Container,
  FormControl,
  FormGroup,
  FormLabel,
  Col,
  Row,
  Button,
  Tabs,
  Tab,
} from 'react-bootstrap';
import { UserContext } from '../../Services/UserContext';
import { estados } from '../../Utils/estados-cidades';
import useRegisterForm from '../../Hooks/useRegisterForm';
import formsValidations2 from '../../Hooks/formsValidations2';

const Account = () => {
  const {
    handleChange,
    values,
    setValues,
    validated,
    handleSubmitAccountPersonalData,
    handleSubmitAccountPassword,
    handleSubmitAccountAddress,
    handleSubmitOthers,
    cities,
    validateCEP,
  } = useRegisterForm();

  const { userSession } = useContext(UserContext);

  const {
    validateCPF,
    validateEmail,
    validatePassword,
    validatePasswordConfirmation,
    errors,
  } = formsValidations2();

  useEffect(() => {
    if (userSession !== null) {
      setValues(userSession);
    }
  }, [userSession]);

  return (
    <div className="account">
      <Container>
        <div className="box-all">
          <Tabs
            defaultActiveKey="dados-pessoais"
            transition={false}
            id="noanim-tab-example"
          >
            <Tab eventKey="dados-pessoais" title="Dados Pessoais">
              <div className="box-all">
                <Col md="auto">
                  <Form
                    className="form-dados-pessoais"
                    onSubmit={handleSubmitAccountPersonalData}
                    noValidate
                    validated={validated}
                  >
                    <Form.Row>
                      <FormGroup as={Col} controlId="nome">
                        <FormLabel>Nome Completo</FormLabel>
                        <FormControl
                          required
                          type="text"
                          placeholder="Insira seu nome completo"
                          value={values.nome}
                          maxLength="100"
                          onChange={handleChange}
                        />
                        <Form.Control.Feedback type="invalid">
                          Preencha seu nome.
                        </Form.Control.Feedback>
                      </FormGroup>
                    </Form.Row>
                    <Form.Row>
                      <FormGroup as={Col} controlId="email">
                        <FormLabel>E-mail</FormLabel>
                        <FormControl
                          required
                          type="text"
                          onChange={handleChange}
                          placeholder="Insira seu e-mail"
                          value={values.email}
                          maxLength="100"
                          disabled
                        />
                        <Form.Control.Feedback type="invalid">
                          Preencha seu e-mail.
                        </Form.Control.Feedback>
                      </FormGroup>
                    </Form.Row>
                    <Form.Row>
                      <FormGroup as={Col} md="6" controlId="telefone">
                        <FormLabel>Telefone</FormLabel>
                        <FormControl
                          type="text"
                          placeholder="Opcional"
                          onChange={handleChange}
                          value={
                            values.telefone !== null ? values.telefone : ''
                          }
                        />
                      </FormGroup>
                      <FormGroup as={Col} md="6" controlId="celular">
                        <FormLabel>Celular</FormLabel>
                        <FormControl
                          // required
                          type="text"
                          onChange={handleChange}
                          placeholder="(00)0.0000-0000"
                          value={values.celular}
                        />
                        <Form.Control.Feedback type="invalid">
                          Preencha um n??mero de celular para contato.
                        </Form.Control.Feedback>
                      </FormGroup>
                    </Form.Row>
                    <hr />
                    <Form.Row>
                      <FormGroup as={Col} md="6" controlId="cpf">
                        <FormLabel>CPF</FormLabel>
                        <FormControl
                          // required
                          type="text"
                          onChange={handleChange}
                          placeholder="000.000.000-00"
                          value={values.cpf}
                          maxLength="14"
                        />
                        <Form.Control.Feedback type="invalid">
                          Preencha seu CPF.
                        </Form.Control.Feedback>
                      </FormGroup>
                      <FormGroup as={Col} md="6" controlId="data_nascimento">
                        <FormLabel>Data de Nascimento</FormLabel>
                        <FormControl
                          // required
                          type="date"
                          onChange={handleChange}
                          value={values.data_nascimento}
                        />
                        <Form.Control.Feedback type="invalid">
                          Preencha sua data de nascimento.
                        </Form.Control.Feedback>
                      </FormGroup>
                    </Form.Row>
                    <Form.Row>
                      <FormGroup as={Col} md="6" controlId="sexo">
                        <FormLabel>Sexo</FormLabel>
                        <FormControl
                          as="select"
                          onChange={handleChange}
                          value={values.sexo}
                        >
                          <option>Selecione</option>
                          <option>Feminino</option>
                          <option>Masculino</option>
                          <option>Prefiro n??o Informar</option>
                        </FormControl>
                      </FormGroup>
                      <FormGroup as={Col} md="6" controlId="role_usuario">
                        <FormLabel>Tipo do Usuario</FormLabel>
                        <FormControl
                          as="select"
                          onChange={handleChange}
                          value={values.role_usuario}
                          disabled
                        >
                          <option>Escolha um Tipo Institucional</option>
                          <option value="ROLE_ADMIN">Proexc (Admin)</option>
                          <option value="ROLE_DISCENTE">
                            Aluno (Discente)
                          </option>
                          <option value="ROLE_PROPONENTE">Proponente</option>
                          <option value="ROLE_USUARIO">Padr??o</option>
                          <option value="ROLE_ROOT">ROOT</option>
                        </FormControl>
                      </FormGroup>
                      <FormGroup as={Col} md="6" controlId="tipo_institucional">
                        <FormLabel>Tipo Institucional</FormLabel>
                        <FormControl
                          as="select"
                          onChange={handleChange}
                          value={values.tipo_institucional}
                          disabled
                        >
                          <option>Escolha um Tipo Institucional</option>
                          <option value="Discente Graduacao">
                            Discente Gradua????o
                          </option>
                          <option value="Discente Pos-Graduacao">
                            Discente P??s-Gradu????o
                          </option>
                          <option value="Docente">Docente</option>
                          <option value="Tecnico Administrativo">
                            T??cnico Administrativo
                          </option>
                          <option value="Outro">Outro</option>
                          <option style={{ display: 'none' }} value="ROLE_ROOT">
                            ROOT
                          </option>
                        </FormControl>
                      </FormGroup>
                    </Form.Row>
                    <hr />
                    <Row className="justify-content-md-center">
                      <Button className="button button-medium" type="submit">
                        <p>Atualizar dados pessoais</p>
                        <i className="material-icons button-icon">person</i>
                      </Button>
                    </Row>
                  </Form>
                </Col>
              </div>
            </Tab>
            <Tab eventKey="senha" title="Senha">
              <div className="box-all">
                <Col md="auto">
                  <Form
                    className="form"
                    onSubmit={handleSubmitAccountPassword}
                    noValidate
                    validated={validated}
                  >
                    <Form.Row>
                      <FormGroup as={Col} md="6" controlId="senha">
                        <FormLabel>Senha Antiga</FormLabel>
                        <FormControl
                          required
                          type="password"
                          onChange={handleChange}
                          placeholder="Insira sua senha"
                          value={values.senha}
                          minLength="6"
                        />
                        <Form.Control.Feedback type="invalid">
                          Preencha sua senha.
                        </Form.Control.Feedback>
                      </FormGroup>
                    </Form.Row>
                    <hr />
                    <Form.Row>
                      <FormGroup as={Col} md="6" controlId="novaSenha">
                        <FormLabel>Nova Senha</FormLabel>
                        <FormControl
                          required
                          type="password"
                          onChange={handleChange}
                          placeholder="Insira sua senha"
                          value={values.novaSenha}
                          minLength="6"
                        />
                        <Form.Control.Feedback type="invalid">
                          Preencha sua senha.
                        </Form.Control.Feedback>
                      </FormGroup>
                      <FormGroup as={Col} md="6" controlId="confirmarSenha">
                        <FormLabel>Confirma????o de Senha</FormLabel>
                        <FormControl
                          required
                          type="password"
                          onChange={handleChange}
                          value={values.confirmarSenha}
                          placeholder="Confirme sua senha"
                          minLength="6"
                        />
                        <Form.Control.Feedback type="invalid">
                          Confirme sua senha.
                        </Form.Control.Feedback>
                      </FormGroup>
                    </Form.Row>
                    <hr />
                    <Row className="justify-content-md-center">
                      <Button className="button button-medium" type="submit">
                        <p>Atualizar senha</p>
                        <i className="material-icons button-icon">person</i>
                      </Button>
                    </Row>
                  </Form>
                </Col>
              </div>
            </Tab>

            <Tab eventKey="endereco" title="Endere??o">
              <div className="box-all">
                <Col md="auto">
                  <Form
                    className="form"
                    onSubmit={handleSubmitAccountAddress}
                    noValidate
                    validated={validated}
                  >
                    <Form.Row>
                      <FormGroup as={Col} md="6" controlId="cep">
                        <FormLabel>CEP</FormLabel>
                        <FormControl
                          required
                          type="text"
                          onChange={handleChange}
                          onBlur={validateCEP}
                          placeholder="00.000-00"
                          value={values.endereco.cep}
                          maxLength="10"
                        />
                        <Form.Control.Feedback type="invalid">
                          Preencha o CEP de sua resid??ncia.
                        </Form.Control.Feedback>
                      </FormGroup>
                      <FormGroup as={Col} md="6" controlId="estado">
                        <FormLabel>Estado</FormLabel>
                        <FormControl
                          required
                          as="select"
                          onChange={handleChange}
                          value={values.endereco.estado}
                        >
                          <option>Selecione um Estado</option>
                          {/* Insere todos os estados nas op????es */}
                          {estados.map((estado) => (
                            <option value={estado.sigla}>{estado.nome}</option>
                          ))}
                        </FormControl>
                      </FormGroup>
                    </Form.Row>
                    <Form.Row>
                      <FormGroup as={Col} md="6" controlId="cidade">
                        <FormLabel>Cidade</FormLabel>
                        <FormControl
                          required
                          as="select"
                          value={values.endereco.cidade}
                          onChange={handleChange}
                        >
                          <option>Selecione uma cidade</option>

                          {cities.map((city) => (
                            <option value={city}>{city}</option>
                          ))}
                        </FormControl>
                      </FormGroup>
                      <FormGroup as={Col} md="6" controlId="bairro">
                        <FormLabel>Bairro</FormLabel>
                        <FormControl
                          required
                          type="text"
                          onChange={handleChange}
                          value={values.endereco.bairro}
                        />
                        <Form.Control.Feedback type="invalid">
                          Preencha seu bairro.
                        </Form.Control.Feedback>
                      </FormGroup>
                    </Form.Row>
                    <Form.Row>
                      <FormGroup as={Col} md="6" controlId="logradouro">
                        <FormLabel>Logradouro</FormLabel>
                        <FormControl
                          required
                          type="text"
                          onChange={handleChange}
                          value={values.endereco.logradouro}
                          maxLength="50"
                        />
                        <Form.Control.Feedback type="invalid">
                          Preencha seu Logradouro.
                        </Form.Control.Feedback>
                      </FormGroup>
                      <FormGroup as={Col} md="6" controlId="numero_residencial">
                        <FormLabel>N??mero</FormLabel>
                        <FormControl
                          required
                          type="number"
                          onChange={handleChange}
                          value={values.endereco.numero_residencial}
                        />
                        <Form.Control.Feedback type="invalid">
                          Preencha o n??mero de sua resid??ncia.
                        </Form.Control.Feedback>
                      </FormGroup>
                    </Form.Row>
                    <Form.Row>
                      <FormGroup as={Col} md="6" controlId="complemento">
                        <FormLabel>Complemento</FormLabel>
                        <FormControl
                          type="text"
                          placeholder="Opcional"
                          onChange={handleChange}
                          value={
                            values.endereco.complemento !== null
                              ? values.endereco.complemento
                              : ''
                          }
                          maxLength="50"
                        />
                      </FormGroup>
                    </Form.Row>
                    <Row className="justify-content-md-center">
                      <Button className="button button-medium" type="submit">
                        <p>Atualizar endere??o</p>
                        <i className="material-icons button-icon">person</i>
                      </Button>
                    </Row>
                  </Form>
                </Col>
              </div>
            </Tab>
            <Tab eventKey="outros" title="Outros">
              <div className="box-all">
                <Col md="auto">
                  <Form
                    className="form"
                    onSubmit={handleSubmitOthers}
                    noValidate
                    validated={validated}
                  >
                    <Form.Row>
                      <FormGroup as={Col} controlId="universidade">
                        <FormLabel>Institui????o</FormLabel>
                        <FormControl
                          required
                          as="select"
                          value={values.universidade}
                          onChange={handleChange}
                        >
                          <option>Selecione a Universidade</option>
                          <option>
                            Universidade Federal de Pernambuco - UFPE
                          </option>
                        </FormControl>
                      </FormGroup>
                    </Form.Row>
                    <Form.Row>
                      <FormGroup as={Col} md="6" controlId="centro">
                        <FormLabel>Centro</FormLabel>
                        <FormControl
                          required
                          as="select"
                          value={values.centro}
                          onChange={handleChange}
                        >
                          <option>Selecione o centro</option>
                          <option>CAC - Centro de Artes e Comunica????o</option>
                          <option>CB - Centro de Bioci??ncias</option>
                          <option>
                            CCEN - Centro de Ci??ncias Exatas e da Natureza
                          </option>
                          <option>CCJ - Centro de Ci??ncias Jur??dicas</option>
                          <option>CCS - Centro de Ci??ncias da S??ude</option>
                          <option>CCM - Centro de Ci??ncias M??dicas</option>
                          <option>
                            CCSA - Centro de Ci??ncias Sociais Aplicadas
                          </option>
                          <option>CE - Centro de Educa????o</option>
                          <option>
                            CFCH - Centro de Filosofia e Ci??ncias Humanas
                          </option>
                          <option>CIn - Centro de Inform??tica</option>
                          <option>
                            CTG - Centro de Tecnologia e Geoci??ncias
                          </option>
                        </FormControl>
                      </FormGroup>
                      <FormGroup as={Col} md="6" controlId="departamento">
                        <FormLabel>Departamento</FormLabel>
                        <FormControl
                          required
                          as="select"
                          value={values.departamento}
                          onChange={handleChange}
                        >
                          <option>Selecione o departamento</option>
                          <option value="Artes">Departamento de Artes</option>
                          <option value="Informatica">
                            Departamento de Inform??tica
                          </option>
                          <option value="Letras">Departamento de Letras</option>
                          <option value="Saude">Departamento de Sa??de</option>
                          <option value="Exatas">Departamento de Exatas</option>
                        </FormControl>
                      </FormGroup>
                    </Form.Row>
                    <Form.Row>
                      <FormGroup as={Col} md="6" controlId="categoria">
                        <FormLabel>Categoria</FormLabel>
                        <FormControl
                          required
                          as="select"
                          onChange={handleChange}
                          value={
                            values.categoria !== null ? values.categoria : ''
                          }
                        >
                          <option>Selecione a categoria</option>
                          <option>Categoria 1</option>
                        </FormControl>
                      </FormGroup>
                      <FormGroup as={Col} md="6" controlId="carga_trabalho">
                        <FormLabel>Regime de Trabalho</FormLabel>
                        <FormControl
                          required
                          as="select"
                          value={values.carga_trabalho}
                          onChange={handleChange}
                        >
                          <option>Selecione a carga horaria</option>
                          <option value={20}>20 horas semanais</option>
                          <option value={30}>30 horas semanais</option>
                          <option value={40}>40 horas semanais</option>
                        </FormControl>
                      </FormGroup>
                    </Form.Row>
                    <Form.Row>
                      <FormGroup as={Col} md="6" controlId="titulacao">
                        <FormLabel>Titula????o</FormLabel>
                        <FormControl
                          required
                          as="select"
                          value={values.titulacao}
                          onChange={handleChange}
                        >
                          <option>Selecione a titula????o</option>
                          <option value="Ensino Medio">Ensino M??dio</option>
                          <option value="Graduando">Graduando</option>
                          <option value="Graduado">Graduado</option>
                          <option value="Especialista">Especialista</option>
                          <option value="Mestre">Mestre</option>
                          <option value="Doutor">Doutor</option>
                          <option value="Outro">Outro</option>
                        </FormControl>
                      </FormGroup>
                    </Form.Row>
                    <Row className="justify-content-md-center">
                      <Button className="button button-medium" type="submit">
                        <p>Atualizar outros</p>
                        <i className="material-icons button-icon">person</i>
                      </Button>
                    </Row>
                  </Form>
                </Col>
              </div>
            </Tab>
          </Tabs>
        </div>
      </Container>
    </div>
  );
};

export default Account;
