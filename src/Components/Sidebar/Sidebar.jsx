import React, { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Nav } from 'react-bootstrap';
import { SidebarData } from './SidebarData';
import { UserContext } from '../../Services/UserContext';

function Sidebar() {
  const { userSession } = useContext(UserContext);
  const location = useLocation();

  return (
    <div className="sideBar">
      {userSession ? (
        <Nav className="sidebar sidebar-offcanvas" id="sidebar">
          <Nav className="nav" as="ul">
            {SidebarData.map((val) => {
              let result = '';
              if (
                val.roles.includes('public') ||
                val.roles.includes(userSession.role_usuario)
              ) {
                result = (
                  <Nav.Item key={val.id} className="sidebar-itens">
                    <Link
                      className="nav-link"
                      to={val.path}
                      id={location.pathname === val.path ? 'active' : ''}
                    >
                      <div id="icon">{val.icon}</div>
                      <div id="title">{val.title}</div>
                    </Link>
                  </Nav.Item>
                );
              }
              return result;
            })}
          </Nav>
        </Nav>
      ) : (
        <Nav className="sidebar sidebar-nosession" id="sidebar" />
      )}
    </div>
  );
}
export default Sidebar;
