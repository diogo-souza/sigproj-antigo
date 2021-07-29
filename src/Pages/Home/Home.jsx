import React from 'react';
import Consultas from './Consultas';
import Cadastro from './Cadastro';
import Contato from './Contato';
import Intro from './Intro';
import Sobre from './Sobre';

const Home = () => (
  <div>
    <Intro />
    <Consultas />
    <Cadastro />
    <Sobre />
  </div>
);

export default Home;
