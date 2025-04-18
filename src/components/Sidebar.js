import styled from "styled-components";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";

const SidebarContainer = styled.div`
  width: 250px;
  background-color: #1e1e2f;
  color: #fff;
  height: 100vh;
  padding: 1rem;
  position: fixed;
  top: 0;
  left: 0;
  transition: all 0.3s ease;

  @media (max-width: 768px) {
    width: ${({ isOpen }) => (isOpen ? "200px" : "60px")};
    overflow-x: hidden;
  }
`;

const ToggleButton = styled.button`
  background: none;
  border: none;
  color: white;
  margin-bottom: 1rem;
  font-size: 1.5rem;
  cursor: pointer;

  @media (min-width: 769px) {
    display: none;
  }
`;

const NavItem = styled(Link)`
  display: block;
  padding: 1rem 0;
  color: ${({ active }) => (active === "true" ? "#ff9800" : "#fff")};
  text-decoration: none;

  &:hover {
    color: #ff9800;
  }
`;

export default function Sidebar() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(true);

  return (
    <SidebarContainer isOpen={isOpen}>
      <ToggleButton onClick={() => setIsOpen(!isOpen)}>☰</ToggleButton>
      {/* <NavItem to="/" active={(location.pathname === "/").toString()}>
        🛒 Pedidos
      </NavItem> */}
      <NavItem to="/" active={(location.pathname === "/").toString()}>
        🛒 Painel pedidos
      </NavItem>
      {/* <NavItem
        to="/"
        active={(location.pathname === "/").toString()}
      >
        🛒 Painel pedidos
      </NavItem> */}
      <NavItem
        to="/cadastro"
        active={(location.pathname === "/cadastro").toString()}
      >
        🍔 Cadastrar Produto
      </NavItem>
      <NavItem to="/caixa" active={(location.pathname === "/caixa").toString()}>
        🧾 Caixa
      </NavItem>
      <NavItem
        to="/relatorio"
        active={(location.pathname === "/relatorio").toString()}
      >
        📊Relatório
      </NavItem>
    </SidebarContainer>
  );
}
