import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const HeaderWrapper = styled.header`
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};
  padding: ${({ theme }) => theme.spacing.md};
  text-align: center;

  @media (max-width: 768px) {
    text-align: left;
  }
`;

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const NavList = styled.ul`
  list-style: none;
  padding: 0;
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};

  @media (max-width: 768px) {
    flex-direction: column;
    gap: ${({ theme }) => theme.spacing.sm};
  }
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
    navigate('/login');
  };

  return (
    <HeaderWrapper>
      <Nav>
        <NavList>
          <NavItem>
            <Link to="/movies">Movies</Link>
          </NavItem>
          <NavItem>
            <Link to="/add-movie">Add Movie</Link>
          </NavItem>
        </NavList>
        <NavButton onClick={handleLogout}>Logout</NavButton>
      </Nav>
    </HeaderWrapper>
  );
};

export default Header;
