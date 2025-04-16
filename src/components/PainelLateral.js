import React from 'react';
import styled from 'styled-components';

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background-color: rgba(0,0,0,0.5);
  display: ${props => (props.ativo ? 'block' : 'none')};
  z-index: 10;
`;

const Painel = styled.div`
  position: fixed;
  top: 0;
  right: ${props => (props.ativo ? '0' : '-100%')};
  width: 100%;
  max-width: 500px;
  height: 100%;
  background: #fff4e6;
  padding: 2rem;
  transition: right 0.3s ease;
  z-index: 11;
  overflow-y: auto;

  @media (max-width: 600px) {
    padding: 1rem;
  }
`;

export default function PainelLateral({ ativo, onFechar, children }) {
  return (
    <>
      <Overlay ativo={ativo} onClick={onFechar} />
      <Painel ativo={ativo}>
        {children}
      </Painel>
    </>
  );
}
