import React from 'react';
import HomeIcon from '@material-ui/icons/Home';
import DashboardRoundedIcon from '@material-ui/icons/DashboardRounded';
import AccountCircleRoundedIcon from '@material-ui/icons/AccountCircleRounded';
import AssignmentRoundedIcon from '@material-ui/icons/AssignmentRounded';
import PhoneInTalkRoundedIcon from '@material-ui/icons/PhoneInTalkRounded';
import FindInPageRoundedIcon from '@material-ui/icons/FindInPageRounded';
import InfoRoundedIcon from '@material-ui/icons/InfoRounded';

// ROLE_ROOT = super hiper mega usuário
// ROLE_ADMIN = proexc
// ROLE_PROPONENTE = proponente
// ROLE_DISCENTE = aluno
// ROLE_USUARIO = todo mundo por default

export const SidebarData = [
  {
    title: 'Home',
    icon: <HomeIcon />,
    path: '/',
    roles: ['public'],
  },
  {
    title: 'Dashboard',
    icon: <DashboardRoundedIcon />,
    path: '/dashboard',
    roles: ['public'],
  },
  {
    title: 'Perfil',
    icon: <AccountCircleRoundedIcon />,
    path: '/perfil',
    roles: ['public'],
  },
  {
    title: 'Cadastrar Proposta',
    icon: <AssignmentRoundedIcon />,
    path: '/cadastro-proposta',
    roles: ['ROLE_ADMIN', 'ROLE_ROOT'],
  },
  {
    title: 'Cadastrar Edital',
    icon: <AssignmentRoundedIcon />,
    path: '/cadastro-edital',
    roles: ['ROLE_ADMIN', 'ROLE_ROOT'],
  },
  {
    title: 'Sobre',
    icon: <InfoRoundedIcon />,
    path: '/sobre',
    roles: ['public'],
  },
  {
    title: 'Consulta',
    icon: <FindInPageRoundedIcon />,
    path: '/consulta',
    roles: ['public'],
  },
  {
    title: 'Contato',
    icon: <PhoneInTalkRoundedIcon />,
    path: '/contato',
    roles: ['public'],
  },
  {
    title: 'Opção 1',
    icon: 'Icon',
    path: '/op1',
    roles: ['ROLE_ADMIN', 'ROLE_ROOT'],
  },

  {
    title: 'Opção 2 Aluno',
    icon: 'Icon',
    path: '/op2',
    roles: ['ROLE_ADMIN', 'aluno'],
  },
];
