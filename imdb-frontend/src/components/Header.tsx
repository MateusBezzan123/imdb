import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const HeaderWrapper = styled.header`
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};
  padding: ${({ theme }) => theme.spacing.md};
`;

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const NavList = styled.ul`
  list-style: none;
  padding: 0;
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
`;

const NavItem = styled.li`
  display: inline;
`;

const NavButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.white};
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

const Header: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <HeaderWrapper>
      <div className="container">
        <Nav>
          <NavList>
            <NavItem>
              <Link to="/movies">Filmes</Link>
            </NavItem>
            <NavItem>
              <Link to="/add-movie">Adicionar Filme</Link>
            </NavItem>
          </NavList>
          <NavButton onClick={handleLogout}>Sair</NavButton>
        </Nav>
      </div>
    </HeaderWrapper>
  );
};

export default Header;
