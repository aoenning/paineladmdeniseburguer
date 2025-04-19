import { useState } from "react";
import ListaProdutos from "../../components/ListaProdutos";
import FormProduto from "../../components/FormProduto";
import styled from "styled-components";
import { motion } from "framer-motion";

const Container = styled.div`
  display: flex;
  height: 100vh;
`;

const Conteudo = styled.div`
  flex: 1;
  padding: 2rem;
  overflow-y: auto;
`;

const Button = styled.button`
  padding: 0.5rem 1rem;
  background: #111;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
`;

const Painel = styled(motion.div)`
  width: 350px;
  background: #f4f4f4;
  padding: 2rem;
  box-shadow: -4px 0 12px rgba(0, 0, 0, 0.1);
  position: fixed;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 10;
  overflow-y: auto;
  transition: all 0.4s ease;

  @media (max-width: 768px) {
    width: 100%;
    box-shadow: none;
  }
`;

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  z-index: 5;
`;

export default function CadastroProduto() {
  const [abrirPainel, setAbrirPainel] = useState(false);
  const [produtoEditando, setProdutoEditando] = useState(null);

  function handleClose(value) {
    setAbrirPainel(value);
    setProdutoEditando("");
  }

  return (
    <>
      <Container>
        <Conteudo>
          <h2>📦 Produtos Cadastrados</h2>
          <Button onClick={() => setAbrirPainel(true)}>
            ➕ Cadastrar Produto
          </Button>
          <ListaProdutos
            onEditar={(produto) => {
              setProdutoEditando(produto);
              setAbrirPainel(true);
            }}
          />
        </Conteudo>

        {abrirPainel && (
          <Painel
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          >
            <h3>➕ Novo Produto</h3>
            <FormProduto
              onClose={() => {
                setAbrirPainel(false);
                setProdutoEditando(produtoEditando);
              }}
              produtoEditando={produtoEditando}
            />
            <Button
              onClick={() => handleClose(false)}
              style={{ marginTop: "1rem" }}
            >
              ❌ Fechar
            </Button>
          </Painel>
        )}
      </Container>

      {abrirPainel && <Overlay onClick={() => setAbrirPainel(false)} />}
    </>
  );
}
