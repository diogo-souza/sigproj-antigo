import React, { useRef } from 'react';
import {
  Form,
  Container,
  FormControl,
  FormGroup,
  FormLabel,
  Col,
  Row,
} from 'react-bootstrap';
import { estados } from '../../Utils/estados-cidades';
import useRegisterForm from '../../Hooks/useRegisterForm';
import formsValidations2 from '../../Hooks/formsValidations2';

const Register = () => {
  const {
    handleChange,
    values,
    validated,
    handleSubmitRegister,
    cities,
    validateCEP,
  } = useRegisterForm();

  const {
    errors,
    validateEmail,
    validatePassword,
    validatePasswordConfirmation,
    validateCPF,
    validateName,
  } = formsValidations2();

  const form = useRef();

  const handleRegister = () => {
    handleSubmitRegister(form);
  };

  return (
    <div className="register">
      <Container>
        <Row className="justify-content-md-center">
          <Col md="6">
            <Form
              className="form"
              ref={form}
              onSubmit={handleSubmitRegister}
              noValidate
              validated={validated}
            >
              <Form.Row>
                <FormGroup as={Col} controlId="nome">
                  <FormLabel>Nome Completo<p>*</p></FormLabel>
                  <FormControl
                    required
                    type="text"
                    placeholder="Insira seu nome completo"
                    value={values.nome}
                    maxLength="100"
                    onChange={handleChange}
                    onBlur={validateName}
                    isInvalid={errors.nome !== '' && errors.nome !== undefined}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.nome && <p>{errors.nome}</p>}
                  </Form.Control.Feedback>
                </FormGroup>
              </Form.Row>
              <Form.Row>
                <FormGroup as={Col} controlId="email">
                  <FormLabel>E-mail<p>*</p></FormLabel>
                  <FormControl
                    required
                    type="text"
                    placeholder="Insira seu e-mail"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={validateEmail}
                    maxLength="100"
                    isInvalid={
                      errors.email !== '' && errors.email !== undefined
                    }
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.email && <p>{errors.email}</p>}
                  </Form.Control.Feedback>
                </FormGroup>
              </Form.Row>
              <Form.Row>
                <FormGroup as={Col} md="6" controlId="senha">
                  <FormLabel>Senha<p>*</p></FormLabel>
                  <FormControl
                    required
                    type="password"
                    placeholder="Insira sua senha"
                    value={values.senha}
                    onChange={handleChange}
                    onBlur={validatePassword}
                    minLength="6"
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.senha && <p>{errors.senha}</p>}Preencha sua senha.
                  </Form.Control.Feedback>
                </FormGroup>
                <FormGroup as={Col} md="6" controlId="confirmarSenha">
                  <FormLabel>Confirma????o de Senha<p>*</p></FormLabel>
                  <FormControl
                    required
                    type="password"
                    value={values.confirmarSenha}
                    onChange={handleChange}
                    onBlur={validatePasswordConfirmation}
                    placeholder="Confirme sua senha"
                    minLength="6"
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.confirmarSenha && <p>{errors.confirmarSenha}</p>}
                    Confirme sua senha.
                  </Form.Control.Feedback>
                </FormGroup>
              </Form.Row>
              <hr />
              <Form.Row>
                <FormGroup as={Col} md="6" controlId="cpf">
                  <FormLabel>CPF<p>*</p></FormLabel>
                  <FormControl
                    required
                    type="text"
                    placeholder="000.000.000-00"
                    value={values.cpf}
                    onChange={handleChange}
                    onBlur={validateCPF}
                    maxLength="14"
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.cpf && <p>{errors.cpf}</p>}Preencha seu CPF.
                  </Form.Control.Feedback>
                </FormGroup>
                <FormGroup as={Col} md="6" controlId="data_nascimento">
                  <FormLabel>Data de Nascimento<p>*</p></FormLabel>
                  <FormControl
                    required
                    type="date"
                    value={values.data_nascimento}
                    onChange={handleChange}
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
                    value={values.sexo}
                    onChange={handleChange}
                  >
                    <option>Selecione</option>
                    <option>Feminino</option>
                    <option>Masculino</option>
                    <option>Prefiro n??o Informar</option>
                  </FormControl>
                </FormGroup>
                <FormGroup as={Col} md="6" controlId="tipo_institucional">
                  <FormLabel>Tipo Institucional</FormLabel>
                  <FormControl
                    as="select"
                    value={values.tipo_institucional}
                    onChange={handleChange}
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
                  </FormControl>
                </FormGroup>
              </Form.Row>
              <hr />
              <Form.Row>
                <FormGroup as={Col} md="6" controlId="cep">
                  <FormLabel>CEP<p>*</p></FormLabel>
                  <FormControl
                    required
                    type="text"
                    placeholder="00.000-00"
                    value={values.cep}
                    onChange={handleChange}
                    onBlur={validateCEP}
                    maxLength="10"
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.cep && <p>{errors.cep}</p>}Preencha o CEP de sua
                    resid??ncia.
                  </Form.Control.Feedback>
                </FormGroup>
                <FormGroup as={Col} md="6" controlId="estado">
                  <FormLabel>Estado<p>*</p></FormLabel>
                  <FormControl
                    required
                    as="select"
                    value={values.endereco.estado}
                    onChange={handleChange}
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
                  <FormLabel>Cidade<p>*</p></FormLabel>
                  <FormControl
                    required
                    as="select"
                    value={values.endereco.cidade}
                    onChange={handleChange}
                  >
                    <option>Selecione uma cidade</option>
                    {/* Insere todas as cidades nas op????es */}
                    {cities.map((city) => (
                      <option value={city}>{city}</option>
                    ))}
                  </FormControl>
                </FormGroup>
                <FormGroup as={Col} md="6" controlId="bairro">
                  <FormLabel>Bairro<p>*</p></FormLabel>
                  <FormControl
                    required
                    type="text"
                    value={values.endereco.bairro}
                    onChange={handleChange}
                  />
                  <Form.Control.Feedback type="invalid">
                    Preencha seu bairro.
                  </Form.Control.Feedback>
                </FormGroup>
              </Form.Row>
              <Form.Row>
                <FormGroup as={Col} md="6" controlId="logradouro">
                  <FormLabel>Logradouro<p>*</p></FormLabel>
                  <FormControl
                    required
                    type="text"
                    value={values.endereco.logradouro}
                    onChange={handleChange}
                    maxLength="50"
                  />
                  <Form.Control.Feedback type="invalid">
                    Preencha seu Logradouro.
                  </Form.Control.Feedback>
                </FormGroup>
                <FormGroup as={Col} md="6" controlId="numero_residencial">
                  <FormLabel>N??mero<p>*</p></FormLabel>
                  <FormControl
                    required
                    type="number"
                    value={values.endereco.numero_residencial}
                    onChange={handleChange}
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
                    value={values.endereco.complemento}
                    onChange={handleChange}
                    maxLength="50"
                  />
                </FormGroup>
                <FormGroup as={Col} md="6" controlId="telefone">
                  <FormLabel>Telefone</FormLabel>
                  <FormControl
                    type="text"
                    placeholder="Opcional"
                    value={values.telefone}
                    onChange={handleChange}
                    maxLength="10"
                  />
                </FormGroup>
              </Form.Row>
              <Form.Row>
                <FormGroup as={Col} md="6" controlId="celular">
                  <FormLabel>Celular<p>*</p></FormLabel>
                  <FormControl
                    required
                    type="text"
                    placeholder="(00)0.0000-0000"
                    value={values.celular}
                    onChange={handleChange}
                    maxLength="11"
                  />
                  <Form.Control.Feedback type="invalid">
                    Preencha um n??mero de celular para contato.
                  </Form.Control.Feedback>
                </FormGroup>
              </Form.Row>
              <hr />
              <Form.Row>
                <FormGroup as={Col} controlId="universidade">
                  <FormLabel>Institui????o<p>*</p></FormLabel>
                  <FormControl
                    required
                    as="select"
                    value={values.universidade}
                    onChange={handleChange}
                  >
                    <option>Selecione a Universidade</option>
                    <option>Universidade Federal de Pernambuco - UFPE</option>
                  </FormControl>
                </FormGroup>
              </Form.Row>
              <Form.Row>
                <FormGroup as={Col} md="6" controlId="centro">
                  <FormLabel>Centro<p>*</p></FormLabel>
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
                    <option>CCSA - Centro de Ci??ncias Sociais Aplicadas</option>
                    <option>CE - Centro de Educa????o</option>
                    <option>
                      CFCH - Centro de Filosofia e Ci??ncias Humanas
                    </option>
                    <option>CIn - Centro de Inform??tica</option>
                    <option>CTG - Centro de Tecnologia e Geoci??ncias</option>
                  </FormControl>
                </FormGroup>
                <FormGroup as={Col} md="6" controlId="departamento">
                  <FormLabel>Departamento<p>*</p></FormLabel>
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
                  <FormLabel>Categoria<p>*</p></FormLabel>
                  <FormControl
                    required
                    as="select"
                    value={values.categoria}
                    onChange={handleChange}
                  >
                    <option>Selecione a categoria</option>
                    <option>Categoria 1</option>
                  </FormControl>
                </FormGroup>
                <FormGroup as={Col} md="6" controlId="carga_trabalho">
                  <FormLabel>Regime de Trabalho<p>*</p></FormLabel>
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
                    <option disabled>60 horas semanais</option>
                    <option disabled>80 horas semanais</option>
                    <option disabled>Outro</option>
                  </FormControl>
                </FormGroup>
              </Form.Row>
              <Form.Row>
                <FormGroup as={Col} md="6" controlId="titulacao">
                  <FormLabel>Titula????o<p>*</p></FormLabel>
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
              <button className="button button-medium" type="submit">
                <p>Realizar Cadastro</p>
                <i className="material-icons">how_to_reg</i>
              </button>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Register;
